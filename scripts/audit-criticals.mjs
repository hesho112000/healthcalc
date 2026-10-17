// READ-ONLY audit: categorize dish records that are missing names and/or macros.
//
// Phase A scans every local `src/data/*-full.ts` kitchen file first (no writes).
// Phase B additionally queries the live Supabase `dishes` table when credentials
// are available, because the local static files do not hold the full dataset
// (local ~11,970 dish rows vs. ~18,980 live rows).
//
// Buckets (mutually exclusive by record):
//   missingNames  -> missing nameEn OR nameAr
//   missingMacros -> missing calories, protein, carbs or fat
//   missingBoth   -> missing both names and macros
//
// Nothing here writes to Supabase or to any file under src/data/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const REPORT_PATH = path.join(ROOT, 'scripts', 'audit-report.json');

// Superseded 100-row legacy datasets live alongside the canonical files; they are
// kept out of the summary but reported separately so counts are not double-counted.
const LEGACY_KITCHEN_FILES = new Set([
  'french-full.ts', 'greek-full.ts', 'italian-full.ts', 'spanish-full.ts', 'swiss-full.ts',
  'american-full.ts', 'british-full.ts', 'mexican-full.ts', 'colombian-full.ts',
  'chilean-full.ts', 'peruvian-full.ts',
]);

const NAME_FIELDS = { En: 'nameEn', Ar: 'nameAr' };
const MACRO_FIELDS = {
  calories: ['calories', 'kcal', 'cal_100'],
  protein: ['protein', 'p'],
  carbs: ['carbs', 'c'],
  fat: ['fat', 'f'],
};

const isBlank = (value) =>
  value === null || value === undefined || String(value).trim() === '' || /^PENDING(?:_|$)/i.test(String(value));

const pick = (record, keys) => {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && String(record[key]).trim() !== '') return record[key];
  }
  return undefined;
};

const isMissingMacro = (value) => {
  if (isBlank(value)) return true;
  return !Number.isFinite(Number(value));
};

function classify(record) {
  const en = pick(record, ['nameEn', 'name_en']);
  const ar = pick(record, ['nameAr', 'name_ar']);
  const names = { en: isBlank(en), ar: isBlank(ar) };
  const missingNames = names.en || names.ar;

  const macros = {};
  let missingMacros = false;
  for (const [label, keys] of Object.entries(MACRO_FIELDS)) {
    const missing = isMissingMacro(pick(record, keys));
    macros[label] = missing;
    if (missing) missingMacros = true;
  }

  if (missingNames && missingMacros) return { bucket: 'missingBoth', missingNames, missingMacros, macros };
  if (missingNames) return { bucket: 'missingNames', missingNames, missingMacros, macros };
  if (missingMacros) return { bucket: 'missingMacros', missingNames, missingMacros, macros };
  return null;
}

// ---------------------------------------------------------------------------
// Minimal object-literal parser (mirrors scripts/validate-data.mjs) so records
// in the generated `*-full.ts` files can be read without importing them.
// ---------------------------------------------------------------------------

function skipStringOrComment(text, index) {
  const char = text[index];
  if (char === '"' || char === "'" || char === '`') {
    let cursor = index + 1;
    while (cursor < text.length) {
      if (text[cursor] === '\\') cursor += 2;
      else if (text[cursor++] === char) break;
    }
    return cursor;
  }
  if (char === '/' && text[index + 1] === '/') {
    const end = text.indexOf('\n', index + 2);
    return end < 0 ? text.length : end + 1;
  }
  if (char === '/' && text[index + 1] === '*') {
    const end = text.indexOf('*/', index + 2);
    return end < 0 ? text.length : end + 2;
  }
  return index;
}

function findBalancedEnd(text, start, open, close) {
  let depth = 0;
  for (let index = start; index < text.length;) {
    const skipped = skipStringOrComment(text, index);
    if (skipped !== index) { index = skipped; continue; }
    if (text[index] === open) depth++;
    else if (text[index] === close && --depth === 0) return index + 1;
    index++;
  }
  return -1;
}

function readQuoted(text, start) {
  const quote = text[start];
  let value = '';
  for (let index = start + 1; index < text.length;) {
    const char = text[index++];
    if (char === quote) return { value, end: index };
    if (char !== '\\') { value += char; continue; }
    const escaped = text[index++];
    const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
    value += escapes[escaped] ?? escaped;
  }
  return { value, end: text.length };
}

function readValue(text, start) {
  let index = start;
  while (/\s/.test(text[index] ?? '')) index++;
  const first = text[index];
  if (first === '"' || first === "'" || first === '`') return readQuoted(text, index);
  if (first === '{' || first === '[') {
    const end = findBalancedEnd(text, index, first, first === '{' ? '}' : ']');
    return { value: end < 0 ? text.slice(index).trim() : { raw: text.slice(index, end) }, end: end < 0 ? text.length : end };
  }
  let nested = 0;
  for (; index < text.length;) {
    const skipped = skipStringOrComment(text, index);
    if (skipped !== index) { index = skipped; continue; }
    const char = text[index];
    if (char === '(' || char === '[' || char === '{') nested++;
    else if (char === ')' || char === ']' || char === '}') { if (nested === 0) break; nested--; }
    else if (char === ',' && nested === 0) break;
    index++;
  }
  const raw = text.slice(start, index).trim();
  if (raw === 'null') return { value: null, end: index };
  if (raw === 'true') return { value: true, end: index };
  if (raw === 'false') return { value: false, end: index };
  if (/^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) return { value: Number(raw), end: index };
  return { value: raw, end: index };
}

function parseObject(objectText) {
  try { return JSON.parse(objectText); } catch { /* fall through to lenient parse */ }
  const result = {};
  let index = 1;
  while (index < objectText.length - 1) {
    while (/[\s,]/.test(objectText[index] ?? '')) index++;
    const skipped = skipStringOrComment(objectText, index);
    if (skipped !== index) { index = skipped; continue; }
    let key;
    if (objectText[index] === '"' || objectText[index] === "'") {
      const parsed = readQuoted(objectText, index);
      key = parsed.value; index = parsed.end;
    } else {
      const match = objectText.slice(index).match(/^[$A-Z_a-z][$\w]*/);
      if (!match) { index++; continue; }
      key = match[0]; index += key.length;
    }
    while (/\s/.test(objectText[index] ?? '')) index++;
    if (objectText[index] !== ':') continue;
    const parsed = readValue(objectText, index + 1);
    result[key] = parsed.value; index = parsed.end;
    if (objectText[index] === ',') index++;
  }
  return result;
}

function scalarField(objectText, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:["']${escaped}["']|\\b${escaped}\\b)\\s*:\\s*(?:"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)'|(-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?|null|true|false|[$A-Z_a-z][$\\w]*))`, 'i');
  const match = pattern.exec(objectText);
  if (!match) return undefined;
  if (match[1] !== undefined || match[2] !== undefined) return (match[1] ?? match[2]).replace(/\\([\\'"`])/g, '$1');
  if (match[3] === 'null') return null;
  if (match[3] === 'true') return true;
  if (match[3] === 'false') return false;
  return /^-?(?:\d|\.)/.test(match[3]) ? Number(match[3]) : match[3];
}

function getArrayRecords(text) {
  const records = [];
  for (const match of text.matchAll(/\{[^{}]*\}/gs)) {
    const raw = match[0];
    const record = parseObject(raw);
    for (const key of [
      'id', 'nameAr', 'nameEn', 'name_en', 'name_ar', 'calories', 'kcal', 'cal_100',
      'protein', 'carbs', 'fat', 'p', 'c', 'f',
    ]) {
      if (record[key] === undefined) record[key] = scalarField(raw, key);
    }
    if (typeof record.id !== 'string' || /[;{}]/.test(record.id) || /^(?:string|number|boolean|unknown|any)$/i.test(record.id)) continue;
    records.push(record);
  }
  return records;
}

function summarize(entriesByKitchen) {
  const totals = { records: 0, missingNames: 0, missingMacros: 0, missingBoth: 0, missingAny: 0 };
  const byKitchen = {};
  for (const [kitchen, entries] of Object.entries(entriesByKitchen)) {
    const bucket = { records: 0, missingNames: 0, missingMacros: 0, missingBoth: 0 };
    for (const entry of entries) {
      bucket.records++;
      bucket[entry.bucket]++;
    }
    bucket.missingAny = bucket.missingNames + bucket.missingMacros + bucket.missingBoth;
    byKitchen[kitchen] = bucket;
    totals.records += bucket.records;
    totals.missingNames += bucket.missingNames;
    totals.missingMacros += bucket.missingMacros;
    totals.missingBoth += bucket.missingBoth;
    totals.missingAny += bucket.missingAny;
  }
  return { totals, byKitchen };
}

// ---------------------------------------------------------------------------
// Phase A: local `src/data/*-full.ts`
// ---------------------------------------------------------------------------

function auditLocal() {
  const files = fs.readdirSync(DATA_DIR).filter((file) => /-full\.ts$/i.test(file)).sort();
  const byKitchen = {};
  const ids = { missingNames: [], missingMacros: [], missingBoth: [] };
  let legacyCount = 0;

  for (const file of files) {
    const kitchen = file.replace(/-full\.ts$/i, '');
    const text = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    const records = getArrayRecords(text);
    const legacy = LEGACY_KITCHEN_FILES.has(file);
    if (legacy) legacyCount += records.length;
    for (const record of records) {
      const result = classify(record);
      if (!result) continue;
      const id = String(record.id ?? '(no id)');
      if (!legacy) {
        (byKitchen[kitchen] ??= []).push({ id, ...result });
      }
      ids[result.bucket].push({ id, kitchen, legacy });
    }
  }

  const summary = summarize(byKitchen);
  summary.legacyRecordsSkipped = legacyCount;
  summary.fileCount = files.length;
  return { summary, ids };
}

// ---------------------------------------------------------------------------
// Phase B: live Supabase `dishes`
// ---------------------------------------------------------------------------

async function auditRemote() {
  let createClient;
  try { ({ createClient } = await import('@supabase/supabase-js')); }
  catch { return { available: false, reason: '@supabase/supabase-js not installed' }; }
  try { await import('dotenv/config'); } catch { /* optional */ }

  const url = process.env.SUPABASE_URL;
  const key = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { available: false, reason: 'missing SUPABASE_URL / service key' };

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('dishes')
      .select('id,name_ar,name_en,cal_100,protein,carbs,fat,region,meal_type,source')
      .order('id')
      .range(from, from + 999);
    if (error) return { available: false, reason: error.message };
    rows.push(...data);
    if (data.length < 1000) break;
  }

  const byKitchen = {};
  const ids = { missingNames: [], missingMacros: [], missingBoth: [] };
  for (const row of rows) {
    const result = classify(row);
    if (!result) continue;
    const kitchen = row.region ?? '(no region)';
    const id = String(row.id ?? '(no id)');
    (byKitchen[kitchen] ??= []).push({ id, ...result });
    ids[result.bucket].push({ id, kitchen, mealType: row.meal_type, source: row.source });
  }
  const summary = summarize(byKitchen);
  summary.liveRows = rows.length;
  return { available: true, summary, ids };
}

// ---------------------------------------------------------------------------

function printSummary(label, summary) {
  console.log(`\n=== ${label} ===`);
  console.log(`records flagged: ${summary.totals.missingAny}  (missingNames ${summary.totals.missingNames}, missingMacros ${summary.totals.missingMacros}, missingBoth ${summary.totals.missingBoth})`);
  const ranked = Object.entries(summary.byKitchen).sort((a, b) => b[1].missingAny - a[1].missingAny);
  for (const [kitchen, b] of ranked) {
    console.log(`  ${kitchen.padEnd(24)} ${String(b.missingAny).padStart(5)}  (names ${b.missingNames}, macros ${b.missingMacros}, both ${b.missingBoth})`);
  }
  if (!ranked.length) console.log('  (none)');
}

const local = auditLocal();
const remote = await auditRemote();

console.log('CRITICAL AUDIT (read-only)');
console.log(`local files scanned: ${local.summary.fileCount}; legacy rows skipped: ${local.summary.legacyRecordsSkipped}`);
printSummary('LOCAL src/data/*-full.ts', local.summary);
if (remote.available) {
  console.log(`live rows: ${remote.summary.liveRows}`);
  printSummary('LIVE Supabase dishes', remote.summary);
} else {
  console.log(`\n=== LIVE Supabase dishes ===\n  skipped: ${remote.reason}`);
}

const report = {
  generatedAt: new Date().toISOString(),
  buckets: ['missingNames', 'missingMacros', 'missingBoth'],
  local: local.summary,
  remote: remote.available ? remote.summary : { available: false, reason: remote.reason },
  ids: {
    local: local.ids,
    remote: remote.available ? remote.ids : null,
  },
};
fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`\nReport written: ${path.relative(ROOT, REPORT_PATH)}`);
