import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../sweden-base-data/rows.mjs';

export default buildRows(
  ['crispbread_salmon'],
  ['renkott_paj', 'algbullar_lingon', 'hjortgryta_apple', 'fasan_gryta', 'kanin_stek', 'gadda_gryta', 'kolja_gryta', 'fisk_omelett', 'kalv_bollar_kapris', 'kyckling_curry_gryta', 'kottgryta_erter', 'morot_stuvning', 'vasterbotten_paj', 'kokosbollar', 'saffranskaka'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
