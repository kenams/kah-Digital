import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-berne"]!;

export const metadata: Metadata = {
  title: "Web Agency Bern — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Bern", "website Bern", "web agency Bern"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-berne" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
