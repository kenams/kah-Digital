import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactCard } from "@/components/contact-card";
import { ContactForm } from "@/components/contact-form";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";

type ContactPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Parlons concretement de ton besoin.",
    heroBody:
      "Question, demande de devis ou besoin plus technique: le but est d'obtenir rapidement un cadrage utile, pas de te faire passer dans un tunnel inutile.",
    direct: "Contact direct",
    directTitle: "Un premier echange simple, puis une suite claire.",
    directBody:
      "KAH-Digital travaille avec des clients francophones, anglophones et internationaux. Tu peux nous ecrire pour clarifier une offre, cadrer un projet IA, lancer un site, ou demander un point technique plus ponctuel.",
    canSend: "Tu peux nous ecrire pour",
    canSendItems: [
      "clarifier un projet web ou une refonte",
      "demander une premiere orientation sur un assistant IA",
      "poser une question sur un portail, un workflow ou GLPI",
      "obtenir un retour rapide sur budget et delai",
    ],
    approach: "Approche",
    approachTitle: "Ce qu'on privilegie dans chaque prise de contact",
    approachBody: "Un echange doit aider a avancer vite, avec une direction lisible et sans surpromesse.",
    cards: [
      { eyebrow: "Rapide", title: "Retour exploitable", body: "Pas une reponse de politesse. Un vrai point d'appui pour savoir quoi faire ensuite." },
      { eyebrow: "Clair", title: "Cadrage utile", body: "On cherche le bon levier, le bon scope et le niveau de complexite reel." },
      { eyebrow: "Direct", title: "Acces simple", body: "Tu peux nous parler business, support ou execution sans vocabulaire technique obligatoire." },
    ],
    contactCards: [
      { icon: FiMail, title: "Email", value: companyConfig.email },
      { icon: FiPhone, title: "Telephone", value: companyConfig.phone },
      { icon: FiMapPin, title: "Localisation", value: `${companyConfig.city}, ${companyConfig.country}` },
      { icon: FiClock, title: "Disponibilite", value: "Lundi - Vendredi, 9h - 18h" },
    ],
  },
  en: {
    heroTitle: "Let us talk concretely about your need.",
    heroBody:
      "Question, quote request, or more technical need: the goal is to get useful direction quickly, not to send you through a useless funnel.",
    direct: "Direct contact",
    directTitle: "A simple first exchange, then a clear next step.",
    directBody:
      "KAH-Digital works with French-speaking, English-speaking, and international clients. You can write to clarify an offer, scope an AI project, launch a website, or discuss a more technical request.",
    canSend: "You can write to us for",
    canSendItems: [
      "a website or redesign discussion",
      "first direction on an AI assistant project",
      "a question about a portal, workflow, or GLPI",
      "a quick reply on budget and timing",
    ],
    approach: "Approach",
    approachTitle: "What we prioritize in every first contact",
    approachBody: "Each exchange should create momentum with a readable direction and no inflated promise.",
    cards: [
      { eyebrow: "Fast", title: "Actionable reply", body: "Not a polite answer. A real next step you can use immediately." },
      { eyebrow: "Clear", title: "Useful scoping", body: "We look for the right lever, the right scope, and the real level of complexity." },
      { eyebrow: "Direct", title: "Simple access", body: "You can speak business, support, or execution without needing technical jargon." },
    ],
    contactCards: [
      { icon: FiMail, title: "Email", value: companyConfig.email },
      { icon: FiPhone, title: "Phone", value: companyConfig.phone },
      { icon: FiMapPin, title: "Location", value: `${companyConfig.city}, ${companyConfig.country}` },
      { icon: FiClock, title: "Availability", value: "Monday - Friday, 9am - 6pm" },
    ],
  },
  de: {
    heroTitle: "Lass uns konkret ueber dein Anliegen sprechen.",
    heroBody:
      "Frage, Projektanfrage oder technischer Bedarf: Das Ziel ist eine schnelle, nuetzliche Richtung und kein unnoetiger Funnel.",
    direct: "Direkter Kontakt",
    directTitle: "Ein einfacher erster Austausch, dann ein klarer naechster Schritt.",
    directBody:
      "KAH-Digital arbeitet mit frankophonen, englischsprachigen und internationalen Kunden. Du kannst schreiben, um ein Angebot zu schaerfen, ein KI-Projekt zu briefen, eine Website zu starten oder eine technische Frage zu klaeren.",
    canSend: "Du kannst uns schreiben fuer",
    canSendItems: [
      "ein Website- oder Redesign-Projekt",
      "eine erste Richtung fuer einen KI-Assistenten",
      "eine Frage zu Portal, Workflow oder GLPI",
      "eine schnelle Rueckmeldung zu Budget und Timing",
    ],
    approach: "Vorgehen",
    approachTitle: "Was wir bei jedem Erstkontakt priorisieren",
    approachBody: "Jeder Austausch soll Bewegung erzeugen, mit klarer Richtung und ohne uebertriebene Versprechen.",
    cards: [
      { eyebrow: "Schnell", title: "Nutzbare Rueckmeldung", body: "Keine Hoeflichkeitsantwort, sondern ein echter naechster Schritt." },
      { eyebrow: "Klar", title: "Nuetzliches Briefing", body: "Wir suchen den richtigen Hebel, den passenden Scope und die reale Komplexitaet." },
      { eyebrow: "Direkt", title: "Einfacher Zugang", body: "Du kannst ueber Business, Support oder Ausfuehrung sprechen, ohne Fachjargon zu brauchen." },
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
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(17,18,24,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(214,179,106,0.16),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/55">{content.direct}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">{content.heroTitle}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.heroBody}</p>
            </div>
            <div className="grid gap-3">
              {content.contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                    <div className="flex items-center gap-3">
                      <Icon className="text-[#d6b36a]" size={18} />
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{card.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7">{card.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="premium-card rounded-[30px] border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.direct}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">{content.directTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{content.directBody}</p>
            </div>
            <div className="premium-card rounded-[30px] border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.canSend}</p>
              <div className="mt-5 space-y-3">
                {content.canSendItems.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6b36a]/30 bg-[#d6b36a]/10 text-xs font-semibold text-[#f3ddb0]">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-7 text-white/72">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <ContactCard />
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 sm:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.approach}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.approachTitle}</h2>
              <p className="mt-4 text-base leading-7 text-white/68 sm:text-lg">{content.approachBody}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {content.cards.map((card) => (
                <div key={card.title} className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">{card.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/68">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
