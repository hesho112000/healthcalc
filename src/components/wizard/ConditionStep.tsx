import React from 'react';
import { CONDITION_DATA, CONDITION_IDS } from '../../data/conditions';
import type { ConditionId } from '../../data/conditions';
import type { TKey } from './stepTypes';

type T = (key: TKey) => string;

const tk = (key: string): TKey => key as TKey;

interface ConditionStepProps {
  t: T;
  selected: ConditionId[];
  onToggle: (id: ConditionId) => void;
  onContinue: () => void;
}

const ConditionStep: React.FC<ConditionStepProps> = ({ t, selected, onToggle, onContinue }) => {
  const condName = (id: ConditionId): string => t(tk(`wizard.condition.${id}.name`));

  return (
    <div>
      <p className="text-[#4A5A55] mb-6">{t(tk('wizard.chooseMultiple'))}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CONDITION_IDS.map((id) => {
          const active = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              aria-pressed={active}
              className={`rounded-2xl border bg-white p-4 text-center transition ${
                active
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]'
                  : 'border-[#EFEBE4] hover:border-[#0F4C3A]/40'
              }`}
            >
              <span className="text-3xl block">{CONDITION_DATA[id].icon}</span>
              <strong className={`block mt-2 text-sm ${active ? 'text-[#0F4C3A]' : 'text-slate-900'}`}>
                {condName(id)}
              </strong>
              {active && (
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs text-[#0F4C3A] font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-5 space-y-2">
          {selected.map((id) => (
            <div
              key={id}
              className="rounded-2xl bg-[#F4F1EB]/60 border border-[#EFEBE4] p-4 text-sm text-[#4A5A55] flex gap-3"
            >
              <span className="text-xl shrink-0">{CONDITION_DATA[id].icon}</span>
              <div>
                <b className="text-[#0F4C3A]">{condName(id)}</b>
                <p className="mt-0.5 leading-relaxed">{t(tk(`wizard.condition.${id}.desc`))}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={!selected.length}
        onClick={onContinue}
        className="w-full mt-6 bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3 hover:bg-[#c9a52e] transition disabled:opacity-40"
      >
        {t(tk('wizard.care.next'))}
      </button>
    </div>
  );
};

export default ConditionStep;