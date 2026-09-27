// ACCESO CON CÓDIGO POR EMAIL — la parte de servidor: criptografía y sesión.
// NO importar desde componentes de cliente (usa node:crypto y el secreto).
//
// Un solo secreto, `AUTH_SECRET` (Vercel + .env.local), del que salen dos
// claves distintas: una firma las sesiones y otra hace las huellas de códigos
// e IPs. Quien lea la BD no puede probar el millón de códigos sin el secreto.
// Doc: docs/acceso-con-codigo.md

import { createHmac, randomInt, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { bdConfigurada } from "@/lib/bd";
import { CODIGO_CIFRAS, COOKIE_CODIGO, COOKIE_SESION, SESION_DIAS } from "./reglas";

export interface Sesion {
  usuarioId: string;
  email: string;
}

function secreto(): string | null {
  const s = process.env.AUTH_SECRET;
  return s && s.length >= 32 ? s : null;
}

/** ¿Está todo lo necesario? Si no, las rutas responden 503 y la web sigue en pie. */
export function accesoDisponible(): boolean {
  return secreto() !== null && bdConfigurada();
}

function clave(uso: "sesion" | "huellas"): Buffer {
  const s = secreto();
  if (!s) throw new Error("Falta AUTH_SECRET (mínimo 32 caracteres)");
  return createHmac("sha256", s).update(`vitergy:${uso}`).digest();
}

/** Código de 6 cifras, con ceros a la izquierda y de fuente criptográfica. */
export function generarCodigo(): string {
  return String(randomInt(0, 10 ** CODIGO_CIFRAS)).padStart(CODIGO_CIFRAS, "0");
}

export function nuevaPeticionId(): string {
  return randomUUID();
}

/** Huella del código. El id de la petición entra en el mensaje: la misma cifra en dos peticiones da dos huellas. */
export function huellaCodigo(peticionId: string, codigo: string): string {
  return createHmac("sha256", clave("huellas")).update(`codigo:${peticionId}:${codigo}`).digest("hex");
}

/** Huella de la IP: sirve para contar peticiones sin guardar la IP en claro. */
export function huellaIp(ip: string): string {
  return createHmac("sha256", clave("huellas")).update(`ip:${ip}`).digest("hex");
}

export function firmarSesion(sesion: Sesion): Promise<string> {
  return new SignJWT({ email: sesion.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sesion.usuarioId)
    .setIssuedAt()
    .setExpirationTime(`${SESION_DIAS}d`)
    .sign(clave("sesion"));
}

/** La sesión de quien hace la petición, o `null` (sin cookie, caducada, manipulada o sin secreto). */
export async function leerSesion(): Promise<Sesion | null> {
  if (!secreto()) return null;
  const token = (await cookies()).get(COOKIE_SESION)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, clave("sesion"), { algorithms: ["HS256"] });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    return { usuarioId: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

const base = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

/** Cookie de sesión: toda la web, 365 días. */
export const cookieSesion = { ...base, path: "/", maxAge: SESION_DIAS * 24 * 60 * 60 };
/** Cookie de la petición de código: solo viaja a /api/auth y dura lo justo. */
export const cookieCodigo = { ...base, path: "/api/auth", maxAge: 15 * 60 };

export { COOKIE_CODIGO, COOKIE_SESION };
