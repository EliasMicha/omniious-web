import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const home=readFileSync('dist/index.html','utf8');
assert.ok(home.includes('class="landing-hero"'));
assert.equal((home.match(/data-hero-image=/g)||[]).length,5);
for(const [route,type] of [['iluminacion','lighting'],['electrica','electrical'],['instalaciones-especiales','specials']]){
 const html=readFileSync(`dist/${route}/index.html`,'utf8');
 assert.ok(html.includes(`data-service="${type}"`));
 assert.ok(html.includes(`rel="canonical" href="https://www.omniious.com/${route}"`));
 assert.ok(html.includes('class="brand" href="/"'));
 assert.equal((html.match(/class="service-chapter(?: |")/g)||[]).length,7);
}
assert.ok(readFileSync('dist/app-shell.html','utf8').includes('/admin-app.js'));
for(const [,url] of home.matchAll(/(?:src|href)="(\/experiencia\/[^"?]+)(?:\?[^" ]*)?"/g)){
 if(/\.(css|js|webp)$/.test(url))assert.ok(existsSync('dist'+url),url);
}
console.log('PASS: new home, three direct service pages, image paths, canonicals, and preserved admin shell');

const config=JSON.parse(readFileSync('vercel.json','utf8'));
for(const rule of config.rewrites){
 assert.ok(!config.cleanUrls || !rule.destination.endsWith('.html'),'Clean URL rewrite destinations must omit .html');
 assert.ok(existsSync('dist'+rule.destination+'.html'));
}
