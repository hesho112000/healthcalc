import { Cookie, Moon, Plus, RefreshCw, Sun, Utensils, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import type { PlanMealType } from '../../utils/mealPlanGenerator';

export interface MealCardDish {
  id: string;
  name: string;
  grams: number;
  calories: number;
  imageUrl?: string;
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

const MEAL_STYLE: Record<PlanMealType, { icon: LucideIcon; iconClass: string; image: string }> = {
  breakfast: {
    icon: Sun,
    iconClass: 'bg-amber-100 text-amber-600',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&h=200&fit=crop',
  },
  lunch: {
    icon: Utensils,
    iconClass: 'bg-emerald-100 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
  },
  dinner: {
    icon: Moon,
    iconClass: 'bg-indigo-100 text-indigo-600',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  snacks: {
    icon: Cookie,
    iconClass: 'bg-rose-100 text-rose-600',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop',
  },
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
  const { icon: MealIcon, iconClass, image: fallbackImage } = MEAL_STYLE[mealType];
  const panelId = `meal-panel-${mealType}`;
  const preferredImage = dishes.find((dish) => dish.imageUrl)?.imageUrl || fallbackImage;
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const imageUrl = failedImageUrl === preferredImage
    ? (preferredImage === fallbackImage ? null : fallbackImage)
    : preferredImage;
  const description = dishes.length
    ? `${dishes[0].name}${dishes.length > 1 ? ` + ${dishes.length - 1} ${isArabic ? 'أخرى' : 'more'}` : ''}`
    : (isArabic ? 'لا توجد أطباق بعد' : 'No dishes yet');

  return (
    <article className={`mb-4 min-w-0 rounded-3xl border border-gray-100 bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 ease-out touch-manipulation sm:p-5 sm:hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${isExpanded ? 'border-gray-200' : ''}`}>
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-gray-50 ${iconClass}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${title} meal`}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setFailedImageUrl(imageUrl)}
            />
          ) : (
            <MealIcon aria-hidden="true" size={28} strokeWidth={1.8} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="min-w-0 break-words text-start text-[20px] font-bold leading-tight text-gray-900 sm:text-2xl">{title}</h3>
            <span className="inline-flex shrink-0 items-center rounded-full bg-gray-100 px-2.5 py-1 font-medium text-[13px] tabular-nums text-gray-700">
              {calories} kcal
            </span>
          </div>
          <p className="mt-1.5 min-w-0 break-words text-start text-sm font-normal leading-snug text-gray-600">
            <span className="whitespace-nowrap">{time}</span>
            <span aria-hidden="true" className="mx-1.5">•</span>
            <span>{description}</span>
          </p>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? (isArabic ? 'إغلاق تفاصيل الوجبة' : `Collapse ${title}`) : (isArabic ? 'فتح تفاصيل الوجبة' : `Expand ${title}`)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="group relative flex h-14 w-14 shrink-0 touch-manipulation items-center justify-center rounded-full bg-black text-white transition-[transform,background-color] duration-150 hover:scale-105 hover:bg-gray-800 active:scale-95"
        >
          <Plus aria-hidden="true" size={24} className={`transition-[transform,opacity] duration-200 ${isExpanded ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
          <X aria-hidden="true" size={24} className={`absolute transition-[transform,opacity] duration-200 ${isExpanded ? 'rotate-180 scale-100 opacity-100' : 'rotate-0 scale-0 opacity-0'}`} />
        </button>
      </div>

      <div
        id={panelId}
        aria-hidden={!isExpanded}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          {showDoneControl && (
            <label className="mt-4 flex min-h-11 cursor-pointer touch-manipulation items-center justify-end gap-2 text-xs font-medium text-gray-700">
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

          <section aria-label={isArabic ? `أطباق ${title}` : `${title} dishes`} className="mt-4 border-t border-gray-100 pt-4">
            {dishes.length ? (
              <div className="mb-3 divide-y divide-gray-100">
                {dishes.map((dish, dishIndex) => (
                  <div key={dish.id} className={`group flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 ${dish.rowClassName ?? ''}`}>
                    <div className="flex w-full min-w-0 flex-1 flex-wrap items-center gap-2 sm:w-auto">
                      <span className="min-w-0 break-words text-[15px] font-medium text-gray-700">{dish.name}</span>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 font-mono text-xs tabular-nums text-gray-600">{dish.grams}g</span>
                    </div>
                    <div className="flex w-full shrink-0 items-center justify-end gap-1 sm:w-auto">
                      <span className="whitespace-nowrap font-mono text-sm tabular-nums text-gray-600">{dish.calories} kcal</span>
                      <button
                        type="button"
                        aria-label={isArabic ? 'تغيير الوجبة' : 'Change meal'}
                        title={isArabic ? 'تغيير الوجبة' : 'Change meal'}
                        disabled={!isExpanded}
                        tabIndex={isExpanded ? 0 : -1}
                        onClick={() => onSwapDish(dishIndex)}
                        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-colors hover:bg-[#F9FAFB] hover:text-[#0F4C3A] active:scale-95 disabled:pointer-events-none"
                      >
                        <RefreshCw aria-hidden="true" size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={isArabic ? 'إزالة الطبق' : 'Remove dish'}
                        title={isArabic ? 'إزالة الطبق' : 'Remove dish'}
                        disabled={!isExpanded}
                        tabIndex={isExpanded ? 0 : -1}
                        onClick={() => onRemoveDish(dishIndex)}
                        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-[#F3F4F6] text-[#6B7280] transition-colors hover:bg-[#E5E7EB] hover:text-[#EF4444] active:scale-95 disabled:pointer-events-none"
                      >
                        <X aria-hidden="true" size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3 flex flex-col items-center rounded-2xl border border-dashed border-gray-300 px-4 py-6 text-center">
                <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Utensils aria-hidden="true" size={20} />
                </span>
                <p className="text-sm font-medium text-gray-700">
                  {isArabic ? 'لا توجد أطباق بعد. أضف أول طبق!' : 'No dishes yet. Add your first dish!'}
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={!isExpanded}
              tabIndex={isExpanded ? 0 : -1}
              onClick={onAddDish}
              className="flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 active:scale-[0.99] disabled:pointer-events-none"
            >
              <Plus aria-hidden="true" size={18} />
              {isArabic ? 'أضف طبقاً' : 'Add Dish'}
            </button>
          </section>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
