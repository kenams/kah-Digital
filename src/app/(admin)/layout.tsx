import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "../globals.css";
import { adminMetadata } from "@/lib/shared-metadata";
import { AdminNav } from "@/components/admin-nav";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = adminMetadata;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-admin="true" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#090908] text-white">
        <AdminNav />
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      </body>
    </html>
  );
}
