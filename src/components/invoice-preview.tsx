"use client";

import { KahDigitalDocumentLogo } from "@/components/kah-digital-document-logo";
import { companyConfig } from "@/config/company";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoicePreviewProps {
  locale?: "fr" | "en" | "de";
  clientName?: string;
  clientCompany?: string;
  items?: InvoiceItem[];
  total?: number;
  vat?: number;
  totalWithVat?: number;
}

export function InvoicePreview({
  locale = "fr",
  clientName = "[Nom du client]",
  clientCompany = "[Societe]",
  items,
  total = 2800,
  vat = 0,
  totalWithVat = 2800,
}: InvoicePreviewProps) {
  const brandName = companyConfig.brandName || "KAH-Digital";
  const currency = companyConfig.currency || "CHF";
  const signatureName = companyConfig.legalName || brandName;
  const hasIban = Boolean(companyConfig.iban && companyConfig.iban.trim());
  const isEnglish = locale === "en";
  const isGerman = false;
  const copy = {
    fr: {
      invoice: "Facture",
      document: "Document de facturation KAH-Digital",
      issuer: "Emetteur",
      phone: "Tel",
      client: "Client",
      invoiceNumber: "Numero de facture",
      issueDate: "Date d'emission",
      due: "Echeance",
      dueValue: "30 jours",
      description: "Description",
      qty: "Qte",
      unitPrice: "Prix unit.",
      subtotalCol: "Total HT",
      subtotal: "Total HT",
      vat: "TVA (0% - non assujetti)",
      total: "Total TTC",
      paymentTerms: "Modalites de paiement :",
      paymentWithin: "Paiement a 30 jours apres reception de la facture",
      paymentCurrency: "Reglement par virement bancaire en CHF.",
      milestoneNote: "Si un echeancier a ete defini sur le devis, il s'applique a la place du paiement unique.",
      bankOnRequest: "Coordonnees bancaires transmises sur la facture finale ou sur demande.",
      bankTransfer: "Virement bancaire sur le compte suivant :",
      reference: "Reference",
      notes: "Notes :",
      notesBody: "Merci pour votre confiance. En cas de question, n'hesitez pas a nous contacter.",
      signature: "Signature et date",
      clientName: clientName,
      clientCompany: clientCompany,
      items: [
        { description: "Developpement site web vitrine", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Formation et accompagnement", quantity: 1, unitPrice: 300, total: 300 },
      ],
    },
    en: {
      invoice: "Invoice",
      document: "KAH-Digital billing document",
      issuer: "Issuer",
      phone: "Phone",
      client: "Client",
      invoiceNumber: "Invoice number",
      issueDate: "Issue date",
      due: "Due",
      dueValue: "30 days",
      description: "Description",
      qty: "Qty",
      unitPrice: "Unit price",
      subtotalCol: "Subtotal",
      subtotal: "Subtotal",
      vat: "VAT (0% - not subject)",
      total: "Total incl. VAT",
      paymentTerms: "Payment terms:",
      paymentWithin: "Payment within 30 days of invoice receipt",
      paymentCurrency: "Payment by bank transfer in CHF.",
      milestoneNote: "If a milestone schedule was defined on the quote, it applies instead of a single payment.",
      bankOnRequest: "Bank details provided on the final invoice or on request.",
      bankTransfer: "Bank transfer to the following account:",
      reference: "Reference",
      notes: "Notes:",
      notesBody: "Thank you for your trust. If you have any questions, feel free to contact us.",
      signature: "Signature and date",
      clientName: "[Client name]",
      clientCompany: "[Company]",
      items: [
        { description: "Showcase website development", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Training and support", quantity: 1, unitPrice: 300, total: 300 },
      ],
    },
    de: {
      invoice: "Rechnung",
      document: "KAH-Digital Rechnungsdokument",
      issuer: "Aussteller",
      phone: "Telefon",
      client: "Kunde",
      invoiceNumber: "Rechnungsnummer",
      issueDate: "Ausstellungsdatum",
      due: "Faelligkeit",
      dueValue: "30 Tage",
      description: "Beschreibung",
      qty: "Menge",
      unitPrice: "Einzelpreis",
      subtotalCol: "Zwischensumme",
      subtotal: "Zwischensumme",
      vat: "MwSt. (0% - nicht steuerpflichtig)",
      total: "Gesamtbetrag",
      paymentTerms: "Zahlungsbedingungen:",
      paymentWithin: "Zahlbar innerhalb von 30 Tagen nach Rechnungserhalt",
      paymentCurrency: "Zahlung per Banküberweisung in CHF.",
      milestoneNote: "Falls im Angebot ein Zahlungsplan definiert wurde, gilt dieser anstelle einer Einmalzahlung.",
      bankOnRequest: "Bankdaten werden auf der finalen Rechnung oder auf Anfrage übermittelt.",
      bankTransfer: "Banküberweisung auf folgendes Konto:",
      reference: "Referenz",
      notes: "Hinweise:",
      notesBody: "Vielen Dank für Ihr Vertrauen. Bei Fragen können Sie uns jederzeit kontaktieren.",
      signature: "Unterschrift und Datum",
      clientName: "[Kundenname]",
      clientCompany: "[Unternehmen]",
      items: [
        { description: "Entwicklung einer Unternehmenswebsite", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Schulung und Begleitung", quantity: 1, unitPrice: 300, total: 300 },
      ],
    },
  }[locale];
  const clientNameFallback = isEnglish || isGerman ? copy.clientName : clientName;
  const clientCompanyFallback = isEnglish || isGerman ? copy.clientCompany : clientCompany;
  const invoiceItems =
    items ?? copy.items;

  return (
    <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
        <KahDigitalDocumentLogo />
        <div className="text-left md:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{copy.invoice}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{brandName}</h2>
          <p className="mt-1 text-slate-600">{copy.document}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.issuer}</h3>
          <p className="font-semibold text-slate-900">{brandName}</p>
          <p className="text-slate-700">{companyConfig.address}</p>
          <p className="text-slate-700">
            {companyConfig.city}, {companyConfig.country}
          </p>
          <p className="text-slate-700">Email: {companyConfig.email}</p>
          <p className="text-slate-700">{copy.phone}: {companyConfig.phone}</p>
          {companyConfig.uid ? <p className="text-slate-700">IDE: {companyConfig.uid}</p> : null}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.client}</h3>
          <p className="font-semibold text-slate-900">{clientNameFallback}</p>
          <p className="text-slate-700">{clientCompanyFallback}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.invoiceNumber}</span>
            <p className="mt-2 text-slate-900">{companyConfig.invoicePrefix}2026-001</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.issueDate}</span>
            <p className="mt-2 text-slate-900">{new Date().toLocaleDateString(isEnglish ? "en-GB" : isGerman ? "de-CH" : "fr-FR")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{copy.due}</span>
            <p className="mt-2 text-slate-900">{copy.dueValue}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">{copy.description}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">{copy.qty}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{copy.unitPrice}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{copy.subtotalCol}</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-slate-50/50">
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-800">{item.description}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-center text-slate-700">{item.quantity}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                    {item.unitPrice.toLocaleString("fr-CH")} {currency}
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right font-medium text-slate-900">
                    {item.total.toLocaleString("fr-CH")} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-800">
                  {copy.subtotal}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-900">
                  {total.toLocaleString("fr-CH")} {currency}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                  {copy.vat}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">{vat.toLocaleString("fr-CH")} {currency}</td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-900">
                  {copy.total}
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">{totalWithVat.toLocaleString("fr-CH")} {currency}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">{copy.paymentTerms}</h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>{copy.paymentWithin}</li>
          <li>{copy.paymentCurrency}</li>
          <li>{copy.milestoneNote}</li>
          {hasIban ? (
            <>
              <li>{copy.bankTransfer}</li>
              <li>IBAN: {companyConfig.iban}</li>
            </>
          ) : (
            <li>{copy.bankOnRequest}</li>
          )}
          <li>{copy.reference}: {companyConfig.invoicePrefix}2026-001</li>
        </ul>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">{copy.notes}</h3>
        <p className="text-sm text-slate-700">{copy.notesBody}</p>
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
