// La base de datos de la web: el esquema `vitergy` dentro de la BD de DPC
// (decisión de Victor, 27-sep-2026: 0 € frente a un proyecto nuevo). La web solo
// entra por las funciones `public.vitergy_*` y con la llave de servidor que ya
// usa la calculadora. SOLO en el servidor: la llave jamás llega al navegador.
// Tablas, funciones y por qué: db/001_acceso_y_tests.sql · docs/acceso-con-codigo.md

export function bdConfigurada(): boolean {
  return Boolean(process.env.DPC_SUPABASE_URL && process.env.DPC_SUPABASE_SERVICE_ROLE_KEY);
}

/** Ejecuta una función SQL `public.vitergy_*` y devuelve lo que devuelva (jsonb → objeto). */
export async function rpc<T>(funcion: `vitergy_${string}`, params: Record<string, unknown>): Promise<T> {
  const url = process.env.DPC_SUPABASE_URL;
  const key = process.env.DPC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan DPC_SUPABASE_URL / DPC_SUPABASE_SERVICE_ROLE_KEY en el entorno");

  const res = await fetch(`${url}/rest/v1/rpc/${funcion}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    throw new Error(`${funcion} respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()) as T;
}
