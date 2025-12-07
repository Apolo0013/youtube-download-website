import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Mostra erro no terminal quando o Sass quebrar
        quietDeps: false,
      }
    }
  }
})
