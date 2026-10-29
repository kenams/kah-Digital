import { timingSafeEqual } from "crypto";

// Comparaison de secrets en temps constant (évite les attaques par chronométrage).
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
