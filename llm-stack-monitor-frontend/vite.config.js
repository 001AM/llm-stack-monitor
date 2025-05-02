import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  
  plugins: [react(), tailwindcss({
    config: "./tailwind.config.js", // Explicitly point to your config
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      'src': path.resolve(__dirname, 'src'),
    },
  },
  
});


