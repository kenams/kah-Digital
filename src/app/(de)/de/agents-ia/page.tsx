import { AgentsIaPageContent } from "@/components/pages/agents-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/de/agents-ia",
  title: "Individuelle KI-Agenten · Akquise, Support, Angebote, Casting | KAH Digital",
  description:
    "KAH Digital entwickelt fertige KI-Agenten, live in 10 Tagen: 120 Kontakte/Tag, 70% Tickets automatisch gelöst, Angebote in 30 Sekunden, Castly-Agent. Kostenlose 20-Min-Demo.",
  keywords: [
    "individueller KI-Agent",
    "KI-Automatisierung Unternehmen",
    "KI-Akquise-Agent",
    "KI-Support-Chatbot",
    "automatischer Angebots-Agent",
    "Castly Casting KI",
    "KI für Händler",
    "KI für KMU",
    "KI-Agent Lausanne",
  ],
});

export default function AgentsIaDePage() {
  return <AgentsIaPageContent locale="de" />;
}
