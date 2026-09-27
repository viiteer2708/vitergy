import type { Metadata } from "next";
import TestInteractivo from "@/components/tests/TestInteractivo";
import { TEST_FACTURA_LUZ } from "@/lib/tests/factura-luz";

// Test «¿Estás pagando la luz de más sin saberlo?». Todo el contenido está en
// src/lib/tests/factura-luz.ts; la mecánica, en TestInteractivo.
// Doc: docs/tests-interactivos.md

const descripcion =
  "15 preguntas y 4 minutos para saber por dónde se te escapa el dinero de la factura de la luz: contrato, potencia o hábitos. Gratis y con el resultado al momento.";

export const metadata: Metadata = {
  title: "Test: ¿estás pagando la luz de más sin saberlo? | Vitergy",
  description: descripcion,
  alternates: { canonical: "https://vitergy.es/test-factura-luz" },
  openGraph: {
    title: "¿Estás pagando la luz de más sin saberlo? · Test gratuito de Vitergy",
    description: descripcion,
    url: "https://vitergy.es/test-factura-luz",
    siteName: "Vitergy",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vitergy — Asesoría energética independiente",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function TestFacturaLuzPage() {
  return <TestInteractivo test={TEST_FACTURA_LUZ} />;
}
