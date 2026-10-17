// Qué escribir en el log de Vercel cuando algo falla, SIN datos de personas.
//
// El cuerpo de un error de PostgREST (que `rpc()` de src/lib/bd.ts pega en el mensaje) puede traer la fila entera
// que falló («Failing row contains …»: nombre, email, móvil). Por eso el embudo de la factura NUNCA registra
// `error.message` tal cual: solo la función y el código HTTP, o el nombre del error (TimeoutError, TypeError…).

export function descripcionSegura(e: unknown): string {
  if (!(e instanceof Error)) return "error desconocido";
  const rpc = /^(vitergy_[a-z_]+ respondió \d{3})/.exec(e.message);
  return rpc ? rpc[1] : e.name;
}
