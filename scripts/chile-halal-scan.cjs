const { makeScan } = require('./halal-core.cjs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');

const SCAN = makeScan();
const PHASE_PARTS = { 1: [1, 2, 3, 4], 2: [1, 2] };

async function load(directory) {
  const batches = [];
  for (const currentPhase of Object.keys(PHASE_PARTS).map(Number)) {
    for (const index of PHASE_PARTS[currentPhase]) {
      const file = `part${currentPhase}-${index}.mjs`;
      const module = await import(pathToFileURL(resolve(__dirname, directory, file)).href);
      batches.push(module.default);
    }
  }
  return batches;
}

async function run() {
  const [baseParts, dataParts] = await Promise.all([
    load('chile-base-data'),
    load('chile-data'),
  ]);
  const base = baseParts.flat();
  const data = dataParts.flat();
  const all = [...base, ...data];
  const violations = SCAN(all);
  const missingLocales = all.filter((row) => ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'].some((key) => !row[key]?.trim()));
  const duplicateIds = all.length - new Set(all.map((row) => row.id)).size;
  const duplicateEnglishNames = all.length - new Set(all.map((row) => row.nameEn.trim().toLowerCase())).size;
  const invalidPairs = baseParts.flatMap((rows, index) => rows.length + dataParts[index].length !== 25 ? [index + 1] : []);
  const macroErrors = all.filter((row) => row.kcal !== Math.round(4 * row.protein + 4 * row.carbs + 9 * row.fat));

  console.log(`base dishes: ${base.length}`);
  console.log(`expansion dishes: ${data.length}`);
  console.log(`total Chilean dishes: ${all.length}`);
  console.log(`paired part sizes: ${baseParts.map((rows, index) => rows.length + dataParts[index].length).join(', ')}`);
  console.log(`five-language completeness: ${all.length - missingLocales.length}/${all.length}`);
  console.log(`duplicate IDs: ${duplicateIds}`);
  console.log(`duplicate English names: ${duplicateEnglishNames}`);
  console.log(`invalid macro rows: ${macroErrors.length}`);
  console.log(`halal violations: ${violations.length}`);
  for (const issue of violations) console.error(`SCAN [${issue.kind}] ${issue.id || issue.nameEn}`);
  for (const row of macroErrors) console.error(`MACRO ${row.id}`);

  if (base.length !== 75 || data.length !== 75 || all.length !== 150 || invalidPairs.length || missingLocales.length || duplicateIds || duplicateEnglishNames || macroErrors.length || violations.length) {
    process.exitCode = 1;
    return;
  }
  console.log('\nCLEAN: 150 five-language Chilean dishes across Phase A Parts 1 and 2, 0 halal violations');
}

if (require.main === module) run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
