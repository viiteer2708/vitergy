import Link from "next/link";

/* Identidad legal común a /legal, /privacidad y /cookies.
   ⚠️ NIF: pendiente de que Victor lo facilite. Mientras esté vacío, la línea
   no se pinta (mejor omitirla que publicar un dato inventado), pero el aviso
   legal no cumple del todo el art. 10 de la LSSI hasta que se rellene. */
export const TITULAR = {
  razonSocial: "Por encima del techo del cielo, S.L.",
  marca: "Vitergy",
  nif: "",
  domicilio: "Carrer de Ferran Agulló 6, local · 08750 Molins de Rei (Barcelona)",
  email: "info@vitergy.es",
  telefono: "633 15 10 83",
  telefonoLink: "+34633151083",
  dominio: "vitergy.es",
};

export const ACTUALIZADO = "29 de julio de 2026";

export function LegalDoc({
  titulo,
  entradilla,
  children,
}: {
  titulo: string;
  entradilla: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <nav
        aria-label="Migas de pan"
        className="flex flex-wrap items-center gap-2 text-sm text-[#6b7280]"
      >
        <Link href="/" className="transition hover:text-[#f97316]">
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#1f2942]">{titulo}</span>
      </nav>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#1f2942] sm:text-4xl">
        {titulo}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[#6b7280]">{entradilla}</p>
      <p className="mt-4 text-sm text-[#6b7280]">
        Última actualización: {ACTUALIZADO}
      </p>

      <div className="mt-10 space-y-10">{children}</div>

      <div className="mt-14 rounded-2xl border border-orange-100 bg-[#fff7ed] p-6">
        <p className="text-sm leading-6 text-[#6b7280]">
          ¿Alguna duda sobre este documento? Escríbenos a{" "}
          <a
            href={`mailto:${TITULAR.email}`}
            className="font-semibold text-[#1f2942] underline decoration-[#f97316] underline-offset-4"
          >
            {TITULAR.email}
          </a>{" "}
          o llámanos al{" "}
          <a
            href={`tel:${TITULAR.telefonoLink}`}
            className="font-semibold text-[#1f2942] underline decoration-[#f97316] underline-offset-4"
          >
            {TITULAR.telefono}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export function Apartado({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-[#1f2942]">
        {titulo}
      </h2>
      <div className="mt-4 space-y-4 leading-7 text-[#6b7280]">{children}</div>
    </section>
  );
}

export function TablaDatos({
  filas,
}: {
  filas: { label: string; value: React.ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-orange-100 overflow-hidden rounded-2xl border border-orange-100 bg-white">
      {filas.map((f) => (
        <div key={f.label} className="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt className="text-sm font-semibold text-[#1f2942]">{f.label}</dt>
          <dd className="text-sm text-[#6b7280] sm:col-span-2">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
