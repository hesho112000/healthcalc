import React from 'react';
import { BookOpenCheck, Globe, Star, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TrustBar: React.FC = () => {
  const { t } = useLanguage();
  const items: Array<{ icon: LucideIcon; value: string; label: string }> = [
    { icon: Star, value: t('trustRatingValue'), label: t('trustRating') },
    { icon: Users, value: t('trustUsersValue'), label: t('trustUsers') },
    { icon: BookOpenCheck, value: t('trustDoctor'), label: t('trustDoctorLabel') },
    { icon: Globe, value: t('trustLanguages'), label: t('trustLanguagesValue') },
  ];
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {items.map(({ icon: Icon, value, label }) => (
          <div className="trust-bar-item" key={label}>
            <span className="trust-bar-icon">
              <Icon size={20} />
            </span>
            <div>
              <b>{value}</b>
              <small>{label}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;