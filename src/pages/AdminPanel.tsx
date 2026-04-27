import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { supabase } from '../lib/supabase';
import type { Project, ProjectCategory } from '../lib/types';

const CATEGORIES: ProjectCategory[] = [
  'residencial', 'comercial', 'corporativo', 'hotelero',
  'exhibicion', 'hospitalidad', 'cultural'
];

const EMPTY_FORM: Partial<Project> = {
  slug: '', name: '', client: '', architect: '',
  category: 'residencial', location: '', year: '',
  area_m2: null, scope: [], description: '',
  cover_image_url: '', gallery_urls: [],
  display_order: 100, published: true
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin', { replace: true });
        return;
      }
      await refresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) setError(error.message);
    else setProjects((data ?? []) as Project[]);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    setError(null);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('project-images')
      .upload(path, file, { upsert: false, contentType: file.type });
    if (upErr) {
      setError(`Subida falló: ${upErr.message}`);
      setUploading(false);
      return null;
    }
    const { data } = supabase.storage.from('project-images').getPublicUrl(path);
    setUploading(false);
    return data.publicUrl;
  }

  async function save() {
    if (!editing) return;
    setError(null);
    setSuccess(null);

    if (!editing.name || !editing.slug || !editing.category || !editing.cover_image_url) {
      setError('Faltan campos: nombre, slug, categoría e imagen de portada son obligatorios.');
      return;
    }

    const payload = {
      ...editing,
      area_m2: editing.area_m2 || null,
      gallery_urls: editing.gallery_urls || [],
      scope: editing.scope || [],
      display_order: editing.display_order ?? 100,
      published: editing.published ?? true
    };

    if (editing.id) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editing.id);
      if (error) { setError(error.message); return; }
      setSuccess('Proyecto actualizado');
    } else {
      const { error } = await supabase.from('projects').insert(payload as any);
      if (error) { setError(error.message); return; }
      setSuccess('Proyecto creado');
    }
    setEditing(null);
    await refresh();
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { setError(error.message); return; }
    await refresh();
  }

  if (loading) {
    return (
      <>
        <Nav />
        <div className="admin">
          <p style={{ color: 'var(--ink-mute)', letterSpacing: '.22em', textTransform: 'uppercase', fontSize: 11 }}>
            Cargando…
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="admin">
        <div className="toolbar">
          <h1 style={{ margin: 0, fontSize: 36 }}>Proyectos</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setEditing({ ...EMPTY_FORM })}>+ Nuevo proyecto</button>
            <button className="secondary" onClick={logout}>Salir</button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {!editing && (
          <div>
            {projects.length === 0 && (
              <p style={{ color: 'var(--ink-mute)', padding: 24, textAlign: 'center' }}>
                Sin proyectos. Agrega el primero con el botón de arriba.
              </p>
            )}
            {projects.map(p => (
              <div className="row" key={p.id}>
                <div
                  className="thumb"
                  style={{ backgroundImage: `url(${p.cover_image_url})` }}
                />
                <div className="info">
                  <div className="nm">{p.name}</div>
                  <div className="meta">
                    {p.category} · {p.location || '—'} · {p.year || '—'} · orden {p.display_order} · {p.published ? 'publicado' : 'oculto'}
                  </div>
                </div>
                <button className="secondary" onClick={() => setEditing(p)}>Editar</button>
                <button className="secondary" onClick={() => remove(p.id)}>Borrar</button>
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div className="form-grid">
            <div>
              <label>Nombre</label>
              <input
                value={editing.name ?? ''}
                onChange={e => {
                  const name = e.target.value;
                  setEditing(prev => ({
                    ...prev!,
                    name,
                    slug: prev?.id ? prev.slug : slugify(name)
                  }));
                }}
              />
            </div>
            <div>
              <label>Slug (URL)</label>
              <input
                value={editing.slug ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, slug: slugify(e.target.value) }))}
              />
            </div>
            <div>
              <label>Cliente</label>
              <input
                value={editing.client ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, client: e.target.value }))}
              />
            </div>
            <div>
              <label>Arquitecto</label>
              <input
                value={editing.architect ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, architect: e.target.value }))}
              />
            </div>
            <div>
              <label>Categoría</label>
              <select
                value={editing.category ?? 'residencial'}
                onChange={e => setEditing(prev => ({ ...prev!, category: e.target.value as ProjectCategory }))}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label>Ubicación</label>
              <input
                value={editing.location ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, location: e.target.value }))}
              />
            </div>
            <div>
              <label>Año (texto: 2025, En curso)</label>
              <input
                value={editing.year ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, year: e.target.value }))}
              />
            </div>
            <div>
              <label>Área (m²)</label>
              <input
                type="number"
                value={editing.area_m2 ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, area_m2: e.target.value ? Number(e.target.value) : null }))}
              />
            </div>
            <div className="full">
              <label>Descripción</label>
              <textarea
                value={editing.description ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, description: e.target.value }))}
              />
            </div>
            <div className="full">
              <label>Imagen de portada</label>
              <input
                type="text"
                placeholder="URL de la imagen"
                value={editing.cover_image_url ?? ''}
                onChange={e => setEditing(prev => ({ ...prev!, cover_image_url: e.target.value }))}
              />
              <input
                type="file"
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file);
                  if (url) setEditing(prev => ({ ...prev!, cover_image_url: url }));
                }}
              />
              {uploading && <p style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Subiendo…</p>}
              {editing.cover_image_url && (
                <img src={editing.cover_image_url} alt="" style={{ width: 200, marginTop: 8 }} />
              )}
            </div>
            <div className="full">
              <label>Galería (un URL por línea)</label>
              <textarea
                value={(editing.gallery_urls || []).join('\n')}
                onChange={e => setEditing(prev => ({
                  ...prev!,
                  gallery_urls: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                }))}
                placeholder="https://...&#10;https://..."
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async e => {
                  const files = Array.from(e.target.files ?? []);
                  if (files.length === 0) return;
                  const urls: string[] = [];
                  for (const f of files) {
                    const url = await uploadImage(f);
                    if (url) urls.push(url);
                  }
                  setEditing(prev => ({
                    ...prev!,
                    gallery_urls: [...(prev?.gallery_urls || []), ...urls]
                  }));
                }}
              />
            </div>
            <div>
              <label>Orden de despliegue (menor = primero)</label>
              <input
                type="number"
                value={editing.display_order ?? 100}
                onChange={e => setEditing(prev => ({ ...prev!, display_order: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label>Estado</label>
              <select
                value={editing.published ? 'pub' : 'hid'}
                onChange={e => setEditing(prev => ({ ...prev!, published: e.target.value === 'pub' }))}
              >
                <option value="pub">Publicado</option>
                <option value="hid">Oculto</option>
              </select>
            </div>

            <div className="full" style={{ display: 'flex', gap: 12 }}>
              <button onClick={save} disabled={uploading}>
                {editing.id ? 'Guardar cambios' : 'Crear proyecto'}
              </button>
              <button className="secondary" onClick={() => { setEditing(null); setError(null); }}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
