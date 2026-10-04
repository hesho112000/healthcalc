import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['beef_carrot_stew'],
  ['morbradgryde', 'kalverulle', 'lammebov', 'kylling_ris_porre', 'kylling_karbonader', 'and_gryde_porre', 'kalkun_gryde', 'hjort_karbonader', 'kanin_gryde_erter', 'stegt_makrel_persille', 'torsk_bagt_grontsager', 'blamuslinger_tomat', 'blomkal_gratin', 'porre_suppe', 'havregrod_kanel'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
