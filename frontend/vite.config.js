import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev proxy target for /api. Point BACKEND_URL at a deployed API to run the
// frontend without a local backend, or override just the port via BACKEND_PORT.
const backendPort = process.env.BACKEND_PORT || 4000;
const backendTarget = process.env.BACKEND_URL || `http://localhost:${backendPort}`;

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
