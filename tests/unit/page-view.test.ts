import assert from "node:assert/strict";
import test from "node:test";
import { classifyPath, isTrackablePath } from "../../src/lib/page-view";

test("classifyPath detects the cyber section in every language", () => {
  assert.deepEqual(classifyPath("/cybersecurite"), { locale: "fr", section: "cyber" });
  assert.deepEqual(classifyPath("/en/cybersecurite"), { locale: "en", section: "cyber" });
  assert.deepEqual(classifyPath("/de/cybersecurite"), { locale: "de", section: "cyber" });
});

test("classifyPath maps the main public sections", () => {
  assert.equal(classifyPath("/").section, "home");
  assert.equal(classifyPath("/en").section, "home");
  assert.equal(classifyPath("/de/devis").section, "devis");
  assert.equal(classifyPath("/commander").section, "commander");
  assert.equal(classifyPath("/offres").section, "offres");
  assert.equal(classifyPath("/agence-web-toulouse").section, "seo");
  assert.equal(classifyPath("/blog/seo-local-pme").section, "blog");
});

test("isTrackablePath ignores private and technical pages", () => {
  assert.equal(isTrackablePath("/cybersecurite"), true);
  assert.equal(isTrackablePath("/admin/prospection"), false);
  assert.equal(isTrackablePath("/en/admin/login"), false);
  assert.equal(isTrackablePath("/api/quote"), false);
  assert.equal(isTrackablePath("/espace/abc"), false);
  assert.equal(isTrackablePath("no-slash"), false);
  assert.equal(isTrackablePath("/" + "a".repeat(250)), false);
});
