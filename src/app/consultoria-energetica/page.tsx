import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultoría Energética | Análisis Gratuito de tu Factura - Vitergy",
  description:
    "Consultoría energética independiente en Molins de Rei. Analizamos gratis tu factura de luz y gas y la comparamos con cientos de ofertas de más de 40 compañías. Si no ahorras, te lo decimos.",
  alternates: {
    canonical: "https://vitergy.es/consultoria-energetica",
  },
};

const faqs = [
  {
    question: "¿Realmente el análisis de mi factura es gratuito?",
    answer:
      "Sí, el análisis inicial de tu factura de luz y gas es completamente gratuito y sin compromiso. Estudiamos tu consumo, tu potencia contratada y tu tarifa actual para detectar cualquier margen de ahorro. A ti no te cuesta nada en ningún caso: cobramos de la compañía, y solo cuando tú ahorras.",
  },
  {
    question: "¿Sois independientes o trabajáis para alguna compañía eléctrica?",
    answer:
      "Somos 100% independientes: no pertenecemos a ninguna comercializadora ni tenemos exclusiva con ninguna, no nos casamos con nadie. Cuando gestionamos tu cambio, la compañía nos paga una comisión; a ti no te cuesta nada. Como comparamos cientos de ofertas de más de 40 compañías, lo único que nos sirve es proponerte la que más te ahorra de las que podemos gestionarte. Y si no ahorras, te lo decimos: ni tú pagas ni nosotros cobramos.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de consultoría?",
    answer:
      "Tu ahorro lo ves al momento en la calculadora y Víctor te llama en menos de 24 horas laborables. Si decides seguir, el cambio de compañía, por norma general, no lleva más de 5 días laborables y no sufres ningún corte de suministro; un ajuste de potencia depende de lo que tarde la distribuidora.",
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
            ¿Cuánto de tu factura es potencia que no usas, servicios que no pediste
            o un precio que nadie ha revisado? Nuestra consultoría energética
            independiente analiza tu situación real —potencia contratada, tarifa,
            hábitos de consumo— y te propone cambios concretos para que pagues lo
            justo. Sin letra pequeña: te avisamos de cualquier permanencia antes de
            firmar, y el análisis inicial es completamente gratuito. Víctor lleva
            más de 12 años en el sector ayudando a particulares, autónomos y
            empresas de toda España a reducir sus costes energéticos.
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
                  text: "Mándanos una foto o PDF de tu última factura de luz o gas: súbela a nuestra calculadora o mándala por WhatsApp o email.",
                },
                {
                  step: 2,
                  title: "Analizamos tu situación",
                  text: "La calculadora te da la cifra al momento y, en menos de 24 horas laborables, Víctor revisa contigo cada concepto: potencia, consumo, peajes, impuestos y condiciones contractuales.",
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
            Sube tu factura y en un minuto ves cuánto estás pagando de más. Sin
            compromiso y sin dejar tus datos.
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
