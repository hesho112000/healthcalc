// Strict halal gate for the France kitchen. Coq au Vin is permitted only when
// the same title explicitly identifies grape juice as the wine replacement.
// Turkey bacon is permitted only as the named Quiche Lorraine substitution.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'bacon', 'lard', 'lardons', 'ham', 'jambon',
  'gammon', 'sausage', 'saucisse', 'saucisses', 'saucisson', 'salami', 'prosciutto', 'pancetta', 'chorizo',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vin', 'cognac', 'calvados', 'champagne', 'armagnac',
  'cider', 'cidre', 'beer', 'bière', 'biere', 'brandy', 'liqueur', 'liquor',
  'spirits', 'kir', 'pastis', 'vermouth', 'rhum', 'rum', 'eau-de-vie',
  'vin rouge', 'vin blanc', 'vin de cuisine', 'jus de vin',
  'كحول', 'خمر', 'نبيذ', 'براندي', 'شمبانيا',
];
const BLOOD = ['blood', 'blood sausage', 'boudin noir', 'boudin', 'sang', 'دم'];
const LIVER = ['liver', 'foie gras', 'foie', 'liver pâté', 'liver pate', 'كبد', 'كبدة'];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'lapin', 'lièvre', 'lievre', 'gibier',
  'chevreuil', 'faisan', 'pheasant', 'caille', 'quail', 'wild boar', 'sanglier',
  'grouse', 'bécasse', 'becasse', 'غزال', 'أرنب', 'خنزير بري',
];

// These classic preparations are intentionally excluded or materially altered
// to meet the strict ban list (pork, wine/spirits, blood, liver, and game).
const EXCLUDED_TRADITIONAL = [
  'confit de canard au saindoux', 'cassoulet au porc', 'saucisson sec', 'jambon-beurre',
  'quiche lorraine aux lardons', 'croque-monsieur au jambon', 'choucroute garnie',
  'petit salé aux lentilles', 'andouillette', 'boudin noir', 'foie gras',
  'pâté de campagne au porc', 'rillettes de porc', 'coq au vin classique',
  'bœuf bourguignon au vin rouge', 'daube provençale au vin', 'poulet au cognac',
  'crêpes flambées au calvados', 'tarte normande au calvados', 'baba au rhum',
  'poire belle-hélène au cognac', 'soupe au vin', 'lapin à la moutarde',
  'civet de lièvre', 'chevreuil sauce grand veneur', 'faisan rôti', 'caille farcie',
  'sanglier rôti', 'escargots au vin', 'moules marinières au vin blanc',
  'sauce marchand de vin', 'fondue au vin blanc', 'raclette aux lardons',
  'tartiflette aux lardons', 'aligot à la saucisse de porc', 'gratin aux lardons',
  'salade lyonnaise au lard', 'œufs en meurette au vin rouge', 'bœuf à la bière',
  'steak au poivre flambé au cognac', 'poulet basquaise au vin',
  'canard à l’orange au grand marnier', 'pruneaux à l’armagnac',
  'soupe à l’oignon au vin blanc', 'cassoulet au confit d’oie et saucisse',
  'pieds paquets au vin blanc', 'quenelles en sauce au vin',
  'tripes à la mode de Caen au cidre', 'cèpes flambés au cognac',
  'sorbet au champagne', 'gâteau au vin', 'pâté de foie', 'boudin blanc au porc',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

function scan(rows) {
  const problems = [];
  for (const row of rows) {
    const names = [row.nameAr, row.nameEn, row.nameFr, row.nameEs, row.nameDe].filter((v) => typeof v === 'string');
    for (const name of names) {
      for (const term of PORK) {
        if (!hasTerm(name, term)) continue;
        const halalSausage = ['sausage', 'saucisse', 'saucisses'].includes(term) &&
          /(?:halal duck and beef sausage|saucisse de bœuf halal|saucisse de boeuf halal)/i.test(name);
        if (halalSausage || (term === 'bacon' && /turkey bacon|bacon de dinde/i.test(name)) ||
            (term === 'jambon' && /dinde fumée|turkey/i.test(name))) continue;
        problems.push({ kind: 'pork', term, nameAr: row.nameAr, nameEn: row.nameEn });
      }
      for (const term of ALCOHOL) {
        if (!hasTerm(name, term)) continue;
        const grapeJuiceSubstitution = /grape juice|jus de raisin|zumo de uva|traubensaft/i.test(name);
        if (term === 'vin' && grapeJuiceSubstitution) continue;
        const negatedWine = (term === 'wine' || term.startsWith('vin')) &&
          /\b(?:no|without|sans|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vin)\b/i.test(name);
        if (negatedWine) continue;
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
    const base = await load('france-base-data');
    const expansion = await load('france-data');
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
