"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const servicios = [
  { label: "Consultoría Energética", href: "/consultoria-energetica" },
  { label: "Comparador de Tarifas", href: "/comparador-tarifas-luz" },
  { label: "Estudio de Factura", href: "/estudio-factura-electrica" },
  { label: "Cambiar de Compañía", href: "/cambiar-compania-luz" },
  { label: "Optimización de Potencia", href: "/optimizacion-potencia" },
  { label: "Autoconsumo Fotovoltaico", href: "/autoconsumo-fotovoltaico" },
  { label: "Instalación de Baterías", href: "/instalacion-baterias" },
  { label: "Monitorización de Consumo", href: "/monitorizacion-consumo" },
];

const herramientas = [
  { label: "⚡ Precio de la Luz Hoy", href: "/precio-luz-hoy" },
  { label: "📅 Precio de la Luz Mañana", href: "/precio-luz-manana" },
  { label: "🧮 Calculadora de Consumo", href: "/calculadora-consumo-electrico" },
];

function MobileMenu({
  mobileServiciosOpen,
  setMobileServiciosOpen,
  mobileHerramientasOpen,
  setMobileHerramientasOpen,
  closeMobile,
}: {
  mobileServiciosOpen: boolean;
  setMobileServiciosOpen: (v: boolean) => void;
  mobileHerramientasOpen: boolean;
  setMobileHerramientasOpen: (v: boolean) => void;
  closeMobile: () => void;
}) {
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 top-16 z-[60] bg-black/40 md:hidden"
        onClick={closeMobile}
      />

      {/* Panel */}
      <div className="fixed inset-x-0 top-16 bottom-0 z-[70] overflow-y-auto bg-white md:hidden">
        <div className="space-y-1 px-4 py-4">
          {/* Servicios accordion */}
          <button
            onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900"
          >
            Servicios
            <svg
              className={`h-5 w-5 transition-transform ${mobileServiciosOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileServiciosOpen && (
            <div className="pl-4">
              {servicios.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Herramientas accordion */}
          <button
            onClick={() => setMobileHerramientasOpen(!mobileHerramientasOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900"
          >
            Herramientas
            <svg
              className={`h-5 w-5 transition-transform ${mobileHerramientasOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileHerramientasOpen && (
            <div className="pl-4">
              {herramientas.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/blog"
            className="block rounded-lg px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900"
            onClick={closeMobile}
          >
            Blog
          </Link>
          <Link
            href="/sobre-mi"
            className="block rounded-lg px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900"
            onClick={closeMobile}
          >
            Sobre Mí
          </Link>

          <div className="pt-4">
            <Link
              href="/contacto"
              className="block rounded-full bg-[#f97316] px-3 py-3 text-center text-base font-medium text-white hover:bg-orange-600"
              onClick={closeMobile}
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false);
  const [mobileHerramientasOpen, setMobileHerramientasOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    setMobileServiciosOpen(false);
    setMobileHerramientasOpen(false);
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-[#fefefe]/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-vitergy.png"
                alt="Vitergy - Asesoría Energética"
                width={140}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden items-center gap-1 md:flex">
              {/* Servicios dropdown */}
              <div className="group relative">
                <button className="rounded-lg px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-900">
                  Servicios
                  <svg className="ml-1 inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full min-w-[240px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all group-hover:visible">
                  {servicios.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Herramientas dropdown */}
              <div className="group relative">
                <button className="rounded-lg px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-900">
                  Herramientas
                  <svg className="ml-1 inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full min-w-[260px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all group-hover:visible">
                  {herramientas.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/blog"
                className="rounded-lg px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-900"
              >
                Blog
              </Link>
              <Link
                href="/sobre-mi"
                className="rounded-lg px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-900"
              >
                Sobre Mí
              </Link>
              <Link
                href="/contacto"
                className="ml-2 rounded-full bg-[#f97316] px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                Contacto
              </Link>
            </div>

            {/* Hamburger button */}
            <button
              className="relative z-[80] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu portaled to body to escape backdrop-filter stacking context */}
      {mobileOpen && (
        <MobileMenu
          mobileServiciosOpen={mobileServiciosOpen}
          setMobileServiciosOpen={setMobileServiciosOpen}
          mobileHerramientasOpen={mobileHerramientasOpen}
          setMobileHerramientasOpen={setMobileHerramientasOpen}
          closeMobile={closeMobile}
        />
      )}
    </>
  );
}
