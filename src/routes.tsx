import type { RouteRecord } from 'vite-react-ssg';
import Home from './pages/Home';
import LlaveEnMano from './pages/LlaveEnMano';
import Iluminacion from './pages/Iluminacion';
import Electrica from './pages/Electrica';
import InstalacionesEspeciales from './pages/InstalacionesEspeciales';
import Lutron from './pages/Lutron';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

/**
 * Rutas en formato de objeto (data router), requerido por vite-react-ssg.
 * Las rutas que NO se prerenderizan (admin y detalle de proyecto)
 * se excluyen en vite.config.ts vía ssgOptions.includedRoutes.
 */
export const routes: RouteRecord[] = [
  { path: '/', element: <Home />, entry: 'src/pages/Home.tsx' },
  { path: '/llave-en-mano', element: <LlaveEnMano />, entry: 'src/pages/LlaveEnMano.tsx' },
  { path: '/iluminacion', element: <Iluminacion />, entry: 'src/pages/Iluminacion.tsx' },
  { path: '/electrica', element: <Electrica />, entry: 'src/pages/Electrica.tsx' },
  { path: '/instalaciones-especiales', element: <InstalacionesEspeciales />, entry: 'src/pages/InstalacionesEspeciales.tsx' },
  { path: '/lutron', element: <Lutron />, entry: 'src/pages/Lutron.tsx' },
  { path: '/proyectos/:slug', element: <ProjectDetail />, entry: 'src/pages/ProjectDetail.tsx' },
  { path: '/admin', element: <AdminLogin />, entry: 'src/pages/AdminLogin.tsx' },
  { path: '/admin/panel', element: <AdminPanel />, entry: 'src/pages/AdminPanel.tsx' },
  { path: '*', element: <NotFound />, entry: 'src/pages/NotFound.tsx' }
];

export { STATIC_ROUTES } from './lib/static-routes';
