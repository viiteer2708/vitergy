import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Autoconsumo Fotovoltaico | Instala Placas Solares y Ahorra - Vitergy",
  description:
    "Instalación de placas solares para autoconsumo en hogares y empresas. Estudiamos la viabilidad gratis. Amortización media en 5-7 años. Subvenciones disponibles.",
  alternates: {
    canonical: "https://vitergy.es/autoconsumo-fotovoltaico",
  },
};

const faqs = [
  {
    question: "¿Cuánto cuesta instalar placas solares en mi casa?",
    answer:
      "El precio varía según el tamaño de la instalación y tu consumo. Una instalación residencial típica de 3-5 kWp cuesta entre 4.000 € y 7.000 € antes de subvenciones. Con las ayudas disponibles (Next Generation y bonificaciones del IBI), el coste neto puede reducirse hasta un 50%. Te hacemos un presupuesto personalizado gratuito.",
  },
  {
    question: "¿En cuánto tiempo se amortiza la inversión?",
    answer:
      "La amortización media se sitúa entre 5 y 7 años, dependiendo de tu consumo, la orientación de tu tejado y las subvenciones que consigas. A partir de ese punto, la energía que produces es prácticamente gratis durante los 20-25 años de vida útil de los paneles.",
  },
  {
    question: "¿Qué pasa con la energía que me sobra?",
    answer:
      "Los excedentes de energía se vierten a la red y tu comercializadora te compensa en la factura (compensación simplificada). Si produces más de lo que consumes durante el día, esos kWh se descuentan de lo que consumes por la noche. También puedes instalar baterías para almacenar esos excedentes y usarlos cuando quieras.",
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

export default function AutoconsumoFotovoltaicoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Autoconsumo Fotovoltaico:{" "}
          <span className="text-[#f97316]">
            Produce tu Propia Energía y Ahorra
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            El autoconsumo fotovoltaico te permite generar tu propia electricidad a
            partir del sol, reduciendo tu dependencia de la red y tu factura de luz
            desde el primer día. En Vitergy estudiamos la viabilidad de tu tejado o
            cubierta de forma gratuita, diseñamos la instalación óptima para tu
            consumo y te acompañamos en todo el proceso: desde la solicitud de
            subvenciones hasta la puesta en marcha. Con una amortización media de 5
            a 7 años y una vida útil de más de 25, instalar placas solares es hoy
            una de las mejores inversiones para tu hogar o negocio.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Estudio de viabilidad gratuito: orientación, sombras, superficie disponible",
                "Diseño personalizado de la instalación según tu consumo real",
                "Tramitación de subvenciones y bonificaciones del IBI",
                "Instalación por técnicos certificados con garantía",
                "Legalización completa ante Industria y tu distribuidora",
                "Monitorización del rendimiento y mantenimiento preventivo",
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
                  title: "Estudio de viabilidad",
                  text: "Analizamos tu tejado (orientación, inclinación, sombras), tu consumo eléctrico y las subvenciones disponibles para calcular la rentabilidad exacta.",
                },
                {
                  step: 2,
                  title: "Diseño y presupuesto",
                  text: "Te presentamos un proyecto a medida con el número óptimo de paneles, la producción estimada, el ahorro anual y el plazo de amortización.",
                },
                {
                  step: 3,
                  title: "Instalación y legalización",
                  text: "Nuestro equipo de instaladores certificados monta los paneles, conecta el inversor y tramita toda la documentación ante Industria y tu distribuidora.",
                },
                {
                  step: 4,
                  title: "Monitorización y seguimiento",
                  text: "Una vez en marcha, monitorizamos el rendimiento de tu instalación y te aseguramos que produce lo esperado. Mantenimiento preventivo incluido.",
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
            ¿Quieres saber si tu tejado es apto para placas solares?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Solicita un estudio de viabilidad gratuito y descubre cuánto puedes
            ahorrar con autoconsumo fotovoltaico.
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
              href="/instalacion-baterias"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Instalación de baterías solares
            </Link>
            <Link
              href="/monitorizacion-consumo"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Monitorización de consumo
            </Link>
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
