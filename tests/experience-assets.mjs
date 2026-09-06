import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root = resolve('public/experiencia');
const script = readFileSync(resolve(root,'app.js'),'utf8');
const assets = [...new Set([...script.matchAll(/"(omniious-[^"\s]+\.(?:webp|svg))"/g)].map(m=>m[1]))];
assert.equal(assets.length,35,'Five sectors must each retain 3 photos and 4 technology layers');
for (const asset of assets) assert.ok(existsSync(resolve(root,'assets',asset)),asset);
assert.equal(assets.filter(a=>a.endsWith('.webp')).length,35, 'Use original photographic assets, including transparent technology layers');
for(const route of ['index.html','diseno-iluminacion/index.html','ingenieria-electrica/index.html','ingenieria-especiales/index.html']) {
 const html=readFileSync(resolve(root,route),'utf8');
 const base=new URL(html.match(/<base href="([^"]+)"/)[1],'https://www.omniious.com');
 for(const [,src] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const url=new URL(src,base);
  if(url.origin!==base.origin || !/\.(webp|svg|js|css)$/.test(url.pathname))continue;
  assert.ok(existsSync(resolve('public','.'+url.pathname)),`${route}: ${url.pathname}`);
 }
 if(route==='index.html')assert.equal((html.match(/id="project-tech-/g)||[]).length,4);
 if(route.startsWith('ingenieria-especiales'))assert.equal((html.match(/class="service-visual__tech /g)||[]).length,4);
}
console.log('PASS: 35 scene assets, 20 technology layers, and all local resources on 4 experience routes');
