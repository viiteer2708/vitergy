// TEST «¿Estás pagando la luz de más sin saberlo?» — TODO el contenido vive aquí.
// Cambiar una pregunta, un texto de perfil o un dato = tocar solo este fichero.
// Diseño aprobado por Victor el 27-sep-2026 (ver decisiones.md).
//
// Reglas del contenido (las de toda la web, ver CLAUDE.md y el wiki):
//   · nada de cifras de ahorro inventadas: la cifra exacta sale de la factura;
//   · nada de rankings ni «la compañía más barata»: Vitergy es independiente;
//   · todas las frases puntúan en el mismo sentido (más de acuerdo = más fuga),
//     así «todo Para nada» da el perfil blindado y «todo Totalmente» la tormenta.

import type { DefinicionTest } from "./motor";

export const TEST_FACTURA_LUZ: DefinicionTest = {
  slug: "factura-luz",
  ruta: "/test-factura-luz",
  api: "/api/test-factura-luz",
  origen: "test-factura-luz",
  titulo: "¿Estás pagando la luz de más sin saberlo?",
  entradilla:
    "15 preguntas rápidas sobre tu contrato, tu potencia y tu día a día. Al final sabrás por dónde se te escapa el dinero de la factura.",
  emoji: "⚡",
  minutos: 4,
  aviso: "Test orientativo: la cifra exacta de lo que puedes ahorrar solo sale de tu factura.",
  escala: ["Para nada", "Poco", "A medias", "Bastante", "Totalmente"],

  ejes: [
    {
      id: "contrato",
      nombre: "Contrato",
      descripcion: "Lo que pagas por cada kWh y los extras de tu factura",
      color: "#ea580c",
    },
    {
      id: "potencia",
      nombre: "Potencia",
      descripcion: "Los kilovatios que pagas cada día, gastes o no",
      color: "#4f46e5",
    },
    {
      id: "habitos",
      nombre: "Hábitos",
      descripcion: "Cuándo y cómo gastas la luz en casa",
      color: "#0d9488",
    },
  ],

  bloques: [
    {
      nombre: "Tu contrato",
      emoji: "📄",
      entradilla: "Lo que firmaste… o lo que te firmaron.",
      dato: "Cambiar de compañía no te deja sin luz ni un minuto.",
      preguntas: [
        { texto: "Llevo años con la misma compañía sin comparar precios.", pesos: { contrato: 1 } },
        { texto: "Mi factura subió cuando se acabó una oferta o un descuento.", pesos: { contrato: 1 } },
        {
          texto: "Pago extras (mantenimiento, seguro, asistencia…) que no recuerdo haber pedido.",
          pesos: { contrato: 1 },
        },
        { texto: "No sé si tengo precio fijo, indexado o la tarifa regulada.", pesos: { contrato: 1 } },
        { texto: "De la factura solo miro el total.", pesos: { contrato: 0.5, potencia: 0.5 } },
      ],
    },
    {
      nombre: "Tu potencia",
      emoji: "🔌",
      entradilla: "La parte fija: la pagas todos los días, gastes o no.",
      dato: "Puedes tener una potencia de día y otra distinta de noche.",
      preguntas: [
        { texto: "No sé cuántos kW de potencia tengo contratados.", pesos: { potencia: 1 } },
        {
          texto: "En casa nunca salta el automático, aunque ponga muchas cosas a la vez.",
          pesos: { potencia: 1 },
        },
        { texto: "No he revisado la potencia desde que vivo aquí.", pesos: { potencia: 1 } },
        {
          texto: "Aunque apenas esté en casa, la factura casi no baja.",
          pesos: { potencia: 1, contrato: 0.5 },
        },
        {
          texto: "Cuando contraté la luz, nadie me preguntó qué aparatos tengo.",
          pesos: { potencia: 1, contrato: 0.5 },
        },
      ],
    },
    {
      nombre: "Tu día a día",
      emoji: "🏠",
      entradilla: "Cuándo y cómo gastas la luz en casa.",
      dato: "Las horas más baratas de la luz cambian cada día.",
      preguntas: [
        { texto: "Pongo la lavadora o el lavavajillas sin mirar la hora.", pesos: { habitos: 1 } },
        { texto: "No sé qué horas del día son las más caras.", pesos: { habitos: 1 } },
        {
          texto: "Dejo la tele, la consola o los cargadores enchufados todo el día.",
          pesos: { habitos: 1 },
        },
        {
          texto: "Tengo algún electrodoméstico grande con más de 10 años (nevera, congelador, termo…).",
          pesos: { habitos: 1 },
        },
        {
          texto: "La calefacción o el aire acondicionado van a tope y sin programar.",
          pesos: { habitos: 1, potencia: 0.5 },
        },
      ],
    },
  ],

  perfiles: [
    {
      id: "contrato-dormido",
      nombre: "Contrato Dormido",
      emoji: "😴",
      lema: "Tu fuga está en el contrato.",
      parrafos: [
        "Tu mayor fuga no está en cómo usas la luz, sino en lo que firmaste (o te firmaron). Ofertas que se acabaron sin avisar, años sin comparar y extras que nadie te explicó: el contrato se queda dormido y la factura sigue subiendo mientras tanto.",
        "La buena noticia es que es la fuga más fácil de tapar: no tienes que cambiar ninguna costumbre ni comprar nada. Basta con poner tu precio real al lado de lo que hay hoy en el mercado y quitar lo que sobra.",
        "Y cambiar de compañía no corta la luz: no te quedas ni un minuto sin suministro, y el papeleo lo hago yo.",
      ],
      leerMas: { texto: "Cómo cambiar de compañía de luz paso a paso", href: "/blog/como-cambiar-compania-luz" },
    },
    {
      id: "potencia-fantasma",
      nombre: "Potencia Fantasma",
      emoji: "👻",
      lema: "Pagas kilovatios que no usas.",
      parrafos: [
        "La potencia es la parte fija de tu factura: la pagas todos los días, pongas o no la lavadora. Tus respuestas apuntan a que tienes más de la que necesitas, o a que nadie la ha revisado nunca.",
        "Es un gasto silencioso: no se nota en el día a día, pero se repite en cada factura, mes tras mes. Ajustarla a lo que de verdad usas es un cambio pequeño que se nota en todas las facturas.",
        "Eso sí: bajarla a ojo es mala idea, porque si te quedas corto saltará el automático. Hay que mirarlo con tus datos reales de consumo.",
      ],
      leerMas: { texto: "Cómo saber qué potencia necesitas", href: "/blog/optimizar-potencia-contratada" },
    },
    {
      id: "consumo-vampiro",
      nombre: "Consumo Vampiro",
      emoji: "🧛",
      lema: "Tus horarios y tus aparatos te chupan la factura.",
      parrafos: [
        "Tu contrato y tu potencia no parecen el problema principal: la fuga está en el día a día. Electrodomésticos que se ponen en las horas caras, aparatos que nunca se apagan del todo y alguno veterano que gasta más de la cuenta.",
        "Aquí el ahorro depende de ti, y la clave es saber cuándo sale más barato consumir. Con eso y dos o tres costumbres nuevas, la factura lo nota.",
        "Ojo: si tu tarifa cobra lo mismo a todas horas, cambiar de horario rinde menos. Por eso conviene revisar a la vez tus hábitos y tu contrato.",
      ],
      leerMas: { texto: "Mira las horas más baratas de hoy", href: "/precio-luz-hoy" },
    },
    {
      id: "factura-tormenta",
      nombre: "Factura Tormenta",
      emoji: "🌪️",
      lema: "Fugas por todas partes.",
      parrafos: [
        "Contrato, potencia y hábitos: las tres fugas están abiertas a la vez. No es culpa tuya: la factura de la luz está hecha para que casi nadie la entienda, y cuando todo se junta, se dispara.",
        "Lo bueno de tu caso es que hay margen por todos lados. Empezar por el contrato y la potencia es lo que antes se nota, porque no te obliga a cambiar nada en casa.",
        "Mi consejo: no lo dejes para otro mes. Pásame tu factura y te digo por dónde empezar.",
      ],
      leerMas: { texto: "Aprende a leer tu factura de la luz", href: "/blog/entender-factura-luz" },
    },
    {
      id: "factura-blindada",
      nombre: "Factura Blindada",
      emoji: "🛡️",
      lema: "Lo tienes bastante controlado.",
      parrafos: [
        "Conoces tu contrato, tu potencia tiene sentido y tus costumbres no disparan la factura. Pocas fugas a la vista: enhorabuena.",
        "Aun así, los precios cambian cada pocos meses y las ofertas de hoy no son las de cuando firmaste. Una revisión de vez en cuando es la mejor manera de seguir así.",
        "¿Quieres confirmarlo con números? Sube tu factura: si hay ahorro, te lo digo; si no, te quedas tranquilo.",
      ],
    },
  ],

  reglas: {
    umbralAlto: 65,
    umbralBajo: 45,
    perfilTodoAlto: "factura-tormenta",
    perfilTodoBajo: "factura-blindada",
    perfilPorEje: {
      contrato: "contrato-dormido",
      potencia: "potencia-fantasma",
      habitos: "consumo-vampiro",
    },
  },

  analisis: [
    "Revisando tu contrato…",
    "Midiendo tu potencia…",
    "Repasando tus hábitos…",
    "Buscando tus fugas…",
  ],

  resultado: {
    ctaTitulo: "Ponle cifra a tu fuga",
    ctaBoton: "Sube tu factura y te digo cuánto ahorras",
    ctaHref: "/contacto",
    whatsapp:
      "Hola Víctor, he hecho el test de la factura de la luz en vitergy.es y me ha salido «{perfil}». ¿Me ayudas a revisarlo?",
    compartir: "Me ha salido «{perfil}» en el test de la factura de la luz de Vitergy. ¿Y a ti?",
  },
};
