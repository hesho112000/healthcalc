const { CORE_PORK, hasTerm, makeScan } = require('./halal-core.cjs');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');

const scan = makeScan({
  extraPork: [
    'свинина', 'свин', 'сало', 'wieprzowina', 'wieprz', 'słonina', 'slonina',
    'vepřové', 'veprove', 'vepř', 'vepr', 'sertéshús', 'sertes', 'porc', 'slănină', 'slanina',
  ],
  extraAlcohol: [
    'водка', 'вино', 'пиво', 'kvass', 'wódka', 'wodka', 'piwo', 'wino',
    'pivo', 'pálenka', 'palenka', 'pálinka', 'palinka', 'țuică', 'tuica', 'rakija',
  ],
  extraBlood: ['кровь', 'krew', 'krev', 'vér', 'sânge', 'sange'],
});
const PORK_TERMS = [...new Set([...CORE_PORK, ...[
  'свинина', 'свин', 'сало', 'wieprzowina', 'wieprz', 'słonina', 'slonina',
  'vepřové', 'veprove', 'vepř', 'vepr', 'sertéshús', 'sertes', 'porc', 'slănină', 'slanina',
]])];

const PARTS = [1, 2, 3].flatMap((part) =>
  Array.from({ length: 4 }, (_, index) => `part${part}-${index + 1}.mjs`),
);

async function loadParts(directory) {
  const batches = [];
  for (const part of PARTS) {
    const module = await import(pathToFileURL(resolve(__dirname, directory, part)).href);
    batches.push(module.default);
  }
  return batches;
}

async function run() {
  const [baseParts, expansionParts, { RECIPE_IDS }] = await Promise.all([
    loadParts('eastern-european-base-data'),
    loadParts('eastern-european-data'),
    import(pathToFileURL(resolve(__dirname, 'eastern-european-base-data/rows.mjs')).href),
  ]);
  const base = baseParts.flat();
  const expansion = expansionParts.flat();
  const all = [...base, ...expansion];
  const violations = scan(all);
  const porkIdViolations = all.flatMap((row) =>
    PORK_TERMS.filter((term) => hasTerm(row.id, term)).map((term) => ({ id: row.id, term })),
  );
  const missingLocales = all.filter((row) => ['nameAr', 'nameEn', 'nameFr', 'nameEs', 'nameDe'].some((key) => !row[key]?.trim()));
  const duplicateIds = all.length - new Set(all.map((row) => row.id)).size;
  const partSizes = baseParts.map((rows, index) => rows.length + expansionParts[index].length);
  const invalidParts = partSizes.filter((size) => size !== 25).length;

  console.log(`base rows scanned: ${base.length}`);
  console.log(`expansion rows scanned: ${expansion.length}`);
  console.log(`total rows authored: ${all.length}`);
  console.log(`paired sub-part sizes: ${partSizes.join(', ')}`);
  console.log(`recipe profiles defined: ${RECIPE_IDS.length}`);
  console.log(`missing translations: ${missingLocales.length}`);
  console.log(`duplicate ids: ${duplicateIds}`);
  console.log(`pork keywords in ids: ${porkIdViolations.length}`);
  console.log(`halal violations: ${violations.length}`);
  for (const issue of violations) console.log(`  HALAL [${issue.kind}] "${issue.term}" -> ${issue.nameAr} | ${issue.nameEn}`);

  if (base.length !== 150 || expansion.length !== 150 || all.length !== 300 || RECIPE_IDS.length !== 300 || invalidParts || missingLocales.length || duplicateIds || porkIdViolations.length || violations.length) {
    process.exitCode = 1;
    return;
  }
  console.log('\nCLEAN: 300 five-language rows, 0 halal violations');
}

if (require.main === module) run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = { scan };
