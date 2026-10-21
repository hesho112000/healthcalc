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
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.name.endsWith('-full.ts')) files.push(fullPath);
  }
  return files;
}

function collectRecords(filePath) {
  const exports = require(filePath);
  const records = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
    } else if (value && typeof value === 'object') {
      if (value.id != null) records.push(value);
      else for (const item of Object.values(value)) visit(item);
    }
  };
  visit(exports);
  return records;
}

function getField(record, camelCase, snakeCase) {
  return record[camelCase] ?? record[snakeCase];
}

const entries = [];
const sourceKeys = new Set();
for (const filePath of walk(path.join(ROOT, 'src', 'data'))) {
  const isExerciseFile = filePath.split(path.sep).includes('exercises');
  const basename = path.basename(filePath);
  for (const record of collectRecords(filePath)) {
    const id = record.id;
    const hasId = typeof id === 'string' && id.trim().length > 0;
    const sourceKey = hasId ? `${basename}:${id}` : null;
    if (!isExerciseFile && sourceKey && sourceKeys.has(sourceKey)) {
      throw new Error(`Duplicate local dish source key: ${sourceKey}`);
    }
    if (!isExerciseFile && sourceKey) sourceKeys.add(sourceKey);
    entries.push({
      id,
      sourceKey,
      table: isExerciseFile ? 'exercises' : 'dishes',
      name_fr: getField(record, 'nameFr', 'name_fr'),
      name_es: getField(record, 'nameEs', 'name_es'),
      name_de: getField(record, 'nameDe', 'name_de'),
    });
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// Map each local source key to exactly one database UUID. The local dish id is
// embedded in `source`; the dishes table's actual `id` is a UUID.
const dishUuidBySource = new Map();
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('dishes')
      .select('id,source')
      .order('id', { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`Dish UUID lookup failed: ${error.message}`);
    for (const row of data ?? []) {
      if (!sourceKeys.has(row.source)) continue;
      if (dishUuidBySource.has(row.source)) {
        throw new Error(`Ambiguous dish source key maps to multiple UUIDs: ${row.source}`);
      }
      dishUuidBySource.set(row.source, row.id);
    }
    if ((data ?? []).length < 1000) break;
    from += data.length;
  }
}

const exerciseIds = new Set();
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('exercises')
      .select('id')
      .order('id', { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`Exercise lookup failed: ${error.message}`);
    for (const row of data ?? []) exerciseIds.add(row.id);
    if ((data ?? []).length < 1000) break;
    from += data.length;
  }
}

const matched = [];
let skipped = 0;
for (const entry of entries) {
  const hasId = typeof entry.id === 'string' && entry.id.trim().length > 0;
  const uuid = entry.table === 'dishes' && entry.sourceKey
    ? dishUuidBySource.get(entry.sourceKey)
    : entry.table === 'exercises' && hasId
      ? entry.id
      : null;
  const exists = entry.table === 'dishes' ? uuid != null : hasId && exerciseIds.has(entry.id);
  if (!exists) {
    skipped++;
    continue;
  }
  for (const field of ['name_fr', 'name_es', 'name_de']) {
    if (typeof entry[field] !== 'string' || !entry[field].trim()) {
      throw new Error(`Matched ${entry.table} record ${entry.sourceKey} is missing ${field}`);
    }
  }
  matched.push({ ...entry, uuid });
}

const dishMatches = matched.filter((entry) => entry.table === 'dishes').length;
const exerciseMatches = matched.length - dishMatches;
console.log(`Found ${entries.length} local records; matched ${matched.length} (${dishMatches} dishes, ${exerciseMatches} exercises); skipped ${skipped}.`);

if (!process.argv.includes('--confirm')) {
  console.log('Dry run only. Re-run with --confirm to apply updates.');
  process.exit(0);
}

const batchSize = 100;
let updated = 0;
let failed = 0;
for (let offset = 0; offset < matched.length; offset += batchSize) {
  const batch = matched.slice(offset, offset + batchSize);
  console.log(`Updating batch ${Math.floor(offset / batchSize) + 1}/${Math.ceil(matched.length / batchSize)} (${batch.length} records)`);
  for (const entry of batch) {
    const payload = { name_fr: entry.name_fr, name_es: entry.name_es, name_de: entry.name_de };
    const table = entry.table;
    const { error } = await supabase.from(table).update(payload).eq('id', entry.uuid);
    if (error) {
      failed++;
      console.error(`Failed ${table} UUID ${entry.uuid}: ${error.message}`);
    } else {
      updated++;
    }
  }
}

console.log(`Migration complete: ${updated} updated, ${failed} failed.`);
if (failed) process.exitCode = 1;
