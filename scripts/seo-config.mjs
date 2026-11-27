import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');

config({ path: path.join(PROJECT_ROOT, '.env'), override: false });
config({ path: path.join(PROJECT_ROOT, '.env.local'), override: false });

export const SITE_BASE = (process.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');

// Only advertise locales with complete article translations. The prerenderer
// uses the same list, so the sitemap never points at an unbuilt locale page.
export const LOCALIZED_LANGUAGES = ['fr', 'es', 'hi'];

/** Return the canonical absolute URL for an internal route, always slash-terminated. */
export const canonicalUrl = (route) => {
  const pathname = String(route ?? '/');
  if (!pathname || pathname === '/') return `${SITE_BASE}/`;
  return `${SITE_BASE}/${pathname.replace(/^\/+|\/+$/g, '')}/`;
};

export const hasTranslation = (text, lang) =>
  typeof text?.[lang] === 'string' && text[lang].trim().length > 0;

export const localizedText = (text, lang, fallbackLang = 'en') =>
  (hasTranslation(text, lang) ? text[lang] : text?.[fallbackLang] ?? '').trim();
