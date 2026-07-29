"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheck, FiX, FiZap, FiMessageCircle, FiClock, FiPlus } from "react-icons/fi";

const WA_NUMBER = "33759558414";

const PLANS = {
  fr: [
    {
      id: "starter",
      name: "Starter",
      price: "142",
      badge: null,
      badgeStyle: "",
      tagline: "Présence en ligne propre et rapide. Une page qui donne confiance dès le premier regard.",
      delivery: "Livré en 5 jours",
      highlight: false,
      accent: "blue",
      includes: [
        "1 landing page complète",
        "Section hero + services + contact",
        "Formulaire de contact",
        "Design responsive mobile",
        "SEO technique de base",
        "Hébergement 1 mois offert",
        "Livraison en 5 jours ouvrés",
      ],
      excludes: [
        "SEO avancé",
        "Logo / branding",
        "Multi-pages",
        "Automatisation",
        "Chatbot IA",
        "Modifications illimitées",
      ],
      cta: "Lancer avec 142 €",
      note: "Sans engagement · Paiement après livraison",
    },
    {
      id: "business",
      name: "Business",
      price: "390",
      badge: "Le meilleur choix",
      badgeStyle: "violet",
      tagline: "Le site professionnel complet qui convertit les visiteurs en clients et s'impose face à la concurrence.",
      delivery: "Livré en 14 jours",
      highlight: true,
      accent: "violet",
      includes: [
        "Jusqu'à 6 pages",
        "SEO technique complet inclus",
        "Design premium niveau SaaS",
        "Animations & micro-interactions",
        "Formulaire devis + WhatsApp",
        "Core Web Vitals 95+",
        "3 retouches incluses",
        "2 mois de support offert",
        "Livraison en 14 jours",
      ],
      excludes: [],
      cta: "Je veux ce site",
      note: "Le plus demandé · Prix fixe garanti",
    },
    {
      id: "ai",
      name: "Agent IA vertical",
      price: "890",
      badge: "Agent inclus",
      badgeStyle: "amber",
      tagline: "Un agent IA branché sur votre métier, qui travaille pour vous 24h/24 — sur le modèle de KAH Workforce.",
      delivery: "Livré en 28 jours",
      highlight: false,
      accent: "amber",
      includes: [
        "Tout le plan Business",
        "Agent IA vertical personnalisé",
        "Qualification leads automatique",
        "Automatisation emails & CRM",
        "Tunnel de conversion optimisé",
        "SEO avancé + pages locales",
        "Copywriting premium inclus",
        "Stratégie d'acquisition offerte",
        "3 mois support prioritaire",
      ],
      excludes: [],
      cta: "Je veux mon agent IA",
      note: "Tout inclus · ROI mesurable dès J+30",
    },
  ],
  en: [
    {
      id: "starter",
      name: "Starter",
      price: "142",
      badge: null,
      badgeStyle: "",
      tagline: "Clean and fast online presence. One page that builds trust from the first look.",
      delivery: "Delivered in 5 days",
      highlight: false,
      accent: "blue",
      includes: [
        "1 complete landing page",
        "Hero + services + contact sections",
        "Contact form",
        "Responsive mobile design",
        "Basic technical SEO",
        "1 month hosting included",
        "Delivered in 5 business days",
      ],
      excludes: [
        "Advanced SEO",
        "Logo / branding",
        "Multi-page",
        "Automation",
        "AI chatbot",
        "Unlimited revisions",
      ],
      cta: "Start for $142",
      note: "No commitment · Payment after delivery",
    },
    {
      id: "business",
      name: "Business",
      price: "390",
      badge: "Best choice",
      badgeStyle: "violet",
      tagline: "The complete professional site that turns visitors into clients and outperforms competitors.",
      delivery: "Delivered in 14 days",
      highlight: true,
      accent: "violet",
      includes: [
        "Up to 6 pages",
        "Full technical SEO included",
        "SaaS-level premium design",
        "Animations & micro-interactions",
        "Quote form + WhatsApp",
        "Core Web Vitals 95+",
        "3 revisions included",
        "2 months support included",
        "Delivered in 14 days",
      ],
      excludes: [],
      cta: "Get this site",
      note: "Most requested · Fixed price guaranteed",
    },
    {
      id: "ai",
      name: "Vertical AI Agent",
      price: "890",
      badge: "Agent included",
      badgeStyle: "amber",
      tagline: "An AI agent wired into your business, working for you 24/7 — built on the KAH Workforce model.",
      delivery: "Delivered in 28 days",
      highlight: false,
      accent: "amber",
      includes: [
        "Everything in Business",
        "Custom vertical AI agent",
        "Automatic lead qualification",
        "Email & CRM automations",
        "Optimised conversion funnel",
        "Advanced SEO + local pages",
        "Premium copywriting included",
        "Acquisition strategy included",
        "3 months priority support",
      ],
      excludes: [],
      cta: "I want my AI agent",
      note: "All included · Measurable ROI from D+30",
    },
  ],
  de: [
    {
      id: "starter",
      name: "Starter",
      price: "149",
      badge: null,
      badgeStyle: "",
      tagline: "Saubere und schnelle Online-Präsenz. Eine Seite, die vom ersten Blick an Vertrauen schafft.",
      delivery: "Geliefert in 5 Tagen",
      highlight: false,
      accent: "blue",
      includes: [
        "1 vollständige Landing Page",
        "Hero + Services + Kontakt",
        "Kontaktformular",
        "Responsives mobiles Design",
        "Technisches Basis-SEO",
        "1 Monat Hosting inklusive",
        "Lieferung in 5 Werktagen",
      ],
      excludes: [
        "Erweitertes SEO",
        "Logo / Branding",
        "Mehrere Seiten",
        "Automatisierung",
        "KI-Chatbot",
        "Unbegrenzte Änderungen",
      ],
      cta: "Für CHF 149 starten",
      note: "Unverbindlich · Zahlung nach Lieferung",
    },
    {
      id: "business",
      name: "Business",
      price: "420",
      badge: "Beste Wahl",
      badgeStyle: "violet",
      tagline: "Die vollständige professionelle Website, die Besucher in Kunden verwandelt und Mitbewerber aussticht.",
      delivery: "Geliefert in 14 Tagen",
      highlight: true,
      accent: "violet",
      includes: [
        "Bis zu 6 Seiten",
        "Vollständiges technisches SEO",
        "SaaS-Level Premium-Design",
        "Animationen & Micro-Interactions",
        "Angebotsformular + WhatsApp",
        "Core Web Vitals 95+",
        "3 Korrekturen inklusive",
        "2 Monate Support inklusive",
        "Lieferung in 14 Tagen",
      ],
      excludes: [],
      cta: "Diese Website wählen",
      note: "Am meisten gefragt · Fester Preis garantiert",
    },
    {
      id: "ai",
      name: "Vertikaler KI-Agent",
      price: "950",
      badge: "Agent inklusive",
      badgeStyle: "amber",
      tagline: "Ein KI-Agent, der in Ihr Geschäft eingebettet ist und 24/7 für Sie arbeitet — nach dem Vorbild von KAH Workforce.",
      delivery: "Geliefert in 28 Tagen",
      highlight: false,
      accent: "amber",
      includes: [
        "Alles aus Business",
        "Individueller vertikaler KI-Agent",
        "Automatische Lead-Qualifizierung",
        "E-Mail- & CRM-Automatisierungen",
        "Optimierter Conversion-Funnel",
        "Erweitertes SEO + lokale Seiten",
        "Premium-Copywriting inklusive",
        "Akquisitionsstrategie inklusive",
        "3 Monate Prioritäts-Support",
      ],
      excludes: [],
      cta: "Meinen KI-Agenten erhalten",
      note: "Alles inklusive · Messbarer ROI ab T+30",
    },
  ],
};

const OPTIONS = {
  fr: [
    { icon: "📄", label: "Page supplémentaire", price: "89 €" },
    { icon: "🔍", label: "SEO avancé", price: "249 €" },
    { icon: "🎨", label: "Logo simple", price: "149 €" },
    { icon: "🤖", label: "Chatbot IA", price: "349 €" },
    { icon: "⚙️", label: "Automatisation", price: "dès 490 €" },
    { icon: "🛠️", label: "Maintenance mensuelle", price: "89 €/mois" },
  ],
  en: [
    { icon: "📄", label: "Extra page", price: "$89" },
    { icon: "🔍", label: "Advanced SEO", price: "$249" },
    { icon: "🎨", label: "Simple logo", price: "$149" },
    { icon: "🤖", label: "AI chatbot", price: "$349" },
    { icon: "⚙️", label: "Automation", price: "from $490" },
    { icon: "🛠️", label: "Monthly maintenance", price: "$89/mo" },
  ],
  de: [
    { icon: "📄", label: "Zusätzliche Seite", price: "CHF 99" },
    { icon: "🔍", label: "Erweitertes SEO", price: "CHF 270" },
    { icon: "🎨", label: "Einfaches Logo", price: "CHF 160" },
    { icon: "🤖", label: "KI-Chatbot", price: "CHF 380" },
    { icon: "⚙️", label: "Automatisierung", price: "ab CHF 530" },
    { icon: "🛠️", label: "Monatliche Wartung", price: "CHF 99/Mt." },
  ],
};

const ACCENT_CARD = {
  blue: "border-white/10 bg-white/[0.025] backdrop-blur-sm hover:border-blue-500/20 hover:bg-white/[0.04]",
  violet: "border-violet-500/40 bg-gradient-to-b from-violet-600/12 to-violet-600/4 backdrop-blur-md shadow-2xl shadow-violet-500/20 ring-1 ring-violet-500/20",
  amber: "border-amber-500/20 bg-gradient-to-b from-amber-500/6 to-transparent backdrop-blur-sm hover:border-amber-500/35 hover:shadow-lg hover:shadow-amber-500/10",
};
const ACCENT_CHECK = { blue: "text-blue-400", violet: "text-violet-400", amber: "text-amber-400" };
const ACCENT_DELIVERY = { blue: "text-blue-400", violet: "text-violet-300", amber: "text-amber-400" };
const ACCENT_CTA = {
  blue: "border border-white/15 text-white hover:border-blue-400/40 hover:bg-blue-500/8",
  violet: "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50",
  amber: "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
};
const BADGE_STYLE = {
  violet: "border-violet-500/40 bg-violet-500/15 text-violet-200",
  amber: "border-amber-500/30 bg-amber-500/15 text-amber-300",
};

export function PricingSection() {
  const { locale, prefix } = useLocale();

  const plans = PLANS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];
  const options = OPTIONS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];
  const isEN = locale === "en";
  const isDE = locale === "de";

  const copy =
    isEN ? {
      eyebrow: "Transparent pricing",
      title: "Start from",
      titlePrice: "$142.",
      title2: "Scale as you grow.",
      sub: "Attract with $142 · Convert with $390 · Get your vertical AI agent from $890. Each plan is a step toward autonomy.",
      urgency: "⚡ Limited spots — only 3 Starter projects per week",
      optionsTitle: "Add-on options",
      optionsSub: "Personalise your project. Add only what you need.",
      bottomCta: "Get my free quote",
      bottomWa: "Chat on WhatsApp",
      waText: "Hi KAH Digital, I'd like a quote for my project.",
      bottomNote: "No commitment · Fixed price · Reply within 24h",
    } : isDE ? {
      eyebrow: "Transparente Preise",
      title: "Ab",
      titlePrice: "CHF 149.",
      title2: "Wachsen Sie mit uns.",
      sub: "Einstieg mit CHF 149 · Konvertieren mit CHF 420 · Ihr vertikaler KI-Agent ab CHF 950. Jeder Plan ist ein Schritt zur Autonomie.",
      urgency: "⚡ Begrenzte Plätze — nur 3 Starter-Projekte pro Woche",
      optionsTitle: "Zusatzoptionen",
      optionsSub: "Passen Sie Ihr Projekt an. Fügen Sie nur das hinzu, was Sie brauchen.",
      bottomCta: "Kostenlose Offerte erhalten",
      bottomWa: "WhatsApp schreiben",
      waText: "Hallo KAH Digital, ich möchte ein Projekt besprechen.",
      bottomNote: "Unverbindlich · Fester Preis · Antwort in 24h",
    } : {
      eyebrow: "Tarifs transparents",
      title: "Démarrez à",
      titlePrice: "142 €.",
      title2: "Montez en puissance.",
      sub: "Attirez avec 142 € · Convertissez avec 390 € · Votre agent IA vertical dès 890 €. Chaque plan est une étape vers l'autonomie.",
      urgency: "⚡ Places limitées — seulement 3 projets Starter par semaine",
      optionsTitle: "Options à la carte",
      optionsSub: "Personnalisez votre projet. Ajoutez uniquement ce dont vous avez besoin.",
      bottomCta: "Obtenir mon devis gratuit",
      bottomWa: "Écrire sur WhatsApp",
      waText: "Bonjour KAH Digital, je voudrais discuter d'un projet.",
      bottomNote: "Sans engagement · Prix fixe · Réponse sous 24h",
    };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="bg-gray-950 py-28" id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Urgency strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-xs font-bold text-amber-300">
            {copy.urgency}
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-semibold text-violet-300">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              {copy.titlePrice}
            </span>{" "}
            {copy.title2}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${ACCENT_CARD[plan.accent as keyof typeof ACCENT_CARD]}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold shadow-lg ${BADGE_STYLE[plan.badgeStyle as keyof typeof BADGE_STYLE]}`}>
                    <FiZap size={10} />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Name */}
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">{plan.name}</p>

              {/* Price */}
              <div className="mb-2 flex items-end gap-1">
                {isEN && <span className="mb-2 text-2xl font-black text-gray-400">$</span>}
                {isDE && <span className="mb-2 mr-1 text-xl font-bold text-gray-400">CHF</span>}
                <span className={`text-6xl font-black leading-none tracking-tighter ${plan.highlight ? "text-white" : "text-white"}`}>{plan.price}</span>
                {!isEN && !isDE && <span className="mb-2 ml-1 text-2xl font-black text-gray-400">€</span>}
              </div>

              {/* Delivery */}
              <div className={`mb-4 flex items-center gap-1.5 text-sm font-semibold ${ACCENT_DELIVERY[plan.accent as keyof typeof ACCENT_DELIVERY]}`}>
                <FiClock size={13} />
                {plan.delivery}
              </div>

              <p className="mb-5 text-sm leading-relaxed text-gray-400">{plan.tagline}</p>
              <div className="mb-5 h-px bg-white/8" />

              {/* Included */}
              <ul className="mb-4 flex-1 space-y-2.5">
                {plan.includes.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <FiCheck size={14} className={`mt-0.5 shrink-0 ${ACCENT_CHECK[plan.accent as keyof typeof ACCENT_CHECK]}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Excluded (Starter only) */}
              {plan.excludes.length > 0 && (
                <>
                  <div className="mb-3 mt-2 h-px bg-white/5" />
                  <ul className="mb-5 space-y-2">
                    {plan.excludes.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <FiX size={13} className="mt-0.5 shrink-0 text-gray-700" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* CTA */}
              <Link
                href={withPrefix("/devis")}
                className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all hover:gap-3 ${ACCENT_CTA[plan.accent as keyof typeof ACCENT_CTA]}`}
              >
                {plan.cta}
                <FiArrowRight size={14} />
              </Link>
              <p className="mt-3 text-center text-xs text-gray-600">{plan.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Options à la carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-14"
        >
          <div className="mb-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <FiPlus size={15} className="text-gray-500" />
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{copy.optionsTitle}</p>
            </div>
            <p className="text-sm text-gray-500">{copy.optionsSub}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {options.map((opt) => (
              <div
                key={opt.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-4 text-center transition hover:border-white/15 hover:bg-white/[0.04]"
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="text-xs font-semibold text-gray-300">{opt.label}</p>
                <p className="text-xs font-bold text-white">{opt.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 rounded-2xl border border-white/8 bg-gradient-to-r from-violet-950/40 to-blue-950/30 p-8 text-center"
        >
          <p className="mb-6 text-sm text-gray-400">
            {isEN
              ? "Not sure which plan? We'll help you choose in 2 minutes."
              : isDE
              ? "Nicht sicher welcher Plan? Wir helfen Ihnen in 2 Minuten."
              : "Pas sûr du plan ? On vous aide à choisir en 2 minutes."}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={withPrefix("/devis")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/40 hover:gap-3"
            >
              {copy.bottomCta}
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/15 transition hover:brightness-110"
            >
              <FiMessageCircle size={14} />
              {copy.bottomWa}
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">{copy.bottomNote}</p>
        </motion.div>

      </div>
    </section>
  );
}
