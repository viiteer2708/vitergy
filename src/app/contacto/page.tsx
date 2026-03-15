import type { Metadata } from "next";
import ContactoForm from "./ContactoForm";

export const metadata: Metadata = {
  title: "Contacto | Asesoría Energética Gratuita en Molins de Rei - Vitergy",
  description:
    "Contacta con Vitergy para tu asesoría energética gratuita. Oficina en Molins de Rei, teléfono, WhatsApp y formulario. Respuesta en menos de 2 horas.",
  alternates: {
    canonical: "https://vitergy.es/contacto",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vitergy",
  description:
    "Asesoría energética independiente en Molins de Rei. Análisis de facturas, cambio de compañía, autoconsumo solar.",
  url: "https://vitergy.es",
  telephone: "+34633151083",
  email: "info@vitergy.es",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer de Ferran Agulló 6, LOCAL",
    addressLocality: "Molins de Rei",
    postalCode: "08750",
    addressRegion: "Barcelona",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.4139,
    longitude: 2.0158,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "Consulta gratuita",
};

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contacta con Vitergy —{" "}
          <span className="text-[#f97316]">Asesoría Energética Gratuita</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Cuéntanos tu caso y te respondemos en menos de 2 horas en horario
          laboral. La primera consulta es siempre gratuita.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {/* ── Left: Contact info ── */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Información de contacto
              </h2>

              <div className="mt-5 space-y-5">
                {/* Address */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff5f0] text-[#f97316]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Oficina
                    </p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Carrer de Ferran Agulló 6, LOCAL
                      <br />
                      08750 Molins de Rei, Barcelona
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff5f0] text-[#f97316]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Teléfono
                    </p>
                    <a
                      href="tel:+34633151083"
                      className="mt-0.5 block text-sm text-[#f97316] hover:underline"
                    >
                      633 15 10 83
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff5f0] text-[#f97316]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <a
                      href="mailto:info@vitergy.es"
                      className="mt-0.5 block text-sm text-[#f97316] hover:underline"
                    >
                      info@vitergy.es
                    </a>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff5f0] text-[#f97316]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Horario
                    </p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Lunes a Viernes, 9:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/34633151083"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-[#1fb855]"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>

            {/* Google Maps */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <iframe
                title="Ubicación de Vitergy en Molins de Rei"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.5!2d2.0136!3d41.4139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49d2c1c1a5b87%3A0x0!2sCarrer+de+Ferran+Agull%C3%B3+6%2C+08750+Molins+de+Rei!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-gray-900">
                Envíanos un mensaje
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Rellena el formulario y te responderemos en menos de 2 horas.
              </p>
              <div className="mt-6">
                <ContactoForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
