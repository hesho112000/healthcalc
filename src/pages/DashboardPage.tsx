import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, hasPremiumAccess } from '../context/AuthContext';
import { api, HealthRecord, StatsResponse } from '../utils/api';
import HealthMetricsWidget from '../components/HealthMetricsWidget';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';

const getModuleLabels = (t: (k: any) => string): Record<string, { label: string; color: string; icon: string }> => ({
  'weight-loss': { label: t('weightLoss'), color: 'bg-primary-100 text-primary-700', icon: '🏋️' },
  'diabetes': { label: t('diabetes'), color: 'bg-red-100 text-red-700', icon: '🔬' },
  'premium-ibs': { label: `${t('homeIBS')} ${t('plan')}`, color: 'bg-purple-100 text-purple-700', icon: '🩺' },
  'premium-gout': { label: `${t('homeGout')} ${t('plan')}`, color: 'bg-blue-100 text-blue-700', icon: '🦴' },
  'premium-kidney': { label: `${t('homeKidney')} ${t('plan')}`, color: 'bg-green-100 text-green-700', icon: '🫘' },
  'premium-liver': { label: `${t('homeLiver')} ${t('plan')}`, color: 'bg-amber-100 text-amber-700', icon: '🫁' },
  'premium-cholesterol': { label: `${t('homeCholesterol')} ${t('plan')}`, color: 'bg-pink-100 text-pink-700', icon: '🫀' },
  'premium-thyroid': { label: `${t('homeThyroid')} ${t('plan')}`, color: 'bg-teal-100 text-teal-700', icon: '🦋' },
});

const DashboardPage: React.FC = () => {
  const { user, updateUser, backendUp } = useAuth();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'profile'>('history');
  const [profileForm, setProfileForm] = useState({ name: user?.name || '' });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });
  const { t, language } = useLanguage();
  const moduleLabels = getModuleLabels(t);
  const fmtDate = (d: string | Date, opts?: Intl.DateTimeFormatOptions) => new Date(d).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', opts);

  const limit = 10;

  useEffect(() => {
    loadData();
  }, [filter, page]);

  useEffect(() => {
    if (user) setProfileForm({ name: user.name });
  }, [user]);

  const loadData = async () => {
    if (!backendUp) { setLoading(false); return; }
    setLoading(true);
    try {
      const [histData, statsData] = await Promise.all([
        api.getHealthHistory(filter || undefined, limit, page * limit),
        api.getStats(),
      ]);
      setRecords(histData.data);
      setTotal(histData.total);
      setStats(statsData);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t('dashDeleteConfirm'))) return;
    setDeletingId(id);
    try {
      await api.deleteHealthRecord(id);
      await loadData();
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    try {
      const data = await api.updateProfile(profileForm.name);
      updateUser(data.user);
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
      await api.changePassword(pwForm.current, pwForm.newPw);
      setPwForm({ current: '', newPw: '', confirm: '' });
      setPwMsg({ type: 'success', text: t('dashPasswordChanged') });
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err.message });
    }
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const totalPages = Math.ceil(total / limit);
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
        {!backendUp && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">{t('dashOfflineTitle') || 'Offline Mode'}</p>
              <p className="text-amber-600 text-xs mt-0.5">{t('dashOfflineDesc') || 'Server is unavailable. Health history is stored locally on this device.'}</p>
            </div>
          </div>
        )}
        <div className="toggle-group mb-8">
          {[
            { key: 'history' as const, label: `📊 ${t('dashHealthHistory')}`, count: total },
            { key: 'profile' as const, label: `👤 ${t('dashProfileSettings')}` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'toggle-btn-active flex items-center gap-2' : 'toggle-btn-inactive flex items-center gap-2'}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'history' && <HealthMetricsWidget />}

        {activeTab === 'history' && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="stat-card bg-gradient-to-br from-primary-50 to-white border-primary-100">
              <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">{t('dashTotalRecords')}</p>
              <p className="text-3xl font-black text-primary-700">{stats.totalRecords}</p>
            </div>
            <div className="stat-card bg-gradient-to-br from-sage-50 to-white border-sage-100">
              <p className="text-xs font-semibold text-sage-600 uppercase tracking-wider mb-1">{t('dashModulesUsed')}</p>
              <p className="text-3xl font-black text-sage-700">{stats.byModule.length}</p>
            </div>
            <div className="stat-card bg-gradient-to-br from-amber-50 to-white border-amber-100">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">{t('dashMemberSince')}</p>
              <p className="text-lg font-black text-amber-700">{user?.created_at ? fmtDate(user.created_at, { month: 'short', year: 'numeric' }) : t('dashNA')}</p>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => { setFilter(''); setPage(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${!filter ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {t('dashAll')}
              </button>
              {Object.entries(moduleLabels).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => { setFilter(key); setPage(0); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === key ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                  {val.icon} {val.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="card text-center py-16">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-gray-500">{t('dashLoading')}</p>
              </div>
            ) : records.length === 0 ? (
              <div className="card text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('dashNoRecords')}</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">
                  {t('dashNoRecordsDesc')}
                </p>
                <Link to="/weight-loss" className="btn-primary inline-block">
                  {t('dashTryCalc')} →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="hidden md:block card overflow-hidden p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">{t('dashDate')}</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">{t('dashModule')}</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">{t('dashKeyData')}</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">{t('dashNotes')}</th>
                        <th className="text-right px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">{t('dashActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {records.map((rec) => {
                        const mod = moduleLabels[rec.module] || { label: rec.module, color: 'bg-gray-100 text-gray-700', icon: '📄' };
                        return (
                          <tr key={rec.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{formatDate(rec.date)}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium ${mod.color}`}>
                                {mod.icon} {mod.label}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-gray-600 max-w-xs truncate">
                              {rec.module === 'weight-loss' && rec.results.targetCalories && (
                                <span>{rec.results.targetCalories} kcal · {rec.inputs.weight}kg · {rec.inputs.goal}</span>
                              )}
                              {rec.module === 'diabetes' && (
                                <span>FBG: {rec.inputs.fastingGlucose} · HbA1c: {rec.inputs.hba1c}</span>
                              )}
                              {!['weight-loss', 'diabetes'].includes(rec.module) && (
                                <span>{JSON.stringify(rec.inputs).slice(0, 60)}...</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-gray-500 max-w-[120px] truncate italic">{rec.notes || '—'}</td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => handleDelete(rec.id)}
                                disabled={deletingId === rec.id}
                                className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                {deletingId === rec.id ? '...' : t('dashDelete')}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-3">
                  {records.map((rec) => {
                    const mod = moduleLabels[rec.module] || { label: rec.module, color: 'bg-gray-100 text-gray-700', icon: '📄' };
                    return (
                      <div key={rec.id} className="card">
                        <div className="flex items-start justify-between mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xl text-[10px] font-medium ${mod.color}`}>
                            {mod.icon} {mod.label}
                          </span>
                          <button
                            onClick={() => handleDelete(rec.id)}
                            className="text-red-400 hover:text-red-600 text-xs"
                          >
                            {t('dashDelete')}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{formatDate(rec.date)}</p>
                        <p className="text-sm text-gray-700">
                          {rec.module === 'weight-loss' && rec.results.targetCalories
                            ? `${rec.results.targetCalories} kcal · ${rec.inputs.weight}kg · ${rec.inputs.goal}`
                            : JSON.stringify(rec.inputs).slice(0, 80)}
                        </p>
                        {rec.notes && <p className="text-xs text-gray-400 mt-1 italic">{rec.notes}</p>}
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t('dashPrev')}
                    </button>
                    <span className="text-sm text-gray-500 px-3">{t('dashPageOf')} {page + 1} / {totalPages}</span>
                    <button
                      onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                      disabled={page >= totalPages - 1}
                      className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t('dashNext')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

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
                  <label className="label">{t('dashCurrentPassword')}</label>
                  <input
                    type="password"
                    required
                    value={pwForm.current}
                    onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                    className="input-field"
                  />
                </div>
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
