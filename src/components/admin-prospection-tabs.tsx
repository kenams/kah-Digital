"use client";

import { useState } from "react";
import { ProspectionDashboard } from "@/components/admin-prospection-dashboard";
import { AdminKahSupportBoard } from "@/components/admin-kah-support-board";

export function ProspectionTabs({ defaultTab }: { defaultTab: "web" | "kah-support" }) {
  const [tab, setTab] = useState<"web" | "kah-support">(defaultTab);

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-14 z-40 border-b border-white/8 bg-[rgba(9,9,8,0.97)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[90rem] gap-1 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setTab("web")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "web"
                ? "border-white text-white"
                : "border-transparent text-white/45 hover:text-white/70"
            }`}
          >
            Prospection Web
          </button>
          <button
            onClick={() => setTab("kah-support")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "kah-support"
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-white/45 hover:text-white/70"
            }`}
          >
            🎯 KAH-Support GLPI
          </button>
        </div>
      </div>

      {tab === "web" ? <ProspectionDashboard /> : <AdminKahSupportBoard />}
    </div>
  );
}
