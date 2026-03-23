import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminUser } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

function getLocaleFromPathname(pathname: string) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return "fr";
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "SAMEORIGIN");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("cross-origin-opener-policy", "same-origin");
  response.headers.set("cross-origin-resource-policy", "same-origin");
  response.headers.set("origin-agent-cluster", "?1");
  return response;
}

function applyPrivateAdminHeaders(response: NextResponse) {
  response.headers.set("x-robots-tag", "noindex, nofollow, noarchive, nosnippet, noimageindex");
  response.headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("pragma", "no-cache");
  return response;
}

function createSecurityHeaders() {
  return applySecurityHeaders(new NextResponse()).headers;
}

function nextResponseWithLocale(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = getLocaleFromPathname(request.nextUrl.pathname);
  requestHeaders.set("x-kah-locale", locale);
  const response = applySecurityHeaders(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  );
  response.headers.set("content-language", locale);
  return response;
}

function jsonWithSecurity(body: BodyInit | null, init?: ResponseInit) {
  return applySecurityHeaders(new NextResponse(body, init));
}

function authNotConfiguredResponse() {
  return jsonWithSecurity("Configuration Supabase Auth manquante", { status: 503 });
}

function redirectWithSecurity(url: URL, status = 307) {
  return applySecurityHeaders(NextResponse.redirect(url, status));
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
  const host = request.headers.get("host")?.toLowerCase();
  if (host === "www.kah-digital.ch") {
    const url = request.nextUrl.clone();
    url.hostname = "kah-digital.ch";
    return redirectWithSecurity(url, 308);
  }

  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminPath) {
    return nextResponseWithLocale(request);
  }

  if (pathname.startsWith("/admin/login")) {
    return nextResponseWithLocale(request);
  }

  if (pathname.startsWith("/admin/reset-password")) {
    return nextResponseWithLocale(request);
  }

  if (pathname.startsWith("/api/admin/auth")) {
    return nextResponseWithLocale(request);
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    logAdminEvent("auth-config-missing", pathname, request);
    return authNotConfiguredResponse();
  }

  const response = nextResponseWithLocale(request);
  applyPrivateAdminHeaders(response);
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
      return NextResponse.json({ error: "Non autorise" }, { status: 401, headers: createSecurityHeaders() });
    }
    return redirectWithSecurity(new URL("/admin/login?error=session", request.url));
  }

  if (!isAdminUser(user)) {
    logAdminEvent("forbidden", pathname, request);
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403, headers: createSecurityHeaders() });
    }
    return redirectWithSecurity(new URL("/admin/login?error=forbidden", request.url));
  }

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfaData?.currentLevel !== "aal2") {
    logAdminEvent("mfa-required", pathname, request);
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "MFA requise" }, { status: 403, headers: createSecurityHeaders() });
    }
    return redirectWithSecurity(new URL("/admin/login?error=mfa", request.url));
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
