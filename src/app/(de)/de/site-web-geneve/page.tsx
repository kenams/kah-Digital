import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website-Entwicklung in Genf",
  description:
    "Website-Entwicklung in Genf fuer KMU, Beratungen und Dienstleister. Klare, glaubwuerdige Websites mit Conversion-Fokus und CHF-Budgets.",
};

export default function SiteWebGenevePageDe() {
  return <SwissAcquisitionPageContent locale="de" page="site-web-geneve" />;
}
