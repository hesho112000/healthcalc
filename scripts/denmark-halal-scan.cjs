// Strict halal gate for the Denmark kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Denmark-specific pork (flæsk, svinekød,
// medister, rullepølse) and alcohol (akvavit, snaps, gløgg, mjød) extras.
// Game meats (hare, venison, pheasant, goose) are halal and ALLOWED.
// Frikadeller are authored as halal-beef/veal versions.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Danish preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/flæsk, akvavit/snaps/gløgg, blood).
const EXCLUDED_TRADITIONAL = [
  'flæskesteg (roast pork)', 'medisterpølse', 'rullepølse (pork roulade)',
  'flæskesvær', 'æbleflæsk', 'hakket svin og kalv',
  'blodpølse (blood sausage)', 'akvavitmarineret sild',
  'gløgg-pocherede pærer', 'ølbraiseret oksekød',
];

const scan = makeScan({
  extraPork: ['flæsk', 'flask', 'svinekød', 'svinekod', 'svin', 'medister', 'medisterpølse', 'rullepølse', 'flæskesteg'],
  extraAlcohol: ['akvavit', 'snaps', 'gløgg', 'glogg', 'mjød', 'brændevin', 'brannevin'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (const part of ['part1-1.mjs', 'part1-2.mjs']) {
        const file = resolve(__dirname, dir, part);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('denmark-base-data');
    const expansion = await load('denmark-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 75 || expansion.length !== 75 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
