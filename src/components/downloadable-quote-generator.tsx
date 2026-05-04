"use client";

import { jsPDF } from "jspdf";
import { useMemo, useState } from "react";
import { FiChevronDown, FiDownload, FiPlus, FiTrash2 } from "react-icons/fi";

import { companyConfig } from "@/config/company";
import { drawKahDigitalPdfLogo } from "@/lib/pdf-branding";

// ─── Catalogue des prestations KAH-Digital ────────────────────────────────────

type Unit = "forfait" | "mois" | "heure";

type CatalogItem = {
  id: string;
  label: string;
  description: string;
  price: number;
  unit: Unit;
};

const CATALOG: CatalogItem[] = [
  { id: "landing",          label: "Landing page",                description: "1 page percutante avec CTA — mobile-first, livrée en 5–10 jours",                              price: 300,  unit: "forfait" },
  { id: "site-vitrine",     label: "Site vitrine standard",       description: "5–8 pages, SEO de base, formulaire contact, livraison 2–4 semaines",                             price: 800,  unit: "forfait" },
  { id: "site-premium",     label: "Site vitrine premium",        description: "8–15 pages, animations, SEO avancé, blog intégré, livraison 3–5 semaines",                       price: 1500, unit: "forfait" },
  { id: "ecommerce",        label: "Boutique e-commerce",         description: "Catalogue produits, paiement Stripe/PayPal, gestion commandes, 3–5 semaines",                    price: 1500, unit: "forfait" },
  { id: "outil-metier",     label: "Outil web métier / Dashboard","description": "Application interne, gestion de données, rôles utilisateurs, 3–6 semaines",                 price: 1500, unit: "forfait" },
  { id: "refonte",          label: "Refonte de site existant",    description: "Modernisation design + performance d'un site actuel, 2–4 semaines",                              price: 1200, unit: "forfait" },
  { id: "app-mobile",       label: "Application mobile MVP",      description: "iOS + Android (React Native), fonctionnalités clés, 6–10 semaines",                              price: 2500, unit: "forfait" },
  { id: "saas-mvp",         label: "SaaS MVP",                    description: "Produit web en ligne — auth, paiement, tableau de bord client, 8–12 semaines",                   price: 3000, unit: "forfait" },
  { id: "chatbot-ia",       label: "Chatbot / Intégration IA",    description: "Assistant IA pour site ou app (API Claude/OpenAI), 2–4 semaines",                                price: 800,  unit: "forfait" },
  { id: "maintenance",      label: "Maintenance mensuelle",       description: "Mises à jour, hébergement, support réactif, sauvegardes incluses",                               price: 150,  unit: "mois"    },
  { id: "seo",              label: "SEO & référencement",         description: "Audit technique + optimisations + contenu optimisé, livraison 2–4 semaines",                     price: 500,  unit: "forfait" },
  { id: "audit-conseil",    label: "Audit & conseil",             description: "Analyse complète du site ou projet, recommandations priorisées, livrable PDF",                   price: 350,  unit: "forfait" },
  { id: "formation",        label: "Formation / accompagnement",  description: "Formation CMS, outils digitaux ou process — en visioconférence",                                 price: 200,  unit: "heure"   },
  { id: "custom",           label: "Prestation personnalisée",    description: "Décrire le besoin dans la zone de texte ci-dessous — prix à définir ensemble",                   price: 0,    unit: "forfait" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type QuoteLine = {
  id: string;
  catalogId: string;
  label: string;
  detail: string;
  quantity: number;
  unit: Unit;
  unitPrice: number;
};

type ClientInfo = {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  projectDescription: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  paymentTerms: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = new Date();
const todayIso = today.toISOString().slice(0, 10);
const validUntilIso = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

function makeQuoteNumber() {
  return `DEV-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-001`;
}

function newLine(catalog?: CatalogItem): QuoteLine {
  const item = catalog ?? CATALOG[0]!;
  return {
    id: `line-${Date.now()}-${Math.random()}`,
    catalogId: item.id,
    label: item.label,
    detail: "",
    quantity: 1,
    unit: item.unit,
    unitPrice: item.price,
  };
}

function formatMoney(value: number) {
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`;
}

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(`${value}T12:00:00`).toLocaleDateString("fr-FR");
}

function sanitizeFilename(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "client";
}

function addWrappedText(doc: jsPDF, text: string, x: number, y: number, width: number, lineHeight = 5) {
  const lines = doc.splitTextToSize(text || "-", width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}{required && <span className="ml-1 text-sky-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
      />
    </label>
  );
}

// ─── Select dropdown prestation ───────────────────────────────────────────────

function CatalogSelect({ value, onChange }: { value: string; onChange: (item: CatalogItem) => void }) {
  const [open, setOpen] = useState(false);
  const selected = CATALOG.find((c) => c.id === value) ?? CATALOG[0]!;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left transition hover:border-sky-300 focus:outline-none focus:ring-3 focus:ring-sky-100"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{selected.label}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{selected.description}</p>
        </div>
        <FiChevronDown size={16} className={`mt-1 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {CATALOG.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { onChange(item); setOpen(false); }}
              className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-sky-50 ${item.id === value ? "bg-sky-50" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="shrink-0 text-sm font-bold text-sky-600">
                    {item.price > 0 ? (item.unit === "mois" ? `${item.price} €/mois` : item.unit === "heure" ? `${item.price} €/h` : `dès ${item.price} €`) : "Sur devis"}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const initialInfo: ClientInfo = {
  clientName: "", companyName: "", email: "", phone: "",
  projectDescription: "",
  quoteNumber: makeQuoteNumber(),
  quoteDate: todayIso,
  validUntil: validUntilIso,
  paymentTerms: "Paiement par virement bancaire ou via lien de paiement sécurisé. Le lancement intervient après validation du devis et réception du premier règlement (50 % à la commande, 50 % à la livraison).",
};

export function DownloadableQuoteGenerator() {
  const [info, setInfo] = useState<ClientInfo>(initialInfo);
  const [lines, setLines] = useState<QuoteLine[]>([newLine(CATALOG[0])]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + Math.max(0, l.quantity) * Math.max(0, l.unitPrice), 0),
    [lines]
  );

  function updateInfo<K extends keyof ClientInfo>(key: K, value: ClientInfo[K]) {
    setInfo((c) => ({ ...c, [key]: value }));
  }

  function updateLine(id: string, patch: Partial<QuoteLine>) {
    setLines((c) => c.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function selectCatalog(lineId: string, item: CatalogItem) {
    updateLine(lineId, { catalogId: item.id, label: item.label, unit: item.unit, unitPrice: item.price });
  }

  function addLine() {
    setLines((c) => [...c, newLine(CATALOG[0])]);
  }

  function removeLine(id: string) {
    setLines((c) => (c.length > 1 ? c.filter((l) => l.id !== id) : c));
  }

  // ─── PDF ──────────────────────────────────────────────────────────────────

  function generatePdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 16, right = 194;
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
    if (info.clientName) doc.text(`Contact : ${info.clientName}`, 112, y + 14);
    if (info.email) doc.text(`Email : ${info.email}`, 112, y + 19);
    if (info.phone) doc.text(`Tél : ${info.phone}`, 112, y + 24);

    y = 90;
    [["Numéro de devis", info.quoteNumber], ["Date", formatDate(info.quoteDate)], ["Valable jusqu'au", formatDate(info.validUntil)]].forEach(([label, value], i) => {
      const x = left + i * 60;
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, y, 54, 20, 3, 3);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(label!.toUpperCase(), x + 4, y + 7);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(value!, x + 4, y + 15);
    });

    // Description du projet
    if (info.projectDescription) {
      y = 122;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text("Description du projet", left, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      y = addWrappedText(doc, info.projectDescription, left, y, 178, 4.5) + 8;
    } else {
      y = 122;
    }

    // Tableau prestations
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(left, y, 178, 10, 2, 2, "F");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "bold");
    doc.text("Prestation", left + 4, y + 6.5);
    doc.text("Qté", 144, y + 6.5, { align: "center" });
    doc.text("Prix unit.", 166, y + 6.5, { align: "right" });
    doc.text("Total", right - 4, y + 6.5, { align: "right" });
    y += 12;

    lines.forEach((line) => {
      if (y > 238) { doc.addPage(); y = 20; }
      const rowStart = y;
      const lineLabel = line.label + (line.detail ? ` — ${line.detail}` : "");
      const unitLabel = line.unit === "mois" ? " /mois" : line.unit === "heure" ? " /h" : "";
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      y = addWrappedText(doc, lineLabel, left + 4, y + 4, 112, 4.5);
      const rowHeight = Math.max(18, y - rowStart + 5);
      const lineTotal = Math.max(0, line.quantity) * Math.max(0, line.unitPrice);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(left, rowStart, 178, rowHeight, 2, 2);
      doc.text(String(line.quantity || 0), 144, rowStart + 9, { align: "center" });
      doc.text(`${formatMoney(line.unitPrice || 0)}${unitLabel}`, 166, rowStart + 9, { align: "right" });
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

    y += 40;
    if (y > 235) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Modalités de paiement", left, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    y = addWrappedText(doc, info.paymentTerms, left, y, 178, 4.4) + 10;

    if (y > 247) { doc.addPage(); y = 24; }
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(left, y, 80, 28, 3, 3);
    doc.roundedRect(114, y, 80, 28, 3, 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Client — Signature et date", left + 5, y + 7);
    doc.text("KAH-Digital — Signature et date", 119, y + 7);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`${info.quoteNumber} — ${info.companyName || info.clientName || "Client"}`, left, 286);
    doc.text(`Total : ${formatMoney(total)}`, right, 286, { align: "right" });

    const filename = `devis-${sanitizeFilename(info.companyName || info.clientName)}-kah-digital.pdf`;
    doc.save(filename);
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.85fr)]">

      {/* ── Formulaire ── */}
      <div className="space-y-5">

        {/* Infos client */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Informations client</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nom du contact" value={info.clientName} onChange={(v) => updateInfo("clientName", v)} placeholder="Jean Dupont" required />
            <Field label="Entreprise" value={info.companyName} onChange={(v) => updateInfo("companyName", v)} placeholder="ACME SAS" />
            <Field label="Email" value={info.email} onChange={(v) => updateInfo("email", v)} type="email" placeholder="jean@acme.fr" required />
            <Field label="Téléphone" value={info.phone} onChange={(v) => updateInfo("phone", v)} placeholder="+33 6 …" />
          </div>
        </div>

        {/* Prestations */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Prestations</p>
              <p className="mt-0.5 text-xs text-slate-500">Choisissez une prestation — le prix se met à jour automatiquement.</p>
            </div>
            <button
              type="button"
              onClick={addLine}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-950 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-sky-600"
            >
              <FiPlus size={13} /> Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {lines.map((line, index) => (
              <div key={line.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400">Prestation {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 1}
                    className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiTrash2 size={11} /> Retirer
                  </button>
                </div>

                {/* Dropdown catalogue */}
                <div className="mb-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type de prestation</p>
                  <CatalogSelect value={line.catalogId} onChange={(item) => selectCatalog(line.id, item)} />
                </div>

                {/* Quantité + Prix */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {line.unit === "mois" ? "Nb de mois" : line.unit === "heure" ? "Nb d'heures" : "Quantité"}
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(e) => updateLine(line.id, { quantity: Number(e.target.value) || 1 })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Prix {line.unit === "mois" ? "(€/mois)" : line.unit === "heure" ? "(€/h)" : "(€)"}
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={line.unitPrice}
                      onChange={(e) => updateLine(line.id, { unitPrice: Number(e.target.value) || 0 })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-sky-700 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
                    />
                  </label>
                </div>

                {/* Précision optionnelle */}
                <div className="mt-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Précision <span className="font-normal text-slate-400 normal-case tracking-normal">(optionnel)</span>
                    </span>
                    <input
                      type="text"
                      value={line.detail}
                      placeholder={`ex. ${line.catalogId === "site-vitrine" ? "5 pages + formulaire contact + Google Maps" : line.catalogId === "maintenance" ? "hébergement Vercel + mises à jour mensuelles" : "détails spécifiques de cette prestation"}`}
                      onChange={(e) => updateLine(line.id, { detail: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description du projet */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Contexte du projet</p>
            <p className="mb-3 text-xs text-slate-500">Décrivez votre besoin — cette description apparaît dans le PDF.</p>
            <textarea
              value={info.projectDescription}
              rows={4}
              placeholder="ex. Refonte complète du site de notre restaurant. Nous avons besoin d'une page d'accueil moderne, d'un menu en ligne et d'un formulaire de réservation. Le site doit être rapide sur mobile et bien référencé localement."
              onChange={(e) => updateInfo("projectDescription", e.target.value)}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
            />
          </label>
        </div>

        {/* Options avancées (masquées par défaut) */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Options avancées</p>
            <FiChevronDown size={15} className={`text-slate-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </button>

          {showAdvanced && (
            <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="N° de devis" value={info.quoteNumber} onChange={(v) => updateInfo("quoteNumber", v)} />
                <Field label="Date" value={info.quoteDate} onChange={(v) => updateInfo("quoteDate", v)} type="date" />
                <Field label="Valable jusqu'au" value={info.validUntil} onChange={(v) => updateInfo("validUntil", v)} type="date" />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Modalités de paiement</span>
                <textarea
                  value={info.paymentTerms}
                  rows={3}
                  onChange={(e) => updateInfo("paymentTerms", e.target.value)}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-3 focus:ring-sky-100"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* ── Aperçu & téléchargement ── */}
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Aperçu du devis</p>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Client</span>
            <strong className="text-right text-slate-900">{info.companyName || info.clientName || "—"}</strong>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Devis</span>
            <strong className="text-right text-slate-900">{info.quoteNumber}</strong>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Date</span>
            <strong className="text-right text-slate-900">{formatDate(info.quoteDate)}</strong>
          </div>
        </div>

        <div className="my-4 space-y-2">
          {lines.map((line) => {
            const lineTotal = Math.max(0, line.quantity) * Math.max(0, line.unitPrice);
            return (
              <div key={line.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{line.label}</p>
                    {line.detail && <p className="mt-0.5 text-xs text-slate-500">{line.detail}</p>}
                    <p className="mt-1 text-xs text-slate-400">
                      {line.quantity} × {formatMoney(line.unitPrice)}{line.unit === "mois" ? "/mois" : line.unit === "heure" ? "/h" : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-slate-950">{formatMoney(lineTotal)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-slate-950 p-5 text-white">
          <p className="text-xs uppercase tracking-widest text-white/40">Total TTC</p>
          <p className="mt-1 text-4xl font-black">{formatMoney(total)}</p>
          <p className="mt-1 text-xs text-white/50">TVA non applicable — article 293 B du CGI</p>
        </div>

        <button
          type="button"
          onClick={generatePdf}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2ea8ff,#1d4ed8)] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_32px_rgba(46,168,255,0.3)] transition hover:brightness-105 active:scale-[0.98]"
        >
          <FiDownload size={17} /> Télécharger le devis PDF
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">PDF avec en-tête KAH-Digital · Prêt à envoyer</p>
      </aside>
    </div>
  );
}
