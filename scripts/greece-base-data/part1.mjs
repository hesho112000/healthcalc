import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['lemon_chicken', 'grilled_fish'],
  ['moussaka', 'souvlaki_chicken', 'gyros_chicken', 'souvlaki_lamb', 'spanakopita', 'greek_salad', 'baklava', 'dolmades', 'saganaki', 'tzatziki', 'kleftiko', 'pastitsio', 'loukoumades', 'galaktoboureko', 'avgolemono', 'fasolada'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
