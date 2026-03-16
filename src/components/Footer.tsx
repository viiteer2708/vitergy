import Link from "next/link";

const serviciosLinks = [
  { label: "Consultoría Energética", href: "/consultoria-energetica" },
  { label: "Comparador de Tarifas", href: "/comparador-tarifas-luz" },
  { label: "Estudio de Factura", href: "/estudio-factura-electrica" },
  { label: "Cambiar de Compañía", href: "/cambiar-compania-luz" },
  { label: "Optimización de Potencia", href: "/optimizacion-potencia" },
  { label: "Autoconsumo Fotovoltaico", href: "/autoconsumo-fotovoltaico" },
  { label: "Instalación de Baterías", href: "/instalacion-baterias" },
  { label: "Monitorización de Consumo", href: "/monitorizacion-consumo" },
];

const herramientasLinks = [
  { label: "Precio Luz Hoy", href: "/precio-luz-hoy" },
  { label: "Precio Luz Mañana", href: "/precio-luz-manana" },
  { label: "Calculadora de Consumo", href: "/calculadora-consumo-electrico" },
  { label: "Blog", href: "/blog" },
];

const empresaLinks = [
  { label: "Sobre Mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
  { label: "Aviso Legal", href: "/legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0f12] text-[#8892a4]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Logo + info */}
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight text-white">
              VITERGY
            </Link>
            <p className="mt-4 text-sm leading-6">
              Asesor energético independiente en Molins de Rei.
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <p>Carrer de Ferran Agulló 6, LOCAL</p>
              <p>08750 Molins de Rei</p>
              <p>
                <a href="tel:+34633151083" className="transition hover:text-white">
                  633 15 10 83
                </a>
              </p>
              <p>
                <a href="mailto:info@vitergy.es" className="transition hover:text-white">
                  info@vitergy.es
                </a>
              </p>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviciosLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Herramientas */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">
              Herramientas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {herramientasLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Empresa */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-white">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2.5">
              {empresaLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/[0.06] pt-8 text-center text-xs text-[#8892a4]">
          © 2026 Vitergy — Por encima del techo del cielo SL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
