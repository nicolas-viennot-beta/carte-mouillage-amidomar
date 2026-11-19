// Carte AMIDOMAR — interdiction au point sous le bandeau commun (TESTS_FONCTIONNELS.md §21.4, v2.48)
//   node test_interdit_chromium.js   — Playwright requis
// Réseau coupé sauf : LIMTM simulé (83) et WFS APB de la Géoplateforme simulé
// (un arrêté fictif « APB de test »). Deux points du Var :
//   - 43.2678, 6.6228 : dans la zone 1 (La Bouillabaisse), ouverte à tous → la
//     règle locale n'interdit pas, c'est l'APB qui donne la phrase du bandeau ;
//   - 43.045, 6.155 : hors zone → la règle locale prime, l'APB reste dessous.
// Les cultures marines suivent le même chemin de code (seuls les textes changent) :
// non simulées ici, le cadastre conchylicole est interrogé par département.
// Captures : /tmp/amidomar_interdit_*.png
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
const TITRE="Nouvelle demande d'autorisation impossible dans cette zone";
const PHRASE_APB='Vous êtes dans une zone protégée par arrêté de biotope.';

(async()=>{
 await new Promise(r=>srv.listen(8747,r));
 const b=await chromium.launch(); const page=await b.newPage({viewport:{width:1440,height:900}});
 const pe=[]; page.on('pageerror',e=>pe.push(e.message));
 await page.route('**/*', async route => {
   const u = route.request().url();
   if (u.startsWith('http://127.0.0.1:8747/')) return route.continue();
   if (decodeURIComponent(u).includes('patrinat_apb'))
     return route.fulfill({status:200,contentType:'application/json',
       body: FC([{type:'Feature',properties:{nom_site:'APB de test'}}])});
   if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
     return route.fulfill({status:200,contentType:'application/json',
       body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
   return route.abort();
 });
 await page.goto('http://127.0.0.1:8747/index.html',{waitUntil:'load'});
 await page.waitForTimeout(2500);
 await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
 const aller = async (txt) => { await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, txt, {delay:10});
   await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000); };
 const etat = () => page.evaluate(()=>{
   const p=document.getElementById('coords-popup'), e=document.getElementById('env-block');
   const vis = el => !!el && el.offsetParent !== null && el.getBoundingClientRect().height > 0;
   const v=e.querySelector('.env-verdict');
   return { classeBloc: e.className,
            verdict: v ? (/env-verdict--(\w+)/.exec(v.className)||[])[1] : '',
            titre: (e.querySelector('.env-verdict-titre')||{}).textContent || '',
            texte: (e.querySelector('.env-verdict-texte')||{}).textContent || '',
            lien: (e.querySelector('.env-verdict-lien')||{}).textContent || '',
            carteInterdit: vis(e.querySelector('.env-carte--interdit')),
            carteInterditTitre: ((e.querySelector('.env-carte--interdit .env-carte-resume strong'))||{}).textContent || '',
            carteDDTM: !!e.querySelector('.env-carte--ddtm, .env-carte--ddtm-ok, .env-carte--ddtm-pro'),
            ordre: [...e.children].map(c => c.className.split(' ')[0]).join(' > '),
            reportVisible: vis(document.getElementById('report-block')),
            marqueur: !!document.querySelector('.maplibregl-marker'),
            enVue: p.classList.contains('en-vue'),
            vueTitre: (e.querySelector('.env-vue-titre')||{}).textContent || '',
            vueRappel: (e.querySelector('.env-vue-rappel')||{}).textContent || '',
            detailVisible: vis(e.querySelector('.env-carte--interdit .env-detail-bloc')),
            detailTexte: ((e.querySelector('.env-carte--interdit .env-detail-bloc'))||{}).textContent || '',
            resume: (document.querySelector('#coords-resume .coords-resume-compte')||{}).textContent || '' };
 });

 console.log('--- §21.4a  Var, zone ouverte à tous + APB : l\'APB donne la phrase ---');
 await aller('43.2678, 6.6228');
 let s = await etat();
 chk('bandeau rouge, titre commun', s.verdict === 'non' && s.titre === TITRE, JSON.stringify(s));
 chk('phrase de l\'APB', s.texte === PHRASE_APB, s.texte);
 chk('lien « Voir le détail de la zone »', s.lien === 'Voir le détail de la zone', s.lien);
 chk('carte rouge « Arrêté de protection de biotope » sous le bandeau', s.carteInterdit && s.carteInterditTitre === 'Arrêté de protection de biotope', s.ordre);
 chk('pas de carte de règle locale (elle n\'interdit pas ici)', !s.carteDDTM, s.ordre);
 chk('pas de coordonnées ni de marqueur', !s.reportVisible && !s.marqueur);
 await page.screenshot({path:'/tmp/amidomar_interdit_zone.png'});
 await page.locator('#env-block .env-verdict-lien').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('le lien ouvre la vue détail de l\'interdiction', s.enVue && s.detailVisible && s.vueTitre === 'Arrêté de protection de biotope', JSON.stringify({enVue:s.enVue,detail:s.detailVisible,titre:s.vueTitre}));
 chk('rappel « Votre emplacement : Nouvelle demande… »', s.vueRappel === 'Votre emplacement : ' + TITRE, s.vueRappel);
 chk('le détail nomme l\'arrêté et garde le texte d\'avant', s.detailTexte.includes('APB de test') && s.detailTexte.includes('interdite au mouillage'), s.detailTexte);
 await page.screenshot({path:'/tmp/amidomar_interdit_vue.png'});
 await page.locator('#env-block .env-vue-retour').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('retour à la synthèse', !s.enVue && !s.detailVisible);
 await page.locator('#env-block .env-carte--interdit .env-toggle-bloc').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('« Voir le détail » de la carte ouvre la même vue', s.enVue && s.vueTitre === 'Arrêté de protection de biotope');
 await page.locator('#env-block .env-vue-retour').click(); await page.waitForTimeout(300);

 console.log('--- §21.4b  Var, hors zone + APB : la règle locale prime ---');
 await aller('43.045, 6.155');
 s = await etat();
 chk('bandeau rouge, titre commun, phrase de la DDTM', s.verdict === 'non' && s.titre === TITRE
     && s.texte === 'Consultez les zones autorisées par la DDTM, ou les ZMEL et les ports sur la carte.', s.texte);
 chk('lien « Voir les règles locales »', s.lien === 'Voir les règles locales', s.lien);
 chk('carte de règle locale ET carte de l\'APB, dans cet ordre', s.carteDDTM && s.carteInterdit
     && s.ordre.indexOf('env-carte') < s.ordre.lastIndexOf('env-carte'), s.ordre);
 await page.screenshot({path:'/tmp/amidomar_interdit_horszone.png'});
 await page.locator('#env-block .env-verdict-lien').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('le lien ouvre la règle locale (pas l\'APB)', s.enVue && /^Zones autorisées|^Règles locales/.test(s.vueTitre), s.vueTitre);
 await page.locator('#env-block .env-vue-retour').click(); await page.waitForTimeout(300);

 console.log('--- §21.4c  Barre réduite ---');
 await page.locator('#coords-reduire').click(); await page.waitForTimeout(300);
 s = await etat();
 chk('barre réduite « Nouvelle demande impossible ici »', s.resume === 'Nouvelle demande impossible ici', s.resume);

 chk('aucune erreur JavaScript', pe.length === 0, pe.join(' | '));
 console.log('\nRESULTAT §21.4 : ' + ok + ' OK, ' + ko + ' ECHEC');
 await b.close(); srv.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
