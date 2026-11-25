import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Target, TrendingDown, Users, type LucideIcon } from 'lucide-react';
import type { TranslationKeys } from '../../i18n/translationTypes';
import { useLanguage } from '../../context/LanguageContext';

type TrustLabelKey = 'trustsec.stat1.label' | 'trustsec.stat2.label' | 'trustsec.stat3.label' | 'trustsec.stat4.label';

const trustSignals: Array<{ icon: LucideIcon; value: number; decimals?: number; suffix?: string; labelKey: TrustLabelKey }> = [
  { icon: Star, value: 4.9, decimals: 1, suffix: '/5', labelKey: 'trustsec.stat1.label' },
  { icon: Users, value: 12450, suffix: '+', labelKey: 'trustsec.stat2.label' },
  { icon: TrendingDown, value: 3.2, decimals: 1, suffix: ' kg', labelKey: 'trustsec.stat3.label' },
  { icon: Target, value: 92, suffix: '%', labelKey: 'trustsec.stat4.label' },
];

const TRUST_SOURCES = ['WHO', 'ADA', 'NHS', 'Mayo Clinic', 'Harvard Medical'];

const localeFor = (lang: string): string =>
  lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US';

const TrustCountUp: React.FC<{ value: number; decimals?: number; suffix?: string; locale: string }> = ({ value, decimals = 0, suffix = '', locale }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setDisplay(value); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || started.current) return;
      started.current = true;
      observer.disconnect();
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  const formatted = display.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{formatted}{suffix}</span>;
};

const TrustHighlights: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const countLocale = localeFor(language);
  const widgetCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollWidgetCarousel = (direction: -1 | 1) => {
    const track = widgetCarouselRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.home-widget-card');
    const distance = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance * (dir === 'rtl' ? -1 : 1), behavior: 'smooth' });
  };

  return (
    <section className="section-wrap trustsec-section">
      <div className="trustsec-head">
        <span className="step-pill gold">{t('trustsec.eyebrow')}</span>
        <h2 className="trustsec-title">{t('homeWidgets.title')}</h2>
        <p className="trustsec-sub">{t('homeWidgets.subtitle')}</p>
        <div className="home-widget-controls" aria-label={t('homeWidgets.carouselLabel')}>
          <button type="button" onClick={() => scrollWidgetCarousel(-1)} aria-label={t('homeWidgets.previous')}><ChevronLeft size={19} /></button>
          <button type="button" onClick={() => scrollWidgetCarousel(1)} aria-label={t('homeWidgets.next')}><ChevronRight size={19} /></button>
        </div>
      </div>

      <div className="home-widget-track no-scrollbar" ref={widgetCarouselRef} role="region" aria-label={t('homeWidgets.carouselLabel')} tabIndex={0}>
        {trustSignals.map(({ icon: Icon, value, decimals, suffix, labelKey }, index) => (
          <div className="trustsec-card home-widget-card" key={labelKey} role="group" aria-roledescription="slide" aria-label={`${index + 1} / ${trustSignals.length}`}>
            <span className="trustsec-icon"><Icon size={24} strokeWidth={2.5} /></span>
            <span className="trustsec-num"><TrustCountUp value={value} decimals={decimals} suffix={suffix} locale={countLocale} /></span>
            <span className="trustsec-label">{t(labelKey)}</span>
          </div>
        ))}
      </div>

      <div className="trustsec-sources">
        <p className="trustsec-sources-title">{t('trustsec.sources.title')}</p>
        <div className="trustsec-sources-row">
          {TRUST_SOURCES.map((source) => <span className="trustsec-source" key={source}>{source}</span>)}
        </div>
        <p className="trustsec-sources-note">{t('trustsec.sources.note')}</p>
      </div>

      <p className="trustsec-disclaimer">{t('trustsec.disclaimer')}</p>
    </section>
  );
};

export default TrustHighlights;
