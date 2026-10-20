// Protecciones compartidas por las API routes de la calculadora de ahorro.
// Mismo patrón best-effort que /api/chat (cada instancia serverless tiene su
// propia memoria; la protección de fondo son las cuotas de los proveedores).

export function crearRateLimiter(requestsPorMinuto: number) {
  const log = new Map<string, number[]>();
  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recientes = (log.get(ip) ?? []).filter((t) => now - t < 60_000);
    if (recientes.length >= requestsPorMinuto) {
      log.set(ip, recientes);
      return true;
    }
    recientes.push(now);
    log.set(ip, recientes);
    if (log.size > 500) {
      for (const [key, times] of log) {
        if (times.every((t) => now - t >= 60_000)) log.delete(key);
      }
    }
    return false;
  };
}

/**
 * Un navegador manda Origin = nuestro host en TODO POST (también same-origin).
 * Ajeno → rechazar. Sin Origin solo se tolera en GET/HEAD: un POST sin Origin
 * es un script, no la web (spam del 20-oct-2026: robots que mandaban el JSON
 * directo a /api/factura/estudio y llenaban hola@ de leads falsos).
 */
export function origenPermitido(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const ruta = new URL(request.url).pathname;
  if (!origin) {
    if (request.method === "GET" || request.method === "HEAD") return true;
    console.warn("[guardas] Rechazado: POST sin Origin en", ruta);
    return false;
  }
  try {
    if (host && new URL(origin).host === host) return true;
  } catch {
    // Origin mal formado: se rechaza abajo.
  }
  console.warn("[guardas] Rechazado: Origin ajeno en", ruta, "→", origin.slice(0, 100));
  return false;
}

/**
 * El señuelo (campo `web`, invisible para humanos) delata a un robot si viene
 * relleno o si NO viene: nuestros formularios lo mandan siempre (vacío), y un
 * robot que fabrica su propio JSON no lo conoce.
 */
export function senueloDelata(web: unknown): boolean {
  return typeof web !== "string" || web.length > 0;
}

export function ipDe(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
}
