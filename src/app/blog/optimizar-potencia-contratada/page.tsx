import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Optimizar Potencia Contratada: Ahorra en tu Factura Eléctrica - Vitergy",
  description:
    "¿Pagas de más por potencia eléctrica? Guía para calcular potencia ideal, cambiarla y ahorrar. Incluye ejemplos y herramienta de cálculo.",
  alternates: {
    canonical: "https://vitergy.es/blog/optimizar-potencia-contratada",
  },
};

const faqs = [
  {
    question: "¿Si bajo potencia y salta diferencial, qué ocurre?",
    answer:
      "El diferencial salta automáticamente y se corta la luz. Debes apagar algún aparato y reintentar. Cuando consumes menos potencia que la contratada, vuelve a encenderse. Es muy molesto si ocurre frecuentemente, por eso recomendamos un margen de 0,5-1 kW.",
  },
  {
    question: "¿Puedo cambiar potencia varias veces?",
    answer:
      "Sí, sin límite. Cada cambio toma 5-10 días y no tiene coste. Sin embargo, es mejor ajustar bien de una vez para evitar esperas innecesarias.",
  },
  {
    question: "¿Cambiar potencia afecta al consumo real (kWh)?",
    answer:
      "No, absolutamente no. La potencia es el límite máximo permitido y el consumo es la energía que realmente usas. Son independientes. Lo único que cambia al modificar la potencia contratada es el término de potencia en la factura.",
  },
  {
    question:
      "¿Por qué muchas personas pagan de más por la potencia contratada?",
    answer:
      "Las razones principales son: desconocimiento (no saben que pueden cambiarla), inercia (nunca se lo plantean), miedo a que salte el diferencial, y porque un comercial les vendió una potencia alta. Se recomienda revisar la potencia anualmente.",
  },
  {
    question: "¿Hay penalización por cambio de potencia?",
    answer:
      "No, ninguna. Legalmente es gratis, no hay cargos ocultos y puede hacerse en cualquier momento.",
  },
  {
    question: "¿Distribuidora puede rechazar el cambio de potencia?",
    answer:
      "En teoría no, aunque pueden rechazar si la potencia es insuficiente o si la solicitud es incoherente con el CUPS. En la práctica es muy raro. Siempre puedes recurrir al regulador (CNMC) si hay problema.",
  },
  {
    question: "¿Se detecta inmediatamente el cambio de potencia?",
    answer:
      "No, hay desfase. Las solicitudes tardan 5-10 días típicamente. En las facturas aparece en la próxima factura tras el cambio, y en el contador el parámetro se actualiza remotamente.",
  },
  {
    question:
      "¿Es cierto que el invierno/verano afecta a la potencia necesaria?",
    answer:
      "Sí, indirectamente. En invierno hay mayor consumo por calefacción y en verano por aire acondicionado, por lo que el máximo consumo simultáneo varía estacionalmente. La estrategia es calcular la potencia ideal basándote en el máximo estacional (invierno o verano, el que sea mayor).",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Cómo Optimizar la Potencia Contratada y Ahorrar en tu Factura",
    description:
      "¿Pagas de más por potencia eléctrica? Guía para calcular potencia ideal, cambiarla y ahorrar. Incluye ejemplos y herramienta de cálculo.",
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
    datePublished: "2026-03-23",
    dateModified: "2026-03-23",
    mainEntityOfPage:
      "https://vitergy.es/blog/optimizar-potencia-contratada",
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
];

export default function OptimizarPotenciaContratadaPage() {
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
            23 de marzo de 2026
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cómo Optimizar la Potencia Contratada y{" "}
            <span className="text-[#f97316]">Ahorrar en tu Factura</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            La <strong>potencia contratada</strong> es uno de los conceptos más
            desconocidos de la factura eléctrica, y al mismo tiempo, uno de los
            que más dinero te puede ahorrar. Muchas personas pagan por una
            potencia superior a la que necesitan sin saberlo, con un
            sobrecoste que puede superar los 400 € al año.
          </p>
          <p>
            En esta guía te explicamos qué es la potencia contratada, cómo
            saber si pagas de más, cómo calcular la potencia ideal para tu
            vivienda y cómo cambiarla paso a paso. Todo con ejemplos reales y
            casos prácticos.
          </p>

          {/* Tabla de Contenidos */}
          <nav className="rounded-2xl border border-orange-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Tabla de Contenidos
            </h2>
            <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-[#f97316]">
              <li>Qué es la Potencia Contratada</li>
              <li>Cómo Saber si Pagas de Más</li>
              <li>Cálculo de Potencia Ideal</li>
              <li>Proceso de Cambio</li>
              <li>Ahorro Estimado</li>
              <li>Casos Prácticos</li>
              <li>Preguntas Frecuentes</li>
            </ol>
          </nav>

          {/* Sección 1: Qué es la Potencia Contratada */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                1
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Qué es la Potencia Contratada
              </h2>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Definición Simple
            </h3>
            <p className="mt-3">
              La <strong>potencia contratada</strong> es la cantidad máxima de
              energía que puedes consumir{" "}
              <strong>en un momento determinado</strong> sin que se dispare tu
              diferencial (protector de sobrecarga).
            </p>
            <p className="mt-3">
              <strong>Analogía útil:</strong> como la anchura de una tubería de
              agua. Una tubería ancha permite un flujo mayor; una estrecha
              limita el flujo máximo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Medida y Unidades
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Unidad:</strong> Kilovatio (kW)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>En factura:</strong> Aparece como &quot;Potencia
                  contratada: 4,6 kW&quot;. Si tienes dudas sobre cómo leer tu
                  factura, consulta nuestra guía sobre{" "}
                  <Link
                    href="/blog/entender-factura-luz"
                    className="text-[#f97316] underline hover:text-orange-600"
                  >
                    cómo entender tu factura de luz
                  </Link>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Rango típico viviendas:</strong> 2,3 kW - 10 kW
                </span>
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Qué Ocurre si Excedes la Potencia
            </h3>
            <p className="mt-3">
              Si simultaneas un consumo superior a tu potencia contratada:
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1">
              <li>El diferencial se dispara</li>
              <li>Se corta el suministro eléctrico</li>
              <li>No hay electricidad en casa</li>
              <li>Necesitas bajar el disyuntor para reactivar</li>
            </ol>
            <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">Ejemplo:</p>
              <p className="mt-1">Potencia contratada: 3,45 kW</p>
              <p>
                Enciendes: horno (3 kW) + secadora (2 kW) + microondas (1 kW)
              </p>
              <p>Consumo simultáneo: 6 kW &gt; 3,45 kW</p>
              <p className="mt-1 font-semibold text-red-600">
                El diferencial salta. Debes apagar alguno y reintentar.
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Diferencia: Potencia vs. Energía
            </h3>
            <p className="mt-3">Muchos confunden estos conceptos:</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Concepto
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Medida
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Significado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">Potencia (kW)</td>
                    <td className="py-2">Instantánea</td>
                    <td className="py-2">Consumo en ESE momento</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Energía (kWh)</td>
                    <td className="py-2">Acumulada</td>
                    <td className="py-2">Consumo a lo largo del tiempo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">Ejemplo:</p>
              <p className="mt-1">Potencia del horno: 3 kW (en este momento)</p>
              <p>
                Energía si lo usas 2 horas: 3 kW x 2 h = 6 kWh (acumulado)
              </p>
            </div>
          </section>

          {/* Sección 2: Cómo Saber si Pagas de Más */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                2
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Cómo Saber si Pagas de Más
              </h2>
            </div>
            <p className="mt-4">
              Muchas personas pagan por una potencia superior a la que necesitan.
              Aquí te enseñamos cómo identificarlo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Método 1: Revisar tu Consumo Real
            </h3>
            <p className="mt-3">
              <strong>Paso 1:</strong> Recopila las facturas de los últimos 12
              meses. Busca el consumo máximo en un mes y anótalo (típicamente
              verano o invierno).
            </p>
            <p className="mt-3">
              <strong>Paso 2:</strong> Analiza tus patrones. ¿Alguna vez se te
              disparó el diferencial? ¿Con qué frecuencia? ¿Qué aparatos
              estaban encendidos?
            </p>
            <p className="mt-3">
              <strong>Paso 3:</strong> Conclusión:
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Si <strong>NUNCA</strong> se dispara: potencia probablemente
                  sobrada
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Si rara vez (1 vez cada 6 meses): potencia está bien
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Si frecuentemente (1-2 veces/mes): potencia insuficiente
                </span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">Cálculo estimado:</p>
              <p className="mt-1">
                Si llevas 6+ meses sin disparo: potencia actual - 0,5 kW
                PODRÍA bastar.
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Método 2: Sumar Electrodomésticos Simultáneos
            </h3>
            <p className="mt-3">
              <strong>Paso 1:</strong> Lista las potencias máximas de tus
              aparatos:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Horno: 2.000-4.000 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Vitrocerámica: 2.000-3.500 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Secadora: 3.500-5.000 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Aire acondicionado: 2.500-5.000 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Calefactor: 1.500-2.500 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Lavadora: 1.500-2.500 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Frigorífico: 150-300 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>TV: 100-250 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Ordenador: 150-400 W</span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>Paso 2:</strong> Suma 2-3 aparatos que usas
              simultáneamente.
            </p>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Ejemplo escenario 1:
              </p>
              <p className="mt-1">Ducha eléctrica: 4.000 W</p>
              <p>Lavadora: 2.000 W (mientras ducha)</p>
              <p>Luz: 200 W</p>
              <p className="mt-1 font-medium">
                Total simultáneo: 6.200 W = 6,2 kW → Potencia mínima: 6,5-7 kW
              </p>
            </div>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Ejemplo escenario 2 (sin calefacción eléctrica):
              </p>
              <p className="mt-1">Horno: 3.000 W</p>
              <p>Lavadora: 2.000 W</p>
              <p>Iluminación: 500 W</p>
              <p className="mt-1 font-medium">
                Total simultáneo: 5.500 W = 5,5 kW → Potencia mínima: 6 kW
              </p>
            </div>
            <p className="mt-3">
              <strong>Paso 3:</strong> Compara con tu potencia actual. ¿Tu total
              calculado es menor? Probablemente puedes reducir. Para un cálculo
              más preciso, aprende{" "}
              <Link
                href="/blog/como-calcular-consumo-electrico"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                cómo calcular tu consumo eléctrico
              </Link>
              .
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Método 3: Monitorizar Consumo en Tiempo Real
            </h3>
            <p className="mt-3">Con aparatos de monitorización:</p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Medidor inteligente:</strong> puedes ver consumo actual
                  (kW)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>App compañía:</strong> si tienes contador inteligente
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Pinza amperimétrica:</strong> aparato que mide
                  corriente
                </span>
              </li>
            </ul>
            <p className="mt-3">
              Monitoriza durante 2-3 semanas, anota el máximo consumo
              simultáneo que alcanzas y compáralo con tu potencia contratada.
            </p>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">Caso real:</p>
              <p className="mt-1">Máximo consumo observado: 4,5 kW</p>
              <p>Potencia contratada: 5,75 kW</p>
              <p className="mt-1 font-medium text-[#f97316]">
                Diferencia: 1,25 kW innecesarios
              </p>
            </div>
          </section>

          {/* Sección 3: Cálculo de Potencia Ideal */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                3
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Cálculo de Potencia Ideal
              </h2>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Fórmula de Cálculo
            </h3>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Potencia requerida (kW) = Máximo consumo simultáneo (kW) +
                Margen seguridad (0,5-1 kW)
              </p>
              <p className="mt-2">Margen seguridad:</p>
              <ul className="mt-1 space-y-1">
                <li>0,5 kW si eres conservador</li>
                <li>1,0 kW si quieres comodidad</li>
              </ul>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ejemplo: Vivienda Pequeña
            </h3>
            <p className="mt-3">
              <strong>Datos:</strong> 2 personas, sin climatización eléctrica,
              consumo típico máximo calculado: 4,5 kW
            </p>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p>Máximo simultáneo: 4,5 kW</p>
              <p>Margen seguridad: + 0,5 kW</p>
              <p className="font-medium">Potencia requerida: 5,0 kW</p>
              <p className="mt-2 font-semibold text-[#f97316]">
                Mejor opción: 5,75 kW (siguiente disponible &gt; 5,0 kW)
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ejemplo: Vivienda Mediana
            </h3>
            <p className="mt-3">
              <strong>Datos:</strong> 4 personas, calefacción eléctrica, aire
              acondicionado, máximo simultáneo calculado: 6,5 kW
            </p>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p>Máximo simultáneo: 6,5 kW</p>
              <p>Margen: +0,5 kW</p>
              <p className="font-medium">Potencia requerida: 7,0 kW</p>
              <p className="mt-2 font-semibold text-[#f97316]">
                Mejor opción: 7,25 kW (siguiente disponible &gt; 7,0 kW)
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ejemplo: Vivienda Grande
            </h3>
            <p className="mt-3">
              <strong>Datos:</strong> 5+ personas, calefacción y A/C eléctrico,
              máximo simultáneo: 8,5 kW
            </p>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p>Máximo simultáneo: 8,5 kW</p>
              <p>Margen: +1 kW</p>
              <p className="font-medium">Potencia requerida: 9,5 kW</p>
              <p className="mt-2 font-semibold text-[#f97316]">
                Mejor opción: 9,2 kW o 11,5 kW según preferencia
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Potencias Disponibles (CNMC)
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Potencia
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Uso típico
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">2,3 kW</td>
                    <td className="py-2">Viviendas muy pequeñas</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">3,45 kW</td>
                    <td className="py-2">Apartamentos pequeños</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">5,75 kW</td>
                    <td className="py-2">Viviendas medianas (más común)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">7,25 kW</td>
                    <td className="py-2">Viviendas grandes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">9,2 kW</td>
                    <td className="py-2">Viviendas muy grandes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">11,5 kW</td>
                    <td className="py-2">Viviendas grandes con A/C</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">15 kW</td>
                    <td className="py-2">Comercios pequeños</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">20-30 kW</td>
                    <td className="py-2">Comercios / industria</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Recomendaciones por Perfil
            </h3>
            <div className="mt-3 space-y-4">
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Consumo bajo (&lt;1.500 kWh/año):
                </p>
                <p className="mt-1">Potencia ideal: 2,3-3,45 kW</p>
                <p>Riesgo: bajo (difícilmente lo superas)</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Consumo medio (2.000-4.500 kWh/año):
                </p>
                <p className="mt-1">
                  Potencia ideal: 3,45-5,75 kW (margen: +0,5 kW)
                </p>
                <p>Recomendación: 5,75 kW (es el estándar)</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Consumo alto (&gt;5.000 kWh/año):
                </p>
                <p className="mt-1">
                  Potencia ideal: 7,25-9,2 kW (margen: +1 kW)
                </p>
                <p>Recomendación: 7,25-9,2 kW según uso actual</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Con climatización eléctrica:
                </p>
                <p className="mt-1">
                  Añade +1-2 kW a cálculo base. Ejemplo: consumo base 5 kW +
                  A/C 2 kW = 7 kW total.
                </p>
              </div>
            </div>
            <p className="mt-4">
              Si estás en tarifa PVPC, te interesará saber{" "}
              <Link
                href="/blog/pvpc-precio-voluntario"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                qué es el PVPC y cómo funciona
              </Link>{" "}
              para optimizar aún más tu factura.
            </p>
          </section>

          {/* Sección 4: Proceso de Cambio de Potencia */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                4
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Proceso de Cambio de Potencia
              </h2>
            </div>
            <p className="mt-4">
              Cambiar la potencia contratada es simple y rápido. Aquí está el
              proceso paso a paso.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Paso 1: Contacta tu Compañía
            </h3>
            <p className="mt-3">Métodos disponibles:</p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Online:</strong> Portal cliente de tu compañía
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Teléfono:</strong> Llama al número de cliente
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Presencial:</strong> Oficina de la compañía
                </span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>Información a proporcionar:</strong> número de cliente,
              CUPS (si lo tienes), potencia nueva deseada y documento de
              identidad.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Paso 2: Verificación y Confirmación
            </h3>
            <p className="mt-3">
              La compañía verifica que eres el titular, comprueba las potencias
              disponibles y calcula el nuevo término de potencia. Recibirás un
              email de confirmación, un número de expediente y un plazo estimado
              de ejecución (típicamente 5-10 días).
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Paso 3: Cambio Administrativo
            </h3>
            <p className="mt-3">
              <strong>Tiempo:</strong> 5-10 días típicamente.
            </p>
            <p className="mt-3">
              La distribuidora recibe la solicitud y actualiza los parámetros en
              el contador. El cambio es{" "}
              <strong>100% remoto</strong> (no necesita técnico presencial).{" "}
              <strong>El suministro NO se interrumpe</strong> durante el
              proceso.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Paso 4: Verificación Final
            </h3>
            <p className="mt-3">Cómo verificar:</p>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>
                Revisa las facturas posteriores (la nueva potencia debe
                aparecer)
              </li>
              <li>
                Confirma que el diferencial NO salta (si el cambio fue hacia
                arriba)
              </li>
              <li>
                Si el cambio fue hacia abajo, monitoriza las primeras semanas
              </li>
            </ol>
            <p className="mt-3">
              El cambio debe estar efectivo en un máximo de 15 días.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Coste del Cambio
            </h3>
            <p className="mt-3">
              <strong>El cambio de potencia es GRATIS</strong> (legalmente).
              Nada de costes ocultos. Las únicas excepciones: si eres inquilino
              y el propietario traslada el coste, o si solicitas técnico
              presencial (pero no es necesario).
            </p>
            <p className="mt-4">
              Aprovecha también para revisar si tu tarifa actual es la mejor con
              nuestra{" "}
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                comparativa de tarifas de luz
              </Link>
              .
            </p>
          </section>

          {/* Sección 5: Ahorro Estimado */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                5
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Ahorro Estimado
              </h2>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Fórmula de Ahorro
            </h3>
            <div className="mt-3 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Ahorro anual = Diferencia potencia (kW) x Término de potencia
                (€/kW/día) x 365 días
              </p>
              <p className="mt-2">
                Término de potencia típico 2026: 0,45-0,55 €/kW/día (varía
                según distribuidora y tarifa)
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ejemplos de Ahorro
            </h3>
            <div className="mt-3 space-y-3">
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Caso 1: Reducir de 5,75 kW a 3,45 kW
                </p>
                <p className="mt-1">Diferencia: 2,3 kW</p>
                <p>Ahorro anual: 2,3 x 0,50 x 365 = 420 €/año</p>
                <p className="font-medium text-[#f97316]">
                  Ahorro mensual: 35 €/mes
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Caso 2: Reducir de 7,25 kW a 5,75 kW
                </p>
                <p className="mt-1">Diferencia: 1,5 kW</p>
                <p>Ahorro anual: 1,5 x 0,50 x 365 = 274 €/año</p>
                <p className="font-medium text-[#f97316]">
                  Ahorro mensual: 23 €/mes
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  Caso 3: Reducir de 11,5 kW a 9,2 kW
                </p>
                <p className="mt-1">Diferencia: 2,3 kW</p>
                <p>Ahorro anual: 2,3 x 0,50 x 365 = 420 €/año</p>
                <p className="font-medium text-[#f97316]">
                  Ahorro mensual: 35 €/mes
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Tabla de Ahorros por Reducción
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Reducción (kW)
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Ahorro Anual
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Ahorro Mensual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">0,5 kW</td>
                    <td className="py-2">91 €</td>
                    <td className="py-2">7,60 €</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">1,0 kW</td>
                    <td className="py-2">183 €</td>
                    <td className="py-2">15,20 €</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">1,5 kW</td>
                    <td className="py-2">274 €</td>
                    <td className="py-2">22,80 €</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">2,0 kW</td>
                    <td className="py-2">365 €</td>
                    <td className="py-2">30,40 €</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">2,5 kW</td>
                    <td className="py-2">457 €</td>
                    <td className="py-2">38,10 €</td>
                  </tr>
                  <tr>
                    <td className="py-2">3,0 kW</td>
                    <td className="py-2">548 €</td>
                    <td className="py-2">45,60 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              * Cálculo a 0,50 €/kW/día (varía por distribuidora)
            </p>
          </section>

          {/* Sección 6: Casos Prácticos */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                6
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Casos Prácticos
              </h2>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Caso Real 1: Apartamento Centro Ciudad
            </h3>
            <div className="mt-3 rounded-lg border border-orange-100 bg-white p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Situación inicial:
              </p>
              <p className="mt-1">
                1 persona viviendo sola, apartamento 60 m², sin climatización
                eléctrica (calefacción gas), potencia contratada: 5,75 kW,
                factura potencia actual: 35 €/mes.
              </p>
              <p className="mt-3 font-semibold text-gray-900">Análisis:</p>
              <p className="mt-1">
                Electrodomésticos simultáneos máximo: 3 kW (microondas + horno +
                TV). El diferencial NUNCA ha saltado. Utilización muy baja.
              </p>
              <p className="mt-3 font-semibold text-[#f97316]">
                Cambio propuesto: 5,75 kW → 3,45 kW
              </p>
              <p className="mt-1">Ahorro anual: 420 € | Ahorro mensual: 35 €</p>
              <p className="mt-1 font-medium text-green-600">
                Resultado: Cambio realizado sin problemas.
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Caso Real 2: Vivienda Unifamiliar
            </h3>
            <div className="mt-3 rounded-lg border border-orange-100 bg-white p-4 text-sm">
              <p className="font-semibold text-gray-900">
                Situación inicial:
              </p>
              <p className="mt-1">
                4 personas, casa 150 m², aire acondicionado eléctrico,
                calefacción eléctrica adicional (radiadores), potencia
                contratada: 7,25 kW, factura actual: 50 €/mes potencia.
              </p>
              <p className="mt-3 font-semibold text-gray-900">Análisis:</p>
              <p className="mt-1">
                Diferencial salta 2-3 veces en verano (A/C max) y 1-2 veces en
                invierno (calefacción max). Consumo real máximo observado: 6,8
                kW.
              </p>
              <p className="mt-3 font-semibold text-[#f97316]">
                Cambio propuesto: NO se recomienda bajar (ya está ajustada)
              </p>
              <p className="mt-1">Alternativa: Mantener 7,25 kW (está correcta)</p>
              <p className="mt-1 font-medium">
                Consejo: Si cambias climatización a bomba de calor (más
                eficiente), podrías bajar después.
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Caso Real 3: Error de Sobrecarga
            </h3>
            <div className="mt-3 rounded-lg border border-orange-100 bg-white p-4 text-sm">
              <p className="font-semibold text-gray-900">Situación:</p>
              <p className="mt-1">
                3 personas, potencia: 3,45 kW (muy baja), diferencial salta 10+
                veces/mes. Muy problemático.
              </p>
              <p className="mt-3 font-semibold text-gray-900">Análisis:</p>
              <p className="mt-1">
                Consumo simultáneo típico: 4,5 kW (ducha + horno + lavadora).
                Imposible con 3,45 kW. Potencia INSUFICIENTE.
              </p>
              <p className="mt-3 font-semibold text-[#f97316]">
                Cambio propuesto: 3,45 kW → 7,25 kW
              </p>
              <p className="mt-1">
                Coste adicional: 3,8 x 0,50 € x 365 = 694 €/año. Pero evita
                120+ disparos del diferencial al año.
              </p>
              <p className="mt-1 font-medium text-red-600">
                Resultado: Cambio urgente, vale la inversión.
              </p>
            </div>
          </section>

          {/* Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: Optimiza tu Potencia
            </h2>
            <p className="mt-4">
              Muchas personas pagan por potencia que no necesitan. Es una de las
              formas más fáciles de ahorrar en la factura eléctrica.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Acciones Inmediatas
            </h3>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li>
                <strong>Analiza tu consumo:</strong> ¿El diferencial salta?
                ¿Con qué frecuencia?
              </li>
              <li>
                <strong>Calcula máximo simultáneo:</strong> Suma los aparatos
                que usas a la vez
              </li>
              <li>
                <strong>Compara con actual:</strong> ¿Hay diferencia de 1+ kW?
              </li>
              <li>
                <strong>Contacta tu compañía:</strong> Solicita el cambio (es
                gratis)
              </li>
              <li>
                <strong>Monitoriza:</strong> Verifica que todo funciona
              </li>
            </ol>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ahorro Esperado
            </h3>
            <ul className="mt-3 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Promedio:</strong> 200-400 €/año
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Máximo observado:</strong> 700 €/año
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Mínimo:</strong> 50 €/año
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Depende de cuánto sobrada esté la potencia actual
                </span>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-gray-900">
                    {faq.question}
                  </h3>
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
              ¿Quieres un diagnóstico personalizado de tu potencia?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy analizamos tu factura, calculamos la potencia ideal
              para tu vivienda y gestionamos el cambio por ti. Gratis y sin
              compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/optimizacion-potencia"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Optimizar mi potencia →
              </Link>
              <Link
                href="/contacto"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Contactar con Vitergy
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
              <Link
                href="/consultoria-energetica"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Consultoría energética
              </Link>
              <Link
                href="/blog/entender-factura-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Entender tu factura de luz
              </Link>
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparativa tarifas de luz
              </Link>
            </div>
          </section>

          {/* Pie de artículo */}
          <p className="text-xs text-gray-400">
            Artículo actualizado en marzo de 2026. Información correcta a esa
            fecha. Los términos de potencia varían por distribuidora. Vitergy:
            especialistas en optimización energética, más de 10.000 viviendas
            analizadas.
          </p>
        </div>
      </article>
    </>
  );
}
