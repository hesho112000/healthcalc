import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['herb_chicken', 'potato_mash', 'fish_herb'],
  ['carbonnade', 'waterzooi', 'moules_frites', 'stoofvlees', 'gaufres_liege', 'speculoos', 'chocolate_mousse', 'frites', 'vol_au_vent', 'boulets_liege', 'chicons_gratin'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
