// Reseñas REALES de la ficha de Google de Vitergy (Victor, 20-oct-2026: «integrar las reviews de Google, que son
// buenas, y que sea real, con las estrellas que muestra mi negocio»). SOLO servidor.
//
// Places API (New) · Place Details: nota media, total de reseñas y hasta 5 reseñas (las que Google elige; la API no da
// más). Se pide como mucho una vez al día (`revalidate`): el tramo gratis de Google cubre eso de sobra.
// - Variables (Vercel + .env.local): `GOOGLE_PLACES_API_KEY` (proyecto «vitergy-web», restringida a Places API (New))
//   y `GOOGLE_PLACE_ID` (ficha «Vitergy | Asesoría Energética Molins de Rei»). Es una ficha de zona de servicio (sin
//   dirección pública): la búsqueda por texto solo la encuentra con `includePureServiceAreaBusinesses`.
// - Si falta algo o Google no contesta, devuelve `null` y la portada no enseña la sección (nunca una sección rota).

export interface ResenaGoogle {
  autor: string;
  autorUrl: string | null;
  foto: string | null;
  estrellas: number;
  texto: string;
  hace: string; // «Hace 8 meses», tal cual lo da Google
}

export interface FichaGoogle {
  /** Para el botón «Valóranos en Google» (search.google.com/local/writereview?placeid=…). */
  lugar: string;
  nota: number;
  total: number;
  url: string;
  resenas: ResenaGoogle[];
}

const UN_DIA = 86_400;

export async function fichaGoogle(): Promise<FichaGoogle | null> {
  const clave = process.env.GOOGLE_PLACES_API_KEY;
  const lugar = process.env.GOOGLE_PLACE_ID;
  if (!clave || !lugar) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(lugar)}?languageCode=es`, {
      headers: {
        "X-Goog-Api-Key": clave,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: UN_DIA },
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) {
      console.error("[resenas] Google respondió", res.status);
      return null;
    }
    const d = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: {
        rating?: number;
        relativePublishTimeDescription?: string;
        text?: { text?: string };
        originalText?: { text?: string };
        authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
      }[];
    };
    if (typeof d.rating !== "number" || !d.googleMapsUri) return null;
    const resenas = (d.reviews ?? [])
      .map((r) => ({
        autor: r.authorAttribution?.displayName?.trim() || "Cliente de Google",
        autorUrl: r.authorAttribution?.uri ?? null,
        foto: r.authorAttribution?.photoUri ?? null,
        estrellas: Math.max(0, Math.min(5, Math.round(r.rating ?? 0))),
        texto: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        hace: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.texto.length > 0);
    return { lugar, nota: d.rating, total: d.userRatingCount ?? resenas.length, url: d.googleMapsUri, resenas };
  } catch (error) {
    console.error("[resenas] No se pudo leer la ficha:", error instanceof Error ? error.message : error);
    return null;
  }
}
