import type { Metadata } from "next";
import "../globals.css";
import { SiteRootShell } from "@/components/site-root-shell";
import { getSiteMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = getSiteMetadata("en");

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootShell htmlLang="en">{children}</SiteRootShell>;
}
