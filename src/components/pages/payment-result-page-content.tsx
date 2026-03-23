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
      eyebrow: "Paiement confirmé",
      title: "Paiement bien enregistré",
      body: "Merci. Le paiement a été transmis à KAH-Digital. Nous revenons vers vous rapidement avec la suite du projet ou la confirmation de facture.",
      primary: "Retour à l'accueil",
      secondary: "Nous contacter",
    },
    cancel: {
      eyebrow: "Paiement interrompu",
      title: "Le paiement n'a pas été finalisé",
      body: "Aucun débit final n'a été confirmé. Vous pouvez reprendre plus tard avec le lien reçu ou nous contacter si vous voulez un autre mode de règlement.",
      primary: "Retour à l'accueil",
      secondary: "Contacter KAH-Digital",
    },
    reference: "Référence Stripe",
  },
  en: {
    success: {
      eyebrow: "Payment confirmed",
      title: "Your payment was recorded",
      body: "Thank you. The payment was sent to KAH-Digital. We will get back to you shortly with the next project steps or invoice confirmation.",
      primary: "Back to home",
      secondary: "Contact us",
    },
    cancel: {
      eyebrow: "Payment interrupted",
      title: "The payment was not completed",
      body: "No final charge was confirmed. You can try again later with the same link or contact us if you need another payment method.",
      primary: "Back to home",
      secondary: "Contact KAH-Digital",
    },
    reference: "Stripe reference",
  },
  de: {
    success: {
      eyebrow: "Zahlung bestaetigt",
      title: "Die Zahlung wurde registriert",
      body: "Danke. Die Zahlung wurde an KAH-Digital uebermittelt. Wir melden uns rasch mit den naechsten Schritten oder der Rechnungsbestaetigung.",
      primary: "Zur Startseite",
      secondary: "Kontakt aufnehmen",
    },
    cancel: {
      eyebrow: "Zahlung unterbrochen",
      title: "Die Zahlung wurde nicht abgeschlossen",
      body: "Es wurde keine endgueltige Belastung bestaetigt. Du kannst spaeter mit demselben Link fortfahren oder uns fuer eine andere Zahlungsart kontaktieren.",
      primary: "Zur Startseite",
      secondary: "KAH-Digital kontaktieren",
    },
    reference: "Stripe-Referenz",
  },
} as const;

export function PaymentResultPageContent({ locale, status, sessionId }: Props) {
  const content = copy[locale][status];

  return (
    <section className="min-h-[70vh] bg-[radial-gradient(circle_at_top,rgba(127,184,199,0.18),transparent_42%),linear-gradient(180deg,#0b0e14,#111827)] py-20 text-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-[#7fb8c7]">{content.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{content.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/72">{content.body}</p>

          {sessionId ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">{copy[locale].reference}</p>
              <p className="mt-2 break-all font-mono text-sm text-white/80">{sessionId}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={withLocalePrefix("/", locale)}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#11131b] transition hover:brightness-105"
            >
              {content.primary}
            </Link>
            <Link
              href={withLocalePrefix("/contact", locale)}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/82 transition hover:border-white hover:text-white"
            >
              {content.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
