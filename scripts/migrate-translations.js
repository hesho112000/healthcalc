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
      filePath,
      sourceKey,
      table: isExerciseFile ? 'exercises' : 'dishes',
      name_en: getField(record, 'nameEn', 'name_en'),
      name_ar: getField(record, 'nameAr', 'name_ar'),
      name_fr: getField(record, 'nameFr', 'name_fr'),
      name_es: getField(record, 'nameEs', 'name_es'),
      name_de: getField(record, 'nameDe', 'name_de'),
    });
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// Build exact source and composite-name indexes. Many legacy source values are
// dataset labels shared by multiple dishes, so only a unique name pair can be
// used as a fallback for resolving the database UUID.
const dishRowsBySource = new Map();
const dishRowsByNamePair = new Map();
{
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('dishes')
      .select('id,source,name_en,name_ar')
      .order('id', { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`Dish UUID lookup failed: ${error.message}`);
    for (const row of data ?? []) {
      if (row.source) {
        const sourceRows = dishRowsBySource.get(row.source) ?? [];
        sourceRows.push(row);
        dishRowsBySource.set(row.source, sourceRows);
      }
      const namePairKey = JSON.stringify([row.name_en, row.name_ar]);
      const namePairRows = dishRowsByNamePair.get(namePairKey) ?? [];
      namePairRows.push(row);
      dishRowsByNamePair.set(namePairKey, namePairRows);
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
const failedMappings = [];
const localDishNamePairCounts = new Map();
for (const entry of entries) {
  if (entry.table !== 'dishes') continue;
  const key = JSON.stringify([entry.name_en, entry.name_ar]);
  localDishNamePairCounts.set(key, (localDishNamePairCounts.get(key) ?? 0) + 1);
}

const matchCounts = { source: 0, namePair: 0, exerciseId: 0 };
for (const entry of entries) {
  let uuid = null;
  let method = null;
  let reason = null;
  let candidates = [];

  if (entry.table === 'exercises') {
    if (typeof entry.id === 'string' && exerciseIds.has(entry.id)) {
      uuid = entry.id;
      method = 'exerciseId';
    } else {
      reason = 'exercise_id_not_found';
    }
  } else {
    const sourceRows = entry.sourceKey ? dishRowsBySource.get(entry.sourceKey) ?? [] : [];
    if (sourceRows.length === 1) {
      uuid = sourceRows[0].id;
      method = 'source';
    } else if (sourceRows.length > 1) {
      reason = 'ambiguous_source_key';
      candidates = sourceRows;
    } else {
      const hasNames = typeof entry.name_en === 'string' && entry.name_en.trim()
        && typeof entry.name_ar === 'string' && entry.name_ar.trim();
      const namePairKey = JSON.stringify([entry.name_en, entry.name_ar]);
      const nameRows = hasNames ? dishRowsByNamePair.get(namePairKey) ?? [] : [];
      if (nameRows.length > 1) {
        reason = 'ambiguous_database_name_pair';
        candidates = nameRows;
      } else if (nameRows.length === 1 && localDishNamePairCounts.get(namePairKey) > 1) {
        reason = 'ambiguous_local_name_pair';
        candidates = nameRows;
      } else if (nameRows.length === 1) {
        uuid = nameRows[0].id;
        method = 'namePair';
      } else {
        reason = hasNames ? 'no_database_match' : 'missing_local_names';
      }
    }
  }

  if (!uuid) {
    failedMappings.push({
      file: path.relative(ROOT, entry.filePath),
      table: entry.table,
      localId: entry.id ?? null,
      sourceKey: entry.sourceKey,
      name_en: entry.name_en ?? null,
      name_ar: entry.name_ar ?? null,
      reason,
      candidates: candidates.map(({ id, source }) => ({ id, source })),
    });
    continue;
  }
  const missingTranslationFields = ['name_fr', 'name_es', 'name_de'].filter(
    (field) => typeof entry[field] !== 'string' || !entry[field].trim(),
  );
  if (missingTranslationFields.length) {
    failedMappings.push({
      file: path.relative(ROOT, entry.filePath),
      table: entry.table,
      localId: entry.id ?? null,
      sourceKey: entry.sourceKey,
      name_en: entry.name_en ?? null,
      name_ar: entry.name_ar ?? null,
      reason: 'missing_translation_fields',
      missingFields: missingTranslationFields,
      candidates: [{ id: uuid }],
    });
    continue;
  }
  matchCounts[method]++;
  matched.push({ ...entry, uuid, method });
}

const dishMatches = matched.filter((entry) => entry.table === 'dishes').length;
const exerciseMatches = matched.length - dishMatches;
const failedMappingPath = path.join(ROOT, 'scripts', 'failed-mapping.json');
fs.writeFileSync(failedMappingPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  summary: { localRecords: entries.length, matched: matched.length, failed: failedMappings.length },
  failures: failedMappings,
}, null, 2)}\n`, 'utf8');

console.log(`Found ${entries.length} local records; matched ${matched.length} (${dishMatches} dishes, ${exerciseMatches} exercises); failed mappings ${failedMappings.length}.`);
console.log(`Mapping methods: ${matchCounts.source} exact source, ${matchCounts.namePair} unique name-pair fallback, ${matchCounts.exerciseId} exercise IDs.`);
console.log(`Failed mapping details: ${path.relative(ROOT, failedMappingPath)}`);

if (!process.argv.includes('--confirm')) {
  console.log('Dry run only. Re-run with --confirm to apply updates.');
  process.exit(0);
}

const batchSize = 100;
const concurrency = 10;
let updated = 0;
let failed = 0;
for (let offset = 0; offset < matched.length; offset += batchSize) {
  const batch = matched.slice(offset, offset + batchSize);
  console.log(`Updating batch ${Math.floor(offset / batchSize) + 1}/${Math.ceil(matched.length / batchSize)} (${batch.length} records)`);
  for (let groupOffset = 0; groupOffset < batch.length; groupOffset += concurrency) {
    const group = batch.slice(groupOffset, groupOffset + concurrency);
    const results = await Promise.all(group.map(async (entry) => {
      const payload = { name_fr: entry.name_fr, name_es: entry.name_es, name_de: entry.name_de };
      try {
        const { error } = await supabase.from(entry.table).update(payload).eq('id', entry.uuid);
        return { entry, error };
      } catch (error) {
        return { entry, error };
      }
    }));
    for (const { entry, error } of results) {
      if (error) {
        failed++;
        console.error(`Failed ${entry.table} UUID ${entry.uuid}: ${error.message}`);
      } else {
        updated++;
      }
    }
  }
}

console.log(`Migration complete: ${updated} updated, ${failed} update errors, ${failedMappings.length} failed mappings.`);
if (failed) process.exitCode = 1;
