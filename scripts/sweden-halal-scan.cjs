// Strict halal gate for the Sweden kitchen. Pork (fläsk, skinka, kassler)
// and wild boar (vildsvin) are banned. Game meats (reindeer, elk, moose,
// deer) are halal when properly slaughtered and are ALLOWED. Blood
// (blodpudding) and alcohol (snaps, brännvin, glögg, wine sauces) are banned.
// Köttbullar are authored as halal-beef versions.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'fläsk', 'flask', 'fläskkorv',
  'skinka', 'kassler', 'bacon', 'spekk', 'ham', 'jambon', 'salami',
  'salame', 'sausage', 'saucisse', 'salchicha', 'wurst', 'prosciutto',
  'guanciale', 'pancetta', 'lard', 'lardo',
  'vildsvin', 'wild boar', 'boar', 'sanglier', 'jabalí', 'jabali',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'خنزير بري', 'جامبون', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'øl', 'öl', 'beer', 'snaps',
  'brännvin', 'brannvin', 'akevitt', 'aquavit', 'brandy', 'cognac', 'rum',
  'liqueur', 'licor', 'liquor', 'vermut', 'vermouth', 'cider', 'whisky',
  'whiskey', 'vodka', 'glögg', 'glogg',
  'كحول', 'خمر', 'نبيذ',
];
const BLOOD = [
  'blood', 'blood sausage', 'blod', 'blodpudding', 'blodpølse', 'morcilla',
  'sangre', 'sang', 'boudin', 'black pudding', 'دم',
];
// Classic Swedish preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/fläsk/vildsvin, snaps/vin, blood).
const EXCLUDED_TRADITIONAL = [
  'julskinka (Christmas ham)', 'fläskkorv (pork sausage)', 'kassler',
  'raggmunk med fläsk', 'vildsvinsgryta (wild boar stew)',
  'blodpudding (blood pudding)', 'snapsmarinerad sill',
  'stekt fisk i ölsmet', 'köttgryta med rödvin',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'spekk', 'pancetta', 'prosciutto', 'guanciale']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|øl|öl|beer|snaps|brännvin|akevitt|brandy|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

function scan(rows) {
  const problems = [];
  for (const row of rows) {
    const names = [row.nameAr, row.nameEn, row.nameFr, row.nameEs, row.nameDe].filter((v) => typeof v === 'string');
    for (const name of names) {
      for (const term of PORK) {
        if (!hasTerm(name, term)) continue;
        if (SAUSAGE_TERMS.has(term) && /halal/i.test(name)) continue;
        if (CURING_TERMS.has(term) && /turkey|dinde|pavo|pute|halal/i.test(name)) continue;
        problems.push({ kind: 'pork', term, nameAr: row.nameAr, nameEn: row.nameEn });
      }
      for (const term of ALCOHOL) {
        if (!hasTerm(name, term)) continue;
        if (NEGATED_ALCOHOL.test(name)) continue;
        problems.push({ kind: 'alcohol', term, nameAr: row.nameAr, nameEn: row.nameEn });
      }
      for (const term of BLOOD) {
        if (hasTerm(name, term)) problems.push({ kind: 'blood', term, nameAr: row.nameAr, nameEn: row.nameEn });
      }
    }
  }
  return problems;
}

module.exports = { scan, PORK, ALCOHOL, BLOOD, EXCLUDED_TRADITIONAL };

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
