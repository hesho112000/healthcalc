import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE = '/healthcalc/'

function copyIndexPlugin() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const src = resolve(__dirname, 'dist/index.html')
      const dest = resolve(__dirname, 'dist/404.html')
      copyFileSync(src, dest)
      console.log('Copied dist/index.html → dist/404.html')
    },
  }
}

function rewriteHtmlPaths() {
  return {
    name: 'rewrite-html-paths',
    transformIndexHtml(html: string) {
      return html
        .replace(/href="\.\/(favicon\.svg)"/g, `href="${BASE}$1"`)
        .replace(/href="\.\/(manifest\.json)"/g, `href="${BASE}$1"`)
        .replace(/href="\.\/(icons\/[^"]+)"/g, `href="${BASE}$1"`)
        .replace(/src="\.\/(sw\.js)"/g, `src="${BASE}$1"`)
        .replace(/register\('\.\/(sw\.js)'\)/g, `register('${BASE}$1')`)
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), rewriteHtmlPaths(), copyIndexPlugin()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
