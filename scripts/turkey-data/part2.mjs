import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../turkey-base-data/rows.mjs';

export default buildRows(
  ['vegetable_stew', 'cucumber_yogurt'],
  ['karnabahar_kizartma', 'kapuska', 'lahana_sarma', 'patates_oturtma', 'fasulye_pilaki', 'soslu_patlican', 'domates_dolmasi_etli', 'kabak_dolmasi', 'biber_dolmasi_etli', 'kuzu_guvec', 'tavuk_guvec', 'orman_kebabi', 'elbasan_tava', 'cokertme_kebabi', 'cag_kebabi', 'testi_kebabi', 'kuzu_kapama', 'kuzu_incik'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
