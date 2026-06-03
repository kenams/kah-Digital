/**
 * Génère les assets Kotizy pour Expo :
 * - icon.png       1024x1024 (App Store / Play Store)
 * - adaptive-icon.png  1024x1024 (Android adaptive foreground, bg transparent)
 * - splash-icon.png    512x512  (Splash screen center)
 * - favicon.png         64x64  (Web)
 */

const sharp = require('sharp');
const path = require('path');
const OUT = 'C:/Users/kenam/Application-Projet-K/tontine/mobile/assets/';

// Couleurs Kotizy
const PRIMARY = '#22c55e';   // emerald-500
const DARK    = '#080b07';   // ink
const GOLD    = '#d4a843';

function svgIcon(size, transparent = false) {
  const r = size / 2;
  const iconR = r * 0.72;
  const letterSize = r * 0.88;
  const bg = transparent ? 'transparent' : DARK;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="30%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#0d1509"/>
      <stop offset="100%" stop-color="${DARK}"/>
    </radialGradient>
    <radialGradient id="circleGrad" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="${r * 0.04}" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${transparent ? 'transparent' : 'url(#bgGrad)'}"/>

  <!-- Outer glow ring -->
  <circle cx="${r}" cy="${r}" r="${iconR * 1.08}" fill="none" stroke="${PRIMARY}" stroke-width="${r * 0.018}" opacity="0.25"/>

  <!-- Main circle -->
  <circle cx="${r}" cy="${r}" r="${iconR}" fill="url(#circleGrad)" filter="url(#glow)"/>

  <!-- Inner shadow -->
  <circle cx="${r}" cy="${r}" r="${iconR}" fill="none" stroke="#000" stroke-width="${r * 0.04}" opacity="0.2"/>

  <!-- Letter K -->
  <text
    x="${r * 0.92}"
    y="${r + letterSize * 0.35}"
    font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
    font-weight="900"
    font-size="${letterSize}"
    fill="${DARK}"
    text-anchor="middle"
    letter-spacing="-2"
  >K</text>

  <!-- Dot accent (gold) -->
  <circle cx="${r + iconR * 0.52}" cy="${r - iconR * 0.42}" r="${r * 0.07}" fill="${GOLD}" opacity="0.9"/>
</svg>`;
}

function svgSplash(size) {
  const r = size / 2;
  const iconR = r * 0.80;
  const letterSize = r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="circleGrad2" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </radialGradient>
  </defs>
  <circle cx="${r}" cy="${r}" r="${iconR}" fill="url(#circleGrad2)"/>
  <circle cx="${r}" cy="${r}" r="${iconR}" fill="none" stroke="#fff" stroke-width="${r*0.02}" opacity="0.15"/>
  <text x="${r*0.92}" y="${r+letterSize*0.36}" font-family="'Arial Black','Helvetica Neue',Arial,sans-serif"
    font-weight="900" font-size="${letterSize}" fill="${DARK}" text-anchor="middle">K</text>
  <circle cx="${r+iconR*0.52}" cy="${r-iconR*0.42}" r="${r*0.09}" fill="${GOLD}" opacity="0.9"/>
</svg>`;
}

async function gen(svgStr, outFile, size) {
  await sharp(Buffer.from(svgStr))
    .resize(size, size)
    .png()
    .toFile(OUT + outFile);
  console.log(`✅ ${outFile} (${size}x${size})`);
}

(async () => {
  // icon.png — fond sombre, coins arrondis Expo (1024x1024)
  await gen(svgIcon(1024, false), 'icon.png', 1024);

  // adaptive-icon.png — fond transparent, foreground only (1024x1024)
  await gen(svgIcon(1024, true), 'adaptive-icon.png', 1024);

  // splash-icon.png — just the circle+K, no bg (512x512)
  await gen(svgSplash(512), 'splash-icon.png', 512);

  // favicon.png (64x64)
  await gen(svgSplash(64), 'favicon.png', 64);

  console.log('\n🎨 Assets Kotizy générés dans tontine/mobile/assets/');
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
