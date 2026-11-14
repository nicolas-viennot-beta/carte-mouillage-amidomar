// Carte AMIDOMAR — règles locales et coordonnées retenues (TESTS_FONCTIONNELS.md §17)
//   node test_regles_locales.js
// Couvre : §17.1 à §17.9 — decisionCoordonnees, zoneReserveePro, blocReglesLocales (3 états),
// cohérence des fichiers data/ddtm-messages.json et data/zones-aot.geojson.
// Réseau coupé : les fiches DDTM et les zones sont lues sur disque et injectées directement.
const fs = require('fs'), vm = require('vm'), path = require('path');
const PROJET = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(PROJET, 'index.html'), 'utf8');
const blocs = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const script = blocs[blocs.length - 1];
const H = require('./stub.js');
let ok = 0, ko = 0;
const t = (nom, cond, detail) => { console.log((cond ? 'OK    | ' : 'ECHEC | ') + nom + (cond || !detail ? '' : ' — ' + detail)); cond ? ok++ : ko++; };

function charger(search) {
  const sandbox = H.sandbox({});
  sandbox.location.search = search || '';
  vm.createContext(sandbox);
  const PONT = '\n;globalThis.__t = { decisionCoordonnees, zoneReserveePro, zoneAOTauPoint, blocReglesLocales, vueExistant };';
  vm.runInContext(script + PONT, sandbox, { filename: 'index.html#script', timeout: 20000 });
  return sandbox.__t;
}

const messages = JSON.parse(fs.readFileSync(path.join(PROJET, 'data/ddtm-messages.json'), 'utf8')).ddtm;
const zones = JSON.parse(fs.readFileSync(path.join(PROJET, 'data/zones-aot.geojson'), 'utf8')).features;
const f83 = messages.find(m => m.ddtm === '83'), f22 = messages.find(m => m.ddtm === '22');

console.log('--- §17.0  Données ---');
t('fiche 22 : coordonnees_hors_zone === false et brouillon false', f22 && f22.coordonnees_hors_zone === false && f22.brouillon === false);
t('fiche 83 : coordonnees_hors_zone === false, message_hors_zone et champs *_zone_pro présents',
  f83 && f83.coordonnees_hors_zone === false && !!f83.message_hors_zone && !!f83.message_titre_zone_pro);
t('zones : toutes portent ddtm et public ∈ {tous, professionnels}',
  zones.every(z => z.properties.ddtm && ['tous','professionnels'].includes(z.properties.public)));
const z83 = zones.filter(z => z.properties.ddtm === '83'), z56 = zones.filter(z => z.properties.ddtm === '56');
t('zones : 57 zones du Var, 16 communes', z83.length === 57
  && new Set(z83.map(z => z.properties.commune)).size === 16, String(z83.length));
// v2.38 : le Morbihan apporte un MultiPolygon (Le Palais, Port Jean) — on vérifie chaque anneau extérieur.
const anneauxExt = g => g.type === 'Polygon' ? [g.coordinates[0]] : g.type === 'MultiPolygon' ? g.coordinates.map(p => p[0]) : [];
t('zones : anneaux fermés et au moins 3 sommets distincts (deux triangles : Lazaret M1, Madrague D)', zones.every(z =>
  anneauxExt(z.geometry).length && anneauxExt(z.geometry).every(r => r.length >= 4 && r[0][0] === r[r.length-1][0] && r[0][1] === r[r.length-1][1])));
const f56 = messages.find(m => m.ddtm === '56');
t('56 : fiche publiée (brouillon false, coordonnees_hors_zone false), sans secteurs ni *_zone_pro',
  !!f56 && f56.brouillon === false && f56.coordonnees_hors_zone === false && !!f56.message_hors_zone && !!f56.message_titre_zone && !f56.secteurs);
t('56 : 15 zones, 8 communes, toutes « tous », un MultiPolygon', z56.length === 15
  && new Set(z56.map(z => z.properties.commune)).size === 8 && z56.every(z => z.properties.public === 'tous')
  && z56.filter(z => z.geometry.type === 'MultiPolygon').length === 1, String(z56.length));
t('56 : aucune zone réservée (NUC, passagers, club nautique) importée', z56.every(z => ![156,167,181,182,183,184,186,189,190,193].includes(z.properties.gid_ddtm56)));

const T = charger('');
const dedans = { lng: 6.6228, lat: 43.2678 };   // dans la zone 1 — La Bouillabaisse
const dehors = { lng: 6.70, lat: 43.20 };       // en mer, hors zone
const dep83 = { departements: ['83'], rayonKm: 1 }, dep22 = { departements: ['22'], rayonKm: 1 };
const dep29 = { departements: ['29'], rayonKm: 1 }, dep2 = { departements: ['13','83'], rayonKm: 5 };
const f83pub = Object.assign({}, f83, { brouillon: false });
const msgs = [f22, f83pub];

console.log('--- §17.1  zoneAOTauPoint / zoneReserveePro ---');
const zIci = T.zoneAOTauPoint(dedans, zones);
t('un point dans La Bouillabaisse trouve la zone 1', !!zIci && zIci.properties.lieu === 'La Bouillabaisse' && zIci.properties.zone === 1);
t('un point en mer hors zone ne trouve rien', T.zoneAOTauPoint(dehors, zones) === null);
t('zoneReserveePro : false sur une zone « tous »', T.zoneReserveePro(zIci) === false);
const zPro = JSON.parse(JSON.stringify(zIci)); zPro.properties.public = 'Professionnels ';
t('zoneReserveePro : true sur « professionnels » (casse et espaces tolérés)', T.zoneReserveePro(zPro) === true);

console.log('--- §17.2  decisionCoordonnees ---');
t('22 hors zone → masquer, raison = message_hors_zone', (d => d.masquer && d.raison === f22.message_hors_zone)(T.decisionCoordonnees(dep22, msgs, zones, dehors)));
t('83 publié, hors zone → masquer', T.decisionCoordonnees(dep83, msgs, zones, dehors).masquer === true);
t('83 publié, dans une zone « tous » → afficher', T.decisionCoordonnees(dep83, msgs, zones, dedans).masquer === false);
t('83 publié, dans une zone « professionnels » → masquer', T.decisionCoordonnees(dep83, msgs, [zPro], dedans).masquer === true);
t('83 en brouillon (fichier tel quel) → afficher partout', T.decisionCoordonnees(dep83, messages, zones, dehors).masquer === false);
t('fiche sans coordonnees_hors_zone (29) → afficher', T.decisionCoordonnees(dep29, msgs, zones, dehors).masquer === false);
t('département inconnu (null) → afficher', T.decisionCoordonnees(null, msgs, zones, dehors).masquer === false);
t('deux départements → afficher', T.decisionCoordonnees(dep2, msgs, zones, dehors).masquer === false);
const sansMsg = [Object.assign({}, f22, { message_hors_zone: '' })];
t('sans message_hors_zone → raison par défaut nommant la DDTM', /Côtes-d'Armor \(22\)/.test(T.decisionCoordonnees(dep22, sansMsg, zones, dehors).raison));

console.log('--- §17.3  vue=existant ---');
const TE = charger('?vue=existant');
t('vueExistant est bien lu', TE.vueExistant === true);
t('?vue=existant : 22 hors zone → afficher quand même', TE.decisionCoordonnees(dep22, msgs, zones, dehors).masquer === false);

console.log('--- §17.4  blocReglesLocales : trois états ---');
// v2.37 : les zones proches sont répétées en tête de liste ; les comptes portent
// sur la liste rangée par secteur, après le titre « Toutes les zones ».
const groupee = h => h.split('Toutes les zones').slice(1).join('');
const nLiens = h => (groupee(h).match(/env-zone-lien/g) || []).length;
const hors = T.blocReglesLocales(dep83, msgs, zones, dehors);
t('hors zone : carte orange (env-carte--ddtm, ni -ok ni -pro)', /env-carte--ddtm[" ]/.test(hors) && !/ddtm-ok|ddtm-pro/.test(hors));
t('hors zone : les 57 zones sont listées (liste par secteur)', nLiens(hors) === 57, String(nLiens(hors)));
const ok83 = T.blocReglesLocales(dep83, msgs, zones, dedans);
t('dans une zone « tous » : carte verte (ddtm-ok), 56 autres zones listées', /env-carte--ddtm-ok/.test(ok83) && nLiens(ok83) === 56);
const pro = T.blocReglesLocales(dep83, msgs, [zPro].concat(zones.slice(1)), dedans);
t('dans une zone « professionnels » : carte grise (ddtm-pro) avec le titre *_zone_pro', /env-carte--ddtm-pro/.test(pro) && pro.includes(f83.message_titre_zone_pro));
t('… et la zone occupée sort de la liste', nLiens(pro) === 56);
const listePro = T.blocReglesLocales(dep83, msgs, [zPro].concat(zones.slice(1)), dehors);
t('hors zone : une zone « professionnels » reste listée, avec la mention', listePro.includes('réservée uniquement aux professionnels'));
t('texte des fiches échappé (aucune balise brute issue des données)', !hors.includes('<script'));

console.log('--- §19  Liste rangée Secteur → Commune → Zone (v2.37) ---');
const giens = { lng: 6.155, lat: 43.045 };   // en mer, côté est de la presqu'île de Giens, hors zone
const hg = T.blocReglesLocales(dep83, msgs, zones, giens);
t('fiche 83 : deux secteurs déclarés, plages de cartes 1-30 et 31-99', (f83.secteurs || []).length === 2
  && f83.secteurs[0].cartes[0] === 1 && f83.secteurs[1].cartes[0] === 31);
t('fiche 83 : le titre est le nouveau message (« délivre … uniquement dans les zones autorisées »)', /délivre de nouvelles AOT de mouillage individuel uniquement/.test(f83.message_titre));
t('fiche 83 : le paragraphe « Zones connues à ce jour » a disparu (doublon)', !f83.message_detail.some(p => /Zones connues/.test(p)) && !f83.message_detail_zone.some(p => /autres zones connues/.test(p)));
const secteurs = (hg.match(/class="env-secteur"/g) || []).length;
t('deux <details class="env-secteur">, aucun ouvert par défaut', secteurs === 2 && !/<details[^>]*\bopen/.test(hg), String(secteurs));
t('Secteur Ouest Var : 7 communes · 29 zones · 1 025 emplacements', /Secteur Ouest Var[\s\S]*?Bandol → Le Lavandou · 7 communes · 29 zones · 1\s?025 emplacements/.test(hg));
t('Secteur Est Var : 9 communes · 28 zones · 740 emplacements', /Secteur Est Var[\s\S]*?Cavalaire-sur-Mer → Saint-Raphaël · 9 communes · 28 zones · 740 emplacements/.test(hg));
t('aucune zone sous « Autres zones »', !hg.includes('Autres zones'));
t('16 <details class="env-commune">', (hg.match(/class="env-commune"/g) || []).length === 16);
const ordre = [...groupee(hg).matchAll(/<details class="env-commune"><summary><span>([^<]+)<\/span>/g)].map(m => m[1]);
t('communes de l\'ouest d\'abord, de Bandol au Lavandou', ordre.slice(0, 7).join('|') === 'Bandol|La Seyne-sur-Mer|Toulon|Hyères|La Londe-les-Maures|Bormes-les-Mimosas|Le Lavandou', ordre.slice(0,7).join('|'));
t('… puis l\'est, de Cavalaire à Saint-Raphaël', ordre[7] === 'Cavalaire-sur-Mer' && ordre[15] === 'Saint-Raphaël', ordre.slice(7).join('|'));
t('Hyères : 10 zones · 314 emplacements', /<span>Hyères<\/span>\s*<span class="env-groupe-meta">10 zones · 314 emplacements/.test(hg));
t('« emplacements », plus jamais « unités »', !/unités/.test(hg) && /30 emplacements, exposition ouest, profondeur 0 à 1 m/.test(hg));
t('dans une commune, la zone est nommée sans répéter la commune', />Madrague de Giens, zone A<\/button>/.test(hg));
const proches = (hg.split('Les plus proches de votre point')[1] || '').split('Toutes les zones')[0];
const nomsProches = [...proches.matchAll(/data-zone="\d+"\s*>([^<]+)<\/button>/g)].map(m => m[1]);
t('« Les plus proches de votre point » : CONFIG.zonesProches (3) zones, toutes à Hyères', nomsProches.length === 3 && nomsProches.every(n => n.startsWith('Hyères — ')), nomsProches.join(' | '));
const dists = [...proches.matchAll(/env-zone-distance">([^<]+)</g)].map(m => m[1]);
t('… chacune avec sa distance, croissante', dists.length === 3 && dists.every(d => /^\d+(,\d)? (m|km)$/.test(d)), dists.join(' | '));
t('les boutons de la section « proches » recadrent bien la carte (data-zone valide)', [...hg.matchAll(/data-zone="(\d+)"/g)].length === 60);
t('sans point (lngLat null) : pas de section « proches », liste rangée intacte', (h => !h.includes('Les plus proches') && nLiens(h) === 57)(T.blocReglesLocales(dep83, msgs, zones, null)));
const sansSect = Object.assign({}, f83pub, { secteurs: undefined });
const hs = T.blocReglesLocales(dep83, [f22, sansSect], zones, dehors);
t('fiche sans secteurs : communes listées directement, sans niveau secteur', !hs.includes('env-secteur-nom') && (hs.match(/class="env-commune"/g) || []).length === 16);
const zSans = JSON.parse(JSON.stringify(zones[0])); zSans.properties.source = 'relevé sans numéro';
const ha = T.blocReglesLocales(dep83, msgs, [zSans].concat(zones.slice(1)), dehors);
t('zone sans numéro de carte : rangée sous « Autres zones »', ha.includes('Autres zones'));
t('les noms de secteur et d\'étendue sont échappés', (h => !h.includes('<b>x</b>'))(T.blocReglesLocales(dep83, [Object.assign({}, f83pub, { secteurs: [{ nom: '<b>x</b>', cartes: [1, 99] }] })], zones, dehors)));

console.log('--- §17.7  Morbihan (v2.38) ---');
const dep56 = { departements: ['56'], rayonKm: 1 };
const dansGuen = { lng: -3.14476, lat: 47.33536 };   // Le Palais — Port Guen
const dansJean = { lng: -3.18921, lat: 47.36459 };   // Le Palais — Port Jean (MultiPolygon)
const dehors56 = { lng: -3.05, lat: 47.50 };         // baie de Quiberon, hors zone
const zG = T.zoneAOTauPoint(dansGuen, zones), zJ = T.zoneAOTauPoint(dansJean, zones);
t('un point à Port Guen trouve la zone (ddtm 56)', !!zG && zG.properties.lieu === 'Port Guen' && zG.properties.ddtm === '56');
t('un point à Port Jean trouve la zone MultiPolygon', !!zJ && zJ.properties.lieu === 'Port Jean');
t('56 hors zone → masquer, raison = message_hors_zone', (d => d.masquer && d.raison === f56.message_hors_zone)(T.decisionCoordonnees(dep56, messages, zones, dehors56)));
t('56 dans une zone → afficher', T.decisionCoordonnees(dep56, messages, zones, dansGuen).masquer === false);
t('56 dans une zone du 83 → masquer (zone d\'une autre DDTM)', T.decisionCoordonnees(dep56, messages, zones, dedans).masquer === true);
const h56 = T.blocReglesLocales(dep56, messages, zones, dehors56);
t('56 hors zone : carte orange, 15 zones listées par commune, sans niveau secteur', /env-carte--ddtm[" ]/.test(h56) && nLiens(h56) === 15
  && !h56.includes('env-secteur-nom') && (h56.match(/class="env-commune"/g) || []).length === 8, String(nLiens(h56)));
t('56 hors zone : aucune zone du Var dans la liste', !h56.includes('Bandol') && !h56.includes('Saint-Tropez'));
const h56ok = T.blocReglesLocales(dep56, messages, zones, dansGuen);
t('56 dans Port Guen : carte verte, 14 autres zones, nom entre parenthèses', /env-carte--ddtm-ok/.test(h56ok) && nLiens(h56ok) === 14 && h56ok.includes('(Le Palais — Port Guen)'));
t('83 : la liste du Var ne contient aucune zone du Morbihan', (h => nLiens(h) === 57 && !h.includes('Riantec'))(T.blocReglesLocales(dep83, msgs, zones, dehors)));

console.log('\nRESULTAT §17 + §19 : ' + ok + ' OK, ' + ko + ' ECHEC');
process.exit(ko ? 1 : 0);
