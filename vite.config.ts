import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const ALLOWED_FRAME_ANCESTORS = "'self' http://localhost:5173 https://your-os-shell.com";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 5174,
    headers:{
      'Content-Security-Policy': `frame-ancestors ${ALLOWED_FRAME_ANCESTORS};`,
    }
  },
  resolve:{
    alias:{
      '@configs':path.resolve(import.meta.dirname,'./src/configs'),
      '@components':path.resolve(import.meta.dirname,'./src/components'),
      '@assets':path.resolve(import.meta.dirname,'./src/assets')
    }
  }
})
