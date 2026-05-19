"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiCheck, FiZap } from "react-icons/fi";

const PLANS = {
  fr: [
    {
      name: "Starter",
      price: "CHF 2'500",
      period: "projet unique",
      tagline: "Présence digitale professionnelle",
      highlight: false,
      badge: null,
      features: [
        "Site vitrine premium (5–7 pages)",
        "Design responsive mobile-first",
        "SEO technique de base",
        "Formulaire de contact optimisé",
        "Hébergement & domaine 1 an",
        "Google Analytics configuré",
        "30 jours de corrections inclus",
        "Livraison en 2–3 semaines",
      ],
      cta: "Démarrer",
      href: "/devis",
    },
    {
      name: "Professional",
      price: "CHF 6'900",
      period: "projet unique",
      tagline: "Système digital complet & convertissant",
      highlight: true,
      badge: "Le plus populaire",
      features: [
        "Site web complet (10+ pages)",
        "Automatisation de base (CRM, emails)",
        "SEO avancé + pages locales",
        "Intégration paiement Stripe",
        "Blog & content management",
        "Analytics avancés + heatmaps",
        "Performance Lighthouse 90+",
        "Support 3 mois post-livraison",
        "Livraison en 4–6 semaines",
      ],
      cta: "Choisir Professional",
      href: "/devis",
    },
    {
      name: "Elite",
      price: "Sur devis",
      period: "projet sur mesure",
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
        "Support dédié 6 mois",
        "Accompagnement growth stratégique",
        "Délai selon scope projet",
      ],
      cta: "Discuter de mon projet",
      href: "/devis",
    },
  ],
  en: [
    {
      name: "Starter",
      price: "CHF 2,500",
      period: "one-time",
      tagline: "Professional digital presence",
      highlight: false,
      badge: null,
      features: [
        "Premium landing site (5–7 pages)",
        "Mobile-first responsive design",
        "Basic technical SEO",
        "Optimized contact form",
        "Hosting & domain 1 year",
        "Google Analytics setup",
        "30-day corrections included",
        "Delivery in 2–3 weeks",
      ],
      cta: "Get started",
      href: "/devis",
    },
    {
      name: "Professional",
      price: "CHF 6,900",
      period: "one-time",
      tagline: "Complete converting digital system",
      highlight: true,
      badge: "Most popular",
      features: [
        "Full website (10+ pages)",
        "Basic automation (CRM, emails)",
        "Advanced SEO + local pages",
        "Stripe payment integration",
        "Blog & content management",
        "Advanced analytics + heatmaps",
        "90+ Lighthouse performance",
        "3 months post-delivery support",
        "Delivery in 4–6 weeks",
      ],
      cta: "Choose Professional",
      href: "/devis",
    },
    {
      name: "Elite",
      price: "Custom",
      period: "bespoke project",
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
        "Dedicated 6-month support",
        "Strategic growth advisory",
        "Timeline based on scope",
      ],
      cta: "Discuss my project",
      href: "/devis",
    },
  ],
};

export function PricingSection() {
  const { locale, prefix } = useLocale();

  const plans = PLANS[locale === "en" ? "en" : "fr"];

  const copy =
    locale === "en"
      ? {
          eyebrow: "Transparent pricing",
          title: "Choose the right system",
          title2: "for your ambition.",
          sub: "No hidden fees. No bad surprises. Each project delivered on budget and on time.",
          note: "All prices excl. VAT. Custom pricing available for complex projects.",
        }
      : {
          eyebrow: "Tarifs transparents",
          title: "Choisissez le système",
          title2: "à la hauteur de votre ambition.",
          sub: "Aucun frais cachés. Aucune mauvaise surprise. Chaque projet livré dans les délais et dans le budget.",
          note: "Prix HT. Tarifs sur mesure disponibles pour projets complexes.",
        };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-28" id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-violet-500/50 bg-gradient-to-b from-violet-600/15 to-violet-600/5 shadow-xl shadow-violet-500/10"
                  : "border-white/10 bg-white/[0.03]"
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

              <div className="mb-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">{plan.name}</p>
                <div className="mb-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="mb-1 text-sm text-gray-500">/ {plan.period}</span>
                </div>
                <p className="text-sm text-gray-400">{plan.tagline}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <FiCheck size={15} className="mt-0.5 shrink-0 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={withPrefix(plan.href)}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-all hover:gap-3 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {plan.cta}
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">{copy.note}</p>
      </div>
    </section>
  );
}
