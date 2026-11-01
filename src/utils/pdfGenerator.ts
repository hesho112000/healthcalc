import type { Language } from '../types';
import type { PlanDay, PlanMealType } from './mealPlanGenerator';
import { getDishName } from '../data/kitchens/helpers';

const PRINT_ROOT_ID = 'meal-plan-print-root';
const PRINT_STYLE_ID = 'meal-plan-print-style';

const FALLBACK_MEAL_LABELS: Record<PlanMealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

export interface PdfFitnessExercise {
  name: string;
  sets?: string;
  reps?: string;
  dur?: string;
}

export interface MealPlanPdfOptions {
  weeklyPlan: PlanDay[];
  language: Language;
  mealTypeLabel?: (mealType: PlanMealType) => string;
  exercises?: PdfFitnessExercise[];
  workoutDays?: number;
}

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatNumber = (value: number | undefined): string => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? String(Math.round(numeric)) : '0';
};

const TABLE_STYLE = 'border-collapse:collapse;width:100%;margin-bottom:20px;font-size:12px;';
const TH_STYLE = 'background-color:#f4f4f5;border:1px solid #ddd;padding:8px;text-align:left;';
const TD_STYLE = 'border:1px solid #ddd;padding:8px;';
const HEADER_STYLE = 'color:#0f4c3a;margin-top:20px;';
const MEAL_CELL_STYLE = `${TD_STYLE}font-weight:700;color:#0f4c3a;background-color:#f9fbfa;vertical-align:top;`;
const MUTED_CELL_STYLE = `${TD_STYLE}color:#777;`;
const TOTAL_CELL_STYLE = `${TD_STYLE}background-color:#f4f4f5;font-weight:700;color:#0f4c3a;text-align:right;`;

const formatExerciseDetail = (exercise: PdfFitnessExercise): string => {
  const reps = exercise.reps?.trim();
  const repsLabel = reps && !/(sec|min|minute|second)/i.test(reps) ? `${reps} reps` : reps;
  return [exercise.sets?.trim() ? `${exercise.sets.trim()} sets` : '', repsLabel, exercise.dur?.trim()]
    .filter(Boolean)
    .join(' &middot; ');
};

function buildFitnessPlanHtml(exercises: PdfFitnessExercise[] | undefined, workoutDays: number | undefined): string {
  const selectedExercises = Array.isArray(exercises) ? exercises.filter((exercise) => exercise?.name?.trim()) : [];

  if (selectedExercises.length === 0) {
    return `<section>
      <h2 style="${HEADER_STYLE}font-size:16px;margin-bottom:8px;">Your 7-Day Fitness Plan</h2>
      <p style="margin:0 0 20px;font-size:12px;line-height:1.5;color:#777;">No exercises have been selected yet.</p>
    </section>`;
  }

  const trainingDayCount = Math.min(7, Math.max(1, Math.round(Number(workoutDays) || 3)));
  const trainingDays = trainingDayCount === 7
    ? [1, 2, 3, 4, 5, 6, 7]
    : Array.from({ length: trainingDayCount }, (_, index) => Math.round((index * 6) / Math.max(1, trainingDayCount - 1)) + 1);

  const uniqueTrainingDays = [...new Set(trainingDays)];
  const dayBuckets: PdfFitnessExercise[][] = Array.from({ length: 7 }, () => []);

  selectedExercises.forEach((exercise, index) => {
    const day = uniqueTrainingDays[index % uniqueTrainingDays.length];
    dayBuckets[day - 1].push(exercise);
  });

  const rows = dayBuckets.map((dayExercises, dayIndex) => {
    if (dayExercises.length === 0) {
      return `<tr>
        <td style="${TD_STYLE}font-weight:700;color:#0f4c3a;vertical-align:top;">Day ${dayIndex + 1}</td>
        <td style="${MUTED_CELL_STYLE}vertical-align:top;">Rest &amp; recovery</td>
        <td style="${MUTED_CELL_STYLE}vertical-align:top;">&mdash;</td>
      </tr>`;
    }

    const names = dayExercises
      .map((exercise) => `<div style="margin-bottom:3px;">${escapeHtml(exercise.name)}</div>`)
      .join('');
    const details = dayExercises
      .map((exercise) => `<div style="margin-bottom:3px;">${formatExerciseDetail(exercise) || '&mdash;'}</div>`)
      .join('');

    return `<tr>
      <td style="${TD_STYLE}font-weight:700;color:#0f4c3a;vertical-align:top;white-space:nowrap;">Day ${dayIndex + 1}</td>
      <td style="${TD_STYLE}vertical-align:top;">${names}</td>
      <td style="${TD_STYLE}vertical-align:top;white-space:nowrap;">${details}</td>
    </tr>`;
  }).join('');

  return `<section style="page-break-inside:auto;">
    <h2 style="${HEADER_STYLE}font-size:16px;margin-bottom:8px;">Your 7-Day Fitness Plan</h2>
    <p style="margin:0 0 10px;font-size:11px;line-height:1.5;color:#777;">
      ${uniqueTrainingDays.length} training ${uniqueTrainingDays.length === 1 ? 'day' : 'days'} per week &middot; Rest days are included for recovery.
    </p>
    <table cellpadding="0" cellspacing="0" style="${TABLE_STYLE}">
      <colgroup>
        <col style="width:14%;" />
        <col style="width:56%;" />
        <col style="width:30%;" />
      </colgroup>
      <thead>
        <tr>
          <th style="${TH_STYLE}">Day</th>
          <th style="${TH_STYLE}">Exercises</th>
          <th style="${TH_STYLE}">Duration/Reps</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

/**
 * Builds a self-contained, text-only HTML document body for the 7-day meal plan
 * and fitness plan. All data is rendered as static text so the print output
 * never depends on lazy-loaded images, React components, or the surrounding UI.
 */
export function buildMealPlanPrintHtml({
  weeklyPlan,
  language,
  mealTypeLabel,
  exercises,
  workoutDays,
}: MealPlanPdfOptions): string {
  const days = Array.isArray(weeklyPlan) ? weeklyPlan : [];

  const daysHtml = days.map((day, dayIndex) => {
    const computedTotal = (day.meals ?? []).reduce(
      (mealSum, meal) => mealSum + (meal.dishes ?? []).reduce((dishSum, dish) => dishSum + (Number(dish.calories) || 0), 0),
      0
    );
    const dayTotal = computedTotal > 0 ? computedTotal : Number(day.totalCal) || 0;

    const rows = (day.meals ?? []).flatMap((meal) => {
      const mealName = escapeHtml(
        mealTypeLabel?.(meal.mealType) || FALLBACK_MEAL_LABELS[meal.mealType] || meal.label || meal.mealType
      );
      const allDishes = meal.dishes ?? [];
      const visibleDishes = allDishes.slice(0, 3);
      const hiddenDishCount = allDishes.length - visibleDishes.length;

      if (visibleDishes.length === 0) {
        return `<tr>
          <td style="${MEAL_CELL_STYLE}">${mealName}</td>
          <td style="${MUTED_CELL_STYLE}">&mdash;</td>
          <td style="${MUTED_CELL_STYLE}">0</td>
          <td style="${MUTED_CELL_STYLE}">0</td>
        </tr>`;
      }

      return visibleDishes.map((dish, dishIndex) => {
        const dishName = escapeHtml(getDishName(dish.dish, language) || dish.dish?.name || '');
        const moreIndicator = dishIndex === visibleDishes.length - 1 && hiddenDishCount > 0
          ? `<br /><span style="font-size:10px;line-height:1.4;color:#777;font-style:italic;">(and ${hiddenDishCount} more...)</span>`
          : '';

        return `<tr>
          <td style="${MEAL_CELL_STYLE}">${mealName}</td>
          <td style="${TD_STYLE}color:#333;vertical-align:top;">${dishName}${moreIndicator}</td>
          <td style="${TD_STYLE}color:#333;vertical-align:top;white-space:nowrap;">${formatNumber(dish.grams)} g</td>
          <td style="${TD_STYLE}color:#333;font-weight:700;vertical-align:top;white-space:nowrap;">${formatNumber(dish.calories)}</td>
        </tr>`;
      });
    }).join('');

    return `<section style="margin:0 0 12px;page-break-inside:auto;">
      <h2 style="${HEADER_STYLE}font-size:16px;margin-bottom:8px;page-break-after:avoid;">
        Day ${dayIndex + 1} - Total Calories: ${formatNumber(dayTotal)} kcal
      </h2>
      <table cellpadding="0" cellspacing="0" style="${TABLE_STYLE}">
        <colgroup>
          <col style="width:20%;" />
          <col style="width:50%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
        </colgroup>
        <thead>
          <tr>
            <th style="${TH_STYLE}">Meal Type</th>
            <th style="${TH_STYLE}">Dish Name</th>
            <th style="${TH_STYLE}">Weight (g)</th>
            <th style="${TH_STYLE}">Calories (kcal)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="${TOTAL_CELL_STYLE}">Day Total</td>
            <td style="${TOTAL_CELL_STYLE}white-space:nowrap;">${formatNumber(dayTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </section>`;
  }).join('');

  const emptyState = '<p style="margin:0 0 20px;font-size:12px;line-height:1.6;color:#777;">Your personalized meal plan is being prepared. Please rebuild the plan and try again.</p>';
  const fitnessHtml = buildFitnessPlanHtml(exercises, workoutDays);

  return `<div style="font-family:Arial,sans-serif;color:#333;background:#fff;">
    <div style="text-align:center;margin-bottom:16px;">
      <div style="display:inline-block;width:46px;height:46px;line-height:46px;border-radius:12px;background-color:#0f4c3a;color:#fff;font-size:18px;font-weight:700;letter-spacing:0.5px;">HF</div>
      <div style="margin-top:6px;font-size:11px;line-height:1.4;color:#666;letter-spacing:1.5px;text-transform:uppercase;">HealthFingerprint</div>
    </div>
    <h1 style="${HEADER_STYLE}font-size:22px;line-height:1.3;text-align:center;margin-bottom:4px;">7-Day Meal Plan - HealthFingerprint</h1>
    <p style="margin:0 0 8px;font-size:12px;line-height:1.5;color:#666;text-align:center;">
      A clean, text-based summary of your weekly meals, portions, calories, and exercises.
    </p>
    ${daysHtml || emptyState}
    ${fitnessHtml}
    <p style="margin:16px 0 0;padding-top:10px;border-top:1px solid #ddd;font-size:10px;line-height:1.5;color:#777;text-align:center;">
      Generated by HealthFingerprint &middot; For educational purposes only.
    </p>
  </div>`;
}

const PRINT_STYLES = `
@media print {
  @page { size: A4 portrait; margin: 12mm; }

  html,
  body {
    background: #FFFFFF !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Hide the entire application UI. Only the dedicated print container is rendered. */
  body > * {
    display: none !important;
  }

  body > #${PRINT_ROOT_ID} {
    display: block !important;
    width: 100% !important;
  }

  #${PRINT_ROOT_ID} {
    display: block !important;
    width: 100% !important;
    color: #333 !important;
    background: #FFFFFF !important;
    font-family: Arial, sans-serif !important;
  }

  #${PRINT_ROOT_ID} * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  #${PRINT_ROOT_ID} table {
    width: 100% !important;
    border-collapse: collapse !important;
  }

  #${PRINT_ROOT_ID} thead {
    display: table-header-group;
  }

  #${PRINT_ROOT_ID} tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  #${PRINT_ROOT_ID} h1,
  #${PRINT_ROOT_ID} h2 {
    break-after: avoid;
    page-break-after: avoid;
  }
}
`;

function ensurePrintStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PRINT_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = PRINT_STYLE_ID;
  style.textContent = PRINT_STYLES;
  document.head.appendChild(style);
}

/**
 * Creates a hidden, print-only container populated with the clean meal-plan
 * and fitness-plan markup, then invokes the browser print dialog with a
 * stylesheet that hides every other element on the page. The container is
 * removed after printing.
 */
export function printMealPlanPdf(options: MealPlanPdfOptions): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  document.getElementById(PRINT_ROOT_ID)?.remove();
  ensurePrintStyles();

  const printRoot = document.createElement('div');
  printRoot.id = PRINT_ROOT_ID;
  printRoot.setAttribute('aria-hidden', 'true');
  printRoot.style.display = 'none';
  printRoot.innerHTML = buildMealPlanPrintHtml(options);
  document.body.appendChild(printRoot);

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    printRoot.remove();
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  window.setTimeout(() => window.print(), 100);
}
