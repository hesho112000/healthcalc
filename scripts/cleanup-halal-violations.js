// Targeted cleanup of stale non-halal rows left in the live Supabase `dishes`
// table by the insert-or-skip migrations.
//
//   node scripts/cleanup-halal-violations.js            DRY RUN (default): preview only
//   node scripts/cleanup-halal-violations.js --confirm  DELETE non-halal rows + strip keywords
//                                                       from the authored halal dishes
//   node scripts/cleanup-halal-violations.js --confirm --all-keywords
//                                                       DELETE every row containing a keyword
//   node scripts/cleanup-halal-violations.js --confirm --force
//                                                       bypass the MAX_DELETE guard
//
// Classification (reported per row):
//   * KEYWORD   - id / name_en / name_ar / name_fr / name_es / name_de / source /
//                 region matches \b(pork|bacon|ham|lard)\b  -> candidate.
//   * DELETE    - keyword row with no halal marker -> the genuinely non-halal leftovers.
//   * RENAME    - authored halal dish that only mentions a keyword in its names
//                 (Halal / Turkey / Beef / No Pork / Substitute); renamed keyword-free,
//                 mirroring the current static catalog where an equivalent exists.
//   * KEEP      - same dish still exists in src/data/*-full.ts|json -> never touched.
//
// Safety: preview first, --confirm required, JSON backup written before any write,
// MAX_DELETE cap (default 500) unless --force.
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const BACKUP_PATH = path.join(ROOT, 'scripts', 'cleanup-halal-violations.backup.json');

const argv = process.argv.slice(2);
const CONFIRM = argv.includes('--confirm');
const ALL_KEYWORDS = argv.includes('--all-keywords');
const FORCE = argv.includes('--force');
const MAX_DELETE = Number(process.env.CLEANUP_MAX_DELETE ?? 500);

const KEYWORDS = ['pork', 'bacon', 'ham', 'lard'];
const REPORT_ONLY = ['wine', 'beer', 'alcohol'];
const ARABIC_PORK = ['خنزير'];
const SCANNED_FIELDS = ['id', 'name_en', 'name_ar', 'name_fr', 'name_es', 'name_de', 'source', 'region', 'meal_type'];

// Authored HALAL dishes that merely name a keyword. Renames are curated, keyed by
// the stable Supabase id; three of them mirror the current static catalog verbatim.
const RENAMES = [
  {
    id: '0b60bda0-d151-4a46-ae98-d37a73cc5edb',
    note: 'mirrors static france-full.ts (fr-base-044)',
    fields: { name_en: 'French Quiche Lorraine with Smoked Turkey (Halal)' },
  },
  {
    id: '1751cf5f-3710-4fd5-8782-d7924e27fb0d',
    note: 'mirrors static italy-full.ts (it-base-042)',
    fields: {
      name_ar: 'بوكاتيني أماتريتشانا بشرائح لحم بقري مدخن حلال إيطالي',
      name_en: 'Italian Bucatini all\u2019Amatriciana with Halal Smoked Beef Strips',
      name_fr: 'Cuisine italienne : Bucatini all\u2019amatriciana aux lanières de bœuf fumé halal',
      name_es: 'Cocina italiana: Bucatini all\u2019amatriciana con tiras de ternera ahumada halal',
      name_de: 'Italienische Küche: Bucatini all\u2019Amatriciana mit halal geräucherten Rindfleischstreifen',
    },
  },
  {
    id: '31bd427c-1d78-45fd-9be2-c3d21db623f6',
    note: 'mirrors static canada-full.ts (canada-base-071)',
    fields: { name_ar: 'سلطة سيزر كندي', name_en: 'Canadian Caesar Salad' },
  },
  {
    id: '64fd8387-9b15-4b1d-b538-1a63ea0fb746',
    note: 'keyword-free rename (no static equivalent)',
    fields: {
      name_en: 'Halal Beef Peameal Slices',
      name_fr: 'Tranches de peameal de bœuf halal',
      name_es: 'Lonjas peameal de res halal',
      name_de: 'Halal-Rindfleisch-Peameal-Scheiben',
    },
  },
  {
    id: '6dcd4bbc-cdc1-4b7d-9382-ca359ed35fba',
    note: 'keyword-free rename; source proposal defines it as a beef pie',
    fields: {
      name_ar: 'فطيرة اللحم البقري البريطانية',
      name_en: 'British Beef Pie Bake',
      name_fr: 'Tourte britannique au bœuf haché',
      name_es: 'Pastel británico de carne de res',
      name_de: 'Britische Hackfleischpastete',
    },
  },
  {
    id: 'aaa3f2b1-8ae6-47b7-868d-29c500dc9a27',
    note: 'keyword-free rename',
    fields: {
      name_ar: 'سباغيتي كاربونارا بديك رومي مدخن إيطالي',
      name_en: 'Italian Spaghetti Carbonara with Smoked Turkey, Halal',
      name_fr: 'Cuisine italienne : Spaghetti carbonara à la dinde fumée halal',
      name_es: 'Cocina italiana: Espaguetis carbonara con pavo ahumado halal',
      name_de: 'Italienische Küche: Spaghetti Carbonara mit geräucherter Pute, halal',
    },
  },
  {
    id: 'f0bda8e5-b26c-435f-ad1a-4cb9e47c5041',
    note: 'keyword-free rename',
    fields: {
      name_en: 'Baked Beans with Smoked Turkey',
      name_fr: 'Haricots cuits à la dinde fumée',
      name_es: 'Judías con pavo ahumado',
      name_de: 'Ofenbohnen mit geräuchertem Truthahn',
    },
  },
];

const HALAL_MARKER_EN = /\b(halal|turkey|substitute|no\s+pork|beef\s+bacon|smoked\s+turkey)\b/i;
const HALAL_MARKER_AR = /حلال|بدون|بديل|ديك\s*روم|بقري/;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

function unescapeQuoted(value) {
  return value.replace(/\\(.)/g, (_, char) => (char === 'n' ? '\n' : char === 't' ? '\t' : char));
}

function extractField(text, field) {
  const values = new Set();
  const quotedKey = new RegExp(`["']?${field}["']?\\s*:\\s*(?:"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)')`, 'g');
  for (const match of text.matchAll(quotedKey)) {
    const value = unescapeQuoted(match[1] ?? match[2] ?? '').trim();
    if (value) values.add(value.toLocaleLowerCase('en'));
  }
  return values;
}

function buildStaticIndex() {
  const files = fs.existsSync(DATA_DIR)
    ? fs.readdirSync(DATA_DIR).filter((file) => /-full\.(?:ts|json)$/i.test(file))
    : [];
  const ids = new Set();
  const names = new Set();
  for (const file of files) {
    const text = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    for (const value of extractField(text, 'id')) ids.add(value);
    for (const field of ['nameEn', 'name_en', 'nameAr', 'name_ar']) {
      for (const value of extractField(text, field)) names.add(value);
    }
  }
  return { ids, names, files: files.length };
}

function kitchenOf(row) {
  const explicit = Array.isArray(row.diaspora_priority) ? row.diaspora_priority[0] : null;
  if (explicit) return explicit;
  const source = String(row.source ?? '').split(' - ')[0].trim();
  return source || row.region || '-';
}

function findMatches(rows, keywords, extraTerms = []) {
  const regex = new RegExp(`\\b(?:${keywords.join('|')})\\b`, 'i');
  const hits = [];
  for (const row of rows) {
    const matched = new Set();
    for (const field of SCANNED_FIELDS) {
      const value = row[field];
      if (typeof value !== 'string') continue;
      for (const found of value.match(new RegExp(regex.source, 'ig')) ?? []) matched.add(found.toLocaleLowerCase('en'));
      for (const term of extraTerms) if (value.includes(term)) matched.add(term);
    }
    if (matched.size) hits.push({ row, matched: [...matched] });
  }
  return hits;
}

function classify(hit, staticIndex) {
  const { row } = hit;
  const en = [row.name_en, row.name_fr, row.name_es, row.name_de].filter((value) => typeof value === 'string').join(' ');
  const ar = typeof row.name_ar === 'string' ? row.name_ar : '';
  const marker = en.match(HALAL_MARKER_EN)?.[0] ?? ar.match(HALAL_MARKER_AR)?.[0];
  if (!marker) {
    const idKey = String(row.id ?? '').trim().toLocaleLowerCase('en');
    const nameKeys = [row.name_en, row.name_ar]
      .filter((value) => typeof value === 'string' && value.trim())
      .map((value) => value.trim().toLocaleLowerCase('en'));
    if (staticIndex.ids.has(idKey) || nameKeys.some((name) => staticIndex.names.has(name))) {
      return { action: 'keep', reason: 'still present in static catalog' };
    }
    return { action: 'delete', reason: 'non-halal keyword with no halal marker' };
  }
  return { action: 'rename', reason: `authored halal dish (marker: ${marker}) - strip keyword` };
}

async function fetchAll() {
  const rows = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`dishes query failed: ${error.message}`);
    const page = data ?? [];
    rows.push(...page);
    if (page.length < PAGE) break;
  }
  return rows;
}

async function countDishes() {
  const { count, error } = await supabase.from('dishes').select('*', { count: 'exact', head: true });
  if (error) throw new Error(`count failed: ${error.message}`);
  return count;
}

async function deleteRows(ids) {
  let deleted = 0;
  for (let index = 0; index < ids.length; index += 50) {
    const chunk = ids.slice(index, index + 50);
    const { error } = await supabase.from('dishes').delete().in('id', chunk);
    if (error) throw new Error(`delete failed on chunk ${index}: ${error.message}`);
    deleted += chunk.length;
  }
  return deleted;
}

function buildRenamePlan(rows, classified) {
  const renameCandidates = classified.filter((entry) => entry.classification.action === 'rename');
  const byId = new Map(rows.map((row) => [row.id, row]));
  const takenNames = new Set();
  for (const row of rows) {
    if (typeof row.name_en === 'string' && row.name_en.trim()) takenNames.add(row.name_en.trim().toLocaleLowerCase('en'));
    if (typeof row.name_ar === 'string' && row.name_ar.trim()) takenNames.add(row.name_ar.trim().toLocaleLowerCase('en'));
  }
  const plan = [];
  for (const candidate of renameCandidates) {
    const spec = RENAMES.find((rename) => rename.id === candidate.hit.row.id);
    if (!spec) {
      plan.push({ id: candidate.hit.row.id, row: candidate.hit.row, spec: null, skip: 'no curated rename defined' });
      continue;
    }
    const collisions = [];
    for (const field of ['name_en', 'name_ar']) {
      const next = spec.fields[field];
      if (!next) continue;
      const current = byId.get(spec.id)?.[field];
      const key = next.trim().toLocaleLowerCase('en');
      const currentKey = typeof current === 'string' ? current.trim().toLocaleLowerCase('en') : '';
      if (key !== currentKey && takenNames.has(key)) collisions.push(`${field}="${next}"`);
    }
    plan.push({ id: spec.id, row: candidate.hit.row, spec, skip: collisions.length ? `name collision: ${collisions.join(', ')}` : null });
  }
  return plan;
}

async function main() {
  const rows = await fetchAll();
  const totalBefore = await countDishes();
  const staticIndex = buildStaticIndex();

  const hits = findMatches(rows, KEYWORDS);
  const reportOnly = findMatches(rows, REPORT_ONLY, ARABIC_PORK);
  const classified = hits.map((hit) => ({ hit, classification: classify(hit, staticIndex) }));

  const deletes = classified.filter((entry) => entry.classification.action === 'delete');
  const renamePlan = ALL_KEYWORDS ? [] : buildRenamePlan(rows, classified);
  const applyableRenames = renamePlan.filter((entry) => !entry.skip);
  const skippedRenames = renamePlan.filter((entry) => entry.skip);
  const deletePlan = ALL_KEYWORDS ? hits.map((hit) => ({ hit })) : deletes;

  console.log(`\n===== HALAL VIOLATIONS CLEANUP (${CONFIRM ? 'CONFIRM' : 'DRY RUN'}) =====`);
  console.log(`Supabase rows before  : ${totalBefore}`);
  console.log(`Static catalog files  : ${staticIndex.files} (src/data/*-full.ts|json)`);
  console.log(`Keyword match set     : ${KEYWORDS.join(', ')}`);
  console.log(`Matched rows          : ${hits.length} -> delete: ${deletePlan.length},`
    + ` rename: ${applyableRenames.length}${ALL_KEYWORDS ? ' (ALL_KEYWORDS: all matches deleted)' : ''}`);
  console.log(`Columns scanned       : ${SCANNED_FIELDS.join(', ')} (table has no description column)`);

  if (deletePlan.length) {
    console.log(`\n--- WILL DELETE (${deletePlan.length}) ---`);
    for (const [index, entry] of deletePlan.entries()) {
      const { row } = entry.hit;
      console.log(`${String(index + 1).padStart(3)}. [${kitchenOf(row)}] id=${row.id} | ${row.name_en} | ${row.name_ar} | matched=${entry.hit.matched.join('/')}`);
    }
  }

  if (renamePlan.length) {
    console.log(`\n--- WILL RENAME keyword-free (${applyableRenames.length}) ---`);
    for (const [index, entry] of applyableRenames.entries()) {
      const current = entry.row;
      console.log(`${String(index + 1).padStart(3)}. [${kitchenOf(current)}] id=${entry.id}`);
      console.log(`       before : ${current.name_en} | ${current.name_ar}`);
      console.log(`       after  : ${entry.spec.fields.name_en ?? current.name_en} | ${entry.spec.fields.name_ar ?? current.name_ar}`);
      console.log(`       note   : ${entry.spec.note}`);
    }
  }

  if (skippedRenames.length) {
    console.log(`\n--- RENAME SKIPPED (${skippedRenames.length}) ---`);
    for (const entry of skippedRenames) console.log(`     id=${entry.id} | ${entry.row.name_en} | ${entry.skip}`);
  }

  if (reportOnly.length) {
    console.log(`\n--- INFO only (not touched): extended scan ${REPORT_ONLY.join('/')} + Arabic pork terms = ${reportOnly.length} row(s) ---`);
    for (const { row, matched } of reportOnly) {
      console.log(`     [${kitchenOf(row)}] id=${row.id} | ${row.name_en} | matched=${matched.join('/')}`);
    }
  }

  if (!CONFIRM) {
    console.log(`\nDRY RUN: nothing changed. Re-run with --confirm to delete ${deletePlan.length} and rename ${applyableRenames.length}.`);
    return;
  }
  if (!deletePlan.length && !applyableRenames.length) {
    console.log('\nNothing to change.');
    return;
  }
  if (deletePlan.length > MAX_DELETE && !FORCE) {
    console.error(`\nREFUSED: ${deletePlan.length} deletes exceed MAX_DELETE=${MAX_DELETE}. Re-run with --force if expected.`);
    process.exitCode = 1;
    return;
  }

  fs.writeFileSync(
    BACKUP_PATH,
    `${JSON.stringify({
      changedAt: new Date().toISOString(),
      deleted: deletePlan.map((entry) => entry.hit.row),
      renamed: applyableRenames.map((entry) => ({ id: entry.id, before: entry.row, after: entry.spec.fields })),
    }, null, 2)}\n`,
    'utf8',
  );
  console.log(`\nBackup written: ${path.relative(ROOT, BACKUP_PATH)}`);

  const deleted = await deleteRows(deletePlan.map((entry) => entry.hit.row.id));

  let renamed = 0;
  const renameErrors = [];
  for (const entry of applyableRenames) {
    const { error } = await supabase.from('dishes').update(entry.spec.fields).eq('id', entry.id);
    if (error) renameErrors.push(`${entry.id}: ${error.message}`);
    else renamed++;
  }

  const after = await fetchAll();
  const totalAfter = await countDishes();
  const remaining = findMatches(after, KEYWORDS);

  console.log('\n----- RESULT -----');
  console.log(`Deleted rows          : ${deleted}`);
  console.log(`Renamed rows          : ${renamed}${renameErrors.length ? ` (failed: ${renameErrors.length})` : ''}`);
  for (const message of renameErrors) console.error(`  RENAME FAILED ${message}`);
  console.log(`Supabase rows after   : ${totalAfter} (before: ${totalBefore})`);
  console.log(`Remaining keyword rows: ${remaining.length}`);
  for (const { row, matched } of remaining) console.log(`  LEFT id=${row.id} | ${row.name_en} | matched=${matched.join('/')}`);

  if (remaining.length || renameErrors.length) {
    console.error('\nCleanup incomplete.');
    process.exitCode = 1;
  } else {
    console.log('\nCLEAN: 0 rows in Supabase contain pork/bacon/ham/lard.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
