#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const parts = [
  './scripts/vietnamese-base-data/part1.mjs',
  './scripts/vietnamese-base-data/part2.mjs',
  './scripts/vietnamese-base-data/part3.mjs',
  './scripts/vietnamese-base-data/part4.mjs',
  './scripts/vietnamese-base-data/part5.mjs',
  './scripts/vietnamese-base-data/part6.mjs',
];

let all = [];

for (const part of parts) {
  const mod = require(part);
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
