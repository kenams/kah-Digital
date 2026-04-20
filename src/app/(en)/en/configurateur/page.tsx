import type { Metadata } from "next";
import ConfigurateurPage from "@/app/(fr)/configurateur/page";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/configurateur",
  title: "Quick configurator",
  description: "Describe your website or mobile app to get a clear quote.",
});

export default function ConfigurateurPageEn() {
  return <ConfigurateurPage />;
}
