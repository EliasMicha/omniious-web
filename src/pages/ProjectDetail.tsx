import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import WhatsAppButton from '../components/WhatsAppButton';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/types';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (error || !data) setNotFound(true);
      else setProject(data as Project);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: 200, textAlign: 'center', color: 'var(--ink-mute)', letterSpacing: '.22em', textTransform: 'uppercase', fontSize: 11 }}>
          Cargando…
        </div>
      </>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: 200, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 64, fontWeight: 300, marginBottom: 24 }}>
            Proyecto no encontrado
          </h1>
          <Link to="/" style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
            ← Volver al inicio
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <article className="project-detail">
        <div
          className="hero-img"
          style={{
            backgroundImage: `url(${project.cover_image_url})`
          }}
        />

        <Link to="/#proyectos" className="back">← Todos los proyectos</Link>

        <div className="meta-grid">
          <div className="meta">
            <div>Cliente<strong>{project.client || '—'}</strong></div>
            <div>Arquitecto<strong>{project.architect || '—'}</strong></div>
            <div>Tipología<strong>{project.category[0].toUpperCase() + project.category.slice(1)}</strong></div>
            <div>Ubicación<strong>{project.location || '—'}</strong></div>
            <div>Año<strong>{project.year || '—'}</strong></div>
            <div>Área<strong>{project.area_m2 ? `${project.area_m2.toLocaleString('es-MX')} m²` : '—'}</strong></div>
          </div>
          <p className="description">
            {project.description || 'Sin descripción disponible.'}
          </p>
        </div>

        {project.gallery_urls && project.gallery_urls.length > 0 && (
          <div className="gallery">
            {project.gallery_urls.map((url, i) => (
              <img
                src={url}
                alt={`${project.name} — ${i + 1}`}
                key={i}
                className={i === 0 ? 'full' : ''}
                loading="lazy"
              />
            ))}
          </div>
        )}
      </article>
      <WhatsAppButton />
    </>
  );
}
