// Carte AMIDOMAR — règles locales en rendu réel (TESTS_FONCTIONNELS.md §17.5)
//   node test_regles_locales_chromium.js   — Playwright requis
// Le WFS LIMTM du Shom est simulé (page.route) pour choisir le département ; ddtm-messages.json est servi avec le 83 en brouillon:false (le 56 est publié tel quel, v2.38).
// Captures : /tmp/amidomar_shot_*.png
const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
const SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
let numdep='83', ok=0,ko=0; const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(d?' — '+d:''));};
(async()=>{
 await new Promise(r=>srv.listen(8742,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.route('**/*', async route => {
   const u = route.request().url();
   if (u.startsWith('http://127.0.0.1:8742/')) {
     if (u.includes('ddtm-messages.json')) {
       const j = JSON.parse(fs.readFileSync(ROOT+'/data/ddtm-messages.json','utf8'));
       j.ddtm.forEach(f => { if (f.ddtm==='83') f.brouillon=false; });
       return route.fulfill({ status:200, contentType:'application/json', body: JSON.stringify(j) });
     }
     return route.continue();
   }
   if (u.includes('services.data.shom.fr') && u.includes('LIMTM')) {
     const filtre = decodeURIComponent(u);
     // la requête "au point" (INTERSECTS/zéro objet) vs DWITHIN : on renvoie de la terre seulement en DWITHIN
     if (/DWITHIN/.test(filtre)) return route.fulfill({ status:200, contentType:'application/json',
        body: JSON.stringify({ type:'FeatureCollection', features:[{ type:'Feature', properties:{ numdep } }] }) });
     return route.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ type:'FeatureCollection', features:[] }) });
   }
   return route.abort();
 });
 await page.goto('http://127.0.0.1:8742/index.html',{waitUntil:'load'});
 await page.waitForTimeout(2500);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 async function aller(txt){
   await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, txt, {delay:10});
   await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);
   return page.evaluate(()=>{
     const g=id=>document.getElementById(id);
     return { report: g('report-block').style.display, masque: g('report-masque').hidden, masqueTxt: g('report-masque').textContent,
              env: g('env-block').innerHTML.slice(0,4000), resume: g('coords-resume-coords').textContent, coords: g('coords-text').textContent };
   });
 }
 console.log('--- Var, hors zone (43.20, 6.70) ---');
 let e = await aller('43.20, 6.70');
 chk('bloc « à reporter » masqué', e.report==='none', e.report);
 chk('paragraphe de masquage visible, texte du 83', !e.masque && /Var ne délivre plus/.test(e.masqueTxt), e.masqueTxt.slice(0,80));
 chk('carte orange des règles locales présente', /env-carte--ddtm[" ]/.test(e.env) && !/ddtm-ok/.test(e.env));
 chk('barre réduite : pas de coordonnées', e.resume==='', e.resume);
 const rc = await page.evaluate(()=>{const r=document.getElementById('report-masque').getBoundingClientRect();return {h:r.height,bottom:r.bottom,win:innerHeight};});
 chk('paragraphe de masquage réellement rendu et dans la fenêtre', rc.h>0 && rc.bottom<=rc.win, JSON.stringify(rc));
 await page.screenshot({path:'/tmp/amidomar_shot_var_hors_zone.png'});
 console.log('--- Var, dans la zone 1 La Bouillabaisse (43.2678, 6.6228) ---');
 e = await aller('43.2678, 6.6228');
 chk('bloc « à reporter » visible', e.report!=='none', e.report);
 chk('paragraphe de masquage caché', e.masque===true);
 chk('carte verte (ddtm-ok)', /ddtm-ok/.test(e.env));
 chk('coordonnées affichées', /43\.2678/.test(e.coords), e.coords);
 await page.screenshot({path:'/tmp/amidomar_shot_var_en_zone.png'});
 numdep='56';
 console.log('--- Morbihan, hors zone, baie de Quiberon (47.50, -3.05) — v2.38 ---');
 e = await aller('47.50, -3.05');
 chk('56 : bloc « à reporter » masqué', e.report==='none', e.report);
 chk('56 : paragraphe de masquage, texte du 56', !e.masque && /Morbihan ne délivre plus/.test(e.masqueTxt), e.masqueTxt.slice(0,80));
 chk('56 : carte orange, liste des zones du Morbihan', /env-carte--ddtm[" ]/.test(e.env) && /Toutes les zones du Morbihan/.test(e.env));
 await page.screenshot({path:'/tmp/amidomar_shot_56_hors_zone.png'});
 console.log('--- Morbihan, dans Riantec — Stervins (hors ZMEL ; les 4 zones du Palais sont dans une ZMEL) ---');
 e = await aller('47.70703, -3.32736');
 chk('56 : bloc « à reporter » visible', e.report!=='none', e.report);
 chk('56 : carte verte, nom de la zone', /ddtm-ok/.test(e.env) && /Riantec — Stervins/.test(e.env));
 chk('56 : coordonnées affichées', /47\.707/.test(e.coords), e.coords);
 await page.screenshot({path:'/tmp/amidomar_shot_56_en_zone.png'});
 numdep='22';
 console.log('--- Côtes-d\'Armor, en mer (48.80, -3.00) ---');
 e = await aller('48.80, -3.00');
 chk('bloc « à reporter » masqué', e.report==='none', e.report);
 chk('paragraphe de masquage, texte du 22', !e.masque && /Côtes-d'Armor/.test(e.masqueTxt), e.masqueTxt.slice(0,80));
 await page.screenshot({path:'/tmp/amidomar_shot_22.png'});
 console.log('pageerror :', pe.length, pe.slice(0,3));
 console.log('RESULTAT visu : '+ok+' OK, '+ko+' ECHEC');
 await b.close(); srv.close();
})();
