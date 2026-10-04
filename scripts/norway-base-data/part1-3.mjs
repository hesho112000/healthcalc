import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['baked_cod', 'chicken_stew'],
  ['rokt_orret', 'ingefar_laks', 'torsk_rotgronnsaker', 'laks_erter_pure', 'sei_burger', 'makrell_ovn', 'reke_pasta', 'blaskjell_pasta', 'fiskekake_suppe', 'laks_ris', 'torsk_quinoa', 'kveite_gryte', 'sild_smorbrod', 'makrell_smorbrod', 'kylling_ris_gryte', 'kylling_sote_sopp', 'andebryst_eple', 'kalkun_boller', 'lammegryte_erter', 'oksegryte_sopp', 'kalv_gryte', 'fennikel_salat', 'kålrabi_stuing', 'spinat_stuing', 'selleri_pure', 'gronnsak_suppe_bygg', 'linsesuppe', 'frokost_grot_eple', 'knekkebrod_rokt_laks', 'smoothie_bol'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
