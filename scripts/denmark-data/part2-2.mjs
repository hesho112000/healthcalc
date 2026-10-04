import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['skyr_berries'],
  ['morbrad_svamp', 'kodboller_karry', 'lammefars_boller', 'kalv_karry', 'okse_suppe', 'kylling_spyd', 'kylling_gryde_broccoli', 'kalkun_quinoa', 'vildgas_apple', 'hjort_lar', 'kanin_karry', 'fasan_porre', 'torsk_ovn_dild', 'makrel_ovn', 'kanelsnegl'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
