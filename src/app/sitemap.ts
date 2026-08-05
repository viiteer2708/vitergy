import { MetadataRoute } from 'next'

// Fechas de última modificación REAL del contenido, por grupo.
// Antes era `new Date()` en todas: cada deploy marcaba las 38 URLs como
// recién modificadas, y eso le resta credibilidad al sitemap ante Google.
// Actualiza la fecha del grupo cuando toques su contenido.
const F = {
  base: new Date('2026-07-05'),            // creación del sitio actual
  home: new Date('2026-08-05'),            // H1 con keyword + schema
  contacto: new Date('2026-08-02'),        // calculadora de ahorro v2
  grandesConsumos: new Date('2026-08-05'), // caso real + og:image
  legales: new Date('2026-07-29'),         // publicación de las 3 páginas
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitergy.es'

  const mainPages = [
    { url: baseUrl, lastModified: F.home, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/consultoria-energetica`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: F.contacto, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sobre-mi`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const servicePages = [
    'estudio-factura-electrica', 'cambiar-compania-luz', 'comparador-tarifas-luz',
    'autoconsumo-fotovoltaico', 'instalacion-baterias', 'optimizacion-potencia',
    'penalizaciones-electricas', 'mantenimiento-electrico', 'monitorizacion-consumo',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.8 }))

  const grandesConsumos = [
    { url: `${baseUrl}/grandes-consumos`, lastModified: F.grandesConsumos, changeFrequency: 'monthly' as const, priority: 0.9 },
    ...[
      'gimnasios', 'lavanderias-industriales', 'clubs-de-padel', 'centros-medicos',
    ].map((slug) => ({ url: `${baseUrl}/grandes-consumos/${slug}`, lastModified: F.grandesConsumos, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]

  const localPages = [
    'asesoria-energetica-barcelona', 'asesoria-energetica-cataluna', 'asesoria-energetica-espana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.8 }))

  const toolPages = [
    'calculadora-consumo-electrico', 'precio-luz-hoy', 'precio-luz-manana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.base, changeFrequency: 'daily' as const, priority: 0.7 }))

  const legalPages = [
    'legal', 'privacidad', 'cookies',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.legales, changeFrequency: 'yearly' as const, priority: 0.3 }))

  const blogIndex = { url: `${baseUrl}/blog`, lastModified: F.base, changeFrequency: 'weekly' as const, priority: 0.7 }

  const blogPosts = [
    'como-calcular-consumo-electrico', 'como-cambiar-compania-luz', 'comparativa-tarifas-luz',
    'entender-factura-luz', 'guia-autoconsumo-fotovoltaico', 'mejores-comercializadoras-espana',
    'monitorizacion-consumo-energetico', 'optimizar-potencia-contratada',
    'penalizacion-cambio-compania', 'pvpc-precio-voluntario',
  ].map((slug) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.6 }))

  return [...mainPages, ...grandesConsumos, ...servicePages, ...localPages, ...toolPages, blogIndex, ...blogPosts, ...legalPages]
}
