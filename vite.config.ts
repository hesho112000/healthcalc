import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/healthcalc/',
  plugins: [
    react()
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