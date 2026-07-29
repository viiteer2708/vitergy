import type { Metadata } from "next";
import SectorLanding from "../SectorLanding";
import { getSector } from "../sectores";

const sector = getSector("gimnasios")!;

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.metaDescription,
  alternates: {
    canonical: "https://vitergy.es/grandes-consumos/gimnasios",
  },
  openGraph: {
    title: sector.metaTitle,
    description: sector.metaDescription,
    url: "https://vitergy.es/grandes-consumos/gimnasios",
    siteName: "Vitergy",
    locale: "es_ES",
    type: "article",
  },
};

export default function GimnasiosPage() {
  return <SectorLanding sector={sector} />;
}
