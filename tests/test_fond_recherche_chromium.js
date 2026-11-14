// Carte AMIDOMAR — v2.36 : champ de recherche façon cartes.gouv.fr, picto
// « Cartes » dans le bandeau, choix du fond en bas de « Couches affichées ».
//   node test_fond_recherche_chromium.js     (TESTS_FONCTIONNELS.md §18)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const T = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css',
            '.json':'application/json', '.geojson':'application/json' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});
let ok = 0, ko = 0;
const chk = (l, c, d) => { c ? ok++ : ko++; console.log((c ? 'OK   ' : 'ECHEC') + ' | ' + l + (d !== undefined ? ' — ' + d : '')); };
const LAUNCH = process.env.CHROME ? { executablePath: process.env.CHROME } : {};

(async () => {
  await new Promise(r => srv.listen(8743, r));
  const b = await chromium.launch(LAUNCH);
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const pe = []; page.on('pageerror', e => pe.push(e.message));
  await page.goto('http://127.0.0.1:8743/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(3500);
  await page.evaluate(() => { const g = document.getElementById('guide-fermer'); if (g) g.click(); });
  await page.waitForTimeout(300);

  console.log('--- §18.1  Champ de recherche (mesures cartes.gouv.fr) ---');
  const s = await page.evaluate(() => {
    const c = document.querySelector('.cartefacile-ctrl-search');
    const i = c.querySelector('.cartefacile-ctrl-search__input');
    const bt = c.querySelector('.cartefacile-ctrl-search__btn-search');
    const cs = getComputedStyle(c), is = getComputedStyle(i), bs = getComputedStyle(bt);
    const ib = getComputedStyle(bt, '::before');
    const col = document.getElementById('panels-droite').getBoundingClientRect();
    const r = c.getBoundingClientRect();
    return { ph: i.placeholder, w: r.width, h: r.height, right: r.right, colLeft: col.left,
      bg: cs.backgroundColor, sh: cs.boxShadow, ih: i.getBoundingClientRect().height,
      font: is.fontSize, color: is.color, phStyle: getComputedStyle(i, '::placeholder').fontStyle,
      bw: bt.offsetWidth, bh: bt.offsetHeight, bbg: bs.backgroundColor, ico: ib.backgroundColor };
  });
  chk('placeholder « Lieu ou Coordonnées GPS »', s.ph === 'Lieu ou Coordonnées GPS', s.ph);
  chk('hauteur 48 px (champ et contrôle)', Math.round(s.h) === 48 && Math.round(s.ih) === 48, s.h + '/' + s.ih);
  chk('largeur 545 px à 1440 px de large', Math.round(s.w) === 545, s.w);
  chk('fond gris #EEEEEE', s.bg === 'rgb(238, 238, 238)', s.bg);
  chk('trait bleu France 2 px en bas', /rgb\(0, 0, 145\).*-2px/.test(s.sh) || /inset/.test(s.sh) && /0, 0, 145/.test(s.sh), s.sh);
  chk('texte 16 px, #3A3A3A', s.font === '16px' && s.color === 'rgb(58, 58, 58)', s.font + ' ' + s.color);
  chk('placeholder en italique', s.phStyle === 'italic', s.phStyle);
  chk('bouton loupe carré 48 × 48 bleu #000091', s.bw === 48 && s.bh === 48 && s.bbg === 'rgb(0, 0, 145)', s.bw + 'x' + s.bh + ' ' + s.bbg);
  chk('loupe claire sur le bleu', s.ico === 'rgb(245, 245, 254)', s.ico);
  chk('le champ ne passe pas sous la colonne de droite', s.right < s.colLeft - 10, Math.round(s.right) + ' < ' + Math.round(s.colLeft));

  await page.setViewportSize({ width: 900, height: 800 }); await page.waitForTimeout(300);
  const etroit = await page.evaluate(() => {
    const r = document.querySelector('.cartefacile-ctrl-search').getBoundingClientRect();
    return { right: r.right, colLeft: document.getElementById('panels-droite').getBoundingClientRect().left, w: r.width };
  });
  chk('900 px : le champ se réduit sans chevaucher la colonne', etroit.right < etroit.colLeft, Math.round(etroit.w) + ' px, fin ' + Math.round(etroit.right) + ' < ' + Math.round(etroit.colLeft));
  await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(300);

  console.log('--- §18.2  Colonne « Couches affichées » ---');
  const p = await page.evaluate(() => {
    const h = document.querySelector('#layer-panel .panel-header');
    const svg = h.querySelector('.panel-titre svg.panel-picto');
    const body = document.getElementById('layer-panel-body');
    const fc = body.querySelector('.fond-carte');
    const btns = [...body.querySelectorAll('.fond-carte-btn')].map(x => ({ k: x.dataset.fond, t: x.textContent.trim(), on: x.getAttribute('aria-checked'), img: !!(x.querySelector('img') || {}).src }));
    return { titre: h.textContent.replace(/\s+/g, ' ').trim(), svg: !!svg, svgFirst: svg && h.querySelector('.panel-titre').firstElementChild === svg,
      dernier: fc && body.lastElementChild === fc, btns,
      selecteur: !!document.querySelector('.cartefacile-btn-icon--stack, .cartefacile-ctrl-map-selector-panel') };
  });
  chk('picto Cartes dans le bandeau, avant le titre', p.svg && p.svgFirst, p.titre);
  chk('« Fond de carte » est le dernier bloc de la colonne', p.dernier);
  chk('deux fonds : Simple et Aérienne, avec vignette', p.btns.length === 2 && p.btns[0].t === 'Simple' && p.btns[1].t === 'Aérienne' && p.btns.every(x => x.img), JSON.stringify(p.btns));
  chk('Simple coché au chargement', p.btns[0] && p.btns[0].on === 'true' && p.btns[1].on === 'false');
  chk('plus de sélecteur flottant en bas à gauche', !p.selecteur);

  console.log('--- §18.3  Changer de fond conserve les couches AMIDOMAR ---');
  const avant = await page.evaluate(() => {
    const st = map.getStyle();
    return { srcs: Object.keys(st.sources).filter(k => !sourcesFond.has(k)).sort(),
             lays: st.layers.filter(l => l.source && !sourcesFond.has(l.source)).map(l => l.id),
             vis: Object.fromEntries(st.layers.filter(l => l.source && !sourcesFond.has(l.source)).map(l => [l.id, (l.layout || {}).visibility || 'visible'])) };
  });
  // Le panneau s'ouvre replié (v2.32) : on le déplie comme l'usager.
  await page.click('#layer-panel .panel-header'); await page.waitForTimeout(300);
  chk('couches AMIDOMAR présentes avant bascule', avant.lays.length > 5, avant.lays.length + ' couches, ' + avant.srcs.length + ' sources');
  await page.click('.fond-carte-btn[data-fond="aerial"]');
  await page.waitForTimeout(2500);
  const apres = await page.evaluate(nos => {
    const st = map.getStyle();
    const ids = st.layers.map(l => l.id);
    return { manquantes: nos.filter(id => !ids.includes(id)), srcs: Object.keys(st.sources),
      vis: Object.fromEntries(st.layers.filter(l => nos.includes(l.id)).map(l => [l.id, (l.layout || {}).visibility || 'visible'])),
      fond: [...sourcesFond], ordreOk: nos.every((id, i) => i === 0 || ids.indexOf(id) > ids.indexOf(nos[i - 1])),
      coche: document.querySelector('.fond-carte-btn[aria-checked="true"]').dataset.fond };
  }, avant.lays);
  chk('Aérienne : aucune couche AMIDOMAR perdue', apres.manquantes.length === 0, apres.manquantes.join(', ') || 'toutes là');
  chk('Aérienne : toutes nos sources présentes', avant.srcs.every(k => apres.srcs.includes(k)));
  chk('Aérienne : visibilité de chaque couche conservée', JSON.stringify(apres.vis) === JSON.stringify(avant.vis));
  chk('Aérienne : ordre de nos couches conservé', apres.ordreOk);
  chk('Aérienne : sourcesFond = sources du nouveau fond seul', apres.fond.every(k => !avant.srcs.includes(k)), apres.fond.join(','));
  chk('Aérienne cochée', apres.coche === 'aerial');
  await page.click('.fond-carte-btn[data-fond="simple"]');
  await page.waitForTimeout(2500);
  const retour = await page.evaluate(nos => { const ids = map.getStyle().layers.map(l => l.id); return nos.filter(id => !ids.includes(id)); }, avant.lays);
  chk('retour Simple : aucune couche perdue', retour.length === 0, retour.join(', ') || 'toutes là');

  // Clavier : flèche droite depuis Simple → Aérienne
  await page.focus('.fond-carte-btn[data-fond="simple"]'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1500);
  const kb = await page.evaluate(() => ({ coche: document.querySelector('.fond-carte-btn[aria-checked="true"]').dataset.fond, focus: document.activeElement.dataset.fond }));
  chk('flèche → passe au fond suivant (focus et sélection)', kb.coche === 'aerial' && kb.focus === 'aerial', JSON.stringify(kb));

  // Clic sur la carte après bascule : le traitement d'un point fonctionne toujours.
  await page.mouse.click(700, 600); await page.waitForTimeout(1500);
  const popup = await page.evaluate(() => document.getElementById('coords-popup').classList.contains('visible'));
  chk('après bascule, un clic sur la carte ouvre toujours le popup', popup);

  chk('aucune pageerror', pe.length === 0, pe.join(' | '));
  console.log('RESULTAT §18 (Chromium) : ' + ok + ' OK, ' + ko + ' ECHEC');
  await b.close(); srv.close(); process.exit(ko ? 1 : 0);
})();
