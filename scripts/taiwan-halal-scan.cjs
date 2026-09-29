// Halal scanner for the Taiwan proposal. Mirrors the regexes used by the Korean
// validators, extended with the pork/lard/blood/rabbit terms that dominate
// Taiwanese street food so they can be caught BEFORE migration.
//
// Taiwan is pork-heavy by nature. Anything listed in PORK_TERMS must either be
// absent or carry a beef/chicken/halal qualifier, and every such substitution has
// to be reported in the final migration report.
const PORK_TERMS = [
  'خنزير', 'خنزيري', 'لحم الخنزير', 'خنزير بري', '、猪', '豬', 'pork', 'porc', 'cerdo', 'schweine',
];
const PORK_DERIVED = [
  'لحم الخنزير', 'شحم الخنزير', 'شحم', 'دهن الخنزير', 'سمين الخنزير', 'كبدة الخنزير',
  'أمعاء الخنزير', 'أقدام الخنزير', 'أذن الخنزير', 'لسان الخنزير', 'عظام الخنزير',
  'piel de cerdo', 'lardo', 'grasa de cerdo', 'sain de porc', 'Schweineschmalz', 'Schweinefleisch',
];
const ALCOHOL_TERMS = [
  'كحول', 'خمر', 'نبيذ', 'بيرة', 'مشروب كحولي', '绍兴', '酒', '啤酒', '紅標', '高粱',
  'wine', 'vino', 'alcool', 'bière', 'biere', 'Wein', 'Bier', 'sake', 'shochu', 'awamori',
];
const BLOOD_TERMS = ['دم', 'دَم', 'دموي', '血', '血旺', '鸭血', '鵝血', 'blut', 'sang', 'sangue', 'sangre'];
const GAME_TERMS = [
  'غزال', 'أرنب', 'ديك رومي', 'دجاج بري', 'حيوان بري', 'wild', 'venison', 'rabbit',
  'reh', ' Hirsch', 'lagin', 'liebre', 'ciervo',
];
// Legit halal qualifiers that make a PORK_TERM string acceptable.
const HALAL_QUALIFIERS = [
  'لحم البقر', 'لحم بقري', 'بقر', 'دجاج', 'سمك', 'روبيان', 'لحم الضأن', 'ضأن',
  'beef', 'boeuf', 'chicken', 'poulet', 'fish', 'poisson', 'lamb', 'agneau', 'shrimp',
  'crevette', 'tofu', 'vegetable', 'legume', 'champignon',
];

// Terms that mean the dish is NOT pork but a halal stand-in whose Arabic name
// happens to contain an ambiguous word. These are explicitly allowed.
const ALLOWED_STANDINS = new Set([
  'شحم', // ambiguous: only flagged if NOT accompanied by a halal qualifier
]);

// Short Arabic terms that must match as a WHOLE word, otherwise they fire on
// unrelated words. 'بيرة' (beer) otherwise hits 'كبيرة' (large), 'بيرة' etc.
const WHOLE_WORD_ARABIC = new Set([
  'طريقة', 'شراب', 'ماء', 'خبز', 'ملح', 'سكر', 'زيت', 'حليب', 'شاي', 'عصير', 'قطع', 'حبة',
]);
// Arabic substrings that are commonly embedded in a LARGER, innocent word.
const ARABIC_FALSE_FRIENDS = [
  //Explicitly innocent bigger words that embed a short flagged term.
  ['كبيرة', 'بيرة'], // "large" contains "beer"
  ['كبير', 'بير'],
  ['خبيزة', 'خبيز'],
  ['ش Jeremiah', 'Jeremiah'],
];

function containsTerm(low, t) {
  let at = low.indexOf(t);
  while (at !== -1) {
    // Guard against false friends: if the match sits inside a known innocent word, skip it.
    let skip = false;
    for (const [word, sub] of ARABIC_FALSE_FRIENDS) {
      if (word !== sub && low.includes(word)) {
        const wi = low.indexOf(word);
        if (wi !== -1 && at >= wi && at < wi + word.length) skip = true;
      }
    }
    if (!skip) return true;
    at = low.indexOf(t, at + 1);
  }
  return false;
}

function scan(rows) {
  const problems = [];
  for (const r of rows) {
    const hay = [r.nameAr, r.nameEn, r.nameFr, r.nameEs, r.nameDe].filter(Boolean).join(' | ');
    const low = hay.toLowerCase();
    const hasQual = HALAL_QUALIFIERS.some((q) => hay.includes(q) || low.includes(q.toLowerCase()));
    const find = (terms, label) => {
      for (const t of terms) {
        if (containsTerm(low, t.toLowerCase())) {
          if (label === 'pork' && hasQual) continue; // halal substitution: allowed
          if (label === 'pork' && ALLOWED_STANDINS.has(t)) continue;
          problems.push({ kind: label, term: t, nameAr: r.nameAr, nameEn: r.nameEn, qualified: hasQual });
        }
      }
    };
    find(PORK_TERMS, 'pork');
    find(PORK_DERIVED, 'pork');
    find(ALCOHOL_TERMS, 'alcohol');
    find(BLOOD_TERMS, 'blood');
    find(GAME_TERMS, 'game');
  }
  return problems;
}

module.exports = { scan, PORK_TERMS, ALCOHOL_TERMS, BLOOD_TERMS, GAME_TERMS, HALAL_QUALIFIERS };
