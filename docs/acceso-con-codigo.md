# Acceso con código por email (pieza compartida)

Montado el 27-sep-2026 como base del [test de la factura](tests-interactivos.md). Es la versión
mínima de la lección del curso «Suscriptores + login sin contraseñas», que en vitergy.es no
existía: **cualquier función futura que necesite saber quién es el visitante (una zona privada,
otro test, una descarga) reutiliza esto tal cual; no se monta otro login.**

## Qué hace

1. El visitante escribe su email, acepta la privacidad (casilla obligatoria, nunca premarcada) y,
   si quiere, marca «consejos por email» (opcional).
2. Le llega un correo de **Vitergy <hola@vitergy.es>** con un código de 6 cifras. Caduca a los 10
   minutos y sirve una sola vez.
3. Lo teclea en 6 casillas (o lo pega, o el móvil lo autocompleta) y queda dentro: una sesión
   de 365 días en una cookie que el navegador no deja leer a nadie (`httpOnly`).

La primera vez que alguien verifica su email se le crea la cuenta. Si marcó la casilla de
consejos, además entra en la lista de correo (tabla `suscriptores` + lista 488 de Brevo).

## Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| Reglas puras (cifras, caducidad, topes, orígenes, cookies) | [src/lib/acceso/reglas.ts](../src/lib/acceso/reglas.ts) |
| Criptografía y sesión (servidor) | [src/lib/acceso/servidor.ts](../src/lib/acceso/servidor.ts) |
| El correo del código | [src/lib/acceso/correo.ts](../src/lib/acceso/correo.ts) |
| Brevo por API (correos y alta en la lista) | [src/lib/brevo.ts](../src/lib/brevo.ts) |
| Llamadas a la base de datos | [src/lib/bd.ts](../src/lib/bd.ts) |
| El formulario (email → 6 casillas) | [src/components/acceso/AccesoConCodigo.tsx](../src/components/acceso/AccesoConCodigo.tsx) |
| API | `POST /api/auth/login` · `POST /api/auth/verify` · `POST /api/auth/logout` · `GET /api/auth/me` |
| Base de datos | [db/001_acceso_y_tests.sql](../db/001_acceso_y_tests.sql) |

## La base de datos (esquema `vitergy` dentro de la BD de DPC)

Decisión de Victor (27-sep-2026): **0 €** en vez de un proyecto nuevo de Supabase (~10 $/mes). Las
tablas viven en la base de datos de DPC (proyecto `dpc-comparador`, UE), pero en un **esquema
propio, `vitergy`**, que:

- **no está expuesto en la API de Supabase**: ni con la clave pública de DPC se puede leer nada;
- solo se toca por 4 funciones `public.vitergy_*` que únicamente puede ejecutar `service_role`
  (la llave de servidor que la calculadora ya usaba, `DPC_SUPABASE_SERVICE_ROLE_KEY`);
- no toca ninguna tabla de DPC, ni DPC toca las suyas.

| Tabla | Para qué |
|---|---|
| `vitergy.usuarios` | Cuentas: email verificado, alta y último acceso. **Se borran solas tras 365 días sin actividad** (con sus resultados). |
| `vitergy.suscriptores` | La lista de correo propia, SOLO con la casilla de consejos marcada. Separada de `usuarios` a propósito. |
| `vitergy.codigos_acceso` | Cada petición de código: solo su huella HMAC, intentos, caducidad. Se borran a los 2 días. |
| `vitergy.test_resultados` | Último resultado de cada persona en cada test (ver [tests-interactivos.md](tests-interactivos.md)). |

El SQL **se aplica a mano** (editor SQL de Supabase o MCP `execute_sql`), fuera del historial de
migraciones de DPC, y es idempotente. Si se cambia, se añade `db/002_….sql` y se apunta aquí.

## Seguridad (patrón copiado de Gnew, que pasó revisión adversarial)

- El código **nunca** se guarda: solo su huella HMAC-SHA256 con el secreto `AUTH_SECRET`, y el id
  de la petición entra en la huella. La IP tampoco se guarda en claro (solo su huella, para contar).
- **5 intentos por código**, contados en la base de datos (no en una cookie, que se reenvía con el
  contador a cero). La cookie `vitergy_codigo` solo liga el navegador con SU petición.
- **Topes con cerrojo** en la BD (`vitergy_codigo_preparar`): 5 códigos por email cada 15 min, 10 al
  día, 15 fallos al día y 30 peticiones por IP cada hora. Un código nuevo anula los anteriores.
- Freno rápido en memoria por IP en las rutas, comprobación de `Origin` y señuelo anti-bots
  (campo oculto `web`).
- Sesión: JWT HS256 (librería `jose`) en la cookie `vitergy_sesion`: `httpOnly`, `secure`,
  `sameSite=lax`, 365 días. Del mismo secreto salen dos claves distintas: una firma sesiones y
  otra hace huellas.

## Claves

- `AUTH_SECRET` (mínimo 32 caracteres): en `.env.local` y en Vercel (Production y Preview).
  **Cambiarlo cierra todas las sesiones** y anula los códigos pendientes; nada más.
- Usa las que ya había: `DPC_SUPABASE_URL`, `DPC_SUPABASE_SERVICE_ROLE_KEY` y `BREVO_API_KEY`
  (+ `BREVO_LIST_ID`, opcional, que por defecto es la 488).
- Sin `AUTH_SECRET` o sin la BD, las rutas responden 503 con un mensaje que manda a WhatsApp: la
  web no se cae.

## Correo

- **Todo sale por la API HTTPS de Brevo, jamás por SMTP** (regla de la lección). Remitente
  `Vitergy <hola@vitergy.es>`. Etiqueta en Brevo: `codigo-acceso`.
- **vitergy.es autenticado en Brevo el 27-sep-2026**: 2 registros TXT añadidos en el DNS de
  Hostinger (DKIM en `mail._domainkey` y `brevo-code` en la raíz, sin tocar SPF, MX ni los de
  Google). Comprobado en producción: el código llega de `hola@vitergy.es` a la bandeja de entrada.
  Si algún día Brevo lo desautentica, el correo sigue llegando pero con remitente
  `hola@1885574.brevosend.com`: se arregla revisando esos 2 registros y pulsando «autenticar».
- **Pruebas en local sin enviar correos**: `ACCESO_CODIGO_EN_CONSOLA=1 npx next dev -p 3007 -H
  127.0.0.1` → el código sale en la consola. En producción esa variable se ignora siempre.
- **Nunca probar con emails de personas reales** (ley de Victor, 14-sep-2026): solo sus alias
  (su Gmail personal con `+algo` delante de la arroba) o `@example.com` en local. Este repo es
  público: su dirección no se escribe aquí.

## Diferencias con la lección (y por qué)

| Lección | vitergy.es | Por qué |
|---|---|---|
| Turso + migraciones | Esquema `vitergy` en la BD de DPC | Decisión de Victor: 0 €. Aislado del resto |
| Resend | Brevo por API | Ya contratado; la regla de fondo (nunca SMTP) se cumple |
| Todo verificado = suscriptor | Suscriptor solo con la casilla de consejos | LSSI art. 21 y RGPD 7.4; mismo criterio que la calculadora |
| Contador de intentos en el JWT | En la BD | Una cookie se puede reenviar con el contador a cero |
| `users.name` y `users.role` | No existen aún | Nada los usa; se añaden cuando una lección los pida |
| Página `/login` + modal + middleware | Solo el formulario, dentro del test | No hay zonas privadas todavía. Cuando las haya: página `/login` con `AccesoConCodigo` y un `proxy.ts` (el middleware de Next 16) que mire la cookie |

## Cómo comprobarlo

- Consulta (MCP de Supabase, proyecto `dpc-comparador`):
  `select count(*) from vitergy.usuarios;` · `select * from vitergy.suscriptores order by creado_en desc limit 10;`
- ¿No llega un código? Brevo → Transaccional → Registros, etiqueta `codigo-acceso`. En Vercel, busca
  `[acceso]` en los logs (el motivo sale sin el email: `limite_15min`, `limite_ip`…).
- Apagar el acceso sin desplegar: borrar `AUTH_SECRET` en Vercel y redesplegar. Las pantallas
  dirán «no disponible, escríbenos por WhatsApp».
