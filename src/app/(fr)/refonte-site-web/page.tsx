import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/refonte-site-web",
  title: "Refonte site web · De +0 à +40% de conversions | KAH Digital",
  description:
    "Refonte site web sur Next.js 15 : UX premium, vitesse < 2s, taux de conversion optimisé. Votre ancien site coûte des clients — on le transforme en machine à leads. Audit gratuit.",
});

export default function RefonteSiteWebPage() {
  return <GlobalAcquisitionPageContent locale="fr" page="refonte-site-web" />;
}
