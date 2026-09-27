"use client";

// REPRODUCTOR DE TESTS INTERACTIVOS (pieza compartida). Recibe la definición de
// un test —solo datos, p. ej. src/lib/tests/factura-luz.ts— y lo lleva de
// principio a fin a pantalla completa:
//   intro → [entrada de bloque → preguntas → mini-recompensa] × bloques
//   → análisis → email gate (solo sin sesión) → resultado.
// El resultado lo calcula y lo guarda SIEMPRE el servidor (`${test.api}/submit`).
// Doc: docs/tests-interactivos.md

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AccesoConCodigo from "@/components/acceso/AccesoConCodigo";
import type { DefinicionTest, Ejes } from "@/lib/tests/motor";

type Fase =
  | { t: "intro" }
  | { t: "bloque"; b: number }
  | { t: "pregunta"; i: number }
  | { t: "premio"; b: number }
  | { t: "final" }; // análisis → email gate (sin sesión) → resultado

interface ResultadoTest {
  perfil: string;
  ejes: Ejes;
}

const PAUSA_RESPUESTA_MS = 400;
const PANTALLA_BLOQUE_MS = 2200;
const PANTALLA_PREMIO_MS = 2500;
const ANALISIS_MS = 3600;
const WHATSAPP = "34633151083";

function leerProgreso(clave: string, total: number): number[] | null {
  try {
    const r = JSON.parse(sessionStorage.getItem(clave) ?? "null") as unknown;
    return Array.isArray(r) && r.length === total && r.every((v) => Number.isInteger(v)) ? r : null;
  } catch {
    return null;
  }
}

function guardarProgreso(clave: string, respuestas: (number | null)[] | null) {
  try {
    if (respuestas) sessionStorage.setItem(clave, JSON.stringify(respuestas));
    else sessionStorage.removeItem(clave);
  } catch {
    // Sin almacenamiento (modo privado): solo se pierde el «seguir tras recargar».
  }
}

export default function TestInteractivo({ test }: { test: DefinicionTest }) {
  const preguntas = useMemo(
    () => test.bloques.flatMap((b, bloque) => b.preguntas.map((p, k) => ({ ...p, bloque, k }))),
    [test]
  );
  const inicioBloque = useMemo(() => {
    let acc = 0;
    return test.bloques.map((b) => {
      const inicio = acc;
      acc += b.preguntas.length;
      return inicio;
    });
  }, [test]);
  const total = preguntas.length;
  const clave = `vitergy_test_${test.slug}`;
  const ultimoBloque = test.bloques.length - 1;

  const [fase, setFase] = useState<Fase>({ t: "intro" });
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [elegida, setElegida] = useState<number | null>(null);
  /** undefined = aún no se sabe; null = sin sesión. */
  const [sesion, setSesion] = useState<{ email: string } | null | undefined>(undefined);
  const [anterior, setAnterior] = useState<ResultadoTest | null>(null);
  const [resultado, setResultado] = useState<ResultadoTest | null>(null);
  const [analisisHecho, setAnalisisHecho] = useState(false);
  const [mensaje, setMensaje] = useState(0);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  const titulo = useRef<HTMLHeadingElement>(null);
  const pausa = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enviando = useRef(false);
  const montado = useRef(false);

  const irAlFinal = useCallback(() => {
    setAnalisisHecho(false);
    setMensaje(0);
    setErrorEnvio(null);
    setFase({ t: "final" });
  }, []);

  // Al abrir: ¿hay sesión y un resultado guardado? Y si se recargó a mitad del
  // email gate con las respuestas completas, se retoma donde estaba.
  useEffect(() => {
    let vivo = true;
    fetch(`${test.api}/resultado`, { cache: "no-store" })
      .then(async (res) => {
        if (!vivo) return;
        const d = res.ok
          ? ((await res.json()) as { email: string | null; resultado: ResultadoTest | null })
          : null;
        setSesion(d?.email ? { email: d.email } : null);
        setAnterior(d?.email ? d.resultado : null);
      })
      .catch(() => {
        if (vivo) setSesion(null);
      })
      .finally(() => {
        const guardadas = vivo ? leerProgreso(clave, total) : null;
        if (guardadas) {
          setRespuestas(guardadas);
          irAlFinal();
        }
      });
    return () => {
      vivo = false;
      if (pausa.current) clearTimeout(pausa.current);
    };
  }, [test.api, clave, total, irAlFinal]);

  // Las respuestas sobreviven a una recarga (se borran al tener el resultado).
  useEffect(() => {
    if (respuestas.some((v) => v !== null)) guardarProgreso(clave, respuestas);
  }, [respuestas, clave]);

  // Cada pantalla nueva: arriba del todo y el foco en su título (lectores de pantalla).
  useEffect(() => {
    if (!montado.current) {
      montado.current = true;
      return;
    }
    window.scrollTo({ top: 0 });
    titulo.current?.focus({ preventScroll: true });
  }, [fase, analisisHecho, resultado]);

  // Pantallas que avanzan solas.
  useEffect(() => {
    if (fase.t === "bloque") {
      const t = setTimeout(() => setFase({ t: "pregunta", i: inicioBloque[fase.b] }), PANTALLA_BLOQUE_MS);
      return () => clearTimeout(t);
    }
    if (fase.t === "premio") {
      const b = fase.b;
      const t = setTimeout(
        () => (b < ultimoBloque ? setFase({ t: "bloque", b: b + 1 }) : irAlFinal()),
        PANTALLA_PREMIO_MS
      );
      return () => clearTimeout(t);
    }
    if (fase.t === "final") {
      const cada = ANALISIS_MS / test.analisis.length;
      const rota = setInterval(() => setMensaje((m) => Math.min(m + 1, test.analisis.length - 1)), cada);
      const fin = setTimeout(() => setAnalisisHecho(true), ANALISIS_MS);
      return () => {
        clearInterval(rota);
        clearTimeout(fin);
      };
    }
  }, [fase, inicioBloque, ultimoBloque, irAlFinal, test.analisis.length]);

  const enviar = useCallback(async () => {
    enviando.current = true;
    try {
      const res = await fetch(`${test.api}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas }),
      });
      const d = (await res.json().catch(() => ({}))) as ResultadoTest & { error?: string };
      if (res.ok) {
        guardarProgreso(clave, null);
        setResultado({ perfil: d.perfil, ejes: d.ejes });
      } else if (res.status === 401) {
        setSesion(null); // la sesión caducó: vuelve el email gate
      } else {
        setErrorEnvio(d.error ?? "No hemos podido guardar tu resultado.");
      }
    } catch {
      setErrorEnvio("No hay conexión. Revisa tu internet y vuelve a probar.");
    } finally {
      enviando.current = false;
    }
  }, [test.api, respuestas, clave]);

  // Con sesión, el resultado se pide mientras corre la animación de análisis.
  useEffect(() => {
    if (fase.t === "final" && sesion && !resultado && !errorEnvio && !enviando.current) {
      void enviar();
    }
  }, [fase.t, sesion, resultado, errorEnvio, enviar]);

  const responder = useCallback(
    (i: number, valor: number) => {
      if (elegida !== null) return;
      setElegida(valor);
      setRespuestas((prev) => {
        const r = [...prev];
        r[i] = valor;
        return r;
      });
      pausa.current = setTimeout(() => {
        pausa.current = null;
        setElegida(null);
        const b = preguntas[i].bloque;
        const ultimaDelBloque = inicioBloque[b] + test.bloques[b].preguntas.length - 1;
        setFase(i === ultimaDelBloque ? { t: "premio", b } : { t: "pregunta", i: i + 1 });
      }, PAUSA_RESPUESTA_MS);
    },
    [elegida, preguntas, inicioBloque, test.bloques]
  );

  // Teclado: 1-5 responde; Intro o espacio salta las pantallas de paso.
  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (fase.t === "pregunta" && /^[1-9]$/.test(e.key)) {
        const v = Number(e.key) - 1;
        if (v < test.escala.length) responder(fase.i, v);
      }
    }
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [fase, responder, test.escala.length]);

  function empezar() {
    guardarProgreso(clave, null);
    setRespuestas(Array(total).fill(null));
    setResultado(null);
    setErrorEnvio(null);
    setFase({ t: "bloque", b: 0 });
  }

  function atras() {
    if (fase.t !== "pregunta" || elegida !== null) return;
    setFase(fase.i === 0 ? { t: "intro" } : { t: "pregunta", i: fase.i - 1 });
  }

  function saltar() {
    if (fase.t === "bloque") setFase({ t: "pregunta", i: inicioBloque[fase.b] });
    if (fase.t === "premio") {
      if (fase.b < ultimoBloque) setFase({ t: "bloque", b: fase.b + 1 });
      else irAlFinal();
    }
  }

  async function salir() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    setSesion(null);
    setAnterior(null);
    setResultado(null);
    setFase({ t: "intro" });
  }

  const perfilDe = (id: string) => test.perfiles.find((p) => p.id === id) ?? test.perfiles[0];

  async function compartir(nombrePerfil: string) {
    const url = `https://vitergy.es${test.ruta}`;
    const texto = test.resultado.compartir.replace("{perfil}", nombrePerfil);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: test.titulo, text: texto, url });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${texto} ${url}`);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copia el enlace:", url);
    }
  }

  // ───────────────────────────── Pantallas ─────────────────────────────

  let pantalla: React.ReactNode;

  if (fase.t === "intro") {
    const previo = anterior ? perfilDe(anterior.perfil) : null;
    pantalla = (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-5xl shadow-sm">
          {test.emoji}
        </div>
        <p className="text-sm font-semibold text-[#f97316]">Test gratuito · {test.minutos} minutos</p>
        <h1
          ref={titulo}
          tabIndex={-1}
          className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#1f2942] outline-none sm:text-5xl"
        >
          {test.titulo}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#6b7280]">{test.entradilla}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-[#1f2942]">
          {[`${total} preguntas`, `~${test.minutos} minutos`, "Resultado al momento"].map((c) => (
            <li key={c} className="rounded-full bg-white px-3 py-1 shadow-sm">
              {c}
            </li>
          ))}
        </ul>

        {previo && anterior && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-orange-100 bg-white p-5 text-left shadow-sm">
            <p className="text-sm text-[#6b7280]">La última vez te salió</p>
            <p className="mt-1 text-lg font-bold text-[#1f2942]">
              {previo.emoji} {previo.nombre}
            </p>
            <button
              type="button"
              onClick={() => {
                setResultado(anterior);
                setAnalisisHecho(true);
                setFase({ t: "final" });
              }}
              className="mt-3 text-sm font-semibold text-[#f97316] underline-offset-2 hover:underline"
            >
              Ver mi resultado →
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={empezar}
          className="mt-8 w-full rounded-2xl bg-[#f97316] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
        >
          {anterior ? "Repetir el test" : "Empezar el test"} →
        </button>
        <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-[#6b7280]">{test.aviso}</p>
      </div>
    );
  } else if (fase.t === "bloque" || fase.t === "premio") {
    const bloque = test.bloques[fase.b];
    const esPremio = fase.t === "premio";
    pantalla = (
      <div className="cursor-pointer text-center" onClick={saltar}>
        <Bloques total={test.bloques.length} actual={fase.b} hecho={esPremio} nombres={test.bloques.map((b) => b.nombre)} />
        <div className="mt-10 text-6xl motion-safe:animate-[entra_0.5s_ease-out_both]">
          {esPremio ? "🎉" : bloque.emoji}
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#f97316]">
          {esPremio ? `Bloque ${fase.b + 1} completado` : `Bloque ${fase.b + 1} de ${test.bloques.length}`}
        </p>
        <h2
          ref={titulo}
          tabIndex={-1}
          className="mt-3 text-3xl font-bold tracking-tight text-[#1f2942] outline-none sm:text-4xl"
        >
          {esPremio ? (fase.b < ultimoBloque ? "¡Vas muy bien!" : "¡Último bloque hecho!") : bloque.nombre}
        </h2>
        {esPremio ? (
          <p className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-5 text-left text-base leading-relaxed text-[#1f2942] shadow-sm">
            <span className="font-semibold">💡 ¿Sabías que…?</span> {bloque.dato}
          </p>
        ) : (
          <p className="mt-4 text-lg text-[#6b7280]">{bloque.entradilla}</p>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            saltar();
          }}
          className="mt-10 text-sm font-semibold text-[#6b7280] underline-offset-2 hover:underline"
        >
          Seguir →
        </button>
      </div>
    );
  } else if (fase.t === "pregunta") {
    const p = preguntas[fase.i];
    const bloque = test.bloques[p.bloque];
    const enBloque = bloque.preguntas.length;
    const max = test.escala.length - 1;
    pantalla = (
      <div>
        <Bloques total={test.bloques.length} actual={p.bloque} hecho={false} nombres={test.bloques.map((b) => b.nombre)} />
        <div className="mt-8 flex items-center justify-between text-sm font-medium text-[#6b7280]">
          <span>
            {bloque.emoji} {bloque.nombre}
          </span>
          <span className="tabular-nums">
            {p.k + 1} de {enBloque}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-orange-100"
          role="progressbar"
          aria-label={`Progreso del bloque ${bloque.nombre}`}
          aria-valuemin={0}
          aria-valuemax={enBloque}
          aria-valuenow={p.k + 1}
        >
          <div
            className="h-full rounded-full bg-[#f97316] motion-safe:transition-[width] motion-safe:duration-300"
            style={{ width: `${((p.k + 1) / enBloque) * 100}%` }}
          />
        </div>

        <h2
          ref={titulo}
          tabIndex={-1}
          className="mt-8 min-h-[5.5rem] text-2xl font-bold leading-snug text-[#1f2942] outline-none sm:text-3xl"
        >
          {p.texto}
        </h2>

        <div className="mt-8 grid gap-3" role="group" aria-label="Elige una respuesta">
          {test.escala.map((etiqueta, v) => {
            const marcada = elegida === v || (elegida === null && respuestas[fase.i] === v);
            return (
              <button
                key={etiqueta}
                type="button"
                onClick={() => responder(fase.i, v)}
                aria-pressed={respuestas[fase.i] === v}
                className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition sm:text-lg ${
                  marcada
                    ? "border-[#f97316] bg-[#f97316] text-white"
                    : "border-transparent bg-white text-[#1f2942] shadow-sm hover:border-orange-200"
                }`}
              >
                <span>{etiqueta}</span>
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: max }, (_, n) => (
                    <span
                      key={n}
                      className={`h-2 w-2 rounded-full ${
                        n < v ? (marcada ? "bg-white" : "bg-[#f97316]") : marcada ? "bg-white/40" : "bg-orange-100"
                      }`}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={atras}
          className="mt-6 text-sm font-medium text-[#6b7280] underline-offset-2 hover:underline"
        >
          ← Atrás
        </button>
      </div>
    );
  } else if (resultado && analisisHecho) {
    const perfil = perfilDe(resultado.perfil);
    const nombre = `${perfil.emoji} ${perfil.nombre}`;
    const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      test.resultado.whatsapp.replace("{perfil}", perfil.nombre)
    )}`;
    pantalla = (
      <div>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316]">Tu perfil</p>
          <div className="mt-4 text-7xl motion-safe:animate-[entra_0.6s_ease-out_both]">{perfil.emoji}</div>
          <h1
            ref={titulo}
            tabIndex={-1}
            className="mt-4 text-4xl font-bold tracking-tight text-[#1f2942] outline-none sm:text-5xl"
          >
            {perfil.nombre}
          </h1>
          <p className="mt-3 text-lg text-[#6b7280]">{perfil.lema}</p>
        </div>

        <div className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-[#1f2942]">Tus fugas, de 0 a 100</p>
          {test.ejes.map((eje) => {
            const valor = resultado.ejes[eje.id] ?? 0;
            return (
              <div key={eje.id}>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-[#1f2942]">{eje.nombre}</span>
                  <span className="text-sm font-semibold tabular-nums text-[#1f2942]">{valor}/100</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="barra-test h-full rounded-full"
                    style={{ width: `${valor}%`, backgroundColor: eje.color }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-[#6b7280]">{eje.descripcion}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-[#374151]">
          {perfil.parrafos.map((texto) => (
            <p key={texto}>{texto}</p>
          ))}
          {perfil.leerMas && (
            <p>
              <Link
                href={perfil.leerMas.href}
                className="font-semibold text-[#f97316] underline underline-offset-4"
              >
                {perfil.leerMas.texto} →
              </Link>
            </p>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-[#1f2942] p-6 text-center text-white">
          <p className="text-xl font-bold">{test.resultado.ctaTitulo}</p>
          <p className="mt-2 text-sm text-white/70">Análisis gratis. Si no te ahorro, no cobro.</p>
          <Link
            href={test.resultado.ctaHref}
            className="mt-5 block rounded-2xl bg-[#f97316] px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-orange-600"
          >
            {test.resultado.ctaBoton}
          </Link>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-white/80 underline-offset-2 hover:underline"
          >
            Prefiero hablarlo por WhatsApp
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void compartir(nombre)}
            className="rounded-2xl border-2 border-[#1f2942] px-5 py-3 font-semibold text-[#1f2942] transition hover:bg-[#1f2942] hover:text-white"
          >
            {copiado ? "¡Enlace copiado!" : "Compartir el test"}
          </button>
          <button
            type="button"
            onClick={empezar}
            className="rounded-2xl border-2 border-transparent bg-white px-5 py-3 font-semibold text-[#1f2942] shadow-sm transition hover:border-orange-200"
          >
            Repetir el test
          </button>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-[#6b7280]">{test.aviso}</p>
        {sesion && (
          <p className="mt-2 text-center text-xs text-[#6b7280]">
            Guardado con {sesion.email} ·{" "}
            <button type="button" onClick={() => void salir()} className="underline underline-offset-2">
              ¿No eres tú? Salir
            </button>
          </p>
        )}
      </div>
    );
  } else if (analisisHecho && sesion === null) {
    pantalla = (
      <div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#16a34a]">✅ Tu resultado está listo</p>
          <h2
            ref={titulo}
            tabIndex={-1}
            className="mt-3 text-3xl font-bold tracking-tight text-[#1f2942] outline-none sm:text-4xl"
          >
            ¿Dónde te lo guardo?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#6b7280]">
            Déjame tu email: te llega un código de 6 cifras, lo pones y ves tu perfil al momento. Queda
            guardado para la próxima vez.
          </p>
        </div>
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <AccesoConCodigo origen={test.origen} onEntrar={(email) => setSesion({ email })} />
        </div>
      </div>
    );
  } else {
    pantalla = (
      <div className="text-center" aria-busy="true">
        <div className="mx-auto flex h-24 items-end justify-center gap-2" aria-hidden="true">
          {test.ejes.map((eje, n) => (
            <span
              key={eje.id}
              className="analiza-test w-4 rounded-full"
              style={{ backgroundColor: eje.color, animationDelay: `${n * 0.18}s` }}
            />
          ))}
        </div>
        <h2
          ref={titulo}
          tabIndex={-1}
          className="mt-8 text-3xl font-bold tracking-tight text-[#1f2942] outline-none"
        >
          Analizando tus respuestas…
        </h2>
        <p className="mt-3 text-lg text-[#6b7280]" aria-live="polite">
          {test.analisis[mensaje]}
        </p>
        {errorEnvio && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-red-50 p-4 text-sm text-red-700" role="alert">
            <p>{errorEnvio}</p>
            <button
              type="button"
              onClick={() => setErrorEnvio(null)}
              className="mt-3 font-semibold underline underline-offset-2"
            >
              Volver a intentarlo
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-[#fff7ed] to-[#fefefe]">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Vitergy: volver a la portada">
          <Image src="/logo-vitergy.png" alt="Vitergy" width={220} height={64} className="h-10 w-auto" priority />
        </Link>
        <Link href="/" className="rounded-full px-3 py-1.5 text-sm font-medium text-[#6b7280] transition hover:bg-white hover:text-[#1f2942]">
          Salir ✕
        </Link>
      </header>
      <div className="flex flex-1 items-start justify-center px-5 pb-12 pt-4 sm:items-center sm:px-8">
        <div className="w-full max-w-xl">{pantalla}</div>
      </div>
    </div>
  );
}

/** Los bloques del test como segmentos: hechos, el actual y los que faltan. */
function Bloques({
  total,
  actual,
  hecho,
  nombres,
}: {
  total: number;
  actual: number;
  hecho: boolean;
  nombres: string[];
}) {
  return (
    <ol className="flex gap-2" aria-label="Bloques del test">
      {Array.from({ length: total }, (_, n) => {
        const completo = n < actual || (n === actual && hecho);
        return (
          <li key={n} className="flex-1">
            <span
              className={`block h-1.5 rounded-full ${
                completo ? "bg-[#f97316]" : n === actual ? "bg-orange-300" : "bg-orange-100"
              }`}
            />
            <span className="sr-only">
              {nombres[n]}: {completo ? "hecho" : n === actual ? "en curso" : "pendiente"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
