import type { Metadata } from "next";
import ConfigurateurPage from "@/app/(fr)/configurateur/page";

export const metadata: Metadata = {
  title: "Quick configurator",
  description: "Describe your website or mobile app to get a clear quote.",
  alternates: {
    canonical: "/en/configurateur",
    languages: {
      fr: "/configurateur",
      de: "/de/configurateur",
    },
  },
};

export default function ConfigurateurPageEn() {
  return <ConfigurateurPage />;
}
