import { NextResponse } from "next/server";
import { crearRateLimiter, origenPermitido, ipDe } from "@/lib/api-guardas";
import { calcularEstudio, validarDatosFactura, type Estudio } from "@/lib/estudio-ahorro";

// Paso 2 de la calculadora: con los datos confirmados por el usuario y su
// email, calcula el ahorro contra el catálogo (servidor DPC), captura el lead
// y avisa a Víctor. La respuesta al navegador SOLO lleva el ahorro agregado —
// nunca nombres de comercializadoras ni rankings (regla de negocio
// innegociable, la misma del chat).
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

// 2.0TD solo existe hasta 15 kW; por encima el suministro es de empresa.
const MAX_POTENCIA_HOGAR_KW = 15;

const PEAJES_VALIDOS = new Set(["2.0TD", "3.0TD", "6.1TD", "6.2TD"]);

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
    extra?: { comercializadora?: unknown; peaje?: unknown };
    consienteMarketing?: unknown;
    web?: unknown; // honeypot: los humanos no lo ven; los bots lo rellenan
  } | null;

  if (typeof body?.web === "string" && body.web.length > 0) {
    // Bot: respuesta plausible sin tocar Brevo ni el motor.
    return NextResponse.json({ tipo: "sin_calculo" });
  }

  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 120) : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Introduce un email válido." }, { status: 422 });
  }
  const nombre =
    typeof body?.nombre === "string" ? body.nombre.trim().slice(0, 80) : "";
  const consienteMarketing = body?.consienteMarketing === true;

  const peajeRaw =
    typeof body?.extra?.peaje === "string" ? body.extra.peaje.toUpperCase().trim() : null;
  const peaje = peajeRaw !== null && PEAJES_VALIDOS.has(peajeRaw) ? peajeRaw : null;
  const comercializadora =
    typeof body?.extra?.comercializadora === "string"
      ? body.extra.comercializadora.slice(0, 80)
      : null;

  const datos = validarDatosFactura(body?.datos);

  // Suministros que no son de hogar: peaje distinto de 2.0TD o potencia por
  // encima de 15 kW (el 2.0TD no existe ahí). El motor no aplica; el estudio
  // lo hace Víctor a mano. El lead vale oro igualmente.
  const potenciaMax = datos
    ? Math.max(datos.potenciaP1Kw, datos.potenciaP2Kw ?? 0)
    : saneaNum((body?.datos as Record<string, unknown> | undefined)?.potenciaP1Kw, 0, 10000) ?? 0;
  const esB2B = (peaje !== null && peaje !== "2.0TD") || potenciaMax > MAX_POTENCIA_HOGAR_KW;

  if (!esB2B && datos === null) {
    return NextResponse.json(
      { error: "Revisa los datos de la factura: falta alguno o no es válido." },
      { status: 422 }
    );
  }

  // 1) Estudio (solo hogar). Si DPC no responde, degradamos con elegancia:
  //    el lead se captura y el estudio se lo envía Víctor.
  let estudio: Estudio | null = null;
  let tipo: "ok" | "b2b" | "sin_calculo" = esB2B ? "b2b" : "ok";
  if (!esB2B && datos) {
    try {
      estudio = await calcularEstudio(datos);
    } catch (error) {
      console.error(
        "[estudio] No se pudo calcular:",
        error instanceof Error ? error.message : error
      );
      tipo = "sin_calculo";
    }
  }

  // 2) Captura del lead: aviso interno SIEMPRE; alta en Brevo solo con
  //    consentimiento de marketing.
  const apiKey = process.env.BREVO_API_KEY;
  let leadCapturado = false;

  if (!apiKey) {
    console.error("[estudio] Falta BREVO_API_KEY — lead en riesgo:", email);
  } else {
    const headers = {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    };

    if (consienteMarketing) {
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

    // Aviso a Víctor con el detalle completo (correo interno: aquí SÍ van
    // los datos y la comercializadora actual). Para B2B sin datos validados,
    // se vuelcan los valores crudos saneados: un lead de 30 kW / 12.000 kWh
    // es justo el que más interesa ver con números.
    try {
      const destino = process.env.LEAD_TO_EMAIL ?? "info@vitergy.es";
      const remitente = process.env.BREVO_SENDER_EMAIL;
      if (remitente) {
        const filas: string[] = [
          fila("Email", email),
          nombre ? fila("Nombre", escapeHtml(nombre)) : "",
          fila("Consentimiento marketing", consienteMarketing ? "SÍ (lista 488)" : "no"),
          comercializadora ? fila("Comercializadora actual", escapeHtml(comercializadora)) : "",
          peaje ? fila("Peaje", peaje) : "",
        ];
        if (datos) {
          filas.push(
            fila("Importe factura", `${datos.importeTotalEur} €`),
            fila("Consumo", `${datos.consumoKwh} kWh en ${datos.dias} días`),
            fila(
              "Potencia",
              `${datos.potenciaP1Kw}${datos.potenciaP2Kw ? " / " + datos.potenciaP2Kw : ""} kW`
            ),
            fila("Zona", datos.zona)
          );
        } else {
          const raw = (body?.datos ?? {}) as Record<string, unknown>;
          const importe = saneaNum(raw.importeTotalEur, 0, 1_000_000);
          const consumo = saneaNum(raw.consumoKwh, 0, 1_000_000);
          const dias = saneaNum(raw.dias, 0, 400);
          if (importe || consumo || potenciaMax) {
            filas.push(
              fila(
                "Datos SIN validar (rangos de empresa)",
                `${importe ?? "?"} € · ${consumo ?? "?"} kWh · ${potenciaMax || "?"} kW · ${dias ?? "?"} días`
              )
            );
          }
        }
        if (estudio) {
          filas.push(
            fila("Mejor oferta (est.)", `${estudio.costeMejorOfertaEur} € el periodo`),
            fila(
              "Ahorro estimado",
              `${estudio.ahorroAnualEur} €/año (${Math.round(estudio.ahorroPct * 100)}%)`
            ),
            fila("Ofertas comparadas", String(estudio.ofertasComparadas))
          );
        }
        const asunto =
          tipo === "b2b"
            ? `🏭 Lead B2B calculadora${peaje ? ` (${peaje})` : ""}: ${email}`
            : tipo === "sin_calculo"
              ? `⚠️ Lead calculadora SIN cálculo (hacer estudio a mano): ${email}`
              : `🧮 Lead calculadora: ${email} — ahorro est. ${estudio?.ahorroAnualEur ?? "?"} €/año`;

        const aviso = await fetch(`${BREVO_API}/smtp/email`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            sender: { name: "Calculadora Vitergy", email: remitente },
            to: [{ email: destino }],
            replyTo: { email },
            subject: asunto,
            htmlContent: `<h3>Nuevo lead de la calculadora de ahorro (vitergy.es/contacto)</h3><table border="1" cellpadding="6" cellspacing="0">${filas.filter(Boolean).join("")}</table><p>El usuario ${tipo === "ok" ? "ha visto su ahorro estimado en pantalla" : tipo === "b2b" ? "es un suministro de empresa: estudio a mano" : "NO ha visto cifra (falló el cálculo): estudio a mano cuanto antes"}.</p>`,
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (aviso.ok) {
          leadCapturado = true;
        } else {
          console.error("[estudio] Brevo /smtp/email respondió", aviso.status, await aviso.text());
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
  return NextResponse.json({ tipo });
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

function saneaNum(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) && n > min && n <= max ? Math.round(n * 100) / 100 : null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
