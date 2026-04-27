import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'instalaciones-especiales',
  eyebrow: 'Disciplina III — Instalaciones especiales',
  title: <>Cuando el espacio<br /><em>responde</em>.</>,
  lead: 'La mejor tecnología es la que desaparece en el espacio.',
  scopeFilter: 'especiales',
  whatsappMessage: 'Hola Omniious, me interesa cotizar instalaciones especiales.',
  seo: {
    title: 'Instalaciones Especiales CDMX — AV, Redes, CCTV, BMS | OMNIIOUS',
    description: 'Instalaciones especiales para arquitectura: audio, redes, CCTV, control de acceso, control de iluminación Lutron, BMS, detección de humo, telefonía, cortinas motorizadas.'
  },
  designServices: [
    { name: 'Análisis de requerimientos', desc: 'Levantamiento de necesidades por sistema, conversación con cliente y arquitecto antes de definir equipos.' },
    { name: 'Sembrado por sistema', desc: 'Plano de cada sistema coordinado con la arquitectura — bocinas, cámaras, lectoras, sensores.' },
    { name: 'Cuarto de comunicaciones', desc: 'Diseño del cuarto técnico — racks, alimentación, climatización, distribución.' },
    { name: 'Diagramas unifilares', desc: 'Topología de cada sistema, equipos, distancias, especificaciones por punto.' },
    { name: 'Cálculo de canalización', desc: 'Tubería, charolas, registros, cajas. Compatibilidad con la instalación eléctrica.' },
    { name: 'Memoria técnica', desc: 'Especificación final de equipos por sistema, documentación para cotización y obra.' }
  ],
  implementationServices: [
    { name: 'Cableado estructurado', desc: 'Tendido de cable de datos, audio, video, control. Categorías y blindajes correctos por aplicación.' },
    { name: 'Instalación de equipos', desc: 'Montaje, conexión y configuración de bocinas, cámaras, lectoras, controladores, sensores y todos los sistemas.' },
    { name: 'Programación in-house', desc: 'Programadores propios — no freelance — para Lutron, BMS Niagara, Honeywell, sistemas de audio y control.' },
    { name: 'Integración entre sistemas', desc: 'Que audio, iluminación, cortinas y seguridad funcionen como uno. No nueve apps distintas.' },
    { name: 'Pruebas de operación', desc: 'Validación funcional sistema por sistema y en conjunto antes de entregar.' },
    { name: 'Capacitación', desc: 'Entrega documentada y entrenamiento al usuario final.' }
  ],
  systems: [
    {
      anchor: 'audio',
      name: 'Audio · AV',
      brands: 'Sonos · McIntosh · Nexo',
      desc: 'Soluciones residenciales, comerciales y de hospitalidad. De Sonos en una recámara a McIntosh en el living, o Nexo para un bar o un antro.'
    },
    {
      anchor: 'redes',
      name: 'Redes y WiFi',
      brands: 'Ubiquiti · Aruba · Allied Telesis',
      desc: 'Red estructurada con WiFi de cobertura completa, switches administrables, segmentación por VLAN y monitoreo remoto.'
    },
    {
      anchor: 'cctv',
      name: 'CCTV',
      brands: 'Hikvision · Ubiquiti',
      desc: 'Diseño de videovigilancia IP. Posicionamiento por análisis de cobertura, NVR, almacenamiento, monitoreo remoto y respaldo.'
    },
    {
      anchor: 'acceso',
      name: 'Control de Acceso',
      brands: 'Hikvision · Ubiquiti',
      desc: 'Lectoras biométricas, tarjeta, código y app móvil. Integración con CCTV y registro de visitantes.'
    },
    {
      anchor: 'lutron',
      name: 'Control de iluminación',
      brands: 'Lutron — HomeWorks · RA2 · Caséta · Vive · Athena',
      desc: 'Somos uno de los integradores Lutron más grandes de México. Diseñamos, instalamos y programamos todas las líneas, con programadores propios.',
      highlight: { label: 'Ver línea Lutron completa', href: '/lutron' }
    },
    {
      anchor: 'bms',
      name: 'BMS · Building Management',
      brands: 'Honeywell · Niagara4',
      desc: 'Integración centralizada de HVAC, iluminación, energía, accesos. Visualización y control único para edificios completos.'
    },
    {
      anchor: 'humo',
      name: 'Detección de Humo',
      brands: 'Honeywell Firelite · Notifier',
      desc: 'Sistemas direccionales y convencionales. Cumplimiento NFPA 72, NOM-002-STPS, integración con BMS y rutas de evacuación.'
    },
    {
      anchor: 'telefonia',
      name: 'Telefonía IP',
      brands: 'Grandstream',
      desc: 'IP-PBX, telefonía SIP, repetidores celulares cuando hay zonas con baja cobertura.'
    },
    {
      anchor: 'cortinas',
      name: 'Cortinas motorizadas',
      brands: 'Lutron · Somfy · Vertilux (telas)',
      desc: 'Motorización de cortinas y persianas, integradas con escenas de iluminación. Telas curadas para cada espacio.'
    }
  ]
};

export default function InstalacionesEspeciales() {
  return <DisciplineLanding config={config} />;
}
