import { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/services",
  title: "Services digitaux",
  description:
    "Sites web, applications sur mesure et parcours support connectes a GLPI pour entreprises francophones, anglophones et internationales.",
  keywords: ["services web", "application web sur mesure", "assistant IA", "support GLPI"],
});

export default function ServicesPage() {
  return <ServicesPageContent locale="fr" />;
}
