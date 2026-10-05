import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [
    'podolsky_golubtsi',
    'slobozhansky_kasha',
    'volynsky_buckwheat',
    'karpatsky_pampushky',
    'sumsky_olivie',
    'kremenchuk_cutlets',
    'vinnitsa_deruny',
    'zhytomyr_kasha',
  ],
  [
    'uzvar_home',
    'kissel_cherry',
    'kompot_apple',
    'kissel_currant',
    'pashtet_chicken',
    'pampushky_plain',
    'tvarozhnik',
  ],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
