import { AgenceIaPageContent } from "@/components/pages/agence-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/agence-ia",
  title: "KI-Agentur · GPT-4 Agenten, Automatisierung & Chatbots | KAH Digital",
  description:
    "KAH Digital ist die KI-Agentur, die Ihre Prozesse automatisiert: Lead-Qualifizierung, 24/7-Support, individuelle GPT-4-Agenten, CRM-Integrationen. Messbarer ROI an T+30. Kostenloses Audit in 24h.",
  keywords: [
    "KI Agentur Schweiz",
    "KI Agentur Lausanne",
    "GPT-4 Agenten Unternehmen",
    "KI Chatbot Agentur Schweiz",
    "Business Automatisierung KI",
    "AI Automatisierung Schweiz",
    "individuelle KI Agenten",
    "KI Beratung Schweiz",
  ],
});

export default function AgenceIaPageDe() {
  return <AgenceIaPageContent locale="de" />;
}
