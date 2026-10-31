"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/scopelock/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("done");
        return;
      }
      setMessage(data.error || "Une erreur est survenue.");
      setState("error");
    } catch {
      setMessage("Connexion impossible. Réessayez.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="rounded-2xl border border-[#d6b36a]/40 bg-[#d6b36a]/10 p-5 text-white/85">
        Si cette adresse correspond à un partenaire ScopeLock, un lien de connexion vient d&apos;être envoyé. Il est valable 15 minutes.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <label htmlFor="sl-email" className="block text-sm font-medium text-white/80">Adresse email du partenaire</label>
      <input
        id="sl-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]"
        placeholder="vous@exemple.fr"
      />
      {state === "error" && <p role="alert" className="text-sm text-red-300">{message}</p>}
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex rounded-full bg-[#d6b36a] px-7 py-3 font-bold text-[#11131b] transition hover:bg-[#f0d99b] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]"
      >
        {state === "loading" ? "Envoi…" : "Recevoir mon lien"}
      </button>
    </form>
  );
}
