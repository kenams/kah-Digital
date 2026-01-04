import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminUser } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

function authNotConfiguredResponse() {
  return new NextResponse("Configuration Supabase Auth manquante", { status: 503 });
}

function logAdminEvent(label: string, pathname: string, request: NextRequest) {
  console.warn(`[admin] ${label}`, {
    path: pathname,
    method: request.method,
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
  });
}

function createSupabaseClient(request: NextRequest, response: NextResponse) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name, options) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    logAdminEvent("auth-config-missing", pathname, request);
    return authNotConfiguredResponse();
  }

  const response = NextResponse.next();
  const supabase = createSupabaseClient(request, response);

  if (!supabase) {
    logAdminEvent("auth-client-missing", pathname, request);
    return authNotConfiguredResponse();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    logAdminEvent("unauthorized", pathname, request);
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login?error=session", request.url));
  }

  if (!isAdminUser(user)) {
    logAdminEvent("forbidden", pathname, request);
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/admin/login?error=forbidden", request.url));
  }

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfaData?.currentLevel !== "aal2") {
    logAdminEvent("mfa-required", pathname, request);
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "MFA requise" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/admin/login?error=mfa", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
