import { MetadataRoute } from 'next'
import { todosLosArticulos } from '@/lib/blog'

// Se regenera cada hora: los artículos programados entran solos el día de su fecha.
export const revalidate = 3600

// Fechas de última modificación REAL del contenido, por grupo.
// Antes era `new Date()` en todas: cada deploy marcaba las 38 URLs como
// recién modificadas, y eso le resta credibilidad al sitemap ante Google.
// Actualiza la fecha del grupo cuando toques su contenido.
const F = {
  base: new Date('2026-07-05'),            // creación del sitio actual
  home: new Date('2026-09-26'),            // 100% online (sin dirección) + horario en el schema
  contacto: new Date('2026-09-26'),        // 100% online (sin dirección ni mapa), hola@ y horario
  grandesConsumos: new Date('2026-09-26'), // 100% online + hola@
  legales: new Date('2026-09-26'),         // email de contacto hola@
  oficina: new Date('2026-09-26'),         // páginas que citaban la oficina (hoy 100% online)
  blog: new Date('2026-09-26'),            // listado nuevo: temas y paginación
}
// Los artículos NO van aquí: cada uno trae su fecha (updatedAt o publishedAt) de src/lib/blog.ts.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitergy.es'

  const mainPages = [
    { url: baseUrl, lastModified: F.home, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/consultoria-energetica`, lastModified: F.base, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: F.contacto, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sobre-mi`, lastModified: F.oficina, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const servicePages = [
    'estudio-factura-electrica', 'cambiar-compania-luz', 'comparador-tarifas-luz',
    'autoconsumo-fotovoltaico', 'instalacion-baterias', 'optimizacion-potencia',
    'penalizaciones-electricas', 'mantenimiento-electrico', 'monitorizacion-consumo',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: slug === 'mantenimiento-electrico' ? F.oficina : F.base, changeFrequency: 'monthly' as const, priority: 0.8 }))

  const grandesConsumos = [
    { url: `${baseUrl}/grandes-consumos`, lastModified: F.grandesConsumos, changeFrequency: 'monthly' as const, priority: 0.9 },
    ...[
      'gimnasios', 'lavanderias-industriales', 'clubs-de-padel', 'centros-medicos',
    ].map((slug) => ({ url: `${baseUrl}/grandes-consumos/${slug}`, lastModified: F.grandesConsumos, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]

  const localPages = [
    'asesoria-energetica-barcelona', 'asesoria-energetica-cataluna', 'asesoria-energetica-espana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.oficina, changeFrequency: 'monthly' as const, priority: 0.8 }))

  const toolPages = [
    'calculadora-consumo-electrico', 'precio-luz-hoy', 'precio-luz-manana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.base, changeFrequency: 'daily' as const, priority: 0.7 }))

  const legalPages = [
    'legal', 'privacidad', 'cookies',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: F.legales, changeFrequency: 'yearly' as const, priority: 0.3 }))

  // Solo lo publicado: los programados (fecha futura) entran el día que toca.
  const blogPosts = todosLosArticulos().map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // El listado cambia cuando cambia su diseño o sale un artículo nuevo.
  const ultimoCambioBlog = Math.max(F.blog.getTime(), ...blogPosts.map((p) => p.lastModified.getTime()))
  const blogIndex = { url: `${baseUrl}/blog`, lastModified: new Date(ultimoCambioBlog), changeFrequency: 'weekly' as const, priority: 0.7 }

  return [...mainPages, ...grandesConsumos, ...servicePages, ...localPages, ...toolPages, blogIndex, ...blogPosts, ...legalPages]
}
