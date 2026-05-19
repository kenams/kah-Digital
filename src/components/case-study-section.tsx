"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiTrendingUp, FiClock, FiStar, FiZap } from "react-icons/fi";

const CASES = {
  fr: [
    {
      tag: "Automatisation IA · SaaS",
      title: "Pipeline de prospection 100% automatisé",
      context: "Startup en croissance : commerciaux qui passaient 4h/jour à qualifier des leads manuellement. Taux de conversion à 2%.",
      solution: "Agent IA Claude + pipeline Supabase : scoring automatique, emails personnalisés par secteur, follow-ups automatiques sur 10 jours.",
      results: [
        { icon: FiTrendingUp, value: "6×", label: "Leads qualifiés/semaine" },
        { icon: FiZap, value: "−80%", label: "Temps commercial" },
        { icon: FiClock, value: "3 sem.", label: "Délai de livraison" },
      ],
      quote: "Le système tourne 24h/24 sans intervention. On a 6× plus de leads qualifiés sans recruter un commercial supplémentaire.",
      author: "T. A. — Co-fondateur SaaS B2B",
      accent: "from-blue-600/20 to-cyan-600/10",
      border: "border-blue-500/20",
    },
    {
      tag: "E-commerce · Refonte",
      title: "Plateforme e-commerce premium avec IA",
      context: "Boutique Shopify avec taux d'abandon panier à 78%. Aucune personnalisation, mobile non optimisé, 0 SEO local.",
      solution: "Refonte complète Next.js + Stripe + recommandations IA produit. SEO local Genève/Lausanne. Performance mobile 95+.",
      results: [
        { icon: FiTrendingUp, value: "+42%", label: "Conversions en 60j" },
        { icon: FiStar, value: "−34%", label: "Taux d'abandon panier" },
        { icon: FiClock, value: "5 sem.", label: "Délai de livraison" },
      ],
      quote: "42% de conversions en plus en 2 mois. L'IA de recommandation produit a changé la donne — les clients restent 2× plus longtemps.",
      author: "S. M. — Directrice e-commerce, Genève",
      accent: "from-emerald-600/20 to-teal-600/10",
      border: "border-emerald-500/20",
    },
    {
      tag: "Dashboard · Infrastructure",
      title: "Dashboard opérationnel temps réel",
      context: "PME de 40 personnes avec Excel comme outil de reporting. 2h/semaine perdues à compiler des données manuellement.",
      solution: "Application web React + Supabase temps réel + exports PDF automatiques. Auth, rôles, dashboard KPIs, alertes email.",
      results: [
        { icon: FiClock, value: "−90%", label: "Temps de reporting" },
        { icon: FiStar, value: "0 bug", label: "En 6 mois de prod" },
        { icon: FiTrendingUp, value: "3e projet", label: "Déjà planifié" },
      ],
      quote: "On a récupéré 2h de reporting par semaine. L'équipe voit les KPIs en temps réel depuis n'importe où. Déjà en train de planifier le 3e projet.",
      author: "J. F. — Directeur opérations, Fribourg",
      accent: "from-violet-600/20 to-purple-600/10",
      border: "border-violet-500/20",
    },
  ],
  en: [
    {
      tag: "AI Automation · SaaS",
      title: "100% automated prospecting pipeline",
      context: "Growing startup: salespeople spending 4h/day manually qualifying leads. 2% conversion rate.",
      solution: "Claude AI agent + Supabase pipeline: automatic scoring, sector-personalized emails, auto follow-ups over 10 days.",
      results: [
        { icon: FiTrendingUp, value: "6×", label: "Qualified leads/week" },
        { icon: FiZap, value: "−80%", label: "Sales time saved" },
        { icon: FiClock, value: "3 wks", label: "Delivery time" },
      ],
      quote: "The system runs 24/7 without intervention. We have 6× more qualified leads without hiring an extra salesperson.",
      author: "T. A. — Co-founder B2B SaaS",
      accent: "from-blue-600/20 to-cyan-600/10",
      border: "border-blue-500/20",
    },
    {
      tag: "E-commerce · Redesign",
      title: "Premium e-commerce platform with AI",
      context: "Shopify store with 78% cart abandonment rate. No personalization, non-optimized mobile, zero local SEO.",
      solution: "Full Next.js + Stripe rebuild + AI product recommendations. Local SEO Geneva/Lausanne. Mobile performance 95+.",
      results: [
        { icon: FiTrendingUp, value: "+42%", label: "Conversions in 60 days" },
        { icon: FiStar, value: "−34%", label: "Cart abandonment" },
        { icon: FiClock, value: "5 wks", label: "Delivery time" },
      ],
      quote: "42% more conversions in 2 months. The AI product recommendation changed everything — customers stay 2× longer.",
      author: "S. M. — E-commerce Director, Geneva",
      accent: "from-emerald-600/20 to-teal-600/10",
      border: "border-emerald-500/20",
    },
    {
      tag: "Dashboard · Infrastructure",
      title: "Real-time operational dashboard",
      context: "40-person SME using Excel for reporting. 2h/week lost compiling data manually.",
      solution: "React web app + real-time Supabase + auto PDF exports. Auth, roles, KPI dashboard, email alerts.",
      results: [
        { icon: FiClock, value: "−90%", label: "Reporting time" },
        { icon: FiStar, value: "0 bugs", label: "In 6 months of production" },
        { icon: FiTrendingUp, value: "3rd project", label: "Already planned" },
      ],
      quote: "We recovered 2h of reporting per week. The team sees KPIs in real time from anywhere. Already planning the 3rd project.",
      author: "J. F. — Operations Director, Fribourg",
      accent: "from-violet-600/20 to-purple-600/10",
      border: "border-violet-500/20",
    },
  ],
};

export function CaseStudySection() {
  const { locale, prefix } = useLocale();

  const cases = CASES[locale === "en" ? "en" : "fr"];

  const copy =
    locale === "en"
      ? { eyebrow: "Case studies", title: "Real results.", title2: "Real businesses.", cta: "Start my project", ctaSub: "Free audit · Reply within 24h" }
      : { eyebrow: "Cas clients", title: "Des résultats réels.", title2: "Des entreprises réelles.", cta: "Démarrer mon projet", ctaSub: "Audit gratuit · Réponse sous 24h" };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className={`flex flex-col rounded-2xl border ${c.border} bg-gradient-to-br ${c.accent} p-6`}
            >
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">{c.tag}</span>
              <h3 className="mb-4 text-lg font-bold text-white">{c.title}</h3>

              <div className="mb-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{locale === "en" ? "Situation" : "Situation"}</p>
                <p className="text-sm text-gray-400">{c.context}</p>
              </div>

              <div className="mb-5 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Solution</p>
                <p className="text-sm text-gray-400">{c.solution}</p>
              </div>

              <div className="mb-5 grid grid-cols-3 gap-3 rounded-xl border border-white/8 bg-black/20 p-3">
                {c.results.map((r) => (
                  <div key={r.label} className="flex flex-col items-center gap-1 text-center">
                    <r.icon size={13} className="text-gray-500" />
                    <span className="text-base font-extrabold text-white">{r.value}</span>
                    <span className="text-[10px] leading-tight text-gray-500">{r.label}</span>
                  </div>
                ))}
              </div>

              <blockquote className="mt-auto rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-sm italic text-gray-300">"{c.quote}"</p>
                <p className="mt-2 text-xs text-gray-600">{c.author}</p>
              </blockquote>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href={withPrefix("/devis")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 hover:gap-3"
          >
            {copy.cta}
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">{copy.ctaSub}</p>
        </motion.div>
      </div>
    </section>
  );
}
