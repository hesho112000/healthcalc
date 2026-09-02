import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { type HealthMetrics, type SyncStatus, getStoredMetrics, getSyncStatus, syncHealthData } from '../../utils/healthDataSync';

const HealthMetricsWidget: React.FC = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(getSyncStatus());
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setMetrics(getStoredMetrics());
  }, []);

  const handleQuickSync = async () => {
    setSyncing(true);
    const result = await syncHealthData();
    if (result) setMetrics(result);
    setSyncStatus(getSyncStatus());
    setSyncing(false);
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-sage-500 rounded-xl flex items-center justify-center">
            <span className="text-sm">⌚</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{t('widgetTitle')}</h3>
            <p className="text-[10px] text-gray-400">
              {syncStatus.connected ? `${t('widgetLastSync')}: ${syncStatus.lastSync ? new Date(syncStatus.lastSync).toLocaleTimeString() : t('widgetNever')}` : t('swNotConnected')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleQuickSync} disabled={syncing}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 transition-colors">
            {syncing ? t('widgetSyncing') : `🔄 ${t('swSyncNow')}`}
          </button>
          <Link to="/smartwatch-sync" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            → {t('widgetViewAll')}
          </Link>
        </div>
      </div>

      {metrics ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '❤️', label: t('widgetHeart'), value: String(metrics.heartRate), unit: 'bpm', color: 'bg-rose-50 text-rose-600' },
            { icon: '👟', label: t('swSteps'), value: metrics.steps.toLocaleString(), unit: '', color: 'bg-blue-50 text-blue-600' },
            { icon: '🔥', label: t('widgetCalories'), value: String(metrics.activeCalories), unit: 'kcal', color: 'bg-orange-50 text-orange-600' },
            { icon: '😴', label: t('widgetSleepLabel'), value: String(metrics.sleepHours), unit: 'hrs', color: 'bg-indigo-50 text-indigo-600' },
          ].map((m, i) => (
            <div key={i} className={`${m.color} rounded-xl p-3 text-center`}>
              <span className="text-lg">{m.icon}</span>
              <p className="text-lg font-extrabold mt-1">{m.value}</p>
              <p className="text-[10px] opacity-60">{m.label} {m.unit}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-xs text-gray-400 mb-3">{t('widgetNoData')}</p>
          <Link to="/smartwatch-sync" className="btn-primary text-xs py-2 px-4">
            ⌚ {t('widgetConnectWatch')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsWidget;
