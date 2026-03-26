"use client";

import { FiCheck, FiClock, FiLayers, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      title: "Ce qui rend KAH different",
      body: "La difference ne vient pas d'un slogan. Elle vient d'une execution plus lisible, plus elegante et plus utile pour l'entreprise.",
      manifesto: [
        "Une offre qui se comprend en quelques secondes.",
        "Un rendu premium qui rassure avant meme le premier appel.",
        "Une IA branchee au reel, pas un gadget de demo.",
      ],
      reasons: [
        {
          icon: FiZap,
          title: "Promesse business d'abord",
          description: "On parle acquisition, automatisation et gain de temps avant de parler stack ou jargon.",
        },
        {
          icon: FiLayers,
          title: "Design qui inspire confiance",
          description: "Un rendu premium aide deja a mieux vendre. Le fond est solide, la forme aussi.",
        },
        {
          icon: FiCheck,
          title: "IA sans usine a gaz",
          description: "L'assistant doit servir le support, la qualification ou l'operation, pas juste faire une demo vide.",
        },
        {
          icon: FiClock,
          title: "Projet lisible de bout en bout",
          description: "Devis clair, perimetre net, delais visibles et un interlocuteur qui garde le cap.",
        },
      ],
    },
    en: {
      title: "What makes KAH different",
      body: "The difference does not come from a slogan. It comes from cleaner execution, stronger design, and systems that stay useful for the company.",
      manifesto: [
        "An offer understood in seconds.",
        "A premium result that builds trust before the first call.",
        "AI connected to real operations, not a demo gimmick.",
      ],
      reasons: [
        {
          icon: FiZap,
          title: "Business promise first",
          description: "We talk acquisition, automation, and time savings before we talk stack or jargon.",
        },
        {
          icon: FiLayers,
          title: "Design that builds trust",
          description: "A premium result already sells better. The substance is solid and the form supports it.",
        },
        {
          icon: FiCheck,
          title: "AI without unnecessary complexity",
          description: "The assistant must help support, qualification, or operations, not just look impressive in a demo.",
        },
        {
          icon: FiClock,
          title: "Readable project end to end",
          description: "Clear quote, sharp scope, visible timing, and one point of contact keeping the direction clean.",
        },
      ],
    },
    de: {
      title: "Was KAH anders macht",
      body: "Der Unterschied kommt nicht aus einem Slogan. Er kommt aus klarerer Umsetzung, staerkerem Design und Systemen, die im Unternehmen nuetzlich bleiben.",
      manifesto: [
        "Ein Angebot, das in Sekunden verstanden wird.",
        "Ein Premium-Ergebnis, das vor dem ersten Call Vertrauen aufbaut.",
        "KI nah an der Realitaet statt Demo-Gimmick.",
      ],
      reasons: [
        {
          icon: FiZap,
          title: "Business-Versprechen zuerst",
          description: "Wir sprechen zuerst ueber Akquise, Automatisierung und Zeitgewinn, nicht ueber Jargon.",
        },
        {
          icon: FiLayers,
          title: "Design, das Vertrauen erzeugt",
          description: "Ein Premium-Ergebnis verkauft besser. Inhalt und Form spielen zusammen.",
        },
        {
          icon: FiCheck,
          title: "KI ohne unnoetige Komplexitaet",
          description: "Der Assistent soll Support, Qualifizierung oder Operations verbessern und nicht nur wie eine Demo wirken.",
        },
        {
          icon: FiClock,
          title: "Lesbares Projekt von Anfang bis Ende",
          description: "Klare Offerte, sauberer Scope, sichtbares Timing und ein Ansprechpartner mit Richtung.",
        },
      ],
    },
  }[locale];

  return (
    <section id="difference" className="section-shell">
      <div className="accent-section">
        <div className="content px-6 py-10 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/50">Difference</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">{copy.body}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">Manifesto</p>
                <div className="mt-5 space-y-4">
                  {copy.manifesto.map((item, index) => (
                    <div key={item} className="flex items-start gap-4">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6b36a]/30 bg-[#d6b36a]/10 text-xs font-semibold text-[#f3ddb0]">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-7 text-white/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {copy.reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className={`premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white ${index % 2 === 1 ? "md:translate-y-8" : ""}`}
                >
                <reason.icon className="text-[#d6b36a]" size={24} />
                <h3 className="mt-5 text-xl font-semibold text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
