import type { Metadata } from "next";
import "../globals.css";
import { SiteRootShell } from "@/components/site-root-shell";
import { getSiteMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = getSiteMetadata("de");

export default function DeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootShell htmlLang="de">{children}</SiteRootShell>;
}
