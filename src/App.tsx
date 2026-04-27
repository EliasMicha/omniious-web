import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Iluminacion from './pages/Iluminacion';
import Electrica from './pages/Electrica';
import InstalacionesEspeciales from './pages/InstalacionesEspeciales';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/iluminacion" element={<Iluminacion />} />
      <Route path="/electrica" element={<Electrica />} />
      <Route path="/instalaciones-especiales" element={<InstalacionesEspeciales />} />
      <Route path="/proyectos/:slug" element={<ProjectDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
    </Routes>
  );
}
