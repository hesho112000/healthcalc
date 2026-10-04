import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['venison_stew_lingon'],
  ['renskav_pasta', 'alggryta_purjo', 'hjortfile_rosmarin', 'gadda_stekt', 'lax_gryta_tomat', 'sik_smorbrod', 'abborre_erter', 'kalvstek_citron', 'kyckling_gryta_svamp', 'kalkon_gratang', 'rarak_lingon', 'gronkal_chips', 'purjo_stuvning', 'frukost_grot_lingon', 'knacke_tomat_ost'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
