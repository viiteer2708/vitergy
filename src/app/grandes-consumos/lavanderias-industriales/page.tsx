import type { Metadata } from "next";
import SectorLanding from "../SectorLanding";
import { getSector } from "../sectores";

const sector = getSector("lavanderias-industriales")!;

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.metaDescription,
  alternates: {
    canonical: "https://vitergy.es/grandes-consumos/lavanderias-industriales",
  },
  openGraph: {
    title: sector.metaTitle,
    description: sector.metaDescription,
    url: "https://vitergy.es/grandes-consumos/lavanderias-industriales",
    siteName: "Vitergy",
    locale: "es_ES",
    type: "article",
  },
};

export default function LavanderiasIndustrialesPage() {
  return <SectorLanding sector={sector} />;
}
