"use client";

import { useEffect, useRef, useState } from "react";
import type { ResenaGoogle } from "@/lib/resenas-google";

// Carrusel de las reseñas de Google de la portada (Victor, 20-oct-2026: «me gusta más el modo carrusel»). Los datos
// llegan ya leídos del servidor (ResenasGoogle.tsx). Desplazamiento nativo con «scroll-snap» (en el móvil se pasa con
// el dedo), flechas y puntos. El estado solo cambia en eventos (scroll, clic, ResizeObserver), nunca al pintar.

const ESTRELLA =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export function Estrellas({ valor, tam = "h-5 w-5" }: { valor: number; tam?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${valor.toLocaleString("es-ES")} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const relleno = Math.max(0, Math.min(1, valor - i)) * 100;
        return (
          <span key={i} className={`relative inline-block ${tam}`}>
            <svg className={`absolute inset-0 ${tam} text-gray-200`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path d={ESTRELLA} />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${relleno}%` }}>
              <svg className={`${tam} text-[#f97316]`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d={ESTRELLA} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function LogoGoogle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-label="Google" role="img">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function Flecha({ dir, onClick, visible }: { dir: "izq" | "der"; onClick: () => void; visible: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "izq" ? "Reseñas anteriores" : "Reseñas siguientes"}
      className={`absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#1f2942] text-white shadow-md transition hover:bg-[#f97316] sm:flex ${
        dir === "izq" ? "-left-5" : "-right-5"
      } ${visible ? "" : "pointer-events-none opacity-0"}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === "izq" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

function Tarjeta({ r }: { r: ResenaGoogle }) {
  const [abierta, setAbierta] = useState(false);
  const larga = r.texto.length > 230;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(31,41,66,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {r.foto ? (
            // eslint-disable-next-line @next/next/no-img-element -- foto servida por Google (googleusercontent), sin optimizar
            <img
              src={r.foto}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff7ed] font-bold text-[#f97316]">
              {r.autor.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            {r.autorUrl ? (
              <a
                href={r.autorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-sm font-bold text-[#1f2942] hover:underline"
              >
                {r.autor}
              </a>
            ) : (
              <p className="text-sm font-bold text-[#1f2942]">{r.autor}</p>
            )}
            <p className="text-xs text-[#6b7280]">{r.hace}</p>
          </div>
        </div>
        <LogoGoogle className="h-6 w-6 shrink-0" />
      </div>
      <div className="mt-4">
        <Estrellas valor={r.estrellas} tam="h-4 w-4" />
      </div>
      <p className={`mt-3 text-sm leading-relaxed text-[#4b5563] ${abierta ? "" : "line-clamp-5"}`}>{r.texto}</p>
      {larga && (
        <button
          type="button"
          onClick={() => setAbierta(!abierta)}
          className="mt-2 cursor-pointer self-start text-xs font-semibold text-[#f97316] hover:underline"
        >
          {abierta ? "Leer menos" : "Leer más"}
        </button>
      )}
    </article>
  );
}

export default function ResenasCarrusel({ resenas }: { resenas: ResenaGoogle[] }) {
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const [paginas, setPaginas] = useState(resenas.length);

  // Cuántas «posiciones» hay: con 3 tarjetas a la vista y 5 reseñas, 3 (la 1.ª, la 2.ª y la 3.ª pueden ir delante).
  function medir() {
    const el = pista.current;
    const primera = el?.firstElementChild as HTMLElement | null;
    if (!el || !primera) return;
    const paso = primera.offsetWidth + 24; // + el hueco (gap-6)
    const aLaVista = Math.max(1, Math.round((el.clientWidth + 24) / paso));
    setPaginas(Math.max(1, resenas.length - aLaVista + 1));
    setActual(Math.min(resenas.length - 1, Math.round(el.scrollLeft / paso)));
  }

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const ro = new ResizeObserver(() => medir());
    ro.observe(el);
    return () => ro.disconnect();
    // medir solo lee refs y el nº de reseñas: no hace falta volver a observar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ir(indice: number) {
    const el = pista.current;
    const primera = el?.firstElementChild as HTMLElement | null;
    if (!el || !primera) return;
    const destino = Math.max(0, Math.min(paginas - 1, indice));
    el.scrollTo({ left: destino * (primera.offsetWidth + 24), behavior: "smooth" });
  }

  return (
    <div>
      <div className="relative">
        <Flecha dir="izq" onClick={() => ir(actual - 1)} visible={actual > 0} />
        <div
          ref={pista}
          onScroll={medir}
          className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {resenas.map((r) => (
            <div
              key={`${r.autor}-${r.hace}`}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            >
              <Tarjeta r={r} />
            </div>
          ))}
        </div>
        <Flecha dir="der" onClick={() => ir(actual + 1)} visible={actual < paginas - 1} />
      </div>

      {paginas > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: paginas }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ir a la reseña ${i + 1}`}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                i === Math.min(actual, paginas - 1) ? "w-6 bg-[#1f2942]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
