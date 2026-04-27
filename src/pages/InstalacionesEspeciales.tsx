import DisciplineLanding, { type DisciplineConfig } from '../components/DisciplineLanding';

const config: DisciplineConfig = {
  slug: 'instalaciones-especiales',
  eyebrow: 'Disciplina III — Instalaciones especiales',
  title: <>Sistemas que el espacio<br /><em>necesita</em>, integrados.</>,
  lead: 'Audio, redes, seguridad, control y automatización — coordinados con la arquitectura desde el primer plano. Diseñamos, suministramos e instalamos los nueve sistemas que un proyecto serio requiere.',
  scopeFilter: 'especiales',
  whatsappMessage: 'Hola Omniious, me interesa cotizar instalaciones especiales (AV, redes, CCTV, etc.).',
  seo: {
    title: 'Instalaciones Especiales CDMX — AV, Redes, CCTV, BMS | OMNIIOUS',
    description: 'Instalaciones especiales para arquitectura: audio, redes, CCTV, control de acceso, BMS, detección de humo, telefonía. Diseño + suministro + ejecución en Ciudad de México.'
  },
  services: [
    { name: 'Audio · AV', desc: 'Distribución de audio multizona, home theater, salas de juntas, audio comercial. Sonos, JBL, Crestron y Lutron.' },
    { name: 'Redes y WiFi', desc: 'Diseño de red estructurada, WiFi de cobertura completa, cuarto de comunicaciones. Ubiquiti, Cisco, Cambium.' },
    { name: 'CCTV', desc: 'Diseño de sistemas de videovigilancia IP. Posicionamiento por análisis de cobertura, NVR, almacenamiento y monitoreo remoto.' },
    { name: 'Control de Acceso', desc: 'Lectoras biométricas, tarjeta, código y app móvil. Integración con CCTV y registro de visitantes.' },
    { name: 'Control de Iluminación', desc: 'Programación de escenas con Lutron RA2, HomeWorks o sistemas similares. Control desde keypads, app y voz.' },
    { name: 'BMS · Building Management', desc: 'Integración de sistemas: HVAC, iluminación, energía, accesos. Visualización y control centralizado.' },
    { name: 'Detección de Humo', desc: 'Sistemas direccionales y convencionales. Cumplimiento con NFPA 72 y NOM-002-STPS, integración con BMS.' },
    { name: 'Telefonía y Red Celular', desc: 'IP-PBX, telefonía SIP, repetidores celulares para garantizar señal en zonas con baja cobertura.' },
    { name: 'Cortinas motorizadas', desc: 'Motorización Somfy y Lutron, integración con escenas de iluminación, control desde keypads y app.' }
  ]
};

export default function InstalacionesEspeciales() {
  return <DisciplineLanding config={config} />;
}
