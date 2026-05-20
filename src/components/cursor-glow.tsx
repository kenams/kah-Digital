"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    outer.style.opacity = "1";

    let tx = -200, ty = -200; // target (exact mouse pos)
    let px = -200, py = -200; // lerped prev pos for velocity
    let hovering = false;
    let pressing = false;
    let prevHovering = false;
    let prevPressing = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hit = document.elementFromPoint(tx, ty);
      hovering = !!(hit?.closest('a, button, [role="button"], input, select, textarea, [data-cursor]'));
    };
    const onDown = () => { pressing = true; };
    const onUp   = () => { pressing = false; };

    const tick = () => {
      // Lerp previous position for velocity calculation
      px += (tx - px) * 0.28;
      py += (ty - py) * 0.28;

      const dx = tx - px;
      const dy = ty - py;
      const speed = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // ── Position (outer, no CSS transition) ──────────────────────────────
      outer.style.transform = `translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;

      // ── Squash & stretch (inner, CSS transition handles hover size) ───────
      let sx: number, sy: number;
      if (pressing) {
        sx = 0.55; sy = 0.55;
      } else if (hovering) {
        sx = 1; sy = 1;
      } else {
        const s = Math.min(speed * 0.052, 0.82);
        sx = 1 + s;
        sy = Math.max(0.52, 1 - s * 0.44);
      }
      inner.style.transform = `rotate(${hovering ? 0 : angle}deg) scaleX(${sx}) scaleY(${sy})`;

      // ── State changes → CSS transition takes over for size / color ────────
      const stateChanged = hovering !== prevHovering || pressing !== prevPressing;
      if (stateChanged) {
        prevHovering = hovering;
        prevPressing = pressing;

        if (pressing) {
          inner.style.width  = "6px";
          inner.style.height = "6px";
          inner.style.background  = "rgba(255,255,255,1)";
          inner.style.boxShadow   = "0 0 12px 4px rgba(255,255,255,0.5)";
          inner.style.border      = "none";
        } else if (hovering) {
          inner.style.width  = "40px";
          inner.style.height = "40px";
          inner.style.background  = "rgba(99,102,241,0.08)";
          inner.style.boxShadow   = "0 0 0 1.5px rgba(99,102,241,0.75), 0 0 22px 4px rgba(99,102,241,0.18)";
          inner.style.border      = "none";
        } else {
          inner.style.width  = "8px";
          inner.style.height = "8px";
          inner.style.background  = "rgba(255,255,255,0.92)";
          inner.style.border      = "none";
        }
      }

      // Dynamic glow follows speed when not hovering
      if (!hovering && !pressing) {
        const gR = (4 + speed * 0.36).toFixed(1);
        const gO = Math.min(0.13 + speed * 0.009, 0.38).toFixed(3);
        inner.style.boxShadow = `0 0 ${gR}px 1px rgba(255,255,255,${gO})`;
      }

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
    // Outer: position only — no CSS transition to avoid fighting rAF
    <div
      ref={outerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ opacity: 0 }}
    >
      {/* Inner: shape + color — CSS transition handles hover state smoothly */}
      <div
        ref={innerRef}
        className="rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 0 5px 1px rgba(255,255,255,0.15)",
          transformOrigin: "center",
          willChange: "transform",
          transition: "width 0.18s ease, height 0.18s ease, background 0.18s ease, box-shadow 0.22s ease",
        }}
      />
    </div>
  );
}
