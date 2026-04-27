import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/types';

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#2a3a4a 0%,#4a5a6a 50%,#8a9aaa 100%)',
  'linear-gradient(160deg,#3a2a1a 0%,#8a6a4a 60%,#caaa7a 100%)',
  'linear-gradient(200deg,#1a2a3a 0%,#3a4a5a 70%,#6a8aaa 100%)',
  'linear-gradient(120deg,#4a3a2a 0%,#7a5a3a 50%,#aa8a5a 100%)',
  'linear-gradient(180deg,#2a2a2a 0%,#4a4a4a 50%,#7a7a7a 100%)',
  'linear-gradient(140deg,#5a4a3a 0%,#8a7a5a 60%,#baa88a 100%)'
];

const ROMAN: Record<string, string> = {
  '2022': 'MMXXII', '2023': 'MMXXIII', '2024': 'MMXXIV',
  '2025': 'MMXXV', '2026': 'MMXXVI', '2027': 'MMXXVII'
};

function toRoman(year: string | null): string {
  if (!year) return '';
  if (year.toLowerCase().includes('curso')) return 'EN CURSO';
  return ROMAN[year] || year.toUpperCase();
}

export default function Proyectos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });
      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    })();
  }, []);

  return (
    <section id="proyectos">
      <div className="section-header">
        <div className="section-num">III — Proyectos</div>
        <h2 className="section-title">Obras <em>seleccionadas</em><br />2022 — 2026</h2>
      </div>

      {loading ? (
        <div style={{ padding: '0 48px', color: 'var(--ink-mute)', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }}>
          Cargando…
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((p, i) => {
            const bg = p.cover_image_url
              ? `url(${p.cover_image_url})`
              : FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
            const yearLabel = toRoman(p.year);
            const areaLabel = p.area_m2 ? `${p.area_m2.toLocaleString('es-MX')} M²` : '';
            const enCurso = p.year?.toLowerCase().includes('curso');
            return (
              <Link to={`/proyectos/${p.slug}`} className="project" key={p.id}>
                <div className="project-img" style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="project-ficha">
                  <span>{enCurso ? `${ROMAN['2026']} · EN CURSO` : yearLabel}</span>
                  <span>{areaLabel}</span>
                </div>
                <div className="project-info">
                  <div className="project-client">
                    {[p.client, p.architect].filter(Boolean).join(' · ')}
                  </div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-type">
                    {p.category[0].toUpperCase() + p.category.slice(1)}
                    {p.location ? ` — ${p.location}` : ''}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
