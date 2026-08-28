"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FiBarChart2, FiLayers, FiCreditCard, FiMessageSquare, FiTarget, FiRadio, FiBriefcase } from "react-icons/fi";
import { AdminSignOutButton } from "@/components/admin-signout-button";

const navItems = [
  {
    label: "Tableau de bord",
    href: "/admin",
    icon: FiBarChart2,
    match: (p: string) => p === "/admin",
  },
  {
    label: "CRM",
    href: "/admin/demandes?section=demandes&view=kanban",
    icon: FiLayers,
    match: (p: string, s: URLSearchParams) =>
      p.startsWith("/admin/demandes") &&
      (s.get("view") === "kanban" || s.get("view") === "pipeline" || (!s.get("section") && !s.get("view"))),
  },
  {
    label: "Paiements",
    href: "/admin/demandes?section=demandes&view=payments",
    icon: FiCreditCard,
    match: (_p: string, s: URLSearchParams) => s.get("view") === "payments",
  },
  {
    label: "Assistant IA",
    href: "/admin/demandes?section=assistant",
    icon: FiMessageSquare,
    match: (p: string, s: URLSearchParams) =>
      s.get("section") === "assistant" || p.startsWith("/admin/assistant"),
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: FiBriefcase,
    match: (p: string) => p.startsWith("/admin/portfolio"),
  },
  {
    label: "Prospection",
    href: "/admin/prospection",
    icon: FiTarget,
    match: (p: string) => p.startsWith("/admin/prospection"),
  },
  {
    label: "Social",
    href: "/admin/social",
    icon: FiRadio,
    match: (p: string) => p.startsWith("/admin/social"),
  },
];

const HIDE_NAV_PATHS = ["/admin/login", "/admin/reset-password"];

function AdminNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (HIDE_NAV_PATHS.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(8,8,7,0.97)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/admin"
          className="flex shrink-0 items-center gap-2 rounded-xl py-1 transition hover:opacity-75"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#d6b36a,#7fb8c7)] text-[10px] font-bold text-[#11131b]">
            KAH
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
            Admin
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-1 items-center justify-center gap-0.5 overflow-x-auto px-2">
          {navItems.map((item) => {
            const active = item.match(pathname, searchParams);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-white/12 text-white"
                    : "text-white/45 hover:bg-white/6 hover:text-white/85"
                }`}
              >
                <Icon size={12} className="shrink-0" aria-hidden="true" />
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <AdminSignOutButton
          label="Sortir"
          className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/45 transition hover:border-white/22 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
        />
      </div>
    </header>
  );
}

export function AdminNav() {
  return (
    <Suspense fallback={<div className="h-14 border-b border-white/8 bg-[rgba(8,8,7,0.97)]" />}>
      <AdminNavInner />
    </Suspense>
  );
}
