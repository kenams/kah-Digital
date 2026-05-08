"use client";

import { FiMessageSquare, FiFileText, FiCode, FiCheckCircle, FiHeadphones } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProcessSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Notre méthode",
      title: "5 étapes pour un projet livré proprement",
      body: "Un processus structuré qui élimine les surprises et garantit un résultat à la hauteur de vos attentes.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnostic & échange",
          description: "On comprend votre besoin réel, votre secteur et vos objectifs. Questions claires, pas de jargon. Réponse sous 24h ouvrables.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Devis clair & périmètre",
          description: "Un devis lisible avec les fonctionnalités, le budget et le planning. Vous savez exactement ce que vous achetez, sans surprise à la facture.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Création & validation",
          description: "Développement par itérations avec points de validation réguliers. Vous suivez l'avancement et validez avant la mise en ligne.",
        },
        {
          num: "04",
          icon: FiCheckCircle,
          accent: "#f59e0b",
          title: "Tests & mise en ligne",
          description: "Tests desktop, mobile, performances et SEO avant livraison. Mise en ligne propre et accompagnée, sans stress ni improvisation.",
        },
        {
          num: "05",
          icon: FiHeadphones,
          accent: "#ec4899",
          title: "Accompagnement post-livraison",
          description: "Période de corrections incluse après mise en ligne. Support disponible pour les questions, évolutions et améliorations futures.",
        },
      ],
    },
    en: {
      eyebrow: "Our method",
      title: "5 steps to a cleanly delivered project",
      body: "A structured process that eliminates surprises and guarantees results that match your expectations.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnosis & discovery",
          description: "We understand your real need, sector, and goals. Clear questions, no jargon. Reply within 24 business hours.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Clear quote & scope",
          description: "A readable quote with features, budget, and timeline. You know exactly what you're buying. No surprise invoice.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Build & validation",
          description: "Iterative development with regular check-ins. You follow progress and validate before go-live.",
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
          title: "Post-launch support",
          description: "Correction period included after launch. Support available for questions, evolutions, and future improvements.",
        },
      ],
    },
    de: {
      eyebrow: "Unsere Methode",
      title: "5 Schritte für ein sauber geliefertes Projekt",
      body: "Ein strukturierter Prozess, der Überraschungen eliminiert und ein Ergebnis garantiert, das Ihren Erwartungen entspricht.",
      steps: [
        {
          num: "01",
          icon: FiMessageSquare,
          accent: "#3b82f6",
          title: "Diagnose & Austausch",
          description: "Wir verstehen Ihren echten Bedarf, Ihre Branche und Ihre Ziele. Klare Fragen, kein Fachjargon. Antwort in 24 Arbeitsstunden.",
        },
        {
          num: "02",
          icon: FiFileText,
          accent: "#8b5cf6",
          title: "Klares Angebot & Scope",
          description: "Ein lesbares Angebot mit Funktionen, Budget und Zeitplan. Sie wissen genau, was Sie kaufen. Keine Überraschungsrechnung.",
        },
        {
          num: "03",
          icon: FiCode,
          accent: "#10b981",
          title: "Entwicklung & Validierung",
          description: "Iterative Entwicklung mit regelmäßigen Checkpoints. Sie verfolgen den Fortschritt und validieren vor dem Launch.",
        },
        {
          num: "04",
          icon: FiCheckCircle,
          accent: "#f59e0b",
          title: "Tests & Launch",
          description: "Desktop-, Mobile-, Performance- und SEO-Tests vor der Lieferung. Sauberer, begleiteter Launch, kein Stress.",
        },
        {
          num: "05",
          icon: FiHeadphones,
          accent: "#ec4899",
          title: "Support nach dem Launch",
          description: "Korrekturphase nach dem Launch inbegriffen. Support für Fragen, Weiterentwicklungen und künftige Verbesserungen.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/30 via-violet-500/20 to-transparent lg:block" />

          <div className="space-y-6">
            {copy.steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col gap-6 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Step card */}
                <div className="flex-1 rounded-2xl border border-white/8 bg-gray-900/60 p-6 transition-all hover:border-white/16">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
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

                {/* Step number — center */}
                <div className="flex shrink-0 items-center justify-center lg:w-16">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 font-extrabold text-sm"
                    style={{ borderColor: `${step.accent}60`, color: step.accent, background: `${step.accent}15` }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Empty spacer for alternating layout */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
