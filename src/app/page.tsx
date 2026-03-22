import Image from "next/image";
import Link from "next/link";

const casosReales = [
  {
    tipo: "Familia",
    antes: "127€/mes",
    despues: "84€/mes",
    ahorro: "516€/año",
    detalle: "Cambio de tarifa + ajuste de potencia. Sin tocar nada en casa.",
  },
  {
    tipo: "Bar de barrio",
    antes: "340€/mes",
    despues: "215€/mes",
    ahorro: "1.500€/año",
    detalle: "Tarifa mal dimensionada desde hace 3 años. Nadie se lo había dicho.",
  },
  {
    tipo: "Comunidad de vecinos",
    antes: "890€/mes",
    despues: "580€/mes",
    ahorro: "3.720€/año",
    detalle: "Potencia sobredimensionada + penalizaciones por reactiva que nadie detectó.",
  },
];

const pasos = [
  {
    num: "01",
    title: "Envía tu factura",
    desc: "Por WhatsApp, email o formulario. Una foto vale.",
  },
  {
    num: "02",
    title: "Analizamos todo",
    desc: "En menos de 24h revisamos cada concepto de tu factura.",
  },
  {
    num: "03",
    title: "Te proponemos un plan",
    desc: "Con cifras reales de ahorro y sin letra pequeña.",
  },
  {
    num: "04",
    title: "Gestionamos el cambio",
    desc: "Si aceptas, nos encargamos de todo. Sin cortes ni papeleo.",
  },
];

const reviews = [
  {
    text: "Victor lleva ayudándonos desde 2015. Siempre disponible, siempre con soluciones. Sabe MUY bien lo que hace.",
    name: "GRUPO NEW ENERGY",
    detail: "Cliente desde 2015",
  },
  {
    text: "Antes pagaba 85€ al mes, ahora pago 62€. Son 23€ menos cada mes sin cambiar nada en casa. Solo con el cambio que me recomendó Víctor.",
    name: "Carmen",
    detail: "Clienta desde 2022",
  },
  {
    text: "La mejor asesoría energética. Conozco al dueño y ya estoy ahorrando antes de la apertura. Totalmente recomendable.",
    name: "Rubén Camacho",
    detail: "Cliente verificado",
  },
];

const faqs = [
  {
    question: "¿Cuánto cuesta la asesoría energética?",
    answer:
      "El análisis de tu factura es gratis. Solo cobramos si conseguimos ahorrarte dinero. Así de simple: si no ahorras, no pagas.",
  },
  {
    question: "¿Cuánto puedo ahorrar con un asesor energético?",
    answer:
      "Depende de tu caso. La media de nuestros clientes ahorra 180€ al año solo cambiando de tarifa. En casos con potencia mal ajustada o penalizaciones, el ahorro supera los 500€ anuales.",
  },
  {
    question: "¿Trabajáis para alguna compañía eléctrica?",
    answer:
      "No. Somos independientes. No cobramos comisiones de ninguna comercializadora. Comparamos más de 40 compañías y te recomendamos la que más te conviene a ti, no la que nos paga más.",
  },
  {
    question: "¿Cuánto tarda el proceso?",
    answer:
      "El análisis de tu factura lo hacemos en menos de 24 horas. Si decides cambiar de compañía, el proceso tarda entre 2 y 4 semanas. Nosotros nos encargamos de todo el papeleo.",
  },
  {
    question: "¿Me quedaré sin luz durante el cambio?",
    answer:
      "No. Nunca. El cambio de comercializadora es invisible: no se corta la luz, no cambia el contador, no viene nadie a tu casa. Solo cambia quién te cobra y cuánto.",
  },
  {
    question: "¿Qué necesito para empezar?",
    answer:
      "Una foto de tu última factura. Nada más. Con eso ya podemos analizar tu situación y decirte exactamente cuánto puedes ahorrar.",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── 1. HERO — La historia que engancha ─── */}
      <section className="relative overflow-hidden bg-[#fff5f0] px-6 pb-24 pt-28 md:pb-36 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-[#f97316]/20 bg-white/60 px-5 py-2 text-xs font-medium tracking-wide text-[#f97316] backdrop-blur-sm">
            Asesor energético independiente · Molins de Rei
          </span>

          <h1 className="mt-10 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl md:text-6xl">
            A mi abuela la cambiaron de compañía eléctrica{" "}
            <span className="text-[#f97316]">7 veces en un solo año</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#383d4c]">
            Y la pobre nunca se enteraba del lío que le estaban haciendo.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#383d4c]">
            Arreglarle ese desastre me costó un montón de llamadas incómodas.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg font-semibold text-[#1f2942]">
            Por eso abrí este negocio.
          </p>

          <div className="mx-auto mt-10 max-w-md space-y-3 text-left">
            {[
              "Para que no te mareen (y a tu abuela tampoco)",
              "Para que sepas lo que pagas",
              "Para que ahorres de verdad",
              "Para que tengas a dónde ir — oficina física, no una centralita remota",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#f97316]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-base leading-snug text-[#383d4c]">{item}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-[#383d4c]">
            Desde 2015 he conseguido que{" "}
            <span className="font-semibold text-[#1f2942]">+5.000 clientes</span>{" "}
            paguen menos en sus facturas de luz y gas.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-8 py-4 text-base font-medium text-white shadow-lg shadow-orange-200/50 transition hover:bg-orange-600 hover:shadow-orange-300/50"
            >
              Analizar mi factura gratis
            </Link>
            <Link
              href="#casos-reales"
              className="inline-flex items-center gap-1 text-base font-medium text-[#f97316] transition hover:opacity-70"
            >
              Ver casos reales de ahorro →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. PRUEBA SOCIAL — Números reales ─── */}
      <section className="border-b border-gray-100 bg-[#fefefe] px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "+5.000", label: "clientes que ya ahorran" },
              { value: "180€", label: "ahorro medio al año" },
              { value: "10+", label: "años en el sector" },
              { value: "40+", label: "compañías comparadas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-[#f97316] sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-[#8892a4]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex gap-0.5 text-[#f97316]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-[#8892a4]">
              5.0 en Google Reviews · Reseñas verificadas
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. EL PROBLEMA — Frases cortas, ritmo de metralleta ─── */}
      <section className="bg-[#0e0f12] px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#f97316]">
            El problema que nadie te cuenta
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl text-center text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
            El mercado eléctrico está diseñado para que pagues de más
          </h2>

          <div className="mx-auto mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-[#8892a4]">
            <p>
              Tu compañía eléctrica tiene un equipo de 200 personas pensando en
              cómo cobrarte más.
            </p>
            <p className="text-white font-medium">
              Tú tienes 3 minutos al mes para mirar la factura.
            </p>
            <p>Adivina quién gana.</p>
            <p>
              Cambian las condiciones de tu contrato sin avisarte. Te meten
              servicios que no pediste. Te suben el precio cuando caduca la
              promoción y rezan para que no te des cuenta.
            </p>
            <p>
              Y si llamas para reclamar, 45 minutos esperando al teléfono. Te
              pasan de departamento en departamento. Una hora de tu vida para que
              al final no te solucionen nada.
            </p>
            <p className="text-white font-medium">
              No es que no entiendas la factura.
              <br />
              Es que está diseñada para que no la entiendas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 4. LA SOLUCIÓN — Directo, sin rodeos ─── */}
      <section className="bg-[#fefefe] px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#f97316]">
            La solución
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl">
            Un asesor que trabaja para ti, no para las eléctricas
          </h2>

          <div className="mx-auto mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-[#383d4c]">
            <p>
              No trabajo para ninguna compañía eléctrica.
              <br />
              No cobro comisiones de nadie.
              <br />
              Mi único incentivo es que tú pagues menos.
            </p>
            <p>
              Comparo más de 40 comercializadoras. Analizo cada línea de tu
              factura. Y te digo, con números exactos, cuánto puedes ahorrar y
              cómo.
            </p>
            <p>Si aceptas, yo me encargo de todo.</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: "Cambio de compañía",
                desc: "Todo el papeleo. Cero cortes.",
              },
              {
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Ajuste de potencia",
                desc: "Pagas solo lo que necesitas.",
              },
              {
                icon: (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Reclamaciones",
                desc: "Si te han cobrado de más, lo recuperamos.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center transition hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f97316]/10 text-[#f97316]">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#1f2942]">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[#383d4c]">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-8 py-4 text-base font-medium text-white shadow-lg shadow-orange-200/50 transition hover:bg-orange-600"
            >
              Quiero que analicen mi factura
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. CASOS REALES — Antes/Después con cifras ─── */}
      <section
        id="casos-reales"
        className="border-t border-gray-100 bg-[#fefefe] px-6 py-32"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#f97316]">
            Casos reales
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl">
            Esto no lo decimos nosotros.
            <br />
            Lo dicen las facturas.
          </h2>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {casosReales.map((c) => (
              <div
                key={c.tipo}
                className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-[#f97316]">
                  {c.tipo}
                </p>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-red-400 line-through">
                    {c.antes}
                  </span>
                  <svg
                    className="h-5 w-5 text-[#8892a4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span className="text-2xl font-semibold text-green-600">
                    {c.despues}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight text-[#1f2942]">
                  {c.ahorro}
                </p>
                <p className="text-sm text-[#8892a4]">de ahorro al año</p>
                <p className="mt-4 text-sm leading-relaxed text-[#383d4c]">
                  {c.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CÓMO FUNCIONA ─── */}
      <section
        id="como-funciona"
        className="border-t border-gray-100 bg-[#fefefe] px-6 py-32"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#f97316]">
            Proceso
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl">
            En 10 minutos sabrás cuánto puedes ahorrar
          </h2>

          <div className="relative mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-8 left-[12.5%] hidden h-px w-[75%] bg-gradient-to-r from-[#f97316]/10 via-[#f97316]/40 to-[#f97316]/10 lg:block" />

            {pasos.map((p) => (
              <div key={p.num} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f97316] text-lg font-semibold text-white shadow-lg shadow-orange-200/40">
                  {p.num}
                </div>
                <h3 className="mt-6 text-base font-semibold text-[#1f2942]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#383d4c]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. TESTIMONIOS ─── */}
      <section className="bg-[#0e0f12] px-6 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#f97316]">
            Google Reviews
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
            No nos creas a nosotros.
            <br />
            Créeles a ellos.
          </h2>

          <div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-2xl border border-white/[0.06] bg-[#16181d] p-8 transition hover:border-white/[0.12]"
              >
                <div className="flex gap-0.5 text-[#f97316]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-[#8892a4]">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-[#8892a4]">{r.detail}</p>
                  </div>
                  <span className="rounded-full bg-[#f97316]/10 px-3 py-1 text-[10px] font-medium text-[#f97316]">
                    Google Reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. VÍCTOR — Vulnerable, con opinión, corto ─── */}
      <section className="bg-[#fff5f0] px-6 py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#f97316]">
              Tu asesor
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl">
              Soy Víctor Marrón.
              <br />
              <span className="text-[#f97316]">Y tengo una opinión.</span>
            </h2>

            <div className="mt-8 space-y-4 leading-7 text-[#383d4c]">
              <p>
                Las comercializadoras eléctricas se aprovechan de que la gente
                no entiende su factura. Lo llevan haciendo décadas. Y nadie dice
                nada porque todos cobran comisiones de ellas.
              </p>
              <p className="text-[#1f2942] font-semibold">Yo no cobro comisiones de nadie.</p>
              <p>
                Llevo desde 2015 haciendo esto. Empecé porque a mi abuela la
                cambiaron de compañía 7 veces en un año sin que se enterara.
                Aquello me enfadó tanto que decidí entender el mercado eléctrico
                de arriba a abajo.
              </p>
              <p>
                Hoy, más de 5.000 clientes después, sigo con la misma filosofía:
              </p>
            </div>

            <blockquote className="mt-6 border-l-2 border-[#f97316] pl-5">
              <p className="text-xl font-semibold italic leading-snug text-[#1f2942]">
                &ldquo;Si no te ahorro dinero, no cobro nada.&rdquo;
              </p>
            </blockquote>

            <Link
              href="/sobre-mi"
              className="mt-8 inline-flex items-center rounded-full bg-[#1f2942] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#2a3654]"
            >
              Mi historia completa →
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/victor.png"
              alt="Víctor Marrón — asesor energético en Molins de Rei"
              width={500}
              height={600}
              className="min-h-[400px] w-auto rounded-3xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* ─── 9. LEAD MAGNET — Captación de email ─── */}
      <section className="bg-[#fefefe] px-6 py-24">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#f97316]/20 bg-[#fff5f0] px-8 py-14 text-center sm:px-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f97316]/10">
            <svg className="h-7 w-7 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-4xl">
            Los 5 errores que estás cometiendo en tu factura de la luz
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#383d4c]">
            Un documento de 3 páginas. Sin rodeos. Te cuento los errores más
            comunes que veo en las facturas de mis clientes y cómo solucionarlos
            tú mismo.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm text-[#1f2942] placeholder-[#8892a4] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
            />
            <button
              type="submit"
              className="rounded-full bg-[#f97316] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-orange-200/50 transition hover:bg-orange-600"
            >
              Quiero el documento
            </button>
          </form>
          <p className="mt-3 text-xs text-[#8892a4]">
            Gratis. Sin spam. Te lo envío y ya.
          </p>
        </div>
      </section>

      {/* ─── 10. FAQ — SEO + Schema ─── */}
      <section className="bg-[#fefefe] px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#f97316]">
            Preguntas frecuentes
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f2942] sm:text-5xl">
            Todo lo que necesitas saber sobre asesoría energética
          </h2>

          <div className="mt-14 space-y-0 divide-y divide-gray-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-[#1f2942] transition hover:text-[#f97316]">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-[#8892a4] transition group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </summary>
                <p className="mt-3 leading-relaxed text-[#383d4c]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. CTA FINAL — Escasez + acción ─── */}
      <section className="relative overflow-hidden bg-[#f97316] px-6 py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
            Cada mes que pasa con la tarifa equivocada es dinero que pierdes
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Envíanos tu factura. En menos de 24 horas te decimos exactamente
            cuánto puedes ahorrar. Sin compromiso.
          </p>
          <p className="mt-4 text-sm font-medium text-white/90">
            Solo aceptamos 100 clientes nuevos al mes para poder atenderlos
            como se merecen.
          </p>
          <Link
            href="/contacto"
            className="mt-10 inline-flex items-center rounded-full bg-white px-10 py-4 text-base font-medium text-[#f97316] transition hover:bg-gray-50"
          >
            Analizar mi factura gratis
          </Link>
          <p className="mt-8 text-sm text-white/50">
            Molins de Rei · 633 15 10 83 · WhatsApp disponible
          </p>
        </div>
      </section>

      {/* ─── FAQ Schema Markup ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      {/* ─── LocalBusiness Schema Markup ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Vitergy - Asesoría Energética",
            description:
              "Asesoría energética independiente en Molins de Rei. Analizamos tu factura de luz y gas para conseguirte el mejor precio. +5.000 clientes.",
            url: "https://vitergy.es",
            telephone: "+34633151083",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Molins de Rei",
              addressRegion: "Barcelona",
              postalCode: "08750",
              addressCountry: "ES",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "41.4133",
              longitude: "2.0147",
            },
            founder: {
              "@type": "Person",
              name: "Víctor Marrón",
            },
            foundingDate: "2015",
            areaServed: [
              "Molins de Rei",
              "Barcelona",
              "Cataluña",
              "España",
            ],
            priceRange: "Consulta gratuita",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              bestRating: "5",
              ratingCount: "50",
            },
          }),
        }}
      />
    </>
  );
}
