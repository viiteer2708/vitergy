# Blog y SEO técnico de vitergy.es

Montado el 26-sep-2026 siguiendo la lección del curso «Blog con SEO de verdad», adaptada a
esta web (ver [Decisiones](#decisiones-y-diferencias-con-la-lección)). Skill que lo gestiona:
[.claude/skills/blog-seo/SKILL.md](../.claude/skills/blog-seo/SKILL.md).

## Qué hay

El blog tiene **dos fuentes que se listan juntas**:

1. **Artículos en Markdown** — `src/content/blog/<direccion>.md`. Es la forma de publicar desde
   sep-2026: añadir el archivo y hacer push. Sin panel ni base de datos.
2. **Los 10 artículos originales** — páginas escritas a mano en `src/app/blog/<slug>/page.tsx`.
   Se quedan como están: Google ya los tiene indexados y llevan tablas, FAQ y enlaces hechos a
   mano. Su ficha (título, descripción, fechas, temas) vive en `ARTICULOS_TSX` de
   [src/lib/blog.ts](../src/lib/blog.ts) para el listado, el sitemap y la tarjeta al compartir.

## Publicar un artículo

1. Copia [src/content/blog/_plantilla.md](../src/content/blog/_plantilla.md) como
   `<direccion>.md`. El nombre del archivo es la dirección: `vitergy.es/blog/<direccion>`.
   Solo minúsculas, números y guiones, sin tildes.
2. Rellena la cabecera:

   ```yaml
   ---
   title: "¿Pregunta que la gente buscaría en Google?"
   description: "Una o dos frases (~150 caracteres): sale en Google y al compartir."
   publishedAt: "2026-10-01"   # día en que aparece (hora de Madrid)
   updatedAt: "2026-10-15"     # opcional: si se revisa el contenido
   tags: ["Factura", "Cambio de compañía"]
   ---
   ```

3. Escribe debajo en Markdown. **No pongas `# título`**: el `h1` sale de la cabecera. Las
   secciones van con `##` (y `###` dentro), mejor con forma de pregunta o promesa concreta.
4. `git add` + commit + push. Vercel publica en ~40 s.

Temas en uso (reutilízalos antes de inventar uno nuevo; «Sigue leyendo» los usa para
recomendar): Factura · Tarifas · PVPC · Potencia · Consumo · Hogar · Empresas · Autoconsumo ·
Cambio de compañía · Tus derechos · Comercializadoras.

### Artículos programados

Con `publishedAt` en el futuro el artículo **no aparece en ningún sitio** (listado, página,
sitemap) hasta ese día en Madrid. Sale solo, sin redesplegar:

- `/blog` es dinámico (se pinta en cada visita): lo enseña ese mismo día.
- `/blog/<direccion>` y `/sitemap.xml` se regeneran cada hora (`revalidate = 3600`): en la
  primera hora del día puede tardar como mucho una hora en verse.

### Qué rompe el despliegue (a propósito)

Si un archivo está mal, **falla el build** con un mensaje `[blog] …` y Vercel mantiene la versión
anterior de la web (no se cae nada). Casos: nombre de archivo con tildes/espacios/mayúsculas,
falta `title` o `description`, fecha que no es `AAAA-MM-DD`, o dirección ya usada por uno de los
10 originales. Los archivos que empiezan por `_` se ignoran.

## Qué es automático

- **Listado `/blog`** ([src/app/blog/page.tsx](../src/app/blog/page.tsx)): tarjetas con fecha,
  título, descripción y temas, del más reciente al más antiguo. A partir de 20 artículos pagina
  por dirección (`/blog?page=2`, con su propia canonical); nada de scroll infinito.
- **Página del artículo** ([src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx)):
  fecha, `h1`, temas, cuerpo, bloque de la calculadora (+ WhatsApp), «Sigue leyendo» (3
  artículos con más temas en común) y vuelta al blog.
- **Metadatos**: título `"<title> - Vitergy"`, descripción, canonical propia, tarjeta Open Graph
  + Twitter (tipo `article`, fechas, temas, imagen `/og.png`) y ficha `Article` en JSON-LD
  (autor = la `Person` del layout por su `@id`).
- **Sitemap**: entra solo, con `updatedAt` o `publishedAt` como fecha.

## La capa SEO de toda la web

| Pieza | Dónde | Notas |
|---|---|---|
| Índice para Google (sitemap) | [src/app/sitemap.ts](../src/app/sitemap.ts) | Páginas fijas por grupos de fecha (objeto `F`: actualizar la fecha del grupo al tocar su contenido) + artículos automáticos. `revalidate = 3600`. |
| robots.txt | [src/app/robots.ts](../src/app/robots.ts) | Todo permitido salvo `/api/`. **No bloquear `/_next/`**: es el CSS/JS que Google necesita para ver la página. |
| Dirección oficial (canonical) | cada `page.tsx` | Cada página declara la suya en `alternates.canonical`. El layout ya **no** pone una global (antes ponía la portada para todas: una página sin canonical propia se declaraba duplicada de la home). |
| Tarjeta al compartir (OG/Twitter) | [src/app/layout.tsx](../src/app/layout.tsx) + por página | Una página con `openGraph` propio no hereda la imagen del layout: incluir `images` (ya lo hace `metaCompartir`). |
| Fichas invisibles (JSON-LD) | layout: `WebSite` + `Person` (`@id` `https://vitergy.es/sobre-mi#victor-marron`) | Home (`LocalBusiness.founder`), `/sobre-mi` y los artículos apuntan al mismo `@id`. |
| Idioma | `<html lang="es">` | — |
| Imagen de tarjeta | `public/og.png` (1200×630) | Ya existía; no hace falta `opengraph-image.tsx`. |

## Piezas compartidas

- **[src/lib/markdown.ts](../src/lib/markdown.ts) → `renderMarkdown(texto)`**: Markdown (con
  tablas) → HTML con `marked`. Los enlaces externos se abren en pestaña nueva. Es para contenido
  de confianza escrito en el repo: **no sanea**, nunca pasarle texto de usuarios.
- **Clase `.prosa`** en [src/app/globals.css](../src/app/globals.css): tipografía de lectura.
  Columna de `54ch`, medida en el navegador en 66-76 caracteres por línea en escritorio;
  interlineado 1,8; títulos, listas, citas, tablas (con scroll lateral en el móvil) y enlaces
  en el color de acento.
- **[src/lib/blog.ts](../src/lib/blog.ts)**: lectura de artículos (`articulosMdPublicados`,
  `articuloMd`, `todosLosArticulos`, `relacionados`), fechas (`hoyEnMadrid`, `fechaLarga`) y
  metadatos al compartir (`metaCompartir`, `metaCompartirTsx`).

`next.config.ts` mete `src/content/blog/**` en las funciones de Vercel
(`outputFileTracingIncludes`): sin eso, el listado dinámico y la regeneración horaria no
encontrarían los archivos en producción.

## Decisiones (y diferencias con la lección)

- **Web**: vitergy.es (Next.js 16 en Vercel), elegida por Victor. La lección da por hecho otro
  montaje (servidor propio, DNS en Cloudflare); aquí el DNS está en Hostinger.
- **Los 10 artículos originales no se migran a Markdown**: están indexados y son páginas ricas
  hechas a mano; migrarlos arriesgaba posiciones a cambio de nada. Conviven con los nuevos.
- **Paginación con `?page=`** como pide la lección, lo que hace dinámico el listado: coste
  mínimo y los programados aparecen en el listado el mismo día.
- **Sin `opengraph-image.tsx`**: la web ya tenía `og.png` con la marca.
- **No montado a propósito** (capas para cuando haya decenas de artículos): rutas por tema,
  breadcrumbs en JSON-LD, FAQ automático, portadas generadas, IndexNow.
- **Primer artículo**: se escribe con Victor (su pregunta más repetida y su ejemplo real), se le
  enseña entero y solo se publica con su visto bueno. Él pone la sustancia; Claude, la forma.

## Cómo comprobarlo

1. `vitergy.es/blog`: salen las tarjetas.
2. Un artículo se lee cómodo en móvil y escritorio.
3. `vitergy.es/sitemap.xml` lista el artículo; `vitergy.es/robots.txt` menciona el sitemap.
4. Pegar el enlace en WhatsApp: sale la tarjeta con título y descripción.
5. Local: `npm run lint`, `npm run build` (la tabla del build marca `/blog` como `ƒ` y
   `/blog/[slug]` como `●` con `1h`).
