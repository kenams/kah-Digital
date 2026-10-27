import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-caen"]!;

export const metadata: Metadata = {
  title: "Web Development Caen — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Caen", "website Caen", "web agency Caen"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-caen" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
