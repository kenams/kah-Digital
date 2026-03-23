import { expect, test } from "@playwright/test";

const protectedAdminPaths = ["/admin", "/admin/demandes", "/admin/assistant"] as const;

for (const path of protectedAdminPaths) {
  test(`admin route ${path} stays protected`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });
    const status = response.status();

    expect([307, 401, 403, 503]).toContain(status);

    if (status === 307) {
      expect(response.headers().location).toContain("/admin/login");
      return;
    }

    const body = await response.text();
    expect(body).toContain("Configuration Supabase Auth manquante");
  });
}
