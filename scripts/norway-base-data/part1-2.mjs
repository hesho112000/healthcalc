import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['poached_fish', 'lamb_cabbage'],
  ['rokt_laks', 'gravet_orret', 'lutefisk', 'kveite', 'breiflabb', 'krabbe_gryte', 'reke_smorbrod', 'laks_smorbrod', 'eggerore_rug', 'ost_smorbrod', 'sodd', 'kjottgryte_timian', 'lammeskank', 'kalvestek', 'kylling_gryte_krem', 'andebryst', 'kylling_frikasse', 'kremet_brokkoli', 'blomkal_grateng', 'nepe_pure', 'rodbet_salat', 'eple_rodbet', 'sopp_stuing', 'gronnsak_gryte', 'blomkal_suppe', 'potet_suppe', 'gulrot_suppe', 'vafler_havre', 'rug_grot', 'brunost_egg_teller'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
