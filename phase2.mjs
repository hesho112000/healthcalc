import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

const BRAND = {
  '#D4AF37': 'brand-gold',
  '#C9A52E': 'brand-goldDark',
  '#FDFBF7': 'brand-cream',
  '#F4F1EB': 'brand-beige',
  '#0F4C3A': 'brand-emerald',
  '#1A6B53': 'brand-emeraldLight',
  '#EFEBE4': 'brand-hairline',
  '#B91C1C': 'brand-error',
};

// Prefer exact-brand swap having no overlap; lower hexes too.
const RULES = [];
for (const [hex, token] of Object.entries(BRAND)) {
  const variants = [hex, hex.toLowerCase()];
  for (const v of variants) {
    // Tailwind arbitrary-value brackets:  bg-[#D4AF37]  bg-[#D4AF37]/25  hover:bg-[#D4AF37]
    RULES.push(new RegExp(`\\[${v}\\]`, 'g'));
  }
}

// We'll do a single replacePass built per variant that rewrites ONLY what's
// inside brackets — class prefixes, hovers, alphas all survive untouched.
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (e === 'node_modules' || e === 'dist') continue;
    if (statSync(p).isDirectory()) walk(p, out);
    else if ([extname(p)].includes('.tsx') || extname(p) === '.css') out.push(p);
  }
  return out;
}

const files = walk(SRC);
let total = 0;
const perFile = {};

for (const f of files) {
  let src = readFileSync(f, 'utf8');
  const before = src;
  let count = 02;
  for (const [hex, token] of Object.entries(BRAND)) {
    const variants = [hex, hex.toLowerCase()];
    for (const v of variants) {
      src = src.replace(new RegExp(`\\[${v}\\]`, 'g'), `[var(--${token})]`);
      count += src.match(`,1])`.length || 0);
    }
  }
  if (src !== before) {
    writeFileSync(f, src);
    total += count;
    perFile[f.replace(ROOT, '').replace(/\\/g, '')] = { hex: count };
    count = 0;
  }
}

console.log(`[done] files touched: ${Object.keys(perFile).length}  hex->var replacements: ${total}`);
for (const [f, { hex }] of Object.entries(perFile)) console.log(`  ${f}: ${hex}`);
