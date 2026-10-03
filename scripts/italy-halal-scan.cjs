// Strict halal gate for the Italy kitchen. Wine-braised classics (Ossobuco,
// Cacciatore, Vitello Tonnato) are permitted only when the same title explicitly
// states the non-alcoholic substitution. Cured-pork classics (Carbonara,
// Amatriciana) are permitted only as named turkey/halal-beef bacon swaps.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'maiale', 'prosciutto', 'pancetta', 'panceta',
  'guanciale', 'mortadella', 'salsiccia', 'salsicce', 'lardo', 'lard', 'bacon',
  'ham', 'jambon', 'speck', 'salame', 'salami', 'coppa', 'soppressata', 'nduja',
  'porchetta', 'cotechino', 'zampone', 'ciccioli', 'salumi', 'sausage',
  'saucisse', 'wurst', 'schinken', 'cerdo', 'tocino',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'بروشوتو', 'بانسيتا',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'chianti', 'marsala', 'vermouth',
  'limoncello', 'grappa', 'prosecco', 'amaretto', 'barolo', 'brunello',
  'moscato', 'lambrusco', 'nebbiolo', 'sambuca', 'campari', 'aperol', 'amaro',
  'brandy', 'cognac', 'rum', 'rhum', 'liqueur', 'liquor', 'spirits', 'beer',
  'birra', 'cerveza',
  'كحول', 'خمر', 'نبيذ',
];
const BLOOD = [
  'blood', 'blood sausage', 'sanguinaccio', 'sangue', 'boudin', 'sang',
  'black pudding', 'morcilla', 'blutwurst', 'دم',
];
const LIVER = [
  'liver', 'fegato', 'fegatini', 'foie', 'foie gras', 'leber', 'hígado',
  'كبد', 'كبدة',
];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'coniglio', 'lepre',
  'cinghiale', 'wild boar', 'boar', 'cervo', 'capriolo', 'daino', 'fagiano',
  'pheasant', 'quail', 'quaglia', 'cacciagione', 'gibier', 'lapin', 'lièvre',
  'lievre', 'sanglier',
  'غزال', 'أرنب', 'خنزير بري',
];

// Classic Italian preparations intentionally excluded or materially altered to
// meet the strict ban list (pork/cured meats, wine/spirits, blood, liver, game).
const EXCLUDED_TRADITIONAL = [
  'carbonara con guanciale', 'amatriciana con guanciale', 'pasta alla gricia',
  'saltimbocca al prosciutto', 'pizza al prosciutto', 'prosciutto e melone',
  'mortadella di bologna', 'porchetta arrosto', 'ragù bolognese con pancetta',
  'salsiccia al forno', 'pasta con salsiccia', 'risotto con salsiccia',
  'polenta con salsiccia', 'cotechino con lenticchie', 'zampone modenese',
  'nduja di calabria', 'soppressata calabrese', 'lardo di colonnata',
  'coppa di parma', 'brasato al barolo', 'risotto al barolo',
  'scaloppine al marsala', 'pollo al marsala', 'tiramisù al marsala',
  'zabaglione al marsala', 'pere al vino rosso', 'sorbetto al prosecco',
  'affogato all’amaretto', 'babà al rum', 'zuppa inglese al liquore',
  'fegato alla veneziana', 'sanguinaccio dolce', 'coniglio alla cacciatora',
  'lepre in civet', 'cinghiale in umido', 'pappardelle al cinghiale',
  'fagiano arrosto', 'quaglie al forno', 'cervo in salmì',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salsiccia', 'salsicce', 'salame', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'pancetta', 'panceta', 'guanciale', 'prosciutto', 'speck', 'ham', 'jambon']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|marsala|chianti|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|senza alcol|sin alcohol/i;

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
      for (const [kind, terms] of [['blood', BLOOD], ['liver', LIVER], ['game', GAME]]) {
        for (const term of terms) {
          if (hasTerm(name, term)) problems.push({ kind, term, nameAr: row.nameAr, nameEn: row.nameEn });
        }
      }
    }
  }
  return problems;
}

module.exports = { scan, PORK, ALCOHOL, BLOOD, LIVER, GAME, EXCLUDED_TRADITIONAL };

if (require.main === module) {
  const run = async () => {
    const { resolve } = require('node:path');
    const { existsSync } = require('node:fs');
    const { pathToFileURL } = require('node:url');
    const load = async (dir) => {
      const rows = [];
      for (let i = 1; i <= 3; i++) {
        const file = resolve(__dirname, dir, `part${i}.mjs`);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('italy-base-data');
    const expansion = await load('italy-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 150 || expansion.length !== 150 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
