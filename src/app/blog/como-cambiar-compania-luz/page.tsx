import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Cómo Cambiar de Compañía de Luz en 2026 | Guía Paso a Paso - Vitergy",
  description:
    "Guía completa para cambiar de compañía eléctrica sin cortes ni problemas. Pasos, plazos, documentos necesarios y qué hacer si tienes permanencia.",
  alternates: {
    canonical: "https://vitergy.es/blog/como-cambiar-compania-luz",
  },
};

const faqs = [
  {
    question: "¿Me quedaré sin luz si cambio de compañía?",
    answer:
      "No. El cambio de comercializadora es un trámite administrativo que no afecta al suministro eléctrico. Tu instalación, tu contador y tu conexión a la red siguen siendo exactamente los mismos. La distribuidora no cambia, solo la empresa que te factura.",
  },
  {
    question: "¿Cuánto cuesta cambiar de compañía eléctrica?",
    answer:
      "Cambiar de compañía es completamente gratuito. No hay coste por parte de la nueva comercializadora ni de la distribuidora. El único coste posible es si tienes una penalización por permanencia con tu compañía actual, pero esto solo aplica en contratos con cláusula de permanencia.",
  },
  {
    question: "¿Puedo volver a mi compañía anterior si no me gusta la nueva?",
    answer:
      "Sí, puedes cambiar de compañía tantas veces como quieras. No hay límite de cambios. Si no estás satisfecho con la nueva comercializadora, puedes volver a la anterior o elegir una tercera. El proceso es siempre el mismo y tarda 15-21 días.",
  },
  {
    question: "¿Necesito un contador nuevo o cambiar la instalación?",
    answer:
      "No. El cambio de comercializadora no implica ningún cambio en tu instalación eléctrica ni en tu contador. Todo permanece igual. Solo cambia la empresa que te emite la factura.",
  },
  {
    question: "¿Qué documentos necesito para cambiar de compañía?",
    answer:
      "Necesitas tu DNI/NIE del titular del contrato, el CUPS (código que identifica tu punto de suministro, aparece en tu factura), y tu última factura. Con estos tres datos, la nueva compañía o tu asesor energético pueden gestionar todo el proceso.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cómo Cambiar de Compañía de Luz: Guía Paso a Paso 2026",
    description:
      "Guía completa para cambiar de compañía eléctrica sin cortes ni problemas.",
    author: {
      "@type": "Person",
      name: "Víctor Marrón",
      url: "https://vitergy.es/sobre-mi",
    },
    publisher: {
      "@type": "Organization",
      name: "Vitergy",
      url: "https://vitergy.es",
    },
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    mainEntityOfPage: "https://vitergy.es/blog/como-cambiar-compania-luz",
  },
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo cambiar de compañía de luz en España",
    description:
      "Guía paso a paso para cambiar de comercializadora eléctrica sin cortes de suministro.",
    step: [
      {
        "@type": "HowToStep",
        name: "Comprueba si tienes permanencia",
        text: "Revisa tu contrato actual para verificar si tienes cláusula de permanencia y cuándo vence.",
      },
      {
        "@type": "HowToStep",
        name: "Compara tarifas y elige la mejor",
        text: "Compara las tarifas de diferentes comercializadoras o consulta con un asesor energético independiente.",
      },
      {
        "@type": "HowToStep",
        name: "Contacta con la nueva compañía o un asesor",
        text: "Facilita tu DNI, CUPS y última factura a la nueva comercializadora o a tu asesor energético.",
      },
      {
        "@type": "HowToStep",
        name: "La nueva comercializadora gestiona el cambio",
        text: "La nueva compañía se encarga de todo el trámite con la distribuidora. El proceso tarda 15-21 días.",
      },
      {
        "@type": "HowToStep",
        name: "Revisa la primera factura",
        text: "Verifica que la primera factura con tu nueva compañía refleja las condiciones pactadas.",
      },
    ],
  },
];

export default function ComoCambiarCompaniaLuzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header>
          <time className="text-sm font-medium text-gray-400">
            8 de marzo de 2026
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cómo Cambiar de Compañía de Luz:{" "}
            <span className="text-[#f97316]">Guía Paso a Paso 2026</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            Cambiar de compañía de luz en España es un derecho de todos los
            consumidores, es completamente gratuito y en ningún momento te
            quedarás sin suministro eléctrico. Sin embargo, el desconocimiento y
            el miedo a los trámites hacen que millones de españoles sigan
            pagando más de lo necesario por no atreverse a dar el paso.
          </p>
          <p>
            En esta guía te explicamos, paso a paso, cómo cambiar de
            comercializadora eléctrica en 2026: qué necesitas, cuánto tarda,
            qué pasa con tu contrato actual y cómo asegurarte de que la nueva
            tarifa es realmente mejor. Todo sin tecnicismos y con la
            experiencia de más de 5.000 cambios gestionados en Vitergy.
          </p>

          {/* Paso 1 */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                1
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Comprueba si tienes permanencia
              </h2>
            </div>
            <p className="mt-4">
              Antes de cambiar, lo primero es verificar si tu contrato actual
              incluye una <strong>cláusula de permanencia</strong>. Desde 2014,
              los contratos domésticos del mercado libre no pueden tener
              permanencia salvo que incluyan un descuento o promoción vinculada.
            </p>
            <p className="mt-3">
              ¿Dónde comprobarlo? Revisa tu contrato original o llama a tu
              compañía actual para preguntar. Si tienes permanencia, calcula si
              el ahorro de la nueva tarifa compensa el coste de la penalización.
              En muchos casos sí compensa, porque la penalización suele ser de
              30 € a 100 € y el ahorro anual puede superar los 180 €.
            </p>
            <p className="mt-3">
              Si estás en el <strong>PVPC</strong> (tarifa regulada), no tienes
              permanencia y puedes cambiar cuando quieras sin ningún coste.
            </p>
          </section>

          {/* Paso 2 */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                2
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Compara tarifas y elige la mejor
              </h2>
            </div>
            <p className="mt-4">
              Con más de 400 comercializadoras en España, comparar todas las
              ofertas manualmente es imposible. Tienes dos opciones: usar un
              comparador online o consultar con un{" "}
              <strong>asesor energético independiente</strong> como Vitergy, que
              analiza tu factura real y te recomienda la mejor opción.
            </p>
            <p className="mt-3">
              Al comparar, no te fijes solo en el precio del kWh. Mira también
              el término de potencia, si hay permanencia, qué servicios
              adicionales incluyen y si el descuento es temporal o permanente.
              Una tarifa que parece barata puede salir cara si tiene costes
              ocultos.
            </p>
          </section>

          {/* Paso 3 */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                3
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Contacta con la nueva compañía o un asesor
              </h2>
            </div>
            <p className="mt-4">
              Una vez decidida la nueva tarifa, necesitas facilitar tres datos
              para iniciar el cambio:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>DNI/NIE</strong> del titular del contrato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>CUPS</strong> (Código Universal de Punto de Suministro) — aparece en tu factura, empieza por ES</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Última factura</strong> o número de contrato</span>
              </li>
            </ul>
            <p className="mt-3">
              No necesitas avisar a tu compañía actual ni darte de baja. La
              nueva comercializadora se encarga de todo el trámite. Si trabajas
              con un asesor energético como Vitergy, ni siquiera necesitas
              contactar con la nueva compañía: lo gestionamos todo por ti.
            </p>
          </section>

          {/* Paso 4 */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                4
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                La nueva comercializadora gestiona el cambio
              </h2>
            </div>
            <p className="mt-4">
              Una vez que la nueva compañía tiene tus datos, tramita el cambio
              con la distribuidora (la empresa dueña de los cables y el
              contador, que no cambia). El proceso tarda entre{" "}
              <strong>15 y 21 días naturales</strong>.
            </p>
            <p className="mt-3">
              Durante ese periodo sigues con tu compañía actual y no sufres
              ningún corte de suministro. La distribuidora simplemente redirige
              la facturación a la nueva comercializadora en el siguiente ciclo
              de lectura.
            </p>
            <p className="mt-3">
              Recibirás una última factura de cierre de tu compañía antigua
              (proporcional a los días consumidos) y a partir de ahí empezarás
              a recibir facturas de la nueva.
            </p>
          </section>

          {/* Paso 5 */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                5
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Revisa la primera factura
              </h2>
            </div>
            <p className="mt-4">
              Este paso es crucial y mucha gente lo pasa por alto. Cuando
              recibas la primera factura de tu nueva compañía, comprueba que:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>El precio del kWh coincide con lo contratado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>La potencia contratada es la correcta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>No hay servicios adicionales que no hayas contratado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>El periodo facturado es correcto</span>
              </li>
            </ul>
            <p className="mt-3">
              En Vitergy, revisamos la primera factura de todos nuestros
              clientes para asegurarnos de que las condiciones pactadas se
              cumplen al céntimo. Si detectamos alguna discrepancia, la
              reclamamos directamente a la comercializadora.
            </p>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-orange-100 bg-white p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
              ¿Quieres cambiar de compañía sin complicaciones?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy gestionamos todo el proceso por ti: analizamos tu
              factura, encontramos la mejor tarifa y tramitamos el cambio. Gratis
              y sin compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/cambiar-compania-luz"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Cambiar de compañía →
              </Link>
              <Link
                href="/comparador-tarifas-luz"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Comparar tarifas
              </Link>
            </div>
          </section>

          {/* Links internos */}
          <section>
            <h2 className="text-lg font-bold text-gray-900">
              Artículos y servicios relacionados
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/penalizaciones-electricas"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Penalizaciones eléctricas
              </Link>
              <Link
                href="/estudio-factura-electrica"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Estudio de factura eléctrica
              </Link>
              <Link
                href="/precio-luz-hoy"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Precio de la luz hoy
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
