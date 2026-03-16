import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Mantenimiento de Instalación Eléctrica | Revisiones para Hogares y Empresas - Vitergy",
  description:
    "Servicio de mantenimiento y revisión de instalaciones eléctricas en Molins de Rei y Baix Llobregat. Detección de problemas antes de que sean costosos.",
  alternates: {
    canonical: "https://vitergy.es/mantenimiento-electrico",
  },
};

const faqs = [
  {
    question: "¿Cada cuánto hay que revisar la instalación eléctrica?",
    answer:
      "La normativa recomienda una revisión completa cada 10 años para viviendas y cada 5 años para locales comerciales e industrias. Sin embargo, si notas bajadas de tensión, calentamiento en enchufes o saltos frecuentes del diferencial, conviene hacer una revisión cuanto antes para evitar riesgos.",
  },
  {
    question: "¿Qué incluye una revisión de mantenimiento eléctrico?",
    answer:
      "Revisamos el cuadro eléctrico, el estado de los diferenciales y magnetotérmicos, la toma de tierra, el cableado general, los enchufes y puntos de luz. También verificamos que la instalación cumple con el Reglamento Electrotécnico de Baja Tensión (REBT) vigente.",
  },
  {
    question: "¿Dais servicio fuera de Molins de Rei?",
    answer:
      "Sí. Aunque nuestra oficina está en Molins de Rei, damos servicio de mantenimiento eléctrico en toda la comarca del Baix Llobregat y alrededores: Sant Feliu, Sant Joan Despí, Cornellà, Sant Vicenç dels Horts, Pallejà, Sant Andreu de la Barca y más.",
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

export default function MantenimientoElectricoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Mantenimiento Eléctrico:{" "}
          <span className="text-[#f97316]">
            Revisiones para Hogares y Empresas en Molins de Rei
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Una instalación eléctrica en mal estado no solo dispara tu factura por
            fugas y pérdidas de eficiencia, sino que supone un riesgo real de
            incendio o electrocución. Nuestro servicio de mantenimiento eléctrico
            revisa tu instalación a fondo para detectar problemas antes de que se
            conviertan en averías costosas o peligrosas. Trabajamos con hogares,
            comunidades de propietarios, locales comerciales y empresas en Molins de
            Rei y toda la comarca del Baix Llobregat. Técnicos certificados, precios
            transparentes y presupuesto sin compromiso.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Revisión completa del cuadro eléctrico y protecciones",
                "Verificación del estado del cableado y conexiones",
                "Medición de la toma de tierra y resistencia de aislamiento",
                "Comprobación de diferenciales y magnetotérmicos",
                "Informe detallado con el estado de la instalación y recomendaciones",
                "Presupuesto de reparación si se detectan deficiencias",
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
                  title: "Contactas con nosotros",
                  text: "Cuéntanos el tipo de inmueble (vivienda, local, comunidad) y la antigüedad aproximada de la instalación para preparar la visita.",
                },
                {
                  step: 2,
                  title: "Visita de inspección",
                  text: "Un técnico certificado acude a tu domicilio o local, revisa toda la instalación con equipos de medición profesionales y documenta el estado de cada elemento.",
                },
                {
                  step: 3,
                  title: "Informe y presupuesto",
                  text: "Te entregamos un informe claro con el diagnóstico completo. Si hay reparaciones necesarias, te damos un presupuesto detallado sin compromiso.",
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
            ¿Cuándo fue la última vez que revisaste tu instalación eléctrica?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Pide una revisión preventiva y asegúrate de que tu instalación es segura
            y eficiente. Presupuesto sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Pedir revisión →
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
              href="/monitorizacion-consumo"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Monitorización de consumo
            </Link>
            <Link
              href="/contacto"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Contacto
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
