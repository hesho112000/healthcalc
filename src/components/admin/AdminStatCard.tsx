import React from 'react';

interface AdminStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-[#EFEBE4] bg-white p-5 shadow-[0_8px_24px_rgba(15,76,58,0.06)]">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4F1EB] text-[#0F4C3A]">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-sm font-bold text-[#6B7A75] leading-tight">{label}</p>
      <p className="mt-0.5 text-2xl font-extrabold text-[#0F4C3A] leading-none">{value}</p>
    </div>
  </div>
);

export default AdminStatCard;