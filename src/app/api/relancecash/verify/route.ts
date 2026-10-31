import { NextResponse, type NextRequest } from "next/server";
import { createPilotAuth } from "@/lib/pilot-auth";
import { findAccount } from "@/lib/relancecash/store";

const auth = createPilotAuth("relancecash");

export async function GET(request: NextRequest) {
  const email = auth.readLoginToken(request.nextUrl.searchParams.get("t"));
  const account = email ? await findAccount(email) : null;
  if (!email || !account) return NextResponse.redirect(new URL("/relancecash/connexion?erreur=lien", request.url));
  const response = NextResponse.redirect(new URL("/relancecash/app", request.url));
  response.cookies.set(auth.cookieName, auth.makeSessionToken(email), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: auth.sessionMaxAgeSeconds,
  });
  return response;
}
