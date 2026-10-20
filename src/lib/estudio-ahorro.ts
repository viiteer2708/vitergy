// ============================================================
// Motor del estudio de ahorro (calculadora de /contacto) — v2
// ============================================================
//
// Compara la factura del usuario (hogar 2.0TD o empresa 3.0TD/6.1TD/6.2TD)
// contra las ofertas de luz de la plataforma DPC del grupo, leídas en SERVIDOR
// vía PostgREST con credenciales que SOLO existen como variables de entorno
// (DPC_SUPABASE_URL / DPC_SUPABASE_SERVICE_ROLE_KEY — jamás en el código: este
// repo es público).
//
// Es una RÉPLICA SIMPLIFICADA del motor sagrado de DPC
// (dpc-comparador/src/lib/calculations/). El resultado SIEMPRE se presenta
// como estimación retrospectiva ("habrías pagado"), nunca como promesa.
//
// REGLA DE NEGOCIO (Victor, 20-oct-2026; sustituye al dictamen del 2-ago):
// solo se compara con las ofertas de las campañas de Vitergy — NET FIJO (las
// 9 fijas «FIJO …») y GANA (ONLINE y TRAMOS, solo 2.0TD), con los precios
// cargados en DPC (GANA = su API) — y gana SIEMPRE la de mayor ahorro. La
// compañía y el producto NUNCA llegan al navegador (se le dicen al cliente
// cuando firma); solo van en el aviso interno a hola@ (ver expediente/publico.ts).
//
// FÓRMULAS (paridad con DPC, verificada contra sus golden tests):
// - FIJO:     energía_p = (base_p + extra/1000) solo si base_p > 0.
//             SSAA aparte para requires_ssaa (MEGA, ACCIONA) y top-up parcial
//             para ssaa_in_price con ajuste incluido < SSAA del mes (NET).
//             Cuotas: DELUXE 5 €/mes · PRIORITY 3,75 · sufijo "+" 4.
// - INDEXADO: ya no se calcula (20-oct-2026: NET FIJO y GANA son solo fijas).
//             La réplica de DPC para indexadas está en el historial de git
//             (p. ej. commit bff8e8a) por si alguna campaña la vuelve a necesitar.
// - Impuestos vigentes (1-ago-2026, fuera de la ventana RDL 7/2026):
//   IE 5,11269632% (toda España) · IVA Pen/Bal 21% · IGIC Canarias 0%/3%
//   (alquiler y cuotas de servicio al 7%). Si hay prórroga del RDL, cotejar
//   con dpc-comparador/src/lib/calculations/taxes.ts.
// ============================================================

export type Zona = "peninsula" | "baleares" | "canarias";
export type Peaje = "2.0TD" | "3.0TD" | "6.1TD" | "6.2TD";

export const PEAJES: Peaje[] = ["2.0TD", "3.0TD", "6.1TD", "6.2TD"];

export interface DatosFactura {
  importeTotalEur: number; // total de la factura, impuestos incluidos
  consumoKwh: number; // consumo total del periodo
  consumosKwh: number[] | null; // desglose por periodos (3 en 2.0TD, 6 resto)
  potenciasKw: number[]; // potencias contratadas P1.. (1-6 valores)
  dias: number;
  peaje: Peaje;
  zona: Zona;
  fechaInicio?: string | null; // YYYY-MM-DD — para la base del indexado
  fechaFin?: string | null;
  alquilerContadorEur?: number | null;
}

export interface OfertaGanadora {
  compania: string;
  nombre: string;
  tipo: "fija" | "indexada";
}

export interface Estudio {
  costeMejorOfertaEur: number;
  ahorroPeriodoEur: number;
  ahorroAnualEur: number;
  ahorroPct: number; // 0..1 sobre el importe de la factura
  precioMedioActualKwh: number | null;
  ofertasComparadas: number;
  fechaPrecios: string;
  hayAhorro: boolean;
  oferta: OfertaGanadora;
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
const ALQUILER_ESTIMADO_DIA = 0.027;

// SSAA por defecto si no se puede leer ssaa_monthly (€/kWh).
const SSAA_FALLBACK = 0.0163;

// Umbral de honestidad: por debajo, le decimos «A día de hoy, no te compensa
// el cambio» (coherente con «si no ahorras, no pagas»).
const UMBRAL_AHORRO_PCT = 0.03;
const UMBRAL_AHORRO_ANUAL_EUR = 30;

// Las ofertas de las campañas de Vitergy (Victor, 20-oct-2026): NET FIJO y GANA,
// solo fijas (las indexadas de NET se llaman «INDEX …» y ya ni se piden).
function esOfertaVitergy(compania: string, nombre: string): boolean {
  const c = compania.toUpperCase().trim();
  const n = nombre.toUpperCase().trim();
  return (c === "NET" && n.startsWith("FIJO")) || c === "GANA";
}

// Reparto del consumo cuando la factura solo trae el total: hogar 2.0TD con
// perfil estándar; empresa, uniforme entre los 6 periodos (aproximación
// declarada — el estudio fino lo hace Víctor con la curva real).
const REPARTO_20TD = [0.35, 0.3, 0.35];
const REPARTO_UNIFORME_6 = [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6];

const N_PERIODOS: Record<Peaje, number> = {
  "2.0TD": 3,
  "3.0TD": 6,
  "6.1TD": 6,
  "6.2TD": 6,
};

interface Compania {
  name: string;
  requires_ssaa: boolean;
  ssaa_in_price: boolean;
  ssaa_adjustment: number;
  hidden: boolean;
}

interface FilaFija {
  price_potency: number[]; // p1..p6 €/kW/día
  price_energy: number[]; // p1..p6 €/kWh (base)
  extra: number; // €/MWh
  offers: { name: string; companies: Compania };
}

interface Candidata {
  total: number;
  oferta: OfertaGanadora;
}

// ------------------------------------------------------------
// Fetch de datos DPC (PostgREST, server-side, cache 6 h por instancia)
// ------------------------------------------------------------

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; data: unknown }>();

function conCredenciales(): { url: string; headers: Record<string, string> } {
  const url = process.env.DPC_SUPABASE_URL;
  const key = process.env.DPC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan las credenciales DPC_SUPABASE_* en el entorno");
  return { url, headers: { apikey: key, Authorization: `Bearer ${key}` } };
}

async function getJson<T>(pathAndQuery: string): Promise<T> {
  const { url, headers } = conCredenciales();
  const res = await fetch(`${url}/rest/v1/${pathAndQuery}`, {
    headers,
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`DPC respondió ${res.status} en ${pathAndQuery.split("?")[0]}`);
  return (await res.json()) as T;
}

async function cacheado<T>(clave: string, carga: () => Promise<T>): Promise<T> {
  const hit = cache.get(clave);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.data as T;
  const data = await carga();
  cache.set(clave, { at: Date.now(), data });
  return data;
}

const SELECT_COMPANIA =
  "companies!inner(name,requires_ssaa,ssaa_in_price,ssaa_adjustment,hidden)";

async function fetchFijas(zona: Zona, peaje: Peaje): Promise<FilaFija[]> {
  return cacheado(`fijas:${zona}:${peaje}`, async () => {
    type Raw = Record<string, number> & {
      offers: { name: string; companies: Compania };
    };
    const rows = await getJson<Raw[]>(
      `fixed_prices_electricity?select=price_potency_p1,price_potency_p2,price_potency_p3,price_potency_p4,price_potency_p5,price_potency_p6,price_energy_p1,price_energy_p2,price_energy_p3,price_energy_p4,price_energy_p5,price_energy_p6,extra,offers!inner(name,active,type,energy_type,${SELECT_COMPANIA})` +
        `&zone_id=eq.${zona}&access_fee=eq.${peaje}&offers.active=eq.true&offers.type=eq.fixed&offers.energy_type=eq.electricity`
    );
    return rows
      .filter((r) => !r.offers.companies.hidden)
      .map((r) => ({
        price_potency: [1, 2, 3, 4, 5, 6].map((i) => r[`price_potency_p${i}`] ?? 0),
        price_energy: [1, 2, 3, 4, 5, 6].map((i) => r[`price_energy_p${i}`] ?? 0),
        extra: r.extra ?? 0,
        offers: r.offers,
      }));
  });
}

/**
 * Meses de facturación con su peso en días (convención inclusiva de DPC:
 * splitBillingPeriod pondera días-en-mes-inicial : días-en-mes-final e ignora
 * meses intermedios — una factura trimestral solo pesa sus meses extremos).
 * Sin fechas válidas devuelve null → se usará el mes más reciente disponible.
 */
function mesesFacturacion(
  fi?: string | null,
  ff?: string | null
): Array<{ mes: string; peso: number }> | null {
  if (!fi || !ff) return null;
  const a = new Date(fi);
  const b = new Date(ff);
  if (isNaN(a.getTime()) || isNaN(b.getTime()) || b <= a) return null;
  const mesDe = (d: Date) => d.toISOString().slice(0, 7);
  if (mesDe(a) === mesDe(b)) return [{ mes: mesDe(a), peso: 1 }];
  const finMesA = new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth() + 1, 0));
  const inicioMesB = new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), 1));
  const diasEnA = Math.round((finMesA.getTime() - a.getTime()) / 86_400_000) + 1;
  const diasEnB = Math.round((b.getTime() - inicioMesB.getTime()) / 86_400_000) + 1;
  const suma = diasEnA + diasEnB;
  return [
    { mes: mesDe(a), peso: diasEnA / suma },
    { mes: mesDe(b), peso: diasEnB / suma },
  ];
}

async function fetchSsaaMes(
  peaje: Peaje,
  fi?: string | null,
  ff?: string | null
): Promise<number[]> {
  // Como DPC (getEffectiveSsaa): el SSAA es el de los meses FACTURADOS,
  // ponderado por días; sin fechas o sin filas, el mes más reciente ≤ hoy.
  const meses = mesesFacturacion(fi, ff);
  const clave = meses ? meses.map((m) => m.mes).join("+") : "reciente";
  return cacheado(`ssaa:${peaje}:${clave}`, async () => {
    try {
      type FilaSsaa = Record<string, number> & { year_month: string };
      let rows: FilaSsaa[] = [];
      if (meses) {
        const inMeses = meses.map((m) => `"${m.mes}"`).join(",");
        rows = await getJson<FilaSsaa[]>(
          `ssaa_monthly?select=year_month,p1,p2,p3,p4,p5,p6&access_fee=eq.${peaje}&year_month=in.(${inMeses})`
        );
      }
      if (rows.length === 0) {
        const ym = new Date().toISOString().slice(0, 7);
        rows = await getJson<FilaSsaa[]>(
          `ssaa_monthly?select=year_month,p1,p2,p3,p4,p5,p6&access_fee=eq.${peaje}&year_month=lte.${ym}&order=year_month.desc&limit=1`
        );
      }
      if (rows.length > 0) {
        const pesos = meses ?? [{ mes: rows[0].year_month, peso: 1 }];
        return [1, 2, 3, 4, 5, 6].map((i) => {
          let suma = 0;
          let pesoTotal = 0;
          for (const { mes, peso } of pesos) {
            const fila = rows.find((r) => r.year_month === mes) ?? rows[0];
            const v = fila?.[`p${i}`];
            if (typeof v === "number" && v > 0) {
              suma += v * peso;
              pesoTotal += peso;
            }
          }
          return pesoTotal > 0 ? suma / pesoTotal : SSAA_FALLBACK;
        });
      }
    } catch {
      // fallback abajo
    }
    return [1, 2, 3, 4, 5, 6].map(() => SSAA_FALLBACK);
  });
}

// ------------------------------------------------------------
// Cálculo
// ------------------------------------------------------------

/** Potencias del usuario extendidas a 6 periodos según el peaje. */
function potenciasPorPeriodo(peaje: Peaje, potencias: number[]): number[] {
  const out = [0, 0, 0, 0, 0, 0];
  if (peaje === "2.0TD") {
    out[0] = potencias[0] ?? 0;
    out[1] = potencias[1] && potencias[1] > 0 ? potencias[1] : out[0];
    return out;
  }
  // Empresa: rellena los periodos que falten con el último valor conocido
  // (aproximación; el estudio fino lo hace Víctor con la factura completa).
  let ultimo = potencias[0] ?? 0;
  for (let p = 0; p < 6; p++) {
    if (potencias[p] && potencias[p] > 0) ultimo = potencias[p];
    out[p] = ultimo;
  }
  return out;
}

/** Consumo por periodo: desglose validado o reparto estándar del total. */
function consumosPorPeriodo(datos: DatosFactura): number[] {
  const n = N_PERIODOS[datos.peaje];
  const out = [0, 0, 0, 0, 0, 0];
  if (datos.consumosKwh && datos.consumosKwh.length > 0) {
    for (let p = 0; p < Math.min(6, datos.consumosKwh.length); p++) out[p] = datos.consumosKwh[p];
    return out;
  }
  const reparto = datos.peaje === "2.0TD" ? REPARTO_20TD : REPARTO_UNIFORME_6;
  for (let p = 0; p < n; p++) out[p] = datos.consumoKwh * reparto[p];
  return out;
}

function cuotaServicio(nombre: string, dias: number, esIndexada: boolean): number {
  const upper = nombre.toUpperCase().trim();
  const feeMes = upper.includes("DELUXE")
    ? FEE_DELUXE
    : !esIndexada && upper.includes("PRIORITY")
      ? FEE_PRIORITY
      : /\+\s*$/.test(upper)
        ? FEE_PLUS
        : 0;
  return feeMes * (dias / 30);
}

/** Pipeline fiscal común (modelo unificado DPC simplificado a tipos vigentes). */
function aplicarImpuestos(
  subtotalProducto: number,
  costeServicio: number,
  alquiler: number,
  zona: Zona,
  potMax: number
): number {
  const ie = subtotalProducto * IE_RATE;
  if (zona === "canarias") {
    const igicRed = (subtotalProducto + ie) * (potMax <= 10 ? IGIC_REDUCIDO : IGIC_GENERAL);
    const igicGen = (costeServicio + alquiler) * IGIC_SERVICIOS;
    return subtotalProducto + ie + costeServicio + alquiler + igicRed + igicGen;
  }
  return (subtotalProducto + ie + costeServicio + alquiler) * (1 + IVA_PEN_BAL);
}

function costeFija(
  fila: FilaFija,
  datos: DatosFactura,
  potencias: number[],
  consumos: number[],
  ssaaMes: number[],
  alquiler: number
): number | null {
  // Normalización 2.0TD de los precios de potencia (regla del motor DPC).
  const pp = [...fila.price_potency];
  const potIn = [...potencias];
  if (datos.peaje === "2.0TD") {
    if (pp[1] === 0 && pp[2] > 0) pp[1] = pp[2];
    pp[2] = pp[3] = pp[4] = pp[5] = 0;
    potIn[2] = potIn[3] = potIn[4] = potIn[5] = 0;
  }

  let costPotencia = 0;
  for (let p = 0; p < 6; p++) costPotencia += potIn[p] * pp[p] * datos.dias;

  // Precio único: si SOLO un periodo activo tiene base, es tarifa de precio
  // único → todo el consumo a ese precio (evita infravalorar con el reparto).
  const n = N_PERIODOS[datos.peaje];
  const activosConPrecio = fila.price_energy.slice(0, n).filter((x) => x > 0).length;

  let costEnergia = 0;
  if (activosConPrecio === 1) {
    const unico = fila.price_energy.slice(0, n).find((x) => x > 0)!;
    costEnergia = datos.consumoKwh * (unico + fila.extra / 1000);
  } else {
    for (let p = 0; p < 6; p++) {
      const base = fila.price_energy[p];
      if (base > 0) costEnergia += consumos[p] * (base + fila.extra / 1000);
    }
  }

  // SSAA: completo para requires_ssaa; top-up parcial para ssaa_in_price con
  // ajuste incluido menor que el SSAA del mes (caso NET, 0,015 incluido).
  const c = fila.offers.companies;
  let costSsaa = 0;
  if (c.requires_ssaa) {
    for (let p = 0; p < 6; p++) costSsaa += consumos[p] * ssaaMes[p];
  } else if (c.ssaa_in_price && c.ssaa_adjustment > 0) {
    for (let p = 0; p < 6; p++)
      costSsaa += consumos[p] * Math.max(0, ssaaMes[p] - c.ssaa_adjustment);
  }

  const servicio = cuotaServicio(fila.offers.name, datos.dias, false);
  const potMax = Math.max(...potIn);
  return aplicarImpuestos(costPotencia + costEnergia + costSsaa, servicio, alquiler, datos.zona, potMax);
}

/**
 * Calcula el estudio: la oferta de NET FIJO o GANA con MAYOR AHORRO frente a la
 * factura real.
 * Lanza si no hay credenciales, si DPC no responde o si no hay ofertas.
 */
export async function calcularEstudio(datos: DatosFactura): Promise<Estudio> {
  // Solo fijas: las campañas de Vitergy (NET FIJO y GANA) no tienen indexadas.
  const [fijas, ssaaMes] = await Promise.all([
    fetchFijas(datos.zona, datos.peaje),
    fetchSsaaMes(datos.peaje, datos.fechaInicio, datos.fechaFin),
  ]);

  const potencias = potenciasPorPeriodo(datos.peaje, datos.potenciasKw);
  const consumos = consumosPorPeriodo(datos);
  const alquiler =
    datos.alquilerContadorEur && datos.alquilerContadorEur > 0
      ? datos.alquilerContadorEur
      : ALQUILER_ESTIMADO_DIA * datos.dias;

  const candidatas: Candidata[] = [];

  for (const fila of fijas) {
    if (!esOfertaVitergy(fila.offers.companies.name, fila.offers.name)) continue;
    const total = costeFija(fila, datos, potencias, consumos, ssaaMes, alquiler);
    if (total !== null && total > 0) {
      candidatas.push({
        total,
        oferta: {
          compania: fila.offers.companies.name,
          nombre: fila.offers.name,
          tipo: "fija",
        },
      });
    }
  }

  if (candidatas.length === 0) {
    throw new Error(`Sin ofertas calculables para ${datos.peaje} en ${datos.zona}`);
  }

  // Gana siempre el mayor ahorro (= el menor coste), sin prioridad de marca.
  candidatas.sort((a, b) => a.total - b.total);
  const ganadora = candidatas[0];

  const ahorroPeriodo = datos.importeTotalEur - ganadora.total;
  const ahorroAnual = (ahorroPeriodo / datos.dias) * 365;
  const ahorroPct = datos.importeTotalEur > 0 ? ahorroPeriodo / datos.importeTotalEur : 0;

  return {
    costeMejorOfertaEur: redondea(ganadora.total),
    ahorroPeriodoEur: redondea(ahorroPeriodo),
    ahorroAnualEur: redondea(ahorroAnual),
    ahorroPct: Math.round(ahorroPct * 1000) / 1000,
    precioMedioActualKwh:
      datos.consumoKwh > 0
        ? Math.round((datos.importeTotalEur / datos.consumoKwh) * 1000) / 1000
        : null,
    ofertasComparadas: candidatas.length,
    fechaPrecios: new Date().toISOString().slice(0, 10),
    hayAhorro:
      ahorroPeriodo > 0 && ahorroPct >= UMBRAL_AHORRO_PCT && ahorroAnual >= UMBRAL_AHORRO_ANUAL_EUR,
    oferta: ganadora.oferta,
  };
}

function redondea(n: number): number {
  return Math.round(n * 100) / 100;
}

// ------------------------------------------------------------
// Validación de la entrada del usuario
// ------------------------------------------------------------

/**
 * Validación de los datos confirmados por el usuario. Rangos por peaje
 * (empresa admite potencias y consumos grandes). Si el peaje es 2.0TD pero la
 * potencia supera 15 kW (imposible en 2.0TD), se reclasifica a 3.0TD.
 */
export function validarDatosFactura(d: unknown): DatosFactura | null {
  if (typeof d !== "object" || d === null) return null;
  const o = d as Record<string, unknown>;

  const num = (v: unknown): number | null =>
    typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null;

  const importe = num(o.importeTotalEur);
  const consumo = num(o.consumoKwh);
  const dias = num(o.dias);
  const zona = o.zona;
  let peaje = (typeof o.peaje === "string" && (PEAJES as string[]).includes(o.peaje)
    ? o.peaje
    : "2.0TD") as Peaje;

  const potencias = Array.isArray(o.potenciasKw)
    ? o.potenciasKw
        .map((v) => num(v))
        .filter((v): v is number => v !== null && v <= 20000)
        .slice(0, 6)
    : [];

  if (potencias.length === 0) return null;
  if (peaje === "2.0TD" && Math.max(...potencias) > 15) peaje = "3.0TD";

  const esHogar = peaje === "2.0TD";
  const maxImporte = esHogar ? 5000 : 500000;
  const maxConsumo = esHogar ? 20000 : 5_000_000;

  if (importe === null || importe < 5 || importe > maxImporte) return null;
  if (consumo === null || consumo < 10 || consumo > maxConsumo) return null;
  if (dias === null || dias < 5 || dias > 95) return null;
  if (zona !== "peninsula" && zona !== "baleares" && zona !== "canarias") return null;

  // Desglose por periodos: solo se acepta completo (3 en 2.0TD, 6 resto) y
  // cuadrando con el total (±5%); si cuadra, se reescala a la misma base.
  let consumos: number[] | null = null;
  if (Array.isArray(o.consumosKwh)) {
    const arr = o.consumosKwh
      .map((v) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : null))
      .filter((v): v is number => v !== null)
      .slice(0, 6);
    const n = N_PERIODOS[peaje];
    if (arr.length === n) {
      const suma = arr.reduce((s, x) => s + x, 0);
      if (suma > 0 && Math.abs(suma - consumo) <= 0.05 * consumo) {
        const factor = consumo / suma;
        consumos = arr.map((x) => x * factor);
      }
    }
  }

  const fecha = (v: unknown): string | null =>
    typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;

  const alquiler = num(o.alquilerContadorEur);

  return {
    importeTotalEur: importe,
    consumoKwh: consumo,
    consumosKwh: consumos,
    potenciasKw: potencias,
    dias: Math.round(dias),
    peaje,
    zona,
    fechaInicio: fecha(o.fechaInicio),
    fechaFin: fecha(o.fechaFin),
    alquilerContadorEur: alquiler !== null && alquiler <= 500 ? alquiler : null,
  };
}
