// Strict halal gate for the Turkey kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Turkey-specific pork (domuz) and alcohol
// (rakı, şarap, bira, boza) extras. Sucuk and pastırma are permitted only
// as named halal-beef versions. Liver (ciğer) is halal and allowed.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Turkish preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/domuz, rakı/şarap/bira/boza, blood).
const EXCLUDED_TRADITIONAL = [
  'domuz eti kebabı', 'domuz pastırmalı pide', 'domuz sucuklu yumurta',
  'domuz jambonlu börek', 'şarap soslu tavuk', 'şarap soslu dana antrikot',
  'şaraplı mantar sote', 'şaraplı midye', 'şarap ciğeri sote',
  'rakı sofrası meze tabağı', 'rakı aromalı balık buğulama',
  'bira hamurunda balık', 'boza içeceği', 'kan sucuğu ızgara',
  'viskili kek',
];

const scan = makeScan({
  extraPork: ['domuz', 'domuz eti'],
  extraAlcohol: ['şarap', 'sarap', 'rakı', 'raki', 'boza', 'عرق'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (let i = 1; i <= 5; i++) {
        const file = resolve(__dirname, dir, `part${i}.mjs`);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('turkey-base-data');
    const expansion = await load('turkey-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 250 || expansion.length !== 250 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
