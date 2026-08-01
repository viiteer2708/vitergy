"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "model"; text: string };

const GREETING: Message = {
  role: "model",
  text: "¡Hola! 👋 Soy el asistente de Vitergy. Pregúntame lo que quieras sobre tu factura de luz, tarifas o cómo ahorrar.",
};

const WHATSAPP_URL =
  "https://wa.me/34633151083?text=Hola%20Víctor,%20me%20gustaría%20que%20analizaras%20mi%20factura";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || loading) return;
    const history = messages.slice(-10);
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json().catch(() => null);
      const reply =
        (res.ok ? data?.reply : data?.error) ??
        "Ahora mismo no puedo responder. Escríbenos por WhatsApp al 633 15 10 83 y te atendemos al momento.";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "No he podido conectar. Revisa tu conexión o escríbenos por WhatsApp al 633 15 10 83.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-[9.5rem] left-4 right-4 z-[55] flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl md:bottom-24 md:left-6 md:right-auto md:w-96">
          {/* Cabecera */}
          <div className="flex items-center justify-between bg-[#1f2942] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">
                Asistente de Vitergy
              </p>
              <p className="text-xs text-gray-300">
                Dudas sobre tu factura de luz y gas
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar el chat"
              className="rounded-lg p-1 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex h-80 max-h-[50vh] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[#f97316] px-4 py-2.5 text-sm text-white"
                    : "w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-[#1f2942]"
                }
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Atajo a WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t border-gray-100 px-4 py-2 text-center text-xs font-medium text-[#25D366] transition hover:bg-green-50"
          >
            ¿Prefieres hablar con Víctor? Escríbele por WhatsApp →
          </a>

          {/* Entrada */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-gray-100 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Escribe tu pregunta…"
              aria-label="Escribe tu pregunta"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#f97316] focus:outline-none focus:ring-1 focus:ring-[#f97316]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje"
              className="rounded-lg bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
          <p className="px-4 pb-2 text-center text-[10px] text-gray-400">
            Asistente con IA: puede equivocarse. No compartas datos personales en
            el chat.
          </p>
        </div>
      )}

      {/* Burbuja flotante (espejo del botón de WhatsApp, que está a la derecha) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Cerrar el chat de ayuda" : "Abrir el chat de ayuda"}
        className="fixed bottom-20 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#f97316] shadow-lg shadow-orange-500/30 transition hover:scale-110 hover:shadow-orange-500/40 md:bottom-6 md:left-6"
      >
        {open ? (
          <svg
            className="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
