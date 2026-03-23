import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "PVPC Explicado: Qué es y Cómo Funciona [Guía Completa 2026] - Vitergy",
  description:
    "¿Qué es el PVPC? Cómo se calcula, cuándo es ventajoso y cómo ahorrar. Guía completa sobre el Precio Voluntario para Pequeño Consumidor.",
  alternates: {
    canonical: "https://vitergy.es/blog/pvpc-precio-voluntario",
  },
};

const faqs = [
  {
    question: "¿Quién fija el precio PVPC?",
    answer:
      "La CNMC (Comisión Nacional de Mercados y Competencia), organismo regulador español independiente del gobierno, fija el precio basándose en el mercado mayorista y lo publica diariamente.",
  },
  {
    question: "¿Puedo ver los precios PVPC de mañana?",
    answer:
      "Sí, a partir de las 20:00h puedes consultar los precios del día siguiente en la web de la CNMC (cnmc.es) o en aplicaciones especializadas como 'Precios luz'.",
  },
  {
    question: "¿PVPC es verdaderamente transparente?",
    answer:
      "Sí, es el más transparente del mercado. El precio lo fija el regulador, se publica antes de consumir, el cálculo es público y todas las compañías aplican el mismo precio.",
  },
  {
    question: "¿PVPC es inflacionario?",
    answer:
      "No, el PVPC refleja el mercado mayorista, no causa inflación. Si el mercado sube, el PVPC sube, y si baja, el PVPC baja. Es un mecanismo de transmisión de precios.",
  },
  {
    question: "¿Puedo volver a PVPC si lo dejé?",
    answer:
      "Sí, siempre que tu potencia contratada sea igual o inferior a 10 kW. Cambiar a mercado libre es reversible si mantienes ese límite de potencia.",
  },
  {
    question: "¿Cómo sé si mi potencia (kW) afecta al PVPC?",
    answer:
      "La potencia determina si puedes acceder al PVPC (≤ 10 kW). Además, aunque no afecta al precio del kWh, sí influye en el término de potencia de tu factura, por lo que optimizarla puede generar ahorro.",
  },
  {
    question: "¿PVPC en invierno vs. verano?",
    answer:
      "La estructura es igual todo el año, pero los precios varían. En invierno suelen ser más altos por la demanda de calefacción, y en verano generalmente más bajos.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "PVPC: Qué Es y Cómo Funciona el Precio Voluntario para el Pequeño Consumidor",
    description:
      "¿Qué es el PVPC? Cómo se calcula, cuándo es ventajoso y cómo ahorrar. Guía completa sobre el Precio Voluntario para Pequeño Consumidor.",
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
    mainEntityOfPage: "https://vitergy.es/blog/pvpc-precio-voluntario",
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

export default function PvpcPrecioVoluntarioPage() {
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
            PVPC: Qué Es y Cómo Funciona el{" "}
            <span className="text-[#f97316]">
              Precio Voluntario para el Pequeño Consumidor
            </span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            El <strong>PVPC (Precio Voluntario para el Pequeño Consumidor)</strong>{" "}
            es la tarifa de referencia regulada por el Estado para consumidores con
            una potencia contratada igual o inferior a 10 kW. Se actualiza
            diariamente, refleja el precio real del mercado mayorista y es la opción
            más transparente del mercado eléctrico español.
          </p>
          <p>
            En esta guía te explicamos en detalle qué es el PVPC, cómo se calcula,
            cuáles son sus ventajas y desventajas, cuándo te conviene más que el
            mercado libre y cómo ahorrar al máximo si decides contratarlo.
          </p>

          {/* 1. Qué es PVPC Exactamente */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Qué es el PVPC exactamente
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Definición simple
            </h3>
            <p className="mt-3">
              El PVPC es la <strong>tarifa regulada por la CNMC</strong> (Comisión
              Nacional de Mercados y Competencia) que refleja el coste real de la
              electricidad en el mercado mayorista. A diferencia de las tarifas del
              mercado libre, el precio no lo fija ninguna comercializadora: lo
              establece el regulador y se publica con transparencia total.
            </p>
            <p className="mt-3">
              <strong>Características clave:</strong>
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Fijado por el regulador (CNMC), no por la comercializadora</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Actualizado diariamente (refleja el mercado mayorista)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Disponible para cualquier consumidor con potencia contratada ≤ 10 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Transparente: el precio es público antes de consumir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Obligatorio: todas las compañías de referencia lo ofrecen</span>
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Contexto histórico
            </h3>
            <p className="mt-3">
              <strong>2008-2018: &ldquo;Impuesto al Sol&rdquo;</strong> — El PVPC
              tenía cargos por autoconsumo que penalizaban generar tu propia
              electricidad, una medida muy polémica en su momento.
            </p>
            <p className="mt-3">
              <strong>2018-Presente: Liberalización</strong> — El Decreto-ley
              15/2018 eliminó los cargos al autoconsumo. El PVPC se volvió más
              atractivo gracias a su transparencia total.
            </p>
            <p className="mt-3">
              <strong>2022-2024: Crisis de precios</strong> — El mercado mayorista
              se disparó por la guerra en Ucrania y otros factores. El PVPC reflejó
              esos precios altos, y en algunos periodos el mercado libre resultó más
              barato.
            </p>
            <p className="mt-3">
              <strong>2026 (Actual)</strong> — El PVPC se ha normalizado. La
              competencia del mercado libre sigue activa y ambas opciones son viables
              según tu perfil de consumo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              ¿Quién puede contratar el PVPC?
            </h3>
            <p className="mt-3">
              <strong>Elegibles:</strong>
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumidores con potencia contratada ≤ 10 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Viviendas habituales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Pequeños comercios y negocios (siempre que cumplan el límite de potencia)</span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>No elegibles:</strong>
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumidores con potencia contratada superior a 10 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Grandes consumos industriales</span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>¿Cómo verificarlo?</strong> Consulta tu factura de luz: la
              potencia contratada aparece en el apartado de datos del contrato.
              También puedes llamar a tu distribuidora o comercializadora y preguntar
              directamente.
            </p>
            <p className="mt-3">
              Si necesitas aprender a interpretar los datos de tu factura, consulta{" "}
              <Link
                href="/blog/entender-factura-luz"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                cómo entender tu factura de luz
              </Link>
              .
            </p>
          </section>

          {/* 2. Cómo se Calcula el PVPC */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Cómo se calcula el PVPC
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Fórmula base
            </h3>
            <p className="mt-3">
              La estructura básica de tu factura con PVPC es:
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              Tu factura mensual = (Consumo × Precio PVPC) + Potencia + Impuestos
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Desglose detallado
            </h3>
            <p className="mt-3">
              El término de consumo se calcula hora a hora. Cada kWh que consumes se
              multiplica por el precio PVPC de esa hora concreta:
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p>Término de Consumo = Σ (kWh hora N × Precio hora N)</p>
              <p className="mt-2">Ejemplo mes:</p>
              <p>Hora 00:00 (medianoche): 2 kWh × 0,12 €/kWh = 0,24 €</p>
              <p>Hora 01:00: 0 kWh × 0,10 €/kWh = 0 €</p>
              <p>Hora 02:00: 1 kWh × 0,08 €/kWh = 0,08 €</p>
              <p>...</p>
              <p>Hora 23:00: 2 kWh × 0,18 €/kWh = 0,36 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2">
                Total mes: 300 kWh consumidos
              </p>
              <p>Coste consumo: varía según horas usadas</p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Determinación del precio horario
            </h3>
            <p className="mt-3">
              Cada medianoche, la CNMC publica 24 precios (uno por cada hora del día
              siguiente). Se basan en el promedio del precio del mercado mayorista de
              ese día, con ajustes por peajes, impuestos y margen del distribuidor. El
              resultado es un precio garantizado, público y conocido antes de consumir.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p>Ejemplo — 16 de marzo:</p>
              <p>00:00-01:00: 0,15 €/kWh (madrugada, barato)</p>
              <p>06:00-07:00: 0,25 €/kWh (amanecer, sube)</p>
              <p>13:00-14:00: 0,32 €/kWh (mediodía, caro)</p>
              <p>20:00-21:00: 0,38 €/kWh (noche, punta cara)</p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Variación diaria
            </h3>
            <p className="mt-3">
              <strong>Qué cambia cada día:</strong> el precio de cada hora
              (típicamente 24 precios diferentes).
            </p>
            <p className="mt-3">
              <strong>Qué NO cambia:</strong> la estructura de 24 horas (siempre 24
              franjas) y el patrón general (madrugada más barato, tarde más caro).
            </p>
            <p className="mt-3">
              <strong>Magnitud de la variación:</strong> la hora más barata
              (típicamente 02:00-06:00) puede ser un 50 % más barata que la punta. La
              hora más cara (típicamente 18:00-22:00) puede costar hasta 5 veces más
              que la madrugada.
            </p>
            <p className="mt-3">
              Para saber cuánto estás gastando realmente, aprende{" "}
              <Link
                href="/blog/como-calcular-consumo-electrico"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                cómo calcular tu consumo eléctrico
              </Link>
              .
            </p>
          </section>

          {/* 3. Estructura de Horarios */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Estructura de horarios
            </h2>
            <p className="mt-3">
              Aunque el PVPC se actualiza diariamente, sigue una estructura horaria
              aproximada con tres franjas principales:
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Horas Valle (más barato)
            </h3>
            <p className="mt-3">
              <strong>Cuándo:</strong> de medianoche a 8:00 AM (00:00-08:00), fines
              de semana completos y festivos.
            </p>
            <p className="mt-3">
              La demanda es baja y el precio es aproximadamente un 50-60 % menor que
              en hora punta. Es el momento ideal para poner la lavadora, la secadora,
              el lavavajillas, cargar dispositivos y programar la climatización.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              Precio típico hora valle: 0,08-0,12 €/kWh
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Horas Llano (precio medio)
            </h3>
            <p className="mt-3">
              <strong>Cuándo:</strong> mañana temprano (8:00-12:00), noche de
              entresemana (22:00-00:00) y algunos días por la tarde (17:00-18:00).
            </p>
            <p className="mt-3">
              La demanda es normal, con un precio intermedio. Es el uso típico de
              vivienda.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              Precio típico hora llano: 0,18-0,25 €/kWh
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Horas Punta (más caro)
            </h3>
            <p className="mt-3">
              <strong>Cuándo:</strong> tarde/noche (17:00-22:00) en días laborables,
              cuando la demanda es máxima.
            </p>
            <p className="mt-3">
              El precio es un 50-80 % mayor que en valle. Evita usar el horno, el
              aire acondicionado o calefactores eléctricos en estas horas.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              Precio típico hora punta: 0,28-0,42 €/kWh
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Visualización semanal
            </h3>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Lunes a Viernes:</p>
              <p>00:00-08:00 → Valle</p>
              <p>08:00-17:00 → Llano</p>
              <p>17:00-22:00 → Punta</p>
              <p>22:00-00:00 → Llano</p>
              <p className="mt-2 font-semibold">Sábado y Domingo:</p>
              <p>00:00-22:00 → Valle (casi todo el día)</p>
              <p>22:00-00:00 → Llano</p>
              <p className="mt-2 text-xs text-gray-500">
                Nota: esta es una simplificación. El PVPC real tiene 24 precios
                diferentes cada día.
              </p>
            </div>
          </section>

          {/* 4. Ventajas y Desventajas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Ventajas y desventajas del PVPC
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ventajas
            </h3>

            <p className="mt-4">
              <strong>1. Precio justo (de referencia)</strong> — Refleja el coste real
              del mercado mayorista. Ninguna comercializadora aplica un margen
              excesivo. No hay &ldquo;trampa&rdquo; de precio.
            </p>
            <p className="mt-3">
              <strong>2. Transparencia total</strong> — Los precios se publican antes
              de consumir. Puedes calcular el coste futuro con exactitud consultando
              la web de la CNMC. Cero sorpresas.
            </p>
            <p className="mt-3">
              <strong>3. Discriminación horaria</strong> — Las horas punta y valle
              están diferenciadas. Desplazar el consumo puede suponer un ahorro del
              30-50 %. Tienes control sobre tu factura.
            </p>
            <p className="mt-3">
              <strong>4. Sin permanencia</strong> — Puedes cambiar de tarifa o
              compañía cuando quieras. El PVPC no requiere contrato fijo. Total
              libertad.
            </p>
            <p className="mt-3">
              <strong>5. Flexibilidad</strong> — Puedes volver al mercado libre en
              cualquier momento sin penalización. Bajo riesgo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Desventajas
            </h3>

            <p className="mt-4">
              <strong>1. Precio volátil</strong> — Cambia cada hora y no es predecible
              a largo plazo. En periodos de crisis del mercado mayorista puede ser muy
              caro. Genera incertidumbre presupuestaria.
            </p>
            <p className="mt-3">
              <strong>2. Requiere disciplina</strong> — Para ahorrar de verdad
              necesitas desplazar consumo a horas baratas. No todo el mundo puede
              hacerlo si trabaja en horario punta. Requiere cambiar hábitos.
            </p>
            <p className="mt-3">
              <strong>3. No siempre es más barato</strong> — En algunos periodos el
              mercado libre ofrece mejores precios. La competencia entre
              comercializadoras genera ofertas que pueden superar al PVPC.
            </p>
            <p className="mt-3">
              <strong>4. Discriminación horaria obligatoria</strong> — No existe
              opción de tarifa plana. Hay que entender las franjas horarias, lo que
              complica la factura frente a una tarifa simple.
            </p>
            <p className="mt-3">
              <strong>5. Límite de potencia contratada</strong> — Solo disponible para
              potencias ≤ 10 kW. No es para todos los consumidores.
            </p>
            <p className="mt-3">
              <strong>6. Requiere monitorización</strong> — Para maximizar el ahorro
              necesitas seguir los precios y decidir cuándo encender los aparatos.
              Requiere atención continua.
            </p>
            <p className="mt-3">
              Para tomar la mejor decisión, compara opciones con nuestra{" "}
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                comparativa de tarifas de luz
              </Link>
              .
            </p>
          </section>

          {/* 5. PVPC vs. Mercado Libre */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              5. PVPC vs. Mercado Libre
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Comparativa directa
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-4 font-semibold text-gray-900">Aspecto</th>
                    <th className="py-3 pr-4 font-semibold text-gray-900">PVPC</th>
                    <th className="py-3 font-semibold text-gray-900">Mercado Libre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4 font-medium">Precio</td>
                    <td className="py-2 pr-4">Variable diario</td>
                    <td className="py-2">Fijo o variable (mensual)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Previsibilidad</td>
                    <td className="py-2 pr-4">Baja</td>
                    <td className="py-2">Alta (fijo) o media (variable)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Competencia</td>
                    <td className="py-2 pr-4">No (regulado)</td>
                    <td className="py-2">Sí (entre compañías)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Permanencia</td>
                    <td className="py-2 pr-4">No (típico)</td>
                    <td className="py-2">Sí (12-24 meses)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Penalización</td>
                    <td className="py-2 pr-4">No</td>
                    <td className="py-2">Sí (si cambias antes)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Discriminación horaria</td>
                    <td className="py-2 pr-4">Obligatoria</td>
                    <td className="py-2">Opcional</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Transparencia</td>
                    <td className="py-2 pr-4">Total</td>
                    <td className="py-2">Buena</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Cambio a otro</td>
                    <td className="py-2 pr-4">Libre</td>
                    <td className="py-2">Posible (con coste)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              ¿Cuándo es el PVPC mejor?
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu potencia contratada es ≤ 10 kW (requisito de acceso)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Puedes desplazar consumo a horas baratas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>No necesitas una factura predecible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Valoras la transparencia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Quieres poder cambiar frecuentemente sin penalización</span>
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              ¿Cuándo es el Mercado Libre mejor?
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Necesitas una factura predecible (para presupuesto)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu potencia contratada es {"> "}10 kW (sin acceso al PVPC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>No puedes desplazar consumo a horas baratas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Quieres permanecer 2+ años con la misma tarifa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Buscas tarifa plana sin discriminación horaria</span>
              </li>
            </ul>
            <p className="mt-3">
              Utiliza nuestro{" "}
              <Link
                href="/comparador-tarifas-luz"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                comparador de tarifas de luz
              </Link>{" "}
              para ver qué opción te conviene más.
            </p>
          </section>

          {/* 6. Simulaciones Prácticas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Simulaciones prácticas
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Simulación 1: Pequeño consumo disciplinado
            </h3>
            <p className="mt-3">
              <strong>Perfil:</strong> Apartamento 50 m², 1 persona, consumo anual
              1.500 kWh, alta capacidad de desplazar consumo.
            </p>
            <p className="mt-3">
              <strong>Patrón de consumo:</strong> 20 % en horas punta (300 kWh),
              30 % en horas llano (450 kWh), 50 % en horas valle (750 kWh).
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Cálculo PVPC:</p>
              <p>Horas punta: 300 kWh × 0,32 €/kWh = 96 €</p>
              <p>Horas llano: 450 kWh × 0,22 €/kWh = 99 €</p>
              <p>Horas valle: 750 kWh × 0,10 €/kWh = 75 €</p>
              <p>Total consumo anual: 270 € (promedio 0,18 €/kWh)</p>
              <p>+ Potencia: 2,3 kW × 0,45 €/kW/día × 365 = 378 €</p>
              <p>+ Impuestos/peajes: ~100 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2 font-semibold">
                Total anual PVPC: ~750 €
              </p>
            </div>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Cálculo Mercado Libre (tarifa fija):</p>
              <p>Tarifa fija: 0,22 €/kWh</p>
              <p>Consumo: 1.500 kWh × 0,22 € = 330 €</p>
              <p>Potencia: 2,3 kW × 0,50 €/kW/día × 365 = 420 €</p>
              <p>Impuestos/peajes: ~100 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2 font-semibold">
                Total anual: ~850 €
              </p>
            </div>
            <p className="mt-3">
              <strong>Veredicto:</strong> PVPC ahorra ~100 € al año.{" "}
              <strong className="text-[#f97316]">PVPC gana</strong> si la disciplina
              es alta.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Simulación 2: Mediano consumo sin flexibilidad
            </h3>
            <p className="mt-3">
              <strong>Perfil:</strong> Casa 100 m², 3 personas, consumo anual
              3.500 kWh, baja capacidad de desplazar consumo (horario laboral fijo).
            </p>
            <p className="mt-3">
              <strong>Patrón de consumo:</strong> 35 % en horas punta (1.225 kWh),
              40 % en horas llano (1.400 kWh), 25 % en horas valle (875 kWh).
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Cálculo PVPC:</p>
              <p>Horas punta: 1.225 × 0,32 € = 392 €</p>
              <p>Horas llano: 1.400 × 0,22 € = 308 €</p>
              <p>Horas valle: 875 × 0,10 € = 87 €</p>
              <p>Total consumo: 787 € (promedio 0,225 €/kWh)</p>
              <p>+ Potencia (5,75 kW): 5,75 × 0,45 € × 365 = 943 €</p>
              <p>+ Impuestos/peajes: ~200 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2 font-semibold">
                Total PVPC: ~1.930 €
              </p>
            </div>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Cálculo Mercado Libre:</p>
              <p>Tarifa: 0,24 €/kWh (oferta competitiva)</p>
              <p>Consumo: 3.500 × 0,24 € = 840 €</p>
              <p>Potencia: 943 €</p>
              <p>Impuestos: 200 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2 font-semibold">
                Total: ~1.983 €
              </p>
            </div>
            <p className="mt-3">
              <strong>Veredicto:</strong> Resultado similar. PVPC ligeramente mejor
              (~53 € de ahorro), pero sin margen significativo para quien no puede
              desplazar consumo.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Simulación 3: Consumo alto (potencia {"> "}10 kW)
            </h3>
            <p className="mt-3">
              <strong>Perfil:</strong> Casa grande 200 m², 5 personas, consumo anual
              5.500 kWh, potencia contratada 11,5 kW.{" "}
              <strong>No elegible para PVPC</strong> (potencia {"> "}10 kW).
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6">
              <p className="font-semibold">Cálculo Mercado Libre:</p>
              <p>Tarifa: 0,25 €/kWh</p>
              <p>Consumo: 5.500 × 0,25 € = 1.375 €</p>
              <p>Potencia: 7,25 × 0,50 € × 365 = 1.321 €</p>
              <p>Impuestos: 300 €</p>
              <p className="mt-2 border-t border-gray-300 pt-2 font-semibold">
                Total: ~2.996 €
              </p>
            </div>
            <p className="mt-3">
              <strong>Veredicto:</strong> Mercado libre obligatorio. Comparar 3 o más
              compañías para encontrar la mejor tasa. Ahorros posibles de 200-400 €
              al año negociando.
            </p>
          </section>

          {/* 7. Estrategias de Ahorro */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Estrategias de ahorro con PVPC
            </h2>
            <p className="mt-3">
              Si contratas el PVPC, estas son las estrategias más efectivas para
              maximizar tu ahorro:
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Estrategia 1: Desplazar consumo a horas valle
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Lavadora:</strong> programar entre 23:00 y 06:00 (ahorro 50-60 % por ciclo)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Lavavajillas:</strong> mismo horario (ahorro 40-50 %)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Carga de móvil/tablets:</strong> madrugada (ahorro 70 %)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Ducha:</strong> evitar 18-22h (ahorro 30-40 % si la adelantas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span><strong>Cocina:</strong> usar horno antes de las 17:00 si es posible</span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>Ahorro estimado:</strong> 100-200 €/año desplazando un 30-40 %
              del consumo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Estrategia 2: Evitar horas punta
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>NO encender el horno entre las 18-22h</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>NO usar el A/C entre las 19-21h (mantener el frío acumulado durante el día)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>NO usar calefactor eléctrico entre las 18-22h</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Lavadora y secadora: antes de las 17:00</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Vitrocerámica y microondas: antes de las 17:00</span>
              </li>
            </ul>
            <p className="mt-3">
              <strong>Ahorro estimado:</strong> 80-150 €/año evitando el 20 % del
              consumo en hora punta.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Estrategia 3: Monitorizar precios horarios
            </h3>
            <p className="mt-3">
              Revisa diariamente los precios publicados por la CNMC. Cuando el precio
              sea especialmente caro, no uses aparatos de alto consumo. Cuando esté
              bajo, aprovecha para poner las cargas más pesadas.
            </p>
            <p className="mt-3">
              Puedes consultar los precios en la web de la CNMC o mediante apps
              especializadas.
            </p>
            <p className="mt-3">
              <strong>Ahorro estimado:</strong> 50-100 €/año con decisiones
              reactivas.
            </p>
            <p className="mt-3">
              Consulta el{" "}
              <Link
                href="/precio-luz-hoy"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                precio de la luz hoy
              </Link>{" "}
              para planificar tu consumo diario.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Estrategia 4: Combinar PVPC + autoconsumo solar
            </h3>
            <p className="mt-3">
              La sinergia es perfecta: generas electricidad durante las horas punta
              (cuando es más valiosa), vendes el excedente a precio punta (máximo
              valor) y consumes de la red solo en horas baratas (mínimo coste).
            </p>
            <p className="mt-3">
              Descubre más en nuestra{" "}
              <Link
                href="/blog/guia-autoconsumo-fotovoltaico"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                guía completa de autoconsumo fotovoltaico
              </Link>
              .
            </p>
            <p className="mt-3">
              <strong>Ahorro estimado:</strong> 1.000-1.500 €/año con una instalación
              de 5 kW solar.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Estrategia 5: Optimizar potencia contratada
            </h3>
            <p className="mt-3">
              Si tu potencia contratada es mayor de lo que realmente necesitas,
              reducirla puede ahorrarte entre 100 y 200 € al año. Típicamente, bajar
              0,5-1 kW ya genera un ahorro significativo en el término fijo.
            </p>
            <p className="mt-3">
              Aprende{" "}
              <Link
                href="/blog/optimizar-potencia-contratada"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                cómo optimizar la potencia contratada
              </Link>{" "}
              para reducir tu factura.
            </p>
          </section>

          {/* 8. Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: ¿es el PVPC para mí?
            </h2>
            <p className="mt-3">
              <strong>Elige PVPC si:</strong>
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu potencia contratada es ≤ 10 kW</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Puedes desplazar consumo a horas baratas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Valoras transparencia y libertad (sin permanencia)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>No necesitas una factura predecible</span>
              </li>
            </ul>
            <p className="mt-4">
              <strong>No elijas PVPC si:</strong>
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Tu potencia contratada es {"> "}10 kW (no elegible)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>No puedes cambiar hábitos de consumo (horario laboral fijo)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Necesitas factura predecible (para presupuesto)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Prefieres simplicidad (tarifa plana)</span>
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Pasos para decidir
            </h3>
            <ol className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">1.</span>
                <span><strong>Verificar elegibilidad:</strong> comprueba que tu potencia contratada sea ≤ 10 kW (aparece en tu factura)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">2.</span>
                <span><strong>Si eres elegible:</strong> compara PVPC vs. la mejor oferta del mercado libre actual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">3.</span>
                <span><strong>Analiza tu perfil:</strong> ¿puedes desplazar consumo a horas baratas?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">4.</span>
                <span><strong>Decide:</strong> PVPC (ahorro) vs. Mercado libre (seguridad)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">5.</span>
                <span><strong>Contrata:</strong> el cambio es gratuito y se completa en 15 días</span>
              </li>
            </ol>
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
              ¿Quieres saber si el PVPC es tu mejor opción?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy analizamos tu factura y tu perfil de consumo para
              recomendarte la tarifa que más te conviene. Consulta gratuita y sin
              compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/precio-luz-hoy"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Ver precio de la luz hoy →
              </Link>
              <Link
                href="/contacto"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Solicitar análisis gratuito
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
                href="/comparador-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparador de tarifas
              </Link>
              <Link
                href="/consultoria-energetica"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Consultoría energética
              </Link>
              <Link
                href="/precio-luz-hoy"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Precio de la luz hoy
              </Link>
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparativa de tarifas de luz
              </Link>
              <Link
                href="/blog/entender-factura-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Entender tu factura de luz
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
