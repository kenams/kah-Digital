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
    backHome: "Retour a l'accueil",
    backSecondary: "Devis rapide web",
    backSecondaryHref: "/configurateur",
    eyebrow: "Apps mobiles MVP",
    title: "Cadrer une app iOS / Android sans partir dans un brief flou.",
    body:
      "Ce formulaire sert a cadrer un MVP mobile realiste: plateformes, fonctions essentielles, style visuel et integrations. On revient ensuite avec un budget indicatif, un timing, une architecture proposee et une premiere logique de publication.",
    stats: [
      { value: "iOS + Android", body: "Expo builds, push et analytics inclus." },
      { value: "4 a 6 semaines", body: "Pour un premier build TestFlight ou Android beta." },
      { value: "Stack moderne", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Apercu MVP mobile",
  },
  en: {
    backHome: "Back to home",
    backSecondary: "Quick web quote",
    backSecondaryHref: "/configurateur",
    eyebrow: "Mobile MVP apps",
    title: "Scope an iOS / Android app without starting from a vague brief.",
    body:
      "This form is here to frame a realistic mobile MVP: platforms, essential features, visual direction, and integrations. We then reply with an indicative budget, timing, proposed architecture, and an initial release path.",
    stats: [
      { value: "iOS + Android", body: "Expo builds, push, and analytics included." },
      { value: "4 to 6 weeks", body: "For a first TestFlight or Android beta build." },
      { value: "Modern stack", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Mobile MVP preview",
  },
  de: {
    backHome: "Zur Startseite",
    backSecondary: "Web-Konfigurator",
    backSecondaryHref: "/configurateur",
    eyebrow: "Mobile MVP Apps",
    title: "Eine iOS / Android App sauber scopen, ohne mit einem vagen Briefing zu starten.",
    body:
      "Dieses Formular dient dazu, ein realistisches mobiles MVP zu rahmen: Plattformen, Kernfunktionen, visuelle Richtung und Integrationen. Danach melden wir uns mit Budgetrahmen, Timing, Architekturvorschlag und einer ersten Release-Logik.",
    stats: [
      { value: "iOS + Android", body: "Expo Builds, Push und Analytics inklusive." },
      { value: "4 bis 6 Wochen", body: "Fuer einen ersten TestFlight- oder Android-Beta-Build." },
      { value: "Moderner Stack", body: "React Native, Expo, Supabase, Stripe..." },
    ],
    imageAlt: "Mobile MVP Vorschau",
  },
} as const;

export function MvpQuotePageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <Link href={withLocalePrefix("/", locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
                  {content.backHome}
                </Link>
                <Link href={withLocalePrefix(content.backSecondaryHref, locale)} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
                  {content.backSecondary}
                </Link>
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>
            </div>
            <div className="grid gap-3">
              {content.stats.map((item, index) => (
                <div key={item.value} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                    0{index + 1} / {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-7">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1.06fr,0.94fr]">
          <MvpQuoteForm />
          <div className="premium-card rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <Image
              src="/mockups/pulselearn.png"
              alt={content.imageAlt}
              width={760}
              height={520}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full rounded-[26px] object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
