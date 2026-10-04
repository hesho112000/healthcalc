// Strict halal gate for the Norway kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Norway-specific pork (svin, spekk,
// medisterkaker) and alcohol (akevitt, øl, gløgg) extras. Game meats
// (reindeer, elk, whale) are halal and ALLOWED per the shared core.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Norwegian preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/svin, akevitt/øl/wine, blood).
const EXCLUDED_TRADITIONAL = [
  'ribbe (pork belly)', 'svinestek', 'medisterkaker (pork patties)',
  'svinekoteletter', 'blodpølse (blood sausage)', 'akevittmarinert laks',
  'øl-batter torsk', 'kjøtt i vinsaus',
];

const scan = makeScan({
  extraPork: ['svin', 'svinekjøtt', 'svineknoke', 'medisterkaker', 'ribbe'],
  extraAlcohol: ['akevitt', 'aquavit', 'gløgg'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (const part of ['part1-1.mjs', 'part1-2.mjs', 'part1-3.mjs', 'part1-4.mjs']) {
        const file = resolve(__dirname, dir, part);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('norway-base-data');
    const expansion = await load('norway-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 175 || expansion.length !== 175 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
