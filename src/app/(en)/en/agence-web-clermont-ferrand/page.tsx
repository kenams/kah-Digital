import type { Metadata } from "next";
import { sanitizeDescription } from "@/lib/shared-metadata";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-clermont-ferrand"]!;

export const metadata: Metadata = {
  title: "Web Development Clermont-Ferrand | Custom Quote",
  description: sanitizeDescription(`${data.subline} Free quote within 24h.`),
  keywords: ["web development Clermont-Ferrand", "website Clermont-Ferrand", "web agency Clermont-Ferrand"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-clermont-ferrand" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
