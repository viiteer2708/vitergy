import type { Metadata } from "next";
import SectorLanding from "../SectorLanding";
import { getSector } from "../sectores";

const sector = getSector("clubs-de-padel")!;

export const metadata: Metadata = {
  title: sector.metaTitle,
  description: sector.metaDescription,
  alternates: {
    canonical: "https://vitergy.es/grandes-consumos/clubs-de-padel",
  },
  openGraph: {
    title: sector.metaTitle,
    description: sector.metaDescription,
    url: "https://vitergy.es/grandes-consumos/clubs-de-padel",
    siteName: "Vitergy",
    locale: "es_ES",
    type: "article",
    images: ["/og.png"],
  },
};

export default function ClubsDePadelPage() {
  return <SectorLanding sector={sector} />;
}
