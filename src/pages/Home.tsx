import Nav from '../components/Nav';
import Ficha from '../components/Ficha';
import Hero from '../components/Hero';
import Nosotros from '../components/Nosotros';
import Soluciones from '../components/Soluciones';
import Proyectos from '../components/Proyectos';
import Marcas from '../components/Marcas';
import Clientes from '../components/Clientes';
import Contacto from '../components/Contacto';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Nav />
      <Ficha />
      <Hero />
      <Nosotros />
      <Soluciones />
      <Proyectos />
      <Marcas />
      <Clientes />
      <Contacto />
      <WhatsAppButton />
    </>
  );
}
