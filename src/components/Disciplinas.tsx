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
    tagline: 'Diseño, decorativa, importación e instalación. Especificamos lo que cada proyecto necesita.',
    highlights: ['Diseño', 'DiaLux', 'Decorativa', 'Suministro', 'Instalación'],
    meta: '01 / 03'
  },
  {
    num: 'II — Disciplina',
    slug: '/electrica',
    name: 'Ingeniería',
    nameAccent: 'eléctrica',
    tagline: 'Diseño y ejecución de instalaciones eléctricas. De los planos al arranque, mismo equipo.',
    highlights: ['Iluminación', 'Contactos', 'HVAC', 'Subestación', 'Fotovoltaico', 'Emergencia'],
    meta: '02 / 03'
  },
  {
    num: 'III — Disciplina',
    slug: '/instalaciones-especiales',
    name: 'Instalaciones',
    nameAccent: 'especiales',
    tagline: 'Audio, redes, seguridad, control y automatización. Diseño, instalación y programación in-house.',
    highlights: ['Audio · AV', 'Redes', 'CCTV', 'Acceso', 'Lutron', 'BMS', 'Detección', 'Cortinas'],
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
