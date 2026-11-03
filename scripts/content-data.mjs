import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

let cachedContent = null;

/**
 * Bundle the TypeScript content modules once so build scripts can read the same
 * article/recipe/exercise data the React app renders.
 */
export async function loadContentData() {
  if (cachedContent) return cachedContent;

  const result = await build({
    stdin: {
      contents: `
        export { ARTICLES } from './src/data/articles.ts';
        export { RECIPES } from './src/data/recipes.ts';
        export { EXERCISE_GUIDES } from './src/data/exerciseGuides.ts';
      `,
      resolveDir: ROOT,
      sourcefile: 'content-data-entry.ts',
      loader: 'ts',
    },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    logLevel: 'silent',
  });

  const code = result.outputFiles?.[0]?.text;
  if (!code) throw new Error('Could not bundle content data for sitemap/prerender.');

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code, 'utf8').toString('base64')}`;
  const mod = await import(moduleUrl);

  cachedContent = {
    articles: mod.ARTICLES ?? [],
    recipes: mod.RECIPES ?? [],
    exerciseGuides: mod.EXERCISE_GUIDES ?? [],
  };

  return cachedContent;
}
