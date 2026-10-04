// Strict halal gate for the Sweden kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Sweden-specific pork (fläsk, skinka,
// kassler, vildsvin) and alcohol (snaps, brännvin, glögg) extras. Game
// meats (reindeer, elk, moose, deer) are halal and ALLOWED per the shared
// core. Köttbullar are authored as halal-beef versions.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Swedish preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/fläsk/vildsvin, snaps/vin, blood).
const EXCLUDED_TRADITIONAL = [
  'julskinka (Christmas ham)', 'fläskkorv (pork sausage)', 'kassler',
  'raggmunk med fläsk', 'vildsvinsgryta (wild boar stew)',
  'blodpudding (blood pudding)', 'snapsmarinerad sill',
  'stekt fisk i ölsmet', 'köttgryta med rödvin',
];

const scan = makeScan({
  extraPork: ['fläsk', 'flask', 'fläskkorv', 'skinka', 'kassler', 'vildsvin'],
  extraAlcohol: ['snaps', 'brännvin', 'brannvin', 'akevitt', 'aquavit', 'glögg', 'glogg'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (const part of ['part1-1.mjs']) {
        const file = resolve(__dirname, dir, part);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('sweden-base-data');
    const expansion = await load('sweden-data');
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
