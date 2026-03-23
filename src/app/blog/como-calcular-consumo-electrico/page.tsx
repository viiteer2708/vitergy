import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Cálculo Consumo Eléctrico kWh | Fórmulas + Ejemplos Prácticos - Vitergy",
  description:
    "Aprende a calcular tu consumo eléctrico con fórmulas simples, ejemplos reales y tablas de electrodomésticos. Guía completa con herramientas prácticas.",
  alternates: {
    canonical: "https://vitergy.es/blog/como-calcular-consumo-electrico",
  },
};

const faqs = [
  {
    question: "¿Cuál es el consumo medio de una vivienda en España?",
    answer:
      "Según datos oficiales de la CNMC, una vivienda unifamiliar típica consume entre 3.500 y 4.500 kWh/año, un piso céntrico entre 2.500 y 3.500 kWh/año, y una vivienda con climatización eléctrica entre 5.000 y 7.000 kWh/año. Los factores principales que explican la variación son la zona climática, el tipo de vivienda, el número de personas y los hábitos de consumo.",
  },
  {
    question: "¿Cómo sé si mi consumo es alto o bajo?",
    answer:
      "Obtén tu consumo anual sumando los últimos 12 meses de factura y compáralo con la media de tu provincia (datos CNMC). Si estás un 20-30% por debajo de la media, tu consumo es bajo; si estás en la media, es normal; y si estás un 30% o más por encima, es alto. También puedes analizar por persona dividiendo kWh/año entre el número de personas en casa (la media típica es 1.000-1.500 kWh/persona/año).",
  },
  {
    question: "¿Influye mi tarifa en el consumo?",
    answer:
      "No directamente, pero sí puede cambiar tu comportamiento. Una tarifa con discriminación horaria incentiva desplazar el consumo a horas valle (más baratas), lo que puede suponer un ahorro del 15-25% en la factura sin cambiar el consumo real de energía.",
  },
  {
    question: "¿Puedo calcular consumo por horas de uso?",
    answer:
      "Sí, es uno de los métodos más precisos. Identifica la potencia del aparato (etiqueta o manual), estima las horas de uso diarias/semanales, aplica la fórmula Consumo (kWh) = [Potencia (W) / 1.000] × Horas, y multiplica por los días al año.",
  },
  {
    question: "¿Qué es la potencia reactiva?",
    answer:
      "La potencia reactiva es la energía que circula en la red pero no realiza trabajo útil, causada por inductancias en aparatos. En viviendas típicas no aparece en la factura (está compensada). Solo afecta a comercios e industrias. No es algo de lo que debas preocuparte como consumidor residencial.",
  },
  {
    question: "¿Cómo afecta el número de personas al consumo?",
    answer:
      "Más personas implican mayor consumo total pero menor consumo por persona (economía de escala). Una persona consume típicamente 2.000-2.500 kWh/año, dos personas 3.000-3.500 kWh/año, y cuatro personas 4.000-5.000 kWh/año. Factores como el teletrabajo pueden aumentar el consumo un 20-30%.",
  },
  {
    question: "¿Se puede calcular consumo sin factura?",
    answer:
      "Sí, con algunas limitaciones. Puedes leer el contador (muy preciso si comparas lectura actual con la de hace un año), sumar los consumos individuales de tus electrodomésticos usando tablas de referencia (margen de error ±10%), o comparar con hogares similares (margen de error ±20%).",
  },
  {
    question: "¿El consumo en invierno vs. verano es muy diferente?",
    answer:
      "Sí, significativamente. En una vivienda con climatización eléctrica, el mes más alto (enero) puede alcanzar 600 kWh mientras que el más bajo (mayo) ronda los 250 kWh, una diferencia de 2,4 veces. Sin climatización eléctrica, el patrón es más plano con una diferencia máxima de 1,5 veces.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Cómo Calcular tu Consumo Eléctrico en kWh [Fórmulas + Ejemplos]",
    description:
      "Aprende a calcular tu consumo eléctrico con fórmulas simples, ejemplos reales y tablas de electrodomésticos.",
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
      "https://vitergy.es/blog/como-calcular-consumo-electrico",
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
    name: "Cómo calcular tu consumo eléctrico en kWh",
    description:
      "Guía paso a paso para calcular el consumo eléctrico de tu hogar usando fórmulas simples y ejemplos prácticos.",
    step: [
      {
        "@type": "HowToStep",
        name: "Aprende los conceptos básicos",
        text: "Entiende la diferencia entre kW (potencia instantánea) y kWh (energía consumida en el tiempo). La fórmula base es: Energía (kWh) = Potencia (kW) × Tiempo (horas).",
      },
      {
        "@type": "HowToStep",
        name: "Aplica la fórmula principal de consumo",
        text: "Usa Consumo (kWh) = Potencia (kW) × Tiempo (horas). Si la potencia está en vatios, divide entre 1.000 primero.",
      },
      {
        "@type": "HowToStep",
        name: "Lee tu contador eléctrico",
        text: "Anota la lectura actual de tu contador, espera 24 horas, anota la nueva lectura. La diferencia es tu consumo diario en kWh.",
      },
      {
        "@type": "HowToStep",
        name: "Calcula el consumo de cada electrodoméstico",
        text: "Identifica la potencia de cada aparato en su etiqueta y multiplica por las horas de uso. Suma todos los consumos individuales.",
      },
      {
        "@type": "HowToStep",
        name: "Calcula tu consumo total anual",
        text: "Suma los consumos individuales de todos tus electrodomésticos o usa tu factura histórica de 12 meses para obtener el consumo real.",
      },
      {
        "@type": "HowToStep",
        name: "Aplica trucos para reducir consumo",
        text: "Sustituye bombillas por LED, desconecta aparatos en standby, ajusta la climatización y considera inversiones mayores como autoconsumo solar.",
      },
    ],
  },
];

export default function ComoCalcularConsumoElectricoPage() {
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
            Cómo Calcular tu Consumo Eléctrico en kWh:{" "}
            <span className="text-[#f97316]">Fórmulas + Ejemplos</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            Saber cuánta electricidad consumes es el primer paso para ahorrar en
            tu factura de la luz. Sin embargo, la mayoría de hogares españoles
            no saben cómo interpretar los kWh de su factura ni cómo calcular el
            consumo real de cada electrodoméstico.
          </p>
          <p>
            En esta guía te explicamos, con fórmulas simples y ejemplos
            prácticos, cómo calcular tu consumo eléctrico paso a paso: desde los
            conceptos básicos hasta el cálculo completo de tu hogar. Incluimos
            tablas de consumo por electrodoméstico y trucos probados para
            reducir tu gasto energético.
          </p>

          {/* Sección 1: Conceptos Básicos */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                1
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Conceptos Básicos de Energía Eléctrica
              </h2>
            </div>
            <p className="mt-4">
              Antes de calcular consumo, necesitas entender los conceptos
              fundamentales que aparecen en tu factura.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Kilovatio (kW)
            </h3>
            <p className="mt-2">
              El <strong>kilovatio</strong> es la unidad de{" "}
              <strong>potencia</strong>. Mide cuánta energía está usando un
              aparato en <strong>este momento</strong>.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              Analogía útil: Es como la velocidad de un coche. Ahora mismo vas
              a 60 km/h.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>1 kW = 1.000 vatios (W)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu vivienda típicamente tiene contratada: 3-5 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Un bombillo LED: 0,01 kW (10 W)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Un horno: 3-4 kW</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Kilovatio-hora (kWh)
            </h3>
            <p className="mt-2">
              El <strong>kilovatio-hora</strong> es la unidad de{" "}
              <strong>energía</strong>. Mide cuánta energía ha consumido un
              aparato durante un tiempo determinado.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              Analogía útil: Es como la distancia total recorrida. Hoy
              recorriste 200 km.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>1 kWh = 1 kW funcionando durante 1 hora</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu factura de electricidad se mide en kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Un horno consumiendo 3 kW durante 2 horas = 6 kWh
                </span>
              </li>
            </ul>

            <div className="mt-4 rounded-lg bg-orange-50 p-4">
              <p className="font-semibold text-gray-900">
                Relación clave:
              </p>
              <p className="mt-1 font-mono text-sm">
                Energía (kWh) = Potencia (kW) x Tiempo (horas)
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Esta es la fórmula más importante. La usarás constantemente.
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Vatio (W)
            </h3>
            <p className="mt-2">
              El <strong>vatio</strong> es la unidad base de potencia. Es lo que
              ves en la etiqueta de los electrodomésticos.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>1 W = 0,001 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Bombilla LED: 10 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Móvil en carga: 5-15 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Frigorífico: 150-200 W (medio)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Televisor: 100-200 W</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Potencia Contratada
            </h3>
            <p className="mt-2">
              Tu <strong>potencia contratada</strong> es el límite máximo que
              puedes consumir simultáneamente sin que te salte el diferencial. En
              tu factura aparece como &quot;potencia contratada: ___ kW&quot;.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Viviendas pequeñas: 2,3 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Viviendas normales: 3,45 kW - 5,75 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Viviendas grandes: 7-10 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Comercios: 10-30 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Industrias: 50+ kW</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Consejo Vitergy:</strong> Muchas personas pagan por más
              potencia de la que necesitan. Descubre{" "}
              <Link
                href="/blog/optimizar-potencia-contratada"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                cómo optimizar la potencia contratada
              </Link>{" "}
              y empieza a ahorrar desde el primer mes.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Factor de Potencia
            </h3>
            <p className="mt-2">
              El <strong>factor de potencia</strong> (coseno phi, cos &phi;) mide
              la eficiencia de cómo consumes energía.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Factor perfecto: 1,0</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Factor típico vivienda: 0,95-0,98</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Factor comercio/industria: 0,8-0,95</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>En la práctica:</strong> La mayoría de viviendas no
              necesitan preocuparse de esto. Los aparatos modernos tienen buen
              factor de potencia.
            </p>
          </section>

          {/* Sección 2: Fórmula Principal */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                2
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Fórmula Principal de Consumo
              </h2>
            </div>
            <p className="mt-4">
              Esta es la fórmula que usarás para calcular prácticamente
              cualquier consumo:
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Fórmula Básica
            </h3>
            <div className="mt-3 rounded-lg bg-orange-50 p-4">
              <p className="font-mono text-sm">
                Consumo (kWh) = Potencia (kW) x Tiempo (horas)
              </p>
            </div>
            <p className="mt-3">
              <strong>Ejemplo:</strong> Horno de 3 kW usado durante 2 horas
              = 3 kW x 2 h ={" "}
              <strong className="text-[#f97316]">6 kWh</strong>
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Variante: Si la potencia está en vatios (W)
            </h3>
            <div className="mt-3 rounded-lg bg-orange-50 p-4">
              <p className="font-mono text-sm">
                Consumo (kWh) = [Potencia (W) / 1.000] x Tiempo (horas)
              </p>
            </div>
            <p className="mt-3">
              <strong>Ejemplo:</strong> Secadora de 2.500 W durante 1 hora
              = (2.500 / 1.000) x 1 ={" "}
              <strong className="text-[#f97316]">2,5 kWh</strong>
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Fórmula para consumo mensual o anual
            </h3>
            <div className="mt-3 rounded-lg bg-orange-50 p-4 space-y-1">
              <p className="font-mono text-sm">
                Consumo mensual (kWh) = Consumo diario (kWh) x 30 días
              </p>
              <p className="font-mono text-sm">
                Consumo anual (kWh) = Consumo diario (kWh) x 365 días
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Fórmula para calcular potencia (inversa)
            </h3>
            <div className="mt-3 rounded-lg bg-orange-50 p-4">
              <p className="font-mono text-sm">
                Potencia (kW) = Consumo (kWh) / Tiempo (horas)
              </p>
            </div>
            <p className="mt-3">
              <strong>Ejemplo:</strong> Un aparato consumió 5 kWh en 2 horas.
              Potencia: 5 / 2 ={" "}
              <strong className="text-[#f97316]">2,5 kW</strong>
            </p>
          </section>

          {/* Sección 3: Cómo Leer tu Contador */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                3
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Cómo Leer tu Contador Eléctrico
              </h2>
            </div>
            <p className="mt-4">
              Tu contador es el primer lugar para verificar tu consumo real.
              Aquí te explicamos cómo interpretarlo.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Tipos de Contadores
            </h3>
            <div className="mt-3 space-y-4">
              <div>
                <p className="font-semibold text-gray-900">
                  Contador Analógico Tradicional:
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Diales numerados que giran. Se lee de izquierda a derecha. El
                  número que muestra es tu consumo en kWh desde la instalación.
                  Típico en viviendas antiguas.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Contador Digital (el más común hoy):
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Pantalla numérica LCD o LED con lectura directa. Puede mostrar
                  múltiples lecturas si tienes discriminación horaria. Un botón
                  para navegar entre pantallas.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Contador Inteligente (AMI - Telelectura):
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Comunica datos automáticamente. Puedes ver datos en el portal
                  online de tu compañía. Información casi en tiempo real.
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cómo Leer un Contador Analógico (Diales)
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Lee cada dial de izquierda a derecha</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Si la aguja está entre dos números, toma el número menor
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Si la aguja está entre 9 y 0, toma el 9</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Ignora el primer dial (fracciones de kWh)</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cómo Leer un Contador Digital
            </h3>
            <p className="mt-2">
              Observa la pantalla principal: mostrará un número grande. Si tienes
              discriminación horaria (A1, A2, A3), verás múltiples lecturas:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Punta:</strong> consumo horas punta (más caro)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Llano:</strong> consumo horas llano (precio medio)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Valle:</strong> consumo horas valle (más barato)
                </span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Lectura Real vs. Estimada en Factura
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">Lectura Real</p>
                <p className="mt-1 text-sm text-gray-600">
                  Aparece como &quot;L.R.&quot; o &quot;Real&quot; en factura.
                  Compañía o tú leéis el contador. Más preciso. Generalmente
                  cada 2-3 meses.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">Lectura Estimada</p>
                <p className="mt-1 text-sm text-gray-600">
                  Aparece como &quot;L.E.&quot; o &quot;Estimada&quot;. Compañía
                  proyecta basándose en histórico. Menos preciso. Suele ocurrir
                  en meses intermedios.
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Método para Verificar tu Consumo
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">1.</span>
                <span>Anota la lectura actual del contador</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">2.</span>
                <span>Dentro de 24 horas, anota la lectura de nuevo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">3.</span>
                <span>La diferencia = consumo en 24 horas (en kWh)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">4.</span>
                <span>Multiplica x 30 = consumo mensual estimado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">5.</span>
                <span>Multiplica x 365 = consumo anual estimado</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Para entender mejor todos los conceptos de tu factura, consulta
              nuestra guía sobre{" "}
              <Link
                href="/blog/entender-factura-luz"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                cómo entender tu factura de luz
              </Link>
              .
            </p>
          </section>

          {/* Sección 4: Ejemplos Prácticos */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                4
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Ejemplos Prácticos Detallados
              </h2>
            </div>
            <p className="mt-4">
              Veamos ejemplos del mundo real para que veas cómo calcular el
              consumo de los aparatos más comunes.
            </p>

            {/* Ejemplo 1 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 1: Bombilla LED vs. Incandescente
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  Bombilla Incandescente
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 60 W</li>
                  <li>Uso diario: 5 horas</li>
                  <li>Consumo diario: 0,3 kWh</li>
                  <li>Consumo anual: 109,5 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">27,38 &euro;</strong>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="font-semibold text-gray-900">Bombilla LED</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 9 W (equivalente a 60W)</li>
                  <li>Uso diario: 5 horas</li>
                  <li>Consumo diario: 0,045 kWh</li>
                  <li>Consumo anual: 16,4 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">4,10 &euro;</strong>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-3">
              <strong>Ahorro anual por bombilla:</strong>{" "}
              <strong className="text-[#f97316]">23,28 &euro;</strong>. Si
              tienes 15 bombillas:{" "}
              <strong className="text-[#f97316]">349,20 &euro;/año</strong>.
            </p>

            {/* Ejemplo 2 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 2: Lavadora Automática
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Potencia: 2.200 W | Duración ciclo: 1,5 horas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo por ciclo: (2.200 / 1.000) x 1,5 = 3,3 kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Frecuencia: 3 veces/semana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo anual: 3,3 x 3 x 52 = 514,8 kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Coste anual:{" "}
                  <strong className="text-[#f97316]">128,70 &euro;</strong>
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Con lavadora eficiente (clase A+++):</strong> consumo
              reducido a 351 kWh/año (87,75 &euro;). Ahorro:{" "}
              <strong>40,95 &euro;/año</strong>.
            </p>

            {/* Ejemplo 3 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 3: Aire Acondicionado Estacional
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Potencia enfriamiento: 3 kW | Consumo real (COP 3,5): 0,857 kW
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Uso: 8 horas/día durante 6 meses (180 días)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo diario: 0,857 x 8 = 6,86 kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo de verano: 6,86 x 180 = 1.234,8 kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Coste estacional:{" "}
                  <strong className="text-[#f97316]">308,70 &euro;</strong>
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Nota:</strong> El COP (Coeficient of Performance) es lo que
              hace eficiente un aire acondicionado. A mayor COP, menor consumo.
            </p>

            {/* Ejemplo 4 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 4: Frigorífico 24/7
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Potencia: 180 W (media) | Factor carga: ~40% (el compresor no
                  siempre está activo)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Potencia efectiva: 180 x 0,4 = 72 W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo diario: (72 / 1.000) x 24 = 1,728 kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Consumo anual: 630,7 kWh ={" "}
                  <strong className="text-[#f97316]">157,68 &euro;</strong>
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Con frigorífico A++:</strong> consumo reducido ~50% (315
              kWh/año = 78,75 &euro;). Ahorro:{" "}
              <strong>78,93 &euro;/año</strong>.
            </p>

            {/* Ejemplo 5 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 5: Ducha Eléctrica vs. Termo
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="font-semibold text-gray-900">
                  Ducha Eléctrica Instantánea
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 5.500 W</li>
                  <li>Duración: 10 min/día</li>
                  <li>Consumo anual: 335 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">83,75 &euro;</strong>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  Termo Eléctrico (200L)
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 2.000 W</li>
                  <li>Uso: 2 horas/día</li>
                  <li>Consumo anual: 1.460 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">365 &euro;</strong>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-3">
              <strong>Mejor opción:</strong> La ducha instantánea ahorra{" "}
              <strong className="text-[#f97316]">281,25 &euro;/año</strong>.
            </p>

            {/* Ejemplo 6 */}
            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ejemplo 6: Horno Eléctrico vs. Microondas
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  Horno Convencional
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 3.000 W | 45 min, 5 veces/sem.</li>
                  <li>Consumo anual: 585 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">146,25 &euro;</strong>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="font-semibold text-gray-900">Microondas</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Potencia: 1.000 W | 15 min, 5 veces/sem.</li>
                  <li>Consumo anual: 65 kWh</li>
                  <li>
                    Coste anual:{" "}
                    <strong className="text-gray-900">16,25 &euro;</strong>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-3">
              <strong>Ahorro usando microondas cuando sea posible:</strong>{" "}
              <strong className="text-[#f97316]">130 &euro;/año</strong>.
            </p>
          </section>

          {/* Sección 5: Tabla de Consumos */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                5
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Tabla de Consumos por Electrodoméstico
              </h2>
            </div>
            <p className="mt-4">
              Esta tabla te ayuda a identificar qué gasta más energía en tu
              hogar.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-gray-900">
                      Electrodoméstico
                    </th>
                    <th className="py-2 pr-4 text-left font-semibold text-gray-900">
                      Potencia (W)
                    </th>
                    <th className="py-2 pr-4 text-left font-semibold text-gray-900">
                      Consumo Anual (kWh)
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Coste Anual*
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Iluminación
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Bombilla LED</td>
                    <td className="py-2 pr-4">9</td>
                    <td className="py-2 pr-4">16,4</td>
                    <td className="py-2">4,10 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Bombilla halógena</td>
                    <td className="py-2 pr-4">50</td>
                    <td className="py-2 pr-4">91,3</td>
                    <td className="py-2">22,82 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Bombilla incandescente</td>
                    <td className="py-2 pr-4">60</td>
                    <td className="py-2 pr-4">109,5</td>
                    <td className="py-2">27,38 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Cocina
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Horno eléctrico</td>
                    <td className="py-2 pr-4">3.000</td>
                    <td className="py-2 pr-4">585</td>
                    <td className="py-2">146,25 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Microondas</td>
                    <td className="py-2 pr-4">1.000</td>
                    <td className="py-2 pr-4">65</td>
                    <td className="py-2">16,25 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Vitrocerámica</td>
                    <td className="py-2 pr-4">2.500</td>
                    <td className="py-2 pr-4">325</td>
                    <td className="py-2">81,25 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hervidor</td>
                    <td className="py-2 pr-4">2.000</td>
                    <td className="py-2 pr-4">130</td>
                    <td className="py-2">32,50 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Lavado
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Lavadora automática</td>
                    <td className="py-2 pr-4">2.200</td>
                    <td className="py-2 pr-4">515</td>
                    <td className="py-2">128,75 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Secadora ropa</td>
                    <td className="py-2 pr-4">4.000</td>
                    <td className="py-2 pr-4">520</td>
                    <td className="py-2">130,00 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Lavavajillas</td>
                    <td className="py-2 pr-4">1.800</td>
                    <td className="py-2 pr-4">234</td>
                    <td className="py-2">58,50 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Refrigeración
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Frigorífico</td>
                    <td className="py-2 pr-4">180</td>
                    <td className="py-2 pr-4">378</td>
                    <td className="py-2">94,50 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Congelador</td>
                    <td className="py-2 pr-4">220</td>
                    <td className="py-2 pr-4">462</td>
                    <td className="py-2">115,50 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Climatización
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Aire acondicionado</td>
                    <td className="py-2 pr-4">1.000</td>
                    <td className="py-2 pr-4">1.440</td>
                    <td className="py-2">360 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Calefacción eléctrica</td>
                    <td className="py-2 pr-4">2.000</td>
                    <td className="py-2 pr-4">2.160</td>
                    <td className="py-2">540 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Radiador aceite</td>
                    <td className="py-2 pr-4">1.500</td>
                    <td className="py-2 pr-4">1.620</td>
                    <td className="py-2">405 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ventilador</td>
                    <td className="py-2 pr-4">50</td>
                    <td className="py-2 pr-4">73</td>
                    <td className="py-2">18,25 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Entretenimiento
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Televisor LED 42&quot;</td>
                    <td className="py-2 pr-4">100</td>
                    <td className="py-2 pr-4">182,5</td>
                    <td className="py-2">45,63 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ordenador sobremesa</td>
                    <td className="py-2 pr-4">200</td>
                    <td className="py-2 pr-4">292</td>
                    <td className="py-2">73,00 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ordenador portátil</td>
                    <td className="py-2 pr-4">50</td>
                    <td className="py-2 pr-4">54,8</td>
                    <td className="py-2">13,70 &euro;</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td
                      colSpan={4}
                      className="py-2 pr-4 font-semibold text-[#f97316]"
                    >
                      Otros
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Plancha</td>
                    <td className="py-2 pr-4">1.500</td>
                    <td className="py-2 pr-4">220</td>
                    <td className="py-2">55,00 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Aspiradora</td>
                    <td className="py-2 pr-4">1.200</td>
                    <td className="py-2 pr-4">175</td>
                    <td className="py-2">43,75 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Termo 200L</td>
                    <td className="py-2 pr-4">2.000</td>
                    <td className="py-2 pr-4">1.460</td>
                    <td className="py-2">365,00 &euro;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Cargador móvil</td>
                    <td className="py-2 pr-4">5</td>
                    <td className="py-2 pr-4">1,8</td>
                    <td className="py-2">0,45 &euro;</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs text-gray-500">
                *Coste calculado a 0,25 &euro;/kWh
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Los 5 Electrodomésticos Que Más Gastan
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">1.</span>
                <span>
                  <strong>Calefacción eléctrica:</strong> 2.160 kWh/año (540 &euro;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">2.</span>
                <span>
                  <strong>Radiador aceite:</strong> 1.620 kWh/año (405 &euro;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">3.</span>
                <span>
                  <strong>Termo eléctrico:</strong> 1.460 kWh/año (365 &euro;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">4.</span>
                <span>
                  <strong>Aire acondicionado:</strong> 1.440 kWh/año (360 &euro;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">5.</span>
                <span>
                  <strong>Lavadora:</strong> 515 kWh/año (129 &euro;)
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Conclusión:</strong> La climatización (calefacción y
              refrigeración) consume más del 50% de la energía de una vivienda
              típica.
            </p>
          </section>

          {/* Sección 6: Cálculo del Consumo Total Anual */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                6
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Cálculo del Consumo Total Anual
              </h2>
            </div>
            <p className="mt-4">
              Ahora vamos a juntar todo para calcular tu consumo anual total.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Método 1: Sumar Consumos Individuales
            </h3>
            <p className="mt-2">
              Lista todos tus electrodomésticos y suma sus consumos anuales:
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-gray-900">
                      Aparato
                    </th>
                    <th className="py-2 pr-4 text-left font-semibold text-gray-900">
                      Cantidad
                    </th>
                    <th className="py-2 text-left font-semibold text-gray-900">
                      Total (kWh)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4">Bombillas LED</td>
                    <td className="py-2 pr-4">10</td>
                    <td className="py-2">164</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Frigorífico</td>
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2">378</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Lavadora</td>
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2">515</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Televisor</td>
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2">182,5</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Horno</td>
                    <td className="py-2 pr-4">0,3 usos/día</td>
                    <td className="py-2">175,5</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Aire acondicionado</td>
                    <td className="py-2 pr-4">(6 meses)</td>
                    <td className="py-2">720</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Calefacción</td>
                    <td className="py-2 pr-4">(6 meses)</td>
                    <td className="py-2">1.080</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Otros aparatos</td>
                    <td className="py-2 pr-4">-</td>
                    <td className="py-2">400</td>
                  </tr>
                  <tr className="border-t-2 border-gray-300">
                    <td className="py-2 pr-4 font-bold text-gray-900">
                      TOTAL ANUAL
                    </td>
                    <td className="py-2 pr-4"></td>
                    <td className="py-2 font-bold text-[#f97316]">
                      3.615 kWh
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Compara este total con el de tu factura. Si son similares, la
              estimación es correcta. Si no coinciden, busca aparatos olvidados.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Método 2: Usar tu Factura Histórica
            </h3>
            <p className="mt-2">
              Es el método más preciso. Recoge las facturas de los últimos 12
              meses y suma todos los kWh consumidos.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>Enero: 380 kWh | Febrero: 390 kWh | Marzo: 310 kWh</p>
              <p>Abril: 210 kWh | Mayo: 180 kWh | Junio: 220 kWh</p>
              <p>Julio: 450 kWh | Agosto: 460 kWh | Sept: 380 kWh</p>
              <p>Oct: 290 kWh | Nov: 340 kWh | Dic: 380 kWh</p>
              <p className="mt-2 font-bold text-[#f97316]">
                TOTAL: 4.170 kWh/año
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Analiza el patrón: los meses altos (verano/invierno) corresponden a
              climatización; los meses bajos (primavera/otoño) son tu consumo
              base.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Método 3: Cálculo Mensual para Presupuestar
            </h3>
            <div className="mt-3 rounded-lg bg-orange-50 p-4 space-y-1">
              <p className="font-mono text-sm">
                Consumo promedio mensual = 4.170 / 12 = 347,5 kWh/mes
              </p>
              <p className="font-mono text-sm">
                Coste promedio mensual = 347,5 x 0,25 &euro; = 86,88 &euro;
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Variación realista: meses bajos ~250 kWh (62,50 &euro;), meses altos
              ~450 kWh (112,50 &euro;).
            </p>
            <p className="mt-3 text-sm text-gray-600">
              Si quieres encontrar la tarifa que mejor se adapta a tu consumo,
              prueba nuestro{" "}
              <Link
                href="/comparador-tarifas-luz"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                comparador de tarifas de luz
              </Link>
              .
            </p>
          </section>

          {/* Sección 7: Trucos para Reducir Consumo */}
          <section>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                7
              </div>
              <h2 className="pt-1 text-2xl font-bold text-gray-900">
                Trucos para Reducir Consumo Eléctrico
              </h2>
            </div>
            <p className="mt-4">
              Una vez sabes cuánto consumes, es hora de ahorrar. Aquí están los
              trucos más efectivos organizados por nivel de inversión.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Trucos de Bajo Coste (0-100 &euro;)
            </h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  1. Sustituir Bombillas por LED
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 2-5 &euro; por bombilla | Ahorro: 75% en iluminación |
                  ROI: 1-2 años.{" "}
                  <strong>Ahorro anual: 80-150 &euro;</strong> (si sustituyes
                  todas). Es la mejora más rápida y rentable.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  2. Desconectar Aparatos en Standby
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 0 &euro; | Ahorro: 5-10% factura.{" "}
                  <strong>Ahorro anual: 50-100 &euro;</strong>. Televisores
                  (5-10W), ordenadores (2-5W), cafeteras (2-3W) y cargadores
                  enchufados (1-2W) son los principales culpables. Usa regletas
                  con interruptor.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  3. Reducir Temperatura Climatización
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 0 &euro; | Cada grado menos = ~1% ahorro en calefacción.{" "}
                  <strong>Ahorro anual: 50-200 &euro;</strong>. Baja de 21 &deg;C
                  a 20 &deg;C en invierno.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  4. Ajustar Duración de Lavados
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 0 &euro; | Ahorro: 15-25% por ciclo.{" "}
                  <strong>Ahorro anual: 75-100 &euro;</strong>. Usa ciclo ECO por
                  defecto, llena la lavadora al máximo y lava con agua fría la
                  ropa oscura.
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Trucos de Coste Medio (100-500 &euro;)
            </h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  5. Instalar Termostato Programable
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 150-300 &euro; | Ahorro: 10-15% climatización | ROI: 2-3
                  años.{" "}
                  <strong>Ahorro anual: 150-300 &euro;</strong>. Programa
                  automático, control remoto desde smartphone y detección de
                  presencia.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  6. Cambiar Electrodomésticos Antiguos
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Electrodomésticos de más de 10 años consumen 20-50% más que los
                  modernos. Ejemplo: frigorífico antiguo 630 kWh/año vs. A++ 315
                  kWh/año. <strong>Ahorro: 79 &euro;/año</strong>. Mejor solo
                  cambiar si el aparato falla o tiene eficiencia muy baja.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  7. Instalar Bomba de Calor
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 2.000-5.000 &euro; | Ahorro: 50-70% climatización | ROI:
                  3-5 años.{" "}
                  <strong>Ahorro anual: 1.000-2.000 &euro;</strong>. Calefacción
                  y refrigeración con el mismo aparato, COP 3-5 (muy eficiente).
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Trucos Avanzados (Inversión &gt; 500 &euro;)
            </h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  8. Instalación de Autoconsumo Solar
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 6.000-12.000 &euro; | Ahorro: 50-80% factura | ROI: 6-8
                  años.{" "}
                  <strong>Ahorro anual: 1.000-1.500 &euro;</strong>. Consulta
                  nuestra{" "}
                  <Link
                    href="/blog/guia-autoconsumo-fotovoltaico"
                    className="text-[#f97316] underline hover:text-orange-600"
                  >
                    guía completa de autoconsumo fotovoltaico
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  9. Monitorización de Consumo en Tiempo Real
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 100-500 &euro; | Ahorro: 10-20% | ROI: 2-3 años.{" "}
                  <strong>Ahorro anual: 200-400 &euro;</strong>. Ve tu consumo en
                  tiempo real, identifica aparatos que gastan y recibe alertas.
                  Descubre más sobre{" "}
                  <Link
                    href="/blog/monitorizacion-consumo-energetico"
                    className="text-[#f97316] underline hover:text-orange-600"
                  >
                    monitorización del consumo energético
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">
                  10. Aislamiento Térmico de Vivienda
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 3.000-8.000 &euro; | Ahorro: 30-50% climatización | ROI:
                  5-8 años.{" "}
                  <strong>Ahorro anual: 600-1.200 &euro;</strong>. Aislamiento
                  cubierta (40% del ahorro), cambio ventanas (30%), aislar
                  tuberías (10%).
                </p>
              </div>
            </div>
          </section>

          {/* Sección: Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: Mide y Ahorra
            </h2>
            <p className="mt-4">
              Calcular tu consumo eléctrico es el primer paso para ahorrar. Una
              vez sabes dónde va tu dinero, puedes tomar decisiones informadas.
            </p>

            <div className="mt-4 rounded-lg bg-orange-50 p-4 space-y-2">
              <p>
                <strong>Fórmula base:</strong> Consumo (kWh) = Potencia (kW) x
                Tiempo (h)
              </p>
              <p>
                <strong>Consumo típico:</strong> Vivienda 3.500-4.500 kWh/año
              </p>
              <p>
                <strong>Mayor consumo:</strong> Climatización (50%+ del consumo
                total)
              </p>
              <p>
                <strong>Ahorro rápido:</strong> LED + desenchufar standby (100 &euro;/año)
              </p>
              <p>
                <strong>Ahorro grande:</strong> Climatización eficiente o
                autoconsumo (1.000 &euro;+/año)
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Próximos Pasos
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">1.</span>
                <span>Recopila tus facturas de los últimos 12 meses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">2.</span>
                <span>Suma el consumo total en kWh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">3.</span>
                <span>Identifica meses altos y bajos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">4.</span>
                <span>
                  Analiza qué electrodomésticos gastan más (usa la tabla)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">5.</span>
                <span>
                  Implementa trucos de bajo coste (LED, standby, temperatura)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 font-semibold text-[#f97316]">6.</span>
                <span>
                  Considera inversiones mayores si consumes mucho (solar, bomba
                  de calor)
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
              ¿Necesitas ayuda para analizar tu consumo?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy ofrecemos auditoría energética, monitorización avanzada,
              optimización de potencia e instalación de autoconsumo. Analizamos
              tu consumo real y te proponemos las mejores soluciones de ahorro.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contacto"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Solicitar análisis gratuito
              </Link>
              <Link
                href="/calculadora-consumo-electrico"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Calculadora de consumo
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
                href="/blog/guia-autoconsumo-fotovoltaico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Guía autoconsumo fotovoltaico
              </Link>
              <Link
                href="/blog/monitorizacion-consumo-energetico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Monitorización consumo
              </Link>
              <Link
                href="/comparador-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparador de tarifas
              </Link>
              <Link
                href="/estudio-factura-electrica"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Estudio de factura eléctrica
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
