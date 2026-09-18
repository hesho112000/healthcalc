import React, { useMemo, useState } from 'react';
import { Check, Dumbbell, Droplets, Scale, Smile, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUserData } from '../../hooks/useUserData';
import { MOODS, dayExercises, exercisePoolForConditions, readHubConditions, tk } from './data';
import type { TKey } from './data';
import { addWater, markAllExercises, setMood, setWeight, useHubDaily } from './hubDailyStore';

type QuickActionId = 'exercise' | 'water' | 'mood' | 'weight';

const ACTIONS: Array<{ id: QuickActionId; icon: typeof Dumbbell; labelKey: TKey }> = [
  { id: 'exercise', icon: Dumbbell, labelKey: tk('hub.quickActions.logExercise') },
  { id: 'water', icon: Droplets, labelKey: tk('hub.quickActions.logWater') },
  { id: 'mood', icon: Smile, labelKey: tk('hub.quickActions.logMood') },
  { id: 'weight', icon: Scale, labelKey: tk('hub.quickActions.logWeight') },
];

const QuickActions: React.FC = () => {
  const { t } = useLanguage();
  const { day, key } = useHubDaily();
  const { conditions: dbConditions } = useUserData();
  const [open, setOpen] = useState<QuickActionId | null>(null);
  const [feedback, setFeedback] = useState('');
  const [weightInput, setWeightInput] = useState('');

  const exerciseIds = useMemo(() => {
    const conditions = readHubConditions().length > 0 ? readHubConditions() : dbConditions;
    return dayExercises(exercisePoolForConditions(conditions), 1).slice(0, 5).map((ex) => ex.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flash = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 2000);
  };

  const run = (action: QuickActionId) => {
    if (action === 'exercise') {
      markAllExercises(key, exerciseIds);
      flash(t('hub.quickActions.exerciseDone'));
    } else if (action === 'water') {
      addWater(key, 250);
      flash(t('hub.quickActions.waterAdded'));
    } else if (action === 'mood') {
      setOpen(open === 'mood' ? null : 'mood');
    } else {
      setOpen(open === 'weight' ? null : 'weight');
    }
  };

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A] mb-4">
        <Zap size={16} />
        {t('hub.quickActions.title')}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const isOpen = open === action.id;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => run(action.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-xs font-bold transition ${
                isOpen
                  ? 'border-[#0F4C3A] bg-[#0F4C3A]/5 text-[#0F4C3A]'
                  : 'border-[#EFEBE4] bg-[#FDFBF7] text-[#6B7A75] hover:border-[#D4AF37]/60 hover:text-[#0F4C3A]'
              }`}
            >
              <Icon size={20} className={isOpen ? 'text-[#0F4C3A]' : 'text-[#D4AF37]'} />
              {t(action.labelKey)}
            </button>
          );
        })}
      </div>

      {open === 'mood' && (
        <div className="mt-3 rounded-2xl bg-[#F4F1EB]/60 p-3">
          <div className="flex flex-wrap gap-1.5">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMood(key, m);
                  setOpen(null);
                  flash(t('hub.quickActions.moodLogged'));
                }}
                className={`h-10 w-10 rounded-full border text-lg transition ${
                  day.mood === m ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]' : 'border-[#EFEBE4] bg-white hover:bg-[#FDFBF7]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {open === 'weight' && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#F4F1EB]/60 p-3">
          <input
            autoFocus
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            inputMode="decimal"
            placeholder="kg"
            className="w-24 rounded-xl border border-[#EFEBE4] bg-white px-3 py-2 text-sm text-slate-900 outline-0 focus:border-[#D4AF37]"
          />
          <button
            type="button"
            onClick={() => {
              const kg = parseFloat(weightInput);
              if (Number.isFinite(kg) && kg > 0) {
                setWeight(key, kg);
                setWeightInput('');
                setOpen(null);
                flash(t('hub.quickActions.weightLogged'));
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C3A] px-4 py-2.5 text-xs font-bold text-[#FDFBF7] hover:bg-[#1a6b53] transition"
          >
            <Check size={13} strokeWidth={3} />
            {t('hub.logWeight')}
          </button>
        </div>
      )}

      {feedback && (
        <p className="mt-3 rounded-full bg-[#0F4C3A] px-4 py-2 text-center text-[11px] font-bold text-[#FDFBF7]">
          {feedback}
        </p>
      )}
    </section>
  );
};

export default QuickActions;