export interface PriceEntry {
  hour: number;
  price: number; // €/kWh
  datetime: string;
}

export type PriceZone = "cheap" | "mid" | "expensive";

export function classifyPrices(prices: PriceEntry[]): Map<number, PriceZone> {
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const zones = new Map<number, PriceZone>();
  sorted.forEach((entry, i) => {
    if (i < 8) zones.set(entry.hour, "cheap");
    else if (i >= prices.length - 4) zones.set(entry.hour, "expensive");
    else zones.set(entry.hour, "mid");
  });
  return zones;
}

export const zoneColors: Record<PriceZone, { bg: string; bar: string; text: string }> = {
  cheap: { bg: "bg-green-50", bar: "bg-green-500", text: "text-green-700" },
  mid: { bg: "bg-yellow-50", bar: "bg-yellow-400", text: "text-yellow-700" },
  expensive: { bg: "bg-red-50", bar: "bg-red-500", text: "text-red-700" },
};

export const zoneLabels: Record<PriceZone, string> = {
  cheap: "Barato",
  mid: "Normal",
  expensive: "Caro",
};

export function formatPrice(price: number): string {
  return price.toFixed(3);
}

export function formatDateParam(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function buildREEUrl(date: Date): string {
  const d = formatDateParam(date);
  return `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${d}T00:00&end_date=${d}T23:59&time_trunc=hour&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`;
}

export function parseREEResponse(data: Record<string, unknown>): PriceEntry[] {
  const included = data.included as Array<{
    type: string;
    attributes?: { title?: string; values?: Array<{ value: number; datetime: string }> };
  }> | undefined;

  const pvpcSeries = included?.find(
    (s) =>
      s.type === "included" ||
      s.attributes?.title?.toUpperCase().includes("PVPC")
  );

  const values = pvpcSeries?.attributes?.values;
  if (!values || values.length === 0) return [];

  return values.map((v, i) => ({
    hour: i,
    price: v.value / 1000,
    datetime: v.datetime,
  }));
}

export async function fetchPrices(date: Date): Promise<PriceEntry[]> {
  const res = await fetch(buildREEUrl(date));
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data = await res.json();
  return parseREEResponse(data);
}

export function getStats(prices: PriceEntry[]) {
  const min = Math.min(...prices.map((p) => p.price));
  const max = Math.max(...prices.map((p) => p.price));
  const avg = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
  return { min, max, avg };
}
