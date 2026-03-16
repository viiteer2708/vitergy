import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Asesoría Energética en España | Vitergy - Ahorra en tu Factura de Luz y Gas",
  description:
    "Asesoría energética para empresas y particulares en toda España. Consultor independiente con más de 10 años de experiencia y +5.000 clientes ahorrando. Atención telefónica y presencial.",
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
  { value: "+5.000", label: "Clientes asesorados" },
  { value: "180 €", label: "Ahorro medio/año" },
  { value: "+10", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const faqs = [
  {
    question: "¿Cómo podéis atender a clientes de toda España desde Molins de Rei?",
    answer:
      "El mercado eléctrico en España es el mismo en todas las comunidades autónomas. Analizamos tu factura de forma digital, por lo que podemos asesorarte con la misma eficacia vivas en Madrid, Sevilla, Valencia o cualquier otro punto. Te atendemos por teléfono, videollamada, WhatsApp o email.",
  },
  {
    question: "¿El servicio es diferente para empresas y particulares?",
    answer:
      "El enfoque es el mismo —analizar tu factura y encontrar la mejor opción—, pero las particularidades varían. Las empresas suelen tener contratos con condiciones especiales, tarifas con discriminación horaria avanzada y consumos más elevados. Adaptamos nuestro análisis al perfil de cada cliente.",
  },
  {
    question: "¿Trabajáis con todas las comercializadoras de España?",
    answer:
      "Comparamos las tarifas de más de 40 comercializadoras que operan a nivel nacional, incluyendo las grandes (Endesa, Iberdrola, Naturgy, Repsol, TotalEnergies) y las independientes (Holaluz, Lucera, Octopus Energy, etc.). No estamos vinculados a ninguna y te recomendamos la que mejor te conviene.",
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
            Más de 10 Años Ayudando a Ahorrar
          </span>
        </h1>

        {/* Introducción */}
        <section className="mt-8 space-y-4 leading-7 text-gray-700">
          <p className="text-lg">
            El mercado energético español es complejo: más de 600 comercializadoras,
            decenas de tipos de tarifa y una regulación que cambia cada año. La
            mayoría de consumidores —particulares y empresas— pagan entre un 15% y
            un 30% más de lo necesario simplemente por no tener la tarifa adecuada o
            la potencia mal ajustada. En Vitergy ofrecemos asesoría energética
            independiente a clientes de toda España. Analizamos tu factura, comparamos
            más de 40 compañías y te proponemos cambios concretos para que pagues
            lo justo. Sin vinculación con ninguna comercializadora y con más de 5.000
            clientes asesorados.
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
                "Más de 10 años de experiencia en el mercado energético español",
                "+5.000 clientes asesorados en toda España con un ahorro medio de 180 €/año",
                "Independencia total: no cobramos comisión de ninguna comercializadora",
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
            Da igual dónde estés en España. Envíanos tu factura y te decimos en 24
            horas exactamente cuánto estás pagando de más. Gratis y sin compromiso.
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
