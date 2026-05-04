import { SmartQuoteForm } from "@/components/smart-quote-form";
import { QuoteForm } from "@/components/quote-form";
import type { Locale } from "@/lib/locales";

type QuotePageContentProps = {
  locale: Locale;
};

const COPY = {
  fr: {
    eyebrow: "Devis gratuit · Réponse sous 24h",
    title: "Quel projet souhaitez-vous réaliser ?",
    subtitle: "Choisissez votre service, remplissez vos coordonnées et décrivez votre idée.\nOn vous répond avec un devis clair sous 24h — sans engagement.",
    reassurance: [
      { icon: "⚡", label: "Réponse sous 24h",  sub: "Jours ouvrés" },
      { icon: "🔒", label: "Sans engagement",    sub: "Aucune obligation" },
      { icon: "💶", label: "Dès 300 €",          sub: "Tarifs transparents" },
      { icon: "🌍", label: "France & Suisse",    sub: "Remote ou présentiel" },
    ],
  },
  en: {
    eyebrow: "Free quote · Reply within 24h",
    title: "What project do you have in mind?",
    subtitle: "Pick your service, fill in your details and describe your idea.\nWe'll reply with a clear quote within 24 hours — no commitment.",
    reassurance: [
      { icon: "⚡", label: "Reply within 24h",    sub: "Business days" },
      { icon: "🔒", label: "No commitment",        sub: "Completely free" },
      { icon: "💶", label: "From 300 €",           sub: "Transparent pricing" },
      { icon: "🌍", label: "France & Switzerland", sub: "Remote or on-site" },
    ],
  },
} as const;

export function QuotePageContent({ locale }: QuotePageContentProps) {
  // FR and EN both use the new smart form
  if (locale === "fr" || locale === "en") {
    const c = COPY[locale];
    return (
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.18),transparent_50%),linear-gradient(180deg,#020b18_0%,#04070d_100%)]">
        {/* Hero */}
        <section className="border-b border-white/8 px-4 pb-10 pt-16 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-400">{c.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {c.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55 sm:text-lg">
            {c.subtitle.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br className="hidden sm:block" />}</span>
            ))}
          </p>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <SmartQuoteForm locale={locale} />
        </section>

        {/* Reassurance footer */}
        <section className="border-t border-white/8 px-4 py-8 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-center">
            {c.reassurance.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // DE fallback — old form
  return (
    <section className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_40%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center text-white">
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Kostenlose Projektanfrage</h1>
          <p className="mt-4 text-base text-white/70">
            Beschreibe dein Projekt und erhalte eine klare Antwort mit Budget und Timing.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
