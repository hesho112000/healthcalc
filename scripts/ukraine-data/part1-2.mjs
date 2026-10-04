import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../ukraine-base-data/rows.mjs';

export default buildRows(
  ['halushky_mushroom'],
  ['zrazy_mushroom', 'ikra_buriakova', 'chicken_fricassee'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);

