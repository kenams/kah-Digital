import { AgentsIaPageContent } from "@/components/pages/agents-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/agents-ia",
  title: "Agents IA sur mesure · Prospection, Support, Devis, Casting | KAH Digital",
  description:
    "KAH Digital conçoit des agents IA packagés opérationnels en 10 jours : prospection automatisée, support niveau 1 automatisé, devis en 30 secondes, agent Castly. Démo gratuite 20 min.",
  keywords: [
    "agent IA sur mesure",
    "automatisation IA entreprise",
    "agent prospection IA",
    "chatbot support IA",
    "agent devis automatique",
    "Castly casting IA",
    "IA pour commerçants",
    "IA pour PME",
    "agent IA Suisse",
  ],
});

export default function AgentsIaPage() {
  return <AgentsIaPageContent locale="fr" />;
}
