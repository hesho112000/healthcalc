// Halal scanner for the Austria kitchen. Mirrors the Germany scanner
// (scripts/germany-halal-scan.cjs) with an Austria-specific ban list.
//
// Austrian cuisine sits directly on the German border, so it inherits every German
// pork/alcohol hazard (Schweinsbraten, Speck, Leberknödel, Blutwurst) and adds a few
// of its own: Käsekrainer and Frankfurter are pork sausages, Glühwein and
// Marillenlikör are the classic alcohol pairings, and the Wachau wine terms
// (Grüner Veltliner, Riesling) leak into the fruit-dessert names.
//
// Groups:
//   pork   - Schwein, Speck, Schinken, Bratwurst, Käsekrainer, Frankfurter, ...
//   alcohol- Bier, Wein, Schnaps, Obstler, Glühwein, Marillenlikör, ...
//   blood  - Blutwurst, Blut, Boudin noir, morcilla, ...
//   liver  - Leber, Leberwurst, Leberknödel, foie, higado, ... (no exemption)
//   game   - Hirsch, Reh, Hase, Kaninchen, Wildschwein, Gams, ...
//
// A pork hit is excused when a halal qualifier (rind / kalb / huhn / fisch /
// gemuese / tofu ...) is also present, which is how the authored sausage dishes
// (Rinderkäsekrainer, Beef Frankfurter) pass while a bare Käsekrainer does not.
// Liver and game get NO qualifier escape: even a beef liverwurst is excluded, so
// those dishes are simply not authored.
//
// Exports { scan } for the builders, and runs as a CLI to prove the authored
// rows are clean:
//   node scripts/austria-halal-scan.cjs

const PORK_TERMS = [
  // Arabic
  'خنزير', 'لحم الخنزير', 'شحم الخنزير', 'دهن الخنزير', 'جامبون', 'خنزير محدد',
  // English / French / Spanish
  'pork', 'bacon', 'lard', 'ham', 'gammon', 'chorizo', 'suet', 'pig', 'swine', 'hog',
  'porc', 'jambon', 'cerdo', 'tocino', 'jamón', 'morcilla',
  // German - the pork core, shared with the German kitchen
  'schwein', 'schweine', 'schweinefleisch', 'schweinshaxe', 'schweinebraten',
  'speck', 'schinken', 'pancetta', 'bratwurst', 'blutwurst',
  'weißwurst', 'weisswurst', 'kaminwurst', 'bockwurst', 'knacker', 'knackwurst',
  'mettwurst', 'teewurst', 'zwiebelwurst', 'polnische', 'dekelwurst',
  // Austrian additions
  'käsekrainer', 'kaesekrainer', 'frankfurter', 'krainer',
  'landjäger', 'landjager', 'esswurst', 'bludnwurst', 'pferdlwurst',
];

const ALCOHOL_TERMS = [
  // Arabic
  'كحول', 'خمر', 'نبيذ', 'بيرة', 'ويسكي', 'بوربون', 'براندي', 'روم', 'فودكا',
  'ساكي', 'شربت', 'جين', 'سابير', 'شيري', 'بورت', 'لاجير', 'ليكر',
  // English / French / Spanish
  'alcohol', 'beer', 'wine', 'whiskey', 'whisky', 'bourbon', 'brandy', 'rum',
  'vodka', 'sake', 'cider', 'lager', 'stout', 'porter', 'mead',
  'liquor', 'spirits', 'sherry', 'gin', 'vermouth', 'schnapps', 'perry',
  'bière', 'vin', 'biere', 'cerveza', 'vino', 'lieur',
  // German - the alcohol core, shared with the German kitchen
  'bier', 'weissbier', 'weißbier', 'bockbier', 'radler', 'weisswein', 'weißwein',
  'eiswein', 'glühwein', 'schlüpfer', 'schluck', 'schnaps', 'obstler',
  'branntwein', 'weinbrand', 'sekt', 'champagner', 'prosecco', 'likör', 'liqueur',
  'apfelwein', 'rübel', 'ruebel',
  // Austrian additions
  'marillenlikör', 'marillenlikor', 'aprikosenlikör', 'heuriger',
  'riesling', 'grüner veltliner', 'gruener veltliner', 'veltliner',
  'sauvignon', 'chardonnay', 'pinot noir', 'zweigelt', 'blaufränkisch', 'blauenfrankisch',
  'st. magdalena', 'stmagdalena', 'kellerroute', 'vinothek',
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
  // German - the game core, shared with the German kitchen
  'hirsch', 'reh', 'rehbock', 'hirschbraten', 'hasenbraten', 'hase', 'hasen',
  'kaninchen', 'wildschwein', 'wildente', 'fasan', 'rebhuhn', 'elch', 'gams',
  'gamsfleisch', 'wildbret', 'steinbock',
];

// A halal qualifier excuses a pork term only. Deliberately excludes generic
// animal words (milch, ei, kaese, kartoffel, butter, sahne) so a potato dish
// can never silently excuse a Schweinsfleisch mention.
const HALAL_QUALIFIERS = [
  // Arabic
  'لحم البقر', 'لحم العجل', 'دجاج', 'ديك رومي', 'لحم الضأن', 'سمك', 'تونة',
  'سلمون', 'روبيان', 'جمبري', 'توفو', 'خضار', 'نباتي',
  // English
  'beef', 'veal', 'chicken', 'turkey', 'lamb', 'fish', 'salmon', 'tuna',
  'shrimp', 'prawn', 'tofu', 'vegetable', 'vegan', 'plant-based', 'halal',
  // German - the qualifier core
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
  { re: /apfel/i, term: 'apfelwein' },
  { re: /apple|apfel/i, term: 'perry' },
  { re: /(?:fruit|saft|juice|schorle|nebel|most)/i, term: 'bier' },
  { re: /(?:fruit|saft|juice|schorle)/i, term: 'rübel' },
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
    const base = await load('austria-base-data', 4);
    const exp = await load('austria-data', 4);
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