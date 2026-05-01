import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'electrica',
  eyebrow: 'Disciplina II — Ingeniería eléctrica',
  title: <>Ingeniería eléctrica<br />de <em>precisión</em>.</>,
  lead: 'Una buena instalación eléctrica no se celebra. Una mala se sufre durante años.',
  scopeFilter: 'electrica',
  whatsappMessage: 'Hola Omniious, soy [arquitecto / constructor / desarrollador]. Mi proyecto es [residencial / oficinas / corporativo / comercial] de aprox ___ m² en [ciudad]. Me interesa cotizar [diseño / ejecución / ambos] de ingeniería eléctrica.',
  seo: {
    title: 'Ingeniería Eléctrica CDMX — Diseño y Ejecución | OMNIIOUS',
    description: 'Diseño de instalaciones eléctricas residenciales, comerciales y corporativas en Ciudad de México. Iluminación, contactos, HVAC, subestación, fotovoltaico y emergencia.'
  },
  designServices: [
    { name: 'Plano base y cálculos', desc: 'Recopilación de planos arquitectónicos, levantamiento de cargas, plano referencia y tabla de cálculos eléctricos.' },
    { name: 'Iluminación', desc: 'Circuitos coordinados con el sembrado, control por escenas, dimming compatible con plataformas como Lutron.' },
    { name: 'Contactos y fuerza', desc: 'Distribución general, regulados, USB, ITM dedicados, cargas especiales y respaldo UPS.' },
    { name: 'HVAC', desc: 'Cargas eléctricas para sistemas de aire acondicionado, ventilación y calefacción. Coordinación con el equipo HVAC.' },
    { name: 'Subestación MT/BT', desc: 'Diseño de subestación en media y baja tensión: tablero general, transformador, protecciones, aterrizaje.' },
    { name: 'Sistema fotovoltaico', desc: 'Diseño de sistemas solares interconectados a CFE. Cálculo de generación, inversores, protecciones.' },
    { name: 'Sistema de emergencia', desc: 'Plantas de emergencia, transferencia automática, UPS, iluminación de emergencia, rutas de evacuación.' },
    { name: 'Memoria técnica', desc: 'Memoria de cálculo lista para revisión por verificador y trámite ante CFE / autoridades.' },
    { name: 'Trámite UVIE', desc: 'Acompañamiento en la verificación con UVIE cuando el proyecto lo requiere.' }
  ],
  implementationServices: [
    { name: 'Coordinación con obra', desc: 'Revisión de planos eléctricos contra obra civil — tirado de tubería, registros, charolas — antes de cada colado.' },
    { name: 'Suministro de tableros y transformadores', desc: 'Compra y entrega de tableros, transformadores, ITMs, cables, charolas. Coordinación de tiempos largos cuando aplica.' },
    { name: 'Instalación', desc: 'Equipo propio especializado en instalaciones residenciales, comerciales y corporativas.' },
    { name: 'Pruebas de operación', desc: 'Megger, balanceo de fases, pruebas de continuidad, secuencia de fases.' },
    { name: 'Puesta en marcha', desc: 'Energización coordinada, pruebas con cargas reales, ajustes finos.' },
    { name: 'Entrega documentada', desc: 'Planos as-built, memoria final, certificados de pruebas. Lo que el cliente y el verificador necesitan.' }
  ],
  typologies: [
    'Residencial alto',
    'Oficinas',
    'Corporativos',
    'Centros comerciales',
    'Hotelería'
  ],
  brandsBlurb: 'Trabajamos con Schneider, Siemens, ABB, Eaton y Square D según lo que cada proyecto requiera — sin atarnos a una sola marca.'
};

export default function Electrica() {
  return <DisciplineLanding config={config} />;
}
