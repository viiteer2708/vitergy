import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog de Ahorro Energético | Guías y Consejos para Pagar Menos - Vitergy",
  description:
    "Guías prácticas, consejos de ahorro y análisis del mercado eléctrico. Todo lo que necesitas saber para pagar menos en tu factura de luz y gas.",
  alternates: {
    canonical: "https://vitergy.es/blog",
  },
};

const articles = [
  {
    slug: "como-calcular-consumo-electrico",
    title: "Cómo Calcular tu Consumo Eléctrico en kWh [Fórmulas + Ejemplos]",
    description:
      "Aprende a calcular el consumo eléctrico de tu hogar con fórmulas sencillas, ejemplos prácticos y tablas de consumo por electrodoméstico. Ahorra hasta un 30%.",
    date: "2026-03-23",
  },
  {
    slug: "pvpc-precio-voluntario",
    title: "PVPC: Qué Es y Cómo Funciona el Precio Voluntario [Guía 2026]",
    description:
      "Todo sobre el PVPC: cómo se calcula, horarios, ventajas e inconvenientes, y cuándo te conviene frente a una tarifa de precio fijo. Comparativa detallada.",
    date: "2026-03-23",
  },
  {
    slug: "entender-factura-luz",
    title: "Cómo Entender tu Factura de la Luz: Guía Completa con Ejemplos",
    description:
      "Desglosamos cada concepto de tu factura eléctrica: término de potencia, consumo, peajes, impuestos y cargos. Con ejemplo real de factura analizada.",
    date: "2026-03-23",
  },
  {
    slug: "mejores-comercializadoras-espana",
    title: "Las Mejores Comercializadoras de Luz en España [Ranking 2026]",
    description:
      "Ranking actualizado de las mejores compañías eléctricas en España. Comparamos precios, atención al cliente, energía verde y condiciones de contrato.",
    date: "2026-03-23",
  },
  {
    slug: "penalizacion-cambio-compania",
    title: "Penalización por Cambiar de Compañía Eléctrica: ¿Es Legal?",
    description:
      "¿Te cobran por cambiar de compañía de luz? Explicamos cuándo es legal, cuánto pueden cobrarte, cómo reclamar y cuándo compensa pagar la penalización.",
    date: "2026-03-23",
  },
  {
    slug: "optimizar-potencia-contratada",
    title: "Cómo Optimizar la Potencia Contratada y Ahorrar en tu Factura",
    description:
      "Descubre si estás pagando de más por tu potencia contratada. Te enseñamos a calcular la potencia ideal y cómo cambiarla paso a paso.",
    date: "2026-03-23",
  },
  {
    slug: "monitorizacion-consumo-energetico",
    title: "Monitorización del Consumo Energético: Guía para Empresas y Hogares",
    description:
      "Guía completa sobre monitorización energética: dispositivos, herramientas, implementación paso a paso y cómo interpretar los datos para ahorrar.",
    date: "2026-03-23",
  },
  {
    slug: "comparativa-tarifas-luz",
    title: "Comparativa de Tarifas de Luz 2026: ¿Cuál es la Mejor para Ti?",
    description:
      "Comparamos PVPC vs precio fijo, con y sin discriminación horaria. Descubre qué tarifa se adapta mejor a tu perfil de consumo y cuánto puedes ahorrar.",
    date: "2026-03-10",
  },
  {
    slug: "como-cambiar-compania-luz",
    title: "Cómo Cambiar de Compañía de Luz: Guía Paso a Paso 2026",
    description:
      "Todo lo que necesitas saber para cambiar de compañía eléctrica sin cortes, sin papeleo y sin coste. Plazos, documentos y qué hacer si tienes permanencia.",
    date: "2026-03-08",
  },
  {
    slug: "guia-autoconsumo-fotovoltaico",
    title:
      "Guía Completa de Autoconsumo Fotovoltaico 2026: Todo lo que Necesitas Saber",
    description:
      "Tipos de instalación, costes, subvenciones disponibles, amortización y cuándo merece la pena instalar baterías. La guía definitiva del autoconsumo solar.",
    date: "2026-03-05",
  },
];

export default function BlogPage() {
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
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:border-[#f97316] hover:shadow-md"
          >
            <time className="text-xs font-medium text-gray-400">
              {new Date(article.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-[#f97316]">
              {article.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {article.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-[#f97316]">
              Leer artículo →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
