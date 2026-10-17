// Freno antiabuso de las rutas de la calculadora de ahorro (tandas T1 y T2 del embudo de la factura). SOLO servidor.
//
// El coste está en Gemini (free tier: una cuota diaria que, si se agota, deja a TODOS sin lector de facturas) y, en el
// formulario de datos, en el correo que recibe Victor. Capas, de la más barata a la más cara (cada ruta las aplica en
// este orden y ninguna llega a Gemini sin haberlas pasado todas):
//   1. Señuelo: un campo oculto que los humanos no ven y los bots rellenan o no mandan (`senueloDelata`, api-guardas.ts).
//   2. Tiempo mínimo: nadie sube una factura 2 s después de abrir la página. Señal BLANDA: la manda el navegador, así
//      que un bot que lea el código la falsea; sirve contra los scripts que repiten una petición sin más.
//   3. Cabecera real del fichero (src/lib/expediente/archivo.ts).
//   4. Cloudflare Turnstile verificado en el servidor (src/lib/turnstile.ts). Falla CERRADO en el lector; en el
//      formulario de datos (/lead) solo frena un token rechazado: si Cloudflare no contesta, el lead pasa.
//   5. Cuotas en la BASE DE DATOS (`vitergy_cuota`, db/002): por IP y global. Vercel no tiene memoria compartida, así que
//      un contador en memoria (api-guardas.ts) solo frena dentro de una instancia; este es el que cuenta de verdad.
//
// «Falla cerrado» = sin Turnstile, sin EXPEDIENTE_SECRET, sin la BD o sin el 002 aplicado, el lector de facturas
// responde «no disponible» y la calculadora sigue funcionando tecleando los datos a mano. Un freno que se apaga solo
// cuando algo falta no es un freno.
import { bdConfigurada, rpc } from "@/lib/bd";
import { descripcionSegura } from "@/lib/expediente/log";
import { huellaIp, secreto } from "@/lib/expediente/secreto";
import { claveSecreta, verificarTurnstile } from "@/lib/turnstile";

/** Los topes del diseño (§3). Cada uno es una ventana FIJA contada en la base de datos. */
export const CUOTAS = {
  /** Lecturas de factura con Gemini: 6 por hora y 20 al día por IP, y 400 al día en total. */
  lectura: { ipHora: 6, ipDia: 20, globalDia: 400 },
  /** Cálculo del estudio sin datos de contacto: 10 por hora por IP. */
  estudio: { ipHora: 10 },
  /** Formulario de datos: 5 por hora por IP y 3 al día por email. */
  lead: { ipHora: 5, emailDia: 3 },
} as const;

const HORA = 3_600;
const DIA = 86_400;

/** Milisegundos mínimos entre abrir la calculadora y subir la factura. */
export const MIN_MS_ABIERTA = 2_000;

/** ¿Se puede contar cuotas? Hace falta el secreto (para las huellas) y la base de datos. */
export function antiabusoDisponible(): boolean {
  return secreto() !== null && bdConfigurada();
}

/** ¿Faltan los milisegundos o son menos del mínimo? (Se exigen siempre: un cliente antiguo sin ellos pide recargar.) */
export function aperturaSospechosa(ms: unknown): boolean {
  return typeof ms !== "number" || !Number.isFinite(ms) || ms < MIN_MS_ABIERTA;
}

export type EstadoCuota =
  | { estado: "ok" }
  | { estado: "limite"; esperaSeg: number }
  | { estado: "no_disponible" };

/** Cuenta una petición contra una cuota y dice si cabe. Nunca lanza: si no se puede contar, `no_disponible`. */
export async function comprobarCuota(clave: string, limite: number, ventanaSeg: number): Promise<EstadoCuota> {
  if (!antiabusoDisponible()) return { estado: "no_disponible" };
  try {
    const r = await rpc<{ permitido: boolean; cuenta: number; espera_seg: number }>("vitergy_cuota", {
      p_clave: clave,
      p_limite: limite,
      p_ventana_seg: ventanaSeg,
    });
    return r.permitido ? { estado: "ok" } : { estado: "limite", esperaSeg: Math.max(1, r.espera_seg) };
  } catch (e) {
    console.error("[antiabuso] No se pudo contar la cuota:", descripcionSegura(e));
    return { estado: "no_disponible" };
  }
}

export type ResultadoLectura =
  | { estado: "ok" }
  | { estado: "ip"; esperaSeg: number }
  | { estado: "global" }
  | { estado: "no_disponible" };

/**
 * Las tres cuotas de una lectura con Gemini, de la más estrecha a la más ancha: así una IP que ya está bloqueada no
 * gasta cuota global. (Si pasa la de la hora pero cae la del día, la de la hora queda gastada: no merece una RPC atómica.)
 */
export async function cuotasDeLectura(ip: string): Promise<ResultadoLectura> {
  if (!antiabusoDisponible()) return { estado: "no_disponible" };
  const huella = huellaIp(ip);
  const { ipHora, ipDia, globalDia } = CUOTAS.lectura;

  const hora = await comprobarCuota(`lectura:ip:${huella}:h`, ipHora, HORA);
  if (hora.estado === "no_disponible") return hora;
  if (hora.estado === "limite") return { estado: "ip", esperaSeg: hora.esperaSeg };

  const dia = await comprobarCuota(`lectura:ip:${huella}:d`, ipDia, DIA);
  if (dia.estado === "no_disponible") return dia;
  if (dia.estado === "limite") return { estado: "ip", esperaSeg: dia.esperaSeg };

  const global = await comprobarCuota("lectura:global:d", globalDia, DIA);
  if (global.estado === "no_disponible") return global;
  if (global.estado === "limite") return { estado: "global" };
  return { estado: "ok" };
}

export type ResultadoTurnstileRuta = "ok" | "rechazado" | "no_disponible";

/** Comprueba el token de Turnstile de una petición. En el log queda el motivo, nunca el token. */
export async function comprobarTurnstile(token: unknown, ip: string): Promise<ResultadoTurnstileRuta> {
  if (claveSecreta() === null) {
    console.error("[antiabuso] Falta TURNSTILE_SECRET_KEY (o es una clave de prueba en producción): lector no disponible");
    return "no_disponible";
  }
  const r = await verificarTurnstile(token, ip);
  if (r.estado === "ok") return "ok";
  if (r.estado === "rechazado") {
    console.warn("[antiabuso] Turnstile rechazó el token:", r.codigos.join(","));
    return "rechazado";
  }
  console.error("[antiabuso] Turnstile no disponible:", r.detalle);
  return "no_disponible";
}
