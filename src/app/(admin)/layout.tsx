import type { Metadata } from "next";
import "../globals.css";
import { SiteRootShell } from "@/components/site-root-shell";
import { adminMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = adminMetadata;

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootShell htmlLang="fr">{children}</SiteRootShell>;
}
