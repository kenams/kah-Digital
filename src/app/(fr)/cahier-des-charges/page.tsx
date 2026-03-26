import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/cahier-des-charges",
  title: "Cahier des charges",
  description: "Brief interactif et export PDF pour cadrer un projet digital.",
});

export default function CahierDesChargesPage() {
  return <BriefPageContent locale="fr" />;
}
