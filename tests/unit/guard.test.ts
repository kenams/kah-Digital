import test from "node:test";
import assert from "node:assert/strict";
import { isProspectableLead, emailBelongsToSite, isNetworkOrLocatorUrl, isPlaceholderEmail } from "../../src/lib/prospect-email-guard";

// Cas réels du run du 27/10/2026 : ils ne doivent plus JAMAIS recevoir de mail.
const BAD: [string, string][] = [
  ["https://www.la-francaise-immobiliere.fr/agences/agence-pace", "pace@francaiseimmo.fr"],
  ["https://www.ajp-immobilier.com/agence-immobiliere/clisson-44190/ajp-immobilier-clisson/146731.htm", "clisson@ajp-immobilier.com"],
  ["https://www.ipsofacto-avocats.com", "contact@azko.fr"],
  ["https://thelem-assurances.fr", "mcastoriadis@articleonze.com"],
  ["https://agence.axa.fr", "gilles.verger.am@axa.fr"],
  ["https://agence.axa.fr/distributeur/0004684904", "info@agence.axa.fr"],
  ["https://agences.swisslife.fr/fr/france-FR/0075005/cabinet-kleas/details", "wattrelos@agence-swisslife.fr"],
  ["https://salons.tchip.fr/50367495928169/salon-coiffure-eysines", "tchipcoiffure.eysines@gmail.com"],
  ["https://www.depiltech.com/fr/epilation-definitive/toulouse/107", "info@depiltech.com"],
];

for (const [site, mail] of BAD) {
  test(`cible refusée: ${site}`, () => {
    assert.equal(isProspectableLead({ website: site, email: mail }).ok, false);
  });
}

const GOOD: [string, string][] = [
  ["https://www.a2n-assurances.fr", "contact@a2n-assurances.fr"],
  ["https://www.lincontournable-barbershop.com", "lincontournable.barbershop@gmail.com"],
  ["https://plomberie-dupont.fr/contact", "info@plomberie-dupont.fr"],
  ["https://www.investorimmobilier.com", "mf.salwey@icloud.com"],
  ["https://boulangerie-martin.ch", "bonjour@boulangerie-martin.ch"],
];

for (const [site, mail] of GOOD) {
  test(`cible acceptée: ${site}`, () => {
    assert.equal(isProspectableLead({ website: site, email: mail }).ok, true);
  });
}

test("adresse sur le domaine du site ou boîte perso uniquement", () => {
  assert.equal(emailBelongsToSite("a@dupont.fr", "https://www.dupont.fr"), true);
  assert.equal(emailBelongsToSite("a@gmail.com", "https://www.dupont.fr"), true);
  assert.equal(emailBelongsToSite("a@agence-web.fr", "https://www.dupont.fr"), false);
  assert.equal(emailBelongsToSite("a@dupont.co.uk", "https://www.dupont.co.uk"), true);
});

test("pages de réseau (2 segments ou plus) et store-locators refusés, racine acceptée", () => {
  assert.equal(isNetworkOrLocatorUrl("https://x.fr/agences/ville"), true);
  assert.equal(isNetworkOrLocatorUrl("https://agence.x.fr"), true);
  assert.equal(isNetworkOrLocatorUrl("https://x.fr"), false);
  assert.equal(isNetworkOrLocatorUrl("https://x.fr/contact"), false);
});

test("adresses factices refusées", () => {
  for (const e of ["vous@email.ch", "jean@exemple.ch", "noreply@x.fr", "contact@wixsite.com", "abc@sentry.io"]) {
    assert.equal(isPlaceholderEmail(e), true, e);
  }
});
