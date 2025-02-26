import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // port: 4000,
    // strictPort: true,
    // host: true,
    // origin: "http://0.0.0.0:4000",
    proxy: {
      "/stream": {
        target: "http://localhost:5500/api/v1",
        changeOrigin: true,
        secure: false,
      },
      "/live": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/stat": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/hls": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
