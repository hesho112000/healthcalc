import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import { loadContentData } from './content-data.mjs';

config();

const SITE_BASE = (process.env.VITE_SITE_URL || 'https://healthfingerprint.com').replace(/\/+$/, '');
const DIST_DIR = fileURLToPath(new URL('../dist/', import.meta.url));
const SHELL_PATH = path.join(DIST_DIR, 'index.html');
const SITEMAP_PATH = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
const DISH_DATA_PATH = fileURLToPath(new URL('../.dish-seo-data.json', import.meta.url));

const PAGE_STYLE =
  'max-width:860px;margin:0 auto;padding:48px 20px 72px;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#374151;line-height:1.75;';
const H1_STYLE = 'font-size:2rem;line-height:1.2;color:#0F4C3A;margin:0 0 16px;font-weight:800;';
const H2_STYLE = 'font-size:1.35rem;line-height:1.3;color:#0F4C3A;margin:32px 0 12px;font-weight:800;';
const LINK_STYLE = 'color:#0F4C3A;text-decoration:underline;text-underline-offset:2px;';
const LIST_STYLE = 'padding-left:1.25rem;margin:12px 0 20px;';
const MUTED_STYLE = 'color:#4B5563;font-size:.95rem;';
const NAV_STYLE = 'font-size:.9rem;color:#6B7A75;margin-bottom:24px;';

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const escapeAttr = (value) => escapeHtml(value).replaceAll('\n', ' ');

const renderInline = (value) =>
  escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="' + LINK_STYLE + '">$1</a>');

const markdownToHtml = (markdown) => {
  const lines = String(markdown ?? '').split(/\r?\n/);
  const out = [];
  let listType = null;

  const closeList = () => {
    if (!listType) return;
    out.push(`</${listType}>`);
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }

    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      closeList();
      out.push(`<h2 style="${H2_STYLE}">${renderInline(h2[1])}</h2>`);
      continue;
    }

    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      closeList();
      out.push(`<h3 style="font-size:1.1rem;color:#0F4C3A;margin:24px 0 10px;font-weight:800;">${renderInline(h3[1])}</h3>`);
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.*)$/);
    if (unordered) {
      if (listType !== 'ul') {
        closeList();
        out.push(`<ul style="${LIST_STYLE}">`);
        listType = 'ul';
      }
      out.push(`<li>${renderInline(unordered[1])}</li>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.*)$/);
    if (ordered) {
      if (listType !== 'ol') {
        closeList();
        out.push(`<ol style="${LIST_STYLE}">`);
        listType = 'ol';
      }
      out.push(`<li>${renderInline(ordered[1])}</li>`);
      continue;
    }

    closeList();
    out.push(`<p style="margin:0 0 16px;">${renderInline(line)}</p>`);
  }

  closeList();
  return out.join('\n');
};

const breadcrumbs = (label) => `<nav aria-label="Breadcrumb" style="${NAV_STYLE}">
  <a href="/" style="${LINK_STYLE}">Home</a> <span aria-hidden="true">/</span>
  <a href="/resources" style="${LINK_STYLE}">Health Resources</a>
  ${label ? `<span aria-hidden="true">/</span> <span>${escapeHtml(label)}</span>` : ''}
</nav>`;

const renderHome = ({ articles }) => `<main style="${PAGE_STYLE}">
  <h1 style="${H1_STYLE}">Health Fingerprint: Free Health Calculators and Personalized Care Plans</h1>
  <p style="font-size:1.1rem;color:#4A5A55;margin:0 0 16px;">Health Fingerprint helps you understand your body with free, evidence-based calculators, personalized meal plans, and practical nutrition information. Use the tools below to estimate your needs, then explore our health library for guidance you can act on.</p>
  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&amp;fit=crop&amp;w=800&amp;h=400&amp;fm=webp&amp;q=80" alt="A colorful, healthy meal bowl with fresh vegetables" width="800" height="400" loading="eager" decoding="async" style="display:block;width:100%;max-width:680px;height:auto;aspect-ratio:2/1;object-fit:cover;object-position:center;border-radius:16px;margin:20px 0 28px;">

  <h2 style="${H2_STYLE}">Free Health Calculators</h2>
  <ul style="${LIST_STYLE}">
    <li><a href="/bmi" style="${LINK_STYLE}">BMI Calculator</a> — estimate body mass index from your height and weight.</li>
    <li><a href="/bmr" style="${LINK_STYLE}">BMR Calculator</a> — estimate the calories your body uses at rest.</li>
    <li><a href="/calories" style="${LINK_STYLE}">Daily Calorie Calculator</a> — estimate maintenance and weight-loss calories.</li>
    <li><a href="/ideal-weight" style="${LINK_STYLE}">Ideal Weight Calculator</a> — explore a healthy weight range for your height.</li>
    <li><a href="/weight-loss" style="${LINK_STYLE}">Weight Loss Planner</a> — build a personalized meal and activity plan.</li>
    <li><a href="/diabetes" style="${LINK_STYLE}">Diabetes Care</a> — understand blood sugar, HbA1c, and daily habits.</li>
    <li><a href="/fitness" style="${LINK_STYLE}">Fitness &amp; Workout Plans</a> — match activity to your goals and experience.</li>
  </ul>

  <h2 style="${H2_STYLE}">Personalized Meal Plans</h2>
  <p style="margin:0 0 16px;">Generate a weekly meal plan around your calorie target, food preferences, health conditions, and the cuisine you actually enjoy. Plans include portion sizes, macronutrients, and the ability to swap or remove individual dishes without losing the rest of your week.</p>

  <h2 style="${H2_STYLE}">Nutrition &amp; Food Library</h2>
  <p style="margin:0 0 16px;">Browse more than 18,000 dishes with calories, protein, carbohydrates, fat, fiber, sugar, sodium, and practical health notes. Compare foods and find options that fit your plan. <a href="/food-library" style="${LINK_STYLE}">Open the Food Library</a>.</p>

  <h2 style="${H2_STYLE}">Health Resources, Articles &amp; Recipes</h2>
  <p style="margin:0 0 16px;">Read evidence-based guides on diabetes, heart health, nutrition, sleep, fitness, and sustainable lifestyle change. Every article includes key takeaways, and our recipe and exercise guides give you a clear next step.</p>
  <ul style="${LIST_STYLE}">
    ${articles
      .map(
        (article) =>
          `<li><a href="/resources/article/${article.slug}" style="${LINK_STYLE}">${escapeHtml(article.title.en)}</a> — ${escapeHtml(article.excerpt.en)}</li>`,
      )
      .join('\n    ')}
  </ul>
  <p><a href="/resources" style="${LINK_STYLE}">Browse all health resources, recipes, and exercise guides</a>.</p>

  <h2 style="${H2_STYLE}">Privacy, Terms &amp; Medical Disclaimer</h2>
  <ul style="${LIST_STYLE}">
    <li><a href="/privacy" style="${LINK_STYLE}">Privacy Policy</a> — how we handle information and advertising cookies.</li>
    <li><a href="/terms" style="${LINK_STYLE}">Terms of Service</a> — the rules for using Health Fingerprint.</li>
    <li><a href="/cookies" style="${LINK_STYLE}">Cookie Policy</a> — how cookies and web beacons are used.</li>
    <li><a href="/disclaimer" style="${LINK_STYLE}">Medical Disclaimer</a> — educational information is not a substitute for medical care.</li>
    <li><a href="/contact" style="${LINK_STYLE}">Contact Us</a> — questions, corrections, and feedback.</li>
  </ul>
</main>`;

const renderResources = ({ articles, recipes, exerciseGuides }) => `<main style="${PAGE_STYLE}">
  ${breadcrumbs('')}
  <h1 style="${H1_STYLE}">Health Resources: Articles, Recipes &amp; Exercise Guides</h1>
  <p style="font-size:1.1rem;color:#4A5A55;margin:0 0 16px;">Practical, evidence-based health information you can read in minutes and use the same day. Explore nutrition guides, condition-specific articles, healthy recipes, and exercise routines with clear instructions.</p>

  <h2 style="${H2_STYLE}">Health Articles</h2>
  <ul style="${LIST_STYLE}">
    ${articles
      .map(
        (article) =>
          `<li><a href="/resources/article/${article.slug}" style="${LINK_STYLE}">${escapeHtml(article.title.en)}</a> — ${escapeHtml(article.excerpt.en)} <span style="${MUTED_STYLE}">(${article.readTime} min read)</span></li>`,
      )
      .join('\n    ')}
  </ul>

  <h2 style="${H2_STYLE}">Healthy Recipes</h2>
  <ul style="${LIST_STYLE}">
    ${recipes
      .map(
        (recipe) =>
          `<li><a href="/resources/recipe/${recipe.slug}" style="${LINK_STYLE}">${escapeHtml(recipe.title.en)}</a> — ${escapeHtml(recipe.description.en)} <span style="${MUTED_STYLE}">(${escapeHtml(recipe.prepTime.en)})</span></li>`,
      )
      .join('\n    ')}
  </ul>

  <h2 style="${H2_STYLE}">Exercise Guides</h2>
  <ul style="${LIST_STYLE}">
    ${exerciseGuides
      .map(
        (guide) =>
          `<li><a href="/resources/exercise/${guide.slug}" style="${LINK_STYLE}">${escapeHtml(guide.title.en)}</a> — ${escapeHtml(guide.description.en)} <span style="${MUTED_STYLE}">(${guide.duration} min)</span></li>`,
      )
      .join('\n    ')}
  </ul>

  <h2 style="${H2_STYLE}">Keep Exploring</h2>
  <ul style="${LIST_STYLE}">
    <li><a href="/food-library" style="${LINK_STYLE}">Food Library</a> — nutrition facts for more than 18,000 dishes.</li>
    <li><a href="/weight-loss" style="${LINK_STYLE}">Weight Loss Planner</a> — build a personalized weekly meal plan.</li>
    <li><a href="/diabetes" style="${LINK_STYLE}">Diabetes Care</a> — blood sugar, HbA1c, and daily habits.</li>
    <li><a href="/fitness" style="${LINK_STYLE}">Fitness Tools</a> — calculators and workout planning.</li>
  </ul>
</main>`;

const renderArticle = ({ article, articles }) => {
  const related = [
    ...articles.filter((item) => item.category === article.category && item.slug !== article.slug),
    ...articles.filter((item) => item.category !== article.category && item.slug !== article.slug),
  ].slice(0, 3);

  return `<main style="${PAGE_STYLE}">
  ${breadcrumbs(article.title.en)}
  <article>
    <p style="${MUTED_STYLE}">${escapeHtml(article.category)} &middot; ${article.readTime} min read &middot; ${escapeHtml(article.publishedAt)}</p>
    <p style="${MUTED_STYLE}">Reviewed by the <a href="/about" style="${LINK_STYLE}">HealthFingerprint Medical Team</a>.</p>
    <h1 style="${H1_STYLE}">${escapeHtml(article.title.en)}</h1>
    <p style="font-size:1.1rem;color:#4A5A55;margin:0 0 16px;">${escapeHtml(article.excerpt.en)}</p>
    ${markdownToHtml(article.content.en)}

    <h2 style="${H2_STYLE}">Key Takeaways</h2>
    <ul style="${LIST_STYLE}">
      ${article.takeaways.en.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n      ')}
    </ul>

    <h2 style="${H2_STYLE}">Related Articles</h2>
    <ul style="${LIST_STYLE}">
      ${related
        .map(
          (item) =>
            `<li><a href="/resources/article/${item.slug}" style="${LINK_STYLE}">${escapeHtml(item.title.en)}</a></li>`,
        )
        .join('\n      ')}
    </ul>

    <p style="margin-top:32px;"><a href="/resources" style="${LINK_STYLE}">&larr; Back to all health resources</a></p>
  </article>
</main>`;
};

const renderRecipe = ({ recipe, articles }) => `<main style="${PAGE_STYLE}">
  ${breadcrumbs(recipe.title.en)}
  <article>
    <p style="${MUTED_STYLE}">${escapeHtml(recipe.cuisine.en)} &middot; ${escapeHtml(recipe.prepTime.en)} &middot; ${recipe.nutrition.calories} kcal</p>
    <h1 style="${H1_STYLE}">${escapeHtml(recipe.title.en)}</h1>
    <p style="font-size:1.1rem;color:#4A5A55;margin:0 0 16px;">${escapeHtml(recipe.description.en)}</p>

    <h2 style="${H2_STYLE}">Ingredients</h2>
    <ul style="${LIST_STYLE}">
      ${recipe.ingredients.en.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n      ')}
    </ul>

    <h2 style="${H2_STYLE}">Instructions</h2>
    <ol style="${LIST_STYLE}">
      ${recipe.instructions.en.map((step) => `<li>${escapeHtml(step)}</li>`).join('\n      ')}
    </ol>

    <h2 style="${H2_STYLE}">Nutrition per Serving</h2>
    <ul style="${LIST_STYLE}">
      <li>Calories: ${recipe.nutrition.calories} kcal</li>
      <li>Protein: ${recipe.nutrition.protein} g</li>
      <li>Carbohydrates: ${recipe.nutrition.carbs} g</li>
      <li>Fat: ${recipe.nutrition.fat} g</li>
    </ul>

    <h2 style="${H2_STYLE}">Read More About Nutrition</h2>
    <ul style="${LIST_STYLE}">
      ${articles
        .slice(0, 3)
        .map(
          (article) =>
            `<li><a href="/resources/article/${article.slug}" style="${LINK_STYLE}">${escapeHtml(article.title.en)}</a></li>`,
        )
        .join('\n      ')}
    </ul>

    <p style="margin-top:32px;"><a href="/resources" style="${LINK_STYLE}">&larr; Back to all health resources</a></p>
  </article>
</main>`;

const renderExercise = ({ guide, exerciseGuides }) => {
  const related = [
    ...exerciseGuides.filter((item) => item.category === guide.category && item.slug !== guide.slug),
    ...exerciseGuides.filter((item) => item.category !== guide.category && item.slug !== guide.slug),
  ].slice(0, 3);

  return `<main style="${PAGE_STYLE}">
  ${breadcrumbs(guide.title.en)}
  <article>
    <p style="${MUTED_STYLE}">${escapeHtml(guide.category)} &middot; ${guide.duration} min &middot; ${guide.caloriesBurned} kcal &middot; ${escapeHtml(guide.difficulty)}</p>
    <h1 style="${H1_STYLE}">${escapeHtml(guide.title.en)}</h1>
    <p style="font-size:1.1rem;color:#4A5A55;margin:0 0 16px;">${escapeHtml(guide.description.en)}</p>

    <h2 style="${H2_STYLE}">Benefits</h2>
    <ul style="${LIST_STYLE}">
      ${guide.benefits.en.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n      ')}
    </ul>

    <h2 style="${H2_STYLE}">How to Do It</h2>
    <ol style="${LIST_STYLE}">
      ${guide.instructions.en.map((step) => `<li>${escapeHtml(step)}</li>`).join('\n      ')}
    </ol>

    <h2 style="${H2_STYLE}">Tips</h2>
    <ul style="${LIST_STYLE}">
      ${guide.tips.en.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('\n      ')}
    </ul>

    <h2 style="${H2_STYLE}">Related Exercise Guides</h2>
    <ul style="${LIST_STYLE}">
      ${related
        .map(
          (item) =>
            `<li><a href="/resources/exercise/${item.slug}" style="${LINK_STYLE}">${escapeHtml(item.title.en)}</a></li>`,
        )
        .join('\n      ')}
    </ul>

    <p style="margin-top:32px;"><a href="/resources" style="${LINK_STYLE}">&larr; Back to all health resources</a></p>
  </article>
</main>`;
};

const articleJsonLd = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title.en,
  description: article.excerpt.en,
  datePublished: article.publishedAt,
  author: {
    '@type': 'Person',
    name: 'HealthFingerprint Medical Team',
    url: `${SITE_BASE}/about`,
  },
  publisher: { '@type': 'Organization', name: 'Health Fingerprint', url: `${SITE_BASE}/` },
  mainEntityOfPage: `${SITE_BASE}/resources/article/${article.slug}`,
});

const recipeJsonLd = (recipe) => ({
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: recipe.title.en,
  description: recipe.description.en,
  recipeCategory: recipe.cuisine.en,
  prepTime: `PT${recipe.prepTime.en.replace(/\D/g, '')}M`,
  recipeIngredient: recipe.ingredients.en,
  recipeInstructions: recipe.instructions.en.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: step,
  })),
  nutrition: {
    '@type': 'NutritionInformation',
    calories: `${recipe.nutrition.calories} calories`,
    proteinContent: `${recipe.nutrition.protein} g`,
    carbohydrateContent: `${recipe.nutrition.carbs} g`,
    fatContent: `${recipe.nutrition.fat} g`,
  },
});

const exerciseJsonLd = (guide) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: guide.title.en,
  description: guide.description.en,
  totalTime: `PT${guide.duration}M`,
  step: guide.instructions.en.map((text, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text,
  })),
});

const applyHead = (html, meta) => {
  const tags = [
    `<meta name="description" content="${escapeAttr(meta.description)}" data-prerender="true" data-rh="true">`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" data-prerender="true">`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" data-prerender="true">`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" data-prerender="true">`,
    `<meta property="og:type" content="${meta.type}" data-prerender="true">`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" data-prerender="true">`,
    `<meta property="og:site_name" content="Health Fingerprint" data-prerender="true">`,
    `<meta name="twitter:card" content="summary_large_image" data-prerender="true">`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" data-prerender="true">`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" data-prerender="true">`,
  ];

  if (meta.jsonLd) {
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-prerender="true">${json}</script>`);
  }

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta[^>]*data-prerender="true"[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>\s*/gi, '')
    .replace(/<link[^>]*data-prerender="true"[^>]*>\s*/gi, '')
    .replace(/<script[^>]*data-prerender="true"[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
};

const applyBody = (html, bodyHtml, noscript) => {
  const rootPattern = /<div id="root">[\s\S]*<\/div>\s*<\/body>/i;
  if (!rootPattern.test(html)) {
    throw new Error('Could not find the #root container in dist/index.html.');
  }
  return html.replace(rootPattern, `<div id="root">${bodyHtml}${noscript}</div>\n  </body>`);
};

const readDishIdsFromSitemap = async () => {
  const sitemap = await readFile(SITEMAP_PATH, 'utf8');
  const ids = new Set();
  for (const [, rawLoc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = rawLoc.replaceAll('&amp;', '&');
    const url = new URL(loc, `${SITE_BASE}/`);
    if (url.origin !== new URL(SITE_BASE).origin) continue;
    const match = url.pathname.match(/^\/food-library\/([^/]+)\/?$/);
    if (match) ids.add(match[1]);
  }
  return [...ids];
};

const readDishSeoData = async () => {
  try {
    return JSON.parse(await readFile(DISH_DATA_PATH, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    return (await readDishIdsFromSitemap()).map((id) => ({ id, name_en: `Dish ${id}` }));
  }
};

const productJsonLd = (dish) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: dish.name_en || `Dish ${dish.id}`,
  description: `Nutrition information per 100 g for ${dish.name_en || `dish ${dish.id}`}.`,
  url: `${SITE_BASE}/food-library/${dish.id}`,
  additionalProperty: [
    ['Calories', dish.cal_100, 'kcal per 100 g'],
    ['Protein', dish.protein, 'g per 100 g'],
    ['Carbohydrates', dish.carbs, 'g per 100 g'],
    ['Fat', dish.fat, 'g per 100 g'],
  ]
    .filter(([, value]) => value != null)
    .map(([name, value, unitText]) => ({ '@type': 'PropertyValue', name, value, unitText })),
});

const buildPrerenderedPages = async () => {
  const { articles, recipes, exerciseGuides } = await loadContentData();
  // Prerendered routes get a real visible <h1> from the static body, so remove
  // the old sr-only fallback heading to avoid duplicate H1s on those pages.
  const shell = (await readFile(SHELL_PATH, 'utf8')).replace(/<h1 class="sr-only"[\s\S]*?<\/h1>\s*/i, '');
  const noscript = shell.match(/<noscript>[\s\S]*?<\/noscript>/i)?.[0] ?? '';

  const pages = [
    {
      route: '/',
      body: renderHome({ articles }),
      meta: {
        title: 'Health Fingerprint | Free Health Calculators & Personalized Care Plans',
        description:
          'Free health calculators, personalized meal plans, nutrition facts for 18,000+ dishes, and evidence-based guides on diabetes, heart health, fitness, and weight loss.',
        canonical: `${SITE_BASE}/`,
        type: 'website',
      },
    },
    {
      route: '/resources',
      body: renderResources({ articles, recipes, exerciseGuides }),
      meta: {
        title: 'Health Resources: Articles, Recipes & Exercise Guides | Health Fingerprint',
        description:
          'Evidence-based health articles, healthy recipes, and exercise guides covering diabetes, cholesterol, nutrition, sleep, fitness, and sustainable lifestyle habits.',
        canonical: `${SITE_BASE}/resources`,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Health Resources: Articles, Recipes & Exercise Guides',
          description:
            'Evidence-based health articles, healthy recipes, and exercise guides from Health Fingerprint.',
          url: `${SITE_BASE}/resources`,
          isPartOf: { '@type': 'WebSite', name: 'Health Fingerprint', url: `${SITE_BASE}/` },
        },
      },
    },
    ...articles.map((article) => ({
      route: `/resources/article/${article.slug}`,
      body: renderArticle({ article, articles }),
      meta: {
        title: `${article.title.en} | Health Fingerprint`,
        description: article.excerpt.en,
        canonical: `${SITE_BASE}/resources/article/${article.slug}`,
        type: 'article',
        jsonLd: articleJsonLd(article),
      },
    })),
    ...recipes.map((recipe) => ({
      route: `/resources/recipe/${recipe.slug}`,
      body: renderRecipe({ recipe, articles }),
      meta: {
        title: `${recipe.title.en} | Health Fingerprint`,
        description: recipe.description.en,
        canonical: `${SITE_BASE}/resources/recipe/${recipe.slug}`,
        type: 'article',
        jsonLd: recipeJsonLd(recipe),
      },
    })),
    ...exerciseGuides.map((guide) => ({
      route: `/resources/exercise/${guide.slug}`,
      body: renderExercise({ guide, exerciseGuides }),
      meta: {
        title: `${guide.title.en} | Health Fingerprint`,
        description: guide.description.en,
        canonical: `${SITE_BASE}/resources/exercise/${guide.slug}`,
        type: 'article',
        jsonLd: exerciseJsonLd(guide),
      },
    })),
  ];

  // These React routes also need route-specific metadata in the raw HTML,
  // before the client bundle runs and Helmet takes over.
  const metadataOnlyPages = [
    {
      route: '/food-library',
      title: 'Food Library | Browse 18,000+ Dishes | Health Fingerprint',
      description:
        'Explore detailed nutrition data, macros, and calories for over 18,980 local and international dishes. Search and filter our comprehensive food database.',
    },
    {
      route: '/fitness',
      title: 'Fitness & Health Calculator | Health Fingerprint',
      description: 'Calculate your BMI, BMR, TDEE, and VO2 Max instantly with evidence-based formulas.',
    },
    {
      route: '/weight-loss',
      title: 'Weight & Fitness Plan Builder | Health Fingerprint',
      description: 'Build a personalized weight loss and fitness plan tailored to your goals, activity, and favorite cuisines.',
    },
    {
      route: '/diabetes',
      title: 'Diabetes Management | Health Fingerprint',
      description: 'Review diabetes-related lab results and build practical meal and workout plans to support your health.',
    },
    {
      route: '/workout-plan',
      title: 'Workout Plan Builder | Health Fingerprint',
      description: 'Create a personalized weekly workout plan based on your goals, experience, available equipment, and schedule.',
    },
    {
      route: '/smartwatch-sync',
      title: 'Smartwatch Health Sync | Health Fingerprint',
      description: 'Connect health data from a compatible smartwatch to review activity, hydration, and wellness trends.',
    },
    {
      route: '/about',
      title: 'About Us | Health Fingerprint',
      description: "Learn about Health Fingerprint's mission to make evidence-based health guidance accessible to everyone.",
    },
    {
      route: '/login',
      title: 'Login | Health Fingerprint',
      description: 'Sign in to access your personalized health plan.',
    },
    {
      route: '/register',
      title: 'Sign Up | Health Fingerprint',
      description: 'Create a free account to start your health journey.',
    },
    {
      route: '/contact',
      title: 'Contact Us | Health Fingerprint',
      description: 'Get in touch with the Health Fingerprint team.',
    },
    {
      route: '/privacy',
      title: 'Privacy Policy | Health Fingerprint',
      description: 'Learn how Health Fingerprint protects your personal and health data.',
    },
    {
      route: '/terms',
      title: 'Terms of Service | Health Fingerprint',
      description: 'Review the terms and conditions for using Health Fingerprint.',
    },
    {
      route: '/cookies',
      title: 'Cookie Policy | Health Fingerprint',
      description: 'Learn how Health Fingerprint uses cookies and how you can manage them.',
    },
    {
      route: '/disclaimer',
      title: 'Medical Disclaimer | Health Fingerprint',
      description: 'Important information about the educational nature of Health Fingerprint content.',
    },
    ...(await readDishSeoData()).map((dish) => ({
      route: `/food-library/${dish.id}`,
      title: `${dish.name_en || `Dish ${dish.id}`} Nutrition Facts & Calories | Health Fingerprint`,
      description: `Nutrition facts per 100 g for ${dish.name_en || `dish ${dish.id}`}: ${dish.cal_100 ?? 'N/A'} kcal, ${dish.protein ?? 'N/A'} g protein, ${dish.carbs ?? 'N/A'} g carbohydrates, and ${dish.fat ?? 'N/A'} g fat.`,
      jsonLd: productJsonLd(dish),
    })),
  ].map(({ route, title, description, jsonLd }) => ({
    route,
    body: '',
    meta: {
      title,
      description,
      canonical: `${SITE_BASE}${route}`,
      type: 'website',
      jsonLd,
    },
  }));

  pages.push(...metadataOnlyPages);

  for (const page of pages) {
    const html = applyHead(applyBody(shell, page.body, noscript), page.meta);
    const outputPath =
      page.route === '/'
        ? SHELL_PATH
        : path.join(DIST_DIR, page.route.replace(/^\/+/, ''), 'index.html');

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
  }

  console.log(
    `SUCCESS: Prerendered ${pages.length} static pages ` +
      `(${1 + articles.length + recipes.length + exerciseGuides.length} resource routes, ` +
      `${metadataOnlyPages.length} metadata routes) in dist/.`,
  );
};

buildPrerenderedPages().catch((err) => {
  console.error('Failed to prerender static pages:', err);
  process.exit(1);
});
