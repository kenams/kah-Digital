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
  progressOverride?: number;
};

const progressGradient = [
  { stop: 0, color: "#d9d2c2" }, // warm stone
  { stop: 0.5, color: "#c3d2d9" }, // steel mist
  { stop: 1, color: "#f0c980" }, // gold glow
];

function getProgressColor(value: number) {
  if (value <= progressGradient[0].stop) return progressGradient[0].color;
  if (value >= progressGradient.at(-1)!.stop) return progressGradient.at(-1)!.color;
  for (let index = 0; index < progressGradient.length - 1; index += 1) {
    const current = progressGradient[index];
    const next = progressGradient[index + 1];
    if (value >= current.stop && value <= next.stop) {
      const ratio = (value - current.stop) / (next.stop - current.stop || 1);
      const lerp = (a: number, b: number) => Math.round(a + (b - a) * ratio);
      const [r1, g1, b1] = current.color.match(/\w\w/g)!.map((hex) => parseInt(hex, 16));
      const [r2, g2, b2] = next.color.match(/\w\w/g)!.map((hex) => parseInt(hex, 16));
      return `rgb(${lerp(r1, r2)}, ${lerp(g1, g2)}, ${lerp(b1, b2)})`;
    }
  }
  return progressGradient[0].color;
}

export function StickyTimelineIndicator({ sections, className = "", progressOverride }: StickyTimelineIndicatorProps) {
  const stableSections = useMemo(() => sections, [sections]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(1);
      } else {
        const clamped = Math.min(Math.max(window.scrollY, 0), maxScroll);
        const ratio =
          window.scrollY + window.innerHeight >= doc.scrollHeight - 2 ? 1 : clamped / maxScroll;
        setProgress(ratio);
      }

      let nextActive = 0;
      stableSections.forEach((section, index) => {
        const node = document.getElementById(section.id);
        if (!node) return;
        const offset = node.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + window.innerHeight * 0.2 >= offset - 120) {
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

  const resolvedProgress =
    typeof progressOverride === "number" ? Math.min(1, Math.max(0, progressOverride)) : progress;
  const progressPercent = Math.round(resolvedProgress * 100);
  const progressLabel = `${progressPercent}%`;
  const progressColor = getProgressColor(resolvedProgress);
  const isComplete = resolvedProgress >= 0.999;
  const auraShadow = isComplete
    ? "0 35px 90px rgba(214, 179, 106, 0.6), 0 0 40px rgba(255, 241, 210, 0.55)"
    : "0 25px 70px rgba(134, 150, 168, 0.45), 0 0 30px rgba(255,255,255,0.25)";

  return (
    <div
      className={`premium-card sticky-timeline-indicator rounded-[32px] border border-white/10 bg-black/60 p-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl ${className}`}
      data-role="timeline-indicator"
    >
      <div className="flex items-center gap-4">
        <div
          className="k-progress-indicator"
          style={{
            boxShadow: auraShadow,
            borderColor: isComplete ? "rgba(214, 179, 106, 0.8)" : "rgba(255, 255, 255, 0.25)",
            background: isComplete
              ? "linear-gradient(135deg, rgba(214, 179, 106, 0.35), rgba(255, 255, 255, 0.15))"
              : "linear-gradient(135deg, rgba(195, 210, 217, 0.25), rgba(255, 255, 255, 0.08))",
          }}
        >
          <span className="k-progress-letter">K</span>
          <motion.div
            className="k-progress-fill"
            style={{ height: progressLabel, background: `linear-gradient(180deg, ${progressColor}, ${progressColor})` }}
            transition={{ type: "spring", stiffness: 160, damping: 26 }}
          />
          {isComplete && (
            <motion.div
              className="k-progress-star"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Timeline configurateur</p>
          <p className="text-3xl font-semibold text-white">{progressLabel}</p>
          <p className="text-sm text-white/60">Progression du brief</p>
        </div>
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
          className="h-full rounded-full bg-gradient-to-r from-white via-[#d6b36a] to-[#7fb8c7]"
          style={{ width: `${resolvedProgress * 100}%` }}
        />
      </div>
    </div>
  );
}
