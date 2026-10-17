// Tipo REAL de un fichero, por su cabecera (los «magic bytes»), no por lo que diga el navegador.
//
// El navegador declara un tipo (`file.type`) que cualquiera puede falsear. Antes de gastar cuota de Gemini, de
// guardar nada en el almacén o de adjuntar algo a un correo, se mira que los primeros bytes sean de verdad los de
// un PDF o una foto. Es el control de «cabecera real del fichero» del diseño del embudo (§3).
//
// MÓDULO HOJA: sin imports locales a propósito, para poder probarlo con `node --test` (expediente.test.mjs).

export type TipoArchivo =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/heic"
  | "image/heif";

/** Los únicos tipos que admite la factura y los documentos del expediente (los mismos que el bucket). */
export const TIPOS_ARCHIVO: readonly TipoArchivo[] = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

/** Extensión con la que se guarda y se adjunta cada tipo. NUNCA se usa el nombre que traía el fichero. */
export const EXTENSION_DE_TIPO: Record<TipoArchivo, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};

/**
 * Tope de caracteres base64 de una factura. Vercel corta las peticiones a 4,5 MB: esto deja margen para el resto del
 * JSON (≈ 3,1 MB reales de archivo). Es el mismo tope que ya tenía /api/factura/analizar.
 */
export const MAX_BASE64_CHARS = 4_200_000;

/** Lo máximo que admite Altavoz como adjuntos de un aviso (bytes reales, ya decodificados). */
export const MAX_BYTES_ADJUNTO_AVISO = 3_000_000;

const ascii = (b: Uint8Array, desde: number, hasta: number): string =>
  String.fromCharCode(...b.subarray(desde, hasta));

// Marcas («brands») del contenedor HEIF/ISOBMFF: heic* son fotos HEVC de iPhone; mif1/msf1/heif, el contenedor genérico.
const MARCAS_HEIC = new Set(["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs"]);
const MARCAS_HEIF = new Set(["mif1", "msf1", "heif"]);

/** El tipo real según los primeros bytes (basta con los primeros 12), o `null` si no es ninguno de los admitidos. */
export function tipoRealDeBytes(b: Uint8Array): TipoArchivo | null {
  if (b.length >= 5 && ascii(b, 0, 5) === "%PDF-") return "application/pdf";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (
    b.length >= 8 &&
    b[0] === 0x89 &&
    ascii(b, 1, 4) === "PNG" &&
    b[4] === 0x0d &&
    b[5] === 0x0a &&
    b[6] === 0x1a &&
    b[7] === 0x0a
  ) {
    return "image/png";
  }
  // WebP: «RIFF», 4 bytes de tamaño, «WEBP».
  if (b.length >= 12 && ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP") return "image/webp";
  // HEIC/HEIF: «ftyp» en el byte 4 y la marca en el 8.
  if (b.length >= 12 && ascii(b, 4, 8) === "ftyp") {
    const marca = ascii(b, 8, 12);
    if (MARCAS_HEIC.has(marca)) return "image/heic";
    if (MARCAS_HEIF.has(marca)) return "image/heif";
  }
  return null;
}

/**
 * ¿El tipo que dice el navegador es el mismo que el real? HEIC y HEIF cuentan como uno (el navegador a veces dice
 * una y el fichero lleva la otra) e `image/jpg` como `image/jpeg`.
 */
export function mismaFamilia(declarado: string, real: TipoArchivo): boolean {
  const familia = (t: string): string =>
    t === "image/heic" || t === "image/heif" ? "heif" : t === "image/jpg" ? "image/jpeg" : t;
  return familia(declarado) === familia(real);
}

const BASE64_ESTRICTO = /^[A-Za-z0-9+/]+={0,2}$/;

/** Base64 estándar y estricto de punta a punta: solo su alfabeto, relleno `=` al final y longitud múltiplo de 4. */
export function base64Valido(s: string): boolean {
  return s.length > 0 && s.length % 4 === 0 && BASE64_ESTRICTO.test(s);
}

/** Los bytes que salen de un base64 válido, sin decodificarlo. */
export function bytesDeBase64(s: string): number {
  return (s.length / 4) * 3 - (s.endsWith("==") ? 2 : s.endsWith("=") ? 1 : 0);
}

/**
 * Valida una factura que llega en base64 desde el navegador y devuelve su tipo REAL, o `null` si no vale: no son textos,
 * pesa demasiado, no es base64 estricto, su cabecera no es la de un PDF o una foto admitidos, o el tipo que dice el
 * navegador no es el del fichero. La usan /api/factura/analizar (antes de gastar Gemini) y /api/factura/lead (antes de guardar).
 */
export function tipoDeFacturaBase64(base64: unknown, mimeType: unknown): TipoArchivo | null {
  if (typeof base64 !== "string" || typeof mimeType !== "string") return null;
  if (base64.length > MAX_BASE64_CHARS || !base64Valido(base64)) return null;
  const cabecera = cabeceraDeBase64(base64);
  if (!cabecera) return null;
  const real = tipoRealDeBytes(cabecera);
  return real && mismaFamilia(mimeType, real) ? real : null;
}

/**
 * Los primeros bytes de un base64 SIN decodificarlo entero (24 caracteres → 18 bytes): con eso basta para
 * `tipoRealDeBytes` y no cuesta nada en una petición de 4 MB. `null` si el principio no es base64.
 */
export function cabeceraDeBase64(s: string): Uint8Array | null {
  const n = Math.min(24, s.length - (s.length % 4));
  if (n < 4) return null;
  const trozo = s.slice(0, n);
  if (!BASE64_ESTRICTO.test(trozo)) return null;
  try {
    const binario = atob(trozo);
    const out = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) out[i] = binario.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}
