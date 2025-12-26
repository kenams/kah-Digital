import { NextRequest, NextResponse } from "next/server";
import { getRecentQuotes } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

const adminUser = process.env.ADMIN_BASIC_USER;
const adminPass = process.env.ADMIN_BASIC_PASSWORD;

function missingConfigResponse() {
  return NextResponse.json({ error: "Configuration admin manquante" }, { status: 503 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Non autorise" }, { status: 401 });
}

function parseBasicAuth(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(authHeader.replace("Basic ", ""), "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }
    return {
      user: decoded.slice(0, separatorIndex),
      pass: decoded.slice(separatorIndex + 1),
    };
  } catch (error) {
    console.error("[api/admin/quotes] Failed to decode Basic auth header", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  if (!adminUser || !adminPass) {
    return missingConfigResponse();
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));
  if (!credentials || credentials.user !== adminUser || credentials.pass !== adminPass) {
    return unauthorizedResponse();
  }

  const items = await getRecentQuotes();
  return NextResponse.json({ items });
}
