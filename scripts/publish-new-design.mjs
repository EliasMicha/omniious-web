import {copyFileSync,mkdirSync} from 'node:fs';
// Keep the React entry for admin and project details before installing the approved public design.
copyFileSync('dist/index.html','dist/app-shell.html');
copyFileSync('src/static/home.html','dist/index.html');
for(const [process,route] of Object.entries({'diseno-iluminacion':'iluminacion','ingenieria-electrica':'electrica','ingenieria-especiales':'instalaciones-especiales'})) {
  mkdirSync(`dist/${route}`,{recursive:true});
  copyFileSync(`public/experiencia/${process}/index.html`,`dist/${route}/index.html`);
}
console.log('Published the approved design at /, /iluminacion, /electrica and /instalaciones-especiales');
