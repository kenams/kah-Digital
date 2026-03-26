"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiClock, FiLayers, FiMessageSquare, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      kicker: "Sites premium, IA utile, automatisations propres",
      title: "Un site qui vend mieux. Une IA qui fait gagner du temps.",
      highlight: "Pas une vitrine generique.",
      body:
        "KAH-Digital concoit des sites, assistants IA et outils metier qui rendent l'offre plus lisible, les demandes plus qualifiees et l'execution plus simple a suivre.",
      primary: "Demander un cadrage",
      secondary: "Voir ce que l'on construit",
      tertiary: "Voir les automatisations IA",
      badges: ["Capter", "Automatiser", "Operer"],
      metrics: [
        { label: "Plan et budget", value: "48h" },
        { label: "Sprint type", value: "2-6 semaines" },
        { label: "Langues", value: "FR / EN / DE" },
      ],
      boardTitle: "Systeme KAH",
      boardLead: "Trois leviers lisibles pour transformer un besoin flou en systeme utile, vendable et exploitable.",
      boardItems: [
        {
          icon: FiLayers,
          title: "Capter",
          body: "Landing pages, site premium, offre claire et parcours de conversion plus net.",
          signal: "Plus de demandes qualifiees",
        },
        {
          icon: FiMessageSquare,
          title: "Automatiser",
          body: "Assistant IA, qualification, reponses utiles et relais propre vers l'humain.",
          signal: "Moins de repetition support",
        },
        {
          icon: FiZap,
          title: "Operer",
          body: "Portail client, tableau de bord et logique metier pour avancer sans friction.",
          signal: "Execution plus rapide",
        },
      ],
      trust: [
        "Approche business avant effet de mode",
        "Design premium pense pour mobile et desktop",
        "Automatisation branchee au vrai terrain",
      ],
    },
    en: {
      kicker: "Premium websites, useful AI, clean automations",
      title: "A website that converts better. AI that saves real time.",
      highlight: "Not another generic agency page.",
      body:
        "KAH-Digital builds websites, AI assistants, and business tools that make the offer clearer, the leads better qualified, and the execution easier to run.",
      primary: "Request scoped guidance",
      secondary: "See what we build",
      tertiary: "See AI automations",
      badges: ["Capture", "Automate", "Operate"],
      metrics: [
        { label: "Plan and budget", value: "48h" },
        { label: "Typical sprint", value: "2-6 weeks" },
        { label: "Languages", value: "FR / EN / DE" },
      ],
      boardTitle: "KAH system",
      boardLead: "Three clear levers to turn a vague request into a useful, sellable, and operational system.",
      boardItems: [
        {
          icon: FiLayers,
          title: "Capture",
          body: "Landing pages, premium websites, clear offers, and a sharper conversion path.",
          signal: "More qualified leads",
        },
        {
          icon: FiMessageSquare,
          title: "Automate",
          body: "AI assistant, qualification, useful replies, and a clean handoff to humans.",
          signal: "Less repetitive support",
        },
        {
          icon: FiZap,
          title: "Operate",
          body: "Client portal, dashboard, and business logic to move faster with less friction.",
          signal: "Cleaner execution",
        },
      ],
      trust: [
        "Business-first framing over hype",
        "Premium design for desktop and mobile",
        "Automation connected to real operations",
      ],
    },
    de: {
      kicker: "Premium-Websites, nuetzliche KI, saubere Automatisierungen",
      title: "Eine Website, die besser konvertiert. KI, die echte Zeit spart.",
      highlight: "Keine generische Agentur-Seite.",
      body:
        "KAH-Digital entwickelt Websites, KI-Assistenten und Business-Tools, die das Angebot klarer machen, Anfragen besser qualifizieren und die Umsetzung leichter steuerbar halten.",
      primary: "Sauberes Briefing anfragen",
      secondary: "Sehen, was wir bauen",
      tertiary: "KI-Automation ansehen",
      badges: ["Erfassen", "Automatisieren", "Umsetzen"],
      metrics: [
        { label: "Plan und Budget", value: "48h" },
        { label: "Typischer Sprint", value: "2-6 Wochen" },
        { label: "Sprachen", value: "FR / EN / DE" },
      ],
      boardTitle: "KAH System",
      boardLead: "Drei klare Hebel, um aus einer unklaren Anfrage ein nuetzliches, verkaufbares und betreibbares System zu machen.",
      boardItems: [
        {
          icon: FiLayers,
          title: "Erfassen",
          body: "Landingpages, Premium-Website, klares Angebot und sauberer Conversion-Pfad.",
          signal: "Mehr qualifizierte Anfragen",
        },
        {
          icon: FiMessageSquare,
          title: "Automatisieren",
          body: "KI-Assistent, Qualifizierung, nuetzliche Antworten und saubere Uebergabe an Menschen.",
          signal: "Weniger repetitiver Support",
        },
        {
          icon: FiZap,
          title: "Umsetzen",
          body: "Kundenportal, Dashboard und Business-Logik fuer schnellere Ausfuehrung.",
          signal: "Sauberere Umsetzung",
        },
      ],
      trust: [
        "Business zuerst statt Buzzwords",
        "Premium Design fuer Desktop und Mobile",
        "Automatisierung nah an der Realitaet",
      ],
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(10,9,8,0.96),rgba(19,17,14,0.96))] shadow-[0_40px_140px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,179,106,0.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(127,184,199,0.16),transparent_28%)]" />
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-white/10 lg:block" />
        <div className="relative grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr,0.9fr] lg:px-10 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="gradient-pill rounded-full px-4 py-1 text-[0.7rem] uppercase tracking-[0.28em]">{copy.kicker}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                <FiClock className="text-[#d6b36a]" />
                {copy.metrics[0].label} {copy.metrics[0].value}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                {copy.title}
                <span className="gradient-text block">{copy.highlight}</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg">{copy.body}</p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              {copy.badges.map((badge) => (
                <span key={badge} className="orbit-badge">
                  <span className="orbit-dot" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={withPrefix("/devis")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200"
              >
                {copy.primary}
                <FiArrowRight className="text-black/60" />
              </Link>
              <Link
                href={withPrefix("/services")}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-semibold text-white/90 transition hover:border-white hover:text-white"
              >
                {copy.secondary}
              </Link>
              <Link
                href={withPrefix("/automatisation-ia-entreprise")}
                className="inline-flex items-center justify-center rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-6 py-3 font-semibold text-[#f3ddb0] transition hover:border-[#d6b36a]/60 hover:bg-[#d6b36a]/15"
              >
                {copy.tertiary}
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {copy.metrics.map((item) => (
                <div key={item.label} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {copy.trust.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/68">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[#d6b36a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="hero-visual p-5 sm:p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/55">
                <span>{copy.boardTitle}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] text-white/65">Live map</span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/68">{copy.boardLead}</p>
              <div className="mt-6 space-y-3">
                {copy.boardItems.map((item, index) => (
                  <div key={item.title} className="hero-panel">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/6 text-[#f3ddb0]">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/40">0{index + 1}</p>
                          <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                        </div>
                      </div>
                      <span className="rounded-full border border-[#7fb8c7]/30 bg-[#7fb8c7]/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#cfe7ee]">
                        {item.signal}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/68">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
