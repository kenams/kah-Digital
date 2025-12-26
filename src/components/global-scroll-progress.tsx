"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const progressGradient = [
  { stop: 0, color: "#d9d2c2" },
  { stop: 0.5, color: "#c3d2d9" },
  { stop: 1, color: "#f0c980" },
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

export function GlobalScrollProgress() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [progress, setProgress] = useState(0);
  const [hasTimeline, setHasTimeline] = useState(false);

  useEffect(() => {
    if (isAdmin || typeof document === "undefined") return undefined;

    const checkTimeline = () => {
      const exists = Boolean(document.querySelector("[data-role='timeline-indicator']"));
      setHasTimeline(exists);
    };

    checkTimeline();
    const observer = new MutationObserver(checkTimeline);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin || hasTimeline || typeof window === "undefined") return undefined;

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
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasTimeline, isAdmin]);

  if (isAdmin || hasTimeline) return null;

  const percent = Math.round(progress * 100);
  const color = getProgressColor(progress);

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60"
      onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
      aria-label="Suivre la progression"
    >
      <div
        className="k-progress-indicator"
        style={{
          borderColor: percent >= 99 ? "rgba(214, 179, 106, 0.8)" : "rgba(255, 255, 255, 0.25)",
          boxShadow:
            percent >= 99
              ? "0 35px 90px rgba(214, 179, 106, 0.6), 0 0 40px rgba(255, 241, 210, 0.55)"
              : "0 20px 60px rgba(134, 150, 168, 0.45), 0 0 30px rgba(255,255,255,0.25)",
          background:
            percent >= 99
              ? "linear-gradient(135deg, rgba(214, 179, 106, 0.35), rgba(255, 255, 255, 0.15))"
              : "linear-gradient(135deg, rgba(195, 210, 217, 0.25), rgba(255, 255, 255, 0.08))",
        }}
      >
        <span className="k-progress-letter">K</span>
        <div
          className="k-progress-fill"
          style={{
            height: `${percent}%`,
            background: `linear-gradient(180deg, ${color}, ${color})`,
          }}
        />
        {percent >= 99 && <div className="k-progress-star" />}
      </div>
    </button>
  );
}
