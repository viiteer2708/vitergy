import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ NO se bloquea: son el CSS y el JS que Google necesita para ver la página.
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://vitergy.es/sitemap.xml',
  }
}
