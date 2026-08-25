import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AdPlaceholderProps {
  size: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ size, className = '' }) => {
  const { t } = useLanguage();

  const dimensions = {
    banner: { label: '728 × 90' },
    sidebar: { label: '300 × 250' },
    inline: { label: 'Responsive' },
  };

  const dim = dimensions[size];

  return (
    <div
      className={`card-glass flex items-center justify-center ${className}`}
      style={{
        minHeight: size === 'banner' ? '90px' : size === 'sidebar' ? '250px' : '100px',
        maxWidth: size === 'banner' ? '728px' : size === 'sidebar' ? '300px' : '100%',
      }}
    >
      <div className="text-center">
        <p className="text-xs text-gray-300 mb-1">{t('sponsoredAd')}</p>
        <p className="text-[10px] text-gray-300">{dim.label}</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
