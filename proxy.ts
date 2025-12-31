import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const adminUser = process.env.ADMIN_BASIC_USER;
const adminPass = process.env.ADMIN_BASIC_PASSWORD;

function missingConfigResponse() {
  return new NextResponse("Configuration admin manquante", { status: 503 });
}

function unauthorizedResponse() {
  return new NextResponse("Authentification requise", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kah-Digital Admin"',
    },
  });
}

function parseBasicAuth(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = authHeader.replace("Basic ", "").trim();
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }
    return {
      user: decoded.slice(0, separatorIndex),
      pass: decoded.slice(separatorIndex + 1),
    };
  } catch (error) {
    console.error("[proxy] Failed to decode Basic auth header", error);
    return null;
  }
}

export function proxy(request: NextRequest) {
  if (!adminUser || !adminPass) {
    return missingConfigResponse();
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));
  if (!credentials) {
    return unauthorizedResponse();
  }

  if (credentials.user !== adminUser || credentials.pass !== adminPass) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
