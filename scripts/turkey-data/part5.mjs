import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../turkey-base-data/rows.mjs';

export default buildRows(
  [],
  ['mantar_corbasi', 'kabak_corbasi', 'tutmac_corbasi', 'arabasi_corbasi', 'yuvalama_corbasi', 'anali_kizli', 'lebeniye_corbasi', 'beyran_corbasi', 'kelle_paca', 'tavuk_kanat_firin', 'tavuk_pirzola', 'tavuk_sote', 'tavuk_kapama', 'firinda_tavuk_patates', 'hindi_etli', 'kuzu_sote', 'dana_sote', 'etli_nohut', 'etli_kuru_fasulye', 'etli_taze_fasulye', 'etli_bamya', 'etli_ispanak', 'ispanak_yumurta', 'pazi_yemegi', 'kabak_kalye', 'enginar_dolmasi', 'kereviz_dolmasi', 'havuc_tarator', 'kabak_tarator', 'semizotu_salata', 'acuka', 'cemen', 'kozlenmis_biber', 'kozlenmis_patlican_salata', 'saksuka', 'istavrit_tava', 'sardalya_izgara', 'uskumru_izgara', 'lakerda', 'tarama', 'karides_guvec', 'ahtapot_salata', 'balik_pilaki', 'cevizli_baklava', 'fistikli_sarma', 'sobiyet', 'bulbul_yuvasi', 'saray_lokmasi', 'kalburabasti', 'dilber_dudagi'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
