import Nav from '../components/Nav';
import Ficha from '../components/Ficha';
import Hero from '../components/Hero';
import Disciplinas from '../components/Disciplinas';
import Nosotros from '../components/Nosotros';
import Proyectos from '../components/Proyectos';
import Marcas from '../components/Marcas';
import Clientes from '../components/Clientes';
import Contacto from '../components/Contacto';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';

export default function Home() {
  return (
    <>
      <Seo
        title="OMNIIOUS — Arquitectura, Ingeniería e Instalaciones"
        description="Iluminación arquitectónica, ingeniería eléctrica e instalaciones especiales bajo un solo equipo. Diseñamos, instalamos, construimos. Ciudad de México."
        path="/"
      />
      <Nav />
      <Ficha />
      <Hero />
      <Disciplinas />
      <Nosotros />
      <Proyectos />
      <Marcas />
      <Clientes />
      <Contacto />
      <WhatsAppButton />
    </>
  );
}
