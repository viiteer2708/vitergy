import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articuloMd,
  articulosMdPublicados,
  fechaLarga,
  metaCompartir,
  relacionados,
  SITIO,
} from "@/lib/blog";

// Artículos en Markdown (src/content/blog). Los 10 originales tienen su propia carpeta en
// src/app/blog/<slug>/ y Next.js los sirve antes que esta ruta. Doc: docs/blog.md

// Se regenera cada hora: un artículo programado aparece solo al llegar su fecha, sin redesplegar.
export const revalidate = 3600;

export function generateStaticParams() {
  return articulosMdPublicados().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articulo = articuloMd(slug);
  if (!articulo) return {};
  return {
    title: `${articulo.title} - Vitergy`,
    description: articulo.description,
    alternates: { canonical: `${SITIO}/blog/${articulo.slug}` },
    ...metaCompartir(articulo),
  };
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const articulo = articuloMd(slug);
  if (!articulo) notFound();

  const url = `${SITIO}/blog/${articulo.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.title,
    description: articulo.description,
    image: `${SITIO}/og.png`,
    inLanguage: "es-ES",
    ...(articulo.tags.length > 0 && { keywords: articulo.tags.join(", ") }),
    author: {
      "@type": "Person",
      "@id": `${SITIO}/sobre-mi#victor-marron`,
      name: "Víctor Marrón",
      url: `${SITIO}/sobre-mi`,
    },
    publisher: {
      "@type": "Organization",
      name: "Vitergy",
      url: SITIO,
      logo: { "@type": "ImageObject", url: `${SITIO}/icon-512.png` },
    },
    datePublished: articulo.publishedAt,
    dateModified: articulo.updatedAt ?? articulo.publishedAt,
    mainEntityOfPage: url,
  };
  const sigueLeyendo = relacionados(articulo, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header>
          <Link href="/blog" className="text-sm font-medium text-[#f97316] hover:underline">
            ← Blog
          </Link>
          <time
            dateTime={articulo.publishedAt}
            className="mt-6 block text-sm font-medium text-gray-400"
          >
            {fechaLarga(articulo.publishedAt)}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {articulo.title}
          </h1>
          {articulo.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Temas">
              {articulo.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-medium text-orange-700"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prosa mt-8" dangerouslySetInnerHTML={{ __html: articulo.html }} />

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-orange-100 bg-white p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Quieres saber si estás pagando de más?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Sube tu factura a la calculadora de ahorro y en un minuto ves cuánto podrías
            ahorrar. Gratis y sin compromiso: si no hay ahorro, no se cobra.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contacto"
              className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Calcular mi ahorro
            </Link>
            <a
              href="https://wa.me/34633151083"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </section>

        {sigueLeyendo.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-gray-900">Sigue leyendo</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {sigueLeyendo.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="block h-full rounded-2xl border border-orange-100 bg-white p-5 text-sm font-semibold leading-snug text-gray-900 shadow-sm transition hover:border-[#f97316] hover:text-[#f97316]"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-12">
          <Link href="/blog" className="font-semibold text-[#f97316] hover:underline">
            ← Volver al blog
          </Link>
        </p>
      </article>
    </>
  );
}
