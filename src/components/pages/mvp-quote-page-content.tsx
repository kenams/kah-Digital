import Image from "next/image";
import Link from "next/link";
import { MvpQuoteForm } from "@/components/mvp-quote-form";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    backHome: "Retour à l'accueil",
    backSecondary: "Devis rapide web",
    backSecondaryHref: "/configurateur",
    eyebrow: "Apps mobiles MVP",
    title: "Parle-nous de ton application iOS / Android.",
    body: "Ce formulaire est pensé pour cadrer un MVP mobile : plateformes, fonctionnalités incontournables, mood graphique et éventuelles intégrations. Nous revenons vers toi sous 24 h avec budget estimatif, planning, architecture proposée et plan de publication TestFlight / Play Store.",
    stats: [
      { value: "iOS + Android", body: "Builds Expo, push et analytics inclus." },
      { value: "4 à 6 semaines", body: "Pour sortir un premier jet TestFlight." },
      { value: "Stack moderne", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Aperçu MVP mobile",
  },
  en: {
    backHome: "Back to home",
    backSecondary: "Quick web quote",
    backSecondaryHref: "/configurateur",
    eyebrow: "Mobile MVP apps",
    title: "Tell us about your iOS / Android app.",
    body: "This form is designed to scope a mobile MVP: platforms, must-have features, visual mood, and integrations. We reply within 24h with an estimated budget, timeline, proposed architecture, and a TestFlight / Play Store plan.",
    stats: [
      { value: "iOS + Android", body: "Expo builds, push and analytics included." },
      { value: "4 to 6 weeks", body: "For a first TestFlight build." },
      { value: "Modern stack", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Mobile MVP preview",
  },
  de: {
    backHome: "Zur Startseite",
    backSecondary: "Web-Konfigurator",
    backSecondaryHref: "/configurateur",
    eyebrow: "Mobile MVP Apps",
    title: "Erzaehle uns von deiner iOS / Android App.",
    body: "Dieses Formular dient dazu, ein mobiles MVP sauber zu rahmen: Plattformen, Kernfunktionen, visueller Stil und moegliche Integrationen. Wir melden uns innerhalb von 24 Stunden mit Budgetrahmen, Timing, Architekturvorschlag und TestFlight / Play Store Plan.",
    stats: [
      { value: "iOS + Android", body: "Expo Builds, Push und Analytics inklusive." },
      { value: "4 bis 6 Wochen", body: "Fuer einen ersten TestFlight oder Android Build." },
      { value: "Moderner Stack", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Mobile MVP Vorschau",
  },
} as const;

export function MvpQuotePageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href={withLocalePrefix("/", locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          {content.backHome}
        </Link>
        <Link href={withLocalePrefix(content.backSecondaryHref, locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          {content.backSecondary}
        </Link>
      </div>
      <div className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-[#090b21] via-[#141036] to-[#2a1a55] px-6 py-8 text-white sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">{content.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">{content.body}</p>
        <div className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
          {content.stats.map((item) => (
            <div key={item.value} className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-xl font-semibold text-white sm:text-2xl">{item.value}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <MvpQuoteForm />
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-4">
          <Image src="/mockups/pulselearn.png" alt={content.imageAlt} width={760} height={520} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full rounded-2xl object-cover" />
        </div>
      </div>
    </div>
  );
}
