// Carte AMIDOMAR — bouton « Commencer une première demande pour cet emplacement » (TESTS_FONCTIONNELS.md §23, v2.45)
//   node test_preremplissage_dn_chromium.js   — Playwright requis
// Réseau coupé sauf les services simulés par page.route (Shom LIMTM, nature du fond, API Carto).
// Les clés DN étant encore vides dans index.html, le harnais sert une COPIE EN MÉMOIRE
// de la page avec des clés fictives (« champ_GPS »…) : il vérifie la construction du lien,
// pas les vraies clés DN (à contrôler sur DN une fois relevées, §23.6).
// Capture : /tmp/amidomar_dn_bouton.png
const { chromium } = require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const T={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.geojson':'application/json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
const PORT=8761, SEL_IN='.cartefacile-ctrl-search__input', SEL_R='.cartefacile-ctrl-search__result';
let ok=0,ko=0; const chk=(l,c,d)=>{c?ok++:ko++;console.log((c?'OK   ':'ECHEC')+' | '+l+(d?' — '+d:''));};
const FC=f=>JSON.stringify({type:'FeatureCollection',features:f});

const HTML = fs.readFileSync(ROOT+'/index.html','utf8');
const CLES = { demarche:'demarche-test', gps:'champ_GPS', departement:'champ_DEP', commune:'champ_COM',
               lieuDit:'champ_LIEU', natura:'champ_N2000', naturaSite:'champ_SITE', rayon:'champ_RAYON', natureFond:'champ_FOND' };
function htmlConfigure() {
  let h = HTML.replace("demarche: '',", `demarche: '${CLES.demarche}',`);
  for (const k of Object.keys(CLES)) if (k !== 'demarche')
    h = h.replace(new RegExp(`(\\n\\s+${k}:\\s+)''`), `$1'${CLES[k]}'`);
  return h;
}

/* o = { configure, numdep, fond (code Shom ou null), natura ('site' | 'vide' | 'panne'), query } */
async function ouvrir(b, o) {
  const page = await b.newPage({viewport:{width:1440,height:900}});
  const pe=[]; page.on('pageerror',e=>pe.push(e.message));
  await page.route('**/*', async route => {
    const u = route.request().url();
    if (u.startsWith(`http://127.0.0.1:${PORT}/`)) {
      if (o.configure && /\/index\.html/.test(u))
        return route.fulfill({status:200, contentType:'text/html', body: htmlConfigure()});
      return route.continue();
    }
    if (u.includes('services.data.shom.fr') && u.includes('LIMTM'))
      return route.fulfill({status:200,contentType:'application/json',
        body: /DWITHIN/.test(decodeURIComponent(u)) ? FC([{type:'Feature',properties:{numdep:o.numdep}}]) : FC([])});
    if (u.includes('natures_fond_50000'))
      return route.fulfill({status:200,contentType:'application/json',
        body: FC(o.fond ? [{type:'Feature',properties:{typelem:o.fond}}] : [])});
    if (u.includes('apicarto.ign.fr/api/nature/')) {
      if (o.natura === 'panne') return route.abort();
      const site = o.natura === 'site' && u.includes('natura-habitat');
      return route.fulfill({status:200,contentType:'application/json',
        body: FC(site ? [{type:'Feature',properties:{sitename:'Site de test'}}] : [])});
    }
    if (u.includes('wxs.ofb.fr/geoserver/habitat/wfs'))
      return route.fulfill({status:200,contentType:'application/json',body:FC([])});
    return route.abort();   // WFS de repli Natura compris : en « panne », tout échoue
  });
  await page.goto(`http://127.0.0.1:${PORT}/index.html${o.query||''}`,{waitUntil:'load'});
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{const g=document.getElementById('guide-fermer');if(g)g.click();});
  return { page, pe };
}
async function aller(page, txt) {
  await page.fill(SEL_IN,''); await page.click(SEL_IN); await page.type(SEL_IN, txt, {delay:10});
  await page.waitForTimeout(1200); await page.click(SEL_R); await page.waitForTimeout(9000);
}
// Clique le bouton (l'onglet DN ouvert est coupé par page.route) et renvoie l'adresse construite.
async function lien(page) {
  return page.evaluate(()=>{
    const a=document.getElementById('dn-commencer');
    const visible = !a.hidden && a.offsetParent!==null;
    if (!visible) return { visible:false };
    a.addEventListener('click', e => e.preventDefault(), { once:true });   // pas d'onglet réel
    a.click();
    return { visible:true, href:a.href, target:a.target, rel:a.rel, texte:a.textContent.trim() };
  });
}
const params = href => { const u=new URL(href); const p={}; u.searchParams.forEach((v,k)=>{ (p[k]=p[k]||[]).push(v); }); return { chemin:u.pathname, p }; };

(async()=>{
  await new Promise(r=>srv.listen(PORT,r));
  const b = await chromium.launch();
  let page, pe, l;

  console.log('--- §23.1 Configuration DN vide (fichier livré) : bouton caché ---');
  ({page,pe} = await ouvrir(b, {configure:false, numdep:'83', fond:'NFS', natura:'site'}));
  await aller(page, '43.2678, 6.6228');
  l = await lien(page);
  chk('bouton caché tant que les clés DN sont vides', l.visible===false);
  chk('bloc « à reporter » bien affiché (boutons Copier inchangés)', await page.evaluate(()=>document.getElementById('report-block').style.display!=='none'));
  chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / ')); await page.close();

  console.log('--- §23.2 Var, zone La Bouillabaisse, Natura trouvé, sables, rayon calculé ---');
  ({page,pe} = await ouvrir(b, {configure:true, numdep:'83', fond:'NFS', natura:'site'}));
  await aller(page, '43.2678, 6.6228');
  l = await lien(page);
  chk('bouton visible', l.visible===true);
  chk('libellé', l.texte && l.texte.startsWith('Commencer une première demande pour cet emplacement'), l.texte);
  chk('nouvel onglet (target=_blank, noopener)', l.target==='_blank' && /noopener/.test(l.rel));
  let q = params(l.href); console.log('   lien :', decodeURIComponent(l.href));
  chk('adresse /commencer/<démarche>', l.href.startsWith('https://demarche.numerique.gouv.fr/commencer/demarche-test?'), q.chemin);
  chk('GPS « lat, lng » à 6 décimales', (q.p.champ_GPS||[])[0]==='43.267800, 6.622800', q.p.champ_GPS);
  chk('département 83', (q.p.champ_DEP||[])[0]==='83', q.p.champ_DEP);
  chk('commune [code postal, INSEE] de Saint-Tropez', JSON.stringify(q.p['champ_COM[]'])==='["83990","83119"]', JSON.stringify(q.p['champ_COM[]']));
  chk('lieu-dit de la zone', (q.p.champ_LIEU||[])[0]==='La Bouillabaisse', q.p.champ_LIEU);
  chk('Natura 2000 : true + nom du site', (q.p.champ_N2000||[])[0]==='true' && (q.p.champ_SITE||[])[0]==='Site de test');
  chk('nature du fond : « Sable ou vase »', (q.p.champ_FOND||[])[0]==='Sable ou vase', q.p.champ_FOND);
  chk('pas de rayon tant que le calcul n\'est pas fait', !q.p.champ_RAYON);
  await page.evaluate(()=>{ const s=(id,v)=>{const e=document.getElementById(id); e.value=v; e.dispatchEvent(new Event('input',{bubbles:true}));};
                            s('in-loa','8'); s('in-depth','4'); });
  await page.waitForTimeout(500);
  l = await lien(page); q = params(l.href);
  chk('rayon après calcul : 4 × 1,5 + 8 = 14 m', (q.p.champ_RAYON||[])[0]==='14', q.p.champ_RAYON);
  await page.evaluate(()=>document.getElementById('dn-commencer').scrollIntoView());
  await page.screenshot({path:'/tmp/amidomar_dn_bouton.png'});
  chk('aucune donnée du navire dans le lien (longueur, colonne)', !/(^|[=&])8([&]|$)/.test(new URL(l.href).search) && !/loa|longueur|immat/i.test(l.href));
  chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / ')); await page.close();

  console.log('--- §23.3 Var hors zone (brouillon : coordonnées affichées), graviers, Natura vérifié vide ---');
  ({page,pe} = await ouvrir(b, {configure:true, numdep:'83', fond:'NFG', natura:'vide'}));
  await aller(page, '43.20, 6.70');
  l = await lien(page); q = params(l.href||'https://x/');
  chk('bouton visible', l.visible===true);
  chk('Natura 2000 : false, sans nom de site', (q.p.champ_N2000||[])[0]==='false' && !q.p.champ_SITE);
  chk('graviers : pas de nature du fond', !q.p.champ_FOND, q.p.champ_FOND);
  chk('hors zone : ni commune ni lieu-dit', !q.p['champ_COM[]'] && !q.p.champ_LIEU);
  chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / ')); await page.close();

  console.log('--- §23.4 Services muets : Natura en panne, Shom sans donnée ---');
  ({page,pe} = await ouvrir(b, {configure:true, numdep:'83', fond:null, natura:'panne'}));
  await aller(page, '43.20, 6.70');
  l = await lien(page); q = params(l.href||'https://x/');
  chk('bouton visible (GPS seul suffit)', l.visible===true && !!q.p.champ_GPS);
  chk('Natura injoignable : ni oui ni non', !q.p.champ_N2000 && !q.p.champ_SITE, JSON.stringify(q.p.champ_N2000));
  chk('fond non cartographié : rien', !q.p.champ_FOND);
  chk('aucune pageerror', pe.length===0, pe.slice(0,2).join(' / ')); await page.close();

  console.log('--- §23.5 Coordonnées retenues (Côtes-d\'Armor) et vue « existant » : bouton absent ---');
  ({page,pe} = await ouvrir(b, {configure:true, numdep:'22', fond:'NFS', natura:'vide'}));
  await aller(page, '48.80, -3.00');
  l = await lien(page);
  chk('22 hors port : bouton absent avec le bloc « à reporter »', l.visible===false);
  await page.close();
  ({page,pe} = await ouvrir(b, {configure:true, numdep:'83', fond:'NFS', natura:'vide', query:'?vue=existant'}));
  await aller(page, '43.2678, 6.6228');
  l = await lien(page);
  chk('?vue=existant : pas de bouton de première demande', l.visible===false);
  await page.evaluate(()=>document.getElementById('coords-fermer').click());
  chk('« Effacer le point » : bouton caché', await page.evaluate(()=>document.getElementById('dn-commencer').hidden));
  await page.close();

  console.log('RESULTAT §23 (Chromium) : '+ok+' OK, '+ko+' ECHEC');
  await b.close(); srv.close();
  process.exit(ko?1:0);
})();
