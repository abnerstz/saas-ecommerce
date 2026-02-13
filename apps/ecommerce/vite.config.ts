import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ecommerce/types': path.resolve(__dirname, '../../packages/types/src'),
      '@ecommerce/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@ecommerce/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@ecommerce/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
