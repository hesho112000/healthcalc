// Strict halal gate for the Norway kitchen. Norwegian classics are largely
// halal (fish, lamb), but cured pork (svin, bacon, medisterkaker), game
// (reindeer, elk, moose, whale, grouse), blood (blodpølse) and alcohol
// (akevitt, øl, wine sauces) are banned.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'svin', 'svinekjøtt', 'svineknoke',
  'bacon', 'spekk', 'ham', 'jambon', 'salami', 'salame', 'sausage',
  'saucisse', 'salchicha', 'wurst', 'prosciutto', 'guanciale', 'pancetta',
  'lard', 'lardo', 'medisterkaker', 'ribbe',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'øl', 'beer', 'akevitt',
  'aquavit', 'brandy', 'cognac', 'rum', 'liqueur', 'licor', 'liquor',
  'vermut', 'vermouth', 'cider', 'whisky', 'whiskey', 'vodka', 'gløgg',
  'كحول', 'خمر', 'نبيذ',
];
const BLOOD = [
  'blood', 'blood sausage', 'blod', 'blodpølse', 'morcilla', 'sangre',
  'sang', 'boudin', 'black pudding', 'دم',
];
const GAME = [
  'game', 'game meat', 'venison', 'reindeer', 'reinsdyr', 'moose', 'elg',
  'elk', 'deer', 'hjort', 'rådyr', 'grouse', 'ptarmigan', 'rype', 'hare',
  'rabbit', 'wild boar', 'boar', 'sanglier', 'whale', 'hval', 'hvalkjøtt',
  'gibier', 'غزال', 'أرنب', 'حوت',
];

// Classic Norwegian preparations intentionally excluded or materially altered
// to meet the strict ban list (pork/svin, akevitt/øl/wine, blood, game).
const EXCLUDED_TRADITIONAL = [
  'ribbe (pork belly)', 'svinestek', 'medisterkaker (pork patties)',
  'svinekoteletter', 'reinsdyrstek (reindeer roast)', 'elgbiff (elk steak)',
  'hjortegryte (venison stew)', 'hvalbiff (whale steak)', 'rypestekt (grouse)',
  'blodpølse (blood sausage)', 'akevittmarinert laks', 'øl-batter torsk',
  'kjøtt i vinsaus',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'spekk', 'pancetta', 'prosciutto', 'guanciale']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|øl|beer|akevitt|aquavit|brandy|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

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
      for (const [kind, terms] of [['blood', BLOOD], ['game', GAME]]) {
        for (const term of terms) {
          if (hasTerm(name, term)) problems.push({ kind, term, nameAr: row.nameAr, nameEn: row.nameEn });
        }
      }
    }
  }
  return problems;
}

module.exports = { scan, PORK, ALCOHOL, BLOOD, GAME, EXCLUDED_TRADITIONAL };

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
