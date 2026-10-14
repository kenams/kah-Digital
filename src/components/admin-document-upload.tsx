"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const kinds = [
  { value: "devis", label: "Devis" },
  { value: "factures", label: "Facture" },
  { value: "autres", label: "Autre" },
];

export function AdminDocumentUpload() {
  const router = useRouter();
  const [kind, setKind] = useState("devis");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("file") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      setMessage({ tone: "error", text: "Choisis un fichier PDF." });
      return;
    }

    setBusy(true);
    setMessage(null);
    const body = new FormData();
    body.set("file", file);
    body.set("kind", kind);

    try {
      const response = await fetch("/api/admin/documents", { method: "POST", body });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage({ tone: "error", text: payload?.error ?? "Envoi impossible." });
      } else {
        setMessage({ tone: "ok", text: "Document archivé." });
        form.reset();
        router.refresh();
      }
    } catch {
      setMessage({ tone: "error", text: "Erreur réseau, réessaie." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Type
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="mt-1 block rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
        >
          {kinds.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </label>
      <label className="min-w-[220px] flex-1 text-xs font-semibold uppercase tracking-widest text-white/50">
        Fichier PDF (10 Mo max)
        <input
          name="file"
          type="file"
          accept="application/pdf,.pdf"
          className="mt-1 block w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1 file:text-xs file:font-semibold file:text-black"
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-50"
      >
        {busy ? "Envoi…" : "Archiver"}
      </button>
      {message ? (
        <p role="status" className={`w-full text-sm ${message.tone === "ok" ? "text-emerald-300" : "text-rose-300"}`}>
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
