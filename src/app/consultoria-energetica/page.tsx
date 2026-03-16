import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultoría Energética | Análisis Gratuito de tu Factura - Vitergy",
  description:
    "Consultoría energética independiente en Molins de Rei. Analizamos tu factura de luz y gas gratis y te conseguimos el mejor precio. Sin permanencia.",
  alternates: {
    canonical: "https://vitergy.es/consultoria-energetica",
  },
};

const faqs = [
  {
    question: "¿Realmente el análisis de mi factura es gratuito?",
    answer:
      "Sí, el análisis inicial de tu factura de luz y gas es completamente gratuito y sin compromiso. Estudiamos tu consumo, tu potencia contratada y tu tarifa actual para detectar cualquier margen de ahorro. Solo si decides seguir adelante con nuestras recomendaciones se aplica algún coste.",
  },
  {
    question: "¿Sois independientes o trabajáis para alguna compañía eléctrica?",
    answer:
      "Somos 100% independientes. No estamos vinculados a ninguna comercializadora ni cobramos comisiones de ninguna empresa energética. Comparamos más de 40 compañías y te recomendamos la que mejor se adapta a tu perfil de consumo real.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de consultoría?",
    answer:
      "El análisis inicial de tu factura lo realizamos en menos de 24 horas. Si detectamos ahorro y decides proceder, la implementación de los cambios (ajuste de potencia, cambio de tarifa o de compañía) suele completarse en 1-2 semanas sin que sufras ningún corte de suministro.",
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

export default function ConsultoriaEnergeticaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Consultoría Energética:{" "}
          <span className="text-[#f97316]">
            Análisis Gratuito de tu Factura de Luz y Gas
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            ¿Sabías que la mayoría de hogares y negocios en España pagan entre un
            15% y un 30% más de lo necesario en sus facturas de luz y gas? Nuestra
            consultoría energética independiente analiza tu situación real —potencia
            contratada, tarifa, hábitos de consumo— y te propone cambios concretos
            para que pagues lo justo. Sin permanencia, sin letra pequeña y con un
            análisis inicial completamente gratuito. Llevamos más de 10 años
            ayudando a particulares, autónomos y empresas de toda España a reducir
            sus costes energéticos.
          </p>
        </section>

        {/* ¿Qué incluye? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">¿Qué incluye?</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Análisis detallado de tu factura de luz y gas línea a línea",
                "Revisión de la potencia contratada frente a tu consumo real",
                "Comparativa entre más de 40 comercializadoras del mercado español",
                "Informe personalizado con recomendaciones de ahorro concretas",
                "Gestión completa del cambio de tarifa o compañía si lo deseas",
                "Seguimiento posterior para asegurar que el ahorro se mantiene",
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
                  text: "Mándanos una foto o PDF de tu última factura de luz o gas por WhatsApp, email o a través de nuestro formulario de contacto.",
                },
                {
                  step: 2,
                  title: "Analizamos tu situación",
                  text: "En menos de 24 horas revisamos cada concepto de tu factura: potencia, consumo, peajes, impuestos y condiciones contractuales.",
                },
                {
                  step: 3,
                  title: "Te presentamos un plan de ahorro",
                  text: "Te contactamos con un informe claro que detalla cuánto puedes ahorrar y qué cambios recomendamos para conseguirlo.",
                },
                {
                  step: 4,
                  title: "Gestionamos todo por ti",
                  text: "Si aceptas, nos encargamos de todos los trámites: cambio de compañía, ajuste de potencia o modificación de tarifa. Sin papeleo para ti.",
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
            ¿Quieres saber cuánto puedes ahorrar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Envíanos tu factura y en menos de 24 horas te decimos exactamente
            cuánto estás pagando de más. Sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
          >
            Solicitar análisis gratuito →
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
              href="/comparador-tarifas-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Comparador de tarifas de luz
            </Link>
            <Link
              href="/cambiar-compania-luz"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Cambiar de compañía de luz
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
