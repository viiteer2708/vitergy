import { fichaGoogle } from "@/lib/resenas-google";

// Sección de reseñas de la portada con los datos REALES de la ficha de Google (src/lib/resenas-google.ts): nota,
// total y las reseñas que da Google, en tarjetas tipo mosaico. Sin datos de Google, no se pinta nada.

const ESTRELLA =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

/** Cinco estrellas rellenas en la proporción de `valor` (4,9 → la quinta casi entera), con el amarillo de Google. */
function Estrellas({ valor, tam = "h-5 w-5" }: { valor: number; tam?: string }) {
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
              <svg className={`${tam} text-[#fbbc04]`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d={ESTRELLA} />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

function LogoGoogle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-label="Google" role="img">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export default async function ResenasGoogle() {
  const ficha = await fichaGoogle();
  if (!ficha || ficha.resenas.length === 0) return null;
  const nota = ficha.nota.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section id="resenas" className="bg-[#f9fafb] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold tracking-wide text-[#f97316]">Reseñas de Google</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1f2942] md:text-5xl">
            Lo que dicen quienes ya ahorran
          </h2>
          <a
            href={ficha.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex cursor-pointer items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm transition hover:shadow-md"
          >
            <LogoGoogle className="h-5 w-5" />
            <span className="text-lg font-bold text-[#1f2942]">{nota}</span>
            <Estrellas valor={ficha.nota} />
            <span className="text-sm text-[#6b7280]">
              {ficha.total} {ficha.total === 1 ? "reseña" : "reseñas"}
            </span>
          </a>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {ficha.resenas.map((r) => (
            <article
              key={`${r.autor}-${r.hace}`}
              className="mb-6 break-inside-avoid rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Estrellas valor={r.estrellas} />
                <LogoGoogle />
              </div>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[#4b5563]">{r.texto}</p>
              <div className="mt-6 flex items-center gap-3">
                {r.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element -- foto servida por Google (googleusercontent), sin optimizar
                  <img
                    src={r.foto}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7ed] text-sm font-bold text-[#f97316]">
                    {r.autor.charAt(0).toUpperCase()}
                  </span>
                )}
                <div>
                  {r.autorUrl ? (
                    <a
                      href={r.autorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-sm font-semibold text-[#1f2942] hover:underline"
                    >
                      {r.autor}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#1f2942]">{r.autor}</p>
                  )}
                  <p className="text-xs text-[#6b7280]">{r.hace}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={ficha.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-sm font-semibold text-[#f97316] underline underline-offset-2"
          >
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>
    </section>
  );
}
