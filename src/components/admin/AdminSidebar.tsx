import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, BarChart3, FileText, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type AdminSection = 'overview' | 'users' | 'subscriptions' | 'analytics' | 'content' | 'settings';

interface AdminSidebarProps {
  active: AdminSection;
}

const SECTION_LABEL: Record<AdminSection, keyof typeof import('../../i18n/translations').translations.en> = {
  overview: 'admin.sidebar.overview',
  users: 'admin.sidebar.users',
  subscriptions: 'admin.sidebar.subscriptions',
  analytics: 'admin.sidebar.analytics',
  content: 'admin.sidebar.content',
  settings: 'admin.sidebar.settings',
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ active }) => {
  const { t } = useLanguage();

  const items: { key: AdminSection; to: string; icon: React.ReactNode }[] = [
    { key: 'overview', to: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { key: 'users', to: '/admin/dashboard/users', icon: <Users size={18} /> },
    { key: 'subscriptions', to: '/admin/dashboard/subscriptions', icon: <CreditCard size={18} /> },
    { key: 'analytics', to: '/admin/dashboard/analytics', icon: <BarChart3 size={18} /> },
    { key: 'content', to: '/admin/dashboard/content', icon: <FileText size={18} /> },
    { key: 'settings', to: '/admin/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-full lg:w-60 lg:shrink-0">
      <nav className="flex gap-1.5 overflow-x-auto rounded-2xl border border-[#EFEBE4] bg-white p-2 shadow-[0_8px_24px_rgba(15,76,58,0.06)] lg:flex-col lg:sticky lg:top-24">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#0F4C3A] transition-colors ${
                isActive ? 'bg-[#0F4C3A] text-[#FDFBF7] shadow-[0_8px_20px_rgba(15,76,58,0.35)]' : 'hover:bg-[#F4F1EB]'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#6B7A75]'}`}>{item.icon}</span>
              <span>{t(SECTION_LABEL[item.key])}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;