/**
 * Rutas públicas estáticas que se prerenderizan en el build.
 * Este archivo NO importa nada a propósito: lo lee vite.config.ts,
 * y cualquier import arrastraría el árbol de componentes a la carga de la config.
 * Fuente única de verdad para el prerender Y para el sitemap.
 */
export const STATIC_ROUTES = [
  '/',
  '/llave-en-mano',
  '/iluminacion',
  '/electrica',
  '/instalaciones-especiales',
  '/lutron'
];
