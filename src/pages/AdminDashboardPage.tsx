import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, CreditCard, UserPlus, FilePlus2, LogOut, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { supabase } from '../lib/supabase';
import AdminSidebar, { AdminSection } from '../components/admin/AdminSidebar';
import AdminStatCard from '../components/admin/AdminStatCard';
import UsersTable from '../components/admin/UsersTable';
import SubscriptionsTable from '../components/admin/SubscriptionsTable';
import AnalyticsCharts from '../components/admin/AnalyticsCharts';
import RecentActivity from '../components/admin/RecentActivity';
import ContentManager from '../components/admin/ContentManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import {
  AdminUser,
  AdminSubscription,
  ActivityItem,
  ChartPoint,
} from '../components/admin/types';

interface ProfileRow {
  id: string;
  full_name: string | null;
  email?: string | null;
  age: number | null;
  created_at: string | null;
}

interface SubscriptionRow {
  id?: string;
  user_id: string;
  tier: string;
  status: string;
  started_at: string | null;
  expires_at: string | null;
}

const CONDITION_LABELS: Record<string, string> = {
  diabetes: 'Diabetes',
  hypertension: 'Hypertension',
  cholesterol: 'Cholesterol',
  gout: 'Gout',
  liver: 'Fatty Liver',
  kidney: 'CKD',
  'kidney-stones': 'Kidney Stones',
  thyroid: 'Thyroid',
  ibs: 'IBS',
  'mental-wellness': 'Mental Wellness',
  'heart-lipids': 'Heart & Lipids',
  pcos: 'PCOS',
  'weight-obesity': 'Weight & Obesity',
  'bones-joints': 'Bones & Joints',
};

const AdminDashboardPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const { disableAdmin } = useAdmin();
  const { section = 'overview' } = useParams<{ section: string }>();
  const activeSection: AdminSection =
    section === 'users' ||
    section === 'subscriptions' ||
    section === 'analytics' ||
    section === 'content' ||
    section === 'settings'
      ? section
      : 'overview';

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, activeSubscriptions: 0, newUsers7d: 0, totalPlans: 0 });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [newUsers30d, setNewUsers30d] = useState<ChartPoint[]>([]);
  const [popularConditions, setPopularConditions] = useState<ChartPoint[]>([]);
  const [tierDistribution, setTierDistribution] = useState<ChartPoint[]>([]);
  const [newsletterNote, setNewsletterNote] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
      const [userCount, activeCount, new7Count, planCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
        supabase.from('plans').select('*', { count: 'exact', head: true }),
      ]);

      let profiles: ProfileRow[] = [];
      let subRows: SubscriptionRow[] = [];
      let condRows: Array<{ user_id: string; condition_id: string }> = [];
      let planRows: Array<{ user_id: string; created_at: string | null }> = [];
      let labRows: Array<{ user_id: string; created_at: string | null }> = [];

      const profileRes = await supabase.from('profiles').select('id, full_name, email, age, created_at');
      if (profileRes.data) {
        profiles = profileRes.data as ProfileRow[];
      } else {
        const retry = await supabase.from('profiles').select('id, full_name, age, created_at');
        profiles = (retry.data as ProfileRow[] | null) ?? [];
      }

      const [subRes, condRes, planRes, labRes] = await Promise.all([
        supabase.from('subscriptions').select('*').order('created_at', { ascending: false }).limit(1000),
        supabase.from('user_conditions').select('user_id, condition_id'),
        supabase.from('plans').select('user_id, created_at').order('created_at', { ascending: false }).limit(500),
        supabase.from('labs').select('user_id, created_at').order('created_at', { ascending: false }).limit(200),
      ]);

      subRows = (subRes.data as SubscriptionRow[] | null) ?? [];
      condRows = (condRes.data as Array<{ user_id: string; condition_id: string }> | null) ?? [];
      planRows = (planRes.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];
      labRows = (labRes.data as Array<{ user_id: string; created_at: string | null }> | null) ?? [];

      const conditionCount = new Map<string, number>();
      condRows.forEach((row) => {
        conditionCount.set(row.user_id, (conditionCount.get(row.user_id) ?? 0) + 1);
      });

      const tierByUser = new Map<string, string>();
      subRows.forEach((s) => {
        if (s.status === 'active' || s.tier !== 'free') tierByUser.set(s.user_id, s.tier);
      });

      const userIndex = new Map(profiles.map((p) => [p.id, p]));
      const userRows: AdminUser[] = profiles.map((p) => ({
        id: p.id,
        full_name: p.full_name,
        email: p.email ?? null,
        age: p.age,
        created_at: p.created_at ?? null,
        conditionCount: conditionCount.get(p.id) ?? 0,
        tier: tierByUser.get(p.id) ?? 'free',
      }));

      const subRowsTyped: AdminSubscription[] = subRows.map((s, i) => {
        const owner = s.user_id ? userIndex.get(s.user_id) : undefined;
        return {
          id: s.id ?? `${s.user_id}-${i}`,
          user_id: s.user_id,
          tier: s.tier,
          status: s.status,
          started_at: s.started_at,
          expires_at: s.expires_at,
          user_name: owner?.full_name ?? null,
          user_email: owner?.email ?? null,
        };
      });

      setStats({
        totalUsers: userCount.count ?? profiles.length,
        activeSubscriptions: activeCount.count ?? subRows.filter((s) => s.status === 'active').length,
        newUsers7d: new7Count.count ?? 0,
        totalPlans: planCount.count ?? planRows.length,
      });
      setUsers(userRows);
      setSubscriptions(subRowsTyped);

      const feed: ActivityItem[] = [];
      profiles
        .slice()
        .sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
        .slice(0, 10)
        .forEach((p) =>
          feed.push({
            id: `u-${p.id}`,
            type: 'user',
            title: p.full_name || p.email || '',
            time: p.created_at,
          }),
        );
      planRows.slice(0, 6).forEach((p, i) =>
        feed.push({ id: `p-${p.user_id}-${i}`, type: 'plan', title: '', time: p.created_at }),
      );
      labRows.slice(0, 6).forEach((l, i) =>
        feed.push({ id: `l-${l.user_id}-${i}`, type: 'lab', title: '', time: l.created_at }),
      );
      feed.sort((a, b) => (b.time ?? '').localeCompare(a.time ?? ''));
      setActivity(feed.slice(0, 10));

      const days: ChartPoint[] = [];
      for (let i = 29; i >= 0; i -= 1) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        days.push({ name: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), value: 0 });
      }
      const dayIndex = new Map(days.map((d, i) => [days[i].name, i]));
      const dayKey = (iso: string | null): string => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      };
      profiles.forEach((p) => {
        if (!p.created_at || new Date(p.created_at) < thirtyDaysAgo) return;
        const k = dayKey(p.created_at);
        const idx = dayIndex.get(k);
        if (idx !== undefined) days[idx].value += 1;
      });
      setNewUsers30d(days);

      const condCounts = new Map<string, number>();
      condRows.forEach((row) => {
        if (!row.condition_id) return;
        condCounts.set(row.condition_id, (condCounts.get(row.condition_id) ?? 0) + 1);
      });
      setPopularConditions(
        Array.from(condCounts.entries())
          .map(([id, value]) => ({ name: CONDITION_LABELS[id] ?? id, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8),
      );

      const tierCounts = new Map<string, number>();
      subRows.forEach((s) => tierCounts.set(s.tier, (tierCounts.get(s.tier) ?? 0) + 1));
      if (tierCounts.size === 0 && profiles.length > 0) tierCounts.set('free', profiles.length);
      const tierNames = ['free', 'basic', 'pro', 'elite'];
      setTierDistribution(
        tierNames
          .filter((tr) => (tierCounts.get(tr) ?? 0) > 0)
          .map((tr) => ({ name: tr.charAt(0).toUpperCase() + tr.slice(1), value: tierCounts.get(tr) ?? 0 })),
      );
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  const deleteUser = useCallback(
    async (user: AdminUser) => {
      await Promise.allSettled([
        supabase.from('profiles').delete().eq('id', user.id),
        supabase.from('user_conditions').delete().eq('user_id', user.id),
        supabase.from('labs').delete().eq('user_id', user.id),
        supabase.from('plans').delete().eq('user_id', user.id),
        supabase.from('progress').delete().eq('user_id', user.id),
        supabase.from('subscriptions').delete().eq('user_id', user.id),
      ]);
      refresh();
    },
    [refresh],
  );

  const editUser = useCallback(
    async (user: AdminUser, name: string, age: number | null) => {
      await supabase.from('profiles').update({ full_name: name, age }).eq('id', user.id);
      refresh();
    },
    [refresh],
  );

  const handleLogout = useCallback(() => {
    disableAdmin();
    navigate('/');
  }, [disableAdmin, navigate]);

  const statCards = [
    { key: 'totalUsers', label: t('admin.stats.totalUsers'), value: stats.totalUsers, icon: <Users size={22} /> },
    {
      key: 'activeSubscriptions',
      label: t('admin.stats.activeSubscriptions'),
      value: stats.activeSubscriptions,
      icon: <CreditCard size={22} />,
    },
    { key: 'newUsers7d', label: t('admin.stats.newUsers7d'), value: stats.newUsers7d, icon: <UserPlus size={22} /> },
    { key: 'totalPlans', label: t('admin.stats.totalPlans'), value: stats.totalPlans, icon: <FilePlus2 size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <header className="border-b border-[#0B3A2B] bg-[#0F4C3A]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDFBF7]/10 text-[#D4AF37]">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-[#FDFBF7] leading-tight">{t('admin.title')}</h1>
              <p className="text-xs font-bold text-[#D4AF37]">
                {t('admin.loggedInAs')} · {t('admin.badge.label')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] text-[#0F4C3A] px-4 py-2 text-sm font-extrabold shadow-[0_8px_20px_rgba(212,175,55,0.35)] hover:bg-[#c9a12f] transition-colors"
          >
            <LogOut size={16} strokeWidth={2.5} /> {t('admin.logout')}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-6 lg:flex-row">
        <AdminSidebar active={activeSection} />

        <main className="min-w-0 flex-1">
          {loading ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
            </div>
          ) : (
            <>
              {activeSection === 'overview' && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card) => (
                      <AdminStatCard key={card.key} icon={card.icon} label={card.label} value={card.value} />
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <RecentActivity items={activity} />
                    </div>
                    <div className="rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
                      <h3 className="text-base font-extrabold text-[#0F4C3A]">{t('admin.quickActions')}</h3>
                      <div className="mt-4 space-y-2.5">
                        <button
                          type="button"
                          onClick={() => navigate('/admin/dashboard/users')}
                          className="flex w-full items-center gap-3 rounded-xl bg-[#F4F1EB] px-4 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#EFEBE4] transition-colors"
                        >
                          <Users size={17} /> {t('admin.quick.viewUsers')}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/admin/dashboard/subscriptions')}
                          className="flex w-full items-center gap-3 rounded-xl bg-[#F4F1EB] px-4 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#EFEBE4] transition-colors"
                        >
                          <CreditCard size={17} /> {t('admin.quick.viewSubscriptions')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewsletterNote((v) => !v)}
                          className="flex w-full items-center gap-3 rounded-xl bg-[#F4F1EB] px-4 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#EFEBE4] transition-colors"
                        >
                          <Mail size={17} /> {t('admin.quick.newsletter')}
                        </button>
                        {newsletterNote && (
                          <p className="rounded-xl bg-[#FDFBF7] px-4 py-2.5 text-xs font-bold text-[#6B7A75]">
                            {t('admin.content.modalBody')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === 'users' && (
                <UsersTable users={users} onDelete={deleteUser} onEdit={editUser} />
              )}

              {activeSection === 'subscriptions' && <SubscriptionsTable subscriptions={subscriptions} />}

              {activeSection === 'analytics' && (
                <AnalyticsCharts
                  newUsers30d={newUsers30d}
                  popularConditions={popularConditions}
                  tierDistribution={tierDistribution}
                />
              )}

              {activeSection === 'content' && <ContentManager />}

              {activeSection === 'settings' && <SettingsPanel />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;