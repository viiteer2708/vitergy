import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Asesoría Energética en España | Vitergy - Ahorra en tu Factura de Luz y Gas",
  description:
    "Asesoría energética para empresas y particulares en toda España. Consultor independiente con más de 12 años de experiencia y +400 clientes en cartera. Atención telefónica y online.",
  alternates: {
    canonical: "https://vitergy.es/asesoria-energetica-espana",
  },
};

const comunidades = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Baleares",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
];

const tiposCliente = [
  "Pymes y empresas",
  "Industria y fábricas",
  "Hostelería y restauración",
  "Retail y comercio",
  "Comunidades de propietarios",
  "Particulares y hogares",
];

const stats = [
  { value: "+400", label: "Clientes en cartera" },
  { value: "20.000 €", label: "Récord de ahorro anual" },
  { value: "+12", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const faqs = [
  {
    question: "¿Cómo podéis atender a clientes de toda España?",
    answer:
      "El mercado eléctrico en España es el mismo en todas las comunidades autónomas. Analizamos tu factura de forma digital, por lo que podemos asesorarte con la misma eficacia vivas en Madrid, Sevilla, Valencia o cualquier otro punto. Te atendemos por teléfono, videollamada, WhatsApp o email.",
  },
  {
    question: "¿El servicio es diferente para empresas y particulares?",
    answer:
      "El enfoque es el mismo —analizar tu factura y proponerte la opción que más te ahorra de las que podemos gestionarte—, pero las particularidades varían. Las empresas suelen tener contratos con condiciones especiales, tarifas con discriminación horaria avanzada y consumos más elevados. Adaptamos nuestro análisis al perfil de cada cliente.",
  },
  {
    question: "¿Trabajáis con todas las comercializadoras de España?",
    answer:
      "Comparamos cientos de ofertas de más de 40 comercializadoras que operan en toda España, grandes y pequeñas. No pertenecemos a ninguna ni tenemos exclusiva con ninguna, y te proponemos la que más te ahorra de las que podemos gestionarte.",
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

export default function AsesoriaEnergeticaEspanaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Asesoría Energética en España:{" "}
          <span className="text-[#f97316]">
            Más de 12 Años Ayudando a Ahorrar
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            El mercado energético español es complejo: cientos de comercializadoras,
            decenas de tipos de tarifa y una regulación que cambia cada año. Muchos
            consumidores —particulares y empresas— pagan de más por una tarifa que
            no encaja o una potencia mal ajustada, y no lo saben. En Vitergy ofrecemos asesoría energética
            independiente a clientes de toda España. Analizamos tu factura, comparamos
            más de 40 compañías y te proponemos cambios concretos para que pagues
            lo justo. Sin vinculación con ninguna comercializadora —no nos casamos
            con nadie— y con más de 400 clientes en cartera.
          </p>
        </section>

        {/* ¿Por qué elegir Vitergy en España? */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Por qué elegir Vitergy en España?
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Más de 12 años de experiencia y más de 200 GWh gestionados en el mercado energético español",
                "+400 clientes en cartera; hasta 20.000 € de ahorro anual conseguido a un solo cliente",
                "Independencia total: no pertenecemos a ninguna comercializadora ni tenemos exclusiva con ninguna",
                "Comparamos más de 40 compañías nacionales e independientes",
                "Atención personalizada por teléfono, videollamada, WhatsApp y email",
                "Análisis gratuito y sin compromiso, tanto para particulares como empresas",
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

        {/* Comunidades autónomas */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Cobertura nacional: todas las comunidades autónomas
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Asesoramos a clientes en toda la geografía española, sin importar tu
              comunidad autónoma:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {comunidades.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-orange-100 bg-[#fff5f0] px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tipos de cliente */}
        <section className="mt-12">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tipos de cliente que asesoramos
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {tiposCliente.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-orange-100 bg-[#fff5f0] px-3 py-1.5 text-sm font-medium text-gray-700"
                >
                  {t}
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
            ¿Quieres saber cuánto puedes ahorrar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Da igual dónde estés en España. Sube tu factura y en un minuto ves
            cuánto estás pagando de más, y Víctor te llama en menos de 24 horas
            laborables. Gratis y sin compromiso.
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
              href="/asesoria-energetica-barcelona"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Asesoría energética en Barcelona
            </Link>
            <Link
              href="/consultoria-energetica"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Consultoría energética
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
