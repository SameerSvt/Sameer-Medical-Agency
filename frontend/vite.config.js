import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api" : {
        // target: "http://localhost:4000"
        target: "http://10.28.118.254:4000",
      }
    }
  },
  plugins: [react()],
})
