import React, { useMemo } from 'react';
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingDown, TrendingUp, Weight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUserData } from '../../hooks/useUserData';
import { readHubPlan } from './data';

type ChartPoint = { date: string; label: string; weight: number };

const shortDate = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
};

const WeightTrendChart: React.FC = () => {
  const { t } = useLanguage();
  const { progress, profile } = useUserData();

  const points = useMemo<ChartPoint[]>(() => {
    const byDate = new Map<string, number>();
    progress.forEach((row) => {
      if (!row.date || row.weight_kg === null || row.weight_kg === undefined) return;
      byDate.set(row.date, row.weight_kg);
    });
    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return [...byDate.entries()]
      .filter(([date]) => new Date(`${date}T00:00:00`) >= cutoff)
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, weight]) => ({ date, label: shortDate(date), weight }));
  }, [progress]);

  const startWeight = profile?.weight_kg ?? undefined;
  const currentWeight = points.length > 0 ? points[points.length - 1].weight : undefined;
  const plan = readHubPlan();
  const targetRaw = plan?.goal?.targetWeight;
  const target = targetRaw ? Number(targetRaw) : undefined;
  const targetValid = target !== undefined && Number.isFinite(target) && target > 0;

  const delta =
    currentWeight !== undefined && startWeight !== undefined
      ? Math.round((currentWeight - startWeight) * 10) / 10
      : undefined;
  const losing = delta !== undefined && delta < 0;

  return (
    <section className="rounded-3xl bg-white border border-[#EFEBE4] p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 font-extrabold text-sm text-[#0F4C3A]">
          <Weight size={16} />
          {t('hub.trend.weight')}
        </h3>
        <span className="text-[11px] font-bold text-[#6B7A75]">{t('hub.trend.last30Days')}</span>
      </div>

      {points.length >= 2 ? (
        <>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#6B7A75' }} tickLine={false} axisLine={{ stroke: '#EFEBE4' }} minTickGap={28} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10, fill: '#6B7A75' }} tickLine={false} axisLine={false} width={48} />
                {targetValid && (
                  <ReferenceLine
                    y={target}
                    stroke="#D4AF37"
                    strokeDasharray="5 4"
                    strokeWidth={1.5}
                    label={{ value: t('hub.trend.target'), position: 'insideTopRight', fontSize: 10, fill: '#8A6D1C' }}
                  />
                )}
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: '1px solid #EFEBE4', fontSize: 12 }}
                  labelStyle={{ color: '#0F4C3A', fontWeight: 700 }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#0F4C3A"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0F4C3A', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#D4AF37', stroke: '#0F4C3A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C3A]/10 px-3 py-1 text-[11px] font-bold text-[#0F4C3A]">
              {losing ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {t('hub.trend.current')}: {currentWeight} kg
              {delta !== undefined && (
                <span className={losing ? 'text-[#0F4C3A]' : 'text-[#B91C1C]'}>
                  ({delta > 0 ? '+' : ''}{delta} kg)
                </span>
              )}
            </span>
            {startWeight !== undefined && (
              <span className="rounded-full bg-[#F4F1EB]/70 px-3 py-1 text-[11px] font-bold text-[#6B7A75]">
                {t('hub.trend.start')}: {startWeight} kg
              </span>
            )}
            {targetValid && (
              <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[11px] font-bold text-[#8A6D1C]">
                {t('hub.trend.target')}: {target} kg
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#D4AF37]/50 bg-[#D4AF37]/5 px-4 py-8 text-center">
          <p className="text-xs font-bold text-[#8A6D1C]">{t('hub.trend.empty')}</p>
        </div>
      )}
    </section>
  );
};

export default WeightTrendChart;