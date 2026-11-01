import type { Language } from '../types';
import type { PlanDay, PlanMealType } from './mealPlanGenerator';
import { getDishName } from '../data/kitchens';

const PRINT_ROOT_ID = 'meal-plan-print-root';
const PRINT_STYLE_ID = 'meal-plan-print-style';

const FALLBACK_MEAL_LABELS: Record<PlanMealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

export interface MealPlanPdfOptions {
  weeklyPlan: PlanDay[];
  language: Language;
  mealTypeLabel?: (mealType: PlanMealType) => string;
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

const CELL_STYLE = 'border:1px solid #C9D5CF;padding:7px 9px;font-size:11px;line-height:1.4;vertical-align:top;';
const NUMERIC_CELL_STYLE = `${CELL_STYLE}text-align:right;white-space:nowrap;`;
const HEADER_CELL_STYLE = 'border:1px solid #0F4C3A;padding:8px 9px;background-color:#0F4C3A;color:#FFFFFF;font-size:10.5px;font-weight:700;text-align:left;text-transform:uppercase;letter-spacing:0.03em;';
const MEAL_CELL_STYLE = 'border:1px solid #C9D5CF;padding:7px 9px;font-size:11px;line-height:1.4;font-weight:700;color:#0F4C3A;background-color:#F5FAF7;vertical-align:top;';

/**
 * Builds a self-contained, text-only HTML document body for the 7-day meal plan.
 * All data is rendered as static text so the print output never depends on
 * lazy-loaded images, React components, or the surrounding UI.
 */
export function buildMealPlanPrintHtml({ weeklyPlan, language, mealTypeLabel }: MealPlanPdfOptions): string {
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

      if (!meal.dishes || meal.dishes.length === 0) {
        return `<tr>
          <td style="${MEAL_CELL_STYLE}">${mealName}</td>
          <td style="${CELL_STYLE}color:#6B7A75;">&mdash;</td>
          <td style="${NUMERIC_CELL_STYLE}color:#6B7A75;">0</td>
          <td style="${NUMERIC_CELL_STYLE}color:#6B7A75;">0</td>
        </tr>`;
      }

      return meal.dishes.map((dish) => {
        const dishName = escapeHtml(getDishName(dish.dish, language) || dish.dish?.name || '');
        return `<tr>
          <td style="${MEAL_CELL_STYLE}">${mealName}</td>
          <td style="${CELL_STYLE}color:#1F2A26;">${dishName}</td>
          <td style="${NUMERIC_CELL_STYLE}color:#3F4A45;">${formatNumber(dish.grams)} g</td>
          <td style="${NUMERIC_CELL_STYLE}color:#1F2A26;font-weight:700;">${formatNumber(dish.calories)}</td>
        </tr>`;
      });
    }).join('');

    return `<section style="margin:0 0 22px;page-break-inside:auto;">
      <h2 style="margin:0 0 8px;font-size:14px;line-height:1.35;color:#0F4C3A;font-weight:700;page-break-after:avoid;">
        Day ${dayIndex + 1} - Total Calories: ${formatNumber(dayTotal)} kcal
      </h2>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;">
        <colgroup>
          <col style="width:20%;" />
          <col style="width:50%;" />
          <col style="width:15%;" />
          <col style="width:15%;" />
        </colgroup>
        <thead>
          <tr>
            <th style="${HEADER_CELL_STYLE}">Meal Type</th>
            <th style="${HEADER_CELL_STYLE}">Dish Name</th>
            <th style="${HEADER_CELL_STYLE}text-align:right;">Weight (g)</th>
            <th style="${HEADER_CELL_STYLE}text-align:right;">Calories (kcal)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="border:1px solid #C9D5CF;padding:8px 9px;background-color:#EDF5F1;font-size:11px;font-weight:700;color:#0F4C3A;text-align:right;">Day Total</td>
            <td style="border:1px solid #C9D5CF;padding:8px 9px;background-color:#EDF5F1;font-size:11px;font-weight:700;color:#0F4C3A;text-align:right;white-space:nowrap;">${formatNumber(dayTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </section>`;
  }).join('');

  const emptyState = '<p style="margin:0;font-size:12px;line-height:1.6;color:#3F4A45;">Your personalized meal plan is being prepared. Please rebuild the plan and try again.</p>';

  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#1F2A26;background:#FFFFFF;">
    <h1 style="margin:0 0 4px;font-size:20px;line-height:1.3;color:#0F4C3A;font-weight:700;">7-Day Meal Plan - HealthFingerprint</h1>
    <p style="margin:0 0 18px;font-size:11px;line-height:1.5;color:#6B7A75;">A clean, text-based summary of your weekly meals, portions, and calories.</p>
    ${daysHtml || emptyState}
    <p style="margin:16px 0 0;padding-top:10px;border-top:1px solid #E2EAE6;font-size:10px;line-height:1.5;color:#6B7A75;text-align:center;">
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
    color: #1F2A26 !important;
    background: #FFFFFF !important;
    font-family: Arial, Helvetica, sans-serif !important;
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
 * markup, then invokes the browser print dialog with a stylesheet that hides
 * every other element on the page. The container is removed after printing.
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
