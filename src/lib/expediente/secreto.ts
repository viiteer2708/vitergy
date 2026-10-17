// Secreto del embudo de la factura y las claves que salen de él. SOLO servidor (usa node:crypto).
//
// Un solo secreto, `EXPEDIENTE_SECRET` (Vercel + .env.local; mínimo 32 caracteres), del que salen claves DISTINTAS según
// el uso, con el mismo patrón que `clave(uso)` de src/lib/acceso/servidor.ts. Va APARTE de `AUTH_SECRET` a propósito:
// rotar uno no debe tocar al otro. Hoy solo hace las huellas de IP y email; la vía rápida (T3) añadirá dos usos más:
// «iban» (AES-256-GCM del IBAN) y «enlaces» (firma de los enlaces de «seguir luego» y de descarga).
//
// MÓDULO HOJA: solo importa node:crypto, para poder probarlo con `node --test` (expediente.test.mjs).
import { createHmac } from "node:crypto";

/** El secreto, o `null` si falta o es demasiado corto (sin él, las rutas del embudo responden «no disponible»). */
export function secreto(): string | null {
  const s = process.env.EXPEDIENTE_SECRET;
  return s && s.length >= 32 ? s : null;
}

type Uso = "huellas";

function clave(uso: Uso): Buffer {
  const s = secreto();
  if (!s) throw new Error("Falta EXPEDIENTE_SECRET (mínimo 32 caracteres)");
  return createHmac("sha256", s).update(`vitergy-expediente:${uso}`).digest();
}

/** Huella de la IP: sirve para contar peticiones y para el `ip_hash` del expediente sin guardar la IP en claro. */
export function huellaIp(ip: string): string {
  return createHmac("sha256", clave("huellas")).update(`ip:${ip}`).digest("hex");
}

/** Huella del email (en minúsculas): el tope de solicitudes por email vive en la base de datos sin guardar el email. */
export function huellaEmail(email: string): string {
  return createHmac("sha256", clave("huellas")).update(`email:${email.toLowerCase()}`).digest("hex");
}
