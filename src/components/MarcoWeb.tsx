"use client";

import { usePathname } from "next/navigation";

// El «marco» de la web (menú, pie, WhatsApp y chat) se esconde en las páginas
// inmersivas a pantalla completa: los tests (/test-…). Doc: docs/tests-interactivos.md
export default function MarcoWeb({ children }: { children: React.ReactNode }) {
  const ruta = usePathname();
  if (ruta?.startsWith("/test-")) return null;
  return <>{children}</>;
}
