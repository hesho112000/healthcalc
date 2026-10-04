import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../denmark-base-data/rows.mjs';

export default buildRows(
  ['rye_herring'],
  ['stegt_kalvfile', 'kod_karry_gryde', 'lam_bonne_gryde', 'kalv_gryde_erter', 'okse_gryde_byg', 'kylling_quinoa', 'kylling_gryde_paprika_tomat', 'kalkunfile_ovn', 'andefrikadeller', 'hjort_file', 'kanin_lar', 'orrhone_stegt', 'torsk_karry', 'laks_broccoli', 'sild_senap_dild'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
