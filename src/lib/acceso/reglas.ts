// ACCESO CON CÓDIGO POR EMAIL — reglas puras (sin red ni base de datos: este
// fichero se puede importar desde el navegador). Pieza compartida de la web:
// hoy la usa el email gate de los tests; mañana, cualquier zona privada.
// Doc: docs/acceso-con-codigo.md · BD: db/001_acceso_y_tests.sql

/** Cifras del código. */
export const CODIGO_CIFRAS = 6;
/** Minutos que vale un código desde que se pide. */
export const CODIGO_CADUCA_MIN = 10;
/** Segundos que «Reenviar código» se queda apagado tras cada envío. */
export const REENVIO_ESPERA_SEG = 30;
/** Días que dura la sesión una vez verificado el email. */
export const SESION_DIAS = 365;

/**
 * Topes de las peticiones. Los APLICA la base de datos, con cerrojo por email
 * y por IP (`vitergy_codigo_preparar`): contados desde aquí, una ráfaga en
 * paralelo se los saltaría. Los 5 intentos por código están fijados en la BD.
 */
export const LIMITES_CODIGO = {
  /** Códigos por email en 15 min: un «Reenviar» impaciente no bloquea. */
  codigos15min: 5,
  /** Códigos por email en 24 h. */
  codigos24h: 10,
  /** Intentos fallidos por email en 24 h, sumando todas sus peticiones. */
  fallos24h: 15,
  /** Peticiones por IP en 60 min, sean de quien sean. */
  peticionesIp60min: 30,
} as const;

/** Cookie de la sesión (JWT firmado, httpOnly, 365 días). */
export const COOKIE_SESION = "vitergy_sesion";
/** Cookie que liga el navegador con SU petición de código (solo un id aleatorio). */
export const COOKIE_CODIGO = "vitergy_codigo";

/**
 * Desde dónde se puede pedir un código. Decide el texto del correo («para…») y
 * queda como `origen` del suscriptor. Añadir un sitio nuevo = una línea aquí.
 */
export const ORIGENES = {
  "test-factura-luz": "ver y guardar el resultado de tu test de la factura de la luz",
} as const;
export type Origen = keyof typeof ORIGENES;

export function esOrigen(x: unknown): x is Origen {
  return typeof x === "string" && Object.prototype.hasOwnProperty.call(ORIGENES, x);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Email en minúsculas y sin espacios, o `null` si no parece un email. */
export function normalizarEmail(x: unknown): string | null {
  if (typeof x !== "string") return null;
  const email = x.trim().toLowerCase();
  return email.length <= 120 && EMAIL_RE.test(email) ? email : null;
}

/** Deja solo las cifras de lo tecleado o pegado («123 456») y exige que sean 6. */
export function normalizarCodigo(x: unknown): string | null {
  const cifras = String(x ?? "").replace(/\D/g, "");
  return cifras.length === CODIGO_CIFRAS ? cifras : null;
}
