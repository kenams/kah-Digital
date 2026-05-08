"use client";

import { FiCheck, FiClock, FiUsers, FiZap } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function WhyChooseSection() {
  const { locale } = useLocale();
  const copy = {
    fr: {
      eyebrow: "Pourquoi KAH-Digital",
      title: "Un studio qui livre. Pas qui promet.",
      body: "Pas de sur-promesse, pas de scope flou. Un cadrage clair, une production propre et un projet livrable du début à la fin.",
      reasons: [
        {
          num: "01",
          icon: FiZap,
          accent: "#3b82f6",
          title: "Exécution rapide",
          description: "Cadrage court, décisions claires. Un site vitrine en 3 semaines, une app structurée en 6. Pas d'aller-retours inutiles.",
          tag: "Délai moyen : 3–6 semaines",
        },
        {
          num: "02",
          icon: FiUsers,
          accent: "#8b5cf6",
          title: "Un seul interlocuteur",
          description: "Pas de chef de projet intermédiaire. Tu parles directement à celui qui conçoit et développe : FR, EN ou DE.",
          tag: "FR · EN · DE",
        },
        {
          num: "03",
          icon: FiCheck,
          accent: "#10b981",
          title: "Scope propre, pas gonflé",
          description: "Chaque devis couvre ce qui est nécessaire, pas plus. Transparence totale sur les fonctionnalités et le budget.",
          tag: "Devis lisibles · € 300+",
        },
        {
          num: "04",
          icon: FiClock,
          accent: "#f59e0b",
          title: "Réponse garantie en 24h",
          description: "Demande de devis, question technique ou brief : premier retour le jour ouvrable suivant, sans exception.",
          tag: "Réponse sous 24h ouvrables",
        },
      ],
    },
    en: {
      eyebrow: "Why KAH-Digital",
      title: "A studio that delivers. Not just promises.",
      body: "No over-promising, no vague scopes. Clear framing, clean production, and a project that stays deliverable from start to finish.",
      reasons: [
        {
          num: "01",
          icon: FiZap,
          accent: "#3b82f6",
          title: "Fast execution",
          description: "Short scoping, clear decisions. A showcase site in 3 weeks, a structured app in 6. No unnecessary back-and-forth.",
          tag: "Average: 3–6 weeks",
        },
        {
          num: "02",
          icon: FiUsers,
          accent: "#8b5cf6",
          title: "One point of contact",
          description: "No middleman project manager. You work directly with the person who designs and builds: FR, EN, or DE.",
          tag: "FR · EN · DE",
        },
        {
          num: "03",
          icon: FiCheck,
          accent: "#10b981",
          title: "Clean scope, no bloat",
          description: "Every quote covers what is needed, nothing more. Full transparency on features and budget from day one.",
          tag: "Readable quotes · € 300+",
        },
        {
          num: "04",
          icon: FiClock,
          accent: "#f59e0b",
          title: "Reply guaranteed in 24h",
          description: "Quote request, technical question, or brief: first reply on the next business day, without exception.",
          tag: "Reply within 24 business hours",
        },
      ],
    },
    de: {
      eyebrow: "Warum KAH-Digital",
      title: "Ein Studio das liefert. Nicht nur verspricht.",
      body: "Keine Ueberversprechen, kein vager Scope. Klares Briefing, saubere Umsetzung und ein Projekt das wirklich abgeschlossen wird.",
      reasons: [
        {
          num: "01",
          icon: FiZap,
          accent: "#3b82f6",
          title: "Schnelle Umsetzung",
          description: "Kurzes Briefing, klare Entscheidungen. Eine Unternehmenswebsite in 3 Wochen, eine App in 6. Keine unnötigen Schleifen.",
          tag: "Durchschnitt: 3–6 Wochen",
        },
        {
          num: "02",
          icon: FiUsers,
          accent: "#8b5cf6",
          title: "Ein Ansprechpartner",
          description: "Kein Zwischenmanager. Du arbeitest direkt mit dem, der entwirft und entwickelt: DE, FR oder EN.",
          tag: "DE · FR · EN",
        },
        {
          num: "03",
          icon: FiCheck,
          accent: "#10b981",
          title: "Sauberer Scope, kein Overhead",
          description: "Jedes Angebot deckt was benoetigt wird, nicht mehr. Volle Transparenz ueber Funktionen und Budget.",
          tag: "Lesbare Angebote · € 300+",
        },
        {
          num: "04",
          icon: FiClock,
          accent: "#f59e0b",
          title: "Antwort in 24h garantiert",
          description: "Angebotsanfrage, technische Frage oder Brief: erste Rückmeldung am nächsten Werktag, ohne Ausnahme.",
          tag: "Antwort in 24 Arbeitsstunden",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {copy.reasons.map((reason) => (
            <div
              key={reason.num}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gray-900 p-7 transition-all duration-300 hover:border-white/16"
            >
              {/* Number watermark */}
              <span className="absolute right-5 top-4 text-6xl font-black text-white/[0.04] select-none">
                {reason.num}
              </span>

              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${reason.accent}18`, border: `1px solid ${reason.accent}30` }}
                >
                  <reason.icon size={22} style={{ color: reason.accent }} />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-2 text-lg font-bold text-white">{reason.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">{reason.description}</p>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: `${reason.accent}15`, color: reason.accent }}
                  >
                    {reason.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
