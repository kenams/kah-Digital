import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-nantes"]!;

export const metadata: Metadata = {
  title: "Web Development Nantes — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Nantes", "website Nantes", "web agency Nantes"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-nantes" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
