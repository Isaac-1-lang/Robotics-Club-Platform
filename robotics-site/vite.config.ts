import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite dev server automatically handles SPA routing
  // For production, use the _redirects (Netlify) or vercel.json (Vercel) files
})
