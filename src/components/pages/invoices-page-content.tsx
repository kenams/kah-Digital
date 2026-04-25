import Link from "next/link";
import { InvoicePreview } from "@/components/invoice-preview";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Facturation professionnelle",
    heroBody: "Des documents clairs, serieux et faciles a relire.",
    processTitle: "Notre processus de facturation",
    processBody: "Transparence et professionnalisme dans tous nos echanges financiers.",
    process: [
      { title: "Devis et echeancier", body: "Envoi d'un devis complet en CHF avec planning, conditions et modalites de paiement avant le lancement." },
      { title: "Paiement en ligne ou virement", body: "Le reglement peut se faire par lien Stripe securise ou par virement bancaire, en une fois ou selon l'echeancier precise sur le devis." },
      { title: "Coordonnées et référence", body: "Le lien de paiement, les coordonnées bancaires et la référence sont communiqués sur le devis validé ou la facture finale." },
    ],
    previewEyebrow: "Apercu",
    previewTitle: "Exemple de facture KAH-Digital",
    previewBody: "Un document plus clair, plus lisible et adapte au mobile comme au desktop.",
    featuresTitle: "Caracteristiques de nos factures",
    features: [
      { title: "Format professionnel", body: "Design soigne et informations completes." },
      { title: "Structure claire", body: "Lecture rapide des postes, totaux et conditions." },
      { title: "TVA geree", body: "Logique TVA activable selon vos besoins." },
      { title: "Envoi numerique", body: "Factures envoyees par email et archivees." },
    ],
    paymentLabel: "Paiement",
    paymentBody: "KAH-Digital peut maintenant envoyer un lien Stripe securise pour payer un acompte ou le solde, tout en gardant le virement bancaire comme alternative si besoin.",
    paymentCta: "Payer en ligne",
    ctaTitle: "Questions sur la facturation ?",
    ctaBody: "Notre processus est transparent et adapte a des missions simples comme plus avancees.",
    ctaLabel: "Nous contacter",
  },
  en: {
    heroTitle: "Professional invoicing",
    heroBody: "Clear, serious documents that stay easy to review.",
    processTitle: "Our billing process",
    processBody: "Transparency and professionalism in every financial exchange.",
    process: [
      { title: "Quote and payment schedule", body: "A full CHF quote with scope, timing, and payment terms before production starts." },
      { title: "Online payment or bank transfer", body: "Payment can be made through a secure Stripe link or by bank transfer, in one payment or according to the quote schedule." },
      { title: "Reference and billing details", body: "The payment link, bank details, and payment reference are shared on the approved quote or final invoice." },
    ],
    previewEyebrow: "Preview",
    previewTitle: "KAH-Digital invoice example",
    previewBody: "A clearer, cleaner document adapted to desktop and mobile reading.",
    featuresTitle: "What our invoices include",
    features: [
      { title: "Professional format", body: "A careful layout with complete information." },
      { title: "Clear structure", body: "Fast reading of line items, totals, and payment terms." },
      { title: "VAT ready", body: "VAT logic can be enabled when needed." },
      { title: "Digital delivery", body: "Invoices are sent by email and archived properly." },
    ],
    paymentLabel: "Payment",
    paymentBody: "KAH-Digital can now send a secure Stripe payment link for a deposit or the balance, while keeping bank transfer available when needed.",
    paymentCta: "Pay online",
    ctaTitle: "Questions about billing?",
    ctaBody: "Our process stays transparent and suitable for both simple and more advanced missions.",
    ctaLabel: "Contact us",
  },
  de: {
    heroTitle: "Professionelle Rechnungsstellung",
    heroBody: "Klare, serioese Dokumente, die einfach zu pruefen bleiben.",
    processTitle: "Unser Rechnungsprozess",
    processBody: "Transparenz und Professionalitaet in allen finanziellen Schritten.",
    process: [
      { title: "Offerte und Zahlungsplan", body: "Vor Projektstart erhaltet ihr eine vollstaendige CHF-Offerte mit Scope, Timing und Zahlungsbedingungen." },
      { title: "Online-Zahlung oder Ueberweisung", body: "Die Zahlung kann per sicherem Stripe-Link oder per Bankueberweisung erfolgen, einmalig oder gemaess Zahlungsplan." },
      { title: "Referenz und Zahlungsdaten", body: "Zahlungslink, Bankdaten und Referenz stehen auf der bestaetigten Offerte oder der finalen Rechnung." },
    ],
    previewEyebrow: "Vorschau",
    previewTitle: "Beispiel einer KAH-Digital Rechnung",
    previewBody: "Ein klareres Dokument, gut lesbar auf Desktop und Mobil.",
    featuresTitle: "Was unsere Rechnungen mitbringen",
    features: [
      { title: "Professionelles Format", body: "Saubere Gestaltung und vollstaendige Informationen." },
      { title: "Klare Struktur", body: "Schnelles Lesen von Positionen, Totalsummen und Bedingungen." },
      { title: "MwSt. vorbereitet", body: "Die Mehrwertsteuer-Logik kann bei Bedarf aktiviert werden." },
      { title: "Digitale Zustellung", body: "Rechnungen werden per E-Mail versendet und sauber archiviert." },
    ],
    paymentLabel: "Zahlung",
    paymentBody: "KAH-Digital kann jetzt einen sicheren Stripe-Link fuer Anzahlung oder Restbetrag senden und behaelt die Bankueberweisung als Alternative bei.",
    paymentCta: "Online bezahlen",
    ctaTitle: "Fragen zur Rechnungsstellung?",
    ctaBody: "Unser Prozess bleibt transparent und funktioniert fuer einfache wie auch anspruchsvollere Missionen.",
    ctaLabel: "Kontakt aufnehmen",
  },
} as const;

export function InvoicesPageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{content.heroTitle}</h1>
          <p className="text-xl">{content.heroBody}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{content.processTitle}</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">{content.processBody}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.process.map((item, index) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xl font-bold text-green-600">{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{content.previewEyebrow}</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-slate-900">{content.previewTitle}</h2>
            <p className="text-lg text-slate-600">{content.previewBody}</p>
          </div>
          <InvoicePreview locale={locale} />
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{content.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-2xl text-green-600">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-green-100 bg-white p-6 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-green-700">{content.paymentLabel}</p>
            <p className="mt-3 text-lg text-gray-700">{content.paymentBody}</p>
            <Link
              href={withLocalePrefix("/payer", locale)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              {content.paymentCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">{content.ctaTitle}</h2>
          <p className="mb-8 text-xl">{content.ctaBody}</p>
          <Link
            href={withLocalePrefix("/contact", locale)}
            className="rounded-full bg-white px-8 py-3 font-semibold text-green-600 transition-colors hover:bg-gray-100"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
