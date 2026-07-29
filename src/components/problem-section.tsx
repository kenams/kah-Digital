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
      title: "Votre métier ne manque pas d'ambition. Il manque d'un agent.",
      body: "La plupart des entreprises jonglent avec des outils génériques (ChatGPT, tableurs, apps) qui ne connaissent rien de leur métier. Résultat : tout se reformule à chaque fois, rien n'est autonome, et le temps part en admin.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Zéro autonomie",
          desc: "Vos équipes repassent derrière chaque outil. Qualification, relances, reporting — rien n'agit vraiment à votre place.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Un chatbot générique",
          desc: "ChatGPT ou Claude ne connaissent ni vos process, ni vos outils, ni votre vocabulaire métier. Vous recommencez à zéro à chaque conversation.",
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
          title: "Pas d'agent vertical",
          desc: "Vos concurrents déploient déjà des agents IA branchés sur un seul métier, de bout en bout. Vous regardez passer le train.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital ne livre pas un site de plus. On livre un agent IA vertical, branché sur votre métier — preuve en production : KAH Workforce, chef de cabinet IA pour artistes indépendants.",
      cta: "Voir comment ça se passe",
    },
    en: {
      eyebrow: "The problem",
      title: "Your business doesn't lack ambition. It lacks an agent.",
      body: "Most businesses juggle generic tools (ChatGPT, spreadsheets, apps) that know nothing about their trade. Result: everything gets re-explained every time, nothing runs on its own, and time bleeds into admin.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Zero autonomy",
          desc: "Your teams still babysit every tool. Qualification, follow-ups, reporting — nothing truly acts in your place.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "A generic chatbot",
          desc: "ChatGPT or Claude don't know your process, your tools, or your vocabulary. You start from zero in every conversation.",
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
          title: "No vertical agent",
          desc: "Your competitors are already running AI agents wired into one job, end to end. You're watching from the sidelines.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital doesn't deliver another website. We deliver a vertical AI agent, wired into your business — flagship proof: KAH Workforce, a live AI chief-of-staff for independent artists.",
      cta: "See how it works",
    },
    de: {
      eyebrow: "Das Problem",
      title: "Ihrem Business fehlt kein Ehrgeiz. Es fehlt ein Agent.",
      body: "Die meisten Unternehmen jonglieren mit generischen Tools (ChatGPT, Excel, Apps), die ihr Geschäft nicht kennen. Das Ergebnis: alles wird jedes Mal neu erklärt, nichts läuft autonom, und die Zeit versickert in der Verwaltung.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Keine Autonomie",
          desc: "Ihre Teams müssen jedes Tool selbst bedienen. Qualifizierung, Follow-ups, Reporting — nichts handelt wirklich für Sie.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Ein generischer Chatbot",
          desc: "ChatGPT oder Claude kennen weder Ihre Prozesse noch Ihre Tools noch Ihr Fachvokabular. Sie beginnen bei jedem Gespräch bei null.",
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
          title: "Kein vertikaler Agent",
          desc: "Ihre Mitbewerber setzen bereits KI-Agenten ein, die auf einen Job spezialisiert sind — von A bis Z. Sie schauen zu.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH Digital liefert keine weitere Website. Wir liefern einen vertikalen KI-Agenten, der in Ihr Geschäft eingebettet ist — Aushängeschild: KAH Workforce, ein KI-Kabinettschef für unabhängige Künstler, live im Einsatz.",
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
