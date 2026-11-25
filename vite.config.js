import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function prerenderPreviewRoutes() {
  return {
    name: 'prerender-preview-routes',
    configurePreviewServer(server) {
      const distDir = path.resolve(server.config.root, 'dist');
      server.middlewares.use((req, _res, next) => {
        const rawUrl = (req.url || '/').split('?')[0];
        if (rawUrl !== '/' && !rawUrl.endsWith('/') && !path.extname(rawUrl)) {
          const clean = rawUrl.replace(/^\/+/, '');
          const nestedIndex = path.join(distDir, clean, 'index.html');
          if (fs.existsSync(nestedIndex)) {
            req.url = `${rawUrl}/index.html`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderPreviewRoutes()],
  build: {
    target: 'es2020',
  },
});
