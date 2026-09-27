"use client";

// ACCESO CON CÓDIGO POR EMAIL — el formulario (pieza compartida).
// Paso 1: email + privacidad (obligatoria, nunca premarcada) + novedades
// (opcional) → /api/auth/login. Paso 2: 6 casillas con envío automático al
// completarse → /api/auth/verify. Al acertar, la sesión ya está abierta
// (cookie) y se llama a `onEntrar`. Doc: docs/acceso-con-codigo.md

import { useEffect, useRef, useState } from "react";
import {
  CODIGO_CADUCA_MIN,
  CODIGO_CIFRAS,
  REENVIO_ESPERA_SEG,
  type Origen,
} from "@/lib/acceso/reglas";

const CLAVE_PENDIENTE = "vitergy_acceso_pendiente";

interface Pendiente {
  email: string;
  novedades: boolean;
  t: number;
}

function leerPendiente(): Pendiente | null {
  try {
    const p = JSON.parse(sessionStorage.getItem(CLAVE_PENDIENTE) ?? "null") as Pendiente | null;
    return p && Date.now() - p.t < CODIGO_CADUCA_MIN * 60_000 ? p : null;
  } catch {
    return null;
  }
}

function guardarPendiente(p: Pendiente | null) {
  try {
    if (p) sessionStorage.setItem(CLAVE_PENDIENTE, JSON.stringify(p));
    else sessionStorage.removeItem(CLAVE_PENDIENTE);
  } catch {
    // Sin almacenamiento (modo privado): solo se pierde el «recordar» al recargar.
  }
}

async function postJson(url: string, datos: unknown): Promise<{ ok: boolean; body: Record<string, unknown> }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, body };
  } catch {
    return { ok: false, body: { error: "No hay conexión. Revisa tu internet y vuelve a probar." } };
  }
}

const inputCls =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 shadow-sm outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-orange-200";

export default function AccesoConCodigo({
  origen,
  onEntrar,
}: {
  origen: Origen;
  onEntrar: (email: string) => void;
}) {
  // Si se recargó la página con un código ya pedido, se vuelve a las casillas.
  // (Este formulario solo se monta en el navegador, tras interactuar: leer
  // sessionStorage al crear el estado no descuadra el HTML del servidor.)
  const [pendiente] = useState(leerPendiente);
  const [paso, setPaso] = useState<"email" | "codigo">(pendiente ? "codigo" : "email");
  const [email, setEmail] = useState(pendiente?.email ?? "");
  const [privacidad, setPrivacidad] = useState(Boolean(pendiente));
  const [novedades, setNovedades] = useState(pendiente?.novedades ?? false);
  const [honeypot, setHoneypot] = useState("");
  const [cifras, setCifras] = useState<string[]>(() => Array(CODIGO_CIFRAS).fill(""));
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedirOtro, setPedirOtro] = useState(false);
  const [espera, setEspera] = useState(0);
  const casillas = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (paso === "codigo") casillas.current[0]?.focus();
  }, [paso]);

  useEffect(() => {
    if (espera <= 0) return;
    const t = setTimeout(() => setEspera((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [espera]);

  async function pedirCodigo() {
    setOcupado(true);
    setError(null);
    const r = await postJson("/api/auth/login", { email, privacidad, novedades, origen, web: honeypot });
    setOcupado(false);
    if (!r.ok) {
      setError(String(r.body.error ?? "No hemos podido enviarte el código."));
      return false;
    }
    guardarPendiente({ email: email.trim().toLowerCase(), novedades, t: Date.now() });
    setCifras(Array(CODIGO_CIFRAS).fill(""));
    setPedirOtro(false);
    setEspera(REENVIO_ESPERA_SEG);
    setPaso("codigo");
    return true;
  }

  async function verificar(codigo: string) {
    setOcupado(true);
    setError(null);
    const r = await postJson("/api/auth/verify", { codigo });
    setOcupado(false);
    if (r.ok) {
      guardarPendiente(null);
      onEntrar(String(r.body.email ?? email));
      return;
    }
    setError(String(r.body.error ?? "No hemos podido comprobar el código."));
    setPedirOtro(r.body.pedirOtro === true);
    setCifras(Array(CODIGO_CIFRAS).fill(""));
    casillas.current[0]?.focus();
  }

  function escribir(desde: number, texto: string) {
    const nuevas = [...cifras];
    const digitos = texto.replace(/\D/g, "").split("");
    if (digitos.length === 0) {
      nuevas[desde] = "";
      setCifras(nuevas);
      return;
    }
    let i = desde;
    for (const d of digitos) {
      if (i >= CODIGO_CIFRAS) break;
      nuevas[i++] = d;
    }
    setCifras(nuevas);
    casillas.current[Math.min(i, CODIGO_CIFRAS - 1)]?.focus();
    if (nuevas.every((c) => c !== "") && !ocupado) void verificar(nuevas.join(""));
  }

  if (paso === "email") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void pedirCodigo();
        }}
        className="space-y-4 text-left"
      >
        <div>
          <label htmlFor="acceso-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Tu email
          </label>
          <input
            id="acceso-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="tu@email.com"
          />
        </div>

        {/* Honeypot anti-bots: invisible para personas, los bots lo rellenan */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="acceso-web">Tu web</label>
          <input
            id="acceso-web"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm leading-5 text-gray-600">
          <input
            type="checkbox"
            required
            checked={privacidad}
            onChange={(e) => setPrivacidad(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#f97316]"
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

        <label className="flex items-start gap-2.5 text-sm leading-5 text-gray-600">
          <input
            type="checkbox"
            checked={novedades}
            onChange={(e) => setNovedades(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#f97316]"
          />
          <span>Quiero recibir también consejos para pagar menos luz por email (opcional).</span>
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={ocupado}
          className="w-full rounded-2xl bg-[#f97316] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:opacity-60"
        >
          {ocupado ? "Enviando…" : "Enviarme el código"}
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya lo hiciste antes? Usa el mismo email y se actualiza tu resultado.
        </p>

        <p className="text-xs leading-5 text-gray-500">
          Responsable: Por encima del techo del cielo, S.L. Finalidad: enviarte el código y guardar tu
          resultado; consejos por email solo si marcas la casilla. Derechos en hola@vitergy.es. Más
          información en la política de privacidad.
        </p>
      </form>
    );
  }

  return (
    <div className="space-y-5 text-left">
      <p className="text-base leading-relaxed text-gray-600">
        Te he enviado un código de {CODIGO_CIFRAS} cifras a{" "}
        <strong className="break-words text-[#1f2942]">{email}</strong>. Si no lo ves en un minuto,
        mira en la carpeta de spam.
      </p>

      <div
        className="flex justify-between gap-2"
        role="group"
        aria-label={`Código de ${CODIGO_CIFRAS} cifras`}
      >
        {cifras.map((c, i) => (
          <input
            key={i}
            ref={(el) => {
              casillas.current[i] = el;
            }}
            value={c}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            pattern="[0-9]*"
            maxLength={i === 0 ? CODIGO_CIFRAS : 1}
            aria-label={`Cifra ${i + 1}`}
            disabled={ocupado}
            onFocus={(e) => e.target.select()}
            onChange={(e) => escribir(i, e.target.value.slice(-CODIGO_CIFRAS))}
            onPaste={(e) => {
              e.preventDefault();
              escribir(i, e.clipboardData.getData("text"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !cifras[i] && i > 0) casillas.current[i - 1]?.focus();
            }}
            className="h-14 w-full min-w-0 rounded-xl border border-gray-300 bg-white text-center text-2xl font-bold text-[#1f2942] shadow-sm outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-orange-200 disabled:opacity-60 sm:h-16"
          />
        ))}
      </div>

      {ocupado && <p className="text-center text-sm text-gray-500">Comprobando…</p>}
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          disabled={ocupado || espera > 0}
          onClick={() => void pedirCodigo()}
          className={`font-semibold underline-offset-2 hover:underline disabled:no-underline disabled:opacity-50 ${pedirOtro ? "text-[#f97316]" : "text-gray-600"}`}
        >
          {espera > 0 ? `Reenviar código (${espera} s)` : pedirOtro ? "Pedir otro código" : "Reenviar código"}
        </button>
        <button
          type="button"
          disabled={ocupado}
          onClick={() => {
            guardarPendiente(null);
            setError(null);
            setPaso("email");
          }}
          className="text-gray-500 underline-offset-2 hover:underline"
        >
          Usar otro email
        </button>
      </div>
    </div>
  );
}
