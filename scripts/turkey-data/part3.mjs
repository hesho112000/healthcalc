import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../turkey-base-data/rows.mjs';

export default buildRows(
  ['tahini_salad', 'lamb_stew'],
  ['dana_antrikot', 'kofte_domates', 'izmir_kofte', 'tekirdag_kofte', 'akcaabat_kofte', 'tire_kofte', 'sogan_kebabi', 'fistikli_kebab', 'simit_kebabi', 'belen_tava', 'abagannus', 'muhammara', 'gavurdagi', 'sumakli_sogan', 'cevizli_biber', 'bostana', 'gullac', 'hosaf'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
