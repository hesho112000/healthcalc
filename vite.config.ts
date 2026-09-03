import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/healthcalc/',
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      writeBundle() {
        const indexPath = resolve(__dirname, 'dist/index.html')
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, resolve(__dirname, 'dist/404.html'))
        }
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  }
})
