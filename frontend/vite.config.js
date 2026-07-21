import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Allow overriding the backend port at dev time via BACKEND_PORT or PORT
const backendPort = process.env.BACKEND_PORT || process.env.PORT || 4000;
const backendTarget = `http://localhost:${backendPort}`;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
});
