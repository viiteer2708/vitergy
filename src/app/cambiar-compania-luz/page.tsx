import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cambiar de Compañía de Luz | Sin Cortes y Sin Papeleo - Vitergy",
  description:
    "Te ayudamos a cambiar de compañía eléctrica sin cortes de suministro y sin papeleo. Gestionamos todo el proceso gratis. Sin permanencia ni penalizaciones ocultas.",
  alternates: {
    canonical: "https://vitergy.es/cambiar-compania-luz",
  },
};

const faqs = [
  {
    question: "¿Me quedaré sin luz durante el cambio de compañía?",
    answer:
      "No, en ningún momento. El cambio de comercializadora es un trámite administrativo que no afecta al suministro. Tu contador, tu instalación y tu conexión a la red siguen siendo exactamente los mismos. La distribuidora (Endesa Distribución, i-DE, etc.) no cambia.",
  },
  {
    question: "¿Hay penalizaciones por cambiar de compañía eléctrica?",
    answer:
      "En la mayoría de casos no. Desde 2014, las compañías no pueden aplicar penalizaciones por permanencia en el mercado libre residencial. Sin embargo, algunos contratos empresariales o con descuentos promocionales sí pueden tenerlas. Revisamos tu contrato antes de dar ningún paso.",
  },
  {
    question: "¿Cuánto tarda el proceso de cambio?",
    answer:
      "El cambio efectivo de compañía suele tardar entre 15 y 21 días naturales desde que se tramita la solicitud. Durante ese tiempo sigues con tu compañía actual sin ninguna interrupción. Nosotros gestionamos todo el papeleo por ti.",
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

export default function CambiarCompaniaLuzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cambiar de Compañía de Luz:{" "}
          <span className="text-[#f97316]">
            Sin Cortes, Sin Papeleo, Sin Coste
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Cambiar de compañía eléctrica es un derecho de todos los consumidores en
            España, pero muchas personas no lo hacen por miedo a quedarse sin luz, a
            las penalizaciones o simplemente al papeleo. La realidad es que el
            proceso es sencillo, no tiene coste y en ningún momento se interrumpe tu
            suministro. En Vitergy nos encargamos de todo: analizamos tu situación,
            encontramos la mejor alternativa y gestionamos el cambio completo para
            que tú no tengas que hacer absolutamente nada.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Análisis de tu contrato actual y detección de penalizaciones",
                "Búsqueda de la mejor compañía y tarifa para tu perfil",
                "Gestión completa del cambio de comercializadora",
                "Verificación de que la primera factura con la nueva compañía es correcta",
                "Asesoramiento post-cambio para resolver cualquier incidencia",
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
                  title: "Revisamos tu contrato actual",
                  text: "Analizamos tu factura y tu contrato para verificar si existen penalizaciones o cláusulas de permanencia antes de hacer cualquier cambio.",
                },
                {
                  step: 2,
                  title: "Te proponemos la mejor alternativa",
                  text: "Comparamos más de 40 compañías y te presentamos la opción que más te conviene, con cifras claras de ahorro estimado.",
                },
                {
                  step: 3,
                  title: "Gestionamos todo el papeleo",
                  text: "Si decides cambiar, nos encargamos de tramitar la solicitud, coordinar con la nueva compañía y verificar que todo se activa correctamente.",
                },
                {
                  step: 4,
                  title: "Verificamos tu primera factura",
                  text: "Revisamos tu primer recibo con la nueva compañía para asegurarnos de que las condiciones pactadas se cumplen al céntimo.",
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
            ¿Listo para pagar menos en tu factura?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Cuéntanos tu caso y te decimos si te conviene cambiar de compañía, sin
            compromiso y sin coste.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Consultar cambio gratis →
          </Link>
        </section>

        {/* Links internos */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/comparador-tarifas-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Comparador de tarifas de luz
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
