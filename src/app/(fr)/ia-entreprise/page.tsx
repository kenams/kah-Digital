import { IaOffersPageContent } from "@/components/pages/ia-offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/ia-entreprise",
  title: "Formation IA en entreprise : ateliers dès 390 € | KAH Digital Studio",
  description:
    "Ateliers IA sur vos tâches réelles (dès 390 €), mise en place d'outils et accompagnement mensuel (190 €/mois). Entreprises et particuliers, à distance, paiement en ligne.",
  keywords: ["formation IA entreprise", "atelier IA PME", "former ses salariés à l'IA", "formation ChatGPT entreprise", "mise en place IA entreprise", "accompagnement IA", "cours IA particulier"],
});

export default function IaEntreprisePage() {
  return <IaOffersPageContent locale="fr" />;
}
