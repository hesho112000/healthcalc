// Halal scanner for the Switzerland kitchen. Mirrors the Germany scanner
// (scripts/germany-halal-scan.cjs) - same five groups, same qualifier/negation
// escape rules - with a Switzerland-specific ban list.
//
// Swiss cuisine is alcohol at the centre of the plate: fondue is finished with
// white wine and kirsch, raclette and roesti are washed down with beer, and the
// Valais grows absinthe. Pork arrives through the sausage belt (cervelat,
// landjaeger, bratwurst) and through the speck used in grissini and roesti.
// Game (venison, wild boar, rabbit) is a standard Alpine dish.
//
// Groups:
//   pork   - Cervelat, Landjaeger, Speck, Schinken, Bratwurst, Schwein, ...
//   alcohol- Wein, Bier, Kirsch, Absinthe, Chasselas, Riesling, Biere, ...
//   blood  - Blutwurst, Blut, blood sausage, ...
//   liver  - Leber, Leberwurst, Leberkaese, foie, higado, ... (no exemption)
//   game   - Hirsch, Reh, Kaninchen, Wildschwein, Gams, venison, wild boar, ...
//
// A pork hit is excused when a halal qualifier (rind / kalb / huhn / pute /
// lamm / fisch / gemuese / tofu ...) is also present, which is how the authored
// substitutions pass: Beef Cervelat, Beef Speck and Beef Bratwurst are explicit
// beef variants of the banned names. Generic animal words (milch, ei, kaese,
// kartoffel, butter, rahme, apfel) are deliberately NOT qualifiers, so a potato
// dish can never silently excuse a Cervelat mention. Liver and game get NO
// qualifier escape: those dishes are simply not authored.
//
// Authored substitutions (the halal path through a wine-bound tradition):
//   - Fondue au vin / kirsch  -> Fondue with Lemon Broth (broth + lemon, no
//     wine, no kirsch); the alcohol words never appear in the name at all.
//   - Cervelat (pork)          -> Beef Cervelat
//   - Speck                    -> Beef Speck
//   - Bratwurst                -> Beef Bratwurst
//   - Raclette cheese          -> Halal-Certified Raclette (plant / microbial
//     rennet), named so the rennet check is visible on the dish.
//   - Fondue / raclette wash   -> no beer, no wine, no absinthe pairing named.
//
// Deliberately NOT authored (the exclusions this kitchen requires):
//   Schweinsbratwurst, Schinken, Landjaeger (pork), Blutwurst (blood),
//   Leberwurst / Leberkaese (liver), Fondue au vin, Fondue au kirsch,
//   Chasselas, Riesling, Pinot served as wine, Absinthe, Cervelat (pork),
//   Birchermuesli with wine, Kagelwurst, Bauernspeck, Hirschgulasch, Gams,
//   Kaninchen, Wildschwein, Buendner Speck.
//
// Exports { scan } for the builders, and runs as a CLI to prove the authored
// rows are clean:
//   node scripts/switzerland-halal-scan.cjs

const PORK_TERMS = [
  // Arabic
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'جامبون', 'خنزير محدد',
  // English / French / Spanish
  'pork', 'bacon', 'lard', 'ham', 'gammon', 'chorizo', 'suet',
  'porc', 'jambon', 'cerdo', 'tocino', 'jamón', 'morcilla',
  // German / Swiss German - the pork core
  'schwein', 'schweine', 'schweinefleisch', 'schweinshaxe', 'schweinebraten',
  'speck', 'schinken', 'pancetta', 'bratwurst', 'blutwurst', 'kaminwurst',
  'cervelat', 'landjäger', 'landjager', 'landrauchschinken', 'bauernspeck',
  'kugelwurst', 'kalbserworst',
];

const ALCOHOL_TERMS = [
  // Arabic
  'كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا',
  'ساكي', 'شربت', 'جين', 'سابير', 'شيري', 'بورت', 'لاجير',
  // English / French / Spanish
  'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum',
  'vodka', 'sake', 'cider', 'lager', 'stout', 'porter', 'mead',
  'liquor', 'spirits', 'sherry', 'gin', 'vermouth', 'schnapps', 'perry',
  'bière', 'vin', 'biere', 'cerveza', 'vino', 'kirschwasser', 'cognac',
  // German / Swiss German - the alcohol core
  'bier', 'weissbier', 'weißbier', 'bockbier', 'radler', 'weisswein', 'weißwein',
  'eiswein', 'glühwein', 'schlüpfer', 'schluck', 'schnaps', 'obstler',
  'branntwein', 'weinbrand', 'sekt', 'champagner', 'prosecco', 'likör', 'liqueur',
  'apfelwein', 'rübel', 'ruebel', 'absinthe', 'kirsch',
  // Swiss wine grapes named as the wine, never as a grape
  'riesling', 'chasselas', 'savagnin', 'syrah', 'chardonnay', 'pinot noir',
];

const BLOOD_TERMS = [
  // Arabic
  'دم', 'دمية', 'دمية الدم', 'خ الدم',
  // English / French / Spanish / German
  'blood', 'blood sausage', 'black pudding', 'boudin noir', 'blutwurst', 'blut',
];

const LIVER_TERMS = [
  // Arabic
  'كبد', 'كبدة',
  // English / French / Spanish / German
  'liver', 'liverwurst', 'liver sausage', 'foie', 'foie gras', 'hígado',
  'leber', 'leberwurst', 'leberkäse', 'leberkase', 'leberknödel', 'leberkuchen',
];

const GAME_TERMS = [
  // Arabic
  'غزال', 'أرنب', 'خنزير بري', 'ديك بري', 'ظبي', 'نورس', 'غزال أحمر',
  // English / French / Spanish
  'venison', 'rabbit', 'hare', 'wild boar', 'wild duck', 'pheasant', 'quail',
  'grouse', 'moose', 'elk', 'caille', 'lievre', 'boar', 'reindeer', 'chamois',
  // German / Swiss German - the game core
  'hirsch', 'reh', 'rehbock', 'hirschbraten', 'hasenbraten', 'hase', 'hasen',
  'kaninchen', 'wildschwein', 'wildente', 'fasan', 'rebhuhn', 'elch', 'gams',
  'gamsfleisch', 'wildbret', 'steinbock',
];

// A halal qualifier excuses a pork term only. Deliberately excludes generic
// animal words (milch, ei, kaese, kartoffel, butter, rahme, apfel) so a potato
// dish can never silently excuse a Cervelat mention.
const HALAL_QUALIFIERS = [
  // Arabic
  'لحم البقر', 'لحم العجل', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة',
  'سلمون', 'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي', 'جبن', 'بيض',
  'حلال',
  // English
  'beef', 'veal', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna',
  'shrimp', 'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based', 'halal',
  // German / Swiss German - the qualifier core
  'rind', 'rinder', 'rindfleisch', 'kalb', 'kalbs', 'huhn', 'hühner',
  'hähnchen', 'haehnchen', 'pute', 'puten', 'truthahn', 'trute', 'lamm',
  'lammfleisch', 'fisch', 'seefisch', 'lachs', 'garnelen', 'tofu', 'gemüse',
  'gemuese', 'vegetarisch', 'vegan', 'pflanzlich',
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
    return /(?:^|[^A-Za-z])(?:no|without|ohne)(?:\s+[\w'-]+){0,2}\s*$/i.test(before) || /^-free\b/i.test(after);
  });
}

// Alcohol words that also appear inside a soft-drink or fruit name.
const FALSE_FRIENDS = [
  { re: /apple/i, term: 'cider' },
  { re: /apple|apfel/i, term: 'perry' },
  { re: /(?:fruit|saft|juice|schorle|nebel|limonade)/i, term: 'bier' },
  { re: /(?:fruit|saft|juice|schorle)/i, term: 'rübel' },
  { re: /kirschbaum/i, term: 'kirsch' },
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
      ['liver', LIVER_TERMS],
      ['game', GAME_TERMS],
    ];
    for (const [kind, terms] of groups) {
      for (const term of terms) {
        if (!containsTerm(hay, term)) continue;
        if (FALSE_FRIENDS.some((ff) => ff.term === term && ff.re.test(hay))) continue;
        // Only pork gets the qualifier / negation escape. Liver and game do not.
        if (kind === 'pork' && isNegatedPorkTerm(hay, term)) continue;
        if (kind === 'pork' && qual) continue;
        problems.push({ kind, term, nameAr: r.nameAr, nameEn: r.nameEn });
      }
    }
  }
  return problems;
}

module.exports = {
  scan,
  PORK_TERMS,
  ALCOHOL_TERMS,
  BLOOD_TERMS,
  LIVER_TERMS,
  GAME_TERMS,
  HALAL_QUALIFIERS,
};

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
    const base = await load('switzerland-base-data', 4);
    const exp = await load('switzerland-data', 4);
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