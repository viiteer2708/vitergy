import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Los artículos del blog (src/content/blog) se leen del disco también en producción: el
  // listado es dinámico y las páginas se regeneran cada hora para que salgan los programados.
  outputFileTracingIncludes: {
    "/**": ["./src/content/blog/**/*"],
  },
  // Cabeceras de seguridad (auditoría SEO del 6-nov-2026). La CSP es MÍNIMA a propósito: solo dice quién
  // puede incrustar la web (nadie de fuera), que no hay plugins y que nadie cambia la URL base. No limita
  // scripts, estilos, imágenes ni conexiones: así no rompe Turnstile, la API de REE ni los avatares de Google.
  // HSTS ya lo pone Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
