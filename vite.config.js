import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/magma/', // Якщо для гітхабу, то тут повинна бути назва репозиторію!
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})
