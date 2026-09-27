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

/** Correo transaccional. Devuelve si Brevo lo aceptó; el motivo del fallo va al log. */
export async function enviarEmail(correo: {
  para: string;
  asunto: string;
  html: string;
  texto: string;
  etiqueta: string;
}): Promise<boolean> {
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
        textContent: correo.texto,
        tags: [correo.etiqueta],
      }),
      signal: AbortSignal.timeout(10_000),
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
