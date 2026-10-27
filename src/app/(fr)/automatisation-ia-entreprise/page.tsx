import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/automatisation-ia-entreprise",
  title: "Automatisation IA entreprise · Agents & workflows sur mesure | KAH Digital Studio",
  description:
    "Automatisation IA : qualification leads, support client, routage intelligent, agents GPT-4 sur mesure. Réduisez le temps passé sur les tâches répétitives. Audit gratuit sous 24h.",
});

export default function AutomatisationIaEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="automatisation-ia-entreprise" />;
}
