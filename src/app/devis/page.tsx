"use client";
import { useState, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

function DevisForm() {
  const params = useSearchParams();
  const company = params.get("company") ?? "";
  const site = params.get("site") ?? "";
  const ref = params.get("ref") ?? "";

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email && !phone) {
      setError("Renseignez au moins un email ou un téléphone.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, site, ref, email, phone, budget, message }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Contactez-nous directement : kahdigital42@gmail.com");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-white mb-3">Demande reçue !</h1>
          <p className="text-gray-400 mb-2">Je vous recontacte sous 24h avec une proposition personnalisée.</p>
          <p className="text-sm text-gray-500">
            Kénan — KAH-Digital ·{" "}
            <a href="mailto:kahdigital42@gmail.com" className="text-blue-400 hover:underline">
              kahdigital42@gmail.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-white/8 bg-gray-900/80 px-4 py-4 text-center">
        <div className="text-lg font-bold tracking-tight">KAH-Digital</div>
        <div className="text-xs text-gray-500">Studio digital — sites, apps &amp; IA</div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Demande de devis</h1>
          {company && (
            <p className="text-gray-400">
              Pour <strong className="text-white">{company}</strong>
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">Réponse sous 24h · Sans engagement · Devis 100% personnalisé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {site && (
            <div className="rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-gray-400">
              Site analysé :{" "}
              <span className="text-white font-medium">{site}</span>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full rounded-xl border border-white/15 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Téléphone (optionnel)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33 6 00 00 00 00"
              className="w-full rounded-xl border border-white/15 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Budget indicatif</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-gray-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
            >
              <option value="">Non défini pour l&apos;instant</option>
              <option value="500-1500€">500 – 1 500 €</option>
              <option value="1500-3000€">1 500 – 3 000 €</option>
              <option value="3000-6000€">3 000 – 6 000 €</option>
              <option value="+6000€">Plus de 6 000 €</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Message (optionnel)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ce que vous recherchez, vos délais, vos questions..."
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none transition resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Envoi en cours..." : "Envoyer ma demande →"}
          </button>

          <p className="text-center text-xs text-gray-600">
            Aucun engagement · Proposition personnalisée sous 24h
          </p>
        </form>

        <div className="mt-10 pt-8 border-t border-white/8 text-center space-y-3">
          <p className="text-xs text-gray-500 mb-3">Préférez discuter directement ?</p>
          <a
            href="https://wa.me/33759558414?text=Bonjour%2C+je+souhaite+un+devis+pour+mon+site+web."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#22c55e]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Discuter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DevisPage() {
  return (
    <Suspense>
      <DevisForm />
    </Suspense>
  );
}
