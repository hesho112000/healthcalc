import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../italy-base-data/rows.mjs';

export default buildRows(
  ['garlic_chicken', 'mushroom_pasta', 'herb_fish'],
  ['pizza_quattro_formaggi', 'pizza_napoli', 'spaghetti_aglio_olio', 'pesto_trapanese', 'cacio_pepe', 'pasta_e_ceci', 'pasta_e_fagioli', 'tortellini_brodo', 'orecchiette', 'bigoli', 'risotto_pesce'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
