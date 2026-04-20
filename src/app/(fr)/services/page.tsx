import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/services",
  title: "Services digitaux",
  description:
    "Sites web, applications sur mesure et parcours support connectes a GLPI pour entreprises francophones, anglophones et internationales.",
});

export default function ServicesPage() {
  return <ServicesPageContent locale="fr" />;
}
