import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proyectos/:slug" element={<ProjectDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
    </Routes>
  );
}
