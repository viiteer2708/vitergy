"use client";

import { useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile: el antispam que protege el lector de facturas (src/app/api/factura/analizar). Widget PROPIO de
// vitergy.es (los reutilizados de otras webs no valen: cada widget lleva su lista de dominios).
//
// Cómo funciona aquí:
// - El script de Cloudflare NO se descarga al abrir la página, sino cuando la persona toca la zona de subida (`precargar`),
//   para que ya esté listo cuando termine de elegir el archivo.
// - El reto se lanza POR CADA lectura (`execution: "execute"`): el token es de un solo uso y caduca a los ~5 minutos, así
//   que uno resuelto al cargar la página caducaría antes de que la persona eligiera archivo.
// - `appearance: "interaction-only"`: es invisible; solo aparece una casilla si Cloudflare necesita que la persona la pulse.
// - Si el script se bloquea (extensiones de privacidad), hay un fallo o pasan 30 s, `obtenerToken` devuelve `null` y
//   quien lo llama le dice a la persona, en llano, que puede teclear los datos a mano.
//
// La clave de sitio (NEXT_PUBLIC_TURNSTILE_SITE_KEY) es la ÚNICA `NEXT_PUBLIC_` legítima del repo: el navegador la necesita
// para pintar el reto y no es un secreto (la secreta, TURNSTILE_SECRET_KEY, solo vive en el servidor).

export interface ManejadorTurnstile {
  /** Lanza el reto y devuelve un token nuevo (de un solo uso), o `null` si no se pudo conseguir. */
  obtenerToken: () => Promise<string | null>;
  /** Empieza a descargar el script de Cloudflare (idempotente). */
  precargar: () => void;
}

interface OpcionesTurnstile {
  sitekey: string;
  execution: "render" | "execute";
  appearance: "always" | "execute" | "interaction-only";
  language: string;
  theme: "light" | "dark" | "auto";
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "unsupported-callback": () => void;
}

interface TurnstileApi {
  render: (contenedor: HTMLElement, opciones: OpcionesTurnstile) => string | undefined;
  execute: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const URL_API = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TIEMPO_MAXIMO_MS = 30_000;

// Una sola calculadora por página: el script y el widget viven a nivel de módulo.
let cargaApi: Promise<TurnstileApi | null> | null = null;
let widgetId: string | null = null;

function cargarApi(): Promise<TurnstileApi | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!cargaApi) {
    cargaApi = new Promise<TurnstileApi | null>((resolve) => {
      const s = document.createElement("script");
      s.src = URL_API;
      s.async = true;
      s.onload = () => resolve(window.turnstile ?? null);
      s.onerror = () => {
        // Bloqueado o sin red: se podrá volver a intentar en la próxima lectura.
        cargaApi = null;
        s.remove();
        resolve(null);
      };
      document.head.appendChild(s);
    });
  }
  return cargaApi;
}

function quitarWidget() {
  const api = window.turnstile;
  if (api && widgetId) {
    try {
      api.remove(widgetId);
    } catch {
      // El widget ya no estaba: nada que quitar.
    }
  }
  widgetId = null;
}

export default function TurnstileWidget({
  siteKey,
  ref,
}: {
  siteKey: string;
  ref: React.Ref<ManejadorTurnstile>;
}) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  const obtenerToken = useCallback(async (): Promise<string | null> => {
    const api = await cargarApi();
    const contenedor = contenedorRef.current;
    if (!api || !contenedor) return null;
    quitarWidget();
    return new Promise<string | null>((resolve) => {
      let resuelto = false;
      const terminar = (token: string | null) => {
        if (resuelto) return;
        resuelto = true;
        clearTimeout(reloj);
        resolve(token);
      };
      const reloj = setTimeout(() => terminar(null), TIEMPO_MAXIMO_MS);
      try {
        const id = api.render(contenedor, {
          sitekey: siteKey,
          execution: "execute",
          appearance: "interaction-only",
          language: "es",
          theme: "light",
          callback: (token) => terminar(token),
          "error-callback": () => terminar(null),
          "expired-callback": () => terminar(null),
          "timeout-callback": () => terminar(null),
          "unsupported-callback": () => terminar(null),
        });
        if (!id) {
          terminar(null);
          return;
        }
        widgetId = id;
        api.execute(id);
      } catch {
        terminar(null);
      }
    });
  }, [siteKey]);

  useImperativeHandle(
    ref,
    () => ({
      obtenerToken,
      precargar: () => {
        void cargarApi();
      },
    }),
    [obtenerToken]
  );

  // Al salir de la calculadora se quita el widget.
  useEffect(() => quitarWidget, []);

  return <div ref={contenedorRef} className="flex justify-center" aria-live="polite" />;
}
