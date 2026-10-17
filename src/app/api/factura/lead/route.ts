import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { crearRateLimiter, origenPermitido, ipDe, senueloDelata } from "@/lib/api-guardas";
import { CUOTAS, antiabusoDisponible, comprobarCuota, comprobarTurnstile } from "@/lib/antiabuso";
import { comprobarEmail, dominioDe } from "@/lib/email-desechable";
import { calcularEstudio, validarDatosFactura, type Estudio } from "@/lib/estudio-ahorro";
import { nuevaCarpeta, rutaDeDocumento, subirObjeto } from "@/lib/expediente/almacen";
import { tipoDeFacturaBase64, type TipoArchivo } from "@/lib/expediente/archivo";
import { enviarAvisoLead } from "@/lib/expediente/aviso";
import { normalizarEmailContacto, normalizarMovil, normalizarNombre, textoLimpio } from "@/lib/expediente/datos";
import {
  crearExpediente,
  marcarAviso,
  marcarDocumentoSubido,
  referenciaCorta,
  type ExpedienteCreado,
} from "@/lib/expediente/expediente";
import { descripcionSegura } from "@/lib/expediente/log";
import { estudioConOferta } from "@/lib/expediente/publico";
import { huellaEmail, huellaIp } from "@/lib/expediente/secreto";

// Paso 3 de la calculadora: «Quiero empezar a ahorrar». La persona deja nombre, email y móvil y, en ESE momento, se
// guarda su factura (la que el navegador tenía en memoria desde que la subió). Aquí se crea el expediente, sale el aviso a
// hola@vitergy.es con la factura adjunta y se le devuelve la oferta CON su marca (la marca no se nombraba hasta ahora).
//
// Principios:
// - El servidor RECALCULA el estudio a partir de los datos de la factura: jamás se acepta una cifra ni una oferta que
//   venga del navegador. El aviso que lee Víctor lleva siempre lo calculado aquí.
// - UN LEAD NUNCA SE PIERDE. Orden: validar → cuotas → recalcular → crear expediente (BD) → subir la factura (almacén) →
//   avisar (Altavoz). Cada paso que falla se registra (sin datos personales) y se sigue con el siguiente:
//     · BD caída → no hay expediente, pero el aviso sale igualmente con la factura adjunta (es el único registro).
//     · Aviso caído → el expediente queda con `aviso_lead_en` vacío (la limpieza diaria, T4, lo reintenta) y la persona ve su oferta.
//     · Solo si fallan a la vez la BD y el aviso se le dice la verdad (502) y se le da la salida por WhatsApp.
//   (Esto invierte la regla anterior de /api/factura/estudio: «sin aviso no hay estudio». Ahora el estudio ya lo ha visto.)
// - No se manda ningún correo a la persona (el aviso es SOLO para hola@vitergy.es: decisión 6 de Victor) y la casilla de
//   consejos ha desaparecido: ya no hay alta en Brevo desde aquí.

export const maxDuration = 60;

const isRateLimited = crearRateLimiter(5);

const ERROR_ENVIO =
  "No hemos podido registrar tu solicitud ahora mismo. Escríbenos por WhatsApp al 633 15 10 83 con una foto de tu factura y te lo gestionamos igual, gratis.";

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
    nombre?: unknown;
    email?: unknown;
    movil?: unknown;
    privacidad?: unknown;
    datos?: unknown;
    extra?: { comercializadora?: unknown };
    factura?: { fileBase64?: unknown; mimeType?: unknown } | null;
    web?: unknown; // señuelo: los humanos no lo ven; los bots lo rellenan o no lo mandan
    turnstile?: unknown; // token de Cloudflare Turnstile, de un solo uso
  } | null;

  if (senueloDelata(body?.web)) {
    // Bot (señuelo relleno o ausente): respuesta plausible sin tocar la base de datos, el almacén ni el correo.
    console.warn("[lead] Robot por el señuelo");
    return NextResponse.json({ tipo: "sin_calculo" });
  }

  // ── 1) Validar todo ANTES de tocar nada ──
  const nombre = normalizarNombre(body?.nombre);
  if (!nombre) {
    return NextResponse.json({ error: "Escribe tu nombre (o el de tu empresa)." }, { status: 422 });
  }
  const email = normalizarEmailContacto(body?.email);
  if (!email) {
    return NextResponse.json({ error: "Revisa tu email: parece que le falta algo." }, { status: 422 });
  }
  const veredicto = await comprobarEmail(email);
  if (veredicto !== "ok") {
    console.warn("[lead] Email rechazado:", veredicto, dominioDe(email));
    return NextResponse.json(
      {
        error:
          veredicto === "sin_correo"
            ? "Revisa tu email: ese dominio no recibe correo. ¿Puede que haya una letra cambiada?"
            : "Necesitamos un email que leas de verdad para enviarte el estudio: los de usar y tirar no valen.",
      },
      { status: 422 }
    );
  }
  const movil = normalizarMovil(body?.movil);
  if (!movil) {
    return NextResponse.json(
      { error: "Escribe un móvil válido (ej.: 600 123 456). Si es de otro país, empieza por su prefijo, p. ej. +44." },
      { status: 422 }
    );
  }
  if (body?.privacidad !== true) {
    return NextResponse.json(
      { error: "Para continuar tienes que aceptar la política de privacidad." },
      { status: 422 }
    );
  }
  const datos = validarDatosFactura(body?.datos);
  if (datos === null) {
    return NextResponse.json(
      { error: "Revisa los datos de la factura: falta alguno o no es válido." },
      { status: 422 }
    );
  }

  // La factura es opcional (con «teclear los datos a mano» no hay). Si viene, tiene que ser un PDF o una foto DE VERDAD.
  let factura: { base64: string; bytes: Buffer; tipo: TipoArchivo } | null = null;
  if (body?.factura != null) {
    const tipo = tipoDeFacturaBase64(body.factura.fileBase64, body.factura.mimeType);
    if (!tipo) {
      return NextResponse.json(
        {
          error:
            "No hemos podido usar el archivo de la factura (formato no válido o demasiado grande), así que lo hemos quitado. Puedes enviar tus datos sin él y Víctor te la pedirá, o volver atrás y subirla otra vez.",
          // El navegador suelta la factura que tenía en memoria (si no, volvería a mandarla y a fallar).
          campo: "factura",
        },
        { status: 400 }
      );
    }
    const base64 = body.factura.fileBase64 as string;
    factura = { base64, bytes: Buffer.from(base64, "base64"), tipo };
  }

  // Turnstile (spam del 20-oct-2026: robots que mandaban el lead directo, sin pasar por la web). «Rechazado» = robot o
  // sin token → no pasa, y se le da la salida por WhatsApp. Si Cloudflare no contesta o falta la clave, se DEJA PASAR
  // (al revés que en /analizar): un lead real no se pierde por un fallo ajeno; quedan Origin, señuelo, emails y cuotas.
  const turnstile = await comprobarTurnstile(body?.turnstile, ip);
  if (turnstile === "rechazado") {
    return NextResponse.json(
      {
        error:
          "No hemos podido comprobar que no eres un robot. Vuelve a pulsar el botón; si sigue fallando, escríbenos por WhatsApp al 633 15 10 83.",
      },
      { status: 403 }
    );
  }

  // ── 2) Cuotas (en la base de datos). Si no se pueden contar, se sigue: un lead no se rechaza por eso. ──
  const bdLista = antiabusoDisponible();
  if (bdLista) {
    const huella = huellaIp(ip);
    const porIp = await comprobarCuota(`lead:ip:${huella}:h`, CUOTAS.lead.ipHora, 3_600);
    if (porIp.estado === "limite") {
      return NextResponse.json(
        { error: "Has enviado varias solicitudes seguidas. Espera un rato, o escríbenos por WhatsApp al 633 15 10 83." },
        { status: 429, headers: { "Retry-After": String(porIp.esperaSeg) } }
      );
    }
    const porEmail = await comprobarCuota(`lead:email:${huellaEmail(email)}:d`, CUOTAS.lead.emailDia, 86_400);
    if (porEmail.estado === "limite") {
      return NextResponse.json(
        {
          error:
            "Ya hemos recibido varias solicitudes con este email hoy, así que Víctor te contactará enseguida. Si tienes prisa, escríbenos por WhatsApp al 633 15 10 83.",
        },
        { status: 429, headers: { "Retry-After": String(porEmail.esperaSeg) } }
      );
    }
  } else {
    console.error("[lead] Falta EXPEDIENTE_SECRET o la BD: modo degradado (solo aviso por email, sin expediente ni cuotas)");
  }

  // ── 3) Recalcular el estudio en el servidor ──
  let estudio: Estudio | null = null;
  try {
    estudio = await calcularEstudio(datos);
  } catch (error) {
    console.error("[lead] No se pudo calcular el estudio:", error instanceof Error ? error.message : error);
  }
  const comercializadora = textoLimpio(body?.extra?.comercializadora, 80);

  // ── 4) Crear el expediente (ficha + fila de la factura en «pendiente») ──
  let expediente: ExpedienteCreado | null = null;
  let rutaFactura: string | null = null;
  if (bdLista) {
    const carpeta = nuevaCarpeta();
    rutaFactura = factura ? rutaDeDocumento(carpeta, "factura", factura.tipo) : null;
    try {
      expediente = await crearExpediente({
        nombre,
        email,
        movil,
        datosFactura: { ...datos, comercializadoraActual: comercializadora || null },
        estudio,
        sinCalculo: estudio === null,
        ipHash: ip === "desconocida" ? null : huellaIp(ip),
        carpeta,
        factura: factura && rutaFactura ? { ruta: rutaFactura, mime: factura.tipo, bytes: factura.bytes.length } : null,
      });
    } catch (error) {
      console.error("[lead] No se pudo crear el expediente:", descripcionSegura(error));
    }
  }

  // ── 5) Subir la factura al almacén privado ──
  let facturaGuardada = false;
  if (expediente && factura && rutaFactura) {
    facturaGuardada = await subirObjeto(rutaFactura, factura.bytes, factura.tipo);
    if (facturaGuardada) {
      try {
        await marcarDocumentoSubido(expediente.id, "factura", factura.bytes.length);
      } catch (error) {
        console.error("[lead] No se pudo marcar la factura como subida:", descripcionSegura(error));
      }
    }
  }

  // ── 6) Aviso a hola@vitergy.es (con la factura adjunta si cabe) ──
  // Si venía un desglose por periodos pero no superó la validación, el estudio fino debe saberlo.
  const desgloseCrudo = Array.isArray((body?.datos as Record<string, unknown> | undefined)?.consumosKwh)
    ? ((body!.datos as Record<string, unknown>).consumosKwh as unknown[]).length
    : 0;
  let avisoSalio = false;
  try {
    avisoSalio = await enviarAvisoLead({
      referencia: expediente ? referenciaCorta(expediente.id) : null,
      nombre,
      email,
      movil,
      comercializadora,
      datos,
      desgloseDescartado: desgloseCrudo > 0 && datos.consumosKwh === null,
      estudio,
      factura: factura ? { base64: factura.base64, bytes: factura.bytes.length, tipo: factura.tipo } : null,
      facturaGuardada,
    });
  } catch (error) {
    console.error("[lead] Error enviando el aviso:", descripcionSegura(error));
  }
  if (expediente) {
    try {
      await marcarAviso(expediente.id, avisoSalio);
    } catch (error) {
      console.error("[lead] No se pudo apuntar el estado del aviso:", descripcionSegura(error));
    }
  }

  // ── 7) Respuesta ──
  // Sin expediente y sin aviso no hay rastro de la persona en ningún sitio: se le dice la verdad.
  if (!expediente && !avisoSalio) {
    return NextResponse.json({ error: ERROR_ENVIO }, { status: 502 });
  }
  const ref = expediente ? referenciaCorta(expediente.id) : null;
  if (estudio) {
    // Aquí SÍ va la oferta con su marca (D1): la persona ya ha dejado sus datos.
    return NextResponse.json({ tipo: "ok", estudio: estudioConOferta(estudio), ref });
  }
  return NextResponse.json({ tipo: "sin_calculo", ref });
}
