"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiAlertTriangle, FiTrendingDown, FiClock, FiEyeOff } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProblemSection() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      eyebrow: "Le problème",
      title: "Votre business ne manque pas d'ambition. Il manque de système.",
      body: "La plupart des entreprises ont un site vitrine, pas un moteur de croissance. Résultat : des prospects perdus, des processus manuels, et une visibilité qui stagne.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Zéro automatisation",
          desc: "Vos équipes passent des heures sur des tâches répétitives. Qualification de leads, relances, reporting — tout à la main.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Conversion insuffisante",
          desc: "Votre site existe mais ne convertit pas. Pas de funnel clair, pas de CTA performant, pas de suivi post-visite.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Temps perdu en gestion",
          desc: "Excel, email, PDF manuels. Vos données sont éparpillées et votre reporting prend des heures chaque semaine.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Pas d'infrastructure IA",
          desc: "Vos concurrents déploient des agents IA et des automatisations. Vous regardez passer le train.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital ne livre pas un site. On livre un système complet : acquisition, conversion, automatisation et infrastructure — conçu pour faire croître votre business.",
      cta: "Voir comment ça se passe",
    },
    en: {
      eyebrow: "The problem",
      title: "Your business doesn't lack ambition. It lacks a system.",
      body: "Most businesses have a brochure website, not a growth engine. Result: lost prospects, manual processes, and stagnating visibility.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Zero automation",
          desc: "Your teams spend hours on repetitive tasks. Lead qualification, follow-ups, reporting — all done manually.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Poor conversion",
          desc: "Your site exists but doesn't convert. No clear funnel, no high-performing CTA, no post-visit tracking.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Time wasted on admin",
          desc: "Excel, email, manual PDFs. Your data is scattered and reporting takes hours every week.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "No AI infrastructure",
          desc: "Your competitors are deploying AI agents and automations. You're watching from the sidelines.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital doesn't deliver a website. We deliver a complete system: acquisition, conversion, automation and infrastructure — built to grow your business.",
      cta: "See how it works",
    },
    de: {
      eyebrow: "Das Problem",
      title: "Ihrem Unternehmen fehlt kein Ehrgeiz. Es fehlt ein System.",
      body: "Die meisten Unternehmen haben eine Broschüren-Website, keinen Wachstumsmotor. Das Ergebnis: verlorene Interessenten, manuelle Prozesse, stagnierende Sichtbarkeit.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Keine Automatisierung",
          desc: "Ihre Teams verbringen Stunden mit repetitiven Aufgaben. Lead-Qualifizierung, Follow-ups, Reporting — alles manuell.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Schwache Conversion",
          desc: "Ihre Website existiert, konvertiert aber nicht. Kein klarer Funnel, kein starker CTA, kein Post-Visit-Tracking.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Zeitverlust durch Verwaltung",
          desc: "Excel, E-Mail, manuelle PDFs. Ihre Daten sind verstreut, Reporting kostet Stunden pro Woche.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Keine KI-Infrastruktur",
          desc: "Ihre Mitbewerber setzen KI-Agenten und Automatisierungen ein. Sie schauen zu.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital liefert keine Website. Wir liefern ein komplettes System: Akquise, Conversion, Automatisierung und Infrastruktur — designed für Ihr Wachstum.",
      cta: "So funktioniert es",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-white/8 bg-gray-900/60 p-6 transition-all hover:border-white/16 hover:bg-gray-900"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${p.color}18` }}
              >
                <p.icon size={20} style={{ color: p.color }} />
              </div>
              <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 to-violet-950/40 p-8 text-center"
        >
          <p className="mb-6 text-lg font-medium text-white">{copy.solution}</p>
          <Link
            href={withPrefix("/services")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            {copy.cta}
            <FiArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
