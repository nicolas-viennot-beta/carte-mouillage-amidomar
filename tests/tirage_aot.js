/* Carte AMIDOMAR — tirage des AOT simulées de data/aot-existantes.geojson
 *
 * OÙ L'EXÉCUTER : dans la console du navigateur, SUR LA CARTE PUBLIÉE
 *   https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/
 * C'est la seule origine depuis laquelle le WFS du Shom répond (CORS), et ni
 * le shell local ni le conteneur Claude n'atteignent services.data.shom.fr.
 *
 * CE QU'IL FAIT : pose n positions par site, chacune entre 100 et 200 m du
 * trait terre-mer (LIMTM), hors des polygones terrestres, espacées de 130 m.
 * Pour le golfe de Saint-Tropez, tire par rejet À L'INTÉRIEUR des polygones de
 * data/zones-aot.geojson, au prorata des capacités déclarées.
 *
 * DÉTERMINISTE : graine 20261029 → rejouer redonne le même fichier.
 * Méthode et contrôles : projet/data/SOURCES.md §10.
 *
 * USAGE :   await tirerAOT()     → copie le JSON dans la console
 */
(() => {
const BASE = 'https://services.data.shom.fr/INSPIRE/wfs?service=WFS&version=2.0.0'
  + '&request=GetFeature&outputFormat=application/json&srsName=EPSG:4326&typeNames='
  + encodeURIComponent('LIMTM_2154_WFS:limite_terre_mer_france_metropolitaine_polygones');

// bbox WFS 2.0 en EPSG:4326 : LATITUDE d'abord. Les géométries reviennent en lon,lat.
const SITES = [
 {dep:'22', site:'Paimpol — île de Bréhat',                   n:31, bbox:[48.76,-3.12,48.90,-2.94]},
 {dep:'22', site:'Erquy — Saint-Cast (baie de Saint-Brieuc)',  n:31, bbox:[48.55,-2.62,48.68,-2.24]},
 {dep:'29', site:'Rade de Brest',                              n:31, bbox:[48.26,-4.52,48.40,-4.24]},
 {dep:'29', site:'Baie de Douarnenez',                         n:31, bbox:[48.04,-4.50,48.19,-4.26]},
 {dep:'56', site:'Baie de Quiberon',                           n:31, bbox:[47.44,-3.14,47.56,-2.94]},
 {dep:'56', site:'Golfe du Morbihan',                          n:31, bbox:[47.53,-2.97,47.63,-2.78]},
 {dep:'83', site:"Rade d'Hyères",                              n:12, bbox:[42.98,6.08,43.13,6.28]},
 {dep:'83', site:'Golfe de Saint-Tropez',                      n:50, bbox:[43.23,6.58,43.32,6.70], zones:true},
];
const DMIN = 100, DMAX = 200, ESPACEMENT = 130, ESPACEMENT_ZONE = 40, PAS_RIVAGE = 60;

let graine = 20261029;
const rand = () => { graine |= 0; graine = graine + 0x6D2B79F5 | 0;
  let t = Math.imul(graine ^ graine >>> 15, 1 | graine);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296; };

const charger = async b => {
  const u = BASE + '&count=5000&bbox=' + encodeURIComponent(b.join(',') + ',urn:ogc:def:crs:EPSG::4326');
  return (await (await fetch(u)).json()).features || [];
};

// Projection locale en mètres, index de segments, point-dans-terre.
function construire(features, lat0, lon0) {
  const kx = 111320 * Math.cos(lat0 * Math.PI / 180), ky = 110574;
  const P = c => [(c[0] - lon0) * kx, (c[1] - lat0) * ky];
  const rings = [];
  features.forEach(f => { const g = f.geometry; if (!g) return;
    const polys = g.type === 'Polygon' ? [g.coordinates] : (g.type === 'MultiPolygon' ? g.coordinates : []);
    polys.forEach(poly => poly.forEach(r => {
      const pts = r.map(P); let mnx = 1e18, mny = 1e18, mxx = -1e18, mxy = -1e18;
      pts.forEach(p => { if (p[0] < mnx) mnx = p[0]; if (p[0] > mxx) mxx = p[0];
                         if (p[1] < mny) mny = p[1]; if (p[1] > mxy) mxy = p[1]; });
      rings.push({ pts, bbox: [mnx, mny, mxx, mxy] });
    })); });
  const CELL = 300, grid = new Map(), key = (i, j) => i + ',' + j;
  rings.forEach(ring => { const pts = ring.pts;
    for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1];
      const i0 = Math.floor(Math.min(a[0], b[0]) / CELL), i1 = Math.floor(Math.max(a[0], b[0]) / CELL);
      const j0 = Math.floor(Math.min(a[1], b[1]) / CELL), j1 = Math.floor(Math.max(a[1], b[1]) / CELL);
      for (let ii = i0; ii <= i1; ii++) for (let jj = j0; jj <= j1; jj++) {
        const k = key(ii, jj); let ar = grid.get(k); if (!ar) { ar = []; grid.set(k, ar); } ar.push([a, b]); } } });
  const d2seg = (p, a, b) => { const vx = b[0] - a[0], vy = b[1] - a[1], wx = p[0] - a[0], wy = p[1] - a[1];
    const L = vx * vx + vy * vy; let t = L > 0 ? (wx * vx + wy * vy) / L : 0; t = t < 0 ? 0 : (t > 1 ? 1 : t);
    const dx = wx - t * vx, dy = wy - t * vy; return dx * dx + dy * dy; };
  function dist(p, maxR) { const R = Math.ceil(maxR / CELL), ci = Math.floor(p[0] / CELL), cj = Math.floor(p[1] / CELL);
    let best = Infinity;
    for (let ii = ci - R; ii <= ci + R; ii++) for (let jj = cj - R; jj <= cj + R; jj++) {
      const ar = grid.get(key(ii, jj)); if (!ar) continue;
      for (let k = 0; k < ar.length; k++) { const d = d2seg(p, ar[k][0], ar[k][1]); if (d < best) best = d; } }
    return Math.sqrt(best); }
  function dansTerre(p) { for (let r = 0; r < rings.length; r++) { const bb = rings[r].bbox;
      if (p[0] < bb[0] || p[0] > bb[2] || p[1] < bb[1] || p[1] > bb[3]) continue;
      const pts = rings[r].pts; let ins = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
        if (((yi > p[1]) !== (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi)) ins = !ins; }
      if (ins) return true; } return false; }
  return { rings, dist, dansTerre, P, unP: p => [lon0 + p[0] / kx, lat0 + p[1] / ky] };
}

// Sommets du rivage rééchantillonnés, avec leur normale.
const pointsRivage = (M, pas) => { const out = [];
  M.rings.forEach(ring => { const pts = ring.pts;
    for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 1) continue;
      const nx = -dy / L, ny = dx / L, k = Math.max(1, Math.floor(L / pas));
      for (let s = 0; s < k; s++) { const t = (s + 0.5) / k; out.push([[a[0] + dx * t, a[1] + dy * t], [nx, ny]]); } } });
  return out; };

function tirerLeLongDuRivage(M, n, dansEmprise) {
  const cps = pointsRivage(M, PAS_RIVAGE).filter(e => dansEmprise(e[0]));
  for (let i = cps.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); const t = cps[i]; cps[i] = cps[j]; cps[j] = t; }
  const acc = [], sp2 = ESPACEMENT * ESPACEMENT;
  for (const e of cps) { if (acc.length >= n) break;
    const p = e[0], nr = e[1], d = DMIN + rand() * (DMAX - DMIN);
    for (const sgn of [1, -1]) {
      const c = [p[0] + nr[0] * d * sgn, p[1] + nr[1] * d * sgn];
      // PIÈGE : une requête BBOX renvoie aussi le grand polygone du département.
      // Sans ce recadrage, les points partent à des dizaines de km. SOURCES.md §2, piège 9.
      if (!dansEmprise(c)) continue;
      if (M.dansTerre(c)) continue;
      const dd = M.dist(c, DMAX + 100); if (dd < DMIN || dd > DMAX) continue;
      let ok = true; for (let k = 0; k < acc.length; k++) {
        const ax = acc[k][0] - c[0], ay = acc[k][1] - c[1]; if (ax * ax + ay * ay < sp2) { ok = false; break; } }
      if (!ok) continue;
      c.push(Math.round(dd)); acc.push(c); break; } }
  return acc;
}

const dansPolygone = (p, ring) => { let ins = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if (((yi > p[1]) !== (yj > p[1])) && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi)) ins = !ins; }
  return ins; };

function tirerDansZones(M, zones, total) {
  const caps = zones.map(z => z.properties.capacite_unites);
  const somme = caps.reduce((a, b) => a + b, 0);
  let cibles = caps.map(c => Math.floor(total * c / somme));
  let reste = total - cibles.reduce((a, b) => a + b, 0);
  for (let i = cibles.length - 1; reste > 0; i--, reste--) cibles[i]++;
  const all = [];
  zones.forEach((z, zi) => {
    const ring = z.geometry.coordinates[0].map(c => M.P(c));
    let mnx = 1e18, mny = 1e18, mxx = -1e18, mxy = -1e18;
    ring.forEach(p => { if (p[0] < mnx) mnx = p[0]; if (p[0] > mxx) mxx = p[0];
                        if (p[1] < mny) mny = p[1]; if (p[1] > mxy) mxy = p[1]; });
    const acc = []; let essais = 0;
    while (acc.length < cibles[zi] && essais < 200000) { essais++;
      const p = [mnx + rand() * (mxx - mnx), mny + rand() * (mxy - mny)];
      if (!dansPolygone(p, ring)) continue;
      if (M.dansTerre(p)) continue;
      const d = M.dist(p, 400); if (d < DMIN || d > DMAX) continue;
      let ok = true; for (const a of acc) { if (Math.hypot(a[0] - p[0], a[1] - p[1]) < ESPACEMENT_ZONE) { ok = false; break; } }
      if (!ok) continue;
      p.push(Math.round(d)); acc.push(p); }
    acc.forEach(p => { const ll = M.unP(p);
      all.push([+ll[0].toFixed(5), +ll[1].toFixed(5), p[2], z.properties.nom]); });
  });
  return all;
}

window.tirerAOT = async function () {
  graine = 20261029;
  const zones = (await (await fetch('data/zones-aot.geojson')).json()).features;
  const sortie = {}, rapport = [];
  for (const s of SITES) {
    const b = s.bbox, bb = [b[0] - 0.02, b[1] - 0.03, b[2] + 0.02, b[3] + 0.03];
    const feats = await charger(bb);
    const M = construire(feats, (b[0] + b[2]) / 2, (b[1] + b[3]) / 2);
    let pts;
    if (s.zones) { pts = tirerDansZones(M, zones, s.n); }
    else {
      const c0 = M.P([b[1], b[0]]), c1 = M.P([b[3], b[2]]);
      const dans = p => p[0] >= c0[0] && p[0] <= c1[0] && p[1] >= c0[1] && p[1] <= c1[1];
      pts = tirerLeLongDuRivage(M, s.n, dans).map(p => { const ll = M.unP(p);
        return [+ll[0].toFixed(5), +ll[1].toFixed(5), p[2]]; });
    }
    sortie[s.site] = { dep: s.dep, pts };
    rapport.push({ site: s.site, objets_shom: feats.length, obtenus: pts.length, voulus: s.n });
  }
  console.table(rapport);
  const total = Object.values(sortie).reduce((a, v) => a + v.pts.length, 0);
  console.log('total :', total, 'positions');
  console.log(JSON.stringify(sortie));
  return sortie;
};
console.log('tirage AOT chargé — lancer :  await tirerAOT()');
})();
