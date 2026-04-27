# Deploy a producción — omniious.com

> Tiempo total estimado: ~45 minutos. La mayoría es esperar a que GoDaddy propague DNS.

## FASE 1 — Infraestructura (~15 min)

### 1.1 Supabase (proyecto nuevo, separado del omm-erp)

1. Entrar a [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Nombre: `omniious-web`
3. Region: **East US (North Virginia)**
4. Password: genera una fuerte y guárdala en password manager
5. Esperar ~1-2 min a que se aprovisione
6. Settings → API: copiar **Project URL** y **anon/public key** (las pasas a Claude o las pegas en `.env.local`)

### 1.2 Schema + bucket

1. SQL Editor → New query → pegar el contenido de `supabase_schema.sql` → **Run**
2. Storage → **New bucket** → nombre `project-images` → activar **Public bucket** → Save
3. (El SQL ya creó las policies de storage que el bucket necesita)

### 1.3 Usuario admin

1. Authentication → Users → **Add user**
2. Email: `elias@omniious.com`
3. Password: ponle una fuerte
4. Marcar **Auto Confirm User: ON**
5. Save

### 1.4 Repo GitHub

1. github.com → **New repository**
2. Nombre: `omniious-web`
3. **Private**
4. Sin README, sin .gitignore (ya están en el repo local)
5. Crear

### 1.5 Vercel

1. vercel.com → **Add New → Project** → Import el repo `omniious-web`
2. Framework Preset: **Vite** (auto-detectado)
3. **Antes de hacer Deploy**, click en "Environment Variables":
   - `VITE_SUPABASE_URL` = (la del paso 1.1)
   - `VITE_SUPABASE_ANON_KEY` = (la del paso 1.1)
4. Deploy

## FASE 2 — Push del código

Desde la carpeta `omniious-web/`:

```bash
git init
git add .
git commit -m "Initial commit — omniious.com"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/omniious-web.git
git push -u origin main
```

Vercel detectará el push y desplegará automáticamente. La URL temporal será algo como `omniious-web-abc123.vercel.app`.

## FASE 3 — Dominio omniious.com (GoDaddy → Vercel)

### En Vercel

1. Project → Settings → Domains → **Add Domain**
2. Escribir `omniious.com` → Add
3. Repetir con `www.omniious.com`
4. Vercel te dirá los records que tienes que poner. Apunta:
   - `A` record para `@` → `76.76.21.21`
   - `CNAME` record para `www` → `cname.vercel-dns.com`

### En GoDaddy

1. dcc.godaddy.com → My Domains → omniious.com → **DNS**
2. Borrar los records `A` y `CNAME` actuales que apunten a parking de GoDaddy
3. Agregar los dos records que dio Vercel:
   - **Type: A** | **Name: @** | **Value: 76.76.21.21** | TTL: 600
   - **Type: CNAME** | **Name: www** | **Value: cname.vercel-dns.com** | TTL: 600
4. Save

DNS propaga en 5-30 min (a veces más en GoDaddy). Vercel emitirá certificado SSL automáticamente cuando vea los records.

## FASE 4 — Verificación

1. Ir a `https://omniious.com` → debe cargar la home con cream/negro
2. Click en cada proyecto → abre `/proyectos/<slug>` con datos del seed
3. Ir a `https://omniious.com/admin` → login con `elias@omniious.com`
4. Editar un proyecto → reemplazar `cover_image_url` con foto real (subir desde tu máquina)
5. Verificar que la home muestra la nueva foto

## Mantenimiento

### Subir un proyecto nuevo

`omniious.com/admin/panel` → **+ Nuevo proyecto** → llenar campos → subir imagen de portada → Crear.

### Esconder un proyecto temporalmente

Editar → Estado: **Oculto** → Guardar. Sigue en la DB pero no aparece en la home ni se puede abrir por URL pública.

### Reordenar proyectos

Cambiar el campo "Orden de despliegue" — menor número = aparece primero.

## Troubleshooting

**El admin dice "Faltan VITE_SUPABASE_URL"**: verificar env vars en Vercel y hacer redeploy (Settings → Deployments → ⋯ Redeploy).

**Las fotos no suben**: verificar que el bucket `project-images` exista y sea público en Supabase Storage.

**DNS no propaga**: usar `dig omniious.com` o `nslookup omniious.com` desde terminal — debe regresar `76.76.21.21`. Si después de 1h sigue mal, revisar que no haya un AAAA record viejo apuntando a IPv6 inválida.

**Build de Vercel falla con error de TypeScript**: correr `npm run build` localmente primero para ver el error completo.
