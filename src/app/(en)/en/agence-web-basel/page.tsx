import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-basel"]!;

export const metadata: Metadata = {
  title: "Web Agency Basel — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Basel", "website Basel", "web agency Basel"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-basel" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
