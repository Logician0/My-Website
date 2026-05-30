import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    // ✅ 1. CSS Code Splitting: Reduces initial CSS payload
    cssCodeSplit: true,
    // ✅ 2. Clean up assets to prevent ghost files in production
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // ✅ 3. Improved Chunking: Keeps the main bundle tiny
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
        },
        // ✅ 4. Entry/Chunk Naming: Better for browser caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});