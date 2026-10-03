import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../turkey-base-data/rows.mjs';

export default buildRows(
  ['eggplant_puree', 'semolina_helva'],
  ['komposto', 'tel_kadayif', 'burma_kadayif', 'halka_tatlisi', 'lor_peynirli_borek', 'otlu_peynirli_borek', 'tavuklu_borek', 'kiymali_borek', 'patlicanli_borek', 'tereyagli_pilav', 'sehriyeli_bulgur', 'domatesli_pilav', 'meyhane_pilavi', 'havuclu_bulgur', 'mantarli_pilav', 'sebze_corbasi', 'patates_corbasi', 'karnabahar_corbasi'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
