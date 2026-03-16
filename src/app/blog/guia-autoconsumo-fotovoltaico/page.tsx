import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Guía Completa de Autoconsumo Fotovoltaico 2026 | Placas Solares - Vitergy",
  description:
    "Todo sobre el autoconsumo solar en 2026: tipos de instalación, costes, subvenciones disponibles, amortización y cómo solicitar el bono social fotovoltaico.",
  alternates: {
    canonical: "https://vitergy.es/blog/guia-autoconsumo-fotovoltaico",
  },
};

const faqs = [
  {
    question: "¿Puedo instalar placas solares en un piso?",
    answer:
      "Sí, existen dos opciones. Si tu comunidad de vecinos aprueba una instalación de autoconsumo compartido en la cubierta del edificio, puedes participar y beneficiarte. También puedes optar por el autoconsumo virtual o colectivo, donde compartes una instalación remota sin necesidad de tener paneles en tu propio tejado.",
  },
  {
    question: "¿Las placas solares funcionan en días nublados?",
    answer:
      "Sí, aunque producen menos. Los paneles fotovoltaicos generan electricidad con la radiación solar, no con la luz directa del sol. En un día nublado, la producción puede caer entre un 20% y un 60% respecto a un día despejado, pero siguen generando energía. España, con más de 2.500 horas de sol al año, es uno de los mejores países de Europa para el autoconsumo.",
  },
  {
    question:
      "¿Necesito permiso del ayuntamiento para instalar placas solares?",
    answer:
      "En la mayoría de municipios necesitas una comunicación previa de obras o una licencia menor (no una licencia de obra mayor). Desde el RD 244/2019, se simplificaron mucho los trámites para instalaciones de autoconsumo de menos de 100 kW. Nosotros nos encargamos de toda la tramitación administrativa.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Guía Completa de Autoconsumo Fotovoltaico 2026: Todo lo que Necesitas Saber",
    description:
      "Todo sobre el autoconsumo solar en 2026: tipos de instalación, costes, subvenciones disponibles y amortización.",
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
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    mainEntityOfPage: "https://vitergy.es/blog/guia-autoconsumo-fotovoltaico",
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

export default function GuiaAutoconsumoFotovoltaicoPage() {
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
            5 de marzo de 2026
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Guía Completa de Autoconsumo Fotovoltaico 2026:{" "}
            <span className="text-[#f97316]">
              Todo lo que Necesitas Saber
            </span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            España es uno de los países con más horas de sol de Europa — más de
            2.500 al año en la mayor parte del territorio. Eso convierte al
            autoconsumo fotovoltaico en una de las inversiones más rentables que
            puedes hacer en tu hogar o negocio. Producir tu propia electricidad
            reduce tu factura desde el primer día, te protege de las subidas del
            mercado eléctrico y contribuye a la descarbonización.
          </p>
          <p>
            En esta guía te explicamos todo lo que necesitas saber sobre el
            autoconsumo solar en 2026: los tipos de instalación que existen,
            cuánto cuesta, qué subvenciones puedes solicitar, en cuánto tiempo
            se amortiza y cuándo merece la pena añadir una batería de
            almacenamiento.
          </p>

          {/* Tipos de autoconsumo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Tipos de autoconsumo fotovoltaico
            </h2>
            <p className="mt-4">
              La legislación española distingue dos modalidades principales de
              autoconsumo, y la elección entre una y otra afecta directamente a
              la rentabilidad de tu instalación:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Sin excedentes vertidos a red
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  La instalación incorpora un sistema antivertido que impide que
                  la energía sobrante se inyecte en la red eléctrica. Solo
                  consumes lo que produces en el momento. Es más sencilla
                  administrativamente, pero desaprovechas los excedentes salvo
                  que instales una batería.
                </p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Con excedentes y compensación simplificada
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  La energía que no consumes se vierte a la red y tu
                  comercializadora te compensa en la factura (descuento por cada
                  kWh vertido). Es la modalidad más habitual y rentable para
                  hogares y pequeños negocios. La compensación no puede superar
                  el coste de la energía consumida de la red en ese periodo.
                </p>
              </div>
            </div>

            <p className="mt-4">
              Para la inmensa mayoría de hogares y pymes, la{" "}
              <strong>
                modalidad con excedentes y compensación simplificada
              </strong>{" "}
              es la más interesante. Aprovechas toda la energía posible y el
              excedente te reduce la factura.
            </p>
          </section>

          {/* Cuánto cuesta */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Cuánto cuesta instalar placas solares en 2026?
            </h2>
            <p className="mt-4">
              El precio de una instalación fotovoltaica depende principalmente
              de la potencia instalada (medida en kWp) y de las
              particularidades de tu tejado. Estos son los rangos orientativos
              para instalaciones residenciales en España:
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="py-3 pr-4 text-left font-semibold text-gray-900">
                      Potencia
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Paneles
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Precio orientativo
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Ideal para
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">2-3 kWp</td>
                    <td className="px-4 py-3">4-6 paneles</td>
                    <td className="px-4 py-3">3.000 € - 5.000 €</td>
                    <td className="px-4 py-3">Pisos, consumo bajo</td>
                  </tr>
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">4-6 kWp</td>
                    <td className="px-4 py-3">8-12 paneles</td>
                    <td className="px-4 py-3">5.000 € - 8.000 €</td>
                    <td className="px-4 py-3">Casas unifamiliares</td>
                  </tr>
                  <tr className="border-b border-orange-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">8-10 kWp</td>
                    <td className="px-4 py-3">16-20 paneles</td>
                    <td className="px-4 py-3">8.000 € - 13.000 €</td>
                    <td className="px-4 py-3">Chalets grandes, piscinas</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-900">10-50 kWp</td>
                    <td className="px-4 py-3">20-100 paneles</td>
                    <td className="px-4 py-3">12.000 € - 50.000 €</td>
                    <td className="px-4 py-3">Negocios, industria</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              * Precios orientativos antes de subvenciones. Incluyen paneles,
              inversor, estructura, cableado, instalación y legalización.
            </p>
          </section>

          {/* Subvenciones */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Subvenciones disponibles en 2026
            </h2>
            <p className="mt-4">
              En 2026 siguen vigentes varias líneas de ayuda que pueden reducir
              significativamente el coste de tu instalación fotovoltaica:
            </p>

            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">
                    Deducción en el IRPF
                  </strong>
                  <p className="text-sm text-gray-600">
                    Hasta un 40% de deducción en la declaración de la renta por
                    instalaciones de autoconsumo en vivienda habitual. El
                    porcentaje varía según la mejora en la calificación
                    energética del inmueble (20%, 40% o 60%).
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">
                    Bonificación del IBI municipal
                  </strong>
                  <p className="text-sm text-gray-600">
                    Muchos ayuntamientos bonifica entre el 30% y el 50% del
                    IBI durante 3 a 5 años si instalas placas solares. Varía
                    según el municipio. En Barcelona, por ejemplo, la
                    bonificación puede llegar al 50% durante 3 años.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  3
                </span>
                <div>
                  <strong className="text-gray-900">
                    Fondos Next Generation EU
                  </strong>
                  <p className="text-sm text-gray-600">
                    Las comunidades autónomas canalizan fondos europeos para
                    autoconsumo. Las ayudas directas pueden cubrir entre 300 € y
                    600 € por kWp instalado en viviendas, y hasta 490 € por kWp
                    en empresas. Consulta la disponibilidad en tu comunidad, ya
                    que los fondos se van agotando.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Amortización */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Cuánto tardo en amortizar la instalación?
            </h2>
            <p className="mt-4">
              La amortización depende de tres factores principales: el coste
              neto de la instalación (después de subvenciones), tu consumo
              eléctrico y cuánta energía solar aprovechas directamente.
            </p>
            <p className="mt-3">
              Un ejemplo típico: una familia con un consumo de 4.000 kWh/año
              instala 4,5 kWp por 6.000 €. Con una bonificación del IBI del
              50% durante 3 años y la deducción del IRPF del 20%, el coste
              neto se reduce a unos 4.000 €. Con un ahorro anual en la factura
              de 700-800 €, la instalación se amortiza en{" "}
              <strong>5-6 años</strong>.
            </p>
            <p className="mt-3">
              A partir de ese momento, la energía que produces es
              prácticamente gratuita durante los 20-25 años restantes de vida
              útil de los paneles. Esto supone un ahorro acumulado de más de{" "}
              <strong>15.000 €</strong> a lo largo de la vida de la
              instalación.
            </p>
          </section>

          {/* ¿Necesito batería? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Necesito batería?
            </h2>
            <p className="mt-4">
              No siempre. La batería tiene sentido cuando produces mucha más
              energía de la que consumes durante las horas de sol y tu consumo
              nocturno es elevado. En estos casos, almacenar los excedentes en
              lugar de verterlos a la red (por una compensación baja) puede ser
              muy rentable.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-green-700">
                  Sí te conviene batería si...
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Tu consumo nocturno es alto (aire acondicionado, coche eléctrico)</li>
                  <li>• Produces muchos excedentes durante el día</li>
                  <li>• Quieres maximizar tu independencia energética</li>
                  <li>• Tienes tarifa con tramos y quieres evitar horas punta</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  Puedes esperar si...
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Consumes la mayor parte de la energía durante el día</li>
                  <li>• Tu producción solar y tu consumo están equilibrados</li>
                  <li>• El presupuesto es ajustado (mejor invertir en más paneles)</li>
                  <li>• Los precios de las baterías siguen bajando cada año</li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              Nuestro consejo: si tu presupuesto es limitado, invierte primero
              en paneles y deja la batería para más adelante. Los precios de
              las baterías de litio han bajado un 40% en los últimos 3 años y
              la tendencia sigue a la baja.
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
              ¿Quieres saber si el autoconsumo es rentable en tu caso?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Te hacemos un estudio de viabilidad gratuito: analizamos tu
              tejado, tu consumo y las subvenciones disponibles para darte
              cifras reales de ahorro y amortización.
            </p>
            <Link
              href="/autoconsumo-fotovoltaico"
              className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Solicitar estudio gratuito →
            </Link>
          </section>

          {/* Links internos */}
          <section>
            <h2 className="text-lg font-bold text-gray-900">
              Artículos y servicios relacionados
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/instalacion-baterias"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Instalación de baterías
              </Link>
              <Link
                href="/monitorizacion-consumo"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Monitorización de consumo
              </Link>
              <Link
                href="/calculadora-consumo-electrico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Calculadora de consumo eléctrico
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
