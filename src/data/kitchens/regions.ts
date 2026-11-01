export const DIET_KITCHEN_IDS = [
  'diet-keto',
  'diet-vegan',
  'diet-mediterranean',
  'diet-high-protein',
  'diet-low-carb',
  'diet-paleo',
  'diet-gluten-free',
  'diet-dash',
  'diet-intermittent-fasting',
  'diet-vegetarian',
] as const;

export const KITCHEN_REGION_KITCHEN_IDS = {
  'north-america': ['american', 'canada', 'mexican', 'cuban', 'jamaican', 'costa-rican'],
  'south-america': ['argentinian', 'colombian', 'peruvian', 'chilean', 'brazilian', 'venezuelan'],
  'diet-plans': [...DIET_KITCHEN_IDS],
} as const;

export type KitchenRegionId = keyof typeof KITCHEN_REGION_KITCHEN_IDS;
