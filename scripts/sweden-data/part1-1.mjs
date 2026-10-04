import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../sweden-base-data/rows.mjs';

export default buildRows(
  ['yellow_pea_soup', 'rye_egg'],
  ['janssons', 'lax_ugn_dill', 'lax_sparris', 'gos_dill_sas', 'sik_ugn', 'rakmacka', 'skagen_sallad', 'fiskbullar_dill', 'senap_sill_macka', 'knacke_rom', 'kottgryta_svamp', 'lammkarre_rosmarin', 'kottfars_limpa', 'notbog_gryta', 'kyllingfile_citron', 'kylling_gryta_paprika', 'andbrost_apelsin', 'rotfruktsgryta_korn', 'palsternacka_pure', 'brysselkal_gratang', 'gulbeta_soppa', 'svampsoppa', 'gronkal_stuvning', 'frukost_pannkakor', 'saffranspannkaka', 'risgrynsgrot', 'kanelbulle', 'kardemummabulle', 'smultron_yoghurt', 'ostkaka'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
