import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../sweden-base-data/rows.mjs';

export default buildRows(
  ['root_soup_barley', 'knacke_dill'],
  ['renstek_lingon', 'renkott_soppa', 'alggryta_timjan', 'algbiff_svamp', 'hjortrostbiff', 'ripa_stek', 'lax_sparris_ugn', 'abborre_gryta', 'gos_farsbiffar', 'stromming_persilja', 'skarpsill', 'rak_soppa', 'ugnspannkaka', 'kottfarsgryta', 'kycklinglar_ugn', 'kalkonfars_biffar', 'kalrot_pure_timjan', 'brysselkal_apple', 'gronsakssoppa_korn', 'svampstuvning', 'potatiskaka_ugn', 'rotkal_apel', 'appelkaka_kanel', 'paronkaka', 'mandelkubb', 'dammsugare', 'jordgubbstarta', 'blabarspaj', 'appelpaj', 'frukostknacke_fro'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
