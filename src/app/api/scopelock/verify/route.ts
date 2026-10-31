import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, makeSessionToken, readLoginToken, sessionMaxAgeSeconds } from "@/lib/scopelock/auth";
import { findAccount } from "@/lib/scopelock/store";

export async function GET(request: NextRequest) {
  const email = readLoginToken(request.nextUrl.searchParams.get("t"));
  const account = email ? await findAccount(email) : null;
  if (!email || !account) return NextResponse.redirect(new URL("/scopelock/connexion?erreur=lien", request.url));
  const response = NextResponse.redirect(new URL("/scopelock/app", request.url));
  response.cookies.set(SESSION_COOKIE, makeSessionToken(email), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: sessionMaxAgeSeconds,
  });
  return response;
}
