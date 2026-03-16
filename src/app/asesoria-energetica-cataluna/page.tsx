import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Asesoría Energética en Cataluña | Vitergy - Consultor Energético Independiente",
  description:
    "Asesoría energética para particulares y empresas en toda Cataluña. Análisis de factura de luz y gas gratis. Más de 10 años de experiencia ahorrando en Catalunya.",
  alternates: {
    canonical: "https://vitergy.es/asesoria-energetica-cataluna",
  },
};

const provincias = [
  {
    name: "Barcelona",
    text: "Área metropolitana, Baix Llobregat, Vallès, Maresme, Garraf, Penedès y comarcas interiores.",
  },
  {
    name: "Girona",
    text: "Costa Brava, Empordà, La Selva, Gironès y comarcas del interior de Girona.",
  },
  {
    name: "Lleida",
    text: "Segrià, Noguera, Urgell, Val d'Aran, Pallars y resto de comarcas leridanas.",
  },
  {
    name: "Tarragona",
    text: "Camp de Tarragona, Terres de l'Ebre, Baix Camp, Tarragonès, Priorat y costa Daurada.",
  },
];

const sectores = [
  "Industria y fábricas",
  "Hostelería y restauración",
  "Comercio y retail",
  "Particulares y hogares",
  "Comunidades de vecinos",
  "Autónomos y profesionales",
];

const stats = [
  { value: "+5.000", label: "Clientes asesorados" },
  { value: "180 €", label: "Ahorro medio/año" },
  { value: "+10", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const faqs = [
  {
    question: "¿Dais servicio en toda Cataluña o solo en Barcelona?",
    answer:
      "Damos servicio en las cuatro provincias de Cataluña: Barcelona, Girona, Lleida y Tarragona. La atención puede ser presencial en nuestra oficina de Molins de Rei, o a distancia por teléfono, videollamada o email para clientes de cualquier punto de Catalunya.",
  },
  {
    question: "¿Qué tipo de empresas asesoráis en Cataluña?",
    answer:
      "Trabajamos con todo tipo de perfiles: desde hogares y autónomos hasta pymes industriales, cadenas de hostelería, comunidades de propietarios y comercios. Cada sector tiene patrones de consumo distintos y adaptamos nuestro análisis a cada caso.",
  },
  {
    question: "¿Conocéis las particularidades del mercado energético en Cataluña?",
    answer:
      "Sí. Llevamos más de 10 años operando en Cataluña y conocemos a fondo las distribuidoras que operan aquí (Endesa Distribución, principalmente), las bonificaciones del IBI por autoconsumo en cada municipio y las subvenciones autonómicas vigentes.",
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

export default function AsesoriaEnergeticaCatalunaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Asesoría Energética en Cataluña:{" "}
          <span className="text-[#f97316]">
            Tu Consultor Energético Independiente
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            Cataluña concentra una de las mayores densidades empresariales e
            industriales de España, y también algunos de los precios energéticos más
            elevados. Ya seas un particular, un autónomo, una comunidad de vecinos o
            una empresa industrial, es muy probable que estés pagando más de lo
            necesario en tu factura de luz y gas. En Vitergy llevamos más de 10 años
            asesorando a clientes en las cuatro provincias catalanas con un enfoque
            100% independiente: no cobramos comisión de ninguna comercializadora y
            nuestro único objetivo es que pagues lo justo.
          </p>
        </section>

        {/* ¿Por qué elegir Vitergy en Cataluña? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Por qué elegir Vitergy en Cataluña?
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Más de 10 años de experiencia en el mercado energético catalán",
                "Conocimiento de distribuidoras, subvenciones y bonificaciones locales",
                "Atención presencial en Molins de Rei y a distancia en toda Catalunya",
                "Independencia total: comparamos más de 40 comercializadoras",
                "Asesoramiento adaptado a cada sector: industria, hostelería, comercio, hogares",
                "Análisis gratuito y sin compromiso de tu factura de luz y gas",
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

        {/* Provincias */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Cobertura en las 4 provincias
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {provincias.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-orange-100 bg-[#fff5f0] p-5"
                >
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectores */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Sectores que asesoramos
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {sectores.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-orange-100 bg-[#fff5f0] px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  {s}
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
            ¿Quieres ahorrar en tu factura en Cataluña?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Da igual en qué provincia estés. Envíanos tu factura y te decimos
            exactamente cuánto puedes ahorrar. Gratis y sin compromiso.
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
              href="/asesoria-energetica-barcelona"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Asesoría energética en Barcelona
            </Link>
            <Link
              href="/asesoria-energetica-espana"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Asesoría energética en España
            </Link>
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
            </Link>
            <Link
              href="/autoconsumo-fotovoltaico"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Autoconsumo fotovoltaico
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
