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
    <footer className="bg-[#fafaf9] text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Logo + info */}
          <div>
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#f97316]">
              VITERGY
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              Asesor energético independiente en Molins de Rei.
            </p>
            <div className="mt-3 space-y-1 text-sm text-gray-500">
              <p>Carrer de Ferran Agulló 6, LOCAL</p>
              <p>08750 Molins de Rei</p>
              <p>
                <a href="tel:+34633151083" className="hover:text-[#f97316]">
                  633 15 10 83
                </a>
              </p>
              <p>
                <a href="mailto:info@vitergy.es" className="hover:text-[#f97316]">
                  info@vitergy.es
                </a>
              </p>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2">
              {serviciosLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Herramientas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Herramientas
            </h3>
            <ul className="mt-4 space-y-2">
              {herramientasLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Empresa */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2">
              {empresaLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
          © 2026 Vitergy - Por encima del techo del cielo SL
        </div>
      </div>
    </footer>
  );
}
