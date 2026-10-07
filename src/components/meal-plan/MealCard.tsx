import { Apple, Moon, Plus, RefreshCw, Sun, Utensils, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';
import type { PlanMealType } from '../../utils/mealPlanGenerator';

export interface MealCardDish {
  id: string;
  name: string;
  grams: number;
  calories: number;
  rowClassName?: string;
}

interface MealCardProps {
  mealType: PlanMealType;
  title: string;
  time: string;
  calories: number;
  dishes: MealCardDish[];
  isExpanded: boolean;
  isDone: boolean;
  showDoneControl: boolean;
  isArabic: boolean;
  onToggle: () => void;
  onAddDish: () => void;
  onSwapDish: (dishIndex: number) => void;
  onRemoveDish: (dishIndex: number) => void;
  onDoneChange: (done: boolean) => void;
}

const MEAL_STYLE: Record<PlanMealType, { icon: LucideIcon; iconClass: string }> = {
  breakfast: { icon: Sun, iconClass: 'bg-amber-100 text-amber-600' },
  lunch: { icon: Utensils, iconClass: 'bg-emerald-100 text-emerald-600' },
  dinner: { icon: Moon, iconClass: 'bg-indigo-100 text-indigo-600' },
  snacks: { icon: Apple, iconClass: 'bg-rose-100 text-rose-600' },
};

const MealCard: FC<MealCardProps> = ({
  mealType,
  title,
  time,
  calories,
  dishes,
  isExpanded,
  isDone,
  showDoneControl,
  isArabic,
  onToggle,
  onAddDish,
  onSwapDish,
  onRemoveDish,
  onDoneChange,
}) => {
  const { icon: MealIcon, iconClass } = MEAL_STYLE[mealType];
  const panelId = `meal-panel-${mealType}`;

  return (
    <article className={`min-w-0 rounded-2xl border bg-white px-4 py-3.5 font-sans shadow-sm transition-all duration-150 hover:shadow-md ${isExpanded ? 'border-gray-200' : 'border-gray-100'}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-3 text-start"
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
            <MealIcon aria-hidden="true" size={19} strokeWidth={1.9} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[14px] font-semibold leading-tight text-gray-900">{title}</span>
            <span className="truncate text-xs leading-tight text-gray-500">{time}</span>
          </span>
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 font-mono text-[12px] tabular-nums text-gray-700">
            {calories} <span className="font-sans">kcal</span>
          </span>
        </button>
        <button
          type="button"
          aria-label={isExpanded ? (isArabic ? 'إغلاق تفاصيل الوجبة' : `Collapse ${title}`) : (isArabic ? 'فتح تفاصيل الوجبة' : `Expand ${title}`)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors group-hover:border-gray-300 group-hover:bg-gray-50">
            <Plus aria-hidden="true" size={17} className={`transition-transform duration-200 ${isExpanded ? 'rotate-45' : 'rotate-0'}`} />
          </span>
        </button>
      </div>

      <div
        id={panelId}
        aria-hidden={!isExpanded}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <section aria-label={isArabic ? `أطباق ${title}` : `${title} dishes`} className="mt-4 border-t border-gray-100 pt-3.5">
            {showDoneControl && (
              <label className="mb-3 flex min-h-8 cursor-pointer items-center justify-end gap-2 text-xs font-medium text-gray-500">
                <input
                  type="checkbox"
                  checked={isDone}
                  disabled={!isExpanded}
                  onChange={(event) => onDoneChange(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#0F4C3A]"
                />
                {isArabic ? 'تحديد الوجبة كمكتملة' : 'Mark as done'}
              </label>
            )}

            {dishes.length ? (
              <div className="mb-3 space-y-1">
                {dishes.map((dish, dishIndex) => (
                  <div
                    key={dish.id}
                    className={`group grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-1.5 rounded-xl px-1.5 py-2 transition-colors hover:bg-gray-50 sm:gap-2 ${dish.rowClassName ?? ''}`}
                  >
                    <span title={dish.name} className="min-w-0 truncate text-[13px] font-medium text-gray-700">{dish.name}</span>
                    <span className="whitespace-nowrap rounded-md bg-gray-100 px-1.5 py-1 font-mono text-[11px] tabular-nums text-gray-500">{dish.grams}g</span>
                    <span className="whitespace-nowrap font-mono text-[12px] tabular-nums text-gray-600">{dish.calories} kcal</span>
                    <span className="flex items-center gap-0.5">
                      <button
                        type="button"
                        aria-label={isArabic ? 'تبديل الطبق' : `Swap ${dish.name}`}
                        title={isArabic ? 'تبديل الطبق' : 'Swap dish'}
                        disabled={!isExpanded}
                        tabIndex={isExpanded ? 0 : -1}
                        onClick={() => onSwapDish(dishIndex)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-700 disabled:pointer-events-none sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                      >
                        <RefreshCw aria-hidden="true" size={14} />
                      </button>
                      <button
                        type="button"
                        aria-label={isArabic ? 'إزالة الطبق' : `Remove ${dish.name}`}
                        title={isArabic ? 'إزالة الطبق' : 'Remove dish'}
                        disabled={!isExpanded}
                        tabIndex={isExpanded ? 0 : -1}
                        onClick={() => onRemoveDish(dishIndex)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                      >
                        <X aria-hidden="true" size={15} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3 flex flex-col items-center rounded-xl bg-[#F9FAFB] px-4 py-5 text-center">
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0F4C3A] shadow-sm">
                  <Utensils aria-hidden="true" size={18} />
                </span>
                <p className="text-[13px] font-medium text-gray-600">
                  {isArabic ? 'لا توجد أطباق بعد. أضف أول طبق!' : 'No dishes yet. Add your first dish!'}
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={!isExpanded}
              tabIndex={isExpanded ? 0 : -1}
              onClick={onAddDish}
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-[13px] font-semibold text-gray-500 transition-colors hover:border-[#0F4C3A]/40 hover:bg-gray-50 hover:text-[#0F4C3A] disabled:pointer-events-none"
            >
              <Plus aria-hidden="true" size={16} />
              {isArabic ? 'أضف طبقاً' : 'Add Dish'}
            </button>
          </section>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
