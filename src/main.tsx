import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import { initAnalytics } from './lib/analytics';
import './styles/global.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Analytics solo en el navegador: durante el prerender no hay window.
    if (isClient) initAnalytics();
  }
);
