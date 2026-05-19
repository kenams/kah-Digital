"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheck, FiZap, FiMessageCircle, FiClock } from "react-icons/fi";

const WA_NUMBER = "33759558414";

// FR = € (France/Belgique), EN = $ (international), DE = CHF (Suisse alémanique)
function fmtPrice(amount: string, locale: string) {
  if (locale === "en") return `$${amount}`;
  if (locale === "de") return `CHF ${amount}`;
  return `${amount} €`;
}

const PLANS = {
  fr: [
    {
      id: "starter",
      name: "Starter",
      price: "99",
      tagline: "Présence en ligne rapide et professionnelle",
      deliveryLabel: "Livré en 5 jours",
      highlight: false,
      badge: null,
      accentColor: "blue",
      features: [
        "Landing page premium (1 page)",
        "Design moderne responsive",
        "Mobile-first",
        "Formulaire de contact + WhatsApp",
        "90+ Lighthouse",
        "Démarrage en 48h",
      ],
      cta: "Démarrer maintenant",
      href: "/devis",
      note: "Sans engagement · Devis ferme en 24h",
    },
    {
      id: "business",
      name: "Business",
      price: "299",
      tagline: "Site complet avec SEO, animations et support",
      deliveryLabel: "Livré en 14 jours",
      highlight: true,
      badge: "Le plus populaire",
      accentColor: "violet",
      features: [
        "Site multi-pages (jusqu'à 8 pages)",
        "SEO de base inclus",
        "Design premium + animations",
        "95+ Lighthouse",
        "Formulaire devis + réseaux sociaux",
        "1 mois de support inclus",
        "Démarrage en 48h",
      ],
      cta: "Je veux ce plan",
      href: "/devis",
      note: "Le plus demandé · Budget ferme garanti",
    },
    {
      id: "ai",
      name: "Premium AI",
      price: "699",
      tagline: "Système IA complet qui génère des leads",
      deliveryLabel: "Livré en 28 jours",
      highlight: false,
      badge: "IA incluse",
      accentColor: "amber",
      features: [
        "Tout le plan Business inclus",
        "Chatbot IA personnalisé",
        "Automatisations business",
        "Tunnel de conversion",
        "SEO avancé + pages locales",
        "Dashboard analytics",
        "Paiements Stripe intégrés",
        "3 mois support prioritaire",
      ],
      cta: "Obtenir le système IA",
      href: "/devis",
      note: "Tout inclus · ROI mesurable",
    },
  ],
  en: [
    {
      id: "starter",
      name: "Starter",
      price: "99",
      tagline: "Fast, professional online presence",
      deliveryLabel: "Delivered in 5 days",
      highlight: false,
      badge: null,
      accentColor: "blue",
      features: [
        "Premium landing page (1 page)",
        "Modern responsive design",
        "Mobile-first",
        "Contact form + WhatsApp",
        "90+ Lighthouse",
        "Kickoff in 48h",
      ],
      cta: "Start now",
      href: "/devis",
      note: "No commitment · Fixed quote in 24h",
    },
    {
      id: "business",
      name: "Business",
      price: "299",
      tagline: "Full site with SEO, animations and support",
      deliveryLabel: "Delivered in 14 days",
      highlight: true,
      badge: "Most popular",
      accentColor: "violet",
      features: [
        "Multi-page site (up to 8 pages)",
        "Basic SEO included",
        "Premium design + animations",
        "95+ Lighthouse",
        "Quote form + social media",
        "1 month support included",
        "Kickoff in 48h",
      ],
      cta: "Get this plan",
      href: "/devis",
      note: "Most requested · Fixed budget guaranteed",
    },
    {
      id: "ai",
      name: "Premium AI",
      price: "699",
      tagline: "Complete AI system that generates leads",
      deliveryLabel: "Delivered in 28 days",
      highlight: false,
      badge: "AI included",
      accentColor: "amber",
      features: [
        "Everything in Business included",
        "Custom AI chatbot",
        "Business automations",
        "Conversion funnel",
        "Advanced SEO + local pages",
        "Analytics dashboard",
        "Stripe payments integrated",
        "3 months priority support",
      ],
      cta: "Get the AI system",
      href: "/devis",
      note: "All included · Measurable ROI",
    },
  ],
  de: [
    {
      id: "starter",
      name: "Starter",
      price: "99",
      tagline: "Schneller, professioneller Online-Auftritt",
      deliveryLabel: "Geliefert in 5 Tagen",
      highlight: false,
      badge: null,
      accentColor: "blue",
      features: [
        "Premium Landing Page (1 Seite)",
        "Modernes responsives Design",
        "Mobile-first",
        "Kontaktformular + WhatsApp",
        "90+ Lighthouse",
        "Start in 48h",
      ],
      cta: "Jetzt starten",
      href: "/devis",
      note: "Unverbindlich · Festes Angebot in 24h",
    },
    {
      id: "business",
      name: "Business",
      price: "299",
      tagline: "Vollständige Website mit SEO, Animationen und Support",
      deliveryLabel: "Geliefert in 14 Tagen",
      highlight: true,
      badge: "Am beliebtesten",
      accentColor: "violet",
      features: [
        "Mehrseitige Website (bis zu 8 Seiten)",
        "Basis-SEO inklusive",
        "Premium-Design + Animationen",
        "95+ Lighthouse",
        "Angebotsformular + Social Media",
        "1 Monat Support inklusive",
        "Start in 48h",
      ],
      cta: "Diesen Plan wählen",
      href: "/devis",
      note: "Am meisten gefragt · Festes Budget garantiert",
    },
    {
      id: "ai",
      name: "Premium AI",
      price: "699",
      tagline: "Vollständiges KI-System, das Leads generiert",
      deliveryLabel: "Geliefert in 28 Tagen",
      highlight: false,
      badge: "KI inklusive",
      accentColor: "amber",
      features: [
        "Alles aus Business inklusive",
        "Individueller KI-Chatbot",
        "Business-Automatisierungen",
        "Conversion-Funnel",
        "Erweitertes SEO + lokale Seiten",
        "Analytics-Dashboard",
        "Stripe-Zahlungen integriert",
        "3 Monate Prioritäts-Support",
      ],
      cta: "KI-System erhalten",
      href: "/devis",
      note: "Alles inklusive · Messbarer ROI",
    },
  ],
};

const ACCENT = {
  blue: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    delivery: "text-blue-400",
    check: "text-blue-400",
    cta: "border border-white/15 text-white hover:border-blue-400/40 hover:bg-blue-500/8",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-200 border-violet-500/40",
    delivery: "text-violet-300",
    check: "text-violet-400",
    cta: "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    delivery: "text-amber-400",
    check: "text-amber-400",
    cta: "border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
  },
};

export function PricingSection() {
  const { locale, prefix } = useLocale();

  const plans = PLANS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];

  // Currency label inline for copy text
  const currencyLabel = locale === "en" ? "$99" : locale === "de" ? "CHF 99" : "99 €";
  const currencyCode = locale === "en" ? "$" : locale === "de" ? "CHF" : "€";

  const copy =
    locale === "en"
      ? {
          eyebrow: "Transparent pricing",
          title: "From",
          titlePrice: "$99.",
          title2: "No surprises.",
          sub: "Fixed prices, rapid delivery. Once you validate and send your assets (photos, colours, fonts), our team launches immediately.",
          urgency: "⚡ Limited slots available this month",
          launchNote: "To launch in 48h: send your photos · colours · font — we handle the rest",
          bottomCta: "Get my free quote",
          bottomWa: "Chat on WhatsApp",
          waText: "Hi KAH Digital, I'd like to discuss a project.",
          bottomNote: "No commitment · Budget discussed · Reply within 24h",
          notSure: "Not sure which plan? Describe your project in 2 lines.",
          notSureAction: "Get a free recommendation →",
        }
      : locale === "de"
      ? {
          eyebrow: "Transparente Preise",
          title: "Ab",
          titlePrice: "CHF 99.",
          title2: "Keine Überraschungen.",
          sub: "Feste Preise, schnelle Lieferung. Sobald Sie bestätigen und Ihre Assets senden (Fotos, Farben, Schrift), startet unser Team sofort.",
          urgency: "⚡ Begrenzte Plätze diesen Monat",
          launchNote: "Für Start in 48h: Fotos · Farben · Schrift senden — wir erledigen den Rest",
          bottomCta: "Kostenlose Offerte erhalten",
          bottomWa: "WhatsApp schreiben",
          waText: "Hallo KAH Digital, ich möchte ein Projekt besprechen.",
          bottomNote: "Unverbindlich · Budget besprochen · Antwort in 24h",
          notSure: "Nicht sicher welcher Plan? Beschreiben Sie Ihr Projekt in 2 Sätzen.",
          notSureAction: "Kostenlose Empfehlung erhalten →",
        }
      : {
          eyebrow: "Tarifs transparents",
          title: "Dès",
          titlePrice: "99 €.",
          title2: "Zéro surprise.",
          sub: "Prix fixes, livraison rapide. Dès que vous validez et envoyez vos assets (photos, couleurs, police), l'équipe se lance immédiatement.",
          urgency: "⚡ Places limitées ce mois-ci",
          launchNote: "Pour lancer en 48h : envoyez vos photos · couleurs · police — on s'occupe du reste",
          bottomCta: "Obtenir mon devis gratuit",
          bottomWa: "Écrire sur WhatsApp",
          waText: "Bonjour KAH Digital, je voudrais discuter d'un projet.",
          bottomNote: "Sans engagement · Budget discuté · Réponse sous 24h",
          notSure: "Pas sûr du plan ? Décrivez votre projet en 2 lignes.",
          notSureAction: "Obtenir une recommandation gratuite →",
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
          className="mb-10 flex items-center justify-center"
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

        {/* Plans */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const accent = ACCENT[plan.accentColor as keyof typeof ACCENT];
            const formattedPrice = fmtPrice(plan.price, locale);
            // Split for display: prefix vs number vs suffix
            const isUSD = locale === "en";
            const isCHF = locale === "de";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlight
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-600/15 to-violet-600/5 shadow-2xl shadow-violet-500/15 scale-[1.02]"
                    : plan.accentColor === "amber"
                    ? "border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent hover:border-amber-500/35"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold shadow-lg ${accent.badge}`}>
                      <FiZap size={10} />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">{plan.name}</p>

                {/* Price — devise adaptée */}
                <div className="mb-2 flex items-end gap-1">
                  {isUSD && (
                    <span className="mb-1 text-2xl font-black text-gray-400">$</span>
                  )}
                  {isCHF && (
                    <span className="mb-1 mr-1 text-lg font-bold text-gray-400">CHF</span>
                  )}
                  <span className="text-5xl font-black leading-none text-white">{plan.price}</span>
                  {!isUSD && !isCHF && (
                    <span className="mb-1 ml-1 text-2xl font-black text-gray-400">€</span>
                  )}
                </div>

                {/* Delivery badge */}
                <div className={`mb-4 flex items-center gap-1.5 text-sm font-semibold ${accent.delivery}`}>
                  <FiClock size={13} />
                  {plan.deliveryLabel}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-gray-400">{plan.tagline}</p>

                {/* Divider */}
                <div className="mb-6 h-px bg-white/8" />

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <FiCheck size={14} className={`mt-0.5 shrink-0 ${accent.check}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={withPrefix(plan.href)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all hover:gap-3 ${accent.cta}`}
                >
                  {plan.cta}
                  <FiArrowRight size={14} />
                </Link>
                <p className="mt-3 text-center text-xs text-gray-600">{plan.note}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Launch banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/8 px-6 py-3.5"
        >
          <FiZap size={14} className="shrink-0 text-blue-400" />
          <p className="text-sm text-blue-200">{copy.launchNote}</p>
        </motion.div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-white/8 bg-gradient-to-r from-violet-950/40 to-blue-950/30 p-8 text-center"
        >
          <p className="mb-1 text-sm text-gray-400">{copy.notSure}</p>
          <p className="mb-6 text-sm font-semibold text-white">{copy.notSureAction}</p>
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
