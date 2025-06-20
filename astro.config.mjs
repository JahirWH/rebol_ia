// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config

export default defineConfig({
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',  // Puerto corregido de tu backend
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
});