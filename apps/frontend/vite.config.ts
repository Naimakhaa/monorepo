import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { 
      "@": path.resolve(__dirname, "./src") 
    },
  },
  server: {
    port: 5173,
    // Ubah ke TRUE jika kamu ingin MEMAKSA hanya pakai 5173.
    // Jika tetap FALSE dan 5173 terpakai, dia akan pindah ke 5174.
    strictPort: true, 
    proxy: { 
      "/api": { 
        target: "http://localhost:3000", 
        changeOrigin: true,
        // Backend kamu punya rute /users, bukan /api/users. 
        // Jadi kita harus menghapus teks "/api" saat dikirim ke backend.
        rewrite: (path) => path.replace(/^\/api/, '') 
      } 
    },
  },
});