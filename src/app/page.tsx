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
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Analizamos todo",
    desc: "En menos de 24h revisamos cada concepto de tu factura.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Te proponemos un plan",
    desc: "Con cifras reales de ahorro y sin letra pequeña.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Gestionamos el cambio",
    desc: "Si aceptas, nos encargamos de todo. Sin cortes ni papeleo.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
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
      "Comparamos más de 40 compañías y te recomendamos la que más te conviene a ti. Todo lo que cobramos de comisiones lo reinvertimos en dar un mejor servicio a nuestros clientes.",
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
      {/* ─── 1. HERO ─── */}
      <section className="bg-[#fefefe] px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Accent text */}
          <p className="mb-6 text-sm font-semibold tracking-wide text-[#f97316]">
            Más ahorro · Más eficiencia · Mayor control
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#1f2942] sm:text-5xl lg:text-7xl">
            A mi abuela la cambiaron de compañía eléctrica{" "}
            <span className="text-[#f97316]">7 veces en un solo año</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]">
            Y la pobre nunca se enteraba... Por eso abrí este negocio.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-2xl bg-[#1f2942] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Analizar mi factura gratis
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f97316] transition hover:underline"
            >
              ¿Cómo funciona?
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-gradient-to-t from-[#fefefe] via-transparent to-transparent" />
          <div className="relative overflow-hidden rounded-[24px] border border-gray-100 bg-white p-2 shadow-[0_20px_40px_-4px_rgba(31,41,66,0.08)] sm:p-4">
            {/* Browser bar */}
            <div className="mb-4 flex items-center gap-2 border-b border-gray-100 px-2 py-2">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="mx-4 h-6 flex-1 rounded-md bg-gray-50" />
            </div>
            {/* Mock content */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:gap-6">
              {/* Left: current bill */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6b7280]">Tu factura actual</h4>
                <div className="mb-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-[#1f2942]">€342</span>
                  <span className="mb-1 text-sm text-[#6b7280]">/mes</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-red-400" style={{ width: "85%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-[#6b7280]">
                    <span>Término Potencia</span>
                    <span className="font-medium text-[#1f2942]">Ineficiente</span>
                  </div>
                </div>
              </div>
              {/* Right: optimization */}
              <div className="col-span-1 space-y-4 md:col-span-2">
                <div className="relative flex h-40 flex-col justify-between overflow-hidden rounded-xl border border-orange-100 bg-orange-50 p-5">
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-[#f97316]">Proyección Optimizada</h4>
                      <span className="text-2xl font-bold text-[#1f2942]">€198<span className="text-sm font-normal text-[#6b7280]">/mes</span></span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600 shadow-sm">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      -42%
                    </div>
                  </div>
                  <svg className="absolute bottom-0 left-0 h-24 w-full text-[#f97316] opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,100 L0,50 Q25,80 50,40 T100,20 L100,100 Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">Potencia Ajustada</p>
                      <p className="text-sm font-semibold text-[#1f2942]">-3kW</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280]">Mejor Tarifa</p>
                      <p className="text-sm font-semibold text-[#1f2942]">Indexada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="border-y border-gray-100 bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 divide-y divide-gray-100 text-center md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              { value: "5.000+", label: "Clientes asesorados" },
              { value: "40+", label: "Comercializadoras" },
              { value: "180€", label: "Ahorro medio anual", highlight: true },
              { value: "10+", label: "Años de experiencia" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-6 md:py-0">
                <span className={`mb-2 text-4xl font-bold ${s.highlight ? "text-[#f97316]" : "text-[#1f2942]"}`}>
                  {s.value}
                </span>
                <span className="text-sm font-medium text-[#6b7280]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. MASSIVE DARK SECTION ─── */}
      <section className="bg-[#1f2942] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">
              Más eficiencia, menos preocupaciones
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Más allá de asesores tradicionales
            </h2>
          </div>

          {/* CSS-only Tabs */}
          <div className="relative">
            <input type="radio" name="tabs" id="tab-analiza" className="tab-radio" defaultChecked />
            <input type="radio" name="tabs" id="tab-compara" className="tab-radio" />
            <input type="radio" name="tabs" id="tab-optimiza" className="tab-radio" />
            <input type="radio" name="tabs" id="tab-gestiona" className="tab-radio" />

            {/* Tab labels */}
            <div className="tab-labels mb-8 flex flex-wrap justify-center gap-3">
              <label htmlFor="tab-analiza" className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                Analiza
              </label>
              <label htmlFor="tab-compara" className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                Compara
              </label>
              <label htmlFor="tab-optimiza" className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                Optimiza
              </label>
              <label htmlFor="tab-gestiona" className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white">
                Gestiona
              </label>
            </div>

            {/* Divider */}
            <div className="mb-10 h-px w-full bg-white/10" />

            {/* Tab content */}
            <div className="tab-content">

              {/* Tab: Analiza */}
              <div className="tab-pane tab-pane-analiza grid items-center gap-10 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#f97316]">Análisis de factura | Vitergy</p>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Cada concepto de tu factura, bajo la lupa</h3>
                  <p className="mb-6 leading-relaxed text-white/70">
                    No nos limitamos a mirar el total. Revisamos término de potencia, energía consumida, peajes, impuestos y penalizaciones para detectar cada euro que puedes ahorrarte.
                  </p>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Analizamos cada línea de tu factura en menos de 24h</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Detectamos penalizaciones ocultas y sobrecostes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Te explicamos en lenguaje claro qué está pasando</span>
                    </li>
                  </ul>
                  <Link href="/contacto" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1f2942] transition hover:-translate-y-0.5 hover:shadow-lg">
                    Solicita información
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 min-h-[320px]">
                  <div className="w-full space-y-4">
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Término potencia</p>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">4.6 kW</span>
                        <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">Sobredimensionada</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Penalizaciones</p>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#f97316]">€47.20</span>
                        <span className="rounded-full bg-[#f97316]/20 px-2 py-0.5 text-xs font-semibold text-[#f97316]">Evitable</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Ahorro estimado</p>
                      <div className="mt-2 flex items-end justify-between">
                        <span className="text-2xl font-bold text-green-400">-42%</span>
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400">Optimizable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab: Compara */}
              <div className="tab-pane tab-pane-compara grid items-center gap-10 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#f97316]">Comparador de mercado | Vitergy</p>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">+40 comercializadoras, la mejor para ti</h3>
                  <p className="mb-6 leading-relaxed text-white/70">
                    Accedemos a las ofertas de más de 40 compañías del mercado español. No trabajamos para ninguna de ellas: te recomendamos la que realmente te conviene.
                  </p>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Comparamos tarifas fijas, indexadas y planas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Sin permanencias ni letra pequeña</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Te mostramos cifras reales, no estimaciones</span>
                    </li>
                  </ul>
                  <Link href="/contacto" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1f2942] transition hover:-translate-y-0.5 hover:shadow-lg">
                    Solicita información
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 min-h-[320px]">
                  <div className="w-full space-y-3">
                    {[
                      { name: "Comercializadora A", price: "€89/mes", tag: "Fija", best: false },
                      { name: "Comercializadora B", price: "€72/mes", tag: "Indexada", best: true },
                      { name: "Comercializadora C", price: "€95/mes", tag: "Plana", best: false },
                    ].map((c) => (
                      <div key={c.name} className={`rounded-xl p-4 ${c.best ? "border border-[#f97316]/40 bg-[#f97316]/10" : "bg-white/10"}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">{c.name}</p>
                            <p className="text-xs text-white/50">{c.tag}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">{c.price}</p>
                            {c.best && <p className="text-xs font-semibold text-[#f97316]">Recomendada</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab: Optimiza */}
              <div className="tab-pane tab-pane-optimiza grid items-center gap-10 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#f97316]">Optimización integral | Vitergy</p>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Ajustamos potencia, tarifa y consumo</h3>
                  <p className="mb-6 leading-relaxed text-white/70">
                    No basta con cambiar de compañía. Revisamos tu potencia contratada, los tramos horarios y tus hábitos de consumo para exprimir cada euro.
                  </p>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Ajuste de potencia al consumo real</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Eliminación de penalizaciones por reactiva</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Recomendaciones de ahorro personalizadas</span>
                    </li>
                  </ul>
                  <Link href="/contacto" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1f2942] transition hover:-translate-y-0.5 hover:shadow-lg">
                    Solicita información
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 min-h-[320px]">
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                      <span className="text-sm text-white/70">Potencia actual</span>
                      <span className="text-lg font-bold text-white">5.75 kW</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="h-6 w-6 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                      <span className="text-sm text-green-300">Potencia óptima</span>
                      <span className="text-lg font-bold text-green-400">3.45 kW</span>
                    </div>
                    <div className="rounded-xl bg-[#f97316]/10 p-4 text-center">
                      <p className="text-xs text-[#f97316]/70">Ahorro estimado</p>
                      <p className="text-2xl font-bold text-[#f97316]">€216/año</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab: Gestiona */}
              <div className="tab-pane tab-pane-gestiona grid items-center gap-10 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#f97316]">Gestión completa | Vitergy</p>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Nos encargamos de todo el papeleo</h3>
                  <p className="mb-6 leading-relaxed text-white/70">
                    Una vez aprobado el plan, gestionamos el cambio de principio a fin. Sin cortes de luz, sin llamadas, sin sorpresas. Tú solo notas la diferencia en la factura.
                  </p>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Gestionamos el cambio de comercializadora</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Tramitamos reclamaciones si te han cobrado de más</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]/20 text-[#f97316]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/80">Seguimiento continuo para que sigas ahorrando</span>
                    </li>
                  </ul>
                  <Link href="/contacto" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1f2942] transition hover:-translate-y-0.5 hover:shadow-lg">
                    Solicita información
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 min-h-[320px]">
                  <div className="w-full space-y-3">
                    {[
                      { step: "Solicitud enviada", done: true },
                      { step: "Documentación tramitada", done: true },
                      { step: "Cambio en proceso", done: true },
                      { step: "Nueva tarifa activa", done: false, current: true },
                    ].map((s) => (
                      <div key={s.step} className={`flex items-center gap-3 rounded-xl p-4 ${s.current ? "border border-[#f97316]/40 bg-[#f97316]/10" : "bg-white/10"}`}>
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${s.done ? "bg-green-500/20 text-green-400" : "bg-[#f97316]/20 text-[#f97316]"}`}>
                          {s.done ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-[#f97316] animate-pulse" />
                          )}
                        </div>
                        <span className={`text-sm ${s.current ? "font-semibold text-[#f97316]" : "text-white/70"}`}>{s.step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded testimonial */}
          <div className="mt-16 border-t border-white/10 pt-12 text-center">
            <p className="mx-auto max-w-2xl text-lg italic leading-relaxed text-white/70">
              &ldquo;Todo lo que cobro de comisiones lo reinvierto en mis clientes. Mi único incentivo es que tú pagues menos.&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-white">Víctor Marrón</p>
            <p className="text-xs text-white/50">Fundador de Vitergy</p>
          </div>

          {/* Trabajamos para ti */}
          <div className="mt-24 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f97316]/20">
              <svg className="h-7 w-7 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Trabajamos para ti, no para las eléctricas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Todo lo que cobramos de comisiones lo reinvertimos en dar un mejor servicio a nuestros clientes. Nuestro
              único objetivo es reducir tus costes. Analizamos el mercado de forma transparente y te
              presentamos las mejores opciones.
            </p>
            <Link href="/sobre-mi" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f97316] transition hover:underline">
              Nuestro valor
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Impulsado por personas — 2 cards */}
          <div className="mt-24">
            <p className="mb-8 text-center text-sm font-semibold tracking-wide text-[#f97316]">
              Impulsado por personas
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Card 1: Víctor */}
              <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:gap-8 md:p-8">
                <Image
                  src="/victor.png"
                  alt="Víctor Marrón — asesor energético en Molins de Rei"
                  width={120}
                  height={120}
                  className="h-24 w-24 shrink-0 rounded-full object-cover object-top md:h-28 md:w-28"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Tu asesor dedicado</h3>
                  <p className="mt-1 text-sm font-semibold text-[#f97316]">Víctor Marrón</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Lleva desde 2015 ayudando a familias, negocios y comunidades a pagar menos en su factura de la luz. Más de 5.000 clientes confían en él.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[#f97316]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-white/40">5.0 en Google</span>
                  </div>
                </div>
              </div>
              {/* Card 2: Datos */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="flex h-64 items-center justify-center bg-white/5 p-8">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="flex justify-between rounded-lg bg-white/10 p-3">
                      <span className="text-sm text-white/60">Clientes activos</span>
                      <span className="font-bold text-white">5.000+</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-white/10 p-3">
                      <span className="text-sm text-white/60">Ahorro medio</span>
                      <span className="font-bold text-[#f97316]">180€/año</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-white/10 p-3">
                      <span className="text-sm text-white/60">Satisfacción</span>
                      <span className="font-bold text-green-400">5.0/5.0</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">Análisis con datos reales</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Cada recomendación se basa en datos reales de tu factura y del mercado. Sin estimaciones genéricas, sin humo.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. CÓMO FUNCIONA ─── */}
      <section id="como-funciona" className="bg-[#fefefe] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">
              Proceso
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
              En 10 minutos sabrás cuánto puedes ahorrar
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p) => (
              <div key={p.num} className="relative rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f97316]/10 text-[#f97316]">
                  {p.icon}
                </div>
                <span className="mb-2 block text-xs font-bold text-[#f97316]">PASO {p.num}</span>
                <h3 className="mb-2 text-base font-bold text-[#1f2942]">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#6b7280]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CASOS REALES ─── */}
      <section id="casos-reales" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">
              Casos reales
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
              Esto no lo decimos nosotros.
              <br />
              Lo dicen las facturas.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {casosReales.map((c) => (
              <div
                key={c.tipo}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#f97316]">
                  {c.tipo}
                </span>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-red-400 line-through">
                    {c.antes}
                  </span>
                  <svg className="h-5 w-5 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-2xl font-semibold text-green-600">
                    {c.despues}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight text-[#1f2942]">
                  {c.ahorro}
                </p>
                <p className="text-sm text-[#6b7280]">de ahorro al año</p>
                <p className="mt-4 text-sm leading-relaxed text-[#6b7280]">
                  {c.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TESTIMONIOS ─── */}
      <section className="bg-[#f9fafb] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">
              Google Reviews
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
              Clientes que ya ahorran con Vitergy
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5 text-[#f97316]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#6b7280]">5.0 en Google Reviews</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex gap-0.5 text-[#f97316]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-[#6b7280]">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#1f2942]">{r.name}</p>
                    <p className="text-xs text-[#6b7280]">{r.detail}</p>
                  </div>
                  <span className="rounded-full bg-[#f97316]/10 px-3 py-1 text-[10px] font-medium text-[#f97316]">
                    Google
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ─── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">
              Preguntas frecuentes
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
              Todo lo que necesitas saber
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-gray-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-[#1f2942] transition hover:text-[#f97316]">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-[#6b7280] transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 leading-relaxed text-[#6b7280]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CTA FINAL ─── */}
      <section className="bg-[#fff7ed] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
            Deja de pagar de más hoy mismo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6b7280]">
            Envíanos tu factura. En menos de 24 horas te decimos exactamente
            cuánto puedes ahorrar. Sin compromiso.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1f2942] px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Analizar mi factura gratis
            </Link>
          </div>
          <p className="mt-8 text-sm text-[#6b7280]">
            Molins de Rei · 633 15 10 83 · WhatsApp disponible
          </p>
        </div>
      </section>

      {/* ─── Schema Markup ─── */}
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
