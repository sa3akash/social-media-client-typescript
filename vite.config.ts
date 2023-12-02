import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch:{
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
})
