import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-marseille"]!;

export const metadata: Metadata = {
  title: "Web Development Marseille — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Marseille", "website Marseille", "web agency Marseille"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-marseille" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
