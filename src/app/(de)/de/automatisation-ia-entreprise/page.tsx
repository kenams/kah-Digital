import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/automatisation-ia-entreprise",
  title: "KI-Automatisierung für Unternehmen · Agenten & Workflows | KAH Digital",
  description:
    "KI-Automatisierung: Lead-Qualifizierung, Kundensupport, intelligentes Routing, individuelle GPT-4-Agenten. Betriebskosten um 40–70% senken. Kostenloses Audit in 24h.",
  keywords: [
    "KI Automatisierung Schweiz",
    "AI Automatisierung Lausanne",
    "GPT-4 Agenten Schweiz",
    "Business Automatisierung KI",
    "KI Agentur Schweiz",
    "Chatbot Entwicklung Schweiz",
  ],
});

export default function AutomatisationIaEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="automatisation-ia-entreprise" />;
}
