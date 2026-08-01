import { NextResponse } from "next/server";

// Única API route del sitio: proxy del chat de soporte hacia la API de Gemini.
// La clave vive SOLO aquí (process.env.GEMINI_API_KEY) — el navegador nunca la ve.
// El modelo, el system prompt y los parámetros se fijan en servidor; el cliente
// solo envía su mensaje y el historial, y ambos se validan y recortan.

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";

const SYSTEM_PROMPT = `Eres el asistente virtual de Vitergy (vitergy.es), la asesoría energética 100% independiente de Víctor Molins, con oficina en Molins de Rei (Barcelona) y servicio en toda España, también en remoto.

QUIÉN ES VITERGY
- Asesoría energética independiente: no trabaja para ninguna comercializadora, así que su consejo es imparcial — la tarifa que más ahorra al cliente, no la que más comisiona al asesor.
- Víctor tiene más de 12 años de experiencia en el sector y más de 200 GWh gestionados.
- Servicios: estudio gratuito de la factura de luz (el servicio estrella), cambio de compañía con todo el papeleo gestionado y sin cortes de suministro, comparativa de tarifas, optimización de la potencia contratada, autoconsumo fotovoltaico y baterías, penalizaciones por energía reactiva, monitorización de consumo, y ahorro para negocios de gran consumo (gimnasios, lavanderías industriales, clubs de pádel, centros médicos).
- Promesa: el análisis de la factura es GRATIS y, si no hay ahorro, no se cobra.

CÓMO RESPONDES
- Siempre en español de España. Tono cercano, honesto y sin humo. Respuestas breves: de 2 a 5 frases. Si usas un término técnico (potencia contratada, PVPC, peajes…), explícalo en una frase llana.
- Puedes dar consejos generales de ahorro: revisar la potencia contratada, aprovechar los periodos valle, entender PVPC frente a mercado libre, vigilar permanencias y servicios extra en la factura, autoconsumo, etc.
- Objeciones frecuentes: «¿me cortarán la luz al cambiar de compañía?» → no, el cambio se gestiona sin cortes; «¿cuánto cuesta?» → el análisis es gratis y solo se cobra si hay ahorro; «¿trabajáis para alguna compañía?» → no, Vitergy es 100% independiente.

REGLAS INNEGOCIABLES
1. NUNCA digas cuál es «la compañía más barata» ni des rankings de comercializadoras: no existe una respuesta universal, depende del consumo, la potencia, los horarios y el perfil de cada cliente. Explícalo y ofrece el estudio gratuito de la factura, que responde exactamente esa pregunta para su caso concreto.
2. NUNCA inventes precios, tarifas ni cifras de ahorro, y no prometas cantidades concretas.
3. No critiques a competidores ni a comercializadoras concretas.
4. Vitergy es una asesoría, no una comercializadora: no vende luz ni gas.
5. No pidas datos personales (DNI, IBAN, dirección, CUPS…). Si el usuario quiere el estudio, que envíe su factura por WhatsApp.
6. Si preguntan algo ajeno a la energía o a Vitergy, redirige el tema con amabilidad.

OBJETIVO
Resuelve la duda de verdad y, cuando encaje con naturalidad, invita al siguiente paso: enviar la factura por WhatsApp al 633 15 10 83 (hay botón de WhatsApp en esta misma web) para el estudio gratuito. Sin presión.`;

// Freno best-effort por IP: cada instancia serverless tiene su propia memoria,
// así que no es una garantía dura — la protección de fondo es la cuota diaria
// del free tier de Gemini (coste máximo 0 €).
const REQUESTS_PER_MINUTE = 8;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= REQUESTS_PER_MINUTE) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 500) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= 60_000)) requestLog.delete(key);
    }
  }
  return false;
}

type HistoryTurn = { role: "user" | "model"; text: string };

function parseBody(
  body: unknown
): { message: string; history: HistoryTurn[] } | null {
  if (typeof body !== "object" || body === null) return null;
  const { message, history } = body as { message?: unknown; history?: unknown };
  if (typeof message !== "string" || !message.trim() || message.length > 1000) {
    return null;
  }
  const turns: HistoryTurn[] = [];
  if (history !== undefined) {
    if (!Array.isArray(history)) return null;
    for (const turn of history.slice(-10)) {
      if (typeof turn !== "object" || turn === null) return null;
      const { role, text } = turn as { role?: unknown; text?: unknown };
      if (role !== "user" && role !== "model") return null;
      if (typeof text !== "string" || text.length > 2000) return null;
      turns.push({ role, text });
    }
  }
  // Gemini exige que el primer turno sea del usuario (el saludo local del widget es "model")
  while (turns.length > 0 && turns[0].role === "model") turns.shift();
  return { message: message.trim(), history: turns };
}

export async function POST(request: Request) {
  // Best-effort anti-embed: un navegador same-origin manda Origin = nuestro host
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      // Origin ilegible → se trata como ajeno
    }
    if (originHost !== host) {
      return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "El asistente aún no está disponible. Escríbenos por WhatsApp al 633 15 10 83 y te ayudamos al momento.",
      },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Has enviado muchos mensajes seguidos. Espera un minuto y vuelve a intentarlo, o escríbenos por WhatsApp.",
      },
      { status: 429 }
    );
  }

  const parsed = parseBody(await request.json().catch(() => null));
  if (!parsed) {
    return NextResponse.json({ error: "Mensaje no válido." }, { status: 400 });
  }

  const contents = [
    ...parsed.history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    { role: "user", parts: [{ text: parsed.message }] },
  ];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
        }),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (res.status === 429) {
      // Cuota diaria/minuto del free tier agotada; se resetea sola
      return NextResponse.json(
        {
          error:
            "El asistente está muy solicitado ahora mismo. Prueba de nuevo en un rato o escríbenos por WhatsApp al 633 15 10 83.",
        },
        { status: 429 }
      );
    }

    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 500);
      console.error(`Gemini respondió ${res.status}: ${detail}`);
      return NextResponse.json(
        {
          error:
            "No he podido consultar al asistente. Escríbenos por WhatsApp al 633 15 10 83 y te ayudamos al momento.",
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    const parts: Array<{ text?: string }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    const reply = parts
      .map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      // Respuesta vacía o bloqueada por los filtros de seguridad de Google
      return NextResponse.json({
        reply:
          "No puedo ayudarte con esa consulta. Si tiene que ver con tu factura de luz o gas, escríbenos por WhatsApp al 633 15 10 83 y lo vemos en persona.",
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(
      "Error llamando a Gemini:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error:
          "No he podido conectar con el asistente. Prueba de nuevo en unos segundos o escríbenos por WhatsApp al 633 15 10 83.",
      },
      { status: 502 }
    );
  }
}
