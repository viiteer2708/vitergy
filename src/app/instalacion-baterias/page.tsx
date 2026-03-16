import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instalación de Baterías Solares | Almacena tu Energía - Vitergy",
  description:
    "Instala baterías de almacenamiento para aprovechar toda la energía solar que produces. Mayor independencia energética. Presupuesto gratuito.",
  alternates: {
    canonical: "https://vitergy.es/instalacion-baterias",
  },
};

const faqs = [
  {
    question: "¿Merece la pena instalar una batería solar?",
    answer:
      "Depende de tu perfil de consumo. Si produces mucha energía durante el día pero consumes sobre todo por la noche, una batería te permite aprovechar esos excedentes en lugar de verterlos a la red por una compensación baja. En hogares con buena producción solar y consumo nocturno elevado, la batería puede reducir tu factura un 30-50% adicional respecto a solo paneles.",
  },
  {
    question: "¿Cuánto cuesta una batería de almacenamiento?",
    answer:
      "El precio varía según la capacidad. Una batería residencial de 5 kWh cuesta entre 3.000 € y 5.000 € instalada, y una de 10 kWh entre 5.000 € y 8.000 €. Existen subvenciones que pueden cubrir hasta el 40-70% del coste. Te hacemos un estudio económico personalizado para que veas si la inversión es rentable en tu caso.",
  },
  {
    question: "¿Puedo instalar una batería si ya tengo placas solares?",
    answer:
      "Sí, la mayoría de instalaciones fotovoltaicas existentes son compatibles con baterías de almacenamiento. Solo necesitamos verificar que tu inversor es híbrido o añadir uno compatible. Evaluamos tu instalación actual de forma gratuita y te decimos exactamente qué se necesita.",
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

export default function InstalacionBateriasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Instalación de Baterías Solares:{" "}
          <span className="text-[#f97316]">
            Almacena tu Energía y Úsala Cuando Quieras
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Las baterías de almacenamiento son el complemento perfecto para tu
            instalación de placas solares. Te permiten guardar la energía que
            produces durante el día y utilizarla por la noche o en momentos de mayor
            consumo, multiplicando tu independencia energética y tu ahorro. En
            Vitergy analizamos tu producción solar actual, tu patrón de consumo
            horario y las subvenciones disponibles para recomendarte la batería
            ideal. Instalamos las principales marcas del mercado con garantía y te
            acompañamos desde el estudio inicial hasta la puesta en marcha.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Estudio de viabilidad: análisis de producción solar y consumo horario",
                "Recomendación de capacidad óptima de batería para tu caso",
                "Presupuesto detallado con subvenciones aplicables",
                "Instalación por técnicos certificados y compatibilidad con tu inversor",
                "Configuración del sistema de gestión energética inteligente",
                "Garantía del fabricante y soporte postventa",
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
                  title: "Analizamos tu instalación",
                  text: "Revisamos tu producción solar, tu consumo por franjas horarias y la compatibilidad de tu inversor para determinar si una batería es rentable.",
                },
                {
                  step: 2,
                  title: "Te recomendamos la batería ideal",
                  text: "Seleccionamos la capacidad y marca que mejor se adaptan a tu consumo, con un estudio económico que incluye subvenciones y plazo de amortización.",
                },
                {
                  step: 3,
                  title: "Instalamos y configuramos",
                  text: "Nuestros técnicos instalan la batería, la integran con tu sistema fotovoltaico y configuran la gestión energética para maximizar el autoconsumo.",
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
            ¿Quieres aprovechar toda tu energía solar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Te hacemos un estudio gratuito para saber si una batería es rentable en
            tu caso y cuánto más puedes ahorrar.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Pedir presupuesto gratuito →
          </Link>
        </section>

        {/* Links internos */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/autoconsumo-fotovoltaico"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Autoconsumo fotovoltaico
            </Link>
            <Link
              href="/monitorizacion-consumo"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Monitorización de consumo
            </Link>
            <Link
              href="/optimizacion-potencia"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Optimización de potencia
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
