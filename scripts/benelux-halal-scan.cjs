// Strict halal gate for the Benelux kitchen (Belgium + Netherlands + Luxembourg).
// Beer-braised classics (Carbonnade, Stoofvlees) are permitted only when the
// same title explicitly states the non-alcoholic substitution. Ham/bacon
// classics are permitted only as named smoked-turkey or halal-beef swaps.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'bacon', 'lard', 'lardons', 'ham', 'jambon',
  'spek', 'spekjes', 'varken', 'varkensvlees', 'gammon', 'sausage', 'saucisse',
  'saucisses', 'saucisson', 'salami', 'prosciutto', 'pancetta', 'chorizo',
  'worst', 'wurst', 'rookworst', 'metworst', 'leverworst', 'beenham', 'schinken',
  'schwein', 'speck', 'cerdo', 'jamón', 'jamon', 'tocino',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vin', 'vino', 'wein', 'beer', 'bier', 'bière', 'biere',
  'cerveza', 'ale', 'stout', 'porter', 'pils', 'lager', 'tripel', 'dubbel',
  'trappist', 'lambic', 'lambiek', 'gueuze', 'geuze', 'kriek', 'jenever',
  'genever', 'genièvre', 'advocaat', 'riesling', 'cider', 'cidre', 'champagne',
  'cognac', 'brandy', 'rum', 'rhum', 'liqueur', 'liquor', 'spirits', 'porto',
  'sherry', 'marsala', 'eau-de-vie',
  'كحول', 'خمر', 'نبيذ', 'بيرة', 'جعة', 'جنيفر',
];
const BLOOD = [
  'blood', 'blood sausage', 'boudin', 'boudin noir', 'bloedworst', 'bloed',
  'beuling', 'balkenbrij', 'sang', 'black pudding', 'morcilla', 'blutwurst', 'دم',
];
const LIVER = [
  'liver', 'lever', 'leverpastei', 'foie', 'foie gras', 'leber', 'hígado',
  'كبد', 'كبدة',
];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'konijn', 'lapin', 'lièvre',
  'lievre', 'gibier', 'chevreuil', 'faisan', 'pheasant', 'caille', 'quail',
  'wild boar', 'sanglier', 'haas', 'hase', 'conejo', 'ciervo', 'reh', 'partridge',
  'perdreau', 'perdrix', 'bécasse', 'becasse', 'fazant',
  'غزال', 'أرنب', 'أيل', 'خنزير بري',
];

// Classic Benelux preparations intentionally excluded or materially altered to
// meet the strict ban list (pork, beer/wine/spirits, blood, liver, and game).
const EXCLUDED_TRADITIONAL = [
  'carbonnade flamande à la bière', 'stoofvlees met bier', 'lapin à la gueuze',
  'konijn in geuze', 'konijn met pruimen', 'judd mat gaardebounen', 'träipen',
  'boudin noir aux pommes', 'bloedworst met appel', 'beuling', 'balkenbrij',
  'leverpastei op brood', 'broodje leverpastei', 'pâté de foie de porc',
  'pâté de campagne ardennais', 'rillettes de porc', 'jambon d’ardenne',
  'chicons au jambon', 'asperges au jambon', 'asperges met ham',
  'uitsmijter ham kaas', 'croquettes au jambon', 'broodje beenham',
  'stamppot met rookworst', 'zuurkool met worst', 'boerenkool met worst',
  'erwtensoep met rookworst', 'snert met katenspek', 'andijvie met spekjes',
  'zuurkool met spek', 'slavink', 'frikandel speciaal', 'metworst',
  'droge worst', 'leverworst', 'hoofdkaas', 'kromeski au porc',
  'moules à la bière', 'mosselen in trappist', 'soupe à la bière',
  'welsh à la bière', 'fondue à la bière', 'coq à la bière',
  'poulet à la kriek', 'canard à la kriek', 'cerises pochées à la kriek',
  'stoofpeertjes in rode wijn', 'hong am rèisleck', 'rieslingspaschtéit',
  'wäinzoossiss', 'blanquette au vin blanc', 'moules au vin blanc',
  'sauce marchand de vin', 'boerenjongens', 'boerenmeisjes', 'pralines au rhum',
  'gâteau au jenever', 'sorbet au champagne', 'advocaat glacé',
  'civet de sanglier', 'wild zwijn stoofpot', 'civet de lièvre',
  'hazenpeper', 'haas met pruimen', 'faisan rôti', 'caille aux raisins',
  'perdreau au chou', 'bécasse au vin', 'fazant in de oven',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set([
  'sausage', 'saucisse', 'saucisses', 'saucisson', 'worst', 'wurst',
  'rookworst', 'metworst', 'leverworst',
]);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|sin|ohne|zonder)\s+(?:(?:red|white|rosé)\s+)?(?:beer|bier|bière|biere|cerveza|ale|stout|wine|vin|vino|wein|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sans alcool|sin alcohol|alkoholfrei|zonder alcohol/i;

function scan(rows) {
  const problems = [];
  for (const row of rows) {
    const names = [row.nameAr, row.nameEn, row.nameFr, row.nameEs, row.nameDe].filter((v) => typeof v === 'string');
    for (const name of names) {
      for (const term of PORK) {
        if (!hasTerm(name, term)) continue;
        if (SAUSAGE_TERMS.has(term) && /halal/i.test(name)) continue;
        if ((term === 'bacon' || term === 'ham' || term === 'jambon' || term === 'spek') &&
            /turkey|dinde|pavo|pute/i.test(name)) continue;
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
      for (let i = 1; i <= 4; i++) {
        const file = resolve(__dirname, dir, `part${i}.mjs`);
        if (!existsSync(file)) throw new Error(`Missing ${file}`);
        rows.push(...(await import(pathToFileURL(file).href)).default);
      }
      return rows;
    };
    const base = await load('benelux-base-data');
    const expansion = await load('benelux-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 200 || expansion.length !== 200 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
