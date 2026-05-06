import { SmartQuoteForm } from "@/components/smart-quote-form";
import { QuoteForm } from "@/components/quote-form";
import type { Locale } from "@/lib/locales";

type QuotePageContentProps = {
  locale: Locale;
};

const COPY = {
  fr: {
    urgency: "🔥 52 devis envoyés ce mois · 2 créneaux disponibles en mai",
    eyebrow: "Devis gratuit · Réponse sous 24h",
    title: "Quel projet souhaitez-vous réaliser ?",
    subtitle: "Choisissez votre service, remplissez vos coordonnées et décrivez votre idée.\nOn vous répond avec un devis clair sous 24h — sans engagement.",
    proofTitle: "Ils ont fait confiance à KAH-Digital",
    stats: [
      { value: "30+", label: "Projets livrés" },
      { value: "24h", label: "Délai de réponse" },
      { value: "5★", label: "Satisfaction client" },
      { value: "100%", label: "Budget respecté" },
    ],
    testimonials: [
      {
        quote: "4 nouveaux clients le premier mois après la mise en ligne.",
        author: "S. M.", role: "Coach business, Lyon",
      },
      {
        quote: "Les réservations ont augmenté de 30% en deux mois.",
        author: "A. B.", role: "Restaurateur, Genève",
      },
      {
        quote: "10 jours après le brief, mon site était en ligne.",
        author: "T. K.", role: "Développeur freelance, Paris",
      },
      {
        quote: "Dashboard en prod depuis 4 mois sans aucun bug.",
        author: "J. F.", role: "Co-fondateur startup, Fribourg",
      },
    ],
    process: [
      { step: "1", label: "Tu envoies ce formulaire", desc: "2 minutes max" },
      { step: "2", label: "On analyse ton projet", desc: "Sous 24h" },
      { step: "3", label: "Tu reçois un devis clair", desc: "Prix fixe + délai" },
      { step: "4", label: "On démarre quand tu veux", desc: "Ou jamais — aucune obligation" },
    ],
    reassurance: [
      { icon: "⚡", label: "Réponse sous 24h",  sub: "Jours ouvrés" },
      { icon: "🔒", label: "Sans engagement",    sub: "Aucune obligation" },
      { icon: "💶", label: "Dès 300 €",          sub: "Tarifs transparents" },
      { icon: "🌍", label: "France & Suisse",    sub: "Remote ou présentiel" },
    ],
  },
  en: {
    urgency: "🔥 52 quotes sent this month · 2 slots available in May",
    eyebrow: "Free quote · Reply within 24h",
    title: "What project do you have in mind?",
    subtitle: "Pick your service, fill in your details and describe your idea.\nWe'll reply with a clear quote within 24 hours — no commitment.",
    proofTitle: "They trusted KAH-Digital",
    stats: [
      { value: "30+", label: "Projects delivered" },
      { value: "24h", label: "Response time" },
      { value: "5★", label: "Client satisfaction" },
      { value: "100%", label: "Budget respected" },
    ],
    testimonials: [
      {
        quote: "4 new clients in the first month after launch.",
        author: "S. M.", role: "Business coach, Lyon",
      },
      {
        quote: "Bookings increased 30% in two months.",
        author: "A. B.", role: "Restaurant owner, Geneva",
      },
      {
        quote: "10 days after the brief, my site was live.",
        author: "T. K.", role: "Freelance developer, Paris",
      },
      {
        quote: "Dashboard in prod for 4 months with zero bugs.",
        author: "J. F.", role: "Co-founder startup, Fribourg",
      },
    ],
    process: [
      { step: "1", label: "You send this form", desc: "Takes 2 minutes" },
      { step: "2", label: "We analyse your project", desc: "Within 24h" },
      { step: "3", label: "You receive a clear quote", desc: "Fixed price + timeline" },
      { step: "4", label: "We start when you're ready", desc: "Or never — no obligation" },
    ],
    reassurance: [
      { icon: "⚡", label: "Reply within 24h",    sub: "Business days" },
      { icon: "🔒", label: "No commitment",        sub: "Completely free" },
      { icon: "💶", label: "From 300 €",           sub: "Transparent pricing" },
      { icon: "🌍", label: "France & Switzerland", sub: "Remote or on-site" },
    ],
  },
} as const;

export function QuotePageContent({ locale }: QuotePageContentProps) {
  if (locale === "fr" || locale === "en") {
    const c = COPY[locale];
    return (
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.18),transparent_50%),linear-gradient(180deg,#020b18_0%,#04070d_100%)]">

        {/* Urgency strip */}
        <div className="border-b border-white/6 bg-white/4 py-2 text-center text-xs font-medium text-white/70">
          {c.urgency}
        </div>

        {/* Hero */}
        <section className="border-b border-white/8 px-4 pb-10 pt-12 text-center sm:px-6">
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

        {/* Two-column: Form + Proof */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">

            {/* Form */}
            <div>
              <SmartQuoteForm locale={locale} />
            </div>

            {/* Right panel: stats + testimonials + process */}
            <aside className="space-y-6">

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {c.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center">
                    <p className="text-2xl font-black text-white">{s.value}</p>
                    <p className="mt-1 text-xs text-white/45">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">{c.proofTitle}</p>
                <div className="space-y-4">
                  {c.testimonials.map((t) => (
                    <div key={t.author} className="border-l-2 border-sky-500/50 pl-3">
                      <p className="text-sm font-medium leading-snug text-white/85">"{t.quote}"</p>
                      <p className="mt-1 text-xs text-white/40">{t.author} · {t.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <div className="space-y-3">
                  {c.process.map((p) => (
                    <div key={p.step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400">
                        {p.step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{p.label}</p>
                        <p className="text-xs text-white/40">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/33759558414?text=Bonjour%2C%20je%20veux%20un%20devis%20pour%20mon%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-4 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {locale === "fr" ? "Parler directement sur WhatsApp" : "Chat directly on WhatsApp"}
              </a>

            </aside>
          </div>
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
