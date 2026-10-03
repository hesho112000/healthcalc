import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['pear_cake', 'beef_onion', 'vegetable_soup'],
  ['tomate_crevettes', 'sole_meuniere', 'anguilles_vert', 'mitraillette', 'asperges_flamande', 'tarte_au_riz', 'filet_americain', 'stamppot', 'erwtensoep', 'bitterballen', 'haring'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
