import type { Metadata } from "next";
import ConfigurateurPage from "@/app/(fr)/configurateur/page";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/configurateur",
  title: "Schneller Konfigurator",
  description: "Beschreibe deine Website oder mobile App in wenigen Schritten für ein klares Angebot.",
});

export default function ConfigurateurPageDe() {
  return <ConfigurateurPage />;
}
