"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ConfigSummary } from "@/types/configurator";

type ConfiguratorPreviewProps = {
  summary: ConfigSummary;
  features: string[];
  integrations: string[];
  ready: boolean;
};

export function ConfiguratorPreview({ summary, features, integrations, ready }: ConfiguratorPreviewProps) {
  const [copied, setCopied] = useState(false);

  const shareText = useMemo(() => {
    const lines = [
      `Type: ${summary.type}`,
      `Vision: ${summary.strategy}`,
      `Style: ${summary.mood}`,
      `Fonctionnalités: ${features.length ? features.join(", ") : "—"}`,
      `Intégrations: ${integrations.length ? integrations.join(", ") : "—"}`,
    ];
    return lines.join("\n");
  }, [summary, features, integrations]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
      setCopied(false);
    }
  }

  const list = (items: string[]) =>
    items.length === 0 ? (
      <p className="text-sm text-white/50">Aucune option sélectionnée.</p>
    ) : (
      <ul className="mt-3 space-y-2 text-white/80">
        {items.map((value) => (
          <li key={value} className="flex items-start gap-2 text-sm">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Aperçu configurateur</p>
        <h3 className="text-2xl font-semibold">Brief prêt à partager</h3>
        <p className="text-sm text-white/70">
          {ready ? "Tu peux le copier/coller dans Notion, Slack ou le formulaire de devis." : "Complète les étapes pour activer l'aperçu complet."}
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Type", value: summary.type },
          { label: "Vision", value: summary.strategy },
          { label: "Style", value: summary.mood },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
            <p className="mt-2 text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Fonctionnalités</p>
          {list(features)}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Intégrations</p>
          {list(integrations)}
        </div>
      </div>
      <motion.div
        className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: ready ? 1 : 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Résumé</p>
        <pre className="mt-3 whitespace-pre-wrap text-white/90">{shareText}</pre>
      </motion.div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={copySummary}
          disabled={!ready}
          className="inline-flex items-center rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {copied ? "Copié ✓" : "Copier le brief"}
        </button>
        <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
          {ready ? "Brief complet" : "En attente de sélection"}
        </span>
      </div>
    </div>
  );
}
