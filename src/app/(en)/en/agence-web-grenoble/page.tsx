import type { Metadata } from "next";
import { sanitizeDescription } from "@/lib/shared-metadata";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-grenoble"]!;

export const metadata: Metadata = {
  title: "Web Development Grenoble — KAH Digital Studio | Custom Quote",
  description: sanitizeDescription(`${data.subline} Free quote within 24h.`),
  keywords: ["web development Grenoble", "website Grenoble", "web agency Grenoble"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-grenoble" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
