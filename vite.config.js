import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? '/cast-project/' : '/',
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1500, // kB
  },
}))
