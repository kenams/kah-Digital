import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

const data = DE_CITY_PAGES["webentwicklung-freiburg"]!;

export const metadata: Metadata = {
  title: "Webentwicklung Freiburg — KAH Digital | Individuelle Offerte",
  description: `${data.subline} Kostenlose Offerte in 24h.`,
  keywords: ["Webentwicklung Freiburg", "Website erstellen Freiburg", "Webagentur Freiburg"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-freiburg" },
};

export default function Page() {
  return <LocalSeoDePageContent data={data} />;
}
