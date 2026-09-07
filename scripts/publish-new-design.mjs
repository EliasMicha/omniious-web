import { copyFileSync, mkdirSync } from "node:fs";
// Keep the React entry for admin and project details before installing the approved public design.
copyFileSync("dist/index.html", "dist/app-shell.html");
copyFileSync("src/static/home.html", "dist/index.html");
for (const [process, route] of Object.entries({
  "diseno-iluminacion": "iluminacion",
  "ingenieria-electrica": "electrica",
  "ingenieria-especiales": "instalaciones-especiales",
})) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync(
    `public/experiencia/${process}/index.html`,
    `dist/${route}/index.html`,
  );
}
console.log(
  "Published the approved design at /, /iluminacion, /electrica and /instalaciones-especiales",
);
// Public portfolio reads the same published records the administrator edits.
const { readFileSync, writeFileSync } = await import("node:fs");
const { loadEnv } = await import("vite");
const env = {
  ...loadEnv("production", process.cwd(), "VITE_"),
  ...process.env,
};
if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY)
  throw new Error("Missing public portfolio configuration");
writeFileSync(
  "dist/portfolio-config.js",
  `export const url=${JSON.stringify(env.VITE_SUPABASE_URL)};export const key=${JSON.stringify(env.VITE_SUPABASE_ANON_KEY)};\n`,
);
copyFileSync("src/static/projects.html", "dist/proyectos.html");
const detail = readFileSync("src/static/projects.html", "utf8")
  .replace(
    /<header class="work-heading" id="portfolio-heading">[\s\S]*?<\/header>/,
    "",
  )
  .replace('data-portfolio="all"', 'data-portfolio="detail"');
writeFileSync("dist/project-gallery.html", detail);
// Admin is a client-rendered app; hydrating a pre-rendered home on /admin causes React errors.
const { build } = await import("esbuild");
await build({
  entryPoints: ["src/admin-main.tsx"],
  outfile: "dist/admin-app.js",
  bundle: true,
  format: "esm",
  minify: true,
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": '"production"',
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
    "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
      env.VITE_SUPABASE_ANON_KEY,
    ),
  },
});
copyFileSync("src/static/admin.html", "dist/app-shell.html");
// Keep a single persistent contact shortcut on every public/admin HTML entry.
const {readdirSync}=await import('node:fs');
const whatsapp=readFileSync('src/static/whatsapp.html','utf8');
function addPersistentContact(directory){
  for(const entry of readdirSync(directory,{withFileTypes:true})){
    const path=`${directory}/${entry.name}`;
    if(entry.isDirectory())addPersistentContact(path);
    else if(entry.name.endsWith('.html')){
      let html=readFileSync(path,'utf8');
      if(!html.includes('href="/whatsapp.css'))html=html.replace('</head>','<link rel="stylesheet" href="/whatsapp.css?v=1" /></head>');
      if(!/class="[^\"]*(?:whatsapp-btn|omniious-whatsapp)/.test(html))html=html.replace('</body>',whatsapp+'</body>');
      writeFileSync(path,html);
    }
  }
}
addPersistentContact('dist');
