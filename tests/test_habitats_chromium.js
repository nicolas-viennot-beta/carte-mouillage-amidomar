// Carte AMIDOMAR — habitats sensibles de l'OFB au clic (TESTS_FONCTIONNELS.md §20, v2.39)
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
    return { classe: env.className,
             cartes: [...env.querySelectorAll('.env-carte')].map(c=>({
               txt: c.querySelector('.env-carte-resume').innerText.replace(/\s+/g,' ').trim(),
               incertain: c.classList.contains('env-carte--incertain'),
               detail: (c.querySelector('.env-detail-bloc')||{}).innerHTML || '' })),
             coords: document.getElementById('report-block').style.display !== 'none' };
  });
}
const habitat = e => e.cartes.filter(c => /Zone fragile|habitats fragiles/.test(c.txt));

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
    console.log('   cartes :', e.cartes.map(c=>c.txt).join(' | '));
    chk('une seule carte d\'habitat (deux polygones identiques → un message)', h.length===1, h.map(c=>c.txt).join(' | '));
    chk('titre et consigne reprennent l\'OFB', h[0] && /Zone fragile : vigilance mouillage — herbier de posidonie/.test(h[0].txt)
        && /évitez les zones sombres, ancrez dans le sable/.test(h[0].txt), h[0]&&h[0].txt);
    chk('le détail cite le message OFB tel quel', h[0] && h[0].detail.includes('Posidonie : espèce protégée. Pour mouiller j’évite les zones sombres'));
    chk("le détail renvoie à l'arrêté du préfet maritime", h[0] && h[0].detail.includes(URL_POSI) && h[0].detail.includes('n°123/2019'));
    chk("l'avertissement « indicatif » est présent", h[0] && h[0].detail.includes('il ne fait pas foi'));
    chk('pas de blocage : bloc non rouge, coordonnées affichées', e.classe!=='env-rouge' && e.coords, e.classe);
    chk('carte rangée dans « Contexte environnemental » (pas incertaine)', h[0] && !h[0].incertain);
    chk('3 couches OFB interrogées au point, champs limités',
        requetesOFB.length===3 && requetesOFB.every(u=>/propertyName=(herbier,subtitle,url|legende|biocenose)&/.test(u)), requetesOFB.length+' requêtes');
    chk('aucun nom d\'auteur demandé', requetesOFB.every(u=>!/auteur|validateur/.test(u)));
    await page.screenshot({path:'/tmp/amidomar_habitats_posidonie.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Maërl et coralligène au point ---');
  { const { page, pe } = await ouvrir(b,'maerl_cora');
    const e = await cliquer(page); const h = habitat(e);
    chk('deux cartes : maërl puis coralligène', h.length===2 && /banc de maërl/.test(h[0].txt) && /coralligène/.test(h[1].txt), h.map(c=>c.txt).join(' | '));
    chk('pas de blocage', e.classe!=='env-rouge' && e.coords);
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Rien au point ---');
  { const { page, pe } = await ouvrir(b,'rien');
    const e = await cliquer(page);
    chk("aucune carte d'habitat", habitat(e).length===0, e.cartes.map(c=>c.txt).join(' | '));
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- OFB en panne ---');
  { const { page, pe } = await ouvrir(b,'panne');
    const e = await cliquer(page); const h = habitat(e);
    chk('une carte grise « vérification impossible »', h.length===1 && h[0].incertain && /vérification impossible/.test(h[0].txt), h.map(c=>c.txt).join(' | '));
    chk('pas de blocage, coordonnées affichées', e.classe!=='env-rouge' && e.coords);
    await page.screenshot({path:'/tmp/amidomar_habitats_panne.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('RESULTAT §20 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
  await b.close(); srv.close();
})();
