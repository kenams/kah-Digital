import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-rouen"]!;

export const metadata: Metadata = {
  title: "Web Development Rouen — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Rouen", "website Rouen", "web agency Rouen"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-rouen" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
