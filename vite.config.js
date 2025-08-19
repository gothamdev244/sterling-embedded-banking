import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    headers: {
      // Allow iframe embedding from main app
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "frame-ancestors 'self' http://localhost:5173 http://localhost:5174 http://localhost:5175 http://localhost:5176"
    }
  }
})
