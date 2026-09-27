// MOTOR DE LOS TESTS INTERACTIVOS — tipos y puntuación en funciones puras.
// Un test es SOLO datos (un fichero como factura-luz.ts); este motor lo puntúa
// igual en todos. La puntuación que vale es la del SERVIDOR (/api/test-*/submit):
// el navegador nunca calcula ni manda el resultado.
// Doc: docs/tests-interactivos.md

export interface Eje {
  id: string;
  nombre: string;
  /** Qué mide, en una línea (sale bajo la barra del resultado). */
  descripcion: string;
  /** Color de su barra (tokens de la web). */
  color: string;
}

export interface Pregunta {
  texto: string;
  /** En qué ejes puntúa y con qué peso (1 o 0,5). */
  pesos: Record<string, 1 | 0.5>;
}

export interface Bloque {
  nombre: string;
  emoji: string;
  /** Frase de la pantalla de entrada del bloque. */
  entradilla: string;
  /** «¿Sabías que…?» de la mini-recompensa al terminarlo. */
  dato: string;
  preguntas: Pregunta[];
}

export interface Perfil {
  id: string;
  nombre: string;
  emoji: string;
  /** Una línea bajo el nombre. */
  lema: string;
  parrafos: string[];
  leerMas?: { texto: string; href: string };
}

export interface DefinicionTest {
  /** Nombre en la base de datos (columna `test`). */
  slug: string;
  /** Ruta de la página, p. ej. /test-factura-luz. */
  ruta: string;
  /** Ruta de su API (submit y resultado). */
  api: string;
  /** Desde dónde se pide el código del email gate (ver ORIGENES de acceso/reglas.ts). */
  origen: "test-factura-luz";
  titulo: string;
  entradilla: string;
  emoji: string;
  minutos: number;
  /** Aviso visible en la intro y en el resultado. */
  aviso: string;
  /** Etiquetas de la escala: la posición es el valor (0 = nada … 4 = del todo). */
  escala: string[];
  ejes: Eje[];
  bloques: Bloque[];
  perfiles: Perfil[];
  reglas: {
    /** Todos los ejes ≥ este valor → perfil «todo alto». */
    umbralAlto: number;
    /** Todos los ejes < este valor → perfil «todo bajo». */
    umbralBajo: number;
    perfilTodoAlto: string;
    perfilTodoBajo: string;
    /** Perfil de cada eje cuando es el dominante. */
    perfilPorEje: Record<string, string>;
  };
  analisis: string[];
  resultado: {
    ctaTitulo: string;
    ctaBoton: string;
    ctaHref: string;
    /** Texto de WhatsApp; `{perfil}` se sustituye por el nombre del perfil. */
    whatsapp: string;
    /** Texto al compartir; `{perfil}` igual. */
    compartir: string;
  };
}

export type Ejes = Record<string, number>;

export interface Resultado {
  perfil: string;
  ejes: Ejes;
}

export function preguntasDe(test: DefinicionTest): Pregunta[] {
  return test.bloques.flatMap((b) => b.preguntas);
}

/** Las respuestas si son válidas (una por pregunta, enteras de 0 a 4); si no, `null`. */
export function validarRespuestas(test: DefinicionTest, x: unknown): number[] | null {
  const total = preguntasDe(test).length;
  const max = test.escala.length - 1;
  if (!Array.isArray(x) || x.length !== total) return null;
  return x.every((v) => Number.isInteger(v) && v >= 0 && v <= max) ? (x as number[]) : null;
}

/** Cada eje de 0 a 100: lo sumado sobre lo máximo que podía sumar. */
export function calcularEjes(test: DefinicionTest, respuestas: number[]): Ejes {
  const max = test.escala.length - 1;
  const suma: Record<string, number> = {};
  const tope: Record<string, number> = {};
  preguntasDe(test).forEach((p, i) => {
    for (const [eje, peso] of Object.entries(p.pesos)) {
      suma[eje] = (suma[eje] ?? 0) + respuestas[i] * peso;
      tope[eje] = (tope[eje] ?? 0) + max * peso;
    }
  });
  return Object.fromEntries(
    test.ejes.map((e) => [e.id, tope[e.id] ? Math.round((suma[e.id] / tope[e.id]) * 100) : 0])
  );
}

/** Todo alto → «todo alto»; todo bajo → «todo bajo»; si no, el eje dominante (empate: el primero). */
export function elegirPerfil(test: DefinicionTest, ejes: Ejes): string {
  const { umbralAlto, umbralBajo, perfilTodoAlto, perfilTodoBajo, perfilPorEje } = test.reglas;
  const valores = test.ejes.map((e) => ejes[e.id] ?? 0);
  if (valores.every((v) => v >= umbralAlto)) return perfilTodoAlto;
  if (valores.every((v) => v < umbralBajo)) return perfilTodoBajo;
  let dominante = test.ejes[0];
  for (const e of test.ejes) {
    if ((ejes[e.id] ?? 0) > (ejes[dominante.id] ?? 0)) dominante = e;
  }
  return perfilPorEje[dominante.id];
}

export function calcularResultado(test: DefinicionTest, respuestas: number[]): Resultado {
  const ejes = calcularEjes(test, respuestas);
  return { ejes, perfil: elegirPerfil(test, ejes) };
}
