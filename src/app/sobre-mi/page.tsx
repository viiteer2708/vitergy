import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Mí | Víctor Marrón - Asesor Energético en Molins de Rei - Vitergy",
  description:
    "Soy Víctor Marrón, asesor energético independiente en Molins de Rei: más de 12 años en el sector, +200 GWh gestionados y +400 clientes en cartera.",
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
    title: "El boca a boca",
    text: "Familias y pequeños negocios del Baix Llobregat empiezan a llegar por recomendación.",
  },
  {
    year: "2021",
    title: "Expansión a toda España",
    text: "Gracias a las herramientas digitales, empecé a asesorar clientes de toda España. Servicios de autoconsumo fotovoltaico e instalación de baterías se sumaron a la oferta.",
  },
  {
    year: "2026",
    title: "Asesoría 100% online",
    text: "Vitergy funciona 100% online: analizo cada factura a distancia y atiendo por teléfono, WhatsApp, videollamada o email, estés donde estés. Más de 400 clientes en cartera y contando.",
  },
];

const stats = [
  { value: "+400", label: "Clientes en cartera" },
  { value: "+200 GWh", label: "Consumo gestionado" },
  { value: "+12", label: "Años de experiencia" },
  { value: "40+", label: "Compañías analizadas" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://vitergy.es/sobre-mi#victor-marron",
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
            Desde entonces he gestionado{" "}
            <strong>más de 200 GWh de consumo</strong>, y hoy{" "}
            <strong>más de 400 clientes</strong> —particulares y empresas de
            toda España— confían su energía a Vitergy.
          </p>
          <p>
            Vitergy nació como un servicio de asesoría energética{" "}
            <strong>100% independiente</strong>: no pertenezco a ninguna
            comercializadora ni tengo exclusiva con ninguna. Cuando te gestiono
            un cambio, me paga la compañía, no tú; por eso solo te lo propongo si
            ahorras. Mi interés es el mismo que el tuyo: que pagues lo justo por la energía
            que consumes.
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
                Si no ahorras, no pagas
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                A ti no te cobro nada: cobro de la compañía, y solo cuando tú
                ahorras. Si no encuentro una mejora real en tu factura, te lo
                digo y ni tú pagas ni yo cobro.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-[#fff5f0] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                2
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Sin casarme con nadie
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Comparo cientos de ofertas de más de 40 compañías y te propongo
                la que más te ahorra de las que puedo gestionarte. Ninguna
                compañía me dice qué recomendar.
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
            La primera consulta es gratuita y sin compromiso. Sube tu factura y
            en un minuto ves cuánto puedes ahorrar; si quieres, te llamo en
            menos de 24 horas laborables.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contacto"
              className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Calcular mi ahorro →
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
