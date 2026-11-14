// Carte AMIDOMAR — liste des zones rangée Secteur → Commune → Zone, rendu réel (TESTS_FONCTIONNELS.md §19.2)
//   node test_zones_secteurs_chromium.js   — Playwright requis
// Shom LIMTM simulé (page.route) : le point est rattaché au 83. Réseau externe coupé.
// Captures : /tmp/amidomar_shot_secteurs_*.png
const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
const SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
let ok=0,ko=0; const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(d?' — '+d:''));};
(async()=>{
 await new Promise(r=>srv.listen(8743,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.route('**/*', async route => {
   const u = route.request().url();
   if (u.startsWith('http://127.0.0.1:8743/')) return route.continue();
   if (u.includes('services.data.shom.fr') && u.includes('LIMTM')) {
     if (/DWITHIN/.test(decodeURIComponent(u))) return route.fulfill({ status:200, contentType:'application/json',
        body: JSON.stringify({ type:'FeatureCollection', features:[{ type:'Feature', properties:{ numdep:'83' } }] }) });
     return route.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ type:'FeatureCollection', features:[] }) });
   }
   return route.abort();
 });
 await page.goto('http://127.0.0.1:8743/index.html',{waitUntil:'load'});
 await page.waitForTimeout(2500);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, '43.045, 6.155', {delay:10});
 await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);

 const carte = page.locator('#env-block .env-carte--ddtm').first();
 chk('carte orange du Var présente', await carte.count() === 1);
 chk('nouveau titre affiché', /délivre de nouvelles AOT de mouillage individuel uniquement/.test(await carte.innerText()));
 await carte.locator('.env-toggle-bloc').click();
 await page.waitForTimeout(300);
 const st = await page.evaluate(()=>{
   const e=document.getElementById('env-block');
   const secteurs=[...e.querySelectorAll('details.env-secteur')];
   return { nSect: secteurs.length, ouverts: secteurs.filter(d=>d.open).length,
            proches: [...e.querySelectorAll('.env-liste--proches li')].map(li=>li.innerText.replace(/\s+/g,' ')),
            hProches: (e.querySelector('.env-liste--proches')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height,
            texte: e.innerText };
 });
 chk('deux secteurs, tous repliés', st.nSect===2 && st.ouverts===0, JSON.stringify({n:st.nSect,o:st.ouverts}));
 chk('3 zones proches rendues (hauteur > 0)', st.proches.length===3 && st.hProches>0, st.proches.join(' | '));
 chk('« unités » absent du panneau', !/unités/.test(st.texte));
 chk('« Zones connues à ce jour » absent (doublon retiré)', !/Zones connues/.test(st.texte));
 await page.screenshot({path:'/tmp/amidomar_shot_secteurs_replies.png'});

 await page.locator('#env-block details.env-secteur > summary').first().click();
 await page.locator('#env-block details.env-commune > summary', { hasText: 'Hyères' }).click();
 await page.waitForTimeout(300);
 const ouv = await page.evaluate(()=>{
   const e=document.getElementById('env-block');
   const h=[...e.querySelectorAll('details.env-commune')].find(d=>d.querySelector('summary').innerText.includes('Hyères'));
   return { open: !!(h&&h.open), n: h ? h.querySelectorAll('.env-zone-lien').length : 0,
            hauteur: h ? h.querySelector('ul').getBoundingClientRect().height : 0 };
 });
 chk('Hyères dépliée au clic : 10 zones visibles', ouv.open && ouv.n===10 && ouv.hauteur>0, JSON.stringify(ouv));
 await page.locator('#env-block .env-commune[open]').screenshot({path:'/tmp/amidomar_shot_secteurs_hyeres.png'}).catch(()=>{});
 await page.screenshot({path:'/tmp/amidomar_shot_secteurs_ouvert.png'});

 const avant = await page.evaluate(()=>JSON.stringify(window.__mapCentre||null));
 const btn = page.locator('#env-block details.env-commune[open] .env-zone-lien').first();
 await btn.click(); await page.waitForTimeout(800);
 const toujours = await page.evaluate(()=>[...document.querySelectorAll('#env-block details.env-commune')].some(d=>d.open));
 chk('clic sur un nom de zone : la liste reste ouverte (on enchaîne les zones)', toujours);
 const prochesBtn = page.locator('#env-block .env-liste--proches .env-zone-lien').first();
 await prochesBtn.click(); await page.waitForTimeout(500);
 chk('clic sur une zone proche : aucune exception', pe.length===0, pe.slice(0,2).join(' / '));
 console.log('pageerror :', pe.length, pe.slice(0,3));
 console.log('RESULTAT §19.2 : '+ok+' OK, '+ko+' ECHEC');
 await b.close(); srv.close(); process.exit(ko?1:0);
})();
