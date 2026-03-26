import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Automatisation IA entreprise | KAH-Digital",
  description:
    "Automatisation IA pour qualification de leads, support, routage et gain de temps operationnel.",
};

export default function AutomatisationIaEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="automatisation-ia-entreprise" />;
}
