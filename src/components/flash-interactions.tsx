"use client";

import { useEffect } from "react";

const SELECTOR = "a, button, [role='button'], input[type='submit'], input[type='button']";

export function FlashInteractions() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(SELECTOR) as HTMLElement | null;
      if (!target) return;

      target.classList.remove("flash-trigger");
      void target.offsetWidth;
      target.classList.add("flash-trigger");

      const timeout = window.setTimeout(() => {
        target.classList.remove("flash-trigger");
      }, 500);

      const cleanup = () => {
        window.clearTimeout(timeout);
        target.classList.remove("flash-trigger");
      };

      target.addEventListener("pointerup", cleanup, { once: true });
      target.addEventListener("pointerleave", cleanup, { once: true });
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
