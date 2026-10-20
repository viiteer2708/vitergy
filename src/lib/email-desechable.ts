import { Resolver } from "node:dns/promises";
import { LISTA_DESECHABLES } from "@/lib/dominios-desechables";

// ¿Es un email al que de verdad podemos escribir? Frena los buzones de usar y
// tirar (10minutemail y compañía) con los que los robots rellenan formularios
// (spam del 20-oct-2026 en la calculadora). Dos capas:
//   1. la lista (src/lib/dominios-desechables.ts, se regenera con
//      scripts/actualizar-desechables.mjs): el dominio o cualquiera de sus padres;
//   2. el DNS: estos servicios estrenan dominios cada semana, pero todos reciben
//      en SUS servidores (kjkpc.net → prd-smtp.10minutemail.com), así que si un
//      servidor de correo del dominio cuelga de un dominio de la lista, también
//      cae. Un dominio que no existe o no recibe correo, igual.
// Si el DNS no contesta a tiempo se ACEPTA: nunca perder un lead real por un
// fallo nuestro (la barrera principal es el Origin, lib/api-guardas.ts).

const DESECHABLES = new Set(LISTA_DESECHABLES.split("\n"));

export type VeredictoEmail = "ok" | "desechable" | "sin_correo";

/** El dominio o alguno de sus padres (sin llegar al TLD) está en la lista. */
function enLista(host: string): boolean {
  const partes = host.toLowerCase().replace(/\.$/, "").split(".");
  for (let i = 0; i < partes.length - 1; i++) {
    if (DESECHABLES.has(partes.slice(i).join("."))) return true;
  }
  return false;
}

// Memoria por instancia: el mismo dominio no se pregunta dos veces en 6 horas.
const cache = new Map<string, { veredicto: VeredictoEmail; hasta: number }>();
const CACHE_MS = 6 * 60 * 60 * 1000;

export async function comprobarEmail(email: string): Promise<VeredictoEmail> {
  const dominio = email.split("@").pop()?.toLowerCase() ?? "";
  if (!dominio || enLista(dominio)) return "desechable";

  const guardado = cache.get(dominio);
  if (guardado && guardado.hasta > Date.now()) return guardado.veredicto;

  const veredicto = await porDns(dominio);
  if (veredicto !== null) {
    if (cache.size > 1000) cache.clear();
    cache.set(dominio, { veredicto, hasta: Date.now() + CACHE_MS });
  }
  return veredicto ?? "ok";
}

/** null = el DNS no ha contestado (no se guarda en memoria y se acepta). */
async function porDns(dominio: string): Promise<VeredictoEmail | null> {
  const dns = new Resolver({ timeout: 1500, tries: 1 });
  try {
    const mx = (await dns.resolveMx(dominio)).filter((r) => r.exchange && r.exchange !== ".");
    if (mx.length === 0) return "sin_correo"; // MX nulo (RFC 7505): no recibe correo
    return mx.some((r) => enLista(r.exchange)) ? "desechable" : "ok";
  } catch (e) {
    const codigo = (e as { code?: string })?.code;
    if (codigo === "ENOTFOUND") return "sin_correo"; // el dominio no existe
    if (codigo !== "ENODATA") return null;
  }
  // Sin MX: puede recibir en su propia IP (RFC 5321).
  try {
    return (await dns.resolve4(dominio)).length > 0 ? "ok" : "sin_correo";
  } catch (e) {
    const codigo = (e as { code?: string })?.code;
    return codigo === "ENOTFOUND" || codigo === "ENODATA" ? "sin_correo" : null;
  }
}

/** Para el registro: solo el dominio, nunca la dirección entera. */
export function dominioDe(email: string): string {
  return email.split("@").pop()?.slice(0, 80) ?? "?";
}
