import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../spain-base-data/rows.mjs';

export default buildRows(
  ['lemon_almond_cake', 'zucchini_garlic'],
  ['huevos_flamenca', 'ensaladilla_rusa', 'ensalada_malaguena', 'pipirrana', 'mollete_tomate', 'magdalenas', 'rosquillas', 'pestinos', 'roscon', 'panellets', 'turron', 'mazapan', 'polvorones', 'natillas', 'quesada'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
