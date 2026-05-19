"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheck, FiZap, FiMessageCircle } from "react-icons/fi";

const PLANS = {
  fr: [
    {
      name: "Starter",
      price: "À partir de",
      anchor: "CHF 890",
      anchorSub: "selon votre scope",
      tagline: "Présence digitale professionnelle",
      highlight: false,
      badge: null,
      features: [
        "Site vitrine premium (5–7 pages)",
        "Design responsive mobile-first",
        "SEO technique de base",
        "Formulaire de contact optimisé",
        "Performance Lighthouse 90+",
        "Livraison en 2–3 semaines",
      ],
      cta: "Obtenir mon devis",
      href: "/devis",
      note: "Devis personnalisé · Sans engagement",
    },
    {
      name: "Professional",
      price: "À partir de",
      anchor: "CHF 2'400",
      anchorSub: "selon votre scope",
      tagline: "Système digital complet & convertissant",
      highlight: true,
      badge: "Le plus demandé",
      features: [
        "Site web complet (10+ pages)",
        "Automatisation IA & emails",
        "SEO avancé + pages locales",
        "Intégration paiement Stripe",
        "Analytics avancés + heatmaps",
        "Support 3 mois post-livraison",
        "Livraison en 4–6 semaines",
      ],
      cta: "Discuter de mon projet",
      href: "/devis",
      note: "Devis personnalisé · Budget garanti",
    },
    {
      name: "Elite",
      price: "Budget",
      anchor: "Sur mesure",
      anchorSub: "selon le scope",
      tagline: "Système IA complet & infrastructure scalable",
      highlight: false,
      badge: null,
      features: [
        "Application web / SaaS sur mesure",
        "Agents IA & automatisations avancées",
        "Infrastructure cloud scalable",
        "Dashboard analytics temps réel",
        "Intégrations API illimitées",
        "Multi-langues & international",
        "Accompagnement growth 6 mois",
      ],
      cta: "Échanger sur mon projet",
      href: "/devis",
      note: "Échange gratuit · Devis sous 24h",
    },
  ],
  de: [
    {
      name: "Starter",
      price: "Ab",
      anchor: "CHF 890",
      anchorSub: "je nach Umfang",
      tagline: "Professioneller digitaler Auftritt",
      highlight: false,
      badge: null,
      features: [
        "Premium-Website (5–7 Seiten)",
        "Mobiles, responsives Design",
        "Technisches Basis-SEO",
        "Optimiertes Kontaktformular",
        "90+ Lighthouse-Performance",
        "Lieferung in 2–3 Wochen",
      ],
      cta: "Offerte anfragen",
      href: "/devis",
      note: "Persönliches Angebot · Keine Verpflichtung",
    },
    {
      name: "Professional",
      price: "Ab",
      anchor: "CHF 2'400",
      anchorSub: "je nach Umfang",
      tagline: "Vollständiges digitales Wachstumssystem",
      highlight: true,
      badge: "Am meisten gefragt",
      features: [
        "Vollständige Website (10+ Seiten)",
        "KI-Automatisierung & E-Mails",
        "Erweitertes SEO + lokale Seiten",
        "Stripe-Zahlungsintegration",
        "Analytics + Heatmaps",
        "3 Monate Support nach Lieferung",
        "Lieferung in 4–6 Wochen",
      ],
      cta: "Projekt besprechen",
      href: "/devis",
      note: "Persönliches Angebot · Budget garantiert",
    },
    {
      name: "Elite",
      price: "Budget",
      anchor: "Massgeschneidert",
      anchorSub: "je nach Umfang",
      tagline: "Vollständiges KI-System & skalierbare Infrastruktur",
      highlight: false,
      badge: null,
      features: [
        "Individuelle Web-App / SaaS",
        "KI-Agenten & Automatisierungen",
        "Skalierbare Cloud-Infrastruktur",
        "Echtzeit-Analytics-Dashboard",
        "Unbegrenzte API-Integrationen",
        "Mehrsprachig & international",
        "6 Monate strategisches Growth-Support",
      ],
      cta: "Projekt anfragen",
      href: "/devis",
      note: "Kostenloses Erstgespräch · Angebot in 24h",
    },
  ],
  en: [
    {
      name: "Starter",
      price: "Starting from",
      anchor: "CHF 890",
      anchorSub: "based on your scope",
      tagline: "Professional digital presence",
      highlight: false,
      badge: null,
      features: [
        "Premium landing site (5–7 pages)",
        "Mobile-first responsive design",
        "Basic technical SEO",
        "Optimized contact form",
        "90+ Lighthouse performance",
        "Delivery in 2–3 weeks",
      ],
      cta: "Get my quote",
      href: "/devis",
      note: "Custom quote · No commitment",
    },
    {
      name: "Professional",
      price: "Starting from",
      anchor: "CHF 2,400",
      anchorSub: "based on your scope",
      tagline: "Complete converting digital system",
      highlight: true,
      badge: "Most requested",
      features: [
        "Full website (10+ pages)",
        "AI automation & emails",
        "Advanced SEO + local pages",
        "Stripe payment integration",
        "Advanced analytics + heatmaps",
        "3 months post-delivery support",
        "Delivery in 4–6 weeks",
      ],
      cta: "Discuss my project",
      href: "/devis",
      note: "Custom quote · Budget guaranteed",
    },
    {
      name: "Elite",
      price: "Budget",
      anchor: "Custom",
      anchorSub: "based on scope",
      tagline: "Full AI system & scalable infrastructure",
      highlight: false,
      badge: null,
      features: [
        "Custom web app / SaaS",
        "AI agents & advanced automation",
        "Scalable cloud infrastructure",
        "Real-time analytics dashboard",
        "Unlimited API integrations",
        "Multi-language & international",
        "6-month strategic growth support",
      ],
      cta: "Talk about my project",
      href: "/devis",
      note: "Free discovery call · Quote within 24h",
    },
  ],
};

export function PricingSection() {
  const { locale, prefix } = useLocale();

  const plans = PLANS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];

  const copy =
    locale === "en"
      ? {
          eyebrow: "Invest, don't overpay",
          title: "A system built",
          title2: "around your budget.",
          sub: "Every project starts with a free discovery call. We scope exactly what you need — no more, no less. Fixed quote guaranteed before you sign anything.",
          reassurance: [
            "Free personalised quote within 24h",
            "Fixed price — no surprises",
            "No commitment until you sign",
          ],
          bottomCta: "Get a free quote",
          bottomWa: "WhatsApp — reply in 2h",
          waText: "Hi KAH Digital, I'd like to discuss the budget for my project.",
          bottomNote: "No commitment · Budget adjusted to your needs · Reply within 24h",
        }
      : locale === "de"
      ? {
          eyebrow: "Investieren Sie richtig, zahlen Sie nicht zu viel",
          title: "Ein System gebaut",
          title2: "rund um Ihr Budget.",
          sub: "Jedes Projekt beginnt mit einem kostenlosen Erstgespräch. Wir definieren genau, was Sie brauchen — nicht mehr, nicht weniger. Feste Offerte garantiert vor der Unterzeichnung.",
          reassurance: [
            "Kostenlose individuelle Offerte in 24h",
            "Fester Preis — keine Überraschungen",
            "Keine Verpflichtung bis zur Unterschrift",
          ],
          bottomCta: "Kostenlose Offerte erhalten",
          bottomWa: "WhatsApp — Antwort in 2h",
          waText: "Hallo KAH Digital, ich möchte das Budget für mein Projekt besprechen.",
          bottomNote: "Unverbindlich · Budget angepasst an Ihren Bedarf · Antwort in 24h",
        }
      : {
          eyebrow: "Investissez juste, sans dépenser trop",
          title: "Un système construit",
          title2: "autour de votre budget.",
          sub: "Chaque projet commence par un échange gratuit. On cadre exactement ce dont vous avez besoin — ni plus, ni moins. Devis ferme garanti avant toute signature.",
          reassurance: [
            "Devis personnalisé gratuit sous 24h",
            "Prix ferme — aucune mauvaise surprise",
            "Zéro engagement avant validation",
          ],
          bottomCta: "Obtenir un devis gratuit",
          bottomWa: "WhatsApp — réponse sous 2h",
          waText: "Bonjour KAH Digital, je voudrais discuter du budget pour mon projet.",
          bottomNote: "Sans engagement · Budget adapté à votre besoin · Réponse sous 24h",
        };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/33759558414?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="bg-gray-950 py-28" id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

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
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">{copy.sub}</p>

          {/* Reassurance pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {copy.reassurance.map((item) => (
              <div key={item} className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/8 px-4 py-1.5 text-xs font-semibold text-green-400">
                <FiCheck size={11} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-violet-500/50 bg-gradient-to-b from-violet-600/15 to-violet-600/5 shadow-xl shadow-violet-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-violet-500/30">
                    <FiZap size={11} />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Price block */}
              <div className="mb-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">{plan.name}</p>
                <p className="text-xs text-gray-600 mb-0.5">{plan.price}</p>
                <div className="flex items-end gap-2">
                  <span className={`font-extrabold text-white ${plan.anchor === "Sur mesure" || plan.anchor === "Custom" ? "text-2xl" : "text-3xl"}`}>
                    {plan.anchor}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-600 italic">{plan.anchorSub}</p>
                <p className="mt-3 text-sm text-gray-400">{plan.tagline}</p>
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <FiCheck size={15} className="mt-0.5 shrink-0 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={withPrefix(plan.href)}
                className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-all hover:gap-3 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {plan.cta}
                <FiArrowRight size={15} className="transition-transform group/btn-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-center text-xs text-gray-600">{plan.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-white/8 bg-gradient-to-r from-violet-950/40 to-blue-950/30 p-8 text-center"
        >
          <p className="mb-2 text-sm font-semibold text-white">
            {locale === "en"
              ? "Not sure which tier fits your project?"
              : locale === "de"
              ? "Nicht sicher, welche Stufe zu Ihrem Projekt passt?"
              : "Vous ne savez pas quel niveau correspond à votre projet ?"}
          </p>
          <p className="mb-6 text-sm text-gray-400">
            {locale === "en"
              ? "Tell us your situation in 2 lines. We'll come back with a clear scope and a realistic number — in 24h, free."
              : locale === "de"
              ? "Beschreiben Sie Ihre Situation in 2 Sätzen. Wir kommen mit einem klaren Umfang und einer realistischen Zahl zurück — in 24h, kostenlos."
              : "Décrivez votre situation en 2 lignes. On revient avec un périmètre clair et un chiffre réaliste — en 24h, gratuitement."}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={withPrefix("/audit-gratuit")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/40 hover:gap-3"
            >
              {copy.bottomCta}
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/15 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              {copy.bottomWa}
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">{copy.bottomNote}</p>
        </motion.div>

      </div>
    </section>
  );
}
