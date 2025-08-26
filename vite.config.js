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
      // Allow iframe embedding from agent frontend and other allowed origins
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': `frame-ancestors 'self' ${
        process.env.VITE_ALLOWED_ORIGINS || 
        'http://localhost:5173 http://localhost:5174 http://localhost:5175 http://localhost:5176 http://localhost:9000 http://localhost:3000 http://localhost:3001'
      }`
    },
    cors: {
      origin: (process.env.VITE_ALLOWED_ORIGINS || 
        'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:9000,http://localhost:3000,http://localhost:3001')
        .split(',').map(url => url.trim()),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
