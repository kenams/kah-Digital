import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website-Entwicklung in Lausanne",
  description:
    "Website-Entwicklung in Lausanne fuer Unternehmen in der Waadt, KMU und lokale Marken. Klare Refonte mit besserer Conversion und einfacheren Kontaktwegen.",
};

export default function SiteWebLausannePageDe() {
  return <SwissAcquisitionPageContent locale="de" page="site-web-lausanne" />;
}
