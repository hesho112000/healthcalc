import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { ChartPoint } from './types';

interface AnalyticsChartsProps {
  newUsers30d: ChartPoint[];
  popularConditions: ChartPoint[];
  tierDistribution: ChartPoint[];
}

const TIER_COLORS = ['#0F4C3A', '#D4AF37', '#F4F1EB', '#6B7A75'];
const CONDITION_COLORS = ['#0F4C3A', '#D4AF37', '#6B7A75', '#8A9A5B', '#C9A12F'];

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  newUsers30d,
  popularConditions,
  tierDistribution,
}) => {
  const { t } = useLanguage();
  const sections: { title: string; chart: React.ReactNode }[] = [
    {
      title: t('admin.analytics.newUsers30'),
      chart: (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={newUsers30d} margin={{ top: 10, right: 20, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="#EFEBE4" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7A75' }} interval="preserveStartEnd" />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7A75' }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #EFEBE4', fontSize: 12 }}
              itemStyle={{ color: '#0F4C3A' }}
            />
            <Line type="monotone" dataKey="value" stroke="#0F4C3A" strokeWidth={2.5} dot={{ r: 3, fill: '#D4AF37' }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: t('admin.analytics.popularConditions'),
      chart:
        popularConditions.length === 0 ? (
          <p className="flex h-[260px] items-center justify-center text-sm font-semibold text-[#6B7A75]">—</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={popularConditions} margin={{ top: 10, right: 20, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="#EFEBE4" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7A75' }} interval={0} angle={-18} height={60} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7A75' }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #EFEBE4', fontSize: 12 }}
                itemStyle={{ color: '#0F4C3A' }}
              />
              <Bar dataKey="value" fill="#D4AF37" radius={[6, 6, 0, 0]}>
                {popularConditions.map((_, i) => (
                  <Cell key={i} fill={CONDITION_COLORS[i % CONDITION_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ),
    },
    {
      title: t('admin.analytics.tierDistribution'),
      chart: (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={tierDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value }) => `${name} ${value}`}
              labelLine={false}
            >
              {tierDistribution.map((entry, i) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={TIER_COLORS[i % TIER_COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #EFEBE4', fontSize: 12 }}
              itemStyle={{ color: '#0F4C3A' }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]"
        >
          <h3 className="mb-4 text-base font-extrabold text-[#0F4C3A]">{section.title}</h3>
          {section.chart}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCharts;