// Datos de contacto del formulario «Quiero empezar a ahorrar»: nombre, email y móvil, limpios y validados.
// Se usa en el servidor (/api/factura/lead) y vale también en el navegador (no usa nada de Node).
//
// MÓDULO HOJA: sin imports locales a propósito, para poder probarlo con `node --test` (expediente.test.mjs).

/** Quita saltos de línea, tabuladores y demás caracteres de control, y deja un solo espacio entre palabras. */
function sinControl(s: string): string {
  return s.replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Texto libre acotado y sin caracteres de control (la comercializadora que leyó la IA, p. ej.). Nunca falla. */
export function textoLimpio(x: unknown, max: number): string {
  return typeof x === "string" ? sinControl(x).slice(0, max) : "";
}

/** Nombre o razón social: de 2 a 80 caracteres, con al menos una letra. */
export function normalizarNombre(x: unknown): string | null {
  if (typeof x !== "string") return null;
  const nombre = sinControl(x);
  if (nombre.length < 2 || nombre.length > 80) return null;
  return /\p{L}/u.test(nombre) ? nombre : null;
}

// Misma forma que admite la API de avisos de Altavoz para «responder a» (lib/api/aviso.ts del repo altavoz): solo ASCII,
// una sola dirección. Si el aviso llevara un «responder a» que Altavoz rechaza (422), el aviso entero no saldría.
const EMAIL_DE_AVISO =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;

/** Email en minúsculas y con la forma que acepta Altavoz, o `null`. */
export function normalizarEmailContacto(x: unknown): string | null {
  if (typeof x !== "string") return null;
  const email = x.trim().toLowerCase();
  if (email.length > 120 || email.indexOf("@") > 64) return null;
  if (!EMAIL_DE_AVISO.test(email) || /^\.|\.\.|\.@/.test(email)) return null;
  return email;
}

/**
 * Móvil en formato internacional (`+34600123456`), o `null`.
 * - España: 9 cifras que empiezan por 6 o 7, con o sin «+34» / «0034», y con espacios, puntos o guiones.
 * - Otro país: debe llevar su prefijo con «+» (o «00») y tener de 8 a 15 cifras (E.164).
 * Un fijo español (8xx, 9xx) NO vale: pedimos el móvil para poder escribirle por WhatsApp.
 */
export function normalizarMovil(x: unknown): string | null {
  if (typeof x !== "string") return null;
  let t = x.trim().replace(/[\s().-]/g, "");
  if (t.startsWith("00")) t = "+" + t.slice(2);
  if (!/^\+?[0-9]+$/.test(t)) return null;
  if (t.startsWith("+")) {
    const cifras = t.slice(1);
    if (cifras.startsWith("34")) return /^34[67][0-9]{8}$/.test(cifras) ? "+" + cifras : null;
    return /^[1-9][0-9]{7,14}$/.test(cifras) ? "+" + cifras : null;
  }
  return /^[67][0-9]{8}$/.test(t) ? "+34" + t : null;
}
