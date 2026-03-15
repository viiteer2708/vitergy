import type { Metadata } from "next";
import Link from "next/link";
import PrecioLuzMananaWidget from "./PrecioLuzMananaWidget";

export const metadata: Metadata = {
  title: "Precio de la Luz Mañana por Horas | Previsión PVPC - Vitergy",
  description:
    "Consulta el precio de la luz mañana hora a hora. Previsión PVPC actualizada. Planifica cuándo usar tus electrodomésticos y ahorra en tu factura de luz.",
  alternates: {
    canonical: "https://vitergy.es/precio-luz-manana",
  },
};

const faqData = [
  {
    question: "¿A qué hora se publican los precios de la luz de mañana?",
    answer:
      "Los precios de la electricidad del día siguiente se publican cada día a partir de las 20:00h (hora peninsular). Es en ese momento cuando el operador del mercado eléctrico (OMIE) hace públicos los resultados de la subasta diaria y Red Eléctrica de España actualiza los datos del PVPC.",
  },
  {
    question: "¿Los precios de mañana pueden cambiar una vez publicados?",
    answer:
      "No. Una vez que los precios del mercado diario se publican por la noche, quedan fijados para las 24 horas del día siguiente. Lo que sí puede variar ligeramente es el precio final del PVPC si se aplican ajustes por servicios de ajuste del sistema, pero la diferencia suele ser mínima.",
  },
  {
    question: "¿Cómo puedo aprovechar los precios más baratos de mañana?",
    answer:
      "Consulta nuestra tabla de precios y localiza las horas verdes (las más baratas). Programa tus electrodomésticos de mayor consumo —lavadora, lavavajillas, horno, carga del coche eléctrico— para que funcionen en esas franjas. Con un programador o enchufe inteligente puedes automatizarlo fácilmente.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Precio de la Luz Mañana por Horas | Previsión PVPC",
      description:
        "Consulta el precio de la luz mañana hora a hora. Previsión PVPC actualizada.",
      url: "https://vitergy.es/precio-luz-manana",
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

export default function PrecioLuzMananaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Precio de la Luz Mañana:{" "}
          <span className="text-[#f97316]">
            Previsión de Tarifas por Horas
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Precios del mercado eléctrico PVPC para mañana publicados por Red
          Eléctrica de España (REE).
        </p>

        {/* Availability notice */}
        <div className="mt-4 rounded-lg border border-[#f97316]/20 bg-[#fff5f0] px-4 py-3 text-sm text-orange-800">
          <strong>Nota:</strong> Los precios de mañana se publican a partir de
          las 20:00h del día anterior. Si aún no están disponibles, se muestra
          un aviso.
        </div>

        {/* Widget */}
        <section className="mt-8">
          <PrecioLuzMananaWidget />
        </section>

        {/* ¿Cuándo se publican los precios? */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Cuándo se publican los precios de mañana?
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              Cada día, el{" "}
              <strong>operador del mercado eléctrico (OMIE)</strong> celebra una
              subasta donde las compañías generadoras y comercializadoras de
              electricidad establecen el precio para cada hora del día siguiente.
              Los resultados se publican habitualmente entre las{" "}
              <strong>20:00h y las 21:00h</strong> (hora peninsular).
            </p>
            <p>
              Una vez publicados, Red Eléctrica de España calcula el PVPC
              aplicando los peajes y cargos regulados. A partir de ese momento,
              los precios quedan fijados para las 24 horas del día siguiente. Te
              recomendamos consultar esta página a partir de las 20:00h para
              planificar tu consumo.
            </p>
          </div>
        </section>

        {/* Consejos */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Consejos para aprovechar las horas baratas
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              Conocer los precios de mañana con antelación te permite planificar
              tu consumo y reducir significativamente tu factura. Identifica las{" "}
              <strong>horas verdes</strong> en nuestra tabla y programa los
              electrodomésticos de mayor consumo para esas franjas: lavadora,
              secadora, lavavajillas y cargador del vehículo eléctrico.
            </p>
            <p>
              Si tienes un sistema de aerotermia o acumulador de agua caliente,
              configúralo para que caliente durante las horas más económicas.
              Pequeños ajustes en tus hábitos pueden suponer un ahorro de entre
              un 10% y un 30% en la parte variable de tu factura mensual.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Preguntas frecuentes sobre el precio de la luz mañana
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
              href="/precio-luz-hoy"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">⚡</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Precio de la Luz Hoy
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Consulta los precios en tiempo real de hoy.
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
              <span className="text-2xl">📊</span>
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
