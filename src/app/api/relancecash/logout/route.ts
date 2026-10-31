import { NextResponse } from "next/server";
import { createPilotAuth } from "@/lib/pilot-auth";

const auth = createPilotAuth("relancecash");

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/relancecash/connexion", request.url), 303);
  response.cookies.set(auth.cookieName, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
