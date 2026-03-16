import Link from "next/link";

const stats = [
  { value: "+5.000", label: "clientes" },
  { value: "180€/año", label: "de ahorro" },
  { value: "10+", label: "años" },
  { value: "40+", label: "compañías" },
];

const socialProof = [
  "Bar Can Pepet",
  "Ferretería Molins",
  "Clínica Dental Rei",
  "Taller Mecànic",
  "Forn de Pa",
  "Perruqueria Style",
];

const problemas = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Precios que suben solos",
    desc: "Las comercializadoras cambian las condiciones de tu contrato sin avisarte. Cada revisión trae una subida camuflada que no detectas hasta que miras la factura.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Facturas imposibles de entender",
    desc: "Peajes, cargos, término de potencia, energía reactiva... Más de 20 conceptos en cada recibo. Diseñadas para que no entiendas lo que pagas.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "45 min esperando al teléfono",
    desc: "Necesitas resolver algo urgente, pero te pasan de departamento en departamento. Una hora de tu vida para que al final no te solucionen nada.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    title: "Te cambian condiciones sin avisar",
    desc: "Descuentos que desaparecen, servicios que aparecen en tu factura que nunca contrataste, y permanencias ocultas que te atrapan cuando quieres irte.",
  },
];

const soluciones = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Análisis gratuito",
    desc: "Estudiamos tu factura línea a línea, detectamos ineficiencias y te decimos exactamente cuánto puedes ahorrar. Sin compromiso.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "40+ compañías comparadas",
    desc: "No trabajamos para ninguna eléctrica. Comparamos más de 40 comercializadoras y te recomendamos la que más te conviene a ti.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Sin papeleo para ti",
    desc: "Nos encargamos de todo el proceso: cambio de compañía, ajuste de potencia, reclamaciones. Tú no tienes que hacer nada.",
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

export default function Home() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section className="bg-[#fff5f0] px-4 pb-20 pt-16 sm:px-6 md:pb-32 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <span className="inline-block rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-1.5 text-sm font-medium text-[#f97316]">
            ⚡ Asesor energético independiente · Molins de Rei
          </span>

          {/* H1 */}
          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-[#1a1a1a] sm:text-6xl md:text-7xl">
            Deja de pagar
            <br />
            de{" "}
            <span className="text-[#f97316]">más</span> por
            <br />
            la luz y el gas
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
            Analizamos tu factura gratis y te conseguimos el mejor precio entre
            +40 compañías. Sin permanencia. Sin sorpresas.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl bg-[#f97316] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            >
              Analizar mi factura gratis
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-1 px-2 text-lg font-semibold text-[#f97316] hover:underline"
            >
              ¿Cómo funciona? →
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap items-center gap-6 sm:gap-0 sm:divide-x sm:divide-gray-300">
            {stats.map((s) => (
              <div key={s.label} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
                <p className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                  {s.value}
                </p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. SOCIAL PROOF ─── */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-400">
            Vecinos y negocios de Molins de Rei que ya ahorran
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {socialProof.map((name) => (
              <span
                key={name}
                className="text-base font-semibold text-gray-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. EL PROBLEMA ─── */}
      <section className="bg-[#1a1a1a] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316]">
            El problema
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
            Las eléctricas ganan más
            <br className="hidden sm:block" />
            cuanto menos entiendes
            <br className="hidden sm:block" />
            tu factura
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {problemas.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl bg-[#2a2a2a] p-7 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f97316]/15 text-[#f97316]">
                  {p.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. LA SOLUCIÓN ─── */}
      <section className="bg-[#fff5f0] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#f97316]">
            La solución
          </p>
          <h2 className="mt-4 text-center text-4xl font-black leading-tight text-[#1a1a1a] sm:text-5xl">
            Un asesor de tu lado,
            <br className="hidden sm:block" />
            no del lado de las eléctricas
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {soluciones.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-gray-100 bg-[#fff5f0] p-8 shadow-md shadow-orange-100 sm:p-10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f97316]/15 text-[#f97316]">
                  {s.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1a1a1a]">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-gray-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CÓMO FUNCIONA ─── */}
      <section
        id="como-funciona"
        className="bg-white px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-black text-[#1a1a1a] sm:text-5xl">
            En menos de 10 minutos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Así de fácil es empezar a ahorrar con Vitergy
          </p>

          <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line (desktop only) */}
            <div className="absolute top-10 left-[12.5%] hidden h-0.5 w-[75%] bg-gradient-to-r from-[#f97316]/20 via-[#f97316] to-[#f97316]/20 lg:block" />

            {pasos.map((p) => (
              <div key={p.num} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f97316] text-2xl font-black text-white shadow-lg shadow-orange-200">
                  {p.num}
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1a1a1a]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. VÍCTOR ─── */}
      <section className="bg-[#1a1a1a] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316]">
              Tu asesor
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              Hola, soy
              <br />
              Víctor Marrón
            </h2>
            <p className="mt-6 leading-7 text-gray-400">
              Soy de Molins de Rei desde que tengo 8 años. Empecé en esto en
              2015 cuando vi cómo a mi abuela la cambiaban de compañía eléctrica
              7 veces en un año sin que ella se enterara. Aquel día decidí que
              iba a entender cómo funcionaba el mercado eléctrico — y que iba a
              ayudar a que nadie más pasara por lo mismo.
            </p>
            <p className="mt-4 leading-7 text-gray-400">
              Desde entonces he ayudado a más de 5.000 clientes a pagar menos.
              No estoy vinculado a ninguna comercializadora, no cobro comisiones
              de ninguna empresa eléctrica. Mi único interés es que tú pagues lo
              justo.
            </p>

            {/* Quote */}
            <blockquote className="mt-8 border-l-4 border-[#f97316] pl-5">
              <p className="text-xl font-semibold italic text-white">
                &ldquo;Si no te ahorro dinero, no cobro nada.&rdquo;
              </p>
            </blockquote>

            <Link
              href="/sobre-mi"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#f97316] transition hover:bg-gray-100"
            >
              Conoce mi historia →
            </Link>
          </div>

          {/* Avatar placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex h-72 w-72 items-center justify-center rounded-3xl bg-[#f97316] shadow-2xl shadow-orange-500/20 sm:h-80 sm:w-80">
              <span className="text-8xl font-black text-white">VM</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. TESTIMONIOS ─── */}
      <section className="bg-[#fff5f0] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-black text-[#1a1a1a] sm:text-5xl">
            Lo que dicen nuestros clientes
          </h2>

          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-3xl bg-white p-7 shadow-sm shadow-orange-100 sm:p-8"
              >
                {/* Stars */}
                <div className="flex gap-0.5 text-[#f97316]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-5">
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.detail}</p>
                  <span className="mt-2 inline-block rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-semibold text-[#f97316]">
                    ⭐ Google Reviews
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CTA FINAL ─── */}
      <section className="bg-[#f97316] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            ¿Listo para pagar lo justo?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Envíanos tu factura y te decimos en 24 horas exactamente cuánto
            puedes ahorrar. Sin compromiso, sin permanencia, sin letra pequeña.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-block rounded-xl bg-white px-10 py-4 text-lg font-bold text-[#f97316] shadow-lg transition hover:bg-gray-100"
          >
            Analizar mi factura gratis
          </Link>
          <p className="mt-6 text-sm text-white/60">
            Oficina en Molins de Rei · 633 15 10 83 · WhatsApp disponible
          </p>
        </div>
      </section>
    </>
  );
}
