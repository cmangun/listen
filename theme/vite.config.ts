import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@page': path.resolve(__dirname, 'src/view/pages'),
      '@layout': path.resolve(__dirname, 'src/view/layouts'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@component': path.resolve(__dirname, 'src/core/components'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
})
