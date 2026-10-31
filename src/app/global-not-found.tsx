import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { NotFoundContent } from "@/components/not-found-content";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"], display: "swap" });

export const metadata: Metadata = {
  title: "404 · KAH Digital Studio",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className={`${dmSans.variable} ${syne.variable} antialiased`}>
        <NotFoundContent />
      </body>
    </html>
  );
}
