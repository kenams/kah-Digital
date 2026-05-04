import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/services",
  title: "Services digitaux",
  description:
    "Landing pages, sites web professionnels, applications mobiles, SaaS et outils web métier — KAH-Digital, studio digital. Devis gratuit sous 24h.",
});

export default function ServicesPage() {
  return <ServicesPageContent locale="fr" />;
}
