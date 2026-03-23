import type { Metadata } from "next";
import "../globals.css";
import { SiteRootShell } from "@/components/site-root-shell";
import { getSiteMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = getSiteMetadata("fr");

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootShell htmlLang="fr">{children}</SiteRootShell>;
}
