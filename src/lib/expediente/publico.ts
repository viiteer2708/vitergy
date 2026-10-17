// Lo que el navegador puede ver del estudio ANTES de que la persona deje sus datos.
//
// Decisión de Victor (17-oct-2026, D1): la marca de la oferta ganadora NO se nombra hasta que la persona deja nombre,
// email y móvil. Por eso /api/factura/estudio (sin datos de contacto) devuelve solo esto: las cifras, el tipo de oferta
// (fija o indexada) y cuántas ofertas se compararon. Quedan fuera `oferta.compania`, `oferta.nombre` y `prioridadAplicada`
// (esta última delata que ganó una marca del grupo). La oferta con su marca solo viaja en la respuesta de /api/factura/lead.
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

/** Lo mismo con la oferta ganadora ya nombrada: lo que devuelve /api/factura/lead, cuando la persona ya dejó sus datos. */
export interface EstudioConOferta extends EstudioPublico {
  oferta: { compania: string; nombre: string; tipo: "fija" | "indexada" };
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

/** El estudio público MÁS la oferta ganadora (compañía y nombre). Sigue sin llevar `prioridadAplicada` (es interno). */
export function estudioConOferta(e: Estudio): EstudioConOferta {
  return {
    ...estudioPublico(e),
    oferta: { compania: e.oferta.compania, nombre: e.oferta.nombre, tipo: e.oferta.tipo },
  };
}
