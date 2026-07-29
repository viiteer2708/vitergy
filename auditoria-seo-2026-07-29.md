# 🔍 Auditoría SEO — vitergy.es

**Fecha:** 29 de julio de 2026
**Alcance:** home + muestra de páginas internas (servicio, local, blog) + infraestructura (robots, sitemap, schema, rutas)
**Método:** análisis del HTML servido en producción + revisión del código fuente del repo
**Puntuación global orientativa:** **74 / 100**

---

## Resumen ejecutivo

La base técnica de vitergy.es está **mejor de lo que suele estar una web de este tamaño**: las 30 páginas llevan `title`, `description`, `canonical` propio y JSON-LD, el sitemap y el `robots.txt` funcionan, todo se sirve estático y el TTFB está en 0,16 s. El problema no es el SEO técnico general, son **tres bombas concretas** y un hueco estratégico.

Las tres bombas: un `aggregateRating` autoproclamado que no coincide con la ficha real de Google, tres rutas legales enlazadas desde el pie de **todas** las páginas que devuelven 404, y una contradicción de fecha de fundación en los datos estructurados. Las tres son de arreglo rápido y las tres tienen coste real si no se tocan.

El hueco estratégico —cero contenido dirigido a clientes de gran consumo— **queda cubierto en esta misma sesión** con la nueva sección `/grandes-consumos` y sus cuatro landings sectoriales.

---

## Puntuación por categoría

| Categoría | Puntuación | Estado |
|---|---|---|
| Meta tags | 20/25 | 🟡 |
| Contenido | 19/25 | 🟡 |
| Técnico | 18/25 | 🔴 |
| UX / Conversión | 17/25 | 🟡 |

---

## 🔴 Críticos — corregir ya

### 1. `aggregateRating` inventado en el schema de la home

La home publica en su `LocalBusiness`:

```json
"aggregateRating": { "ratingValue": "5", "ratingCount": "50" }
```

La ficha real de Google Business Profile es **4,9 ★ con 9 reseñas visibles** (16 acumuladas históricamente), según `_Wiki/wiki/projects/vitergy.md`. Dos problemas encadenados:

- **El dato es falso.** 50 valoraciones no existen en ninguna parte.
- **Aunque fuese cierto, Google no lo admite.** Desde 2024, las valoraciones autoservidas (las que un negocio se pone a sí mismo, sin reseñas visibles en la propia página) no son elegibles para rich results y son candidatas a acción manual por spam de datos estructurados.

**Solución:** eliminar el bloque `aggregateRating` del JSON-LD de la home. Si más adelante se quieren estrellas en el SERP, hay que publicar las reseñas reales en la página y marcarlas una a una con `Review`, con autor y fecha.
**Tiempo:** 10 minutos.

### 2. Tres rutas legales enlazadas desde todo el sitio devuelven 404

El pie de página enlaza `/legal`, `/privacidad` y `/cookies` desde las 35 páginas. Las tres responden **HTTP 404**: esas rutas no existen en `src/app/`.

Esto es dos cosas a la vez. Es un problema de SEO (105 enlaces internos rotos, dilución de crawl budget, señal de sitio descuidado) y es un problema legal: una web comercial que capta datos personales necesita aviso legal, política de privacidad y política de cookies publicados (RGPD + LSSI-CE). Para el público de gran consumo importa doble: el responsable de compras de una clínica o de un grupo de centros mira eso antes de responder a un correo.

**Solución:** crear las tres páginas. Es contenido, no ingeniería.
**Tiempo:** 2 horas.

### 3. La fecha de fundación del schema contradice la del negocio

El JSON-LD declara `"foundingDate": "2015"`. El wiki registra que Vitergy se funda en **enero de 2025**. En la home hay además un testimonio de «GRUPO NEW ENERGY — Cliente desde 2015» que refuerza la misma incoherencia.

Es probable que 2015 venga de la trayectoria profesional de Víctor y no de la sociedad. Mezclar las dos cosas en un dato estructurado público es lo peor de ambos mundos: no aporta autoridad y sí crea una contradicción verificable.

**Solución:** decidir cuál es la fecha correcta y dejar una sola versión en schema, en la web y en la ficha de Google. La trayectoria previa de Víctor se cuenta en `/sobre-mi` como texto, que es donde suma.
**Tiempo:** 15 minutos + la decisión.

---

## 🟡 Mejorables — próximas semanas

| # | Problema | Solución | Tiempo |
|---|---|---|---|
| 4 | **Ninguna página tiene `og:image`.** El `twitter:card` es `summary` y sin imagen. Al compartir un enlace por WhatsApp —que es *el* canal de captación del negocio— sale una tarjeta gris | Crear una imagen OG (1200×630) y añadirla al `openGraph` del layout; definir `metadataBase` para que las rutas relativas funcionen | 1 h |
| 5 | **La home no tiene `export const metadata` propio**, hereda el del layout | Mover los metadatos de la home a `src/app/page.tsx` y dejar en el layout solo lo genérico | 20 min |
| 6 | **El H1 de la home no contiene ninguna keyword ni geo:** «A mi abuela la cambiaron de compañía eléctrica 7 veces en un solo año» | Es buen copy y no hay que tirarlo. Basta con añadir la keyword en el subtítulo inmediato o convertir el gancho en *kicker* y el H1 en «Asesoría energética en Molins de Rei» | 30 min |
| 7 | **`lastModified: new Date()` en el sitemap:** las 35 URLs se marcan como modificadas en cada deploy | Fijar fechas reales por grupo de páginas | 30 min |
| 8 | **`logo-vitergy.png` pesa 300 KB** y se usa como `favicon` y `apple-touch-icon` | Generar un favicon real (`.ico` + PNG 180×180) | 20 min |
| 9 | **Sin señales E-E-A-T:** no hay schema `Person` de Víctor, ni `sameAs` a la ficha de Google o LinkedIn, ni autor en los artículos del blog. Sector YMYL | Añadir `Person` + `sameAs`, y firmar los posts del blog | 1 h |
| 10 | **El formulario de contacto no envía nada:** abre WhatsApp con el texto prerrelleno | Es una decisión consciente y para el cliente residencial funciona. Para gran consumo es un freno: hay que ofrecer también email. Añadir una API route con envío por correo | 3 h |
| 11 | **«+5.000 clientes» en meta description y schema** — cifra no anclada en ninguna fuente del wiki para Vitergy | Verificar y, si corresponde a la trayectoria de Víctor y no a Vitergy, reformular | 15 min |

---

## 🟢 Lo que ya está bien hecho

- **Canonical propio en cada página.** Es el error más común en Next.js App Router (heredar el canonical del layout y auto-canonicalizar todo a la home) y aquí está resuelto: las 29 páginas internas tienen el suyo.
- **`title` y `description` únicos y bien dimensionados** en todas las páginas revisadas.
- **JSON-LD en las 30 páginas** (FAQPage + LocalBusiness), no solo en la home.
- **`robots.txt` y `sitemap.xml`** correctos, coherentes y enlazados entre sí.
- **Todo prerenderizado estático**, TTFB de 0,16 s, `lang="es"`, viewport correcto, imágenes con `alt` descriptivo y servidas por `next/image`.
- **Botón flotante de WhatsApp** con `aria-label` y mensaje prerrellenado.

---

## Recomendaciones priorizadas

| Orden | Acción | Impacto | Esfuerzo | Tiempo |
|---|---|---|---|---|
| 1 | Quitar el `aggregateRating` falso | ALTO (riesgo de penalización) | BAJO | 10 min |
| 2 | Publicar `/legal`, `/privacidad` y `/cookies` | ALTO (legal + 105 enlaces rotos) | MEDIO | 2 h |
| 3 | Unificar la fecha de fundación | MEDIO | BAJO | 15 min |
| 4 | ~~Crear contenido para grandes consumos~~ | ALTO | ALTO | ✅ **hecho el 29-jul** |
| 5 | Imagen OG + `metadataBase` | MEDIO-ALTO (CTR en WhatsApp) | BAJO | 1 h |
| 6 | Schema `Person` + `sameAs` + autoría en blog | MEDIO (E-E-A-T) | MEDIO | 1 h |
| 7 | Vía de contacto por email para B2B | MEDIO-ALTO (conversión) | MEDIO | 3 h |
| 8 | Favicon ligero y metadatos de la home | BAJO | BAJO | 40 min |

---

## Lo que se ha ejecutado en esta sesión

Nueva sección orientada a clientes de gran consumo, con arquitectura pilar + clúster:

```
/grandes-consumos                                  ← página pilar (2.021 palabras)
├── /grandes-consumos/gimnasios                    ← 2.111 palabras
├── /grandes-consumos/lavanderias-industriales
├── /grandes-consumos/clubs-de-padel               ← 2.148 palabras
└── /grandes-consumos/centros-medicos
```

Cada página incluye `title`/`description` propios, canonical, Open Graph, y tres bloques de datos estructurados: `FAQPage`, `Service` con `provider` y `areaServed`, y `BreadcrumbList`. La pilar añade un `OfferCatalog` que enlaza los cuatro sectores.

Añadidas al `sitemap.ts` (35 URLs en total), al menú de navegación bajo un desplegable **Empresas** y a una nueva columna del pie de página, de modo que las cinco páginas reciben enlaces internos desde todas las demás.

**Verificación:** `npm run lint` limpio y `npm run build` con 40 rutas prerenderizadas sin errores.

---

## Pendiente de Víctor antes de dar el contenido por cerrado

Las cinco páginas están escritas sin inventar cifras de resultados: los escenarios de cálculo van etiquetados como tales y no se atribuye ningún ahorro concreto a ningún cliente. Para que rindan de verdad hacen falta tres cosas que solo puede aportar él:

1. **Dos o tres casos reales con cifras**, uno por sector si es posible. Un caso verificable vale más que las cinco páginas juntas.
2. **Las credenciales concretas de trayectoria** que se pueden publicar (años en el sector, volumen de cartera gestionada, tipo de instalaciones). Ahora mismo el bloque de autoridad se apoya solo en lo que está anclado en el wiki: independencia, más de 40 comercializadoras comparadas y análisis de curva horaria.
3. **Una decisión de posicionamiento:** su cargo en Mega Energía es la credencial más potente que existe para hablar con un gran consumidor —conoce la mesa desde el otro lado—, pero choca de frente con el mensaje de independencia sobre el que está construida toda la web. No se ha usado. Es una decisión suya, no técnica.
