export * from './calculations';

export const calculateIdealWeight = (height: number, gender: string): number => {
  const h = height / 100;
  return gender === 'male' ? Math.round(22 * h * h) : Math.round(21 * h * h);
};

export const calculateBodyFat = (waist: number, neck: number, height: number, gender: string): number => {
  if (gender === 'male') {
    return +(86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76).toFixed(1);
  }
  return +(163.205 * Math.log10(waist + 0.1 * waist - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(1);
};

export const calculateWaterIntake = (weight: number): number => Math.round(weight * 0.033 * 1000);

export { FOODS_DATABASE, CUISINE_META, getFoodsByCuisine, generateMealWithCuisine } from './calculations';
export type { Cuisine, FoodItem } from './calculations';
