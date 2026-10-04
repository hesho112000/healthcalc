// Strict halal gate for the Ukraine kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Ukraine-specific pork (svynyina, svynyna,
// svinina, salo, shljaka) and alcohol (horilka, varenukha, medivka, kvass,
// pyvo) extras. No pork, salo, blood, or alcohol appears in any row.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Ukrainian preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/svynyina/svinina, salo, horilka/pyvo/kvass,
// blood).
const EXCLUDED_TRADITIONAL = [
  'kovbasa (pork sausage)', 'salo', 'shkvarky (pork cracklings)',
  'horilka (spirits)', 'varenukha (horilka-poached fruit)',
  'pyvo (beer)', 'kvass (fermented)', 'krovjanka (blood sausage)',
];

const scan = makeScan({
  extraPork: ['svynyina', 'svynyna', 'svinina', 'salo', 'shljaht?'],
  extraAlcohol: ['horilka', 'varenukha', 'medivka', 'kvass', 'pyvo'],
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
    const base = await load('ukraine-base-data');
    const expansion = await load('ukraine-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 50 || expansion.length !== 50 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
