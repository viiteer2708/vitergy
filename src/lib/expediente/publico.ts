// Lo único que el navegador puede ver del estudio, antes Y después de dejar sus datos.
//
// Regla de Victor (20-oct-2026; sustituye a la D1 del 17-oct): la compañía y el producto de la oferta ganadora NUNCA se
// enseñan en la web: se le dicen al cliente cuando decide firmar. Por eso /api/factura/estudio y /api/factura/lead
// devuelven solo esto: las cifras, el tipo de oferta (fija o indexada) y cuántas ofertas se compararon. La oferta
// completa solo viaja en el aviso interno a hola@vitergy.es (expediente/aviso.ts).
//
// El tipo `EstudioPublico` también lo importa el navegador (solo el tipo, no hay código que viaje).
import type { Estudio } from "@/lib/estudio-ahorro";

export interface EstudioPublico {
  costeMejorOfertaEur: number;
  ahorroPeriodoEur: number;
  ahorroAnualEur: number;
  ahorroPct: number;
  ofertasComparadas: number;
  fechaPrecios: string;
  hayAhorro: boolean;
  ofertaTipo: "fija" | "indexada";
}

/** Recorta el estudio calculado a lo que se puede enseñar sin nombrar la oferta. Lista blanca: lo que no esté aquí no sale. */
export function estudioPublico(e: Estudio): EstudioPublico {
  return {
    costeMejorOfertaEur: e.costeMejorOfertaEur,
    ahorroPeriodoEur: e.ahorroPeriodoEur,
    ahorroAnualEur: e.ahorroAnualEur,
    ahorroPct: e.ahorroPct,
    ofertasComparadas: e.ofertasComparadas,
    fechaPrecios: e.fechaPrecios,
    hayAhorro: e.hayAhorro,
    ofertaTipo: e.oferta.tipo,
  };
}
