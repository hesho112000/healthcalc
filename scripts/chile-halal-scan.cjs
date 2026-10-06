const { makeScan } = require('./halal-core.cjs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');

const SCAN = makeScan();
const PARTS = [1, 2, 3, 4];

async function load(directory) {
  const batches = [];
  for (const index of PARTS) {
    const file = `part1-${index}.mjs`;
    const module = await import(pathToFileURL(resolve(__dirname, directory, file)).href);
    batches.push(module.default);
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

  if (base.length !== 50 || data.length !== 50 || all.length !== 100 || invalidPairs.length || missingLocales.length || duplicateIds || duplicateEnglishNames || macroErrors.length || violations.length) {
    process.exitCode = 1;
    return;
  }
  console.log('\nCLEAN: 100 five-language Chilean dishes, 0 halal violations');
}

if (require.main === module) run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
