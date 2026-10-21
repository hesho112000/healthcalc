import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.asia_migration;
if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');

const require = createRequire(import.meta.url);
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  module._compile(compiled.outputText, filename);
};

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('-full.ts')) out.push(full);
  }
  return out;
}

function pick(record, camel, snake) {
  if (record == null) return undefined;
  if (record[camel] != null) return record[camel];
  if (record[snake] != null) return record[snake];
  return undefined;
}

function collectRecords(filePath) {
  const mod = require(filePath);
  const records = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === 'object' && !Array.isArray(item) && item.id != null) {
          records.push(item);
        } else {
          visit(item);
        }
      }
    } else if (value && typeof value === 'object') {
      for (const v of Object.values(value)) visit(v);
    }
  };
  visit(mod);
  return records;
}

const isExercises = (filePath) => filePath.includes(`${path.sep}exercises${path.sep}`);

const files = walk(path.join(ROOT, 'src', 'data'));
const entries = [];
for (const filePath of files) {
  const basename = path.basename(filePath);
  const table = isExercises(filePath) ? 'exercises' : 'dishes';
  for (const record of collectRecords(filePath)) {
    const id = record.id;
    const nameFr = pick(record, 'nameFr', 'name_fr');
    const nameEs = pick(record, 'nameEs', 'name_es');
    const nameDe = pick(record, 'nameDe', 'name_de');
    entries.push({ filePath, basename, table, id, nameFr, nameEs, nameDe, sourceKey: `${basename}:${id}` });
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// Precompute existing targets for an accurate dry-run count.
const existingExerciseIds = new Set();
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase.from('exercises').select('id').range(from, from + 999);
    if (error) throw new Error(`Exercise lookup failed: ${error.message}`);
    for (const row of data ?? []) existingExerciseIds.add(row.id);
    if ((data ?? []).length < 1000) break;
    from += data.length;
  }
}
const existingDishSources = new Set();
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase.from('dishes').select('source').range(from, from + 999);
    if (error) throw new Error(`Dish lookup failed: ${error.message}`);
    for (const row of data ?? []) existingDishSources.add(row.source);
    if ((data ?? []).length < 1000) break;
    from += data.length;
  }
}

function isMatch(entry) {
  if (entry.table === 'exercises') return existingExerciseIds.has(entry.id);
  return existingDishSources.has(entry.sourceKey);
}

const total = entries.length;
const matches = entries.filter(isMatch).length;
const confirm = process.argv.includes('--confirm');

console.log(`Found ${total} records. Would update ${matches}.`);

if (!confirm) {
  console.log('Dry run only. Re-run with --confirm to apply updates.');
  process.exit(0);
}

let updated = 0;
let skipped = 0;
let failed = 0;
const batchSize = 100;
for (let i = 0; i < entries.length; i += batchSize) {
  const batch = entries.slice(i, i + batchSize);
  console.log(`Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)}: processing ${batch.length} records`);
  for (const entry of batch) {
    if (!isMatch(entry)) { skipped++; continue; }
    try {
      const payload = { name_fr: entry.nameFr, name_es: entry.nameEs, name_de: entry.nameDe };
      let error;
      if (entry.table === 'exercises') {
        ({ error } = await supabase.from('exercises').update(payload).eq('id', entry.id));
      } else {
        ({ error } = await supabase.from('dishes').update(payload).eq('source', entry.sourceKey));
      }
      if (error) throw error;
      updated++;
    } catch (err) {
      failed++;
      console.error(`Failed ${entry.table} ${entry.sourceKey}: ${err.message}`);
    }
  }
}

console.log(`Migration complete: ${updated} updated, ${skipped} skipped, ${failed} failed.`);
if (failed) process.exitCode = 1;