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
    <footer className="border-t border-gray-100 bg-gray-50 text-[#6b7280]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Logo + info */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-[#1f2942]">
              vitergy
            </Link>
            <p className="mt-4 text-sm leading-6">
              Asesor energético independiente en Molins de Rei.
            </p>
            <div className="mt-4 space-y-1 text-sm">
              <p>Carrer de Ferran Agulló 6, LOCAL</p>
              <p>08750 Molins de Rei</p>
              <p>
                <a href="tel:+34633151083" className="transition hover:text-[#1f2942]">
                  633 15 10 83
                </a>
              </p>
              <p>
                <a href="mailto:info@vitergy.es" className="transition hover:text-[#1f2942]">
                  info@vitergy.es
                </a>
              </p>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1f2942]">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviciosLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Herramientas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1f2942]">
              Herramientas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {herramientasLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Empresa */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1f2942]">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2.5">
              {empresaLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-[#f97316]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-gray-200 pt-8 text-center text-xs">
          © 2026 Vitergy — Por encima del techo del cielo SL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
