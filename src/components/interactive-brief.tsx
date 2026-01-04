"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";
import { useLocale } from "@/lib/locale";

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

const fieldsFr: BriefField[] = [
  { id: "company", label: "Entreprise / Organisation", placeholder: "Nom de la structure" },
  { id: "contact", label: "Contact principal", placeholder: "Nom + role" },
  { id: "email", label: "Email / Telephone", placeholder: "hello@entreprise.com / +41 00 000 00 00" },
  { id: "goals", label: "Objectifs principaux", placeholder: "Generer des leads, presenter nos offres...", type: "textarea" },
  { id: "audience", label: "Cible / utilisateurs", placeholder: "Startups, TPE, talents..." },
  { id: "pages", label: "Pages et fonctionnalites cles (site)", placeholder: "Accueil, Services, Portfolio...", type: "textarea" },
  { id: "appPlatforms", label: "Plateformes (si app mobile)", placeholder: "iOS, Android, tablette..." },
  { id: "appFeatures", label: "Fonctionnalites MVP (mobile)", placeholder: "Auth, push, paiement, offline...", type: "textarea" },
  { id: "style", label: "Style visuel souhaite", placeholder: "Epure, premium, lumineux..." },
  { id: "references", label: "References ou inspirations", placeholder: "https://site-1.com, https://site-2.com", type: "textarea" },
  { id: "budget", label: "Budget estime", placeholder: "2 000 EUR - 6 000 EUR" },
  { id: "deadline", label: "Deadline ideale", placeholder: "Fin Q2, ASAP..." },
  { id: "integrations", label: "Integrations / outils", placeholder: "CRM, paiement, automation...", type: "textarea" },
  { id: "notes", label: "Notes complementaires", placeholder: "Contraintes techniques, tonalite de contenu...", type: "textarea" },
];

const fieldsEn: BriefField[] = [
  { id: "company", label: "Company / Organization", placeholder: "Company name" },
  { id: "contact", label: "Main contact", placeholder: "Name + role" },
  { id: "email", label: "Email / Phone", placeholder: "hello@company.com / +41 00 000 00 00" },
  { id: "goals", label: "Main goals", placeholder: "Generate leads, present our offer...", type: "textarea" },
  { id: "audience", label: "Audience / users", placeholder: "Startups, SMBs, talent..." },
  { id: "pages", label: "Key pages and features (site)", placeholder: "Home, Services, Portfolio...", type: "textarea" },
  { id: "appPlatforms", label: "Platforms (if mobile app)", placeholder: "iOS, Android, tablet..." },
  { id: "appFeatures", label: "MVP features (mobile)", placeholder: "Auth, push, payments, offline...", type: "textarea" },
  { id: "style", label: "Desired visual style", placeholder: "Minimal, premium, bright..." },
  { id: "references", label: "References or inspirations", placeholder: "https://site-1.com, https://site-2.com", type: "textarea" },
  { id: "budget", label: "Estimated budget", placeholder: "2,000 EUR - 6,000 EUR" },
  { id: "deadline", label: "Ideal deadline", placeholder: "End of Q2, ASAP..." },
  { id: "integrations", label: "Integrations / tools", placeholder: "CRM, payments, automation...", type: "textarea" },
  { id: "notes", label: "Additional notes", placeholder: "Technical constraints, content tone...", type: "textarea" },
];

export function InteractiveBrief() {
  const { isEnglish } = useLocale();
  const fields = isEnglish ? fieldsEn : fieldsFr;
  const textCopy = isEnglish
    ? {
        title: "Fillable version",
        reset: "Reset",
        export: "Export my version to PDF",
        send: "Send by email",
        sending: "Sending...",
        pdfTitle: "Kah-Digital - Project brief",
        pdfContact: "Contact: kah-digital@hotmail.com - +33 7 59 55 84 14 (temporary number)",
        success: "PDF version generated successfully.",
        sendSuccess: "PDF sent by email.",
        sendError: "Unable to send the PDF right now.",
        sendMissingEmail: "Add a valid email to send the PDF.",
        error: "Unable to generate the PDF right now.",
      }
    : {
        title: "Version remplissable",
        reset: "Reinitialiser",
        export: "Exporter ma version en PDF",
        send: "Envoyer par email",
        sending: "Envoi...",
        pdfTitle: "Kah-Digital - Cahier des charges",
        pdfContact: "Contact : kah-digital@hotmail.com - +33 7 59 55 84 14 (numero temporaire)",
        success: "Version PDF generee avec succes.",
        sendSuccess: "PDF envoye par email.",
        sendError: "Impossible d'envoyer le PDF pour le moment.",
        sendMissingEmail: "Ajoute un email valide pour envoyer le PDF.",
        error: "Impossible de generer le PDF pour le moment.",
      };
  const [formState, setFormState] = useState<BriefState>(defaultState);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [sendState, setSendState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sendMessage, setSendMessage] = useState<string>("");

  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  function handleChange(field: keyof BriefState, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm() {
    setFormState(defaultState);
    setState("idle");
    setMessage("");
  }

  function buildPdfDoc() {
    const doc = new jsPDF();
    const baseFont = "helvetica";
    doc.setFont(baseFont, "normal");
    doc.setFontSize(18);
    doc.text(textCopy.pdfTitle, 20, 20);
    doc.setFontSize(11);
    doc.text(textCopy.pdfContact, 20, 30);
    let y = 45;

    Object.entries(formState).forEach(([key, value]) => {
      const fieldLabel = fields.find((field) => field.id === key)?.label ?? key;
      doc.setFont(baseFont, "bold");
      doc.text(`${fieldLabel}`, 20, y);
      doc.setFont(baseFont, "normal");
      const textValue = value || "/";
      const split = doc.splitTextToSize(textValue, 170);
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

    return doc;
  }

  function exportPdf() {
    try {
      const doc = buildPdfDoc();
      doc.save("brief-kah-digital.pdf");
      setMessage(textCopy.success);
      setState("success");
    } catch (error) {
      console.error(error);
      setMessage(textCopy.error);
      setState("error");
    }
  }

  async function sendPdf() {
    const email = formState.email.match(emailRegex)?.[0] ?? "";
    if (!email) {
      setSendMessage(textCopy.sendMissingEmail);
      setSendState("error");
      return;
    }

    setSendState("sending");
    setSendMessage("");

    try {
      const doc = buildPdfDoc();
      const dataUri = doc.output("datauristring");
      const base64 = dataUri.split(",")[1] ?? "";
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale: isEnglish ? "en" : "fr",
          fields: formState,
          pdfBase64: base64,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Erreur d'envoi");
      }

      setSendState("success");
      setSendMessage(textCopy.sendSuccess);
    } catch (error) {
      console.error(error);
      setSendState("error");
      setSendMessage(textCopy.sendError);
    }
  }

  return (
    <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-lg font-semibold">{textCopy.title}</p>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
        >
          {textCopy.reset}
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const commonProps = {
            id: field.id,
            name: field.id,
            placeholder: field.placeholder,
            value: formState[field.id],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleChange(field.id, event.target.value),
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
          {textCopy.export}
        </button>
        <button
          type="button"
          onClick={sendPdf}
          disabled={sendState === "sending"}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sendState === "sending" ? textCopy.sending : textCopy.send}
        </button>
        {message && (
          <p className={`text-sm ${state === "error" ? "text-rose-200" : "text-emerald-200"}`}>{message}</p>
        )}
        {sendMessage && (
          <p className={`text-sm ${sendState === "error" ? "text-rose-200" : "text-emerald-200"}`}>
            {sendMessage}
          </p>
        )}
      </div>
    </div>
  );
}
