import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['apple_cake', 'beef_shallot', 'lentil_soup'],
  ['croque_monsieur', 'bouillabaisse', 'crepes', 'souffle', 'tarte_tatin'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
