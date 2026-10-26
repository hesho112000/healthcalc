import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SITE_BASE = (process.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');
const OUTPUT_PATH = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
const BATCH_SIZE = 1000;

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&apos;');

async function fetchAllDishIds() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const ids = [];
  let from = 0;
  let totalFetched = 0;

  while (true) {
    const to = from + BATCH_SIZE - 1;
    const { data, error } = await supabase
      .from('dishes')
      .select('id')
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

    for (const row of batch) ids.push(row.id);
    totalFetched += batch.length;
    console.log(`Fetched ${batch.length} ids (total: ${totalFetched})...`);

    if (batch.length < BATCH_SIZE) {
      console.log(`Final batch smaller than ${BATCH_SIZE}. Stopping.`);
      break;
    }

    from += BATCH_SIZE;
  }

  return ids;
}

const buildSitemap = async () => {
  const ids = await fetchAllDishIds();

  const staticEntries = `
  <url>
    <loc>${escapeXml(`${SITE_BASE}/`)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${escapeXml(`${SITE_BASE}/food-library`)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${escapeXml(`${SITE_BASE}/resources`)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${escapeXml(`${SITE_BASE}/about`)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>`;

  const dishEntries = ids
    .map((id) => `  <url>
    <loc>${escapeXml(`${SITE_BASE}/food-library/${id}`)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticEntries}\n${dishEntries}\n</urlset>\n`;

  await writeFile(OUTPUT_PATH, sitemap, 'utf8');
  console.log(`SUCCESS: Sitemap generated with ${4 + ids.length} URLs at ${path.relative(process.cwd(), OUTPUT_PATH)}`);
};

buildSitemap().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
