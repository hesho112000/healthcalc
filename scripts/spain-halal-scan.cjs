// Strict halal gate for the Spain kitchen. Wine-braised classics (Zarzuela,
// Rabo de Toro, Salsa Verde) are permitted only when the same title explicitly
// states the non-alcoholic substitution. Cured-pork classics (Fabada, Cocido,
// Callos) are permitted only as named halal-beef versions with no pork mention.
const PORK = [
  'pork', 'pig', 'porc', 'porcine', 'cerdo', 'jamón', 'jamon', 'chorizo',
  'lomo', 'panceta', 'pancetta', 'morcilla', 'tocino', 'lard', 'lardo',
  'manteca', 'sobrasada', 'butifarra', 'chicharrón', 'chicharron', 'cochinillo',
  'salchichón', 'salchichon', 'fuet', 'lacón', 'lacon', 'bacon', 'ham',
  'jambon', 'speck', 'salami', 'salame', 'sausage', 'salchicha', 'saucisse',
  'wurst', 'prosciutto', 'guanciale', 'schinken',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'جامبون', 'شوريزو', 'لحم مقدد',
];
const ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'rioja', 'sherry', 'jerez',
  'sangria', 'cava', 'brandy', 'coñac', 'cognac', 'rum', 'ron', 'liqueur',
  'licor', 'liquor', 'vermut', 'vermouth', 'cerveza', 'beer', 'sidra', 'cider',
  'txakoli', 'txacoli', 'albariño', 'albarino', 'fino', 'manzanilla',
  'amontillado', 'oloroso', 'moscatel',
  'كحول', 'خمر', 'نبيذ',
];
const BLOOD = [
  'blood', 'blood sausage', 'morcilla', 'sangre', 'sang', 'boudin',
  'black pudding', 'blutwurst', 'دم',
];
const LIVER = [
  'liver', 'hígado', 'higado', 'foie', 'foie gras', 'leber', 'كبد', 'كبدة',
];
const GAME = [
  'game', 'game meat', 'venison', 'rabbit', 'hare', 'conejo', 'liebre', 'lapin',
  'lièvre', 'lievre', 'perdiz', 'partridge', 'codorniz', 'quail', 'pheasant',
  'faisán', 'faisan', 'venado', 'ciervo', 'jabalí', 'jabali', 'wild boar',
  'boar', 'sanglier', 'caza', 'gibier',
  'غزال', 'أرنب', 'خنزير بري',
];

// Classic Spanish preparations intentionally excluded or materially altered to
// meet the strict ban list (pork/cured meats, wine/sherry, blood, liver, game).
const EXCLUDED_TRADITIONAL = [
  'jamón ibérico de bellota', 'jamón serrano con pan', 'jamón con melón',
  'croquetas de jamón', 'huevos rotos con jamón', 'salmorejo con jamón',
  'flamenquín cordobés', 'lomo en manteca', 'chorizo a la sidra',
  'chorizo al vino tinto', 'morcilla de burgos', 'morcilla con arroz',
  'butifarra amb mongetes', 'sobrasada con miel', 'cochinillo de segovia',
  'lacón con grelos', 'panceta a la brasa', 'chicharrones de cádiz',
  'callos con chorizo y morcilla', 'fabada con chorizo y morcilla',
  'cocido madrileño con tocino', 'lentejas con chorizo',
  'alubias de tolosa con sacramento', 'migas con chorizo',
  'caldo gallego con unto', 'empanada de lomo', 'pollo al ajillo al vino',
  'rabo de toro al vino tinto', 'carrilleras al vino tinto',
  'mejillones al vino blanco', 'almejas a la marinera al vino',
  'merluza en salsa verde al vino', 'zarzuela al brandy',
  'peras al vino tinto', 'sorbete de cava', 'sangría clásica',
  'tinto de verano', 'torrijas al vino', 'bizcochos borrachos',
  'conejo al ajillo', 'perdiz estofada', 'codornices a la plancha',
  'jabalí estofado', 'faisán asado', 'hígado encebollado',
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'chorizo', 'wurst']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'jamón', 'jamon', 'speck', 'pancetta', 'panceta', 'prosciutto', 'guanciale']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|sherry|jerez|brandy|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

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
    const base = await load('spain-base-data');
    const expansion = await load('spain-data');
    const problems = scan([...base, ...expansion]);
    console.log(`base rows scanned: ${base.length}`);
    console.log(`expansion rows scanned: ${expansion.length}`);
    console.log(`total rows authored: ${base.length + expansion.length}`);
    console.log(`traditional high-risk dishes excluded or altered: ${EXCLUDED_TRADITIONAL.length}`);
    console.log(`halal violations: ${problems.length}`);
    for (const p of problems) console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    if (base.length !== 125 || expansion.length !== 125 || problems.length) process.exitCode = 1;
    else console.log('\nCLEAN: 0 halal violations');
  };
  run().catch((error) => { console.error(error); process.exitCode = 1; });
}
