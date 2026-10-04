import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['grilled_salmon_dill', 'root_veg_stew'],
  ['kottbullar', 'kottbullar_lingon', 'pyttipanna', 'wallenbergare', 'biff_lindstrom', 'kaldolmar', 'lammstek', 'kalops', 'sjomansbiff', 'kylling_stek_gulrot', 'kalkon_biffar', 'kylling_dill_gryta', 'stekt_stromming', 'inlagd_sill', 'senap_sill', 'gravad_lax', 'varmrokt_lax', 'lax_pudding', 'stekt_gos', 'stekt_abborre', 'fiskgryta_saffran', 'rak_sallad', 'kraft_sallad', 'artsoppa', 'spenatsoppa', 'rotmos_smor', 'rodbetsallad', 'filmjolk_frukost', 'knackebrod_ost', 'havregrot_blaabar'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
