import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fechaLarga, SITIO, todosLosArticulos } from "@/lib/blog";

// Los artículos salen de src/lib/blog.ts (los 10 originales + los Markdown publicados).
// Paginación por URL (/blog?page=2) para que Google llegue a todos: no hace scroll.
const POR_PAGINA = 20;

const TITULO = "Blog de Ahorro Energético | Guías y Consejos para Pagar Menos - Vitergy";
const DESCRIPCION =
  "Guías prácticas, consejos de ahorro y análisis del mercado eléctrico. Todo lo que necesitas saber para pagar menos en tu factura de luz y gas.";

type Props = { searchParams: Promise<{ page?: string | string[] }> };

async function paginaPedida(searchParams: Props["searchParams"]): Promise<number> {
  const { page } = await searchParams;
  const n = Number(Array.isArray(page) ? page[0] : page);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const pagina = await paginaPedida(searchParams);
  if (pagina === 1) {
    return { title: TITULO, description: DESCRIPCION, alternates: { canonical: `${SITIO}/blog` } };
  }
  return {
    title: `Blog de Ahorro Energético (página ${pagina}) - Vitergy`,
    description: DESCRIPCION,
    alternates: { canonical: `${SITIO}/blog?page=${pagina}` },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const pagina = await paginaPedida(searchParams);
  const todos = todosLosArticulos();
  const totalPaginas = Math.max(1, Math.ceil(todos.length / POR_PAGINA));
  if (pagina > totalPaginas) notFound();
  const articulos = todos.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);
  const enlacePagina = (n: number) => (n === 1 ? "/blog" : `/blog?page=${n}`);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* H1 */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Blog:{" "}
        <span className="text-[#f97316]">
          Guías y Consejos para Ahorrar en tu Factura de Luz
        </span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Artículos prácticos sobre el mercado eléctrico español, tarifas, ahorro
        energético y autoconsumo. Escritos por un asesor energético con más de 10
        años de experiencia.
      </p>

      {/* Grid de artículos */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articulos.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:border-[#f97316] hover:shadow-md"
          >
            <time dateTime={article.publishedAt} className="text-xs font-medium text-gray-400">
              {fechaLarga(article.publishedAt)}
            </time>
            <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-[#f97316]">
              {article.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{article.description}</p>
            {article.tags.length > 0 && (
              <span className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-xs font-medium text-orange-700"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
            <span className="mt-auto pt-4 text-sm font-semibold text-[#f97316]">
              Leer artículo →
            </span>
          </Link>
        ))}
      </div>

      {totalPaginas > 1 && (
        <nav
          aria-label="Páginas del blog"
          className="mt-12 flex items-center justify-between gap-4 text-sm font-semibold"
        >
          {pagina > 1 ? (
            <Link href={enlacePagina(pagina - 1)} className="text-[#f97316] hover:underline">
              ← Más recientes
            </Link>
          ) : (
            <span />
          )}
          <span className="font-medium text-gray-500">
            Página {pagina} de {totalPaginas}
          </span>
          {pagina < totalPaginas ? (
            <Link href={enlacePagina(pagina + 1)} className="text-[#f97316] hover:underline">
              Anteriores →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
