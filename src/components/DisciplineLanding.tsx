import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Ficha from './Ficha';
import Marcas from './Marcas';
import Contacto from './Contacto';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/types';

export interface DisciplineService {
  name: string;
  desc: string;
}

export interface DisciplineConfig {
  slug: string;            // 'iluminacion' | 'electrica' | 'instalaciones-especiales'
  eyebrow: string;         // "Disciplina I"
  title: React.ReactNode;  // hero title with em
  lead: string;            // párrafo bajo el título
  scopeFilter: string;     // valor de scope[] en projects
  services: DisciplineService[];
  whatsappMessage: string;
  seo: {
    title: string;
    description: string;
  };
}

export default function DisciplineLanding({ config }: { config: DisciplineConfig }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .contains('scope', [config.scopeFilter])
        .order('display_order', { ascending: true })
        .limit(6);
      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    })();
  }, [config.scopeFilter]);

  const waHref = `https://wa.me/525555011014?text=${encodeURIComponent(config.whatsappMessage)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: config.seo.title,
    provider: {
      '@type': 'Organization',
      name: 'OMNIIOUS',
      url: 'https://omniious.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ciudad de México', addressCountry: 'MX' }
    },
    areaServed: { '@type': 'Country', name: 'Mexico' },
    description: config.seo.description
  };

  return (
    <>
      <Seo
        title={config.seo.title}
        description={config.seo.description}
        path={`/${config.slug}`}
        jsonLd={jsonLd}
      />
      <Nav />
      <Ficha />

      <section className="discipline-hero">
        <div>
          <div className="discipline-eyebrow">{config.eyebrow}</div>
          <h1 className="discipline-title">{config.title}</h1>
          <p className="discipline-lead">{config.lead}</p>
          <div className="discipline-cta-row">
            <a className="btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
              Cotizar por WhatsApp <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span>
            </a>
            <a className="btn-secondary" href="mailto:elias@omniious.com">
              Escribir un correo
            </a>
          </div>
        </div>

        <div className="hero-bottom" style={{ marginTop: 80 }}>
          <div>
            <div className="tag">Equipo</div>
            <p>Un solo responsable por proyecto. Sin intermediarios entre el diseño y la obra.</p>
          </div>
          <div>
            <div className="tag">Cobertura</div>
            <p>Ciudad de México, Valle de Bravo, Cancún, Baja California — y donde tu obra requiera.</p>
          </div>
          <div className="scroll">
            <span>Servicios</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      <section className="discipline-services" id="servicios">
        <div className="section-header">
          <div className="section-num">— Servicios</div>
          <h2 className="section-title">Lo que <em>entregamos</em>.</h2>
        </div>
        <div className="services-grid">
          {config.services.map((s, i) => (
            <div className="service-row" key={s.name}>
              <div className="idx">{String(i + 1).padStart(2, '0')}</div>
              <div className="nm">{s.name}</div>
              <div className="ds">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos">
        <div className="section-header">
          <div className="section-num">— Obras seleccionadas</div>
          <h2 className="section-title">Proyectos en <em>{config.eyebrow.replace(/^Disciplina\s+\w+\s*—?\s*/i, '').toLowerCase()}</em>.</h2>
        </div>

        {loading ? (
          <div style={{ padding: '0 48px', color: 'var(--ink-mute)', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }}>
            Cargando…
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '0 48px', color: 'var(--ink-mute)', fontSize: 14 }}>
            Próximamente — estamos preparando casos de estudio para esta disciplina.
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(p => (
              <Link to={`/proyectos/${p.slug}`} className="project" key={p.id}>
                <div
                  className="project-img"
                  style={{ backgroundImage: `url(${p.cover_image_url})` }}
                ></div>
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

      <Marcas />
      <Contacto />
      <WhatsAppButton phone="525555011014" message={config.whatsappMessage} />
    </>
  );
}
