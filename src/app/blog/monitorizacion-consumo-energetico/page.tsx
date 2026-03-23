import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Monitorización Consumo Energético: Guía Completa [Hogares + Empresas] - Vitergy",
  description:
    "Monitoriza tu consumo eléctrico en tiempo real. Dispositivos, software, beneficios y ROI. Descubre dónde se va tu dinero de energía.",
  alternates: {
    canonical: "https://vitergy.es/blog/monitorizacion-consumo-energetico",
  },
};

const faqs = [
  {
    question: "¿Necesito monitorización si ya tengo contador inteligente?",
    answer:
      "Depende. Si el contador inteligente te ofrece datos de consumo diario con una app intuitiva y coste cero, puede ser suficiente. Si quieres más detalle, como identificar aparatos específicos, datos cada 15 minutos y análisis avanzado, te recomendamos agregar un dispositivo IoT (~150€). Prueba primero con el contador inteligente y si necesitas más, invierte en un dispositivo.",
  },
  {
    question: "¿Cuánta reducción de consumo puedo esperar?",
    answer:
      "Típicamente entre un 10-30%. La reducción depende del consumo inicial, los cambios implementados y la disciplina del usuario. La monitorización y el cambio de comportamiento aportan un 5-10%, cambios de aparatos (LED, termostato) un 5-15%, y cambios grandes (solar, bomba de calor) un 30-80%.",
  },
  {
    question: "¿La privacidad es un riesgo con dispositivos IoT?",
    answer:
      "Existe riesgo, pero es manejable. Los riesgos reales incluyen datos de consumo en la nube y potencial acceso no autorizado (aunque raro). Para mitigarlo, elige marcas conocidas, cambia la contraseña predeterminada, usa una red WiFi segura y considera dispositivos locales sin nube. El riesgo es menor que el beneficio en ahorros.",
  },
  {
    question: "¿Monitorización funciona para negocios?",
    answer:
      "Sí, es muy recomendado. Los consumos mayores significan ahorros mayores, los equipos comerciales funcionan 24/7 (la optimización es muy rentable) y el ROI es típicamente menor a 2 años. La inversión recomendada es una auditoría profesional (800-1.500€) con retorno garantizado.",
  },
  {
    question: "¿Monitorización ayuda para autoconsumo solar?",
    answer:
      "Sí, mucho. Te permite ver la generación real (valida presupuestos), ver cuánto excedente viertes (optimiza tarifa) e identificar consumo no solarizado (mejora aprovechamiento). Por ejemplo, puedes desplazar consumo grande al horario de máxima generación solar y aprovechar un 80% de la generación frente al 60% sin monitorización.",
  },
  {
    question:
      "¿Qué errores comunes comete la gente con la monitorización energética?",
    answer:
      "Los errores más comunes son: comprar un dispositivo costoso sin analizar antes (empieza con el contador inteligente gratis), instalar monitorización pero no actuar sobre los datos, confundir potencia con consumo, y asumir que la monitorización reduce el consumo automáticamente. La monitorización informa, pero son los cambios concretos los que generan ahorros.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Monitorización del Consumo Energético: Guía para Empresas y Hogares",
    description:
      "Monitoriza tu consumo eléctrico en tiempo real. Dispositivos, software, beneficios y ROI. Descubre dónde se va tu dinero de energía.",
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
      "https://vitergy.es/blog/monitorizacion-consumo-energetico",
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

export default function MonitorizacionConsumoEnergeticoPage() {
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
            Monitorización del Consumo Energético:{" "}
            <span className="text-[#f97316]">
              Guía para Empresas y Hogares
            </span>
          </h1>
        </header>

        {/* Contenido */}
        <div className="mt-8 space-y-8 leading-7 text-gray-700">
          {/* Introducción */}
          <p className="text-lg">
            La <strong>monitorización del consumo energético</strong> es el
            proceso de medir, registrar y analizar tu consumo eléctrico (y
            otros combustibles) para entender patrones de uso y optimizar
            costes. Si aún no sabes cuánto consumes, te recomendamos empezar
            por{" "}
            <Link
              href="/blog/como-calcular-consumo-electrico"
              className="text-[#f97316] underline hover:text-orange-600"
            >
              cómo calcular tu consumo eléctrico
            </Link>
            .
          </p>
          <p>
            En esta guía te explicamos todo lo que necesitas saber: desde los
            niveles de monitorización y los dispositivos disponibles, hasta
            cómo interpretar los datos, calcular el ROI y ver casos de éxito
            reales en hogares y empresas.
          </p>

          {/* Tabla de Contenidos */}
          <nav className="rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">
              Tabla de contenidos
            </h2>
            <ol className="mt-4 space-y-2 text-sm font-medium text-[#f97316]">
              <li>1. Qué es monitorización energética</li>
              <li>2. Beneficios clave</li>
              <li>3. Dispositivos y herramientas</li>
              <li>4. Implementación paso a paso</li>
              <li>5. Análisis e interpretación de datos</li>
              <li>6. ROI y ahorro</li>
              <li>7. Casos de éxito</li>
              <li>8. Preguntas frecuentes</li>
            </ol>
          </nav>

          {/* Sección 1: Qué es Monitorización Energética */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Qué es monitorización energética
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Definición
            </h3>
            <p className="mt-3">
              La monitorización del consumo energético consiste en medir,
              registrar y analizar tu consumo eléctrico para entender patrones
              de uso y optimizar costes. Puede abarcar diferentes niveles de
              detalle:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo total vivienda/negocio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Consumo por circuito (horno, climatización, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  Consumo por aparato individual (frigorífico, lavadora, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>Consumo en tiempo real vs. histórico</span>
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Niveles de monitorización
            </h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Nivel 1: Básico (Contador Inteligente)
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Lees contador una vez, calculas consumo manualmente. Cero
                  dispositivos adicionales.{" "}
                  <strong className="text-[#f97316]">Coste: 0 €</strong>
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Nivel 2: Moderado (App Compañía)
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Tu compañía te ofrece una app donde ves consumo mensual/diario
                  y acceso web.{" "}
                  <strong className="text-[#f97316]">Coste: 0 €</strong>
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Nivel 3: Avanzado (Dispositivo Monitorización)
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Dispositivo que mide consumo en tiempo real, app en móvil con
                  datos instantáneos y alertas si consumes mucho.{" "}
                  <strong className="text-[#f97316]">Coste: 100-300 €</strong>
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Nivel 4: Profesional (Auditoría + Software)
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Medición en cada circuito, software de análisis avanzado y
                  recomendaciones de experto.{" "}
                  <strong className="text-[#f97316]">Coste: 500-2.000 €+</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2: Beneficios Clave */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Beneficios clave
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Identificar aparatos que gastan mucho
            </h3>
            <p className="mt-3">
              <strong>Problema típico:</strong> &quot;Mi factura es alta pero no
              sé por qué.&quot;
            </p>
            <p className="mt-2">
              Con la monitorización ves qué aparatos gastan más, identificas
              los culpables de alto consumo y priorizas mejoras. Por ejemplo:
              descubres que un frigorífico viejo consume el 40 % de tu factura,
              lo cambias a un modelo eficiente y ahorras 200 €/año.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Detección de anomalías
            </h3>
            <p className="mt-3">
              Ves exactamente cuándo subió el consumo y lo correlacionas con
              cambios (nuevo aparato, más personas, etc.). Detectas aparatos
              defectuosos como un frigorífico con fuga. Ejemplo: notas un pico
              de consumo nocturno, investigas y descubres el A/C encendido de
              noche por error de programación. Lo corriges y ahorras 50 €/mes.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Cambio de comportamiento
            </h3>
            <p className="mt-3">
              Ver el consumo en tiempo real incentiva a ahorrar. Estudios
              muestran una reducción del 5-15 % del consumo solo por ser
              consciente de los datos. Con datos de monitorización puedes
              ahorrar 50 €/mes simplemente por la consciencia que genera.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Optimización de tarifas
            </h3>
            <p className="mt-3">
              Si ves patrones de consumo, puedes optimizar tu tarifa. Aprende
              más en nuestra guía sobre{" "}
              <Link
                href="/blog/entender-factura-luz"
                className="text-[#f97316] underline hover:text-orange-600"
              >
                cómo entender tu factura de luz
              </Link>
              .
            </p>
            <p className="mt-2">
              <strong>Caso PVPC:</strong> ves horarios punta vs. valle,
              desplazas la lavadora a hora valle (23:00) y ahorras un 30 % en
              el coste de la lavadora.
            </p>
            <p className="mt-2">
              <strong>Caso mercado libre:</strong> ves si la potencia es
              suficiente, puedes bajarla si hay margen y ahorras 200-400 €/año.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Validación de auditoría
            </h3>
            <p className="mt-3">
              Mides antes de una mejora (baseline), mides después (validación
              del ahorro real) y documentas el ROI. Ejemplo: instalas paneles
              solares, la monitorización muestra un 65 % de reducción del
              consumo de red y validas que la amortización es correcta.
            </p>
          </section>

          {/* Sección 3: Dispositivos y Herramientas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Dispositivos y herramientas
            </h2>

            {/* Opción 1 */}
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Opción 1: Contador Inteligente (AMI)
            </h3>
            <p className="mt-3">
              Contador que comunica automáticamente datos a la distribuidora.
              Muchas distribuidoras españolas ya los instalan. Ofrece lectura
              automática cada 15 minutos, datos en portal web de la
              distribuidora/comercializadora, acceso a través de app oficial e
              instalación gratuita.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-800">
                  Ventajas
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>Coste cero</li>
                  <li>Instalación gratuita</li>
                  <li>Datos confiables</li>
                  <li>Acceso 24/7</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <h4 className="text-sm font-semibold text-red-800">
                  Limitaciones
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>No identifica aparatos específicos</li>
                  <li>Datos a veces con retraso de horas</li>
                  <li>Apps a veces poco intuitivas</li>
                  <li>Portales diferentes según distribuidora</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Cómo acceder:</strong> verifica si tienes contador
              inteligente (pregunta a tu distribuidora), accede al portal
              oficial, login con número de cliente + DNI, y navega a
              &quot;Consumo&quot; o &quot;Energía&quot;.
            </p>

            {/* Opción 2 */}
            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Opción 2: Dispositivos IoT de monitorización
            </h3>
            <p className="mt-3">
              Ejemplos: Emporia Vue (150-250 €), IotaWatt (200-300 €), Sense
              (300-400 €), Shelly EM (50-100 €). Ofrecen medición del consumo
              total en tiempo real, identificación parcial de aparatos (modelos
              avanzados), app móvil con gráficos, alertas de sobre-consumo y
              datos almacenados (histórico).
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-800">
                  Ventajas
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>Datos en tiempo real</li>
                  <li>App intuitiva</li>
                  <li>Análisis avanzado</li>
                  <li>Identificación de aparatos (modelos premium)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <h4 className="text-sm font-semibold text-red-800">
                  Limitaciones
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>Coste inicial (150-400 €)</li>
                  <li>Requiere WiFi estable</li>
                  <li>Mantenimiento (batería, actualizaciones)</li>
                  <li>Privacidad (datos en nube)</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Instalación:</strong> típicamente fácil (se conecta a
              circuito principal), algunos requieren electricista (15-30 €),
              conexión WiFi necesaria.{" "}
              <strong>ROI:</strong> típicamente 1-2 años si ahorras 100 €+/año.
            </p>

            {/* Opción 3 */}
            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Opción 3: Enchufes inteligentes
            </h3>
            <p className="mt-3">
              Enchufe que insertas en la toma de corriente y mide el consumo del
              aparato conectado. Marcas típicas: TP-Link, Meross, Shelly Plug.
              Coste: 15-40 € por unidad.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-800">
                  Ventajas
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>Muy bajo coste por unidad</li>
                  <li>Fácil instalación (solo enchufa)</li>
                  <li>Identifica aparato específico</li>
                  <li>Control remoto</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <h4 className="text-sm font-semibold text-red-800">
                  Limitaciones
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>Aparatos grandes no se pueden enchufar</li>
                  <li>Requiere toma de corriente libre</li>
                  <li>Requiere WiFi</li>
                  <li>Necesitas muchos para varios aparatos</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <strong>Mejor uso:</strong> monitorizar 3-5 aparatos clave
              (frigorífico, TV, climatizador portátil, etc.). Coste total:
              50-150 € (5-10 enchufes).
            </p>

            {/* Opción 4 */}
            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Opción 4: Software online (datos de factura)
            </h3>
            <p className="mt-3">
              Herramientas gratuitas como Excel personalizado, Google Sheets o
              apps de consumo. Introduces facturas mensuales, el software
              calcula tendencias y genera gráficos.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-800">
                  Ventajas
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>Coste cero</li>
                  <li>Control total</li>
                  <li>Funciona con datos de factura</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <h4 className="text-sm font-semibold text-red-800">
                  Limitaciones
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>Introduces datos manualmente</li>
                  <li>Resolución baja (solo mensual)</li>
                  <li>No es tiempo real</li>
                </ul>
              </div>
            </div>

            {/* Opción 5 */}
            <h3 className="mt-8 text-xl font-semibold text-gray-900">
              Opción 5: Auditoría profesional + sistema integrado
            </h3>
            <p className="mt-3">
              Incluye medición profesional del consumo, análisis por circuito,
              identificación de aparatos, software de monitorización integrado
              y recomendaciones personalizadas. Coste: 500-2.000 €+ según
              complejidad.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                <h4 className="text-sm font-semibold text-green-800">
                  Ventajas
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>Profesional (datos exactos)</li>
                  <li>Sistema integrado</li>
                  <li>Recomendaciones de experto</li>
                  <li>Documentación formal</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <h4 className="text-sm font-semibold text-red-800">
                  Limitaciones
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  <li>Coste alto</li>
                  <li>Mejor ROI para empresas (ahorros grandes)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sección 4: Implementación */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Implementación paso a paso
            </h2>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="pt-1 text-xl font-semibold text-gray-900">
                    Define objetivos
                  </h3>
                  <p className="mt-2">Pregúntate:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        ¿Qué quiero saber? (consumo total vs. aparatos
                        específicos)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>¿Presupuesto disponible? (0 € vs. 500 €+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>¿Nivel de detalle requerido?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        ¿Qué cambios planeo? (solar, caldera, etc.)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="pt-1 text-xl font-semibold text-gray-900">
                    Elige solución
                  </h3>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        <strong>Presupuesto 0 €:</strong> Contador inteligente
                        (acceso online a distribuidora)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        <strong>Presupuesto 50-150 €:</strong> Enchufes
                        inteligentes (5-10 aparatos)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        <strong>Presupuesto 150-400 €:</strong> Dispositivo IoT
                        monitorización total
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-[#f97316]">•</span>
                      <span>
                        <strong>Presupuesto 500 €+:</strong> Auditoría
                        profesional + sistema integrado
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="pt-1 text-xl font-semibold text-gray-900">
                    Instalación
                  </h3>
                  <p className="mt-2">
                    <strong>Contador inteligente:</strong> contacta a tu
                    distribuidora para verificar si lo tienes, si no lo tienes
                    solicita instalación (gratuita, 2-4 semanas) y accede al
                    portal con tus credenciales.
                  </p>
                  <p className="mt-2">
                    <strong>Dispositivo IoT:</strong> compra en Amazon o tienda
                    especializada, desempaqueta, conecta a WiFi, descarga la
                    app y sigue las instrucciones de inicio.
                  </p>
                  <p className="mt-2">
                    <strong>Enchufes inteligentes:</strong> compra enchufes,
                    descarga app de la marca, conecta cada enchufe a WiFi,
                    inserta en tomas de corriente y comienza la medición.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                  4
                </div>
                <div>
                  <h3 className="pt-1 text-xl font-semibold text-gray-900">
                    Aprendizaje de software
                  </h3>
                  <p className="mt-2">
                    Con el <strong>contador inteligente</strong>, navega al
                    portal de tu distribuidora, busca la sección
                    &quot;Consumo&quot; o &quot;Energía&quot; y explora los
                    gráficos disponibles (diario, horario, etc.). Con un{" "}
                    <strong>dispositivo IoT</strong>, instala la app del
                    fabricante, crea un usuario, vincula el dispositivo y
                    explora el Dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-bold text-white">
                  5
                </div>
                <div>
                  <h3 className="pt-1 text-xl font-semibold text-gray-900">
                    Definición de baseline
                  </h3>
                  <p className="mt-2">
                    El baseline es tu consumo actual sin cambios, que servirá
                    como referencia para comparar después. Recaba 2-4 semanas
                    de datos sin cambios, calcula el promedio (línea base),
                    documéntalo y úsalo como referencia para validar ahorros
                    futuros.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 5: Análisis e Interpretación */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Análisis e interpretación de datos
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Consumo diario promedio
            </h3>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>Consumo diario promedio = Total mes / 30 días</p>
              <p className="mt-1">Ejemplo: 300 kWh / 30 = 10 kWh/día</p>
            </div>
            <p className="mt-3">
              <strong>Interpretación:</strong> consumo típico vivienda: 8-15
              kWh/día. Si es mayor de 20 kWh/día: consumo alto. Si es menor de
              5 kWh/día: consumo bajo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Picos de consumo
            </h3>
            <p className="mt-3">Los picos típicos ocurren:</p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Mañana (6:00-9:00):</strong> ducha, desayuno,
                  preparación
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Mediodía (12:00-13:00):</strong> comida, lavadora
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-[#f97316]">•</span>
                <span>
                  <strong>Noche (19:00-23:00):</strong> cena, climatización,
                  TV, entretenimiento
                </span>
              </li>
            </ul>
            <p className="mt-2">
              Identifica tus horas punta, correlaciona con actividades y busca
              oportunidades para desplazar consumo a horas bajas.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Variabilidad estacional
            </h3>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>Verano: 8-12 kWh/día (sin calefacción, algo A/C)</p>
              <p>Invierno: 12-20 kWh/día (con calefacción)</p>
              <p>Primavera/otoño: 8-10 kWh/día (sin climatización)</p>
            </div>
            <p className="mt-3">
              Variaciones normales del 50-100 % entre estaciones. Si no hay
              estacionalidad, revisa los datos. Gran oportunidad: optimizar la
              climatización.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Crecimiento/decrecimiento
            </h3>
            <p className="mt-3">
              Si el consumo baja con el tiempo, tus cambios positivos funcionan.
              Si sube, puede ser un nuevo aparato, cambio de hábito o una
              anomalía.
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <p>
                Variación % = ((Mes nuevo - Mes anterior) / Mes anterior) x 100
              </p>
              <p className="mt-1">Ejemplo: ((330 - 300) / 300) x 100 = 10 % aumento</p>
            </div>
          </section>

          {/* Sección 6: ROI y Ahorro */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. ROI y ahorro
            </h2>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ahorro por tipo de mejora
            </h3>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Cambios sin inversión
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Optimizar temperatura (1 °C): 2-3 % = 40-60 €/año</li>
                  <li>Desplazar consumo (PVPC): 10-15 % = 200-300 €/año</li>
                  <li>Apagar standby: 5-10 % = 100-200 €/año</li>
                  <li>
                    <strong className="text-[#f97316]">
                      Ahorro total: 300-500 €/año (sin coste)
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Cambios bajo coste (&lt;100 €)
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>
                    Cambiar a LED: 50-100 € (ahorro 80-150 €/año, ROI 1 año)
                  </li>
                  <li>
                    Enchufes inteligentes: 50-150 € (ahorro 100-200 €/año, ROI
                    1-2 años)
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Cambios inversión media (1.000-5.000 €)
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>
                    Termostato programable: 300 € (ahorro 200-300 €/año, ROI
                    1-2 años)
                  </li>
                  <li>
                    Bomba calor: 3.000 € (ahorro 1.000-2.000 €/año, ROI 2-3
                    años)
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="font-semibold text-gray-900">
                  Cambios inversión alta (6.000 €+)
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>
                    Autoconsumo solar: 8.000 € (ahorro 1.200 €/año, ROI 6-8
                    años). Consulta nuestra{" "}
                    <Link
                      href="/blog/guia-autoconsumo-fotovoltaico"
                      className="text-[#f97316] underline hover:text-orange-600"
                    >
                      guía completa de autoconsumo fotovoltaico
                    </Link>
                    .
                  </li>
                  <li>
                    Aislamiento térmico: 5.000 € (ahorro 800 €/año, ROI 6-8
                    años)
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Ejemplo de ROI completo
            </h3>
            <p className="mt-3">
              <strong>Escenario:</strong> vivienda 150 m², consumo 4.500
              kWh/año, factura 1.000 €/año.
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  Mejora 1: Monitorización + cambios comportamiento
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 150 € (dispositivo IoT) | Ahorro: 450 €/año |
                  Amortización: 0,3 años | ROI 5 años: 1.650 € neto
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  Mejora 2: LED + optimizar temperatura
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 80 € | Ahorro: 200 €/año | Amortización: 0,4 años |
                  ROI 5 años: 920 € neto
                </p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  Mejora 3: Instalar paneles solares
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  Coste: 8.000 € | Ahorro: 1.200 €/año | Amortización: 6,7
                  años | ROI 20 años: 16.000 € neto
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-orange-50 p-4">
              <h4 className="font-semibold text-[#f97316]">
                Estrategia combinada
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>Total ahorro: 1.850 €/año (55 % reducción)</li>
                <li>Inversión total: 8.230 €</li>
                <li>Amortización: 4,4 años</li>
                <li>
                  <strong>ROI 20 años: 28.000 € neto</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* Sección 7: Casos de Éxito */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Casos de éxito
            </h2>

            {/* Caso 1 */}
            <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Caso 1: Comercio (Frutería)
              </h3>
              <p className="mt-3">
                <strong>Situación:</strong> consumo 15.000 kWh/año, factura
                3.500 €/año. Aparatos: frigoríficos, vitrinas, iluminación.
              </p>
              <p className="mt-2">
                <strong>Implementación:</strong> sistema de monitorización
                profesional (1.200 €). Análisis de 2 semanas: 5 frigoríficos
                viejos consumiendo el 60 % de la energía.
              </p>
              <p className="mt-2">
                <strong>Acciones:</strong> cambiar frigoríficos viejos por
                eficientes (5.000 €), LED en iluminación (800 €) y optimizar
                encendido/apagado (0 €).
              </p>
              <div className="mt-3 rounded-lg bg-green-50 p-3">
                <p className="text-sm font-semibold text-green-800">
                  Resultados: ahorro 40 % = 6.000 kWh/año | 1.400 €/año |
                  Amortización 4 años | ROI 10 años: 11.000 € neto
                </p>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Caso 2: Oficina (Consultora, 30 personas)
              </h3>
              <p className="mt-3">
                <strong>Situación:</strong> consumo 80.000 kWh/año, factura
                16.000 €/año. Problemas: A/C encendido noches, iluminación
                excesiva.
              </p>
              <p className="mt-2">
                <strong>Implementación:</strong> auditoría profesional (2.000 €)
                + sistema monitorización avanzado (3.000 €). Identificó: 40 %
                del consumo es climatización innecesaria.
              </p>
              <p className="mt-2">
                <strong>Acciones:</strong> termostato programable inteligente
                (1.500 €), iluminación LED + sensores movimiento (3.000 €) y
                aislamiento ventanas parcial (4.000 €).
              </p>
              <div className="mt-3 rounded-lg bg-green-50 p-3">
                <p className="text-sm font-semibold text-green-800">
                  Resultados: ahorro 35 % = 28.000 kWh/año | 5.600 €/año |
                  Amortización 2,3 años | ROI 5 años: 22.000 € neto | Bonus:
                  empleados más contentos (confort mejorado)
                </p>
              </div>
            </div>

            {/* Caso 3 */}
            <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Caso 3: Hogar familiar (Vivienda 120 m²)
              </h3>
              <p className="mt-3">
                <strong>Situación:</strong> consumo 3.500 kWh/año, factura
                700 €/año. Percepción: &quot;Factura muy alta.&quot;
              </p>
              <p className="mt-2">
                <strong>Implementación:</strong> contador inteligente (ya
                tenía, acceso online: 0 €) + enchufes inteligentes 5 aparatos
                (100 €) + análisis personal sin auditor (2 horas).
              </p>
              <p className="mt-2">
                <strong>Hallazgos:</strong> TV encendida 8 horas/día en standby
                (150 kWh/año = 30 €), frigorífico consumiendo más de lo
                esperado (200 kWh extra) y lavadora usada con agua caliente
                innecesariamente.
              </p>
              <p className="mt-2">
                <strong>Acciones:</strong> enchufes inteligentes para TV (apagar
                automático noche), cambiar frigorífico por modelo A++ (500 €) y
                lavadora siempre con agua fría (0 €).
              </p>
              <div className="mt-3 rounded-lg bg-green-50 p-3">
                <p className="text-sm font-semibold text-green-800">
                  Resultados: ahorro 18 % = 630 kWh/año | 126 €/año |
                  Amortización 4 años | ROI 10 años: 900 € neto | La familia
                  entiende ahora dónde se va el dinero
                </p>
              </div>
            </div>
          </section>

          {/* Conclusión */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              Conclusión: monitorización = primer paso
            </h2>
            <p className="mt-4">
              La monitorización energética es la inversión más inteligente antes
              de cualquier otra mejora. Te permite entender exactamente dónde
              se va el dinero, priorizar mejoras rentables, validar ahorros de
              cambios y modificar tu comportamiento de consumo.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Plan de acción
            </h3>
            <ol className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">1.</span>
                <span>
                  <strong>Semana 1:</strong> Accede al contador inteligente
                  (gratis)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">2.</span>
                <span>
                  <strong>Semana 2:</strong> Analiza datos de 2 semanas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">3.</span>
                <span>
                  <strong>Semana 3:</strong> Identifica aparatos/horas de
                  consumo alto
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">4.</span>
                <span>
                  <strong>Semana 4:</strong> Implementa cambios de
                  comportamiento (0 €)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">5.</span>
                <span>
                  <strong>Mes 2:</strong> Evalúa ahorro conseguido
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-[#f97316]">6.</span>
                <span>
                  <strong>Mes 3:</strong> Considera inversiones (LED,
                  termostato, solar)
                </span>
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
              ¿Quieres monitorizar tu consumo energético?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              En Vitergy te ayudamos a implementar la monitorización adecuada
              para tu hogar o empresa. Analizamos tu consumo, te recomendamos
              la mejor solución y te acompañamos en todo el proceso.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/monitorizacion-consumo"
                className="inline-block rounded-lg bg-[#f97316] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Monitorización energética
              </Link>
              <Link
                href="/contacto"
                className="inline-block rounded-lg border border-[#f97316] px-8 py-3 text-base font-semibold text-[#f97316] hover:bg-orange-50"
              >
                Solicitar análisis gratuito
              </Link>
            </div>
          </section>

          {/* Nota final */}
          <p className="text-sm italic text-gray-500">
            Artículo de marzo 2026. Precios de dispositivos y ahorros estimados
            a esa fecha. Vitergy: especialistas en monitorización energética y
            eficiencia. 5.000+ sistemas implementados.
          </p>

          {/* Links internos */}
          <section>
            <h2 className="text-lg font-bold text-gray-900">
              Artículos y servicios relacionados
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/autoconsumo-fotovoltaico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Autoconsumo fotovoltaico
              </Link>
              <Link
                href="/optimizacion-potencia"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Optimización de potencia
              </Link>
              <Link
                href="/calculadora-consumo-electrico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Calculadora consumo eléctrico
              </Link>
              <Link
                href="/blog/como-calcular-consumo-electrico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Cómo calcular consumo eléctrico
              </Link>
              <Link
                href="/blog/guia-autoconsumo-fotovoltaico"
                className="rounded-lg border border-orange-100 bg-white px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-orange-50"
              >
                Guía autoconsumo fotovoltaico
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
