// Almacén privado de los documentos del expediente: el bucket `vitergy-expedientes` de Supabase Storage (en el mismo
// proyecto de DPC que la base de datos, 0 € extra). SOLO servidor: usa la llave de servicio.
//
// En T1 solo se sube desde aquí la FACTURA (la manda el navegador en base64 junto a los datos de contacto y la sube el
// servidor). Los DNI/CIF de la vía rápida (T3) los subirá el navegador directo con URL firmada, para que no pasen por Vercel.
// Regla de las rutas: «<carpeta>/<tipo>-<aleatorio>.<ext>». La carpeta es un nonce de 128 bits y la extensión sale del tipo
// real del fichero: el nombre original NUNCA llega al almacén ni a la base de datos.
import { randomBytes } from "node:crypto";
import { EXTENSION_DE_TIPO, type TipoArchivo } from "./archivo";
import { descripcionSegura } from "./log";

export const BUCKET = "vitergy-expedientes";

export type TipoDocumento = "factura" | "dni_anverso" | "dni_reverso" | "cif";

/** Carpeta nueva de un expediente: 32 hex aleatorios (el nonce). */
export function nuevaCarpeta(): string {
  return randomBytes(16).toString("hex");
}

/** Ruta del objeto dentro del bucket (coincide con el CHECK de `expediente_documentos.ruta` en db/002). */
export function rutaDeDocumento(carpeta: string, tipo: TipoDocumento, mime: TipoArchivo): string {
  return `${carpeta}/${tipo}-${randomBytes(6).toString("hex")}.${EXTENSION_DE_TIPO[mime]}`;
}

/**
 * Sube un objeto al bucket. Devuelve si el almacén lo aceptó. Nunca lanza: el aviso a hola@ lleva la factura adjunta aunque
 * esto falle, así que el fallo se registra (sin datos) y se sigue.
 * `x-upsert: false`: si la ruta ya existiera, no se pisa nada.
 */
export async function subirObjeto(ruta: string, contenido: Uint8Array, mime: TipoArchivo): Promise<boolean> {
  const url = process.env.DPC_SUPABASE_URL;
  const key = process.env.DPC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const rutaUrl = ruta.split("/").map(encodeURIComponent).join("/");
  try {
    const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${rutaUrl}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": mime,
        "x-upsert": "false",
        "cache-control": "max-age=3600",
      },
      // Uint8Array es un cuerpo válido de fetch; el cast evita el roce de tipos entre Buffer y BodyInit.
      body: contenido as unknown as BodyInit,
      // Si algún día redirigieran, la llave de servicio no se manda a otro sitio.
      redirect: "error",
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) {
      // Storage envuelve sus errores: contesta HTTP 400 y el código de verdad va dentro del cuerpo (EntityTooLarge, InvalidMimeType…).
      const cuerpo = (await res.json().catch(() => null)) as { statusCode?: unknown; error?: unknown } | null;
      const interno = typeof cuerpo?.statusCode === "string" || typeof cuerpo?.statusCode === "number" ? String(cuerpo.statusCode) : "?";
      const codigo = typeof cuerpo?.error === "string" ? cuerpo.error.slice(0, 40) : "?";
      console.error(`[expediente] El almacén rechazó la subida: HTTP ${res.status}, interno ${interno}, ${codigo}`);
    }
    return res.ok;
  } catch (e) {
    console.error("[expediente] No se pudo hablar con el almacén:", descripcionSegura(e));
    return false;
  }
}
