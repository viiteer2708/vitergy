import { NextResponse, after } from "next/server";
import { cookies } from "next/headers";
import { crearRateLimiter, ipDe, origenPermitido } from "@/lib/api-guardas";
import { rpc } from "@/lib/bd";
import { altaEnListaVitergy } from "@/lib/brevo";
import { normalizarCodigo } from "@/lib/acceso/reglas";
import {
  COOKIE_CODIGO,
  COOKIE_SESION,
  accesoDisponible,
  cookieCodigo,
  cookieSesion,
  firmarSesion,
  huellaCodigo,
} from "@/lib/acceso/servidor";

// Paso 2 del acceso con código: comprueba el código contra SU petición (la
// cookie guarda el id). Si acierta, la BD crea la cuenta (o apunta el acceso) y
// el suscriptor si dio permiso; aquí se abre la sesión de 365 días.
// Doc: docs/acceso-con-codigo.md

const limitado = crearRateLimiter(20);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Verificacion =
  | { estado: "ok"; usuario_id: string; email: string; suscriptor: boolean }
  | { estado: "incorrecto" | "bloqueado"; quedan?: number }
  | { estado: "caducado" | "anulado" | "no_existe" };

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  if (limitado(ipDe(request))) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Espera un minuto." },
      { status: 429 }
    );
  }
  if (!accesoDisponible()) {
    return NextResponse.json(
      { error: "El acceso no está disponible ahora mismo. Escríbenos por WhatsApp al 633 15 10 83." },
      { status: 503 }
    );
  }

  const peticionId = (await cookies()).get(COOKIE_CODIGO)?.value ?? "";
  if (!UUID_RE.test(peticionId)) {
    return NextResponse.json(
      { error: "Ese código ya no vale: pide uno nuevo.", pedirOtro: true },
      { status: 410 }
    );
  }

  const body = (await request.json().catch(() => null)) as { codigo?: unknown } | null;
  const codigo = normalizarCodigo(body?.codigo);
  if (!codigo) {
    return NextResponse.json({ error: "El código tiene 6 cifras." }, { status: 422 });
  }

  let r: Verificacion;
  try {
    r = await rpc<Verificacion>("vitergy_codigo_verificar", {
      p_id: peticionId,
      p_intento_hash: huellaCodigo(peticionId, codigo),
    });
  } catch (error) {
    console.error("[acceso] No se pudo verificar:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "No hemos podido comprobar el código. Prueba otra vez en un momento." },
      { status: 503 }
    );
  }

  switch (r.estado) {
    case "ok": {
      const res = NextResponse.json({ ok: true, email: r.email });
      res.cookies.set(COOKIE_SESION, await firmarSesion({ usuarioId: r.usuario_id, email: r.email }), cookieSesion);
      res.cookies.set(COOKIE_CODIGO, "", { ...cookieCodigo, maxAge: 0 });
      // Alta en la lista de Brevo solo si marcó la casilla de novedades; después
      // de responder, para no hacer esperar a nadie (si falla, queda en el log).
      if (r.suscriptor) {
        const email = r.email;
        after(async () => {
          await altaEnListaVitergy(email);
        });
      }
      return res;
    }
    case "incorrecto": {
      const quedan = r.quedan ?? 0;
      return NextResponse.json(
        {
          error: `Código incorrecto. Te ${quedan === 1 ? "queda 1 intento" : `quedan ${quedan} intentos`}.`,
          quedan,
        },
        { status: 401 }
      );
    }
    case "bloqueado":
      return NextResponse.json(
        { error: "Has agotado los intentos con este código. Pide uno nuevo.", pedirOtro: true },
        { status: 429 }
      );
    case "caducado":
      return NextResponse.json(
        { error: "El código ha caducado (dura 10 minutos). Pide uno nuevo.", pedirOtro: true },
        { status: 410 }
      );
    default:
      return NextResponse.json(
        { error: "Ese código ya no vale: pide uno nuevo.", pedirOtro: true },
        { status: 410 }
      );
  }
}
