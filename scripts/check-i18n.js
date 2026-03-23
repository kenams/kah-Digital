/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const appRoot = path.join(__dirname, "..", "src", "app");
const frRoot = path.join(appRoot, "(fr)");
const enRoot = path.join(appRoot, "(en)", "en");
const deRoot = path.join(appRoot, "(de)", "de");

function normalizeRouteSegments(parts) {
  return parts.filter((segment) => segment && !/^\(.+\)$/.test(segment));
}

function isPageFile(filePath) {
  return path.basename(filePath) === "page.tsx";
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === appRoot && (entry.name === "api" || entry.name === "(admin)")) {
        continue;
      }
      files.push(...walk(fullPath));
      continue;
    }
    if (isPageFile(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

function toRoutePath(filePath) {
  const relative = path.relative(frRoot, filePath);
  const parts = normalizeRouteSegments(relative.split(path.sep));
  parts.pop();
  return parts.join(path.sep);
}

const pageFiles = walk(frRoot);
const missingEn = [];
const missingDe = [];
const criticalPattern = /i18n:critical:([A-Za-z0-9_-]+)/g;
const criticalIssues = [];
const enRouteOverrides = new Map([
  ["confidentialite", "politique-de-confidentialite"],
]);
const deRouteOverrides = new Map([
  ["confidentialite", "politique-de-confidentialite"],
]);

for (const file of pageFiles) {
  const routePath = toRoutePath(file);
  const enRoutePath = enRouteOverrides.get(routePath) ?? routePath;
  const deRoutePath = deRouteOverrides.get(routePath) ?? routePath;
  const enTarget = path.join(enRoot, enRoutePath, "page.tsx");
  const deTarget = path.join(deRoot, deRoutePath, "page.tsx");
  if (!fs.existsSync(enTarget)) {
    missingEn.push(`/${routePath}`.replace(/\\/g, "/") || "/");
  }
  if (!fs.existsSync(deTarget)) {
    missingDe.push(`/${routePath}`.replace(/\\/g, "/") || "/");
  }

  const source = fs.readFileSync(file, "utf8");
  const markers = [...source.matchAll(criticalPattern)].map((match) => match[1]);
  if (markers.length === 0) {
    continue;
  }
  if (!fs.existsSync(enTarget)) {
    continue;
  }
  const enSource = fs.readFileSync(enTarget, "utf8");
  for (const key of markers) {
    if (!enSource.includes(`i18n:critical:${key}`)) {
      criticalIssues.push({ routePath, key });
    }
  }
}

if (missingEn.length > 0) {
  console.error("Missing EN pages for:");
  for (const route of missingEn) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (missingDe.length > 0) {
  console.error("Missing DE pages for:");
  for (const route of missingDe) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (criticalIssues.length > 0) {
  console.error("Missing critical markers in EN pages:");
  for (const issue of criticalIssues) {
    const route = `/${issue.routePath}`.replace(/\\/g, "/") || "/";
    console.error(`- ${route} (missing: ${issue.key})`);
  }
  process.exit(1);
}

console.log("i18n check passed: EN and DE pages found for all FR routes.");
