import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
  status: "success" | "cancel";
  sessionId?: string;
};

const copy = {
  fr: {
    success: {
      eyebrow: "Paiement confirme",
      title: "Paiement bien enregistre.",
      body: "Le paiement a bien ete transmis a KAH-Digital. Nous revenons vers vous rapidement avec la suite du projet ou la confirmation de facture.",
      primary: "Retour a l'accueil",
      secondary: "Nous contacter",
      markers: [
        { label: "Statut", value: "Paiement confirme par Stripe" },
        { label: "Suite", value: "Confirmation projet ou facture a suivre" },
        { label: "Canal", value: "Retour rapide par email" },
      ],
    },
    cancel: {
      eyebrow: "Paiement interrompu",
      title: "Le paiement n'a pas ete finalise.",
      body: "Aucun debit final n'a ete confirme. Vous pouvez reprendre plus tard avec le lien recu ou nous contacter si vous preferez un autre mode de reglement.",
      primary: "Retour a l'accueil",
      secondary: "Contacter KAH-Digital",
      markers: [
        { label: "Statut", value: "Aucun debit final confirme" },
        { label: "Option", value: "Reprendre plus tard ou changer de mode de paiement" },
        { label: "Canal", value: "Support direct si besoin" },
      ],
    },
    reference: "Reference Stripe",
  },
  en: {
    success: {
      eyebrow: "Payment confirmed",
      title: "Payment recorded successfully.",
      body: "The payment was successfully sent to KAH-Digital. We will get back to you shortly with the next project step or invoice confirmation.",
      primary: "Back to home",
      secondary: "Contact us",
      markers: [
        { label: "Status", value: "Payment confirmed by Stripe" },
        { label: "Next", value: "Project or invoice confirmation to follow" },
        { label: "Channel", value: "Fast reply by email" },
      ],
    },
    cancel: {
      eyebrow: "Payment interrupted",
      title: "The payment was not completed.",
      body: "No final charge was confirmed. You can try again later with the same link or contact us if you prefer another payment method.",
      primary: "Back to home",
      secondary: "Contact KAH-Digital",
      markers: [
        { label: "Status", value: "No final charge confirmed" },
        { label: "Option", value: "Try again later or switch payment method" },
        { label: "Channel", value: "Direct support when needed" },
      ],
    },
    reference: "Stripe reference",
  },
  de: {
    success: {
      eyebrow: "Zahlung bestaetigt",
      title: "Zahlung erfolgreich registriert.",
      body: "Die Zahlung wurde erfolgreich an KAH-Digital uebermittelt. Wir melden uns rasch mit dem naechsten Projektschritt oder der Rechnungsbestaetigung.",
      primary: "Zur Startseite",
      secondary: "Kontakt aufnehmen",
      markers: [
        { label: "Status", value: "Zahlung durch Stripe bestaetigt" },
        { label: "Naechster Schritt", value: "Projekt- oder Rechnungsbestaetigung folgt" },
        { label: "Kanal", value: "Schnelle Rueckmeldung per E-Mail" },
      ],
    },
    cancel: {
      eyebrow: "Zahlung unterbrochen",
      title: "Die Zahlung wurde nicht abgeschlossen.",
      body: "Es wurde keine endgueltige Belastung bestaetigt. Du kannst spaeter mit demselben Link fortfahren oder uns fuer eine andere Zahlungsart kontaktieren.",
      primary: "Zur Startseite",
      secondary: "KAH-Digital kontaktieren",
      markers: [
        { label: "Status", value: "Keine endgueltige Belastung bestaetigt" },
        { label: "Option", value: "Spaeter fortfahren oder Zahlungsart wechseln" },
        { label: "Kanal", value: "Direkter Support bei Bedarf" },
      ],
    },
    reference: "Stripe-Referenz",
  },
} as const;

export function PaymentResultPageContent({ locale, status, sessionId }: Props) {
  const content = copy[locale][status];

  return (
    <section className="section-shell min-h-[70vh] pt-8 sm:pt-10 lg:pt-12">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/52">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.body}</p>

            {sessionId ? (
              <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{copy[locale].reference}</p>
                <p className="mt-2 break-all font-mono text-sm text-white/80">{sessionId}</p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withLocalePrefix("/", locale)}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-neutral-200"
              >
                {content.primary}
              </Link>
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/82 transition hover:border-white hover:bg-white/5 hover:text-white"
              >
                {content.secondary}
              </Link>
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
