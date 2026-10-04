import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../ukraine-base-data/rows.mjs';

export default buildRows(
  ['rye_bread'],
  ['beef_stroganoff', 'kutia_rice', 'paska_bread'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);

