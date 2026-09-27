# Tests interactivos · «¿Estás pagando la luz de más sin saberlo?»

Montado el 27-sep-2026 siguiendo la lección del curso «Test interactivo con resultados»
(`temp/funcion-tests-interactivos.md`), adaptada a vitergy.es. Skill que lo gestiona:
[.claude/skills/tests-interactivos/SKILL.md](../.claude/skills/tests-interactivos/SKILL.md).
Diseño aprobado por Victor: [decisiones.md](../decisiones.md).

## Para qué sirve

Es el imán de contactos para **quien todavía no tiene la factura a mano**: la calculadora de
`/contacto` pide subirla, y el test no. La gente lo empieza por curiosidad («¿pago de más?»), deja
el email al final porque el resultado ya está a un clic, y el resultado la empuja a la calculadora
o al WhatsApp con su perfil ya escrito en el mensaje.

Dirección: **https://vitergy.es/test-factura-luz** · enlazado desde el menú (Herramientas), el pie,
la cabecera de la portada («¿Sin la factura a mano? Haz el test») y el sitemap.

## Cómo es

- **Pantalla completa**: sin menú, pie, WhatsApp flotante ni chat. Lo hace
  [src/components/MarcoWeb.tsx](../src/components/MarcoWeb.tsx), que esconde todo eso en cualquier
  ruta que empiece por `/test-`.
- **Recorrido**: intro → 3 bloques (entrada del bloque 2,2 s → 5 preguntas → mini-recompensa con un
  «¿Sabías que…?» 2,5 s) → «Analizando tus respuestas…» 3,6 s → **email gate solo si no hay sesión**
  → resultado. Las pantallas de paso se saltan tocando; las preguntas avanzan solas 0,4 s después
  de responder, con «← Atrás» y las teclas 1-5 en ordenador.
- **Escala** de 5: Para nada · Poco · A medias · Bastante · Totalmente (valor 0-4). Todas las frases
  puntúan en el mismo sentido: más de acuerdo = más fuga.
- **Resultado**: emoji + nombre del perfil + lema, barras de 0 a 100 por eje (colores validados para
  daltonismo), 3 párrafos, un «leer más» a su artículo o herramienta, la llamada a la calculadora,
  el WhatsApp con el perfil escrito, **Compartir** (menú de compartir del móvil o copiar enlace) y
  **Repetir**. El aviso «test orientativo» sale en la intro y en el resultado.
- **Si se recarga la página** con las 15 respuestas dadas (p. ej. al ir a mirar el correo), se
  retoma en el email gate, y el formulario vuelve directamente a las 6 casillas del código.

## Los 3 ejes, las 15 frases y los 5 perfiles

Todo el contenido vive en **un solo archivo**: [src/lib/tests/factura-luz.ts](../src/lib/tests/factura-luz.ts).
Cambiar una frase, un texto de perfil o un dato es tocar solo ese archivo.

| Eje | Mide | Frases (peso) |
|---|---|---|
| Contrato | Lo que pagas por kWh y los extras | 1-4 (1) · 5 (0,5) · 9 y 10 (0,5) |
| Potencia | Los kW que pagas cada día | 5 (0,5) · 6-10 (1) · 15 (0,5) |
| Hábitos | Cuándo y cómo gastas | 11-15 (1) |

Perfiles: 😴 Contrato Dormido · 👻 Potencia Fantasma · 🧛 Consumo Vampiro (el del eje que más
pesa) · 🌪️ Factura Tormenta (los tres ≥ 65) · 🛡️ Factura Blindada (los tres < 45). Si dos ejes
empatan arriba, gana el primero (contrato > potencia > hábitos).

## Puntuación y guardado

- **Motor**: [src/lib/tests/motor.ts](../src/lib/tests/motor.ts), funciones puras
  (`validarRespuestas`, `calcularEjes`, `elegirPerfil`). Cada eje = lo sumado ÷ lo máximo posible ×
  100. Sirve para cualquier test futuro: un test nuevo es solo otro archivo de datos.
- **El resultado lo calcula el servidor**: `POST /api/test-factura-luz/submit` recibe las 15
  respuestas, exige sesión, valida, calcula y guarda. El navegador nunca manda el resultado.
- `GET /api/test-factura-luz/resultado`: quién soy y mi último resultado (para saltarse el email
  gate y ofrecer «Ver mi resultado» en la intro).
- **Tabla** `vitergy.test_resultados` (esquema propio dentro de la BD de DPC, ver
  [acceso-con-codigo.md](acceso-con-codigo.md)): `usuario_id`, `test` (`factura-luz`),
  `respuestas`, `ejes`, `perfil`, fechas. **Uno por persona y test: repetir sobrescribe.**
- **Email gate**: el acceso con código compartido, origen `test-factura-luz`. Quien marca la
  casilla de consejos entra en la tabla `suscriptores` y en la lista 488 de Brevo.

## Cómo comprobarlo (lo que pide la lección)

1. Abre `/test-factura-luz` en el móvil y hazlo entero como anónimo: te pide el email **al
   final**, te llega el código y ves tu resultado.
2. Hazlo otra vez con la sesión abierta: **no** te pide email y el resultado nuevo sustituye al
   anterior (la intro te enseña «La última vez te salió…»).
3. Todo «Para nada» → 🛡️ Factura Blindada. Todo «Totalmente» → 🌪️ Factura Tormenta.
4. Si marcaste la casilla de consejos, tu email está en la lista de suscriptores:
   `select * from vitergy.suscriptores order by creado_en desc limit 5;` y en la lista 488 de Brevo.

Consultas útiles (MCP de Supabase, proyecto `dpc-comparador`):

```sql
-- Cuántos hay por perfil
select perfil, count(*) from vitergy.test_resultados where test = 'factura-luz' group by 1 order by 2 desc;
-- Los últimos, con su email
select u.email, r.perfil, r.ejes, r.actualizado_en
  from vitergy.test_resultados r join vitergy.usuarios u on u.id = r.usuario_id
 order by r.actualizado_en desc limit 20;
```

## Pruebas automáticas

- Puntuación: script con `tsx` sobre `motor.ts` + `factura-luz.ts` (casos «todo bajo», «todo
  alto», empates, respuestas inválidas). No hay framework de tests en el repo a propósito.
- Recorrido completo: Playwright contra `ACCESO_CODIGO_EN_CONSOLA=1 npx next dev -p 3007 -H
  127.0.0.1`, con `prueba-local@example.com`. Al terminar: matar el servidor y borrar ese email de
  `vitergy.usuarios`, `vitergy.codigos_acceso` y `vitergy.suscriptores`.

## Cómo crece

- **Más tests** (p. ej. uno para negocios: contrato, excesos de potencia, energía reactiva): copiar
  `factura-luz.ts` con otro contenido, añadir su origen en `ORIGENES` de
  `src/lib/acceso/reglas.ts`, su página `src/app/test-<slug>/page.tsx` y sus dos rutas de API.
- Radar con más ejes, páginas de resultado compartibles por perfil con su propia imagen, meter a
  quien termina en una secuencia de emails según su perfil, enviar el resultado por correo: ver
  `mejoras.md`.
- Los bloques interactivos que se pueden añadir a un test, a un artículo o a cualquier página:
  [bloques-interactivos.md](bloques-interactivos.md).
