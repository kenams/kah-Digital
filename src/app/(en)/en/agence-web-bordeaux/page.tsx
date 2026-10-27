import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-bordeaux"]!;

export const metadata: Metadata = {
  title: "Web Development Bordeaux — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Bordeaux", "website Bordeaux", "web agency Bordeaux"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-bordeaux" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
