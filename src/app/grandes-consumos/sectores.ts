export type Sector = {
  slug: string;
  nombre: string;
  navLabel: string;
  emoji: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: { antes: string; destacado: string };
  entradilla: string;
  resumenHub: string;
  ctaTitulo: string;
  ficha: { label: string; value: string }[];
  dolores: { title: string; text: string }[];
  palancas: { title: string; text: string; impacto: string }[];
  escenario: {
    titular: string;
    supuesto: string;
    lineas: { concepto: string; detalle: string; efecto: string }[];
    cierre: string;
  };
  /** Cliente real con cifra verificada. Solo en los sectores que tienen uno. */
  casoReal?: { cifra: string; pie: string; titular: string; texto: string };
  faqs: { question: string; answer: string }[];
  relacionados: { label: string; href: string }[];
};

export const SECTORES: Sector[] = [
  /* ─────────────────────────── GIMNASIOS ─────────────────────────── */
  {
    slug: "gimnasios",
    nombre: "Gimnasios y centros deportivos",
    navLabel: "Gimnasios",
    emoji: "🏋️",
    eyebrow: "Grandes consumos · Gimnasios y centros deportivos",
    metaTitle:
      "Ahorro Energético para Gimnasios | Baja la Factura de Luz de tu Centro - Vitergy",
    metaDescription:
      "Auditoría energética para gimnasios y centros deportivos con tarifa 3.0TD o 6.1TD. Ajustamos los seis periodos de potencia, el ACS, la climatización y el contrato. Estudio sin coste.",
    h1: {
      antes: "Ahorro energético para gimnasios:",
      destacado: "tu kilovatio más caro es el de las 20:00",
    },
    entradilla:
      "Un gimnasio no consume mucho: consume mal repartido. Toda la actividad se concentra en las dos franjas del día en las que la electricidad, en una tarifa 3.0TD, es más cara. A eso se le suman las duchas, la ventilación obligada por aforo y una potencia contratada que casi nadie ha vuelto a mirar desde el día de la apertura. Analizamos tu curva horaria real —no tu factura de un mes suelto— y reconstruimos el contrato alrededor de cómo funciona de verdad tu centro.",
    resumenHub:
      "Doble pico de consumo en las horas más caras del día, ACS de duchas sin medir y ventilación a caudal fijo. Aquí el dinero está en los periodos de potencia y en mover carga térmica al valle.",
    ctaTitulo: "¿Cuánto está pagando de más tu gimnasio?",
    ficha: [
      { label: "Tarifa habitual", value: "3.0TD · 6.1TD en centros con spa o piscina climatizada" },
      { label: "Potencia típica", value: "40 – 150 kW" },
      { label: "Periodos críticos", value: "P1 y P2 — de 8 a 10 h y de 18 a 22 h" },
      {
        label: "Cargas dominantes",
        value: "Climatización y ventilación · ACS de duchas · Sala de cardio · Spa y piscina",
      },
      { label: "Palanca nº 1", value: "Redimensionar los seis periodos de potencia" },
    ],
    dolores: [
      {
        title: "Tu curva tiene dos jorobas y las dos caen en punta",
        text: "Los socios entran antes de trabajar y al salir. Ese doble pico —mañana temprano y tarde-noche— coincide casi milimétricamente con los periodos P1 y P2 de la tarifa 3.0TD, que son los más caros tanto en energía como en potencia. Un gimnasio medio concentra la mayor parte de su consumo justo en las horas que peor se pagan, y ninguna comercializadora te va a avisar de eso.",
      },
      {
        title: "Contratar la misma potencia en los seis periodos",
        text: "Es el error más caro y el más común. La normativa te obliga a contratar potencias no decrecientes de P1 a P6, pero el kW de P1 es con diferencia el más caro del año y el de P6 es casi simbólico. Contratar plano significa pagar a precio de punta un margen de seguridad que solo necesitas de madrugada. Bien ajustado, el término fijo baja sin tocar una sola máquina.",
      },
      {
        title: "El ACS de las duchas se lleva un tercio de la factura y nadie lo mide",
        text: "Si el agua caliente sanitaria se produce con resistencia eléctrica y se calienta a demanda, estás comprando la energía más cara del día para calentar agua. Cambiar el modo de producción (aerotermia, gas, acumulación) o simplemente desplazar la acumulación a la madrugada cambia por completo el peso de esta partida. Lo primero es medirla por separado: casi nunca lo está.",
      },
      {
        title: "La ventilación a tope con la sala vacía",
        text: "La renovación de aire por aforo es obligatoria, pero el caudal no tiene por qué ser fijo. La mayoría de centros tienen los extractores funcionando a máxima velocidad catorce horas al día, con la sala llena y con la sala vacía. Regular el caudal por ocupación o por CO₂ no reduce la calidad del aire: reduce las horas en las que sobra.",
      },
      {
        title: "Penalización por reactiva que aparece cada mes sin explicación",
        text: "Cintas, elípticas, ventiladores y bombas son motores. Si el factor de potencia del centro cae por debajo de 0,95, la distribuidora factura la energía reactiva en todos los periodos menos el valle. Es un cargo que se corrige de una vez con una batería de condensadores bien dimensionada y que desaparece del todo de tu factura.",
      },
    ],
    palancas: [
      {
        title: "Redimensionar los seis periodos de potencia",
        text: "Cruzamos doce meses de maxímetro con tu curva horaria real para fijar la potencia mínima viable en P1 y P2 —los caros— y dejar el margen de seguridad en los periodos baratos. Sin riesgo de excesos.",
        impacto: "Efecto directo sobre el término fijo, todos los meses",
      },
      {
        title: "Elegir bien entre precio fijo e indexado",
        text: "Un gimnasio tiene una curva muy predecible, y eso es una ventaja negociadora: se puede cubrir. Simulamos tu consumo real contra las dos estructuras antes de recomendarte nada.",
        impacto: "Actúa sobre el término de energía, la mayor parte de la factura",
      },
      {
        title: "Mover el ACS y la depuración al valle",
        text: "Acumular agua caliente de madrugada y programar la depuradora de la piscina fuera de punta traslada kilovatios enteros del periodo más caro al más barato. El consumo es el mismo; el precio no.",
        impacto: "Reduce el coste de la partida térmica sin inversión relevante",
      },
      {
        title: "Corregir el factor de potencia",
        text: "Batería de condensadores dimensionada sobre tu reactiva real. Es una inversión pequeña que elimina un cargo recurrente.",
        impacto: "Elimina la penalización por reactiva",
      },
      {
        title: "Control de climatización y ventilación por ocupación",
        text: "Caudal variable, calendarios por sala y consignas revisadas. La climatización es la primera o segunda carga del centro y casi siempre está parametrizada por defecto.",
        impacto: "La partida de clima es donde más margen técnico suele quedar",
      },
      {
        title: "Autoconsumo dimensionado contra tu curva, no contra tu cubierta",
        text: "Un gimnasio sí tiene consumo de día, así que la fotovoltaica encaja mejor que en otros negocios de tarde. Aun así, dimensionamos sobre la curva horaria: instalar de más para verter a red no es un ahorro, es una inversión que no vuelve.",
        impacto: "Solo la recomendamos cuando el número sale",
      },
    ],
    escenario: {
      titular: "Un centro de 900 m² con 90 kW contratados",
      supuesto:
        "Escenario de cálculo construido sobre la estructura real de la tarifa 3.0TD para un centro de este tamaño. No es un cliente concreto: es el mapa de dónde suele estar el dinero.",
      lineas: [
        {
          concepto: "Potencia contratada plana",
          detalle:
            "90 kW iguales en los seis periodos, cuando el maxímetro de P1 nunca ha pasado de 68 kW en doce meses.",
          efecto: "Se paga margen de seguridad al precio más caro del año",
        },
        {
          concepto: "Precio de energía sin revisar",
          detalle:
            "Contrato fijo firmado en un momento de mercado alto y renovado por silencio dos veces seguidas.",
          efecto: "El diferencial se acumula mes a mes sobre todo el consumo",
        },
        {
          concepto: "Reactiva recurrente",
          detalle: "Cargo por energía reactiva en todas las facturas salvo agosto.",
          efecto: "Corregible de una vez, desaparece para siempre",
        },
        {
          concepto: "ACS eléctrico a demanda",
          detalle:
            "Las duchas calientan agua justo en las horas punta de la mañana y de la tarde.",
          efecto: "Misma energía, periodo equivocado",
        },
      ],
      cierre:
        "Ninguna de estas cuatro líneas se arregla cambiando de compañía. Se arreglan leyendo la curva y rehaciendo el contrato. El cambio de comercializadora, si toca, viene después y con los deberes hechos.",
    },
    faqs: [
      {
        question: "¿Cuánto puede ahorrar un gimnasio en la factura de la luz?",
        answer:
          "Depende de tres cosas: cómo esté dimensionada la potencia, cuándo se firmó el precio de energía y cómo se produzca el agua caliente. Los centros que llevan años sin revisar el contrato suelen tener margen en las tres a la vez. Por eso el estudio empieza siempre por la curva horaria de doce meses y no por una oferta: sin ese dato, cualquier cifra de ahorro es marketing.",
      },
      {
        question: "¿Tengo que cambiar de compañía eléctrica para ahorrar?",
        answer:
          "No necesariamente. Una parte importante del ahorro de un gimnasio está en la potencia contratada, en la reactiva y en cuándo se consume, y eso se corrige con tu comercializadora actual. Si además el precio de energía está por encima de mercado, lo negociamos; y si no lo está, te lo decimos y no tocamos nada.",
      },
      {
        question: "¿Puedo bajar la potencia sin que salten los diferenciales en hora punta?",
        answer:
          "Sí, si se calcula sobre datos y no a ojo. En tarifas 3.0TD y 6.1TD no hay ICP que corte: los excesos se facturan con recargo. Por eso fijamos la potencia sobre el maxímetro real de los últimos doce meses dejando margen, y vigilamos las primeras facturas después del ajuste para confirmar que no aparece ni un exceso.",
      },
      {
        question: "¿Merece la pena poner placas solares en un gimnasio?",
        answer:
          "Más que en otros negocios, porque un gimnasio sí tiene actividad de día. Pero la decisión no se toma mirando los metros de cubierta, sino la curva: hay que ver qué parte de la generación se autoconsume de verdad. Dimensionamos la instalación para maximizar autoconsumo, no para llenar el tejado.",
      },
      {
        question: "¿Y si tengo piscina climatizada o spa?",
        answer:
          "Entonces el análisis cambia de escala: la climatización del vaso, la deshumectación y la depuración pueden pesar más que todo el resto del centro junto, y probablemente estés en 6.1TD. Es justo el tipo de instalación donde programar horarios y revisar consignas mueve más dinero que cualquier negociación de precio.",
      },
    ],
    relacionados: [
      { label: "Optimización de potencia", href: "/optimizacion-potencia" },
      { label: "Penalizaciones eléctricas", href: "/penalizaciones-electricas" },
      { label: "Autoconsumo fotovoltaico", href: "/autoconsumo-fotovoltaico" },
      { label: "Monitorización de consumo", href: "/monitorizacion-consumo" },
    ],
  },

  /* ──────────────────── LAVANDERÍAS INDUSTRIALES ──────────────────── */
  {
    slug: "lavanderias-industriales",
    nombre: "Lavanderías industriales",
    navLabel: "Lavanderías industriales",
    emoji: "🧺",
    eyebrow: "Grandes consumos · Lavanderías industriales",
    metaTitle:
      "Ahorro Energético para Lavanderías Industriales | Luz y Gas - Vitergy",
    metaDescription:
      "Auditoría energética para lavanderías industriales: luz y gas negociados a la vez, turnos desplazados al valle, escalón de peaje de gas y control de picos. Estudio sin coste.",
    h1: {
      antes: "Ahorro energético para lavanderías industriales:",
      destacado: "aquí no se ahorra cambiando de compañía, se ahorra cambiando de hora",
    },
    entradilla:
      "Una lavandería industrial es una de las instalaciones más intensivas en energía que existen fuera de la industria pesada: túneles de lavado, secadoras, calandras y una caldera que no para. El coste energético entra directamente en el precio del kilo de ropa, así que cada euro que se corrige aquí es margen limpio. Y lo que más mueve la aguja no es el precio del kWh: es en qué franja horaria se consume y cómo se está facturando el gas.",
    resumenHub:
      "Consumo térmico brutal, doble factura de luz y gas negociada por separado y turnos que caen en las horas más caras. La palanca grande es reprogramar carga al valle.",
    ctaTitulo: "¿Cuánto está pagando de más tu lavandería?",
    ficha: [
      { label: "Tarifa habitual", value: "3.0TD · 6.1TD en plantas con alta tensión" },
      { label: "Potencia típica", value: "100 – 400 kW, más consumo de gas relevante" },
      {
        label: "Periodos críticos",
        value: "P1 y P2 en el turno de mañana · oportunidad grande en P6",
      },
      {
        label: "Cargas dominantes",
        value: "Túnel de lavado · Secadoras · Calandras · Caldera de vapor · Compresores",
      },
      { label: "Palanca nº 1", value: "Desplazar producción a periodo valle" },
    ],
    dolores: [
      {
        title: "Luz y gas negociados por separado, y en meses distintos",
        text: "Es lo habitual: el contrato de electricidad lo renovó una persona en marzo y el de gas otra en octubre, cada uno con la oferta que llegó ese día. El resultado es que nadie tiene delante el coste energético total por kilo de ropa procesada, que es el único número que importa. Cuando los dos suministros salen a mercado a la vez y con el mismo criterio, la posición negociadora cambia.",
      },
      {
        title: "El turno está donde la energía es más cara",
        text: "Trabajar de seis a dos de la tarde mete prácticamente toda la producción en P1 y P2. El periodo valle —madrugada, fines de semana y festivos— tiene el kWh y el kW mucho más baratos. No siempre se puede mover el turno entero, pero casi siempre se puede mover algo: el prelavado, el secado de un lote, la preparación del agua caliente. Cada proceso que se desplaza cambia de precio sin cambiar de consumo.",
      },
      {
        title: "Escalón de peaje de gas mal asignado",
        text: "El grupo tarifario de gas se asigna en función del consumo anual previsto. Si la planta ha crecido, ha cambiado de maquinaria o ha reducido turnos y nadie ha revisado el escalón, se puede estar facturando años en el grupo equivocado y pagando un término fijo que no corresponde. Es una revisión de despacho, sin obra y sin parar la producción.",
      },
      {
        title: "Excesos de potencia por arrancar todo a la vez",
        text: "Túnel, compresor y calandra arrancando en la misma franja disparan el maxímetro. En 3.0TD y 6.1TD no salta nada: se factura con recargo, y la fórmula acumula todos los cuartos de hora en los que te has pasado, no solo el peor. Basta con escalonar los arranques —o instalar un control de demanda— para que ese recargo desaparezca del todo.",
      },
      {
        title: "Calor que se va por el desagüe",
        text: "El agua sale del proceso a temperatura alta y va directa al alcantarillado, mientras la caldera calienta agua fría de red en el otro extremo de la planta. Un recuperador de calor sobre aguas grises precalienta la entrada y baja directamente el consumo de la caldera. Junto con el aislamiento de la red de vapor y la revisión de purgadores, es la partida técnica con retorno más rápido del sector.",
      },
      {
        title: "Motores grandes sin variador y factor de potencia bajo",
        text: "Bombas y ventiladores funcionando a velocidad fija cuando el proceso no lo exige, y un cos φ que arrastra penalización por reactiva mes tras mes. Son dos correcciones puntuales que dejan de costar dinero desde la primera factura.",
      },
    ],
    palancas: [
      {
        title: "Reprogramar producción hacia periodo valle",
        text: "Mapeamos qué procesos son desplazables y cuánto vale cada hora movida. En una planta que consume en punta, esta es la palanca de mayor recorrido con diferencia.",
        impacto: "El kWh de P6 vale una fracción del de P1",
      },
      {
        title: "Sacar luz y gas a mercado en el mismo proceso",
        text: "Mismo periodo, mismos datos, misma vara de medir, y varias comercializadoras compitiendo sobre tu curva real en lugar de sobre una estimación.",
        impacto: "Negocias con el volumen completo, no partido en dos",
      },
      {
        title: "Revisar el grupo de peaje de gas y el caudal contratado",
        text: "Comprobamos que el escalón asignado corresponda al consumo real de los últimos doce meses y que el caudal contratado no esté sobredimensionado.",
        impacto: "Corrige un término fijo que se paga todos los meses",
      },
      {
        title: "Control de demanda y escalonado de arranques",
        text: "Evita que dos cargas grandes coincidan y fija un techo de potencia que el proceso no cruza. Elimina los excesos de maxímetro sin reducir producción.",
        impacto: "Suprime el recargo por exceso de potencia",
      },
      {
        title: "Recuperación de calor y red de vapor",
        text: "Recuperador sobre aguas grises, aislamiento de tuberías y revisión de purgadores. Es la partida donde el ahorro no depende del mercado.",
        impacto: "Baja el consumo de la caldera, no solo su precio",
      },
      {
        title: "Variadores de frecuencia y corrección del cos φ",
        text: "En bombas y ventiladores el ahorro de un variador es más que proporcional a la reducción de velocidad. La batería de condensadores, aparte, cierra la penalización por reactiva.",
        impacto: "Dos inversiones pequeñas con efecto permanente",
      },
    ],
    escenario: {
      titular: "Una planta con dos túneles, cuatro secadoras y caldera de vapor",
      supuesto:
        "Escenario de cálculo sobre la estructura de las tarifas 3.0TD y de los peajes de gas. No corresponde a un cliente concreto: describe dónde aparece el dinero en una planta de este perfil.",
      lineas: [
        {
          concepto: "Toda la producción en horario punta",
          detalle:
            "Turno único de mañana, de lunes a viernes. Cero actividad en fin de semana, que es periodo valle completo.",
          efecto: "El mismo trabajo cuesta más solo por la hora en que se hace",
        },
        {
          concepto: "Excesos de potencia recurrentes",
          detalle:
            "Arranque simultáneo de túnel y compresor un par de veces por semana; recargo en casi todas las facturas.",
          efecto: "Se corrige escalonando arranques, sin tocar el proceso",
        },
        {
          concepto: "Gas en un escalón antiguo",
          detalle:
            "El grupo de peaje se fijó con el consumo de la apertura y no se ha revisado desde entonces.",
          efecto: "Término fijo que no corresponde al consumo actual",
        },
        {
          concepto: "Agua caliente tirada al desagüe",
          detalle:
            "Sin recuperador: el agua de proceso sale caliente mientras la caldera calienta agua de red.",
          efecto: "Consumo de caldera evitable, independiente del precio",
        },
      ],
      cierre:
        "En una lavandería, negociar el precio del kWh es la última pieza, no la primera. Antes hay que decidir cuándo se consume, cuánta potencia se necesita de verdad y cuánto calor se está tirando. Cuando eso está resuelto, la negociación se hace desde una posición completamente distinta.",
    },
    faqs: [
      {
        question: "¿De verdad compensa mover producción a la madrugada o al fin de semana?",
        answer:
          "Compensa cuando el diferencial entre periodos supera el sobrecoste laboral y logístico de mover el turno, y eso hay que calcularlo con tus números, no con una regla general. Lo que sí es cierto siempre es que el periodo valle —madrugada, fines de semana y festivos— es el más barato tanto en energía como en potencia. Nosotros ponemos la cifra encima de la mesa; la decisión operativa es tuya.",
      },
      {
        question: "¿Podéis revisar también el contrato de gas?",
        answer:
          "Sí, y en una lavandería es tan importante como el de electricidad. Revisamos el grupo de peaje asignado, el caudal contratado, el término fijo y el precio de la molécula, y lo sacamos a mercado junto con la electricidad. Negociar los dos suministros por separado es regalar poder de compra.",
      },
      {
        question: "¿Qué son los excesos de potencia y por qué me aparecen si no se corta nada?",
        answer:
          "En tarifas 3.0TD y 6.1TD no hay un limitador que corte el suministro: si superas la potencia contratada, la distribuidora simplemente lo factura con recargo. La fórmula acumula todos los cuartos de hora en los que te has excedido durante el periodo de facturación, así que varios picos pequeños pueden costar más que uno grande. Se corrige ajustando la potencia y escalonando los arranques.",
      },
      {
        question: "¿Cuánta información necesitáis para hacer el estudio?",
        answer:
          "Doce meses de facturas de luz y de gas, y el CUPS de cada suministro para pedir la curva horaria a la distribuidora. Con eso reconstruimos el consumo cuarto de hora a cuarto de hora, que es la única base sólida para decidir potencia, periodo y precio. El estudio no tiene coste ni compromiso.",
      },
      {
        question: "¿Vais a proponerme una obra o una inversión grande?",
        answer:
          "Solo si el número sale, y siempre separado del resto. Primero cerramos todo lo que se corrige sin invertir —potencia, periodos, escalón de gas, contrato, reactiva—, y después te presentamos las medidas con inversión (recuperación de calor, variadores, autoconsumo) con su retorno calculado, para que decidas con la cifra delante.",
      },
    ],
    relacionados: [
      { label: "Optimización de potencia", href: "/optimizacion-potencia" },
      { label: "Penalizaciones eléctricas", href: "/penalizaciones-electricas" },
      { label: "Estudio de factura eléctrica", href: "/estudio-factura-electrica" },
      { label: "Monitorización de consumo", href: "/monitorizacion-consumo" },
    ],
  },

  /* ─────────────────────────── CLUBS DE PÁDEL ─────────────────────────── */
  {
    slug: "clubs-de-padel",
    nombre: "Clubs de pádel",
    navLabel: "Clubs de pádel",
    emoji: "🎾",
    eyebrow: "Grandes consumos · Clubs de pádel",
    metaTitle:
      "Ahorro Energético para Clubs de Pádel | Luz de Pistas y Potencia - Vitergy",
    metaDescription:
      "Auditoría energética para clubs de pádel: control de iluminación por pista, ajuste de los seis periodos de potencia y revisión del contrato. Estudio gratuito y sin compromiso.",
    h1: {
      antes: "Ahorro energético para clubs de pádel:",
      destacado: "la luz de las pistas se enciende justo cuando el kWh está más caro",
    },
    entradilla:
      "Un club de pádel tiene el peor patrón de consumo posible para la tarifa eléctrica española: casi todo el negocio ocurre entre las seis y las once de la noche, de lunes a viernes, que es exactamente cuando la energía y la potencia se pagan al precio más alto. La buena noticia es que también es uno de los negocios donde el consumo es más controlable, pista por pista y hora por hora. Ahí está el margen.",
    resumenHub:
      "Todo el negocio ocurre en hora punta y la iluminación de pistas es la carga dominante. El margen está en controlar pista por pista y en ajustar la potencia por periodos.",
    ctaTitulo: "¿Cuánto está pagando de más tu club?",
    ficha: [
      { label: "Tarifa habitual", value: "3.0TD · 2.0TD solo en clubs muy pequeños" },
      { label: "Potencia típica", value: "30 – 120 kW según pistas y si son indoor" },
      {
        label: "Periodos críticos",
        value: "P1 y P2 de 18 a 22 h entre semana · mañanas de sábado y domingo en valle",
      },
      {
        label: "Cargas dominantes",
        value: "Iluminación de pistas · Climatización en indoor · Vestuarios y ACS · Hostelería",
      },
      { label: "Palanca nº 1", value: "Control de encendido por pista ligado a reservas" },
    ],
    dolores: [
      {
        title: "El 100% del negocio está en hora punta",
        text: "Las pistas se llenan de seis a once de la noche entre semana. Esa franja es P1 y P2 en la tarifa 3.0TD: el kWh más caro y el kW más caro del año. No es un problema de gestión, es la naturaleza del negocio; pero sí determina que el contrato de un club no se pueda negociar igual que el de una oficina.",
      },
      {
        title: "Pistas iluminadas sin nadie dentro",
        text: "Sin control individual, el club enciende a una hora y apaga al cerrar. Cada pista consume del orden de uno o dos kilovatios en LED —bastante más si la instalación es antigua—, y multiplicado por las pistas vacías y por las horas de más al mes, la cifra deja de ser anecdótica. Encender solo la pista reservada, y apagarla al terminar el partido, es la medida con mejor relación entre coste e impacto de todo el sector.",
      },
      {
        title: "Potencia contratada por el pico de un sábado de torneo",
        text: "Un día al año se llenan todas las pistas a la vez, salta el maxímetro y alguien sube la potencia contratada para que no vuelva a pasar. Esa potencia se paga los 365 días siguientes, y encima al precio de P1. Con un control de demanda o simplemente reordenando el encendido en los días punta, se puede volver a bajar.",
      },
      {
        title: "La franja barata del fin de semana está infrautilizada",
        text: "Las mañanas de sábado y domingo son periodo valle completo: la energía y la potencia se pagan al mínimo. Llenar esa franja con ligas, clases y torneos internos no es solo una decisión comercial —baja el coste energético por hora de pista al mismo tiempo que sube la facturación. Es la única palanca que mejora las dos partes de la cuenta a la vez.",
      },
      {
        title: "Reactiva de drivers y bombas",
        text: "Los equipos de iluminación antiguos y las bombas de climatización arrastran el factor de potencia hacia abajo, y la penalización por reactiva aparece en la factura sin que nadie sepa de dónde sale. Se corrige una vez y no vuelve.",
      },
      {
        title: "Fotovoltaica dimensionada por metros de cubierta",
        text: "Un club tiene mucha superficie y poco consumo de día. Si se instala una planta grande pensando en la cubierta y no en la curva, la mayor parte de la generación se vierte a red y se compensa a un precio muy inferior al que pagas por la noche. Aquí hay que hacer el número antes, no después.",
      },
    ],
    palancas: [
      {
        title: "Control de iluminación por pista ligado al software de reservas",
        text: "La pista se enciende cuando empieza la reserva y se apaga cuando termina. Sin depender de que alguien se acuerde y sin discusiones en recepción.",
        impacto: "Actúa sobre la carga dominante del club, hora a hora",
      },
      {
        title: "Redimensionar los seis periodos de potencia",
        text: "La potencia de P1 es la más cara y es la que hay que apurar; el margen de seguridad se deja en los periodos baratos, que es donde la norma permite tenerlo.",
        impacto: "Baja el término fijo todos los meses del año",
      },
      {
        title: "Elegir estructura de precio con la curva delante",
        text: "La curva de un club es tan repetitiva que se puede modelar casi al dedillo, y eso permite comparar fijo frente a indexado con criterio en vez de por intuición.",
        impacto: "Decide el precio de la mayor parte de la factura",
      },
      {
        title: "Llevar actividad a las franjas valle",
        text: "Ligas de mañana, clases de fin de semana, bonos en horario bajo. Sube ocupación en las horas en las que la energía es más barata.",
        impacto: "Mejora ingresos y coste energético a la vez",
      },
      {
        title: "Control de demanda para los días punta",
        text: "Fija un techo de potencia que la instalación no cruza aunque se llenen todas las pistas, evitando que un torneo condicione la potencia de todo el año.",
        impacto: "Permite contratar por el uso normal, no por la excepción",
      },
      {
        title: "Corrección del factor de potencia y renovación de luminarias",
        text: "Batería de condensadores sobre la reactiva medida y, si la instalación lo pide, LED con driver regulable y control por zonas.",
        impacto: "Elimina la penalización y reduce la carga base de iluminación",
      },
    ],
    escenario: {
      titular: "Un club indoor de ocho pistas",
      supuesto:
        "Escenario de cálculo sobre la estructura de la tarifa 3.0TD para un club de este tamaño. No es un cliente concreto: es el mapa de dónde suele estar el dinero en este sector.",
      lineas: [
        {
          concepto: "Encendido global en lugar de por pista",
          detalle:
            "Las ocho pistas iluminadas desde las 17:00 hasta el cierre, con una ocupación media muy por debajo del 100%.",
          efecto: "Se paga luz de pistas vacías en el periodo más caro del día",
        },
        {
          concepto: "Potencia fijada por el día del torneo",
          detalle:
            "Se subió la potencia tras un exceso puntual y nunca se volvió a bajar.",
          efecto: "Término fijo dimensionado por un día de 365",
        },
        {
          concepto: "Mañanas de fin de semana con media ocupación",
          detalle: "La franja más barata del cuadro tarifario está a medio llenar.",
          efecto: "Hora de pista con el mejor margen energético desaprovechada",
        },
        {
          concepto: "Reactiva en todas las facturas",
          detalle: "Cargo constante por factor de potencia bajo, sin corregir.",
          efecto: "Coste recurrente que se elimina de una vez",
        },
      ],
      cierre:
        "En un club de pádel el ahorro no viene de una gran decisión, sino de cuatro pequeñas que se acumulan todos los días del año. Y ninguna de ellas exige cerrar una pista ni molestar a un socio.",
    },
    faqs: [
      {
        question: "¿Cuánto consume la iluminación de una pista de pádel?",
        answer:
          "Una pista con proyectores LED bien dimensionados se mueve en el entorno de uno a dos kilovatios; con instalaciones antiguas de halogenuros, bastante más. Lo relevante no es tanto el dato aislado como el producto: kilovatios por pista, por horas encendida de más, por precio del periodo punta. Ahí es donde aparece la factura real.",
      },
      {
        question: "¿Se puede integrar el encendido de pistas con el sistema de reservas?",
        answer:
          "Sí, y es lo que recomendamos en la mayoría de clubs. La lógica es sencilla: la pista se enciende al empezar la reserva y se apaga al terminar, con un margen configurable. La forma concreta de implementarlo depende del sistema de reservas y del cuadro eléctrico que tengas, y lo valoramos en el estudio.",
      },
      {
        question: "¿Interesa más precio fijo o indexado en un club de pádel?",
        answer:
          "Depende de tu tolerancia al riesgo y de cómo esté el mercado cuando toque firmar, pero la ventaja del club es que su curva es muy predecible, y una curva predecible se puede cubrir bien. Simulamos tu consumo real contra ambas estructuras y te enseñamos las dos cuentas antes de recomendarte nada.",
      },
      {
        question: "¿Y las placas solares? Tengo mucha cubierta libre.",
        answer:
          "La cubierta libre no es el criterio: lo es la curva de consumo. Un club consume sobre todo de noche, así que buena parte de lo que genere una instalación grande se verterá a red y se compensará a un precio muy inferior al que pagas por la noche. La fotovoltaica encaja si hay consumo diurno real —hostelería, clima, clases de mañana— o si el número sale con acumulación. Lo calculamos antes de proponerlo.",
      },
      {
        question: "¿Cuánto tarda el estudio y qué necesitáis?",
        answer:
          "Doce meses de facturas y el CUPS del suministro. Con eso pedimos la curva horaria a la distribuidora y te devolvemos el análisis con las medidas ordenadas por impacto y por esfuerzo. Sin coste y sin compromiso de contratar nada.",
      },
    ],
    relacionados: [
      { label: "Optimización de potencia", href: "/optimizacion-potencia" },
      { label: "Monitorización de consumo", href: "/monitorizacion-consumo" },
      { label: "Autoconsumo fotovoltaico", href: "/autoconsumo-fotovoltaico" },
      { label: "Comparador de tarifas", href: "/comparador-tarifas-luz" },
    ],
  },

  /* ─────────────────────── CENTROS MÉDICOS ─────────────────────── */
  {
    slug: "centros-medicos",
    nombre: "Centros médicos y clínicas",
    navLabel: "Centros médicos",
    emoji: "🩺",
    eyebrow: "Grandes consumos · Centros médicos y clínicas",
    metaTitle:
      "Ahorro Energético para Centros Médicos y Clínicas | Multi-sede - Vitergy",
    metaDescription:
      "Auditoría energética para clínicas y centros médicos: agregación de varias sedes, potencia para equipos de imagen, climatización de áreas críticas y continuidad de suministro.",
    h1: {
      antes: "Ahorro energético para centros médicos:",
      destacado: "el precio más barato no vale si el suministro falla",
    },
    entradilla:
      "En una clínica la energía no es solo un coste: es una condición de funcionamiento. Hay frío que no puede subir de temperatura, quirófanos con exigencias de renovación de aire y equipos que no admiten un corte a media prueba. Por eso el criterio aquí no puede ser únicamente el precio del kilovatio, sino el conjunto: contrato solvente, potencia bien dimensionada para los picos del equipamiento y una base de consumo 24 horas que casi nadie audita.",
    resumenHub:
      "Base de consumo 24/7 que nadie mira, picos de arranque del equipamiento de imagen y varias sedes negociadas por separado. La palanca grande es agregar y dimensionar bien.",
    ctaTitulo: "¿Cuánto está pagando de más tu centro?",
    ficha: [
      { label: "Tarifa habitual", value: "3.0TD · 6.1TD con diagnóstico por imagen o varias plantas" },
      { label: "Potencia típica", value: "50 – 400 kW según especialidad y equipamiento" },
      {
        label: "Periodos críticos",
        value: "Horario asistencial en P1–P4 · base 24 h de frío y clima",
      },
      {
        label: "Cargas dominantes",
        value:
          "Climatización y renovación de aire · Diagnóstico por imagen · Esterilización · Frío de vacunas y muestras",
      },
      { label: "Palanca nº 1", value: "Agregar todas las sedes en una sola negociación" },
    ],
    dolores: [
      {
        title: "Una base de consumo 24/7 que nadie ha auditado nunca",
        text: "Cámaras de vacunas y muestras, servidores, climatización de áreas críticas, iluminación de seguridad. Es la parte de la factura que no depende de la agenda de consultas y precisamente por eso pasa desapercibida: no sube cuando hay más pacientes ni baja en agosto. Medirla por separado suele destapar equipos funcionando fuera de especificación durante años.",
      },
      {
        title: "Un pico de arranque fija el maxímetro de todo el mes",
        text: "Un equipo de diagnóstico por imagen arrancando, o dos autoclaves coincidiendo, generan un pico de potencia que dura segundos y determina lo que pagas de término fijo durante todo el periodo. En tarifas 3.0TD y 6.1TD los excesos no cortan el suministro: se facturan con recargo, acumulando cada cuarto de hora en el que te has pasado.",
      },
      {
        title: "Climatización dimensionada por normativa y parametrizada por defecto",
        text: "Las exigencias de calidad y renovación de aire en áreas asistenciales son estrictas y no se tocan. Lo que sí se puede revisar es cómo está programado el sistema: consignas, calendarios por sala, recuperadores de calor y free-cooling. En la mayoría de centros esa parametrización se dejó como vino de fábrica el día de la puesta en marcha.",
      },
      {
        title: "Varias sedes, varios contratos, varios precios",
        text: "Cada centro negoció su suministro por su cuenta, en fechas distintas y con condiciones distintas. Sumados, esos puntos de suministro son un volumen que da acceso a otro nivel de negociación; separados, cada uno compra como si fuera pequeño. Unificar vencimientos y salir a mercado con la cartera completa es la palanca de mayor recorrido en grupos con más de un centro.",
      },
      {
        title: "El criterio de compra no puede ser solo el precio",
        text: "Aquí hace falta una comercializadora solvente, facturación auditable y capacidad de respuesta ante una incidencia, además de un respaldo —SAI o grupo electrógeno— correctamente dimensionado y probado. Una oferta agresiva de una compañía sin músculo de servicio puede acabar costando mucho más que la diferencia de precio.",
      },
      {
        title: "Contratos con cláusulas que nadie leyó",
        text: "Revisiones automáticas, indexaciones parciales, penalizaciones por baja de consumo o por rescisión anticipada. En contratos de este tamaño la letra pequeña vale tanto como el precio de portada, y es lo primero que revisamos.",
      },
    ],
    palancas: [
      {
        title: "Agregar todos los puntos de suministro en una sola negociación",
        text: "Unificamos vencimientos y sacamos la cartera completa a mercado a la vez, con la curva agregada del grupo delante de varias comercializadoras.",
        impacto: "Negocias con el volumen del grupo, no sede a sede",
      },
      {
        title: "Ajustar la potencia por periodos contemplando los picos de equipamiento",
        text: "Calculamos la potencia sobre el maxímetro real y sobre el comportamiento de arranque de los equipos críticos, con margen suficiente para que nunca haya un exceso.",
        impacto: "Baja el término fijo sin poner en riesgo el equipamiento",
      },
      {
        title: "Control de demanda para que los arranques no coincidan",
        text: "Secuenciar arranques de imagen, esterilización y clima evita que un solapamiento puntual condicione la factura del mes entero.",
        impacto: "Suprime los recargos por exceso de potencia",
      },
      {
        title: "Reparametrizar la climatización sin tocar los requisitos clínicos",
        text: "Consignas, calendarios por sala, recuperadores y free-cooling revisados uno a uno. Se mantiene la exigencia normativa; se elimina lo que sobra.",
        impacto: "La partida de clima suele ser la mayor del centro",
      },
      {
        title: "Submedida por áreas",
        text: "Contadores secundarios por planta o por servicio para imputar el coste donde se genera y detectar desviaciones en cuanto aparecen, no un año después.",
        impacto: "Convierte la factura en información de gestión",
      },
      {
        title: "Revisión del equipo de medida, la reactiva y el alquiler",
        text: "Comprobamos que el equipo de medida sea el que corresponde a tu tarifa, que el alquiler facturado sea correcto y que no arrastres penalización por factor de potencia.",
        impacto: "Corrige cargos pequeños pero permanentes",
      },
    ],
    escenario: {
      titular: "Un grupo con tres centros y diagnóstico por imagen en uno de ellos",
      supuesto:
        "Escenario de cálculo sobre la estructura de las tarifas 3.0TD y 6.1TD. No corresponde a un cliente concreto: describe dónde aparece el dinero en un grupo de este perfil.",
      lineas: [
        {
          concepto: "Tres contratos independientes",
          detalle:
            "Firmados en tres momentos distintos, con tres precios distintos y sin vencimiento común.",
          efecto: "El grupo compra tres veces como pequeño en lugar de una como grande",
        },
        {
          concepto: "Potencia fijada por el pico del equipo de imagen",
          detalle:
            "Un arranque puntual marcó el maxímetro y la potencia se subió para cubrirlo, sin analizar la secuencia.",
          efecto: "Término fijo dimensionado por unos segundos al mes",
        },
        {
          concepto: "Base 24 h sin medir",
          detalle:
            "Consumo nocturno constante en los tres centros que nunca se ha desglosado por equipo.",
          efecto: "Coste continuo que no depende de la actividad asistencial",
        },
        {
          concepto: "Clima con parámetros de puesta en marcha",
          detalle:
            "Consignas y calendarios sin revisar desde la instalación, recuperadores sin verificar.",
          efecto: "Se climatiza igual con consulta llena que vacía",
        },
      ],
      cierre:
        "En un grupo de centros médicos el orden importa: primero se pone en orden la casa —potencia, base 24 h, clima, medida—, y solo después se sale a mercado con la cartera agregada. Al revés, se negocia sobre una curva que no representa lo que realmente vas a consumir.",
    },
    casoReal: {
      cifra: "20.000 €",
      pie: "de ahorro anual · nuestro récord con un solo cliente",
      titular: "Una fundación con varios centros: nuestro récord de ahorro",
      texto:
        "Es el máximo que hemos llegado a ahorrar a un solo cliente en un año: una fundación de Madrid con varios centros, entre ellos una residencia en 6.1TD y un centro de día en 3.0TD con placas solares. Y el caso sigue dando: la revisión de julio de 2026 —ocho facturas reproducidas periodo a periodo— destapó un nuevo margen de 12.533 € anuales, porque el sobreprecio de su indexado había crecido de 1,45 a 4,02 céntimos por kWh en cuatro meses y sus excedentes se compensaban a 3 céntimos cuando el mercado justificaba 10. La propuesta lo corrige con margen fijo de 0,5 céntimos y excedentes a 10, sin tocar potencias ni peajes: 5.107 € de mejora en las ocho facturas analizadas.",
    },
    faqs: [
      {
        question: "Tenemos varias sedes. ¿Se pueden unificar los contratos?",
        answer:
          "Sí, y suele ser la medida de mayor impacto. Lo habitual es alinear vencimientos —aunque haya que hacer alguna prórroga corta— y salir a mercado con la curva agregada de todos los puntos de suministro. Un grupo que negocia junto accede a condiciones que ninguna de sus sedes conseguiría por separado.",
      },
      {
        question: "¿No es arriesgado tocar la potencia contratada en una clínica?",
        answer:
          "Lo arriesgado es fijarla a ojo. Nosotros trabajamos sobre el maxímetro real de doce meses y sobre el comportamiento de arranque de los equipos críticos, y dejamos margen suficiente. En 3.0TD y 6.1TD no hay un limitador que corte el suministro, pero el objetivo no es ahorrar rozando el límite: es quitar el exceso que sobra y verificarlo en las primeras facturas.",
      },
      {
        question: "¿Vais a recomendarnos la comercializadora más barata?",
        answer:
          "Vamos a recomendaros la que mejor encaje con vuestro caso, y en un centro sanitario eso incluye solvencia, calidad de facturación y capacidad de respuesta, no solo el precio del kWh. Comparamos más de cuarenta compañías; cuando dos ofertas están cerca en precio, gana la que da mejor servicio.",
      },
      {
        question: "¿Podéis analizar también el gas y el agua caliente sanitaria?",
        answer:
          "El gas sí, y en centros con ACS o climatización por caldera es una parte importante del coste. Revisamos el escalón de peaje, el término fijo y el precio, y lo sacamos a mercado en el mismo proceso que la electricidad.",
      },
      {
        question: "¿Qué necesitáis para empezar y qué cuesta el estudio?",
        answer:
          "Doce meses de facturas de cada sede y el CUPS de cada suministro. El estudio no tiene coste ni obliga a nada: te entregamos el análisis con las medidas ordenadas por impacto, y decides tú qué se ejecuta y qué no.",
      },
    ],
    relacionados: [
      { label: "Consultoría energética", href: "/consultoria-energetica" },
      { label: "Optimización de potencia", href: "/optimizacion-potencia" },
      { label: "Monitorización de consumo", href: "/monitorizacion-consumo" },
      { label: "Penalizaciones eléctricas", href: "/penalizaciones-electricas" },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORES.find((s) => s.slug === slug);
}
