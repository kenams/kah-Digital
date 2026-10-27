import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-strasbourg"]!;

export const metadata: Metadata = {
  title: "Web Development Strasbourg — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Strasbourg", "website Strasbourg", "web agency Strasbourg"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-strasbourg" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
