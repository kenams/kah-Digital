"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TimelineSection = {
  id: string;
  label: string;
  description?: string;
};

type StickyTimelineIndicatorProps = {
  sections: readonly TimelineSection[];
  className?: string;
};

export function StickyTimelineIndicator({ sections, className = "" }: StickyTimelineIndicatorProps) {
  const stableSections = useMemo(() => sections, [sections]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.2;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
      setProgress(ratio);

      let nextActive = 0;
      stableSections.forEach((section, index) => {
        const node = document.getElementById(section.id);
        if (!node) return;
        const offset = node.getBoundingClientRect().top + window.scrollY;
        if (scrollY >= offset - 120) {
          nextActive = index;
        }
      });
      setActiveIndex(nextActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [stableSections]);

  const progressLabel = `${Math.round(progress * 100)}%`;

  return (
    <div
      className={`rounded-[32px] border border-white/10 bg-black/60 p-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
        <span>Timeline</span>
        <span>{progressLabel}</span>
      </div>
      <div className="mt-6 space-y-4">
        {stableSections.map((section, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                const node = document.getElementById(section.id);
                if (!node) return;
                node.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="relative flex w-full gap-3 rounded-2xl border border-transparent bg-transparent px-2 py-2 text-left transition hover:border-white/20"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`inline-flex h-3 w-3 rounded-full border ${
                    isActive || isPast
                      ? "border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                      : "border-white/30 bg-transparent"
                  }`}
                />
                {index < stableSections.length - 1 && (
                  <span
                    className={`mt-1 w-px flex-1 ${
                      isPast ? "bg-gradient-to-b from-white/80 to-white/10" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isActive || isPast ? "text-white" : "text-white/60"}`}>{section.label}</p>
                {section.description && (
                  <p className="text-xs text-white/45">{section.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-white via-[#a855f7] to-[#22d3ee]"
          style={{ width: progressLabel }}
        />
      </div>
    </div>
  );
}
