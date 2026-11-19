// Carte AMIDOMAR — habitats sensibles de l'OFB au clic (TESTS_FONCTIONNELS.md §20, v2.39 ; points de vigilance v2.40)
//   node test_habitats_chromium.js   — Playwright requis
// Point : 43.2678, 6.6228 (Var). Réseau coupé sauf : LIMTM simulé (département 83)
// et WFS « habitat » de l'OFB simulé selon le cas :
//   - posidonie : la couche Nav&Co renvoie un polygone « Posidonie » avec le message OFB ;
//   - maërl + coralligène : les deux couches renvoient un objet ;
//   - rien : les trois couches répondent vide → aucune carte d'habitat ;
//   - panne : HTTP 500 → carte grise « vérification impossible », jamais de blocage.
// Vérifie aussi la légende : 4 cases « Habitats sensibles », l'ancienne couche Ifremer absente.
// Captures : /tmp/amidomar_habitats_*.png
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
const MSG_POSI='Posidonie : espèce protégée. Pour mouiller j’évite les zones sombres, j’ancre dans les zones sableuses.';
const URL_POSI='https://www.premar-mediterranee.gouv.fr/uploads/mediterranee/arretes/eec503812bac663e9c5536c6d5a59ee1.pdf';

function reponseOFB(cas, u){
  if (cas==='panne') return { status:500, body:'erreur' };
  const navco = u.includes('herbiers_emprise_simple'), maerl = u.includes('banc_maerl'), cora = u.includes('coralligene');
  if (cas==='posidonie' && navco)
    return { status:200, body: FC([{type:'Feature',properties:{herbier:'Posidonie',subtitle:MSG_POSI,url:URL_POSI}},
                                   {type:'Feature',properties:{herbier:'Posidonie',subtitle:MSG_POSI,url:URL_POSI}}]) };
  if (cas==='maerl_cora' && maerl) return { status:200, body: FC([{type:'Feature',properties:{legende:'Bancs de maërl'}}]) };
  if (cas==='maerl_cora' && cora)  return { status:200, body: FC([{type:'Feature',properties:{biocenose:'Coralligène'}}]) };
  return { status:200, body: FC([]) };
}

async function ouvrir(b, cas){
  const page=await b.newPage({viewport:{width:1440,height:900}});
  const pe=[]; page.on('pageerror',e=>pe.push(e.message));
  const requetesOFB=[];
  await page.route('**/*', async route => {
    const u = route.request().url();
    if (u.startsWith('http://127.0.0.1:8745/')) return route.continue();
    if (u.includes('wxs.ofb.fr/geoserver/habitat/wfs')) {
      requetesOFB.push(decodeURIComponent(u));
      const r = reponseOFB(cas, u);
      return route.fulfill({status:r.status,contentType:'application/json',body:r.body});
    }
    // v2.43 : sites oiseaux / phoques de l'OFB — vides ici (testés par test_faune_chromium.js).
    if (u.includes('wxs.ofb.fr/geoserver/usage/wfs'))
      return route.fulfill({status:200,contentType:'application/json',body:FC([])});
    if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
      return route.fulfill({status:200,contentType:'application/json',
        body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
    return route.abort();
  });
  await page.goto('http://127.0.0.1:8745/index.html',{waitUntil:'load'});
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
  return { page, pe, requetesOFB };
}

async function cliquer(page){
  await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN,'43.2678, 6.6228',{delay:10});
  await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);
  return page.evaluate(()=>{
    const env=document.getElementById('env-block');
    const vig = env.querySelector('.env-vigilance');
    return { classe: env.className,
             // v2.40 : les habitats sont des points de vigilance (nom + étiquette), un seul détail.
             points: [...env.querySelectorAll('.env-vig-item')].map(li=>({
               nom: li.querySelector('.env-vig-nom').childNodes[0].textContent.trim(),
               etiquette: li.querySelector('.env-vig-etiquette').textContent.trim() })),
             detail: vig ? vig.querySelector('.env-detail-bloc').innerHTML : '',
             detailCache: vig ? vig.querySelector('.env-detail-bloc').hidden : null,
             boutons: vig ? vig.querySelectorAll('button').length : 0,
             compte: (env.querySelector('h2.popup-section--vigilance .popup-compte')||{}).textContent || '',
             incertaines: [...env.querySelectorAll('.env-nonverif .env-carte')].map(c=>
               c.querySelector('.env-carte-resume').textContent.replace(/\s+/g,' ').trim()),   // textContent : la ligne est repliée
             nonverif: (env.querySelector('.env-nonverif > summary')||{}).textContent || '',
             coords: document.getElementById('report-block').style.display !== 'none' };
  });
}
const habitat = e => e.points.filter(p => /Herbier|maërl|Coralligène/.test(p.nom));

(async()=>{
  await new Promise(r=>srv.listen(8745,r));
  const b=await chromium.launch();

  console.log('--- Légende ---');
  { const { page, pe } = await ouvrir(b,'rien');
    const leg = await page.evaluate(()=>{
      const titres=[...document.querySelectorAll('.layer-group-title')];
      const t=titres.find(x=>x.textContent.trim()==='Habitats sensibles');
      const labels=[]; let n=t&&t.nextElementSibling;
      while(n && !n.classList.contains('layer-group-title')){ if(n.matches('label.layer-item')) labels.push(n.querySelector('.layer-label').textContent.trim()); n=n.nextElementSibling; }
      return { labels, coches:['zosteres','posidonie','maerl','coralligene'].map(i=>{const c=document.getElementById('tg-'+i);return c?c.checked:null;}) };
    });
    chk('4 cases « Habitats sensibles »', JSON.stringify(leg.labels)===JSON.stringify(
      ['Herbiers de zostères (2024)','Herbiers de posidonie (2022)','Bancs de maërl (2024)','Coralligène']), JSON.stringify(leg.labels));
    chk('les 4 cases sont décochées au chargement', leg.coches.every(c=>c===false), JSON.stringify(leg.coches));
    const html = fs.readFileSync(ROOT+'/index.html','utf8');
    chk("l'ancienne couche Ifremer n'est plus appelée", !/sextant\.ifremer\.fr/.test(html));
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Posidonie au point ---');
  { const { page, pe, requetesOFB } = await ouvrir(b,'posidonie');
    const e = await cliquer(page);
    const h = habitat(e);
    console.log('   points :', e.points.map(p=>p.nom+' ['+p.etiquette+']').join(' | '));
    chk('un seul point d\'habitat (deux polygones identiques → un message)', h.length===1, h.map(p=>p.nom).join(' | '));
    chk('le point nomme l\'habitat : « Herbier de posidonie » [Espèce protégée]', h[0] && h[0].nom==='Herbier de posidonie' && h[0].etiquette==='Espèce protégée', h[0]&&JSON.stringify(h[0]));
    chk('replié : détail caché, un seul bouton, compte dans l\'intitulé', e.detailCache===true && e.boutons===1 && e.compte===String(e.points.length), JSON.stringify([e.detailCache,e.boutons,e.compte]));
    chk('le détail cite le message OFB tel quel', e.detail.includes('Posidonie : espèce protégée. Pour mouiller j’évite les zones sombres'));
    chk("le détail renvoie à l'arrêté du préfet maritime", e.detail.includes(URL_POSI) && e.detail.includes('n°123/2019'));
    chk("l'avertissement « indicatif » est présent une seule fois", (e.detail.match(/il ne fait pas foi/g)||[]).length===1);
    chk('pas de blocage : bloc non rouge, coordonnées affichées', e.classe!=='env-rouge' && e.coords, e.classe);
    chk('3 couches OFB interrogées au point, champs limités',
        requetesOFB.length===3 && requetesOFB.every(u=>/propertyName=(herbier,subtitle,url|legende|biocenose)&/.test(u)), requetesOFB.length+' requêtes');
    chk('aucun nom d\'auteur demandé', requetesOFB.every(u=>!/auteur|validateur/.test(u)));
    await page.screenshot({path:'/tmp/amidomar_habitats_posidonie.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Maërl et coralligène au point ---');
  { const { page, pe } = await ouvrir(b,'maerl_cora');
    const e = await cliquer(page); const h = habitat(e);
    chk('deux points : Banc de maërl puis Coralligène, « Habitat fragile »', h.length===2 && h[0].nom==='Banc de maërl' && h[1].nom==='Coralligène'
        && h.every(p=>p.etiquette==='Habitat fragile'), h.map(p=>p.nom).join(' | '));
    chk('un seul avertissement « indicatif » pour les deux', (e.detail.match(/il ne fait pas foi/g)||[]).length===1);
    chk('pas de blocage', e.classe!=='env-rouge' && e.coords);
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Rien au point ---');
  { const { page, pe } = await ouvrir(b,'rien');
    const e = await cliquer(page);
    chk("aucun point d'habitat", habitat(e).length===0, e.points.map(p=>p.nom).join(' | '));
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- OFB en panne ---');
  { const { page, pe } = await ouvrir(b,'panne');
    const e = await cliquer(page); const h = habitat(e);
    chk('aucun point d\'habitat ; carte grise dans « Non vérifié ici »', h.length===0
        && e.incertaines.some(t=>/Herbiers et habitats fragiles : vérification impossible/.test(t)) && /Non vérifié ici/.test(e.nonverif), e.incertaines.join(' | '));
    chk('pas de blocage, coordonnées affichées', e.classe!=='env-rouge' && e.coords);
    await page.screenshot({path:'/tmp/amidomar_habitats_panne.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('RESULTAT §20 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
  await b.close(); srv.close();
})();
