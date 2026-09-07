/**
 * Genera sitemap.xml, robots.txt, llms.txt y 404.html desde la lista única
 * de rutas (src/lib/static-routes.ts). Corre después del build.
 */
import { writeFileSync, readFileSync, existsSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = 'https://www.omniious.com';
const OUT = resolve('dist');

const src = readFileSync(resolve('src/lib/static-routes.ts'), 'utf8');
const routes = [...src.matchAll(/'(\/[^']*)'/g)].map(m => m[1]);
routes.push('/experiencia', '/proyectos');
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : '0.9');

writeFileSync(resolve(OUT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${BASE}${r}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority(r)}</priority></url>`).join('\n')}
</urlset>
`);

writeFileSync(resolve(OUT, 'robots.txt'),
`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

Sitemap: ${BASE}/sitemap.xml
`);

writeFileSync(resolve(OUT, 'llms.txt'),
`# OMNIIOUS

> Diseno, instalacion y construccion de iluminacion arquitectonica, ingenieria
> electrica e instalaciones especiales. Ciudad de Mexico, desde 2019.
> Razon social: OMM Technologies SA de CV.

## Que hacemos
- Diseno de iluminacion arquitectonica: calculo de niveles, especificacion de
  luminarias, planos de reflejado, diseno de escenas.
- Ingenieria electrica: proyecto ejecutivo, memorias de calculo, planos,
  instalacion y puesta en marcha.
- Instalaciones especiales: audio, redes y WiFi, CCTV, control de acceso,
  deteccion de incendio, automatizacion y BMS.
- Control de iluminacion Lutron.

## Certificaciones
- Lutron: HomeWorks QS, Athena, Vive, RadioRA 3, myRoom.
- Honeywell: Notifier y Fire-Lite en deteccion y alarma contra incendio.
  No realizamos proteccion contra incendio hidraulica (rociadores, hidrantes, bombas).
- Protocolos de control: DALI y atenuacion por fase.

## Cobertura
Ciudad de Mexico y zona metropolitana. Tambien Valle de Bravo, Cancun y
Riviera Maya, Los Cabos y Puerto Vallarta.

## Paginas
${routes.map(r => `- ${BASE}${r}`).join('\n')}

## Contacto
elias@omniious.com | +52 55 5501 1014
`);

const from = resolve(OUT, '404/index.html');
if (existsSync(from)) {
  copyFileSync(from, resolve(OUT, '404.html'));
  console.log('[gen-static] 404.html copiado para Vercel');
}
console.log(`[gen-static] sitemap.xml (${routes.length} rutas), robots.txt y llms.txt generados`);
