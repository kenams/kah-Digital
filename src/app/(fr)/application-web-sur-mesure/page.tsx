import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/application-web-sur-mesure",
  title: "Application web sur mesure | KAH-Digital",
  description:
    "Developpement d'application web sur mesure : portail, dashboard, outil metier, espace client et workflow exploitable.",
});

export default function ApplicationWebSurMesurePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="application-web-sur-mesure" />;
}
