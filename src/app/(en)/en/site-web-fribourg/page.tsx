import type { Metadata } from "next";
import { sanitizeDescription } from "@/lib/shared-metadata";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["site-web-fribourg"]!;

export const metadata: Metadata = {
  title: "Web Development Fribourg — KAH Digital Studio | Custom Quote",
  description: sanitizeDescription(`${data.subline} Free quote within 24h.`),
  keywords: ["web development Fribourg", "website Fribourg", "web agency Fribourg"],
  alternates: { canonical: "https://kah-digital.ch/en/site-web-fribourg" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
