// Brevo por su API HTTPS (nunca SMTP): pieza compartida para mandar correos a
// los visitantes y darlos de alta en la lista de la web.
// ⚠️ La calculadora (/api/factura/estudio) todavía lleva su propia copia inline
// de estas llamadas; no se ha tocado para no arriesgar un flujo que funciona.
// Doc: docs/acceso-con-codigo.md

const BREVO_API = "https://api.brevo.com/v3";

/** Lista «VITERGY» de la cuenta Brevo del grupo (la misma que usa la calculadora). */
const LISTA_VITERGY = 488;

/** Remitente de los correos a visitantes (estado del dominio en Brevo: docs/acceso-con-codigo.md). */
export const REMITENTE_VITERGY = { name: "Vitergy", email: "hola@vitergy.es" };

function cabeceras(): Record<string, string> | null {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return null;
  return { "api-key": apiKey, "content-type": "application/json", accept: "application/json" };
}

/**
 * ALTAVOZ (14-oct-2026): Brevo se quedó sin créditos el 7-oct y contestaba 201 SIN enviar (Victor lo da de baja).
 * Con `ALTAVOZ_AVISOS_KEY` (clave «vitergy» de Altavoz, permiso `avisos:enviar`) el correo sale por
 * `POST {ALTAVOZ_URL}/api/v1/avisos` (Amazon SES). El remitente lo pone la clave en Altavoz: «Vitergy» hola@vitergy.es
 * (dominio vitergy.es verificado en Amazon el 14-oct). Sin la clave, Brevo como antes.
 */
async function enviarPorAltavoz(
  clave: string,
  correo: Correo,
): Promise<boolean> {
  const base = (process.env.ALTAVOZ_URL || "https://altavoz.gruponewenergy.es").replace(/\/+$/, "");
  try {
    const res = await fetch(`${base}/api/v1/avisos`, {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "content-type": "application/json" },
      body: JSON.stringify({
        marca: "GNEW",
        para: correo.para,
        asunto: correo.asunto,
        html: correo.html,
        ...(correo.texto ? { texto: correo.texto } : {}),
        etiqueta: correo.etiqueta,
        ...(correo.responderA ? { responder_a: correo.responderA } : {}),
        // Altavoz: hasta 10 ficheros y 3.000.000 bytes reales entre todos; el tipo sale de la extensión del nombre.
        ...(correo.adjuntos?.length ? { adjuntos: correo.adjuntos } : {}),
      }),
      // Con adjuntos la petición pesa hasta ~4 MB: 10 s se quedan cortos.
      signal: AbortSignal.timeout(correo.adjuntos?.length ? 25_000 : 10_000),
    });
    if (!res.ok) {
      console.error("[altavoz] /api/v1/avisos respondió", res.status, (await res.text()).slice(0, 300));
    }
    return res.ok;
  } catch (error) {
    console.error("[altavoz] Error enviando", correo.etiqueta, error);
    return false;
  }
}

/** Un fichero adjunto: el nombre CON extensión (pdf, jpg, png, webp, heic, heif…) y el contenido en base64. */
export interface Adjunto {
  nombre: string;
  contenido: string;
}

export interface Correo {
  para: string;
  asunto: string;
  html: string;
  texto?: string;
  etiqueta: string;
  /** A quién se contesta (una dirección). */
  responderA?: string;
  /** Ficheros adjuntos. Altavoz admite hasta 10 y 3.000.000 bytes reales entre todos. */
  adjuntos?: Adjunto[];
}

/** Correo transaccional. Devuelve si Altavoz (o, sin su clave, Brevo) lo aceptó; el motivo del fallo va al log. */
export async function enviarEmail(correo: Correo): Promise<boolean> {
  const clave = (process.env.ALTAVOZ_AVISOS_KEY ?? "").trim();
  if (clave) return enviarPorAltavoz(clave, correo);
  const headers = cabeceras();
  if (!headers) {
    console.error("[brevo] Falta BREVO_API_KEY: no sale el correo", correo.etiqueta);
    return false;
  }
  try {
    const res = await fetch(`${BREVO_API}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: REMITENTE_VITERGY,
        to: [{ email: correo.para }],
        subject: correo.asunto,
        htmlContent: correo.html,
        ...(correo.texto ? { textContent: correo.texto } : {}),
        ...(correo.responderA ? { replyTo: { email: correo.responderA } } : {}),
        ...(correo.adjuntos?.length
          ? { attachment: correo.adjuntos.map((a) => ({ name: a.nombre, content: a.contenido })) }
          : {}),
        tags: [correo.etiqueta],
      }),
      signal: AbortSignal.timeout(correo.adjuntos?.length ? 25_000 : 10_000),
    });
    if (!res.ok) {
      console.error("[brevo] /smtp/email respondió", res.status, (await res.text()).slice(0, 300));
    }
    return res.ok;
  } catch (error) {
    console.error("[brevo] Error enviando", correo.etiqueta, error);
    return false;
  }
}

/**
 * Alta (o reactivación) en la lista de la web. SOLO con el consentimiento de la
 * casilla opcional de novedades. `updateEnabled`: si el contacto ya existe, lo
 * añade a la lista en vez de fallar.
 */
export async function altaEnListaVitergy(email: string): Promise<boolean> {
  const headers = cabeceras();
  if (!headers) return false;
  try {
    const res = await fetch(`${BREVO_API}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID ?? LISTA_VITERGY)],
        updateEnabled: true,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[brevo] /contacts respondió", res.status, (await res.text()).slice(0, 300));
    }
    return res.ok;
  } catch (error) {
    console.error("[brevo] Error en el alta de la lista", error);
    return false;
  }
}
