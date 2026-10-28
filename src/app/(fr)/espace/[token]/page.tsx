import type { Metadata } from "next";
import { PulseDashboard } from "@/components/pulse/pulse-dashboard";

export const metadata: Metadata = {
  title: "Mon espace — KAH Digital Studio",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default async function EspacePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <PulseDashboard token={token} />
    </main>
  );
}
