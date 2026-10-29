import test from "node:test";
import assert from "node:assert/strict";
import { UUID_RE, clip, escapeHtml, isHttpUrl, isValidEmail } from "../../src/lib/html-escape";
import { safeEqual } from "../../src/lib/safe-equal";
import { assertPublicUrl } from "../../src/lib/safe-fetch";

test("escapeHtml neutralise une injection de lien dans un champ nom", () => {
  const attack = `</p><a href="https://evil.example/pay">Cliquez ici</a><script>alert(1)</script>`;
  const out = escapeHtml(attack);
  assert.ok(!out.includes("<"));
  assert.ok(!out.includes(">"));
  assert.ok(!out.includes('"'));
});

test("clip retire retours chariot et caractères de contrôle (pas d'injection d'en-tête e-mail)", () => {
  assert.equal(clip("Jean\r\nBcc: victime@example.com", 100), "Jean  Bcc: victime@example.com");
  assert.equal(clip("a".repeat(500), 80).length, 80);
  assert.equal(clip(42, 10), "");
  assert.equal(clip("ligne1\r\nligne2", 100, true), "ligne1\nligne2");
});

test("isValidEmail refuse les adresses piégées", () => {
  assert.equal(isValidEmail("contact@exemple.fr"), true);
  assert.equal(isValidEmail("a@b.c"), false);
  assert.equal(isValidEmail('x"<script>@exemple.fr'), false);
  assert.equal(isValidEmail("a@exemple.fr, b@exemple.fr"), false);
  assert.equal(isValidEmail("a@exemple.fr\nBcc: b@exemple.fr"), false);
  assert.equal(isValidEmail("x".repeat(250) + "@exemple.fr"), false);
});

test("isHttpUrl n'accepte que http et https", () => {
  assert.equal(isHttpUrl("https://exemple.fr/page"), true);
  assert.equal(isHttpUrl("javascript:alert(1)"), false);
  assert.equal(isHttpUrl("file:///etc/passwd"), false);
});

test("UUID_RE", () => {
  assert.equal(UUID_RE.test("123e4567-e89b-42d3-a456-426614174000"), true);
  assert.equal(UUID_RE.test("1 OR 1=1"), false);
});

test("safeEqual : secrets comparés sans faux positif", () => {
  assert.equal(safeEqual("secret", "secret"), true);
  assert.equal(safeEqual("secret", "secreT"), false);
  assert.equal(safeEqual("secret", "secret2"), false);
  assert.equal(safeEqual("", "x"), false);
});

test("assertPublicUrl bloque les adresses internes (SSRF)", async () => {
  for (const bad of ["http://localhost/", "http://127.0.0.1/", "http://169.254.169.254/latest/meta-data/", "http://10.0.0.1/", "http://192.168.1.1/", "http://[::1]/", "ftp://exemple.fr/"]) {
    await assert.rejects(() => assertPublicUrl(bad), /./, bad);
  }
});
