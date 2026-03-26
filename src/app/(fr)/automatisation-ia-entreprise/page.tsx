import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/automatisation-ia-entreprise",
  title: "Automatisation IA entreprise",
  description:
    "Automatisation IA pour entreprises : qualification de leads, support intelligent, routage et reduction des taches repetitives.",
  keywords: ["automatisation IA entreprise", "assistant IA entreprise", "chatbot devis", "support intelligent"],
});

export default function AutomatisationIaEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="automatisation-ia-entreprise" />;
}
