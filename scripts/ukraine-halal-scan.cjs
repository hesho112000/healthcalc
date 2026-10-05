const {
  CORE_ALCOHOL,
  CORE_PORK,
  makeScan,
  hasTerm,
} = require('./halal-core.cjs');

const EXTRA_PORK = ['svynyina', 'svynyna', 'svinina', 'kovbasa', 'shynka', 'bekon'];
const EXTRA_ALCOHOL = ['horilka', 'varenukha', 'medivka', 'kvass', 'pyvo', 'nalivka'];
const LANGUAGES = ['ar', 'en', 'fr', 'es', 'de'];
const NAME_FIELDS = ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'];
const scan = makeScan({ extraPork: EXTRA_PORK, extraAlcohol: EXTRA_ALCOHOL });

function validateUkraineDataset(profiles, parts, rows) {
  const errors = [];
  const expectedPartCounts = [100, 100, 50];
  const regionIds = new Set(parts.flatMap(({ regions }) => regions));
  const ids = new Set();

  if (profiles.length !== 25) errors.push(`Expected 25 source profiles; found ${profiles.length}`);
  if (parts.length !== 3) errors.push(`Expected 3 generated parts; found ${parts.length}`);
  if (regionIds.size !== 10) errors.push(`Expected 10 distinct regional anchors; found ${regionIds.size}`);
  for (const [index, part] of parts.entries()) {
    if (part.rows.length !== expectedPartCounts[index]) {
      errors.push(`Part ${index + 1} should contain ${expectedPartCounts[index]} rows; found ${part.rows.length}`);
    }
  }
  if (rows.length !== 250) errors.push(`Expected 250 generated rows; found ${rows.length}`);

  for (const profile of profiles) {
    for (const language of LANGUAGES) {
      if (typeof profile.names?.[language] !== 'string' || !profile.names[language].trim()) {
        errors.push(`Profile ${profile.id} has no ${language.toUpperCase()} name`);
      }
    }
    if (!regionIds.has(profile.region)) errors.push(`Profile ${profile.id} has invalid region ${profile.region}`);
    if (!profile.category || !profile.mealType || !profile.cooking) errors.push(`Profile ${profile.id} is missing required dish fields`);
    if (!Number.isFinite(profile.kcal) || !['protein', 'carbs', 'fat'].every((key) => Number.isFinite(profile[key]))) {
      errors.push(`Profile ${profile.id} has invalid nutrition values`);
    } else if (profile.kcal !== Math.round(4 * profile.protein + 4 * profile.carbs + 9 * profile.fat)) {
      errors.push(`Profile ${profile.id} calories do not match its macros`);
    }
  }

  for (const row of rows) {
    if (typeof row.id !== 'string' || !row.id) errors.push('Generated row has no id');
    else if (ids.has(row.id)) errors.push(`Duplicate generated row id ${row.id}`);
    else ids.add(row.id);
    for (const field of NAME_FIELDS) {
      if (typeof row[field] !== 'string' || !row[field].trim()) errors.push(`Row ${row.id} has no ${field}`);
    }
    for (const field of ['kcal', 'protein', 'carbs', 'fat']) {
      if (!Number.isFinite(row[field])) errors.push(`Row ${row.id} has invalid ${field}`);
    }
    if (!regionIds.has(row.region)) errors.push(`Row ${row.id} has invalid region ${row.region}`);
    if (row.grams !== 100) errors.push(`Row ${row.id} is not normalized to 100 g`);
    if (!row.category || !row.mealType || !row.cooking) errors.push(`Row ${row.id} is missing required dish fields`);
    if (Number.isFinite(row.kcal) && ['protein', 'carbs', 'fat'].every((field) => Number.isFinite(row[field])) &&
        row.kcal !== Math.round(4 * row.protein + 4 * row.carbs + 9 * row.fat)) {
      errors.push(`Row ${row.id} calories do not match its macros`);
    }
  }

  const porkTerms = [...new Set([...CORE_PORK, ...EXTRA_PORK])];
  const alcoholTerms = [...new Set([...CORE_ALCOHOL, ...EXTRA_ALCOHOL])];
  const contentViolations = [];
  for (const item of [...profiles.map((profile) => ({ id: profile.id, names: Object.values(profile.names || {}) })), ...rows.map((row) => ({ id: row.id, names: NAME_FIELDS.map((field) => row[field] || '') }))]) {
    for (const term of porkTerms) {
      if (hasTerm(item.id, term) || item.names.some((name) => hasTerm(name, term))) {
        contentViolations.push({ kind: 'pork', term, id: item.id });
      }
    }
    for (const term of alcoholTerms) {
      if (hasTerm(item.id, term) || item.names.some((name) => hasTerm(name, term))) {
        contentViolations.push({ kind: 'alcohol', term, id: item.id });
      }
    }
  }

  const halalViolations = [...scan(rows), ...contentViolations];
  return { errors, halalViolations };
}

module.exports = { scan, validateUkraineDataset };

if (require.main === module) {
  const run = async () => {
    const { PROFILES, REGIONS } = await import('./ukraine-base-data/profiles.mjs');
    const { generateUkraineParts } = await import('./build-ukraine.js');
    const parts = generateUkraineParts().map((part) => ({
      ...part,
      regions: REGIONS.map(({ id }) => id),
    }));
    const rows = parts.flatMap(({ rows: partRows }) => partRows);
    const { errors, halalViolations } = validateUkraineDataset(PROFILES, parts, rows);

    for (const { part, rows: partRows } of parts) console.log(`Part ${part} rows scanned: ${partRows.length}`);
    console.log(`source profiles validated: ${PROFILES.length}`);
    console.log(`total rows scanned: ${rows.length}`);
    console.log(`five-language completeness: ${rows.length}/${rows.length}`);
    console.log(`halal violations: ${halalViolations.length}`);
    for (const problem of errors) console.error(`VALIDATION: ${problem}`);
    for (const problem of halalViolations) console.error(`HALAL [${problem.kind}] ${problem.term} -> ${problem.id || problem.nameEn}`);

    if (errors.length || halalViolations.length) process.exitCode = 1;
    else console.log('CLEAN: 250 dishes, all five languages populated, 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
