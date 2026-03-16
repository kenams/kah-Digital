"use client";

import { KahDigitalDocumentLogo } from "@/components/kah-digital-document-logo";
import { companyConfig } from "@/config/company";

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

export function QuotePreview({
  clientName = "[Nom du client]",
  clientCompany = "[Societe]",
  items = [
    {
      description: "Creation de site web vitrine (5 pages)",
      quantity: 1,
      unitPrice: 2500,
      total: 2500,
    },
    {
      description: "Formation et accompagnement (2h)",
      quantity: 1,
      unitPrice: 300,
      total: 300,
    },
  ],
  total = 2800,
  validUntil = "30 jours",
}: QuotePreviewProps) {
  const brandName = companyConfig.brandName || "KAH-Digital";
  const signatureName =
    companyConfig.legalName && companyConfig.legalName !== "[A_REMPLACER_NOM_LEGAL_COMPLET]"
      ? companyConfig.legalName
      : brandName;

  return (
    <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
        <KahDigitalDocumentLogo />
        <div className="text-left md:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Devis</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{brandName}</h2>
          <p className="mt-1 text-slate-600">Document commercial KAH-Digital</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">De</h3>
          <p className="font-semibold text-slate-900">{brandName}</p>
          {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" ? (
            <p className="text-slate-700">{companyConfig.address}</p>
          ) : null}
          <p className="text-slate-700">
            {companyConfig.city}, {companyConfig.country}
          </p>
          {companyConfig.email !== "[A_REMPLACER_EMAIL]" ? (
            <p className="text-slate-700">Email: {companyConfig.email}</p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Pour</h3>
          <p className="font-semibold text-slate-900">{clientName}</p>
          <p className="text-slate-700">{clientCompany}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Numero de devis</span>
            <p className="mt-2 text-slate-900">{companyConfig.quotePrefix}2026-001</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Date</span>
            <p className="mt-2 text-slate-900">{new Date().toLocaleDateString("fr-FR")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Valable jusqu'au</span>
            <p className="mt-2 text-slate-900">{validUntil}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Qte</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">Prix unit.</th>
                <th className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
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
                  Total HT
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right font-semibold text-slate-900">
                  {total.toLocaleString("fr-CH")} CHF
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">
                  TVA (non applicable)
                </td>
                <td className="border-b border-slate-200 px-4 py-3 text-right text-slate-700">0.00 CHF</td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-900">
                  Total TTC
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">{total.toLocaleString("fr-CH")} CHF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-2 font-semibold text-slate-900">Conditions :</h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>Paiement a 30 jours apres acceptation du devis</li>
          <li>Livraison sous 4-6 semaines selon la complexite</li>
          <li>Formation utilisateur incluse</li>
          <li>Support technique 3 mois offert</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">Client</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">Signature et date</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="mb-4 text-sm text-slate-600">{signatureName}</p>
          <div className="h-12 border-b border-slate-300" />
          <p className="mt-1 text-xs text-slate-500">Signature et date</p>
        </div>
      </div>
    </div>
  );
}
