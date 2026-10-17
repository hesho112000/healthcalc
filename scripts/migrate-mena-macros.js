// Backfill protein/carbs/fat for the 2,006 MENA expansion dishes whose macros were
// still missing in the live `dishes` table. The values are read from the staged
// source-of-truth files in src/data/backfill/*-expansion-full.ts (authored per 100 g,
// Atwater-consistent with cal_100, all under 8% deviation).
//
// Matching: each local record is joined to the live row by its Arabic name (primary)
// or English name (fallback) WITHIN its exact `source` tag. The source tag for every
// record is the one recorded in scripts/audit-report.json (ids.remote.missingMacros),
// which lists exactly the 2,006 rows that are missing macros.
//
// IDEMPOTENT: this script only UPDATEs protein/carbs/fat on rows whose values actually
// differ; it never inserts and never deletes, so running it twice is a no-op the second
// time. cal_100 is intentionally left untouched (the staged macros already preserve it).
//
// Usage:
//   node scripts/migrate-mena-macros.js            # DRY-RUN (no writes)
//   node scripts/migrate-mena-macros.js --confirm  # perform the updates
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BACKFILL_DIR = path.join(ROOT, 'src/data/backfill');
const CONFIRM = process.argv.includes('--confirm');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env['asia_migration'] ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or (asia_migration | SUPABASE_SERVICE_ROLE_KEY) in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// Exact source tags as recorded in scripts/audit-report.json -> missingMacros.
const KITCHENS = [
  { file: 'egyptian-expansion-full.ts', source: 'north-africa-egypt-2026 - Verified against Egyptian Culinary Heritage' },
  { file: 'oman-expansion-full.ts', source: 'gulf-expansion-oman-2026 - Verified against Omani Culinary Heritage' },
  { file: 'lebanon-expansion-full.ts', source: 'levant-2026 - Verified against Lebanese Culinary Heritage' },
  { file: 'palestine-expansion-full.ts', source: 'levant-palestine-2026 - Verified against Palestinian Culinary Heritage' },
  { file: 'syria-expansion-full.ts', source: 'levant-syria-2026 - Verified against Syrian Culinary Heritage' },
  { file: 'bahrain-expansion-full.ts', source: 'gulf-expansion-bahrain-2026 - Verified against Bahraini Culinary Heritage' },
  { file: 'jordan-expansion-full.ts', source: 'levant-jordan-2026 - Verified against Jordanian Culinary Heritage' },
  { file: 'qatar-expansion-full.ts', source: 'gulf-expansion-qatar-2026' },
  { file: 'morocco-expansion-full.ts', source: 'north-africa-morocco-2026 - Verified against Moroccan Culinary Heritage' },
  { file: 'algeria-expansion-full.ts', source: 'north-africa-algeria-2026 - Verified against Algerian Culinary Heritage' },
  { file: 'tunisia-expansion-full.ts', source: 'north-africa-tunisia-2026 - Verified against Tunisian Culinary Heritage' },
  { file: 'libya-expansion-full.ts', source: 'north-africa-libya-2026 - Verified against Libyan Culinary Heritage' },
];

const EPS = 0.0001;

function normalizeName(s) {
  return String(s ?? '')
    .normalize('NFC')
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    .replace(/\u0649/g, '\u064A')
    .replace(/\u0629/g, '\u0647')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Parse the JSON object literal rows out of a generated `*-expansion-full.ts` file.
function loadBackfillRecords(file) {
  const text = fs.readFileSync(path.join(BACKFILL_DIR, file), 'utf8');
  const marker = text.indexOf('= [');
  if (marker === -1) throw new Error(`${file}: could not find array literal`);
  const body = text.slice(marker + 3);
  const end = body.lastIndexOf('];');
  const arrText = end === -1 ? body : body.slice(0, end);
  const records = [];
  for (const raw of arrText.split('\n')) {
    const line = raw.trim().replace(/,$/, '');
    if (line.startsWith('{') && line.endsWith('}')) records.push(JSON.parse(line));
  }
  return records;
}

function macrosDiffer(remote, local) {
  return remote === null || remote === undefined || Math.abs(Number(remote) - Number(local)) > EPS;
}

async function main() {
  console.log('==========================================================');
  console.log(CONFIRM ? ' MENA MACROS MIGRATION  [CONFIRM - WRITES ENABLED]' : ' MENA MACROS MIGRATION  [DRY-RUN - no writes]');
  console.log('==========================================================\n');

  const summary = [];
  const planned = [];
  const unmatched = [];
  const ambiguous = [];
  const errors = [];
  let totalLocal = 0;
  let totalMatched = 0;
  let totalChanged = 0;

  for (const { file, source } of KITCHENS) {
    const local = loadBackfillRecords(file);
    totalLocal += local.length;

    const { data: remote, error } = await supabase
      .from('dishes')
      .select('id, name_ar, name_en, protein, carbs, fat')
      .eq('source', source);

    if (error) {
      errors.push(`${file}: query failed: ${error.message}`);
      console.error(`  [ERROR] ${file}: ${error.message}`);
      summary.push({ file, source, local: local.length, remote: 0, matched: 0, changed: 0, unchanged: 0, unmatched: local.length, ambiguous: 0 });
      continue;
    }

    const byAr = new Map();
    const byEn = new Map();
    for (const r of remote) {
      const ka = normalizeName(r.name_ar);
      const ke = normalizeName(r.name_en);
      if (ka) byAr.set(ka, byAr.has(ka) ? null : r);
      if (ke) byEn.set(ke, byEn.has(ke) ? null : r);
    }

    let matched = 0;
    let changed = 0;
    let unchanged = 0;
    let amb = 0;

    for (const rec of local) {
      let hit = byAr.get(normalizeName(rec.nameAr));
      if (hit === null) {
        amb++;
        ambiguous.push({ file, nameEn: rec.nameEn, reason: 'duplicate name_ar in source' });
        continue;
      }
      if (!hit) {
        const viaEn = byEn.get(normalizeName(rec.nameEn));
        if (viaEn === null) {
          amb++;
          ambiguous.push({ file, nameEn: rec.nameEn, reason: 'duplicate name_en in source' });
          continue;
        }
        hit = viaEn;
      }
      if (!hit) {
        unmatched.push({ file, nameEn: rec.nameEn, nameAr: rec.nameAr });
        continue;
      }
      matched++;
      const needs =
        macrosDiffer(hit.protein, rec.protein) ||
        macrosDiffer(hit.carbs, rec.carbs) ||
        macrosDiffer(hit.fat, rec.fat);
      if (needs) {
        changed++;
        planned.push({
          id: hit.id,
          file,
          nameEn: rec.nameEn,
          from: { protein: hit.protein, carbs: hit.carbs, fat: hit.fat },
          to: { protein: rec.protein, carbs: rec.carbs, fat: rec.fat },
        });
      } else {
        unchanged++;
      }
    }

    totalMatched += matched;
    totalChanged += changed;
    summary.push({ file, source, local: local.length, remote: remote.length, matched, changed, unchanged, unmatched: local.length - matched - amb, ambiguous: amb });
  }

  console.log('Per-kitchen (local rows / remote rows for source / matched / to-change / already-ok / unmatched / ambiguous):\n');
  for (const s of summary) {
    const short = path.basename(s.file, '-expansion-full.ts').padEnd(12);
    console.log(
      `  ${s.file.padEnd(32)} local=${String(s.local).padStart(3)} remote=${String(s.remote).padStart(3)} matched=${String(s.matched).padStart(3)} change=${String(s.changed).padStart(3)} same=${String(s.unchanged).padStart(3)} unmatched=${s.unmatched} amb=${s.ambiguous}`,
    );
  }

  console.log('\nTotals');
  console.log(`  local records  : ${totalLocal}`);
  console.log(`  matched        : ${totalMatched}`);
  console.log(`  to update      : ${totalChanged}`);
  console.log(`  already current: ${totalMatched - totalChanged}`);
  console.log(`  unmatched      : ${unmatched.length}`);
  console.log(`  ambiguous      : ${ambiguous.length}`);
  console.log(`  errors         : ${errors.length}`);

  if (unmatched.length) {
    console.log('\nUnmatched (no remote row for source by name_ar/name_en):');
    for (const u of unmatched.slice(0, 40)) console.log(`  - ${u.file} :: ${u.nameEn}`);
    if (unmatched.length > 40) console.log(`  ... and ${unmatched.length - 40} more`);
  }
  if (ambiguous.length) {
    console.log('\nAmbiguous (multiple remote rows share the name within a source):');
    for (const a of ambiguous.slice(0, 40)) console.log(`  - ${a.file} :: ${a.nameEn} (${a.reason})`);
    if (ambiguous.length > 40) console.log(`  ... and ${ambiguous.length - 40} more`);
  }

  console.log('\nSample of planned changes (first 20):');
  for (const p of planned.slice(0, 20)) {
    const f = p.from;
    const t = p.to;
    console.log(
      `  ${p.file.replace('-expansion-full.ts', '')} :: ${p.nameEn}  ` +
        `[P ${fmt(f.protein)}->${fmt(t.protein)} | C ${fmt(f.carbs)}->${fmt(t.carbs)} | F ${fmt(f.fat)}->${fmt(t.fat)}]`
    );
  }

  const reportPath = path.join(os.tmpdir(), 'mena-macros-migration-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ mode: CONFIRM ? 'confirm' : 'dry-run', summary, planned, unmatched, ambiguous, errors }, null, 2),
    'utf8'
  );
  console.log(`\nReport: ${reportPath}`);

  if (!CONFIRM) {
    console.log('\nDRY-RUN complete. No data was written. Re-run with --confirm to apply.');
    return;
  }

  if (planned.length === 0) {
    console.log('\nNothing to update (database already in sync).');
    return;
  }

  console.log('\nApplying updates...');
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < planned.length; i++) {
    const p = planned[i];
    const { error: upErr } = await supabase
      .from('dishes')
      .update({ protein: p.to.protein, carbs: p.to.carbs, fat: p.to.fat })
      .eq('id', p.id);
    if (upErr) {
      fail++;
      console.error(`  FAIL ${i + 1}/${planned.length} "${p.nameEn}": ${upErr.message}`);
    } else {
      ok++;
      if ((i + 1) % 100 === 0 || i === planned.length - 1) console.log(`  ${i + 1}/${planned.length} updated`);
    }
  }
  console.log(`\nUpdated: ${ok} | Failed: ${fail}`);
  if (fail > 0) process.exitCode = 1;
}

function fmt(v) {
  return v === null || v === undefined ? 'null' : String(Number(v));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
