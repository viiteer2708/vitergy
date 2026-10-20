import { NextResponse } from "next/server";
import { enviarEmail } from "@/lib/brevo";
import { crearRateLimiter, origenPermitido, ipDe, senueloDelata } from "@/lib/api-guardas";
import { comprobarEmail, dominioDe } from "@/lib/email-desechable";
import { calcularEstudio, validarDatosFactura, type Estudio } from "@/lib/estudio-ahorro";

// Paso 2 de la calculadora: con los datos confirmados por el usuario y su
// email, calcula el ahorro contra el catálogo completo de DPC (fijas +
// indexadas, hogar y empresa), captura el lead y avisa a Víctor. Al navegador
// va el ahorro agregado y LA OFERTA GANADORA (compañía + nombre) — dictamen
// de Victor 2-ago-2026: se enseña la mejor oferta (prioridad CLEAR/NET/KLEEN),
// nunca un ranking.
//
// El email es el peaje del estudio: sin email válido no hay cálculo. Y al
// revés, un lead JAMÁS se pierde en silencio (lección de gnew-web jul-2026):
// si Brevo falla se intenta al menos el aviso por email; si todo falla, se
// devuelve error honesto con el camino de WhatsApp.
//
// RGPD: el alta en la lista de marketing (Brevo 488) SOLO se hace si el
// usuario marcó la casilla OPCIONAL de consentimiento; el estudio en sí es
// medida precontractual (art. 6.1.b) y solo genera el aviso interno.

export const maxDuration = 30;

const BREVO_API = "https://api.brevo.com/v3";
const LISTA_VITERGY = 488; // lista "VITERGY" en la cuenta Brevo del grupo

const isRateLimited = crearRateLimiter(5);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ERROR_ENVIO =
  "No hemos podido registrar tu estudio ahora mismo. Escríbenos por WhatsApp al 633 15 10 83 con una foto de tu factura y te lo hacemos igual, gratis.";

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  if (isRateLimited(ipDe(request))) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Espera un minuto y vuelve a intentarlo." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    nombre?: unknown;
    datos?: unknown;
    extra?: { comercializadora?: unknown };
    consienteMarketing?: unknown;
    web?: unknown; // honeypot: los humanos no lo ven; los bots lo rellenan
  } | null;

  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 120) : "";

  if (senueloDelata(body?.web)) {
    // Bot (señuelo relleno o ausente): respuesta plausible sin tocar Brevo ni el motor.
    console.warn("[estudio] Robot por el señuelo:", dominioDe(email));
    return NextResponse.json({ tipo: "sin_calculo" });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Introduce un email válido." }, { status: 422 });
  }
  const veredicto = await comprobarEmail(email);
  if (veredicto !== "ok") {
    console.warn("[estudio] Email rechazado:", veredicto, dominioDe(email));
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
  const nombre =
    typeof body?.nombre === "string" ? body.nombre.trim().slice(0, 80) : "";
  const consienteMarketing = body?.consienteMarketing === true;
  const comercializadora =
    typeof body?.extra?.comercializadora === "string"
      ? body.extra.comercializadora.slice(0, 80)
      : null;

  const datos = validarDatosFactura(body?.datos);
  if (datos === null) {
    return NextResponse.json(
      { error: "Revisa los datos de la factura: falta alguno o no es válido." },
      { status: 422 }
    );
  }

  // 1) Estudio (hogar Y empresa). Si DPC no responde o el peaje no tiene
  //    catálogo, degradamos con elegancia: el lead se captura y el estudio se
  //    lo envía Víctor a mano.
  let estudio: Estudio | null = null;
  let tipo: "ok" | "sin_calculo" = "ok";
  try {
    estudio = await calcularEstudio(datos);
  } catch (error) {
    console.error(
      "[estudio] No se pudo calcular:",
      error instanceof Error ? error.message : error
    );
    tipo = "sin_calculo";
  }

  // 2) Captura del lead: aviso interno SIEMPRE; alta en Brevo solo con
  //    consentimiento de marketing.
  const apiKey = process.env.BREVO_API_KEY;
  // Desde el 14-oct-2026 el aviso del lead sale por Altavoz (`enviarEmail` de lib/brevo.ts con ALTAVOZ_AVISOS_KEY):
  // Brevo, sin créditos desde el 7-oct, contestaba 201 y no lo mandaba. El alta en la lista 488 sigue en Brevo.
  const conAltavoz = Boolean((process.env.ALTAVOZ_AVISOS_KEY ?? "").trim());
  let leadCapturado = false;

  if (!apiKey && !conAltavoz) {
    console.error("[estudio] Falta ALTAVOZ_AVISOS_KEY y BREVO_API_KEY — lead en riesgo:", email);
  } else {
    const headers = {
      "api-key": apiKey ?? "",
      "content-type": "application/json",
      accept: "application/json",
    };

    if (consienteMarketing && apiKey) {
      const listId = Number(process.env.BREVO_LIST_ID ?? LISTA_VITERGY);
      // updateEnabled: si el contacto ya existe, lo añade a la lista en vez
      // de fallar con "contact already exist". Si el atributo NOMBRE no
      // existiera en la cuenta, reintento sin atributos.
      try {
        let alta = await altaBrevo(headers, email, listId, nombre);
        if (!alta.ok && nombre) {
          alta = await altaBrevo(headers, email, listId, "");
        }
        if (alta.ok) {
          leadCapturado = true;
        } else {
          console.error("[estudio] Brevo /contacts respondió", alta.status, await alta.text());
        }
      } catch (error) {
        console.error("[estudio] Error en alta Brevo:", error);
      }
    }

    // Aviso a Víctor con el detalle completo (correo interno).
    try {
      const destino = process.env.LEAD_TO_EMAIL ?? "hola@vitergy.es";
      const remitente = process.env.BREVO_SENDER_EMAIL;
      if (remitente || conAltavoz) {
        const filas: string[] = [
          fila("Email", email),
          nombre ? fila("Nombre", escapeHtml(nombre)) : "",
          fila("Consentimiento marketing", consienteMarketing ? "SÍ (lista 488)" : "no"),
          comercializadora ? fila("Comercializadora actual", escapeHtml(comercializadora)) : "",
          fila("Peaje", datos.peaje),
          fila("Importe factura", `${datos.importeTotalEur} €`),
          fila("Consumo", `${datos.consumoKwh} kWh en ${datos.dias} días`),
          fila("Potencias", datos.potenciasKw.join(" / ") + " kW"),
          fila("Zona", datos.zona),
        ];
        // Si venía un desglose por periodos pero no superó la validación
        // (no cuadra con el total o el peaje se reclasificó), el estudio fino
        // debe saber que la cifra usó reparto estándar.
        const desgloseCrudo = Array.isArray(
          (body?.datos as Record<string, unknown> | undefined)?.consumosKwh
        )
          ? ((body!.datos as Record<string, unknown>).consumosKwh as unknown[]).length
          : 0;
        if (desgloseCrudo > 0 && datos.consumosKwh === null) {
          filas.push(
            fila(
              "⚠️ Desglose",
              "leído pero DESCARTADO (no cuadra o peaje reclasificado) — estimación con reparto estándar"
            )
          );
        }
        if (estudio) {
          filas.push(
            fila(
              "OFERTA GANADORA",
              `${escapeHtml(estudio.oferta.compania)} · ${escapeHtml(estudio.oferta.nombre)} (${estudio.oferta.tipo})${estudio.prioridadAplicada ? " — por prioridad de marca" : " — mejor absoluta"}`
            ),
            fila("Coste estimado", `${estudio.costeMejorOfertaEur} € el periodo`),
            fila(
              "Ahorro estimado",
              `${estudio.ahorroAnualEur} €/año (${Math.round(estudio.ahorroPct * 100)}%)`
            ),
            fila("Ofertas comparadas", String(estudio.ofertasComparadas))
          );
        }
        const asunto =
          tipo === "sin_calculo"
            ? `⚠️ Lead calculadora SIN cálculo (${datos.peaje}, estudio a mano): ${email}`
            : `🧮 Lead calculadora (${datos.peaje}): ${email} — ${estudio?.oferta.compania ?? "?"} ${estudio?.oferta.nombre ?? ""}, ahorro est. ${estudio?.ahorroAnualEur ?? "?"} €/año`;

        const htmlAviso = `<h3>Nuevo lead de la calculadora de ahorro (vitergy.es/contacto)</h3><table border="1" cellpadding="6" cellspacing="0">${filas.filter(Boolean).join("")}</table><p>El usuario ${tipo === "ok" ? "ha visto en pantalla la oferta y su ahorro estimado" : "NO ha visto cifra (falló el cálculo): estudio a mano cuanto antes"}.</p>`;
        if (conAltavoz) {
          // Responder al aviso le contesta directamente al lead.
          if (await enviarEmail({ para: destino, asunto, html: htmlAviso, etiqueta: "vitergy-lead", responderA: email })) {
            leadCapturado = true;
          }
        } else {
          const aviso = await fetch(`${BREVO_API}/smtp/email`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              sender: { name: "Calculadora Vitergy", email: remitente },
              to: [{ email: destino }],
              replyTo: { email },
              subject: asunto,
              htmlContent: htmlAviso,
            }),
            signal: AbortSignal.timeout(10_000),
          });
          if (aviso.ok) {
            leadCapturado = true;
          } else {
            console.error("[estudio] Brevo /smtp/email respondió", aviso.status, await aviso.text());
          }
        }
      } else {
        console.error("[estudio] Falta BREVO_SENDER_EMAIL — sin aviso de lead");
      }
    } catch (error) {
      console.error("[estudio] Error en aviso Brevo:", error);
    }
  }

  // Sin lead capturado no enseñamos estudio: el email es el trato, y perderlo
  // en silencio está prohibido. Error honesto con salida por WhatsApp.
  if (!leadCapturado) {
    return NextResponse.json({ error: ERROR_ENVIO }, { status: 502 });
  }

  if (tipo === "ok" && estudio) {
    return NextResponse.json({ tipo, estudio });
  }
  return NextResponse.json({ tipo: "sin_calculo" });
}

function altaBrevo(
  headers: Record<string, string>,
  email: string,
  listId: number,
  nombre: string
): Promise<Response> {
  return fetch(`${BREVO_API}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      ...(nombre ? { attributes: { NOMBRE: nombre } } : {}),
      listIds: [listId],
      updateEnabled: true,
    }),
    signal: AbortSignal.timeout(10_000),
  });
}

function fila(label: string, valor: string): string {
  return `<tr><td><b>${label}</b></td><td>${valor}</td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
