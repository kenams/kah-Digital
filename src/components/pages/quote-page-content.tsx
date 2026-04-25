import { QuoteForm } from "@/components/quote-form";
import { QuotePreview } from "@/components/quote-preview";
import type { Locale } from "@/lib/locales";

type QuotePageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Demande de devis gratuit",
    heroBody: "Remplissez ce formulaire et recevez un retour clair avec budget, délai et recommandations.",
    eyebrow: "Devis express",
    title: "Décris ton projet clairement, on te répond vite.",
    body: "Budget, délai, recommandations et cadrage initial dans un format simple à relire.",
    cards: [
      { eyebrow: "Devise", body: "Tous les montants sont émis en €." },
      { eyebrow: "Paiement", body: "Règlement par virement bancaire." },
      { eyebrow: "Coordonnées", body: "Transmises sur devis validé ou facture finale." },
    ],
    previewEyebrow: "Aperçu",
    previewTitle: "Exemple de devis KAH-Digital",
    previewBody: "Un format plus clair, plus professionnel et plus facile à lire sur desktop comme sur mobile.",
  },
  en: {
    heroTitle: "Free quote request",
    heroBody: "Fill in the form and receive a clear reply with budget, timeline, and recommendations.",
    eyebrow: "Quick quote",
    title: "Describe your project clearly, we reply fast.",
    body: "Budget, timeline, recommendations, and initial scoping in a simple format you can review easily.",
    cards: [
      { eyebrow: "Currency", body: "All amounts are issued in €." },
      { eyebrow: "Payment", body: "Payment by bank transfer." },
      { eyebrow: "Details", body: "Shared on approved quote or final invoice." },
    ],
    previewEyebrow: "Preview",
    previewTitle: "KAH-Digital quote example",
    previewBody: "A clearer, more professional format that stays easy to read on desktop and mobile.",
  },
  de: {
    heroTitle: "Kostenlose Projektanfrage",
    heroBody: "Fülle dieses Formular aus und erhalte eine klare Rückmeldung mit Budget, Timing und Empfehlungen.",
    eyebrow: "Schnelle Anfrage",
    title: "Beschreibe dein Projekt klar, wir antworten schnell.",
    body: "Budget, Timing, Empfehlungen und ein erstes Briefing in einem einfachen Format zum Nachlesen.",
    cards: [
      { eyebrow: "Währung", body: "Alle Beträge werden in € ausgewiesen." },
      { eyebrow: "Zahlung", body: "Zahlung per Banküberweisung." },
      { eyebrow: "Kontaktdaten", body: "Werden auf dem bestätigten Angebot oder der Schlussrechnung übermittelt." },
    ],
    previewEyebrow: "Vorschau",
    previewTitle: "Beispiel einer KAH-Digital-Offerte",
    previewBody: "Ein klareres, professionelleres Format, das auf Desktop und Mobile gut lesbar bleibt.",
  },
} as const;

export function QuotePageContent({ locale }: QuotePageContentProps) {
  const content = copy[locale];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{content.heroTitle}</h1>
          <p className="text-xl">{content.heroBody}</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_40%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">{content.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{content.title}</h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">{content.body}</p>
          </div>
          <QuoteForm />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.cards.map((card) => (
              <div key={card.eyebrow} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{card.eyebrow}</p>
                <p className="mt-3 text-lg font-semibold text-white">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{content.previewEyebrow}</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-white">{content.previewTitle}</h2>
            <p className="text-lg text-gray-400">{content.previewBody}</p>
          </div>
          <QuotePreview />
        </div>
      </section>
    </>
  );
}
