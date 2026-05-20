"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only on pointer:fine (desktop mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display = "block";
    ring.style.display = "block";

    let tx = -200, ty = -200;
    let rx = -200, ry = -200;
    let hovering = false;
    let pressing = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovering = !!(el?.closest('a, button, [role="button"], [data-cursor="pointer"], input, select, textarea'));
    };

    const onDown = () => { pressing = true; };
    const onUp = () => { pressing = false; };

    const tick = () => {
      // Dot tracks exactly
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%) scale(${pressing ? 0.5 : 1})`;

      // Ring springs behind
      rx += (tx - rx) * 0.13;
      ry += (ty - ry) * 0.13;

      const size = hovering ? 52 : pressing ? 26 : 36;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.borderColor = hovering
        ? "rgba(99,102,241,0.7)"
        : "rgba(255,255,255,0.28)";
      ring.style.backgroundColor = hovering
        ? "rgba(99,102,241,0.07)"
        : "transparent";

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Small dot — exact cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[7px] w-[7px] rounded-full bg-white will-change-transform"
        style={{ transition: "transform 0.05s linear" }}
      />
      {/* Large ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border will-change-transform"
        style={{ width: 36, height: 36, borderColor: "rgba(255,255,255,0.28)" }}
      />
    </>
  );
}
