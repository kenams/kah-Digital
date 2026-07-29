"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiCpu, FiTrendingUp, FiZap, FiGlobe, FiLayers, FiBarChart2 } from "react-icons/fi";

const SYSTEMS = [
  {
    icon: FiCpu,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    fr: { title: "Agent IA vertical sur mesure", desc: "Branché sur un seul métier, de bout en bout — comme KAH Workforce pour les artistes. Il agit pour vous, 24h/24." },
    en: { title: "Custom Vertical AI Agent", desc: "Wired into one job, end to end — like KAH Workforce for artists. It acts for you, 24/7." },
    de: { title: "Individueller vertikaler KI-Agent", desc: "Ende-zu-Ende auf einen Job spezialisiert — wie KAH Workforce für Künstler. Er handelt für Sie, 24/7." },
  },
  {
    icon: FiZap,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    fr: { title: "Automatisation IA", desc: "Éliminez les tâches répétitives. Vos processus tournent seuls — lead capture, emails, reporting, workflows." },
    en: { title: "AI Automation", desc: "Eliminate repetitive tasks. Your processes run themselves — lead capture, emails, reporting, workflows." },
    de: { title: "KI-Automatisierung", desc: "Eliminieren Sie Routineaufgaben. Ihre Prozesse laufen von selbst — Lead-Erfassung, E-Mails, Reporting, Workflows." },
  },
  {
    icon: FiTrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    fr: { title: "Systèmes de conversion", desc: "Tunnels de vente, pages de capture, formulaires intelligents. Chaque visiteur devient une opportunité." },
    en: { title: "Conversion Systems", desc: "Sales funnels, capture pages, smart forms. Every visitor becomes an opportunity." },
    de: { title: "Conversion-Systeme", desc: "Verkaufstunnel, Capture-Seiten, intelligente Formulare. Jeder Besucher wird zur Chance." },
  },
  {
    icon: FiGlobe,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    fr: { title: "Plateformes premium", desc: "Sites web, apps SaaS, e-commerce. Architectures scalables, design haut de gamme, performances Lighthouse 95+." },
    en: { title: "Premium Platforms", desc: "Websites, SaaS apps, e-commerce. Scalable architectures, high-end design, 95+ Lighthouse performance." },
    de: { title: "Premium-Plattformen", desc: "Websites, SaaS-Apps, E-Commerce. Skalierbare Architekturen, hochwertiges Design, 95+ Lighthouse-Performance." },
  },
  {
    icon: FiLayers,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    fr: { title: "Infrastructure digitale", desc: "API, bases de données, intégrations tierces. Une architecture solide qui supporte votre croissance." },
    en: { title: "Digital Infrastructure", desc: "APIs, databases, third-party integrations. A solid architecture that supports your growth." },
    de: { title: "Digitale Infrastruktur", desc: "APIs, Datenbanken, Drittanbieter-Integrationen. Eine solide Architektur, die Ihr Wachstum trägt." },
  },
  {
    icon: FiBarChart2,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    fr: { title: "Dashboards & Analytics", desc: "Visualisez vos KPIs en temps réel. Prenez de meilleures décisions plus vite." },
    en: { title: "Dashboards & Analytics", desc: "Visualize your KPIs in real time. Make better decisions faster." },
    de: { title: "Dashboards & Analytics", desc: "Visualisieren Sie Ihre KPIs in Echtzeit. Treffen Sie schneller bessere Entscheidungen." },
  },
];

export function AiSystemsSection() {
  const { locale } = useLocale();

  const copy =
    locale === "en"
      ? {
          eyebrow: "What we build",
          title: "Not just a website.",
          title2: "A vertical AI agent.",
          sub: "We design and ship agents wired into one job end to end — from the first pixel to the last automation — so your business runs itself.",
        }
      : locale === "de"
      ? {
          eyebrow: "Was wir bauen",
          title: "Nicht nur eine Website.",
          title2: "Ein vertikaler KI-Agent.",
          sub: "Wir konzipieren und liefern Agenten, die Ende-zu-Ende auf einen Job spezialisiert sind — vom ersten Pixel bis zur letzten Automatisierung — damit Ihr Business sich selbst führt.",
        }
      : {
          eyebrow: "Ce qu'on construit",
          title: "Pas juste un site web.",
          title2: "Un agent IA vertical.",
          sub: "On conçoit et livre des agents branchés sur un seul métier, de bout en bout — du premier pixel à la dernière automatisation — pour que votre business tourne tout seul.",
        };

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map(({ icon: Icon, color, bg, fr, en, de }, i) => {
            const c = locale === "en" ? en : locale === "de" ? de : fr;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group rounded-2xl border ${bg} p-6 transition-all hover:bg-white/[0.04]`}
              >
                <div className={`mb-4 inline-flex rounded-xl border ${bg} p-2.5`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="mb-2 font-bold text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
