import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

const data = DE_CITY_PAGES["webentwicklung-bern"]!;

export const metadata: Metadata = {
  title: "Webentwicklung Bern — KAH Digital | Individuelle Offerte",
  description: `${data.subline} Kostenlose Offerte in 24h.`,
  keywords: ["Webentwicklung Bern", "Website erstellen Bern", "Webagentur Bern"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-bern" },
};

export default function Page() {
  return <LocalSeoDePageContent data={data} />;
}
