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

/** Un navegador same-origin manda Origin = nuestro host. Ajeno → rechazar. */
export function origenPermitido(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true; // sin Origin (curl, same-origin GET) se tolera
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function ipDe(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";
}
