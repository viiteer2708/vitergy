"use client";

import { useState } from "react";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  active: boolean;
}

const defaultAppliances: Omit<Appliance, "id" | "active">[] = [
  { name: "Nevera", watts: 150, hoursPerDay: 24 },
  { name: "Lavadora", watts: 2000, hoursPerDay: 1 },
  { name: "Lavavajillas", watts: 1800, hoursPerDay: 1 },
  { name: "Horno", watts: 2000, hoursPerDay: 0.5 },
  { name: "Microondas", watts: 1200, hoursPerDay: 0.3 },
  { name: "TV", watts: 100, hoursPerDay: 4 },
  { name: "Aire acondicionado", watts: 1500, hoursPerDay: 3 },
  { name: "Calefactor", watts: 2000, hoursPerDay: 3 },
  { name: "Secadora", watts: 2500, hoursPerDay: 0.5 },
  { name: "Ordenador", watts: 300, hoursPerDay: 5 },
];

let nextId = 0;
function genId() {
  return `app-${++nextId}`;
}

function fmt(n: number, decimals = 2): string {
  return n.toFixed(decimals);
}

export default function CalculadoraConsumo() {
  const [appliances, setAppliances] = useState<Appliance[]>(() =>
    defaultAppliances.map((a) => ({ ...a, id: genId(), active: true }))
  );
  const [priceKwh, setPriceKwh] = useState(0.18);

  function update(id: string, patch: Partial<Appliance>) {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );
  }

  function remove(id: string) {
    setAppliances((prev) => prev.filter((a) => a.id !== id));
  }

  function addCustom() {
    setAppliances((prev) => [
      ...prev,
      {
        id: genId(),
        name: "Nuevo electrodoméstico",
        watts: 500,
        hoursPerDay: 1,
        active: true,
      },
    ]);
  }

  const active = appliances.filter((a) => a.active);

  const rows = active
    .map((a) => {
      const dailyKwh = (a.watts * a.hoursPerDay) / 1000;
      const monthlyKwh = dailyKwh * 30;
      const dailyCost = dailyKwh * priceKwh;
      const monthlyCost = monthlyKwh * priceKwh;
      const yearlyCost = dailyCost * 365;
      return { ...a, dailyKwh, monthlyKwh, dailyCost, monthlyCost, yearlyCost };
    })
    .sort((a, b) => b.monthlyCost - a.monthlyCost);

  const totals = rows.reduce(
    (acc, r) => ({
      dailyKwh: acc.dailyKwh + r.dailyKwh,
      monthlyKwh: acc.monthlyKwh + r.monthlyKwh,
      dailyCost: acc.dailyCost + r.dailyCost,
      monthlyCost: acc.monthlyCost + r.monthlyCost,
      yearlyCost: acc.yearlyCost + r.yearlyCost,
    }),
    { dailyKwh: 0, monthlyKwh: 0, dailyCost: 0, monthlyCost: 0, yearlyCost: 0 }
  );

  return (
    <div className="space-y-8">
      {/* Price per kWh */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700">
          Precio del kWh (€)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="number"
            min={0}
            step={0.01}
            value={priceKwh}
            onChange={(e) => setPriceKwh(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
          />
          <span className="text-sm text-gray-500">€/kWh</span>
        </div>
      </div>

      {/* Appliance cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {appliances.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl border p-4 transition ${
              a.active
                ? "border-[#f97316]/20 bg-white shadow-sm"
                : "border-gray-100 bg-gray-50 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <input
                type="text"
                value={a.name}
                onChange={(e) => update(a.id, { name: e.target.value })}
                className="flex-1 border-0 bg-transparent p-0 text-base font-semibold text-gray-900 focus:outline-none focus:ring-0"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => update(a.id, { active: !a.active })}
                  className={`relative h-6 w-11 rounded-full transition ${
                    a.active ? "bg-[#f97316]" : "bg-gray-300"
                  }`}
                  aria-label={a.active ? "Desactivar" : "Activar"}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      a.active ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
                <button
                  onClick={() => remove(a.id)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label="Eliminar"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500">Potencia (W)</label>
                <input
                  type="number"
                  min={0}
                  value={a.watts}
                  onChange={(e) =>
                    update(a.id, { watts: Math.max(0, parseInt(e.target.value) || 0) })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Horas/día</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  step={0.5}
                  value={a.hoursPerDay}
                  onChange={(e) =>
                    update(a.id, {
                      hoursPerDay: Math.min(24, Math.max(0, parseFloat(e.target.value) || 0)),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
                />
              </div>
            </div>

            {a.active && (
              <div className="mt-3 flex items-baseline justify-between rounded-lg bg-orange-50 px-3 py-2">
                <span className="text-xs text-gray-500">Coste mensual</span>
                <span className="text-sm font-bold text-[#f97316]">
                  {fmt((a.watts * a.hoursPerDay * 30 * priceKwh) / 1000)} €
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add custom */}
      <button
        onClick={addCustom}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-500 transition hover:border-[#f97316] hover:text-[#f97316]"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Añadir electrodoméstico personalizado
      </button>

      {/* Summary cards */}
      {active.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Consumo diario</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{fmt(totals.dailyKwh)}</p>
            <p className="text-xs text-gray-500">kWh</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Consumo mensual</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{fmt(totals.monthlyKwh)}</p>
            <p className="text-xs text-gray-500">kWh</p>
          </div>
          <div className="rounded-xl border border-[#f97316]/20 bg-orange-50 p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste diario</p>
            <p className="mt-1 text-xl font-bold text-[#f97316]">{fmt(totals.dailyCost)} €</p>
            <p className="text-xs text-gray-500">al día</p>
          </div>
          <div className="rounded-xl border border-[#f97316]/20 bg-orange-50 p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste mensual</p>
            <p className="mt-1 text-xl font-bold text-[#f97316]">{fmt(totals.monthlyCost)} €</p>
            <p className="text-xs text-gray-500">al mes</p>
          </div>
          <div className="col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-center shadow-sm sm:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste anual</p>
            <p className="mt-1 text-xl font-bold text-red-600">{fmt(totals.yearlyCost)} €</p>
            <p className="text-xs text-gray-500">al año</p>
          </div>
        </div>
      )}

      {/* Summary table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Electrodoméstico</th>
                <th className="px-4 py-3">Potencia</th>
                <th className="px-4 py-3">Horas/día</th>
                <th className="px-4 py-3">kWh/mes</th>
                <th className="px-4 py-3">€/mes</th>
                <th className="px-4 py-3">€/año</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b last:border-0 ${i === 0 ? "bg-red-50" : ""}`}
                >
                  <td className="px-4 py-2.5 font-medium text-gray-900">
                    {r.name}
                    {i === 0 && (
                      <span className="ml-2 inline-block rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                        MÁS GASTO
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{r.watts} W</td>
                  <td className="px-4 py-2.5 text-gray-600">{r.hoursPerDay}h</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmt(r.monthlyKwh)}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#f97316]">{fmt(r.monthlyCost)} €</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmt(r.yearlyCost)} €</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 bg-gray-50 font-semibold">
                <td className="px-4 py-3 text-gray-900" colSpan={3}>Total</td>
                <td className="px-4 py-3 text-gray-900">{fmt(totals.monthlyKwh)}</td>
                <td className="px-4 py-3 text-[#f97316]">{fmt(totals.monthlyCost)} €</td>
                <td className="px-4 py-3 text-gray-900">{fmt(totals.yearlyCost)} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
