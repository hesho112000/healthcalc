import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { loadContentData } from './content-data.mjs';

config();

const SITE_BASE = (process.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');
const OUTPUT_PATH = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
const DISH_DATA_PATH = fileURLToPath(new URL('../.dish-seo-data.json', import.meta.url));
// Read-only pagination. This script never inserts, updates, or deletes rows.
// Keep each database read within the requested 50-record limit.
const BATCH_SIZE = 50;

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;');

async function fetchAllDishes() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const dishes = [];
  let from = 0;
  let totalFetched = 0;

  while (true) {
    const to = from + BATCH_SIZE - 1;
    const { data, error } = await supabase
      .from('dishes')
      .select('id,name_en,cal_100,protein,carbs,fat')
      .order('id', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Supabase error at range ${from}-${to}: ${error.message}`);
    }

    const batch = data ?? [];
    if (batch.length === 0) {
      console.log(`No more dishes at offset ${from}. Stopping.`);
      break;
    }

    dishes.push(...batch);
    totalFetched += batch.length;
    console.log(`Fetched ${batch.length} dishes (total: ${totalFetched})...`);

    if (batch.length < BATCH_SIZE) {
      console.log(`Final batch smaller than ${BATCH_SIZE}. Stopping.`);
      break;
    }

    from += BATCH_SIZE;
  }

  return dishes;
}

// Languages translated in this batch. A localized URL is only advertised when
// both the title and the Markdown body exist, so the sitemap never points
// crawlers at a thin English fallback.
const LOCALIZED_LANGUAGES = ['fr', 'es', 'hi'];

const hasTranslation = (text, lang) =>
  typeof text?.[lang] === 'string' && text[lang].trim().length > 0;

const urlEntry = (loc, changefreq, priority, alternates = []) => {
  const alternateLinks = alternates.map(
    ({ hreflang, href }) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
  );

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    ...alternateLinks,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n');
};

const buildSitemap = async () => {
  const { articles, recipes, exerciseGuides } = await loadContentData();
  const dishes = await fetchAllDishes();
  const ids = dishes.map((dish) => dish.id);

  // Every translated article gets its own `<loc>` plus a full set of hreflang
  // alternates on each locale so search engines can cluster the versions.
  const articleEntries = articles.flatMap((article) => {
    const articlePath = `/resources/article/${article.slug}`;
    const canonicalUrl = `${SITE_BASE}${articlePath}`;
    const translatedLanguages = LOCALIZED_LANGUAGES.filter(
      (lang) => hasTranslation(article.title, lang) && hasTranslation(article.content, lang),
    );
    const alternates = [
      { hreflang: 'en', href: canonicalUrl },
      ...translatedLanguages.map((lang) => ({
        hreflang: lang,
        href: `${SITE_BASE}/${lang}${articlePath}`,
      })),
      { hreflang: 'x-default', href: canonicalUrl },
    ];

    return [
      urlEntry(canonicalUrl, 'weekly', 1.0, alternates),
      ...translatedLanguages.map((lang) =>
        urlEntry(`${SITE_BASE}/${lang}${articlePath}`, 'weekly', 1.0, alternates),
      ),
    ];
  });

  // Resource pages are the primary editorial content for AdSense review.
  // Keep them at the very top of the sitemap with the highest priority.
  const resourceEntries = [
    urlEntry(`${SITE_BASE}/resources`, 'weekly', 1.0),
    ...articleEntries,
    ...recipes.map((recipe) => urlEntry(`${SITE_BASE}/resources/recipe/${recipe.slug}`, 'weekly', 1.0)),
    ...exerciseGuides.map((guide) => urlEntry(`${SITE_BASE}/resources/exercise/${guide.slug}`, 'weekly', 1.0)),
  ].join('\n');

  const staticEntries = [
    urlEntry(`${SITE_BASE}/`, 'monthly', 1.0),
    urlEntry(`${SITE_BASE}/food-library`, 'monthly', 0.7),
    urlEntry(`${SITE_BASE}/about`, 'yearly', 0.5),
    urlEntry(`${SITE_BASE}/privacy`, 'yearly', 0.4),
    urlEntry(`${SITE_BASE}/terms`, 'yearly', 0.4),
    urlEntry(`${SITE_BASE}/contact`, 'yearly', 0.4),
    urlEntry(`${SITE_BASE}/cookies`, 'yearly', 0.3),
    urlEntry(`${SITE_BASE}/disclaimer`, 'yearly', 0.3),
  ].join('\n');

  // Dish pages are intentionally de-prioritized so crawlers do not sample the
  // long-tail food database as the site's primary content.
  const dishEntries = ids
    .map((id) => urlEntry(`${SITE_BASE}/food-library/${id}`, 'monthly', 0.3))
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${resourceEntries}\n${staticEntries}\n${dishEntries}\n</urlset>\n`;

  await writeFile(OUTPUT_PATH, sitemap, 'utf8');
  // Build-time sidecar consumed by the prerenderer for dish titles and Product schema.
  await writeFile(DISH_DATA_PATH, JSON.stringify(dishes), 'utf8');

  const resourceCount = 1 + articleEntries.length + recipes.length + exerciseGuides.length;
  const staticCount = 8;
  console.log(
    `SUCCESS: Sitemap generated with ${resourceCount + staticCount + ids.length} URLs ` +
      `(${resourceCount} resources, ${staticCount} static, ${ids.length} dishes) at ` +
      `${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );
};

buildSitemap().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
