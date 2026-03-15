import type { Metadata } from "next";
import Link from "next/link";
import PrecioLuzHoyWidget from "./PrecioLuzHoyWidget";

export const metadata: Metadata = {
  title: "Precio de la Luz Hoy por Horas | Tarifa PVPC en Tiempo Real - Vitergy",
  description:
    "Consulta el precio de la luz hoy hora a hora gratis. Gráfico en tiempo real del PVPC. Descubre cuándo es más barata la electricidad y ahorra en tu factura.",
  alternates: {
    canonical: "https://vitergy.es/precio-luz-hoy",
  },
};

const faqData = [
  {
    question: "¿Qué es el precio PVPC de la luz?",
    answer:
      "El PVPC (Precio Voluntario para el Pequeño Consumidor) es la tarifa de electricidad regulada por el Gobierno de España. Se calcula diariamente a partir del mercado mayorista, lo que significa que el precio de cada kWh varía hora a hora. Solo pueden ofrecerla las comercializadoras de referencia y está disponible para contratos con potencia inferior a 10 kW.",
  },
  {
    question: "¿Cuándo es más barata la luz del día?",
    answer:
      "Por lo general, las horas más baratas se concentran de madrugada (00:00 – 08:00) cuando la demanda es baja. Las más caras suelen coincidir con los picos de consumo: de 10:00 a 14:00 y de 18:00 a 22:00. Sin embargo, estos patrones pueden variar según la producción renovable, la temperatura y el día de la semana. Consulta nuestra tabla actualizada para ver los precios exactos de hoy.",
  },
  {
    question: "¿Cómo afecta el precio de la luz a mi factura?",
    answer:
      "Si tienes tarifa PVPC, tu factura depende directamente de a qué horas consumes electricidad. Usar la lavadora, el lavavajillas o cargar el coche eléctrico en horas baratas (zona verde) puede reducir significativamente la parte variable de tu factura. Con tarifas de mercado libre el precio es fijo, pero suele ser más alto de media. Compara ambas opciones con nuestro comparador de tarifas.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Precio de la Luz Hoy por Horas | Tarifa PVPC en Tiempo Real",
      description:
        "Consulta el precio de la luz hoy hora a hora gratis. Gráfico en tiempo real del PVPC.",
      url: "https://vitergy.es/precio-luz-hoy",
      publisher: {
        "@type": "Organization",
        name: "Vitergy",
        url: "https://vitergy.es",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function PrecioLuzHoyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Precio de la Luz Hoy:{" "}
          <span className="text-[#f97316]">
            Consulta la Tarifa por Horas en Tiempo Real
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Datos actualizados del mercado eléctrico PVPC publicados por Red
          Eléctrica de España (REE).
        </p>

        {/* Widget */}
        <section className="mt-8">
          <PrecioLuzHoyWidget />
        </section>

        {/* ¿Qué es el PVPC? */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Qué es el PVPC?
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              El{" "}
              <strong>
                PVPC (Precio Voluntario para el Pequeño Consumidor)
              </strong>{" "}
              es la tarifa de electricidad regulada por el Gobierno de España. A
              diferencia de las tarifas del mercado libre, el PVPC se calcula
              diariamente a partir del precio del mercado mayorista de
              electricidad, lo que significa que el coste de cada kilovatio-hora
              (kWh) varía hora a hora.
            </p>
            <p>
              Esta tarifa está disponible para consumidores con potencia
              contratada inferior a 10 kW y solo puede ser ofrecida por las
              comercializadoras de referencia designadas por el Ministerio para
              la Transición Ecológica. Si quieres entender en profundidad cómo
              funciona, visita nuestro artículo sobre{" "}
              <Link
                href="/blog/pvpc-precio-voluntario"
                className="font-medium text-[#f97316] underline decoration-orange-200 hover:decoration-[#f97316]"
              >
                el PVPC y cómo afecta a tu factura
              </Link>
              .
            </p>
            <p>
              La principal ventaja del PVPC es que puedes ahorrar adaptando tu
              consumo a las horas más baratas. Sin embargo, implica cierta
              variabilidad en la factura. Para saber si te conviene más una
              tarifa fija o el PVPC, utiliza nuestro{" "}
              <Link
                href="/comparador-tarifas-luz"
                className="font-medium text-[#f97316] underline decoration-orange-200 hover:decoration-[#f97316]"
              >
                comparador de tarifas de luz
              </Link>{" "}
              y descubre cuál se adapta mejor a tu perfil de consumo.
            </p>
          </div>
        </section>

        {/* ¿Cuándo es más barata la luz? */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Cuándo es más barata la luz?
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              Con la tarifa PVPC, el precio de la electricidad cambia cada hora.
              Por lo general, las <strong>horas más económicas</strong> se
              concentran en la madrugada y primeras horas de la mañana (entre
              las 00:00 y las 08:00), cuando la demanda industrial y doméstica
              es más baja. También suelen encontrarse precios reducidos en las
              primeras horas de la tarde.
            </p>
            <p>
              Las <strong>horas más caras</strong> coinciden habitualmente con
              los picos de demanda: de 10:00 a 14:00 y de 18:00 a 22:00. Para
              aprovechar los precios más bajos, programa tus electrodomésticos
              de mayor consumo —lavadora, lavavajillas, horno— en las franjas
              verdes de nuestra tabla. Pequeños cambios de hábito pueden suponer
              un ahorro significativo en tu factura mensual.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Preguntas frecuentes sobre el precio de la luz
          </h2>
          <dl className="mt-6 space-y-6">
            {faqData.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-100 bg-[#fff5f0] p-5"
              >
                <dt className="text-base font-semibold text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-2xl bg-[#fff5f0] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Quieres pagar siempre el mejor precio?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Analizamos tu factura eléctrica de forma gratuita y te recomendamos
            la tarifa que mejor se adapta a tu consumo real.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Análisis gratuito de tu factura →
          </Link>
        </section>

        {/* Internal links */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-gray-900">
            Otras herramientas que te pueden interesar
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Link
              href="/precio-luz-manana"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">📅</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Precio de la Luz Mañana
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Consulta los precios publicados para mañana.
              </p>
            </Link>
            <Link
              href="/calculadora-consumo-electrico"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">🧮</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Calculadora de Consumo
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Calcula cuánto gastas con cada electrodoméstico.
              </p>
            </Link>
            <Link
              href="/comparador-tarifas-luz"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">⚡</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Comparador de Tarifas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Encuentra la tarifa más barata para tu hogar.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
