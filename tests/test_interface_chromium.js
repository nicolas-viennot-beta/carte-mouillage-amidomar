const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=require('path').resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
let ok=0,ko=0;
const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(d?' — '+d:''));};
const SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
(async()=>{
 await new Promise(r=>srv.listen(8741,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.goto('http://127.0.0.1:8741/index.html',{waitUntil:'load'});
 await page.waitForTimeout(3000);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 await page.waitForTimeout(400);

 const lireDeroulant = () => page.evaluate(s=>[...document.querySelectorAll(s)].map(e=>({
     txt:e.innerText.replace(/\s+/g,' ').trim(), cls:e.className })), SEL_R);
 async function taper(txt){
   const avant = JSON.stringify(await lireDeroulant());
   await page.fill(SEL_IN,'');
   await page.click(SEL_IN);
   await page.type(SEL_IN, txt, {delay:12});
   // attendre que le deroulant CHANGE : sinon on relit la reponse precedente
   let out=[];
   for (let i=0;i<24;i++){
     await page.waitForTimeout(250);
     out = await lireDeroulant();
     if (JSON.stringify(out) !== avant && out.length) break;
   }
   await page.waitForTimeout(250);
   return await lireDeroulant();
 }
 async function etatPopup(){ return page.evaluate(()=>{
   const p=document.getElementById('coords-popup');
   const g=id=>{const e=document.getElementById(id);return e?e.textContent.trim():null;};
   return {visible:p.classList.contains('visible'), terre:p.classList.contains('terre'),
           coords:g('coords-text'), hint:g('coords-hint')};});}
 const centre=await page.evaluate(()=>{const r=document.getElementById('map').getBoundingClientRect();
   return {x:Math.round(r.x+r.width/2), y:Math.round(r.y+r.height/2)};});

 // --- 5 : entrée GPS en tête, sous-titre, rien n'a bougé ---------------
 console.log('\n--- §10.5  Déroulant : entrée GPS en tête ---');
 const avant=await page.evaluate(()=>document.getElementById('coords-popup').className);
 let r=await taper('43.267710, 6.622611');
 chk('une entrée en première position', r.length>=1, r.length+' entrée(s)');
 chk('libellé « Point GPS — 43.267710, 6.622611 »', /Point GPS — 43\.267710, 6\.622611/.test(r[0]?r[0].txt:''), r[0]&&r[0].txt);
 chk("sous-titre 43°16.063'N 6°37.357'E", /43°16\.063'N\s*6°37\.357'E/.test(r[0]?r[0].txt:''), '');
 chk('classe --has-pin', /--has-pin/.test(r[0]?r[0].cls:''), r[0]&&r[0].cls);
 chk("rien n'a bougé sur la carte", (await page.evaluate(()=>document.getElementById('coords-popup').className))===avant, '');

 // --- 6 : sélection -----------------------------------------------------
 console.log('\n--- §10.6  Sélection : carte centrée, popup ouvert ---');
 await page.click(SEL_R); await page.waitForTimeout(6500);
 const e6=await etatPopup();
 chk('#coords-popup porte « visible »', e6.visible, JSON.stringify(e6));
 chk('le champ affiche « Point GPS — 43.267710, 6.622611 »',
   (await page.inputValue(SEL_IN))==='Point GPS — 43.267710, 6.622611', await page.inputValue(SEL_IN));
 chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));

 // --- 7 : variantes de saisie -------------------------------------------
 console.log('\n--- §10.7  Variantes de saisie dans l\'interface ---');
 const memePoint = t => { const m=/Point GPS — (-?\d+\.\d+), (-?\d+\.\d+)/.exec(t||'');
   return !!m && Math.abs(+m[1]-43.267710)<=2e-5 && Math.abs(+m[2]-6.622611)<=2e-5; };
 for (const s of ['43,267710, 6,622611', "43°16.063'N 6°37.357'E"]) {
   const rr=await taper(s);
   chk('« '+s+' » → même point (tolérance ~2 m)', memePoint(rr[0]?rr[0].txt:''), rr[0]&&rr[0].txt);
 }
 const rinv=await taper('6.622611, 43.267710');
 chk('« 6.622611, 43.267710 » → même point', /Point GPS — 43\.267710, 6\.622611/.test(rinv[0]?rinv[0].txt:''), rinv[0]&&rinv[0].txt);
 chk('… et message d\'inversion dans le sous-titre', /invers/i.test(rinv[0]?rinv[0].txt:''), rinv[0]&&rinv[0].txt);

 // --- 8 : équivalence clic rejoué / vrai clic ---------------------------
 console.log('\n--- §10.8  Équivalence clic synthétique / vrai clic ---');
 await taper('43.267710, 6.622611');
 await page.click(SEL_R); await page.waitForTimeout(6500);
 const parGps=await etatPopup();
 await page.evaluate(()=>{const f=document.getElementById('coords-fermer');if(f)f.click();});
 await page.waitForTimeout(600);
 await page.mouse.click(centre.x, centre.y); await page.waitForTimeout(6500);
 const parClic=await etatPopup();
 chk('état identique entre les deux gestes', JSON.stringify(parGps)===JSON.stringify(parClic),
     'gps='+JSON.stringify(parGps)+' clic='+JSON.stringify(parClic));

 // --- 9 : aide au format et absence de parasitage -----------------------
 console.log('\n--- §10.9  Aide au format, pas de parasitage ---');
 const r9=await taper('43.26');
 chk('« 43.26 » → entrée « Format attendu »', /Format attendu/i.test(r9.map(x=>x.txt).join(' ')), r9[0]&&r9[0].txt);
 await page.click(SEL_R); await page.waitForTimeout(800);
 chk('cliquer l\'aide laisse « 43.26 » dans le champ', (await page.inputValue(SEL_IN))==='43.26', await page.inputValue(SEL_IN));
 const r9b=await taper('Saint-Tropez');
 const j=r9b.map(x=>x.txt).join(' ');
 chk('« Saint-Tropez » : aucune entrée Point GPS ni Format attendu', !/Point GPS|Format attendu/i.test(j), j.slice(0,120));

 // --- 9bis : virgule indécidable dans l'interface -----------------------
 console.log('\n--- §10.9bis  Virgule indécidable dans l\'interface (v2.31) ---');
 const ra=await taper('43,16');
 const ta=ra[0]?ra[0].txt:'';
 chk('entrée « Écrivez 43.16 ou 43 16 — virgule ambiguë »', /Écrivez 43\.16 ou 43 16 — virgule ambiguë/.test(ta), ta);
 chk('pas de points de suspension (sous-titre non tronqué)', !/…|\.\.\./.test(ta), ta);
 chk('aucune entrée « Point GPS »', !/Point GPS/.test(ra.map(x=>x.txt).join(' ')), '');
 const cAvant=await page.evaluate(()=>{const m=document.getElementById('map');return m.style.cssText+'|'+document.getElementById('coords-popup').className;});
 await page.click(SEL_R); await page.waitForTimeout(1200);
 chk('cliquer laisse « 43,16 » dans le champ', (await page.inputValue(SEL_IN))==='43,16', await page.inputValue(SEL_IN));
 chk('la carte n\'a pas bougé', (await page.evaluate(()=>{const m=document.getElementById('map');return m.style.cssText+'|'+document.getElementById('coords-popup').className;}))===cAvant, '');
 const rb=await taper('43,267710 6,622611');
 chk('« 43,267710 6,622611 » → Point GPS', /Point GPS — 43\.267710, 6\.622611/.test(rb[0]?rb[0].txt:''), rb[0]&&rb[0].txt);

 console.log('\npageerror cumulées : '+pe.length);
 console.log('RESULTAT §10 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
 await b.close(); srv.close();
})();
