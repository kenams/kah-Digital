import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-lille"]!;

export const metadata: Metadata = {
  title: "Web Development Lille — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Lille", "website Lille", "web agency Lille"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-lille" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
