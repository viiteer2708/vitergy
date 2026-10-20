-- ─────────────────────────────────────────────────────────────────────────────
-- vitergy.es · 002 · CUOTAS ANTIABUSO DE LA CALCULADORA
-- (embudo de la factura, tandas T1 y T2 · 17-oct-2026; recortado el 20-oct-2026)
--
-- QUÉ GUARDA: SOLO contadores por ventana de tiempo (antiabuso por IP, por email y global). Vercel no tiene memoria
-- compartida, así que el contador vive aquí. La IP y el email van como huella HMAC (nunca en claro) y se borran solos a
-- los 2 días. NINGÚN dato de clientes: decisión de Victor (20-oct-2026, «opción 2») — las facturas y las fichas de los
-- leads NO se guardan en la base de datos de DPC; el aviso a hola@vitergy.es con la factura adjunta es el único registro.
-- (La versión del 17-oct creaba además `expedientes`, `expediente_documentos` y el bucket `vitergy-expedientes`: fuera.
-- La vía rápida, T3, necesitará su propia decisión de dónde guardar DNI/CIF/IBAN.)
--
-- DÓNDE VIVE: el esquema `vitergy` de la base de datos de DPC (igual que el 001; decisión de Victor, 27-sep-2026: 0 €).
-- CÓMO SE ENTRA: el esquema `vitergy` NO está expuesto en la API de Supabase. La web solo llama a `public.vitergy_cuota`
-- y solo `service_role` puede ejecutarla. RLS encendida y SIN policies: cinturón y tirantes.
--
-- CÓMO SE APLICA (REQUIERE OK DE VICTOR): a mano (editor SQL de Supabase o MCP `execute_sql`), NO con el historial de
-- migraciones de DPC. No depende del 001 (crea el esquema si falta) y es IDEMPOTENTE: se puede ejecutar varias veces.
--   ⚠ Aplícalo ANTES de desplegar el código de T1/T2. Sin él, el lector de facturas responde «no disponible» (falla
--     cerrado, a propósito: sin cuotas no se gasta Gemini) y la calculadora solo deja teclear los datos a mano; el
--     formulario de datos sigue funcionando (el aviso a hola@ sale igual, solo que sin cuotas).
--
-- DESPUÉS DE APLICARLO (comprobaciones):
--   · select proname, proacl from pg_proc where proname = 'vitergy_cuota' and pronamespace = 'public'::regnamespace;  -- sin anon/authenticated
--   · select * from vitergy.cuotas order by ventana_inicio desc limit 10;
-- ─────────────────────────────────────────────────────────────────────────────

CREATE SCHEMA IF NOT EXISTS vitergy;
REVOKE ALL ON SCHEMA vitergy FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA vitergy TO service_role;

-- ─── Cuotas (antiabuso) ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitergy.cuotas (
  clave          text PRIMARY KEY CHECK (clave ~ '^[a-z0-9:_.-]{1,160}$'),
  ventana_inicio timestamptz NOT NULL DEFAULT now(),
  cuenta         integer NOT NULL DEFAULT 0
);
COMMENT ON TABLE vitergy.cuotas IS
  'Contadores del antiabuso por ventana fija (clave = «lectura:ip:<huella>:h», «lead:email:<huella>:d»…). La IP y el email solo como huella HMAC. Se limpian solos a los 2 días.';
CREATE INDEX IF NOT EXISTS cuotas_ventana_idx ON vitergy.cuotas (ventana_inicio);

ALTER TABLE vitergy.cuotas ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON vitergy.cuotas FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON vitergy.cuotas TO service_role;

-- ─── 1 · Cuota: «¿puedo dejar pasar esta petición?» ────────────────────────
-- Copia de `tramitacion_cuota` (tramitación v2 de GNEW) con tres cambios: esquema `vitergy`, `search_path` vacío y
-- limpieza de las ventanas viejas (la original crece sin fin). Ventana FIJA: arranca con la primera petición y se
-- reinicia cuando pasa `p_ventana_seg`. El incremento es atómico (INSERT … ON CONFLICT): una ráfaga en paralelo no se
-- salta el tope. Cuenta también las peticiones que ya se pasan del límite (quien insiste, sigue bloqueado).
-- Devuelve {permitido, cuenta, espera_seg}. La ventana máxima es 48 h (la limpieza borra lo de más de 2 días).
CREATE OR REPLACE FUNCTION public.vitergy_cuota(p_clave text, p_limite integer, p_ventana_seg integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
DECLARE
  v_cuenta integer;
  v_inicio timestamptz;
  v_espera integer;
BEGIN
  IF p_clave IS NULL OR p_limite IS NULL OR p_ventana_seg IS NULL
     OR p_limite < 1 OR p_ventana_seg < 1 OR p_ventana_seg > 172800 THEN
    RAISE EXCEPTION 'vitergy_cuota: parámetros no válidos';
  END IF;

  DELETE FROM vitergy.cuotas q WHERE q.ventana_inicio < now() - interval '2 days';

  INSERT INTO vitergy.cuotas AS c (clave, ventana_inicio, cuenta)
  VALUES (p_clave, now(), 1)
  ON CONFLICT (clave) DO UPDATE
    SET cuenta = CASE WHEN c.ventana_inicio < now() - make_interval(secs => p_ventana_seg)
                      THEN 1 ELSE c.cuenta + 1 END,
        ventana_inicio = CASE WHEN c.ventana_inicio < now() - make_interval(secs => p_ventana_seg)
                              THEN now() ELSE c.ventana_inicio END
  RETURNING c.cuenta, c.ventana_inicio INTO v_cuenta, v_inicio;

  v_espera := greatest(0, ceil(extract(epoch FROM (v_inicio + make_interval(secs => p_ventana_seg) - now()))))::integer;
  RETURN jsonb_build_object('permitido', v_cuenta <= p_limite, 'cuenta', v_cuenta, 'espera_seg', v_espera);
END
$function$;

-- Solo el servidor (service_role) puede llamarla. Supabase da EXECUTE a anon y authenticated por defecto en `public`:
-- se retira explícitamente.
REVOKE ALL ON FUNCTION public.vitergy_cuota(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.vitergy_cuota(text, integer, integer) TO service_role;

NOTIFY pgrst, 'reload schema';
