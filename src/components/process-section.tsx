"use client";

import { FiActivity, FiCompass, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProcessSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      title: "3 etapes. Pas 12 reunions inutiles.",
      body: "Le process doit etre simple a suivre pour toi comme pour le client final. On garde donc un chemin court et tres lisible.",
      stepLabel: "Etape",
      stageLabels: ["Focus", "Build", "Launch"],
      steps: [
        {
          icon: FiCompass,
          title: "Diagnostiquer le vrai point de friction",
          description: "On identifie ce qui bloque aujourd'hui: offre confuse, demandes mal qualifiees, support trop manuel ou outil trop dispersif.",
        },
        {
          icon: FiZap,
          title: "Construire le bon systeme",
          description: "Site, assistant IA ou workflow metier: on assemble juste ce qu'il faut pour produire un gain visible sans gonfler le scope.",
        },
        {
          icon: FiActivity,
          title: "Mettre en ligne et mesurer",
          description: "Lancement propre, suivi des demandes, ajustements et passage de relais clair pour garder un systeme vraiment utile.",
        },
      ],
    },
    en: {
      title: "3 steps. Not 12 unnecessary meetings.",
      body: "The process should be simple for you and clear for the client side. We keep the path short and readable.",
      stepLabel: "Step",
      stageLabels: ["Focus", "Build", "Launch"],
      steps: [
        {
          icon: FiCompass,
          title: "Diagnose the real friction point",
          description: "We identify what is actually slowing things down: unclear offer, weak qualification, repetitive support, or a scattered tool stack.",
        },
        {
          icon: FiZap,
          title: "Build the right system",
          description: "Website, AI assistant, or workflow: we assemble only what is needed to create a visible gain without inflating the scope.",
        },
        {
          icon: FiActivity,
          title: "Launch and measure",
          description: "Clean release, request tracking, adjustments, and a clear handoff so the system stays useful after launch.",
        },
      ],
    },
    de: {
      title: "3 Schritte. Keine 12 unnoetigen Meetings.",
      body: "Der Prozess soll fuer dich einfach und fuer die Kundenseite klar nachvollziehbar bleiben. Darum halten wir den Weg kurz.",
      stepLabel: "Schritt",
      stageLabels: ["Focus", "Build", "Launch"],
      steps: [
        {
          icon: FiCompass,
          title: "Den echten Reibungspunkt erkennen",
          description: "Wir finden heraus, was wirklich bremst: unklarer Auftritt, schwache Qualifizierung, repetitiver Support oder ein zerstreutes Tool-Setup.",
        },
        {
          icon: FiZap,
          title: "Das richtige System bauen",
          description: "Website, KI-Assistent oder Workflow: Wir bauen nur das, was sichtbaren Nutzen bringt, ohne den Scope aufzublasen.",
        },
        {
          icon: FiActivity,
          title: "Live gehen und messen",
          description: "Sauberer Launch, Tracking der Anfragen, Anpassungen und klare Uebergabe, damit das System langfristig nuetzlich bleibt.",
        },
      ],
    },
  }[locale];

  return (
    <section id="process" className="section-shell">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Process</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">{copy.body}</p>
      </div>
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-7 top-0 hidden w-px bg-gradient-to-b from-[#d6b36a]/30 via-white/15 to-transparent md:block" />
        <div className="space-y-5">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="grid gap-4 md:grid-cols-[4rem,1fr] md:items-start">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(214,179,106,0.18),rgba(255,255,255,0.05))] text-[#f3ddb0] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <step.icon size={22} />
              </div>
              <div className="premium-card rounded-[28px] border border-white/10 bg-white/5 p-6 text-white">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                      {copy.stepLabel} 0{index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/12 bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-white/50">
                    {copy.stageLabels[index]}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
