import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['cod_egg_sauce'],
  ['millionbof', 'kuldegryde', 'kogt_kalvekod', 'lammekoteletter_bonner', 'kylling_frikadeller', 'kylling_gryde_tomat', 'stegt_torsk_erter', 'rodspatte_ovn', 'lubbe_senap', 'rejer_avokado', 'sild_karry_salat', 'blamuslinger_suppe', 'laks_quinoa_dild', 'asparges_suppe', 'bonne_stuvning'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
