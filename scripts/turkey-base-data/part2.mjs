import { BASE_REGIONAL_RECIPES, BASE_NATIONAL_RECIPES, buildRows } from './rows.mjs';

export default buildRows(
  ['yogurt_soup', 'red_lentil_soup'],
  ['kunefe', 'lokum', 'mercimek_corbasi', 'ezogelin', 'yayla', 'tarhana', 'domates_corbasi', 'iskembe', 'pilav', 'bulgur_pilavi', 'ic_pilav', 'nohutlu_pilav', 'kuru_fasulye', 'nohut_yemegi', 'barbunya', 'turlu', 'zeytinyagli_fasulye', 'yaprak_sarma'],
  { ...BASE_REGIONAL_RECIPES, ...BASE_NATIONAL_RECIPES },
);
