"use client";

import { useState } from "react";

const EXAMPLE = "numéro;client;email;montant;échéance\nF-2026-014;Atelier Martin;compta@atelier-martin.fr;1 250,00;15/10/2026\nF-2026-015;Studio Lumen;;480;2026-11-05";

export function ImportForm({ action }: { action: (formData: FormData) => void | Promise<void> }) {
  const [csv, setCsv] = useState("");
  const [fileName, setFileName] = useState("");

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setCsv(await file.text());
  }

  return (
    <form action={action} className="mt-5 space-y-4">
      <div>
        <label htmlFor="csv-file" className="mb-1 block text-sm text-white/75">Fichier CSV exporté de votre outil de facturation</label>
        <input
          id="csv-file"
          type="file"
          accept=".csv,text/csv,text/plain"
          onChange={onFile}
          className="block w-full text-sm text-white/75 file:mr-4 file:rounded-full file:border-0 file:bg-[#d6b36a] file:px-4 file:py-2 file:font-semibold file:text-[#11131b] hover:file:bg-[#f0d99b]"
        />
        {fileName && <p className="mt-1 text-xs text-white/50">{fileName} chargé</p>}
      </div>
      <div>
        <label htmlFor="csv-text" className="mb-1 block text-sm text-white/75">ou collez le contenu ici</label>
        <textarea
          id="csv-text"
          name="csv"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={6}
          placeholder={EXAMPLE}
          className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2.5 font-mono text-xs text-white placeholder:text-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]"
        />
        <p className="mt-1 text-xs text-white/50">
          Colonnes reconnues : numéro, client, email (facultatif), montant, devise (facultatif), émission (facultatif), échéance. Séparateur « ; », « , » ou tabulation. Une facture déjà importée est mise à jour, son statut est conservé.
        </p>
      </div>
      <button
        type="submit"
        disabled={!csv.trim()}
        className="inline-flex rounded-full bg-[#d6b36a] px-5 py-2.5 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]"
      >
        Importer
      </button>
    </form>
  );
}
