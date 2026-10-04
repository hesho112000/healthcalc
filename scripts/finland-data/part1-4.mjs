import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';

export default buildRows(
  ['rye_cheese'],
  ['graavilohi_ruis', 'mustikkapiirakka', 'korvapuusti'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
