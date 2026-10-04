import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'tvarozhnik',
    'pampushky_plain',
    'pashtet_chicken',
    'morkviany_kvas',
    'uzvar_home',
    'kissel_cherry',
    'kompot_apple',
    'kissel_currant',
  ],
  [
    'varenyky_potato',
    'holubtsi_beef',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
