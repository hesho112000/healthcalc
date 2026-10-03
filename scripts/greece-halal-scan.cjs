// Strict halal gate for the Greece kitchen. Gyros and souvlaki are authored as
// halal chicken/lamb/beef versions only; wine-braised classics are permitted
// only when the same title explicitly states the non-alcoholic substitution.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'cerdo', 'loukaniko', 'syglino', 'apaki',
  'pancetta', 'bacon', 'ham', 'jambon', 'speck', 'salami', 'salame', 'sausage',
  'salchicha', 'saucisse', 'wurst', 'prosciutto', 'chorizo', 'guanciale',
  'lard', 'lardo', 'mortadella', 'schinken',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'retsina', 'ouzo', 'tsipouro',
  'tsikoudia', 'raki', 'mavrodaphne', 'metaxa', 'krasi', 'brandy', 'cognac',
  'rum', 'liqueur', 'liquor', 'beer', 'cerveza',
  'كحول', 'خمر', 'نبيذ', 'أوزو', 'ريتسينا',
];
const BLOOD = [
  'blood', 'blood sausage', 'splinantero', 'sang', 'sangre', 'boudin',
  'black pudding', 'morcilla', 'blutwurst', 'دم',
];
const LIVER = [
  'liver', 'kokoretsi', 'sykoti', 'foie', 'foie gras', 'hígado', 'higado',
  'leber', 'fegato', 'كبد', 'كبدة',
];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'kouneli', 'lagos',
  'wild boar', 'boar', 'venado', 'conejo', 'liebre', 'caza', 'gibier', 'lapin',
  'lièvre', 'lievre', 'quail', 'pheasant', 'sanglier',
  'غزال', 'أرنب', 'خنزير بري',
];

// Classic Greek preparations intentionally excluded or materially altered to
// meet the strict ban list (pork/cured meats, wine/spirits, blood, liver, game).
const EXCLUDED_TRADITIONAL = [
  'gyros with pork', 'pork souvlaki', 'loukaniko', 'loukaniko sto fourno',
  'syglino', 'apaki', 'kokoretsi', 'splinantero', 'gardoumbes', 'tsigarides',
  'hirino me selino', 'brizola', 'spetzofai', 'soutzouki', 'kontosouvli',
  'gigantes me loukaniko', 'fasolada me loukaniko', 'kleftiko sto krasi',
  'stifado me krasato', 'moschari kokkinisto me krasi', 'octapodi sto krasi',
  'loukoumades me metaxa',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'loukaniko', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'speck', 'pancetta', 'prosciutto']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|retsina|ouzo|brandy|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

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
