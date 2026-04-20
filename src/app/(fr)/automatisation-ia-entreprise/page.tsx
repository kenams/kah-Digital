import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/automatisation-ia-entreprise",
  title: "Automatisation IA entreprise | KAH-Digital",
  description:
    "Automatisation IA pour qualification de leads, support, routage et gain de temps operationnel.",
});

export default function AutomatisationIaEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="automatisation-ia-entreprise" />;
}
