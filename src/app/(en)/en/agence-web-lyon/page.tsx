import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-lyon"]!;

export const metadata: Metadata = {
  title: "Web Development Lyon — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Lyon", "website Lyon", "web agency Lyon"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-lyon" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
