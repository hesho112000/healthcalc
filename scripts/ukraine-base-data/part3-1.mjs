import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'bukovynski_borscht',
    'zaporozka_solyanka',
    'chernihivsky_deruny',
    'poltavsky_borscht',
    'galician_pierogi',
    'odesa_mussels',
    'dnipro_cutlets',
    'kharkiv_pelmeni',
  ],
  [
    'okroshka_classic',
    'salat_vinegret',
    'borscht_green',
    'rassolnik',
    'sorrel_soup',
    'varenyky_cherry',
    'morkviany_kvas',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
