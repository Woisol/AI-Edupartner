import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { } from './src/constants/url.tsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/p-server/api': {
        target: `http://127.0.0.1/p-server/api`,
        changeOrigin: true,
        // !这个必须有不然404
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  plugins: [react()],
})
