import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Penalización por Cambiar de Compañía Eléctrica | ¿Cuándo Puedes Salir? - Vitergy",
  description:
    "¿Tienes permanencia en tu contrato de luz? Te explicamos cuándo puedes cambiar de compañía sin penalización y cómo salir antes si te interesa.",
  alternates: {
    canonical: "https://vitergy.es/penalizaciones-electricas",
  },
};

const faqs = [
  {
    question: "¿Qué es la permanencia en un contrato eléctrico?",
    answer:
      "La permanencia es un compromiso contractual por el cual te obligas a mantener tu contrato con una comercializadora durante un período determinado (normalmente 12 meses). Si cancelas antes de que termine ese plazo, la compañía puede aplicarte una penalización económica. Es habitual en contratos con descuentos promocionales o tarifas especiales para empresas.",
  },
  {
    question: "¿Cuánto es la penalización por salir antes?",
    answer:
      "El importe varía según la compañía y el tipo de contrato. En contratos residenciales con permanencia, la penalización suele oscilar entre 30 € y 100 €. En contratos empresariales con descuentos por volumen, puede ser más elevada y calcularse como un porcentaje del consumo restante. Siempre revisamos tu contrato antes de aconsejarte el cambio para que sepas exactamente cuánto pagarías.",
  },
  {
    question: "¿Puedo cambiar de compañía sin penalización?",
    answer:
      "Sí, en muchos casos. Desde 2014, los contratos domésticos en el mercado libre no pueden tener penalización por permanencia salvo que incluyan un descuento o promoción vinculada. Si tu contrato no tiene cláusula de permanencia, puedes cambiar cuando quieras sin coste. Nosotros revisamos tu contrato gratis y te decimos si tienes permanencia y cuándo vence.",
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

export default function PenalizacionesElectricasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Penalización por Cambiar de Compañía Eléctrica:{" "}
          <span className="text-[#f97316]">Todo lo que Debes Saber</span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            El miedo a las penalizaciones es una de las principales razones por las
            que muchos consumidores siguen pagando más de lo necesario en su factura
            de luz. La realidad es que la mayoría de contratos domésticos en España
            no tienen permanencia, y cuando la tienen, la penalización suele ser
            inferior al ahorro que consigues cambiando a una tarifa mejor. En
            Vitergy revisamos tu contrato actual de forma gratuita, te decimos si
            tienes cláusula de permanencia, cuánto te costaría salir y si el cambio
            merece la pena económicamente incluso pagando la penalización.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Revisión completa de tu contrato actual y condiciones de permanencia",
                "Cálculo exacto de la penalización si existe cláusula",
                "Comparativa del coste de penalización vs. ahorro por cambio de tarifa",
                "Asesoramiento sobre el mejor momento para cambiar de compañía",
                "Gestión del cambio si decides proceder, incluyendo la comunicación con tu compañía actual",
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
                  title: "Envíanos tu contrato o factura",
                  text: "Con tu última factura podemos identificar tu comercializadora, tarifa y condiciones. Si tienes el contrato original, mejor aún.",
                },
                {
                  step: 2,
                  title: "Analizamos tu permanencia",
                  text: "Revisamos si tu contrato incluye cláusula de permanencia, cuándo vence y cuál sería el importe de la penalización si sales antes.",
                },
                {
                  step: 3,
                  title: "Te damos una recomendación clara",
                  text: "Te decimos si merece la pena esperar a que venza la permanencia o si el ahorro por cambiar ya supera el coste de la penalización.",
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
            ¿Quieres saber si puedes cambiar de compañía sin penalización?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Envíanos tu factura o contrato y te decimos en 24 horas si tienes
            permanencia y cuál es tu mejor opción. Gratis y sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Consultar mi permanencia →
          </Link>
        </section>

        {/* Links internos */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/cambiar-compania-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Cambiar de compañía de luz
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
