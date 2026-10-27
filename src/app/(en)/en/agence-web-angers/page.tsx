import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-angers"]!;

export const metadata: Metadata = {
  title: "Web Development Angers — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Angers", "website Angers", "web agency Angers"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-angers" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
