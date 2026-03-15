import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Mí | Víctor Marrón - Asesor Energético en Molins de Rei - Vitergy",
  description:
    "Soy Víctor Marrón, asesor energético independiente en Molins de Rei desde 2015. Más de 10 años ayudando a familias y empresas a ahorrar en sus facturas de luz y gas.",
  alternates: {
    canonical: "https://vitergy.es/sobre-mi",
  },
};

const timeline = [
  {
    year: "2015",
    title: "Primeros clientes en Molins de Rei",
    text: "Empecé asesorando a vecinos, amigos y familiares que no entendían sus facturas de la luz. Lo que comenzó como ayuda entre conocidos pronto se convirtió en una vocación.",
  },
  {
    year: "2018",
    title: "Más de 1.000 clientes ahorrando",
    text: "El boca a boca hizo crecer el proyecto. En tres años, más de 1.000 familias y pequeños negocios del Baix Llobregat confiaron en mi asesoría para reducir sus facturas.",
  },
  {
    year: "2021",
    title: "Expansión a toda España",
    text: "Gracias a las herramientas digitales, empecé a asesorar clientes de toda España. Servicios de autoconsumo fotovoltaico e instalación de baterías se sumaron a la oferta.",
  },
  {
    year: "2026",
    title: "Apertura de oficina física en Molins de Rei",
    text: "Abro la oficina de Vitergy en el Carrer de Ferran Agulló 6, un espacio donde atender presencialmente a quien lo prefiera. Más de 5.000 clientes asesorados y contando.",
  },
];

const stats = [
  { value: "+5.000", label: "Clientes asesorados" },
  { value: "180 €", label: "Ahorro medio/año" },
  { value: "+10", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Víctor Marrón",
  jobTitle: "Asesor Energético",
  worksFor: {
    "@type": "Organization",
    name: "Vitergy",
    url: "https://vitergy.es",
  },
  url: "https://vitergy.es/sobre-mi",
};

export default function SobreMiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Hola, soy Víctor Marrón —{" "}
          <span className="text-[#f97316]">
            Asesor Energético en Molins de Rei
          </span>
        </h1>

        {/* Historia personal */}
        <section className="mt-8 space-y-5 leading-7 text-gray-700">
          <p className="text-lg">
            Soy de Molins de Rei desde que tengo 8 años. Aquí está mi familia,
            mis amigos, mi vida. Empecé en esto en 2015 cuando vi cómo a mi
            abuela la cambiaban de compañía eléctrica 7 veces en un año sin que
            ella se enterara.
          </p>
          <p>
            Aquel día decidí que iba a entender cómo funcionaba el mercado
            eléctrico — y que iba a ayudar a que nadie más pasara por lo mismo.
            Desde entonces he ayudado a{" "}
            <strong>más de 5.000 clientes</strong> a pagar menos en sus facturas
            de luz y gas, tanto particulares como empresas de toda España.
          </p>
          <p>
            Vitergy nació como un servicio de asesoría energética{" "}
            <strong>100% independiente</strong>: no estoy vinculado a ninguna
            comercializadora, no cobro comisiones de ninguna empresa eléctrica.
            Mi único interés es que tú pagues lo justo por la energía que
            consumes.
          </p>
        </section>

        {/* Timeline */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">Mi trayectoria</h2>
          <div className="mt-8 space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                {i < timeline.length - 1 && (
                  <div className="absolute left-[19px] top-10 h-full w-0.5 bg-orange-200" />
                )}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white shadow-sm">
                  {item.year.slice(2)}
                </div>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#f97316]">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mi forma de trabajar */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Mi forma de trabajar
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-[#fff5f0] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                1
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Trabajo a éxito
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Solo cobro si consigo ahorrarte dinero. Si no encuentro una
                mejora real en tu factura, mi asesoría es completamente gratuita.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-[#fff5f0] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                2
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Independencia total
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                No cobro comisiones de ninguna comercializadora. Analizo más de
                40 compañías y te recomiendo la que más te conviene a ti, no la
                que más me paga a mí.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-[#fff5f0] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                3
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Atención personalizada
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Cada caso es diferente. Estudio tu factura línea a línea, tu
                perfil de consumo y tus necesidades para darte una recomendación
                a medida.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-14 rounded-2xl bg-gray-50 p-8 sm:p-10">
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

        {/* CTA */}
        <section className="mt-14 rounded-2xl bg-[#fff5f0] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Hablamos de tu factura?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            La primera consulta es gratuita y sin compromiso. Cuéntame tu caso y
            te digo exactamente cuánto puedes ahorrar.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Ver cómo funciona →
            </Link>
            <Link
              href="/contacto"
              className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
            >
              Contactar directamente
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
