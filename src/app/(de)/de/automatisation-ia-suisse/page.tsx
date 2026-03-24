import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "KI-Automatisierung in der Schweiz",
  description:
    "KI-Automatisierung in der Schweiz fuer Lead-Qualifizierung, Support und Operations. Einfache, nuetzliche und messbare Automationen fuer echte Workflows.",
};

export default function AutomatisationIaSuissePageDe() {
  return <SwissAcquisitionPageContent locale="de" page="automatisation-ia-suisse" />;
}
