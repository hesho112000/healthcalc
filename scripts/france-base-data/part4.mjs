import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['pear_tart', 'potato_gratin', 'herb_omelette'],
  ['salade_lyonnaise', 'panisse', 'pommes_anna', 'poulet_chasseur'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
