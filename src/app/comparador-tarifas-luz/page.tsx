import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comparador de Tarifas de Luz | Las Mejores Ofertas Eléctricas - Vitergy",
  description:
    "Compara las mejores tarifas de luz y gas de más de 40 compañías. Comparador independiente y gratuito. Encontramos la tarifa más barata para tu perfil de consumo.",
  alternates: {
    canonical: "https://vitergy.es/comparador-tarifas-luz",
  },
};

const faqs = [
  {
    question: "¿El comparador es realmente gratuito e independiente?",
    answer:
      "Sí. No cobramos por comparar tarifas y no estamos vinculados a ninguna comercializadora. Analizamos las ofertas de más de 40 compañías del mercado español y te recomendamos la que mejor se ajusta a tu perfil de consumo, no la que nos paga comisión.",
  },
  {
    question: "¿Qué datos necesitáis para comparar tarifas?",
    answer:
      "Solo necesitamos tu última factura de luz (foto o PDF). Con ella extraemos tu consumo mensual, potencia contratada, tarifa actual y peajes. Si no la tienes a mano, con el CUPS de tu contador también podemos hacer la comparativa.",
  },
  {
    question: "¿Cuánto puedo ahorrar cambiando de tarifa?",
    answer:
      "El ahorro medio de nuestros clientes ronda los 180 € al año, pero depende de cada caso. Hogares con tarifas reguladas antiguas o potencias mal ajustadas pueden ahorrar incluso más. Te damos una cifra exacta antes de que tomes ninguna decisión.",
  },
];

const jsonLd = {
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
};

export default function ComparadorTarifasLuzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Comparador de Tarifas de Luz:{" "}
          <span className="text-[#f97316]">Encuentra la Más Barata para Ti</span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            En España hay más de 600 comercializadoras activas y cientos de tarifas
            de luz diferentes. Elegir la más barata sin un análisis profesional es
            prácticamente imposible. Nuestro comparador independiente estudia tu
            factura real, tu perfil de consumo horario y tus necesidades para
            recomendarte la tarifa que de verdad te sale más económica. Sin trucos,
            sin letra pequeña y sin vinculación con ninguna compañía. Comparamos más
            de 40 comercializadoras para que tú solo tengas que elegir.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Comparativa personalizada entre más de 40 comercializadoras",
                "Análisis de tarifas fijas, indexadas y reguladas (PVPC)",
                "Cálculo del ahorro estimado anual con cada opción",
                "Revisión de condiciones contractuales: permanencia, penalizaciones y letra pequeña",
                "Recomendación de la tarifa óptima para tu perfil de consumo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                    ✓
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ¿Cómo funciona? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Cómo funciona?</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  step: 1,
                  title: "Envíanos tu factura actual",
                  text: "Mándanos una foto o PDF de tu última factura. Con ella extraemos todos los datos necesarios: consumo, potencia, tarifa y peajes.",
                },
                {
                  step: 2,
                  title: "Comparamos todas las ofertas del mercado",
                  text: "Cruzamos tu perfil de consumo con las tarifas de más de 40 compañías para encontrar la que te ofrece el precio más bajo real.",
                },
                {
                  step: 3,
                  title: "Te presentamos las mejores opciones",
                  text: "Recibes un informe claro con las 3 mejores tarifas para ti, el ahorro estimado de cada una y las condiciones contractuales.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
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
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl border border-orange-100 bg-white p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Estás pagando más de lo que deberías?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Envíanos tu factura y descubre en 24 horas si existe una tarifa más
            barata para ti. Sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Comparar mi tarifa gratis →
          </Link>
        </section>

        {/* Links internos */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
            </Link>
            <Link
              href="/cambiar-compania-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Cambiar de compañía de luz
            </Link>
            <Link
              href="/precio-luz-hoy"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Precio de la luz hoy
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
