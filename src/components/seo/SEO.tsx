import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  noindex?: boolean;
}

const BASE_URL = (import.meta.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-image.png`;

const LANGUAGES: Array<{ lang: string; label: string }> = [
  { lang: 'en', label: 'English' },
  { lang: 'ar', label: 'العربية' },
  { lang: 'es', label: 'Español' },
  { lang: 'fr', label: 'Français' },
  { lang: 'hi', label: 'हिन्दी' },
  { lang: 'de', label: 'Deutsch' },
];

const LANGUAGE_CODES = new Set(LANGUAGES.map(({ lang }) => lang));

/** Remove an existing `/<lang>` prefix so it is never duplicated. */
const stripLanguagePrefix = (pathname: string): string => {
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  if (first && LANGUAGE_CODES.has(first)) {
    return `/${rest.join('/')}`;
  }
  return pathname;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  locale,
  noindex = false,
}) => {
  const { language } = useLanguage();
  const fullTitle = `${title} | Health Fingerprint`;
  const pageUrl = new URL(url ?? '/', BASE_URL);
  // Every locale gets its own path-based URL: /<lang>/<path>. These are the
  // indexable addresses advertised through hreflang; the app redirects them to
  // the matching route while keeping the selected language.
  const localizedUrl = (lang: string) => {
    const localized = new URL(pageUrl);
    const cleanPath = stripLanguagePrefix(localized.pathname).replace(/^\/+/, '');
    localized.pathname = `/${lang}${cleanPath ? `/${cleanPath}` : ''}`;
    localized.searchParams.delete('lang');
    localized.hash = '';
    return localized.toString();
  };
  const canonicalUrl = new URL(pageUrl);
  canonicalUrl.search = '';
  canonicalUrl.hash = '';
  const currentLocale = locale || language || 'en';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl.toString()} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl.toString()} />
      <meta property="og:site_name" content="Health Fingerprint" />
      <meta property="og:locale" content={currentLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {LANGUAGES.map(({ lang, label }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={localizedUrl(lang)} title={label} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localizedUrl('en')} />
    </Helmet>
  );
};

export default SEO;
