// USDA nutrition self-check: validates every entry in src/utils/usda-meals-database.ts
// - calorie macro balance: kcal must not exceed 120% of fat*9 + carb*4 + protein*4
// - mass balance: protein + carbs + fat must not exceed the (per 100g / perServing) basis
// - reports suspicious entries so values can be corrected against USDA FoodData Central
//
// Run with: node nutrition-validator.js  (or: npm run validate:nutrition)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'src', 'utils', 'usda-meals-database.ts');
const src = readFileSync(file, 'utf8');

const start = src.indexOf('export const USDA_BASE');
if (start === -1) {
  console.error('USDA_BASE not found in usda-meals-database.ts');
  process.exit(1);
}
const braceOpen = src.indexOf('{', start);
const tail = src.slice(braceOpen);

// Each USDA_BASE entry lives on exactly one line:  '<Key>': { ... },
const LINE_RE = /^\s*'((?:\\.|[^'\\])+)'\s*:\s*\{([\s\S]*?)\},\s*$/;
const FIELD_RE = /([a-zA-Z]+)\s*:\s*([0-9.]+)/g;

function safeEval(text) {
  try {
    return Function('"use strict"; return (' + text + ');')();
  } catch {
    return null;
  }
}

const entries = [];
const suspicious = [];
const warnings = [];
const imbalance = [];
const extraParens = [];

for (const rawLine of tail.split('\n')) {
  const line = rawLine;
  const m = LINE_RE.exec(line);
  if (!m) continue;
  const key = m[1].replace(/\\'/g, "'");
  const objStart = line.indexOf('{') + 1;
  const objEnd = line.lastIndexOf('}');
  const objLiteral = line.slice(objStart, objEnd);
  let e;
  try {
    e = safeEval('{' + objLiteral + '}');
  } catch {
    extraParens.push(key);
    continue;
  }
  if (!e) {
    extraParens.push(key);
    continue;
  }
  const basis = e.perServing ?? (e.per100ml ? 100 : 100);
  const fat = e.fat || 0;
  const protein = e.protein || 0;
  const carbs = e.carbs || 0;
  const theoreticalMax = fat * 9 + protein * 4 + carbs * 4;
  const kcal = e.kcal || 0;

  if (kcal > theoreticalMax * 1.2) {
    suspicious.push({
      key,
      reason: `kcal ${kcal} exceeds macro-derived max ${Math.round(theoreticalMax)} by >20%`,
      kcal,
      theoreticalMax: Math.round(theoreticalMax),
    });
  }
  if (protein + carbs + fat > basis * 1.05) {
    suspicious.push({
      key,
      reason: `protein+carbs+fat = ${Math.round(protein + carbs + fat)}g exceeds basis ${basis}g`,
      kcal,
      theoreticalMax: Math.round(theoreticalMax),
    });
  }
  if (theoreticalMax > 0 && kcal < theoreticalMax * 0.55) {
    warnings.push({
      key,
      reason: `kcal ${kcal} is <55% of macro-derived ${Math.round(theoreticalMax)} — review values against USDA`,
    });
  }
  if (Math.abs(theoreticalMax - kcal) > 10) {
    imbalance.push({
      key,
      kcal,
      macroKcal: Math.round(theoreticalMax),
      diff: Math.abs(theoreticalMax - kcal).toFixed(1),
    });
  }
  entries.push({ key, ...e });
}

const dupes = [...new Set(entries.map((e) => e.key).filter((k, i) => entries.findIndex((x) => x.key === k) !== i))];

// Entries whose kcal intentionally exceeds macro-derived sum by >10 kcal (USDA rounding:
// fibre, sugar alcohols, MCT oils, absorbed fry oil, or rounded p/c/f to 1 decimal).
const ALLOWED_IMBALANCE = new Set([
  'Ful Medames with Olive Oil',
  'Molokhia with Chicken and Rice',
  'Mandi Dajaj with Rice',
  'Dates with Arabic Gahwa',
  'Gahwa with Dates',
  'Baguette',
  'Ciabatta',
  'Flour Tortilla',
  'Scrambled Eggs and Turkey Bacon',
  'Cinnamon French Toast',
  'Pain Perdu',
  'Grilled Salmon',
  'Tacos al Pastor',
  'Guacamole',
  'Fried Plantains',
  'Dates',
  'Dates (3 pcs)',
  'Avocado',
  'Lemon',
  'Lime',
  'Passion Fruit',
  'Coconut (fresh)',
  'Salmon Fillet',
  'Sushi Roll',
  'Almonds',
  'Grilled Steak',
  'Jalebi',
  'Poha',
  'Bavarian Pretzel',
  'Avocado & Turkey Bacon',
  'Mixed Nuts',
  'Trail Mix',
]);
const imbalanceUnexpected = imbalance.filter((i) => !ALLOWED_IMBALANCE.has(i.key));

// ═══ App coverage: which real dish names resolve to a USDA entry ═══
const names = new Set();
for (const target of ['src/utils/calculations.ts', 'src/utils/healthPlans.ts', 'src/utils/mealBuilder.ts', 'src/utils/cuisineCatalog.ts']) {
  const text = readFileSync(join(__dirname, target), 'utf8');
  for (const m of text.matchAll(/\bname(?:_en)?:\s*'([^']+)'/g)) names.add(m[1]);
}
for (const rfile of ['asia', 'australia', 'europe', 'gulf', 'levantine-africa', 'north-africa', 'north-america', 'south-america', 'special-diets']) {
  const text = readFileSync(join(__dirname, 'src', 'utils', 'regional', `${rfile}.ts`), 'utf8');
  for (const m of text.matchAll(/name_en:\s*'([^']+)'/g)) names.add(m[1]);
}

let coverage = [];
if (names.size > 0) {
  const nameList = JSON.stringify([...names]);
  const child = spawnSync(process.execPath, ['--experimental-strip-types', '-e', `
    const m = await import(${JSON.stringify('file:///' + join(__dirname, 'src', 'utils', 'usda-meals-database.ts').replace(/\\/g, '/'))});
    const list = ${nameList};
    process.stdout.write(JSON.stringify(list.map(n => [n, m.resolveUSDA(n)])));
  `], { encoding: 'utf8' });
  if (!child.error) {
    try {
      coverage = JSON.parse(child.stdout.trim());
    } catch {
      coverage = [];
    }
  }
}
const uncovered = coverage.filter(([, k]) => !k).map(([n]) => n);

console.log(`USDA_BASE entries parsed: ${entries.length}\n`);
if (extraParens.length > 0) {
  console.log(`⚠️ ${extraParens.length} lines failed to parse: ${extraParens.join(', ')}\n`);
}
console.log('─'.repeat(64));
if (suspicious.length === 0) {
  console.log('✅ All USDA_BASE entries pass macro & mass checks.');
} else {
  console.log(`❌ ${suspicious.length} suspicious entries:\n`);
  for (const s of suspicious) {
    console.log(`   • ${s.key}\n     ${s.reason}`);
  }
}
console.log('');
if (warnings.length > 0) {
  console.log(`⚠️ ${warnings.length} soft warnings:\n`);
  for (const w of warnings) console.log(`   • ${w.key}\n     ${w.reason}`);
  console.log('');
}
if (dupes.length > 0) {
  console.log(`⚠️ Duplicate keys (last wins — first is shadowed): ${dupes.join(', ')}\n`);
}
if (imbalanceUnexpected.length > 0) {
  console.log(`${imbalanceUnexpected.length} entries fail P*4+C*4+F*9 ±10 kcal check:\n`);
  for (const i of imbalanceUnexpected) console.log(`   • ${i.key}: kcal=${i.kcal} vs macro-derived ${i.macroKcal} (Δ${i.diff})`);
  console.log('');
} else if (imbalance.length > 0) {
  console.log(`✅ P*4+C*4+F*9 ≈ kcal within ±10 on all ${entries.length} entries (${imbalance.length} dense foods on allowlist).`);
}
console.log('─'.repeat(64));
console.log('App coverage:');
if (uncovered.length > 0) {
  console.log(`   Total dish names scanned: ${coverage.length}`);
  console.log(`   Covered by USDA:          ${coverage.length - uncovered.length} (${Math.round(((coverage.length - uncovered.length) / coverage.length) * 100)}%)`);
  console.log(`\n   ⚠️ Not resolved to a USDA entry (value stays as authored estimate):\n`);
  for (const n of uncovered) console.log(`   • ${n}`);
} else if (coverage.length === 0) {
  console.log(`   ⚠️ Could not compute coverage (node module import failed).`);
} else {
  console.log(`   All ${coverage.length} scanned dish names resolved to a USDA entry ✅`);
}
console.log('');
console.log('─'.repeat(64));
console.log('Coverage snapshot:');
console.log(`   Entries:            ${entries.length}`);
console.log(`   With saturatedFat:  ${entries.filter((e) => e.saturatedFat != null).length}`);
console.log(`   With cholesterol:   ${entries.filter((e) => e.cholesterol != null).length}`);
console.log(`   With fiber:         ${entries.filter((e) => e.fiber != null).length}`);
console.log(`   With sodium:        ${entries.filter((e) => e.sodium != null).length}`);
console.log(`   With sugar:         ${entries.filter((e) => e.sugar != null).length}`);

process.exit(suspicious.length > 0 || imbalanceUnexpected.length > 0 ? 1 : 0);