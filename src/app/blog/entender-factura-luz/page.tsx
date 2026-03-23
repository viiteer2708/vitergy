import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Cómo Entender tu Factura de Luz: Guía Completa [2026] - Vitergy",
  description:
    "Guía completa para entender factura eléctrica: desglose de conceptos, impuestos, peajes, ejemplos reales. ¡Entiende exactamente qué pagas!",
  alternates: {
    canonical: "https://vitergy.es/blog/entender-factura-luz",
  },
};

const faqs = [
  {
    question: "¿Por qué mi factura es diferente cada mes?",
    answer:
      "Las razones principales son: el consumo varía según la estación, la lectura puede estar estimada y se ajusta con la siguiente lectura real, los días de facturación no son iguales todos los meses, posibles cambios de potencia o tarifa, y las bonificaciones pueden variar de un período a otro. Es normal que las facturas varíen entre un 10-30% mes a mes.",
  },
  {
    question: "¿Puedo revisar mi factura si creo que hay error?",
    answer:
      "Sí, completamente. El procedimiento es: compara lecturas con tu contador para verificar la lectura real, multiplica consumo por tarifa para verificar el cálculo de consumo, verifica potencia por días para comprobar el cálculo de potencia. Si hay discrepancia, contacta a tu compañía, que debe explicar en 30 días.",
  },
  {
    question: "¿Qué hacer si la factura es muy alta inesperadamente?",
    answer:
      "Analiza si hay una lectura real nueva que corrija la anterior, si cambió tu tarifa o potencia, si usaste más energía por climatización nueva, o si hay algún error en los datos. Si crees que hay error, reclama con documentación. Si el consumo es alto pero correcto, considera una auditoría energética.",
  },
  {
    question: "¿Por qué aparecen dos lecturas si cambié de compañía?",
    answer:
      "Es normal en cambios de compañía. Aparece una lectura de salida de la compañía anterior y una lectura de entrada de la compañía nueva, ambas del mismo día. La última factura de la compañía anterior cubre hasta el cambio y la primera de la nueva desde el cambio en adelante.",
  },
  {
    question: "¿Cómo sé si mi tarifa es la mejor?",
    answer:
      "Compara el precio por kWh de tu factura con los comparadores online. Si tu tarifa es significativamente más alta que las opciones del mercado (diferencia mayor al 10%), es recomendable cambiar. Puedes usar comparadores de tarifas y apps de compañías para verificar.",
  },
  {
    question: "¿Qué significa período de facturación?",
    answer:
      "Es el número de días que abarca la factura, típicamente del 01 al último día del mes. Los meses con 31 días tienen factura de potencia ligeramente más alta y los de 28 días ligeramente más baja. Es una variación normal y esperada.",
  },
  {
    question: "¿Puedo impugnar una factura después de pagar?",
    answer:
      "Sí, tienes derecho. El plazo legal es de 1 año para reclamación, aunque cuanto antes mejor. Envía un email formal a la compañía explicando la discrepancia, adjunta facturas y documentación, y solicita revisión y devolución si aplica. La compañía debe responder en 30 días.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Cómo Entender tu Factura de la Luz: Guía Completa con Ejemplos",
    description:
      "Guía completa para entender factura eléctrica: desglose de conceptos, impuestos, peajes, ejemplos reales.",
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
    mainEntityOfPage: "https://vitergy.es/blog/entender-factura-luz",
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

export default function EntenderFacturaLuzPage() {
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
            Cómo Entender tu Factura de la Luz:{" "}
            <span className="text-[#f97316]">Guía Completa con Ejemplos</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            Tu factura de la luz puede parecer un documento indescifrable lleno
            de conceptos técnicos, pero en realidad sigue una estructura lógica
            que cualquier persona puede entender. Saber leerla es el primer paso
            para detectar errores, optimizar tu consumo y ahorrar dinero cada
            mes.
          </p>
          <p>
            En esta guía desglosamos cada sección de tu factura eléctrica con
            ejemplos reales: desde el término de potencia hasta los impuestos,
            pasando por los peajes y los errores más comunes. Con la experiencia
            de más de 15.000 facturas analizadas en Vitergy, te explicamos
            exactamente qué pagas y por qué.
          </p>

          {/* Fórmula general */}
          <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
            <p className="font-semibold text-gray-900">
              Fórmula de tu factura:
            </p>
            <p className="mt-2 font-mono text-sm">
              IMPORTE TOTAL = Término Potencia + Término Consumo + Impuestos +
              Peajes + IVA
            </p>
          </div>

          {/* Sección 1: Estructura General */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">1.</span> Estructura General de
              tu Factura
            </h2>
            <p className="mt-4">
              Una factura de electricidad tiene típicamente estos componentes
              principales:
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Sección 1: Datos Generales
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Número de cliente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>CUPS (identificador de suministro)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Período de facturación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Fecha de emisión</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Fecha de vencimiento de pago</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Sección 2: Resumen de Factura
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Importe total a pagar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Comparativa con factura anterior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Variación en euros y porcentaje</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Sección 3: Desglose de Conceptos
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Energía consumida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Potencia contratada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Impuestos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Peajes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Descuentos y bonificaciones</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Sección 4: Lecturas del Contador
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Lectura anterior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Lectura actual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Días de facturación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>kWh consumidos calculados</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Sección 5: Datos Personales
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Nombre del titular</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Dirección, email y teléfono</span>
              </li>
            </ul>

            <p className="mt-4">
              Si quieres saber{" "}
              <Link
                href="/blog/pvpc-precio-voluntario"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                qué es el PVPC y cómo funciona
              </Link>
              , te recomendamos leer nuestra guía específica.
            </p>
          </section>

          {/* Sección 2: Término de Potencia */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">2.</span> Término de Potencia
            </h2>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              ¿Qué es?
            </h3>
            <p className="mt-3">
              El <strong>término de potencia</strong> es un cargo fijo mensual
              por el derecho a tener electricidad disponible, independientemente
              de cuánto consumas. Es como el alquiler de una casa: lo pagas
              independientemente de cuántas luces enciendas.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cálculo
            </h3>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                Término de Potencia = Potencia contratada (kW) x Coste potencia
                (€/kW/día) x Días facturación
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 5,75 kW x 0,50 €/kW/día x 30 días ={" "}
                <strong>86,25 €</strong>
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Qué aparece en tu factura
            </h3>
            <p className="mt-3">Busca líneas como estas:</p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>&quot;Potencia contratada: 5,75 kW&quot;</p>
              <p>&quot;Término fijo (potencia): 86,25 €&quot;</p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Variación del coste de potencia
            </h3>
            <p className="mt-3">
              El coste de potencia varía según tu tarifa (PVPC vs. mercado
              libre), tu distribuidora, cambios regulatorios de la CNMC y la
              época del año (puede variar hasta un 5%).
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-semibold text-gray-900">
                Rango típico 2026:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <span className="text-[#f97316]">•</span> Coste mínimo: 0,35
                  €/kW/día (ofertas competitivas)
                </li>
                <li>
                  <span className="text-[#f97316]">•</span> Coste máximo: 0,60
                  €/kW/día (tarifas caras)
                </li>
                <li>
                  <span className="text-[#f97316]">•</span> Promedio: 0,45-0,50
                  €/kW/día
                </li>
              </ul>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Ahorro potencial
            </h3>
            <p className="mt-3">Puedes reducir este término de tres formas:</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">1.</span>
                <span>
                  <strong>Reduciendo potencia contratada</strong> si no la
                  necesitas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">2.</span>
                <span>
                  <strong>Cambiando de tarifa</strong> (mercado libre
                  típicamente más barato)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">3.</span>
                <span>
                  <strong>Buscando promociones</strong> (algunos operadores
                  ofrecen descuentos)
                </span>
              </li>
            </ul>
            <p className="mt-4">
              Descubre{" "}
              <Link
                href="/blog/optimizar-potencia-contratada"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                cómo optimizar la potencia contratada
              </Link>{" "}
              para reducir este coste fijo, o solicita un{" "}
              <Link
                href="/estudio-factura-electrica"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                estudio de tu factura eléctrica
              </Link>{" "}
              sin compromiso.
            </p>
          </section>

          {/* Sección 3: Término de Consumo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">3.</span> Término de Consumo
            </h2>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              ¿Qué es?
            </h3>
            <p className="mt-3">
              El <strong>término de consumo</strong> es el coste de la energía
              que realmente consumes, medida en kWh (kilovatio-hora). Es el
              componente variable: consumir más = pagar más.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cálculo
            </h3>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                Término de Consumo = Consumo (kWh) x Tarifa (€/kWh)
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 300 kWh x 0,25 €/kWh ={" "}
                <strong>75 €</strong>
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Qué aparece en tu factura
            </h3>
            <p className="mt-3">Busca líneas como estas:</p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>&quot;Consumo periodo: 300 kWh&quot;</p>
              <p>&quot;Tarifa: 0,25 €/kWh&quot;</p>
              <p>&quot;Coste consumo: 75 €&quot;</p>
            </div>

            <p className="mt-4">
              Si tienes <strong>discriminación horaria</strong>, verás algo así:
            </p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>Consumo Punta: 50 kWh x 0,35 €/kWh = 17,50 €</p>
              <p>Consumo Llano: 100 kWh x 0,28 €/kWh = 28 €</p>
              <p>Consumo Valle: 150 kWh x 0,15 €/kWh = 22,50 €</p>
              <p className="mt-1 font-semibold">Total consumo: 68 €</p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Variaciones de tarifa
            </h3>
            <p className="mt-3">
              <strong>Si tienes PVPC</strong> (tarifa discriminada por horas):
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Horas punta: precio alto (18:00-22:00 típicamente)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Horas llano: precio medio (08:00-18:00, 22:00-24:00)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Horas valle: precio bajo (00:00-08:00)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Cambios diarios según mercado mayorista</span>
              </li>
            </ul>

            <p className="mt-4">
              <strong>Si tienes tarifa de mercado libre:</strong>
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Precio fijo: igual todos los meses (si contrato fijo)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Precio variable: cambia mensualmente (si contrato variable)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Bonificación: restada en primera factura</span>
              </li>
            </ul>

            <p className="mt-4">
              Para encontrar la tarifa que mejor se adapta a ti, consulta
              nuestra{" "}
              <Link
                href="/blog/comparativa-tarifas-luz"
                className="font-medium text-[#f97316] underline hover:text-orange-600"
              >
                comparativa de tarifas de luz
              </Link>
              .
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cálculo de consumo real
            </h3>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                Consumo (kWh) = Lectura actual - Lectura anterior
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 5.300 kWh - 5.000 kWh ={" "}
                <strong>300 kWh</strong>
              </p>
            </div>
            <p className="mt-3">
              Si los días de facturación difieren de los días reales del mes, se
              aplica un ajuste proporcional:
            </p>
            <div className="mt-2 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                Consumo ajustado = (Lectura actual - Lectura anterior) x
                (Días_facturación / Días_reales)
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 300 x (31/30) ={" "}
                <strong>310 kWh</strong>
              </p>
            </div>
          </section>

          {/* Sección 4: Impuestos y Peajes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">4.</span> Impuestos y Peajes
            </h2>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Peaje de Acceso a la Red (PAR)
            </h3>
            <p className="mt-3">
              Es un cargo por acceso a las infraestructuras de distribución,
              regulado por la CNMC. Incluye mantenimiento de la red eléctrica,
              servicio técnico de la distribuidora y operaciones de la red.
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                PAR = Consumo (kWh) x Tarifa PAR (€/kWh)
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 300 kWh x 0,08 €/kWh ={" "}
                <strong>24 €</strong>
              </p>
            </div>
            <p className="mt-3">
              El PAR representa entre el 20-25% de la factura total. Varía por
              distribuidora (no por compañía comercializadora).
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Impuesto sobre Electricidad
            </h3>
            <p className="mt-3">
              Impuesto especial sobre producción y distribución de electricidad,
              regulado por Hacienda. La tasa en 2026 es del{" "}
              <strong>5,11269632%</strong>.
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                Impuesto = (Potencia + Consumo + PAR) x 5,11%
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> (86 € + 75 € + 24 €) x 5,11% ={" "}
                <strong>9,45 €</strong>
              </p>
            </div>
            <p className="mt-3">
              Este impuesto se calcula sobre todos los demás conceptos.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              IVA
            </h3>
            <p className="mt-3">
              Impuesto sobre el Valor Añadido. El tipo estándar es del{" "}
              <strong>21%</strong> en energía (en algunos casos especiales, 4%).
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-mono text-sm">
                IVA = (Potencia + Consumo + PAR + Impuesto Electricidad) x 21%
              </p>
              <p className="mt-3 font-mono text-sm">
                <strong>Ejemplo:</strong> 194,45 € x 21% ={" "}
                <strong>40,83 €</strong>
              </p>
              <p className="mt-1 font-mono text-sm font-semibold">
                Total final: 235,28 €
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Cargos por servicios especiales
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Lectura de contador:</strong> gratuita (incluida en
                  PAR)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Reclamación:</strong> gratuita (obligatorio por
                  regulador)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Cambio de contrato:</strong> gratuito (legalmente)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Reparación de conexión:</strong> puede cobrarse si es
                  por negligencia del cliente
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              Raramente aparecen en una factura residencial.
            </p>
          </section>

          {/* Sección 5: Conceptos Especiales */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">5.</span> Conceptos Especiales
            </h2>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Bonificaciones y descuentos
            </h3>
            <p className="mt-3">
              Son reducciones en precio que ofrece la comercializadora (nueva
              cliente, fidelización, etc.). Aparecen en tu factura así:
            </p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>&quot;Bonificación bienvenida: -120 €&quot;</p>
              <p>&quot;Descuento fidelización: -25 €&quot;</p>
              <p>&quot;Total reducciones: -145 €&quot;</p>
            </div>
            <p className="mt-3">
              Aplican típicamente al consumo, raramente a la potencia, y a veces
              al total. La bonificación de bienvenida suele aplicarse en la
              primera factura, mientras que los descuentos periódicos duran
              mientras la permanencia o promoción esté activa.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Lectura real vs. estimada
            </h3>
            <p className="mt-3">
              <strong>Lectura Real (LR):</strong> un personal o técnico de la
              compañía lee el contador. Resultado exacto. Ocurre cada 2-3 meses
              típicamente. Marcado como &quot;LR&quot; en la factura.
            </p>
            <p className="mt-3">
              <strong>Lectura Estimada (LE):</strong> la compañía estima tu
              consumo basándose en el histórico. No es lectura real. Ocurre en
              meses intermedios. Marcado como &quot;LE&quot; en la factura. Se
              ajusta cuando llega la lectura real.
            </p>
            <p className="mt-3">
              Si la lectura estimada es incorrecta, se ajusta después. No
              significa que vayas a pagar de más permanentemente: es un
              mecanismo de facturación fluida.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Período de facturación
            </h3>
            <p className="mt-3">En tu factura verás algo como:</p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>&quot;Período facturado: 01/02/2026 a 28/02/2026&quot;</p>
              <p>&quot;Días de facturación: 28 días&quot;</p>
            </div>
            <p className="mt-3">
              Los meses con 31 días tendrán una factura de potencia ligeramente
              más alta, y los de 28 días ligeramente más baja. Es una variación
              normal y esperada.
            </p>
          </section>

          {/* Sección 6: Ejemplo Real Desglosado */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">6.</span> Ejemplo Real
              Desglosado
            </h2>
            <p className="mt-4">
              Te mostramos una factura real típica completamente desglosada para
              una vivienda tipo:
            </p>

            <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <p className="font-semibold text-gray-900">
                Datos generales:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Período: 01/02/2026 a 28/02/2026 (28 días)</li>
                <li>Consumo período: 250 kWh</li>
                <li>Potencia contratada: 5,75 kW</li>
                <li>Lectura anterior: 12.400 kWh — Lectura actual: 12.650 kWh</li>
              </ul>
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">
                      Concepto
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Cálculo
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Importe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">Término de Potencia</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      5,75 kW x 0,50 €/kW/día x 28 días
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      80,50 €
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Término de Consumo</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      250 kWh x 0,25 €/kWh
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      62,50 €
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Peaje Acceso Red (PAR)</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      250 kWh x 0,08 €/kWh
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      20,00 €
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-semibold" colSpan={2}>
                      Subtotal (antes de impuestos)
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      163,00 €
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Impuesto Electricidad</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      163,00 € x 5,11%
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      8,33 €
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">IVA (21%)</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      171,33 € x 21%
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      35,98 €
                    </td>
                  </tr>
                  <tr className="bg-[#f97316] text-white">
                    <td className="px-4 py-3 font-bold" colSpan={2}>
                      TOTAL A PAGAR
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      207,31 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Desglose por componente (% del total)
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-orange-100 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-[#f97316]">38,8%</p>
                <p className="mt-1 text-xs text-gray-600">Potencia (80,50 €)</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-[#f97316]">30,2%</p>
                <p className="mt-1 text-xs text-gray-600">
                  Consumo (62,50 €)
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-[#f97316]">16,5%</p>
                <p className="mt-1 text-xs text-gray-600">
                  Impuestos/peajes (34,31 €)
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4 text-center">
                <p className="text-2xl font-bold text-[#f97316]">17,3%</p>
                <p className="mt-1 text-xs text-gray-600">IVA (35,98 €)</p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Explicación línea por línea
            </h3>
            <ul className="mt-3 space-y-3">
              <li>
                <strong>Potencia (80,50 €):</strong> lo que pagas por el derecho
                a tener electricidad disponible. Es fijo independientemente del
                uso. El siguiente mes será similar (a menos que cambies
                potencia).
              </li>
              <li>
                <strong>Consumo (62,50 €):</strong> lo que realmente usaste (250
                kWh). Es la principal variable: si usas menos, baja.
              </li>
              <li>
                <strong>Peajes (20,00 €):</strong> por mantenimiento de la red.
                Calculado sobre consumo. Va a la distribuidora, no a la
                comercializadora.
              </li>
              <li>
                <strong>Impuestos (8,33 €):</strong> obligatorio, porcentaje
                fijo. Va a Hacienda, no es culpa de la compañía.
              </li>
              <li>
                <strong>IVA (35,98 €):</strong> impuesto sobre todo lo demás.
                Legalmente obligatorio.
              </li>
              <li>
                <strong>Total (207,31 €):</strong> lo que pagas. Vencimiento
                típico: 20-25 días después de la fecha de factura.
              </li>
            </ul>
          </section>

          {/* Sección 7: Errores Comunes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="text-[#f97316]">7.</span> Errores Comunes en
              Facturas
            </h2>

            <div className="mt-4 space-y-5">
              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 1: Confundir potencia con consumo
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;Mi
                  factura dice 5,75 kW, así que consumo 5,75 kWh/día&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> 5,75 kW es
                  potencia (límite). Consumo real está en kWh medido.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 2: Creer que lectura estimada es definitiva
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;Me
                  facturaron 250 kWh estimados, así que es lo que consumí&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> La lectura
                  estimada se ajusta con la lectura real posterior.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 3: No distinguir distribuidora de comercializadora
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;Voy a
                  cambiar de Endesa para pagar menos PAR&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> El PAR es de
                  la distribuidora (no cambia con la comercializadora). Cambias
                  de comercializadora para ahorrar en tarifa y potencia.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 4: Pensar que los impuestos son abusivos
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;30 €
                  de impuestos en factura de 200 €! Esto es abuso&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> Los
                  impuestos (5,11% + IVA 21%) son legales y obligatorios. Todos
                  pagamos igual.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 5: Confundir IVA diferente
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;Otros
                  pagan 4% IVA, yo 21%&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> El IVA del
                  4% es para casos especiales (pobreza energética). El IVA
                  normal es 21%.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="font-semibold text-gray-900">
                  Error 6: Asumir error sin verificar
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-red-600">Incorrecto:</span> &quot;Consumí
                  mucho este mes, algo falla&quot;
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-green-600">Correcto:</span> Verifica si
                  hubo cambio de climatización, visitas, electrodoméstico nuevo.
                  Aprende{" "}
                  <Link
                    href="/blog/como-calcular-consumo-electrico"
                    className="font-medium text-[#f97316] underline hover:text-orange-600"
                  >
                    cómo calcular tu consumo eléctrico
                  </Link>{" "}
                  para verificar tu factura.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 8: Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: Entiende tu Factura
            </h2>
            <p className="mt-4">
              Entender tu factura es el primer paso para ahorrar. Una factura
              típica tiene:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>38% Potencia:</strong> puedes ahorrar optimizando
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>30% Consumo:</strong> puedes ahorrar cambiando hábitos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>16% Impuestos/peajes:</strong> fijos, no se pueden
                  cambiar
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>17% IVA:</strong> fijo, obligatorio
                </span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Checklist de revisión
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿La potencia contratada es la que necesito?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿Mi tarifa es la mejor disponible?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿El consumo es razonable vs. histórico?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿La lectura es real o estimada?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿Hay bonificaciones aplicadas?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">&#10003;</span>
                <span>¿Los impuestos y el IVA son correctos?</span>
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
              ¿Quieres que analicemos tu factura gratis?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy analizamos tu factura eléctrica, detectamos errores y
              te recomendamos la mejor tarifa para tu caso. Más de 15.000
              facturas analizadas. Gratis y sin compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/estudio-factura-electrica"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Analizar mi factura gratis →
              </Link>
              <Link
                href="/contacto"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Contactar con un asesor
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
                href="/optimizacion-potencia"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Optimización de potencia
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
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
