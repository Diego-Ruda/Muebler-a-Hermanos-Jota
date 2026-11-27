import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(workspaceRoot, '../node_modules/react'),
      'react-dom': path.resolve(workspaceRoot, '../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(
        workspaceRoot,
        '../node_modules/react/jsx-runtime.js'
      ),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/registro': 'http://localhost:3000',
    },
  },
});
