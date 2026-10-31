import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const LOGIN_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.PILOT_SECRET || process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

// Authentification par lien magique sans état, partagée par les pilotes (un cookie et un domaine de signature par produit).
export function createPilotAuth(product: string) {
  const cookieName = `${product}_session`;

  const sign = (kind: "login" | "session", email: string, exp: number) =>
    createHmac("sha256", secret()).update(`${product}|${kind}|${email}|${exp}`).digest("base64url");

  const pack = (kind: "login" | "session", email: string, ttl: number) => {
    const exp = Date.now() + ttl;
    return `${Buffer.from(email).toString("base64url")}.${exp}.${sign(kind, email, exp)}`;
  };

  const unpack = (kind: "login" | "session", token: string | undefined | null): string | null => {
    if (!token || !secret()) return null;
    const [rawEmail, rawExp, mac] = token.split(".");
    if (!rawEmail || !rawExp || !mac) return null;
    const exp = Number(rawExp);
    if (!Number.isFinite(exp) || exp < Date.now()) return null;
    const email = Buffer.from(rawEmail, "base64url").toString();
    const expected = Buffer.from(sign(kind, email, exp));
    const given = Buffer.from(mac);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
    return email;
  };

  return {
    cookieName,
    sessionMaxAgeSeconds: SESSION_TTL_MS / 1000,
    makeLoginToken: (email: string) => pack("login", email, LOGIN_TTL_MS),
    readLoginToken: (token: string | null | undefined) => unpack("login", token),
    makeSessionToken: (email: string) => pack("session", email, SESSION_TTL_MS),
    getSessionEmail: async () => unpack("session", (await cookies()).get(cookieName)?.value),
  };
}
