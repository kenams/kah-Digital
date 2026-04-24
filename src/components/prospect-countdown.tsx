"use client";

import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

export function ProspectCountdown({ sentAt, lang }: { sentAt: string | null; lang: string }) {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!sentAt) return;
    const deadline = new Date(sentAt).getTime() + 48 * 3600 * 1000;

    function tick() {
      const diff = deadline - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sentAt]);

  if (!sentAt || expired) return null;
  if (!timeLeft) return null;

  const labels: Record<string, { label: string; h: string; m: string; s: string }> = {
    fr: { label: "Offre valable encore", h: "h", m: "min", s: "sec" },
    en: { label: "Offer valid for", h: "h", m: "min", s: "sec" },
    de: { label: "Angebot gültig noch", h: "Std", m: "Min", s: "Sek" },
  };
  const l = labels[lang] ?? labels.fr;

  return (
    <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
      <FiClock size={16} className="shrink-0 text-amber-400" />
      <span className="text-sm text-amber-300">{l.label}</span>
      <div className="flex items-center gap-1 font-mono font-bold text-amber-300">
        <span>{String(timeLeft.h).padStart(2, "0")}{l.h}</span>
        <span className="opacity-60">:</span>
        <span>{String(timeLeft.m).padStart(2, "0")}{l.m}</span>
        <span className="opacity-60">:</span>
        <span>{String(timeLeft.s).padStart(2, "0")}{l.s}</span>
      </div>
    </div>
  );
}
