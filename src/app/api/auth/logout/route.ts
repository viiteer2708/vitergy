import { NextResponse } from "next/server";
import { origenPermitido } from "@/lib/api-guardas";
import { COOKIE_SESION, cookieSesion } from "@/lib/acceso/servidor";

// Cerrar sesión: borra la cookie. La cuenta y los resultados siguen guardados.
export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_SESION, "", { ...cookieSesion, maxAge: 0 });
  return res;
}
