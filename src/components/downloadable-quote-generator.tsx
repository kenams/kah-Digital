"use client";

import { jsPDF } from "jspdf";
import { useMemo, useState } from "react";
import { FiDownload, FiPlus, FiTrash2 } from "react-icons/fi";

import { companyConfig } from "@/config/company";
import { drawKahDigitalPdfLogo } from "@/lib/pdf-branding";

type QuoteLine = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

type ClientInfo = {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  projectTitle: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  paymentTerms: string;
  notes: string;
};

const today = new Date();
const todayIso = today.toISOString().slice(0, 10);
const validUntilIso = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const initialLines: QuoteLine[] = [
  {
    id: "line-1",
    description: "Cadrage, direction artistique, intégration du logo, adaptation de la palette et préparation des assets client.",
    quantity: 1,
    unitPrice: 300,
  },
  {
    id: "line-2",
    description: "Intégration vidéo hero, photos client, typographie complémentaire et section partenaires avec logos défilants.",
    quantity: 1,
    unitPrice: 250,
  },
  {
    id: "line-3",
    description: "Optimisation mobile/desktop, hiérarchie visuelle, ajustements premium et livraison quasi finale.",
    quantity: 1,
    unitPrice: 240,
  },
];

const initialInfo: ClientInfo = {
  clientName: "Ashanti",
  companyName: "Ashanti Beauty",
  email: "",
  phone: "",
  address: "",
  projectTitle: "Phase premium - Site vitrine Ashanti Beauty",
  quoteNumber: `DEV-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-001`,
  quoteDate: todayIso,
  validUntil: validUntilIso,
  paymentTerms:
    "Paiement réparti en trois étapes : 300 € au lancement, 250 € après intégration des principaux éléments visuels, puis 240 € à la livraison de la version quasi finale. Paiement par virement bancaire avec RIB ou via lien de paiement sécurisé.",
  notes:
    "Le devis inclut les éléments listés ci-dessus. Toute demande supplémentaire importante non prévue pourra faire l'objet d'un complément tarifaire après validation.",
};

function formatMoney(value: number) {
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`;
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(`${value}T12:00:00`).toLocaleDateString("fr-FR");
}

function sanitizeFilename(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "client";
}

function addWrappedText(doc: jsPDF, text: string, x: number, y: number, width: number, lineHeight = 5) {
  const lines = doc.splitTextToSize(text || "-", width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

export function DownloadableQuoteGenerator() {
  const [info, setInfo] = useState<ClientInfo>(initialInfo);
  const [lines, setLines] = useState<QuoteLine[]>(initialLines);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + Math.max(0, line.quantity) * Math.max(0, line.unitPrice), 0),
    [lines]
  );

  function updateInfo<K extends keyof ClientInfo>(key: K, value: ClientInfo[K]) {
    setInfo((current) => ({ ...current, [key]: value }));
  }

  function updateLine(id: string, patch: Partial<QuoteLine>) {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  }

  function addLine() {
    setLines((current) => [
      ...current,
      { id: `line-${Date.now()}`, description: "Nouvelle prestation", quantity: 1, unitPrice: 0 },
    ]);
  }

  function removeLine(id: string) {
    setLines((current) => (current.length > 1 ? current.filter((line) => line.id !== id) : current));
  }

  function generatePdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 16;
    const right = 194;
    let y = 14;

    drawKahDigitalPdfLogo(doc, left, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(46, 168, 255);
    doc.text("DEVIS", right, y + 8, { align: "right" });
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(17);
    doc.text(info.companyName || info.clientName || "Client", right, y + 16, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Document commercial KAH-Digital", right, y + 22, { align: "right" });

    y = 50;
    doc.setDrawColor(226, 232, 240);
    doc.line(left, y - 7, right, y - 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("DE", left, y);
    doc.text("POUR", 112, y);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(companyConfig.brandName, left, y + 8);
    doc.text(info.companyName || info.clientName || "Client", 112, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(companyConfig.address, left, y + 14);
    doc.text(`${companyConfig.postalCode} ${companyConfig.city}, ${companyConfig.country}`, left, y + 19);
    doc.text(`Email : ${companyConfig.email}`, left, y + 24);
    doc.text(info.clientName ? `Contact : ${info.clientName}` : "Contact : -", 112, y + 14);
    if (info.email) doc.text(`Email : ${info.email}`, 112, y + 19);
    if (info.phone) doc.text(`Téléphone : ${info.phone}`, 112, y + 24);
    if (info.address) addWrappedText(doc, `Adresse : ${info.address}`, 112, y + 29, 74, 4.5);

    y = 90;
    [
      ["Numéro de devis", info.quoteNumber || "-"],
      ["Date", formatDate(info.quoteDate)],
      ["Valable jusqu'au", formatDate(info.validUntil)],
    ].forEach(([label, value], index) => {
      const x = left + index * 60;
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, y, 54, 20, 3, 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(label.toUpperCase(), x + 4, y + 7);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(value, x + 4, y + 15);
    });

    y = 122;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(info.projectTitle || "Projet digital", left, y);
    y += 10;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(left, y, 178, 10, 2, 2, "F");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text("Description", left + 4, y + 6.5);
    doc.text("Qté", 144, y + 6.5, { align: "center" });
    doc.text("Prix unit.", 166, y + 6.5, { align: "right" });
    doc.text("Total", right - 4, y + 6.5, { align: "right" });
    y += 12;

    lines.forEach((line) => {
      if (y > 238) {
        doc.addPage();
        y = 20;
      }

      const rowStart = y;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      y = addWrappedText(doc, line.description, left + 4, y + 4, 112, 4.5);
      const rowHeight = Math.max(18, y - rowStart + 5);
      const lineTotal = Math.max(0, line.quantity) * Math.max(0, line.unitPrice);

      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(left, rowStart, 178, rowHeight, 2, 2);
      doc.text(String(line.quantity || 0), 144, rowStart + 9, { align: "center" });
      doc.text(formatMoney(line.unitPrice || 0), 166, rowStart + 9, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.text(formatMoney(lineTotal), right - 4, rowStart + 9, { align: "right" });
      y = rowStart + rowHeight + 3;
    });

    y += 4;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(118, y, 76, 26, 3, 3, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("Total HT", 124, y + 8);
    doc.text("TVA non applicable", 124, y + 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Total TTC", 124, y + 23);
    doc.text(formatMoney(total), right - 5, y + 23, { align: "right" });

    y += 42;
    if (y > 235) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Modalités de paiement", left, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    y = addWrappedText(doc, info.paymentTerms, left, y, 178, 4.4) + 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("Conditions", left, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    y = addWrappedText(doc, info.notes, left, y, 178, 4.4) + 10;

    if (y > 247) {
      doc.addPage();
      y = 24;
    }

    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(left, y, 80, 28, 3, 3);
    doc.roundedRect(114, y, 80, 28, 3, 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Client - Signature et date", left + 5, y + 7);
    doc.text("KAH-Digital - Signature et date", 119, y + 7);

    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`${info.quoteNumber || "DEVIS"} - ${info.companyName || info.clientName || "Client"}`, left, 286);
    doc.text(`Total : ${formatMoney(total)}`, right, 286, { align: "right" });

    const filename = `devis-${sanitizeFilename(info.companyName || info.clientName)}-${sanitizeFilename(info.projectTitle)}.pdf`;
    doc.save(filename);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">Générateur PDF</p>
          <h2 className="text-2xl font-bold text-slate-950">Créer un devis téléchargeable</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Remplis les informations du client, ajuste les prestations et télécharge un PDF prêt à envoyer.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nom du client" value={info.clientName} onChange={(value) => updateInfo("clientName", value)} />
          <Field label="Entreprise" value={info.companyName} onChange={(value) => updateInfo("companyName", value)} />
          <Field label="Email client" value={info.email} onChange={(value) => updateInfo("email", value)} type="email" />
          <Field label="Téléphone" value={info.phone} onChange={(value) => updateInfo("phone", value)} />
          <Field label="N° de devis" value={info.quoteNumber} onChange={(value) => updateInfo("quoteNumber", value)} />
          <Field label="Titre du projet" value={info.projectTitle} onChange={(value) => updateInfo("projectTitle", value)} />
          <Field label="Date" value={info.quoteDate} onChange={(value) => updateInfo("quoteDate", value)} type="date" />
          <Field label="Validité" value={info.validUntil} onChange={(value) => updateInfo("validUntil", value)} type="date" />
        </div>

        <div className="mt-4">
          <TextArea label="Adresse client" value={info.address} onChange={(value) => updateInfo("address", value)} rows={2} />
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Prestations</p>
              <p className="mt-1 text-sm text-slate-600">Chaque ligne apparaît dans le tableau du devis.</p>
            </div>
            <button
              type="button"
              onClick={addLine}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              <FiPlus size={16} /> Ajouter
            </button>
          </div>

          {lines.map((line, index) => (
            <div key={line.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-slate-900">Ligne {index + 1}</p>
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  disabled={lines.length <= 1}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiTrash2 size={14} /> Retirer
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_90px_130px]">
                <TextArea
                  label="Description"
                  value={line.description}
                  onChange={(value) => updateLine(line.id, { description: value })}
                  rows={3}
                />
                <Field
                  label="Qté"
                  type="number"
                  value={String(line.quantity)}
                  onChange={(value) => updateLine(line.id, { quantity: Number(value) || 0 })}
                />
                <Field
                  label="Prix €"
                  type="number"
                  value={String(line.unitPrice)}
                  onChange={(value) => updateLine(line.id, { unitPrice: Number(value) || 0 })}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          <TextArea label="Modalités de paiement" value={info.paymentTerms} onChange={(value) => updateInfo("paymentTerms", value)} rows={4} />
          <TextArea label="Conditions / notes" value={info.notes} onChange={(value) => updateInfo("notes", value)} rows={4} />
        </div>
      </div>

      <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:sticky lg:top-24">
        <div className="mb-6 border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">Aperçu</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{info.companyName || "Client"}</h3>
          <p className="mt-2 text-sm text-slate-600">{info.projectTitle || "Projet digital"}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Devis</span>
            <strong className="text-right text-slate-950">{info.quoteNumber || "-"}</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Date</span>
            <strong className="text-right text-slate-950">{formatDate(info.quoteDate)}</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Validité</span>
            <strong className="text-right text-slate-950">{formatDate(info.validUntil)}</strong>
          </div>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-slate-200">
          {lines.map((line) => (
            <div key={line.id} className="border-b border-slate-200 p-4 last:border-b-0">
              <p className="line-clamp-2 text-sm font-medium text-slate-800">{line.description}</p>
              <p className="mt-2 text-right text-sm font-bold text-slate-950">
                {formatMoney(line.quantity * line.unitPrice)}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-950 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">Total TTC</p>
          <p className="mt-2 text-4xl font-black">{formatMoney(total)}</p>
          <p className="mt-2 text-xs text-white/55">TVA non applicable</p>
        </div>

        <button
          type="button"
          onClick={generatePdf}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2ea8ff,#1d4ed8)] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_44px_rgba(46,168,255,0.28)] transition hover:brightness-105"
        >
          <FiDownload size={18} /> Télécharger le devis PDF
        </button>
      </aside>
    </div>
  );
}
