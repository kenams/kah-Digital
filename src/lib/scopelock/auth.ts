import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "sl_session";
const LOGIN_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.SCOPELOCK_SECRET || process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function sign(kind: "login" | "session", email: string, exp: number) {
  return createHmac("sha256", secret()).update(`${kind}|${email}|${exp}`).digest("base64url");
}

function pack(kind: "login" | "session", email: string, ttl: number) {
  const exp = Date.now() + ttl;
  return `${Buffer.from(email).toString("base64url")}.${exp}.${sign(kind, email, exp)}`;
}

function unpack(kind: "login" | "session", token: string | undefined | null): string | null {
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
}

export const makeLoginToken = (email: string) => pack("login", email, LOGIN_TTL_MS);
export const readLoginToken = (token: string | null | undefined) => unpack("login", token);
export const makeSessionToken = (email: string) => pack("session", email, SESSION_TTL_MS);
export const sessionMaxAgeSeconds = SESSION_TTL_MS / 1000;

export async function getSessionEmail() {
  const jar = await cookies();
  return unpack("session", jar.get(SESSION_COOKIE)?.value);
}
