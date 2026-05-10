import { NextResponse } from "next/server";
import { requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { getRecentSocialLogs } from "@/lib/social-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await requireAdminAccess();
  if (access.kind !== "ok") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const logs = await getRecentSocialLogs(100);
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
