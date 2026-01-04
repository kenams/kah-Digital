import type { Metadata } from "next";
import ConfigurateurPage from "@/app/configurateur/page";

export const metadata: Metadata = {
  title: "Quick configurator",
  description: "Describe your website or mobile app to get a clear quote.",
};

export default function ConfigurateurPageEn() {
  return <ConfigurateurPage />;
}
