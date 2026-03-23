import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import type { Locale } from "@/lib/locales";
import { companyConfig } from "@/config/company";

type ContactPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Contactez-nous",
    heroBody: "Une question, un besoin ou un projet ? Réponse rapide et cadrage simple.",
    direct: "Contact direct",
    directTitle: "Parlons concrètement de ton besoin.",
    directBody:
      "Nous accompagnons des clients en Suisse et à l'international, avec une organisation simple, rapide et sans friction inutile.",
    canSend: "Ce que tu peux envoyer",
    canSendItems: [
      "Demande de devis ou cadrage rapide",
      "Question sur une refonte, un MVP ou une automatisation",
      "Support, maintenance ou demande technique ponctuelle",
    ],
    approach: "Approche",
    approachTitle: "Un contact simple, puis une suite claire.",
    approachBody: "Chaque échange doit permettre d'avancer vite, sans jargon ni parcours inutile.",
    cards: [
      { eyebrow: "Rapide", title: "Réponse sous 24h", body: "Un premier retour concret pour lancer l'échange sans attente inutile." },
      { eyebrow: "Clair", title: "Cadrage utile", body: "Un besoin bien compris avant toute proposition, devis ou plan d'action." },
      { eyebrow: "Direct", title: "Échange humain", body: "Des messages simples, exploitables et centrés sur ce qu'il faut faire ensuite." },
    ],
    contactCards: [
      { icon: FiMail, title: "Email", value: companyConfig.email },
      { icon: FiPhone, title: "Téléphone", value: companyConfig.phone },
      { icon: FiMapPin, title: "Localisation", value: `${companyConfig.city}, ${companyConfig.country}` },
      { icon: FiClock, title: "Disponibilité", value: "Lundi - Vendredi, 9h - 18h" },
    ],
  },
  en: {
    heroTitle: "Contact us",
    heroBody: "A question, a need, or a project? Fast reply and simple scoping.",
    direct: "Direct contact",
    directTitle: "Let's talk concretely about your need.",
    directBody:
      "We work with clients in Switzerland and internationally, with a simple setup, a fast pace, and no useless friction.",
    canSend: "What you can send",
    canSendItems: [
      "Quote request or quick scoping need",
      "Question about a redesign, MVP, or automation",
      "Support, maintenance, or a one-off technical request",
    ],
    approach: "Approach",
    approachTitle: "A simple first exchange, then a clear next step.",
    approachBody: "Each exchange should help move quickly, without jargon or useless process.",
    cards: [
      { eyebrow: "Fast", title: "Reply within 24h", body: "A first concrete answer to start the discussion without delay." },
      { eyebrow: "Clear", title: "Useful scoping", body: "A properly understood need before any proposal, quote, or action plan." },
      { eyebrow: "Direct", title: "Human exchange", body: "Simple, actionable messages focused on what should happen next." },
    ],
    contactCards: [
      { icon: FiMail, title: "Email", value: companyConfig.email },
      { icon: FiPhone, title: "Phone", value: companyConfig.phone },
      { icon: FiMapPin, title: "Location", value: `${companyConfig.city}, ${companyConfig.country}` },
      { icon: FiClock, title: "Availability", value: "Monday - Friday, 9am - 6pm" },
    ],
  },
  de: {
    heroTitle: "Kontakt",
    heroBody: "Frage, Bedarf oder Projekt? Schnelle Rueckmeldung und klares Briefing.",
    direct: "Direkter Kontakt",
    directTitle: "Lass uns konkret ueber dein Vorhaben sprechen.",
    directBody:
      "Wir begleiten Kunden in der Schweiz und international, mit einer einfachen Organisation, gutem Tempo und ohne unnoetige Reibung.",
    canSend: "Was du schicken kannst",
    canSendItems: [
      "Projektanfrage oder schnelles Briefing",
      "Frage zu Redesign, MVP oder Automatisierung",
      "Support, Wartung oder punktuelle technische Anfrage",
    ],
    approach: "Vorgehen",
    approachTitle: "Ein einfacher Kontakt, dann ein klarer naechster Schritt.",
    approachBody: "Jeder Austausch soll helfen, schnell weiterzukommen, ohne Jargon oder unnoetige Schleifen.",
    cards: [
      { eyebrow: "Schnell", title: "Antwort innerhalb von 24h", body: "Ein erster konkreter Ruecklauf, um den Austausch ohne Leerlauf zu starten." },
      { eyebrow: "Klar", title: "Nuetzliches Briefing", body: "Ein sauber verstandener Bedarf, bevor Angebot, Offerte oder Plan geschrieben werden." },
      { eyebrow: "Direkt", title: "Menschlicher Austausch", body: "Einfache, nutzbare Nachrichten mit Fokus auf den naechsten sinnvollen Schritt." },
    ],
    contactCards: [
      { icon: FiMail, title: "E-Mail", value: companyConfig.email },
      { icon: FiPhone, title: "Telefon", value: companyConfig.phone },
      { icon: FiMapPin, title: "Standort", value: `${companyConfig.city}, ${companyConfig.country}` },
      { icon: FiClock, title: "Erreichbarkeit", value: "Montag - Freitag, 9:00 - 18:00" },
    ],
  },
} as const;

export function ContactPageContent({ locale }: ContactPageContentProps) {
  const content = copy[locale];

  return (
    <>
      <section className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{content.heroTitle}</h1>
          <p className="text-xl">{content.heroBody}</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr,1.1fr] lg:px-8">
          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{content.direct}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{content.directTitle}</h2>
              <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{content.directBody}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
                    <Icon className="text-sky-300" size={28} />
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/55">{card.title}</p>
                    <p className="mt-2 text-base font-medium text-white/85">{card.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">{content.canSend}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {content.canSendItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{content.approach}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{content.approachTitle}</h2>
            <p className="mt-4 text-lg text-slate-600">{content.approachBody}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {content.cards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{card.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-slate-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
