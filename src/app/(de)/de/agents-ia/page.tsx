import { AgentsIaPageContent } from "@/components/pages/agents-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/agents-ia",
  title: "Individuelle KI-Agenten · Akquise, Support, Angebote, Casting | KAH Digital Studio",
  description:
    "KAH Digital Studio entwickelt fertige KI-Agenten, live in 10 Tagen: automatisierte Akquise, Level-1-Support automatisiert, Angebote in 30 Sekunden, Castly-Agent. Kostenlose 20-Min-Demo.",
  keywords: [
    "individueller KI-Agent",
    "KI-Automatisierung Unternehmen",
    "KI-Akquise-Agent",
    "KI-Support-Chatbot",
    "automatischer Angebots-Agent",
    "Castly Casting KI",
    "KI für Händler",
    "KI für KMU",
    "KI-Agent Schweiz",
  ],
});

export default function AgentsIaDePage() {
  return <AgentsIaPageContent locale="de" />;
}
