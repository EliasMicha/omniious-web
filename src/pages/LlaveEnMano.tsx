import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Ficha from '../components/Ficha';
import Contacto from '../components/Contacto';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { organizationLd, serviceLd, breadcrumbLd, graphLd } from '../lib/seo';
import { trackLead } from '../lib/analytics';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/types';

const WA_MESSAGE = 'Hola Omniious, soy [arquitecto / constructor / desarrollador / cliente final]. Tengo un proyecto [residencial / comercial / hotelero / corporativo] de aprox ___ m² en [ciudad], en etapa de [diseño / obra arrancando / obra en ejecución]. Me interesa cotizar ingeniería integral (iluminación + eléctrica + especiales).';
const WA_HREF = `https://wa.me/525555011014?text=${encodeURIComponent(WA_MESSAGE)}`;

interface Reason {
  title: string;
  desc: string;
}

const REASONS: Reason[] = [
  {
    title: 'Coordinación desde el primer plano',
    desc: 'No al final. Las decisiones de iluminación, eléctrica y especiales se toman juntas, antes de que cualquiera afecte a la otra.'
  },
  {
    title: 'Compatibilidad garantizada',
    desc: 'Que el control de iluminación hable con la cortina, que la cortina hable con el BMS, que el BMS hable con la fachada — antes de que un electricista tire los cables.'
  },
  {
    title: 'Un solo punto de contacto',
    desc: 'Una llamada para la cotización, una para la obra, una para el mantenimiento. No te pasamos de mano en mano.'
  },
  {
    title: 'Responsabilidad de extremo a extremo',
    desc: 'Si algo falla, no hay quién culpar a quién. Diseñamos, suministramos, instalamos y firmamos. La línea de responsabilidad es directa.'
  }
];

const STEPS = [
  { num: 'I', name: 'Conversación inicial', desc: 'Entendemos el proyecto, la arquitectura, el cliente final, los plazos. Sin cobrar.' },
  { num: 'II', name: 'Anteproyecto', desc: 'Definición de alcance por disciplina, ingenierías base, presupuesto integrado por sistema.' },
  { num: 'III', name: 'Diseño ejecutivo', desc: 'Las tres disciplinas avanzan en paralelo, coordinándose entre sí semana a semana.' },
  { num: 'IV', name: 'Suministro y obra', desc: 'Compras coordinadas, equipo en obra revisando antes de cada colado, cada plafón, cada cierre.' },
  { num: 'V', name: 'Programación y arranque', desc: 'Lutron, BMS, audio, control — todo programado in-house. Pruebas con cargas reales.' },
  { num: 'VI', name: 'Entrega y soporte', desc: 'Documentación as-built, capacitación al cliente, soporte post-entrega con la misma firma.' }
];

export default function LlaveEnMano() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      // Proyectos donde se hicieron al menos 2 disciplinas
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })
        .limit(6);
      if (data) setProjects(data as Project[]);
    })();
  }, []);

  const url = 'https://omniious.com/llave-en-mano';
  const jsonLd = graphLd(
    organizationLd(),
    serviceLd({
      name: 'Ingeniería integral llave en mano para arquitectura',
      description: 'Diseño e implementación integral de iluminación, ingeniería eléctrica e instalaciones especiales bajo un solo equipo. Para arquitectos, constructoras y desarrolladores.',
      url,
      serviceType: 'Llave en mano · Iluminación + Eléctrica + Especiales'
    }),
    breadcrumbLd([
      { name: 'OMNIIOUS', url: 'https://omniious.com' },
      { name: 'Llave en mano', url }
    ])
  );

  return (
    <>
      <Seo
        title="Ingeniería integral para arquitectura — Llave en mano | OMNIIOUS"
        description="Iluminación, ingeniería eléctrica e instalaciones especiales bajo un solo equipo. Una sola conversación. Un solo responsable. Para arquitectos y constructores."
        path="/llave-en-mano"
        jsonLd={jsonLd}
      />
      <Nav />
      <Ficha />

      {/* HERO */}
      <section className="discipline-hero">
        <div>
          <div className="discipline-eyebrow">Llave en mano · para arquitectos y constructores</div>
          <h1 className="discipline-title">Una sola conversación.<br />Un solo <em>responsable</em>.</h1>
          <p className="discipline-lead">Lo que normalmente requiere cinco contratistas, en OMM lo hace un solo equipo.</p>
          <div className="discipline-cta-row">
            <a
              className="btn-primary"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('whatsapp', '/llave-en-mano')}
            >
              Hablemos del proyecto
            </a>
            <a className="btn-secondary" href="#disciplinas">Ver disciplinas</a>
          </div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="llave-reasons">
        <div className="section-header">
          <div className="section-num">— Por qué llave en mano</div>
          <h2 className="section-title">La diferencia entre <em>coordinar</em><br />y supervisar.</h2>
        </div>
        <div className="llave-reasons-grid">
          {REASONS.map((r, i) => (
            <div className="llave-reason" key={r.title}>
              <div className="lr-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="lr-title">{r.title}</div>
              <p className="lr-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCIPLINAS */}
      <section id="disciplinas" className="llave-disciplines">
        <div className="section-header">
          <div className="section-num">— Disciplinas integradas</div>
          <h2 className="section-title">Tres especialidades.<br /><em>Un</em> solo equipo.</h2>
        </div>
        <div className="llave-disc-grid">
          <Link to="/iluminacion" className="llave-disc">
            <div className="ld-num">I</div>
            <div className="ld-name">Iluminación arquitectónica</div>
            <p>Diseño, decorativa, custom, importación, instalación, programación.</p>
            <div className="ld-arrow">Ver disciplina <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span></div>
          </Link>
          <Link to="/electrica" className="llave-disc">
            <div className="ld-num">II</div>
            <div className="ld-name">Ingeniería eléctrica</div>
            <p>Plano base, cálculos, subestación, fotovoltaico, emergencia, ejecución, UVIE.</p>
            <div className="ld-arrow">Ver disciplina <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span></div>
          </Link>
          <Link to="/instalaciones-especiales" className="llave-disc">
            <div className="ld-num">III</div>
            <div className="ld-name">Instalaciones especiales</div>
            <p>Audio, redes, CCTV, acceso, control de iluminación, BMS, detección, telefonía, cortinas.</p>
            <div className="ld-arrow">Ver disciplina <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span></div>
          </Link>
        </div>

        <div className="llave-lutron-band">
          <div>
            <div className="band-eye">— Especialidad destacada</div>
            <div className="band-title">Integradores Lutron certificados.</div>
            <p>HomeWorks · RA2 · Athena · Caséta · Vive — con programadores propios, no freelance.</p>
          </div>
          <Link to="/lutron" className="band-link">Ver línea Lutron <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span></Link>
        </div>
      </section>

      {/* PROCESO */}
      <section className="llave-process">
        <div className="section-header">
          <div className="section-num">— Cómo trabajamos</div>
          <h2 className="section-title">Seis pasos.<br />De la idea a la <em>llave</em>.</h2>
        </div>
        <div className="llave-steps">
          {STEPS.map(s => (
            <div className="llave-step" key={s.num}>
              <div className="ls-num-roman">{s.num}</div>
              <div>
                <div className="ls-name">{s.name}</div>
                <p className="ls-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos">
        <div className="section-header">
          <div className="section-num">— Proyectos llave en mano</div>
          <h2 className="section-title">Donde lo hicimos <em>todo</em>.</h2>
        </div>
        {projects.length === 0 ? (
          <div style={{ padding: '0 48px', color: 'var(--ink-mute)', fontSize: 14 }}>
            Cargando proyectos…
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(p => (
              <Link to={`/proyectos/${p.slug}`} className="project" key={p.id}>
                <div className="project-img" style={{ backgroundImage: `url(${p.cover_image_url})` }}></div>
                <div className="project-ficha">
                  <span>{p.year || ''}</span>
                  <span>{p.area_m2 ? `${p.area_m2.toLocaleString('es-MX')} M²` : ''}</span>
                </div>
                <div className="project-info">
                  <div className="project-client">{[p.client, p.architect].filter(Boolean).join(' · ')}</div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-type">
                    {p.category[0].toUpperCase() + p.category.slice(1)}
                    {p.location ? ` — ${p.location}` : ''}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Contacto />
      <WhatsAppButton phone="525555011014" message={WA_MESSAGE} />
    </>
  );
}
