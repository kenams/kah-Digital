"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale";
import Link from "next/link";
import { FiArrowUpRight, FiX } from "react-icons/fi";

type Category = "all" | "saas" | "restaurant" | "ecommerce" | "coach" | "startup" | "local";

/* ─── Browser frame ──────────────────────────────────────────────────────── */

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.07] bg-[#0c0d11] px-3 py-[7px]">
        <span className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/80" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/80" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#28c840]/80" />
        <div className="ml-2 flex-1 overflow-hidden rounded border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-center">
          <span className="truncate font-mono text-[8px] text-white/25">{url}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ─── Mini UI previews ───────────────────────────────────────────────────── */

function RestaurantPreview({ accent }: { accent: string }) {
  const days = [["L", "19"], ["M", "20"], ["M", "21"], ["J", "22"], ["V", "23"]];
  const times = ["19:00", "19:30", "20:00", "20:30", "21:00"];
  return (
    <BrowserFrame url="bistrot-geneva.com/réservations">
      <div style={{ background: "#0c0905", padding: "9px 11px", height: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 7.5, fontWeight: 800, color: "rgba(255,255,255,0.88)", letterSpacing: 0.8 }}>BISTROT GENEVA</span>
          <span style={{ background: accent, color: "white", borderRadius: 20, padding: "2.5px 8px", fontSize: 6.5, fontWeight: 700 }}>Réserver</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>Choisir une date</div>
          <div style={{ display: "flex", gap: 3 }}>
            {days.map(([d, n], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", background: i === 2 ? accent : "rgba(255,255,255,0.06)", borderRadius: 5, padding: "4px 0", border: i !== 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ fontSize: 5.5, color: i === 2 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)" }}>{d}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: i === 2 ? "white" : "rgba(255,255,255,0.5)" }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Heure</div>
          <div style={{ display: "flex", gap: 3 }}>
            {times.map((t, i) => (
              <div key={t} style={{ flex: 1, textAlign: "center", background: i === 2 ? `${accent}22` : "rgba(255,255,255,0.05)", border: i === 2 ? `1px solid ${accent}55` : "1px solid rgba(255,255,255,0.05)", borderRadius: 5, padding: "4px 0", fontSize: 6.5, color: i === 2 ? accent : "rgba(255,255,255,0.45)", fontWeight: i === 2 ? 700 : 400 }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {["2 personnes ▾", "Intérieur ▾"].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "5px 8px", fontSize: 6.5, color: "rgba(255,255,255,0.4)" }}>{s}</div>
          ))}
        </div>
        <div style={{ background: accent, borderRadius: 20, padding: "6px 10px", textAlign: "center", fontSize: 7.5, fontWeight: 700, color: "white", marginTop: "auto" }}>
          Confirmer la réservation →
        </div>
      </div>
    </BrowserFrame>
  );
}

function DashboardPreview({ accent }: { accent: string }) {
  const rows = [["Produit A", "12 800 €", "+12%"], ["Produit B", "8 450 €", "+7%"], ["Produit C", "6 200 €", "+24%"]];
  return (
    <BrowserFrame url="dashboard.pme-fribourg.ch">
      <div style={{ background: "#060810", height: "100%", display: "flex" }}>
        <div style={{ width: 24, background: "rgba(255,255,255,0.025)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "10px 0", display: "flex", flexDirection: "column", gap: 9, alignItems: "center" }}>
          {["▣", "⊞", "◎", "≡", "◈"].map((ic, i) => (
            <div key={i} style={{ fontSize: 8.5, color: i === 0 ? accent : "rgba(255,255,255,0.2)" }}>{ic}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[{ v: "+18%", l: "Revenue", hi: true }, { v: "94%", l: "Uptime", hi: false }, { v: "4.2k", l: "Users", hi: false }].map((m, i) => (
              <div key={i} style={{ background: m.hi ? `${accent}14` : "rgba(255,255,255,0.04)", border: m.hi ? `1px solid ${accent}28` : "1px solid rgba(255,255,255,0.06)", borderRadius: 5, padding: "5px" }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: m.hi ? accent : "rgba(255,255,255,0.72)" }}>{m.v}</div>
                <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.28)", marginTop: 1 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "5px 6px", flex: 1 }}>
            <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Revenue · 30 derniers jours</div>
            <svg viewBox="0 0 120 36" style={{ width: "100%", height: 36 }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="dboard-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,32 L12,28 L24,26 L36,21 L48,23 L60,17 L72,14 L84,16 L96,10 L108,7 L120,4 L120,36 L0,36 Z" fill="url(#dboard-grad)" />
              <path d="M0,32 L12,28 L24,26 L36,21 L48,23 L60,17 L72,14 L84,16 L96,10 L108,7 L120,4" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="120" cy="4" r="2.5" fill={accent} />
            </svg>
          </div>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, overflow: "hidden" }}>
            {rows.map(([name, val, trend], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3.5px 6px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.5)" }}>{name}</span>
                <span style={{ fontSize: 6.5, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>{val}</span>
                <span style={{ fontSize: 5.5, color: "#10b981", background: "rgba(16,185,129,0.1)", borderRadius: 8, padding: "1px 4px" }}>{trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function CoachPreview({ accent }: { accent: string }) {
  return (
    <BrowserFrame url="sarah-martin.coach">
      <div style={{ background: "#08060f", padding: "9px 11px", height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #ec4899)`, flexShrink: 0 }} />
            <span style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Sarah Martin</span>
          </div>
          <span style={{ background: accent, color: "white", borderRadius: 20, padding: "2.5px 8px", fontSize: 6.5, fontWeight: 700 }}>Réserver</span>
        </div>
        <div>
          <div style={{ fontSize: 5.5, color: accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Business Coach · Lyon</div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 4 }}>Transformez votre activité en 90 jours.</div>
          <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>Accompagnement personnalisé pour entrepreneurs.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {[{ i: "🎯", l: "Stratégie" }, { i: "📈", l: "Croissance" }, { i: "💬", l: "Coaching" }].map((s, idx) => (
            <div key={idx} style={{ background: idx === 0 ? `${accent}14` : "rgba(255,255,255,0.04)", border: idx === 0 ? `1px solid ${accent}30` : "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "6px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 11 }}>{s.i}</div>
              <div style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "5px 8px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex" }}>
            {["#e879f9", accent, "#3b82f6"].map((c, i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.4)", marginLeft: i > 0 ? -4 : 0 }} />
            ))}
          </div>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.42)" }}>120+ clients · 4.9★</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function EcommercePreview({ accent }: { accent: string }) {
  const products = [
    { name: "Collier Alma", price: "89 €", color: "#f59e0b", badge: "Nouveau" },
    { name: "Bague Luna", price: "65 €", color: "#8b5cf6" },
    { name: "Bracelet Sol", price: "45 €", color: accent },
    { name: "Boucles Ora", price: "55 €", color: "#ec4899", badge: "−20%" },
  ];
  return (
    <BrowserFrame url="artisan-e.fr/bijoux">
      <div style={{ background: "#060d08", padding: "8px 10px", height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 7.5, fontWeight: 800, color: "rgba(255,255,255,0.88)", letterSpacing: 0.6 }}>ARTISAN·E</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>🔍</span>
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>🛒</span>
              <span style={{ position: "absolute", top: -3, right: -3, background: accent, borderRadius: "50%", width: 7, height: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "white", fontWeight: 700 }}>2</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {["Tous", "Bijoux", "Céramique", "Tissu"].map((c, i) => (
            <span key={c} style={{ background: i === 1 ? accent : "rgba(255,255,255,0.06)", borderRadius: 20, padding: "2.5px 7px", fontSize: 6.5, color: i === 1 ? "white" : "rgba(255,255,255,0.4)", fontWeight: i === 1 ? 700 : 400, border: i !== 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>{c}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, flex: 1 }}>
          {products.map((p, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: 42, background: `linear-gradient(135deg, ${p.color}28, ${p.color}10)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, background: `${p.color}45`, border: `1px solid ${p.color}35` }} />
                {p.badge && <span style={{ position: "absolute", top: 3, right: 3, background: i === 0 ? "#3b82f6" : accent, borderRadius: 3, padding: "1px 4px", fontSize: 5.5, color: "white", fontWeight: 700 }}>{p.badge}</span>}
              </div>
              <div style={{ padding: "4px 6px" }}>
                <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 7.5, color: accent, fontWeight: 700 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function SaasLandingPreview({ accent }: { accent: string }) {
  return (
    <BrowserFrame url="finflow.app">
      <div style={{ background: "#04080f", padding: "8px 11px", height: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: `linear-gradient(135deg, ${accent}, #6366f1)` }} />
            <span style={{ fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.88)" }}>FinFlow</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.32)" }}>Pricing</span>
            <span style={{ background: accent, color: "white", borderRadius: 12, padding: "2.5px 8px", fontSize: 6.5, fontWeight: 700 }}>Get started</span>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingTop: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${accent}14`, border: `1px solid ${accent}28`, borderRadius: 20, padding: "2.5px 9px", fontSize: 6.5, color: accent, marginBottom: 6 }}>
            <span>🚀</span> Lancé en 5 jours · Lighthouse 98
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 7 }}>La finance qui vous ressemble.</div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "4px 4px 4px 10px", gap: 3 }}>
            <span style={{ flex: 1, fontSize: 6.5, color: "rgba(255,255,255,0.28)", alignSelf: "center" }}>votre@email.com</span>
            <span style={{ background: accent, borderRadius: 20, padding: "4px 10px", fontSize: 6.5, fontWeight: 700, color: "white" }}>Commencer →</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {[{ i: "⚡", l: "5 jours" }, { i: "🔒", l: "Sécurisé" }, { i: "📊", l: "Analytics" }].map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, padding: "5px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 10 }}>{f.i}</div>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.36)", marginTop: 2 }}>{f.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {["STRIPE", "VERCEL", "SUPABASE"].map((l) => (
            <span key={l} style={{ fontSize: 5.5, fontWeight: 700, color: "rgba(255,255,255,0.18)", letterSpacing: 0.6 }}>{l}</span>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function LocalBusinessPreview({ accent }: { accent: string }) {
  return (
    <BrowserFrame url="dupont-associes.ch">
      <div style={{ background: "#080507", padding: "9px 11px", height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 7, fontWeight: 800, color: "rgba(255,255,255,0.82)", letterSpacing: 0.4 }}>DUPONT & ASSOCIÉS</span>
          <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2px 7px", fontSize: 6, color: "rgba(255,255,255,0.42)" }}>Lausanne</span>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${accent}12, rgba(255,255,255,0.02))`, border: `1px solid ${accent}20`, borderRadius: 8, padding: "9px 10px" }}>
          <div style={{ fontSize: 5.5, color: accent, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Cabinet juridique · depuis 2008</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 6 }}>Expert en droit des affaires à Lausanne.</div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: accent, borderRadius: 20, padding: "3.5px 9px", fontSize: 7, color: "white", fontWeight: 700 }}>Consultation gratuite</div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "3.5px 9px", fontSize: 7, color: "rgba(255,255,255,0.52)" }}>📞 Appeler</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {[{ v: "#1", l: "Google local" }, { v: "3–4", l: "leads/sem." }, { v: "15+", l: "ans d'exp." }].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, padding: "5px", textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: i === 0 ? accent : "rgba(255,255,255,0.72)" }}>{item.v}</div>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{item.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "5px 8px", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10 }}>⭐</span>
          <div>
            <div style={{ fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.68)" }}>4.9 / 5 · 47 avis Google</div>
            <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)" }}>"Professionnels, réactifs et efficaces."</div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ─── Project data ───────────────────────────────────────────────────────── */

const PROJECTS: {
  id: string;
  cat: Category;
  accent: string;
  catLabel: { fr: string; en: string; de: string };
  title: { fr: string; en: string; de: string };
  client: { fr: string; en: string; de: string };
  description: { fr: string; en: string; de: string };
  stack: string[];
  results: { fr: string; en: string; de: string }[];
  renderPreview: (accent: string) => React.ReactNode;
}[] = [
  {
    id: "p1",
    cat: "restaurant",
    accent: "#f97316",
    catLabel: { fr: "Restaurant", en: "Restaurant", de: "Restaurant" },
    title: { fr: "Réservations en ligne", en: "Online Reservations", de: "Online-Reservierungen" },
    client: { fr: "Restaurant gastronomique · Genève", en: "Fine dining · Geneva", de: "Gourmetrestaurant · Genf" },
    description: {
      fr: "Système de réservation complet avec sélection de date, créneaux horaires, nombre de couverts et confirmation email automatique. Interface admin pour gérer les disponibilités en temps réel. La salle affichait quasi-complet dès la 3e semaine après le lancement.",
      en: "Complete booking system with date selection, time slots, cover count, and automatic email confirmation. Admin interface to manage availability in real time. The restaurant was nearly fully booked within 3 weeks of launch.",
      de: "Komplettes Reservierungssystem mit Datumsauswahl, Zeitfenstern, Personenzahl und automatischer E-Mail-Bestätigung. Admin-Oberfläche zur Echtzeit-Verwaltung der Verfügbarkeit. Das Restaurant war innerhalb von 3 Wochen nach dem Launch nahezu ausgebucht.",
    },
    stack: ["Next.js", "Stripe", "Resend"],
    results: [
      { fr: "+30% réservations", en: "+30% bookings", de: "+30% Reservierungen" },
      { fr: "Temps de charge < 1s", en: "Load time < 1s", de: "Ladezeit < 1s" },
    ],
    renderPreview: (a) => <RestaurantPreview accent={a} />,
  },
  {
    id: "p2",
    cat: "saas",
    accent: "#3b82f6",
    catLabel: { fr: "SaaS", en: "SaaS", de: "SaaS" },
    title: { fr: "Dashboard PME", en: "SME Dashboard", de: "KMU-Dashboard" },
    client: { fr: "Startup B2B · Fribourg", en: "B2B Startup · Fribourg", de: "B2B Startup · Freiburg" },
    description: {
      fr: "Dashboard B2B en temps réel avec KPIs personnalisables, graphiques interactifs, gestion multi-utilisateurs et export CSV. Architecture Supabase + Row Level Security pour isoler les données par client. 0 bug signalé en 4 mois de production continue.",
      en: "Real-time B2B dashboard with customizable KPIs, interactive charts, multi-user management, and CSV export. Supabase + Row Level Security architecture to isolate client data. 0 bugs reported in 4 months of continuous production.",
      de: "Echtzeit-B2B-Dashboard mit anpassbaren KPIs, interaktiven Diagrammen, Multi-User-Management und CSV-Export. Supabase + Row Level Security Architektur zur Datenisolierung. 0 gemeldete Bugs in 4 Monaten Dauerbetrieb.",
    },
    stack: ["React", "Supabase", "Tailwind"],
    results: [
      { fr: "0 bug en 4 mois", en: "0 bugs in 4 months", de: "0 Bugs in 4 Monaten" },
      { fr: "6 semaines de build", en: "6-week build", de: "6 Wochen Entwicklung" },
    ],
    renderPreview: (a) => <DashboardPreview accent={a} />,
  },
  {
    id: "p3",
    cat: "coach",
    accent: "#8b5cf6",
    catLabel: { fr: "Coach", en: "Coach", de: "Coach" },
    title: { fr: "Portfolio & Booking", en: "Portfolio & Booking", de: "Portfolio & Buchung" },
    client: { fr: "Coach business · Lyon", en: "Business coach · Lyon", de: "Business-Coach · Lyon" },
    description: {
      fr: "Site portfolio avec intégration Cal.com pour la prise de rendez-vous, paiement Stripe pour les sessions payantes, et tunnel email automatique via Resend. Design premium qui reflète l'expertise du coach. 4 nouveaux clients signés dès le premier mois.",
      en: "Portfolio site with Cal.com integration for appointment booking, Stripe payment for paid sessions, and automated email funnel via Resend. Premium design reflecting the coach's expertise. 4 new clients signed in the first month.",
      de: "Portfolio-Website mit Cal.com-Integration für Terminbuchungen, Stripe-Zahlung für kostenpflichtige Sessions und automatisiertem E-Mail-Tunnel über Resend. Premium-Design, das die Expertise des Coaches widerspiegelt. 4 neue Kunden im ersten Monat.",
    },
    stack: ["Next.js", "Cal.com", "Stripe"],
    results: [
      { fr: "4 clients le 1er mois", en: "4 clients first month", de: "4 Kunden im 1. Monat" },
      { fr: "Livré en 10 jours", en: "Delivered in 10 days", de: "In 10 Tagen geliefert" },
    ],
    renderPreview: (a) => <CoachPreview accent={a} />,
  },
  {
    id: "p4",
    cat: "ecommerce",
    accent: "#10b981",
    catLabel: { fr: "E-commerce", en: "E-commerce", de: "E-Commerce" },
    title: { fr: "Boutique en ligne", en: "Online Store", de: "Online-Shop" },
    client: { fr: "Créatrice artisanale · Paris", en: "Artisan creator · Paris", de: "Kunsthandwerkerin · Paris" },
    description: {
      fr: "Boutique artisanale avec catalogue dynamique géré via CMS, panier persistant, checkout Stripe optimisé et emails de confirmation automatiques. UX pensée pour maximiser la conversion sur mobile. Le taux de conversion a bondi de 45% en 60 jours.",
      en: "Artisan shop with CMS-managed dynamic catalog, persistent cart, optimized Stripe checkout, and automatic confirmation emails. UX designed to maximize mobile conversion. Conversion rate jumped 45% in 60 days.",
      de: "Handwerksboutique mit CMS-verwaltetem Katalog, persistentem Warenkorb, optimiertem Stripe-Checkout und automatischen Bestätigungs-E-Mails. UX optimiert für maximale Mobile-Conversion. Conversion-Rate stieg in 60 Tagen um 45%.",
    },
    stack: ["Next.js", "Stripe", "Vercel"],
    results: [
      { fr: "+45% taux conversion", en: "+45% conversion rate", de: "+45% Conversion-Rate" },
      { fr: "24/7 sans friction", en: "24/7 friction-free", de: "24/7 reibungslos" },
    ],
    renderPreview: (a) => <EcommercePreview accent={a} />,
  },
  {
    id: "p5",
    cat: "startup",
    accent: "#0ea5e9",
    catLabel: { fr: "Startup", en: "Startup", de: "Startup" },
    title: { fr: "Landing SaaS", en: "SaaS Landing Page", de: "SaaS-Landing Page" },
    client: { fr: "Startup FinTech · Lausanne", en: "FinTech Startup · Lausanne", de: "FinTech Startup · Lausanne" },
    description: {
      fr: "Landing page haute performance pour startup FinTech avec animations CSS avancées, capture d'email intégrée, A/B testing et tunnel de conversion optimisé. Score Lighthouse 98/100 dès le jour 1. MVP fonctionnel livré en 5 jours ouvrés.",
      en: "High-performance landing page for a FinTech startup with advanced CSS animations, integrated email capture, A/B testing, and optimized conversion funnel. Lighthouse score 98/100 from day one. Functional MVP delivered in 5 business days.",
      de: "Hochleistungs-Landingpage für ein FinTech-Startup mit fortgeschrittenen CSS-Animationen, integrierter E-Mail-Erfassung, A/B-Testing und optimiertem Conversion-Funnel. Lighthouse-Score 98/100 ab dem ersten Tag. Funktionsfähiges MVP in 5 Werktagen geliefert.",
    },
    stack: ["Next.js", "Framer", "TypeScript"],
    results: [
      { fr: "MVP en 5 jours", en: "MVP in 5 days", de: "MVP in 5 Tagen" },
      { fr: "Lighthouse 98/100", en: "Lighthouse 98/100", de: "Lighthouse 98/100" },
    ],
    renderPreview: (a) => <SaasLandingPreview accent={a} />,
  },
  {
    id: "p6",
    cat: "local",
    accent: "#ec4899",
    catLabel: { fr: "Local", en: "Local", de: "Lokal" },
    title: { fr: "Site vitrine local", en: "Local Business Site", de: "Lokale Unternehmenswebsite" },
    client: { fr: "Cabinet juridique · Lausanne", en: "Law firm · Lausanne", de: "Anwaltskanzlei · Lausanne" },
    description: {
      fr: "Site vitrine SEO-first pour cabinet juridique avec balisage Schema.org, intégration Google Maps, section avis clients dynamique et formulaire de contact sécurisé. Stratégie de mots-clés locaux ciblée : position #1 sur les requêtes principales en 6 semaines.",
      en: "SEO-first showcase site for a law firm with Schema.org markup, Google Maps integration, dynamic client reviews section, and secure contact form. Targeted local keyword strategy: #1 position on main queries within 6 weeks.",
      de: "SEO-first Showcase-Website für eine Anwaltskanzlei mit Schema.org-Markup, Google Maps-Integration, dynamischem Kundenbewertungsbereich und sicherem Kontaktformular. Gezielte lokale Keyword-Strategie: Position #1 bei Hauptanfragen innerhalb von 6 Wochen.",
    },
    stack: ["Next.js", "SEO local", "Google Maps"],
    results: [
      { fr: "3–4 contacts/sem.", en: "3–4 contacts/week", de: "3–4 Kontakte/Woche" },
      { fr: "Position #1 local", en: "#1 local rank", de: "#1 lokales Ranking" },
    ],
    renderPreview: (a) => <LocalBusinessPreview accent={a} />,
  },
];

const FILTERS: { key: Category; fr: string; en: string; de: string }[] = [
  { key: "all", fr: "Tous", en: "All", de: "Alle" },
  { key: "saas", fr: "SaaS", en: "SaaS", de: "SaaS" },
  { key: "restaurant", fr: "Restaurant", en: "Restaurant", de: "Restaurant" },
  { key: "ecommerce", fr: "E-commerce", en: "E-commerce", de: "E-Commerce" },
  { key: "coach", fr: "Coach", en: "Coach", de: "Coach" },
  { key: "startup", fr: "Startup", en: "Startup", de: "Startup" },
  { key: "local", fr: "Local", en: "Local", de: "Lokal" },
];

/* ─── Project modal ──────────────────────────────────────────────────────── */

type Project = (typeof PROJECTS)[0];

function ProjectModal({
  project,
  onClose,
  locale,
  devisHref,
}: {
  project: Project;
  onClose: () => void;
  locale: string;
  devisHref: string;
}) {
  const loc = locale === "de" ? "de" : locale === "en" ? "en" : "fr";

  const ctaLabel = locale === "en" ? "Start a similar project" : locale === "de" ? "Ähnliches Projekt starten" : "Démarrer un projet similaire";
  const closeLabel = locale === "en" ? "Close" : locale === "de" ? "Schließen" : "Fermer";
  const stackLabel = locale === "en" ? "Stack" : locale === "de" ? "Stack" : "Stack";
  const resultsLabel = locale === "en" ? "Results" : locale === "de" ? "Ergebnisse" : "Résultats";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9950] flex items-center justify-center p-4"
      style={{ cursor: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.09] bg-[#08090e] shadow-2xl"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {/* Top accent line */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />

        {/* Preview strip */}
        <div className="relative h-[180px] overflow-hidden border-b border-white/[0.07]">
          {project.renderPreview(project.accent)}
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(8,9,14,0.9) 100%)" }} />
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Category + close */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <span
                className="mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}35`, color: project.accent }}
              >
                {project.catLabel[loc]}
              </span>
              <h3 className="text-xl font-extrabold text-white leading-tight">{project.title[loc]}</h3>
              <p className="mt-0.5 text-sm text-gray-500">{project.client[loc]}</p>
            </div>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              <FiX size={14} />
            </button>
          </div>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-gray-400">{project.description[loc]}</p>

          {/* Results grid */}
          <div className="mb-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-600">{resultsLabel}</div>
            <div className="flex flex-wrap gap-2">
              {project.results.map((r, i) => (
                <span
                  key={i}
                  className="rounded-full px-3 py-1.5 text-[11px] font-bold"
                  style={{ background: `${project.accent}14`, border: `1px solid ${project.accent}30`, color: project.accent }}
                >
                  {r[loc]}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="mb-6">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-600">{stackLabel}</div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={devisHref}
            onClick={onClose}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition hover:gap-3"
            style={{ background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)` }}
          >
            {ctaLabel}
            <FiArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function PortfolioSection() {
  const { locale, prefix } = useLocale();
  const [active, setActive] = useState<Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const loc = locale === "de" ? "de" : locale === "en" ? "en" : "fr";

  useEffect(() => { setMounted(true); }, []);

  const copy =
    locale === "en"
      ? { eyebrow: "Our work", title: "Projects that", title2: "deliver real results.", sub: "No mockups. No Lorem Ipsum. Only real projects, shipped to production, with measurable outcomes.", cta: "Start your project" }
      : locale === "de"
      ? { eyebrow: "Unsere Arbeit", title: "Projekte, die", title2: "echte Ergebnisse liefern.", sub: "Keine Mockups. Kein Lorem Ipsum. Nur echte Projekte, in Produktion gebracht, mit messbaren Ergebnissen.", cta: "Projekt starten" }
      : { eyebrow: "Nos réalisations", title: "Des projets qui", title2: "livrent de vrais résultats.", sub: "Pas de maquettes. Pas de Lorem Ipsum. Seulement de vrais projets, mis en production, avec des résultats mesurables.", cta: "Démarrer mon projet" };

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);
  const withPrefix = (p: string) => (prefix ? `${prefix}${p}` : p);
  const viewLabel = locale === "en" ? "View project" : locale === "de" ? "Ansehen" : "Voir le projet";

  return (
    <>
      <section className="bg-[#050509] py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
              {copy.eyebrow}
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {copy.title}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active === f.key
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                    : "border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {f[loc]}
              </button>
            ))}
          </motion.div>

          {/* Project grid */}
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => setSelected(p)}
                  className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0a0b0f] shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/[0.14] hover:shadow-2xl"
                >
                  {/* Inner glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[20px]"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.accent}10 0%, transparent 60%)` }}
                  />

                  {/* Visual preview */}
                  <div className="relative h-[210px] overflow-hidden rounded-t-[19px] border-b border-white/[0.07]">
                    {p.renderPreview(p.accent)}

                    {/* Category chip */}
                    <div
                      className="absolute left-3 top-[calc(100%-28px)] z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{ background: `${p.accent}22`, border: `1px solid ${p.accent}35`, color: p.accent }}
                    >
                      {p.catLabel[loc]}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100" style={{ background: "rgba(0,0,0,0.45)" }}>
                      <div
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ background: `${p.accent}28`, border: `1px solid ${p.accent}55`, backdropFilter: "blur(8px)" }}
                      >
                        <FiArrowUpRight size={14} />
                        {viewLabel}
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <h3 className="mb-0.5 text-[15px] font-bold text-white">
                      {p.title[loc]}
                    </h3>
                    <p className="mb-4 text-[11px] text-gray-500">{p.client[loc]}</p>

                    {/* Result metrics as inline pills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.results.map((r, j) => (
                        <span
                          key={j}
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                          style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}28`, color: p.accent }}
                        >
                          {r[loc]}
                        </span>
                      ))}
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/[0.07] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-gray-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)` }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-14 text-center"
          >
            <Link
              href={withPrefix("/devis")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
            >
              {copy.cta}
              <FiArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Project detail modal — portal to body to escape stacking contexts */}
      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <ProjectModal
              project={selected}
              onClose={() => setSelected(null)}
              locale={locale}
              devisHref={withPrefix("/devis")}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
