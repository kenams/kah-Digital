import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-dijon"]!;

export const metadata: Metadata = {
  title: "Web Development Dijon — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Dijon", "website Dijon", "web agency Dijon"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-dijon" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
