const { CORE_PORK, CORE_ALCOHOL, hasTerm, makeScan } = require('./halal-core.cjs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');

const EXTRA_PORK = [
  'puerco', 'cochinita', 'carnitas', 'chicharron', 'chicharrón', 'tocino', 'manteca',
  'cerdo', 'porc', 'jamon', 'jamón', 'chorizo', 'lardo', 'bacon', 'panceta',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'لحم مقدد',
];
const EXTRA_ALCOHOL = [
  'tequila', 'mezcal', 'pulque', 'tepache', 'aguardiente', 'cerveza', 'vino', 'ron',
  'licor', 'brandy', 'whisky', 'whiskey', 'كحول', 'خمر', 'نبيذ',
];
const PORK_TERMS = [...new Set([...CORE_PORK, ...EXTRA_PORK])];
const ALCOHOL_TERMS = [...new Set([...CORE_ALCOHOL, ...EXTRA_ALCOHOL])];
const SCAN = makeScan({ extraPork: EXTRA_PORK, extraAlcohol: EXTRA_ALCOHOL });
const PHASES = [1, 2, 3];
const PARTS = [1, 2, 3, 4];

async function load(directory) {
  const batches = [];
  for (const phase of PHASES) {
    for (const index of PARTS) {
      const file = `part${phase}-${index}.mjs`;
      const module = await import(pathToFileURL(resolve(__dirname, directory, file)).href);
      batches.push(module.default);
    }
  }
  return batches;
}

async function run() {
  const [baseParts, dataParts] = await Promise.all([
    load('mexico-base-data'),
    load('mexico-data'),
  ]);
  const base = baseParts.flat();
  const data = dataParts.flat();
  const all = [...base, ...data];
  const violations = SCAN(all);
  const idViolations = all.flatMap((row) => [
    ...PORK_TERMS.filter((term) => hasTerm(row.id, term)).map((term) => ({ kind: 'pork-id', term, id: row.id })),
    ...ALCOHOL_TERMS.filter((term) => hasTerm(row.id, term)).map((term) => ({ kind: 'alcohol-id', term, id: row.id })),
  ]);
  const missingLocales = all.filter((row) => ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'].some((key) => !row[key]?.trim()));
  const duplicateIds = all.length - new Set(all.map((row) => row.id)).size;
  const duplicateEnglishNames = all.length - new Set(all.map((row) => row.nameEn.trim().toLowerCase())).size;
  const invalidPairs = baseParts.flatMap((rows, index) => rows.length + dataParts[index].length !== 25 ? [index + 1] : []);
  const macroErrors = all.filter((row) => row.kcal !== Math.round(4 * row.protein + 4 * row.carbs + 9 * row.fat));

  console.log(`base dishes: ${base.length}`);
  console.log(`expansion dishes: ${data.length}`);
  console.log(`total Mexican dishes: ${all.length}`);
  console.log(`paired part sizes: ${baseParts.map((rows, index) => rows.length + dataParts[index].length).join(', ')}`);
  console.log(`five-language completeness: ${all.length - missingLocales.length}/${all.length}`);
  console.log(`duplicate IDs: ${duplicateIds}`);
  console.log(`duplicate English names: ${duplicateEnglishNames}`);
  console.log(`invalid macro rows: ${macroErrors.length}`);
  console.log(`pork/alcohol keywords in IDs: ${idViolations.length}`);
  console.log(`halal violations: ${violations.length}`);
  for (const issue of [...idViolations, ...violations]) console.error(`HALAL [${issue.kind}] ${issue.term} -> ${issue.id || issue.nameEn}`);
  for (const row of macroErrors) console.error(`MACRO ${row.id}`);

  if (base.length !== 150 || data.length !== 150 || all.length !== 300 || invalidPairs.length || missingLocales.length || duplicateIds || duplicateEnglishNames || macroErrors.length || idViolations.length || violations.length) {
    process.exitCode = 1;
    return;
  }
  console.log('\nCLEAN: 300 five-language Mexican dishes across Phase A Parts 1, 2 and 3, 0 halal violations');
}

if (require.main === module) run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
