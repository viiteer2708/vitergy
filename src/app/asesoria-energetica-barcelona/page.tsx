import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Asesoría Energética en Barcelona | Vitergy - Ahorra en tu Factura de Luz",
  description:
    "Asesor energético independiente en Barcelona y área metropolitana. Análisis gratuito de tu factura de luz y gas. Oficina física en Molins de Rei, atención en toda Barcelona.",
  alternates: {
    canonical: "https://vitergy.es/asesoria-energetica-barcelona",
  },
};

const municipios = [
  "Barcelona",
  "L'Hospitalet",
  "Badalona",
  "Terrassa",
  "Sabadell",
  "Mataró",
  "Santa Coloma",
  "Cornellà",
  "Sant Boi",
  "El Prat",
  "Gavà",
  "Castelldefels",
  "Sitges",
  "Viladecans",
  "Esplugues",
  "Sant Just Desvern",
  "Molins de Rei",
  "Sant Feliu de Llobregat",
  "Martorell",
  "Rubí",
];

const stats = [
  { value: "+5.000", label: "Clientes asesorados" },
  { value: "180 €", label: "Ahorro medio/año" },
  { value: "+10", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const faqs = [
  {
    question: "¿Tenéis oficina física en Barcelona?",
    answer:
      "Nuestra oficina está en Molins de Rei (Carrer de Ferran Agulló 6), a 20 minutos del centro de Barcelona. Atendemos presencialmente con cita previa y también de forma online o telefónica para clientes de toda la provincia de Barcelona y área metropolitana.",
  },
  {
    question: "¿Cuánto cuesta la asesoría energética en Barcelona?",
    answer:
      "El análisis inicial de tu factura de luz y gas es completamente gratuito y sin compromiso. Estudiamos tu caso, te decimos cuánto puedes ahorrar y solo si decides seguir adelante con nuestras recomendaciones se aplica algún coste. Trabajamos a éxito: si no ahorras, no pagas.",
  },
  {
    question: "¿Atendéis a empresas o solo a particulares?",
    answer:
      "Asesoramos a todo tipo de clientes en Barcelona: particulares, autónomos, pymes, comunidades de propietarios, industria y hostelería. Cada perfil de consumo tiene sus particularidades y adaptamos nuestro análisis a cada caso.",
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

export default function AsesoriaEnergeticaBarcelonaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Asesoría Energética en Barcelona:{" "}
          <span className="text-[#f97316]">
            Análisis Gratuito de tu Factura
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Barcelona es una de las ciudades con mayor gasto energético de España,
            tanto por el volumen de hogares como por la densidad de comercios,
            restaurantes y pequeñas empresas. Y sin embargo, la mayoría de
            barceloneses sigue pagando más de lo necesario en sus facturas de luz y
            gas. En Vitergy llevamos más de 10 años asesorando a particulares y
            empresas de Barcelona y su área metropolitana desde nuestra oficina en
            Molins de Rei. Analizamos tu factura gratis, comparamos más de 40
            compañías y te conseguimos el mejor precio sin que tengas que hacer nada.
          </p>
        </section>

        {/* ¿Por qué elegir Vitergy en Barcelona? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Por qué elegir Vitergy en Barcelona?
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Oficina física en Molins de Rei, a 20 minutos del centro de Barcelona",
                "Más de 5.000 clientes asesorados en la provincia de Barcelona",
                "100% independientes: no cobramos comisión de ninguna comercializadora",
                "Análisis gratuito y sin compromiso de tu factura de luz y gas",
                "Atención presencial, telefónica y online según tu preferencia",
                "Conocimiento profundo del mercado energético en Cataluña y sus particularidades",
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

        {/* Zonas que cubrimos */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Municipios donde operamos
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Damos servicio de asesoría energética en Barcelona capital y los
              principales municipios del área metropolitana:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {municipios.map((m) => (
                <span
                  key={m}
                  className="rounded-lg border border-orange-100 bg-[#fff5f0] px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-12 rounded-2xl border border-orange-100 bg-white p-8 sm:p-10">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Vitergy en números
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-[#f97316]">{s.value}</p>
                <p className="mt-1 text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
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
            ¿Vives o trabajas en Barcelona? Te ayudamos a ahorrar
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Envíanos tu factura y en menos de 24 horas te decimos exactamente cuánto
            puedes ahorrar. Sin compromiso.
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
            También te puede interesar
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/asesoria-energetica-cataluna"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Asesoría energética en Cataluña
            </Link>
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
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
