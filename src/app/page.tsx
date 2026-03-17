import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import { homeData } from "@/data/home";

export const metadata: Metadata = {
  title: "Solutions digitales pour la Suisse et l'international",
  description:
    "Sites premium, apps mobiles, portails clients et modules IA. KAH-Digital accompagne les projets en Suisse et a l'international.",
};

export default function Home() {
  return <HomePageClient data={homeData} />;
}
