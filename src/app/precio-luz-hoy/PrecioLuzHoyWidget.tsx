"use client";

import { useEffect, useState } from "react";

interface PriceEntry {
  hour: number;
  price: number; // €/kWh
}

type Zone = "cheap" | "mid" | "expensive";

function classify(prices: PriceEntry[]): Map<number, Zone> {
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const zones = new Map<number, Zone>();
  sorted.forEach((e, i) => {
    if (i < 8) zones.set(e.hour, "cheap");
    else if (i >= prices.length - 4) zones.set(e.hour, "expensive");
    else zones.set(e.hour, "mid");
  });
  return zones;
}

const zoneStyle: Record<Zone, { bg: string; bar: string; text: string; label: string }> = {
  cheap:     { bg: "bg-green-50",  bar: "bg-green-500",  text: "text-green-700",  label: "Barato" },
  mid:       { bg: "bg-yellow-50", bar: "bg-yellow-400", text: "text-yellow-700", label: "Normal" },
  expensive: { bg: "bg-red-50",    bar: "bg-red-500",    text: "text-red-700",    label: "Caro" },
};

function fmt(n: number) {
  return n.toFixed(3);
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mx-auto h-3 w-20 rounded bg-gray-200" />
            <div className="mx-auto mt-3 h-7 w-16 rounded bg-gray-200" />
            <div className="mx-auto mt-2 h-3 w-12 rounded bg-gray-100" />
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="space-y-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 flex-1 rounded bg-gray-100" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PrecioLuzHoyWidget() {
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currentHour = new Date().getHours();

  useEffect(() => {
    const today = new Date();
    const yy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    fetch(
      `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${yy}-${mm}-${dd}T00:00&end_date=${yy}-${mm}-${dd}T23:59&time_trunc=hour&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`
    )
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        const series = (
          data.included as Array<{
            attributes?: { title?: string; values?: Array<{ value: number }> };
          }>
        )?.find((s) => s.attributes?.title?.toUpperCase().includes("PVPC"));

        const vals = series?.attributes?.values;
        if (!vals?.length) throw new Error();

        setPrices(vals.map((v, i) => ({ hour: i, price: v.value / 1000 })));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* ── Loading ── */
  if (loading) return <Skeleton />;

  /* ── Error ── */
  if (error || !prices.length) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <h3 className="mt-3 text-lg font-semibold text-red-800">
          No se han podido cargar los precios
        </h3>
        <p className="mt-1 text-sm text-red-600">
          Inténtalo más tarde. Los datos de Red Eléctrica de España pueden no
          estar disponibles en este momento.
        </p>
      </div>
    );
  }

  /* ── Data ready ── */
  const zones = classify(prices);
  const minP = Math.min(...prices.map((p) => p.price));
  const maxP = Math.max(...prices.map((p) => p.price));
  const avgP = prices.reduce((s, p) => s + p.price, 0) / prices.length;
  const nowP = prices[currentHour]?.price ?? 0;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#f97316]/20 bg-[#fff5f0] p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Precio ahora</p>
          <p className="mt-1 text-2xl font-bold text-[#f97316]">{fmt(nowP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Mínimo hoy</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{fmt(minP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Máximo hoy</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{fmt(maxP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Media hoy</p>
          <p className="mt-1 text-2xl font-bold text-gray-700">{fmt(avgP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {(["cheap", "mid", "expensive"] as Zone[]).map((z) => (
          <span key={z} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded ${zoneStyle[z].bar}`} />
            {zoneStyle[z].label}
          </span>
        ))}
      </div>

      {/* Table with progress bars */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3 w-36">Hora</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 w-24 text-right">€/kWh</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((entry) => {
              const zone = zones.get(entry.hour) ?? "mid";
              const s = zoneStyle[zone];
              const isCurrent = entry.hour === currentHour;
              const barWidth = maxP > 0 ? (entry.price / maxP) * 100 : 0;

              return (
                <tr
                  key={entry.hour}
                  className={`border-b last:border-0 ${s.bg} ${
                    isCurrent ? "ring-2 ring-inset ring-[#f97316]" : ""
                  }`}
                >
                  <td className={`px-4 py-2.5 font-medium whitespace-nowrap ${isCurrent ? "font-bold text-[#f97316]" : "text-gray-700"}`}>
                    {String(entry.hour).padStart(2, "0")}:00 – {String(entry.hour + 1).padStart(2, "0")}:00
                    {isCurrent && (
                      <span className="ml-2 inline-block rounded bg-[#f97316] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        AHORA
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="h-4 w-full rounded-full bg-gray-100">
                      <div
                        className={`h-4 rounded-full ${s.bar} transition-all`}
                        style={{ width: `${Math.max(barWidth, 2)}%` }}
                      />
                    </div>
                  </td>
                  <td className={`px-4 py-2.5 text-right font-semibold whitespace-nowrap ${s.text}`}>
                    {fmt(entry.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
