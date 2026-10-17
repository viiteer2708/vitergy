// Cloudflare Turnstile (el antispam sin rompecabezas): el navegador resuelve el reto y manda un token de UN solo uso;
// aquí, en el servidor, se comprueba con la clave secreta. SOLO servidor. Copia adaptada de
// altavoz/lib/formularios/turnstile.ts (mismo criterio: lo que falla, falla CERRADO).
//
// - Si Cloudflare no contesta a tiempo, NO se deja pasar: un antispam que se cae abierto no es un antispam.
// - Sin `TURNSTILE_SECRET_KEY` tampoco se deja pasar nada (ni en local: para probar se usan las claves de prueba de
//   Cloudflare, que SIEMPRE pasan; ver `esClaveDePrueba`).
// - En producción las claves de prueba no valen (con ellas cualquier token pasaría).
// - Variables: `TURNSTILE_SECRET_KEY` (servidor) y `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (la clave pública del widget: es la
//   ÚNICA `NEXT_PUBLIC_` legítima de este repo, porque el navegador la necesita para pintar el reto; no es un secreto).
//
// MÓDULO HOJA: sin imports locales, para poder probarlo con `node --test` (expediente.test.mjs).

export const URL_VERIFICACION = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Las claves de prueba de Cloudflare (siempre pasa / siempre falla / token ya gastado). */
const CLAVE_DE_PRUEBA = /^[123]x0{20,}[A-Za-z0-9]*$/;

export type ResultadoTurnstile =
  | { estado: "ok"; hostname: string | null }
  | { estado: "rechazado"; codigos: string[] }
  | { estado: "no_disponible"; detalle: string };

export function esClaveDePrueba(clave: string): boolean {
  return CLAVE_DE_PRUEBA.test(clave);
}

/** ¿Es el despliegue de producción de Vercel? (Fuera de él: local, previews.) */
export function esProduccion(): boolean {
  return process.env.VERCEL_ENV === "production";
}

/**
 * La clave secreta lista para usar, o `null`: falta, es demasiado corta o es una clave de prueba EN PRODUCCIÓN.
 * `null` significa «el antispam no está listo» y la ruta responde «lector no disponible».
 */
export function claveSecreta(produccion: boolean = esProduccion()): string | null {
  const s = process.env.TURNSTILE_SECRET_KEY;
  if (!s || s.length < 10) return null;
  if (produccion && esClaveDePrueba(s)) return null;
  return s;
}

/**
 * Comprueba el token de una petición. `ip` es la de quien la hace (Cloudflare la cruza con la del reto).
 * Nunca lanza: si Cloudflare no contesta a tiempo o da un error, devuelve `no_disponible`.
 */
export async function verificarTurnstile(
  token: unknown,
  ip: string | null,
  opciones: { fetchFn?: typeof fetch; esperaMs?: number; secreta?: string | null } = {}
): Promise<ResultadoTurnstile> {
  const secreta = opciones.secreta === undefined ? claveSecreta() : opciones.secreta;
  if (!secreta) return { estado: "no_disponible", detalle: "Falta TURNSTILE_SECRET_KEY (o es de prueba en producción)" };
  if (typeof token !== "string" || token.length < 10 || token.length > 4096) {
    return { estado: "rechazado", codigos: ["missing-input-response"] };
  }
  const fetchFn = opciones.fetchFn ?? globalThis.fetch;
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), opciones.esperaMs ?? 5_000);
  try {
    const cuerpo = new URLSearchParams({ secret: secreta, response: token });
    if (ip && ip !== "desconocida") cuerpo.set("remoteip", ip);
    const res = await fetchFn(URL_VERIFICACION, {
      method: "POST",
      body: cuerpo,
      signal: control.signal,
      cache: "no-store",
    });
    if (!res.ok) return { estado: "no_disponible", detalle: `Cloudflare respondió ${res.status}` };
    const datos = (await res.json()) as { success?: boolean; "error-codes"?: string[]; hostname?: string };
    if (datos.success === true) {
      return { estado: "ok", hostname: typeof datos.hostname === "string" ? datos.hostname.toLowerCase() : null };
    }
    const codigos = Array.isArray(datos["error-codes"])
      ? datos["error-codes"].filter((c) => typeof c === "string").slice(0, 5)
      : [];
    // Un fallo del lado de Cloudflare o de nuestra clave no es culpa de la persona: no se le dice que es un robot.
    if (codigos.some((c) => c === "internal-error" || c === "invalid-input-secret" || c === "missing-input-secret")) {
      return { estado: "no_disponible", detalle: `Cloudflare: ${codigos.join(", ")}` };
    }
    return { estado: "rechazado", codigos };
  } catch (e) {
    return { estado: "no_disponible", detalle: e instanceof Error ? e.name : "error" };
  } finally {
    clearTimeout(reloj);
  }
}
