"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Category = "all" | "saas" | "restaurant" | "ecommerce" | "coach" | "startup" | "local";

const PROJECTS = [
  {
    id: "p1",
    cat: "restaurant" as Category,
    gradient: "from-orange-600/30 via-amber-600/20 to-transparent",
    accent: "#f97316",
    title: { fr: "Réservations en ligne", en: "Online Reservations", de: "Online-Reservierungen" },
    client: { fr: "Restaurant gastronomique · Genève", en: "Fine dining · Geneva", de: "Gourmetrestaurant · Genf" },
    stack: ["Next.js", "Stripe", "Resend"],
    results: [
      { fr: "+30% réservations", en: "+30% bookings", de: "+30% Reservierungen" },
      { fr: "Temps de charge < 1s", en: "Load time < 1s", de: "Ladezeit < 1s" },
    ],
  },
  {
    id: "p2",
    cat: "saas" as Category,
    gradient: "from-blue-600/30 via-cyan-600/20 to-transparent",
    accent: "#3b82f6",
    title: { fr: "Dashboard PME", en: "SME Dashboard", de: "KMU-Dashboard" },
    client: { fr: "Startup B2B · Fribourg", en: "B2B Startup · Fribourg", de: "B2B Startup · Freiburg" },
    stack: ["React", "Supabase", "Tailwind"],
    results: [
      { fr: "0 bug en 4 mois", en: "0 bugs in 4 months", de: "0 Bugs in 4 Monaten" },
      { fr: "6 semaines de build", en: "6-week build", de: "6 Wochen Entwicklung" },
    ],
  },
  {
    id: "p3",
    cat: "coach" as Category,
    gradient: "from-violet-600/30 via-purple-600/20 to-transparent",
    accent: "#8b5cf6",
    title: { fr: "Portfolio & Booking", en: "Portfolio & Booking", de: "Portfolio & Buchung" },
    client: { fr: "Coach business · Lyon", en: "Business coach · Lyon", de: "Business-Coach · Lyon" },
    stack: ["Next.js", "Cal.com", "Stripe"],
    results: [
      { fr: "4 clients le 1er mois", en: "4 clients first month", de: "4 Kunden im 1. Monat" },
      { fr: "Livré en 10 jours", en: "Delivered in 10 days", de: "In 10 Tagen geliefert" },
    ],
  },
  {
    id: "p4",
    cat: "ecommerce" as Category,
    gradient: "from-emerald-600/30 via-green-600/20 to-transparent",
    accent: "#10b981",
    title: { fr: "Boutique en ligne", en: "Online Store", de: "Online-Shop" },
    client: { fr: "Créatrice artisanale · Paris", en: "Artisan creator · Paris", de: "Kunsthandwerkerin · Paris" },
    stack: ["Next.js", "Stripe", "Vercel"],
    results: [
      { fr: "+45% taux conversion", en: "+45% conversion rate", de: "+45% Conversion-Rate" },
      { fr: "24/7 sans friction", en: "24/7 friction-free", de: "24/7 reibungslos" },
    ],
  },
  {
    id: "p5",
    cat: "startup" as Category,
    gradient: "from-sky-600/30 via-blue-600/20 to-transparent",
    accent: "#0ea5e9",
    title: { fr: "Landing SaaS", en: "SaaS Landing Page", de: "SaaS-Landing Page" },
    client: { fr: "Startup FinTech · Lausanne", en: "FinTech Startup · Lausanne", de: "FinTech Startup · Lausanne" },
    stack: ["Next.js", "Framer", "TypeScript"],
    results: [
      { fr: "MVP en 5 jours", en: "MVP in 5 days", de: "MVP in 5 Tagen" },
      { fr: "Lighthouse 98/100", en: "Lighthouse 98/100", de: "Lighthouse 98/100" },
    ],
  },
  {
    id: "p6",
    cat: "local" as Category,
    gradient: "from-pink-600/30 via-rose-600/20 to-transparent",
    accent: "#ec4899",
    title: { fr: "Site vitrine local", en: "Local Business Site", de: "Lokale Unternehmenswebsite" },
    client: { fr: "Cabinet juridique · Lausanne", en: "Law firm · Lausanne", de: "Anwaltskanzlei · Lausanne" },
    stack: ["Next.js", "SEO local", "Google Maps"],
    results: [
      { fr: "3–4 contacts/sem.", en: "3–4 contacts/week", de: "3–4 Kontakte/Woche" },
      { fr: "Position #1 local", en: "#1 local rank", de: "#1 lokales Ranking" },
    ],
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

export function PortfolioSection() {
  const { locale, prefix } = useLocale();
  const [active, setActive] = useState<Category>("all");

  const copy =
    locale === "en"
      ? {
          eyebrow: "Our work",
          title: "Projects that",
          title2: "deliver real results.",
          sub: "No mockups. No Lorem Ipsum. Only real projects, shipped to production, with measurable outcomes.",
          cta: "Start your project",
        }
      : locale === "de"
      ? {
          eyebrow: "Unsere Arbeit",
          title: "Projekte, die",
          title2: "echte Ergebnisse liefern.",
          sub: "Keine Mockups. Kein Lorem Ipsum. Nur echte Projekte, in Produktion gebracht, mit messbaren Ergebnissen.",
          cta: "Projekt starten",
        }
      : {
          eyebrow: "Nos réalisations",
          title: "Des projets qui",
          title2: "livrent de vrais résultats.",
          sub: "Pas de maquettes. Pas de Lorem Ipsum. Seulement de vrais projets, mis en production, avec des résultats mesurables.",
          cta: "Démarrer mon projet",
        };

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);
  const withPrefix = (p: string) => (prefix ? `${prefix}${p}` : p);

  return (
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
              {f[locale === "de" ? "de" : locale === "en" ? "en" : "fr"]}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] transition-all duration-300 hover:border-white/16 hover:-translate-y-1"
              >
                {/* Visual preview */}
                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, ${p.accent}40 0%, transparent 60%)`,
                    }}
                  />
                  {/* Grid overlay (tech feel) */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `linear-gradient(${p.accent}80 1px, transparent 1px), linear-gradient(90deg, ${p.accent}80 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />
                  {/* Hover reveal CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
                      style={{ background: `${p.accent}30`, border: `1px solid ${p.accent}50` }}
                    >
                      <FiArrowUpRight size={14} />
                      {locale === "en" ? "View project" : locale === "de" ? "Projekt ansehen" : "Voir le projet"}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-0.5 font-bold text-white">
                    {p.title[locale === "de" ? "de" : locale === "en" ? "en" : "fr"]}
                  </h3>
                  <p className="mb-4 text-xs text-gray-500">
                    {p.client[locale === "de" ? "de" : locale === "en" ? "en" : "fr"]}
                  </p>

                  {/* Results */}
                  <div className="mb-4 space-y-1.5">
                    {p.results.map((r, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                        <span className="text-xs text-gray-300">
                          {r[locale === "de" ? "de" : locale === "en" ? "en" : "fr"]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
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
  );
}
