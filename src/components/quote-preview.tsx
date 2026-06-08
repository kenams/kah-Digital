"use client";

import { KahDigitalDocumentLogo } from "@/components/KAH Digital-document-logo";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";

interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuotePreviewProps {
  clientName?: string;
  clientCompany?: string;
  items?: QuoteItem[];
  total?: number;
  validUntil?: string;
}

export function QuotePreview({ clientName, clientCompany, items, total = 2800, validUntil }: QuotePreviewProps) {
  const { locale } = useLocale();
  const brandName = companyConfig.brandName || "KAH Digital";
  const currency = companyConfig.currency || "CHF";
  const signatureName =
    companyConfig.legalName && companyConfig.legalName !== "[A_REMPLACER_NOM_LEGAL_COMPLET]"
      ? companyConfig.legalName
      : brandName;

  const copy = {
    fr: {
      documentLabel: "Devis",
      documentBody: "Document commercial KAH Digital",
      from: "De",
      to: "Pour",
      quoteNumber: "Numéro de devis",
      date: "Date",
      validUntil: "Valable jusqu'au",
      description: "Description",
      quantity: "Qte",
      unitPrice: "Prix unit.",
      total: "Total",
      totalExcl: "Total HT",
      vat: "TVA (non applicable)",
      totalIncl: "Total TTC",
      conditions: "Conditions :",
      conditionItems: [
        `Tous les montants sont établis en ${currency}.`,
        "Paiement par virement bancaire sur les coordonnées transmises avec le devis validé ou la facture.",
        "Pour les projets plus longs, un échéancier peut être précisé directement sur le devis (acompte + solde).",
        "Livraison sous 4-6 semaines selon la complexité",
        "Le lancement du projet intervient après validation du devis et réception du premier versement si applicable.",
      ],
      client: "Client",
      signature: "Signature et date",
      defaultClientName: "[Nom du client]",
      defaultClientCompany: "[Société]",
      defaultItems: [
        { description: "Creation de site web vitrine (5 pages)", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Formation et accompagnement (2h)", quantity: 1, unitPrice: 300, total: 300 },
      ],
      defaultValidUntil: "30 jours",
      locale: "fr-CH",
    },
    en: {
      documentLabel: "Quote",
      documentBody: "KAH Digital commercial document",
      from: "From",
      to: "For",
      quoteNumber: "Quote number",
      date: "Date",
      validUntil: "Valid until",
      description: "Description",
      quantity: "Qty",
      unitPrice: "Unit price",
      total: "Total",
      totalExcl: "Total excl. tax",
      vat: "VAT (not applicable)",
      totalIncl: "Total incl. tax",
      conditions: "Terms:",
      conditionItems: [
        `All amounts are stated in ${currency}.`,
        "Payment by bank transfer to the details shared with the approved quote or invoice.",
        "For longer projects, a staged payment plan can be stated directly in the quote (deposit + balance).",
        "Delivery within 4-6 weeks depending on complexity.",
        "Project kickoff starts after quote approval and receipt of the first payment when applicable.",
      ],
      client: "Client",
      signature: "Signature and date",
      defaultClientName: "[Client name]",
      defaultClientCompany: "[Company]",
      defaultItems: [
        { description: "Showcase website creation (5 pages)", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Training and support (2h)", quantity: 1, unitPrice: 300, total: 300 },
      ],
      defaultValidUntil: "30 days",
      locale: "en-CH",
    },
    de: {
      documentLabel: "Offerte",
      documentBody: "KAH Digital Geschäftsdokument",
      from: "Von",
      to: "Für",
      quoteNumber: "Offertnummer",
      date: "Datum",
      validUntil: "Gültig bis",
      description: "Beschreibung",
      quantity: "Menge",
      unitPrice: "Einzelpreis",
      total: "Total",
      totalExcl: "Total exkl. MwSt.",
      vat: "MwSt. (nicht anwendbar)",
      totalIncl: "Total inkl. MwSt.",
      conditions: "Bedingungen:",
      conditionItems: [
        `Alle Beträge sind in ${currency} angegeben.`,
        "Zahlung per Banküberweisung an die Angaben aus der bestätigten Offerte oder Rechnung.",
        "Bei längeren Projekten kann direkt in der Offerte ein Zahlungsplan angegeben werden (Akonto + Schlusszahlung).",
        "Lieferung in 4-6 Wochen je nach Komplexität.",
        "Der Projektstart erfolgt nach Bestätigung der Offerte und Eingang der ersten Zahlung, falls relevant.",
      ],
      client: "Kunde",
      signature: "Unterschrift und Datum",
      defaultClientName: "[Kundenname]",
      defaultClientCompany: "[Unternehmen]",
      defaultItems: [
        { description: "Unternehmenswebsite (5 Seiten)", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Schulung und Begleitung (2h)", quantity: 1, unitPrice: 300, total: 300 },
      ],
      defaultValidUntil: "30 Tage",
      locale: "de-CH",
    },
  }[locale];

  const resolvedItems = items ?? copy.defaultItems;
  const resolvedClientName = clientName ?? copy.defaultClientName;
  const resolvedClientCompany = clientCompany ?? copy.defaultClientCompany;
  const resolvedValidUntil = validUntil ?? copy.defaultValidUntil;

  return (
    <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
        <KahDigitalDocumentLogo />
        <div className="text-left md:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{copy.documentLabel}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{brandName}</h2>
          <p className="mt-1 text-slate-600">{copy.documentBody}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.from}</h3>
          <p className="font-semibold text-slate-900">{brandName}</p>
          {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" ? <p className="text-slate-700">{companyConfig.address}</p> : null}
          <p className="text-slate-700">
            {companyConfig.city}, {companyConfig.country}
          </p>
          {companyConfig.email !== "[A_REMPLACER_EMAIL]" ? <p className="text-slate-700">Email: {companyConfig.email}</p> : null}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.to}</h3>
          <p className="font-semibold text-slate-900">{resolvedClientName}</p>
          <p className="text-slate-700">{resolvedClientCompany}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.quoteNumber}</span>
            <p className="mt-2 text-slate-900">{companyConfig.quotePrefix}2026-001</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.date}</span>
            <p className="mt-2 text-slate-900">{new Date().toLocaleDateString(copy.locale)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.validUntil}</span>
            <p className="mt-2 text-slate-900">{resolvedValidUntil}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">{copy.description}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">{copy.quantity}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{copy.unitPrice}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{copy.total}</th>
              </tr>
            </thead>
            <tbody>
              {resolvedItems.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-slate-50/50">
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-800">{item.description}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-center text-slate-700">{item.quantity}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                    {item.unitPrice.toLocaleString(copy.locale)} {currency}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right font-medium text-slate-900">
                    {item.total.toLocaleString(copy.locale)} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-800">
                  {copy.totalExcl}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-900">
                  {total.toLocaleString(copy.locale)} {currency}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                  {copy.vat}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">0.00 {currency}</td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-900">
                  {copy.totalIncl}
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">{total.toLocaleString(copy.locale)} {currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">{copy.conditions}</h3>
        <ul className="space-y-1 text-sm text-slate-700">
          {copy.conditionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">{copy.client}</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">{copy.signature}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">{signatureName}</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">{copy.signature}</p>
        </div>
      </div>
    </div>
  );
}
