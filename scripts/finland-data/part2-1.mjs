import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';
export default buildRows(
  ['karpalo_kiisseli'],
  ['rosolli', 'sillisalaatti'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
