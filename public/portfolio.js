import { url, key } from "/portfolio-config.js";
const host = document.querySelector("[data-portfolio]");
const labels = {
  residencial: "Residencial",
  hotelero: "Hotelería",
  corporativo: "Corporativo",
  comercial: "Comercial",
  hospitalidad: "Restaurantes",
  exhibicion: "Exhibiciones",
  cultural: "Obra pública",
};
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const safeImage = (s) => {
  try {
    const u = new URL(s, location.origin);
    return ["https:", "http:"].includes(u.protocol) ? esc(u.href) : "";
  } catch {
    return "";
  }
};
let projects = [],
  filter = "todos";
function card(p) {
  return `<a class="work-card" href="/proyectos/${encodeURIComponent(p.slug)}"><div class="work-photo"><img src="${safeImage(p.cover_image_url)}" alt="${esc(p.name)}" loading="lazy" decoding="async"></div><div class="work-meta"><span>${esc(labels[p.category] || p.category)}</span><span>${esc(p.year)}</span></div><h3>${esc(p.name)} <span aria-hidden="true">↗</span></h3></a>`;
}
function render() {
  const full = host.dataset.portfolio === "all";
  const items = projects.filter(
    (p) => filter === "todos" || p.category === filter,
  );
  host.innerHTML =
    (full
      ? `<nav class="work-filters" aria-label="Filtrar obras">${["todos", ...Object.keys(labels).filter((c) => projects.some((p) => p.category === c))].map((c) => `<button data-filter="${c}" aria-pressed="${filter === c}">${labels[c] || "Todas"}</button>`).join("")}</nav><p class="work-count" aria-live="polite">${items.length} proyectos</p>`
      : "") +
    `<div class="work-grid">${(full ? items : items.slice(0, 6)).map(card).join("")}</div>` +
    (items.length
      ? ""
      : "<p>No hay proyectos publicados en esta categoría.</p>");
  host.querySelectorAll("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      filter = b.dataset.filter;
      render();
      host.querySelector(`[data-filter="${filter}"]`).focus();
    }),
  );
}
function detail(p) {
  document.title = `${p.name} — Proyectos OMNIIOUS`;
  document.querySelector('meta[name="description"]').content =
    p.description || p.name;
  document.querySelector("link[rel=canonical]").href =
    location.origin + "/proyectos/" + encodeURIComponent(p.slug);
  const photos = [
    ...new Set([p.cover_image_url, ...p.gallery_urls].filter(Boolean)),
  ];
  host.innerHTML = `<a class="work-back" href="/proyectos">← Todas las obras</a><header class="work-heading"><p class="work-kicker">${esc(labels[p.category] || p.category)} · ${esc(p.year)}</p><h1>${esc(p.name)}</h1></header><img class="work-cover" src="${safeImage(p.cover_image_url)}" alt="${esc(p.name)}"><div class="work-info"><p>${esc(p.description)}</p><dl>${[
    ["Ubicación", p.location],
    ["Cliente", p.client],
    ["Arquitectura / colaboración", p.architect],
    [
      "Superficie",
      p.area_m2 ? Number(p.area_m2).toLocaleString("es-MX") + " m²" : "",
    ],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`)
    .join(
      "",
    )}</dl></div>${p.scope?.length ? `<p class="work-scope">${p.scope.map(esc).join(" · ")}</p>` : ""}<div class="work-gallery">${photos.map((s, i) => `<a href="${safeImage(s)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir fotografía ${i + 1} de ${esc(p.name)}"><img src="${safeImage(s)}" alt="${esc(p.name)} — imagen ${i + 1}" loading="lazy"></a>`).join("")}</div><a class="work-back" href="/#contacto">Conversemos sobre tu proyecto ↗</a>`;
}
async function load() {
  if (!host) return;
  try {
    const slug =
      host.dataset.portfolio === "detail"
        ? decodeURIComponent(
            location.pathname.split("/").filter(Boolean)[1] || "",
          )
        : null;
    const params = new URLSearchParams({
      select:
        "slug,name,category,location,year,area_m2,client,architect,description,scope,cover_image_url,gallery_urls",
      published: "eq.true",
      order: "display_order.asc,name.asc",
    });
    if (slug) params.set("slug", "eq." + slug);
    const response = await fetch(`${url}/rest/v1/projects?${params}`, {
      headers: { apikey: key },
      cache: "no-store",
    });
    if (!response.ok) throw new Error("No se pudo cargar");
    projects = await response.json();
    if (slug) {
      if (projects[0]) detail(projects[0]);
      else
        host.innerHTML =
          '<h1>Proyecto no disponible</h1><p>Este proyecto no está publicado.</p><a href="/proyectos">Ver todas las obras</a>';
    } else render();
  } catch {
    host.innerHTML =
      '<p>No pudimos cargar las obras en este momento.</p><button class="work-retry">Volver a intentar</button>';
    host.querySelector("button").onclick = load;
  }
}
load();
