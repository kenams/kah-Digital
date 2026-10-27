import test from "node:test";
import assert from "node:assert/strict";
import { safeSiteRedirect } from "../../src/lib/clean-url";

const SITE = "https://kah-digital.ch";
const FALLBACK = `${SITE}/p/abc`;

test("redirections vers un autre site refusées (open redirect)", () => {
  for (const evil of [
    "https://evil.example/login",
    "//evil.example",
    "/\\evil.example",
    "https://kah-digital.ch.evil.example/x",
    "https://kah-digital.ch@evil.example/x",
    "javascript:alert(1)",
    "data:text/html,<script>1</script>",
    encodeURIComponent("https://evil.example"),
    "https://evil.example/?u=https://kah-digital.ch",
  ]) {
    assert.equal(safeSiteRedirect(evil, SITE, FALLBACK), FALLBACK, evil);
  }
});

test("redirections légitimes des mails conservées", () => {
  assert.equal(safeSiteRedirect("/devis", SITE, FALLBACK), `${SITE}/devis`);
  assert.equal(safeSiteRedirect("/offres", SITE, FALLBACK), `${SITE}/offres`);
  assert.equal(safeSiteRedirect(encodeURIComponent(`${SITE}/p/abc`), SITE, FALLBACK), `${SITE}/p/abc`);
  assert.equal(safeSiteRedirect("https://www.kah-digital.ch/devis", SITE, FALLBACK), "https://www.kah-digital.ch/devis");
});

test("absent ou vide : repli", () => {
  assert.equal(safeSiteRedirect(null, SITE, FALLBACK), FALLBACK);
  assert.equal(safeSiteRedirect("", SITE, FALLBACK), FALLBACK);
});
