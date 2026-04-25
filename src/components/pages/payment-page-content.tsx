"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FiCreditCard, FiLock, FiArrowRight } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type Props = {
  locale: Locale;
};

const copy = {
  fr: {
    title: "Paiement en ligne",
    body: "Reglez un acompte, un solde ou une facture KAH-Digital par carte bancaire via Stripe.",
    amount: "Montant en CHF",
    email: "Email de facturation",
    reference: "Reference",
    referencePlaceholder: "DEV-2026-001, facture, acompte...",
    note: "Note",
    notePlaceholder: "Projet ou precision utile",
    submit: "Payer maintenant",
    loading: "Ouverture du paiement...",
    secure: "Paiement securise par Stripe. KAH-Digital ne voit jamais vos donnees de carte.",
    back: "Voir la facturation",
  },
  en: {
    title: "Online payment",
    body: "Pay a deposit, balance, or KAH-Digital invoice by card through Stripe.",
    amount: "Amount in CHF",
    email: "Billing email",
    reference: "Reference",
    referencePlaceholder: "DEV-2026-001, invoice, deposit...",
    note: "Note",
    notePlaceholder: "Project or useful detail",
    submit: "Pay now",
    loading: "Opening payment...",
    secure: "Secure payment by Stripe. KAH-Digital never sees your card details.",
    back: "View billing",
  },
  de: {
    title: "Online-Zahlung",
    body: "Zahlen Sie eine Anzahlung, den Restbetrag oder eine KAH-Digital Rechnung per Karte ueber Stripe.",
    amount: "Betrag in CHF",
    email: "Rechnungs-E-Mail",
    reference: "Referenz",
    referencePlaceholder: "DEV-2026-001, Rechnung, Anzahlung...",
    note: "Notiz",
    notePlaceholder: "Projekt oder hilfreiches Detail",
    submit: "Jetzt bezahlen",
    loading: "Zahlung wird geoeffnet...",
    secure: "Sichere Zahlung mit Stripe. KAH-Digital sieht Ihre Kartendaten nie.",
    back: "Abrechnung ansehen",
  },
} as const;

export function PaymentPageContent({ locale }: Props) {
  const content = copy[locale];
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, reference, note, locale }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Paiement indisponible.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Paiement indisponible.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
              <FiLock size={15} aria-hidden="true" />
              Stripe Checkout
            </div>
            <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/68">{content.body}</p>
            <p className="mt-6 max-w-xl text-sm text-white/52">{content.secure}</p>
            <Link
              href={withLocalePrefix("/factures", locale)}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d6b36a] transition hover:text-white"
            >
              {content.back}
              <FiArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-7"
          >
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">{content.amount}</span>
                <input
                  required
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="1200.00"
                  className="h-13 rounded-2xl border border-white/12 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/28 focus:border-[#d6b36a]/70"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">{content.email}</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="client@email.com"
                  className="h-13 rounded-2xl border border-white/12 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/28 focus:border-[#d6b36a]/70"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">{content.reference}</span>
                <input
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder={content.referencePlaceholder}
                  className="h-13 rounded-2xl border border-white/12 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-white/28 focus:border-[#d6b36a]/70"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">{content.note}</span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={content.notePlaceholder}
                  rows={4}
                  className="resize-none rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/28 focus:border-[#d6b36a]/70"
                />
              </label>

              {error ? <p className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[#d6b36a] px-5 font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:cursor-not-allowed disabled:opacity-55"
              >
                <FiCreditCard size={18} aria-hidden="true" />
                {loading ? content.loading : content.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
