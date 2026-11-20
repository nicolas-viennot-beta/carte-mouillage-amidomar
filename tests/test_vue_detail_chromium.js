// Carte AMIDOMAR — vue détail avec retour (TESTS_FONCTIONNELS.md §22, v2.44 ; §22.6 panneau fixe, v2.49)
//   node test_vue_detail_chromium.js   — Playwright requis
// Point : 43.045, 6.155 (Var, hors zone, à l'est de Giens). Réseau coupé sauf :
// LIMTM simulé (83) et WFS « habitat » de l'OFB simulé (un herbier de posidonie),
// pour avoir à la fois la règle locale et un point de vigilance.
// Captures : /tmp/amidomar_vue_*.png
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
const RETOUR="← Retour à la synthèse de l'emplacement";

(async()=>{
 await new Promise(r=>srv.listen(8746,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.route('**/*', async route => {
   const u = route.request().url();
   if (u.startsWith('http://127.0.0.1:8746/')) return route.continue();
   if (u.includes('wxs.ofb.fr/geoserver/habitat/wfs'))
     return route.fulfill({status:200,contentType:'application/json', body: u.includes('herbiers_emprise_simple')
       ? FC([{type:'Feature',properties:{herbier:'Posidonie',subtitle:'Posidonie : espèce protégée. Pour mouiller j’évite les zones sombres, j’ancre dans les zones sableuses.',url:''}}]) : FC([])});
   if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
     return route.fulfill({status:200,contentType:'application/json',
       body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
   return route.abort();
 });
 await page.goto('http://127.0.0.1:8746/index.html',{waitUntil:'load'});
 await page.waitForTimeout(2500);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 const aller = async (txt) => { await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, txt, {delay:10});
   await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000); };
 const etat = () => page.evaluate(()=>{
   const p=document.getElementById('coords-popup'), e=document.getElementById('env-block');
   const vis = el => !!el && el.offsetParent !== null && el.getBoundingClientRect().height > 0;
   return { enVue: p.classList.contains('en-vue'),
            retour: (e.querySelector('.env-vue-retour')||{}).textContent || '',
            rappel: (e.querySelector('.env-vue-rappel')||{}).textContent || '',
            titre: (e.querySelector('.env-vue-titre')||{}).textContent || '',
            vigilanceVisible: vis(e.querySelector('h2.popup-section--vigilance')),
            reglesVisible: vis(e.querySelector('h2.popup-section--regles')),
            verdictVisible: vis(e.querySelector('.env-verdict')),
            reportVisible: vis(document.getElementById('report-block')),
            listeZonesVisible: vis(e.querySelector('.env-liste--proches')),
            detailVigVisible: vis(e.querySelector('.env-vigilance .env-detail-bloc')),
            focus: document.activeElement ? (document.activeElement.className + '|' + document.activeElement.textContent.trim()).slice(0,80) : '',
            defil: p.scrollTop,
            haut: Math.round(p.getBoundingClientRect().top), hauteur: Math.round(p.getBoundingClientRect().height),
            glisse: e.className };
 });

 await aller('43.045, 6.155');
 console.log('--- §22.1  Synthèse ---');
 let s = await etat();
 const cadre0 = {haut:s.haut, hauteur:s.hauteur};
 chk('synthèse : pas en vue détail, verdict, règles, vigilance et « À reporter » visibles',
     !s.enVue && s.verdictVisible && s.reglesVisible && s.vigilanceVisible && s.reportVisible, JSON.stringify(s));
 const lib = await page.evaluate(()=>getComputedStyle(document.querySelector('.env-carte--ddtm .env-toggle-bloc'),'::after').content);
 chk('le bouton « Voir les zones » porte un chevron', /›/.test(lib), lib);

 console.log('--- §22.2  Vue « Voir les zones » ---');
 await page.evaluate(()=>{ const p=document.getElementById('coords-popup'); p.scrollTop = 40; });
 const defilAvant = (await etat()).defil;
 await page.locator('#env-block .env-carte--ddtm .env-toggle-bloc').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('vue ouverte, lien de retour au libellé choisi', s.enVue && s.retour === RETOUR, s.retour);
 chk('rappel du verdict « Votre emplacement : Nouvelle demande d\'autorisation impossible… » (v2.48)', /^Votre emplacement : Nouvelle demande d'autorisation impossible/.test(s.rappel), s.rappel);
 chk('titre « Zones autorisées — Var (83) »', s.titre === 'Zones autorisées — Var (83)', s.titre);
 chk('la liste des zones est visible ; vigilance, verdict, « À reporter » masqués',
     s.listeZonesVisible && !s.vigilanceVisible && !s.verdictVisible && !s.reportVisible, JSON.stringify(s));
 chk('le focus est sur le lien de retour', s.focus.includes('env-vue-retour'), s.focus);
 chk('§22.6 ordinateur : le panneau ne bouge pas en ouvrant la vue (bord haut et hauteur identiques)', s.haut === cadre0.haut && s.hauteur === cadre0.hauteur, JSON.stringify({avant:cadre0, apres:{haut:s.haut,hauteur:s.hauteur}}));
 chk('§22.6 ordinateur : le panneau s\'arrête sous la recherche', await page.evaluate(()=>document.getElementById('coords-popup').getBoundingClientRect().top >= document.querySelector('.cartefacile-ctrl-search').getBoundingClientRect().bottom));
 await page.screenshot({path:'/tmp/amidomar_vue_zones.png'});
 await page.locator('#env-block .env-liste--proches .env-zone-lien').first().click(); await page.waitForTimeout(700);
 chk('clic sur une zone : on reste dans la vue (on enchaîne les zones)', (await etat()).enVue);

 console.log('--- §22.3  Retour ---');
 await page.locator('#env-block .env-vue-retour').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('retour : synthèse rétablie, lien de retour disparu', !s.enVue && !s.retour && s.vigilanceVisible && s.reportVisible, JSON.stringify(s));
 chk('§22.6 ordinateur : le panneau ne bouge pas au retour', s.haut === cadre0.haut && s.hauteur === cadre0.hauteur, JSON.stringify({haut:s.haut,hauteur:s.hauteur}));
 chk('retour : défilement rétabli et focus sur « Voir les zones »', s.defil === defilAvant && /Voir les zones/.test(s.focus), s.defil+' / '+defilAvant+' / '+s.focus);

 console.log('--- §22.4  Vue « Ce que ça implique » et Échap ---');
 await page.locator('#env-block .env-vigilance .env-toggle-bloc').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('vue vigilance : titre « Points de vigilance (1) », détail visible, règles masquées',
     s.enVue && s.titre === 'Points de vigilance (1)' && s.detailVigVisible && !s.reglesVisible, JSON.stringify(s));
 chk('le détail porte l\'étiquette du point', await page.evaluate(()=>/Espèce protégée/.test(document.querySelector('.env-vigilance .env-detail-bloc').textContent)));
 await page.screenshot({path:'/tmp/amidomar_vue_vigilance.png'});
 await page.keyboard.press('Escape'); await page.waitForTimeout(300);
 s = await etat();
 chk('Échap ramène à la synthèse (le point n\'est pas effacé)', !s.enVue && await page.evaluate(()=>document.getElementById('coords-popup').classList.contains('visible')), JSON.stringify(s));
 chk('Échap : focus sur « Ce que ça implique »', /Ce que ça implique/.test(s.focus), s.focus);

 console.log('--- §22.5  Bandeau et nouveau clic ---');
 await page.locator('#env-block .env-verdict-lien').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('« Voir les règles locales » ouvre la même vue', s.enVue && s.titre === 'Zones autorisées — Var (83)', s.titre);
 await aller('43.2678, 6.6228');
 s = await etat();
 chk('un nouvel emplacement ferme la vue', !s.enVue && !s.retour && s.reglesVisible, JSON.stringify(s));

 console.log('--- §22.6  Téléphone : volet de hauteur fixe, détail qui glisse ---');
 await page.setViewportSize({width:390, height:844}); await page.waitForTimeout(1600);
 await aller('43.045, 6.155');
 s = await etat(); const tel0 = {haut:s.haut, hauteur:s.hauteur};
 chk('téléphone : volet à 60 % de l\'écran au plus', s.hauteur > 0 && s.hauteur <= Math.round(844*0.6)+1, s.hauteur+' px');
 await page.locator('#env-block .env-vigilance .env-toggle-bloc').click(); await page.waitForTimeout(60);
 s = await etat();
 const anim = await page.evaluate(()=>getComputedStyle(document.getElementById('env-block')).animationName);
 chk('téléphone : le détail glisse depuis la droite', /glisse-entree/.test(s.glisse) && anim === 'env-glisse-entree', s.glisse+' / '+anim);
 chk('téléphone : le volet ne bouge pas en ouvrant le détail', s.haut === tel0.haut && s.hauteur === tel0.hauteur, JSON.stringify({avant:tel0, apres:{haut:s.haut,hauteur:s.hauteur}}));
 await page.waitForTimeout(400);
 await page.screenshot({path:'/tmp/amidomar_vue_telephone.png'});
 await page.locator('#env-block .env-vue-retour').click(); await page.waitForTimeout(60);
 s = await etat();
 chk('téléphone : la synthèse revient depuis la gauche, volet immobile', /glisse-retour/.test(s.glisse) && s.haut === tel0.haut && s.hauteur === tel0.hauteur, s.glisse+' '+JSON.stringify({haut:s.haut,hauteur:s.hauteur}));

 chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
 console.log('RESULTAT §22 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
 await b.close(); srv.close(); process.exit(ko?1:0);
})();
