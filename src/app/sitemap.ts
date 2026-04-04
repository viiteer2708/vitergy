import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vitergy.es'

  const mainPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/consultoria-energetica`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sobre-mi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const servicePages = [
    'estudio-factura-electrica', 'cambiar-compania-luz', 'comparador-tarifas-luz',
    'autoconsumo-fotovoltaico', 'instalacion-baterias', 'optimizacion-potencia',
    'penalizaciones-electricas', 'mantenimiento-electrico', 'monitorizacion-consumo',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }))

  const localPages = [
    'asesoria-energetica-barcelona', 'asesoria-energetica-cataluna', 'asesoria-energetica-espana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }))

  const toolPages = [
    'calculadora-consumo-electrico', 'precio-luz-hoy', 'precio-luz-manana',
  ].map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 }))

  const blogIndex = { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 }

  const blogPosts = [
    'como-calcular-consumo-electrico', 'como-cambiar-compania-luz', 'comparativa-tarifas-luz',
    'entender-factura-luz', 'guia-autoconsumo-fotovoltaico', 'mejores-comercializadoras-espana',
    'monitorizacion-consumo-energetico', 'optimizar-potencia-contratada',
    'penalizacion-cambio-compania', 'pvpc-precio-voluntario',
  ].map((slug) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 }))

  return [...mainPages, ...servicePages, ...localPages, ...toolPages, blogIndex, ...blogPosts]
}
