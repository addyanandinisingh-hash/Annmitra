import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: false,
        babelrc: false,
        targets: 'defaults'
      }
    })
  ],
  css: {
    postcss: {}
  },
  server: {
    port: 5173,
    open: false,
    // Proxy API requests to the backend during development.
    // When you fetch('/api/auth/login'), Vite forwards it to http://localhost:5050/api/auth/login
    // This avoids CORS issues during development and mimics production deployment.
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
