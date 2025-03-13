import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: '0.0.0.0', // Permite que Render lo detecte
  },
  preview: {
    port: parseInt(process.env.PORT) || 3000,
    host: '0.0.0.0',
    allowedHosts: ['module13challengecandidatesearchapp.onrender.com'], // Agrega tu dominio aquí
  }
});
