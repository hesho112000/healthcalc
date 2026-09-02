import { FoodItem } from './calculations';

export type SuitabilityCondition =
  | 'cholesterol'
  | 'diabetes'
  | 'hypertension'
  | 'overweight'
  | 'pcos'
  | 'thyroid';

export type Suitability = 'suitable' | 'unsuitable' | 'neutral';

const num = (v?: number, fallback = 0): number => (typeof v === 'number' && !Number.isNaN(v) ? v : fallback);

const CHOLESTEROL = { fatOk: 15, satFatOk: 5, fiberOk: 3 };
const DIABETES = { carbsOk: 30, sugarOk: 15, carbsBad: 40, sugarBad: 20, fiberOk: 3 };
const HYPERTENSION = { sodiumOk: 400, sodiumBad: 600 };
const OVERWEIGHT = { calOk: 400, calBad: 550, fatOk: 15, fatBad: 25 };
const PCOS = { carbsOk: 35, sugarOk: 15, carbsBad: 45, sugarBad: 20, fiberOk: 3 };

function evaluateFor(dish: FoodItem, condition: SuitabilityCondition): Suitability {
  switch (condition) {
    case 'cholesterol': {
      const fat = num(dish.fat);
      const satFat = num(dish.saturatedFat);
      const fiber = num(dish.fiber);
      if (fat < CHOLESTEROL.fatOk && satFat < CHOLESTEROL.satFatOk && fiber >= CHOLESTEROL.fiberOk) return 'suitable';
      if (fat > CHOLESTEROL.fatOk || satFat > CHOLESTEROL.satFatOk) return 'unsuitable';
      return 'neutral';
    }
    case 'diabetes': {
      const carbs = num(dish.carbs);
      const sugar = num(dish.sugar);
      const fiber = num(dish.fiber);
      if (carbs < DIABETES.carbsOk && sugar < DIABETES.sugarOk && fiber >= DIABETES.fiberOk) return 'suitable';
      if (carbs > DIABETES.carbsBad || sugar > DIABETES.sugarBad) return 'unsuitable';
      return 'neutral';
    }
    case 'hypertension': {
      const sodium = num(dish.sodium);
      if (sodium > 0 && sodium < HYPERTENSION.sodiumOk) return 'suitable';
      if (sodium > HYPERTENSION.sodiumBad) return 'unsuitable';
      return 'neutral';
    }
    case 'overweight': {
      const calories = num(dish.calories);
      const fat = num(dish.fat);
      if (calories < OVERWEIGHT.calOk && fat < OVERWEIGHT.fatOk) return 'suitable';
      if (calories > OVERWEIGHT.calBad || fat > OVERWEIGHT.fatBad) return 'unsuitable';
      return 'neutral';
    }
    case 'pcos':
    case 'thyroid': {
      const carbs = num(dish.carbs);
      const sugar = num(dish.sugar);
      const fiber = num(dish.fiber);
      if (carbs < PCOS.carbsOk && sugar < PCOS.sugarOk && fiber >= PCOS.fiberOk) return 'suitable';
      if (carbs > PCOS.carbsBad || sugar > PCOS.sugarBad) return 'unsuitable';
      return 'neutral';
    }
    default:
      return 'neutral';
  }
}

export function evaluateSuitability(
  dish: FoodItem,
  conditions: SuitabilityCondition[],
): Suitability {
  if (!conditions || conditions.length === 0) return 'neutral';
  let result: Suitability = 'neutral';
  for (const condition of conditions) {
    const status = evaluateFor(dish, condition);
    if (status === 'unsuitable') return 'unsuitable';
    if (status === 'suitable') result = 'suitable';
  }
  return result;
}

export function suitabilityReasonKey(
  dish: FoodItem,
  conditions: SuitabilityCondition[],
  status: Exclude<Suitability, 'neutral'>,
): string {
  if (conditions.length > 1) {
    for (const condition of conditions) {
      if (evaluateFor(dish, condition) === status) return reasonFor(condition, dish, status);
    }
  }
  return reasonFor(conditions[0], dish, status);
}

function reasonFor(
  condition: SuitabilityCondition,
  dish: FoodItem,
  status: 'suitable' | 'unsuitable',
): string {
  if (status === 'suitable') {
    switch (condition) {
      case 'cholesterol': return 'mbOkChol';
      case 'diabetes': return 'mbOkDiab';
      case 'hypertension': return 'mbOkHtn';
      case 'overweight': return 'mbOkWeight';
      case 'pcos':
      case 'thyroid': return 'mbOkPcos';
      default: return 'mbSuitableFilter';
    }
  }
  switch (condition) {
    case 'cholesterol':
      return num(dish.fat) > CHOLESTEROL.fatOk ? 'mbBadHighFat' : num(dish.saturatedFat) > CHOLESTEROL.satFatOk ? 'mbBadHighSatFat' : 'mbBadLowFiber';
    case 'diabetes':
      return num(dish.sugar) > DIABETES.sugarBad ? 'mbBadHighCarbs' : 'mbBadHighCarbs';
    case 'hypertension':
      return 'mbBadHighSodium';
    case 'overweight':
      return num(dish.calories) > OVERWEIGHT.calBad ? 'mbBadHighCalories' : 'mbBadHighFat';
    case 'pcos':
    case 'thyroid':
      return 'mbBadHighCarbs';
    default:
      return 'mbBadHighFat';
  }
}