import { EXPANSION_REGIONAL_RECIPES, EXPANSION_NATIONAL_RECIPES, buildRows } from '../spain-base-data/rows.mjs';

export default buildRows(
  ['pepper_salad', 'lentil_stew'],
  ['cordero_miel', 'pollo_pepitoria', 'estofado_ternera', 'albondigas_almendra', 'pinchitos', 'pollo_chilindron', 'ternasco', 'bacalao_ajoarriero', 'trucha_horno', 'almejas_verde', 'mejillones_escabeche', 'chipirones_tinta', 'sepia_plancha', 'gambas_gabardina', 'tortilla_espinacas', 'revuelto_setas'],
  { ...EXPANSION_REGIONAL_RECIPES, ...EXPANSION_NATIONAL_RECIPES },
);
