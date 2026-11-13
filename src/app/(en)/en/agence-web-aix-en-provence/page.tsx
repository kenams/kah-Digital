import type { Metadata } from "next";
import { sanitizeDescription } from "@/lib/shared-metadata";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-aix-en-provence"]!;

export const metadata: Metadata = {
  title: "Web Development Aix-en-Provence | Custom Quote",
  description: sanitizeDescription(`${data.subline} Free quote within 24h.`),
  keywords: ["web development Aix-en-Provence", "website Aix-en-Provence", "web agency Aix-en-Provence"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-aix-en-provence" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
