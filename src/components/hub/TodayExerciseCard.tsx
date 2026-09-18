import React, { useMemo } from 'react';
import { CheckCircle2, Dumbbell, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUserData } from '../../hooks/useUserData';
import { dayExercises, exerciseEmoji, exerciseName, exercisePoolForConditions, readHubConditions } from './data';
import { markAllExercises, toggleExercise, useHubDaily } from './hubDailyStore';

const TodayExerciseCard: React.FC = () => {
  const { t, language: lang } = useLanguage();
  const { day, key } = useHubDaily();
  const { conditions: dbConditions } = useUserData();

  const conditions = readHubConditions().length > 0 ? readHubConditions() : dbConditions;
  const exercises = useMemo(
    () => dayExercises(exercisePoolForConditions(conditions), 1).slice(0, 5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const doneCount = exercises.filter((ex) => day.exercises.includes(ex.id)).length;

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A]">
          <Dumbbell size={16} />
          {t('hub.exercise.todayExercise')}
        </h3>
        <span className="text-[11px] font-bold text-[#6B7A75] tabular-nums">
          {doneCount}/{exercises.length}
        </span>
      </div>

      <div className="space-y-2">
        {exercises.map((ex) => {
          const done = day.exercises.includes(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => toggleExercise(key, ex.id)}
              className={`w-full flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-start transition ${
                done
                  ? 'border-[#0F4C3A]/30 bg-[#0F4C3A]/5 opacity-70'
                  : 'border-[#EFEBE4] bg-[#FDFBF7] hover:border-[#D4AF37]/60'
              }`}
            >
              <span
                className={`h-9 w-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                  done ? 'bg-[#0F4C3A]/10' : 'bg-[#F4F1EB]'
                }`}
              >
                {exerciseEmoji(ex.type)}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-sm font-bold ${done ? 'line-through text-[#6B7A75]' : 'text-[#0F4C3A]'}`}>
                  {exerciseName(ex, lang)}
                </span>
                <span className="block text-[11px] text-[#6B7A75]">
                  {ex.duration} · <Flame size={11} className="inline text-[#D4AF37]" /> {ex.calories} kcal
                </span>
              </span>
              {done ? (
                <CheckCircle2 size={18} className="shrink-0 text-[#0F4C3A]" />
              ) : (
                <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#D4AF37]" />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => markAllExercises(key, exercises.map((ex) => ex.id))}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-4 py-3 text-xs font-extrabold text-[#0F4C3A] hover:bg-[#c9a52e] transition"
      >
        <CheckCircle2 size={15} strokeWidth={2.5} />
        {t('hub.exercise.markAllDone')}
      </button>
    </section>
  );
};

export default TodayExerciseCard;