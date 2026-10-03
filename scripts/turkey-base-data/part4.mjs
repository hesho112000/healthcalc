import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['grilled_fish', 'white_bean_stew'],
  ['pirzola', 'sac_kavurma', 'guvec', 'hamsi', 'levrek', 'cupra', 'palamut', 'mezgit', 'kalamar', 'midye_dolma', 'balik_ekmek', 'sucuklu_yumurta', 'pastirmali_yumurta', 'kaymak_bal', 'simit', 'pogaca', 'acma', 'gozleme'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
