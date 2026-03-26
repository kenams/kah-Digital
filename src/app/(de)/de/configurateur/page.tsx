import type { Metadata } from "next";
import ConfigurateurPage from "@/app/(fr)/configurateur/page";

export const metadata: Metadata = {
  title: "Schneller Konfigurator",
  description: "Beschreibe deine Website oder mobile App in wenigen Schritten fuer ein klares Angebot.",
  alternates: {
    canonical: "/de/configurateur",
    languages: {
      fr: "/configurateur",
      en: "/en/configurateur",
    },
  },
};

export default function ConfigurateurPageDe() {
  return <ConfigurateurPage />;
}
