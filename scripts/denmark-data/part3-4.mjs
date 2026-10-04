import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['rye_smoked_salmon'],
  ['blomkal_salat', 'frugt_skyr', 'aeble_grotd'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
