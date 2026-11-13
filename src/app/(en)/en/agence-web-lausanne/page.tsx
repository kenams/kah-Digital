import type { Metadata } from "next";
import { sanitizeDescription } from "@/lib/shared-metadata";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-lausanne"]!;

export const metadata: Metadata = {
  title: "Web Agency Lausanne — KAH Digital Studio | Custom Quote",
  description: sanitizeDescription(`${data.subline} Free quote within 24h.`),
  keywords: ["web development Lausanne", "website Lausanne", "web agency Lausanne"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-lausanne" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
