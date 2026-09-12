import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface SavedPlan {
  version?: number;
  savedAt?: number;
  conditions?: string[];
  profile?: { age: number; height: number; weight: number; gender: string };
  foodNames?: string[];
  exerciseIds?: string[];
  calories?: number;
  calorieFloor?: number;
  meals?: number;
  snacks?: number;
  focusCondition?: string | null;
}

const SignupPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [terms, setTerms] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const plan = useMemo<SavedPlan | null>(() => {
    try {
      const raw = localStorage.getItem('hc_advanced_care_plan');
      return raw ? (JSON.parse(raw) as SavedPlan) : null;
    } catch {
      return null;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError(t('wizard.signup.errorRequired'));
      return;
    }
    if (!terms) {
      setError(t('wizard.signup.errorTerms'));
      return;
    }
    localStorage.setItem(
      'hc_advanced_care_account',
      JSON.stringify({ name: form.name.trim(), email: form.email.trim(), createdAt: Date.now() }),
    );
    localStorage.setItem('hc_advanced_care_session', 'active');
    let healthUser: Record<string, unknown> | null = null;
    try {
      const raw = localStorage.getItem('healthcalc-user');
      healthUser = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    } catch {
      healthUser = null;
    }
    localStorage.setItem(
      'healthcalc-user',
      JSON.stringify({ ...(healthUser || {}), name: form.name.trim(), email: form.email.trim() }),
    );
    navigate('/dashboard/plan');
  };

  const mealSlotLabel = (kind: string): string => {
    if (kind === 'breakfast') return t('wizard.step6.mealBreakfast');
    if (kind === 'lunch') return t('wizard.step6.mealLunch');
    if (kind === 'dinner') return t('wizard.step6.mealDinner');
    return t('wizard.step6.mealSnack');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 py-12" dir={dir}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 justify-center">
            <div className="w-11 h-11 bg-[#0F4C3A] rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-xl">🩺</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#0F4C3A]">Health</span>
              <span className="text-xl font-extrabold text-[#D4AF37]">Calc</span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#0F4C3A] tracking-tight">{t('wizard.signup.title')}</h1>
        </div>

        {plan && (
          <div className="mb-6 rounded-[20px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] border-2 border-[#D4AF37] p-5 text-[#FDFBF7]">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-extrabold text-[#D4AF37]">{plan.conditions?.length ?? 0}</div>
                <div className="text-[11px] text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.planHeader')}</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#D4AF37]">{plan.calories ?? 0}</div>
                <div className="text-[11px] text-[#FDFBF7]/80 mt-0.5">{t('wizard.step6.summary.calories').replace('{kcal}', '')}</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#D4AF37]">{plan.foodNames?.length ?? 0}</div>
                <div className="text-[11px] text-[#FDFBF7]/80 mt-0.5">{t('wizard.preview.meals').replace('{count}', String(plan.foodNames?.length ?? 0))}</div>
              </div>
            </div>
            <div className="mt-3 border-t border-[#FDFBF7]/15 pt-2 text-xs text-[#FDFBF7]/80">
              {t('wizard.step6.privacyNote')}
            </div>
          </div>
        )}

        <div className="rounded-3xl bg-white border border-[#EFEBE4] p-7 shadow-[0_10px_40px_-20px_rgba(15,76,58,0.15)]">
          {error && (
            <div className="bg-[#B91C1C]/5 border border-[#B91C1C]/20 text-[#B91C1C] text-sm px-4 py-3 rounded-2xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F4C3A] mb-1.5">{t('wizard.signup.name')}</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F4C3A] mb-1.5">{t('wizard.signup.email')}</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-[#EFEBE4] px-4 py-3 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F4C3A] mb-1.5">{t('wizard.signup.password')}</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl border border-[#EFEBE4] px-4 py-3 pr-14 outline-none focus:border-[#D4AF37] bg-[#F4F1EB]/40 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShow((value) => !value)}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-xs font-bold text-[#0F4C3A] bg-[#F4F1EB] rounded-full px-2.5 py-1"
                >
                  {show ? t('wizard.signup.hide') : t('wizard.signup.show')}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-[#6B7A75] cursor-pointer">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0F4C3A]" />
              <span>{t('wizard.signup.terms')}</span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#0F4C3A] font-bold rounded-full px-6 py-3.5 hover:bg-[#c9a52e] transition"
            >
              {t('wizard.signup.cta')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B7A75]">
              <Link to="/login" className="text-[#0F4C3A] font-semibold hover:underline">
                {t('wizard.signup.login')}
              </Link>
            </p>
          </div>
        </div>

        {plan?.profile && (
          <p className="text-center text-xs text-[#6B7A75] mt-6">
            {t('wizard.age')}: {plan.profile.age} · {t('wizard.weight')}: {plan.profile.weight} kg · {mealSlotLabel('snack')}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;