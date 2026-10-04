// Strict halal gate for the Greece kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Greece-specific pork (loukaniko, syglino,
// apaki) and alcohol (retsina, ouzo, metaxa) extras. Liver stays banned
// for Greece. Gyros and souvlaki are authored as halal chicken/lamb/beef.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Greek preparations intentionally excluded or materially altered to
// meet the strict ban list (pork/cured meats, wine/spirits, blood, liver).
const EXCLUDED_TRADITIONAL = [
  'gyros with pork', 'pork souvlaki', 'loukaniko', 'loukaniko sto fourno',
  'syglino', 'apaki', 'kokoretsi', 'splinantero', 'gardoumbes', 'tsigarides',
  'hirino me selino', 'brizola', 'spetzofai', 'soutzouki', 'kontosouvli',
  'gigantes me loukaniko', 'fasolada me loukaniko', 'kleftiko sto krasi',
  'stifado me krasato', 'moschari kokkinisto me krasi', 'octapodi sto krasi',
  'loukoumades me metaxa',
];

const scan = makeScan({
  extraPork: ['loukaniko', 'syglino', 'apaki', 'mortadella', 'chorizo'],
  extraAlcohol: [
    'retsina', 'ouzo', 'tsipouro', 'tsikoudia', 'raki', 'mavrodaphne',
    'metaxa', 'krasi', 'أوزو', 'ريتسينا',
  ],
  extraBlood: ['splinantero'],
  extraSausageTerms: ['loukaniko'],
  banLiver: true,
  extraLiver: ['kokoretsi', 'sykoti', 'fegato'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (let i = 1; i <= 2; i++) {
        const file = resolve(__dirname, dir, `part${i}.mjs`);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('greece-base-data');
    const expansion = await load('greece-data');
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
