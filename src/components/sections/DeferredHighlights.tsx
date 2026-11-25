import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Cross, Droplet, Dumbbell, HeartPulse, Hourglass, Moon, RefreshCw, Salad, Smartphone, Sparkles, Timer, Watch, type LucideIcon } from 'lucide-react';
import type { ArticleCategory } from '../../data/articles';
import { useLanguage } from '../../context/LanguageContext';
import { getSupabaseClient } from '../../lib/supabaseClient';

const CATEGORY_ICON: Record<ArticleCategory, LucideIcon> = {
  diabetes: Droplet,
  heart: HeartPulse,
  nutrition: Salad,
  lifestyle: Sparkles,
  fitness: Dumbbell,
};

const localeFor = (lang: string): string =>
  lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US';

const DeferredHighlights: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const countLocale = localeFor(language);

  const watchBenefits = [
    { icon: RefreshCw, text: t('home.watch.benefit1') },
    { icon: HeartPulse, text: t('home.watch.benefit2') },
    { icon: Activity, text: t('home.watch.benefit3') },
  ];
  const [watchEmail, setWatchEmail] = useState('');
  const [watchJoined, setWatchJoined] = useState(false);
  const [watchLoading, setWatchLoading] = useState(false);
  const [watchError, setWatchError] = useState('');

  const [fastingEmail, setFastingEmail] = useState('');
  const [fastingJoined, setFastingJoined] = useState(false);
  const [fastingLoading, setFastingLoading] = useState(false);
  const [fastingError, setFastingError] = useState('');
  const blogSectionRef = useRef<HTMLElement | null>(null);
  const [articlesData, setArticlesData] = useState<typeof import('../../data/articles') | null>(null);
  useEffect(() => {
    const node = blogSectionRef.current;
    if (!node) return;
    let cancelled = false;
    const load = () => {
      import('../../data/articles')
        .then((mod) => { if (!cancelled) setArticlesData(mod); })
        .catch(() => {});
    };
    if (typeof IntersectionObserver === 'undefined') { load(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '320px' });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);
  const latestArticles = useMemo(
    () => (articlesData ? [...articlesData.ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3) : []),
    [articlesData]
  );

  const handleSubscribe = async (e: React.FormEvent, sourceName: string) => {
    e.preventDefault();
    const client = await getSupabaseClient();
    if (!client) {
      // Fallback to localStorage if no Supabase
      const email = sourceName === 'Fasting Hub' ? fastingEmail.trim() : watchEmail.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      try {
        const key = sourceName === 'Fasting Hub' ? 'hf_fasting_notify' : 'hf_watch_notify';
        const saved: string[] = JSON.parse(localStorage.getItem(key) || '[]');
        if (!saved.includes(email)) saved.push(email);
        localStorage.setItem(key, JSON.stringify(saved));
      } catch {}
      if (sourceName === 'Fasting Hub') setFastingJoined(true);
      else setWatchJoined(true);
      return;
    }

    const email = sourceName === 'Fasting Hub' ? fastingEmail.trim() : watchEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    if (sourceName === 'Fasting Hub') {
      setFastingLoading(true);
      setFastingError('');
    } else {
      setWatchLoading(true);
      setWatchError('');
    }

    try {
      if (client) {
        const { error } = await client.from('subscribers').insert([{ email: email, source: sourceName }]);
        if (!error) {
          if (sourceName === 'Fasting Hub') setFastingJoined(true);
          else setWatchJoined(true);
        } else if ((error as any).code === '23505') {
          if (sourceName === 'Fasting Hub') setFastingError(t('home.status.alreadySubscribed'));
          else setWatchError(t('home.status.alreadySubscribed'));
        } else {
          if (sourceName === 'Fasting Hub') setFastingError(t('home.status.genericError'));
          else setWatchError(t('home.status.genericError'));
        }
      } else {
        if (sourceName === 'Fasting Hub') setFastingError(t('home.status.unavailable'));
        else setWatchError(t('home.status.unavailable'));
      }
    } catch (err) {
      if (sourceName === 'Fasting Hub') setFastingError(t('home.status.genericError'));
      else setWatchError(t('home.status.genericError'));
    } finally {
      if (sourceName === 'Fasting Hub') setFastingLoading(false);
      else setWatchLoading(false);
    }
  };

  const handleFastingNotify = (event: React.FormEvent) => {
    handleSubscribe(event, 'Fasting Hub');
  };

  const handleWatchNotify = (event: React.FormEvent) => {
    handleSubscribe(event, 'Sync Devices');
  };

  return (
    <>
      <section className="section-wrap">
        <div className="fasting-card">
          <div className="fasting-copy">
            <span className="step-pill gold">{t('fastingHub.eyebrow')}</span>
            <h2 className="fasting-title">{t('fastingHub.title')}</h2>
            <p className="fasting-sub">{t('fastingHub.subtitle')}</p>
            <ul className="fasting-chips">
              <li><Moon size={18} /><span>{t('fastingHub.chip1')}</span></li>
              <li><Cross size={18} /><span>{t('fastingHub.chip2')}</span></li>
              <li><Timer size={18} /><span>{t('fastingHub.chip3')}</span></li>
            </ul>
            {fastingJoined ? (
              <div className="fasting-thanks" aria-live="polite">
                <CheckCircle2 size={20} />
                <div>
                  <b>{t('fastingHub.thanksTitle')}</b>
                  <p>{t('fastingHub.thanksDesc')}</p>
                </div>
              </div>
            ) : (
              <form className="fasting-form" onSubmit={handleFastingNotify}>
                <input
                  type="email"
                  required
                  value={fastingEmail}
                  onChange={(event) => setFastingEmail(event.target.value)}
                  placeholder={t('fastingHub.notifyPlaceholder')}
                  aria-label={t('fastingHub.notifyPlaceholder')}
                  className="fasting-input" id="field-pages-homepage-465" name="field-pages-homepage-465"
                />
                <button type="submit" className="btn-primary" disabled={fastingLoading}>
                  {fastingLoading ? t('home.status.sending') : <>{t('fastingHub.notify')} <ArrowRight size={16} className="rtl:rotate-180" /></>}
                </button>
              </form>
            )}
            {fastingError && !fastingJoined && (
              <p className="text-sm text-red-600 mt-2">{fastingError}</p>
            )}
            <p className="fasting-note">{t('fastingHub.privacyNote')}</p>
          </div>
          <div className="fasting-glow" aria-hidden="true"><Hourglass size={132} strokeWidth={1.1} /></div>
        </div>
      </section>

      <section className="section-wrap" ref={blogSectionRef}>
        <div className="trustsec-head">
          <span className="step-pill gold">{t('homeDaily.eyebrow')}</span>
          <h2 className="trustsec-title">{t('homeDaily.title')}</h2>
        </div>
        {articlesData && latestArticles.length > 0 ? (
          <div className="home-daily-layout">
            {(() => {
              const article = latestArticles[0];
              const CategoryIcon = CATEGORY_ICON[article.category];
              return (
                <Link to={`/resources/article/${article.slug}`} className="home-daily-feature">
                  <span className="home-daily-feature-icon"><CategoryIcon size={28} strokeWidth={1.8} /></span>
                  <span className="blog-cat">{t(`article.category.${article.category}` as any)}</span>
                  <h3>{articlesData.lt(article.title, language)}</h3>
                  <p>{articlesData.lt(article.excerpt, language)}</p>
                  <span className="home-daily-date">{new Date(`${article.publishedAt}T00:00:00`).toLocaleDateString(countLocale, { year: 'numeric', month: 'long', day: 'numeric' })} <span>·</span> {article.readTime} {t('homeBlog.minRead')}</span>
                  <span className="blog-more">{t('common.readMore')} <ArrowRight size={15} className="rtl:rotate-180" /></span>
                </Link>
              );
            })()}
            <div className="home-daily-more">
              <h3>{t('homeDaily.more')}</h3>
              {latestArticles.slice(1).map((article) => {
                const CategoryIcon = CATEGORY_ICON[article.category];
                return (
                  <Link to={`/resources/article/${article.slug}`} className="home-daily-link" key={article.id}>
                    <span className="home-daily-link-icon"><CategoryIcon size={19} /></span>
                    <span><small>{t(`article.category.${article.category}` as any)}</small><b>{articlesData.lt(article.title, language)}</b><small>{article.readTime} {t('homeBlog.minRead')}</small></span>
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </Link>
                );
              })}
              <Link to="/resources" className="home-daily-all">{t('homeBlog.viewAll')} <ArrowRight size={15} className="rtl:rotate-180" /></Link>
            </div>
          </div>
        ) : (
          <div className="home-daily-layout" aria-hidden="true">
            <div className="home-daily-feature blog-card-skeleton" />
            <div className="home-daily-more blog-card-skeleton" />
          </div>
        )}
      </section>

      <section className="section-wrap">
        <div
          dir="ltr"
          className="grid min-w-0 grid-cols-1 items-center gap-7 rounded-[32px] border border-[#E4ECE5] bg-gradient-to-br from-[#F0FAF3] via-white to-[#FFF8E5] p-5 shadow-[0_18px_50px_rgba(15,76,58,0.08)] sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10"
        >
          <div
            role="img"
            aria-label={t('home.watch.imageAlt')}
            className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-white via-[#F1F8F1] to-[#FFF6DD] shadow-[0_12px_35px_rgba(15,76,58,0.08)]"
          >
            <div className="absolute left-[14%] top-[17%] flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F4C3A] shadow-[0_8px_24px_rgba(15,76,58,0.1)]">
              <HeartPulse aria-hidden="true" size={22} />
            </div>
            <div className="absolute bottom-[17%] right-[12%] flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#B28B22] shadow-[0_8px_24px_rgba(15,76,58,0.1)]">
              <Moon aria-hidden="true" size={21} />
            </div>
            <div className="relative z-10 flex items-center gap-2 sm:gap-4">
              <div className="relative flex h-[148px] w-[88px] items-center justify-center rounded-[27px] border-[5px] border-[#0F4C3A] bg-white shadow-[0_14px_30px_rgba(15,76,58,0.16)] sm:h-[170px] sm:w-[100px]">
                <span className="absolute -top-6 h-7 w-12 rounded-t-xl bg-[#D4A017]/70" />
                <span className="absolute -bottom-6 h-7 w-12 rounded-b-xl bg-[#D4A017]/70" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-[21px] bg-[#F8FAF7] text-[#0F4C3A]">
                  <Watch aria-hidden="true" size={40} strokeWidth={1.7} />
                  <span className="mt-1 text-[11px] font-extrabold">8,420</span>
                  <Activity aria-hidden="true" size={20} className="mt-1 text-[#D4A017]" />
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4A017]/50 bg-white text-[#0F4C3A] shadow-sm">
                <RefreshCw aria-hidden="true" size={17} />
              </span>
              <div className="relative h-[180px] w-[100px] rounded-[25px] border-[5px] border-[#0F4C3A] bg-[#0F4C3A] p-1.5 shadow-[0_14px_30px_rgba(15,76,58,0.16)] sm:h-[210px] sm:w-[116px]">
                <div className="flex h-full flex-col items-center rounded-[18px] bg-white px-2.5 py-3">
                  <span className="mb-4 h-1.5 w-10 rounded-full bg-[#E5E7EB]" />
                  <Smartphone aria-hidden="true" size={25} className="text-[#0F4C3A]" />
                  <span className="mt-3 text-[10px] font-bold text-gray-700">{t('home.watch.today')}</span>
                  <div className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F0FAF3] px-2 py-2 text-[#0F4C3A]">
                    <HeartPulse aria-hidden="true" size={14} />
                    <span className="text-[10px] font-bold">72 bpm</span>
                  </div>
                  <div className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#FFF8E5] px-2 py-2 text-[#8A6D1B]">
                    <Moon aria-hidden="true" size={14} />
                    <span className="text-[10px] font-bold">7.8 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="absolute bottom-7 left-7 h-2.5 w-2.5 rounded-full bg-[#D4A017]" />
            <span className="absolute right-8 top-8 h-3 w-3 rounded-full bg-[#0F4C3A]/20" />
          </div>

          <div dir={dir} className="min-w-0 text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A017]/35 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.12em] text-[#8A6D1B]">
              <span className="h-2 w-2 rounded-full bg-[#D4A017]" />
              {t('home.watch.badge')}
            </span>
            <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-tight text-[#111827] sm:text-[36px]">
              {t('watchHeadline')}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
              {t('home.watch.subtitle')}
            </p>

            <ul className="mt-5 grid gap-3">
              {watchBenefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex min-w-0 items-center gap-3 text-sm font-medium text-gray-700 sm:text-[15px]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F4C3A] shadow-sm ring-1 ring-[#0F4C3A]/10">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="min-w-0 break-words">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#0F4C3A]/10 pt-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                {t('home.watch.supported')}
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-extrabold tracking-[0.08em] text-gray-500 grayscale opacity-70" aria-label={t('home.watch.devicesAria')}>
                <span>APPLE WATCH</span>
                <span className="text-[15px] tracking-[0.02em]">fitbit</span>
                <span>GARMIN</span>
              </div>
            </div>

            {watchJoined ? (
              <div role="status" aria-live="polite" className="mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-[#059669]/25 bg-[#F0FAF3] px-5 py-4">
                <CheckCircle2 aria-hidden="true" size={22} className="shrink-0 text-[#059669]" />
                <span>
                  <span className="block text-[15px] font-extrabold text-[#0F4C3A]">{t('watchThanksTitle')}</span>
                  <span className="mt-0.5 block text-[13px] font-medium text-[#6B7A75]">{t('watchThanksDesc')}</span>
                </span>
              </div>
            ) : (
              <form onSubmit={handleWatchNotify} className="mt-6 max-w-md">
                <label htmlFor="watch-email" className="sr-only">{t('watchEmailPlaceholder')}</label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id="watch-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={watchEmail}
                    onChange={(event) => setWatchEmail(event.target.value)}
                    placeholder={t('watchEmailPlaceholder')}
                    className="min-w-0 flex-1 rounded-full border border-[#0F4C3A]/15 bg-white px-5 py-3 text-sm font-medium text-[#111827] shadow-sm outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20" name="watch-email"
                  />
                  <button type="submit" className="btn-primary shrink-0" disabled={watchLoading}>
                    {watchLoading ? t('home.status.sending') : <>{t('watchNotify')} <ArrowRight aria-hidden="true" size={16} className="rtl:rotate-180" /></>}
                  </button>
                </div>
                {watchError && (
                  <p className="mt-2.5 text-xs text-red-600">{watchError}</p>
                )}
                {!watchError && (
                  <p className="mt-2.5 text-xs text-[#6B7A75]">{t('watchPrivacyNote')}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DeferredHighlights;
