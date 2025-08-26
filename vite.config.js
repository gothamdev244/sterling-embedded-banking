import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Serve under /embedded-apps/ base URL so all assets have correct path
  base: '/embedded-apps/',
  plugins: [react()],
  server: {
    port: 5175,
    host: '0.0.0.0',
    headers: {
      // Allow iframe embedding from main app
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "frame-ancestors 'self' http://localhost:5173 http://localhost:5174 http://localhost:5175 http://localhost:5176 http://localhost:9000"
    },
    proxy: {
      // Search API -> Spring Search (dev)
      '/api/search': {
        target: 'http://127.0.0.1:8091',
        changeOrigin: true,
        secure: false,
      },
      // AI API -> FastAPI (dev)
      '/api/ai': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/ai/, '/api'),
      },
      // WebSocket Gateway -> Spring WS (dev)
      '/ws': {
        target: 'ws://127.0.0.1:8080',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
