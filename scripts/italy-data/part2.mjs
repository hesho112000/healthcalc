import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../italy-base-data/rows.mjs';

export default buildRows(
  ['zucchini_soup', 'rosemary_beef', 'spinach_gratin'],
  ['risi_bisi', 'pollo_cacciatora', 'vitello_tonnato', 'branzino', 'calamari', 'baccala', 'sarde_beccafico', 'involtini', 'cotoletta', 'pollo_parmigiana', 'peperonata'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
