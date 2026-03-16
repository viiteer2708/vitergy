import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Monitorización de Consumo Eléctrico | Controla tu Gasto en Tiempo Real - Vitergy",
  description:
    "Instala un sistema de monitorización y controla tu consumo eléctrico en tiempo real desde el móvil. Detecta consumos fantasma y optimiza tu gasto.",
  alternates: {
    canonical: "https://vitergy.es/monitorizacion-consumo",
  },
};

const faqs = [
  {
    question: "¿Qué es un sistema de monitorización de consumo eléctrico?",
    answer:
      "Es un dispositivo que se conecta a tu cuadro eléctrico y mide en tiempo real cuánta electricidad estás consumiendo en cada momento. Los datos se envían a una app en tu móvil donde puedes ver gráficos de consumo por horas, días o meses, detectar picos inusuales y descubrir qué electrodomésticos consumen más.",
  },
  {
    question: "¿Cuánto puedo ahorrar con la monitorización?",
    answer:
      "Los estudios indican que solo por ser consciente de tu consumo en tiempo real se reduce entre un 10% y un 15% el gasto eléctrico. Si además usas los datos para cambiar hábitos (programar lavadora en horas baratas, detectar consumos fantasma, etc.), el ahorro puede ser mayor.",
  },
  {
    question: "¿Es compatible con mi instalación eléctrica actual?",
    answer:
      "Sí, los sistemas de monitorización que instalamos son compatibles con cualquier instalación eléctrica estándar, tanto monofásica como trifásica. La instalación es no invasiva (se usan pinzas amperimétricas que no requieren cortar cables) y se completa en menos de una hora.",
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

export default function MonitorizacionConsumoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Monitorización de Consumo:{" "}
          <span className="text-[#f97316]">
            Controla tu Electricidad en Tiempo Real
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            No puedes optimizar lo que no mides. Un sistema de monitorización de
            consumo eléctrico te muestra en tiempo real, desde tu móvil, exactamente
            cuánta energía está gastando tu hogar o negocio en cada momento. Podrás
            detectar consumos fantasma, identificar los electrodomésticos que más
            gastan y programar tus hábitos para aprovechar las horas más baratas. En
            Vitergy instalamos sistemas de monitorización no invasivos compatibles
            con cualquier instalación, y te enseñamos a sacarles el máximo partido
            para reducir tu factura de forma permanente.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Dispositivo de monitorización con conexión WiFi y app móvil",
                "Instalación profesional no invasiva en tu cuadro eléctrico",
                "Configuración de alertas de consumo anómalo",
                "Formación personalizada para interpretar los datos y optimizar hábitos",
                "Compatibilidad con instalaciones fotovoltaicas y baterías",
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
                  title: "Evaluamos tu instalación",
                  text: "Revisamos tu cuadro eléctrico para determinar el dispositivo más adecuado (monofásico o trifásico) y planificar la instalación.",
                },
                {
                  step: 2,
                  title: "Instalamos el monitor",
                  text: "Colocamos las pinzas amperimétricas en tu cuadro sin cortar cables ni interrumpir el suministro. El proceso dura menos de una hora.",
                },
                {
                  step: 3,
                  title: "Configuramos la app",
                  text: "Conectamos el dispositivo a tu WiFi, configuramos la app en tu móvil y programamos alertas para que te avise ante consumos inusuales.",
                },
                {
                  step: 4,
                  title: "Te enseñamos a optimizar",
                  text: "Te explicamos cómo leer los datos, detectar consumos fantasma y aprovechar las franjas horarias más baratas para reducir tu factura.",
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
            ¿Quieres saber exactamente qué consume tu electricidad?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Instala un monitor de consumo y empieza a controlar tu gasto eléctrico
            desde el móvil. Pide información sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Solicitar información →
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
              href="/calculadora-consumo-electrico"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Calculadora de consumo eléctrico
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
