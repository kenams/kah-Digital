import Link from "next/link";
import { FiCheckCircle, FiMail, FiPhone } from "react-icons/fi";
import { iaOfferById, type IaLocale } from "@/data/ia-offers";
import { ORDER_CONTACT } from "@/lib/pack-orders";

const COPY = {
  fr: {
    title: "Merci, c'est réservé",
    paidFor: (name: string) => <>Votre paiement pour <strong className="text-white">{name}</strong> a bien été transmis.</>,
    paid: "Votre paiement a bien été transmis.",
    receipt: "Stripe vous envoie un reçu par e-mail.",
    next: "La suite",
    steps: (sub: boolean) => [
      `Nous vous contactons sous 48 h ouvrées pour fixer ${sub ? "votre première séance" : "la date"}.`,
      "Vous répondez à quelques questions sur vos tâches et vos outils pour préparer la séance.",
      "La séance a lieu à distance, le lien de visio vous est envoyé par e-mail.",
    ],
    meanwhile: "Une question en attendant ?",
    back: "Retour aux offres IA",
  },
  en: {
    title: "Thank you, you're booked",
    paidFor: (name: string) => <>Your payment for <strong className="text-white">{name}</strong> has been received.</>,
    paid: "Your payment has been received.",
    receipt: "Stripe is sending you a receipt by e-mail.",
    next: "What happens next",
    steps: (sub: boolean) => [
      `We will contact you within 2 business days to schedule ${sub ? "your first session" : "the date"}.`,
      "You answer a few questions about your tasks and tools so we can prepare the session.",
      "The session takes place remotely; the video call link is sent to you by e-mail.",
    ],
    meanwhile: "Any questions in the meantime?",
    back: "Back to AI offers",
  },
  de: {
    title: "Vielen Dank, Ihre Buchung ist bestätigt",
    paidFor: (name: string) => <>Ihre Zahlung für <strong className="text-white">{name}</strong> ist eingegangen.</>,
    paid: "Ihre Zahlung ist eingegangen.",
    receipt: "Stripe sendet Ihnen eine Quittung per E-Mail.",
    next: "Wie es weitergeht",
    steps: (sub: boolean) => [
      `Wir melden uns innerhalb von 2 Werktagen, um ${sub ? "Ihre erste Sitzung" : "den Termin"} festzulegen.`,
      "Sie beantworten ein paar Fragen zu Ihren Aufgaben und Werkzeugen, damit wir die Sitzung vorbereiten können.",
      "Die Sitzung findet online statt, den Link zur Videokonferenz erhalten Sie per E-Mail.",
    ],
    meanwhile: "Noch Fragen?",
    back: "Zurück zu den KI-Angeboten",
  },
} as const;

const PREFIX: Record<IaLocale, string> = { fr: "", en: "/en", de: "/de" };

export function IaThanksPageContent({ locale, offerId }: { locale: IaLocale; offerId: string | undefined }) {
  const t = COPY[locale];
  const offer = iaOfferById(offerId);
  const steps = t.steps(Boolean(offer?.monthly));
  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <FiCheckCircle size={48} className="mx-auto text-[#d6b36a]" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-bold sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            {offer ? t.paidFor(offer.copy[locale].name) : t.paid} {t.receipt}
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
            <h2 className="font-semibold text-white">{t.next}</h2>
            <ol className="mt-4 space-y-3 text-sm text-white/75">
              {steps.map((s, i) => (
                <li key={s}>{i + 1}. {s}</li>
              ))}
            </ol>
          </div>
          <p className="mt-8 text-sm text-white/60">{t.meanwhile}</p>
          <div className="mt-3 flex flex-col justify-center gap-3 text-sm sm:flex-row">
            <a href={`mailto:${ORDER_CONTACT.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 hover:border-[#d6b36a]/60">
              <FiMail aria-hidden="true" /> {ORDER_CONTACT.email}
            </a>
            <a href={`tel:+33${ORDER_CONTACT.phone.replace(/\s/g, "").slice(1)}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 hover:border-[#d6b36a]/60">
              <FiPhone aria-hidden="true" /> {ORDER_CONTACT.phone}
            </a>
          </div>
          <p className="mt-10">
            <Link href={`${PREFIX[locale]}/ia-entreprise`} className="text-sm font-semibold text-[#f0d99b] underline-offset-4 hover:underline">
              {t.back}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
