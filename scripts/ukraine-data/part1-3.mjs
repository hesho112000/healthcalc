import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../ukraine-base-data/rows.mjs';

export default buildRows(
  ['mushroom_stew'],
  ['varenyky_cherry', 'fish_cutlets'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);

