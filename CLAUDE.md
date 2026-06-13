# CLAUDE.md

Guía para trabajar en **Vitergy**. Léela antes de tocar código.

## Qué es

Landing/web de marca para **Vitergy** — asesoría energética independiente en Molins de Rei (Víctor). El objetivo del sitio es **captar clientes vía SEO** y empujarlos a contacto (WhatsApp / formulario). Es una web de marketing **estática** con dos herramientas dinámicas (precio de la luz hoy/mañana). No hay backend propio, ni base de datos, ni autenticación.

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
| Landing local (SEO) | `asesoria-energetica-barcelona`, `-cataluna`, `-espana` | 3 |
| Herramientas | `calculadora-consumo-electrico`, `precio-luz-hoy`, `precio-luz-manana` | 3 |
| Blog | `blog/` (índice) + 10 artículos en subcarpetas | 11 |
| Institucional | `page.tsx` (home), `sobre-mi`, `contacto`, `consultoria-energetica` | 4 |

- **Layout global** ([src/app/layout.tsx](src/app/layout.tsx)): monta `<Navbar/>`, `<Footer/>`, el **botón flotante de WhatsApp** (nº `633151083`) y los metadatos SEO base / OpenGraph. `lang="es"`.
- **Componentes compartidos**: `Navbar` y `Footer` en [src/components/](src/components/) (montados en el layout).
- **Componentes específicos de ruta**: conviven junto a su `page.tsx` (p. ej. `contacto/ContactoForm.tsx`, `calculadora-consumo-electrico/Calculadora.tsx`, `precio-luz-hoy/PrecioLuzHoyWidget.tsx`). **Este es el patrón a seguir** para UI de una sola página.
- **Lógica compartida**: en [src/lib/](src/lib/) (p. ej. `precios-luz.ts`). Si una lógica la usan ≥2 rutas, va aquí, no duplicada inline.
- **SEO**: [src/app/sitemap.ts](src/app/sitemap.ts) (30 URLs, generadas por listas de slugs) y [src/app/robots.ts](src/app/robots.ts). Si añades una ruta indexable, **añádela también al sitemap**.

## Datos de precio de la luz

Las herramientas de precio llaman a la **API pública de REE** (`apidatos.ree.es`, serie PVPC) **desde el cliente** (`"use client"`, `fetch` en `useEffect`). No hay clave de API ni proxy.

Toda la lógica vive en [src/lib/precios-luz.ts](src/lib/precios-luz.ts) — **fuente única**: `fetchPrices(date)`, `parseREEResponse` (filtra la serie por título PVPC), `classifyPrices` (3 zonas: las 8 horas más baratas `cheap`, las 4 más caras `expensive`, resto `mid`), `getStats`, `formatPrice`, `zoneColors`, `zoneLabels`. Los widgets de ruta (`PrecioLuzHoyWidget`, `PrecioLuzMananaWidget`) **importan de aquí**. No vuelvas a duplicar esta lógica inline.

## Sistema de diseño

Tokens en `@theme` de [globals.css](src/app/globals.css). Úsalos, no hardcodees colores nuevos:

- Acento (naranja): `#f97316` · Oscuro (texto/secciones): `#1f2942` · Tinte: `#fff7ed` · Fondo: `#fefefe`
- Estilo: SaaS limpio, inspirado en Polaroo (ver historial git). Mobile-first, Tailwind utility-first.

## ⚠️ Trampas (importante)

1. **El formulario de contacto no usa backend.** [contacto/ContactoForm.tsx](src/app/contacto/ContactoForm.tsx) **no hace POST ni envía email**: al enviar, abre WhatsApp (`wa.me/34633151083`) con la consulta prerrellenada y muestra el mensaje de éxito. Toda la captación va por WhatsApp/teléfono. Si en el futuro se pide "que el formulario llegue por email", hay que **añadir el envío desde cero** (API route + proveedor de email).
2. **`next.config.ts`** solo permite imágenes remotas de `images.unsplash.com`. Para otros dominios externos, añádelos a `remotePatterns`.
3. `.env.local` solo contiene `VERCEL_OIDC_TOKEN` (lo genera Vercel CLI). No hay secretos de app que configurar.

## Cómo trabajar aquí (guía de comportamiento)

Principios de Karpathy aplicados a este repo:

- **Piensa antes de codear.** Si una petición admite varias interpretaciones (sobre todo en copy/SEO), exponlas en vez de elegir en silencio. Si algo no está claro, pregunta.
- **Simplicidad primero.** Es una web de marketing, no una app. Nada de abstracciones, "configurabilidad" ni state management que no se haya pedido. El patrón vigente es: página + componentes de ruta locales.
- **Cambios quirúrgicos.** Toca solo lo que pide la tarea. Respeta el estilo existente aunque lo harías distinto. Si ves código muerto o sin usar, **menciónalo, no lo borres** salvo que te lo pidan.
- **Criterio de hecho verificable.** Tras un cambio, deja claro cómo comprobarlo: `npm run build` sin errores, `npm run lint` limpio, y la ruta afectada renderiza en `npm run dev`. Para cambios de SEO, confirma que `sitemap.ts` sigue coherente.
