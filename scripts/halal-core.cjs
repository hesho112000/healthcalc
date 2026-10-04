// Shared halal rules for all kitchen scanners (spain, greece, turkey, norway,
// sweden, ...). Game meats (reindeer, elk, moose, deer, rabbit, grouse,
// whale) are halal when properly slaughtered and are NOT banned. Wild boar
// is pig-family and IS banned via CORE_PORK. Kitchen scanners add their own
// locale-specific terms via makeScan extras.

const CORE_PORK = [
  'pork', 'pig', 'porc', 'porcine', 'cerdo', 'bacon', 'ham', 'jambon',
  'jamón', 'jamon', 'speck', 'spekk', 'schinken', 'salami', 'salame',
  'sausage', 'saucisse', 'salchicha', 'wurst', 'prosciutto', 'guanciale',
  'pancetta', 'panceta', 'lard', 'lardo',
  'boar', 'wild boar', 'sanglier', 'jabalí', 'jabali',
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'خنزير بري', 'جامبون', 'لحم مقدد',
];
const CORE_ALCOHOL = [
  'alcohol', 'wine', 'vino', 'vin', 'wein', 'øl', 'öl', 'beer', 'bira',
  'cerveza', 'brandy', 'cognac', 'coñac', 'rum', 'ron', 'liqueur', 'licor',
  'liquor', 'vermut', 'vermouth', 'cider', 'sidra', 'whisky', 'whiskey',
  'viski', 'vodka',
  'كحول', 'خمر', 'نبيذ',
];
const CORE_BLOOD = [
  'blood', 'blood sausage', 'kan', 'morcilla', 'sangre', 'sang', 'boudin',
  'black pudding', 'blod', 'blodpudding', 'blodpølse', 'blutwurst', 'دم',
];
const CORE_LIVER = [
  'liver', 'hígado', 'higado', 'foie', 'foie gras', 'leber', 'كبد', 'كبدة',
];

// Documented as halal (properly slaughtered); NOT part of any ban list.
const ALLOWED_GAME_MEATS = ['reindeer', 'elk', 'moose', 'deer', 'rabbit', 'grouse', 'whale'];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasTerm = (text, term) => new RegExp(`(^|[^\\p{L}])${escape(term)}(?=$|[^\\p{L}])`, 'iu').test(text);

const SAUSAGE_TERMS = new Set(['sausage', 'saucisse', 'salchicha', 'chorizo', 'wurst', 'loukaniko']);
const CURING_TERMS = new Set(['bacon', 'ham', 'jambon', 'jamón', 'jamon', 'speck', 'spekk', 'pancetta', 'panceta', 'prosciutto', 'guanciale']);
const NEGATED_ALCOHOL = /\b(?:no|without|sans|senza|sin|ohne)\s+(?:(?:red|white)\s+)?(?:wine|vino|vin|wein|øl|öl|beer|bira|cerveza|şarap|sarap|rakı|raki|boza|snaps|brännvin|akevitt|aquavit|brandy|jerez|sherry|cava|retsina|ouzo|alcohol)\b|non[-\s]?alcoholic|alcohol[-\s]?free|sin alcohol/i;

// Builds a kitchen scanner: core bans + kitchen-specific extras.
function makeScan({ extraPork = [], extraAlcohol = [], extraBlood = [], extraSausageTerms = [], banLiver = false, extraLiver = [] } = {}) {
  const PORK = [...CORE_PORK, ...extraPork];
  const ALCOHOL = [...CORE_ALCOHOL, ...extraAlcohol];
  const BLOOD = [...CORE_BLOOD, ...extraBlood];
  const LIVER = banLiver ? [...CORE_LIVER, ...extraLiver] : [];
  const sausageTerms = new Set([...SAUSAGE_TERMS, ...extraSausageTerms]);
  return function scan(rows) {
    const problems = [];
    for (const row of rows) {
      const names = [row.nameAr, row.nameEn, row.nameFr, row.nameEs, row.nameDe].filter((v) => typeof v === 'string');
      for (const name of names) {
        for (const term of PORK) {
          if (!hasTerm(name, term)) continue;
          if (sausageTerms.has(term) && /halal/i.test(name)) continue;
          if (CURING_TERMS.has(term) && /turkey|dinde|pavo|pute|halal/i.test(name)) continue;
          problems.push({ kind: 'pork', term, nameAr: row.nameAr, nameEn: row.nameEn });
        }
        for (const term of ALCOHOL) {
          if (!hasTerm(name, term)) continue;
          if (NEGATED_ALCOHOL.test(name)) continue;
          problems.push({ kind: 'alcohol', term, nameAr: row.nameAr, nameEn: row.nameEn });
        }
        for (const [kind, terms] of [['blood', BLOOD], ['liver', LIVER]]) {
          for (const term of terms) {
            if (hasTerm(name, term)) problems.push({ kind, term, nameAr: row.nameAr, nameEn: row.nameEn });
          }
        }
      }
    }
    return problems;
  };
}

module.exports = {
  CORE_PORK, CORE_ALCOHOL, CORE_BLOOD, CORE_LIVER, ALLOWED_GAME_MEATS,
  SAUSAGE_TERMS, CURING_TERMS, NEGATED_ALCOHOL, hasTerm, makeScan,
};
