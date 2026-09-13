export interface PlanStoragePayload {
  conditions: string[];
  profile: Record<string, unknown>;
  labs?: Record<string, Record<string, number>>;
  lifestyle?: object;
  goal?: object;
  cuisine?: string;
  exerciseTypes?: string[];
  foodNames?: string[];
  exerciseIds?: string[];
  calories?: number;
  dailyKcal?: number;
  calorieFloor?: number;
  kcalExtended?: boolean;
  kcalBreakdown?: Record<string, number>;
  meals?: number;
  snacks?: number;
  focusCondition?: string | null;
  overall?: number | null;
  projected?: number | null;
  version?: number;
}

export const savePlanToStorage = (data: PlanStoragePayload): void => {
  try {
    const plan: Record<string, unknown> = {
      version: data.version ?? 3,
      savedAt: Date.now(),
      conditions: data.conditions,
      profile: data.profile,
      lifestyle: data.lifestyle ?? {},
      goal: data.goal ?? {},
      cuisine: data.cuisine ?? '',
      foodNames: data.foodNames ?? [],
      exerciseIds: data.exerciseIds ?? [],
      exerciseTypes: data.exerciseTypes ?? [],
      calories: data.calories ?? data.dailyKcal ?? 0,
      dailyKcal: data.dailyKcal ?? data.calories ?? 0,
      calorieFloor: data.calorieFloor ?? 0,
      kcalExtended: data.kcalExtended ?? false,
      kcalBreakdown: data.kcalBreakdown ?? {},
      meals: data.meals ?? 0,
      snacks: data.snacks ?? 0,
      focusCondition: data.focusCondition ?? null,
      overall: data.overall ?? null,
      projected: data.projected ?? null,
    };

    localStorage.setItem('hc_advanced_care_plan', JSON.stringify(plan));
    localStorage.setItem('healthcalc_plan', JSON.stringify(plan));
    localStorage.setItem('healthcalc_conditions', JSON.stringify(data.conditions));
    localStorage.setItem('healthcalc_user_profile', JSON.stringify(data.profile));
    if (data.labs && Object.keys(data.labs).length > 0) {
      localStorage.setItem('healthcalc_labs', JSON.stringify(data.labs));
    }
  } catch {
    /* ignore */
  }
};