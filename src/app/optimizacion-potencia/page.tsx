import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Optimización de Potencia Contratada | Ahorra Desde ya en tu Factura - Vitergy",
  description:
    "Ajustamos la potencia contratada a tu consumo real. Bajar la potencia puede ahorrarte entre 5 y 30€ al mes desde el primer recibo. Gestión gratuita.",
  alternates: {
    canonical: "https://vitergy.es/optimizacion-potencia",
  },
};

const faqs = [
  {
    question: "¿Cómo sé si tengo la potencia contratada demasiado alta?",
    answer:
      "El indicador más claro es que nunca te saltan los plomos (ICP). Si llevas años sin que se te corte la luz por exceso de consumo simultáneo, es muy probable que estés pagando por una potencia superior a la que necesitas. Nosotros lo verificamos analizando tu curva de consumo real.",
  },
  {
    question: "¿Cuánto puedo ahorrar bajando la potencia contratada?",
    answer:
      "El ahorro depende de la diferencia entre tu potencia actual y la óptima. Como referencia, cada kW de potencia que reduces te ahorra entre 3 € y 5 € al mes en el término fijo de tu factura. Muchos de nuestros clientes ahorran entre 5 € y 30 € mensuales solo con este ajuste.",
  },
  {
    question: "¿El cambio de potencia tiene algún coste o penalización?",
    answer:
      "Bajar la potencia tiene un coste regulado que cobra la distribuidora (llamado derechos de enganche), pero suele rondar los 10-15 € y se amortiza en el primer o segundo mes de ahorro. Si subes la potencia dentro del año siguiente a haberla bajado, el coste es algo mayor. Nosotros te asesoramos para que el ajuste sea definitivo.",
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

export default function OptimizacionPotenciaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Optimización de Potencia Contratada:{" "}
          <span className="text-[#f97316]">Ahorra Desde el Primer Recibo</span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            La potencia contratada es el concepto que más encarece la parte fija de
            tu factura eléctrica, y sin embargo es el que menos gente revisa. Tener
            una potencia superior a la que realmente necesitas significa pagar cada
            mes por una capacidad que no utilizas. En Vitergy analizamos tu curva de
            consumo real, determinamos la potencia óptima para tu hogar o negocio y
            gestionamos el ajuste con tu distribuidora. El resultado: un ahorro
            inmediato que notas desde el primer recibo, sin cambiar tus hábitos de
            consumo.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Análisis de tu curva de consumo y maxímetro (últimos 12 meses)",
                "Cálculo de la potencia óptima para tu perfil sin riesgo de cortes",
                "Simulación del ahorro mensual y anual con la nueva potencia",
                "Gestión del trámite de cambio de potencia con tu distribuidora",
                "Verificación de la primera factura tras el ajuste",
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
                  title: "Analizamos tus datos de consumo",
                  text: "Revisamos tu factura y, si es posible, accedemos a tu curva de carga horaria para determinar cuál es el pico real de potencia que necesitas.",
                },
                {
                  step: 2,
                  title: "Calculamos tu potencia óptima",
                  text: "Determinamos la potencia ideal que cubre tu demanda real con un margen de seguridad, para que nunca te salten los plomos.",
                },
                {
                  step: 3,
                  title: "Te presentamos el ahorro",
                  text: "Te mostramos exactamente cuánto vas a ahorrar cada mes y cada año, y el coste puntual del trámite de cambio de potencia.",
                },
                {
                  step: 4,
                  title: "Gestionamos el trámite",
                  text: "Si aceptas, tramitamos la solicitud de cambio de potencia con tu distribuidora. El ajuste se aplica en tu siguiente ciclo de facturación.",
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
            ¿Tu potencia contratada es la correcta?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Envíanos tu factura y te decimos si puedes bajar la potencia y cuánto
            ahorrarías cada mes. Sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Analizar mi potencia gratis →
          </Link>
        </section>

        {/* Links internos */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-900">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/estudio-factura-electrica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Estudio de factura eléctrica
            </Link>
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
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
    </>
  );
}
