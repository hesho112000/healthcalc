import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../france-base-data/rows.mjs';

export default buildRows(
  ['potato_galette', 'mushroom_souffle', 'leek_potato'],
  ['zucchini_gratin', 'lentil_salad', 'chicken_volaille', 'almond_financier'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
