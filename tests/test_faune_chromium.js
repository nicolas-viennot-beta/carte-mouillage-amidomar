// Carte AMIDOMAR — sites sensibles pour les oiseaux et les phoques (OFB, Nav&Co) au clic
// (TESTS_FONCTIONNELS.md §20 bis, v2.43)
//   node test_faune_chromium.js   — Playwright requis
// Point : 43.2678, 6.6228 (même point que test_habitats_chromium.js). Réseau coupé sauf :
// LIMTM simulé (département 83), WFS « habitat » de l'OFB vide, WFS « usage » de l'OFB
// simulé selon le cas :
//   - oiseaux : deux polygones identiques (un seul point attendu), message sur deux lignes
//     avec un lien au format réel de l'OFB (attributs sans guillemets, <u>) ;
//   - phoques : gr_pho = « 1 », lien à la cible collée (`…la-reglementation_blank`) ;
//   - rien : réponse vide → aucun point ;
//   - panne : HTTP 500 → carte grise dans « Non vérifié ici », jamais de blocage.
// Captures : /tmp/amidomar_faune_*.png
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
const MSG_OIS="D’octobre à mars, des oiseaux hivernent. Soyons attentifs à leur présence.\n" +
  "Plus d’informations <a href=https://www.reservebaiedesaintbrieuc.com/phm/carte-des-activites target=_blank><u>ici.</u></a>";
const MSG_PHO="Ces îlots sont fréquentés toute l'année par les phoques. L’accès y est interdit.\n" +
  "La réglementation est <a href=https://parc-marin-iroise.fr/editorial/la-reglementation_blank><u>ici.</u></a> <script>alert(1)</script>";
const OIS={nom_site:'PETITE MER DE GAVRE',saison:'hiver',messa_sens:MSG_OIS,gr_pho:'0'};
const PHO={nom_site:'CHAUSSEE DE SEIN',saison:'été',messa_sens:MSG_PHO,gr_pho:'1'};

function reponseUsage(cas){
  if (cas==='panne') return { status:500, body:'erreur' };
  if (cas==='oiseaux') return { status:200, body: FC([{type:'Feature',properties:OIS},{type:'Feature',properties:OIS}]) };
  if (cas==='phoques') return { status:200, body: FC([{type:'Feature',properties:PHO}]) };
  return { status:200, body: FC([]) };
}

async function ouvrir(b, cas){
  const page=await b.newPage({viewport:{width:1440,height:900}});
  const pe=[]; page.on('pageerror',e=>pe.push(e.message));
  const dialogues=[]; page.on('dialog',d=>{dialogues.push(d.message()); d.dismiss();});
  const requetes=[];
  await page.route('**/*', async route => {
    const u = route.request().url();
    if (u.startsWith('http://127.0.0.1:8746/')) return route.continue();
    if (u.includes('wxs.ofb.fr/geoserver/usage/wfs')) {
      requetes.push(decodeURIComponent(u));
      const r = reponseUsage(cas);
      return route.fulfill({status:r.status,contentType:'application/json',body:r.body});
    }
    if (u.includes('wxs.ofb.fr/geoserver/habitat/wfs'))
      return route.fulfill({status:200,contentType:'application/json',body:FC([])});
    if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
      return route.fulfill({status:200,contentType:'application/json',
        body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:'83'}}]) : FC([])});
    return route.abort();
  });
  await page.goto('http://127.0.0.1:8746/index.html',{waitUntil:'load'});
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
  return { page, pe, requetes, dialogues };
}

async function cliquer(page){
  await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN,'43.2678, 6.6228',{delay:10});
  await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);
  return page.evaluate(()=>{
    const env=document.getElementById('env-block');
    const vig = env.querySelector('.env-vigilance');
    const bloc = vig ? vig.querySelector('.env-detail-bloc') : null;
    return { classe: env.className,
             points: [...env.querySelectorAll('.env-vig-item')].map(li=>({
               nom: li.querySelector('.env-vig-nom').childNodes[0].textContent.trim(),
               sous: (li.querySelector('.env-vig-sous')||{}).textContent || '',
               etiquette: li.querySelector('.env-vig-etiquette').textContent.trim() })),
             detail: bloc ? bloc.innerHTML : '',
             liens: bloc ? [...bloc.querySelectorAll('a')].map(a=>[a.getAttribute('href'),a.textContent,a.target,a.rel]) : [],
             scripts: bloc ? bloc.querySelectorAll('script,u').length : 0,
             incertaines: [...env.querySelectorAll('.env-nonverif .env-carte')].map(c=>
               c.querySelector('.env-carte-resume').textContent.replace(/\s+/g,' ').trim()),
             nonverif: (env.querySelector('.env-nonverif > summary')||{}).textContent || '',
             coords: document.getElementById('report-block').style.display !== 'none' };
  });
}
const faune = e => e.points.filter(p => /Site sensible/.test(p.nom));

(async()=>{
  await new Promise(r=>srv.listen(8746,r));
  const b=await chromium.launch();

  console.log('--- Oiseaux au point ---');
  { const { page, pe, requetes } = await ouvrir(b,'oiseaux');
    const e = await cliquer(page); const f = faune(e);
    console.log('   points :', e.points.map(p=>p.nom+' ['+p.etiquette+']').join(' | '));
    chk('un seul point (deux polygones identiques → un message)', f.length===1, f.map(p=>p.nom).join(' | '));
    chk('« Site sensible pour les oiseaux » [Période sensible]', f[0] && f[0].nom==='Site sensible pour les oiseaux' && f[0].etiquette==='Période sensible', f[0]&&JSON.stringify(f[0]));
    chk('sous-titre : nom du site et saison', f[0] && f[0].sous==='PETITE MER DE GAVRE, période sensible : hiver', f[0]&&f[0].sous);
    chk('le message OFB est repris tel quel, un paragraphe par ligne',
        e.detail.includes('<p>D’octobre à mars, des oiseaux hivernent. Soyons attentifs à leur présence.</p>'));
    chk('le lien OFB est reconstruit (https, nouvel onglet, noopener), sans <u>',
        e.liens.length===1 && e.liens[0][0]==='https://www.reservebaiedesaintbrieuc.com/phm/carte-des-activites'
        && e.liens[0][1]==='ici.' && e.liens[0][2]==='_blank' && e.liens[0][3]==='noopener' && e.scripts===0, JSON.stringify(e.liens));
    chk('la source est citée (Nav&Co)', /application Nav&amp;Co/.test(e.detail));
    chk('pas de blocage : bloc non rouge, coordonnées affichées', e.classe!=='env-rouge' && e.coords, e.classe);
    chk('une requête OFB « usage », champs limités au message',
        requetes.length===1 && /propertyName=nom_site,saison,messa_sens,gr_pho&/.test(requetes[0]) && /INTERSECTS\(geom, SRID=4326;POINT\(/.test(requetes[0]), requetes.length+' requêtes');
    await page.screenshot({path:'/tmp/amidomar_faune_oiseaux.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Phoques au point ---');
  { const { page, pe, dialogues } = await ouvrir(b,'phoques');
    const e = await cliquer(page); const f = faune(e);
    chk('« Site sensible pour les phoques », saison été', f.length===1 && f[0].nom==='Site sensible pour les phoques' && /période sensible : été$/.test(f[0].sous), f.map(p=>p.nom+' / '+p.sous).join(' | '));
    chk('lien à cible collée : adresse réparée (sans « _blank »)', e.liens.length===1 && e.liens[0][0]==='https://parc-marin-iroise.fr/editorial/la-reglementation', JSON.stringify(e.liens));
    chk('aucune balise du message injectée (script, u), aucun dialogue', e.scripts===0 && dialogues.length===0 && !/<script/i.test(e.detail), e.detail.slice(0,200));
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- Rien au point ---');
  { const { page, pe } = await ouvrir(b,'rien');
    const e = await cliquer(page);
    chk('aucun point « Site sensible »', faune(e).length===0, e.points.map(p=>p.nom).join(' | '));
    chk('aucune carte grise « oiseaux et phoques »', !e.incertaines.some(t=>/oiseaux et les phoques/.test(t)), e.incertaines.join(' | '));
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('--- OFB en panne ---');
  { const { page, pe } = await ouvrir(b,'panne');
    const e = await cliquer(page);
    chk('aucun point ; carte grise dans « Non vérifié ici »', faune(e).length===0
        && e.incertaines.some(t=>/Sites sensibles pour les oiseaux et les phoques : vérification impossible/.test(t)) && /Non vérifié ici/.test(e.nonverif), e.incertaines.join(' | '));
    chk('pas de blocage, coordonnées affichées', e.classe!=='env-rouge' && e.coords);
    await page.screenshot({path:'/tmp/amidomar_faune_panne.png'});
    chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / '));
    await page.close(); }

  console.log('RESULTAT §20 bis (Chromium) : '+ok+' OK, '+ko+' ECHEC');
  await b.close(); srv.close();
})();
