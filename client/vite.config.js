import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external access
    allowedHosts: [
      '13d7-49-36-43-226.ngrok-free.app', // Your ngrok URL
      'localhost', // Keep localhost allowed
    ],
  },
});