import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['baked_salmon_dill'],
  ['laks_tartar', 'torsk_lime', 'orret_ovn_urter', 'sei_erter', 'reke_avokado_salat', 'muslinger_suppe', 'laks_gryte_dill', 'kylling_gulrot_gryte', 'kalkun_gryte', 'oksegryte_bygg', 'lammegryte_gulrot', 'rodbet_suppe', 'selleri_suppe', 'havre_grot_blabaer', 'rugbrod_rekesalat'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
