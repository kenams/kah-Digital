"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAMES = [
  "Lucas", "Emma", "Hugo", "Léa", "Nathan", "Jade", "Tom", "Camille",
  "Mathis", "Inès", "Noah", "Chloé", "Théo", "Manon", "Louis", "Antoine",
  "Karim", "Amina", "Youssef", "Fatou", "Mehdi", "Nadia", "Axel", "Sophie",
  "Kevin", "Alice", "Romain", "Laura", "Pierre", "Aïcha", "Bastien", "Lena",
  "Julien", "Sarah", "Clara", "Marc", "Julie", "Anaïs", "Sébastien", "Théa",
];

const CITIES = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nantes",
  "Strasbourg", "Lille", "Montpellier", "Rennes", "Nice", "Grenoble",
  "Genève", "Lausanne", "Zurich", "Berne",
  "Bruxelles", "Liège",
  "Montréal", "Québec",
  "Dakar", "Casablanca", "Abidjan", "Tunis",
];

const ACTIONS: { action: string; tag: string }[] = [
  { action: "a demandé un devis", tag: "site vitrine" },
  { action: "vient de signer pour", tag: "un site corporate" },
  { action: "a lancé son app", tag: "React Native" },
  { action: "a reçu son devis", tag: "en 18 min" },
  { action: "a automatisé son", tag: "workflow IA" },
  { action: "a reçu son site", tag: "en 2 semaines" },
  { action: "a commandé une", tag: "refonte + SEO" },
  { action: "a lancé son SaaS", tag: "avec KAH Digital" },
  { action: "vient de régler sa", tag: "landing page" },
  { action: "a réservé un", tag: "audit gratuit" },
  { action: "a démarré son", tag: "projet mobile" },
  { action: "a signé pour", tag: "une app métier" },
];

const AGOS = [
  "1 min", "2 min", "3 min", "5 min", "8 min", "11 min",
  "17 min", "23 min", "34 min", "48 min", "1h", "1h20", "2h", "3h",
];

const AVATAR_COLORS = [
  "from-blue-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-orange-400 to-rose-500",
  "from-fuchsia-500 to-pink-600",
  "from-amber-400 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-600",
  "from-lime-500 to-emerald-600",
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

type Notif = {
  id: number;
  name: string;
  city: string;
  action: string;
  tag: string;
  ago: string;
  color: string;
};

let _uid = 0;

function buildNotif(usedNames: Set<string>): Notif {
  let name = rand(NAMES);
  let tries = 0;
  while (usedNames.has(name) && tries < 12) { name = rand(NAMES); tries++; }
  usedNames.add(name);
  const { action, tag } = rand(ACTIONS);
  const nameIdx = NAMES.indexOf(name);
  return {
    id: ++_uid,
    name,
    city: rand(CITIES),
    action,
    tag,
    ago: rand(AGOS),
    color: AVATAR_COLORS[nameIdx % AVATAR_COLORS.length]!,
  };
}

function buildBatch(): Notif[] {
  const r = Math.random();
  // 30% silence (0), 70% single — jamais plus d'un à la fois
  const size = r < 0.30 ? 0 : 1;
  const used = new Set<string>();
  return Array.from({ length: size }, () => buildNotif(used));
}

// ms
const FIRST_DELAY      = () => 60000 + Math.random() * 120000; // 1–3 min avant le premier
const SHOW_DURATION    = 5500;
const IN_BATCH_GAP     = () => 0;                               // inutile (batch = 1 max)
const BETWEEN_BATCH    = () => 1500000 + Math.random() * 600000; // 25–35 min entre chaque
const SILENT_EXTRA     = () => 300000 + Math.random() * 300000;  // +5–10 min si batch vide

export function SocialProofToast() {
  const [current, setCurrent] = useState<Notif | null>(null);
  const [visible, setVisible]  = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function sched(delay: number, fn: () => void) {
      const t = setTimeout(fn, delay);
      timers.current.push(t);
    }

    function runBatch() {
      const batch = buildBatch();

      if (batch.length === 0) {
        sched(BETWEEN_BATCH() + SILENT_EXTRA(), runBatch);
        return;
      }

      let offset = 0;
      batch.forEach((notif, i) => {
        const startAt = offset;
        const isLast  = i === batch.length - 1;
        offset += SHOW_DURATION + IN_BATCH_GAP();

        sched(startAt, () => {
          setCurrent(notif);
          setVisible(true);
          sched(SHOW_DURATION, () => {
            setVisible(false);
            if (isLast) sched(900 + BETWEEN_BATCH(), runBatch);
          });
        });
      });
    }

    sched(FIRST_DELAY(), runBatch);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, []);

  if (!current) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-[88px] right-4 z-40 max-w-[272px] overflow-hidden rounded-2xl border border-white/10 bg-gray-900/96 shadow-2xl shadow-black/50 backdrop-blur-xl sm:right-6"
        >
          {/* Barre verte gauche */}
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-green-400 to-emerald-500" />

          <div className="flex items-start gap-3 p-4 pl-5">
            {/* Avatar */}
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${current.color} text-sm font-bold text-white`}>
              {current.name[0]}
            </div>

            {/* Contenu */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight text-white">
                {current.name}{" "}
                <span className="text-xs font-normal text-gray-400">· {current.city}</span>
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                {current.action}{" "}
                <span className="font-medium text-blue-400">{current.tag}</span>
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                <span className="text-[0.6rem] text-gray-600">il y a {current.ago}</span>
              </div>
            </div>

            {/* Fermer */}
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
