import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['lamb_veg_stew'],
  ['kalv_karbonader', 'kylling_erter_gryde'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
