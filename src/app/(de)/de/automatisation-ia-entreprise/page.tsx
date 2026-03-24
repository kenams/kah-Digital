import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "KI-Automatisierung fuer Unternehmen | KAH-Digital",
  description:
    "KI-Automatisierung fuer Lead-Qualifizierung, Support, Routing, Zusammenfassungen und operativen Zeitgewinn.",
};

export default function AutomatisationIaEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="automatisation-ia-entreprise" />;
}
