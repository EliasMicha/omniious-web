import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Ficha from './Ficha';
import Contacto from './Contacto';
import WhatsAppButton from './WhatsAppButton';
import Seo from './Seo';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/types';

export interface ServiceItem {
  name: string;
  desc: string;
}

export interface SystemItem {
  anchor: string;       // 'audio' | 'redes' | etc — para deep-links
  name: string;
  brands: string;       // "Sonos · McIntosh · Nexo"
  desc: string;
  highlight?: {         // banda destacada (ej: Lutron link)
    label: string;
    href: string;
  };
}

export interface DisciplineConfig {
  slug: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  scopeFilter: string;
  whatsappMessage: string;
  designServices: ServiceItem[];
  implementationServices: ServiceItem[];
  systems?: SystemItem[];        // solo /instalaciones-especiales
  brandsBlurb?: string;          // texto discreto de marcas
  typologies?: string[];         // tipologías que dominan (eléctrica)
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
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad de México',
        addressCountry: 'MX'
      }
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

      {/* HERO */}
      <section className="discipline-hero">
        <div>
          <div className="discipline-eyebrow">{config.eyebrow}</div>
          <h1 className="discipline-title">{config.title}</h1>
          <p className="discipline-lead">{config.lead}</p>
          <div className="discipline-cta-row">
            <a className="btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
              Cotizar por WhatsApp
            </a>
            <a className="btn-secondary" href="#diseno">Ver lo que hacemos</a>
          </div>
        </div>
      </section>

      {/* DUAL BLOCK — DISEÑO + IMPLEMENTACIÓN */}
      <section className="dual-block" id="diseno">
        <div className="dual-grid">
          <div className="dual-col">
            <div className="dual-eyebrow">— Diseño</div>
            <h2 className="dual-title">Lo que <em>diseñamos</em>.</h2>
            <ol className="dual-list">
              {config.designServices.map((s, i) => (
                <li key={s.name}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="nm">{s.name}</div>
                    <div className="ds">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="dual-col" id="implementacion">
            <div className="dual-eyebrow">— Implementación</div>
            <h2 className="dual-title">Lo que <em>ejecutamos</em>.</h2>
            <ol className="dual-list">
              {config.implementationServices.map((s, i) => (
                <li key={s.name}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="nm">{s.name}</div>
                    <div className="ds">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="dual-foot">
          <p>
            Diseño se cobra por metro cuadrado de proyecto. Implementación depende de los equipos y el alcance.
            Las dos cosas se pueden contratar juntas o por separado.
          </p>
        </div>
      </section>

      {/* SISTEMAS — solo si config.systems */}
      {config.systems && config.systems.length > 0 && (
        <section className="systems-block" id="sistemas">
          <div className="section-header">
            <div className="section-num">— Sistemas que dominamos</div>
            <h2 className="section-title">Nueve <em>especialidades</em>.<br />Un solo equipo.</h2>
          </div>
          <div className="systems-list">
            {config.systems.map((s, i) => (
              <div className="system-row" id={s.anchor} key={s.anchor}>
                <div className="sys-idx">{String(i + 1).padStart(2, '0')}</div>
                <div className="sys-name">{s.name}</div>
                <div className="sys-brands">{s.brands}</div>
                <div className="sys-desc">
                  {s.desc}
                  {s.highlight && (
                    <Link to={s.highlight.href} className="sys-hl">
                      {s.highlight.label} <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' }}>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TIPOLOGÍAS — solo si config.typologies */}
      {config.typologies && config.typologies.length > 0 && (
        <section className="typologies-block">
          <div className="section-header">
            <div className="section-num">— Dónde nos buscan</div>
            <h2 className="section-title">Tipologías que <em>dominamos</em>.</h2>
          </div>
          <div className="typo-grid">
            {config.typologies.map(t => (
              <div className="typo-card" key={t}>{t}</div>
            ))}
          </div>
        </section>
      )}

      {/* BRANDS BLURB — texto discreto */}
      {config.brandsBlurb && (
        <section className="brands-blurb">
          <p>{config.brandsBlurb}</p>
        </section>
      )}

      {/* PROYECTOS */}
      <section id="proyectos">
        <div className="section-header">
          <div className="section-num">— Obras seleccionadas</div>
          <h2 className="section-title">Donde lo hemos <em>construido</em>.</h2>
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

      <Contacto />
      <WhatsAppButton phone="525555011014" message={config.whatsappMessage} />
    </>
  );
}
