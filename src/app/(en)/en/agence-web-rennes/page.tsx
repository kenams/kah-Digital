import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-rennes"]!;

export const metadata: Metadata = {
  title: "Web Development Rennes — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Rennes", "website Rennes", "web agency Rennes"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-rennes" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
