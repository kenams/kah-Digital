import { AgenceIaPageContent } from "@/components/pages/agence-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/agence-ia",
  title: "Agence IA · Agents GPT-4, Automatisation & Chatbots | KAH Digital Studio",
  description:
    "KAH Digital Studio est l'agence IA qui automatise vos processus : qualification leads, support 24/7, agents GPT-4 sur mesure, intégrations CRM. Indicateurs de résultat suivis dès J+30. Audit gratuit sous 24h.",
  keywords: [
    "agence IA Suisse",
    "agence intelligence artificielle Suisse",
    "automatisation IA entreprise",
    "agents GPT-4 entreprise",
    "chatbot IA Suisse",
    "automatisation processus IA",
    "agence IA francophone",
    "AI agency Switzerland",
  ],
});

export default function AgenceIaPage() {
  return <AgenceIaPageContent locale="fr" />;
}
