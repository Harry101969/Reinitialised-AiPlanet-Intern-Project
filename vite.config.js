import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3004', // Replace with your actual backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
