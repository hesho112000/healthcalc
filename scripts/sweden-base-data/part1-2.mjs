import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['reindeer_stew', 'elk_patties'],
  ['renskav', 'renskav_gryta', 'renskav_potatis', 'renstek', 'suovas', 'torkat_renkott', 'renkottbullar', 'ren_gryta_lingon', 'renfars_biffar', 'ren_rokt_kall', 'algbiffar', 'algbullar', 'rarak', 'sik_rokt', 'stromming_lada', 'abborre_rodbet', 'gos_citron_sas', 'lax_gryta_purjo', 'rakgryta', 'fiskgratang_spenat', 'kottfarssas', 'korv_stroganoff', 'kyckling_stroganoff', 'kalkongryta', 'lammfarsbiff', 'nasselsoppa', 'kantsoppa', 'blomkalssoppa_ost', 'kroppkakor', 'palt'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
