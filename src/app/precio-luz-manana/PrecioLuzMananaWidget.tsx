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

function dateStr(d: Date) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function buildUrl(date: Date) {
  const d = dateStr(date);
  return `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${d}T00:00&end_date=${d}T23:59&time_trunc=hour&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741`;
}

function parsePrices(data: Record<string, unknown>): PriceEntry[] {
  const included = data.included as Array<{
    attributes?: { title?: string; values?: Array<{ value: number }> };
  }> | undefined;
  const series = included?.find((s) =>
    s.attributes?.title?.toUpperCase().includes("PVPC")
  );
  const vals = series?.attributes?.values;
  if (!vals?.length) return [];
  return vals.map((v, i) => ({ hour: i, price: v.value / 1000 }));
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mx-auto h-3 w-20 rounded bg-gray-200" />
            <div className="mx-auto mt-3 h-7 w-16 rounded bg-gray-200" />
            <div className="mx-auto mt-2 h-3 w-12 rounded bg-gray-100" />
          </div>
        ))}
      </div>
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

export default function PrecioLuzMananaWidget() {
  const [manana, setManana] = useState<PriceEntry[]>([]);
  const [hoy, setHoy] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAvailable, setNotAvailable] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    Promise.all([
      fetch(buildUrl(tomorrow))
        .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
        .then(parsePrices)
        .catch(() => [] as PriceEntry[]),
      fetch(buildUrl(today))
        .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
        .then(parsePrices)
        .catch(() => [] as PriceEntry[]),
    ])
      .then(([mananaPrices, hoyPrices]) => {
        if (!mananaPrices.length) {
          setNotAvailable(true);
        } else {
          setManana(mananaPrices);
        }
        setHoy(hoyPrices);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  /* ── Loading ── */
  if (loading) return <Skeleton />;

  /* ── Error ── */
  if (error) {
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

  /* ── Not available yet ── */
  if (notAvailable) {
    return (
      <div className="rounded-2xl border border-[#f97316]/30 bg-[#fff5f0] p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-[#f97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-3 text-lg font-semibold text-orange-800">
          Precios de mañana aún no disponibles
        </h3>
        <p className="mt-2 text-sm text-orange-700">
          Los precios de mañana se publican cada día a partir de las 20:00h.
          Vuelve esta tarde para consultar la previsión.
        </p>
      </div>
    );
  }

  /* ── Data ready ── */
  const zones = classify(manana);
  const minP = Math.min(...manana.map((p) => p.price));
  const maxP = Math.max(...manana.map((p) => p.price));
  const avgP = manana.reduce((s, p) => s + p.price, 0) / manana.length;
  const cheapestHour = manana.reduce((a, b) => (a.price < b.price ? a : b));

  const hoyAvg = hoy.length
    ? hoy.reduce((s, p) => s + p.price, 0) / hoy.length
    : null;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#f97316]/20 bg-[#fff5f0] p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Hora más barata</p>
          <p className="mt-1 text-2xl font-bold text-[#f97316]">{cheapestHour.hour}:00h</p>
          <p className="text-xs text-gray-500">{fmt(cheapestHour.price)} €/kWh</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Mínimo mañana</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{fmt(minP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Máximo mañana</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{fmt(maxP)}</p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Media mañana</p>
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
              <th className="w-36 px-4 py-3">Hora</th>
              <th className="px-4 py-3">Precio</th>
              <th className="w-24 px-4 py-3 text-right">€/kWh</th>
            </tr>
          </thead>
          <tbody>
            {manana.map((entry) => {
              const zone = zones.get(entry.hour) ?? "mid";
              const s = zoneStyle[zone];
              const barWidth = maxP > 0 ? (entry.price / maxP) * 100 : 0;

              return (
                <tr
                  key={entry.hour}
                  className={`border-b last:border-0 ${s.bg}`}
                >
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-gray-700">
                    {String(entry.hour).padStart(2, "0")}:00 –{" "}
                    {String(entry.hour + 1).padStart(2, "0")}:00
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="h-4 w-full rounded-full bg-gray-100">
                      <div
                        className={`h-4 rounded-full ${s.bar} transition-all`}
                        style={{ width: `${Math.max(barWidth, 2)}%` }}
                      />
                    </div>
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2.5 text-right font-semibold ${s.text}`}>
                    {fmt(entry.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Hoy vs Mañana comparison */}
      {hoyAvg !== null && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">
            Comparativa: Hoy vs Mañana
          </h3>

          {(() => {
            const diff = avgP - hoyAvg;
            const pct = hoyAvg !== 0 ? (diff / hoyAvg) * 100 : 0;
            const cheaper = diff < 0;
            const hoyMin = Math.min(...hoy.map((p) => p.price));
            const hoyMax = Math.max(...hoy.map((p) => p.price));

            return (
              <>
                {/* Verdict */}
                <div
                  className={`mt-4 rounded-xl p-4 text-center ${
                    cheaper ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      cheaper ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    Mañana la luz será de media un{" "}
                    <span className="text-lg font-bold">
                      {Math.abs(pct).toFixed(1)}%
                    </span>{" "}
                    {cheaper ? "más barata" : "más cara"} que hoy
                  </p>
                </div>

                {/* Table */}
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-3 py-2" />
                        <th className="px-3 py-2">Hoy</th>
                        <th className="px-3 py-2">Mañana</th>
                        <th className="px-3 py-2">Diferencia</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {[
                        { label: "Media", h: hoyAvg, m: avgP },
                        { label: "Mínimo", h: hoyMin, m: minP },
                        { label: "Máximo", h: hoyMax, m: maxP },
                      ].map((row) => {
                        const d = row.m - row.h;
                        return (
                          <tr key={row.label} className="border-b last:border-0">
                            <td className="px-3 py-2.5 font-medium">{row.label}</td>
                            <td className="px-3 py-2.5">{fmt(row.h)} €/kWh</td>
                            <td className="px-3 py-2.5">{fmt(row.m)} €/kWh</td>
                            <td className="px-3 py-2.5">
                              <span
                                className={`font-semibold ${
                                  d < 0
                                    ? "text-green-600"
                                    : d > 0
                                      ? "text-red-600"
                                      : "text-gray-500"
                                }`}
                              >
                                {d > 0 ? "+" : ""}
                                {fmt(d)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
