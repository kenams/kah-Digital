import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-paris"]!;

export const metadata: Metadata = {
  title: "Web Development Paris — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Paris", "website Paris", "web agency Paris"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-paris" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
