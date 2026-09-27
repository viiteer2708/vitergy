import { NextResponse } from "next/server";
import { leerSesion } from "@/lib/acceso/servidor";

// ¿Quién soy? Lo leen las piezas que necesitan saber si hay sesión.
export async function GET() {
  const sesion = await leerSesion();
  if (!sesion) {
    return NextResponse.json({ error: "Sin sesión." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json({ email: sesion.email }, { headers: { "Cache-Control": "no-store" } });
}
