import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../france-base-data/rows.mjs';

export default buildRows(
  ['mushroom_galette', 'beef_carrot', 'spinach_tart'],
  ['flammekueche', 'socca', 'cherry_clafoutis', 'gougeres', 'pike_quenelles'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
