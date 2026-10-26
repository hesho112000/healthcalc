import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SITE_BASE = (process.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');
const LANGUAGES = ['en', 'ar', 'fr', 'es', 'de'];
const TODAY = new Date().toISOString().slice(0, 10);
const BATCH_SIZE = 50;

const PUBLIC_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/weight-loss', changefreq: 'monthly', priority: '0.9' },
  { path: '/diabetes', changefreq: 'monthly', priority: '0.9' },
  { path: '/fitness', changefreq: 'monthly', priority: '0.9' },
  { path: '/food-library', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'yearly', priority: '0.5' },
  { path: '/resources', changefreq: 'weekly', priority: '0.8' },
  ...['understanding-hba1c', 'blood-pressure-myths', 'gout-flare-ups', 'intermittent-fasting-safety', 'lower-cholesterol-naturally', 'mindful-eating', 'pcos-insulin-resistance', 'science-of-sleep', 'strength-training-diabetes'].map((slug) => ({ path: `/resources/article/${slug}`, changefreq: 'yearly', priority: '0.6' })),
  ...['foul-medames', 'grilled-chicken-brown-rice', 'lebanese-tabbouleh', 'moroccan-lentil-soup', 'saudi-kabsa-lighter', 'tunisian-vegetable-tagine'].map((slug) => ({ path: `/resources/recipe/${slug}`, changefreq: 'yearly', priority: '0.6' })),
  ...['low-impact-cardio', 'strength-hypertension', 'swimming-fitness', 'tai-chi-balance', 'walking-for-diabetes', 'yoga-stress-relief'].map((slug) => ({ path: `/resources/exercise/${slug}`, changefreq: 'yearly', priority: '0.6' })),
  { path: '/contact', changefreq: 'yearly', priority: '0.4' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
  { path: '/faq', changefreq: 'yearly', priority: '0.4' },
];

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;');

const routeUrl = (routePath, language) => {
  const localized = new URL(`${SITE_BASE}${routePath}`);
  localized.searchParams.set('lang', language);
  return localized.toString();
};

const staticEntries = PUBLIC_ROUTES.flatMap((route) => {
  const alternates = LANGUAGES.map((language) =>
    `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(routeUrl(route.path, language))}" />`
  ).join('\n');
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(routeUrl(route.path, 'en'))}" />`;

  return LANGUAGES.map((language) => `  <url>\n    <loc>${escapeXml(routeUrl(route.path, language))}</loc>\n${alternates}\n${xDefault}\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`);
}).join('\n');

async function fetchAllDishIds() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const ids = [];
  let from = 0;
  let to = BATCH_SIZE - 1;

  while (true) {
    const { data, error } = await supabase
      .from('dishes')
      .select('id')
      .order('id', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to fetch dishes batch ${from}-${to}: ${error.message}`);
    }

    const batch = data ?? [];
    for (const row of batch) ids.push(row.id);

    if (batch.length < BATCH_SIZE) break;

    from += BATCH_SIZE;
    to += BATCH_SIZE;
  }

  return ids;
}

async function countAllDishes() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  let count = 0;
  let from = 0;
  let to = BATCH_SIZE - 1;

  while (true) {
    const { count: c, error } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true })
      .range(from, to);

    if (error) {
      throw new Error(`Failed to count dishes batch ${from}-${to}: ${error.message}`);
    }
    if (c == null) break;

    count = c;
    if (c <= to) break;

    from += BATCH_SIZE;
    to += BATCH_SIZE;
  }

  return count;
}

const buildSitemap = async () => {
  const [ids, totalDishes] = await Promise.all([fetchAllDishIds(), countAllDishes()]);

  const dishEntries = ids
    .map((id) => `  <url>\n    <loc>${escapeXml(`${SITE_BASE}/food-library/${id}`)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${staticEntries}\n${dishEntries}\n</urlset>\n`;
  const outputPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
  await writeFile(outputPath, sitemap, 'utf8');

  const total = PUBLIC_ROUTES.length * LANGUAGES.length + totalDishes;
  console.log(`SUCCESS: Sitemap generated with ${total} URLs at ${path.relative(process.cwd(), outputPath)}`);
};

buildSitemap().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
