import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Above-the-fold CSS inlined into <head> so first paint is styled before the
// full stylesheet arrives. Built assets are served with a long cache lifetime,
// so it is safe to ship this file outside the bundle.
const CRITICAL_CSS = readFileSync(new URL('./critical.css', import.meta.url), 'utf8')
const DIST_INDEX = fileURLToPath(new URL('./dist/index.html', import.meta.url))

const asyncStylesheet = (href: string, crossorigin: boolean) => {
  const cross = crossorigin ? ' crossorigin' : ''
  return (
    `<link rel="preload" as="style"${cross} href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet"${cross} href="${href}"></noscript>`
  )
}

/**
 * Rewrites every render-blocking local stylesheet link into a preload that
 * swaps itself to rel="stylesheet" once downloaded, keeping a <noscript>
 * fallback. Remote stylesheets (Google Fonts) are already handled in index.html.
 */
const relaxStylesheets = (html: string) => {
  const noscriptBlocks: string[] = []
  const guarded = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, (block) => {
    noscriptBlocks.push(block)
    return `<!--critical-css-noscript:${noscriptBlocks.length - 1}-->`
  })

  const rewritten = guarded.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/(?:^|\s)rel=["']stylesheet["']/i.test(tag)) return tag
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1]
    if (!href || /^https?:\/\//i.test(href)) return tag
    return asyncStylesheet(href, /\bcrossorigin\b/i.test(tag))
  })

  return rewritten.replace(
    /<!--critical-css-noscript:(\d+)-->/g,
    (_, index: string) => noscriptBlocks[Number(index)]
  )
}

const injectCriticalCss = (html: string) => {
  if (html.includes('data-critical-css')) return html
  return html.replace(
    /<\/head>/i,
    `  <style data-critical-css>${CRITICAL_CSS}</style>\n  </head>`
  )
}

function criticalCssPlugin(): Plugin {
  return {
    name: 'critical-css-and-async-styles',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => injectCriticalCss(html),
    },
    // Vite appends the bundled stylesheet link after transformIndexHtml, so the
    // rewrite happens on the emitted file while the prerender script reads it.
    closeBundle() {
      if (this.meta?.watchMode) return
      try {
        const html = readFileSync(DIST_INDEX, 'utf8')
        const next = injectCriticalCss(relaxStylesheets(html))
        if (next !== html) writeFileSync(DIST_INDEX, next)
      } catch {
        // No HTML emitted (e.g. library-only builds); nothing to do.
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    criticalCssPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['lucide-react'],

          // Feature chunks (auto-split by Vite)
          // Each page will become its own chunk automatically
        },
      },
    },
    chunkSizeWarningLimit: 600, // KB
    sourcemap: false,
    minify: 'esbuild',
  },
})
