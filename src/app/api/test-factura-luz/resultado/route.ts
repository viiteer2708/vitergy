import { NextResponse } from "next/server";
import { rpc } from "@/lib/bd";
import { leerSesion } from "@/lib/acceso/servidor";
import { TEST_FACTURA_LUZ } from "@/lib/tests/factura-luz";

// Al abrir el test: ¿hay sesión? ¿hay un resultado guardado? Con sesión, el
// test se salta el email gate y la intro ofrece ver el último resultado.
export async function GET() {
  const noCache = { "Cache-Control": "no-store" };
  const sesion = await leerSesion();
  if (!sesion) {
    // 200 y no 401: es lo normal para quien llega nuevo (y no ensucia la consola).
    return NextResponse.json({ email: null, resultado: null }, { headers: noCache });
  }

  let resultado: { perfil: string; ejes: Record<string, number>; fecha: string } | null = null;
  try {
    resultado = await rpc("vitergy_test_resultado", {
      p_usuario_id: sesion.usuarioId,
      p_test: TEST_FACTURA_LUZ.slug,
    });
  } catch (error) {
    // Sin la BD el test sigue funcionando: solo no enseñamos el resultado anterior.
    console.error("[test-factura-luz] No se pudo leer el resultado:", error instanceof Error ? error.message : error);
  }
  return NextResponse.json({ email: sesion.email, resultado }, { headers: noCache });
}
