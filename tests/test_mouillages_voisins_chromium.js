// Carte AMIDOMAR — place du bloc « Mouillages voisins » en rendu réel (TESTS_FONCTIONNELS.md §15, v2.34)
//   node test_mouillages_voisins_chromium.js   — Playwright requis
// Point : 43.2678, 6.6228 (Var, zone 1 La Bouillabaisse, AOT simulée à ~70 m).
// Réseau coupé sauf : LIMTM simulé (département 83) et, dans le cas « avec contexte »,
// nature du fond simulée (Sables) pour faire apparaître « Contexte environnemental ».
// Captures : /tmp/amidomar_voisins_*.png
const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
const SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
let ok=0,ko=0; const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(d?' — '+d:''));};
const FC=f=>JSON.stringify({type:'FeatureCollection',features:f});

async function cas(b, avecFond, nom){
  const page=await b.newPage({viewport:{width:1440,height:900}});
  const pe=[]; page.on('pageerror',e=>pe.push(e.message));
  await page.route('**/*', async route => {
    const u = route.request().url();
    if (u.startsWith('http://127.0.0.1:8744/')) return route.continue();
    if (avecFond && u.includes('natures_fond_50000'))
      return route.fulfill({status:200,contentType:'application/json',body:FC([{type:'Feature',properties:{typelem:'NFS'}}])});
    if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
      return route.fulfill({status:200,contentType:'application/json',
        body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
    return route.abort();
  });
  await page.goto('http://127.0.0.1:8744/index.html',{waitUntil:'load'});
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
  await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN,'43.2678, 6.6228',{delay:10});
  await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);
  const ordre = await page.evaluate(()=>[...document.getElementById('coords-contenu').querySelectorAll('h2.popup-section')]
      .filter(h=>h.offsetParent!==null).map(h=>h.textContent.trim()));
  console.log('   ordre :', ordre.join(' → '));
  const i=t=>ordre.findIndex(x=>x.startsWith(t));
  chk(nom+' : « Mouillages voisins » visible', i('Mouillages voisins')>=0);
  chk(nom+' : après « Règles locales »', i('Règles locales')>=0 && i('Règles locales')<i('Mouillages voisins'));
  if (avecFond) chk(nom+' : avant « Contexte environnemental »', i('Contexte environnemental')>i('Mouillages voisins'), ordre.join(' | '));
  chk(nom+' : avant « Ce que la carte n’a pas pu vérifier »', i('Ce que la carte')>i('Mouillages voisins'));
  const cls = await page.evaluate(()=>document.getElementById('proximite-block').className);
  chk(nom+' : bloc orange (jaune-box) tant que la longueur est vide', cls==='jaune-box', cls);
  await page.screenshot({path:'/tmp/amidomar_voisins_'+(avecFond?'contexte':'sans_contexte')+'.png'});
  chk(nom+' : aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
  await page.close();
}
(async()=>{
  await new Promise(r=>srv.listen(8744,r));
  const b=await chromium.launch();
  console.log('--- Avec contexte environnemental (nature du fond simulée) ---'); await cas(b,true,'avec contexte');
  console.log('--- Sans contexte établi ---');                               await cas(b,false,'sans contexte');
  console.log('RESULTAT §15 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
  await b.close(); srv.close();
})();
