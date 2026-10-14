import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');

const require = createRequire(import.meta.url);
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  module._compile(compiled.outputText, filename);
};

const { UNIFIED_EXERCISES, UNIFIED_EXERCISE_COUNT } = require(path.join(ROOT, 'src/data/exercises/unified.ts'));
if (UNIFIED_EXERCISES.length !== 300 || UNIFIED_EXERCISE_COUNT !== 300) {
  throw new Error(`Expected 300 unified exercises; found ${UNIFIED_EXERCISES.length}`);
}

const ids = new Set();
const missingArabicNames = [];
for (const [index, exercise] of UNIFIED_EXERCISES.entries()) {
  if (!exercise.id || ids.has(exercise.id)) throw new Error(`Missing or duplicate exercise id at row ${index + 1}`);
  ids.add(exercise.id);
  for (const field of ['nameEn', 'nameFr', 'nameEs', 'nameDe']) {
    if (typeof exercise[field] !== 'string' || !exercise[field].trim()) {
      throw new Error(`Exercise ${exercise.id} is missing ${field}`);
    }
  }
  if (typeof exercise.nameAr !== 'string' || !exercise.nameAr.trim()) missingArabicNames.push(exercise.id);
  if (typeof exercise.sourceSets !== 'string') throw new Error(`Exercise ${exercise.id} is missing sourceSets`);
}

const rows = UNIFIED_EXERCISES.map((exercise) => ({
  id: exercise.id,
  name: exercise.name,
  name_en: exercise.nameEn,
  name_ar: exercise.nameAr?.trim() || null,
  name_fr: exercise.nameFr,
  name_es: exercise.nameEs,
  name_de: exercise.nameDe || exercise.nameEn,
  type: exercise.type,
  category: exercise.category,
  muscle_group: exercise.muscleGroup,
  equipment: exercise.equipment,
  difficulty: exercise.difficulty,
  calories: exercise.calories,
  calories_per_session: exercise.caloriesPerSession ?? null,
  duration: exercise.duration,
  sets: exercise.sets,
  reps: exercise.reps ?? null,
  reps_min: exercise.repsMin ?? null,
  reps_max: exercise.repsMax ?? null,
  timed_duration: exercise.timedDuration ?? null,
  timed_duration_min: exercise.timedDurationMin ?? null,
  timed_duration_max: exercise.timedDurationMax ?? null,
  per_side: exercise.perSide ?? null,
  unit: exercise.unit ?? null,
  rest_seconds: exercise.restSeconds ?? null,
  source_sets: exercise.sourceSets,
  body_concerns: exercise.bodyConcerns ?? [],
  target_audience: exercise.targetAudience ?? [],
  goals: exercise.goals ?? [],
  bmi_range: exercise.bmiRange ?? null,
  contraindications: exercise.contraindications ?? [],
  refs: exercise.refs ?? [],
  tip_en: exercise.tipEn ?? null,
  tip_fr: exercise.tipFr ?? null,
  tip_es: exercise.tipEs ?? null,
  tip_ar: exercise.tipAr ?? null,
  aliases: exercise.aliases ?? [],
  reviewed_loanwords: exercise.reviewedLoanwords ?? [],
  review_status: exercise.reviewStatus ?? (exercise.nameAr?.trim() ? null : 'needs_review'),
  source_file: exercise.sourceFile,
}));

console.log(`Validated ${rows.length} unified exercise rows.`);
if (missingArabicNames.length) {
  console.warn(`Arabic name pending review for ${missingArabicNames.length} source records; name_ar will be null: ${missingArabicNames.join(', ')}`);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const requiredColumns = [
  'id', 'name', 'name_en', 'name_ar', 'name_fr', 'name_es', 'name_de', 'type', 'category',
  'muscle_group', 'equipment', 'difficulty', 'calories', 'calories_per_session', 'duration',
  'sets', 'reps', 'reps_min', 'reps_max', 'timed_duration', 'timed_duration_min',
  'timed_duration_max', 'per_side', 'unit', 'rest_seconds', 'source_sets', 'body_concerns',
  'target_audience', 'goals', 'bmi_range', 'contraindications', 'refs', 'tip_en', 'tip_fr',
  'tip_es', 'tip_ar', 'aliases', 'reviewed_loanwords', 'review_status', 'source_file',
].join(',');

const schemaCheck = await supabase.from('exercises').select(requiredColumns).limit(0);
if (schemaCheck.error) {
  throw new Error(`Exercises table/schema is unavailable. Apply supabase/migrations/004_exercises.sql first: ${schemaCheck.error.message}`);
}

const existingIds = new Set();
for (let from = 0; ; from += 1000) {
  const { data, error } = await supabase
    .from('exercises')
    .select('id')
    .order('id', { ascending: true })
    .range(from, from + 999);
  if (error) throw new Error(`Existing-exercise lookup failed: ${error.message}`);
  for (const row of data ?? []) existingIds.add(row.id);
  if ((data ?? []).length < 1000) break;
}

const pending = rows.filter((row) => !existingIds.has(row.id));
const batchSize = 50;
let inserted = 0;
for (let i = 0; i < pending.length; i += batchSize) {
  const batch = pending.slice(i, i + batchSize);
  const { error } = await supabase
    .from('exercises')
    .upsert(batch, { onConflict: 'id', ignoreDuplicates: true });
  if (error) throw new Error(`Upsert failed for batch ${i / batchSize + 1}: ${error.message}`);
  inserted += batch.length;
  console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(pending.length / batchSize)} (${inserted}/${pending.length})`);
}

const verifiedIds = new Set();
for (let i = 0; i < rows.length; i += 100) {
  const batchIds = rows.slice(i, i + 100).map((row) => row.id);
  const { data, error } = await supabase.from('exercises').select('id').in('id', batchIds);
  if (error) throw new Error(`Migration verification failed: ${error.message}`);
  for (const row of data ?? []) verifiedIds.add(row.id);
}
const missingIds = rows.filter((row) => !verifiedIds.has(row.id)).map((row) => row.id);
if (missingIds.length) throw new Error(`Migration verification found ${missingIds.length} missing ids: ${missingIds.join(', ')}`);

console.log(`Exercise migration: ${rows.length} source rows, ${inserted} inserted, ${rows.length - inserted} already existed, ${verifiedIds.size} verified.`);
