import { NextResponse } from "next/server";
import { crearRateLimiter, origenPermitido, ipDe, senueloDelata } from "@/lib/api-guardas";
import {
  aperturaSospechosa,
  comprobarTurnstile,
  cuotasDeLectura,
} from "@/lib/antiabuso";
import { tipoDeFacturaBase64 } from "@/lib/expediente/archivo";

// Paso 1 de la calculadora de ahorro: el usuario sube su factura (foto o PDF)
// y Gemini extrae SOLO los datos técnicos necesarios para comparar — de hogar
// (2.0TD) o de empresa (3.0TD/6.1TD/6.2TD, hasta 6 periodos). Privacidad por
// diseño: el esquema de salida no contiene CUPS, ni nombre, ni dirección, ni
// IBAN — no se piden y por tanto no se procesan ni almacenan. El archivo se
// procesa en memoria y se descarta: ESTA ruta no guarda nada. (La factura solo
// se guarda más tarde, en /api/factura/lead, si la persona decide dejar sus
// datos para que Víctor le gestione el ahorro.)
//
// La clave (GEMINI_API_KEY, la misma del chat) SOLO existe en el servidor.
//
// FRENO ANTIABUSO (T2 del embudo de la factura, 17-oct-2026): la lectura con Gemini es lo único que cuesta (su cuota
// gratuita diaria es de todos los visitantes), y ya no pide el email por delante. Antes de llegar a Gemini la petición
// pasa, de la más barata a la más cara: señuelo → tiempo mínimo → cabecera REAL del fichero → Cloudflare Turnstile
// verificado en el servidor → cuotas en la base de datos (por IP y global). Todo falla CERRADO: si falta algo de lo
// necesario, el lector responde «no disponible» y la calculadora sigue funcionando tecleando los datos a mano.
// Detalle de cada capa: src/lib/antiabuso.ts.

export const maxDuration = 60;

// Modelo con visión para extracción; fallback si la cuota gratuita del
// principal se agota (ambos en free tier de Google AI Studio).
const MODELO = process.env.GEMINI_MODEL_FACTURA ?? "gemini-3.5-flash";
const MODELO_FALLBACK = "gemini-3.5-flash-lite";

const PROMPT_EXTRACCION = `Analiza este documento. Debería ser una factura de electricidad española (de una comercializadora como Iberdrola, Endesa, Repsol, etc.), de un hogar (tarifa 2.0TD, 1-2 potencias y hasta 3 periodos de consumo) o de una empresa (3.0TD/6.1TD/6.2TD, hasta 6 potencias y 6 periodos).

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

// `manual: true` le dice al navegador que lleve a la persona directamente a teclear los datos.
const LECTOR_NO_DISPONIBLE =
  "El lector de facturas no está disponible ahora mismo. Teclea los datos de tu factura (es 1 minuto) y calculamos igual, o envíanosla por WhatsApp al 633 15 10 83.";

// Lo que ve un bot que rellena el señuelo: parece que la IA contestó «esto no es una factura». No cuesta nada.
const DATOS_SENUELO = {
  fechaInicio: null,
  fechaFin: null,
  esFactura: false,
  comercializadora: null,
  peaje: null,
  potenciasKw: [],
  consumoKwh: null,
  consumosKwh: [],
  dias: null,
  importeTotalEur: null,
  alquilerContadorEur: null,
  zona: "peninsula",
  observaciones: "No parece una factura de luz.",
};

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

  const ip = ipDe(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Has subido varios archivos seguidos. Espera un minuto y vuelve a intentarlo." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    fileBase64?: unknown;
    mimeType?: unknown;
    turnstile?: unknown; // token de Cloudflare Turnstile, de un solo uso
    web?: unknown; // señuelo: los humanos no lo ven; los bots lo rellenan
    msAbierta?: unknown; // ms desde que se abrió la calculadora (señal blanda: la manda el navegador)
  } | null;

  // 1) Señuelo → respuesta plausible, sin gastar nada.
  if (senueloDelata(body?.web)) {
    return NextResponse.json({ datos: DATOS_SENUELO });
  }

  // 2) Tiempo mínimo desde que se abrió la página.
  if (aperturaSospechosa(body?.msAbierta)) {
    return NextResponse.json(
      { error: "Un momento: recarga la página e inténtalo de nuevo, o teclea los datos a mano." },
      { status: 429, headers: { "Retry-After": "2" } }
    );
  }

  // 3) Forma del archivo y CABECERA REAL (PDF o foto de verdad, y que cuadre con lo que dice el navegador).
  //    Desde aquí se usa el tipo REAL, no el declarado.
  const mimeType = tipoDeFacturaBase64(body?.fileBase64, body?.mimeType);
  if (!mimeType) {
    return NextResponse.json(
      {
        error:
          "El archivo no es válido o pesa demasiado (máximo ~3 MB). Prueba con una foto normal o un PDF, o introduce los datos a mano.",
      },
      { status: 400 }
    );
  }
  const base64 = body!.fileBase64 as string; // ya validado arriba

  // 4) Turnstile, verificado en el servidor. Falla cerrado.
  const turnstile = await comprobarTurnstile(body?.turnstile, ip);
  if (turnstile === "rechazado") {
    return NextResponse.json(
      {
        error:
          "No hemos podido comprobar que eres una persona. Recarga la página e inténtalo de nuevo, o teclea los datos a mano.",
      },
      { status: 403 }
    );
  }
  if (turnstile === "no_disponible") {
    return NextResponse.json({ error: LECTOR_NO_DISPONIBLE, manual: true }, { status: 503 });
  }

  // 5) Cuotas en la base de datos: por IP (6/h y 20/día) y global (400/día). Falla cerrado.
  const cuota = await cuotasDeLectura(ip);
  if (cuota.estado === "no_disponible") {
    return NextResponse.json({ error: LECTOR_NO_DISPONIBLE, manual: true }, { status: 503 });
  }
  if (cuota.estado === "ip") {
    return NextResponse.json(
      {
        error:
          "Has subido varias facturas en poco tiempo. Teclea los datos de tu factura (es 1 minuto) o vuelve a intentarlo más tarde.",
        manual: true,
      },
      { status: 429, headers: { "Retry-After": String(cuota.esperaSeg) } }
    );
  }
  if (cuota.estado === "global") {
    return NextResponse.json(
      {
        error:
          "El lector de facturas ha llegado a su límite de hoy. Teclea los datos de tu factura (es 1 minuto) y calculamos igual.",
        manual: true,
      },
      { status: 429 }
    );
  }

  // 6) Gemini.
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
