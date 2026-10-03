import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  [],
  ['bazlama', 'sutlac', 'kazandibi', 'asure', 'tavuk_gogsu', 'sekerpare', 'tulumba', 'revani', 'irmik_helva', 'tahin_helva', 'kabak_tatlisi', 'ayva_tatlisi', 'ekmek_kadayifi', 'lokma', 'kumpir', 'ayran', 'salep', 'turk_kahvesi', 'etli_ekmek', 'beyti', 'adana_durum', 'tavuk_durum', 'kokorec_halal', 'midye_tava', 'katmer', 'boyoz', 'tahin_pekmez', 'biberli_yumurta', 'sahanda_yumurta', 'misir_ekmegi', 'kuymak', 'kaygana', 'pide_kasarli_yumurta', 'borek_patates', 'kol_boregi', 'ciborek', 'icli_kofte', 'oruk', 'mercimek_koftesi', 'fellah_koftesi', 'siron', 'tepsi_mantisi', 'eriste', 'keskek', 'alaca_corbasi', 'dugun_corbasi', 'sehriye_corbasi', 'tavuk_corbasi', 'balik_corbasi', 'pacanga_boregi'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
