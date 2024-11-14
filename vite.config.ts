import { defineConfig } from 'vite';
import { buildXDC, eruda, mockWebxdc } from '@simon-laux/webxdc-vite-plugins';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), buildXDC(), eruda(), mockWebxdc()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
