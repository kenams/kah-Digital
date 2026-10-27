import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-toulouse"]!;

export const metadata: Metadata = {
  title: "Web Development Toulouse — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Toulouse", "website Toulouse", "web agency Toulouse"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-toulouse" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
