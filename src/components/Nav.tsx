import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Nav() {
  useEffect(() => {
    const nav = document.querySelector('nav.site-nav') as HTMLElement | null;
    if (!nav) return;
    const onScroll = () => {
      nav.style.backdropFilter = window.scrollY > 50 ? 'blur(10px)' : 'none';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="site-nav">
      <Link to="/" className="logo">
        <Logo />
        OMNIIOUS
      </Link>
      <ul>
        <li><a href="/#nosotros">Nosotros</a></li>
        <li><a href="/#soluciones">Soluciones</a></li>
        <li><a href="/#proyectos">Proyectos</a></li>
        <li><a href="/#marcas">Marcas</a></li>
        <li><a href="/#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}
