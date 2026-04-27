import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'electrica',
  eyebrow: 'Disciplina II — Ingeniería eléctrica',
  title: <>Ingeniería eléctrica<br />de <em>precisión</em>.</>,
  lead: 'Diseñamos las instalaciones eléctricas que sostienen cada espacio. Del plano base y la tabla de cálculos al arranque final, con responsabilidad técnica de principio a fin.',
  scopeFilter: 'electrica',
  whatsappMessage: 'Hola Omniious, me interesa cotizar un proyecto de ingeniería eléctrica.',
  seo: {
    title: 'Ingeniería Eléctrica CDMX — Diseño y Ejecución | OMNIIOUS',
    description: 'Diseño de instalaciones eléctricas residenciales, comerciales e industriales en Ciudad de México. Iluminación, contactos, HVAC, subestación MT/BT, fotovoltaico y emergencia.'
  },
  services: [
    { name: 'Plano base y cálculos', desc: 'Recopilación de planos arquitectónicos, levantamiento de cargas, tabla de cálculos eléctricos y plano referencia.' },
    { name: 'Iluminación', desc: 'Circuitos de iluminación coordinados con el sembrado, control por escenas, dimming compatible con Lutron y similares.' },
    { name: 'Contactos y fuerza', desc: 'Distribución de contactos generales, regulados, USB e ITM dedicados. Cargas especiales y respaldo UPS.' },
    { name: 'HVAC', desc: 'Cargas eléctricas para sistemas de aire acondicionado, ventilación y calefacción. Coordinación con HVAC.' },
    { name: 'Subestación MT/BT', desc: 'Diseño de subestación en media y baja tensión. Tablero general, transformador, protecciones, aterrizaje.' },
    { name: 'Sistema fotovoltaico', desc: 'Diseño de sistemas solares interconectados a CFE. Cálculo de generación, inversores, protecciones y trámite.' },
    { name: 'Sistema de emergencia', desc: 'Plantas de emergencia, transferencia automática, UPS, iluminación de emergencia y rutas de evacuación.' },
    { name: 'Memoria técnica', desc: 'Memoria de cálculo lista para revisión por verificador y trámite ante CFE / autoridades correspondientes.' }
  ]
};

export default function Electrica() {
  return <DisciplineLanding config={config} />;
}
