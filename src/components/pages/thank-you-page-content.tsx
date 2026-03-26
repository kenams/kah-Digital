import Link from "next/link";
import { brandContact } from "@/config/brand";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Merci",
    title: "Demande envoyee.",
    body: "On revient vers toi rapidement avec un cadre plus clair, des recommandations utiles et un planning realiste.",
    home: "Retour a l'accueil",
    email: "Ecrire un email",
    call: "Appeler",
    calendly: "Planifier un appel",
    markers: [
      { label: "Retour", value: "Reponse rapide avec direction concrete" },
      { label: "Format", value: "Budget, recommandations et prochaine etape" },
      { label: "Canal", value: "Email, appel ou rendez-vous si utile" },
    ],
  },
  en: {
    eyebrow: "Thank you",
    title: "Request sent.",
    body: "We will get back to you quickly with a clearer frame, useful recommendations, and a realistic timeline.",
    home: "Back to home",
    email: "Send an email",
    call: "Call",
    calendly: "Schedule a call",
    markers: [
      { label: "Reply", value: "Fast answer with concrete direction" },
      { label: "Format", value: "Budget, recommendations, and next step" },
      { label: "Channel", value: "Email, call, or meeting when useful" },
    ],
  },
  de: {
    eyebrow: "Danke",
    title: "Anfrage gesendet.",
    body: "Wir melden uns zeitnah mit einem klareren Rahmen, nuetzlichen Empfehlungen und einem realistischen Timing.",
    home: "Zur Startseite",
    email: "E-Mail senden",
    call: "Anrufen",
    calendly: "Gespräch planen",
    markers: [
      { label: "Rueckmeldung", value: "Schnelle Antwort mit konkreter Richtung" },
      { label: "Format", value: "Budget, Empfehlungen und naechster Schritt" },
      { label: "Kanal", value: "E-Mail, Anruf oder Termin wenn sinnvoll" },
    ],
  },
} as const;

export function ThankYouPageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href={withLocalePrefix("/", locale)}
                className="rounded-full border border-white/20 px-5 py-2.5 text-white/82 transition hover:border-white hover:bg-white/5 hover:text-white"
              >
                {content.home}
              </Link>
              <Link
                href={`mailto:${brandContact.email}`}
                className="rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-neutral-200"
              >
                {content.email}
              </Link>
              <Link
                href={`tel:${brandContact.phoneHref}`}
                className="rounded-full border border-white/20 px-5 py-2.5 text-white/82 transition hover:border-white hover:bg-white/5 hover:text-white"
              >
                {content.call}
              </Link>
              {brandContact.calendlyUrl && (
                <Link
                  href={brandContact.calendlyUrl}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-white/82 transition hover:border-white hover:bg-white/5 hover:text-white"
                >
                  {content.calendly}
                </Link>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            {content.markers.map((item, index) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white/78">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                  0{index + 1} / {item.label}
                </p>
                <p className="mt-3 text-sm leading-7">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
