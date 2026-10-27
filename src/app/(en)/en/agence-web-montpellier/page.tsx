import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-montpellier"]!;

export const metadata: Metadata = {
  title: "Web Development Montpellier — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Montpellier", "website Montpellier", "web agency Montpellier"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-montpellier" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
