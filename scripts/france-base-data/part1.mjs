import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['herb_chicken', 'market_tart', 'fish_ragout'],
  ['coq_raisin', 'boeuf_bourguignon', 'cassoulet', 'ratatouille', 'quiche_lorraine'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
