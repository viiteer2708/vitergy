// Expedientes: llamadas a las funciones SQL `public.vitergy_*` de db/002_expedientes.sql. SOLO servidor.
// El esquema `vitergy` no está expuesto en la API de Supabase: se entra únicamente por estas funciones (src/lib/bd.ts).
import { rpc } from "@/lib/bd";
import type { TipoArchivo } from "./archivo";
import type { TipoDocumento } from "./almacen";

export interface ExpedienteCreado {
  id: string;
  carpeta: string;
}

/** La referencia corta que se enseña y se pone en el aviso (el expediente se identifica por su UUID completo). */
export function referenciaCorta(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

/**
 * Crea la ficha (estado «lead») y, si hay factura, su fila en estado «pendiente», en UNA transacción.
 * Lanza si la base de datos no está o rechaza algo: quien llama decide qué hacer (el lead no se pierde).
 */
export async function crearExpediente(e: {
  nombre: string;
  email: string;
  movil: string;
  datosFactura: unknown;
  estudio: unknown | null;
  sinCalculo: boolean;
  ipHash: string | null;
  carpeta: string;
  factura: { ruta: string; mime: TipoArchivo; bytes: number } | null;
}): Promise<ExpedienteCreado> {
  return rpc<ExpedienteCreado>("vitergy_expediente_crear", {
    p_nombre: e.nombre,
    p_email: e.email,
    p_movil: e.movil,
    p_origen: "calculadora",
    p_datos_factura: e.datosFactura,
    p_estudio: e.estudio,
    p_sin_calculo: e.sinCalculo,
    p_ip_hash: e.ipHash,
    p_carpeta: e.carpeta,
    p_doc_ruta: e.factura?.ruta ?? null,
    p_doc_mime: e.factura?.mime ?? null,
    p_doc_bytes: e.factura?.bytes ?? null,
  });
}

/** Marca un documento como «subido» (el servidor ya lo ha puesto en el almacén). */
export async function marcarDocumentoSubido(expedienteId: string, tipo: TipoDocumento, bytes: number): Promise<void> {
  await rpc("vitergy_documento_estado", {
    p_expediente_id: expedienteId,
    p_tipo: tipo,
    p_estado: "subido",
    p_bytes: bytes,
  });
}

/** Apunta si el aviso a hola@ salió. Si no salió, `aviso_lead_en` sigue vacío y la limpieza diaria (T4) lo reintenta. */
export async function marcarAviso(expedienteId: string, salio: boolean): Promise<void> {
  await rpc("vitergy_expediente_aviso", { p_id: expedienteId, p_ok: salio });
}
