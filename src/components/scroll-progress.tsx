"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0%";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[9997] h-[2px] w-full bg-white/[0.04]">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
        style={{ willChange: "width", transition: "width 0.1s linear" }}
      />
    </div>
  );
}
