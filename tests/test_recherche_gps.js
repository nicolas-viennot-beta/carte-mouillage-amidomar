const fs=require('fs'), vm=require('vm'), os=require('os');
const FILE=require('path').resolve(__dirname,'../index.html');
const html=fs.readFileSync(FILE,'utf8');
const blocs=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const script=blocs[blocs.length-1];

// --- stub (identique au harnais d'intégrité) ---------------------------
const H=require('./stub.js');
const sandbox=H.sandbox();
vm.createContext(sandbox);
const PONT='\n;globalThis.__t={parserCoordonnees,lecturesAmbigues,GpsGeocoder,EMPRISE_FR,allerAuPointGps};';
try{ vm.runInContext(script+PONT, sandbox, {filename:'index.html#script', timeout:20000}); }
catch(e){ console.log('ARRET phase synchrone :', e.message); process.exit(1); }
const t=sandbox.__t;
if(!t||!t.parserCoordonnees){ console.log('PONT absent — les fonctions sont en liaison lexicale'); process.exit(1); }

let ok=0, ko=0;
function check(lbl, cond, detail){ (cond?ok++:ko++); console.log((cond?'OK   ':'ECHEC')+' | '+lbl+(detail?' — '+detail:'')); }
const TOL=2e-4;
function proche(a,b){ return a!==undefined && b!==undefined && Math.abs(a-b)<=TOL; }

// --- test 1 : formats attendus -----------------------------------------
console.log('\n--- §10.1  Parseur — les formats attendus ---');
const T1=[
 ['43.267710, 6.622611',43.267710,6.622611,'DD'],
 ['43,267710, 6,622611',43.267710,6.622611,'DD'],
 ['43.267710 6.622611',43.267710,6.622611,'DD'],
 ['43.267710; 6.622611',43.267710,6.622611,'DD'],
 ["43°16.063'N 6°37.357'E",43.267717,6.622617,'DM'],
 ["43°16,063'N 6°37,357'E",43.267717,6.622617,'DM'],
 ['43°16\'03.8"N 6°37\'21.4"E',43.267722,6.622611,'DMS'],
 ['47.4869, -3.0997',47.4869,-3.0997,'DD'],
 ["47°29.214'N 3°05.982'W",47.4869,-3.0997,'DM'],
 ['43,267710 6,622611',43.267710,6.622611,'DD'],
 ['43,267710; 6,622611',43.267710,6.622611,'DD'],
 ['43,2677N 6,6226E',43.2677,6.6226,'DD'],
 ['43,26, 6,62',43.26,6.62,'DD'],
 ['43°16\'03,8"N 6°37\'21,4"E',43.267722,6.622611,'DMS'],
];
T1.forEach(([s,lat,lon,fmt])=>{ const r=t.parserCoordonnees(s);
  check(JSON.stringify(s), !!r && proche(r.lat,lat) && proche(r.lon,lon) && r.format===fmt,
        r?('lat='+r.lat+' lon='+r.lon+' format='+r.format):'null'); });

// --- test 1bis : virgule certaine --------------------------------------
console.log('\n--- §10.1bis  Virgule, les cas certains (v2.31) ---');
[['43,267710, 6,622611',43.267710,6.622611],['43,267710 6,622611',43.267710,6.622611],
 ['43,267710;6,622611',43.267710,6.622611],['43,267710; 6,622611',43.267710,6.622611],
 ['43,2677N 6,6226E',43.2677,6.6226],['43,26 N, 6,62 E',43.26,6.62],
 ['43,26, 6,62',43.26,6.62],["43°16,063'N 6°37,357'E",43.267717,6.622617],
 ['44,6683 -1,1703',44.6683,-1.1703]].forEach(([s,lat,lon])=>{
  const r=t.parserCoordonnees(s);
  check(JSON.stringify(s), !!r && proche(r.lat,lat) && proche(r.lon,lon), r?('lat='+r.lat+' lon='+r.lon):'null'); });

// --- test 2 : refus ------------------------------------------------------
console.log('\n--- §10.2  Ce qui doit être refusé ---');
['Saint-Tropez','Le Pradic','Quiberon','abc','','  ','91.5, 6.6','43.2, 200.1','43.26']
 .forEach(s=>{ const r=t.parserCoordonnees(s); check('refus de '+JSON.stringify(s), r===null, JSON.stringify(r)); });

// --- test 2bis : virgule indécidable ------------------------------------
console.log('\n--- §10.2bis  Virgule indécidable (v2.31) ---');
['43,16','44,1','1,5','-1,16','43, 6','43,267710,6'].forEach(s=>{
  const r=t.parserCoordonnees(s);
  check('ambigu : '+JSON.stringify(s), !!r && r.ambigu===true && r.lat===undefined, JSON.stringify(r)); });
const la=t.lecturesAmbigues('43,16');
check("lecturesAmbigues('43,16')", !!la && la.decimale==='43.16' && la.couple==='43 16', JSON.stringify(la));
check("la lecture décimale '43.16' seule reste incomplète (aide au format)", t.parserCoordonnees('43.16')===null, JSON.stringify(t.parserCoordonnees('43.16')));
check("la lecture couple '43 16' est acceptée", !!t.parserCoordonnees('43 16'), JSON.stringify(t.parserCoordonnees('43 16')));
check("lecturesAmbigues('43,267710,6') → null", t.lecturesAmbigues('43,267710,6')===null, JSON.stringify(t.lecturesAmbigues('43,267710,6')));
['Gruissan, Aude','Port-Camargue, Gard'].forEach(s=>
  check('nom de lieu à virgule : '+JSON.stringify(s), t.parserCoordonnees(s)===null, JSON.stringify(t.parserCoordonnees(s))));

// --- test 3 : inversion --------------------------------------------------
console.log('\n--- §10.3  Garde-fou d\'inversion lat/lon ---');
const inv=t.parserCoordonnees('6.622611, 43.267710');
check('couple inversé corrigé + drapeau', !!inv && proche(inv.lat,43.26771) && proche(inv.lon,6.622611) && inv.inverse===true, JSON.stringify(inv));
const dedans=t.parserCoordonnees('47.0, 2.0');
check('couple dont les deux lectures sont dans l\'emprise : non corrigé', !!dedans && dedans.inverse!==true, JSON.stringify(dedans));
const hors=t.parserCoordonnees('60.0, 20.0');
check('couple hors emprise dans les deux sens : accepté tel quel', !!hors && proche(hors.lat,60) && proche(hors.lon,20) && hors.inverse!==true, JSON.stringify(hors));

// --- test 4 : contrat du provider ---------------------------------------
console.log('\n--- §10.4  Contrat du provider GpsGeocoder ---');
const g=t.GpsGeocoder;
check("name === 'gps'", g.name==='gps', String(g.name));
check('placeholder ≤ 32 caractères', typeof g.placeholder==='string' && g.placeholder.length<=32, (g.placeholder||'').length+' car.');
(async()=>{
 const r1=await g.search('43.267710, 6.622611');
 check('coordonnées valides → 1 résultat, icon pin, center [lon,lat], data.gps',
   Array.isArray(r1)&&r1.length===1&&r1[0].icon==='pin'&&Array.isArray(r1[0].center)
   &&proche(r1[0].center[0],6.622611)&&proche(r1[0].center[1],43.267710)&&!!r1[0].data&&!!r1[0].data.gps,
   JSON.stringify(r1&&r1[0]&&{t:r1[0].title||r1[0].label||r1[0].name,c:r1[0].center,icon:r1[0].icon}));
 const r2=await g.search('6.622611, 43.267710');
 const d2=r2&&r2[0]&&(r2[0].description||'');
 check("couple inversé → description contenant « invers »", /invers/i.test(d2), JSON.stringify(d2));
 const r3=await g.search('43.26');
 const lib3=r3&&r3[0]&&(r3[0].title||r3[0].label||r3[0].name||'');
 check("saisie incomplète → aide, libellé = la saisie", !!r3&&r3.length===1&&r3[0].data&&r3[0].data.aide===true&&lib3==='43.26', JSON.stringify({lib:lib3,data:r3&&r3[0]&&r3[0].data}));
 const r4=await g.search('43,16');
 const o4=r4&&r4[0]; const lib4=o4&&(o4.title||o4.label||o4.name||''); const d4=o4&&(o4.description||'');
 check("virgule ambiguë → 1 résultat d'aide, libellé = saisie, pas de data.gps",
   !!r4&&r4.length===1&&o4.data&&o4.data.aide===true&&lib4==='43,16'&&!o4.data.gps, JSON.stringify({lib:lib4,data:o4&&o4.data}));
 check("description = « Écrivez 43.16 ou 43 16 — virgule ambiguë »", d4==='Écrivez 43.16 ou 43 16 — virgule ambiguë', JSON.stringify(d4));
 check('description ≤ 40 caractères', typeof d4==='string'&&d4.length<=40, (d4||'').length+' car.');
 const r5=await g.search('Saint-Tropez');
 check('libellé de lieu → tableau vide', Array.isArray(r5)&&r5.length===0, JSON.stringify(r5));
 let jete=false; try{ if(g.onSelect) g.onSelect(r4[0]); }catch(e){ jete=true; }
 check("onSelect sur une entrée d'aide ne jette pas et ne fait rien", !jete, '');

 // --- test 4bis : plancher de zoom + absence de minzoom -----------------
 console.log('\n--- §10.4bis  Plancher de zoom et minzoom ---');
 check("allerAuPointGps utilise Math.max(map.getZoom(), 14)", /Math\.max\(\s*map\.getZoom\(\)\s*,\s*14\s*\)/.test(script), '');
 check('aucune couche de COUCHES ne déclare minzoom', !/\bminzoom\s*:/.test(script.slice(script.indexOf('const COUCHES'), script.indexOf('const map = new maplibregl.Map'))), '');

 console.log('\nRESULTAT §10 (Node) : '+ok+' OK, '+ko+' ECHEC');
 process.exit(ko?1:0);
})();
