/*!
 * KAH Pulse — affiche sur le site d'un client les mises à jour envoyées par message.
 * Installation : <script src="https://kah-digital.ch/pulse.js" data-site="IDENTIFIANT" defer></script>
 * Options : data-banner="off" (pas de bandeau automatique).
 * Emplacements facultatifs : [data-pulse="hours|special|promo|closure|announcement|phone|email|address"].
 * Tout est inséré via textContent (jamais de HTML) : aucune injection possible.
 */
(function () {
  "use strict";
  var script = document.currentScript;
  if (!script) return;
  var site = script.getAttribute("data-site");
  if (!site) return;
  var origin;
  try { origin = new URL(script.src).origin; } catch (e) { return; }

  var DAYS = [["mon", "Lundi"], ["tue", "Mardi"], ["wed", "Mercredi"], ["thu", "Jeudi"], ["fri", "Vendredi"], ["sat", "Samedi"], ["sun", "Dimanche"]];

  function frDate(iso) {
    var p = String(iso).split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso;
  }

  function el(tag, style, text) {
    var n = document.createElement(tag);
    if (style) n.setAttribute("style", style);
    if (text != null) n.textContent = text;
    return n;
  }

  function banner(c) {
    var rows = [];
    if (c.closure) {
      rows.push(["#92400e", "#fef3c7", (c.closure.text || "Fermeture exceptionnelle") + " — du " + frDate(c.closure.from) + " au " + frDate(c.closure.to)]);
    }
    if (c.announcement) rows.push(["#111827", "#f9fafb", c.announcement.text]);
    if (c.promo) rows.push(["#7c2d12", "#ffedd5", c.promo.title + (c.promo.text ? " — " + c.promo.text : "") + (c.promo.until ? " (jusqu'au " + frDate(c.promo.until) + ")" : "")]);

    var old = document.getElementById("kah-pulse-bar");
    if (old) old.remove();
    if (!rows.length || script.getAttribute("data-banner") === "off") return;

    var bar = el("div", "position:relative;z-index:2147483000;font:500 14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;");
    bar.id = "kah-pulse-bar";
    rows.forEach(function (r) {
      bar.appendChild(el("div", "background:" + r[0] + ";color:" + r[1] + ";padding:8px 16px;text-align:center;", r[2]));
    });
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function fill(name, build) {
    var nodes = document.querySelectorAll('[data-pulse="' + name + '"]');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      while (n.firstChild) n.removeChild(n.firstChild);
      build(n);
    }
  }

  function slots(c) {
    fill("hours", function (n) {
      if (!c.hours) return;
      DAYS.forEach(function (d) {
        if (!c.hours[d[0]]) return;
        var row = el("div", "display:flex;justify-content:space-between;gap:16px;");
        row.appendChild(el("span", "", d[1]));
        row.appendChild(el("span", "", c.hours[d[0]]));
        n.appendChild(row);
      });
    });
    fill("special", function (n) {
      if (!c.special) return;
      n.appendChild(el("strong", "display:block;", c.special.title));
      c.special.items.forEach(function (it) { n.appendChild(el("div", "", it)); });
    });
    fill("promo", function (n) {
      if (!c.promo) return;
      n.appendChild(el("strong", "display:block;", c.promo.title));
      if (c.promo.text) n.appendChild(el("div", "", c.promo.text));
    });
    fill("closure", function (n) {
      if (!c.closure) return;
      n.textContent = (c.closure.text || "Fermeture exceptionnelle") + " — du " + frDate(c.closure.from) + " au " + frDate(c.closure.to);
    });
    fill("announcement", function (n) { if (c.announcement) n.textContent = c.announcement.text; });
    ["phone", "email", "address"].forEach(function (k) {
      fill(k, function (n) {
        var v = c.contact && c.contact[k];
        if (!v) return;
        n.textContent = v;
        if (n.tagName === "A") {
          if (k === "phone") n.setAttribute("href", "tel:" + v.replace(/[^\d+]/g, ""));
          if (k === "email") n.setAttribute("href", "mailto:" + v);
        }
      });
    });
  }

  function render(data) {
    var c = (data && data.content) || {};
    banner(c);
    slots(c);
    document.dispatchEvent(new CustomEvent("kah-pulse", { detail: data }));
  }

  function load(fresh) {
    fetch(origin + "/api/pulse/site/" + encodeURIComponent(site) + (fresh === true ? "?_=" + Date.now() : ""), { mode: "cors" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) render(d); })
      .catch(function () {});
  }

  window.KahPulse = { refresh: function () { load(true); } };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { load(); });
  else load();
})();
