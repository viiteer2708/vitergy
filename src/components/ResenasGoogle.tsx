import { fichaGoogle } from "@/lib/resenas-google";
import ResenasCarrusel, { Estrellas, LogoGoogle } from "./ResenasCarrusel";

// Sección de reseñas de la portada con los datos REALES de la ficha de Google (src/lib/resenas-google.ts): cabecera
// con la nota, el total y el botón para valorar, y el carrusel con las reseñas que da Google. Sin datos, no se pinta.

export default async function ResenasGoogle() {
  const ficha = await fichaGoogle();
  if (!ficha || ficha.resenas.length === 0) return null;
  const nota = ficha.nota.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const valorar = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(ficha.lugar)}`;

  return (
    <section id="resenas" className="bg-[#f9fafb] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
              Reseñas de <LogoGoogle className="h-4 w-4" /> Google
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1f2942] md:text-4xl">
              Lo que dicen quienes ya ahorran
            </h2>
            <a
              href={ficha.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex cursor-pointer flex-wrap items-center gap-x-2 gap-y-1 hover:underline"
            >
              <span className="text-xl font-bold text-[#f97316]">{nota}</span>
              <Estrellas valor={ficha.nota} />
              <span className="text-sm text-[#6b7280]">
                Basado en {ficha.total} {ficha.total === 1 ? "reseña" : "reseñas"}
              </span>
            </a>
          </div>
          <a
            href={valorar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-3 self-start rounded-full bg-[#1f2942] py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f97316] sm:self-auto"
          >
            Valóranos en
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <LogoGoogle className="h-5 w-5" />
            </span>
          </a>
        </div>

        <ResenasCarrusel resenas={ficha.resenas} />
      </div>
    </section>
  );
}
