import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const adminUser = process.env.ADMIN_BASIC_USER;
const adminPass = process.env.ADMIN_BASIC_PASSWORD;

function unauthorizedResponse() {
  return new NextResponse("Authentification requise", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kah-Digital Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  if (!adminUser || !adminPass) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const decoded = Buffer.from(authHeader.replace("Basic ", ""), "base64").toString();
  const [user, pass] = decoded.split(":");
  if (user !== adminUser || pass !== adminPass) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
