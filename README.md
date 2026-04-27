# omniious-web

Sitio público de **omniious.com**. React + Vite + TypeScript + Supabase, deploy en Vercel.

## Estructura

```
src/
├── components/   Nav, Hero, Nosotros, Soluciones, Proyectos, Marcas, Clientes, Contacto, WhatsAppButton, Logo, Ficha
├── pages/        Home, ProjectDetail, AdminLogin, AdminPanel
├── lib/          supabase.ts (cliente), types.ts
└── styles/       global.css (sistema visual completo)
```

## Rutas

- `/` — Home one-pager (anchors a #nosotros, #soluciones, #proyectos, #marcas, #contacto)
- `/proyectos/:slug` — Detalle de cada proyecto con galería
- `/admin` — Login Supabase Auth
- `/admin/panel` — CRUD de proyectos (crear, editar, subir fotos, publicar/ocultar)

## Setup local

```bash
npm install
cp .env.example .env.local
# editar .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm run dev
```

Para deploy ver `DEPLOY.md`.

## Sistema visual

- Paleta crema/negro (`--cream: #EDE6DA`, `--ink: #15130F`)
- Tipografía: Fraunces (serif editorial) para headers, Inter para body
- Numeración romana, líneas finas estilo ficha técnica, mucho aire
- Mobile breakpoint: 900px
