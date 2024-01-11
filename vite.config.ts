import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// import svgr from "vite-plugin-svgr";
// svgr({include: "**/*.svg",})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
