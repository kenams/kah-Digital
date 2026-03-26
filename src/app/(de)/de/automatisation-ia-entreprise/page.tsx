import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/automatisation-ia-entreprise",
  title: "KI-Automatisierung fuer Unternehmen",
  description:
    "KI-Automatisierung fuer Unternehmen: Lead-Qualifizierung, intelligenter Support, Routing und weniger repetitive Arbeit.",
  keywords: ["ki automatisierung unternehmen", "ki assistent website", "lead qualifizierung automation"],
});

export default function AutomatisationIaEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="automatisation-ia-entreprise" />;
}
