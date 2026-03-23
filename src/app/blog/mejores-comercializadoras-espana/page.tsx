import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Mejores Comercializadoras de Luz en España [Ranking 2026] - Vitergy",
  description:
    "Ranking 2026 de mejores compañías de luz en España. Análisis de cada comercializadora, tabla comparativa y cómo elegir. ¡Encuentra la mejor!",
  alternates: {
    canonical: "https://vitergy.es/blog/mejores-comercializadoras-espana",
  },
};

const faqs = [
  {
    question: "¿Cuál es la mejor comercializadora de luz en España?",
    answer:
      "No existe una mejor universal, depende del perfil del consumidor. El consenso general es: mejor precio Holaluz, mejores valores éticos Podo, mejor seguridad Endesa, y mejor opción 100% renovable Som Energía.",
  },
  {
    question: "¿Debo cambiar de comercializadora si no estoy contento?",
    answer:
      "Depende de tu permanencia. Si ya venció, puedes cambiar sin problema. Si estás en permanencia y el ahorro es menor que la penalización, es mejor esperar. Si el ahorro supera la penalización, conviene cambiar.",
  },
  {
    question: "¿Hay diferencia real entre Endesa e Iberdrola?",
    answer:
      "La diferencia es mínima. El precio es casi idéntico, el servicio es similar, la permanencia es igual (24 meses) y las reclamaciones son comparables. Lo mejor es elegir la que tenga mejor oferta en el momento.",
  },
  {
    question: "¿Las comercializadoras pequeñas son más arriesgadas?",
    answer:
      "El riesgo es bajo. Compañías como Holaluz y Podo llevan más de 10 años y son solventes. Además, la CNMC garantiza que si una comercializadora quiebra, la distribuidora sigue suministrando electricidad. Se recomienda priorizar precio y servicio sobre el tamaño de la compañía.",
  },
  {
    question: "¿Es obligatorio cambiar de compañía cada año?",
    answer:
      "No es obligatorio, pero sí recomendable porque el mercado cambia y aparecen ofertas nuevas mensualmente. La frecuencia ideal es anualmente para optimizar precio, cada 2 años como mínimo si hay permanencia, y cada 3 años como máximo aceptable.",
  },
  {
    question: "¿Qué compañía de luz tiene mejor app?",
    answer:
      "El ranking de mejores apps es: 1. Holaluz (intuitiva, datos en tiempo real), 2. Podo (funcional, comunidad integrada), 3. Endesa (buena, muchas funciones), 4. Iberdrola (similar a Endesa).",
  },
  {
    question: "¿Puedo negociar directamente con mi compañía de luz?",
    answer:
      "Sí, es posible en muchos casos. Los mejores candidatos para negociar son clientes de 2 o más años, con consumo alto (más de 5.000 kWh/año), o que amenacen con cambiar. Típicamente se puede conseguir un 10-20% de reducción.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Las Mejores Comercializadoras de Luz en España [Ranking 2026]",
    description:
      "Ranking 2026 de mejores compañías de luz en España. Análisis de cada comercializadora, tabla comparativa y cómo elegir.",
    author: {
      "@type": "Person",
      name: "Víctor Marrón",
      url: "https://vitergy.es/sobre-mi",
    },
    publisher: {
      "@type": "Organization",
      name: "Vitergy",
      url: "https://vitergy.es",
    },
    datePublished: "2026-03-23",
    dateModified: "2026-03-23",
    mainEntityOfPage:
      "https://vitergy.es/blog/mejores-comercializadoras-espana",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function MejoresComercializadorasEspanaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header>
          <time className="text-sm font-medium text-gray-400">
            23 de marzo de 2026
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Las Mejores Comercializadoras de Luz en España:{" "}
            <span className="text-[#f97316]">Ranking 2026</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            Con más de 400 comercializadoras de electricidad operando en España,
            elegir la mejor compañía de luz puede resultar abrumador. En este
            ranking 2026 analizamos las principales comercializadoras según
            precio, servicio al cliente, transparencia y productos ofrecidos
            para ayudarte a tomar la mejor decisión.
          </p>
          <p>
            Hemos evaluado cada compañía con criterios objetivos y ponderados
            para ofrecerte una guía clara y actualizada. No existe una
            &quot;mejor&quot; comercializadora universal: la mejor opción
            depende de tu perfil como consumidor.
          </p>

          {/* Criterios de Evaluación */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Criterios de Evaluación
            </h2>
            <p className="mt-4">
              Hemos evaluado las comercializadoras españolas según estos cinco
              criterios ponderados:
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h3 className="font-semibold text-gray-900">
                  Precio{" "}
                  <span className="text-sm font-normal text-[#f97316]">
                    (Peso 35%)
                  </span>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Tarifa base en €/kWh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Comparación frente al PVPC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Bonificaciones iniciales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Oferta competitiva general</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h3 className="font-semibold text-gray-900">
                  Servicio al Cliente{" "}
                  <span className="text-sm font-normal text-[#f97316]">
                    (Peso 25%)
                  </span>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Disponibilidad (teléfono, chat, email)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Tiempos de respuesta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Satisfacción del cliente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Facilidad de gestiones</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h3 className="font-semibold text-gray-900">
                  Transparencia{" "}
                  <span className="text-sm font-normal text-[#f97316]">
                    (Peso 20%)
                  </span>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Claridad de contrato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Ausencia de cláusulas abusivas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Información accesible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Reclamaciones ante CNMC</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h3 className="font-semibold text-gray-900">
                  Productos y Servicios{" "}
                  <span className="text-sm font-normal text-[#f97316]">
                    (Peso 15%)
                  </span>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Variedad de tarifas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Discriminación horaria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Servicios adicionales (app, seguimiento)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Energía renovable</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h3 className="font-semibold text-gray-900">
                  Estabilidad{" "}
                  <span className="text-sm font-normal text-[#f97316]">
                    (Peso 5%)
                  </span>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Años en el mercado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Solvencia financiera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Riesgo de insolvencia</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              Para entender mejor cómo funcionan las tarifas reguladas, te
              recomendamos leer{" "}
              <Link
                href="/blog/pvpc-precio-voluntario"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                qué es el PVPC y cómo funciona
              </Link>
              .
            </p>
          </section>

          {/* Ranking 2026 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Ranking de Comercializadoras 2026
            </h2>

            {/* Holaluz */}
            <div className="mt-6 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#1</span> Holaluz
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  9,2/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Comercializadora digital pura — Fundada en 2013
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Precio muy competitivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Atención al cliente excelente (chat, email rápido)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>App intuitiva y funcional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Transparencia total</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Energía 100% renovable sin coste extra</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Sin permanencia</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Sin atención telefónica (solo chat/email)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Posible demora en activación para nuevos clientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Ofertas cambian con frecuencia</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,22-0,26 €/kWh |{" "}
                <strong>Recomendada para:</strong> Jóvenes y perfiles digitales
                que buscan el mejor precio con transparencia.
              </p>
            </div>

            {/* Podo */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#2</span> Podo
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  9,0/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Cooperativa de energía — Fundada en 2016
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Precio competitivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Modelo cooperativa (clientes participan)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Energía 100% renovable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Sin permanencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Comunidad activa y transparencia elevada</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Menos conocida que las grandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Teléfono a veces saturado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Proceso de activación puede ser más lento</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,23-0,27 €/kWh |{" "}
                <strong>Recomendada para:</strong> Quien busca valores éticos,
                energía renovable y una alternativa a las grandes.
              </p>
            </div>

            {/* Endesa */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#3</span> Endesa
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  7,5/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Comercializadora grande (grupo Enel) — Fundada en 1944
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Precio competitivo con lanzamientos frecuentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Servicio al cliente 24/7 (teléfono, chat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Estabilidad y solvencia garantizadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Variedad de tarifas y app de calidad</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Precio medio, no siempre el más barato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Permanencia típica de 24 meses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Algunas reclamaciones por cambios de tarifa</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,24-0,28 €/kWh |{" "}
                <strong>Recomendada para:</strong> Quien prefiere seguridad y
                variedad con una marca consolidada. Ten en cuenta que con
                permanencia de 24 meses, si decides cambiar antes deberías
                informarte sobre la{" "}
                <Link
                  href="/blog/penalizacion-cambio-compania"
                  className="font-medium text-[#f97316] underline hover:text-orange-600"
                >
                  penalización por cambiar de compañía
                </Link>
                .
              </p>
            </div>

            {/* Iberdrola */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#4</span> Iberdrola
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  7,4/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Comercializadora grande (grupo Iberdrola) — Fundada en 1992
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Segunda comercializadora más grande de España</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Servicio 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Oferta competitiva y múltiples tarifas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Alta estabilidad financiera</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Precio no siempre el más barato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Permanencia obligatoria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Algunas reclamaciones de servicio</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,25-0,29 €/kWh |{" "}
                <strong>Recomendada para:</strong> Alternativa grande a Endesa
                que prioriza estabilidad sobre flexibilidad.
              </p>
            </div>

            {/* Naturgy */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#5</span> Naturgy
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  7,2/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Comercializadora grande (gas + electricidad) — Fundada en 1843
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Oferta combinada gas + luz con ahorro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Servicio 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Estabilidad probada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Cobertura total en España</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Precio medio, no es el más barato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Permanencia de 24-36 meses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Más reclamaciones ante CNMC que la competencia</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,26-0,30 €/kWh |{" "}
                <strong>Recomendada para:</strong> Quien necesita combinar gas +
                luz. Mejor negociar condiciones.
              </p>
            </div>

            {/* EDP */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="text-[#f97316]">#6</span> EDP
                </h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[#f97316]">
                  7,0/10
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Comercializadora grande (portuguesa, presente en España) —
                Desde 1997 en España
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Fortalezas
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Precio competitivo con buenos lanzamientos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Servicio 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Presencia creciente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">•</span>
                      <span>Energía renovable</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Debilidades
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Menos reconocida que otras grandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Permanencia típica de 24 meses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-red-400">•</span>
                      <span>Servicio menos consolidado</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Precio orientativo:</strong> 0,24-0,28 €/kWh |{" "}
                <strong>Recomendada para:</strong> Alternativa con buenas
                ofertas de lanzamiento. Conviene negociar.
              </p>
            </div>

            {/* Otras menciones */}
            <div className="mt-4 rounded-lg border border-orange-100 bg-white p-6">
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-[#f97316]">#7-10</span> Otras menciones
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    Viesgo{" "}
                    <span className="text-sm font-normal text-[#f97316]">
                      7,0/10
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Comercializadora regional fuerte con precio competitivo y
                    buen servicio.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Som Energía{" "}
                    <span className="text-sm font-normal text-[#f97316]">
                      6,8/10
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Cooperativa especializada, 100% renovable con comunidad
                    activa. Precio puede ser más alto.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Gana Energía{" "}
                    <span className="text-sm font-normal text-[#f97316]">
                      6,5/10
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Comercializadora independiente con precio variable y
                    presencia creciente.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Comercializadores Locales{" "}
                    <span className="text-sm font-normal text-gray-400">
                      variable
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Dependen de la región. A veces ofrecen mejor precio local
                    y servicio personalizado.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Análisis Individual */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Análisis Individual por Compañía
            </h2>

            {/* Holaluz detallado */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900">
                Holaluz — Análisis Detallado
              </h3>
              <div className="mt-3 space-y-3">
                <p>
                  <strong>Datos generales:</strong> Aproximadamente 300.000
                  clientes, presencia principalmente online, fundada en 2013
                  con sede en Madrid. Especializada en perfiles digitales que
                  buscan el mejor precio.
                </p>
                <p>
                  <strong>Tarifa típica:</strong> Variable indexada al mercado
                  mayorista + 15% de margen. Bonificación de bienvenida entre
                  100-150 € dependiendo del mes. Sin permanencia, puedes
                  cambiar cuando quieras.
                </p>
                <p>
                  <strong>Servicio:</strong> Chat 24/7 con respuesta típica de
                  5-10 minutos. Email con respuesta en 24h. App muy intuitiva
                  con datos en tiempo real. <strong>Sin teléfono</strong>, que
                  es su principal limitación.
                </p>
                <p>
                  <strong>Energía:</strong> 100% renovable sin coste extra,
                  con certificado europeo.
                </p>
                <p>
                  <strong>Reclamaciones:</strong> Pocas ante CNMC, buenas
                  prácticas y respuesta rápida ante problemas.
                </p>
                <p className="font-medium">
                  Veredicto: Mejor opción para jóvenes y perfiles digitales.
                  Excelente relación precio-servicio.
                </p>
              </div>
            </div>

            {/* Podo detallado */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Podo — Análisis Detallado
              </h3>
              <div className="mt-3 space-y-3">
                <p>
                  <strong>Datos generales:</strong> Aproximadamente 100.000
                  clientes, presencia principalmente online, fundada en 2016.
                  Modelo cooperativa donde los clientes son socios.
                </p>
                <p>
                  <strong>Tarifa típica:</strong> Indexada al índice mayorista
                  con un margen del 10-15%, uno de los mejores del mercado.
                  Sin permanencia.
                </p>
                <p>
                  <strong>Servicio:</strong> Chat en horario de 8:00 a 20:00.
                  Email con respuesta en 24h. Teléfono de 11:00 a 19:00,
                  aunque a veces saturado. App útil.
                </p>
                <p>
                  <strong>Modelo cooperativa:</strong> Los clientes son socios,
                  participan en decisiones y en la distribución de beneficios.
                </p>
                <p>
                  <strong>Reclamaciones:</strong> Mínimas ante CNMC con
                  respuesta ágil.
                </p>
                <p className="font-medium">
                  Veredicto: Ideal para quien valora la ética y la
                  sostenibilidad. Alternativa pequeña con margen excelente.
                </p>
              </div>
            </div>

            {/* Endesa detallado */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Endesa — Análisis Detallado
              </h3>
              <div className="mt-3 space-y-3">
                <p>
                  <strong>Datos generales:</strong> Aproximadamente 11 millones
                  de clientes, presencia en las 17 comunidades autónomas,
                  fundada en 1944. Matriz: Enel (italiano).
                </p>
                <p>
                  <strong>Tarifas:</strong> Precio fijo de mercado variable
                  según el mes con bonificaciones frecuentes. También
                  disponible en PVPC. Discriminación horaria disponible.
                </p>
                <p>
                  <strong>Servicio:</strong> Teléfono 24/7, chat disponible,
                  email con respuesta en 48h, app de buena calidad y oficinas
                  físicas.
                </p>
                <p>
                  <strong>Energía:</strong> Mezcla de renovable y convencional.
                  Planes 100% renovable disponibles con coste extra.
                </p>
                <p>
                  <strong>Reclamaciones:</strong> Más reclamaciones ante CNMC
                  que las pequeñas, aunque típicamente resueltas.
                </p>
                <p className="font-medium">
                  Veredicto: Seguridad y variedad con marca consolidada, pero
                  precio menos competitivo.
                </p>
              </div>
            </div>

            {/* Otras grandes */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Otras Grandes: Iberdrola, Naturgy y EDP
              </h3>
              <div className="mt-3 space-y-3">
                <p>
                  <strong>Características comunes:</strong> Solidez
                  garantizada, servicio 24/7 por teléfono, permanencia típica
                  de 24 meses, precio medio-alto, variedad de tarifas y más
                  reclamaciones ante CNMC que las pequeñas.
                </p>
                <p>
                  <strong>Diferencias clave:</strong>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>
                      <strong>Iberdrola:</strong> Segunda en cuota de mercado,
                      buena estabilidad
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>
                      <strong>Naturgy:</strong> Especializada en gas + luz,
                      precio más alto
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>
                      <strong>EDP:</strong> Presencia creciente, buenas ofertas
                      de lanzamiento
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tabla Comparativa */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Tabla Comparativa Completa 2026
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      Compañía
                    </th>
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      Nota
                    </th>
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      €/kWh
                    </th>
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      Bonificación
                    </th>
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      Permanencia
                    </th>
                    <th className="px-3 py-2 font-semibold text-gray-900">
                      Renovable
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Holaluz
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">9,2/10</td>
                    <td className="px-3 py-2">0,22-0,26</td>
                    <td className="px-3 py-2">100-150 €</td>
                    <td className="px-3 py-2">No</td>
                    <td className="px-3 py-2">100%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Podo
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">9,0/10</td>
                    <td className="px-3 py-2">0,23-0,27</td>
                    <td className="px-3 py-2">80-120 €</td>
                    <td className="px-3 py-2">No</td>
                    <td className="px-3 py-2">100%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Endesa
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">7,5/10</td>
                    <td className="px-3 py-2">0,24-0,28</td>
                    <td className="px-3 py-2">60-100 €</td>
                    <td className="px-3 py-2">24m</td>
                    <td className="px-3 py-2">Mixta</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Iberdrola
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">7,4/10</td>
                    <td className="px-3 py-2">0,25-0,29</td>
                    <td className="px-3 py-2">60-100 €</td>
                    <td className="px-3 py-2">24m</td>
                    <td className="px-3 py-2">Mixta</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Naturgy
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">7,2/10</td>
                    <td className="px-3 py-2">0,26-0,30</td>
                    <td className="px-3 py-2">50-80 €</td>
                    <td className="px-3 py-2">24-36m</td>
                    <td className="px-3 py-2">Mixta</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      EDP
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">7,0/10</td>
                    <td className="px-3 py-2">0,24-0,28</td>
                    <td className="px-3 py-2">60-100 €</td>
                    <td className="px-3 py-2">24m</td>
                    <td className="px-3 py-2">Renovable</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Viesgo
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">7,0/10</td>
                    <td className="px-3 py-2">0,24-0,28</td>
                    <td className="px-3 py-2">60-100 €</td>
                    <td className="px-3 py-2">12-24m</td>
                    <td className="px-3 py-2">Mixta</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Som Energía
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">6,8/10</td>
                    <td className="px-3 py-2">0,27-0,31</td>
                    <td className="px-3 py-2">Bajo</td>
                    <td className="px-3 py-2">No</td>
                    <td className="px-3 py-2">100%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-900">
                      Gana Energía
                    </td>
                    <td className="px-3 py-2 text-[#f97316]">6,5/10</td>
                    <td className="px-3 py-2">Variable</td>
                    <td className="px-3 py-2">Variable</td>
                    <td className="px-3 py-2">Variable</td>
                    <td className="px-3 py-2">Variable</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 italic">
              Datos estimados marzo 2026. Consulta ofertas actuales antes de
              contratar.
            </p>
            <p className="mt-3">
              Para un análisis detallado de cada tarifa, consulta nuestra{" "}
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                comparativa de tarifas de luz
              </Link>{" "}
              actualizada.
            </p>
          </section>

          {/* Cómo Elegir */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Cómo Elegir tu Comercializadora Ideal
            </h2>

            {/* Paso 1: Define tu Perfil */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Paso 1: Define tu perfil
              </h3>
              <p className="mt-2">
                Antes de elegir, responde a estas preguntas clave:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">1.</span>
                  <span>¿Cuál es tu consumo anual en kWh?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">2.</span>
                  <span>¿Valoras más el precio o el servicio?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">3.</span>
                  <span>¿Quieres energía 100% renovable?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">4.</span>
                  <span>
                    ¿Tienes preferencia por atención telefónica vs. chat?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">5.</span>
                  <span>¿Tolerarías cambiar de compañía en 1-2 años?</span>
                </li>
              </ul>
            </div>

            {/* Paso 2: Filtra por Perfil */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Paso 2: Filtra por perfil
              </h3>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg border border-orange-100 bg-white p-4">
                  <p className="font-semibold text-gray-900">
                    Perfil A:{" "}
                    <span className="text-[#f97316]">
                      &quot;Quiero el MEJOR PRECIO&quot;
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Holaluz → Podo → EDP → Endesa
                  </p>
                </div>
                <div className="rounded-lg border border-orange-100 bg-white p-4">
                  <p className="font-semibold text-gray-900">
                    Perfil B:{" "}
                    <span className="text-[#f97316]">
                      &quot;Quiero VALORES ÉTICOS&quot;
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Podo → Holaluz → Som Energía
                  </p>
                </div>
                <div className="rounded-lg border border-orange-100 bg-white p-4">
                  <p className="font-semibold text-gray-900">
                    Perfil C:{" "}
                    <span className="text-[#f97316]">
                      &quot;Quiero SEGURIDAD + VARIEDAD&quot;
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Endesa → Iberdrola → Naturgy
                  </p>
                </div>
                <div className="rounded-lg border border-orange-100 bg-white p-4">
                  <p className="font-semibold text-gray-900">
                    Perfil D:{" "}
                    <span className="text-[#f97316]">
                      &quot;Quiero COMODIDAD (todo resuelto)&quot;
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Endesa → Naturgy → Iberdrola
                  </p>
                </div>
                <div className="rounded-lg border border-orange-100 bg-white p-4">
                  <p className="font-semibold text-gray-900">
                    Perfil E:{" "}
                    <span className="text-[#f97316]">
                      &quot;Quiero CAMBIAR FRECUENTEMENTE&quot;
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Holaluz → Podo → EDP
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 3: Compara Ofertas */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Paso 3: Compara ofertas específicas
              </h3>
              <p className="mt-2">
                Utiliza nuestro{" "}
                <Link
                  href="/comparador-tarifas-luz"
                  className="font-medium text-[#f97316] underline hover:text-orange-600"
                >
                  comparador de tarifas de luz
                </Link>{" "}
                para encontrar la mejor oferta personalizada. Introduce tu CUPS
                y consumo para obtener un presupuesto real.
              </p>
              <p className="mt-3">
                <strong>Qué comparar:</strong> Precio final anual (no solo
                €/kWh), bonificación de bienvenida, permanencia y calidad del
                servicio. La mejor oferta típicamente cambia mes a mes, así que
                compara en el momento actual.
              </p>
            </div>

            {/* Paso 4: Valida Reputación */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Paso 4: Valida la reputación
              </h3>
              <p className="mt-2">Antes de contratar, verifica:</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>
                    Google Reviews de la compañía: media superior a 4/5
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>
                    Calificación alta en organismos de consumo
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>CNMC: número de reclamaciones bajo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>
                    Redes sociales: tono de conversación con clientes
                  </span>
                </li>
              </ul>
            </div>

            {/* Paso 5: Contrata */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">
                Paso 5: Contrata
              </h3>
              <p className="mt-2">El proceso típico es sencillo:</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">1.</span>
                  <span>Selecciona la compañía en el comparador</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">2.</span>
                  <span>Completa tus datos (CUPS, DNI, IBAN)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">3.</span>
                  <span>Confirma el presupuesto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">4.</span>
                  <span>Espera confirmación (1-2 días)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">5.</span>
                  <span>Cambio efectivo (5-15 días)</span>
                </li>
              </ul>
              <p className="mt-3">
                Si necesitas ayuda con el proceso, lee nuestra guía sobre{" "}
                <Link
                  href="/blog/como-cambiar-compania-luz"
                  className="font-medium text-[#f97316] underline hover:text-orange-600"
                >
                  cómo cambiar de compañía de luz
                </Link>{" "}
                paso a paso.
              </p>
            </div>
          </section>

          {/* Opiniones de Clientes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Opiniones de Clientes
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Holaluz</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Excelente precio y atención. El único problema: no hay
                  teléfono.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Podo</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Valores claros, precio bueno. Comunidad activa y
                  transparente.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Endesa</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Servicio seguro y variado. Pero precio no es lo
                  mejor.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Iberdrola</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Alternativa Endesa. Similar en todo.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Naturgy</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Combo gas+luz bien. Pero caros. Negociar
                  siempre.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">EDP</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;Sorpresas agradables en precio. Servicio
                  mejora.&quot;
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <p className="font-semibold text-gray-900">Som Energía</p>
                <p className="mt-1 text-sm text-gray-600 italic">
                  &quot;100% renovable es importante. Precio más alto pero
                  vale la pena.&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: Elige Según tu Perfil
            </h2>
            <p className="mt-4">
              No hay una &quot;mejor&quot; comercializadora universal. Hay una
              mejor <strong>para ti</strong>:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Buscas precio:</strong> Holaluz
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Buscas valores:</strong> Podo
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Buscas seguridad:</strong> Endesa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Buscas renovable:</strong> Som Energía
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Buscas el mejor mix:</strong> Podo
                </span>
              </li>
            </ul>
            <p className="mt-4">
              <strong>Ahorro esperado:</strong> Entre 100 y 300 €/año
              dependiendo de cuánto tiempo lleves sin cambiar de
              comercializadora.
            </p>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-orange-100 bg-white p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Necesitas ayuda para elegir la mejor comercializadora?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy analizamos tu factura, comparamos las mejores opciones
              del mercado y te recomendamos la comercializadora ideal para tu
              perfil. Gratis y sin compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/comparador-tarifas-luz"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Comparar tarifas →
              </Link>
              <Link
                href="/contacto"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Solicitar análisis gratuito
              </Link>
            </div>
          </section>

          {/* Nota final */}
          <p className="text-sm text-gray-500 italic">
            Ranking marzo 2026. Las posiciones cambian con el mercado. Consulta
            ofertas actuales. Vitergy: Especialistas en optimización de tarifas.
            Hemos asesorado a más de 10.000 clientes.
          </p>

          {/* Links internos */}
          <section>
            <h2 className="text-lg font-bold text-gray-900">
              Artículos y servicios relacionados
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/cambiar-compania-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cambiar de compañía de luz
              </Link>
              <Link
                href="/penalizaciones-electricas"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Penalizaciones eléctricas
              </Link>
              <Link
                href="/comparador-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparador de tarifas de luz
              </Link>
              <Link
                href="/blog/como-cambiar-compania-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cómo cambiar de compañía
              </Link>
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparativa de tarifas
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
