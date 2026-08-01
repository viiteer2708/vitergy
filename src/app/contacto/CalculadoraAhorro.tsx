"use client";

import { useRef, useState } from "react";

// Calculadora interactiva de ahorro — sustituye al antiguo formulario de
// contacto. Flujo: subir factura → confirmar datos extraídos → email →
// estudio en pantalla, para hogares (2.0TD) Y empresas (3.0TD/6.1TD/6.2TD).
// El usuario SIEMPRE confirma los datos antes de calcular (la IA puede leer
// mal) y el resultado se presenta como estimación. Se muestra LA OFERTA
// GANADORA (dictamen Victor 2-ago-2026) — nunca un ranking.

const WHATSAPP_NUMBER = "34633151083";
const MAX_PDF_BYTES = 3 * 1024 * 1024; // límite request de Vercel: 4,5 MB
const MAX_LADO_IMAGEN = 2000; // px — recomprime fotos de móvil en el navegador

type Paso = "subir" | "analizando" | "confirmar" | "email" | "enviando" | "resultado";
type Peaje = "2.0TD" | "3.0TD" | "6.1TD" | "6.2TD";

interface DatosForm {
  importeTotalEur: string;
  consumoKwh: string;
  potenciaP1Kw: string;
  dias: string;
  peaje: Peaje;
  zona: "peninsula" | "baleares" | "canarias";
}

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

interface EstudioResp {
  tipo: "ok" | "sin_calculo";
  estudio?: {
    costeMejorOfertaEur: number;
    ahorroPeriodoEur: number;
    ahorroAnualEur: number;
    ahorroPct: number;
    ofertasComparadas: number;
    fechaPrecios: string;
    hayAhorro: boolean;
    oferta: { compania: string; nombre: string; tipo: "fija" | "indexada" };
    prioridadAplicada: boolean;
  };
}

const eur = (n: number) =>
  n.toLocaleString("es-ES", { maximumFractionDigits: 0 });

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
  const [arrastrando, setArrastrando] = useState(false);
  const [extraido, setExtraido] = useState<Extraido | null>(null);
  const [form, setForm] = useState<DatosForm>({
    importeTotalEur: "",
    consumoKwh: "",
    potenciaP1Kw: "",
    dias: "30",
    peaje: "2.0TD",
    zona: "peninsula",
  });
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [consienteMarketing, setConsienteMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [resultado, setResultado] = useState<EstudioResp | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function analizarArchivo(file: File) {
    setError(null);
    setPaso("analizando");
    try {
      const { base64, mimeType } = await archivoABase64(file);
      const res = await fetch("/api/factura/analizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64: base64, mimeType }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.datos) {
        throw new ErrorUsuario(
          data?.error ?? "No se pudo analizar la factura. Puedes introducir los datos a mano."
        );
      }

      const d: Extraido = data.datos;
      setExtraido(d);
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

  function irAManual() {
    setExtraido(null);
    setError(null);
    setPaso("confirmar");
  }

  /** Potencias que se enviarán: P1 del formulario + resto de las leídas. */
  function potenciasEfectivas(pot: number): number[] {
    if (extraido && extraido.potenciasKw.length > 0) {
      return [pot, ...extraido.potenciasKw.slice(1)];
    }
    return [pot];
  }

  // Espejo de los rangos del servidor (validarDatosFactura), en SU MISMO
  // orden: primero reclasificar el peaje con la potencia máxima, después
  // validar con los rangos del peaje resultante.
  function confirmarDatos(e: React.FormEvent) {
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
    setPaso("email");
  }

  async function pedirEstudio(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPaso("enviando");
    try {
      // Si el usuario corrigió un campo visible, sus derivados invisibles del
      // extraído quedan obsoletos: se anulan para no mandar datos incoherentes
      // (el servidor además coteja que el desglose cuadre con el total).
      const con = parseNumES(form.consumoKwh, true);
      const pot = parseNumES(form.potenciaP1Kw);
      const dia = parseInt(form.dias, 10);
      const cerca = (a: number, b: number) => Math.abs(a - b) < 0.001;
      const consumoEditado = extraido?.consumoKwh != null && !cerca(con, extraido.consumoKwh);
      const diasEditados = extraido?.dias != null && dia !== extraido.dias;

      const res = await fetch("/api/factura/estudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre,
          consienteMarketing,
          web: honeypot,
          datos: {
            importeTotalEur: parseNumES(form.importeTotalEur, true),
            consumoKwh: con,
            consumosKwh: consumoEditado ? null : (extraido?.consumosKwh ?? null),
            potenciasKw: potenciasEfectivas(pot),
            dias: dia,
            peaje: form.peaje,
            zona: form.zona,
            // Días corregidos → las fechas y el alquiler leídos son de OTRO
            // periodo: fuera (el servidor tiene fallbacks declarados).
            fechaInicio: diasEditados ? null : (extraido?.fechaInicio ?? null),
            fechaFin: diasEditados ? null : (extraido?.fechaFin ?? null),
            alquilerContadorEur: diasEditados ? null : (extraido?.alquilerContadorEur ?? null),
          },
          extra: { comercializadora: extraido?.comercializadora ?? null },
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.tipo) {
        throw new ErrorUsuario(data?.error ?? "No se pudo generar el estudio. " + ERROR_RED);
      }
      setResultado(data);
      setPaso("resultado");
    } catch (e) {
      setError(e instanceof ErrorUsuario ? e.message : ERROR_RED);
      setPaso("email");
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]";
  const labelCls = "block text-sm font-medium text-gray-700";

  // ─────────────────── Paso: subir factura ───────────────────
  if (paso === "subir" || paso === "analizando") {
    return (
      <div className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
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
                onClick={() => inputRef.current?.click()}
                className="mt-4 rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
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
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {paso !== "analizando" && (
          <button
            type="button"
            onClick={irAManual}
            className="w-full text-center text-sm font-medium text-[#f97316] underline underline-offset-2"
          >
            Prefiero teclear los datos a mano
          </button>
        )}

        <p className="text-xs leading-5 text-gray-500">
          Tu factura se lee al momento con Google Gemini y nosotros no la
          guardamos: solo usamos los datos técnicos (consumo, potencia, importe)
          para calcular tu ahorro. Si lo prefieres, puedes tapar tus datos
          personales en la foto — no los necesitamos.
        </p>
      </div>
    );
  }

  // ─────────────────── Paso: confirmar datos ───────────────────
  if (paso === "confirmar") {
    const avisoNoFactura = extraido && !extraido.esFactura;
    const esEmpresa = form.peaje !== "2.0TD";
    return (
      <form onSubmit={confirmarDatos} className="space-y-4">
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
            Copia estos datos de tu última factura de luz.
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

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setPaso("subir");
              setError(null);
            }}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            ← Volver
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Calcular mi ahorro
          </button>
        </div>
      </form>
    );
  }

  // ─────────────────── Paso: email ───────────────────
  if (paso === "email" || paso === "enviando") {
    return (
      <form onSubmit={pedirEstudio} className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">Último paso</p>
          <p className="mt-1 text-sm text-gray-600">
            Dinos tu email y calculamos tu estudio al momento: lo verás en
            pantalla ahora mismo.
          </p>
        </div>

        <div>
          <label htmlFor="nombre-lead" className={labelCls}>
            Nombre
          </label>
          <input
            id="nombre-lead"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputCls}
            placeholder="Tu nombre"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="tu@email.com"
          />
        </div>

        {/* Honeypot anti-bots: invisible para humanos, los bots lo rellenan */}
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

        <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
          <input
            type="checkbox"
            required
            checked={aceptaPolitica}
            onChange={(e) => setAceptaPolitica(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#f97316]"
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

        <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
          <input
            type="checkbox"
            checked={consienteMarketing}
            onChange={(e) => setConsienteMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#f97316]"
          />
          <span>
            Quiero recibir también consejos de ahorro y novedades de Vitergy por
            email (opcional).
          </span>
        </label>

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            disabled={paso === "enviando"}
            onClick={() => {
              setPaso("confirmar");
              setError(null);
            }}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            ← Volver
          </button>
          <button
            type="submit"
            disabled={paso === "enviando"}
            className="flex-1 rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60"
          >
            {paso === "enviando" ? "Comparando ofertas…" : "Ver mi estudio ahora"}
          </button>
        </div>

        <p className="text-xs leading-5 text-gray-500">
          Responsable: Por encima del techo del cielo, S.L. Finalidad: elaborar tu
          estudio energético y enviártelo; comunicaciones comerciales solo si
          marcas la casilla opcional. Derechos en info@vitergy.es. Más
          información en la política de privacidad.
        </p>
      </form>
    );
  }

  // ─────────────────── Paso: resultado ───────────────────
  const est = resultado?.estudio;
  const waTexto = encodeURIComponent(
    resultado?.tipo === "ok" && est
      ? `Hola Víctor, acabo de usar la calculadora de vitergy.es: mi mejor oferta es ${est.oferta.compania} ${est.oferta.nombre} (${est.oferta.tipo}), ahorro estimado de ${eur(est.ahorroAnualEur)} €/año. Quiero que me gestiones el cambio gratis. Mi email: ${email}`
      : `Hola Víctor, acabo de pedir mi estudio en la calculadora de vitergy.es. Mi email: ${email}`
  );

  return (
    <div className="space-y-5 text-center">
      {resultado?.tipo === "ok" && est ? (
        est.hayAhorro ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Ahorro estimado para tu caso
            </p>
            <p className="text-5xl font-extrabold tracking-tight text-[#f97316]">
              ~{eur(est.ahorroAnualEur)} €<span className="text-2xl font-bold">/año</span>
            </p>
            <div className="rounded-xl border border-orange-200 bg-white p-4 text-left shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Tu mejor oferta hoy
              </p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {est.oferta.compania} · {est.oferta.nombre}
                <span className="ml-2 rounded-full bg-[#fff7ed] px-2 py-0.5 text-xs font-semibold text-[#f97316]">
                  {est.oferta.tipo === "indexada" ? "indexada" : "precio fijo"}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Con ella, esta factura te habría costado{" "}
                <strong>~{eur(est.costeMejorOfertaEur)} €</strong> en lugar de{" "}
                <strong>{form.importeTotalEur} €</strong> — un{" "}
                <strong>{Math.round(est.ahorroPct * 100)}% menos</strong>.
              </p>
            </div>
            <div className="rounded-xl bg-[#fff7ed] p-4 text-left text-xs leading-5 text-gray-600">
              <p>
                Estimación calculada el {new Date().toLocaleDateString("es-ES")}{" "}
                comparando {est.ofertasComparadas} ofertas reales del mercado con la
                fiscalidad vigente, sobre tu última factura («habrías pagado»). No
                es una promesa de tu próxima factura: Víctor la verifica gratis,
                factura a factura, y te gestiona el cambio sin cortes de luz. Si no
                hay ahorro real, no se cobra.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-4xl">👏</p>
            <p className="text-xl font-bold text-gray-900">
              Buenas noticias: tu tarifa ya está bien optimizada
            </p>
            <p className="text-sm text-gray-700">
              Hemos comparado tu factura con {est.ofertasComparadas} ofertas reales
              del mercado y el ahorro sería mínimo. Somos independientes: no te
              haríamos cambiar por cambiar. Si quieres, Víctor le echa un segundo
              vistazo gratis (potencia contratada, permanencias, servicios extra…).
            </p>
          </>
        )
      ) : (
        <>
          <p className="text-4xl">📬</p>
          <p className="text-xl font-bold text-gray-900">¡Recibido!</p>
          <p className="text-sm text-gray-700">
            Tenemos tus datos. Víctor preparará tu estudio personalizado y te lo
            enviará a <strong>{email}</strong> en menos de 24 horas laborables.
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
        {resultado?.tipo === "ok" && est?.hayAhorro
          ? "Quiero que Víctor me gestione el cambio"
          : "Hablar con Víctor por WhatsApp"}
      </a>

      <p className="text-xs text-gray-500">
        Te escribiremos también a <strong>{email}</strong>. El análisis es gratis y,
        si no hay ahorro, no se cobra.
      </p>
    </div>
  );
}
