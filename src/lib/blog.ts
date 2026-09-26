import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";

/*
 * El blog de vitergy.es tiene dos fuentes que se listan juntas (doc: docs/blog.md):
 *
 * 1. Artículos en Markdown — src/content/blog/<slug>.md. Es la forma de publicar desde
 *    sep-2026: añadir el archivo + push. Con `publishedAt` en el futuro, el artículo no sale en
 *    ningún sitio (listado, página ni sitemap) hasta ese día, hora de Madrid. Los archivos que
 *    empiezan por "_" (la plantilla) se ignoran.
 * 2. Los 10 artículos originales, escritos a mano como páginas en src/app/blog/<slug>/page.tsx.
 *    Se quedan como están porque Google ya los tiene indexados; aquí solo vive su ficha para el
 *    listado, el sitemap y la tarjeta al compartir.
 */

export const SITIO = "https://vitergy.es";

const CARPETA = path.join(process.cwd(), "src/content/blog");

export type ArticuloResumen = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // AAAA-MM-DD
  updatedAt?: string; // AAAA-MM-DD
  tags: string[];
};

export type ArticuloMd = ArticuloResumen & { html: string };

// `updatedAt` = la fecha que ya declaraba el sitemap para estas páginas (creación del sitio actual).
export const ARTICULOS_TSX: ArticuloResumen[] = [
  {
    slug: "como-calcular-consumo-electrico",
    title: "Cómo Calcular tu Consumo Eléctrico en kWh [Fórmulas + Ejemplos]",
    description:
      "Aprende a calcular el consumo eléctrico de tu hogar con fórmulas sencillas, ejemplos prácticos y tablas de consumo por electrodoméstico. Ahorra hasta un 30%.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Consumo", "Hogar"],
  },
  {
    slug: "pvpc-precio-voluntario",
    title: "PVPC: Qué Es y Cómo Funciona el Precio Voluntario [Guía 2026]",
    description:
      "Todo sobre el PVPC: cómo se calcula, horarios, ventajas e inconvenientes, y cuándo te conviene frente a una tarifa de precio fijo. Comparativa detallada.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Tarifas", "PVPC"],
  },
  {
    slug: "entender-factura-luz",
    title: "Cómo Entender tu Factura de la Luz: Guía Completa con Ejemplos",
    description:
      "Desglosamos cada concepto de tu factura eléctrica: término de potencia, consumo, peajes, impuestos y cargos. Con ejemplo real de factura analizada.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Factura"],
  },
  {
    slug: "mejores-comercializadoras-espana",
    title: "Las Mejores Comercializadoras de Luz en España [Ranking 2026]",
    description:
      "Ranking actualizado de las mejores compañías eléctricas en España. Comparamos precios, atención al cliente, energía verde y condiciones de contrato.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Comercializadoras", "Tarifas"],
  },
  {
    slug: "penalizacion-cambio-compania",
    title: "Penalización por Cambiar de Compañía Eléctrica: ¿Es Legal?",
    description:
      "¿Te cobran por cambiar de compañía de luz? Explicamos cuándo es legal, cuánto pueden cobrarte, cómo reclamar y cuándo compensa pagar la penalización.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Cambio de compañía", "Tus derechos"],
  },
  {
    slug: "optimizar-potencia-contratada",
    title: "Cómo Optimizar la Potencia Contratada y Ahorrar en tu Factura",
    description:
      "Descubre si estás pagando de más por tu potencia contratada. Te enseñamos a calcular la potencia ideal y cómo cambiarla paso a paso.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Potencia", "Factura"],
  },
  {
    slug: "monitorizacion-consumo-energetico",
    title: "Monitorización del Consumo Energético: Guía para Empresas y Hogares",
    description:
      "Guía completa sobre monitorización energética: dispositivos, herramientas, implementación paso a paso y cómo interpretar los datos para ahorrar.",
    publishedAt: "2026-03-23",
    updatedAt: "2026-07-05",
    tags: ["Consumo", "Empresas"],
  },
  {
    slug: "comparativa-tarifas-luz",
    title: "Comparativa de Tarifas de Luz 2026: ¿Cuál es la Mejor para Ti?",
    description:
      "Comparamos PVPC vs precio fijo, con y sin discriminación horaria. Descubre qué tarifa se adapta mejor a tu perfil de consumo y cuánto puedes ahorrar.",
    publishedAt: "2026-03-10",
    updatedAt: "2026-07-05",
    tags: ["Tarifas"],
  },
  {
    slug: "como-cambiar-compania-luz",
    title: "Cómo Cambiar de Compañía de Luz: Guía Paso a Paso 2026",
    description:
      "Todo lo que necesitas saber para cambiar de compañía eléctrica sin cortes, sin papeleo y sin coste. Plazos, documentos y qué hacer si tienes permanencia.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-07-05",
    tags: ["Cambio de compañía"],
  },
  {
    slug: "guia-autoconsumo-fotovoltaico",
    title: "Guía Completa de Autoconsumo Fotovoltaico 2026: Todo lo que Necesitas Saber",
    description:
      "Tipos de instalación, costes, subvenciones disponibles, amortización y cuándo merece la pena instalar baterías. La guía definitiva del autoconsumo solar.",
    publishedAt: "2026-03-05",
    updatedAt: "2026-07-05",
    tags: ["Autoconsumo"],
  },
];

/** Hoy en Madrid como AAAA-MM-DD: marca qué artículos programados ya se ven. */
export function hoyEnMadrid(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
}

/** «26 de septiembre de 2026», sin sorpresas de zona horaria. */
export function fechaLarga(fecha: string): string {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Madrid",
  });
}

function aFecha(valor: unknown, campo: string, archivo: string): string {
  // gray-matter convierte una fecha sin comillas (2026-10-01) en un Date a medianoche UTC.
  if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
    return valor.toISOString().slice(0, 10);
  }
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor.trim())) return valor.trim();
  throw new Error(`[blog] ${archivo}: «${campo}» tiene que ser una fecha AAAA-MM-DD`);
}

function aTexto(valor: unknown, campo: string, archivo: string): string {
  if (typeof valor === "string" && valor.trim()) return valor.trim();
  throw new Error(`[blog] ${archivo}: falta «${campo}» en la cabecera`);
}

function leerArchivo(archivo: string): ArticuloMd {
  const slug = archivo.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `[blog] ${archivo}: el nombre del archivo es la dirección del artículo; solo minúsculas, números y guiones (sin tildes ni espacios)`,
    );
  }
  const { data, content } = matter(fs.readFileSync(path.join(CARPETA, archivo), "utf8"));
  return {
    slug,
    title: aTexto(data.title, "title", archivo),
    description: aTexto(data.description, "description", archivo),
    publishedAt: aFecha(data.publishedAt, "publishedAt", archivo),
    updatedAt: data.updatedAt ? aFecha(data.updatedAt, "updatedAt", archivo) : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.map((t: unknown) => String(t).trim()).filter(Boolean)
      : [],
    html: renderMarkdown(content),
  };
}

let cacheMd: ArticuloMd[] | null = null;

/** Todos los .md, también los programados. En producción los archivos no cambian: se leen una vez. */
function todosLosMd(): ArticuloMd[] {
  if (cacheMd && process.env.NODE_ENV === "production") return cacheMd;
  const archivos = fs.existsSync(CARPETA)
    ? fs.readdirSync(CARPETA).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort()
    : [];
  const slugsTsx = new Set(ARTICULOS_TSX.map((a) => a.slug));
  cacheMd = archivos.map((archivo) => {
    const articulo = leerArchivo(archivo);
    if (slugsTsx.has(articulo.slug)) {
      throw new Error(
        `[blog] ${archivo}: ya existe un artículo en /blog/${articulo.slug}; cambia el nombre del archivo`,
      );
    }
    return articulo;
  });
  return cacheMd;
}

// Orden estable: a igual fecha se respeta el orden de origen.
const masRecienteAntes = (a: ArticuloResumen, b: ArticuloResumen) =>
  b.publishedAt.localeCompare(a.publishedAt);

export function articulosMdPublicados(hoy = hoyEnMadrid()): ArticuloMd[] {
  return todosLosMd()
    .filter((a) => a.publishedAt <= hoy)
    .sort(masRecienteAntes);
}

/** El artículo Markdown si ya está publicado; `null` si no existe o todavía está programado. */
export function articuloMd(slug: string): ArticuloMd | null {
  return articulosMdPublicados().find((a) => a.slug === slug) ?? null;
}

/** Todo lo publicado (originales + Markdown), del más reciente al más antiguo. */
export function todosLosArticulos(): ArticuloResumen[] {
  return [...ARTICULOS_TSX, ...articulosMdPublicados()].sort(masRecienteAntes);
}

/** Hasta `n` artículos para «Sigue leyendo»: primero los que comparten más etiquetas. */
export function relacionados(articulo: ArticuloResumen, n = 3): ArticuloResumen[] {
  const comunes = (a: ArticuloResumen) => a.tags.filter((t) => articulo.tags.includes(t)).length;
  return todosLosArticulos()
    .filter((a) => a.slug !== articulo.slug)
    .sort((a, b) => comunes(b) - comunes(a) || masRecienteAntes(a, b))
    .slice(0, n);
}

/** Tarjeta al compartir el enlace (WhatsApp, redes) y datos de artículo para Open Graph. */
export function metaCompartir(articulo: ArticuloResumen): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "article",
      url: `${SITIO}/blog/${articulo.slug}`,
      title: articulo.title,
      description: articulo.description,
      siteName: "Vitergy",
      locale: "es_ES",
      publishedTime: articulo.publishedAt,
      modifiedTime: articulo.updatedAt ?? articulo.publishedAt,
      authors: [`${SITIO}/sobre-mi`],
      tags: articulo.tags,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Vitergy — Asesoría energética independiente",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: articulo.title,
      description: articulo.description,
      images: ["/og.png"],
    },
  };
}

/** Lo mismo para los 10 originales, por su dirección. */
export function metaCompartirTsx(slug: string): Pick<Metadata, "openGraph" | "twitter"> {
  const articulo = ARTICULOS_TSX.find((a) => a.slug === slug);
  if (!articulo) throw new Error(`[blog] ${slug} no está en ARTICULOS_TSX`);
  return metaCompartir(articulo);
}
