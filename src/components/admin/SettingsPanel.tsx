import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ADMIN_PASSWORD_OVERRIDE_KEY } from '../../context/AdminContext';

const SITE_NAME_KEY = 'healthcalc_site_name';
const SITE_DESC_KEY = 'healthcalc_site_desc';
const FEATURE_PHONE_KEY = 'hc_feature_phone_auth';
const FEATURE_AI_KEY = 'hc_feature_ai_chat';

const read = (key: string, fallback: string): string => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const readFlag = (key: string, fallback: boolean): boolean => {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === '1';
  } catch {
    return fallback;
  }
};

const write = (key: string, value: string | boolean): void => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
};

const SettingsPanel: React.FC = () => {
  const { t } = useLanguage();
  const [siteName, setSiteName] = useState(() => read(SITE_NAME_KEY, 'HealthCalc'));
  const [siteDesc, setSiteDesc] = useState(() => read(SITE_DESC_KEY, 'Free health calculators & personalized care plans.'));
  const [newPassword, setNewPassword] = useState('');
  const [phoneAuth, setPhoneAuth] = useState(() => readFlag(FEATURE_PHONE_KEY, false));
  const [aiChat, setAiChat] = useState(() => readFlag(FEATURE_AI_KEY, true));
  const [toast, setToast] = useState(false);

  const saveAll = () => {
    write(SITE_NAME_KEY, siteName.trim() || 'HealthCalc');
    write(SITE_DESC_KEY, siteDesc.trim());
    if (newPassword.trim().length >= 6) {
      write(ADMIN_PASSWORD_OVERRIDE_KEY, newPassword.trim());
      setNewPassword('');
    }
    write(FEATURE_PHONE_KEY, phoneAuth);
    write(FEATURE_AI_KEY, aiChat);
    setToast(true);
    window.setTimeout(() => setToast(false), 2500);
  };

  const fieldClass =
    'mt-1 w-full rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] px-3 py-2.5 text-sm font-semibold text-[#0F4C3A] placeholder-[#94A3B8] outline-none focus:border-[#D4AF37]';

  return (
    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] p-5">
          <h3 className="text-sm font-extrabold text-[#0F4C3A]">{t('admin.settings.siteName')}</h3>
          <p className="mt-1 text-xs font-semibold text-[#6B7A75]">{t('admin.settings.siteDescription')}</p>
          <label className="mt-3 block">
            <span className="text-xs font-bold text-[#6B7A75]">{t('admin.settings.siteName')}</span>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className={fieldClass} />
          </label>
          <label className="mt-3 block">
            <span className="text-xs font-bold text-[#6B7A75]">{t('admin.settings.siteDescription')}</span>
            <textarea
              rows={2}
              value={siteDesc}
              onChange={(e) => setSiteDesc(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] p-5">
          <h3 className="text-sm font-extrabold text-[#0F4C3A]">{t('admin.settings.adminPassword')}</h3>
          <p className="mt-1 text-xs font-semibold text-[#6B7A75]">{t('admin.settings.newPassword')}</p>
          <label className="mt-3 block">
            <span className="text-xs font-bold text-[#6B7A75]">{t('admin.settings.newPassword')}</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t('admin.settings.newPassword')}
              className={fieldClass}
            />
          </label>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#EFEBE4] bg-[#FDFBF7] p-5">
        <h3 className="text-sm font-extrabold text-[#0F4C3A]">{t('admin.settings.featureToggles')}</h3>
        <div className="mt-3 space-y-3">
          {(
            [
              { label: t('admin.settings.phoneAuth'), value: phoneAuth, setter: setPhoneAuth, key: FEATURE_PHONE_KEY },
              { label: t('admin.settings.aiChat'), value: aiChat, setter: setAiChat, key: FEATURE_AI_KEY },
            ] as const
          ).map((f) => (
            <label key={f.key} className="flex cursor-pointer items-center justify-between gap-4">
              <span className="text-sm font-bold text-[#0F4C3A]">{f.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={f.value}
                onClick={() => f.setter(!f.value)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  f.value ? 'bg-[#0F4C3A]' : 'bg-[#EFEBE4]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    f.value ? 'start-[22px]' : 'start-0.5'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {toast && (
          <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#0F4C3A]" role="status" aria-live="polite" aria-atomic="true">
            <Check size={16} strokeWidth={2.5} /> {t('admin.settings.saved')}
          </span>
        )}
        <div className="ms-auto">
          <button
            type="button"
            onClick={saveAll}
            className="rounded-xl bg-[#D4AF37] text-[#0F4C3A] px-6 py-2.5 text-sm font-extrabold shadow-[0_8px_20px_rgba(212,175,55,0.35)] hover:bg-[#c9a12f] transition-colors"
          >
            {t('admin.settings.savePassword')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;