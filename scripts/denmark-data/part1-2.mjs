import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['rye_egg_cress'],
  ['hakket_kalv', 'oksefile_peber', 'lammegryde_kal', 'kalkon_boller', 'and_bryst_kirsebaer', 'hjort_bof', 'kanin_frikadeller', 'laks_porre', 'makrel_stegt', 'fiskesalat', 'aeggekage', 'blomkal_stuvning', 'kartoffel_salat', 'frugtsalat', 'hindbaer_fraiche'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
