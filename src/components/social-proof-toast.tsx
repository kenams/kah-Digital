"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { name: "Lucas", city: "Lyon", action: "a demandé un devis", tag: "site vitrine", ago: "3 min" },
  { name: "Sophie", city: "Paris", action: "vient de signer", tag: "site corporate", ago: "28 min" },
  { name: "Thomas", city: "Genève", action: "a lancé son app", tag: "React Native", ago: "2h" },
  { name: "Emma", city: "Toulouse", action: "a reçu son devis", tag: "en 18 minutes", ago: "45 min" },
  { name: "Karim", city: "Bordeaux", action: "a automatisé", tag: "workflow IA", ago: "4h" },
  { name: "Julie", city: "Lausanne", action: "a reçu son site", tag: "en 2 semaines", ago: "1 jour" },
  { name: "Marc", city: "Zurich", action: "a commandé", tag: "refonte + SEO", ago: "6h" },
  { name: "Inès", city: "Nantes", action: "a lancé son SaaS", tag: "avec KAH-Digital", ago: "2 jours" },
];

export function SocialProofToast() {
  const [index, setIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const firstShow = setTimeout(() => {
      setIndex(Math.floor(Math.random() * NOTIFICATIONS.length));
      setVisible(true);
    }, 9000);
    return () => clearTimeout(firstShow);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const hideTimer = setTimeout(() => setVisible(false), 5500);
    const nextTimer = setTimeout(() => {
      setIndex((prev) => ((prev ?? 0) + 1) % NOTIFICATIONS.length);
      setVisible(true);
    }, 38000);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  const notif = index !== null ? NOTIFICATIONS[index] : null;
  if (!notif) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-36 right-4 z-40 max-w-[272px] overflow-hidden rounded-2xl border border-white/10 bg-gray-900/96 shadow-2xl shadow-black/50 backdrop-blur-xl sm:bottom-28 sm:right-6"
        >
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-green-400 to-emerald-500" />
          <div className="flex items-start gap-3 p-4 pl-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
              {notif.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight text-white">
                {notif.name}{" "}
                <span className="text-xs font-normal text-gray-400">· {notif.city}</span>
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                {notif.action}{" "}
                <span className="font-medium text-blue-400">{notif.tag}</span>
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[0.6rem] text-gray-600">il y a {notif.ago}</span>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 text-gray-600 transition hover:text-gray-400"
              aria-label="Fermer"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
