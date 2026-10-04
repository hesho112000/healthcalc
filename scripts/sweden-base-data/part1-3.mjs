import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['elk_stew_lingon', 'grilled_whitefish'],
  ['renskav_macka', 'ren_gryta_purjo', 'algfile_ugn', 'hjort_skav', 'hjort_burgare', 'ripa_gryta', 'fasan_apple', 'kanin_gryta', 'kolja_rokt', 'lax_citron_smor', 'roding_grill', 'lake_rokt', 'braxen_ugn', 'sik_gryta', 'nors_gryta', 'fiskfars_biffar', 'kottgryta_gulrot', 'kalvfarsbullar', 'lammgryta_rot', 'kyckling_ris_ugn', 'kyckling_spenat', 'potatissoppa_purjo', 'rodbetsbiffar', 'gronsaksgratang_vasterbotten', 'kal_sallad_apple', 'palsternacka_soppa', 'svamp_ragu', 'filmjolk_lingon', 'knacke_gravlax', 'havre_smoothie_hallon'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
