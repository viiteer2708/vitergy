// ============================================================
// Motor del estudio de ahorro (calculadora de /contacto)
// ============================================================
//
// Compara la factura del usuario (hogar, peaje 2.0TD) contra el catálogo de
// ofertas fijas de electricidad de la plataforma DPC del grupo, leído en
// SERVIDOR vía PostgREST con credenciales que SOLO existen como variables de
// entorno (DPC_SUPABASE_URL / DPC_SUPABASE_SERVICE_ROLE_KEY — jamás en el
// código: este repo es público).
//
// Es una RÉPLICA SIMPLIFICADA del motor sagrado de DPC
// (dpc-comparador/src/lib/calculations/, 30 golden tests). No es una
// comparativa exacta: el resultado SIEMPRE se presenta como estimación
// retrospectiva ("habrías pagado"), nunca como promesa de próxima factura.
//
// REGLA DE NEGOCIO (innegociable, misma que el chat): al usuario NUNCA se le
// devuelve el nombre de la comercializadora ni un ranking — solo el ahorro
// agregado. El nombre se reserva para el estudio personal con Víctor.
//
// FISCALIDAD VIGENTE (1-ago-2026, FUERA de la ventana del RDL 7/2026 que
// expiró el 30-jun-2026). Si hay prórroga del RDL, actualizar estas
// constantes cotejando con dpc-comparador/src/lib/calculations/taxes.ts:
//   IE 5,11269632% (toda España, Canarias incluida) · IVA Pen/Bal 21% ·
//   IGIC Canarias 0% (≤10 kW) / 3% (>10 kW), alquiler y servicios al 7%.
// ============================================================

export type Zona = "peninsula" | "baleares" | "canarias";

export interface DatosFactura {
  importeTotalEur: number; // total de la factura, impuestos incluidos
  consumoKwh: number; // consumo total del periodo
  consumoP1Kwh?: number | null; // desglose opcional (punta/llano/valle)
  consumoP2Kwh?: number | null;
  consumoP3Kwh?: number | null;
  potenciaP1Kw: number;
  potenciaP2Kw?: number | null; // si falta, se asume igual a P1 (hogar típico)
  dias: number;
  zona: Zona;
  alquilerContadorEur?: number | null; // € del periodo; si falta se estima
}

export interface Estudio {
  costeMejorOfertaEur: number; // lo que habría costado el mismo periodo
  ahorroPeriodoEur: number;
  ahorroAnualEur: number;
  ahorroPct: number; // 0..1 sobre el importe de la factura
  precioMedioActualKwh: number | null;
  ofertasComparadas: number;
  fechaPrecios: string; // YYYY-MM-DD del día del cálculo
  hayAhorro: boolean; // supera el umbral de honestidad
}

// Impuestos estructurales vigentes (ver cabecera).
const IE_RATE = 0.0511269632;
const IVA_PEN_BAL = 0.21;
const IGIC_REDUCIDO = 0.0; // Canarias ≤10 kW
const IGIC_GENERAL = 0.03; // Canarias >10 kW
const IGIC_SERVICIOS = 0.07; // Canarias: alquiler contador y cuotas de servicio

// Cuotas de servicio ocultas en el nombre de la oferta (mismas que DPC).
const FEE_DELUXE = 5;
const FEE_PRIORITY = 3.75;
const FEE_PLUS = 4;

// Alquiler de contador estimado si la factura no lo desglosa (€/día).
// Sumarlo evita inflar el ahorro: el importe del usuario sí lo incluye.
const ALQUILER_ESTIMADO_DIA = 0.027;

// SSAA por defecto si no se puede leer ssaa_config (€/kWh).
const SSAA_FALLBACK = 0.0163;

// Umbral de honestidad: por debajo, decimos que su tarifa ya está bien
// optimizada (coherente con "si no hay ahorro, no se cobra").
const UMBRAL_AHORRO_PCT = 0.03;
const UMBRAL_AHORRO_ANUAL_EUR = 30;

// Reparto estándar del consumo por periodos cuando la factura solo trae el
// total y la oferta no es de precio único (aprox. hogar 2.0TD).
const REPARTO_ESTANDAR = { p1: 0.35, p2: 0.3, p3: 0.35 } as const;

interface FilaPrecio {
  offer_id: string;
  price_potency_p1: number;
  price_potency_p2: number;
  price_potency_p3: number;
  price_energy_p1: number;
  price_energy_p2: number;
  price_energy_p3: number;
  extra: number; // fee comercial en €/MWh → €/kWh = extra/1000
  offers: {
    name: string;
    companies: { name: string; requires_ssaa: boolean; hidden: boolean };
  };
}

// Cache en memoria de la instancia serverless (los precios cambian con las
// subidas mensuales; 6 h de TTL es de sobra y evita golpear DPC por visita).
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const cachePrecios = new Map<Zona, { at: number; filas: FilaPrecio[]; ssaa: number }>();

async function fetchPreciosDpc(zona: Zona): Promise<{ filas: FilaPrecio[]; ssaa: number }> {
  const hit = cachePrecios.get(zona);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit;

  const url = process.env.DPC_SUPABASE_URL;
  const key = process.env.DPC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Faltan las credenciales DPC_SUPABASE_* en el entorno");
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  const select =
    "offer_id,price_potency_p1,price_potency_p2,price_potency_p3," +
    "price_energy_p1,price_energy_p2,price_energy_p3,extra," +
    "offers!inner(name,active,type,energy_type,companies!inner(name,requires_ssaa,hidden))";
  const filtros =
    `zone_id=eq.${zona}&access_fee=eq.2.0TD&offers.active=eq.true` +
    "&offers.type=eq.fixed&offers.energy_type=eq.electricity";

  const res = await fetch(
    `${url}/rest/v1/fixed_prices_electricity?select=${select}&${filtros}`,
    { headers, signal: AbortSignal.timeout(15_000) }
  );
  if (!res.ok) {
    throw new Error(`DPC precios respondió ${res.status}`);
  }
  const todas = (await res.json()) as FilaPrecio[];
  // Compañías ocultas (p. ej. ODF) fuera: no anunciar precios que el propio
  // catálogo no enseña.
  const filas = todas.filter((f) => !f.offers.companies.hidden);

  // SSAA vivo: ssaa_monthly es la fuente real del motor de DPC (el panel
  // admin solo escribe ahí; ssaa_config es un singleton legacy congelado).
  // Tomamos el mes más reciente ≤ hoy y lo ponderamos con el reparto estándar.
  let ssaa = SSAA_FALLBACK;
  try {
    const ym = new Date().toISOString().slice(0, 7);
    const resSsaa = await fetch(
      `${url}/rest/v1/ssaa_monthly?select=year_month,p1,p2,p3&access_fee=eq.2.0TD&year_month=lte.${ym}&order=year_month.desc&limit=1`,
      { headers, signal: AbortSignal.timeout(10_000) }
    );
    if (resSsaa.ok) {
      const rows = (await resSsaa.json()) as Array<{ p1: number; p2: number; p3: number }>;
      const m = rows[0];
      if (m && m.p1 > 0 && m.p2 > 0 && m.p3 > 0) {
        ssaa =
          REPARTO_ESTANDAR.p1 * m.p1 + REPARTO_ESTANDAR.p2 * m.p2 + REPARTO_ESTANDAR.p3 * m.p3;
      }
    }
  } catch {
    // sin ssaa_monthly seguimos con el fallback
  }

  const entry = { at: Date.now(), filas, ssaa };
  cachePrecios.set(zona, entry);
  return entry;
}

/** Coste total (impuestos incluidos) del periodo del usuario con una oferta. */
function costeOferta(fila: FilaPrecio, datos: DatosFactura, ssaa: number): number {
  const dias = datos.dias;

  // Potencia 2.0TD: solo P1/P2. En BD algunas ofertas guardan la P2 en la
  // columna p3 (mismo arreglo que normalizePotencyPrices del motor de DPC).
  const pp1 = fila.price_potency_p1;
  let pp2 = fila.price_potency_p2;
  if (pp2 === 0 && fila.price_potency_p3 > 0) pp2 = fila.price_potency_p3;
  const potP1 = datos.potenciaP1Kw;
  const potP2 = datos.potenciaP2Kw && datos.potenciaP2Kw > 0 ? datos.potenciaP2Kw : potP1;
  const costPotencia = potP1 * pp1 * dias + potP2 * pp2 * dias;

  // Energía: precio final €/kWh = base + extra/1000. El fee solo se cobra en
  // periodos con base > 0 (igual que el motor de DPC).
  const precios = [fila.price_energy_p1, fila.price_energy_p2, fila.price_energy_p3];
  const finales = precios.map((p) => (p > 0 ? p + fila.extra / 1000 : 0));

  const tieneDesglose =
    (datos.consumoP1Kwh ?? 0) + (datos.consumoP2Kwh ?? 0) + (datos.consumoP3Kwh ?? 0) > 0;
  const precioUnico =
    finales[0] > 0 && finales[0] === finales[1] && finales[1] === finales[2];

  let costEnergia = 0;
  if (tieneDesglose) {
    const consumos = [datos.consumoP1Kwh ?? 0, datos.consumoP2Kwh ?? 0, datos.consumoP3Kwh ?? 0];
    costEnergia = consumos.reduce((s, c, i) => s + c * finales[i], 0);
  } else if (precioUnico) {
    costEnergia = datos.consumoKwh * finales[0];
  } else {
    // Solo total + oferta con precios distintos por periodo → reparto estándar
    const reparto = [REPARTO_ESTANDAR.p1, REPARTO_ESTANDAR.p2, REPARTO_ESTANDAR.p3];
    costEnergia = reparto.reduce((s, r, i) => s + datos.consumoKwh * r * finales[i], 0);
  }

  // SSAA aparte para compañías que lo requieren (MEGA, ACCIONA): sin esto sus
  // ofertas parecerían más baratas de lo real.
  const costSsaa = fila.offers.companies.requires_ssaa ? datos.consumoKwh * ssaa : 0;

  // Cuota de servicio oculta en el nombre (DELUXE / PRIORITY / sufijo "+").
  const nombre = fila.offers.name.toUpperCase().trim();
  const feeMes = nombre.includes("DELUXE")
    ? FEE_DELUXE
    : nombre.includes("PRIORITY")
      ? FEE_PRIORITY
      : /\+\s*$/.test(nombre)
        ? FEE_PLUS
        : 0;
  const costeServicio = feeMes * (dias / 30);

  const alquiler =
    datos.alquilerContadorEur && datos.alquilerContadorEur > 0
      ? datos.alquilerContadorEur
      : ALQUILER_ESTIMADO_DIA * dias;

  // Pipeline fiscal (modelo unificado de DPC, simplificado a tipos vigentes):
  // IE solo sobre el producto (potencia + energía + SSAA), nunca sobre el
  // servicio ni el alquiler.
  const subtotalProducto = costPotencia + costEnergia + costSsaa;
  const ie = subtotalProducto * IE_RATE;

  if (datos.zona === "canarias") {
    const potMax = Math.max(potP1, potP2);
    const igicRed = (subtotalProducto + ie) * (potMax <= 10 ? IGIC_REDUCIDO : IGIC_GENERAL);
    const igicGen = (costeServicio + alquiler) * IGIC_SERVICIOS;
    return subtotalProducto + ie + costeServicio + alquiler + igicRed + igicGen;
  }

  const baseImponible = subtotalProducto + ie + costeServicio + alquiler;
  return baseImponible * (1 + IVA_PEN_BAL);
}

/**
 * Calcula el estudio: mejor oferta del catálogo frente a la factura real.
 * Lanza si no hay credenciales, si DPC no responde o si no hay ofertas.
 */
export async function calcularEstudio(datos: DatosFactura): Promise<Estudio> {
  const { filas, ssaa } = await fetchPreciosDpc(datos.zona);
  if (filas.length === 0) {
    throw new Error(`Sin ofertas 2.0TD para la zona ${datos.zona}`);
  }

  let mejor = Infinity;
  for (const fila of filas) {
    const total = costeOferta(fila, datos, ssaa);
    if (total > 0 && total < mejor) mejor = total;
  }
  if (!Number.isFinite(mejor)) {
    throw new Error("Ninguna oferta produjo un coste válido");
  }

  const ahorroPeriodo = datos.importeTotalEur - mejor;
  const ahorroAnual = (ahorroPeriodo / datos.dias) * 365;
  const ahorroPct = datos.importeTotalEur > 0 ? ahorroPeriodo / datos.importeTotalEur : 0;

  return {
    costeMejorOfertaEur: redondea(mejor),
    ahorroPeriodoEur: redondea(ahorroPeriodo),
    ahorroAnualEur: redondea(ahorroAnual),
    ahorroPct: Math.round(ahorroPct * 1000) / 1000,
    precioMedioActualKwh:
      datos.consumoKwh > 0 ? Math.round((datos.importeTotalEur / datos.consumoKwh) * 1000) / 1000 : null,
    ofertasComparadas: filas.length,
    fechaPrecios: new Date().toISOString().slice(0, 10),
    hayAhorro:
      ahorroPeriodo > 0 && ahorroPct >= UMBRAL_AHORRO_PCT && ahorroAnual >= UMBRAL_AHORRO_ANUAL_EUR,
  };
}

function redondea(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Validación numérica de los datos confirmados por el usuario. */
export function validarDatosFactura(d: unknown): DatosFactura | null {
  if (typeof d !== "object" || d === null) return null;
  const o = d as Record<string, unknown>;

  const num = (v: unknown): number | null =>
    typeof v === "number" && Number.isFinite(v) ? v : null;

  const importe = num(o.importeTotalEur);
  const consumo = num(o.consumoKwh);
  const potencia = num(o.potenciaP1Kw);
  const dias = num(o.dias);
  const zona = o.zona;

  if (importe === null || importe < 5 || importe > 5000) return null;
  if (consumo === null || consumo < 10 || consumo > 10000) return null;
  if (potencia === null || potencia < 0.5 || potencia > 20) return null;
  if (dias === null || dias < 5 || dias > 95) return null;
  if (zona !== "peninsula" && zona !== "baleares" && zona !== "canarias") return null;

  const opc = (v: unknown, max: number): number | null => {
    const n = num(v);
    return n !== null && n > 0 && n <= max ? n : null;
  };

  // Desglose por periodos: solo se acepta si vienen LOS TRES y su suma cuadra
  // con el consumo total (±5%); si cuadra, se reescala para que energía y
  // SSAA usen exactamente la misma base. Un desglose parcial (p. ej. Gemini
  // solo leyó P1) subestimaría la energía y dispararía el ahorro mostrado.
  let p1 = opc(o.consumoP1Kwh, 10000);
  let p2 = opc(o.consumoP2Kwh, 10000);
  let p3 = opc(o.consumoP3Kwh, 10000);
  if (p1 !== null && p2 !== null && p3 !== null) {
    const suma = p1 + p2 + p3;
    if (suma > 0 && Math.abs(suma - consumo) <= 0.05 * consumo) {
      const factor = consumo / suma;
      p1 *= factor;
      p2 *= factor;
      p3 *= factor;
    } else {
      p1 = p2 = p3 = null;
    }
  } else {
    p1 = p2 = p3 = null;
  }

  return {
    importeTotalEur: importe,
    consumoKwh: consumo,
    potenciaP1Kw: potencia,
    potenciaP2Kw: opc(o.potenciaP2Kw, 20),
    consumoP1Kwh: p1,
    consumoP2Kwh: p2,
    consumoP3Kwh: p3,
    dias: Math.round(dias),
    zona,
    alquilerContadorEur: opc(o.alquilerContadorEur, 60),
  };
}
