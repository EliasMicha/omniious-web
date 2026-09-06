(async () => {
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const results = [];
  for (const project of ['residencial','hoteleria','corporativo','comercial','edificios']) {
    document.querySelector(`[data-project="${project}"]`).click();
    await pause(700);

    for (const scene of [0,1,2,3,4,5,6,7,8,6,4,2,0]) {
      document.querySelector(`.chapter[data-scene="${scene}"]`).scrollIntoView({behavior:"instant",block:"center"});
      await pause(450);
      const stage = document.querySelector('#stage');
      const bad = [...document.querySelectorAll('img[id^=project-]')].filter(i => !i.naturalWidth);
      const layer = ({3:'audio',4:'network',5:'security',6:'shades'})[scene];
      const opacity = layer ? Number(getComputedStyle(document.querySelector(`#project-tech-${layer}`)).opacity) : null;
      if (stage.dataset.scene !== String(scene) || bad.length || (layer && opacity < .95)) {
        throw new Error(JSON.stringify({project,scene,active:stage.dataset.scene,bad:bad.map(i=>i.src),opacity}));
      }
      results.push(`${project}:${scene}`);
    }
  }
  return {passed:results.length, images:[...document.images].length, horizontalOverflow:document.documentElement.scrollWidth>innerWidth};
})()
