import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Business-Website | KAH-Digital",
  description:
    "Business-Website fuer KMU, Beratungen, Agenturen und Dienstleister mit klarerer Positionierung und sauberer Conversion.",
};

export default function SiteWebEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="site-web-entreprise" />;
}
