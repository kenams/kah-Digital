import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/reset-password"];

const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Public admin pages — always accessible
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    const res = NextResponse.next();
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      res.headers.set(k, v);
    }
    return res;
  }

  // Edge-level guard: check for any Supabase auth cookie
  // Full auth + MFA validation is done server-side in each page
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));

  if (!hasAuthCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "session");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
