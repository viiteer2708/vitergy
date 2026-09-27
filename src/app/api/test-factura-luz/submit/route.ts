import { NextResponse } from "next/server";
import { crearRateLimiter, ipDe, origenPermitido } from "@/lib/api-guardas";
import { rpc } from "@/lib/bd";
import { COOKIE_SESION, cookieSesion, leerSesion } from "@/lib/acceso/servidor";
import { calcularResultado, validarRespuestas } from "@/lib/tests/motor";
import { TEST_FACTURA_LUZ } from "@/lib/tests/factura-luz";

// Recibe las 15 respuestas, calcula el resultado AQUÍ (nunca se acepta uno
// calculado en el navegador) y lo guarda: uno por persona, repetir sobrescribe.
// Exige sesión: el email gate la crea con el acceso por código.
// Doc: docs/tests-interactivos.md

const limitado = crearRateLimiter(10);

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  if (limitado(ipDe(request))) {
    return NextResponse.json({ error: "Demasiados intentos seguidos. Espera un minuto." }, { status: 429 });
  }

  const sesion = await leerSesion();
  if (!sesion) {
    return NextResponse.json({ error: "Verifica tu email para guardar el resultado.", sinSesion: true }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { respuestas?: unknown } | null;
  const respuestas = validarRespuestas(TEST_FACTURA_LUZ, body?.respuestas);
  if (!respuestas) {
    return NextResponse.json({ error: "Faltan respuestas o alguna no es válida." }, { status: 422 });
  }

  const resultado = calcularResultado(TEST_FACTURA_LUZ, respuestas);

  let guardado: { estado: "ok"; fecha: string } | { estado: "sin_usuario" };
  try {
    guardado = await rpc("vitergy_test_guardar", {
      p_usuario_id: sesion.usuarioId,
      p_test: TEST_FACTURA_LUZ.slug,
      p_respuestas: respuestas,
      p_ejes: resultado.ejes,
      p_perfil: resultado.perfil,
    });
  } catch (error) {
    console.error("[test-factura-luz] No se pudo guardar:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "No hemos podido guardar tu resultado. Prueba otra vez en un momento." },
      { status: 503 }
    );
  }

  if (guardado.estado === "sin_usuario") {
    // La cuenta ya no existe (p. ej. borrada tras un año sin uso): sesión fuera.
    const res = NextResponse.json({ error: "Verifica tu email de nuevo.", sinSesion: true }, { status: 401 });
    res.cookies.set(COOKIE_SESION, "", { ...cookieSesion, maxAge: 0 });
    return res;
  }

  return NextResponse.json({ ...resultado, fecha: guardado.fecha });
}
