export interface AdminUser {
  id: string;
  full_name: string | null;
  email: string | null;
  age: number | null;
  created_at: string | null;
  conditionCount: number;
  tier: string;
}

export interface AdminSubscription {
  id: string;
  user_id: string;
  tier: string;
  status: string;
  started_at: string | null;
  expires_at: string | null;
  user_name: string | null;
  user_email: string | null;
}

export interface ActivityItem {
  id: string;
  type: 'user' | 'plan' | 'lab';
  title: string;
  time: string | null;
}

export interface ChartPoint {
  name: string;
  value: number;
}

export type AdminTKey = 'admin.recentActivity.user' | 'admin.recentActivity.plan' | 'admin.recentActivity.lab';

export const adminActivityLabel = (type: ActivityItem['type']): AdminTKey => {
  switch (type) {
    case 'user':
      return 'admin.recentActivity.user' as AdminTKey;
    case 'plan':
      return 'admin.recentActivity.plan' as AdminTKey;
    default:
      return 'admin.recentActivity.lab' as AdminTKey;
  }
};

export const formatAdminDate = (value: string | null | undefined): string => {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const formatAdminDateTime = (value: string | null | undefined): string => {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};