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

> ✅ **29-jul, misma sesión: los tres críticos están corregidos y en producción.** Cada uno lleva abajo la nota de qué se hizo. Queda **una sola cosa pendiente de Victor: el NIF** de la sociedad para completar el aviso legal.

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

> ✅ **Corregido.** Bloque `aggregateRating` eliminado de `src/app/page.tsx`. Verificado en el HTML servido: cero apariciones.

### 2. Tres rutas legales enlazadas desde todo el sitio devuelven 404

El pie de página enlaza `/legal`, `/privacidad` y `/cookies` desde las 35 páginas. Las tres responden **HTTP 404**: esas rutas no existen en `src/app/`.

Esto es dos cosas a la vez. Es un problema de SEO (105 enlaces internos rotos, dilución de crawl budget, señal de sitio descuidado) y es un problema legal: una web comercial que capta datos personales necesita aviso legal, política de privacidad y política de cookies publicados (RGPD + LSSI-CE). Para el público de gran consumo importa doble: el responsable de compras de una clínica o de un grupo de centros mira eso antes de responder a un correo.

**Solución:** crear las tres páginas. Es contenido, no ingeniería.
**Tiempo:** 2 horas.

> ✅ **Corregido.** Publicadas `/legal`, `/privacidad` y `/cookies`, con componente común en `src/components/LegalDoc.tsx` y alta en el sitemap. Los tres documentos describen la realidad verificada del sitio, no una plantilla genérica:
>
> - La **política de cookies** dice que no hay ninguna, porque es cierto: se comprobó que el repo no tiene analítica ni píxeles y que producción no devuelve ninguna cabecera `Set-Cookie`. Por eso tampoco hace falta banner de consentimiento.
> - La **política de privacidad** explica que el formulario de contacto no envía nada a ningún servidor: redacta un mensaje de WhatsApp y lo abre. Cubre además la comunicación de datos a comercializadoras y a la distribuidora (curva de carga / CUPS), que es lo que se hace de verdad en un estudio.
> - El **aviso legal** incluye una cláusula específica sobre el carácter orientativo de las cifras de ahorro y de los escenarios de cálculo publicados en las páginas de sector.
> - Añadida la cláusula informativa de protección de datos bajo el formulario de `/contacto`, con enlace a la política.
>
> ⚠️ **Pendiente de Victor: el NIF de la sociedad.** Está como constante vacía en `LegalDoc.tsx`; mientras lo esté, la línea no se pinta —mejor omitirla que inventarla— pero el art. 10 de la LSSI no queda cubierto del todo. Es rellenar una cadena.

### 3. La fecha de fundación del schema contradice la del negocio

El JSON-LD declara `"foundingDate": "2015"`. El wiki registra que Vitergy se funda en **enero de 2025**. En la home hay además un testimonio de «GRUPO NEW ENERGY — Cliente desde 2015» que refuerza la misma incoherencia.

Es probable que 2015 venga de la trayectoria profesional de Víctor y no de la sociedad. Mezclar las dos cosas en un dato estructurado público es lo peor de ambos mundos: no aporta autoridad y sí crea una contradicción verificable.

**Solución:** decidir cuál es la fecha correcta y dejar una sola versión en schema, en la web y en la ficha de Google. La trayectoria previa de Víctor se cuenta en `/sobre-mi` como texto, que es donde suma.
**Tiempo:** 15 minutos + la decisión.

> ✅ **Corregido y resuelto sin perder autoridad.** `foundingDate` pasa a `2025-01`, que es cuando se constituye Vitergy, y los años de trayectoria se mudan al nodo `founder` (`Person`), que es donde son ciertos: *«Más de 12 años en el sector energético y más de 200 GWh de consumo gestionado»*. Así deja de haber contradicción y el dato fuerte sigue publicado, en el sitio correcto. El testimonio de «cliente desde 2015» ya no choca: se refiere a Víctor, no a la sociedad.

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

| Orden | Acción | Impacto | Esfuerzo | Estado |
|---|---|---|---|---|
| 1 | Quitar el `aggregateRating` falso | ALTO (riesgo de penalización) | BAJO | ✅ hecho el 29-jul |
| 2 | Publicar `/legal`, `/privacidad` y `/cookies` | ALTO (legal + 105 enlaces rotos) | MEDIO | ✅ hecho el 29-jul; NIF B22517494 añadido |
| 3 | Unificar la fecha de fundación | MEDIO | BAJO | ✅ hecho el 29-jul |
| 4 | Crear contenido para grandes consumos | ALTO | ALTO | ✅ hecho el 29-jul |
| 5 | Imagen OG + `metadataBase` | MEDIO-ALTO (CTR en WhatsApp) | BAJO | ✅ hecho el 5-ago — `og.png` 1200×630 generada desde el logo real (wordmark + mascota), `twitter:summary_large_image`, cubre también las páginas que heredan del layout |
| 6 | `sameAs` al GBP y autoría en el blog | MEDIO (E-E-A-T) | MEDIO | ✅ hecho el 5-ago — `sameAs` a la ficha de Google (CID 18012363284776329308) + `streetAddress`/`email`/`image` en el LocalBusiness; la autoría del blog **ya existía** (los 10 posts llevan `Article.author` = Víctor Marrón con URL a /sobre-mi) |
| 7 | Vía de contacto por email para B2B | MEDIO-ALTO (conversión) | MEDIO | ✅ resuelto por dos vías — la calculadora de /contacto (2-ago, otra sesión) ya captura leads por email vía Brevo, y el CTA de grandes consumos añade mailto directo a info@vitergy.es para el caso «te mando mis 12 facturas» |
| 8 | Favicon ligero y metadatos propios de la home | BAJO | BAJO | ✅ hecho el 5-ago — favicon.ico multi-tamaño (15 KB) + icon-192/512 + apple-touch-icon desde la mascota, sustituyen al PNG de 306 KB |
| 9 | H1 de la home con keyword+geo (P1 del 23-jul) | MEDIO-ALTO | BAJO | ✅ hecho el 5-ago — H1 = «Asesoría Energética Independiente en Molins de Rei · Barcelona» (posición eyebrow); el gancho de la abuela conserva el estilo grande como `<p>` |
| 10 | Fechas reales en el sitemap (antes `new Date()` en cada deploy) | BAJO | BAJO | ✅ hecho el 5-ago — fechas fijas por grupo de contenido |

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

## Credenciales publicadas (aportadas por Víctor el 29-jul)

Las cinco páginas ya no se apoyan solo en la independencia. Se han incorporado tres datos reales:

- **Más de 12 años en el sector energético** y **más de 200 GWh de consumo gestionado** — en la tira de métricas de las cinco cabeceras, en el bloque «Por qué nosotros» de las cinco páginas y en el nodo `founder` del schema de la home. Para que el número sea tangible se acompaña de su equivalencia: lo que consumen en un año más de cincuenta mil hogares.
- **Caso real con desglose** (fundación con residencia 6.1TD + centro de día 3.0TD con autoconsumo, en Madrid), publicado en `/grandes-consumos` y en `/grandes-consumos/centros-medicos`. Fuente: la propuesta de julio 2026 (PDF fuera de git). Cifras publicadas, las del documento: **5.107,68 € de ahorro en las 8 facturas analizadas (16,5 %) → 12.533 €/año proyectados**, vía margen fijo de 0,5 c€/kWh frente a un sobreprecio que había crecido de 1,45 a 4,02 c€/kWh, y excedentes de 3 → 10 c€/kWh. Sin nombrar al cliente.
  - ⚠️ **Corrección respecto a la primera versión:** se publicó inicialmente «20.000 €/año» (cifra de memoria de Victor). El PDF dice 12.533 €/año (15.165 € con IVA), así que la web se ajustó al documento. Si los 20k salen de otra fuente (gas, acumulado, contrato anterior), actualizar con esa fuente delante.

Los escenarios de cálculo siguen etiquetados como tales y separados visualmente del caso real, para que no se confundan.

## Lo que sigue pendiente de Víctor

1. ~~El NIF de la sociedad~~ ✅ **B22517494**, publicado en `/legal` y `/privacidad` el 29-jul. LSSI art. 10 completo.
2. **Casos reales de los otros tres sectores** (gimnasio, lavandería, club de pádel). El de la fundación ya está desglosado; los otros tres tienen el bloque `casoReal` vacío.
3. ~~Autorización de la fundación para nombrarla~~ ✅ **Decidido el 5-ago:** se habla de «una fundación» sin nombrarla — exactamente como está publicado. Sigue abierto solo confirmar si la propuesta se firmó (hoy la web habla del análisis, que es lo verificable).
4. ~~Decisión de posicionamiento~~ ✅ **Decidido el 5-ago: independencia total** — «no nos casamos con nadie», en palabras de Victor. La carta de Mega queda descartada; el mensaje de independencia pasa de implícito a bandera: FAQ de la home con «No.» directo, bloque de autoridad de grandes consumos renombrado a «Independencia total: no nos casamos con nadie», y las tres landings locales corregidas (el «no cobramos comisión de ninguna comercializadora», que era falso, pasa a «no pertenecemos a ninguna comercializadora», que es la verdad y es más fuerte).

## Cifras ancladas — barrido del 5-ago

Con el dato real de Victor (**+400 clientes en cartera actualmente**) se sustituyó en 13 sitios el «+5.000 clientes» que no estaba anclado en ninguna fuente, y de paso cayeron el resto de cifras inventadas de la misma familia:

| Antes (sin fuente) | Ahora (anclado) |
|---|---|
| +5.000 clientes asesorados (13 apariciones) | **+400 clientes en cartera** |
| 5.0 en Google · 5.0/5.0 satisfacción | **4,9 en Google** (la ficha real) |
| +10 años de experiencia | **+12 años** |
| 15.000 facturas analizadas (blog ×2) | **+200 GWh de consumo analizado** / +400 clientes |
| 5.000 cambios gestionados (blog) | **12 años gestionando cambios** |
| 5.000+ sistemas implementados (blog) | **+200 GWh gestionados** |
| «no cobramos comisión de ninguna comercializadora» (×3, falso) | «no pertenecemos a ninguna comercializadora — no nos casamos con nadie» |

Toda cifra pública del sitio sale ahora de un dato dado por Victor o de la ficha real de Google.

**Cierre del 5-ago (segunda pasada):** el «ahorro medio 180 €/año» —la última cifra heredada sin fuente— queda **eliminado del sitio** por decisión de Victor. En su lugar se publica el **récord: 20.000 € de ahorro anual conseguido a un solo cliente** (dato declarado por Victor; el cliente es la fundación del caso real, contando sus varios centros). Las dos cifras del caso conviven con roles distintos y así se presentan: **20.000 €** = máximo histórico conseguido (declarado), **12.533 €/año** = margen nuevo documentado en el análisis de julio de 2026 sobre dos de sus puntos de suministro (PDF, fuera de git). El bloque de caso real de `/grandes-consumos` y `/grandes-consumos/centros-medicos` cuenta ambas: el récord como titular y el análisis factura a factura como demostración de que el trabajo no se hace una vez y ya.
