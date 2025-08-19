import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
const isProduction = process.env.NODE_ENV === "production";
const cacheDir = ".vite_cache";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  cacheDir,
  build: {
    target: "esnext",
    minify: isProduction ? "esbuild" : false,
    sourcemap: !isProduction,
    chunkSizeWarningLimit: 1000, // Adjusted chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        minifyInternalExports: true,
      },
    },
  },
  server: {
    hmr: true,
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
// https://vitejs.dev/config/
