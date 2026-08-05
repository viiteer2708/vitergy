import type { Metadata } from "next";
import SectorLanding from "../SectorLanding";
import { getSector } from "../sectores";

const sector = getSector("centros-medicos")!;

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.metaDescription,
  alternates: {
    canonical: "https://vitergy.es/grandes-consumos/centros-medicos",
  },
  openGraph: {
    title: sector.metaTitle,
    description: sector.metaDescription,
    url: "https://vitergy.es/grandes-consumos/centros-medicos",
    siteName: "Vitergy",
    locale: "es_ES",
    type: "article",
    images: ["/og.png"],
  },
};

export default function CentrosMedicosPage() {
  return <SectorLanding sector={sector} />;
}
