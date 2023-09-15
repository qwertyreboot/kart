import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

console.log(process?.env?.SERVER_URL);

export default defineConfig({
  envDir: ".",
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "sw.js",
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: process?.env?.SERVER_URL ?? "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
