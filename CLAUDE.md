# CLAUDE.md

Guía para trabajar en **Vitergy**. Léela antes de tocar código.

## Qué es

Landing/web de marca para **Vitergy** — asesoría energética independiente en Molins de Rei (Víctor). El objetivo del sitio es **captar clientes vía SEO** y empujarlos a contacto (WhatsApp / calculadora de ahorro). Es una web de marketing **estática** con herramientas dinámicas (precio de la luz hoy/mañana, calculadora de ahorro en `/contacto`) y un chat de soporte con IA. No hay base de datos ni autenticación; el backend son 3 API routes: el chat (`/api/chat`) y las dos de la calculadora (`/api/factura/analizar`, `/api/factura/estudio`).

Dominio en producción: `https://vitergy.es` · Desplegado en **Vercel**.

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
| Blog | `blog/` (índice) + 10 artículos en subcarpetas | 11 |
| Institucional | `page.tsx` (home), `sobre-mi`, `contacto`, `consultoria-energetica` | 4 |

- **Layout global** ([src/app/layout.tsx](src/app/layout.tsx)): monta `<Navbar/>`, `<Footer/>`, el **botón flotante de WhatsApp** (nº `633151083`, esquina inferior derecha), el **chat de soporte con IA** (`<ChatWidget/>`, esquina inferior izquierda) y los metadatos SEO base / OpenGraph. `lang="es"`.
- **Componentes compartidos**: `Navbar`, `Footer` y `ChatWidget` en [src/components/](src/components/) (montados en el layout).
- **Componentes específicos de ruta**: conviven junto a su `page.tsx` (p. ej. `contacto/ContactoForm.tsx`, `calculadora-consumo-electrico/Calculadora.tsx`, `precio-luz-hoy/PrecioLuzHoyWidget.tsx`). **Este es el patrón a seguir** para UI de una sola página.
- **Excepción — `grandes-consumos/`**: las cuatro landings sectoriales comparten plantilla, así que el contenido vive en [sectores.ts](src/app/grandes-consumos/sectores.ts) (un objeto `Sector` por sector) y se renderiza con `SectorLanding.tsx`; los bloques comunes con la pilar están en `Bloques.tsx`. Para añadir un sector nuevo: entrada en `sectores.ts` + carpeta con `page.tsx` de 20 líneas + alta en `sitemap.ts`, `Navbar.tsx` y `Footer.tsx`.
- **Lógica compartida**: en [src/lib/](src/lib/) (p. ej. `precios-luz.ts`). Si una lógica la usan ≥2 rutas, va aquí, no duplicada inline.
- **SEO**: [src/app/sitemap.ts](src/app/sitemap.ts) (30 URLs, generadas por listas de slugs) y [src/app/robots.ts](src/app/robots.ts). Si añades una ruta indexable, **añádela también al sitemap**.

## Datos de precio de la luz

Las herramientas de precio llaman a la **API pública de REE** (`apidatos.ree.es`, serie PVPC) **desde el cliente** (`"use client"`, `fetch` en `useEffect`). No hay clave de API ni proxy.

Toda la lógica vive en [src/lib/precios-luz.ts](src/lib/precios-luz.ts) — **fuente única**: `fetchPrices(date)`, `parseREEResponse` (filtra la serie por título PVPC), `classifyPrices` (3 zonas: las 8 horas más baratas `cheap`, las 4 más caras `expensive`, resto `mid`), `getStats`, `formatPrice`, `zoneColors`, `zoneLabels`. Los widgets de ruta (`PrecioLuzHoyWidget`, `PrecioLuzMananaWidget`) **importan de aquí**. No vuelvas a duplicar esta lógica inline.

## Chat de soporte con IA

Burbuja flotante ([src/components/ChatWidget.tsx](src/components/ChatWidget.tsx), esquina inferior **izquierda** — la derecha es de WhatsApp) que habla con la única API route del sitio, [src/app/api/chat/route.ts](src/app/api/chat/route.ts): un proxy hacia la **API de Gemini** (free tier de Google AI Studio, modelo `gemini-3.5-flash-lite`, cambiable con la env var `GEMINI_MODEL`).

- **La clave de la API (`GEMINI_API_KEY`) SOLO existe en el servidor**: env var en Vercel y en `.env.local` (gitignored). Jamás en código, jamás con prefijo `NEXT_PUBLIC_` — el repo es público.
- El system prompt, el modelo y `generationConfig` se fijan **en el servidor** (route.ts); nunca aceptar esos campos del cliente. El system prompt está anclado en el wiki (independencia, "análisis gratis, si no ahorro no cobro", nada de rankings de compañías ni cifras inventadas) — si cambias el mensaje de negocio, coteja con `wiki/projects/vitergy.md`.
- Protecciones en la route: tope de longitud, historial capado, rate limit best-effort por IP, check de Origin y mensajes de error amables (429 = cuota gratis agotada, se resetea a medianoche hora del Pacífico).
- Sin `GEMINI_API_KEY` configurada el chat responde 503 con un mensaje que redirige a WhatsApp — la web nunca se rompe por esto.

## Sistema de diseño

Tokens en `@theme` de [globals.css](src/app/globals.css). Úsalos, no hardcodees colores nuevos:

- Acento (naranja): `#f97316` · Oscuro (texto/secciones): `#1f2942` · Tinte: `#fff7ed` · Fondo: `#fefefe`
- Estilo: SaaS limpio, inspirado en Polaroo (ver historial git). Mobile-first, Tailwind utility-first.

## ⚠️ Trampas (importante)

1. **El formulario de contacto fue SUSTITUIDO por la calculadora de ahorro** (ago-2026). [contacto/CalculadoraAhorro.tsx](src/app/contacto/CalculadoraAhorro.tsx) es un wizard de 4 pasos: subir factura → Gemini extrae los datos (`/api/factura/analizar`) → el usuario los confirma → deja su email → estudio en pantalla (`/api/factura/estudio`). El estudio calcula el mejor precio contra el **Supabase de DPC** (server-side, réplica simplificada del motor; ver [src/lib/estudio-ahorro.ts](src/lib/estudio-ahorro.ts)) y captura el lead en **Brevo** (lista 488 "VITERGY") + aviso a `info@vitergy.es`. **REGLA INNEGOCIABLE**: la respuesta al navegador nunca lleva nombres de comercializadoras ni rankings — solo el ahorro agregado, presentado como estimación retrospectiva. Si hay prórroga fiscal del RDL 7/2026, actualizar las constantes de `estudio-ahorro.ts` cotejando con `dpc-comparador/src/lib/calculations/taxes.ts`.
2. **`next.config.ts`** solo permite imágenes remotas de `images.unsplash.com`. Para otros dominios externos, añádelos a `remotePatterns`.
3. `.env.local` contiene `VERCEL_OIDC_TOKEN` (lo genera Vercel CLI), `GEMINI_API_KEY` (chat + lector de facturas), `DPC_SUPABASE_URL` + `DPC_SUPABASE_SERVICE_ROLE_KEY` (precios para la calculadora — ⚠️ llave maestra de la BD de DPC, SOLO server-side), `BREVO_API_KEY` + `BREVO_SENDER_EMAIL` (+ opcionales `BREVO_LIST_ID`, `LEAD_TO_EMAIL`, `GEMINI_MODEL_FACTURA`). Todas también en las env vars de Vercel. `.env*` está gitignored — nunca lo commitees.
4. **Este repo es PÚBLICO en GitHub.** Las propuestas y estudios de clientes (PDFs con NIF, CUPS, direcciones y consumos) pueden vivir en el directorio de trabajo pero JAMÁS en un commit — el `.gitignore` ya excluye `/*.pdf`, `/propuestas/`, `/estudios/` y `/facturas/`. Antes de commitear, comprueba que ningún dato de cliente se cuela.

## Cómo trabajar aquí (guía de comportamiento)

Principios de Karpathy aplicados a este repo:

- **Piensa antes de codear.** Si una petición admite varias interpretaciones (sobre todo en copy/SEO), exponlas en vez de elegir en silencio. Si algo no está claro, pregunta.
- **Simplicidad primero.** Es una web de marketing, no una app. Nada de abstracciones, "configurabilidad" ni state management que no se haya pedido. El patrón vigente es: página + componentes de ruta locales.
- **Cambios quirúrgicos.** Toca solo lo que pide la tarea. Respeta el estilo existente aunque lo harías distinto. Si ves código muerto o sin usar, **menciónalo, no lo borres** salvo que te lo pidan.
- **Criterio de hecho verificable.** Tras un cambio, deja claro cómo comprobarlo: `npm run build` sin errores, `npm run lint` limpio, y la ruta afectada renderiza en `npm run dev`. Para cambios de SEO, confirma que `sitemap.ts` sigue coherente.

## Conocimiento (Segundo Cerebro)

Wiki persistente de Victor: `C:\Users\Victor\Documents\VITER VAULT\_Wiki\` — índice en
`_Wiki\index.md`, contrato en `_Wiki\CLAUDE.md`. Antes de trabajo de SEO, copy o negocio,
lee las páginas de este repo:

- `wiki/projects/vitergy.md` — el proyecto
- `wiki/concepts/estrategia-maestra-seo-vitergy.md` · `wiki/concepts/contenido-seo-vitergy.md`
- `wiki/concepts/seo-local.md` · `wiki/concepts/google-business-profile.md`
- `wiki/syntheses/roadmap-ejecucion-vitergy-q2-2026.md`

Ancla todo claim de negocio en una página del wiki; si no existe página, dilo.
