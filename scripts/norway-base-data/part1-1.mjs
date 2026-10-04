import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['grilled_salmon', 'root_veg_stew'],
  ['gravlaks', 'ovnsbakt_laks', 'torsk_gulrot', 'fiskesuppe', 'bergen_fiskesuppe', 'fiskekaker', 'fiskegrateng', 'fiskeboller', 'plukkfisk', 'bacalao', 'klippfisk_stew', 'makrell_tomat', 'rekesalat', 'krabbesalat', 'sildesalat', 'kjottkaker', 'farikal', 'lapskaus', 'lammerack', 'karbonade', 'kylling_rot', 'kyllingboller', 'ertesuppe', 'byggrynsgrot', 'rommegrot', 'havregrot', 'vaflar_brunost', 'grovt_brod_ost', 'skyr_bol', 'knekkebrod_egg'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
