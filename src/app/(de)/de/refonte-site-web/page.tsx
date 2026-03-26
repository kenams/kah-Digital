import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/refonte-site-web",
  title: "Website-Refonte",
  description:
    "Website-Refonte fuer Unternehmen, die auf einer saubereren, glaubwuerdigeren digitalen Basis neu starten wollen.",
  keywords: ["website relaunch", "website refonte", "webagentur redesign"],
});

export default function RefonteSiteWebPageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="refonte-site-web" />;
}
