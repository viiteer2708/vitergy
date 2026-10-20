# CLAUDE.md

Guía para trabajar en **Vitergy**. Léela antes de tocar código.

## Qué es

Landing/web de marca para **Vitergy** — asesoría energética independiente de Víctor Marrón, **100% online** (sin oficina física desde el 26-sep-2026); Molins de Rei sigue siendo la zona objetivo del SEO local (ver trampa 5). El objetivo del sitio es **captar clientes vía SEO** y empujarlos a contacto (WhatsApp / calculadora de ahorro). Es una web de marketing **estática** con herramientas dinámicas (precio de la luz hoy/mañana, calculadora de ahorro en `/contacto`, **test «¿Estás pagando la luz de más?»** en `/test-factura-luz`) y un chat de soporte con IA. El backend son API routes: el chat (`/api/chat`), las dos de la calculadora (`/api/factura/analizar`, `/api/factura/estudio`), el **acceso con código por email** (`/api/auth/*`) y las del test (`/api/test-factura-luz/*`). **Base de datos desde el 27-sep-2026**: un esquema propio `vitergy` dentro de la BD de DPC (ver [docs/acceso-con-codigo.md](docs/acceso-con-codigo.md)); no hay más zonas privadas.

Dominio en producción: `https://vitergy.es` · Desplegado en **Vercel** · `www.vitergy.es` redirige (308) a `vitergy.es` desde el 26-sep-2026 (antes daba error: apuntaba a un servidor antiguo). DNS en Hostinger: `@` A y `www` CNAME a Vercel; correo (MX/SPF/DKIM) en Hostinger.

## Stack

- **Next.js 16.1.6** (App Router) · **React 19.2.3** · **TypeScript 5**
- **Tailwind CSS v4** — configurado en CSS, no en JS. Los tokens viven en `@theme` dentro de [src/app/globals.css](src/app/globals.css). **No existe `tailwind.config.js`**; no lo crees.
- Fuentes: **Geist** / Geist Mono vía `next/font`.
- Alias de imports: `@/*` → `src/*` (ver [tsconfig.json](tsconfig.json)).

## Comandos

```bash
npm run dev      # desarrollo (localhost:3000)
npm run build    # build de producción
npm run start    # servir build
npm run lint     # eslint (eslint.config.mjs, flat config)
```

No hay tests configurados. No inventes un framework de tests salvo que se pida.

## Arquitectura

Todo cuelga de `src/app/` (App Router). Cada ruta = una carpeta con `page.tsx`. Categorías de páginas:

| Tipo | Ejemplos | Nº |
|---|---|---|
| Servicios | `estudio-factura-electrica`, `cambiar-compania-luz`, `autoconsumo-fotovoltaico`, … | 9 |
| Grandes consumos (B2B) | `grandes-consumos` (pilar) + `/gimnasios`, `/lavanderias-industriales`, `/clubs-de-padel`, `/centros-medicos` | 5 |
| Landing local (SEO) | `asesoria-energetica-barcelona`, `-cataluna`, `-espana` | 3 |
| Herramientas | `calculadora-consumo-electrico`, `precio-luz-hoy`, `precio-luz-manana` | 3 |
| Tests (pantalla completa) | `test-factura-luz` — ver [docs/tests-interactivos.md](docs/tests-interactivos.md) | 1 |
| Blog | `blog/` (listado) + 10 artículos originales en subcarpetas + artículos Markdown de `src/content/blog/` servidos por `blog/[slug]` | 11+ |
| Institucional | `page.tsx` (home), `sobre-mi`, `contacto`, `consultoria-energetica` | 4 |

- **Layout global** ([src/app/layout.tsx](src/app/layout.tsx)): monta `<Navbar/>`, `<Footer/>`, el **botón flotante de WhatsApp** (nº `633151083`, esquina inferior derecha), el **chat de soporte con IA** (`<ChatWidget/>`, esquina inferior izquierda) y los metadatos SEO base / OpenGraph. `lang="es"`. Todo eso va envuelto en `<MarcoWeb>`, que lo **esconde en las rutas `/test-…`** (tests a pantalla completa).
- **Componentes compartidos**: `Navbar`, `Footer` y `ChatWidget` en [src/components/](src/components/) (montados en el layout).
- **Componentes específicos de ruta**: conviven junto a su `page.tsx` (p. ej. `contacto/CalculadoraAhorro.tsx`, `calculadora-consumo-electrico/Calculadora.tsx`, `precio-luz-hoy/PrecioLuzHoyWidget.tsx`). **Este es el patrón a seguir** para UI de una sola página.
- **Excepción — `grandes-consumos/`**: las cuatro landings sectoriales comparten plantilla, así que el contenido vive en [sectores.ts](src/app/grandes-consumos/sectores.ts) (un objeto `Sector` por sector) y se renderiza con `SectorLanding.tsx`; los bloques comunes con la pilar están en `Bloques.tsx`. Para añadir un sector nuevo: entrada en `sectores.ts` + carpeta con `page.tsx` de 20 líneas + alta en `sitemap.ts`, `Navbar.tsx` y `Footer.tsx`.
- **Lógica compartida**: en [src/lib/](src/lib/) (p. ej. `precios-luz.ts`). Si una lógica la usan ≥2 rutas, va aquí, no duplicada inline.
- **SEO**: ver [docs/blog.md](docs/blog.md). [src/app/sitemap.ts](src/app/sitemap.ts) (páginas fijas por grupos de fecha + artículos del blog automáticos) y [src/app/robots.ts](src/app/robots.ts). Si añades una ruta indexable, **añádela también al sitemap** y dale su propia `alternates.canonical` (el layout ya no pone una global).

## Datos de precio de la luz

Las herramientas de precio llaman a la **API pública de REE** (`apidatos.ree.es`, serie PVPC) **desde el cliente** (`"use client"`, `fetch` en `useEffect`). No hay clave de API ni proxy.

Toda la lógica vive en [src/lib/precios-luz.ts](src/lib/precios-luz.ts) — **fuente única**: `fetchPrices(date)`, `parseREEResponse` (filtra la serie por título PVPC), `classifyPrices` (3 zonas: las 8 horas más baratas `cheap`, las 4 más caras `expensive`, resto `mid`), `getStats`, `formatPrice`, `zoneColors`, `zoneLabels`. Los widgets de ruta (`PrecioLuzHoyWidget`, `PrecioLuzMananaWidget`) **importan de aquí**. No vuelvas a duplicar esta lógica inline.

## Chat de soporte con IA

Burbuja flotante ([src/components/ChatWidget.tsx](src/components/ChatWidget.tsx), esquina inferior **izquierda** — la derecha es de WhatsApp) que habla con su API route, [src/app/api/chat/route.ts](src/app/api/chat/route.ts): un proxy hacia la **API de Gemini** (free tier de Google AI Studio, modelo `gemini-3.5-flash-lite`, cambiable con la env var `GEMINI_MODEL`).

- **La clave de la API (`GEMINI_API_KEY`) SOLO existe en el servidor**: env var en Vercel y en `.env.local` (gitignored). Jamás en código, jamás con prefijo `NEXT_PUBLIC_` — el repo es público.
- El system prompt, el modelo y `generationConfig` se fijan **en el servidor** (route.ts); nunca aceptar esos campos del cliente. El system prompt está anclado en el wiki (independencia, "análisis gratis, si no ahorro no cobro", nada de rankings de compañías ni cifras inventadas) — si cambias el mensaje de negocio, coteja con `wiki/projects/vitergy.md`.
- Protecciones en la route: tope de longitud, historial capado, rate limit best-effort por IP, check de Origin y mensajes de error amables (429 = cuota gratis agotada, se resetea a medianoche hora del Pacífico).
- **Conoce el blog**: en cada petición recibe la lista de artículos publicados y puede recomendar uno; la burbuja pinta los enlaces a vitergy.es como enlaces internos (ver [docs/blog.md](docs/blog.md)).
- Sin `GEMINI_API_KEY` configurada el chat responde 503 con un mensaje que redirige a WhatsApp — la web nunca se rompe por esto.

## Sistema de diseño

Tokens en `@theme` de [globals.css](src/app/globals.css). Úsalos, no hardcodees colores nuevos:

- Acento (naranja): `#f97316` · Oscuro (texto/secciones): `#1f2942` · Tinte: `#fff7ed` · Fondo: `#fefefe`
- Estilo: SaaS limpio, inspirado en Polaroo (ver historial git). Mobile-first, Tailwind utility-first.

## ⚠️ Trampas (importante)

1. **La calculadora de ahorro (`/contacto`) es el embudo de la factura** (T1+T2, publicado el 20-oct-2026). [contacto/CalculadoraAhorro.tsx](src/app/contacto/CalculadoraAhorro.tsx): subir factura (Gemini lee los datos, `/api/factura/analizar`, con Turnstile) o teclearlos a mano → el usuario los confirma → **ve su ahorro SIN dar ningún dato** (`/api/factura/estudio`) → «Quiero empezar a ahorrar»: nombre + email + móvil (`/api/factura/lead`, con Turnstile) → aviso a `hola@vitergy.es` por Altavoz con la **factura adjunta**. **REGLAS DE NEGOCIO (Victor, 20-oct-2026; sustituyen al dictamen del 2-ago):** solo se compara con **NET FIJO** (las 9 fijas «FIJO …») y **GANA** (ONLINE y TRAMOS, solo 2.0TD), con los precios cargados en el Supabase de DPC; gana siempre el **mayor ahorro**; si no hay ahorro, se le dice; la **compañía y el producto NUNCA llegan al navegador** (se le dicen al firmar), solo van en el aviso a hola@. **Las facturas NO se guardan en ningún sitio** («opción 2» de Victor, 20-oct): el aviso es el único registro. En la BD de DPC solo hay contadores antiabuso ([db/002_cuotas.sql](db/002_cuotas.sql)). Motor: [src/lib/estudio-ahorro.ts](src/lib/estudio-ahorro.ts), réplica simplificada del de DPC; si hay prórroga fiscal del RDL 7/2026, actualizar sus constantes cotejando con `dpc-comparador/src/lib/calculations/taxes.ts`.
2. **`next.config.ts`** solo permite imágenes remotas de `images.unsplash.com`. Para otros dominios externos, añádelos a `remotePatterns`.
3. `.env.local` contiene `VERCEL_OIDC_TOKEN` (lo genera Vercel CLI), `GEMINI_API_KEY` (chat + lector de facturas), `DPC_SUPABASE_URL` + `DPC_SUPABASE_SERVICE_ROLE_KEY` (precios para la calculadora y el esquema `vitergy` del test — ⚠️ llave maestra de la BD de DPC, SOLO server-side), `BREVO_API_KEY` + `BREVO_SENDER_EMAIL` (+ opcionales `BREVO_LIST_ID`, `LEAD_TO_EMAIL`, `GEMINI_MODEL_FACTURA`) y `AUTH_SECRET` (firma las sesiones del acceso con código; cambiarlo cierra todas). Todas también en las env vars de Vercel. `.env*` está gitignored — nunca lo commitees.
4. **Este repo es PÚBLICO en GitHub.** Las propuestas y estudios de clientes (PDFs con NIF, CUPS, direcciones y consumos) pueden vivir en el directorio de trabajo pero JAMÁS en un commit — el `.gitignore` ya excluye `/*.pdf`, `/propuestas/`, `/estudios/` y `/facturas/`. Antes de commitear, comprueba que ningún dato de cliente se cuela.
5. **Negocio 100% online: SIN dirección física (decisiones de Victor, 26-sep-2026).** La web no publica calle, mapa ni coordenadas, ni promete atención presencial ni «oficina». El schema `LocalBusiness` lleva solo el municipio (Molins de Rei, Barcelona, ES: el del domicilio social y la zona SEO), sin `streetAddress`, `postalCode` ni `geo`. Única excepción: el aviso legal y la privacidad muestran el **domicilio social** inscrito de la S.L. (Carrer de Ferran Agulló 6, Molins de Rei) porque lo exige la LSSI (art. 10) — no lo quites ni lo copies al resto de la web. **Molins de Rei sigue siendo la zona SEO** (títulos, H1, metas, `areaServed`, tagline del pie). Horario de atención: lunes a jueves 9:00–17:00 y viernes 9:00–14:00. Email público y de avisos: **`hola@vitergy.es`** — `info@vitergy.es` NO existe (rebota desde el 1-ago-2026 y Brevo lo tiene en su lista de bloqueados).
6. **La base de datos de la web vive DENTRO de la de DPC**, en el esquema `vitergy` (decisión de Victor, 27-sep-2026: 0 €). Se entra solo por las funciones `public.vitergy_*` con la llave de servidor; el SQL está en `db/` y se aplica a mano, **nunca** con las migraciones numeradas de DPC. No toques tablas de DPC desde aquí.
7. **Antispam de los formularios (20-oct-2026, tras leads falsos de robots en la calculadora).** [api-guardas.ts](src/lib/api-guardas.ts): todo POST sin `Origin` o con Origin ajeno → 403 (los navegadores siempre lo mandan) · el señuelo `web` delata al robot si viene relleno **o si falta** (`senueloDelata`: los formularios nuevos deben mandarlo siempre, vacío). [email-desechable.ts](src/lib/email-desechable.ts): rechaza emails de usar y tirar por lista **y** por su servidor de correo (DNS), y dominios que no reciben correo; si el DNS no contesta, acepta. La lista se regenera con `node scripts/actualizar-desechables.mjs` (lee `/root/.brevo-vigia-desechables.txt`, que Altavoz refresca los lunes). Cada rechazo deja una línea `[guardas]`/`[estudio]`/`[acceso]` en los logs de Vercel (solo el dominio del email).
8. **Lint de React estricto** (`eslint-plugin-react-hooks` 7): prohíbe cambiar estado directamente dentro de un `useEffect`, leer `ref.current` al pintar y llamar a `Date.now()` al pintar. Cambia el estado en eventos, temporizadores o respuestas de `fetch`.

## 📮 Correo por Altavoz (14-oct-2026)
Brevo se quedó sin créditos el 7-oct-2026 y contestaba 201 SIN enviar (Victor lo da de baja): el código de acceso y el
**aviso de cada lead de la calculadora** se perdían en silencio. `enviarEmail` (`src/lib/brevo.ts`) manda por **Altavoz**
(`POST /api/v1/avisos`) si está `ALTAVOZ_AVISOS_KEY` (clave «vitergy», copia en `/root/.altavoz-api-vitergy.key`); el
remitente lo pone la clave: «Vitergy» `hola@vitergy.es` (dominio **vitergy.es dado de alta y verificado en Amazon** el
14-oct, 5 DNS en Hostinger). El aviso del lead (`/api/factura/estudio`) también va por ahí, con «responder a» = el lead.
**Sigue en Brevo** el alta en la lista 488 «VITERGY» (casilla de novedades): la API de Altavoz no admite consentimientos de
publicidad y esa lista está archivada en Altavoz desde el 2-oct (decisión pendiente de Victor). Sin la clave, todo Brevo.

## Cómo trabajar aquí (guía de comportamiento)

Principios de Karpathy aplicados a este repo:

- **Piensa antes de codear.** Si una petición admite varias interpretaciones (sobre todo en copy/SEO), exponlas en vez de elegir en silencio. Si algo no está claro, pregunta.
- **Simplicidad primero.** Es una web de marketing, no una app. Nada de abstracciones, "configurabilidad" ni state management que no se haya pedido. El patrón vigente es: página + componentes de ruta locales.
- **Cambios quirúrgicos.** Toca solo lo que pide la tarea. Respeta el estilo existente aunque lo harías distinto. Si ves código muerto o sin usar, **menciónalo, no lo borres** salvo que te lo pidan.
- **Criterio de hecho verificable.** Tras un cambio, deja claro cómo comprobarlo: `npm run build` sin errores, `npm run lint` limpio, y la ruta afectada renderiza en `npm run dev`. Para cambios de SEO, confirma que `sitemap.ts` sigue coherente.

## Skills del proyecto

Especialistas que se activan solos según lo que se pida (viven en `.claude/skills/`):

- `blog-seo` — el blog (artículos en Markdown, programados por fecha) y el SEO técnico de la web (sitemap, robots, canonical, tarjetas al compartir, fichas JSON-LD, Search Console).
- `tests-interactivos` — los tests (hoy `/test-factura-luz`: preguntas, perfiles, resultados, cifras de quién lo hace) y el acceso con código por email que los guarda (cuentas, suscriptores, «no me llega el código»), más el catálogo de bloques interactivos.
- `arquitecto` — al terminar una función nueva (o cuando Victor pregunte qué mejorar o qué conectar), escanea lo montado y propone de 1 a 3 conexiones entre piezas que valgan dinero o tiempo; lo que no se haga en el momento va a `mejoras.md` (raíz del repo). En este repo lo montado está en `docs/` y en este `CLAUDE.md`. Copiada tal cual de Gnew (26-sep-2026).

## Conocimiento (Segundo Cerebro)

Wiki persistente de Victor: `C:\Users\Victor\Documents\VITER VAULT\_Wiki\` — índice en
`_Wiki\index.md`, contrato en `_Wiki\CLAUDE.md`. Antes de trabajo de SEO, copy o negocio,
lee las páginas de este repo:

- `wiki/projects/vitergy.md` — el proyecto
- `wiki/concepts/estrategia-maestra-seo-vitergy.md` · `wiki/concepts/contenido-seo-vitergy.md`
- `wiki/concepts/seo-local.md` · `wiki/concepts/google-business-profile.md`
- `wiki/syntheses/roadmap-ejecucion-vitergy-q2-2026.md`

Ancla todo claim de negocio en una página del wiki; si no existe página, dilo.
