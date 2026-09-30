// Halal scanner for the USA kitchen. Stricter than the Taiwan scanner because
// American cuisine is pork- and alcohol-heavy (BBQ, soul food, Southern, Cajun).
//
// Exports { scan } for the builders, and runs as a CLI to prove the authored
// rows are clean:
//   node scripts/usa-halal-scan.cjs
//
// A pork hit is excused when a halal qualifier (beef / chicken / turkey / lamb /
// fish / tofu ...) is also present, so the REQUIRED SUBSTITUTIONS
// (beef bacon, turkey bacon, beef ribs, halal beef sausage) pass.

const PORK_TERMS = [
  // Arabic
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'شيتلينز', 'هام هوك',
  'أندويلي', 'تاسو', 'فات باك', 'سولت بورك', 'سبير رابس', 'كانتري هام',
  // English
  'pork', 'bacon', 'lard', 'chitlins', 'chitterlings', 'ham hock', 'andouille',
  'tasso', 'fatback', 'salt pork', 'pulled pork', 'country ham', 'spare ribs',
  'baby back ribs', 'riblets', 'pig', 'swine', 'hog', 'ham',
  // French / Spanish / German
  'porc', 'jambon', 'lard', 'cerdo', 'tocino', 'jamón', 'schweine', 'speck', 'schinken',
];

const ALCOHOL_TERMS = [
  // Arabic
  'كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا',
  'ساكي', 'نبيذ الطبخ', 'جعة', 'لايجر', 'ستاوت',
  // English
  'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum',
  'vodka', 'sake', 'cooking wine', 'beer-battered', 'beer batter', 'lager',
  'stout', 'porter', 'ale', 'cider', 'mead', 'liquor', 'spirits',
  // French / Spanish / German
  'bière', 'vin', 'whisky', 'bourbon', 'cerveza', 'vino', 'bier', 'wein',
];

const BLOOD_TERMS = [
  'دم', 'دمية', 'blood', 'black pudding', 'blood sausage', 'boudin noir',
];

const GAME_TERMS = [
  'غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'ظبي', 'venison', 'rabbit', 'hare',
  'wild boar', 'pheasant', 'wild duck', 'quail', 'grouse', 'elk', 'moose',
];

// Present in a dish that legitimately contains a pork-derived term as a
// halal substitution (beef bacon, turkey bacon, beef ribs, halal beef sausage).
const HALAL_QUALIFIERS = [
  'لحم البقر', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة', 'سلمون',
  'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي',
  'beef', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp',
  'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based',
];

const isArabic = (s) => /[ء-ي]/.test(s);

function containsTerm(hay, term) {
  if (isArabic(term)) {
    return new RegExp(`(^|[^ء-ي])${term}($|[^ء-ي])`).test(hay);
  }
  return new RegExp(`\\b${term}\\b`, 'i').test(hay);
}

function hasQualifier(hay) {
  return HALAL_QUALIFIERS.some((q) => containsTerm(hay, q));
}

// False-friend exceptions: terms that look banned but are not in context.
const FALSE_FRIENDS = [
  { re: /apple\s+cider/i, term: 'cider' }, // non-alcoholic US apple cider
  { re: /sparkling\s+cider/i, term: 'cider' }, // non-alcoholic sparkling cider
];

function scan(rows) {
  const problems = [];
  for (const r of rows) {
    const hay = [r.nameAr, r.nameEn, r.nameFr, r.nameEs, r.nameDe]
      .filter((v) => typeof v === 'string')
      .join(' ');
    const qual = hasQualifier(hay);

    const groups = [
      ['pork', PORK_TERMS],
      ['alcohol', ALCOHOL_TERMS],
      ['blood', BLOOD_TERMS],
      ['game', GAME_TERMS],
    ];
    for (const [kind, terms] of groups) {
      for (const term of terms) {
        if (!containsTerm(hay, term)) continue;
        if (FALSE_FRIENDS.some((ff) => ff.term === term && ff.re.test(hay))) continue;
        // A pork term with a halal qualifier is an allowed substitution.
        if (kind === 'pork' && qual) continue;
        problems.push({ kind, term, nameAr: r.nameAr, nameEn: r.nameEn });
      }
    }
  }
  return problems;
}

module.exports = { scan, PORK_TERMS, ALCOHOL_TERMS, BLOOD_TERMS, GAME_TERMS };

if (require.main === module) {
  const run = async () => {
    const load = async (dir, n) => {
      const all = [];
      for (let i = 1; i <= n; i++) {
        const m = await import(`./${dir}/part${i}.mjs`);
        all.push(...m.default);
      }
      return all;
    };
    const base = await load('usa-base-data', 5);
    const exp = await load('usa-data', 5);
    const baseHits = scan(base);
    const expHits = scan(exp);
    console.log(`base rows scanned: ${base.length}, violations: ${baseHits.length}`);
    console.log(`expansion rows scanned: ${exp.length}, violations: ${expHits.length}`);
    for (const p of [...baseHits, ...expHits]) {
      console.log(`  HALAL [${p.kind}] "${p.term}" -> ${p.nameAr} | ${p.nameEn}`);
    }
    const total = baseHits.length + expHits.length;
    console.log(total === 0 ? '\nCLEAN: 0 halal violations' : `\nFAILED: ${total} violation(s)`);
    if (total > 0) process.exitCode = 1;
  };
  run().catch((e) => { console.error(e); process.exitCode = 1; });
}
