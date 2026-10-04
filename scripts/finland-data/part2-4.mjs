import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../finland-base-data/rows.mjs';
export default buildRows(
  ['janssoninkiusaus'],
  ['runebergintorttu', 'pulla', 'lohipasteija'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
