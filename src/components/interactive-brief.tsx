"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";

type BriefField = {
  id: keyof BriefState;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
};

type BriefState = {
  company: string;
  contact: string;
  email: string;
  goals: string;
  audience: string;
  pages: string;
  appPlatforms: string;
  appFeatures: string;
  style: string;
  references: string;
  budget: string;
  deadline: string;
  integrations: string;
  notes: string;
};

const defaultState: BriefState = {
  company: "",
  contact: "",
  email: "",
  goals: "",
  audience: "",
  pages: "",
  appPlatforms: "",
  appFeatures: "",
  style: "",
  references: "",
  budget: "",
  deadline: "",
  integrations: "",
  notes: "",
};

const fields: BriefField[] = [
  { id: "company", label: "Entreprise / Organisation", placeholder: "Nom de la structure" },
  { id: "contact", label: "Contact principal", placeholder: "Nom + rôle" },
  { id: "email", label: "Email / Téléphone", placeholder: "hello@entreprise.com / +33..." },
  { id: "goals", label: "Objectifs principaux", placeholder: "Générer des leads, présenter nos offres...", type: "textarea" },
  { id: "audience", label: "Cible / utilisateurs", placeholder: "Startups, TPE, talents..." },
  { id: "pages", label: "Pages et fonctionnalités clés (site)", placeholder: "Accueil, Services, Portfolio...", type: "textarea" },
  { id: "appPlatforms", label: "Plateformes (si app mobile)", placeholder: "iOS, Android, tablette..." },
  { id: "appFeatures", label: "Fonctionnalités MVP (mobile)", placeholder: "Auth, push, paiement, offline...", type: "textarea" },
  { id: "style", label: "Style visuel souhaité", placeholder: "Épuré, premium, lumineux..." },
  { id: "references", label: "Références ou inspirations", placeholder: "https://site-1.com, https://site-2.com", type: "textarea" },
  { id: "budget", label: "Budget estimé", placeholder: "2 000 EUR - 6 000 EUR" },
  { id: "deadline", label: "Deadline idéale", placeholder: "Fin Q2, ASAP..." },
  { id: "integrations", label: "Intégrations / outils", placeholder: "CRM, paiement, automation...", type: "textarea" },
  { id: "notes", label: "Notes complémentaires", placeholder: "Contraintes techniques, tonalité de contenu...", type: "textarea" },
];

export function InteractiveBrief() {
  const [formState, setFormState] = useState<BriefState>(defaultState);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  function handleChange(field: keyof BriefState, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm() {
    setFormState(defaultState);
    setState("idle");
    setMessage("");
  }

  function exportPdf() {
    try {
      const doc = new jsPDF();
      const baseFont = "helvetica";
      doc.setFont(baseFont, "normal");
      doc.setFontSize(18);
      doc.text("Kah-Digital - Cahier des charges", 20, 20);
      doc.setFontSize(11);
      doc.text("Contact : hello@kah-digital.com - +33 6 00 00 00 00", 20, 30);
      let y = 45;

      Object.entries(formState).forEach(([key, value]) => {
        const fieldLabel = fields.find((field) => field.id === key)?.label ?? key;
        doc.setFont(baseFont, "bold");
        doc.text(`${fieldLabel}`, 20, y);
        doc.setFont(baseFont, "normal");
        const text = value || "/";
        const split = doc.splitTextToSize(text, 170);
        y += 6;
        split.forEach((line: string) => {
          doc.text(line, 20, y);
          y += 6;
          if (y > 275) {
            doc.addPage();
            y = 20;
          }
        });
        y += 6;
      });

      doc.save("brief-kah-digital.pdf");
      setMessage("Version PDF générée avec succès.");
      setState("success");
    } catch (error) {
      console.error(error);
      setMessage("Impossible de générer le PDF pour le moment.");
      setState("error");
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-lg font-semibold">Version remplissable</p>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
        >
          Réinitialiser
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const commonProps = {
            id: field.id,
            name: field.id,
            placeholder: field.placeholder,
            value: formState[field.id],
            onChange: (
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleChange(field.id, event.target.value),
            className:
              "w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none",
          };

          if (field.type === "textarea") {
            return (
              <div key={field.id} className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor={field.id} className="text-sm text-white/70">
                  {field.label}
                </label>
                <textarea rows={4} {...commonProps} />
              </div>
            );
          }

          return (
            <div key={field.id} className="flex flex-col gap-2">
              <label htmlFor={field.id} className="text-sm text-white/70">
                {field.label}
              </label>
              <input {...commonProps} />
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200"
        >
          Exporter ma version en PDF
        </button>
        {message && (
          <p
            className={`text-sm ${
              state === "error" ? "text-rose-200" : "text-emerald-200"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
