"use client";

import { useEffect, useState } from "react";
import {
  type PriceEntry,
  fetchPrices,
  getStats,
  formatPrice,
} from "@/lib/precios-luz";

export default function ComparativaHoyManana() {
  const [hoyPrices, setHoyPrices] = useState<PriceEntry[]>([]);
  const [mananaPrices, setMananaPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    Promise.all([
      fetchPrices(today).catch(() => []),
      fetchPrices(tomorrow).catch(() => []),
    ])
      .then(([hoy, manana]) => {
        setHoyPrices(hoy);
        setMananaPrices(manana);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-[#f97316]" />
      </div>
    );
  }

  if (hoyPrices.length === 0 || mananaPrices.length === 0) {
    return null;
  }

  const hoyStats = getStats(hoyPrices);
  const mananaStats = getStats(mananaPrices);

  const diffAvg = mananaStats.avg - hoyStats.avg;
  const diffPct = hoyStats.avg !== 0 ? (diffAvg / hoyStats.avg) * 100 : 0;
  const cheaper = diffAvg < 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">
        Comparativa: Hoy vs Mañana
      </h3>

      {/* Verdict */}
      <div
        className={`mt-4 rounded-xl p-4 text-center ${
          cheaper ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <p className={`text-sm font-medium ${cheaper ? "text-green-700" : "text-red-700"}`}>
          Mañana la luz será de media un{" "}
          <span className="text-lg font-bold">
            {Math.abs(diffPct).toFixed(1)}%
          </span>{" "}
          {cheaper ? "más barata" : "más cara"} que hoy
        </p>
      </div>

      {/* Comparison table */}
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
            {([
              { label: "Media", hoy: hoyStats.avg, manana: mananaStats.avg },
              { label: "Mínimo", hoy: hoyStats.min, manana: mananaStats.min },
              { label: "Máximo", hoy: hoyStats.max, manana: mananaStats.max },
            ] as const).map((row) => {
              const diff = row.manana - row.hoy;
              return (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="px-3 py-2.5 font-medium">{row.label}</td>
                  <td className="px-3 py-2.5">{formatPrice(row.hoy)} €/kWh</td>
                  <td className="px-3 py-2.5">{formatPrice(row.manana)} €/kWh</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`font-semibold ${
                        diff < 0 ? "text-green-600" : diff > 0 ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {diff > 0 ? "+" : ""}
                      {formatPrice(diff)}
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
