import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Estudio de Factura Eléctrica | Detecta si Estás Pagando de Más - Vitergy",
  description:
    "Analizamos tu factura de la luz con lupa. Detectamos cobros incorrectos, potencia mal ajustada y tarifas caras. Estudio gratuito y sin compromiso.",
  alternates: {
    canonical: "https://vitergy.es/estudio-factura-electrica",
  },
};

const faqs = [
  {
    question: "¿Qué errores soléis encontrar en las facturas?",
    answer:
      "Los más habituales son: potencia contratada excesiva (pagas por capacidad que no usas), tarifa inadecuada para tu perfil de consumo, servicios adicionales contratados sin tu conocimiento y complementos de mantenimiento o seguros que encarecen la factura sin que lo notes.",
  },
  {
    question: "¿Necesito enviar todas mis facturas o solo la última?",
    answer:
      "Con la última factura ya podemos hacer un análisis completo. Si quieres un estudio más profundo que tenga en cuenta la estacionalidad de tu consumo, es útil que nos envíes las de los últimos 12 meses, pero no es imprescindible.",
  },
  {
    question: "¿Qué pasa si no encontráis margen de ahorro?",
    answer:
      "Te lo decimos con total transparencia. Si tu factura ya está optimizada, te confirmamos que estás pagando lo justo y te damos consejos para mantenerla así. El estudio es gratuito en cualquier caso.",
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

export default function EstudioFacturaElectricaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Estudio de Factura Eléctrica:{" "}
          <span className="text-[#f97316]">¿Estás Pagando de Más?</span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Tu factura de la luz tiene más de 20 conceptos diferentes, y la mayoría
            de personas no sabe interpretarlos. Eso significa que podrías estar
            pagando de más sin saberlo: por una potencia excesiva, una tarifa que no
            se ajusta a tus hábitos o servicios adicionales que nunca contrataste
            conscientemente. Nuestro estudio de factura eléctrica revisa cada línea
            de tu recibo para detectar ineficiencias y cobros incorrectos. Es
            gratuito, sin compromiso, y te damos cifras exactas de cuánto puedes
            recuperar.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Desglose completo de cada concepto de tu factura",
                "Detección de cobros incorrectos o servicios no solicitados",
                "Análisis de tu potencia contratada vs. tu consumo real",
                "Evaluación de tu tarifa actual frente a alternativas del mercado",
                "Informe escrito con cifras de ahorro estimado",
                "Recomendaciones concretas y personalizadas",
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
                  title: "Envíanos tu factura",
                  text: "Haznos llegar tu última factura por WhatsApp, email o formulario. Aceptamos fotos, capturas de pantalla o PDF.",
                },
                {
                  step: 2,
                  title: "Revisamos cada línea",
                  text: "Analizamos potencia, energía consumida, peajes, impuestos, servicios adicionales y condiciones contractuales.",
                },
                {
                  step: 3,
                  title: "Te entregamos el informe",
                  text: "Recibes un informe claro con los problemas detectados, el ahorro posible y los pasos exactos para conseguirlo.",
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
            Descubre si tu factura esconde sorpresas
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Mándanos tu factura y en menos de 24 horas sabrás exactamente qué estás
            pagando de más y cómo solucionarlo.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Pedir estudio gratuito →
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
              href="/optimizacion-potencia"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Optimización de potencia
            </Link>
            <Link
              href="/comparador-tarifas-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Comparador de tarifas de luz
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
