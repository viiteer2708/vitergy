import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Comparativa de Tarifas de Luz 2026 | Las Mejores Ofertas Eléctricas - Vitergy",
  description:
    "Comparamos las mejores tarifas de luz de 2026: PVPC vs precio fijo, con discriminación horaria y sin ella. Descubre qué tarifa es mejor para tu perfil de consumo.",
  alternates: {
    canonical: "https://vitergy.es/blog/comparativa-tarifas-luz",
  },
};

const faqs = [
  {
    question: "¿Qué es más barato en 2026, el PVPC o una tarifa de precio fijo?",
    answer:
      "Depende de tu perfil de consumo y del momento del mercado. El PVPC puede ser más barato si concentras tu consumo en horas valle (noches y fines de semana), pero conlleva volatilidad. Una tarifa fija te da estabilidad y es más predecible. En Vitergy analizamos tu consumo horario real para recomendarte la opción más económica.",
  },
  {
    question: "¿Merece la pena la discriminación horaria?",
    answer:
      "Sí, para la mayoría de hogares. Desde 2021 todos los contratos domésticos tienen tres tramos horarios (punta, llano y valle). Si puedes programar electrodomésticos potentes (lavadora, lavavajillas, horno) en horario valle (0:00-8:00 y fines de semana), ahorrarás significativamente.",
  },
  {
    question: "¿Cada cuánto debería revisar si mi tarifa sigue siendo competitiva?",
    answer:
      "Recomendamos revisar tu tarifa al menos una vez al año, o cuando notes subidas en tu factura. El mercado energético cambia constantemente y las ofertas de las comercializadoras se actualizan con frecuencia. Nosotros ofrecemos un seguimiento gratuito a nuestros clientes.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Comparativa de Tarifas de Luz 2026: ¿Cuál es la Mejor para Ti?",
    description:
      "Comparamos las mejores tarifas de luz de 2026: PVPC vs precio fijo, con discriminación horaria y sin ella.",
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
    datePublished: "2026-03-10",
    dateModified: "2026-03-10",
    mainEntityOfPage: "https://vitergy.es/blog/comparativa-tarifas-luz",
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

export default function ComparativaTarifasLuzPage() {
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
            10 de marzo de 2026
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comparativa de Tarifas de Luz 2026:{" "}
            <span className="text-[#f97316]">¿Cuál es la Mejor para Ti?</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            El mercado eléctrico español cuenta con más de 400 comercializadoras
            activas y cientos de ofertas de tarifas diferentes. Para un consumidor
            normal, comparar todas estas opciones es prácticamente imposible. Y sin
            embargo, elegir bien tu tarifa de luz puede suponer un ahorro de entre
            100 € y 300 € al año, dependiendo de tu consumo.
          </p>
          <p>
            En esta guía vamos a explicarte los tipos de tarifa que existen en
            España, las diferencias entre el PVPC y el mercado libre, cuándo
            conviene la discriminación horaria y qué debes mirar exactamente antes
            de firmar con una comercializadora. Sin tecnicismos innecesarios y con
            ejemplos prácticos.
          </p>

          {/* PVPC vs Precio Fijo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              PVPC vs Precio Fijo: las dos grandes opciones
            </h2>
            <p className="mt-4">
              En España existen dos grandes tipos de contrato eléctrico: el{" "}
              <strong>PVPC (Precio Voluntario para el Pequeño Consumidor)</strong>{" "}
              y las <strong>tarifas de precio fijo del mercado libre</strong>.
              Entender la diferencia es fundamental para elegir bien.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900">PVPC (tarifa regulada)</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>• Precio del kWh varía cada hora según el mercado mayorista</li>
                  <li>• Regulado por el Gobierno, solo disponible con comercializadoras de referencia</li>
                  <li>• Sin permanencia ni penalizaciones</li>
                  <li>• Puede ser muy barato en horas valle, pero caro en horas punta</li>
                  <li>• Requiere atención a los horarios de consumo</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900">Precio fijo (mercado libre)</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>• Precio del kWh fijo durante toda la duración del contrato</li>
                  <li>• Ofrecido por cualquier comercializadora del mercado libre</li>
                  <li>• Puede incluir permanencia (6-12 meses típicamente)</li>
                  <li>• Mayor estabilidad y previsibilidad en la factura</li>
                  <li>• No necesitas preocuparte por las horas de consumo</li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              <strong>¿Cuál es mejor?</strong> No hay una respuesta universal. El
              PVPC tiende a ser más económico para quienes pueden concentrar su
              consumo en horas nocturnas y fines de semana. El precio fijo es mejor
              para quienes priorizan la estabilidad o consumen mucho durante el día
              en horas punta. En periodos de alta volatilidad del mercado mayorista,
              el precio fijo protege contra subidas repentinas.
            </p>
          </section>

          {/* Discriminación horaria */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Con o sin discriminación horaria
            </h2>
            <p className="mt-4">
              Desde junio de 2021, todos los contratos domésticos en España se
              rigen por la tarifa 2.0TD, que divide el día en{" "}
              <strong>tres tramos horarios</strong>:
            </p>
            <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-5">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-700">
                    Punta
                  </span>
                  <span className="text-gray-600">
                    10:00-14:00 y 18:00-22:00 (L-V) — el kWh más caro
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-yellow-100 text-xs font-bold text-yellow-700">
                    Llano
                  </span>
                  <span className="text-gray-600">
                    8:00-10:00, 14:00-18:00 y 22:00-00:00 (L-V) — precio intermedio
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-16 items-center justify-center rounded-lg bg-green-100 text-xs font-bold text-green-700">
                    Valle
                  </span>
                  <span className="text-gray-600">
                    00:00-8:00 (L-V) y todo el fin de semana y festivos — el más barato
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4">
              Esta estructura de tramos afecta tanto al PVPC como a muchas tarifas
              del mercado libre. La clave es sencilla: cuanto más consumo puedas
              desplazar a horario valle, más ahorras. Programar la lavadora, el
              lavavajillas o la carga del coche eléctrico por la noche puede
              suponer un ahorro notable.
            </p>
            <p className="mt-3">
              Algunas comercializadoras del mercado libre ofrecen tarifas con{" "}
              <strong>precio plano</strong> (mismo precio a cualquier hora). Estas
              tarifas son interesantes si tu consumo está concentrado en horas
              punta y no puedes moverlo, ya que evitas pagar el sobreprecio de
              esas franjas. Sin embargo, suelen ser algo más caras en términos
              absolutos.
            </p>
          </section>

          {/* Qué mirar al comparar */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Qué mirar al comparar tarifas
            </h2>
            <p className="mt-4">
              No basta con mirar el precio del kWh que anuncia cada
              comercializadora. Hay varios factores que determinan cuánto pagarás
              realmente:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">Precio del kWh por tramo</strong>
                  <p className="text-sm text-gray-600">
                    Compara el precio en punta, llano y valle. Una tarifa barata en
                    valle pero cara en punta puede no compensarte si consumes mucho
                    durante el día.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">Término de potencia</strong>
                  <p className="text-sm text-gray-600">
                    Es la parte fija de tu factura. Algunas comercializadoras
                    ofrecen un kWh barato pero compensan con un término de potencia
                    más alto. Mira siempre ambos conceptos.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  3
                </span>
                <div>
                  <strong className="text-gray-900">Permanencia y penalizaciones</strong>
                  <p className="text-sm text-gray-600">
                    Contratos con descuentos agresivos suelen tener permanencia de
                    12 meses. Si cancelas antes, te aplican una penalización.
                    Revisa siempre esta cláusula.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  4
                </span>
                <div>
                  <strong className="text-gray-900">Servicios adicionales incluidos</strong>
                  <p className="text-sm text-gray-600">
                    Muchas comercializadoras incluyen seguros de hogar,
                    mantenimiento o servicios de urgencias que encarecen la factura.
                    Verifica que no estés pagando por algo que no necesitas.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Tabla comparativa */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Tabla comparativa de tipos de tarifa
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="py-3 pr-4 text-left font-semibold text-gray-900">
                      Característica
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      PVPC
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Fijo por tramos
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Fijo plano
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">Precio kWh</td>
                    <td className="px-4 py-3">Variable cada hora</td>
                    <td className="px-4 py-3">Fijo por tramo</td>
                    <td className="px-4 py-3">Mismo precio siempre</td>
                  </tr>
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">Estabilidad</td>
                    <td className="px-4 py-3">Baja</td>
                    <td className="px-4 py-3">Alta</td>
                    <td className="px-4 py-3">Muy alta</td>
                  </tr>
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">Permanencia</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Posible (6-12 meses)</td>
                    <td className="px-4 py-3">Posible (6-12 meses)</td>
                  </tr>
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">Ideal para</td>
                    <td className="px-4 py-3">Consumo nocturno/fin de semana</td>
                    <td className="px-4 py-3">Consumo variado</td>
                    <td className="px-4 py-3">Consumo en horas punta</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-900">Riesgo</td>
                    <td className="px-4 py-3">Subidas del mercado</td>
                    <td className="px-4 py-3">Bajo</td>
                    <td className="px-4 py-3">Precio algo mayor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: ¿cómo elegir la mejor tarifa?
            </h2>
            <p className="mt-4">
              La mejor tarifa de luz es la que se adapta a <strong>tu</strong>{" "}
              perfil de consumo real, no la que tiene el anuncio más llamativo. Para
              saber cuál es la tuya, necesitas analizar cuánto consumes, a qué horas
              lo haces y qué potencia tienes contratada.
            </p>
            <p className="mt-3">
              Si no quieres hacerlo solo, en Vitergy analizamos tu factura gratis,
              comparamos más de 40 comercializadoras y te decimos exactamente cuál
              es la tarifa más barata para ti. Sin compromiso y sin vinculación con
              ninguna compañía.
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
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
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
              ¿Quieres saber qué tarifa es la mejor para ti?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Envíanos tu factura y te decimos en 24 horas cuál es la tarifa más
              barata para tu perfil. Gratis y sin compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/comparador-tarifas-luz"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Comparar tarifas →
              </Link>
              <Link
                href="/consultoria-energetica"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Consultoría energética
              </Link>
            </div>
          </section>

          {/* Links internos */}
          <section>
            <h2 className="text-lg font-bold text-gray-900">
              Artículos y herramientas relacionados
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/precio-luz-hoy"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Precio de la luz hoy
              </Link>
              <Link
                href="/calculadora-consumo-electrico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Calculadora de consumo eléctrico
              </Link>
              <Link
                href="/cambiar-compania-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cambiar de compañía de luz
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
