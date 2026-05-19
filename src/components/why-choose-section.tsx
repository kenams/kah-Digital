"use client";

import { motion } from "framer-motion";
import { FiCheck, FiClock, FiGlobe, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Pourquoi KAH Digital",
      title: "Un système. Pas juste un site.",
      body: "On ne vend pas des heures de dev. On livre des systèmes qui produisent des résultats mesurables pour votre business.",
      reasons: [
        {
          num: "01", icon: FiZap, accent: "#3b82f6",
          title: "Exécution rapide, résultats immédiats",
          description: "Cadrage court, décisions claires. Starter en 2–3 semaines. Système complet en 4–6 semaines. Pas d'aller-retours inutiles.",
          tag: "Délai moyen : 3–6 semaines",
        },
        {
          num: "02", icon: FiGlobe, accent: "#8b5cf6",
          title: "Expertise IA & international",
          description: "Claude, OpenAI, automatisations Supabase. On construit avec les meilleurs outils IA disponibles et on opère à l'international.",
          tag: "FR · EN · DE · International",
        },
        {
          num: "03", icon: FiCheck, accent: "#10b981",
          title: "100% budget respecté",
          description: "Chaque devis est ferme. Vous savez exactement ce que vous achetez avant de signer. Aucune mauvaise surprise à la facture.",
          tag: "Devis lisibles · Sur mesure",
        },
        {
          num: "04", icon: FiClock, accent: "#f59e0b",
          title: "Réponse garantie en 24h",
          description: "Demande de devis, question technique ou brief : premier retour le jour ouvrable suivant, sans exception. Accès direct au senior.",
          tag: "Réponse sous 24h ouvrables",
        },
      ],
    },
    en: {
      eyebrow: "Why KAH Digital",
      title: "A system. Not just a website.",
      body: "We don't sell dev hours. We deliver systems that produce measurable results for your business.",
      reasons: [
        {
          num: "01", icon: FiZap, accent: "#3b82f6",
          title: "Fast execution, immediate results",
          description: "Short scoping, clear decisions. Starter in 2–3 weeks. Full system in 4–6 weeks. No unnecessary back-and-forth.",
          tag: "Average: 3–6 weeks",
        },
        {
          num: "02", icon: FiGlobe, accent: "#8b5cf6",
          title: "AI & international expertise",
          description: "Claude, OpenAI, Supabase automations. We build with the best AI tools available and operate internationally.",
          tag: "FR · EN · DE · International",
        },
        {
          num: "03", icon: FiCheck, accent: "#10b981",
          title: "100% on-budget delivery",
          description: "Every quote is fixed. You know exactly what you're buying before signing. No surprise invoice. Ever.",
          tag: "Readable quotes · Custom scope",
        },
        {
          num: "04", icon: FiClock, accent: "#f59e0b",
          title: "Reply guaranteed in 24h",
          description: "Quote request, technical question, or brief: first reply on the next business day, without exception. Direct senior access.",
          tag: "Reply within 24 business hours",
        },
      ],
    },
    de: {
      eyebrow: "Warum KAH Digital",
      title: "Ein System. Nicht nur eine Website.",
      body: "Wir verkaufen keine Entwicklungsstunden. Wir liefern Systeme, die messbare Ergebnisse für Ihr Unternehmen produzieren.",
      reasons: [
        {
          num: "01", icon: FiZap, accent: "#3b82f6",
          title: "Schnelle Ausführung, sofortige Ergebnisse",
          description: "Kurzes Briefing, klare Entscheidungen. Starter in 2–3 Wochen. Vollständiges System in 4–6 Wochen.",
          tag: "Durchschnitt: 3–6 Wochen",
        },
        {
          num: "02", icon: FiGlobe, accent: "#8b5cf6",
          title: "KI & internationale Expertise",
          description: "Claude, OpenAI, Supabase-Automatisierungen. Wir bauen mit den besten KI-Tools und operieren international.",
          tag: "DE · FR · EN · International",
        },
        {
          num: "03", icon: FiCheck, accent: "#10b981",
          title: "100% Budget eingehalten",
          description: "Jedes Angebot ist fest. Sie wissen genau, was Sie kaufen, bevor Sie unterschreiben. Keine Überraschungsrechnung.",
          tag: "Lesbare Angebote · Individuell",
        },
        {
          num: "04", icon: FiClock, accent: "#f59e0b",
          title: "Antwort in 24h garantiert",
          description: "Angebotsanfrage, technische Frage oder Brief: erste Rückmeldung am nächsten Werktag, ohne Ausnahme.",
          tag: "Antwort in 24 Arbeitsstunden",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {copy.reasons.map((reason, i) => (
            <motion.div
              key={reason.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gray-900 p-7 transition-all duration-300 hover:border-white/16 hover:-translate-y-0.5"
            >
              <span className="absolute right-5 top-4 text-6xl font-black text-white/[0.04] select-none">{reason.num}</span>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${reason.accent}18`, border: `1px solid ${reason.accent}30` }}
                >
                  <reason.icon size={22} style={{ color: reason.accent }} />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-2 text-lg font-bold text-white">{reason.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">{reason.description}</p>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${reason.accent}15`, color: reason.accent }}>
                    {reason.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
