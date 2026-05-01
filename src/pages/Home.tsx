import Nav from '../components/Nav';
import Ficha from '../components/Ficha';
import Hero from '../components/Hero';
import Disciplinas from '../components/Disciplinas';
import LutronBand from '../components/LutronBand';
import Nosotros from '../components/Nosotros';
import Proyectos from '../components/Proyectos';
import Clientes from '../components/Clientes';
import Contacto from '../components/Contacto';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { organizationLd } from '../lib/seo';

export default function Home() {
  return (
    <>
      <Seo
        title="OMNIIOUS — Arquitectura, Ingeniería e Instalaciones"
        description="Iluminación arquitectónica, ingeniería eléctrica e instalaciones especiales bajo un solo equipo. Llave en mano para arquitectos y constructores en Ciudad de México."
        path="/"
        jsonLd={organizationLd()}
      />
      <Nav />
      <Ficha />
      <Hero />
      <Disciplinas />
      <LutronBand />
      <Nosotros />
      <Proyectos />
      <Clientes />
      <Contacto />
      <WhatsAppButton />
    </>
  );
}
