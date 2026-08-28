import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server : {
    proxy : {
      "/api" : {
        target: "https://sameer-medical-agency.onrender.com",
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [react()],
})
