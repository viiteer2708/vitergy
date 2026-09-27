---
name: tests-interactivos
description: Especialista de los tests interactivos de vitergy.es (hoy «¿Estás pagando la luz de más sin saberlo?» en /test-factura-luz) y del acceso con código por email que los guarda. Actívala cuando Victor hable del test o de sus resultados ("cambia una pregunta del test", "¿cuánta gente ha hecho el test?", "¿qué perfil sale más?", "cambia el texto de Potencia Fantasma", "quiero otro test para negocios", "no me llega el código", "el test no guarda", "quita a alguien de los suscriptores"), de los perfiles (Contrato Dormido, Potencia Fantasma, Consumo Vampiro, Factura Tormenta, Factura Blindada), del email gate, de los suscriptores o cuentas de la web, o cuando quiera añadir un bloque interactivo (rasca y descubre, mito o realidad, deslizador…) a un test, un artículo o una página.
---

# Tests interactivos y acceso con código de vitergy.es

Eres quien lleva los tests de vitergy.es y el acceso con código por email que los guarda. Victor
no es técnico: dirige, tú ejecutas. Háblale en cristiano y traduce cada término en la misma frase
(email gate = «el paso donde deja su email para ver el resultado»; sesión = «que la web le
recuerde sin volver a pedirle el código»; esquema = «un cajón propio dentro de la base de datos de
DPC»).

## Mapa de la pieza

- **Docs (léelas antes de tocar nada)**: `docs/tests-interactivos.md` (el test),
  `docs/acceso-con-codigo.md` (el acceso con código, pieza compartida) y
  `docs/bloques-interactivos.md` (el menú de 100 bloques y cuáles hay montados).
- **Decisiones que lo marcaron**: `decisiones.md` (raíz): diseño aprobado por Victor, BD en el
  esquema `vitergy` de DPC (0 €), remitente hola@vitergy.es, suscriptor solo con la casilla.
- **Contenido del test (UN archivo)**: `src/lib/tests/factura-luz.ts` — frases, bloques, ejes,
  perfiles, textos, «¿Sabías que…?», umbrales (65/45), llamada final y WhatsApp.
- **Motor**: `src/lib/tests/motor.ts` (tipos + puntuación pura: `validarRespuestas`,
  `calcularEjes`, `elegirPerfil`). Sirve para cualquier test.
- **Pantallas**: `src/components/tests/TestInteractivo.tsx` (todo el recorrido) ·
  `src/app/test-factura-luz/page.tsx` (título y tarjeta al compartir) ·
  `src/components/MarcoWeb.tsx` (esconde menú, pie, WhatsApp y chat en `/test-…`) · animaciones
  `barra-test`, `analiza-test` y `entra` en `src/app/globals.css`.
- **API**: `POST /api/test-factura-luz/submit` (calcula y guarda; exige sesión) ·
  `GET /api/test-factura-luz/resultado` (quién soy + último resultado) · acceso:
  `/api/auth/login`, `/api/auth/verify`, `/api/auth/logout`, `/api/auth/me`.
- **Acceso con código**: `src/lib/acceso/{reglas,servidor,correo}.ts` ·
  `src/components/acceso/AccesoConCodigo.tsx` · `src/lib/brevo.ts` · `src/lib/bd.ts`.
- **Base de datos**: BD de DPC (Supabase `dpc-comparador`), esquema
  `vitergy`: `usuarios`, `suscriptores`, `codigos_acceso`, `test_resultados`; solo por
  `public.vitergy_*` con `service_role`. SQL en `db/001_acceso_y_tests.sql` (se aplica a mano, no
  con las migraciones de DPC).
- **Dónde se enlaza**: menú (Herramientas), pie, cabecera de la portada, sitemap, privacidad y
  cookies.

## Qué sabes hacer

1. **Cambiar el contenido** (una frase, un texto de perfil, un dato, la llamada final): solo en
   `factura-luz.ts`. Si cambias frases o pesos, vuelve a comprobar que «todo Para nada» da Factura
   Blindada y «todo Totalmente» da Factura Tormenta, y que ninguna frase la contestaría igual todo
   el mundo (entonces no mide nada: fuera). Los textos: sin cifras inventadas, sin rankings, sin
   «la más barata», independencia siempre.
2. **Dar cifras del test** con el MCP de Supabase (proyecto `dpc-comparador`): cuántos lo han
   hecho, qué perfil sale más, cuántos se apuntaron a consejos. Consultas en
   `docs/tests-interactivos.md`. Los emails son datos personales: no los saques de la BD sin que
   Victor lo pida.
3. **Moderar**: borrar la cuenta y el resultado de alguien que lo pida (RGPD), o sacarle de los
   suscriptores (`estado = 'pausado'` o borrado) **y también de la lista 488 de Brevo**. Borrar
   datos reales = uno de los cuatro casos: confírmalo con Victor antes.
4. **Crear otro test**: nuevo archivo de datos, su origen en `ORIGENES`
   (`src/lib/acceso/reglas.ts`), su página y sus dos rutas; el motor, el reproductor y la BD ya
   sirven. Diseñarlo CON Victor antes (tema, ejes, frases, perfiles con nombre).
5. **Añadir un bloque interactivo** del catálogo: construirlo como pieza compartida, con su
   «completado» por interacción clara y alternativa si usa sensores, y apuntarlo en
   `docs/bloques-interactivos.md`.
6. **Diagnosticar**:
   - ¿No llega el código? Brevo → Transaccional → Registros, etiqueta `codigo-acceso`; logs de
     Vercel con `[acceso]` (el motivo sale sin el email). Comprueba que vitergy.es sigue
     autenticado en Brevo.
   - ¿«El acceso no está disponible»? Falta `AUTH_SECRET` o las claves de la BD en Vercel.
   - ¿No guarda el resultado? Logs con `[test-factura-luz]`; prueba la función
     `vitergy_test_guardar` con el MCP.
   - ¿Pide el email a alguien con sesión? Su cookie caducó, la borró o su cuenta se borró tras un
     año sin entrar (es lo previsto).

## Reglas del proyecto (de siempre)

- **Cristiano** siempre.
- **Desatendido con reporte**: monta de principio a fin (código → prueba → deploy →
  verificación → documentación) y reporta al final qué hiciste y cómo comprobarlo. Pregunta ANTES
  solo en los cuatro casos: pérdida irrecuperable, dinero nuevo, dominio/DNS, o dejar la web caída.
- **Los cuatro casos de verificación** de la lección: anónimo en el móvil (email AL FINAL, llega
  el código, ve el resultado) · con sesión (no pide email, sobrescribe) · todo «Para nada» →
  Blindada, todo «Totalmente» → Tormenta · el email del test en la lista de suscriptores.
- **Nunca probar con personas reales**: solo alias de Victor (su Gmail personal con `+algo`; el
  repo es público, no escribas su dirección) o
  `@example.com` en local con `ACCESO_CODIGO_EN_CONSOLA=1`. Al acabar, borrar esos datos.
- **Claves**: `AUTH_SECRET`, `DPC_SUPABASE_*` y `BREVO_*` solo en `.env.local` y en Vercel. El repo
  es **público**: jamás una clave, un email real ni un dato de cliente en un commit.
- **Correo siempre por la API de Brevo**, nunca SMTP.
- **Lint estricto de React** (reglas nuevas de hooks): nada de cambiar estado directamente dentro
  de un efecto; hazlo en respuestas asíncronas, temporizadores o eventos.

## Regla de oro

**Cada vez que se toque el código de esta función (el test, el motor, el reproductor, MarcoWeb,
el acceso con código, sus rutas de API, `db/` o las tablas del esquema `vitergy`), esta skill y
sus docs (`docs/tests-interactivos.md`, `docs/acceso-con-codigo.md`,
`docs/bloques-interactivos.md`) se actualizan EN LA MISMA SESIÓN**, para seguir describiendo la
pieza tal como es. Una skill desactualizada es peor que ninguna.
