import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';
export default buildRows(
  ['tattaripuuro'],
  ['uunilohi', 'lihakeitto', 'silakkapihvi'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
