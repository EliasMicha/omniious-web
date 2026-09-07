import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { Project, ProjectCategory } from "../lib/types";
import "./admin.css";
const CATEGORIES: Record<ProjectCategory, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  corporativo: "Corporativo",
  hotelero: "Hotelería",
  exhibicion: "Exhibiciones",
  hospitalidad: "Restaurantes",
  cultural: "Obra pública",
};
const EMPTY: Partial<Project> = {
  name: "",
  slug: "",
  client: "",
  architect: "",
  category: "residencial",
  location: "",
  year: "",
  area_m2: null,
  scope: [],
  description: "",
  cover_image_url: "",
  gallery_urls: [],
  display_order: 100,
  published: false,
};
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const message = (e: unknown) =>
  e instanceof Error
    ? e.message
    : typeof e === "object" && e && "message" in e
      ? String(e.message)
      : "No se pudo completar la operación. Intenta de nuevo.";
export default function AdminPanel() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [progress, setProgress] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          navigate("/admin", { replace: true });
          return;
        }
        if (data.user.id !== "bfb0d222-5481-4386-99d0-97fdb7c71228") {
          setError("Esta cuenta no tiene acceso para administrar las obras.");
          return;
        }
        setAuthorized(true);
        await refresh();
      } catch (e) {
        if (active) setError(message(e));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [navigate]);
  useEffect(() => {
    if (!editing) return;
    const leave = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, [editing]);
  async function refresh() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order")
      .order("name");
    if (error) throw error;
    setProjects(data || []);
  }
  function edit(p: Partial<Project>) {
    setError("");
    setSuccess("");
    setEditing({
      ...p,
      scope: [...(p.scope || [])],
      gallery_urls: [...(p.gallery_urls || [])],
    });
  }
  function change<K extends keyof Project>(key: K, value: Project[K]) {
    setEditing((p) => (p ? { ...p, [key]: value } : null));
  }
  async function upload(files: File[], cover: boolean) {
    if (!files.length || lock.current) return;
    setError("");
    setSuccess("");
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    for (const f of files) {
      if (!allowed.includes(f.type)) {
        setError(
          `${f.name}: usa JPG, PNG, WebP o GIF. Para fotos HEIC, expórtalas como JPG.`,
        );
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setError(`${f.name} supera el límite de 10 MB.`);
        return;
      }
    }
    lock.current = true;
    setBusy(true);
    let completed = 0;
    try {
      for (const [i, file] of files.entries()) {
        setProgress(`Subiendo foto ${i + 1} de ${files.length}…`);
        const ext = (
          {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "image/gif": "gif",
          } as Record<string, string>
        )[file.type];
        const path = `projects/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("project-images")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw error;
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(path);
        setEditing((p) =>
          p
            ? cover
              ? { ...p, cover_image_url: data.publicUrl }
              : {
                  ...p,
                  gallery_urls: [...(p.gallery_urls || []), data.publicUrl],
                }
            : null,
        );
        completed++;
      }
      setSuccess("Fotos subidas. Guarda el proyecto para aplicar los cambios.");
    } catch (e) {
      setError(
        `${message(e)} ${completed ? `${completed} foto(s) sí se subieron y siguen en el formulario.` : ""}`,
      );
    } finally {
      lock.current = false;
      setBusy(false);
      setProgress("");
    }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing || lock.current) return;
    setError("");
    setSuccess("");
    if (!editing.name?.trim() || !editing.slug || !editing.cover_image_url) {
      setError("Agrega un nombre y una foto de portada.");
      return;
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(editing.slug)) {
      setError("La dirección debe usar letras sin acentos, números y guiones.");
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      const payload = {
        name: editing.name.trim(),
        slug: editing.slug,
        client: editing.client || null,
        architect: editing.architect || null,
        category: editing.category,
        location: editing.location || null,
        year: editing.year || null,
        area_m2: editing.area_m2 || null,
        description: editing.description || null,
        scope: (editing.scope || []).map((s) => s.trim()).filter(Boolean),
        cover_image_url: editing.cover_image_url,
        gallery_urls: editing.gallery_urls || [],
        display_order: editing.display_order ?? 100,
        published: !!editing.published,
      };
      const request = editing.id
        ? supabase.from("projects").update(payload).eq("id", editing.id)
        : supabase.from("projects").insert(payload);
      const { error } = await request.select("id").single();
      if (error) throw error;
      await refresh();
      setEditing(null);
      setSuccess(
        payload.published
          ? "Proyecto guardado y publicado."
          : "Proyecto guardado como borrador.",
      );
    } catch (e) {
      setError(message(e));
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  function move(index: number, step: number) {
    const list = [...(editing?.gallery_urls || [])];
    if (index + step < 0 || index + step >= list.length) return;
    [list[index], list[index + step]] = [list[index + step], list[index]];
    change("gallery_urls", list);
  }
  async function logout() {
    if (busy) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/admin", { replace: true });
    } catch (e) {
      setError(message(e));
    }
  }
  const visible = projects.filter((p) =>
    `${p.name} ${p.category} ${p.location || ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="works-admin">
      <header className="admin-top">
        <a href="/">OMNIIOUS</a>
        <a href="/proyectos" target="_blank" rel="noreferrer">
          Ver portafolio ↗
        </a>
        <button onClick={logout} disabled={busy}>
          Salir
        </button>
      </header>
      <main>
        <div className="admin-title">
          <div>
            <p>Administración de obras</p>
            <h1>
              {editing
                ? editing.id
                  ? "Editar proyecto"
                  : "Nuevo proyecto"
                : "Tus proyectos"}
            </h1>
          </div>
          {!editing && (
            <button
              onClick={() => edit(EMPTY)}
              disabled={loading || !authorized}
            >
              + Nuevo proyecto
            </button>
          )}
        </div>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="admin-success" role="status">
            {success}
          </p>
        )}
        {progress && <p role="status">{progress}</p>}
        {loading ? (
          <p>Cargando proyectos…</p>
        ) : !authorized ? (
          <p>Acceso restringido a la cuenta administradora.</p>
        ) : !editing ? (
          <>
            <label className="admin-search">
              Buscar obra
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre, sector o ubicación"
              />
            </label>
            <p>
              {projects.length} proyectos ·{" "}
              {projects.filter((p) => p.published).length} publicados
            </p>
            <div className="admin-list">
              {visible.map((p) => (
                <article key={p.id}>
                  <img src={p.cover_image_url} alt="" loading="lazy" />
                  <div>
                    <h2>{p.name}</h2>
                    <p>
                      {CATEGORIES[p.category]} · {p.year || "Sin año"} ·{" "}
                      {p.published ? "Publicado" : "Borrador"}
                    </p>
                    <small>{p.gallery_urls.length} fotos en galería</small>
                  </div>
                  <button onClick={() => edit(p)}>Editar</button>
                </article>
              ))}
              {!visible.length && <p>No se encontraron obras.</p>}
            </div>
          </>
        ) : (
          <form onSubmit={save}>
            <fieldset disabled={busy}>
              <div className="admin-fields">
                <label>
                  Nombre del proyecto
                  <input
                    required
                    value={editing.name || ""}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditing((p) =>
                        p
                          ? { ...p, name, slug: p.id ? p.slug : slugify(name) }
                          : null,
                      );
                    }}
                  />
                </label>
                <label>
                  Sector
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      change("category", e.target.value as ProjectCategory)
                    }
                  >
                    {Object.entries(CATEGORIES).map(([k, v]) => (
                      <option value={k} key={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Cliente
                  <input
                    value={editing.client || ""}
                    onChange={(e) => change("client", e.target.value)}
                  />
                </label>
                <label>
                  Arquitectura / colaboración
                  <input
                    value={editing.architect || ""}
                    onChange={(e) => change("architect", e.target.value)}
                  />
                </label>
                <label>
                  Ubicación
                  <input
                    value={editing.location || ""}
                    onChange={(e) => change("location", e.target.value)}
                  />
                </label>
                <label>
                  Año o estado de obra
                  <input
                    value={editing.year || ""}
                    placeholder="2026 o En curso"
                    onChange={(e) => change("year", e.target.value)}
                  />
                </label>
                <label>
                  Superficie (m²)
                  <input
                    type="number"
                    min="1"
                    value={editing.area_m2 || ""}
                    onChange={(e) =>
                      change(
                        "area_m2",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                  />
                </label>
                <label>
                  Orden en el portafolio
                  <input
                    type="number"
                    min="0"
                    value={editing.display_order ?? 100}
                    onChange={(e) =>
                      change("display_order", Number(e.target.value))
                    }
                  />
                  <small>Un número menor aparece primero.</small>
                </label>
                <label className="wide">
                  Descripción y alcance
                  <textarea
                    rows={5}
                    value={editing.description || ""}
                    onChange={(e) => change("description", e.target.value)}
                  />
                </label>
                <label className="wide">
                  Servicios (uno por línea)
                  <textarea
                    rows={3}
                    value={(editing.scope || []).join("\n")}
                    onChange={(e) =>
                      change("scope", e.target.value.split("\n"))
                    }
                  />
                </label>
              </div>
              <section className="admin-photos">
                <h2>Foto de portada</h2>
                <p>JPG, PNG, WebP o GIF. Hasta 10 MB por foto.</p>
                {editing.cover_image_url && (
                  <img
                    className="admin-cover"
                    src={editing.cover_image_url}
                    alt="Portada actual"
                  />
                )}
                <label className="admin-upload">
                  Subir o cambiar portada
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      e.target.value = "";
                      void upload(files, true);
                    }}
                  />
                </label>
              </section>
              <section className="admin-photos">
                <h2>Galería del proyecto</h2>
                <p>
                  Sube varias fotos a la vez. Puedes ordenarlas y elegir
                  cualquiera como portada.
                </p>
                <label className="admin-upload">
                  Agregar fotos
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      e.target.value = "";
                      void upload(files, false);
                    }}
                  />
                </label>
                <div className="admin-gallery">
                  {(editing.gallery_urls || []).map((src, i) => (
                    <article key={`${src}-${i}`}>
                      <img src={src} alt={`Foto ${i + 1}`} />
                      <div>
                        <button
                          type="button"
                          onClick={() => change("cover_image_url", src)}
                        >
                          Usar de portada
                        </button>
                        <button
                          type="button"
                          aria-label={`Mover foto ${i + 1} antes`}
                          disabled={i === 0}
                          onClick={() => move(i, -1)}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          aria-label={`Mover foto ${i + 1} después`}
                          disabled={
                            i === (editing.gallery_urls || []).length - 1
                          }
                          onClick={() => move(i, 1)}
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            change(
                              "gallery_urls",
                              (editing.gallery_urls || []).filter(
                                (_, n) => n !== i,
                              ),
                            )
                          }
                        >
                          Quitar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <div className="admin-fields">
                <label>
                  Visibilidad
                  <select
                    value={editing.published ? "public" : "draft"}
                    onChange={(e) =>
                      change("published", e.target.value === "public")
                    }
                  >
                    <option value="draft">
                      Borrador — no aparece en la página
                    </option>
                    <option value="public">
                      Publicado — visible en el portafolio
                    </option>
                  </select>
                </label>
                <label>
                  Dirección del proyecto
                  <input
                    required
                    value={editing.slug || ""}
                    onChange={(e) => change("slug", e.target.value)}
                  />
                  <small>/proyectos/{editing.slug}</small>
                </label>
              </div>
              <div className="admin-actions">
                <button type="submit">
                  {busy ? "Guardando…" : "Guardar proyecto"}
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    if (confirm("¿Cerrar sin guardar estos cambios?")) {
                      setEditing(null);
                      setError("");
                      setSuccess("");
                    }
                  }}
                >
                  Cancelar
                </button>
                {editing.id && editing.published && (
                  <a
                    href={`/proyectos/${editing.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver publicado ↗
                  </a>
                )}
              </div>
            </fieldset>
          </form>
        )}
      </main>
    </div>
  );
}
