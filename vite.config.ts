import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { STATIC_ROUTES } from './src/lib/static-routes';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  ssgOptions: {
    // Wait for the inline SSG manifest hash before hydrating the page.
    script: 'defer',
    formatting: 'none',
    dirStyle: 'nested',
    // Solo se prerenderizan las rutas públicas estáticas.
    // /admin y /proyectos/:slug siguen funcionando como SPA.
    includedRoutes: () => [...STATIC_ROUTES, '/404']
  }
});
