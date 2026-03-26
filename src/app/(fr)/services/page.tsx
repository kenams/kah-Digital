import { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";

export const metadata: Metadata = {
  title: "Services digitaux",
  description:
    "Sites web, applications sur mesure et parcours support connectes a GLPI pour entreprises francophones, anglophones et internationales.",
};

export default function ServicesPage() {
  return <ServicesPageContent locale="fr" />;
}
