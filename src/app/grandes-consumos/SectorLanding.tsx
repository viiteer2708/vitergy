import Link from "next/link";
import type { Sector } from "./sectores";
import { SECTORES } from "./sectores";
import {
  AutoridadBloque,
  CtaGrandesConsumos,
  ProcesoGrandesConsumos,
} from "./Bloques";

const BASE = "https://vitergy.es";

function jsonLdDe(sector: Sector) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: sector.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Asesoría energética para ${sector.nombre.toLowerCase()}`,
      serviceType: "Consultoría energética para grandes consumidores",
      description: sector.metaDescription,
      url: `${BASE}/grandes-consumos/${sector.slug}`,
      areaServed: ["Molins de Rei", "Barcelona", "Cataluña", "España"],
      provider: {
        "@type": "LocalBusiness",
        name: "Vitergy - Asesoría Energética",
        url: BASE,
        telephone: "+34633151083",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer de Ferran Agulló 6, local",
          addressLocality: "Molins de Rei",
          addressRegion: "Barcelona",
          postalCode: "08750",
          addressCountry: "ES",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Grandes consumos",
          item: `${BASE}/grandes-consumos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: sector.nombre,
          item: `${BASE}/grandes-consumos/${sector.slug}`,
        },
      ],
    },
  ];
}

export default function SectorLanding({ sector }: { sector: Sector }) {
  const hermanos = SECTORES.filter((s) => s.slug !== sector.slug);
  const mensajeWhatsapp = `Hola Víctor, tengo un ${sector.navLabel.toLowerCase()} y me gustaría que revisarais nuestro consumo eléctrico`;

  return (
    <>
      {jsonLdDe(sector).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ─── HERO ─── */}
      <section className="bg-[#1f2942] px-6 pt-8 pb-16 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <nav
            aria-label="Migas de pan"
            className="flex flex-wrap items-center gap-2 text-sm text-white/50"
          >
            <Link href="/" className="transition hover:text-[#f97316]">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/grandes-consumos"
              className="transition hover:text-[#f97316]"
            >
              Grandes consumos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{sector.nombre}</span>
          </nav>

          <p className="mt-10 text-sm font-semibold tracking-wide text-[#f97316]">
            {sector.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {sector.h1.antes}{" "}
            <span className="text-[#f97316]">{sector.h1.destacado}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            {sector.entradilla}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl bg-[#f97316] px-7 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] transition-all hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Pedir estudio sin coste
            </Link>
            <a
              href="tel:+34633151083"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50"
            >
              Llamar al 633 15 10 83
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        {/* ─── FICHA DEL SECTOR ─── */}
        <section className="-mt-10 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-[#1f2942]">
            Perfil energético del sector
          </h2>
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {sector.ficha.map((f) => (
              <div key={f.label} className="border-l-2 border-[#f97316] pl-4">
                <dt className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-[#1f2942]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── DOLORES ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Dónde se está yendo el dinero
          </h2>
          <p className="mt-3 max-w-2xl text-[#6b7280]">
            Los problemas que encontramos una y otra vez en{" "}
            {sector.nombre.toLowerCase()}. Ninguno se ve mirando el precio del kWh
            de la última factura.
          </p>
          <div className="mt-8 space-y-4">
            {sector.dolores.map((d, i) => (
              <div
                key={d.title}
                className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff7ed] text-sm font-bold text-[#f97316]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1f2942]">{d.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                      {d.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PALANCAS ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Las palancas que movemos
          </h2>
          <p className="mt-3 max-w-2xl text-[#6b7280]">
            Ordenadas como las ejecutamos: primero lo que se corrige sin invertir
            un euro, después lo que exige decisión y presupuesto.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {sector.palancas.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-2xl border border-orange-100 bg-white p-6"
              >
                <h3 className="font-semibold text-[#1f2942]">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#6b7280]">
                  {p.text}
                </p>
                <p className="mt-4 border-t border-orange-100 pt-3 text-sm font-medium text-[#f97316]">
                  {p.impacto}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ESCENARIO ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            {sector.escenario.titular}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6b7280]">
            {sector.escenario.supuesto}
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-orange-100 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 bg-[#fff7ed]">
                  <th className="px-6 py-4 font-semibold text-[#1f2942]">
                    Qué encontramos
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#1f2942]">
                    Situación
                  </th>
                  <th className="px-6 py-4 font-semibold text-[#1f2942]">
                    Qué implica
                  </th>
                </tr>
              </thead>
              <tbody>
                {sector.escenario.lineas.map((l) => (
                  <tr
                    key={l.concepto}
                    className="border-b border-orange-50 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-[#1f2942]">
                      {l.concepto}
                    </td>
                    <td className="px-6 py-4 leading-6 text-[#6b7280]">
                      {l.detalle}
                    </td>
                    <td className="px-6 py-4 leading-6 text-[#f97316]">
                      {l.efecto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-[#1f2942]">
            {sector.escenario.cierre}
          </p>
        </section>

        <ProcesoGrandesConsumos />
        <AutoridadBloque />

        {/* ─── FAQ ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-8 space-y-4">
            {sector.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-orange-100 bg-white p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#1f2942]">
                  <h3 className="text-base font-semibold">{faq.question}</h3>
                  <span className="shrink-0 text-[#f97316] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-[#6b7280]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <CtaGrandesConsumos
          titulo={sector.ctaTitulo}
          texto="Mándanos doce meses de facturas y el CUPS. Te devolvemos el análisis completo con las medidas ordenadas por impacto, sin coste y sin compromiso."
          mensajeWhatsapp={mensajeWhatsapp}
        />

        {/* ─── OTROS SECTORES ─── */}
        <section className="mt-16">
          <h2 className="text-lg font-bold text-[#1f2942]">
            Otros sectores de gran consumo
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {hermanos.map((s) => (
              <Link
                key={s.slug}
                href={`/grandes-consumos/${s.slug}`}
                className="rounded-xl border border-orange-100 bg-white px-5 py-4 transition hover:border-[#f97316]"
              >
                <span className="text-lg" aria-hidden="true">
                  {s.emoji}
                </span>
                <p className="mt-1 text-sm font-semibold text-[#1f2942]">
                  {s.nombre}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── SERVICIOS RELACIONADOS ─── */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-[#1f2942]">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {sector.relacionados.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                {r.label}
              </Link>
            ))}
            <Link
              href="/grandes-consumos"
              className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
            >
              Asesoría para grandes consumidores
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
