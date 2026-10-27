import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

const data = DE_CITY_PAGES["webentwicklung-basel"]!;

export const metadata: Metadata = {
  title: "Webentwicklung Basel — KAH Digital | Individuelle Offerte",
  description: `${data.subline} Kostenlose Offerte in 24h.`,
  keywords: ["Webentwicklung Basel", "Website erstellen Basel", "Webagentur Basel"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-basel" },
};

export default function Page() {
  return <LocalSeoDePageContent data={data} />;
}
