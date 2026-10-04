// Strict halal gate for the Spain kitchen. Uses the shared halal core
// (scripts/halal-core.cjs) with Spain-specific pork (jamón, chorizo, ...)
// and alcohol (sherry, cava, ...) extras. Liver stays banned for Spain.
const { makeScan, hasTerm } = require('./halal-core.cjs');

// Classic Spanish preparations intentionally excluded or materially altered to
// meet the strict ban list (pork/cured meats, wine/sherry, blood, liver).
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
  'hígado encebollado',
];

const scan = makeScan({
  extraPork: [
    'chorizo', 'lomo', 'tocino', 'manteca', 'sobrasada', 'butifarra',
    'chicharrón', 'chicharron', 'cochinillo', 'salchichón', 'salchichon',
    'fuet', 'lacón', 'lacon', 'شوريزو',
  ],
  extraAlcohol: [
    'rioja', 'sherry', 'jerez', 'sangria', 'cava', 'txakoli', 'txacoli',
    'albariño', 'albarino', 'fino', 'manzanilla', 'amontillado', 'oloroso',
    'moscatel',
  ],
  banLiver: true,
});

module.exports = { scan, EXCLUDED_TRADITIONAL, hasTerm };

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
