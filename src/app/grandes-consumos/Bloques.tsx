import Link from "next/link";

/* Bloques compartidos por la página madre de grandes consumos y por las
   cuatro landings de sector. Todo server components, sin estado. */

const PASOS = [
  {
    num: "01",
    title: "Recogemos doce meses, no una factura",
    text: "Nos das las facturas del último año y el CUPS de cada suministro. Con el CUPS pedimos a la distribuidora tu curva de carga: el consumo real cuarto de hora a cuarto de hora. Sin ese dato, cualquier propuesta de ahorro es una estimación.",
  },
  {
    num: "02",
    title: "Auditamos la estructura del contrato",
    text: "Tarifa de acceso, potencia contratada en los seis periodos, excesos de maxímetro, energía reactiva, alquiler de equipos, impuestos y cláusulas de revisión. Antes de mirar el precio, comprobamos que lo que te facturan es lo que corresponde.",
  },
  {
    num: "03",
    title: "Simulamos escenarios sobre tu curva real",
    text: "Fijo, indexado, cobertura parcial, potencias alternativas, desplazamiento de cargas. Cada escenario se calcula sobre tu consumo real de doce meses, no sobre un perfil medio del sector.",
  },
  {
    num: "04",
    title: "Sacamos tu consumo a mercado",
    text: "Más de cuarenta comercializadoras compitiendo con la misma curva encima de la mesa y en la misma ventana temporal. Cuando todas ofertan sobre el mismo dato, las ofertas se pueden comparar de verdad.",
  },
  {
    num: "05",
    title: "Gestionamos el cambio y lo verificamos",
    text: "Nos encargamos del papeleo con comercializadora y distribuidora. El suministro no se interrumpe en ningún momento y no cambia nada en tu instalación.",
  },
  {
    num: "06",
    title: "Seguimiento mensual",
    text: "Revisamos las primeras facturas concepto a concepto, vigilamos el maxímetro y comprobamos que lo firmado es lo que se está facturando. Si aparece una desviación, la reclamamos nosotros.",
  },
];

export function ProcesoGrandesConsumos() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-[#1f2942] sm:text-3xl">
        Cómo trabajamos un gran consumo
      </h2>
      <p className="mt-3 max-w-2xl text-[#6b7280]">
        El mismo método que aplicamos a una cartera de varios megavatios, aplicado a
        tu caso. Empieza por los datos y termina por el precio, nunca al revés.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PASOS.map((p) => (
          <div
            key={p.num}
            className="rounded-2xl border border-orange-100 bg-white p-6"
          >
            <span className="text-sm font-bold tracking-widest text-[#f97316]">
              {p.num}
            </span>
            <h3 className="mt-2 font-semibold text-[#1f2942]">{p.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b7280]">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const METRICAS = [
  { k: "+12 años", v: "en el sector energético" },
  { k: "+200 GWh", v: "de consumo gestionado" },
  { k: "+40", v: "comercializadoras comparadas" },
  { k: "0 €", v: "coste del estudio" },
];

const CREDENCIALES = [
  {
    title: "Más de 200 GWh gestionados",
    text: "Víctor Marrón lleva más de doce años en el sector energético y ha gestionado por encima de 200 GWh de consumo: el equivalente a lo que gastan en un año más de cincuenta mil hogares. Cuando te sientas a negociar con ese recorrido detrás, ya has visto antes el contrato que te ponen delante.",
  },
  {
    title: "Independientes de verdad",
    text: "No pertenecemos a ninguna comercializadora ni tenemos exclusiva con nadie. Comparamos más de cuarenta compañías y la recomendación es la que más te ahorra a ti, no la que más nos conviene a nosotros.",
  },
  {
    title: "Analizamos la curva, no la portada de la factura",
    text: "Trabajamos con la curva de carga horaria que facilita tu distribuidora. Es la diferencia entre optimizar de verdad un 3.0TD o un 6.1TD y limitarse a comparar el precio del kWh de dos ofertas.",
  },
  {
    title: "Si no te ahorramos, no cobramos",
    text: "El estudio no tiene coste ni te obliga a nada. Si al terminar el análisis la conclusión es que tu contrato está bien, te lo decimos y no hay factura.",
  },
];

export function AutoridadBloque() {
  return (
    <section className="mt-16 rounded-3xl bg-[#1f2942] px-6 py-12 sm:px-10">
      <p className="text-sm font-semibold tracking-wide text-[#f97316]">
        Por qué nosotros
      </p>
      <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Un gran consumo no se optimiza comparando ofertas. Se optimiza entendiendo
        la factura mejor que quien te la emite.
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {CREDENCIALES.map((c) => (
          <div key={c.title}>
            <h3 className="font-semibold text-white">{c.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Tira compacta de credenciales para las cabeceras oscuras. */
export function MetricasTira() {
  return (
    <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
      {METRICAS.map((m) => (
        <div key={m.v}>
          <dt className="text-xl font-bold text-white sm:text-2xl">{m.k}</dt>
          <dd className="mt-1 text-sm leading-5 text-white/60">{m.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Caso real de cliente. Solo se pinta en los sectores que tienen uno. */
export function CasoReal({
  cifra,
  pie,
  titular,
  texto,
}: {
  cifra: string;
  pie: string;
  titular: string;
  texto: string;
}) {
  return (
    <section className="mt-16">
      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-[#fff7ed]">
        <div className="grid gap-8 p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-10">
          <div className="border-l-4 border-[#f97316] pl-6 sm:pl-8">
            <p className="text-4xl font-bold tracking-tight text-[#1f2942] sm:text-5xl">
              {cifra}
            </p>
            <p className="mt-2 text-sm font-medium text-[#6b7280]">{pie}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#f97316]">
              Caso real · verificado factura a factura
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#1f2942] sm:text-2xl">
              {titular}
            </h2>
            <p className="mt-3 leading-7 text-[#6b7280]">{texto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaGrandesConsumos({
  titulo,
  texto,
  mensajeWhatsapp,
}: {
  titulo: string;
  texto: string;
  mensajeWhatsapp: string;
}) {
  return (
    <section className="mt-16 rounded-2xl border border-orange-100 bg-[#fff7ed] p-8 text-center sm:p-10">
      <h2 className="text-2xl font-bold tracking-tight text-[#1f2942]">{titulo}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-[#6b7280]">{texto}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/contacto"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#1f2942] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
        >
          Pedir estudio sin coste
        </Link>
        <a
          href={`https://wa.me/34633151083?text=${encodeURIComponent(mensajeWhatsapp)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[#1f2942]/15 bg-white px-8 py-3.5 text-base font-semibold text-[#1f2942] transition-all hover:border-[#1f2942]/30 sm:w-auto"
        >
          Escribir por WhatsApp
        </a>
      </div>
      <p className="mt-5 text-sm text-[#6b7280]">
        O llámanos al{" "}
        <a
          href="tel:+34633151083"
          className="font-semibold text-[#1f2942] underline decoration-[#f97316] underline-offset-4"
        >
          633 15 10 83
        </a>
        . ¿Prefieres el correo? Envía tus facturas a{" "}
        <a
          href="mailto:info@vitergy.es?subject=Estudio%20energ%C3%A9tico%20para%20mi%20empresa"
          className="font-semibold text-[#1f2942] underline decoration-[#f97316] underline-offset-4"
        >
          info@vitergy.es
        </a>
      </p>
    </section>
  );
}

export function Miga({ actual }: { actual?: string }) {
  return (
    <nav
      aria-label="Migas de pan"
      className="flex flex-wrap items-center gap-2 text-sm text-[#6b7280]"
    >
      <Link href="/" className="transition hover:text-[#f97316]">
        Inicio
      </Link>
      <span aria-hidden="true">/</span>
      {actual ? (
        <>
          <Link
            href="/grandes-consumos"
            className="transition hover:text-[#f97316]"
          >
            Grandes consumos
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#1f2942]">{actual}</span>
        </>
      ) : (
        <span className="text-[#1f2942]">Grandes consumos</span>
      )}
    </nav>
  );
}
