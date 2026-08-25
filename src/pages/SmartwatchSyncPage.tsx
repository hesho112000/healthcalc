import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import {
  type HealthMetrics, type SyncStatus,
  syncHealthData, getStoredMetrics, getSyncStatus, storeSyncStatus,
  detectPlatform, getHealthAdvice, computeDynamicPlanAdjustments, getDailyLogs,
  clearDailyLogs,
} from '../utils/healthDataSync';

const SmartwatchSyncPage: React.FC = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(getSyncStatus());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide' | 'settings'>('dashboard');
  const [guideStep, setGuideStep] = useState(0);
  const [tips, setTips] = useState<string[]>([]);
  const [adjustments, setAdjustments] = useState({ calorieAdjustment: 0, activityGoal: 8000, hydrationGoal: 2.5, restDay: false });
  const [autoSync, setAutoSync] = useState(true);
  const [syncNotifications, setSyncNotifications] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    const stored = getStoredMetrics();
    if (stored) {
      setMetrics(stored);
      setTips(getHealthAdvice(stored, 'general'));
      setAdjustments(computeDynamicPlanAdjustments(stored, 'general'));
    }
  }, []);

  const handleSync = useCallback(async () => {
    setSyncStatus(prev => ({ ...prev, syncing: true, error: null }));
    const result = await syncHealthData();
    if (result) {
      setMetrics(result);
      setSyncStatus(getSyncStatus());
      setTips(getHealthAdvice(result, 'general'));
      setAdjustments(computeDynamicPlanAdjustments(result, 'general'));
    }
    setSyncStatus(getSyncStatus());
    showToast(t('swSyncCompleteToast'));
  }, [showToast, t]);

  const handleConnect = async () => {
    const granted = await (async () => {
      const platform = detectPlatform();
      if (platform === 'android') return true;
      if (platform === 'ios') return true;
      return true;
    })();
    if (granted) {
      storeSyncStatus({ connected: true, platform: detectPlatform(), lastSync: null, syncing: false, error: null });
      setSyncStatus(getSyncStatus());
      await handleSync();
    }
  };

  const handleDisconnect = () => {
    storeSyncStatus({ connected: false, platform: null, lastSync: null, syncing: false, error: null });
    setSyncStatus(getSyncStatus());
  };

  const handleExportCsv = () => {
    const logsToExport = getDailyLogs();
    if (logsToExport.length === 0) {
      showToast(t('swNothingToExport'));
      return;
    }
    const header = 'date,heartRate,restingHeartRate,steps,activeCalories,sleepHours,sleepDeepHours,weight,bloodOxygen,stressLevel,cardioMinutes,distanceKm,floorsClimbed';
    const rows = logsToExport.map(l => [
      l.date,
      l.metrics.heartRate,
      l.metrics.restingHeartRate,
      l.metrics.steps,
      l.metrics.activeCalories,
      l.metrics.sleepHours,
      l.metrics.sleepDeepHours,
      l.metrics.weight,
      l.metrics.bloodOxygen,
      l.metrics.stressLevel,
      l.metrics.cardioMinutes,
      l.metrics.distanceKm,
      l.metrics.floorsClimbed,
    ].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthcalc-sync-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(t('swExportedToast'));
  };

  const handleClearHistory = () => {
    clearDailyLogs();
    showToast(t('swHistoryClearedToast'));
  };

  const handleDisconnectAndRemove = () => {
    handleDisconnect();
    clearDailyLogs();
    showToast(t('swDisconnectedToast'));
  };

  const platform = detectPlatform();
  const isIOS = platform === 'ios';
  const isAndroid = platform === 'android';
  const logs = getDailyLogs();

  const guideSteps = [
    {
      title: isIOS ? t('syncGuideInstallTitleIos') : isAndroid ? t('syncGuideInstallTitleAndroid') : t('syncGuideInstallTitleWeb'),
      icon: '📱',
      content: isIOS
        ? [
            t('syncGuideInstallIos1'),
            t('syncGuideInstallIos2'),
            t('syncGuideInstallIos3'),
            t('syncGuideInstallIos4'),
            t('syncGuideInstallIos5'),
          ]
        : isAndroid
        ? [
            t('syncGuideInstallAndroid1'),
            t('syncGuideInstallAndroid2'),
            t('syncGuideInstallAndroid3'),
            t('syncGuideInstallAndroid4'),
            t('syncGuideInstallAndroid5'),
          ]
        : [
            t('syncGuideInstallWeb1'),
            t('syncGuideInstallWeb2'),
            t('syncGuideInstallWeb3'),
            t('syncGuideInstallWeb4'),
          ],
    },
    {
      title: isIOS ? t('syncGuideConnectTitleIos') : isAndroid ? t('syncGuideConnectTitleAndroid') : t('syncGuideConnectTitleWeb'),
      icon: '❤️',
      content: isIOS
        ? [
            t('syncGuideConnectIos1'),
            t('syncGuideConnectIos2'),
            t('syncGuideConnectIos3'),
            t('syncGuideConnectIos4'),
            t('syncGuideConnectIos5'),
          ]
        : isAndroid
        ? [
            t('syncGuideConnectAndroid1'),
            t('syncGuideConnectAndroid2'),
            t('syncGuideConnectAndroid3'),
            t('syncGuideConnectAndroid4'),
            t('syncGuideConnectAndroid5'),
          ]
        : [
            t('syncGuideConnectWeb1'),
            t('syncGuideConnectWeb2'),
            t('syncGuideConnectWeb3'),
            t('syncGuideConnectWeb4'),
            t('syncGuideConnectWeb5'),
          ],
    },
    {
      title: t('syncGuidePairTitle'),
      icon: '⌚',
      content: isIOS
        ? [
            t('syncGuidePairIos1'),
            t('syncGuidePairIos2'),
            t('syncGuidePairIos3'),
            t('syncGuidePairIos4'),
            t('syncGuidePairIos5'),
          ]
        : isAndroid
        ? [
            t('syncGuidePairAndroid1'),
            t('syncGuidePairAndroid2'),
            t('syncGuidePairAndroid3'),
            t('syncGuidePairAndroid4'),
            t('syncGuidePairAndroid5'),
          ]
        : [
            t('syncGuidePairWeb1'),
            t('syncGuidePairWeb2'),
            t('syncGuidePairWeb3'),
            t('syncGuidePairWeb4'),
          ],
    },
    {
      title: t('syncGuideTrackTitle'),
      icon: '🔄',
      content: [
        t('syncGuideTrack1'),
        t('syncGuideTrack2'),
        t('syncGuideTrack3'),
        t('syncGuideTrack4'),
        t('syncGuideTrack5'),
      ],
    },
  ];

  const MetricCard: React.FC<{ icon: string; label: string; value: string; unit: string; color: string; sub?: string }> = ({ icon, label, value, unit, color, sub }) => (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shrink-0`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 font-medium">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-gray-900">{value}</span>
            <span className="text-xs text-gray-400">{unit}</span>
          </div>
          {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Breadcrumbs />
      <div className="bg-gradient-to-r from-primary-600 to-sage-600 text-white print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-primary-100">⌚ {t('swTitle')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{t('swNav')}</h1>
            <p className="text-primary-100 text-sm leading-relaxed max-w-lg">{t('swHeroDesc')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="toggle-group mb-6">
          {[
            { key: 'dashboard' as const, icon: '📊', label: t('swDashboard') },
            { key: 'guide' as const, icon: '📖', label: t('swGuideLabel') },
            { key: 'settings' as const, icon: '⚙️', label: t('swSettings') },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'toggle-btn-active' : 'toggle-btn-inactive'}>
              <span className="mr-1">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${syncStatus.connected ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{syncStatus.connected ? t('swConnected') : t('swNotConnected')}</p>
                    <p className="text-xs text-gray-400">
                      {syncStatus.lastSync ? `${t('swLastSync')}: ${new Date(syncStatus.lastSync).toLocaleString()}` : t('swNeverSynced')}
                      {syncStatus.platform && ` · ${syncStatus.platform === 'ios' ? t('swAppleHealth') : syncStatus.platform === 'android' ? t('swGoogleHealthConnect') : t('swWebBrowser')}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {syncStatus.connected ? (
                    <>
                      <button onClick={handleSync} disabled={syncStatus.syncing}
                        className="btn-primary text-xs py-2 px-4 disabled:opacity-50">
                        {syncStatus.syncing ? (
                          <span className="flex items-center gap-2"><svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> {t('swSyncing')}</span>
                        ) : `🔄 ${t('swSyncNow')}`}
                      </button>
                      <button onClick={handleDisconnect} className="btn-ghost text-xs py-2 px-3 text-red-500 hover:bg-red-50">
                        {t('swDisconnect')}
                      </button>
                    </>
                  ) : (
                    <button onClick={handleConnect} className="btn-primary text-xs py-2 px-4">
                      🔗 {t('swConnectWatch')}
                    </button>
                  )}
                </div>
              </div>
              {syncStatus.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">{syncStatus.error}</div>
              )}
            </div>

            {metrics ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <MetricCard icon="❤️" label={t('swHeartRate')} value={String(metrics.heartRate)} unit={t('swBpm')} color="bg-rose-50" sub={`${t('swResting')}: ${metrics.restingHeartRate}`} />
                  <MetricCard icon="👟" label={t('swSteps')} value={metrics.steps.toLocaleString()} unit={t('swStepsUnit')} color="bg-blue-50" sub={`${metrics.distanceKm} ${t('swKm')}`} />
                  <MetricCard icon="🔥" label={t('swActiveCalories')} value={String(metrics.activeCalories)} unit={t('swKcal')} color="bg-orange-50" sub={`${metrics.cardioMinutes} ${t('swMinCardio')}`} />
                  <MetricCard icon="😴" label={t('swSleep')} value={String(metrics.sleepHours)} unit={t('swHrs')} color="bg-indigo-50" sub={`${t('swDeep')}: ${metrics.sleepDeepHours} ${t('swHrs')}`} />
                  <MetricCard icon="⚖️" label={t('swWeight')} value={String(metrics.weight)} unit={t('kgUnit')} color="bg-teal-50" />
                  <MetricCard icon="🫁" label={t('swSpO2')} value={String(metrics.bloodOxygen)} unit="%" color="bg-cyan-50" />
                  <MetricCard icon="🧠" label={t('swStress')} value={typeof metrics.stressLevel === 'string' ? (metrics.stressLevel === 'high' ? t('swStressHigh') : metrics.stressLevel === 'moderate' ? t('swStressModerate') : t('swStressLow')) : String(metrics.stressLevel)} unit="" color="bg-amber-50" />
                  <MetricCard icon="🏔️" label={t('swFloors')} value={String(metrics.floorsClimbed)} unit={t('swFloorsUnit')} color="bg-emerald-50" />
                </div>

                {tips.length > 0 && (
                  <div className="card p-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">💡</span> {t('swAiHealthTips')}
                    </h3>
                    <div className="space-y-2">
                      {tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-primary-50/50 rounded-xl px-3.5 py-2.5">
                          <span className="text-primary-500 mt-0.5 text-xs font-bold">{i + 1}.</span>
                          <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card p-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">🎯</span> {t('swDynamicPlan')}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-blue-400 font-semibold uppercase">{t('swCalorieAdj')}</p>
                        <p className="text-lg font-extrabold text-blue-700">{adjustments.calorieAdjustment > 0 ? '+' : ''}{adjustments.calorieAdjustment}</p>
                        <p className="text-[10px] text-blue-400">{t('swKcalPerDay')}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-green-400 font-semibold uppercase">{t('swActivityGoal')}</p>
                        <p className="text-lg font-extrabold text-green-700">{adjustments.activityGoal.toLocaleString()}</p>
                        <p className="text-[10px] text-green-400">{t('swStepsPerDay')}</p>
                      </div>
                      <div className="bg-cyan-50 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-cyan-400 font-semibold uppercase">{t('swHydration')}</p>
                        <p className="text-lg font-extrabold text-cyan-700">{adjustments.hydrationGoal}</p>
                        <p className="text-[10px] text-cyan-400">{t('swLitersPerDay')}</p>
                      </div>
                      <div className={`rounded-xl p-3 text-center ${adjustments.restDay ? 'bg-amber-50' : 'bg-gray-50'}`}>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">{t('swRestDay')}</p>
                      <p className="text-lg font-extrabold">{adjustments.restDay ? '⚠️' : '✅'}</p>
                      <p className="text-[10px] text-gray-400">{adjustments.restDay ? t('swRecommended') : t('swActiveDay')}</p>
                    </div>
                  </div>
                </div>

                {logs.length > 0 && (
                  <div className="card p-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">📈</span> {t('swSyncHistory')}
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {logs.slice(0, 7).map((log, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-3.5 py-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-400 w-20">{log.date}</span>
                            <span className="text-xs text-gray-600">❤️{log.metrics.heartRate} · 👟{log.metrics.steps.toLocaleString()} · 😴{log.metrics.sleepHours} {t('swHrs')}</span>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${log.synced ? 'bg-green-400' : 'bg-gray-300'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⌚</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t('swNoDataYet')}</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">{t('swNoDataDesc')}</p>
                <button onClick={handleConnect} className="btn-primary text-sm py-2.5 px-6">
                  🔗 {t('swConnectWatch')}
                </button>
              </div>
            )}

            <MedicalDisclaimer />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card p-5">
              <h2 className="text-lg font-extrabold text-gray-900 mb-1">{t('swSetupGuide')}</h2>
              <p className="text-sm text-gray-500">{t('swSetupGuideDesc')}</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {guideSteps.map((step, i) => (
                <button key={i} onClick={() => setGuideStep(i)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    guideStep === i ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}>
                  <span className="text-base">{step.icon}</span>
                  <span>{t('homeStep')} {i + 1}</span>
                </button>
              ))}
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">{guideSteps[guideStep].icon}</span>
                </div>
                <div>
                  <p className="text-[10px] text-primary-500 font-bold uppercase tracking-wider">{t('homeStep')} {guideStep + 1} {t('dashPageOf')} {guideSteps.length}</p>
                  <h3 className="text-base font-bold text-gray-900">{guideSteps[guideStep].title}</h3>
                </div>
              </div>
              <div className="space-y-3">
                {guideSteps[guideStep].content.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary-600">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button onClick={() => setGuideStep(Math.max(0, guideStep - 1))} disabled={guideStep === 0}
                  className="btn-ghost text-xs py-2 px-4 disabled:opacity-30">
                  ← {t('swPrev')}
                </button>
                <span className="text-xs text-gray-400">{guideStep + 1} / {guideSteps.length}</span>
                <button onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))} disabled={guideStep === guideSteps.length - 1}
                  className="btn-primary text-xs py-2 px-4 disabled:opacity-30">
                  {t('swNext')} →
                </button>
              </div>
            </div>

            <div className="card p-5 bg-amber-50 border border-amber-200">
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-lg">⌚</span> {t('swSupportedWatches')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Apple Watch', platform: 'iOS', icon: '⌚' },
                  { name: 'Samsung Galaxy Watch', platform: 'Android', icon: '⌚' },
                  { name: 'Fitbit', platform: 'iOS / Android', icon: '⌚' },
                  { name: 'Garmin', platform: 'iOS / Android', icon: '⌚' },
                  { name: 'Google Pixel Watch', platform: 'Android', icon: '⌚' },
                  { name: 'Xiaomi Mi Band', platform: 'Android', icon: '⌚' },
                ].map((watch, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-2.5 border border-amber-100">
                    <span className="text-xl">{watch.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{watch.name}</p>
                      <p className="text-[10px] text-gray-400">{watch.platform}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">{t('swConnectionSettings')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <span className="text-sm">{isIOS ? '🍎' : isAndroid ? '🤖' : '🌐'}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('swHealthPlatform')}</p>
                      <p className="text-xs text-gray-400">{isIOS ? t('swAppleHealth') : isAndroid ? t('swGoogleHealthConnect') : t('swWebBrowser')}</p>
                    </div>
                  </div>
                  <span className={`badge ${syncStatus.connected ? 'badge-sage' : 'bg-gray-100 text-gray-400'}`}>
                    {syncStatus.connected ? t('swActive') : t('swInactive')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🔄</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('swAutoSync')}</p>
                      <p className="text-xs text-gray-400">{t('swAutoSyncDesc')}</p>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={autoSync} title={t('swAutoSync')}
                    onClick={() => setAutoSync(prev => !prev)}
                    className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${autoSync ? 'bg-primary-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${autoSync ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🔔</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('swSyncNotifications')}</p>
                      <p className="text-xs text-gray-400">{t('swSyncNotifDesc')}</p>
                    </div>
                  </div>
                  <button type="button" role="switch" aria-checked={syncNotifications} title={t('swSyncNotifications')}
                    onClick={() => setSyncNotifications(prev => !prev)}
                    className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${syncNotifications ? 'bg-primary-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${syncNotifications ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">{t('swDataPermissions')}</h3>
              <div className="space-y-2">
                {[t('swHeartRate'), t('swSteps'), t('swSleep'), t('swWeight'), t('swActiveCalories'), t('swSpO2')].map((perm, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-700">{perm}</span>
                    <span className="badge badge-sage text-[10px]">{t('swGranted')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">{t('swAdvanced')}</h3>
              <div className="space-y-2">
                <button onClick={handleExportCsv} className="w-full text-left p-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  📊 {t('swExportData')} (CSV)
                </button>
                <button onClick={handleClearHistory} className="w-full text-left p-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  🗑️ {t('swClearHistory')}
                </button>
                <button onClick={handleDisconnectAndRemove} title={t('swDisconnectRemove')} className="w-full text-left p-3 bg-red-50 rounded-xl text-sm text-red-600 hover:bg-red-100 transition-colors">
                  🚫 {t('swDisconnect')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg animate-fade-in max-w-[90vw]">
          {toast}
        </div>
      )}
    </div>
  );
};

export default SmartwatchSyncPage;
