import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['grilled_kebab', 'bulgur_pilaf'],
  ['doner_chicken', 'doner_beef', 'adana_kebab', 'urfa_kebab', 'iskender', 'lahmacun', 'pide_cheese', 'pide_meat', 'pide_spinach', 'menemen', 'borek_cheese', 'borek_spinach', 'su_boregi', 'sigara_boregi', 'manti', 'kofte', 'cig_kofte', 'baklava'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
