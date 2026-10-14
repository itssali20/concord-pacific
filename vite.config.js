import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: isSsrBuild ? {} : {
      output: { manualChunks: { gsap: ['gsap'], react: ['react', 'react-dom', 'react-router-dom'] } }
    }
  }
}))
