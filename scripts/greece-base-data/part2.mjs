import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['veg_stew', 'yogurt_honey'],
  ['gigantes', 'briam', 'gemista', 'youvetsi', 'stifado', 'soutzoukakia', 'paidakia', 'psari_plaki', 'octapodi', 'garides_saganaki', 'melitzanosalata', 'taramosalata', 'feta_me_meli', 'horiatiko_psomi', 'rizogalo'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
