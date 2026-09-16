import React, { useState, useEffect } from 'react';
import { useAuth, hasPremiumAccess } from '../context/AuthContext';
import HealthMetricsWidget from '../features/health-tools/HealthMetricsWidget';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';
import { supabase } from '../lib/supabase';

const DashboardPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'history' | 'profile'>('history');
  const [profileForm, setProfileForm] = useState({ name: user?.name || '' });
  const [pwForm, setPwForm] = useState({ newPw: '', confirm: '' });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });
  const { t, language } = useLanguage();
  const fmtDate = (d: string | Date, opts?: Intl.DateTimeFormatOptions) => new Date(d).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', opts);

  useEffect(() => {
    if (user) setProfileForm({ name: user.name || '' });
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, full_name: profileForm.name.trim(), updated_at: new Date().toISOString() }, { onConflict: 'id' });
      if (error) throw error;
      updateUser({ ...user, name: profileForm.name.trim() });
      setProfileMsg({ type: 'success', text: t('dashProfileUpdated') });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg({ type: '', text: '' });
    if (pwForm.newPw !== pwForm.confirm) {
      setPwMsg({ type: 'error', text: t('dashPasswordsNoMatch') });
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwMsg({ type: 'error', text: t('dashPasswordMin') });
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPw });
      if (error) throw error;
      setPwForm({ newPw: '', confirm: '' });
      setPwMsg({ type: 'success', text: t('dashPasswordChanged') });
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err.message });
    }
  };

  const [showCheckout, setShowCheckout] = useState(false);
  const isPremium = hasPremiumAccess(user);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} onSuccess={() => setShowCheckout(false)} price="$15/year" />
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">{t('dashWelcome')} {user?.name}</h1>
                <p className="text-primary-200 text-sm">{user?.email} · {isPremium ? `✨ ${t('premium')}` : t('dashFreePlan')}{user?.subscription_end_date && isPremium ? ` · ${t('dashRenews')} ${fmtDate(user.subscription_end_date)}` : ''}</p>
              </div>
            </div>
            {!isPremium && (
              <button onClick={() => setShowCheckout(true)} className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {t('upgradeToPremium') || 'Upgrade — $15/year'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="toggle-group mb-8">
          {[
            { key: 'history' as const, label: `📊 ${t('dashHealthHistory')}` },
            { key: 'profile' as const, label: `👤 ${t('dashProfileSettings')}` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'toggle-btn-active flex items-center gap-2' : 'toggle-btn-inactive flex items-center gap-2'}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'history' && <HealthMetricsWidget />}

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                {t('dashProfileInfo')}
              </h3>

              {profileMsg.text && (
                <div className={`text-sm px-4 py-2.5 rounded-2xl mb-4 ${profileMsg.type === 'success' ? 'bg-sage-50 text-sage-700 border border-sage-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {profileMsg.text}
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="label">{t('dashName')}</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">{t('dashEmail')}</label>
                  <input type="email" value={user?.email || ''} className="input-field bg-gray-50" disabled />
                  <p className="text-[11px] text-gray-400 mt-1">{t('dashEmailCantChange')}</p>
                </div>
                <div>
                  <label className="label">{t('dashSubscription')}</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge ${isPremium ? 'badge-amber' : 'bg-gray-100 text-gray-600'}`}>
                      {isPremium ? '✨ Premium ($15/year)' : t('dashFreePlan')}
                    </span>
                    {user?.subscription_end_date && (
                      <span className="text-xs text-gray-500">
                        {t('dashRenews')} {fmtDate(user.subscription_end_date)}
                      </span>
                    )}
                    {!isPremium && (
                      <button type="button" onClick={() => setShowCheckout(true)} className="text-xs text-amber-600 font-semibold hover:underline">{t('dashUpgrade')} →</button>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn-primary">{t('dashSaveChanges')}</button>
              </form>
            </div>

            <div className="card">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-50 rounded-xl flex items-center justify-center">
                  <span className="text-sm">🔒</span>
                </div>
                {t('dashChangePassword')}
              </h3>

              {pwMsg.text && (
                <div className={`text-sm px-4 py-2.5 rounded-2xl mb-4 ${pwMsg.type === 'success' ? 'bg-sage-50 text-sage-700 border border-sage-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {pwMsg.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="label">{t('dashNewPassword')}</label>
                  <input
                    type="password"
                    required
                    placeholder={t('dashMinChars')}
                    value={pwForm.newPw}
                    onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">{t('dashConfirmPassword')}</label>
                  <input
                    type="password"
                    required
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                    className="input-field"
                  />
                </div>
                <button type="submit" className="btn-primary">{t('dashUpdatePassword')}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;