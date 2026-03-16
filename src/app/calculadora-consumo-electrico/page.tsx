import type { Metadata } from "next";
import Link from "next/link";
import Calculadora from "./Calculadora";

export const metadata: Metadata = {
  title:
    "Calculadora de Consumo Eléctrico | Cuánto Gasta cada Electrodoméstico - Vitergy",
  description:
    "Calcula gratis cuánto consume y cuánto cuesta cada electrodoméstico. Descubre qué aparatos te cuestan más y cómo reducir tu factura de la luz.",
  alternates: {
    canonical: "https://vitergy.es/calculadora-consumo-electrico",
  },
};

const faqData = [
  {
    question: "¿Cómo sé cuántos vatios consume mi electrodoméstico?",
    answer:
      "La potencia en vatios (W) suele aparecer en la etiqueta energética del aparato o en una pegatina trasera. También puedes consultar el manual de instrucciones o buscar el modelo en la web del fabricante. Para una medición exacta, utiliza un enchufe medidor de consumo que te muestra el consumo real en tiempo real.",
  },
  {
    question: "¿Es lo mismo vatios (W) que kilovatios-hora (kWh)?",
    answer:
      "No. Los vatios (W) miden la potencia instantánea de un aparato, cuánta energía necesita en cada momento para funcionar. Los kilovatios-hora (kWh) miden la energía total consumida durante un periodo. Para calcular los kWh, multiplica la potencia en kW (vatios ÷ 1000) por las horas de uso.",
  },
  {
    question: "¿Cuál es el electrodoméstico que más consume en un hogar?",
    answer:
      "Los aparatos que más electricidad suelen consumir son la nevera (por estar encendida 24h), el aire acondicionado, el calefactor eléctrico y la secadora. La nevera, a pesar de tener una potencia modesta, consume mucho por funcionar ininterrumpidamente. Aparatos como el horno consumen mucho por hora pero suelen usarse poco tiempo al día.",
  },
];

const howToSteps = [
  {
    name: "Selecciona tus electrodomésticos",
    text: "Activa con el checkbox los aparatos que tienes en casa. Puedes añadir nuevos con el botón inferior.",
  },
  {
    name: "Ajusta la potencia en vatios",
    text: "Modifica los vatios (W) si conoces la potencia exacta de tu modelo. Consulta la etiqueta del aparato.",
  },
  {
    name: "Indica las horas de uso diario",
    text: "Establece cuántas horas al día utilizas cada electrodoméstico de media.",
  },
  {
    name: "Configura el precio del kWh",
    text: "Introduce el precio por kilovatio-hora de tu tarifa. Puedes consultarlo en tu última factura.",
  },
  {
    name: "Consulta los resultados",
    text: "La calculadora muestra al instante el consumo y coste diario, mensual y anual, con un ranking de los aparatos que más te cuestan.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Calculadora de Consumo Eléctrico | Cuánto Gasta cada Electrodoméstico",
      description:
        "Calcula gratis cuánto consume y cuánto cuesta cada electrodoméstico.",
      url: "https://vitergy.es/calculadora-consumo-electrico",
      publisher: {
        "@type": "Organization",
        name: "Vitergy",
        url: "https://vitergy.es",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "HowTo",
      name: "Cómo calcular el consumo eléctrico de tus electrodomésticos",
      description:
        "Sigue estos pasos para saber cuánto consume y cuánto te cuesta cada aparato eléctrico de tu hogar.",
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    },
  ],
};

export default function CalculadoraConsumoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Calculadora de Consumo Eléctrico:{" "}
          <span className="text-[#f97316]">¿Cuánto Gasta tu Hogar?</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Introduce tus electrodomésticos, ajusta la potencia y las horas de
          uso, y descubre al instante cuánto te cuestan cada día, mes y año.
        </p>

        {/* Calculator */}
        <section className="mt-8">
          <Calculadora />
        </section>

        {/* ¿Cómo se calcula el consumo eléctrico? */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Cómo se calcula el consumo eléctrico?
          </h2>
          <div className="mt-4 space-y-4 leading-7 text-gray-700">
            <p>
              El consumo eléctrico de un aparato se mide en{" "}
              <strong>kilovatios-hora (kWh)</strong> y se calcula con una fórmula
              sencilla: se multiplica la{" "}
              <strong>potencia del aparato en vatios (W)</strong> por las{" "}
              <strong>horas de uso</strong> y se divide entre 1.000 para
              convertir a kilovatios. Por ejemplo, un horno de 2.000 W encendido
              durante 1 hora consume 2 kWh.
            </p>
            <p>
              Para obtener el <strong>coste en euros</strong>, basta con
              multiplicar los kWh consumidos por el precio de tu tarifa eléctrica
              (€/kWh). Este precio varía según tengas una tarifa regulada (PVPC)
              o de mercado libre. En el PVPC el precio cambia cada hora, por lo
              que el coste real depende también de <em>cuándo</em> uses el
              aparato — puedes consultarlo en nuestra página de{" "}
              <Link
                href="/precio-luz-hoy"
                className="font-medium text-[#f97316] underline decoration-orange-200 hover:decoration-[#f97316]"
              >
                precio de la luz hoy
              </Link>
              .
            </p>
            <p>
              Ten en cuenta que la potencia indicada por el fabricante es la{" "}
              <strong>potencia máxima</strong>. Aparatos como la nevera o el aire
              acondicionado funcionan con ciclos de encendido y apagado, por lo
              que su consumo real medio es inferior al máximo. Para una
              estimación más precisa, solicita un{" "}
              <Link
                href="/estudio-factura-electrica"
                className="font-medium text-[#f97316] underline decoration-orange-200 hover:decoration-[#f97316]"
              >
                estudio de tu factura eléctrica
              </Link>{" "}
              donde analizamos tu consumo real.
            </p>
          </div>
        </section>

        {/* Consejos para reducir el consumo */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Consejos para reducir el consumo eléctrico
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "Usa electrodomésticos de clase A o superior",
                text: "Un frigorífico clase A consume hasta un 60% menos que uno antiguo de clase D. La inversión se recupera en ahorro de factura en 2-3 años.",
              },
              {
                title: "Programa los aparatos en horas baratas",
                text: "Si tienes tarifa PVPC, pon la lavadora, lavavajillas y secadora en las horas verdes. Consulta el precio de la luz hoy para saber cuándo.",
              },
              {
                title: "Apaga el stand-by",
                text: "Los electrodomésticos en reposo pueden representar hasta un 10% de tu factura. Usa regletas con interruptor para apagarlos del todo.",
              },
              {
                title: "Ajusta la potencia contratada",
                text: "Si estás pagando más potencia de la que necesitas, el término fijo de tu factura es innecesariamente alto. Un estudio de optimización puede ahorrarte 50-100 €/año.",
              },
              {
                title: "Revisa tu tarifa periódicamente",
                text: "Las ofertas del mercado eléctrico cambian constantemente. Compara tu tarifa actual con las alternativas al menos una vez al año.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-gray-100 bg-[#fff5f0] p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How-to steps */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Cómo usar la calculadora paso a paso
          </h2>
          <ol className="mt-6 space-y-4">
            {howToSteps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Preguntas frecuentes sobre el consumo eléctrico
          </h2>
          <dl className="mt-6 space-y-6">
            {faqData.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-100 bg-[#fff5f0] p-5"
              >
                <dt className="text-base font-semibold text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-2xl bg-[#fff5f0] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Tu factura es más alta de lo que debería?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Analizamos tu factura eléctrica de forma gratuita y te ayudamos a
            encontrar la tarifa más barata para tu perfil de consumo.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              Análisis gratuito de tu factura →
            </Link>
            <Link
              href="/comparador-tarifas-luz"
              className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
            >
              Comparar tarifas de luz
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-gray-900">
            Otras herramientas que te pueden interesar
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Link
              href="/precio-luz-hoy"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">⚡</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Precio de la Luz Hoy
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Consulta el PVPC en tiempo real hora a hora.
              </p>
            </Link>
            <Link
              href="/estudio-factura-electrica"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">🔍</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Estudio de Factura
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Analizamos tu factura y detectamos sobrecostes.
              </p>
            </Link>
            <Link
              href="/optimizacion-potencia"
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#f97316]/30 hover:shadow-md"
            >
              <span className="text-2xl">📉</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Optimización de Potencia
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Ajusta la potencia contratada y ahorra en el fijo.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
