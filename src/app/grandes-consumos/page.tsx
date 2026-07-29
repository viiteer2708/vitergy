import type { Metadata } from "next";
import Link from "next/link";
import { SECTORES } from "./sectores";
import {
  AutoridadBloque,
  CasoReal,
  CtaGrandesConsumos,
  MetricasTira,
  ProcesoGrandesConsumos,
} from "./Bloques";

const BASE = "https://vitergy.es";

export const metadata: Metadata = {
  title:
    "Asesoría Energética para Grandes Consumidores | Empresas 3.0TD y 6.1TD - Vitergy",
  description:
    "Consultoría energética para empresas con consumos elevados: tarifas 3.0TD y 6.1TD, optimización de los seis periodos de potencia, reactiva, excesos de maxímetro y negociación multipunto. Estudio sin coste.",
  alternates: { canonical: `${BASE}/grandes-consumos` },
  openGraph: {
    title: "Asesoría Energética para Grandes Consumidores | Vitergy",
    description:
      "Optimizamos contratos de luz y gas de empresas con consumos elevados. Analizamos tu curva horaria real y sacamos tu consumo a mercado entre más de 40 comercializadoras.",
    url: `${BASE}/grandes-consumos`,
    siteName: "Vitergy",
    locale: "es_ES",
    type: "website",
  },
};

const FRENTES = [
  {
    title: "El término de potencia, en seis periodos",
    text: "En 3.0TD y 6.1TD no contratas una potencia: contratas seis, una por periodo, y cada una tiene un precio distinto. El kilovatio de P1 es con diferencia el más caro del año y el de P6 es casi simbólico. La normativa te obliga a que las potencias no decrezcan de P1 a P6, así que el margen de seguridad debe estar en los periodos baratos, no repartido a partes iguales. Contratar plano es el error más caro y el más frecuente.",
  },
  {
    title: "El término de energía y cómo lo compras",
    text: "Por encima de 15 kW no existe el PVPC: tu precio es el que negocies. Fijo, indexado a mercado o una cobertura parcial son decisiones distintas con riesgos distintos, y la respuesta correcta depende de la forma de tu curva y de tu tolerancia a la volatilidad. Simulamos las tres sobre tu consumo real antes de recomendar ninguna.",
  },
  {
    title: "Los excesos de potencia",
    text: "A partir de 15 kW no hay limitador que corte el suministro: si te pasas de la potencia contratada, simplemente te lo facturan con recargo. Y la fórmula acumula todos los cuartos de hora en los que te has excedido durante el periodo, no solo el peor. Varios picos pequeños pueden costar más que uno grande, y casi siempre se evitan escalonando arranques.",
  },
  {
    title: "La energía reactiva",
    text: "Si el factor de potencia de tu instalación cae por debajo de 0,95, la distribuidora factura la energía reactiva en todos los periodos menos el valle. Es un cargo recurrente, invisible en el resumen de la factura y que se corrige de una vez con una batería de condensadores bien dimensionada.",
  },
  {
    title: "Peajes, cargos, impuestos y alquiler de equipos",
    text: "Tarifa de acceso equivocada, equipo de medida que no corresponde a tu tarifa, alquiler facturado de más, impuesto eléctrico mal aplicado sobre la base. Son partidas que nadie revisa porque parecen intocables, y no lo son: se comprueban factura a factura y se reclaman.",
  },
  {
    title: "Los errores de facturación y las regularizaciones",
    text: "Lecturas estimadas encadenadas, regularizaciones a favor de la comercializadora, cláusulas de revisión que se aplican antes de tiempo. En contratos de este tamaño, un error de céntimos por kWh es dinero real todos los meses. Revisamos cada factura contra lo firmado.",
  },
];

const faqs = [
  {
    question: "¿A partir de qué consumo se considera un gran consumidor?",
    answer:
      "El corte práctico está en los 15 kW de potencia contratada. Por debajo estás en 2.0TD y puedes acogerte al PVPC; por encima pasas a 3.0TD —con seis periodos de potencia y seis de energía— y tu precio deja de estar regulado: es el que negocies. Si tu suministro es en alta tensión, hablamos ya de 6.1TD. A partir de ahí, cada decisión del contrato mueve dinero de verdad.",
  },
  {
    question: "¿En qué se diferencia esto de comparar tarifas en un comparador?",
    answer:
      "Un comparador te ordena ofertas por el precio del kWh. En un gran consumo, el precio del kWh no es ni la mitad de la historia: están los seis términos de potencia, los excesos, la reactiva, el modo de contratación y los errores de facturación. Nosotros partimos de tu curva de carga horaria —el consumo real cuarto de hora a cuarto de hora que facilita tu distribuidora— y reconstruimos el contrato entero. La comparación de precio viene al final, cuando ya sabemos qué es lo que hay que comprar.",
  },
  {
    question: "¿Trabajáis con empresas de fuera de Barcelona?",
    answer:
      "Sí. La oficina está en Molins de Rei y atendemos presencialmente el Baix Llobregat y el área de Barcelona, pero el análisis de curva y la negociación se hacen igual de bien a distancia, y trabajamos con empresas de toda España. Si tienes varias sedes en provincias distintas, mejor todavía: se negocian juntas.",
  },
  {
    question: "Tenemos varios puntos de suministro. ¿Se pueden negociar juntos?",
    answer:
      "Es justamente lo que más recomendamos. Agregar todos los CUPS del grupo en una sola cartera y salir a mercado con el volumen completo cambia el nivel de las ofertas que recibes. Lo habitual es tener que alinear vencimientos primero, aunque implique alguna prórroga corta; compensa.",
  },
  {
    question: "¿Cuánto cuesta el estudio y a qué me compromete?",
    answer:
      "El estudio no tiene coste y no te compromete a nada. Te entregamos el análisis completo con las medidas ordenadas por impacto y por esfuerzo, y decides tú qué se ejecuta. Solo cobramos si conseguimos ahorrarte dinero; si al terminar el análisis la conclusión es que tu contrato ya está bien, te lo decimos y no hay factura.",
  },
  {
    question: "¿Vais a recomendarme siempre cambiar de comercializadora?",
    answer:
      "No. Buena parte del ahorro de un gran consumo está en la potencia, la reactiva, los excesos y en cuándo consumes, y todo eso se corrige con tu compañía actual. Si además el precio de energía está por encima de mercado, lo sacamos a concurso; y si no lo está, no tocamos nada. No pertenecemos a ninguna comercializadora, así que no tenemos ningún interés en moverte.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Asesoría energética para grandes consumidores",
    serviceType:
      "Consultoría energética para empresas con tarifa 3.0TD y 6.1TD",
    description:
      "Auditoría y optimización de contratos de luz y gas para empresas con consumos elevados: potencia por periodos, reactiva, excesos de maxímetro, modo de contratación y negociación multipunto.",
    url: `${BASE}/grandes-consumos`,
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sectores de gran consumo",
      itemListElement: SECTORES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Asesoría energética para ${s.nombre.toLowerCase()}`,
          url: `${BASE}/grandes-consumos/${s.slug}`,
        },
      })),
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
    ],
  },
];

export default function GrandesConsumosPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
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
            <span className="text-white/80">Grandes consumos</span>
          </nav>

          <p className="mt-10 text-sm font-semibold tracking-wide text-[#f97316]">
            Empresas · Tarifas 3.0TD y 6.1TD · Multipunto
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Asesoría energética para{" "}
            <span className="text-[#f97316]">grandes consumidores</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
            Cuando una empresa pasa de 15 kW, su factura deja de parecerse a la de
            una casa: seis términos de potencia, seis de energía, excesos de
            maxímetro, reactiva y un precio que ya no regula nadie. Ahí es donde
            aparecen los errores caros —y donde un comparador de tarifas no llega.
            Analizamos tu curva de carga real, reconstruimos el contrato y sacamos
            tu consumo a mercado entre más de cuarenta comercializadoras.
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

          <MetricasTira />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        {/* ─── QUÉ ES UN GRAN CONSUMO ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            ¿Tu empresa es un gran consumidor?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Más de 15 kW contratados",
                d: "Estás en tarifa 3.0TD: seis periodos de potencia y seis de energía. El PVPC ya no te aplica y tu precio es el que negocies.",
              },
              {
                t: "Suministro en alta tensión",
                d: "Tarifa 6.1TD. Aquí cada decisión del contrato se multiplica por un volumen que hace que los errores salgan muy caros.",
              },
              {
                t: "Varios puntos de suministro",
                d: "Varias sedes, naves o locales. Negociados por separado compran como pequeños; agregados, negocian como uno grande.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-orange-100 bg-white p-6"
              >
                <h3 className="font-semibold text-[#1f2942]">{c.t}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b7280]">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-[#6b7280]">
            Si te reconoces en alguno de los tres, tu factura tiene más superficie de
            error —y por tanto más margen de mejora— que la de cualquier negocio
            pequeño. Y ese margen no se encuentra comparando el precio del kilovatio
            hora: se encuentra abriendo el contrato entero.
          </p>
        </section>

        {/* ─── LOS SEIS FRENTES ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Los seis frentes donde se pierde el dinero
          </h2>
          <p className="mt-3 max-w-2xl text-[#6b7280]">
            En una factura de gran consumo el precio de la energía es solo una de las
            piezas. Estas son las seis que revisamos, una por una, en todos los
            estudios.
          </p>
          <div className="mt-8 space-y-4">
            {FRENTES.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff7ed] text-sm font-bold text-[#f97316]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1f2942]">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                      {f.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTORES ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Sectores que trabajamos
          </h2>
          <p className="mt-3 max-w-2xl text-[#6b7280]">
            Cada sector tiene su propia curva de consumo, y la curva es la que manda.
            Estos son los perfiles con los que trabajamos habitualmente.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SECTORES.map((s) => (
              <Link
                key={s.slug}
                href={`/grandes-consumos/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-orange-100 bg-white p-6 transition hover:border-[#f97316] hover:shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">
                  {s.emoji}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#1f2942]">
                  {s.nombre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#6b7280]">
                  {s.resumenHub}
                </p>
                <span className="mt-4 text-sm font-semibold text-[#f97316]">
                  Ver el análisis del sector →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-[#6b7280]">
            ¿Tu actividad no está en la lista? Hoteles, residencias, supermercados,
            talleres, obradores, centros de datos pequeños, comunidades con garaje y
            ascensores… el método es el mismo y las tarifas también.{" "}
            <Link
              href="/contacto"
              className="font-semibold text-[#f97316] underline underline-offset-4"
            >
              Cuéntanos tu caso
            </Link>
            .
          </p>
        </section>

        <CasoReal
          cifra="12.533 €"
          pie="de ahorro anual · 16,5 % de la factura"
          titular="Lo que aparece cuando lees la factura entera"
          texto="Una fundación con residencia y centro de día nos pidió revisar su contrato indexado. Sobre el papel estaba «a precio de mercado»; reproducidas sus ocho facturas periodo a periodo, el sobreprecio sobre el índice había crecido de 1,45 a 4,02 céntimos por kWh en cuatro meses, y los excedentes de sus placas se compensaban a 3 céntimos. Sin tocar potencias ni peajes —solo el precio de la energía y los excedentes—, el resultado fue un 16,5 % de ahorro: 12.533 € al año. Eso no lo ve un comparador. Lo ve quien reconstruye la factura periodo a periodo."
        />

        <ProcesoGrandesConsumos />
        <AutoridadBloque />

        {/* ─── FAQ ─── */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
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
          titulo="Pon tu factura de empresa encima de la mesa"
          texto="Doce meses de facturas y el CUPS de cada suministro. Con eso pedimos tu curva horaria, auditamos el contrato entero y te devolvemos el análisis con las medidas ordenadas por impacto. Sin coste y sin compromiso."
          mensajeWhatsapp="Hola Víctor, tenemos un consumo elevado en la empresa y me gustaría que revisarais nuestro contrato de luz"
        />

        {/* ─── SERVICIOS RELACIONADOS ─── */}
        <section className="mt-16">
          <h2 className="text-lg font-bold text-[#1f2942]">
            Servicios relacionados
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { label: "Consultoría energética", href: "/consultoria-energetica" },
              { label: "Optimización de potencia", href: "/optimizacion-potencia" },
              { label: "Penalizaciones eléctricas", href: "/penalizaciones-electricas" },
              { label: "Monitorización de consumo", href: "/monitorizacion-consumo" },
              { label: "Estudio de factura eléctrica", href: "/estudio-factura-electrica" },
              { label: "Autoconsumo fotovoltaico", href: "/autoconsumo-fotovoltaico" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
