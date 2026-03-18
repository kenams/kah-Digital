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
  locale?: "fr" | "en";
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
  const signatureName = companyConfig.legalName || brandName;
  const hasIban = Boolean(companyConfig.iban && companyConfig.iban.trim());
  const isEnglish = locale === "en";
  const clientNameFallback = isEnglish ? "[Client name]" : clientName;
  const clientCompanyFallback = isEnglish ? "[Company]" : clientCompany;
  const invoiceItems =
    items ??
    (isEnglish
      ? [
          {
            description: "Showcase website development",
            quantity: 1,
            unitPrice: 2500,
            total: 2500,
          },
          {
            description: "Training and support",
            quantity: 1,
            unitPrice: 300,
            total: 300,
          },
        ]
      : [
          {
            description: "Developpement site web vitrine",
            quantity: 1,
            unitPrice: 2500,
            total: 2500,
          },
          {
            description: "Formation et accompagnement",
            quantity: 1,
            unitPrice: 300,
            total: 300,
          },
        ]);

  return (
    <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
        <KahDigitalDocumentLogo />
        <div className="text-left md:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">{isEnglish ? "Invoice" : "Facture"}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{brandName}</h2>
          <p className="mt-1 text-slate-600">{isEnglish ? "KAH-Digital billing document" : "Document de facturation KAH-Digital"}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{isEnglish ? "Issuer" : "Emetteur"}</h3>
          <p className="font-semibold text-slate-900">{brandName}</p>
          <p className="text-slate-700">{companyConfig.address}</p>
          <p className="text-slate-700">
            {companyConfig.city}, {companyConfig.country}
          </p>
          <p className="text-slate-700">Email: {companyConfig.email}</p>
          <p className="text-slate-700">{isEnglish ? "Phone" : "Tel"}: {companyConfig.phone}</p>
          {companyConfig.uid ? <p className="text-slate-700">IDE: {companyConfig.uid}</p> : null}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{isEnglish ? "Client" : "Client"}</h3>
          <p className="font-semibold text-slate-900">{clientNameFallback}</p>
          <p className="text-slate-700">{clientCompanyFallback}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{isEnglish ? "Invoice number" : "Numero de facture"}</span>
            <p className="mt-2 text-slate-900">{companyConfig.invoicePrefix}2026-001</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{isEnglish ? "Issue date" : "Date d'emission"}</span>
            <p className="mt-2 text-slate-900">{new Date().toLocaleDateString(isEnglish ? "en-GB" : "fr-FR")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{isEnglish ? "Due" : "Echeance"}</span>
            <p className="mt-2 text-slate-900">{isEnglish ? "30 days" : "30 jours"}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">{isEnglish ? "Description" : "Description"}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">{isEnglish ? "Qty" : "Qte"}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{isEnglish ? "Unit price" : "Prix unit."}</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">{isEnglish ? "Subtotal" : "Total HT"}</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-slate-50/50">
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-800">{item.description}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-center text-slate-700">{item.quantity}</td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                    {item.unitPrice.toLocaleString("fr-CH")} CHF
                  </td>
                  <td className="border-b border-slate-200 px-4 py-3 text-right font-medium text-slate-900">
                    {item.total.toLocaleString("fr-CH")} CHF
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-800">
                  {isEnglish ? "Subtotal" : "Total HT"}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-900">
                  {total.toLocaleString("fr-CH")} CHF
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                  {isEnglish ? "VAT (0% - not subject)" : "TVA (0% - non assujetti)"}
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">{vat.toLocaleString("fr-CH")} CHF</td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-900">
                  {isEnglish ? "Total incl. VAT" : "Total TTC"}
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">{totalWithVat.toLocaleString("fr-CH")} CHF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">{isEnglish ? "Payment terms:" : "Modalites de paiement :"}</h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>{isEnglish ? "Payment within 30 days of invoice receipt" : "Paiement a 30 jours apres reception de la facture"}</li>
          {hasIban ? (
            <>
              <li>{isEnglish ? "Bank transfer to the following account:" : "Virement bancaire sur le compte suivant :"}</li>
              <li>IBAN: {companyConfig.iban}</li>
            </>
          ) : (
            <li>{isEnglish ? "Bank details provided on the final invoice or on request." : "Coordonnees bancaires transmises sur la facture finale ou sur demande."}</li>
          )}
          <li>{isEnglish ? "Reference" : "Reference"}: {companyConfig.invoicePrefix}2026-001</li>
        </ul>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">{isEnglish ? "Notes:" : "Notes :"}</h3>
        <p className="text-sm text-slate-700">
          {isEnglish ? "Thank you for your trust. If you have any questions, feel free to contact us." : "Merci pour votre confiance. En cas de question, n'hesitez pas a nous contacter."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">{isEnglish ? "Client" : "Client"}</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">{isEnglish ? "Signature and date" : "Signature et date"}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">{signatureName}</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">{isEnglish ? "Signature and date" : "Signature et date"}</p>
        </div>
      </div>
    </div>
  );
}
