import { NextResponse } from "next/server";
import { crearRateLimiter, origenPermitido, ipDe, senueloDelata } from "@/lib/api-guardas";
import { CUOTAS, comprobarCuota } from "@/lib/antiabuso";
import { calcularEstudio, validarDatosFactura } from "@/lib/estudio-ahorro";
import { estudioPublico } from "@/lib/expediente/publico";
import { huellaIp, secreto } from "@/lib/expediente/secreto";

// Paso 2 de la calculadora: con los datos de la factura que la persona acaba de confirmar, calcula el ahorro contra el
// catálogo completo de DPC (fijas + indexadas, hogar y empresa) y se lo devuelve AL MOMENTO, sin pedirle nada.
//
// Cambio del 17-oct-2026 (embudo de la factura, T1): antes aquí se pedía el email antes de enseñar la cifra. Ahora la
// cifra es lo primero y los datos de contacto se piden DESPUÉS (/api/factura/lead), cuando la persona pulsa
// «Quiero empezar a ahorrar».
//
// La respuesta va RECORTADA: solo las cifras y el tipo de oferta (fija/indexada). La compañía y el producto de la oferta
// ganadora NUNCA salen hacia el navegador (regla de Victor, 20-oct-2026): solo van en el aviso a hola@. La selección
// (NET FIJO y GANA, gana el mayor ahorro) está en src/lib/estudio-ahorro.ts.
//
// Aquí no se guarda nada ni se manda ningún correo: es un cálculo sin datos personales. Frenos: señuelo, freno en memoria
// por IP y 10 por hora por IP en la base de datos (si la BD no responde, esta cuota se salta: el cálculo no cuesta nada y
// no debe caerse por ella; las que cuestan dinero, en `analizar`, fallan cerradas).

export const maxDuration = 30;

const isRateLimited = crearRateLimiter(5);

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  const ip = ipDe(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Espera un minuto y vuelve a intentarlo." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    datos?: unknown;
    web?: unknown; // señuelo: los humanos no lo ven; los bots lo rellenan o no lo mandan
  } | null;

  if (senueloDelata(body?.web)) {
    // Bot (señuelo relleno o ausente): respuesta plausible sin tocar el motor.
    console.warn("[estudio] Robot por el señuelo");
    return NextResponse.json({ tipo: "sin_calculo" });
  }

  const datos = validarDatosFactura(body?.datos);
  if (datos === null) {
    return NextResponse.json(
      { error: "Revisa los datos de la factura: falta alguno o no es válido." },
      { status: 422 }
    );
  }

  if (secreto() !== null) {
    const cuota = await comprobarCuota(`estudio:ip:${huellaIp(ip)}:h`, CUOTAS.estudio.ipHora, 3_600);
    if (cuota.estado === "limite") {
      return NextResponse.json(
        { error: "Has calculado varias veces seguidas. Espera un rato y vuelve a probar, o escríbenos por WhatsApp al 633 15 10 83." },
        { status: 429, headers: { "Retry-After": String(cuota.esperaSeg) } }
      );
    }
  }

  // Estudio (hogar Y empresa). Si DPC no responde o el peaje no tiene catálogo, degradamos con elegancia: la persona
  // puede dejar sus datos igualmente y el estudio se lo envía Víctor a mano.
  try {
    const estudio = await calcularEstudio(datos);
    return NextResponse.json({ tipo: "ok", estudio: estudioPublico(estudio) });
  } catch (error) {
    console.error("[estudio] No se pudo calcular:", error instanceof Error ? error.message : error);
    return NextResponse.json({ tipo: "sin_calculo" });
  }
}
