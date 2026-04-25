import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/automatisation-ia-entreprise",
  title: "KI-Automatisierung für Unternehmen | KAH-Digital",
  description:
    "KI-Automatisierung für Lead-Qualifizierung, Support, Routing, Zusammenfassungen und operativen Zeitgewinn.",
});

export default function AutomatisationIaEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="automatisation-ia-entreprise" />;
}
