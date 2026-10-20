"use client";

import { useEffect, useRef, useState } from "react";
import TurnstileWidget, { type ManejadorTurnstile } from "@/components/TurnstileWidget";
import type { EstudioConOferta, EstudioPublico } from "@/lib/expediente/publico";

// Calculadora interactiva de ahorro — sustituye al antiguo formulario de contacto, para hogares (2.0TD) Y empresas
// (3.0TD/6.1TD/6.2TD). Embudo de la factura (17-oct-2026, decisión de Victor):
//
//   subir factura → confirmar datos → RESULTADO (sin pedir NADA) → «Quiero empezar a ahorrar» →
//   nombre + email + móvil (y en ese momento se guarda la factura) → la oferta con su marca + «Víctor te contacta».
//
// Reglas que no se tocan:
// - El usuario SIEMPRE confirma los datos antes de calcular (la IA puede leer mal) y el resultado se presenta como
//   estimación retrospectiva («habrías pagado»), nunca como promesa.
// - La MARCA de la oferta ganadora no se nombra hasta que la persona deja sus datos (el servidor ni siquiera la manda
//   antes: /api/factura/estudio devuelve solo cifras y el tipo fija/indexada). Nunca se enseña un ranking.
// - La web nunca enseña mensajes técnicos: todo error es una frase en llano con una salida (teclear a mano / WhatsApp).
// - La factura se queda en la memoria de este navegador desde que se lee; solo viaja de nuevo, al servidor, cuando la
//   persona pulsa enviar sus datos. Si teclea los datos a mano, no hay factura y el aviso lo dice.
//
// Siguiente tanda (T3): aquí, tras «Víctor te contacta», irá el botón «Adelantar el cambio: vía rápida» (DNI, CIF e IBAN).

const WHATSAPP_NUMBER = "34633151083";
const MAX_PDF_BYTES = 3 * 1024 * 1024; // límite request de Vercel: 4,5 MB
const MAX_LADO_IMAGEN = 2000; // px — recomprime fotos de móvil en el navegador

// Clave pública del widget de Cloudflare Turnstile (no es un secreto). Sin ella el lector de facturas no se ofrece:
// el servidor tampoco lo atendería (falla cerrado) y se pasa directamente a teclear los datos a mano.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type Paso =
  | "subir"
  | "analizando"
  | "confirmar"
  | "calculando"
  | "resultado"
  | "datos"
  | "enviando"
  | "gracias";
type Peaje = "2.0TD" | "3.0TD" | "6.1TD" | "6.2TD";

interface DatosForm {
  importeTotalEur: string;
  consumoKwh: string;
  potenciaP1Kw: string;
  dias: string;
  peaje: Peaje;
  zona: "peninsula" | "baleares" | "canarias";
}

const FORM_INICIAL: DatosForm = {
  importeTotalEur: "",
  consumoKwh: "",
  potenciaP1Kw: "",
  dias: "30",
  peaje: "2.0TD",
  zona: "peninsula",
};

interface Extraido {
  esFactura: boolean;
  comercializadora: string | null;
  peaje: Peaje | null;
  potenciasKw: number[];
  consumoKwh: number | null;
  consumosKwh: number[];
  dias: number | null;
  fechaInicio: string | null;
  fechaFin: string | null;
  importeTotalEur: number | null;
  alquilerContadorEur: number | null;
  zona: "peninsula" | "baleares" | "canarias";
  observaciones: string | null;
}

/** Lo que se manda al servidor para calcular (y, después, para el lead): los datos de la factura ya confirmados. */
interface DatosEnvio {
  importeTotalEur: number;
  consumoKwh: number;
  consumosKwh: number[] | null;
  potenciasKw: number[];
  dias: number;
  peaje: Peaje;
  zona: "peninsula" | "baleares" | "canarias";
  fechaInicio: string | null;
  fechaFin: string | null;
  alquilerContadorEur: number | null;
}

/** Lo que ve la persona ANTES de dejar sus datos: cifras y tipo de oferta, sin marca. */
interface RespuestaEstudio {
  tipo: "ok" | "sin_calculo";
  estudio?: EstudioPublico;
}

/** Lo que devuelve el servidor al dejar los datos: ya con la oferta y su marca. */
interface RespuestaLead {
  tipo: "ok" | "sin_calculo";
  estudio?: EstudioConOferta;
}

const eur0 = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 0 });
const eur2 = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** «2026-10-17» → «17/10» (la fecha de los precios la pone el servidor: nada de Date al pintar). */
function ddmm(iso: string): string {
  const [, mes, dia] = iso.split("-");
  return dia && mes ? `${dia}/${mes}` : iso;
}

/** El importe de la factura tal cual lo tiene el formulario («120,5»), enseñado como dinero («120,50»). */
function importeComoDinero(texto: string): string {
  const n = parseNumES(texto, true);
  return Number.isFinite(n) ? eur2(n) : texto;
}

// Errores cuyo mensaje SÍ es apto para el usuario (los demás — "Failed to
// fetch", SyntaxError… — se sustituyen por un genérico en español).
class ErrorUsuario extends Error {}

const ERROR_RED =
  "No hemos podido conectar. Comprueba tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp al 633 15 10 83.";

// Números tecleados a la española: "1.234,56" → 1234.56 · "85,5" → 85.5 ·
// "4.6" → 4.6. El punto SOLO se trata como separador de miles si el campo lo
// permite (importe/consumo) Y el patrón es estrictamente de miles — jamás en
// potencia: "4.619" kW es una trifásica normal, no 4.619 kW (bug crítico
// cazado en revisión: convertía hogares en industrias).
function parseNumES(s: string, permitirMiles = false): number {
  const t = s.trim();
  if (t.includes(",")) return parseFloat(t.replace(/\./g, "").replace(",", "."));
  if (permitirMiles && /^\d{1,3}(\.\d{3})+$/.test(t)) {
    return parseFloat(t.replace(/\./g, ""));
  }
  return parseFloat(t);
}

// Prefill en formato español (coma decimal) para que parseNumES tome siempre
// la rama inequívoca de la coma.
const aTextoES = (n: number | null | undefined): string =>
  n == null ? "" : String(n).replace(".", ",");

async function archivoABase64(file: File): Promise<{ base64: string; mimeType: string }> {
  // PDF: tal cual (los nativos pesan poco).
  if (file.type === "application/pdf") {
    if (file.size > MAX_PDF_BYTES) {
      throw new ErrorUsuario("El PDF pesa más de 3 MB. Prueba con una foto de la primera página.");
    }
    return { base64: await leerBase64(file), mimeType: file.type };
  }

  // Imagen: recomprimir en el navegador (menos peso y mejor lectura).
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const escala = Math.min(1, MAX_LADO_IMAGEN / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("sin canvas");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), mimeType: "image/jpeg" };
  } catch {
    // El navegador no sabe decodificarla (p. ej. HEIC fuera de Safari):
    // se envía tal cual — el lector del servidor sí entiende HEIC.
    if (file.size > MAX_PDF_BYTES) {
      throw new ErrorUsuario(
        "No hemos podido procesar esa imagen y pesa más de 3 MB. Haz una captura de pantalla de la factura y súbela."
      );
    }
    const tipo = file.type || (/\.hei[cf]$/i.test(file.name) ? "image/heic" : "");
    if (!tipo.startsWith("image/")) {
      throw new ErrorUsuario("Formato no reconocido. Sube una foto (JPG/PNG/HEIC) o un PDF.");
    }
    return { base64: await leerBase64(file), mimeType: tipo };
  }
}

function leerBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = reader.result as string;
      resolve(s.slice(s.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

export default function CalculadoraAhorro() {
  const [paso, setPaso] = useState<Paso>("subir");
  const [error, setError] = useState<string | null>(null);
  const [nota, setNota] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [extraido, setExtraido] = useState<Extraido | null>(null);
  // La factura que se leyó, en la memoria de este navegador hasta que la persona deja sus datos.
  const [factura, setFactura] = useState<{ base64: string; mimeType: string } | null>(null);
  const [form, setForm] = useState<DatosForm>(FORM_INICIAL);
  const [datosEnvio, setDatosEnvio] = useState<DatosEnvio | null>(null);
  const [calculo, setCalculo] = useState<RespuestaEstudio | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [movil, setMovil] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [final, setFinal] = useState<RespuestaLead | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<ManejadorTurnstile>(null);
  // Cuándo se abrió la calculadora: el servidor exige un tiempo mínimo hasta la primera lectura (señal blanda anti-bots).
  const abiertaEn = useRef(0);
  useEffect(() => {
    abiertaEn.current = Date.now();
  }, []);

  const lectorDisponible = SITE_KEY !== "";

  async function analizarArchivo(file: File) {
    setError(null);
    setNota(null);
    // El formulario, la factura y lo leído van siempre juntos: al empezar una lectura nueva se parte de cero (si no, una
    // lectura que acabara en «teclear a mano» enseñaría los datos de la factura anterior).
    setExtraido(null);
    setFactura(null);
    setForm(FORM_INICIAL);
    setPaso("analizando");
    try {
      const archivo = await archivoABase64(file);
      // La factura se queda en la memoria del navegador desde YA: si el lector falla (un bloqueador impide el antispam, hay
      // límite de uso, Gemini no responde…) y la persona pasa a teclear los datos a mano, se guarda igualmente cuando deje
      // sus datos. Solo se suelta si el servidor dice que el archivo no vale.
      setFactura(archivo);
      // Un token nuevo de Turnstile por cada lectura (es de un solo uso).
      const token = (await turnstileRef.current?.obtenerToken()) ?? null;
      if (!token) {
        throw new ErrorUsuario(
          "No hemos podido comprobar que eres una persona (¿tienes un bloqueador activo?). Recarga la página e inténtalo de nuevo, o teclea los datos a mano."
        );
      }
      const res = await fetch("/api/factura/analizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: archivo.base64,
          mimeType: archivo.mimeType,
          turnstile: token,
          web: honeypot,
          msAbierta: Date.now() - abiertaEn.current,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.datos) {
        // 400/413: el archivo no vale (tipo, cabecera o tamaño): fuera. Cualquier otro fallo NO es culpa del archivo.
        if (res.status === 400 || res.status === 413) setFactura(null);
        if (data?.manual === true) {
          // El lector no está disponible (o hay mucha demanda): se pasa a teclear a mano, SIN perder la factura que ya subió.
          irAManual(data?.error);
          return;
        }
        throw new ErrorUsuario(
          data?.error ?? "No se pudo analizar la factura. Puedes introducir los datos a mano."
        );
      }

      const d: Extraido = data.datos;
      setExtraido(d);
      setFactura(archivo);
      setForm({
        importeTotalEur: aTextoES(d.importeTotalEur),
        consumoKwh: aTextoES(d.consumoKwh),
        potenciaP1Kw: aTextoES(d.potenciasKw[0]),
        dias: d.dias?.toString() ?? "30",
        peaje: d.peaje ?? "2.0TD",
        zona: d.zona,
      });
      setPaso("confirmar");
    } catch (e) {
      setError(e instanceof ErrorUsuario ? e.message : ERROR_RED);
      setPaso("subir");
    }
  }

  /** Pasa a teclear los datos a mano. Sin factura leída (`extraido` vacío); `aviso` es la frase que explica por qué. */
  function irAManual(aviso?: string) {
    setExtraido(null);
    setError(null);
    setNota(aviso ?? null);
    setPaso("confirmar");
  }

  /** Potencias que se enviarán: P1 del formulario + resto de las leídas. */
  function potenciasEfectivas(pot: number): number[] {
    if (extraido && extraido.potenciasKw.length > 0) {
      return [pot, ...extraido.potenciasKw.slice(1)];
    }
    return [pot];
  }

  /**
   * Los datos que se mandan al servidor. Si el usuario corrigió un campo visible, sus derivados invisibles del extraído
   * quedan obsoletos: se anulan para no mandar datos incoherentes (el servidor además coteja que el desglose cuadre
   * con el total).
   */
  function construirDatos(peaje: Peaje): DatosEnvio {
    const con = parseNumES(form.consumoKwh, true);
    const pot = parseNumES(form.potenciaP1Kw);
    const dia = parseInt(form.dias, 10);
    const cerca = (a: number, b: number) => Math.abs(a - b) < 0.001;
    const consumoEditado = extraido?.consumoKwh != null && !cerca(con, extraido.consumoKwh);
    const diasEditados = extraido?.dias != null && dia !== extraido.dias;
    return {
      importeTotalEur: parseNumES(form.importeTotalEur, true),
      consumoKwh: con,
      consumosKwh: consumoEditado ? null : (extraido?.consumosKwh ?? null),
      potenciasKw: potenciasEfectivas(pot),
      dias: dia,
      peaje,
      zona: form.zona,
      // Días corregidos → las fechas y el alquiler leídos son de OTRO
      // periodo: fuera (el servidor tiene fallbacks declarados).
      fechaInicio: diasEditados ? null : (extraido?.fechaInicio ?? null),
      fechaFin: diasEditados ? null : (extraido?.fechaFin ?? null),
      alquilerContadorEur: diasEditados ? null : (extraido?.alquilerContadorEur ?? null),
    };
  }

  // Espejo de los rangos del servidor (validarDatosFactura), en SU MISMO
  // orden: primero reclasificar el peaje con la potencia máxima, después
  // validar con los rangos del peaje resultante. Si todo cuadra, calcula el
  // ahorro al momento: ya NO se pide el email por delante.
  async function calcularAhorro(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const imp = parseNumES(form.importeTotalEur, true);
    const con = parseNumES(form.consumoKwh, true);
    const pot = parseNumES(form.potenciaP1Kw);
    const dia = parseInt(form.dias, 10);
    if (!(pot >= 0.1 && pot <= 20000)) {
      setError("Revisa la potencia contratada en kW (ej.: 4,6).");
      return;
    }
    let peaje = form.peaje;
    const potMax = Math.max(...potenciasEfectivas(pot));
    if (peaje === "2.0TD" && potMax > 15) {
      // 2.0TD no existe por encima de 15 kW → es un suministro de empresa.
      peaje = "3.0TD";
      setForm({ ...form, peaje });
    }
    const esHogar = peaje === "2.0TD";
    if (!(imp >= 5 && imp <= (esHogar ? 5000 : 500000))) {
      setError("Revisa el importe total de la factura (ej.: 85,50).");
      return;
    }
    if (!(con >= 10 && con <= (esHogar ? 20000 : 5000000))) {
      setError("Revisa el consumo en kWh del periodo (ej.: 290).");
      return;
    }
    if (!(dia >= 5 && dia <= 95)) {
      setError("Los días facturados deben estar entre 5 y 95.");
      return;
    }

    const datos = construirDatos(peaje);
    setDatosEnvio(datos);
    setPaso("calculando");
    try {
      const res = await fetch("/api/factura/estudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos, web: honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.tipo) {
        throw new ErrorUsuario(data?.error ?? "No se pudo calcular el ahorro. " + ERROR_RED);
      }
      setCalculo(data);
      setPaso("resultado");
    } catch (err) {
      setError(err instanceof ErrorUsuario ? err.message : ERROR_RED);
      setPaso("confirmar");
    }
  }

  // «Quiero empezar a ahorrar»: aquí se guardan los datos de contacto y la factura, y se enseña la oferta con su marca.
  async function enviarDatos(e: React.FormEvent) {
    e.preventDefault();
    if (!datosEnvio) return;
    setError(null);
    setPaso("enviando");
    try {
      // Antispam también aquí (20-oct-2026): token nuevo de Turnstile, de un solo uso. Sin clave de sitio, null (el
      // servidor lo deja pasar si tampoco tiene la secreta).
      const token = lectorDisponible ? ((await turnstileRef.current?.obtenerToken()) ?? null) : null;
      const res = await fetch("/api/factura/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          movil,
          privacidad: aceptaPolitica,
          datos: datosEnvio,
          extra: { comercializadora: extraido?.comercializadora ?? null },
          factura: factura ? { fileBase64: factura.base64, mimeType: factura.mimeType } : null,
          web: honeypot,
          turnstile: token,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.tipo) {
        // El servidor no pudo usar el archivo: se suelta, para que la persona pueda enviar sus datos sin él.
        if (res.status === 400 && data?.campo === "factura") setFactura(null);
        throw new ErrorUsuario(data?.error ?? "No se pudo registrar tu solicitud. " + ERROR_RED);
      }
      setFinal(data);
      setPaso("gracias");
    } catch (err) {
      setError(err instanceof ErrorUsuario ? err.message : ERROR_RED);
      setPaso("datos");
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]";
  const labelCls = "block text-sm font-medium text-gray-700";
  const botonPrincipal =
    "w-full cursor-pointer rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60";
  const botonSecundario =
    "w-full cursor-pointer text-center text-sm font-medium text-[#f97316] underline underline-offset-2";

  // El señuelo anti-bots: invisible para humanos, los bots lo rellenan.
  const senuelo = (
    <div className="hidden" aria-hidden="true">
      <label htmlFor="web-hp">Tu web</label>
      <input
        id="web-hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </div>
  );

  // ─────────────────── Paso: subir factura ───────────────────
  if (paso === "subir" || paso === "analizando") {
    return (
      <div className="space-y-4">
        {lectorDisponible ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              turnstileRef.current?.precargar();
              setArrastrando(true);
            }}
            onDragLeave={() => setArrastrando(false)}
            onDrop={(e) => {
              e.preventDefault();
              setArrastrando(false);
              const f = e.dataTransfer.files?.[0];
              if (f && paso !== "analizando") analizarArchivo(f);
            }}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
              arrastrando ? "border-[#f97316] bg-[#fff7ed]" : "border-gray-300 bg-gray-50"
            }`}
          >
            {paso === "analizando" ? (
              <div className="space-y-3">
                <svg
                  className="mx-auto h-10 w-10 animate-spin text-[#f97316]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="text-sm font-semibold text-gray-900">Leyendo tu factura…</p>
                <p className="text-xs text-gray-500">
                  Extraemos solo consumo, potencia e importe. Ni tu CUPS ni tus datos
                  personales: no los necesitamos.
                </p>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-10 w-10 text-[#f97316]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-3 text-sm font-semibold text-gray-900">
                  Sube una foto o PDF de tu última factura de luz
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Hogares y empresas. Vale una foto hecha con el móvil. JPG, PNG, HEIC o PDF.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    turnstileRef.current?.precargar();
                    inputRef.current?.click();
                  }}
                  className="mt-4 cursor-pointer rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                  Elegir archivo
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,.heic,.heif,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) analizarArchivo(f);
                    e.target.value = "";
                  }}
                />
              </>
            )}
            {/* Aquí aparece la casilla de Cloudflare solo si necesita que la persona la pulse; casi siempre es invisible. */}
            <TurnstileWidget siteKey={SITE_KEY} ref={turnstileRef} />
          </div>
        ) : (
          <div className="rounded-2xl border border-orange-200 bg-[#fff7ed] p-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              El lector automático de facturas no está disponible ahora mismo
            </p>
            <p className="mt-1 text-xs text-gray-600">
              No pasa nada: teclea los datos de tu factura (es 1 minuto) y calculamos tu ahorro igual.
            </p>
            <button
              type="button"
              onClick={() => irAManual()}
              className="mt-4 cursor-pointer rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Teclear los datos de mi factura
            </button>
          </div>
        )}

        {senuelo}

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {paso !== "analizando" && lectorDisponible && (
          <button type="button" onClick={() => irAManual()} className={botonSecundario}>
            Prefiero teclear los datos a mano
          </button>
        )}

        <p className="text-xs leading-5 text-gray-500">
          Tu factura se lee al momento con Google Gemini y solo usamos los datos
          técnicos (consumo, potencia, importe) para calcular tu ahorro. Si
          después de ver tu ahorro decides dejarnos tus datos para que Víctor te
          lo gestione, nos llega adjunta a nuestro correo; si no, se descarta. Si lo prefieres, puedes tapar tus datos personales en la foto
          — no los necesitamos.
        </p>
      </div>
    );
  }

  // ─────────────────── Paso: confirmar datos ───────────────────
  if (paso === "confirmar" || paso === "calculando") {
    const avisoNoFactura = extraido && !extraido.esFactura;
    const esEmpresa = form.peaje !== "2.0TD";
    const calculando = paso === "calculando";
    return (
      <form onSubmit={calcularAhorro} className="space-y-4">
        {extraido ? (
          <p className="rounded-lg bg-[#fff7ed] p-3 text-sm text-gray-700">
            {avisoNoFactura ? (
              <>
                ⚠️ No estamos seguros de que el archivo sea una factura de luz
                {extraido.observaciones ? ` (${extraido.observaciones})` : ""}. Revisa
                o corrige los datos antes de seguir.
              </>
            ) : (
              <>
                ✅ Factura leída{extraido.comercializadora ? ` (${extraido.comercializadora})` : ""}.
                Comprueba que los datos coinciden con tu factura — puedes corregirlos.
              </>
            )}
          </p>
        ) : (
          <p className="rounded-lg bg-[#fff7ed] p-3 text-sm text-gray-700">
            {nota ?? "Copia estos datos de tu última factura de luz."}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="importe" className={labelCls}>
              Importe total (€) *
            </label>
            <input
              id="importe"
              type="text"
              inputMode="decimal"
              required
              value={form.importeTotalEur}
              onChange={(e) => setForm({ ...form, importeTotalEur: e.target.value })}
              className={inputCls}
              placeholder="85,50"
            />
          </div>
          <div>
            <label htmlFor="consumo" className={labelCls}>
              Consumo (kWh) *
            </label>
            <input
              id="consumo"
              type="text"
              inputMode="decimal"
              required
              value={form.consumoKwh}
              onChange={(e) => setForm({ ...form, consumoKwh: e.target.value })}
              className={inputCls}
              placeholder="290"
            />
          </div>
          <div>
            <label htmlFor="potencia" className={labelCls}>
              Potencia contratada (kW) *
            </label>
            <input
              id="potencia"
              type="text"
              inputMode="decimal"
              required
              value={form.potenciaP1Kw}
              onChange={(e) => setForm({ ...form, potenciaP1Kw: e.target.value })}
              className={inputCls}
              placeholder="4,6"
            />
            {extraido && extraido.potenciasKw.length > 1 && (
              <p className="mt-1 text-xs text-gray-500">
                Leídas {extraido.potenciasKw.length} potencias de tu factura — las
                usaremos todas.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="dias" className={labelCls}>
              Días facturados *
            </label>
            <input
              id="dias"
              type="number"
              min={5}
              max={95}
              required
              value={form.dias}
              onChange={(e) => setForm({ ...form, dias: e.target.value })}
              className={inputCls}
              placeholder="30"
            />
          </div>
          <div>
            <label htmlFor="peaje" className={labelCls}>
              Tarifa de acceso
            </label>
            <select
              id="peaje"
              value={form.peaje}
              onChange={(e) => setForm({ ...form, peaje: e.target.value as Peaje })}
              className={inputCls + " text-gray-700"}
            >
              <option value="2.0TD">2.0TD (hogar)</option>
              <option value="3.0TD">3.0TD (empresa)</option>
              <option value="6.1TD">6.1TD (empresa)</option>
              <option value="6.2TD">6.2TD (empresa)</option>
            </select>
          </div>
          <div>
            <label htmlFor="zona" className={labelCls}>
              Zona del suministro
            </label>
            <select
              id="zona"
              value={form.zona}
              onChange={(e) =>
                setForm({ ...form, zona: e.target.value as DatosForm["zona"] })
              }
              className={inputCls + " text-gray-700"}
            >
              <option value="peninsula">Península</option>
              <option value="baleares">Baleares</option>
              <option value="canarias">Canarias</option>
            </select>
          </div>
        </div>

        {esEmpresa && (
          <p className="rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-800">
            Suministro de empresa: calculamos tu estimación con los periodos de tu
            factura y Víctor la afina después con la curva real de consumo.
          </p>
        )}

        {senuelo}

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            disabled={calculando}
            onClick={() => {
              setPaso("subir");
              setError(null);
            }}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Volver
          </button>
          <button type="submit" disabled={calculando} className={"flex-1 " + botonPrincipal}>
            {calculando ? "Comparando ofertas…" : "Calcular mi ahorro"}
          </button>
        </div>
      </form>
    );
  }

  // ─────────────────── Paso: resultado (sin pedir NADA) ───────────────────
  if (paso === "resultado" && calculo) {
    const est = calculo.tipo === "ok" ? calculo.estudio : undefined;
    const corregir = (
      <button
        type="button"
        onClick={() => {
          setPaso("confirmar");
          setError(null);
        }}
        className={botonSecundario}
      >
        ← Corregir los datos de mi factura
      </button>
    );

    if (est && est.hayAhorro) {
      return (
        <div className="space-y-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Ahorro estimado en tu factura
          </p>
          <p className="text-5xl font-extrabold tracking-tight text-[#f97316]">
            ~{eur0(est.ahorroPeriodoEur)} €
          </p>
          <p className="text-sm text-gray-600">
            en esta factura · unos <strong>~{eur0(est.ahorroAnualEur)} €/año</strong> si
            se repite
          </p>
          <div className="rounded-xl border border-orange-200 bg-white p-4 text-left shadow-sm">
            <dl className="space-y-1 text-sm text-gray-700">
              <div className="flex justify-between gap-4">
                <dt>Pagaste</dt>
                <dd className="font-semibold">{importeComoDinero(form.importeTotalEur)} €</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Habrías pagado</dt>
                <dd className="font-semibold">~{eur2(est.costeMejorOfertaEur)} €</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-gray-100 pt-1">
                <dt>Ahorras</dt>
                <dd className="font-bold text-[#f97316]">
                  ~{eur2(est.ahorroPeriodoEur)} € ({Math.round(est.ahorroPct * 100)}% menos)
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-gray-600">
              Mejor oferta encontrada:{" "}
              <span className="rounded-full bg-[#fff7ed] px-2 py-0.5 font-semibold text-[#f97316]">
                {est.ofertaTipo === "indexada" ? "indexada" : "precio fijo"}
              </span>
            </p>
          </div>
          <div className="rounded-xl bg-[#fff7ed] p-4 text-left text-xs leading-5 text-gray-600">
            <p>
              Estimación calculada el {ddmm(est.fechaPrecios)} comparando{" "}
              {est.ofertasComparadas} ofertas reales del mercado con la fiscalidad
              vigente, sobre tu última factura («habrías pagado»). No es una promesa
              de tu próxima factura: Víctor la verifica gratis, factura a factura, y
              te gestiona el cambio sin cortes de luz. Si no hay ahorro real, no se
              cobra.
            </p>
          </div>
          <button type="button" onClick={() => setPaso("datos")} className={botonPrincipal}>
            Quiero empezar a ahorrar
          </button>
          <p className="text-xs text-gray-500">
            En el siguiente paso te decimos qué oferta es y Víctor se encarga del cambio.
          </p>
          {corregir}
        </div>
      );
    }

    if (est) {
      return (
        <div className="space-y-5 text-center">
          <p className="text-4xl">👏</p>
          <p className="text-xl font-bold text-gray-900">
            Buenas noticias: tu tarifa ya está bien optimizada
          </p>
          <p className="text-sm text-gray-700">
            Hemos comparado tu factura con {est.ofertasComparadas} ofertas reales
            del mercado y el ahorro sería mínimo. Somos independientes: no te
            haríamos cambiar por cambiar. ¿Quieres que Víctor le eche un segundo
            vistazo gratis (potencia contratada, permanencias, servicios extra…)?
          </p>
          <button type="button" onClick={() => setPaso("datos")} className={botonPrincipal}>
            Sí, que Víctor le eche un segundo vistazo
          </button>
          {corregir}
        </div>
      );
    }

    return (
      <div className="space-y-5 text-center">
        <p className="text-4xl">📬</p>
        <p className="text-xl font-bold text-gray-900">
          No podemos darte la cifra al momento
        </p>
        <p className="text-sm text-gray-700">
          Ahora mismo no logramos calcular tu ahorro al instante. Si nos dejas tus
          datos, Víctor te prepara el estudio a mano y te lo envía en menos de 24
          horas laborables.
        </p>
        <button type="button" onClick={() => setPaso("datos")} className={botonPrincipal}>
          Dejar mis datos
        </button>
        {corregir}
      </div>
    );
  }

  // ─────────────────── Paso: nombre + email + móvil ───────────────────
  if (paso === "datos" || paso === "enviando") {
    const variante =
      calculo?.tipo === "ok" && calculo.estudio
        ? calculo.estudio.hayAhorro
          ? "ahorro"
          : "sin_ahorro"
        : "sin_calculo";
    const textos = {
      ahorro: {
        titulo: "Último paso: dinos cómo contactarte",
        sub: "Te enseñamos la oferta concreta y Víctor te contacta en menos de 24 horas laborables para gestionarte el cambio, sin coste.",
        boton: "Enviar y ver mi oferta",
      },
      sin_ahorro: {
        titulo: "Que Víctor le eche un segundo vistazo",
        sub: "Revisa gratis la potencia, las permanencias y los servicios extra de tu factura, y te contacta en menos de 24 horas laborables.",
        boton: "Pedir el segundo vistazo gratis",
      },
      sin_calculo: {
        titulo: "Que Víctor prepare tu estudio",
        sub: "Déjanos tus datos y Víctor te prepara el estudio a mano y te contacta en menos de 24 horas laborables.",
        boton: "Enviar mis datos",
      },
    }[variante];
    const enviando = paso === "enviando";

    return (
      <form onSubmit={enviarDatos} className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{textos.titulo}</p>
          <p className="mt-1 text-sm text-gray-600">{textos.sub}</p>
        </div>

        <div>
          <label htmlFor="nombre-lead" className={labelCls}>
            Nombre *
          </label>
          <input
            id="nombre-lead"
            type="text"
            required
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputCls}
            placeholder="Tu nombre (o el de tu empresa)"
          />
        </div>
        <div>
          <label htmlFor="email-lead" className={labelCls}>
            Email *
          </label>
          <input
            id="email-lead"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="movil-lead" className={labelCls}>
            Móvil *
          </label>
          <input
            id="movil-lead"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={movil}
            onChange={(e) => setMovil(e.target.value)}
            className={inputCls}
            placeholder="600 123 456"
          />
        </div>

        {senuelo}

        <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-gray-600">
          <input
            type="checkbox"
            required
            checked={aceptaPolitica}
            onChange={(e) => setAceptaPolitica(e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#f97316]"
          />
          <span>
            He leído y acepto la{" "}
            <a
              href="/privacidad"
              target="_blank"
              className="font-medium text-[#f97316] underline underline-offset-2"
            >
              política de privacidad
            </a>
            . *
          </span>
        </label>

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {lectorDisponible && <TurnstileWidget siteKey={SITE_KEY} ref={turnstileRef} />}

        <div className="flex gap-3">
          <button
            type="button"
            disabled={enviando}
            onClick={() => {
              setPaso("resultado");
              setError(null);
            }}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Volver
          </button>
          <button type="submit" disabled={enviando} className={"flex-1 " + botonPrincipal}>
            {enviando ? "Enviando…" : textos.boton}
          </button>
        </div>

        <p className="text-xs leading-5 text-gray-500">
          Responsable: Por encima del techo del cielo, S.L. Finalidad: atender tu
          solicitud y elaborar tu estudio energético. {factura ? "Tu factura nos llega adjunta a nuestro correo y la conservamos, con " : "Conservamos "}
          tus datos de contacto, durante un año. No te enviamos publicidad sin tu
          consentimiento. Derechos en hola@vitergy.es. Más información en la
          política de privacidad.
        </p>
      </form>
    );
  }

  // ─────────────────── Paso final: la oferta con su marca y «Víctor te contacta» ───────────────────
  const est = final?.tipo === "ok" ? final.estudio : undefined;
  const waTexto = encodeURIComponent(
    est?.hayAhorro
      ? `Hola Víctor, acabo de usar la calculadora de vitergy.es: mi mejor oferta es ${est.oferta.compania} ${est.oferta.nombre} (${est.oferta.tipo}), ahorro estimado de ${eur0(est.ahorroAnualEur)} €/año. Quiero que me gestiones el cambio gratis.`
      : `Hola Víctor, acabo de dejar mis datos en la calculadora de vitergy.es.`
  );

  return (
    <div className="space-y-5 text-center">
      {est && est.hayAhorro ? (
        <>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Tu mejor oferta hoy
          </p>
          <div className="rounded-xl border border-orange-200 bg-white p-4 text-left shadow-sm">
            <p className="text-lg font-bold text-gray-900">
              {est.oferta.compania} · {est.oferta.nombre}
              <span className="ml-2 rounded-full bg-[#fff7ed] px-2 py-0.5 text-xs font-semibold text-[#f97316]">
                {est.oferta.tipo === "indexada" ? "indexada" : "precio fijo"}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Con ella, esta factura te habría costado{" "}
              <strong>~{eur2(est.costeMejorOfertaEur)} €</strong> en lugar de{" "}
              <strong>{importeComoDinero(form.importeTotalEur)} €</strong> — un{" "}
              <strong>{Math.round(est.ahorroPct * 100)}% menos</strong>, unos{" "}
              <strong>~{eur0(est.ahorroAnualEur)} €/año</strong>.
            </p>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Víctor te contacta en menos de 24 horas laborables</strong> para
            gestionarte el cambio, sin coste y sin cortes de luz. Si no hay ahorro
            real, no se cobra.
          </p>
        </>
      ) : est ? (
        <>
          <p className="text-4xl">👏</p>
          <p className="text-xl font-bold text-gray-900">¡Recibido!</p>
          <p className="text-sm text-gray-700">
            Víctor le echará un segundo vistazo gratis a tu factura (potencia
            contratada, permanencias, servicios extra…) y te contacta en menos de 24
            horas laborables.
          </p>
        </>
      ) : (
        <>
          <p className="text-4xl">📬</p>
          <p className="text-xl font-bold text-gray-900">¡Recibido!</p>
          <p className="text-sm text-gray-700">
            Tenemos tus datos. Víctor preparará tu estudio personalizado y te
            contactará en menos de 24 horas laborables.
          </p>
        </>
      )}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waTexto}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#1fb855]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {est?.hayAhorro ? "Escribir a Víctor ahora por WhatsApp" : "Hablar con Víctor por WhatsApp"}
      </a>

      <p className="text-xs text-gray-500">
        El análisis es gratis y, si no hay ahorro, no se cobra.
      </p>
    </div>
  );
}
