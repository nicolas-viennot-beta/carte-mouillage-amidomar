// Carte AMIDOMAR — boutons de carte en bas à droite sur ordinateur (TESTS_FONCTIONNELS.md §24, v2.49)
//   node test_outils_carte_chromium.js   — Playwright requis
// Réseau coupé sauf LIMTM simulé (83). Point 43.045, 6.155 (Var, hors zone).
// Vérifie que le zoom, la boussole, « me localiser » et « ? » ne sont jamais
// recouverts : ni par le panneau du point (pleine hauteur à gauche depuis la
// v2.49), ni par la colonne « Couches affichées » dépliée, ni sur téléphone.
// Captures : /tmp/amidomar_outils_*.png
const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
const SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
let ok=0,ko=0; const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(c||!d?'':' — '+d));};
const FC=f=>JSON.stringify({type:'FeatureCollection',features:f});

(async()=>{
 await new Promise(r=>srv.listen(8748,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.route('**/*', async route => {
   const u = route.request().url();
   if (u.startsWith('http://127.0.0.1:8748/')) return route.continue();
   if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
     return route.fulfill({status:200,contentType:'application/json',
       body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
   return route.abort();
 });
 await page.goto('http://127.0.0.1:8748/index.html',{waitUntil:'load'});
 await page.waitForTimeout(2500);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 const aller = async (txt) => { await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, txt, {delay:10});
   await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(8000); };
 // Pour chaque bouton : coin MapLibre qui le contient, rectangle, et ce qui est
 // réellement dessiné en son centre (un bouton recouvert ne reçoit pas le clic).
 const etat = () => page.evaluate(()=>{
   const R = el => { const r = el.getBoundingClientRect(); return {l:Math.round(r.left), t:Math.round(r.top), r:Math.round(r.right), b:Math.round(r.bottom)}; };
   const boutons = { aide: document.getElementById('guide-rouvrir'),
     localiser: document.querySelector('.maplibregl-ctrl-geolocate'),
     zoom: document.querySelector('.maplibregl-ctrl-zoom-in') };
   const res = {};
   for (const [k, el] of Object.entries(boutons)) {
     if (!el) { res[k] = null; continue; }
     const r = el.getBoundingClientRect();
     const dessus = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
     res[k] = { coin: (el.closest('[class*="maplibregl-ctrl-top-"], [class*="maplibregl-ctrl-bottom-"]')||{className:''}).className.replace('maplibregl-ctrl-','').trim(),
                rect: R(el), libre: !!dessus && (dessus === el || el.contains(dessus)) };
   }
   const p = document.getElementById('coords-popup'), c = document.getElementById('panels-droite');
   res.popup = p.classList.contains('visible') ? R(p) : null;
   res.colonne = R(c);
   res.echelle = R(document.querySelector('.maplibregl-ctrl-scale'));
   res.guideOuvert = document.getElementById('guide').classList.contains('ouverte');
   return res;
 });
 const tousLibres = s => ['aide','localiser','zoom'].every(k => s[k] && s[k].libre);
 const chevauche = (a, z) => a && z && !(a.r <= z.l || a.l >= z.r || a.b <= z.t || a.t >= z.b);

 console.log('--- §24.1  Ordinateur : boutons en bas à droite ---');
 let s = await etat();
 chk('les trois boutons sont dans le coin bas droit', ['aide','localiser','zoom'].every(k => s[k] && s[k].coin === 'bottom-right'), JSON.stringify(s));
 chk('ordre de haut en bas : « ? », me localiser, zoom, puis l\'échelle',
     s.aide.rect.b <= s.localiser.rect.t && s.localiser.rect.b <= s.zoom.rect.t && s.zoom.rect.b <= s.echelle.t, JSON.stringify(s));
 chk('aucun bouton recouvert', tousLibres(s), JSON.stringify(s));
 await aller('43.045, 6.155');
 s = await etat();
 chk('point ouvert : le panneau est affiché et ne touche aucun bouton', s.popup && tousLibres(s)
     && !['aide','localiser','zoom'].some(k => chevauche(s[k].rect, s.popup)), JSON.stringify(s));
 await page.screenshot({path:'/tmp/amidomar_outils_ordinateur.png'});

 console.log('--- §24.2  Colonne « Couches affichées » dépliée ---');
 await page.click('#layer-panel .panel-header'); await page.waitForTimeout(400);
 s = await etat();
 const deplie = await page.evaluate(()=>document.querySelector('#layer-panel .panel-header').getAttribute('aria-expanded'));
 chk('colonne dépliée : les boutons passent à sa gauche, rien de recouvert',
     tousLibres(s) && ['aide','localiser','zoom'].every(k => s[k].rect.r <= s.colonne.l), 'déplié='+deplie+' '+JSON.stringify(s));
 await page.screenshot({path:'/tmp/amidomar_outils_couches.png'});
 await page.click('#layer-panel .panel-header'); await page.waitForTimeout(400);
 s = await etat();
 chk('colonne repliée : les boutons reviennent au bord droit', tousLibres(s) && s.zoom.rect.r > s.colonne.l, JSON.stringify(s));

 console.log('--- §24.3  Les boutons fonctionnent ---');
 const echelle = () => page.evaluate(()=>{const e=document.querySelector('.maplibregl-ctrl-scale');return e.textContent+'|'+e.style.width;});
 const eAvant = await echelle();
 await page.click('.maplibregl-ctrl-zoom-out'); await page.waitForTimeout(900);
 const eApres = await echelle();
 chk('le zoom − répond (l\'échelle change)', eApres !== eAvant, eAvant+' → '+eApres);
 await page.click('#guide-rouvrir'); await page.waitForTimeout(400);
 s = await etat();
 chk('« ? » rouvre le guide', s.guideOuvert);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();}); await page.waitForTimeout(300);

 console.log('--- §24.4  Téléphone : boutons en haut à gauche ---');
 await page.setViewportSize({width:390, height:844}); await page.waitForTimeout(1600);
 s = await etat();
 chk('les trois boutons sont dans le coin haut gauche', ['aide','localiser','zoom'].every(k => s[k] && s[k].coin === 'top-left'), JSON.stringify(s));
 chk('ordre de haut en bas : zoom, me localiser, « ? »', s.zoom.rect.b <= s.localiser.rect.t && s.localiser.rect.b <= s.aide.rect.t, JSON.stringify(s));
 chk('téléphone, point ouvert : le volet ne recouvre aucun bouton', s.popup && tousLibres(s), JSON.stringify(s));
 await page.screenshot({path:'/tmp/amidomar_outils_telephone.png'});
 await page.setViewportSize({width:1440, height:900}); await page.waitForTimeout(1600);
 s = await etat();
 chk('retour à l\'écran large : les boutons retournent en bas à droite', ['aide','localiser','zoom'].every(k => s[k] && s[k].coin === 'bottom-right') && tousLibres(s), JSON.stringify(s));

 chk('aucune erreur JavaScript', pe.length === 0, pe.join(' | '));
 console.log('\nRESULTAT §24 : ' + ok + ' OK, ' + ko + ' ECHEC');
 await b.close(); srv.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
