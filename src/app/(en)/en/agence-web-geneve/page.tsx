import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-geneve"]!;

export const metadata: Metadata = {
  title: "Web Agency Geneva — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Geneva", "website Geneva", "web agency Geneva"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-geneve" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
