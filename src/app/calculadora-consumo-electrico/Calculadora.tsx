"use client";

import { useState } from "react";

interface Appliance {
  id: number;
  name: string;
  watts: number;
  hoursPerDay: number;
  active: boolean;
}

let nextId = 1;

const defaults: Omit<Appliance, "id" | "active">[] = [
  { name: "Nevera", watts: 150, hoursPerDay: 24 },
  { name: "Lavadora", watts: 2000, hoursPerDay: 1 },
  { name: "Lavavajillas", watts: 1800, hoursPerDay: 1 },
  { name: "Horno eléctrico", watts: 2000, hoursPerDay: 0.5 },
  { name: "Microondas", watts: 1200, hoursPerDay: 0.3 },
  { name: "TV", watts: 100, hoursPerDay: 4 },
  { name: "Aire acondicionado", watts: 1500, hoursPerDay: 3 },
  { name: "Calefactor eléctrico", watts: 2000, hoursPerDay: 3 },
  { name: "Secadora", watts: 2500, hoursPerDay: 0.5 },
  { name: "Ordenador", watts: 300, hoursPerDay: 5 },
];

function fmt(n: number) {
  return n.toFixed(2);
}

export default function Calculadora() {
  const [appliances, setAppliances] = useState<Appliance[]>(() =>
    defaults.map((d) => ({ ...d, id: nextId++, active: true }))
  );
  const [priceKwh, setPriceKwh] = useState(0.18);

  function toggle(id: number) {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  }

  function update(id: number, field: keyof Appliance, value: string | number) {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  }

  function remove(id: number) {
    setAppliances((prev) => prev.filter((a) => a.id !== id));
  }

  function addNew() {
    setAppliances((prev) => [
      ...prev,
      { id: nextId++, name: "Nuevo electrodoméstico", watts: 500, hoursPerDay: 1, active: true },
    ]);
  }

  /* ── Calculations ── */
  const active = appliances.filter((a) => a.active);

  const rows = active
    .map((a) => {
      const dailyKwh = (a.watts * a.hoursPerDay) / 1000;
      const dailyCost = dailyKwh * priceKwh;
      return {
        ...a,
        dailyKwh,
        monthlyKwh: dailyKwh * 30,
        dailyCost,
        monthlyCost: dailyCost * 30,
        yearlyCost: dailyCost * 365,
      };
    })
    .sort((a, b) => b.yearlyCost - a.yearlyCost);

  const totals = rows.reduce(
    (t, r) => ({
      dailyKwh: t.dailyKwh + r.dailyKwh,
      monthlyKwh: t.monthlyKwh + r.monthlyKwh,
      dailyCost: t.dailyCost + r.dailyCost,
      monthlyCost: t.monthlyCost + r.monthlyCost,
      yearlyCost: t.yearlyCost + r.yearlyCost,
    }),
    { dailyKwh: 0, monthlyKwh: 0, dailyCost: 0, monthlyCost: 0, yearlyCost: 0 }
  );

  return (
    <div className="space-y-8">
      {/* Global price input */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700">
          Precio del kWh
        </label>
        <div className="mt-2 flex items-center gap-2">
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

      {/* Appliance list */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3 w-10" />
              <th className="px-4 py-3">Electrodoméstico</th>
              <th className="px-4 py-3 w-28">Potencia (W)</th>
              <th className="px-4 py-3 w-28">Horas/día</th>
              <th className="px-4 py-3 w-28 text-right">€/mes</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {appliances.map((a) => {
              const monthly = a.active
                ? ((a.watts * a.hoursPerDay) / 1000) * priceKwh * 30
                : 0;

              return (
                <tr
                  key={a.id}
                  className={`border-b last:border-0 ${a.active ? "" : "opacity-40"}`}
                >
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={a.active}
                      onChange={() => toggle(a.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#f97316] focus:ring-[#f97316] accent-[#f97316]"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      value={a.name}
                      onChange={(e) => update(a.id, "name", e.target.value)}
                      className="w-full border-0 bg-transparent p-0 font-medium text-gray-900 focus:outline-none focus:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="number"
                      min={0}
                      value={a.watts}
                      onChange={(e) =>
                        update(a.id, "watts", Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="number"
                      min={0}
                      max={24}
                      step={0.5}
                      value={a.hoursPerDay}
                      onChange={(e) =>
                        update(
                          a.id,
                          "hoursPerDay",
                          Math.min(24, Math.max(0, parseFloat(e.target.value) || 0))
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#f97316]">
                    {fmt(monthly)} €
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => remove(a.id)}
                      className="text-gray-300 hover:text-red-500"
                      aria-label="Eliminar"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add button */}
      <button
        onClick={addNew}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-500 transition hover:border-[#f97316] hover:text-[#f97316]"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Añadir electrodoméstico
      </button>

      {/* Totals cards */}
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
          <div className="rounded-xl border border-[#f97316]/20 bg-[#fff5f0] p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste diario</p>
            <p className="mt-1 text-xl font-bold text-[#f97316]">{fmt(totals.dailyCost)} €</p>
          </div>
          <div className="rounded-xl border border-[#f97316]/20 bg-[#fff5f0] p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste mensual</p>
            <p className="mt-1 text-xl font-bold text-[#f97316]">{fmt(totals.monthlyCost)} €</p>
          </div>
          <div className="col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-center shadow-sm sm:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Coste anual</p>
            <p className="mt-1 text-xl font-bold text-red-600">{fmt(totals.yearlyCost)} €</p>
          </div>
        </div>
      )}

      {/* Ranking table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="px-5 py-4 border-b">
            <h3 className="font-bold text-gray-900">Ranking por coste anual</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 w-8">#</th>
                <th className="px-4 py-3">Electrodoméstico</th>
                <th className="px-4 py-3">Potencia</th>
                <th className="px-4 py-3">Horas/día</th>
                <th className="px-4 py-3 text-right">kWh/mes</th>
                <th className="px-4 py-3 text-right">€/mes</th>
                <th className="px-4 py-3 text-right">€/año</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b last:border-0 ${i === 0 ? "bg-red-50" : ""}`}
                >
                  <td className="px-4 py-2.5 text-gray-400">{i + 1}</td>
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
                  <td className="px-4 py-2.5 text-right text-gray-600">{fmt(r.monthlyKwh)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#f97316]">{fmt(r.monthlyCost)} €</td>
                  <td className="px-4 py-2.5 text-right text-gray-600">{fmt(r.yearlyCost)} €</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 bg-gray-50 font-semibold">
                <td className="px-4 py-3" colSpan={4}>Total</td>
                <td className="px-4 py-3 text-right text-gray-900">{fmt(totals.monthlyKwh)}</td>
                <td className="px-4 py-3 text-right text-[#f97316]">{fmt(totals.monthlyCost)} €</td>
                <td className="px-4 py-3 text-right text-gray-900">{fmt(totals.yearlyCost)} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
