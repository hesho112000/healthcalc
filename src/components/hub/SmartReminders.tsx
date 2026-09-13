import React, { useEffect, useState } from 'react';
import { BellRing } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tk } from './data';
import LockedCard from './LockedCard';

interface SmartRemindersProps {
  paid: boolean;
  onUnlock: () => void;
  onNote: (message: string) => void;
}

interface ReminderState {
  medication: boolean;
  water: boolean;
  glucose: boolean;
  exercise: boolean;
}

const defaultState: ReminderState = { medication: false, water: false, glucose: false, exercise: false };

const readStored = (): ReminderState => {
  try {
    const raw = localStorage.getItem('hc_hub_reminders');
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object'
      ? { ...defaultState, ...(parsed as Partial<ReminderState>) }
      : defaultState;
  } catch {
    return defaultState;
  }
};

const REMINDER_ITEMS: Array<{ id: keyof ReminderState; emoji: string; key: string }> = [
  { id: 'medication', emoji: '💊', key: 'hub.reminders.medication' },
  { id: 'water', emoji: '💧', key: 'hub.reminders.water' },
  { id: 'glucose', emoji: '🩸', key: 'hub.reminders.glucose' },
  { id: 'exercise', emoji: '🏃', key: 'hub.reminders.exercise' },
];

const SmartReminders: React.FC<SmartRemindersProps> = ({ paid, onUnlock, onNote }) => {
  const { t } = useLanguage();
  const [state, setState] = useState<ReminderState>(readStored);

  useEffect(() => {
    try {
      localStorage.setItem('hc_hub_reminders', JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  if (!paid) {
    return <LockedCard title={t(tk('hub.reminders'))} subtitle={t(tk('hub.reminders.sub'))} onUnlock={onUnlock} />;
  }

  const toggle = (id: keyof ReminderState) => {
    const next = { ...state, [id]: !state[id] };
    setState(next);
    onNote(t(tk('hub.reminders.saved')));
  };

  return (
    <section className="rounded-3xl border border-[#EFEBE4] bg-white p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="w-12 h-12 rounded-2xl bg-[#0F4C3A]/10 flex items-center justify-center shrink-0">
          <BellRing size={20} className="text-[#0F4C3A]" />
        </span>
        <div>
          <span className="block text-[11px] font-extrabold uppercase tracking-[2px] text-[#D4AF37]">{t(tk('hub.reminders'))}</span>
          <p className="mt-1 text-sm text-[#6B7A75]">{t(tk('hub.reminders.sub'))}</p>
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        {REMINDER_ITEMS.map(({ id, emoji, key }) => {
          const active = state[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                active
                  ? 'border-[#0F4C3A] bg-[#0F4C3A] text-[#FDFBF7]'
                  : 'border-[#EFEBE4] bg-white text-[#4A5A55] hover:border-[#0F4C3A]/40'
              }`}
            >
              <span className="mr-1.5">{emoji}</span>
              {t(tk(key))}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SmartReminders;