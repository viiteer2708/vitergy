import { NextResponse } from "next/server";
import { crearRateLimiter, origenPermitido, ipDe } from "@/lib/api-guardas";

// Paso 1 de la calculadora de ahorro: el usuario sube su factura (foto o PDF)
// y Gemini extrae SOLO los datos técnicos necesarios para comparar — de hogar
// (2.0TD) o de empresa (3.0TD/6.1TD/6.2TD, hasta 6 periodos). Privacidad por
// diseño: el esquema de salida no contiene CUPS, ni nombre, ni dirección, ni
// IBAN — no se piden y por tanto no se procesan ni almacenan. El archivo se
// procesa en memoria y se descarta: aquí no se guarda nada.
//
// La clave (GEMINI_API_KEY, la misma del chat) SOLO existe en el servidor.

export const maxDuration = 60;

// Modelo con visión para extracción; fallback si la cuota gratuita del
// principal se agota (ambos en free tier de Google AI Studio).
const MODELO = process.env.GEMINI_MODEL_FACTURA ?? "gemini-3.5-flash";
const MODELO_FALLBACK = "gemini-3.5-flash-lite";

// Límite de Vercel: 4,5 MB por request. Base64 infla ~33% → tope de caracteres
// base64 que deja margen para el resto del JSON (~3,1 MB de archivo real).
const MAX_BASE64_CHARS = 4_200_000;

const MIMES_PERMITIDOS = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const PROMPT_EXTRACCION = `Analiza este documento. Debería ser una factura de electricidad española (de una comercializadora como Iberdrola, Endesa, Naturgy, Repsol, etc.), de un hogar (tarifa 2.0TD, 1-2 potencias y hasta 3 periodos de consumo) o de una empresa (3.0TD/6.1TD/6.2TD, hasta 6 potencias y 6 periodos).

Extrae ÚNICAMENTE datos técnicos del suministro. PROHIBIDO extraer o devolver datos personales: ni nombre del titular, ni dirección, ni CUPS, ni DNI/NIF, ni IBAN.

Reglas de extracción (las facturas españolas confunden estos campos):
- potencias_kw: las POTENCIAS CONTRATADAS en kW, en orden P1, P2... (hasta 6). NO la potencia demandada ni el maxímetro. Un hogar suele tener 1 o 2; una empresa 3.0TD tiene 6.
- consumo_total_kwh: el consumo facturado DEL PERIODO de esta factura. NO el consumo anual acumulado ni el del gráfico de barras de los últimos 12 meses.
- consumos_kwh: desglose del consumo por periodos en orden P1, P2... (hasta 6), si aparece.
- importe_total_eur: el TOTAL de la factura CON impuestos (el "total a pagar"). NO la base imponible.
- dias_facturados: días del periodo de facturación. Si no aparece el número, deja null y rellena fecha_inicio y fecha_fin del periodo de lectura (formato YYYY-MM-DD). NO uses la fecha de emisión ni la de cargo.
- comercializadora: la empresa que emite la factura.
- peaje: la tarifa de acceso ("2.0TD", "3.0TD", "6.1TD" o "6.2TD").
- alquiler_contador_eur: importe del alquiler de equipos/contador del periodo, si aparece.
- zona: "baleares" si la dirección del punto de suministro es de Islas Baleares, "canarias" si es de Canarias, "peninsula" en cualquier otro caso. NO devuelvas la dirección.
- Números SIEMPRE con punto decimal (la factura usará coma).
- Si un campo no aparece o no estás seguro, déjalo en null (o array vacío) y explica la duda en observaciones.
- Si el documento NO es una factura de electricidad (es otra cosa: gas, telefonía, un contrato, una foto cualquiera...), pon es_factura en false y explica qué es en observaciones.`;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    es_factura: { type: "BOOLEAN" },
    comercializadora: { type: "STRING", nullable: true },
    peaje: { type: "STRING", nullable: true },
    potencias_kw: { type: "ARRAY", items: { type: "NUMBER" }, nullable: true },
    consumo_total_kwh: { type: "NUMBER", nullable: true },
    consumos_kwh: { type: "ARRAY", items: { type: "NUMBER" }, nullable: true },
    dias_facturados: { type: "INTEGER", nullable: true },
    fecha_inicio: { type: "STRING", nullable: true },
    fecha_fin: { type: "STRING", nullable: true },
    importe_total_eur: { type: "NUMBER", nullable: true },
    alquiler_contador_eur: { type: "NUMBER", nullable: true },
    zona: { type: "STRING", nullable: true },
    observaciones: { type: "STRING", nullable: true },
  },
  required: ["es_factura"],
  propertyOrdering: [
    "es_factura",
    "comercializadora",
    "peaje",
    "potencias_kw",
    "consumo_total_kwh",
    "consumos_kwh",
    "dias_facturados",
    "fecha_inicio",
    "fecha_fin",
    "importe_total_eur",
    "alquiler_contador_eur",
    "zona",
    "observaciones",
  ],
};

const isRateLimited = crearRateLimiter(4);

const ERROR_GENERICO =
  "No hemos podido leer tu factura ahora mismo. Puedes introducir los datos a mano abajo, o enviárnosla por WhatsApp al 633 15 10 83 y te hacemos el estudio igual.";

async function llamarGemini(
  apiKey: string,
  modelo: string,
  mimeType: string,
  base64: string
): Promise<Response> {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            // El texto va ANTES del archivo: mejora la extracción (doc oficial).
            parts: [{ text: PROMPT_EXTRACCION }, { inlineData: { mimeType, data: base64 } }],
          },
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      }),
      signal: AbortSignal.timeout(45_000),
    }
  );
}

function normalizarPeaje(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const s = raw.toUpperCase().replace(/\s/g, "");
  if (s.includes("2.0") || s.includes("20TD")) return "2.0TD";
  if (s.includes("3.0") || s.includes("30TD")) return "3.0TD";
  if (s.includes("6.1")) return "6.1TD";
  if (s.includes("6.2")) return "6.2TD";
  return null;
}

function diasDesdeFechas(inicio: unknown, fin: unknown): number | null {
  if (typeof inicio !== "string" || typeof fin !== "string") return null;
  const a = new Date(inicio).getTime();
  const b = new Date(fin).getTime();
  if (isNaN(a) || isNaN(b) || b <= a) return null;
  const dias = Math.round((b - a) / 86_400_000);
  return dias >= 5 && dias <= 95 ? dias : null;
}

function arrayNumeros(v: unknown, max: number, permitirCero = false): number[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(
      (n): n is number =>
        typeof n === "number" && Number.isFinite(n) && (permitirCero ? n >= 0 : n > 0)
    )
    .slice(0, max);
}

export async function POST(request: Request) {
  if (!origenPermitido(request)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El análisis automático no está disponible. " + ERROR_GENERICO },
      { status: 503 }
    );
  }

  if (isRateLimited(ipDe(request))) {
    return NextResponse.json(
      { error: "Has subido varios archivos seguidos. Espera un minuto y vuelve a intentarlo." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    fileBase64?: unknown;
    mimeType?: unknown;
  } | null;

  const base64 = body?.fileBase64;
  const mimeType = body?.mimeType;
  if (
    typeof base64 !== "string" ||
    base64.length === 0 ||
    base64.length > MAX_BASE64_CHARS ||
    !/^[A-Za-z0-9+/=]+$/.test(base64.slice(0, 1000)) ||
    typeof mimeType !== "string" ||
    !MIMES_PERMITIDOS.has(mimeType)
  ) {
    return NextResponse.json(
      {
        error:
          "El archivo no es válido o pesa demasiado (máximo ~3 MB). Prueba con una foto normal o un PDF, o introduce los datos a mano.",
      },
      { status: 400 }
    );
  }

  try {
    let res = await llamarGemini(apiKey, MODELO, mimeType, base64);
    if (res.status === 429 || res.status >= 500) {
      // Cuota del modelo principal agotada o error transitorio → fallback.
      res = await llamarGemini(apiKey, MODELO_FALLBACK, mimeType, base64);
    }

    if (res.status === 429) {
      return NextResponse.json(
        {
          error:
            "El lector de facturas está muy solicitado ahora mismo. Prueba en unos minutos o introduce los datos a mano.",
        },
        { status: 429 }
      );
    }
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 500);
      console.error(`[factura] Gemini respondió ${res.status}: ${detail}`);
      return NextResponse.json({ error: ERROR_GENERICO }, { status: 502 });
    }

    const data = await res.json();
    const texto: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("") ?? "";

    let extraido: Record<string, unknown>;
    try {
      extraido = JSON.parse(texto);
    } catch {
      console.error("[factura] Gemini no devolvió JSON válido:", texto.slice(0, 300));
      return NextResponse.json({ error: ERROR_GENERICO }, { status: 502 });
    }

    const num = (v: unknown): number | null =>
      typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null;
    const zonaRaw = extraido.zona;
    const zona =
      zonaRaw === "baleares" || zonaRaw === "canarias" ? zonaRaw : "peninsula";

    const dias =
      (typeof extraido.dias_facturados === "number" &&
      extraido.dias_facturados >= 5 &&
      extraido.dias_facturados <= 95
        ? Math.round(extraido.dias_facturados)
        : null) ?? diasDesdeFechas(extraido.fecha_inicio, extraido.fecha_fin);

    const fecha = (v: unknown): string | null =>
      typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;

    return NextResponse.json({
      datos: {
        fechaInicio: fecha(extraido.fecha_inicio),
        fechaFin: fecha(extraido.fecha_fin),
        esFactura: extraido.es_factura === true,
        comercializadora:
          typeof extraido.comercializadora === "string"
            ? extraido.comercializadora.slice(0, 80)
            : null,
        peaje: normalizarPeaje(extraido.peaje),
        potenciasKw: arrayNumeros(extraido.potencias_kw, 6),
        consumoKwh: num(extraido.consumo_total_kwh),
        // Los ceros del desglose son legítimos (periodos ATR inactivos en el
        // mes facturado, p. ej. P1/P2/P5 en junio) — se conservan.
        consumosKwh: arrayNumeros(extraido.consumos_kwh, 6, true),
        dias,
        importeTotalEur: num(extraido.importe_total_eur),
        alquilerContadorEur: num(extraido.alquiler_contador_eur),
        zona,
        observaciones:
          typeof extraido.observaciones === "string"
            ? extraido.observaciones.slice(0, 300)
            : null,
      },
    });
  } catch (error) {
    console.error(
      "[factura] Error llamando a Gemini:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: ERROR_GENERICO }, { status: 502 });
  }
}
