import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';
import { ARTICLES, getArticleBySlug, lt } from '../data/articles';
import { translations } from '../i18n/translations';

const ReactMarkdown = lazy(() => import('react-markdown'));

type TKey = keyof typeof translations.en;

const ArticlePage: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const related = useMemo(() => {
    if (!article) return [];
    const sameCategory = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category);
    const others = ARTICLES.filter((a) => a.slug !== article.slug && a.category !== article.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6" dir={dir}>
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-[#F4F1EB] flex items-center justify-center mx-auto mb-6 text-4xl">🔍</div>
          <h1 className="text-2xl font-extrabold text-gray-900">{t('article.notFound')}</h1>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-extrabold text-[#0F4C3A] hover:bg-[#C9A032] transition-colors"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t('article.backToResources')}
          </Link>
        </div>
      </div>
    );
  }

  const title = lt(article.title, language);
  const description = lt(article.excerpt, language);
  const takeaways = article.takeaways[language as 'en' | 'ar'] ?? article.takeaways.en;
  const categoryKey = `article.category.${article.category}` as TKey;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'HealthCalc' },
    publisher: { '@type': 'Organization', name: 'HealthCalc', url: 'https://hesho112000.github.io/healthcalc/' },
    mainEntityOfPage: `https://hesho112000.github.io/healthcalc/#/resources/article/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" dir={dir}>
      <SEO type="article" title={title} description={description} url={`/resources/article/${article.slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>
      <div className="max-w-[720px] mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B7A75]">
          <Link to="/resources" className="font-bold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors">
            {t('nav.resources')}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold truncate max-w-[420px]">{title}</span>
        </div>

        <Link
          to="/resources"
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4C3A] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t('article.backToResources')}
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-full bg-[#0F4C3A] px-3.5 py-1.5 text-xs font-extrabold tracking-wide uppercase text-[#FDFBF7]">
              {t(categoryKey)}
            </span>
            <span className="w-11 h-11 rounded-2xl bg-[#F4F1EB] flex items-center justify-center text-2xl">
              {article.icon}
            </span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F4C3A] leading-tight">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B7A75]">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Clock size={15} className="text-[#D4AF37]" />
              {article.readTime} {t('article.readTime')}
            </span>
            <span className="font-semibold">{article.publishedAt}</span>
            <span className="font-semibold">{t('article.byTeam')}</span>
          </div>
        </header>

        <article className="mt-10 space-y-5">
          <Suspense
            fallback={
              <div className="h-40 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#0F4C3A] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-10 mb-4 text-2xl font-extrabold text-[#0F4C3A] tracking-tight">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="text-base leading-[1.8] text-[#4A5A55]">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="my-5 space-y-2.5 rounded-2xl bg-[#F4F1EB] border border-[#EFEBE4] px-6 py-5 list-none">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#4A5A55]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => <strong className="font-extrabold text-[#0F4C3A]">{children}</strong>,
            }}
          >
            {lt(article.content, language)}
          </ReactMarkdown>
          </Suspense>
        </article>

        <aside className="mt-12 rounded-[28px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] p-7 sm:p-8 shadow-[0_18px_44px_rgba(15,76,58,0.18)]">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Check size={18} />
            <h2 className="text-lg font-extrabold uppercase tracking-wide">{t('article.keyTakeaways')}</h2>
          </div>
          <ul className="mt-5 space-y-3.5">
            {takeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#FDFBF7]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0F4C3A]">{t('article.related')}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/resources/article/${item.slug}`}
                className="rounded-3xl border border-[#EFEBE4] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,76,58,0.10)]"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 text-sm font-extrabold text-[#0F4C3A] leading-snug line-clamp-3">
                  {lt(item.title, language)}
                </h3>
                <p className="mt-2 text-xs font-bold text-[#6B7A75]">
                  {item.readTime} {t('article.readTime')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F4C3A] to-[#1a6b53] px-8 py-12 text-center shadow-[0_24px_60px_rgba(15,76,58,0.25)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_140%_at_50%_0%,rgba(212,175,55,0.18),rgba(255,255,255,0)_60%)]" />
          <div className="relative">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F4C3A] flex items-center justify-center">
              <TrendingUp size={22} />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-[#FDFBF7] tracking-tight">{t('article.cta.title')}</h3>
            <Link
              to="/advanced-care"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-extrabold text-[#0F4C3A] shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:bg-[#C9A032] transition-colors"
            >
              {t('article.cta.button')}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;