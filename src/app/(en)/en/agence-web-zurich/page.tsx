import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-zurich"]!;

export const metadata: Metadata = {
  title: "Web Agency Zurich — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Zurich", "website Zurich", "web agency Zurich"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-zurich" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
