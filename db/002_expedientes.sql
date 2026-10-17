-- ─────────────────────────────────────────────────────────────────────────────
-- vitergy.es · 002 · EXPEDIENTES DEL EMBUDO DE LA FACTURA + CUOTAS ANTIABUSO
-- (Victor, 17-oct-2026 · diseño: _salidas/vitergy-embudo-factura-diseno-2026-10-17.md, §3 y §5 · tandas T1 y T2)
--
-- QUÉ GUARDA:
--   · `expedientes`            una ficha por persona que, tras ver su ahorro, deja nombre + email + móvil.
--                              Lleva también (para la vía rápida, T3) el tipo de titular y el IBAN CIFRADO.
--   · `expediente_documentos`  los ficheros del expediente (factura, DNI, CIF) y su estado en el almacén.
--   · `cuotas`                 contadores por ventana de tiempo (antiabuso: IP, email, global). Vercel no
--                              tiene memoria compartida, así que el contador vive aquí.
--   · El bucket PRIVADO `vitergy-expedientes` de Storage (último apartado de este fichero).
--
-- DÓNDE VIVE: el esquema `vitergy` de la base de datos de DPC (igual que el 001; decisión de Victor, 27-sep-2026: 0 €).
-- CÓMO SE ENTRA: el esquema `vitergy` NO está expuesto en la API de Supabase. La web solo llama a las funciones
-- `public.vitergy_*` de abajo y solo `service_role` puede ejecutarlas. RLS encendida y SIN policies en todas las
-- tablas: cinturón y tirantes.
--
-- CÓMO SE APLICA (REQUIERE OK DE VICTOR): a mano (editor SQL de Supabase o MCP `execute_sql`), NO con el historial de
-- migraciones de DPC. No depende del 001 (crea el esquema si falta; probado en una base vacía y en los dos órdenes) y es
-- IDEMPOTENTE: se puede ejecutar entera varias veces sin romper nada.
--   ⚠ Aplícalo ANTES de desplegar el código de T1/T2. Sin él: el lector de facturas responde «no disponible» (falla
--     cerrado, a propósito: sin cuotas no se gasta Gemini) y la calculadora solo deja teclear los datos a mano; el
--     formulario de datos sigue funcionando en modo degradado (el aviso a hola@ sale con la factura adjunta, pero no se
--     guarda ninguna ficha ni factura en la base de datos).
--
-- ANTES DE APLICARLO (lectura, no cambia nada) — políticas de `storage.objects` que pudieran alcanzar el bucket nuevo:
--     select policyname, cmd, roles, qual, with_check from pg_policies where schemaname = 'storage' and tablename = 'objects';
--   En las migraciones de DPC (025 agent-logos y 027 company-logos) NO hay ninguna `CREATE POLICY` sobre storage.objects:
--   esos buckets son públicos y no necesitan política. Pero la base viva puede tener políticas creadas desde el panel que
--   no están en el repo: hay que mirar el resultado y asegurarse de que ninguna (p. ej. «TO public USING (true)» o
--   «bucket_id IS NOT NULL») deja leer o escribir objetos de `vitergy-expedientes` a anon/authenticated.
--
-- DESPUÉS DE APLICARLO (comprobaciones):
--   · select id, public, file_size_limit, allowed_mime_types from storage.buckets where id = 'vitergy-expedientes';   -- public = false
--   · select proname, proacl from pg_proc where proname like 'vitergy\_%' and pronamespace = 'public'::regnamespace;   -- sin anon/authenticated
--   · select count(*) from vitergy.expedientes;  select * from vitergy.cuotas order by ventana_inicio desc limit 10;
--
-- Retención (política de privacidad): los documentos se borran a los 90 días y la ficha al año si no hay contrato.
-- Las columnas `borrar_docs_en` y `borrar_ficha_en` ya están; la limpieza diaria que las usa es la tanda T4 (003).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE SCHEMA IF NOT EXISTS vitergy;
REVOKE ALL ON SCHEMA vitergy FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA vitergy TO service_role;

-- ─── Expedientes ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitergy.expedientes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  estado           text NOT NULL DEFAULT 'lead'
                   CHECK (estado IN ('lead', 'docs_pendientes', 'completo')),
  origen           text NOT NULL DEFAULT 'calculadora' CHECK (origen ~ '^[a-z0-9-]{1,60}$'),
  nombre           text NOT NULL CHECK (char_length(btrim(nombre)) BETWEEN 2 AND 80),
  email            text NOT NULL
                   CHECK (email = lower(btrim(email)) AND char_length(email) <= 120
                          AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$'),
  movil            text NOT NULL CHECK (movil ~ '^\+[0-9]{8,15}$'),
  -- Vía rápida (T3): quién es el titular y su IBAN. El IBAN va AES-256-GCM (clave derivada de EXPEDIENTE_SECRET);
  -- en claro solo se guardan los 4 últimos caracteres, para reconocerlo.
  tipo_titular     text CHECK (tipo_titular IN ('particular', 'empresa')),
  iban_cifrado     text,
  iban_ultimos4    text CHECK (iban_ultimos4 IS NULL OR iban_ultimos4 ~ '^[0-9A-Z]{4}$'),
  -- Lo que la persona confirmó de su factura y lo que el SERVIDOR calculó con ello (nunca cifras del navegador).
  datos_factura    jsonb,
  estudio          jsonb,
  sin_calculo      boolean NOT NULL DEFAULT false,
  -- Carpeta del almacén: 32 hex aleatorios (el nonce). Los nombres originales de los ficheros no se guardan en ningún sitio.
  carpeta          text NOT NULL UNIQUE CHECK (carpeta ~ '^[0-9a-f]{32}$'),
  ip_hash          text CHECK (ip_hash IS NULL OR ip_hash ~ '^[0-9a-f]{64}$'),
  privacidad_en    timestamptz NOT NULL DEFAULT now(),
  creado_en        timestamptz NOT NULL DEFAULT now(),
  actualizado_en   timestamptz NOT NULL DEFAULT now(),
  completado_en    timestamptz,
  -- Aviso a hola@vitergy.es: NULL = aún no ha salido (la limpieza diaria, T4, lo reintenta).
  aviso_lead_en    timestamptz,
  aviso_intentos   smallint NOT NULL DEFAULT 0,
  -- Retención: documentos 90 días, ficha 1 año (privacidad).
  borrar_docs_en   timestamptz NOT NULL DEFAULT now() + interval '90 days',
  borrar_ficha_en  timestamptz NOT NULL DEFAULT now() + interval '1 year',
  docs_borrados_en timestamptz
);
COMMENT ON TABLE vitergy.expedientes IS
  'Embudo de la factura de vitergy.es: una ficha por persona que dejó sus datos tras ver su ahorro. Datos personales: solo service_role. Documentos 90 días, ficha 1 año.';
CREATE INDEX IF NOT EXISTS expedientes_email_creado_idx ON vitergy.expedientes (email, creado_en DESC);
CREATE INDEX IF NOT EXISTS expedientes_creado_idx ON vitergy.expedientes (creado_en);
CREATE INDEX IF NOT EXISTS expedientes_aviso_pendiente_idx
  ON vitergy.expedientes (creado_en) WHERE aviso_lead_en IS NULL;
CREATE INDEX IF NOT EXISTS expedientes_borrar_docs_idx
  ON vitergy.expedientes (borrar_docs_en) WHERE docs_borrados_en IS NULL;
CREATE INDEX IF NOT EXISTS expedientes_borrar_ficha_idx ON vitergy.expedientes (borrar_ficha_en);

-- ─── Documentos del expediente ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitergy.expediente_documentos (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expediente_id     uuid NOT NULL REFERENCES vitergy.expedientes (id) ON DELETE CASCADE,
  tipo              text NOT NULL CHECK (tipo IN ('factura', 'dni_anverso', 'dni_reverso', 'cif')),
  -- Ruta DENTRO del bucket: «<carpeta>/<tipo>-<aleatorio>.<ext>». Sin nombre original, sin «..», sin barras raras.
  ruta              text NOT NULL UNIQUE
                    CHECK (ruta ~ '^[0-9a-f]{32}/[a-z0-9_-]{1,40}\.(pdf|jpg|jpeg|png|webp|heic|heif)$'),
  mime              text NOT NULL
                    CHECK (mime IN ('application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif')),
  bytes_declarados  integer CHECK (bytes_declarados IS NULL OR bytes_declarados BETWEEN 1 AND 10485760),
  bytes_comprobados integer CHECK (bytes_comprobados IS NULL OR bytes_comprobados BETWEEN 1 AND 10485760),
  estado            text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'subido', 'rechazado')),
  creado_en         timestamptz NOT NULL DEFAULT now(),
  subido_en         timestamptz,
  CONSTRAINT expediente_documentos_uno_por_tipo UNIQUE (expediente_id, tipo)
);
COMMENT ON TABLE vitergy.expediente_documentos IS
  'Ficheros de cada expediente en el bucket privado vitergy-expedientes. «subido» solo cuando el servidor ha comprobado que el objeto está en el almacén.';

-- ─── Cuotas (antiabuso) ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vitergy.cuotas (
  clave          text PRIMARY KEY CHECK (clave ~ '^[a-z0-9:_.-]{1,160}$'),
  ventana_inicio timestamptz NOT NULL DEFAULT now(),
  cuenta         integer NOT NULL DEFAULT 0
);
COMMENT ON TABLE vitergy.cuotas IS
  'Contadores del antiabuso por ventana fija (clave = «lectura:ip:<huella>:h», «lead:email:<huella>:d»…). La IP y el email solo como huella HMAC. Se limpian solos a los 2 días.';
CREATE INDEX IF NOT EXISTS cuotas_ventana_idx ON vitergy.cuotas (ventana_inicio);

ALTER TABLE vitergy.expedientes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitergy.expediente_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitergy.cuotas                ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA vitergy FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA vitergy TO service_role;

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

-- ─── 2 · Crear el expediente (y apuntar su factura, si la hay) ──────────────
-- Una sola transacción: ficha + fila de la factura en estado «pendiente». El fichero lo sube después el servidor y
-- marca «subido» con `vitergy_documento_estado`. La ruta tiene que colgar de la carpeta del propio expediente.
CREATE OR REPLACE FUNCTION public.vitergy_expediente_crear(
  p_nombre        text,
  p_email         text,
  p_movil         text,
  p_origen        text,
  p_datos_factura jsonb,
  p_estudio       jsonb,
  p_sin_calculo   boolean,
  p_ip_hash       text,
  p_carpeta       text,
  p_doc_ruta      text,
  p_doc_mime      text,
  p_doc_bytes     integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
DECLARE
  v_id uuid;
BEGIN
  IF p_doc_ruta IS NOT NULL AND left(p_doc_ruta, 33) <> p_carpeta || '/' THEN
    RAISE EXCEPTION 'vitergy_expediente_crear: la ruta del documento no cuelga de la carpeta del expediente';
  END IF;

  INSERT INTO vitergy.expedientes AS e
         (nombre, email, movil, origen, datos_factura, estudio, sin_calculo, ip_hash, carpeta)
  VALUES (btrim(p_nombre), p_email, p_movil, coalesce(p_origen, 'calculadora'), p_datos_factura, p_estudio,
          coalesce(p_sin_calculo, false), p_ip_hash, p_carpeta)
  RETURNING e.id INTO v_id;

  IF p_doc_ruta IS NOT NULL THEN
    INSERT INTO vitergy.expediente_documentos (expediente_id, tipo, ruta, mime, bytes_declarados)
    VALUES (v_id, 'factura', p_doc_ruta, p_doc_mime, p_doc_bytes);
  END IF;

  RETURN jsonb_build_object('id', v_id, 'carpeta', p_carpeta);
END
$function$;

-- ─── 3 · Estado de un documento (lo marca el servidor tras mirar el almacén) ─
CREATE OR REPLACE FUNCTION public.vitergy_documento_estado(
  p_expediente_id uuid,
  p_tipo          text,
  p_estado        text,
  p_bytes         integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
BEGIN
  UPDATE vitergy.expediente_documentos d
     SET estado            = p_estado,
         bytes_comprobados = CASE WHEN p_estado = 'subido' THEN p_bytes ELSE d.bytes_comprobados END,
         subido_en         = CASE WHEN p_estado = 'subido' THEN now() ELSE d.subido_en END
   WHERE d.expediente_id = p_expediente_id
     AND d.tipo = p_tipo;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('estado', 'no_existe');
  END IF;

  UPDATE vitergy.expedientes e SET actualizado_en = now() WHERE e.id = p_expediente_id;
  RETURN jsonb_build_object('estado', 'ok');
END
$function$;

-- ─── 4 · Aviso a hola@vitergy.es: salió / no salió ──────────────────────────
-- Cada intento suma uno. Si salió, queda la fecha; si no, `aviso_lead_en` sigue NULL y la limpieza diaria (T4) lo reintenta.
CREATE OR REPLACE FUNCTION public.vitergy_expediente_aviso(p_id uuid, p_ok boolean)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
BEGIN
  UPDATE vitergy.expedientes e
     SET aviso_intentos = least(e.aviso_intentos + 1, 32000),
         aviso_lead_en  = CASE WHEN p_ok THEN now() ELSE e.aviso_lead_en END,
         actualizado_en = now()
   WHERE e.id = p_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('estado', 'no_existe');
  END IF;
  RETURN jsonb_build_object('estado', 'ok');
END
$function$;

-- Solo el servidor (service_role) puede llamarlas. Supabase da EXECUTE a anon y authenticated por defecto en `public`:
-- se retira explícitamente.
REVOKE ALL ON FUNCTION public.vitergy_cuota(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_expediente_crear(text, text, text, text, jsonb, jsonb, boolean, text, text, text, text, integer)
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_documento_estado(uuid, text, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.vitergy_expediente_aviso(uuid, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.vitergy_cuota(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_expediente_crear(text, text, text, text, jsonb, jsonb, boolean, text, text, text, text, integer)
  TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_documento_estado(uuid, text, text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.vitergy_expediente_aviso(uuid, boolean) TO service_role;

-- ─── 5 · Bucket PRIVADO de los documentos ──────────────────────────────────
-- Privado (public = false): ni una URL pública. Se entra con la llave de servidor (subida de la factura desde el servidor)
-- o con URLs firmadas de vida corta (T3: DNI/CIF directos desde el móvil y descargas). 10 MB por fichero; solo PDF y
-- fotos. Si algún día alguien lo marca como público a mano, volver a ejecutar este fichero lo devuelve a privado.
-- Para un tipo no admitido o un fichero de más de 10 MB, Storage contesta HTTP 400 con el código real dentro del cuerpo.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vitergy-expedientes',
  'vitergy-expedientes',
  false,
  10485760,
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;
-- storage.objects tiene RLS; este bucket NO lleva ninguna policy: solo service_role y las URLs firmadas llegan a sus objetos.

NOTIFY pgrst, 'reload schema';
