import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['shepherd_salad', 'roast_chicken'],
  ['dolma', 'kisir', 'cacik', 'haydari', 'ezme', 'coban_salata', 'piyaz', 'roka_salata', 'imam_bayildi', 'karniyarik', 'patlican_kebab', 'tas_kebab', 'hunkar_begendi', 'ali_nazik', 'kuzu_tandir', 'tavuk_sis', 'tavuk_doner', 'kanat'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
