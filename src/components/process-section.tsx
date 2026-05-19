"use client";

import { motion } from "framer-motion";
import { FiMessageSquare, FiFileText, FiCode, FiCheckCircle, FiHeadphones } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProcessSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Notre méthode",
      title: "5 étapes. Zéro surprise.",
      body: "Un processus structuré, des décisions rapides et une livraison qui tient ses promesses — semaine après semaine.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnostic & cadrage",
          description: "On comprend votre besoin réel, vos objectifs et votre secteur. Questions claires, pas de jargon. Premier retour sous 24h ouvrables.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Devis ferme & périmètre",
          description: "Un devis lisible avec les fonctionnalités, le budget et le planning. Vous savez exactement ce que vous achetez. Aucune mauvaise surprise.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Build & validation",
          description: "Développement itératif avec points de validation réguliers. Vous suivez l'avancement et validez avant chaque milestone.",
        },
        {
          num: "04",
          icon: FiCheckCircle,
          accent: "#f59e0b",
          title: "Tests & mise en ligne",
          description: "Tests desktop, mobile, performance et SEO avant livraison. Déploiement propre, accompagné, sans stress ni improvisation.",
        },
        {
          num: "05",
          icon: FiHeadphones,
          accent: "#ec4899",
          title: "Support & évolutions",
          description: "Période de corrections incluse après livraison. Accès direct au senior pour les questions, évolutions et itérations futures.",
        },
      ],
    },
    en: {
      eyebrow: "Our method",
      title: "5 steps. Zero surprises.",
      body: "A structured process, fast decisions, and delivery that keeps its promises — week after week.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnosis & scoping",
          description: "We understand your real need, goals and sector. Clear questions, no jargon. First reply within 24 business hours.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Fixed quote & scope",
          description: "A readable quote with features, budget, and timeline. You know exactly what you're buying. No surprise invoice.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Build & validation",
          description: "Iterative development with regular check-ins. You track progress and validate before each milestone.",
        },
        {
          num: "04",
          icon: FiCheckCircle,
          accent: "#f59e0b",
          title: "Testing & launch",
          description: "Desktop, mobile, performance, and SEO tests before delivery. Clean, supported launch. No stress, no improvisation.",
        },
        {
          num: "05",
          icon: FiHeadphones,
          accent: "#ec4899",
          title: "Support & iterations",
          description: "Correction period included after launch. Direct senior access for questions, evolutions, and future improvements.",
        },
      ],
    },
    de: {
      eyebrow: "Unsere Methode",
      title: "5 Schritte. Null Überraschungen.",
      body: "Ein strukturierter Prozess, schnelle Entscheidungen und eine Lieferung, die ihre Versprechen hält — Woche für Woche.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnose & Briefing",
          description: "Wir verstehen Ihren echten Bedarf, Ihre Ziele und Ihre Branche. Klare Fragen, kein Fachjargon. Antwort in 24 Arbeitsstunden.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Festes Angebot & Scope",
          description: "Ein lesbares Angebot mit Funktionen, Budget und Zeitplan. Sie wissen genau, was Sie kaufen. Keine Überraschungsrechnung.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Entwicklung & Validierung",
          description: "Iterative Entwicklung mit regelmäßigen Checkpoints. Sie verfolgen den Fortschritt und validieren vor jedem Meilenstein.",
        },
        {
          num: "04",
          icon: FiCheckCircle,
          accent: "#f59e0b",
          title: "Tests & Launch",
          description: "Desktop-, Mobile-, Performance- und SEO-Tests vor der Lieferung. Sauberer, begleiteter Launch. Kein Stress.",
        },
        {
          num: "05",
          icon: FiHeadphones,
          accent: "#ec4899",
          title: "Support & Weiterentwicklung",
          description: "Korrekturphase nach dem Launch inbegriffen. Direkter Zugang zum Senior für Fragen, Weiterentwicklungen und Verbesserungen.",
        },
      ],
    },
  }[locale];

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
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/30 via-violet-500/20 to-transparent lg:block" />

          <div className="space-y-6">
            {copy.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex flex-col gap-6 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="group flex-1 rounded-2xl border border-white/8 bg-gray-900/60 p-6 transition-all hover:border-white/16 hover:bg-gray-900">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${step.accent}20` }}
                    >
                      <step.icon size={20} style={{ color: step.accent }} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-semibold text-white">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-center lg:w-16">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-extrabold"
                    style={{ borderColor: `${step.accent}60`, color: step.accent, background: `${step.accent}15` }}
                  >
                    {step.num}
                  </div>
                </div>

                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
