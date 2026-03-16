"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-3 text-lg font-semibold text-green-800">
          ¡Gracias!
        </h3>
        <p className="mt-1 text-sm text-green-600">
          Te contactamos en menos de 2 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre *
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-gray-700"
        >
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
          placeholder="633 15 10 83"
        />
      </div>

      <div>
        <label
          htmlFor="motivo"
          className="block text-sm font-medium text-gray-700"
        >
          Motivo de consulta
        </label>
        <select
          id="motivo"
          value={form.motivo}
          onChange={(e) => setForm({ ...form, motivo: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
        >
          <option value="">Selecciona una opción</option>
          <option value="analizar">Analizar mi factura</option>
          <option value="cambiar">Cambiar de compañía</option>
          <option value="autoconsumo">Autoconsumo solar</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="block text-sm font-medium text-gray-700"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
          placeholder="Cuéntanos tu caso: tipo de vivienda, consumo, qué necesitas..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-600"
      >
        Enviar consulta
      </button>
    </form>
  );
}
