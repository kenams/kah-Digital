"use client";

import { useState } from "react";

export function DraftEditor({ to, subject, body }: { to: string | null; subject: string; body: string }) {
  const [text, setText] = useState(body);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const mailto = to ? `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` : null;
  const btn = "inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]";

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-widest text-white/50">Brouillon à relire avant d&apos;envoyer</p>
      <p className="mt-2 text-sm font-semibold text-white/90">Objet : {subject}</p>
      <label htmlFor={`d-${subject}`} className="sr-only">Texte de la relance</label>
      <textarea
        id={`d-${subject}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={9}
        className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={copy} className={btn}>{copied ? "Copié ✓" : "Copier le texte"}</button>
        {mailto ? (
          <a href={mailto} className={btn}>Ouvrir dans ma messagerie</a>
        ) : (
          <span className="self-center text-xs text-white/45">Pas d&apos;email client enregistré : copiez le texte.</span>
        )}
      </div>
    </div>
  );
}
