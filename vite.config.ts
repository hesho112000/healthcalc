import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, copyFileSync } from 'fs'
import { resolve } from 'path'

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

export default defineConfig({
  base: '/healthcalc/',
  plugins: [react(), copyIndexPlugin()],
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
