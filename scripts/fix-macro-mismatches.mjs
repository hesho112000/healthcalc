import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const OUTLIER_PATH = path.join(ROOT, 'scripts', 'macro-outliers-report.json');

const LEGACY_KITCHEN_FILES = new Set([
  'french-full.ts',
  'greek-full.ts',
  'italian-full.ts',
  'spanish-full.ts',
  'swiss-full.ts',
  'american-full.ts',
  'british-full.ts',
  'mexican-full.ts',
  'colombian-full.ts',
  'chilean-full.ts',
  'peruvian-full.ts',
]);

// Egyptian dishes whose calorie value is overridden from the `HALAL_REPLACEMENTS`
// map in egyptian-full.ts (validate-data.mjs reads `override.cal_100` while keeping
// the JSON `p`/`c`/`f` macros). Mirrors that lookup so the fixer classifies records
// exactly as the validator does.
const EGYPTIAN_OVERRIDE_NAMES = [
  'Pork Meat',
  'Non-Alcoholic Beer',
  'Beef Frankfurter',
  'Beef Sausage',
  'Grilled Beef Sausage',
  'Chicken Frankfurter',
  'Turkey Frankfurter',
  'Meat & Sausage Pizza',
];

function buildEgyptianOverrideCal() {
  const map = new Map();
  const overrideFile = path.join(DATA_DIR, 'egyptian-full.ts');
  if (!fs.existsSync(overrideFile)) return map;
  const text = fs.readFileSync(overrideFile, 'utf8');
  for (const name of EGYPTIAN_OVERRIDE_NAMES) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const block = new RegExp(`['"]${escaped}['"]\\s*:\\s*\\{([^}]*)\\}`).exec(text);
    const cal = block ? /cal_100\s*:\s*(-?\d+(?:\.\d+)?)/.exec(block[1]) : null;
    if (cal) map.set(name, Number(cal[1]));
  }
  return map;
}

const EGYPTIAN_OVERRIDE_CAL = buildEgyptianOverrideCal();

const MISMATCH_THRESHOLD = 10; // validator flags |cal - atwater| / atwater > 10%
const FIX_MAX = 25; // 10%..25% auto-correct; > 25% flagged for manual review

const DRY_RUN = process.argv.includes('--dry-run');

const num = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const atwaterOf = (p, c, f) => (p * 4) + (c * 4) + (f * 9);
const deviation = (cal, atwater) => (Math.abs(cal - atwater) / atwater) * 100;

function correctedValue(atwater) {
  let value = Math.round(atwater);
  // Very small dishes can still exceed 10% after integer rounding; fall back to
  // one decimal place so the Atwater deviation collapses to ~0.
  if (Math.abs(value - atwater) / atwater > MISMATCH_THRESHOLD / 100) {
    value = Math.round(atwater * 10) / 10;
  }
  return value;
}

function listFullTsFiles() {
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name));
      } else if (/-full\.ts$/i.test(entry.name) && !LEGACY_KITCHEN_FILES.has(entry.name)) {
        files.push(path.join(dir, entry.name));
      }
    }
  };
  walk(DATA_DIR);
  return files.sort();
}

function extractField(raw, keys) {
  for (const key of keys) {
    const pattern = new RegExp(`"${key}"\\s*:\\s*("(?:\\\\.|[^"\\\\])*"|-?\\d+(?:\\.\\d+)?)`);
    const match = pattern.exec(raw);
    if (match) {
      let value = match[1];
      if (value.startsWith('"')) value = value.slice(1, -1);
      return { key, value };
    }
  }
  return null;
}

function setField(raw, key, value) {
  const pattern = new RegExp(`("${key}"\\s*:\\s*)-?\\d+(?:\\.\\d+)?`);
  return raw.replace(pattern, `$1${value}`);
}

function validId(id) {
  return typeof id === 'string'
    && id.trim() !== ''
    && !/[;{}]/.test(id)
    && !/^(?:string|number|boolean|unknown|any)$/i.test(id);
}

function applyEdits(text, edits) {
  const sorted = [...edits].sort((a, b) => b.start - a.start);
  let out = text;
  for (const edit of sorted) {
    out = out.slice(0, edit.start) + edit.newText + out.slice(edit.end);
  }
  return out;
}

// Collect the character spans of every object that is a direct element of a
// `"dishes": [ ... ]` array, in document order. Handles strings/escapes so braces
// inside values cannot break the scan.
function getDishSpans(text) {
  const spans = [];
  const stack = [];
  let pendingKey = null;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const ch = text[i];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      const start = i;
      i++;
      while (i < n) {
        if (text[i] === '\\') { i += 2; continue; }
        if (text[i] === quote) { i++; break; }
        i++;
      }
      let j = i;
      while (j < n && /\s/.test(text[j])) j++;
      if (text[j] === ':') pendingKey = text.slice(start + 1, i - 1);
      continue;
    }
    if (ch === '[') {
      stack.push({ kind: 'arr', dish: pendingKey === 'dishes', start: -1 });
      pendingKey = null;
      i++;
      continue;
    }
    if (ch === '{') {
      const top = stack[stack.length - 1];
      const dish = Boolean(top && top.kind === 'arr' && top.dish);
      stack.push({ kind: 'obj', dish, start: dish ? i : -1 });
      pendingKey = null;
      i++;
      continue;
    }
    if (ch === ']' || ch === '}') {
      const top = stack.pop();
      if (top && top.kind === 'obj' && top.dish && top.start >= 0) {
        spans.push([top.start, ch === '}' ? i : i]);
      }
      i++;
      continue;
    }
    i++;
  }
  return spans;
}

const fixes = [];
const outliers = [];
const overridesSkipped = [];
let filesScanned = 0;
let filesChanged = 0;

function processLiteral(file, text) {
  const objects = [...text.matchAll(/\{[^{}]*\}/gs)];
  const records = [];
  for (const match of objects) {
    const raw = match[0];
    const id = extractField(raw, ['id']);
    if (!id || !validId(id.value)) continue;
    records.push({ raw, index: match.index, id: id.value });
  }
  if (!records.length) return { hasRecords: false, edited: false };

  const edits = [];
  for (const record of records) {
    const cal = extractField(record.raw, ['calories', 'kcal', 'cal_100']);
    const p = extractField(record.raw, ['protein', 'p']);
    const c = extractField(record.raw, ['carbs', 'c']);
    const f = extractField(record.raw, ['fat', 'f']);
    if (!cal || !p || !c || !f) continue;
    const calV = num(cal.value);
    const pV = num(p.value);
    const cV = num(c.value);
    const fV = num(f.value);
    if (calV === null || pV === null || cV === null || fV === null) continue;
    if (!(calV > 0 && pV > 0 && cV > 0 && fV > 0)) continue; // matches validator eligibility
    const atwater = atwaterOf(pV, cV, fV);
    if (!(atwater > 0)) continue;
    const dev = deviation(calV, atwater);
    if (dev <= MISMATCH_THRESHOLD) continue;
    const rel = path.relative(ROOT, file);
    if (dev <= FIX_MAX) {
      const value = correctedValue(atwater);
      const newRaw = setField(record.raw, cal.key, value);
      edits.push({ start: record.index, end: record.index + record.raw.length, newText: newRaw });
      fixes.push({ file: rel, id: record.id, field: cal.key, from: calV, to: value, deviationPercent: Number(dev.toFixed(1)) });
    } else {
      outliers.push({ file: rel, id: record.id, calories: calV, calculated: Math.round(atwater), deviationPercent: Number(dev.toFixed(1)) });
    }
  }
  if (edits.length && !DRY_RUN) fs.writeFileSync(file, applyEdits(text, edits));
  return { hasRecords: true, edited: edits.length > 0 };
}

function processJsonBacked(file) {
  const jsonFile = file.replace(/-full\.ts$/i, '-full-100-USDA.json');
  if (!fs.existsSync(jsonFile)) return false;
  const jsonText = fs.readFileSync(jsonFile, 'utf8');
  const source = JSON.parse(jsonText);
  const categories = source.categories ?? [];
  const dishes = categories.flatMap((category) => category.dishes ?? []);
  if (!dishes.length) return false;

  let hundredMatches = 0;
  let serveMatches = 0;
  for (const dish of dishes) {
    const p = num(dish.protein ?? dish.p);
    const c = num(dish.carbs ?? dish.c);
    const f = num(dish.fat ?? dish.f);
    if (p === null || c === null || f === null) continue;
    const atwater = atwaterOf(p, c, f);
    if (!(atwater > 0)) continue;
    const near = (value) => value != null && Math.abs(Number(value) - atwater) / atwater <= 0.2;
    if (near(dish.cal_100)) hundredMatches++;
    if (near(dish.cal_serv)) serveMatches++;
  }
  const macrosPerServing = serveMatches > hundredMatches;

  const spans = getDishSpans(jsonText);
  if (spans.length !== dishes.length) {
    console.warn(`  ! ${path.relative(ROOT, jsonFile)}: dish spans (${spans.length}) != dishes (${dishes.length}); skipping`);
    return false;
  }

  const isEgyptian = /egyptian-full-100-USDA\.json$/i.test(jsonFile);
  const edits = [];
  for (let index = 0; index < dishes.length; index++) {
    const dish = dishes[index];
    const rel = path.relative(ROOT, jsonFile);
    const id = dish.id ?? '';
    const name = dish.nameEn ?? dish.name_en ?? dish.name ?? '';
    const p = num(dish.protein ?? dish.p);
    const c = num(dish.carbs ?? dish.c);
    const f = num(dish.fat ?? dish.f);
    if (p === null || c === null || f === null) continue;
    if (!(p > 0 && c > 0 && f > 0)) continue;
    const atwater = atwaterOf(p, c, f);
    if (!(atwater > 0)) continue;
    const overrideCal = isEgyptian && EGYPTIAN_OVERRIDE_CAL.has(name) ? EGYPTIAN_OVERRIDE_CAL.get(name) : null;
    const baseCal = dish.kcal ?? (macrosPerServing
      ? (dish.cal_serv ?? dish.cal_100)
      : (dish.cal_100 ?? dish.cal_serv));
    const calories = num(overrideCal != null ? overrideCal : baseCal);
    if (calories === null || !(calories > 0)) continue;
    const dev = deviation(calories, atwater);
    if (dev <= MISMATCH_THRESHOLD) continue;
    if (overrideCal != null) {
      // Calorie comes from egyptian-full.ts while macros come from the JSON; this
      // cross-source record is not safe to auto-correct, so flag it for review.
      overridesSkipped.push({ file: rel, id: id || name, name, calories, calculated: Math.round(atwater), deviationPercent: Number(dev.toFixed(1)), reason: 'egyptian override (calorie from egyptian-full.ts)' });
      outliers.push({ file: rel, id: id || name, name, calories, calculated: Math.round(atwater), deviationPercent: Number(dev.toFixed(1)) });
      continue;
    }
    if (dev > FIX_MAX) {
      outliers.push({ file: rel, id, name, calories: Number(calories), calculated: Math.round(atwater), deviationPercent: Number(dev.toFixed(1)) });
      continue;
    }
    const key = dish.kcal != null
      ? 'kcal'
      : (macrosPerServing
        ? (dish.cal_serv != null ? 'cal_serv' : 'cal_100')
        : (dish.cal_100 != null ? 'cal_100' : 'cal_serv'));
    const value = correctedValue(atwater);
    const [start, end] = spans[index];
    const spanText = jsonText.slice(start, end);
    const pattern = new RegExp(`("${key}"\\s*:\\s*)-?\\d+(?:\\.\\d+)?`);
    if (!pattern.test(spanText)) continue;
    edits.push({ start, end, newText: spanText.replace(pattern, `$1${value}`) });
    fixes.push({ file: rel, id: id || name, field: key, from: Number(dish[key]), to: value, deviationPercent: Number(dev.toFixed(1)) });
  }
  if (!edits.length) return false;
  if (!DRY_RUN) fs.writeFileSync(jsonFile, applyEdits(jsonText, edits));
  return true;
}

for (const file of listFullTsFiles()) {
  filesScanned++;
  const text = fs.readFileSync(file, 'utf8');
  const literal = processLiteral(file, text);
  // Mirror the validator: when the .ts exposes a literal dish array, the sibling
  // -100-USDA.json is ignored, so never fall through to it.
  const changed = literal.hasRecords ? literal.edited : processJsonBacked(file);
  if (changed) filesChanged++;
}

const outliersSorted = outliers.sort((a, b) => b.deviationPercent - a.deviationPercent);
fs.writeFileSync(OUTLIER_PATH, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  rules: { mismatchThresholdPercent: MISMATCH_THRESHOLD, autoFixBand: `${MISMATCH_THRESHOLD}-${FIX_MAX}%`, manualReviewBand: `>${FIX_MAX}%` },
  totalOutliers: outliersSorted.length,
  outliers: outliersSorted,
}, null, 2)}\n`);

const byFile = new Map();
for (const fix of fixes) byFile.set(fix.file, (byFile.get(fix.file) ?? 0) + 1);

console.log(`\n[fix-macro-mismatches] ${DRY_RUN ? 'DRY RUN (no files written)' : 'APPLIED'}`);
console.log(`Files scanned: ${filesScanned} | files changed: ${filesChanged}`);
console.log(`Auto-corrected (${MISMATCH_THRESHOLD}-${FIX_MAX}% band): ${fixes.length}`);
for (const [file, count] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}  ${file}`);
}
console.log(`Flagged for manual review (>${FIX_MAX}%): ${outliersSorted.length}`);
console.log(`  of which egyptian overrides (manual review): ${overridesSkipped.length}`);
console.log(`Reconcile (fixed + flagged = original mismatches): ${fixes.length + outliersSorted.length}`);
console.log(`Outlier report: ${path.relative(ROOT, OUTLIER_PATH)}`);
if (outliersSorted.length) {
  console.log('\nTop outliers:');
  for (const item of outliersSorted.slice(0, 15)) {
    console.log(`  ${String(item.deviationPercent).padStart(6)}%  ${item.file}  ${item.id || item.name || '(no id)'}`);
  }
}
