import Link from "next/link";
import { InvoicePreview } from "@/components/invoice-preview";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    heroTitle: "Facturation professionnelle, lisible et defendable.",
    heroBody: "Des documents nets, un processus simple, et une lecture claire pour acompte, solde et suivi.",
    markers: [
      { label: "Clarte", value: "Montants, conditions et references faciles a verifier" },
      { label: "Paiement", value: "Virement ou lien Stripe securise selon le projet" },
      { label: "Format", value: "Document propre, lisible sur mobile comme desktop" },
    ],
    processTitle: "Notre processus de facturation",
    processBody: "Le but est d'eviter toute friction inutile entre validation, paiement et suivi administratif.",
    process: [
      { title: "Devis et echeancier", body: "Envoi d'un devis complet en CHF avec planning, conditions et modalites de paiement avant le lancement." },
      { title: "Paiement en ligne ou virement", body: "Le reglement peut se faire par lien Stripe securise ou par virement bancaire, en une fois ou selon l'echeancier." },
      { title: "Coordonnees et reference", body: "Le lien de paiement, les coordonnees bancaires et la reference sont communiques sur le devis valide ou la facture finale." },
    ],
    previewEyebrow: "Apercu",
    previewTitle: "Exemple de facture KAH-Digital",
    previewBody: "Un format plus propre, plus lisible et plus serieux pour l'operationnel comme pour la compta.",
    featuresTitle: "Ce que nos factures rendent plus simple",
    features: [
      { title: "Format professionnel", body: "Mise en page propre et informations completes." },
      { title: "Structure claire", body: "Lecture rapide des postes, totaux et conditions." },
      { title: "TVA geree", body: "La logique TVA peut etre activee selon le besoin." },
      { title: "Envoi numerique", body: "Documents envoyes par email et archives proprement." },
    ],
    paymentLabel: "Paiement",
    paymentBody: "KAH-Digital peut envoyer un lien Stripe securise pour un acompte ou le solde, tout en gardant le virement bancaire comme alternative simple.",
    ctaTitle: "Questions sur la facturation ?",
    ctaBody: "Le process reste simple, transparent et adapte a des missions courtes comme plus avancees.",
    ctaLabel: "Nous contacter",
  },
  en: {
    heroTitle: "Professional invoicing that stays clear and defensible.",
    heroBody: "Clean documents, a simple process, and readable framing for deposits, balance, and administrative follow-up.",
    markers: [
      { label: "Clarity", value: "Amounts, terms, and references stay easy to verify" },
      { label: "Payment", value: "Bank transfer or secure Stripe link depending on the project" },
      { label: "Format", value: "Clean document, readable on mobile and desktop" },
    ],
    processTitle: "Our billing process",
    processBody: "The goal is to remove unnecessary friction between validation, payment, and administrative follow-up.",
    process: [
      { title: "Quote and schedule", body: "A complete CHF quote is sent before launch with timing, terms, and payment conditions." },
      { title: "Online payment or transfer", body: "Payment can be made via secure Stripe link or bank transfer, either once or according to the agreed schedule." },
      { title: "Reference and billing details", body: "The payment link, bank details, and payment reference are shared on the approved quote or final invoice." },
    ],
    previewEyebrow: "Preview",
    previewTitle: "KAH-Digital invoice example",
    previewBody: "A cleaner, sharper format that works for operations as well as accounting.",
    featuresTitle: "What our invoices make easier",
    features: [
      { title: "Professional format", body: "Clean layout with complete information." },
      { title: "Clear structure", body: "Fast reading of line items, totals, and payment terms." },
      { title: "VAT ready", body: "VAT logic can be enabled when needed." },
      { title: "Digital delivery", body: "Documents sent by email and archived properly." },
    ],
    paymentLabel: "Payment",
    paymentBody: "KAH-Digital can send a secure Stripe payment link for a deposit or balance, while keeping bank transfer available as a simple fallback.",
    ctaTitle: "Questions about billing?",
    ctaBody: "The process stays simple, transparent, and suitable for short missions as well as larger ones.",
    ctaLabel: "Contact us",
  },
  de: {
    heroTitle: "Professionelle Rechnungsstellung, klar und gut pruefbar.",
    heroBody: "Saubere Dokumente, ein einfacher Ablauf und klare Lesbarkeit fuer Anzahlung, Restbetrag und Admin-Follow-up.",
    markers: [
      { label: "Klarheit", value: "Betraege, Bedingungen und Referenzen bleiben leicht pruefbar" },
      { label: "Zahlung", value: "Ueberweisung oder sicherer Stripe-Link je nach Projekt" },
      { label: "Format", value: "Sauberes Dokument, lesbar auf Mobile und Desktop" },
    ],
    processTitle: "Unser Rechnungsprozess",
    processBody: "Ziel ist es, unnoetige Reibung zwischen Freigabe, Zahlung und administrativer Nachverfolgung zu vermeiden.",
    process: [
      { title: "Offerte und Zahlungsplan", body: "Vor Projektstart erhaltet ihr eine vollstaendige CHF-Offerte mit Timing, Bedingungen und Zahlungsrahmen." },
      { title: "Online-Zahlung oder Ueberweisung", body: "Die Zahlung kann per sicherem Stripe-Link oder per Bankueberweisung erfolgen, einmalig oder gemaess Zahlungsplan." },
      { title: "Referenz und Rechnungsdaten", body: "Zahlungslink, Bankdaten und Referenz stehen auf der bestaetigten Offerte oder der finalen Rechnung." },
    ],
    previewEyebrow: "Vorschau",
    previewTitle: "Beispiel einer KAH-Digital Rechnung",
    previewBody: "Ein klareres, schaerferes Format fuer Operations und Buchhaltung.",
    featuresTitle: "Was unsere Rechnungen einfacher macht",
    features: [
      { title: "Professionelles Format", body: "Saubere Gestaltung mit vollstaendigen Informationen." },
      { title: "Klare Struktur", body: "Schnelles Lesen von Positionen, Summen und Bedingungen." },
      { title: "MwSt. vorbereitet", body: "Die Mehrwertsteuer-Logik ist bei Bedarf aktivierbar." },
      { title: "Digitale Zustellung", body: "Dokumente werden per E-Mail versendet und sauber archiviert." },
    ],
    paymentLabel: "Zahlung",
    paymentBody: "KAH-Digital kann einen sicheren Stripe-Link fuer Anzahlung oder Restbetrag senden und behaelt die Ueberweisung als einfache Alternative bei.",
    ctaTitle: "Fragen zur Rechnungsstellung?",
    ctaBody: "Der Prozess bleibt einfach, transparent und passend fuer kurze wie groessere Missionen.",
    ctaLabel: "Kontakt aufnehmen",
  },
} as const;

export function InvoicesPageContent({ locale }: Props) {
  const content = copy[locale];

  return (
    <>
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,8,7,0.96),rgba(18,14,28,0.96))] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,179,106,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(127,184,199,0.14),transparent_24%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-white/52">Billing</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{content.heroTitle}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{content.heroBody}</p>
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

      <section className="section-shell">
        <div className="grid gap-6 md:grid-cols-3">
          {content.process.map((item, index) => (
            <div key={item.title} className="premium-card rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white text-lg font-semibold text-slate-900">
                {index + 1}
              </div>
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-white/68">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{content.processTitle}</h2>
          <p className="mt-4 text-base leading-8 text-white/68 sm:text-lg">{content.processBody}</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 sm:px-8 lg:px-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.previewEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{content.previewTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/68 sm:text-lg">{content.previewBody}</p>
            </div>
            <InvoicePreview locale={locale} />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="premium-card rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(12,10,18,0.96),rgba(7,7,10,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{content.featuresTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, index) => (
              <div key={feature.title} className="rounded-[26px] border border-white/10 bg-black/20 p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/6 text-lg font-semibold text-[var(--brand-gold)]">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{feature.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-white/10 bg-black/20 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">{content.paymentLabel}</p>
            <p className="mt-3 text-base leading-8 text-white/72 sm:text-lg">{content.paymentBody}</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="accent-section">
          <div className="content px-6 py-10 text-center sm:px-8 lg:px-10">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{content.ctaTitle}</h2>
            <p className="mt-4 text-base leading-8 text-white/68 sm:text-lg">{content.ctaBody}</p>
            <div className="mt-8">
              <Link
                href={withLocalePrefix("/contact", locale)}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-neutral-200"
              >
                {content.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
