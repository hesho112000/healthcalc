// Halal scanner for the Canada kitchen. Mirrors the USA scanner.
// Canadian cuisine has similar pork/alcohol profile (poutine gravy, tourtière, peameal bacon).
//
// Exports { scan } for the builders, and runs as a CLI to prove the authored
// rows are clean:
//   node scripts/canada-halal-scan.cjs
//
// A pork hit is excused when a halal qualifier (beef / chicken / turkey / lamb /
// fish / tofu ...) is also present.

const PORK_TERMS = [
  // Arabic
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'هام هوك',
  'أندويلي', 'تاسو', 'فات باك', 'سولت بورك', 'سبير رابس', 'كانتري هام',
  // English
  'pork', 'bacon', 'lard', 'chitlins', 'chitterlings', 'ham hock', 'andouille',
  'tasso', 'fatback', 'salt pork', 'pulled pork', 'country ham', 'spare ribs',
  'baby back ribs', 'riblets', 'pig', 'swine', 'hog', 'ham', 'peameal',
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

const HALAL_QUALIFIERS = [
  'لحم البقر', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة', 'سلمون',
  'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي',
  'beef', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp',
  'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based', 'halal',
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

function isNegatedPorkTerm(hay, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  const arabic = isArabic(term);
  const re = arabic
    ? new RegExp(`(?<![ء-ي])${escaped}(?![ء-ي])`, 'g')
    : new RegExp(`\\b${escaped}\\b`, 'gi');
  const matches = [...hay.matchAll(re)];
  if (!matches.length) return false;

  return matches.every((match) => {
    const before = hay.slice(0, match.index);
    const after = hay.slice(match.index + match[0].length);
    if (arabic) return /بدون(?:\s+[ء-ي]+){0,2}\s*$/.test(before);
    return /(?:^|[^A-Za-z])(?:no|without)(?:\s+[\w'-]+){0,2}\s*$/i.test(before) || /^-free\b/i.test(after);
  });
}

const FALSE_FRIENDS = [
  { re: /apple\s+cider/i, term: 'cider' },
  { re: /sparkling\s+cider/i, term: 'cider' },
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
        if (kind === 'pork' && isNegatedPorkTerm(hay, term)) continue;
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
      const { resolve } = require('node:path');
      const { existsSync } = require('node:fs');
      const { pathToFileURL } = require('node:url');
      const abs = resolve(__dirname, dir);
      for (let i = 1; i <= n; i++) {
        const file = resolve(abs, `part${i}.mjs`);
        if (!existsSync(file)) break;
        const m = await import(pathToFileURL(file).href);
        all.push(...m.default);
      }
      return all;
    };
    const base = await load('canada-base-data', 2);
    const exp = await load('canada-data', 2);
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
