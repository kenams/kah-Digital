import { QuoteForm } from "@/components/quote-form";
import { QuotePreview } from "@/components/quote-preview";
import type { Locale } from "@/lib/locales";

type QuotePageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Demande de devis claire, rapide, exploitable.",
    heroBody:
      "Le but n'est pas d'envoyer une demande vague. Ce formulaire sert a cadrer ton besoin pour recevoir un retour utile sur budget, delai, niveau de complexite et piste recommandee.",
    eyebrow: "Devis express",
    title: "Decris ton projet proprement, on te repond avec une vraie direction.",
    body: "Tu peux t'en servir pour un site premium, une refonte, un assistant IA, un outil metier ou une combinaison plus utile.",
    cards: [
      { eyebrow: "Budget", body: "Tous les montants sont emis en CHF." },
      { eyebrow: "Paiement", body: "Virement bancaire par defaut, Stripe si le projet le demande." },
      { eyebrow: "Retour", body: "Reponse rapide avec niveau de complexite, pas seulement un prix." },
    ],
    previewEyebrow: "Apercu",
    previewTitle: "Le type de devis que tu peux recevoir",
    previewBody: "Un format plus lisible, plus defendable et plus facile a partager en interne.",
  },
  en: {
    heroTitle: "A quote request that is clear, fast, and usable.",
    heroBody:
      "The point is not to send a vague request. This form helps frame your need so you get a useful reply on budget, timeline, complexity level, and the recommended direction.",
    eyebrow: "Quick quote",
    title: "Describe the project properly, we answer with a real direction.",
    body: "You can use it for a premium website, redesign, AI assistant, business tool, or a more useful combination.",
    cards: [
      { eyebrow: "Budget", body: "All amounts are issued in CHF." },
      { eyebrow: "Payment", body: "Bank transfer by default, Stripe when the project needs it." },
      { eyebrow: "Reply", body: "Fast answer with complexity level, not just a price tag." },
    ],
    previewEyebrow: "Preview",
    previewTitle: "The kind of quote you can receive",
    previewBody: "A clearer, more defensible format that stays easy to share internally.",
  },
  de: {
    heroTitle: "Eine Projektanfrage, die klar, schnell und nutzbar ist.",
    heroBody:
      "Es geht nicht darum, eine vage Anfrage zu senden. Dieses Formular hilft, den Bedarf sauber zu rahmen, damit du eine nutzbare Rueckmeldung zu Budget, Timing, Komplexitaet und empfohlener Richtung bekommst.",
    eyebrow: "Schnelle Anfrage",
    title: "Beschreibe das Projekt sauber, wir antworten mit einer echten Richtung.",
    body: "Du kannst es fuer eine Premium-Website, ein Redesign, einen KI-Assistenten, ein Business-Tool oder eine sinnvollere Kombination nutzen.",
    cards: [
      { eyebrow: "Budget", body: "Alle Betraege werden in CHF ausgewiesen." },
      { eyebrow: "Zahlung", body: "Standardmaessig Bankueberweisung, Stripe wenn das Projekt es braucht." },
      { eyebrow: "Rueckmeldung", body: "Schnelle Antwort mit Komplexitaetseinschaetzung statt nur einem Preis." },
    ],
    previewEyebrow: "Vorschau",
    previewTitle: "Welche Art Offerte du erhalten kannst",
    previewBody: "Ein lesbareres, besser verteidigbares Format, das sich intern leichter teilen laesst.",
  },
} as const;

export function QuotePageContent({ locale }: QuotePageContentProps) {
  const content = copy[locale];

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(214,179,106,0.16),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/55">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">{content.heroTitle}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.heroBody}</p>
            </div>
            <div className="grid gap-3">
              {content.cards.map((card, index) => (
                <div key={card.eyebrow} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">0{index + 1} / {card.eyebrow}</p>
                  <p className="mt-3 text-sm leading-7">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-5xl text-center text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{content.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">{content.body}</p>
        </div>
        <div className="mt-8">
          <QuoteForm />
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 sm:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.previewEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.previewTitle}</h2>
              <p className="mt-4 text-base leading-7 text-white/68 sm:text-lg">{content.previewBody}</p>
            </div>
            <QuotePreview />
          </div>
        </div>
      </section>
    </>
  );
}
