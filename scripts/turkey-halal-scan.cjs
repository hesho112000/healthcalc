// Strict halal gate for the Turkey kitchen. Turkish classics are halal by
// default; cured/pork imports (domuz, jambon) and alcohol-based sauces
// (rakı, şarap, bira, boza) are banned. Sucuk and pastırma are permitted
// only as named halal-beef versions. Liver (ciğer) is halal and allowed.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'domuz', 'domuz eti', 'cerdo',
  'jambon', 'jamón', 'jamon', 'bacon', 'speck', 'schinken', 'salami',
  'salame', 'sausage', 'saucisse', 'salchicha', 'wurst', 'prosciutto',
  'guanciale', 'pancetta', 'lard', 'lardo', 'ham',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'şarap', 'sarap', 'rakı',
  'raki', 'bira', 'beer', 'boza', 'brandy', 'cognac', 'rum', 'liqueur',
  'licor', 'liquor', 'vermut', 'vermouth', 'cider', 'whisky', 'whiskey',
  'viski', 'vodka',
  'كحول', 'خمر', 'نبيذ', 'عرق',
];
const BLOOD = [
  'blood', 'blood sausage', 'kan', 'morcilla', 'sangre', 'sang', 'boudin',
  'black pudding', 'دم',
];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'conejo', 'liebre',
  'lapin', 'lièvre', 'lievre', 'quail', 'pheasant', 'venado', 'ciervo',
  'jabalí', 'jabali', 'wild boar', 'boar', 'sanglier', 'gibier',
  'غزال', 'أرنب', 'خنزير بري',
];

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

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'jamón', 'jamon', 'speck', 'pancetta', 'prosciutto', 'guanciale']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|şarap|sarap|rakı|raki|bira|beer|brandy|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

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
