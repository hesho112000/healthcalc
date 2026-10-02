import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

// These profiles are shared by the later base parts; remove embedded demonyms
// so each generated row receives only the token for its assigned region.
BASE_NATIONAL_RECIPES.boeuf_bourguignon.ar = 'بوف بورغينيون بلحم بقري حلال';
BASE_NATIONAL_RECIPES.crepes.ar = 'كريب بالزبدة الرقيقة';
BASE_NATIONAL_RECIPES.baguette.ar = 'خبز باغيت تقليدي';

export default buildRows(
  ['herb_chicken', 'market_tart', 'fish_ragout'],
  ['coq_raisin', 'boeuf_bourguignon', 'cassoulet', 'ratatouille', 'quiche_lorraine'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
