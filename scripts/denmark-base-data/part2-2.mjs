import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['chicken_root_stew'],
  ['kodfars_gratang', 'lammekolle', 'kalvekotelet', 'oksefile_sopp', 'kodboller_tomat', 'kylling_karry_ananas', 'kalkun_karbonader', 'vildand_roedkaal', 'hjort_timjan', 'kanin_bryst', 'laks_pasta_dild', 'torsk_friture', 'rejer_pasta', 'ollebrod', 'skyr_granola'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
