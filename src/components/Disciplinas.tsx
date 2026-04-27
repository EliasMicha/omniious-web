import { Link } from 'react-router-dom';

interface Discipline {
  num: string;
  slug: string;
  name: string;
  nameAccent?: string;
  tagline: string;
  highlights: string[];
  meta: string;
}

export const DISCIPLINES: Discipline[] = [
  {
    num: 'I — Disciplina',
    slug: '/iluminacion',
    name: 'Iluminación',
    nameAccent: 'arquitectónica',
    tagline: 'Diseñamos la luz que define cada espacio. Conceptual, técnica, decorativa y custom.',
    highlights: ['Diseño', 'Cálculos DiaLux', 'Decorativa', 'Luminarias custom', 'Importación'],
    meta: '01 / 03'
  },
  {
    num: 'II — Disciplina',
    slug: '/electrica',
    name: 'Ingeniería',
    nameAccent: 'eléctrica',
    tagline: 'Instalaciones eléctricas calculadas con precisión. Desde el plano base hasta la puesta en marcha.',
    highlights: ['Iluminación', 'Contactos', 'HVAC', 'Subestaciones MT/BT', 'Fotovoltaico', 'Emergencia'],
    meta: '02 / 03'
  },
  {
    num: 'III — Disciplina',
    slug: '/instalaciones-especiales',
    name: 'Instalaciones',
    nameAccent: 'especiales',
    tagline: 'Audio, redes, seguridad y automatización integrados con la arquitectura. Sin parches.',
    highlights: ['Audio · AV', 'Redes', 'CCTV', 'Control de Acceso', 'BMS', 'Detección de Humo', 'Telefonía'],
    meta: '03 / 03'
  }
];

export default function Disciplinas() {
  return (
    <section id="disciplinas">
      <div className="section-header">
        <div className="section-num">I — Disciplinas</div>
        <h2 className="section-title">Tres disciplinas,<br />un <em>solo</em> equipo.</h2>
      </div>

      <div className="disc-grid">
        {DISCIPLINES.map(d => (
          <Link to={d.slug} className="disc-card" key={d.slug}>
            <div>
              <div className="disc-num">{d.num}</div>
              <div className="disc-name">
                {d.name}
                {d.nameAccent && <> <em>{d.nameAccent}</em></>}
              </div>
              <p className="disc-tagline">{d.tagline}</p>
              <div className="disc-list">
                {d.highlights.join(' · ')}
              </div>
            </div>
            <div className="disc-meta">
              <span>{d.meta}</span>
              <span className="disc-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
