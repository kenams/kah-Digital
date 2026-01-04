import type { User } from "@supabase/supabase-js";

export function isAdminUser(user: User | null) {
  if (!user) return false;

  const role = user.app_metadata?.role as string | undefined;

  return role === "admin";
}
