// El aviso a hola@vitergy.es cada vez que alguien deja sus datos tras ver su ahorro. SOLO servidor.
//
// Decisión de Victor (17-oct-2026, 5 y 6): el aviso va SOLO a hola@vitergy.es, con la factura ADJUNTA. Sale por Altavoz
// (`enviarEmail` de src/lib/brevo.ts, clave «vitergy»), con «responder a» = la persona, así que contestar el aviso es
// contestarle a ella. Desde el 20-oct-2026 (decisión de Victor, «opción 2») la factura NO se guarda en ningún sitio: este
// correo es la única copia. Altavoz admite 3.000.000 bytes reales de adjuntos: si la factura no cabe, el aviso sale igual
// sin ella y lo dice, para pedírsela a la persona.
//
// Todo lo que escribió la persona se escapa antes de pegarlo en el HTML, y el asunto va en una sola línea.
import { enviarEmail, type Adjunto } from "@/lib/brevo";
import type { DatosFactura, Estudio } from "@/lib/estudio-ahorro";
import { EXTENSION_DE_TIPO, MAX_BYTES_ADJUNTO_AVISO, type TipoArchivo } from "./archivo";
import { textoLimpio } from "./datos";

export interface DatosAviso {
  nombre: string;
  email: string;
  movil: string;
  /** La comercializadora actual que leyó la IA (puede venir vacía). */
  comercializadora: string;
  datos: DatosFactura;
  /** Se leyó un desglose por periodos pero no cuadraba y se descartó. */
  desgloseDescartado: boolean;
  /** `null` = no se pudo calcular el estudio. */
  estudio: Estudio | null;
  /** La factura, si la persona la subió (con los datos tecleados a mano no hay). */
  factura: { base64: string; bytes: number; tipo: TipoArchivo } | null;
}

/** A quién le llega el aviso: `LEAD_TO_EMAIL` si está puesta (ya existía en Vercel) y, si no, hola@vitergy.es. */
export function destinoDelAviso(): string {
  return (process.env.LEAD_TO_EMAIL ?? "").trim() || "hola@vitergy.es";
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fila(etiqueta: string, valorHtml: string): string {
  return `<tr><td><b>${etiqueta}</b></td><td>${valorHtml}</td></tr>`;
}

const eur = (n: number): string =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (n: number): string => n.toLocaleString("es-ES", { maximumFractionDigits: 2 });
const tamano = (bytes: number): string =>
  bytes < 1_048_576
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1_048_576).toFixed(1).replace(".", ",")} MB`;

function asuntoDe(d: DatosAviso): string {
  const peaje = d.datos.peaje;
  if (!d.estudio) return `⚠️ Lead calculadora SIN cálculo (${peaje}, estudio a mano): ${d.email}`;
  if (!d.estudio.hayAhorro) {
    return `🔎 Lead calculadora (${peaje}) SIN ahorro, pide segundo vistazo: ${d.email}`;
  }
  const o = d.estudio.oferta;
  return `🧮 Lead calculadora (${peaje}): ${d.email} — ${textoLimpio(o.compania, 40)} ${textoLimpio(o.nombre, 40)}, ahorro est. ${d.estudio.ahorroAnualEur} €/año`;
}

function filaFactura(d: DatosAviso, cabe: boolean): string {
  if (!d.factura) return fila("Factura", "no la subió: datos tecleados a mano");
  const medida = `${EXTENSION_DE_TIPO[d.factura.tipo].toUpperCase()}, ${tamano(d.factura.bytes)}`;
  if (cabe) {
    return fila("Factura", `adjunta a este correo (${medida}). No se guarda en ningún otro sitio: esta copia es la única`);
  }
  return fila("Factura", `⚠️ NO cabe como adjunto (${medida}) y no se guarda: pídesela por WhatsApp o por email`);
}

/** Construye y envía el aviso. Devuelve si Altavoz (o, sin su clave, Brevo) lo aceptó. */
export async function enviarAvisoLead(d: DatosAviso): Promise<boolean> {
  const cabe = d.factura !== null && d.factura.bytes <= MAX_BYTES_ADJUNTO_AVISO;
  const adjuntos: Adjunto[] | undefined =
    d.factura && cabe
      ? [{ nombre: `factura.${EXTENSION_DE_TIPO[d.factura.tipo]}`, contenido: d.factura.base64 }]
      : undefined;

  const filas: string[] = [
    fila("Nombre", escapeHtml(d.nombre)),
    fila("Email", escapeHtml(d.email)),
    fila("Móvil", escapeHtml(d.movil)),
    d.comercializadora ? fila("Comercializadora actual", escapeHtml(d.comercializadora)) : "",
    fila("Peaje", d.datos.peaje),
    fila("Importe factura", `${eur(d.datos.importeTotalEur)} €`),
    fila("Consumo", `${num(d.datos.consumoKwh)} kWh en ${d.datos.dias} días`),
    fila("Potencias", `${d.datos.potenciasKw.join(" / ")} kW`),
    fila("Zona", d.datos.zona),
  ];
  // Si venía un desglose por periodos pero no superó la validación (no cuadra con el total o el peaje se reclasificó),
  // el estudio fino debe saber que la cifra usó el reparto estándar.
  if (d.desgloseDescartado) {
    filas.push(
      fila("⚠️ Desglose", "leído pero DESCARTADO (no cuadra o peaje reclasificado): estimación con reparto estándar")
    );
  }
  if (d.estudio) {
    const e = d.estudio;
    filas.push(
      fila(
        "OFERTA GANADORA",
        `${escapeHtml(e.oferta.compania)} · ${escapeHtml(e.oferta.nombre)} (${e.oferta.tipo}) — la de mayor ahorro de NET FIJO y GANA. El cliente NO sabe la compañía: díselo al firmar`
      ),
      fila("Coste estimado", `${eur(e.costeMejorOfertaEur)} € el periodo`),
      fila("Ahorro estimado", `${eur(e.ahorroAnualEur)} €/año (${Math.round(e.ahorroPct * 100)}%)`),
      fila("Ofertas comparadas", String(e.ofertasComparadas))
    );
  }
  filas.push(filaFactura(d, cabe));

  const estado = !d.estudio
    ? "NO ha visto ninguna cifra (falló el cálculo): estudio a mano cuanto antes."
    : d.estudio.hayAhorro
      ? "Ha visto en pantalla su ahorro estimado, SIN la compañía ni el producto."
      : "Se le dijo que a día de hoy no le compensa el cambio y pide un segundo vistazo gratis.";
  const html =
    `<h3>Nuevo lead de la calculadora de ahorro (vitergy.es/contacto)</h3>` +
    `<table border="1" cellpadding="6" cellspacing="0">${filas.filter(Boolean).join("")}</table>` +
    `<p>${estado} Se le ha prometido contacto en menos de 24 horas laborables. Responder a este correo le contesta directamente.</p>`;
  const asunto = asuntoDe(d);

  // Pruebas en local SIN mandar correos: `EXPEDIENTE_AVISO_EN_CONSOLA=1 npm run dev`. En producción (NODE_ENV=production)
  // esta variable se ignora siempre. Misma idea que ACCESO_CODIGO_EN_CONSOLA.
  if (process.env.NODE_ENV !== "production" && process.env.EXPEDIENTE_AVISO_EN_CONSOLA === "1") {
    console.log(
      `[expediente] (pruebas locales, sin correo) ${asunto} · adjuntos: ${adjuntos?.length ?? 0} · factura ${d.factura ? "sí" : "no"}`
    );
    return true;
  }

  return enviarEmail({
    para: destinoDelAviso(),
    asunto,
    html,
    etiqueta: "vitergy-lead",
    responderA: d.email,
    adjuntos,
  });
}
