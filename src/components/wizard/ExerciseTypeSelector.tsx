import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WIZARD_EXERCISE_TYPES, getWizardExercisesByType } from '../../data/exercises';

const CARD_BASE = 'rounded-[20px] bg-white border-2 border-[#EFEBE4] shadow-[0_2px_12px_rgba(15,76,58,0.06)] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.97] hover:shadow-[0_6px_20px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] relative';

interface Props {
  onSelectType: (typeId: string) => void;
  onAutoBuild: () => void;
  isAutoLoading: boolean;
  selectedType: string | null;
}

export const ExerciseTypeSelector: React.FC<Props> = ({ onSelectType, onAutoBuild, isAutoLoading, selectedType }) => {
  const { t, dir } = useLanguage();
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoLoading || !loadingRef.current || !progressRef.current) return;
    const el = loadingRef.current;
    const bar = progressRef.current;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = 'width 2s ease-in-out';
        bar.style.width = '100%';
      });
    });
    return () => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
    };
  }, [isAutoLoading]);

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="text-center">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#D4AF37]">{t('wizard.exerciseType.eyebrow')}</p>
        <h2 className="mt-2 text-[26px] sm:text-[32px] font-extrabold text-[#0F4C3A] leading-tight">{t('wizard.exerciseType.title')}</h2>
        <p className="mt-2 text-[14px] sm:text-[15px] text-[#6B7A75] leading-relaxed max-w-[520px] mx-auto">{t('wizard.exerciseType.subtitle')}</p>
      </div>

      {/* card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {WIZARD_EXERCISE_TYPES.map((ty) => {
          const isActive = selectedType === ty.id;
          const exercises = getWizardExercisesByType(ty.id);
          return (
            <button
              key={ty.id}
              type="button"
              onClick={() => onSelectType(ty.id)}
              className={`${CARD_BASE} min-h-[140px] sm:min-h-[150px] px-3 py-4 ${isActive ? 'border-[#D4AF37] shadow-[0_4px_24px_rgba(212,175,55,0.25)]' : ''}`}
              dir={dir}
            >
              {isActive && (
                <span className="absolute top-2 end-2 w-6 h-6 rounded-full bg-[#D4AF37] text-[#0F4C3A] text-[12px] flex items-center justify-center font-extrabold shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                  ✓
                </span>
              )}
              <span className="relative text-[36px] leading-none select-none">{ty.emoji}</span>
              <span className="text-[15px] sm:text-[16px] font-bold text-[#0F4C3A] leading-tight mt-1">{t(`wizard.exerciseType.name.${ty.id}` as any)}</span>
              <span className="text-[11.5px] text-[#6B7A75] font-medium">{t('wizard.exerciseType.count').replace('{n}', String(exercises.length))}</span>
            </button>
          );
        })}
      </div>

      {/* auto-build banner */}
      <div
        className="rounded-[24px] p-7 md:p-8 relative overflow-hidden text-white w-full"
        style={{ background: 'linear-gradient(135deg,#0F4C3A 0%,#1a6b53 100%)', boxShadow: '0 8px 20px rgba(212,175,55,0.35)' }}
        dir={dir}
      >
        <div className="absolute -top-10 -end-10 text-[120px] leading-none opacity-[0.08] select-none pointer-events-none">✨</div>
        <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#D4AF37]">{t('wizard.exerciseType.autoBuild.title')}</h3>
        <p className="mt-2 text-[13px] sm:text-[14px] text-white/85 leading-relaxed max-w-[520px]">{t('wizard.exerciseType.autoBuild.desc')}</p>
        <button
          type="button"
          onClick={onAutoBuild}
          disabled={isAutoLoading}
          className="mt-5 h-[52px] px-8 rounded-full bg-[#D4AF37] text-[#0F4C3A] font-extrabold text-[15px] flex items-center gap-2 shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:translate-y-[-1px] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-wait"
        >
          {isAutoLoading ? t('wizard.exerciseType.autoBuild.loading') : t('wizard.exerciseType.autoBuild.cta')}
        </button>
      </div>

      {/* loading bar (shown during auto-build) */}
      <div
        ref={loadingRef}
        className="rounded-[16px] bg-[#F4F1EB] p-4 flex items-center gap-4 transition-all duration-300 opacity-0 translate-y-3"
        style={{ pointerEvents: isAutoLoading ? 'auto' : 'none' }}
      >
        <span className="text-[22px] animate-bounce select-none">🤖</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-[#0F4C3A]">{t('wizard.exerciseType.autoBuild.loading')}</p>
          <div className="mt-2 h-[6px] bg-[#D5D2CC] rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-[#D4AF37] rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
