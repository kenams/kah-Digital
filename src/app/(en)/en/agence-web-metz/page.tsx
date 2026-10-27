import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-metz"]!;

export const metadata: Metadata = {
  title: "Web Development Metz — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Metz", "website Metz", "web agency Metz"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-metz" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
