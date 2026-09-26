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
};

export default nextConfig;
