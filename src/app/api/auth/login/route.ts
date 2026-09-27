import { NextResponse } from "next/server";
import { crearRateLimiter, ipDe, origenPermitido } from "@/lib/api-guardas";
import { rpc } from "@/lib/bd";
import { enviarCodigoPorEmail } from "@/lib/acceso/correo";
import {
  CODIGO_CADUCA_MIN,
  LIMITES_CODIGO,
  esOrigen,
  normalizarEmail,
} from "@/lib/acceso/reglas";
import {
  COOKIE_CODIGO,
  accesoDisponible,
  cookieCodigo,
  generarCodigo,
  huellaCodigo,
  huellaIp,
  nuevaPeticionId,
} from "@/lib/acceso/servidor";

// Paso 1 del acceso con código: el visitante deja su email y le mandamos un
// código de 6 cifras. Los topes los cuenta la BD con cerrojo; aquí solo hay un
// freno rápido por IP (best-effort, memoria de cada instancia).
// Doc: docs/acceso-con-codigo.md

const limitado = crearRateLimiter(5);

const NO_DISPONIBLE =
  "El acceso no está disponible ahora mismo. Escríbenos por WhatsApp al 633 15 10 83 y te ayudamos.";

const MENSAJE_LIMITE: Record<string, string> = {
  limite_15min:
    "Ya te hemos enviado varios códigos. Mira tu correo (también la carpeta de spam) o espera unos minutos.",
  limite_24h: "Has llegado al máximo de códigos por hoy. Vuelve a intentarlo mañana.",
  limite_fallos: "Demasiados códigos incorrectos por hoy. Vuelve a intentarlo mañana.",
  limite_ip: "Demasiadas peticiones desde tu conexión. Espera un rato y vuelve a probar.",
};

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  const ip = ipDe(request);
  if (limitado(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Espera un minuto y vuelve a probar." },
      { status: 429 }
    );
  }
  if (!accesoDisponible()) {
    console.error("[acceso] Falta AUTH_SECRET o la BD: no se pueden pedir códigos");
    return NextResponse.json({ error: NO_DISPONIBLE }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    privacidad?: unknown;
    novedades?: unknown;
    origen?: unknown;
    web?: unknown; // honeypot: los humanos no lo ven; los bots lo rellenan
  } | null;

  if (typeof body?.web === "string" && body.web.length > 0) {
    return NextResponse.json({ ok: true }); // bot: respuesta plausible, sin tocar nada
  }

  const email = normalizarEmail(body?.email);
  if (!email) {
    return NextResponse.json({ error: "Revisa tu email: parece que le falta algo." }, { status: 422 });
  }
  if (body?.privacidad !== true) {
    return NextResponse.json(
      { error: "Para enviarte el código tienes que aceptar la política de privacidad." },
      { status: 422 }
    );
  }
  if (!esOrigen(body?.origen)) {
    return NextResponse.json({ error: "Petición no válida." }, { status: 422 });
  }
  const origen = body.origen;

  const id = nuevaPeticionId();
  const codigo = generarCodigo();

  let preparada: { enviar: boolean; motivo: string };
  try {
    preparada = await rpc("vitergy_codigo_preparar", {
      p_id: id,
      p_email: email,
      p_codigo_hash: huellaCodigo(id, codigo),
      p_ip_hash: ip === "desconocida" ? null : huellaIp(ip),
      p_novedades: body?.novedades === true,
      p_origen: origen,
      p_caduca_min: CODIGO_CADUCA_MIN,
      p_max_15min: LIMITES_CODIGO.codigos15min,
      p_max_24h: LIMITES_CODIGO.codigos24h,
      p_max_fallos_24h: LIMITES_CODIGO.fallos24h,
      p_max_ip_60min: LIMITES_CODIGO.peticionesIp60min,
    });
  } catch (error) {
    console.error("[acceso] No se pudo preparar la petición:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: NO_DISPONIBLE }, { status: 503 });
  }

  if (!preparada.enviar) {
    console.warn("[acceso] Petición frenada:", preparada.motivo); // sin el email: el log no guarda a quién
    return NextResponse.json(
      { error: MENSAJE_LIMITE[preparada.motivo] ?? NO_DISPONIBLE },
      { status: 429 }
    );
  }

  // Pruebas en local SIN mandar correos: `ACCESO_CODIGO_EN_CONSOLA=1 npm run dev`.
  // En producción (NODE_ENV=production) esta variable se ignora siempre.
  const soloConsola =
    process.env.NODE_ENV !== "production" && process.env.ACCESO_CODIGO_EN_CONSOLA === "1";
  if (soloConsola) {
    console.log(`[acceso] (pruebas locales, sin correo) código para ${email}: ${codigo}`);
  } else if (!(await enviarCodigoPorEmail(email, codigo, origen))) {
    return NextResponse.json(
      { error: "No hemos podido enviarte el código. Prueba otra vez en un minuto." },
      { status: 502 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_CODIGO, id, cookieCodigo);
  return res;
}
