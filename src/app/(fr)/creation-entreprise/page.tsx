import { CreationEntreprisePageContent } from "@/components/pages/creation-entreprise-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/creation-entreprise",
  title: "Création d'auto-entreprise sans prise de tête | KAH Digital",
  description: "On s'occupe de toutes les démarches pour lancer ton auto-entreprise : rapide, sans erreur. Réponse sous 24h, offert avec un pack site.",
  keywords: ["création auto-entreprise", "immatriculation INPI", "création micro-entreprise", "auto-entrepreneur rapide"],
});

export default function CreationEntreprisePage() {
  return <CreationEntreprisePageContent />;
}
