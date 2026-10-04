// Strict halal gate for the Finland kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Finland-specific pork (sianliha, possu,
// kinkku) and alcohol (olut, viini, glögi, sahti, sima) extras. Game meats
// (reindeer, elk, hare, grouse) are halal and ALLOWED. Karelian stew is
// authored as a halal beef-lamb version.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Finnish preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/sianliha/kinkku, olut/viini/glögi/sahti,
// blood).
const EXCLUDED_TRADITIONAL = [
  'kinkku (Christmas ham)', 'porsaan ulkofilee', 'sianlihakastike',
  'possunleikke', 'sahtiliha', 'olut-braised meat',
  'glögi-poached fruit', 'sima (mead)', 'veripalttu (blood pudding)',
];

const scan = makeScan({
  extraPork: ['sianliha', 'possu', 'kinkku', 'pepperkinkku', 'kassler', 'schwarzwälder'],
  extraAlcohol: ['olut', 'viini', 'glögi', 'glogi', 'kossu', 'sima', 'sahti', 'kotikalja'],
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (const part of ['part1-1.mjs', 'part1-2.mjs', 'part1-3.mjs', 'part1-4.mjs', 'part2-1.mjs', 'part2-2.mjs', 'part2-3.mjs', 'part2-4.mjs', 'part3-1.mjs', 'part3-2.mjs', 'part3-3.mjs', 'part3-4.mjs', 'part4-1.mjs', 'part4-2.mjs']) {
        const file = resolve(__dirname, dir, part);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('finland-base-data');
    const expansion = await load('finland-data');
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
