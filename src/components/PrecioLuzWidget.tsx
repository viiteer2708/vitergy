"use client";

import { useEffect, useState } from "react";
import {
  type PriceEntry,
  type PriceZone,
  classifyPrices,
  zoneColors,
  zoneLabels,
  formatPrice,
  fetchPrices,
  getStats,
} from "@/lib/precios-luz";

interface Props {
  mode?: "hoy" | "manana";
}

export default function PrecioLuzWidget({ mode = "hoy" }: Props) {
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentHour = new Date().getHours();
  const isToday = mode === "hoy";

  useEffect(() => {
    const target = new Date();
    if (mode === "manana") target.setDate(target.getDate() + 1);

    fetchPrices(target)
      .then(setPrices)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error al cargar los precios")
      )
      .finally(() => setLoading(false));
  }, [mode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 shadow-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-[#f97316]" />
        <p className="mt-4 text-sm text-gray-500">
          Cargando precios de la luz...
        </p>
      </div>
    );
  }

  if (error || prices.length === 0) {
    const notYetAvailable = mode === "manana";
    return (
      <div
        className={`rounded-2xl border p-8 text-center ${
          notYetAvailable
            ? "border-orange-200 bg-orange-50"
            : "border-red-100 bg-red-50"
        }`}
      >
        <svg
          className={`mx-auto h-12 w-12 ${notYetAvailable ? "text-[#f97316]" : "text-red-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {notYetAvailable ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          )}
        </svg>
        <h3
          className={`mt-3 text-lg font-semibold ${notYetAvailable ? "text-orange-800" : "text-red-800"}`}
        >
          {notYetAvailable
            ? "Precios de mañana aún no disponibles"
            : "No se pudieron cargar los precios"}
        </h3>
        <p
          className={`mt-1 text-sm ${notYetAvailable ? "text-orange-600" : "text-red-600"}`}
        >
          {notYetAvailable
            ? "Los precios del día siguiente se publican a partir de las 20:00h. Vuelve más tarde para consultar las tarifas de mañana."
            : error || "Los datos de Red Eléctrica no están disponibles en este momento. Inténtalo de nuevo más tarde."}
        </p>
      </div>
    );
  }

  const zones = classifyPrices(prices);
  const { min: minPrice, max: maxPrice, avg: avgPrice } = getStats(prices);
  const highlightHour = isToday ? currentHour : -1;
  const barMax = maxPrice * 1.1;
  const dayLabel = isToday ? "hoy" : "mañana";

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {isToday && (
          <div className="rounded-xl border border-[#f97316]/20 bg-orange-50 p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Precio actual
            </p>
            <p className="mt-1 text-2xl font-bold text-[#f97316]">
              {formatPrice(prices[currentHour]?.price ?? 0)}
            </p>
            <p className="text-xs text-gray-500">€/kWh</p>
          </div>
        )}
        {!isToday && (
          <div className="rounded-xl border border-[#f97316]/20 bg-orange-50 p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Hora más barata
            </p>
            <p className="mt-1 text-2xl font-bold text-[#f97316]">
              {prices.reduce((a, b) => (a.price < b.price ? a : b)).hour}:00h
            </p>
            <p className="text-xs text-gray-500">{formatPrice(minPrice)} €/kWh</p>
          </div>
        )}
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Mínimo {dayLabel}
          </p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {formatPrice(minPrice)}
          </p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Máximo {dayLabel}
          </p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {formatPrice(maxPrice)}
          </p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Media {dayLabel}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-700">
            {formatPrice(avgPrice)}
          </p>
          <p className="text-xs text-gray-500">€/kWh</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {(["cheap", "mid", "expensive"] as PriceZone[]).map((zone) => (
          <span key={zone} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded ${zoneColors[zone].bar}`} />
            {zoneLabels[zone]}
          </span>
        ))}
      </div>

      {/* Bar chart */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-end gap-1 sm:gap-1.5" style={{ minHeight: 240 }}>
          {prices.map((entry) => {
            const zone = zones.get(entry.hour) ?? "mid";
            const heightPct = barMax > 0 ? (entry.price / barMax) * 100 : 0;
            const isHighlight = entry.hour === highlightHour;

            return (
              <div
                key={entry.hour}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span
                  className={`text-[10px] font-medium sm:text-xs ${
                    isHighlight ? "font-bold text-[#f97316]" : "text-gray-500"
                  }`}
                >
                  {formatPrice(entry.price)}
                </span>
                <div
                  className={`w-full rounded-t transition-all ${zoneColors[zone].bar} ${
                    isHighlight ? "ring-2 ring-[#f97316] ring-offset-1" : ""
                  }`}
                  style={{ height: `${Math.max(heightPct * 2, 4)}px` }}
                  title={`${entry.hour}:00 — ${formatPrice(entry.price)} €/kWh`}
                />
                <span
                  className={`text-[10px] sm:text-xs ${
                    isHighlight ? "font-bold text-[#f97316]" : "text-gray-400"
                  }`}
                >
                  {entry.hour}h
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">Hora</th>
              <th className="px-4 py-3">Precio (€/kWh)</th>
              <th className="px-4 py-3">Nivel</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((entry) => {
              const zone = zones.get(entry.hour) ?? "mid";
              const isHighlight = entry.hour === highlightHour;
              return (
                <tr
                  key={entry.hour}
                  className={`border-b last:border-0 ${zoneColors[zone].bg} ${
                    isHighlight ? "ring-2 ring-inset ring-[#f97316]" : ""
                  }`}
                >
                  <td
                    className={`px-4 py-2.5 font-medium ${
                      isHighlight ? "font-bold text-[#f97316]" : "text-gray-700"
                    }`}
                  >
                    {String(entry.hour).padStart(2, "0")}:00 –{" "}
                    {String(entry.hour + 1).padStart(2, "0")}:00
                    {isHighlight && (
                      <span className="ml-2 inline-block rounded bg-[#f97316] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        AHORA
                      </span>
                    )}
                  </td>
                  <td className={`px-4 py-2.5 font-semibold ${zoneColors[zone].text}`}>
                    {formatPrice(entry.price)} €/kWh
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${zoneColors[zone].bg} ${zoneColors[zone].text}`}
                    >
                      {zoneLabels[zone]}
                    </span>
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
