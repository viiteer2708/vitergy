-- ─────────────────────────────────────────────────────────────────────────────
-- vitergy.es · 001 · ACCESO CON CÓDIGO POR EMAIL + RESULTADOS DE LOS TESTS
-- (Victor, 27-sep-2026 · lección del curso «Test interactivo con resultados»)
--
-- DÓNDE VIVE: en la base de datos de DPC (proyecto Supabase «dpc-comparador»,
-- región UE), dentro de un ESQUEMA PROPIO `vitergy`.
-- Decisión de Victor: 0 € frente a un proyecto nuevo de Supabase. Nada de DPC
-- lee ni escribe aquí, y vitergy no toca ninguna tabla de DPC.
--
-- CÓMO SE ENTRA:
--   · El esquema `vitergy` NO está expuesto en la API de Supabase: sus tablas
--     no se pueden leer desde ningún navegador, ni con la clave pública de DPC.
--   · La web solo entra por las 4 funciones `public.vitergy_*` de abajo, y solo
--     las puede ejecutar `service_role` (la llave de servidor que la web ya usa
--     para los precios de la calculadora, `DPC_SUPABASE_SERVICE_ROLE_KEY`).
--   · RLS encendida y sin policies en todas las tablas: cinturón y tirantes.
--
-- CÓMO SE APLICA: a mano (editor SQL de Supabase o MCP `execute_sql`), NO con el
-- historial de migraciones de DPC, para no mezclarse con sus números (051…).
-- Es idempotente: se puede volver a ejecutar entera sin romper nada.
--
-- Patrón del código copiado de Gnew (migración 123, revisada a fondo el
-- 26-sep-2026): el código nunca se guarda en claro, solo su huella HMAC; el
-- contador de intentos vive en la BD (una cookie la reenvía el atacante con el
-- contador a cero); los topes se cuentan con cerrojo, en una sola función.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE SCHEMA IF NOT EXISTS vitergy;
COMMENT ON SCHEMA vitergy IS
  'Datos de la web vitergy.es (repo vitergy, db/). NO es de DPC: acceso con código, suscriptores y tests. Solo service_role, por las funciones public.vitergy_*.';
REVOKE ALL ON SCHEMA vitergy FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA vitergy TO service_role;

-- ─── Cuentas: quién ha verificado su email con un código ────────────────────
CREATE TABLE IF NOT EXISTS vitergy.usuarios (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL UNIQUE
                CHECK (email = lower(btrim(email)) AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$'),
  creado_en     timestamptz NOT NULL DEFAULT now(),
  ultimo_acceso timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE vitergy.usuarios IS
  'Cuentas de vitergy.es: se crean al verificar el primer código. Se borran solas tras 365 días sin actividad (lo promete la política de privacidad).';
CREATE INDEX IF NOT EXISTS usuarios_ultimo_acceso_idx ON vitergy.usuarios (ultimo_acceso);

-- ─── La lista de correo propia ──────────────────────────────────────────────
-- Separada de `usuarios` a propósito (lo pide la lección): alguien puede tener
-- cuenta sin querer correos, y darse de baja de los correos sin perder la cuenta.
-- Solo entra quien marca la casilla OPCIONAL de novedades (RGPD 7.4 y LSSI 21):
-- el mismo criterio que la calculadora con la lista 488 de Brevo.
CREATE TABLE IF NOT EXISTS vitergy.suscriptores (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email             text NOT NULL UNIQUE CHECK (email = lower(btrim(email))),
  estado            text NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'pausado')),
  origen            text NOT NULL CHECK (origen ~ '^[a-z0-9-]{1,60}$'),
  consentimiento_en timestamptz NOT NULL DEFAULT now(),
  creado_en         timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE vitergy.suscriptores IS
  'Lista de correo de vitergy.es. Solo con consentimiento (casilla opcional). consentimiento_en = última vez que lo dio. Espejo en Brevo: lista 488.';

-- ─── Cada petición de código ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitergy.codigos_acceso (
  id          uuid PRIMARY KEY,
  email       text NOT NULL CHECK (email = lower(btrim(email))),
  codigo_hash text NOT NULL CHECK (codigo_hash ~ '^[0-9a-f]{64}$'),
  intentos    smallint NOT NULL DEFAULT 0 CHECK (intentos BETWEEN 0 AND 5),
  ip_hash     text CHECK (ip_hash IS NULL OR ip_hash ~ '^[0-9a-f]{64}$'),
  novedades   boolean NOT NULL DEFAULT false,
  origen      text NOT NULL CHECK (origen ~ '^[a-z0-9-]{1,60}$'),
  creado_en   timestamptz NOT NULL DEFAULT now(),
  caduca_en   timestamptz NOT NULL,
  usado_en    timestamptz,
  anulado_en  timestamptz,
  CONSTRAINT codigos_acceso_caduca_despues CHECK (caduca_en > creado_en)
);
COMMENT ON TABLE vitergy.codigos_acceso IS
  'Peticiones de código de 6 cifras. Solo la huella HMAC (el secreto AUTH_SECRET vive en Vercel, no aquí). La IP, solo como huella. Se borran a los 2 días.';
CREATE INDEX IF NOT EXISTS codigos_acceso_email_creado_idx ON vitergy.codigos_acceso (email, creado_en DESC);
CREATE INDEX IF NOT EXISTS codigos_acceso_ip_creado_idx
  ON vitergy.codigos_acceso (ip_hash, creado_en DESC) WHERE ip_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS codigos_acceso_creado_idx ON vitergy.codigos_acceso (creado_en);
-- Como mucho UNA petición viva por email: la nueva anula las anteriores.
CREATE UNIQUE INDEX IF NOT EXISTS codigos_acceso_una_viva_por_email
  ON vitergy.codigos_acceso (email) WHERE usado_en IS NULL AND anulado_en IS NULL;

-- ─── Resultados de los tests: uno por persona y test; repetir sobrescribe ──
CREATE TABLE IF NOT EXISTS vitergy.test_resultados (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id     uuid NOT NULL REFERENCES vitergy.usuarios (id) ON DELETE CASCADE,
  test           text NOT NULL CHECK (test ~ '^[a-z0-9-]{1,60}$'),
  respuestas     jsonb NOT NULL,
  ejes           jsonb NOT NULL,
  perfil         text NOT NULL,
  creado_en      timestamptz NOT NULL DEFAULT now(),
  actualizado_en timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT test_resultados_uno_por_persona UNIQUE (usuario_id, test)
);
COMMENT ON TABLE vitergy.test_resultados IS
  'Último resultado de cada persona en cada test (test = slug, p. ej. factura-luz). Lo calcula SIEMPRE el servidor.';

ALTER TABLE vitergy.usuarios        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitergy.suscriptores    ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitergy.codigos_acceso  ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitergy.test_resultados ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA vitergy FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA vitergy TO service_role;

-- ─── 1 · Preparar una petición de código ───────────────────────────────────
-- En UNA transacción y con cerrojo por email y por IP (siempre en ese orden):
-- limpia lo viejo, cuenta los topes, anula las peticiones vivas anteriores de
-- ese email y guarda la nueva. Los topes llegan como parámetros desde
-- src/lib/acceso/reglas.ts (una sola fuente). Devuelve si se envía y por qué no.
CREATE OR REPLACE FUNCTION public.vitergy_codigo_preparar(
  p_id              uuid,
  p_email           text,
  p_codigo_hash     text,
  p_ip_hash         text,
  p_novedades       boolean,
  p_origen          text,
  p_caduca_min      integer,
  p_max_15min       integer,
  p_max_24h         integer,
  p_max_fallos_24h  integer,
  p_max_ip_60min    integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
DECLARE
  v_n15    integer;
  v_n24    integer;
  v_fallos integer;
  v_nip    integer := 0;
  v_motivo text;
BEGIN
  -- Limpieza de paso (barata, va por índices): peticiones de más de 2 días y
  -- cuentas con más de un año sin actividad (con sus resultados, en cascada).
  DELETE FROM vitergy.codigos_acceso c WHERE c.creado_en < now() - interval '2 days';
  DELETE FROM vitergy.usuarios u WHERE u.ultimo_acceso < now() - interval '365 days';

  PERFORM pg_advisory_xact_lock(hashtextextended('vitergy_codigo:email:' || p_email, 0));
  IF p_ip_hash IS NOT NULL THEN
    PERFORM pg_advisory_xact_lock(hashtextextended('vitergy_codigo:ip:' || p_ip_hash, 0));
  END IF;

  -- Fallos = intentos gastados menos los aciertos (el intento que acierta
  -- también suma uno: quien entra a menudo no se bloquea a sí mismo).
  SELECT count(*) FILTER (WHERE c.creado_en > now() - interval '15 minutes'),
         count(*),
         coalesce(sum(c.intentos), 0) - count(*) FILTER (WHERE c.usado_en IS NOT NULL)
    INTO v_n15, v_n24, v_fallos
    FROM vitergy.codigos_acceso c
   WHERE c.email = p_email
     AND c.creado_en > now() - interval '24 hours';

  IF p_ip_hash IS NOT NULL THEN
    SELECT count(*) INTO v_nip
      FROM vitergy.codigos_acceso c
     WHERE c.ip_hash = p_ip_hash
       AND c.creado_en > now() - interval '60 minutes';
  END IF;

  v_motivo := CASE
    WHEN v_nip    >= p_max_ip_60min   THEN 'limite_ip'
    WHEN v_n15    >= p_max_15min      THEN 'limite_15min'
    WHEN v_n24    >= p_max_24h        THEN 'limite_24h'
    WHEN v_fallos >= p_max_fallos_24h THEN 'limite_fallos'
    ELSE NULL
  END;
  IF v_motivo IS NOT NULL THEN
    RETURN jsonb_build_object('enviar', false, 'motivo', v_motivo);
  END IF;

  UPDATE vitergy.codigos_acceso c
     SET anulado_en = now()
   WHERE c.email = p_email
     AND c.usado_en IS NULL
     AND c.anulado_en IS NULL;

  INSERT INTO vitergy.codigos_acceso (id, email, codigo_hash, ip_hash, novedades, origen, caduca_en)
  VALUES (p_id, p_email, p_codigo_hash, p_ip_hash, coalesce(p_novedades, false), p_origen,
          now() + make_interval(mins => p_caduca_min));

  RETURN jsonb_build_object('enviar', true, 'motivo', 'ok');
END
$function$;

-- ─── 2 · Verificar un código ────────────────────────────────────────────────
-- Un intento = +1 en la fila, en UNA sentencia (dos intentos simultáneos no se
-- cuelan con el mismo contador). Si acierta: marca la petición como usada,
-- crea la cuenta si no existía (o apunta el acceso) y, si esa petición traía el
-- permiso de novedades, crea o reactiva al suscriptor sin duplicar nada.
CREATE OR REPLACE FUNCTION public.vitergy_codigo_verificar(p_id uuid, p_intento_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
DECLARE
  v         vitergy.codigos_acceso%ROWTYPE;
  v_usuario uuid;
BEGIN
  UPDATE vitergy.codigos_acceso c
     SET intentos = c.intentos + 1
   WHERE c.id = p_id
     AND c.usado_en IS NULL
     AND c.anulado_en IS NULL
     AND c.caduca_en > now()
     AND c.intentos < 5
  RETURNING c.* INTO v;

  IF NOT FOUND THEN
    SELECT c.* INTO v FROM vitergy.codigos_acceso c WHERE c.id = p_id;
    IF NOT FOUND THEN
      RETURN jsonb_build_object('estado', 'no_existe');
    ELSIF v.usado_en IS NOT NULL OR v.anulado_en IS NOT NULL THEN
      RETURN jsonb_build_object('estado', 'anulado');
    ELSIF v.caduca_en <= now() THEN
      RETURN jsonb_build_object('estado', 'caducado');
    ELSE
      RETURN jsonb_build_object('estado', 'bloqueado');
    END IF;
  END IF;

  IF v.codigo_hash <> p_intento_hash THEN
    RETURN jsonb_build_object(
      'estado', CASE WHEN v.intentos >= 5 THEN 'bloqueado' ELSE 'incorrecto' END,
      'quedan', 5 - v.intentos
    );
  END IF;

  UPDATE vitergy.codigos_acceso c SET usado_en = now() WHERE c.id = p_id;

  INSERT INTO vitergy.usuarios AS u (email) VALUES (v.email)
  ON CONFLICT (email) DO UPDATE SET ultimo_acceso = now()
  RETURNING u.id INTO v_usuario;

  IF v.novedades THEN
    INSERT INTO vitergy.suscriptores AS s (email, origen) VALUES (v.email, v.origen)
    ON CONFLICT (email) DO UPDATE SET estado = 'activo', consentimiento_en = now();
  END IF;

  RETURN jsonb_build_object(
    'estado', 'ok',
    'usuario_id', v_usuario,
    'email', v.email,
    'suscriptor', v.novedades
  );
END
$function$;

-- ─── 3 · Guardar el resultado de un test (uno por persona y test) ──────────
CREATE OR REPLACE FUNCTION public.vitergy_test_guardar(
  p_usuario_id uuid,
  p_test       text,
  p_respuestas jsonb,
  p_ejes       jsonb,
  p_perfil     text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
DECLARE
  v_fecha timestamptz;
BEGIN
  UPDATE vitergy.usuarios u SET ultimo_acceso = now() WHERE u.id = p_usuario_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('estado', 'sin_usuario');
  END IF;

  INSERT INTO vitergy.test_resultados AS r (usuario_id, test, respuestas, ejes, perfil)
  VALUES (p_usuario_id, p_test, p_respuestas, p_ejes, p_perfil)
  ON CONFLICT (usuario_id, test) DO UPDATE
     SET respuestas     = EXCLUDED.respuestas,
         ejes           = EXCLUDED.ejes,
         perfil         = EXCLUDED.perfil,
         actualizado_en = now()
  RETURNING r.actualizado_en INTO v_fecha;

  RETURN jsonb_build_object('estado', 'ok', 'fecha', v_fecha);
END
$function$;

-- ─── 4 · Leer el último resultado guardado (o null) ────────────────────────
CREATE OR REPLACE FUNCTION public.vitergy_test_resultado(p_usuario_id uuid, p_test text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO ''
AS $function$
  SELECT jsonb_build_object('ejes', r.ejes, 'perfil', r.perfil, 'fecha', r.actualizado_en)
    FROM vitergy.test_resultados r
   WHERE r.usuario_id = p_usuario_id
     AND r.test = p_test;
$function$;

-- Solo el servidor (service_role) puede llamarlas. Supabase da EXECUTE a anon y
-- authenticated por defecto en `public`: se retira explícitamente.
REVOKE ALL ON FUNCTION public.vitergy_codigo_preparar(uuid, text, text, text, boolean, text, integer, integer, integer, integer, integer)
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_codigo_verificar(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_test_guardar(uuid, text, jsonb, jsonb, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_test_resultado(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.vitergy_codigo_preparar(uuid, text, text, text, boolean, text, integer, integer, integer, integer, integer)
  TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_codigo_verificar(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_test_guardar(uuid, text, jsonb, jsonb, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_test_resultado(uuid, text) TO service_role;
