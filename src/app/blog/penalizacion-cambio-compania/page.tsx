import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Penalización Cambio Compañía Eléctrica ¿Es Legal? [2026] - Vitergy",
  description:
    "¿Es legal cobrar penalización por cambiar de compañía eléctrica? Cómo calcularla, reclamar y conocer tus derechos. Guía completa del consumidor.",
  alternates: {
    canonical: "https://vitergy.es/blog/penalizacion-cambio-compania",
  },
};

const faqs = [
  {
    question: "¿Puedo cambiar de compañía si tengo deuda?",
    answer:
      "Técnicamente sí, pero complicado. La deuda es independiente del cambio, pero la compañía anterior puede bloquear el cambio administrativo. La solución es pagar la deuda pendiente primero y luego cambiar sin problemas.",
  },
  {
    question: "¿Qué pasa si la penalización es mayor que el ahorro?",
    answer:
      "Depende del análisis costo-beneficio. Solo cambia si el ahorro supera la penalización en el período donde permanecerás. Por ejemplo, si la penalización es 150€ y el ahorro anual es 100€, amortizas en 1,5 años.",
  },
  {
    question: "¿Puedo negociar la penalización?",
    answer:
      "Sí, a menudo funciona. El 30-50% de las compañías reducen o eliminan la penalización si lo solicitas antes de cambiar formalmente. La tasa de éxito es del 40-50%.",
  },
  {
    question: "¿La penalización aparece en factura o separada?",
    answer:
      "Depende de la compañía, pero típicamente aparece separada. Puede aparecer en la factura final como 'Penalización por rescisión', en la factura siguiente como 'Cargo adicional', o en un email separado con justificante.",
  },
  {
    question:
      "¿Puedo reclamar a CNMC sin intentar resolver con compañía?",
    answer:
      "Técnicamente sí, pero CNMC lo desaconseja. El procedimiento correcto es intentar resolver con la compañía primero (10-30 días), y si rechaza o no responde, recurrir a CNMC. El proceso se acelera si documentas el intento previo.",
  },
  {
    question:
      "¿Pueden cobrarme penalización si cambio a otro grupo (mismo grupo)?",
    answer:
      "Depende del contrato. En cambios de comercializadora dentro del mismo grupo, algunos contratos aplican penalización y otros no. En cambios de tarifa sin cambio de compañía, normalmente no hay penalización.",
  },
  {
    question: "¿Qué tiempo tengo para recurrir una penalización?",
    answer:
      "El plazo de prescripción es de 3 años según el Código Civil, pero se recomienda reclamar antes de 2 años. Cuanto antes reclames, mejor, ya que con el tiempo se pierde evidencia.",
  },
  {
    question: "¿Puedo recuperar penalización cobrada?",
    answer:
      "Sí, en muchos casos. Si la penalización está mal calculada, la tasa de éxito es del 80%. Si es abusiva, del 60-70%. El procedimiento es reclamar a la compañía y, si niega, recurrir a CNMC.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Penalización por Cambiar de Compañía Eléctrica: ¿Es Legal?",
    description:
      "¿Es legal cobrar penalización por cambiar de compañía eléctrica? Cómo calcularla, reclamar y conocer tus derechos.",
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
      "https://vitergy.es/blog/penalizacion-cambio-compania",
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

export default function PenalizacionCambioCompaniaPage() {
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
            Penalización por Cambiar de Compañía Eléctrica:{" "}
            <span className="text-[#f97316]">¿Es Legal?</span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            Las penalizaciones por cambio de compañía eléctrica son{" "}
            <strong>legales en ciertos casos</strong>, pero están{" "}
            <strong>fuertemente limitadas</strong> por la normativa española y
            europea. Si estás pensando en dar el paso, consulta nuestra guía
            sobre{" "}
            <Link
              href="/blog/como-cambiar-compania-luz"
              className="text-[#f97316] underline hover:text-orange-600"
            >
              cómo cambiar de compañía de luz
            </Link>{" "}
            para conocer el proceso completo.
          </p>
          <p>
            En esta guía te explicamos cuándo pueden cobrarte penalización,
            cómo calcularla, cómo reclamar si es abusiva y cuáles son tus
            derechos como consumidor. Todo con ejemplos prácticos y la
            experiencia de más de 5.000 clientes asesorados en Vitergy.
          </p>

          {/* Sección 1: Legalidad de Penalizaciones */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Legalidad de las penalizaciones
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Marco legal actual
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="font-semibold text-gray-900">
                  Real Decreto 3/2013 (Libertad de Cambio)
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Establece derecho fundamental a cambiar de compañía</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Proceso máximo 15 días</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Penalizaciones solo permitidas en circunstancias específicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Deben ser proporcionales y razonables</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Directiva UE 2019/944
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Armoniza derechos de consumidores europeos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Limita penalizaciones abusivas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Prohíbe cargos por cambio en sí (solo penalizaciones contractuales)</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Normativa CNMC (Regulador español)
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Supervisa cumplimiento de normativa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Investiga reclamaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#f97316]">•</span>
                    <span>Sanciona compañías con prácticas abusivas</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Principios legales clave
            </h3>

            <div className="mt-4">
              <p className="font-semibold text-gray-900">
                Las penalizaciones DEBEN ser:
              </p>
              <ol className="mt-2 space-y-1 list-decimal list-inside">
                <li>
                  <strong>Explícitas en contrato:</strong> claramente expresadas
                  antes de firmar
                </li>
                <li>
                  <strong>Proporcionales:</strong> no pueden ser
                  desproporcionadas al daño
                </li>
                <li>
                  <strong>Razonables:</strong> limitadas a costes reales de
                  rescisión
                </li>
                <li>
                  <strong>No abusivas:</strong> CNMC puede declararlas abusivas
                </li>
              </ol>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-900">
                Penalizaciones PROHIBIDAS:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>Por simple cambio de compañía (sin otra causa)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>
                    Por &quot;gestión del cambio&quot; (coste debe ser cero)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>Cantidades genéricas sin justificación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#f97316]">•</span>
                  <span>
                    Cobro de penalización NO especificada en contrato
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Sección 2: Cuándo Aplican Penalizaciones */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Cuándo aplican penalizaciones
            </h2>
            <p className="mt-4">
              No todas las situaciones de cambio generan penalización. Aquí
              están las casuísticas reales.
            </p>

            {/* CASO 1 */}
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Contrato SIN permanencia
              </h3>
              <p className="mt-1 text-lg font-bold text-green-700">
                Penalización: CERO
              </p>
              <p className="mt-2">
                Si tu contrato dice &quot;sin permanencia&quot; o
                &quot;flexible&quot;, puedes cambiar cuando quieras con cero
                cargos. Aviso recomendado: 30 días. Siempre pregunta
                &quot;¿qué permanencia tiene este contrato?&quot; antes de
                firmar. Muchas ofertas ahora son sin permanencia.
              </p>
            </div>

            {/* CASO 2 */}
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Permanencia VENCIDA
              </h3>
              <p className="mt-1 text-lg font-bold text-green-700">
                Penalización: CERO
              </p>
              <p className="mt-2">
                Si tu contrato tenía permanencia pero ya pasó ese período, eres
                libre de cambiar sin coste. Aplica incluso si sigues con la
                misma compañía. Por ejemplo: firma en enero 2024 con 24 meses
                de permanencia, fin en enero 2026. Si hoy es marzo 2026, puedes
                cambiar gratis.
              </p>
              <p className="mt-2">
                <strong>Cómo verificar:</strong> busca en tu contrato el tipo
                de permanencia (12, 24 o 36 meses) y la fecha de firma. Suma
                los meses para obtener la fecha de fin. Si hoy es posterior,
                cambio gratis. En caso de duda, contacta a tu compañía y pide
                confirmación escrita por email.
              </p>
            </div>

            {/* CASO 3 */}
            <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Permanencia NO vencida
              </h3>
              <p className="mt-1 text-lg font-bold text-[#f97316]">
                Penalización: SÍ aplica (típicamente 50-150 EUR)
              </p>
              <p className="mt-2">
                Si tu contrato especifica permanencia y cambias antes de que
                venza, la compañía cobra penalización. La fórmula típica es:
              </p>
              <div className="mt-2 rounded-lg bg-white p-3 font-mono text-sm">
                Penalización = Cuota fija mensual x Meses restantes
                <br />
                <br />
                Ejemplo: Cuota 10 EUR/mes, restan 9 meses
                <br />
                Penalización = 10 EUR x 9 = 90 EUR
              </div>
              <p className="mt-2">
                <strong>Verificación:</strong> localiza tu contrato, busca las
                cláusulas &quot;penalización&quot;, &quot;rescisión&quot; o
                &quot;indemnización&quot;, verifica la base de cálculo y calcula
                los meses exactos restantes.
              </p>
            </div>

            {/* CASO 4 */}
            <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Incumplimiento de aviso previo
              </h3>
              <p className="mt-1 text-lg font-bold text-[#f97316]">
                Penalización: probable (típicamente 25-50 EUR)
              </p>
              <p className="mt-2">
                Si tu contrato requiere aviso previo de 30 días y das aviso con
                menos días, la compañía puede cobrar por aviso insuficiente.
                Para evitarlo, revisa tu contrato ahora, da aviso con el plazo
                requerido y conserva prueba escrita (email con timestamp).
              </p>
              <p className="mt-2">
                <strong>Nota:</strong> muchas compañías NO aplican penalización
                por aviso insuficiente. Es ocasional.
              </p>
            </div>

            {/* CASO 5 */}
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Saldo pendiente (facturas impagadas)
              </h3>
              <p className="mt-1 text-lg font-bold text-gray-700">
                No es penalización, pero bloquea el cambio
              </p>
              <p className="mt-2">
                Si tienes facturas impagadas, la compañía anterior puede
                bloquear el cambio administrativo y la distribuidora no avanza
                sin resolución. La solución es pagar la deuda pendiente y
                entonces solicitar el cambio. Importante: la deuda sigue siendo
                tuya, cambiar no la extingue.
              </p>
            </div>

            {/* CASO 6 */}
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Incumplimiento de la compañía
              </h3>
              <p className="mt-1 text-lg font-bold text-green-700">
                Penalización: CERO (puedes cambiar sin coste)
              </p>
              <p className="mt-2">
                Si la compañía incumple el contrato (facturación incorrecta,
                cobros indebidos, cambio unilateral de tarifa, mala calidad de
                servicio), tienes derecho a rescindir sin penalización.
                Documenta el incumplimiento con emails, capturas y facturas.
                Envía reclamación formal, espera 30 días y solicita el cambio
                citando incumplimiento.
              </p>
            </div>

            {/* CASO 7 */}
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Cambio dentro del período de reflexión (14 días)
              </h3>
              <p className="mt-1 text-lg font-bold text-green-700">
                Penalización: CERO
              </p>
              <p className="mt-2">
                Tienes 14 días para cambiar de idea tras firmar un contrato
                (derecho de desistimiento, Directiva UE). El período corre
                desde la firma del contrato o la recepción del documento si es
                online. Simplemente contacta: &quot;Quiero ejercer mi derecho
                de desistimiento&quot;. Cero cargos.
              </p>
              <p className="mt-2">
                <strong>Nota:</strong> después de 14 días, aplican las normas
                normales (permanencia, etc.).
              </p>
            </div>
          </section>

          {/* Sección 3: Cómo Calcular */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Cómo calcular una penalización
            </h2>
            <p className="mt-4">
              Si aplica penalización, sigue estos pasos para calcularla
              correctamente.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Paso 1: Localiza el contrato
            </h3>
            <p className="mt-2">
              Busca en el email original de firma, en el área de cliente de la
              web de tu compañía o llama para solicitar una copia. Busca las
              cláusulas &quot;penalización por rescisión&quot;,
              &quot;indemnización por incumplimiento&quot;,
              &quot;permanencia&quot; o &quot;aviso previo&quot;.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Paso 2: Identifica la base de cálculo
            </h3>
            <div className="mt-2 space-y-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-semibold">
                  Opción A (más común): Cuota mensual x Meses restantes
                </p>
                <div className="mt-2 font-mono text-sm">
                  Contrato: permanencia 24 meses, cuota 12 EUR/mes
                  <br />
                  Firmaste: enero 2025
                  <br />
                  Cambias ahora: septiembre 2025 (8 meses)
                  <br />
                  Meses restantes: 24 - 8 = 16 meses
                  <br />
                  Penalización: 12 EUR x 16 = 192 EUR
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-semibold">
                  Opción B (menos común): 50% del total contrato restante
                </p>
                <p className="mt-2 text-sm">
                  Cálculo más complejo que requiere conocer el consumo
                  estimado, la tarifa contratada y los meses restantes:
                  [consumo x tarifa x meses] x 50%.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-semibold">
                  Opción C (rara): Cantidad fija
                </p>
                <p className="mt-2 text-sm">
                  Penalización fija (p.ej. 100 EUR) independiente de los meses
                  o del consumo.
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Paso 3: Verifica la permanencia exacta
            </h3>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              Meses totales permanencia (del contrato): X
              <br />
              Meses transcurridos (hoy - fecha firma): Y
              <br />
              Meses restantes: X - Y
              <br />
              <br />
              Ejemplo:
              <br />
              Permanencia: 24 meses
              <br />
              Fecha firma: 15/01/2025
              <br />
              Hoy: 15/09/2025
              <br />
              Meses transcurridos: 8
              <br />
              Meses restantes: 24 - 8 = 16 meses
              <br />
              Penalización: Cuota x 16
            </div>
            <p className="mt-2">
              Si hoy es posterior a la fecha de firma + meses de permanencia, el
              cambio es gratis.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Paso 4: Aplica la fórmula
            </h3>
            <p className="mt-2">
              Una vez tienes la base de cálculo, la cuota mensual (si aplica) y
              los meses restantes, calcula la penalización según la fórmula de
              tu contrato. Guarda el resultado y compáralo con lo que te cobra
              la compañía. Si no coincide, reclama.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Paso 5: Verifica la razonabilidad
            </h3>
            <p className="mt-2">
              Aunque el cálculo sea correcto según contrato, la penalización
              podría ser <strong>abusiva</strong> si:
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Es desproporcionadamente alta: mayor al 50% del contrato
                  restante, mayor a 300 EUR sin motivo, o mayor al 10% del
                  consumo anual
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  No está justificada: sin causa real o la compañía no sufre
                  daño por el cambio
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Supera los límites del mercado: lo típico es 50-150 EUR. Si
                  tienes 300 EUR+ sin causa, es posible abuso
                </span>
              </li>
            </ul>
            <p className="mt-3">
              Si es abusiva: documenta el cálculo, envía reclamación a CNMC
              citando el exceso y la desproporción. CNMC investigará. Para
              valorar si la penalización compensa frente a las ofertas del
              mercado, consulta nuestro{" "}
              <Link
                href="/comparador-tarifas-luz"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                comparador de tarifas de luz
              </Link>
              .
            </p>
          </section>

          {/* Sección 4: Cómo Reclamar */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Cómo reclamar una penalización
            </h2>
            <p className="mt-4">
              Si crees que la penalización es injusta, aquí está el proceso de
              reclamación.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Penalización calculada incorrectamente
            </h3>

            <ol className="mt-4 space-y-4">
              <li>
                <p className="font-semibold text-gray-900">
                  1. Solicita desglose a la compañía
                </p>
                <p className="mt-1">
                  Envía un email con asunto &quot;Solicitud desglose
                  penalización cambio&quot; preguntando cómo han calculado la
                  penalización. Conserva la respuesta.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  2. Verifica el cálculo
                </p>
                <p className="mt-1">
                  Compara la fórmula del contrato con su cálculo. Si no
                  coincide, prepara la reclamación.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  3. Envía email de reclamación
                </p>
                <p className="mt-1">
                  Incluye tu número de cliente, CUPS, fecha de solicitud de
                  cambio, penalización cobrada, tu cálculo correcto según
                  contrato y la diferencia. Solicita la devolución del
                  sobrecobro y confirmación escrita.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  4. Espera respuesta
                </p>
                <p className="mt-1">
                  La compañía debe responder en máximo 30 días. Si reconoce el
                  error, devolución en 15 días. Si niega, procede con
                  reclamación a CNMC.
                </p>
              </li>
            </ol>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Penalización abusiva (desproporcionada)
            </h3>

            <ol className="mt-4 space-y-4">
              <li>
                <p className="font-semibold text-gray-900">
                  1. Documenta la abusividad
                </p>
                <p className="mt-1">
                  Crea un documento con el contrato (página de penalización), tu
                  cálculo, una comparativa con el mercado (penalizaciones
                  típicas 50-150 EUR) y argumentos de desproporción.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  2. Envía reclamación formal a la compañía
                </p>
                <p className="mt-1">
                  Email con documento adjunto, asunto &quot;RECLAMACIÓN -
                  Penalización abusiva por cambio&quot;. Pide respuesta en 10
                  días.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900">
                  3. Si rechaza: recurre a CNMC
                </p>
                <p className="mt-1">
                  Accede a www.cnmc.es, sección &quot;Reclamaciones&quot;.
                  Adjunta contrato, tu cálculo y la respuesta de la compañía (si
                  la hay). CNMC investigará gratis.
                </p>
              </li>
            </ol>
          </section>

          {/* Sección 5: Derechos del Consumidor */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Derechos del consumidor
            </h2>
            <p className="mt-4">
              La normativa española y europea te protege como consumidor. Conoce
              tus derechos.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Libertad de cambio (fundamental)
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  RD 3/2013 | Directiva UE 2019/944
                </p>
                <p className="mt-2">
                  Tienes derecho a cambiar de compañía en cualquier momento.
                  Proceso máximo 15 días, suministro sin interrupción, cero
                  cargos por el cambio en sí. La compañía anterior no puede
                  obstaculizar. Puedes cambiar aunque haya permanencia (pero
                  pagando penalización si aplica).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Información clara (antes de firmar)
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ley 34/1988 Publicidad | LSSI-CE
                </p>
                <p className="mt-2">
                  La compañía debe informarte claramente de la permanencia, la
                  penalización exacta y cómo se calcula, la cuota mensual, la
                  tarifa, los avisos requeridos y cualquier restricción. Si no
                  está claro, puedes reclamar que las cláusulas son ilegales.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Protección contra cláusulas abusivas
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ley 3/1991 Competencia Desleal | Código Civil
                </p>
                <p className="mt-2">
                  Las cláusulas abusivas son nulas aunque las hayas firmado.
                  Ejemplos: penalización mayor al 50% del contrato restante sin
                  justificación, cuota fija excesivamente alta, cambio
                  unilateral de tarifa sin límites, aviso previo mayor de 30
                  días, renovaciones automáticas indefinidas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Respuesta en plazo máximo (30 días)
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ley Consumidores y Usuarios | Código Civil
                </p>
                <p className="mt-2">
                  La compañía debe responder reclamaciones en máximo 30 días.
                  Envía reclamación formal (email con copia o burofax). Si no
                  responde, puedes recurrir a CNMC. Conserva el email de envío
                  con timestamp y la respuesta recibida.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recurrir a CNMC (gratis)
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ley 3/2013 | Regulación energética
                </p>
                <p className="mt-2">
                  Puedes recurrir al regulador español (CNMC) sin coste. Primero
                  intenta resolver con la compañía. Si no se resuelve, recurre a
                  CNMC. Puede ordenar devolución + multa a la compañía. Resuelve
                  típicamente en 2-3 meses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Período de reflexión (14 días)
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Directiva UE 2011/83/UE | Ley Consumidores
                </p>
                <p className="mt-2">
                  Tienes 14 días para cambiar de idea tras firmar contrato.
                  Rescisión libre de cargos. Contacta a la compañía: &quot;Quiero
                  ejercer derecho de desistimiento de 14 días&quot;. Muy pocos
                  conocen este derecho, pero es muy útil si te arrepientes
                  rápido.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Asesoramiento legal gratuito
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ley Arbitraje Consumidor | Código Civil
                </p>
                <p className="mt-2">
                  Puedes solicitar asesoramiento legal de organismos de consumo:
                  OCU, oficinas municipales de consumo, asociaciones de
                  consumidores regionales y colegios de abogados (consulta
                  gratuita inicial). Muchas reclamaciones se resuelven con
                  asesor y el coste es típicamente cero.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 6: Casos Prácticos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Casos prácticos detallados
            </h2>
            <p className="mt-4">
              Situaciones reales y cómo se resuelven.
            </p>

            {/* Caso 1 */}
            <div className="mt-6 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Caso 1: Permanencia vencida
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong>Situación:</strong> Firmaste contrato el 15/01/2024 con
                  24 meses de permanencia. Hoy es 20/03/2026. La compañía cobra
                  100 EUR de penalización al cambiar.
                </p>
                <p>
                  <strong>Análisis:</strong> Fecha fin permanencia: 15/01/2024 +
                  24 meses = 15/01/2026. Hoy (20/03/2026) es posterior.
                  Permanencia VENCIDA. Penalización: CERO.
                </p>
                <p>
                  <strong>Acción:</strong> Email a compañía: &quot;Mi permanencia
                  venció el 15/01/2026. Solicito cambio sin penalización.&quot;
                </p>
                <p className="font-semibold text-green-700">
                  Resultado esperado: Cambio gratis.
                </p>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Caso 2: Incumplimiento de aviso previo
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong>Situación:</strong> Contrato dice &quot;Aviso previo: 30
                  días&quot;. Das aviso hoy. La compañía cobra 50 EUR por aviso
                  insuficiente.
                </p>
                <p>
                  <strong>Análisis:</strong> El contrato exige 30 días. Diste
                  aviso 0 días. La compañía tiene razón técnicamente.
                </p>
                <p>
                  <strong>Opciones:</strong> Pagar 50 EUR y cambiar, esperar 30
                  días y cambiar sin penalización, o reclamar a CNMC si la
                  penalización es desproporcionada.
                </p>
                <p className="font-semibold text-[#f97316]">
                  Recomendación Vitergy: Mejor esperar 30 días. En la práctica,
                  la compañía suele procesar el cambio sin castigo extra.
                </p>
              </div>
            </div>

            {/* Caso 3 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Caso 3: Penalización desproporcionada
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong>Situación:</strong> Contrato 24 meses, cuota 10
                  EUR/mes. Cambias en mes 12 (restan 12 meses). Cálculo
                  correcto: 10 EUR x 12 = 120 EUR. La compañía cobra: 300 EUR.
                </p>
                <p>
                  <strong>Análisis:</strong> Diferencia de 180 EUR, desproporción
                  de 2,5x. Es claramente abusiva.
                </p>
                <p>
                  <strong>Acción:</strong> Email a compañía. Si no corrige,
                  recurrir a CNMC. CNMC tipicamente considera abusivas las
                  penalizaciones superiores al 150% del valor correcto.
                </p>
                <p className="font-semibold text-green-700">
                  Resultado esperado: CNMC ordena devolución de exceso + multa a
                  la compañía.
                </p>
              </div>
            </div>

            {/* Caso 4 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Caso 4: Cambio dentro del período de reflexión
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong>Situación:</strong> Firmas contrato nuevo el viernes.
                  Cambias de opinión el lunes (3 días después). La compañía cobra
                  80 EUR de penalización.
                </p>
                <p>
                  <strong>Análisis:</strong> Dentro de los 14 días = derecho de
                  desistimiento. La compañía NO puede cobrar. El cobro es ILEGAL.
                </p>
                <p>
                  <strong>Acción:</strong> Email citando LSSI-CE y Directiva UE
                  2011/83. La compañía debe rectificar inmediatamente.
                </p>
                <p className="font-semibold text-green-700">
                  Resultado esperado: Cancelación sin cargos. Si insiste, CNMC
                  sanciona a la compañía.
                </p>
              </div>
            </div>

            {/* Caso 5 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Caso 5: Contrato &quot;sin permanencia&quot; (trampa)
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <strong>Situación:</strong> El comercial te vende: &quot;Sin
                  permanencia, cambias cuando quieras&quot;. El contrato dice:
                  &quot;Permanencia 24 meses&quot;. Cambias y la compañía cobra
                  200 EUR.
                </p>
                <p>
                  <strong>Análisis:</strong> Lo que dijo el comercial no es lo que
                  dice el contrato. El contrato es vinculante, pero el comercial
                  mintió (violación del deber de información).
                </p>
                <p>
                  <strong>Acción:</strong> Documenta lo que dijo el comercial.
                  Email a compañía citando falta de información clara y
                  publicidad engañosa. Si rechaza, recurrir a CNMC.
                </p>
                <p className="font-semibold text-green-700">
                  Resultado esperado: CNMC puede anular la permanencia o reducir
                  la penalización.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 7: Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: conoce tus derechos
            </h2>
            <p className="mt-4">
              Las penalizaciones son legales, pero{" "}
              <strong>fuertemente limitadas y reguladas</strong>. No dejes que
              una compañía te cobre injustificadamente. Antes de cambiar, te
              recomendamos consultar las{" "}
              <Link
                href="/blog/mejores-comercializadoras-espana"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                mejores comercializadoras de luz en España
              </Link>{" "}
              para encontrar la opción que mejor se adapte a tu perfil de
              consumo.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Checklist final
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Revisa tu contrato (permanencia, penalización, cuota)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Calcula meses restantes exactamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Aplica la fórmula correcta de penalización</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Verifica que la penalización sea proporcional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Si hay duda: solicita desglose a la compañía</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Si hay error: reclama inmediatamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Si la compañía rechaza: recurre a CNMC</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Recursos útiles
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>CNMC (Regulador):</strong> www.cnmc.es - Reclamaciones
                  gratis
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>OCU (Consumidores):</strong> www.ocu.org -
                  Asesoramiento legal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Defensoría Consumidor:</strong> en tu ayuntamiento
                  (gratis)
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
              ¿Te están cobrando una penalización injusta?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy analizamos tu caso, verificamos si la penalización es
              correcta y te ayudamos a reclamar si es abusiva. Gestionamos todo
              el proceso por ti. Gratis y sin compromiso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/penalizaciones-electricas"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Consultar penalizaciones
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
                href="/cambiar-compania-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cambiar de compañía de luz
              </Link>
              <Link
                href="/comparador-tarifas-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Comparador de tarifas de luz
              </Link>
              <Link
                href="/consultoria-energetica"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Consultoría energética
              </Link>
              <Link
                href="/blog/como-cambiar-compania-luz"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cómo cambiar de compañía de luz
              </Link>
              <Link
                href="/blog/mejores-comercializadoras-espana"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Mejores comercializadoras España
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
