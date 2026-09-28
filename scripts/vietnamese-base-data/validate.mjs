#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const parts = [
  './part1.mjs',
  './part2.mjs',
  './part3.mjs',
  './part4.mjs',
  './part5.mjs',
  './part6.mjs',
];

let all = [];

for (const p of parts) {
  const mod = await import(new URL(p, import.meta.url));
  all = all.concat(mod.default);
}

console.log('Total rows:', all.length);

let bad = 0;
for (const x of all) {
  const t = (x.nameAr.match(/فيتنامي/g) || []).length;
  if (t !== 1) {
    bad++;
    console.log('TOKEN x' + t + ': ' + x.nameAr);
  }
  for (const k of ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    if (!x[k] || !String(x[k]).trim()) {
      bad++;
      console.log('EMPTY ' + k + ': ' + x.nameAr);
    }
  }
  if (/[A-Za-z]/.test(x.nameAr) && !(x.nameEn && !/[A-Za-z]/.test(x.nameAr))) {
    bad++;
    console.log('LATIN IN ARABIC: ' + x.nameAr);
  }
  if (x.kcal !== Math.round(4 * x.protein + 4 * x.carbs + 9 * x.fat)) {
    bad++;
    console.log('ATWATER: ' + x.nameEn);
  }
  if (x.grams !== 100) {
    bad++;
    console.log('GRAMS: ' + x.nameEn);
  }
  if (x.category === 'unknown' || !x.category) {
    bad++;
    console.log('MISSING CATEGORY: ' + x.nameEn);
  }
  if (!x.mealType) {
    bad++;
    console.log('MISSING MEAL TYPE: ' + x.nameEn);
  }
}

console.log('PROBLEMS: ' + bad);
console.log('kcal range:', Math.min(...all.map(x => x.kcal)), '-', Math.max(...all.map(x => x.kcal)));
console.log('All base rows validated.');
