// Carte AMIDOMAR — harnais d'intégrité (TESTS_FONCTIONNELS.md §6)
//   node harness_integrite.js
// Couvre : 6.1 syntaxe, 6.1bis exécution réelle, 6.1quinquies focus, 6.3 rayonEvitage.
const fs = require('fs'), vm = require('vm'), path = require('path');
const FILE = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(FILE, 'utf8');
const blocs = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const script = blocs[blocs.length - 1];
console.log('index.html :', FILE);
console.log('blocs <script> inline :', blocs.length, '— dernier :', script.length, 'caractères');

try { new Function(script); console.log('TEST 6.1  syntaxe JavaScript : OK'); }
catch (e) { console.log('TEST 6.1  syntaxe : ECHEC —', e.message); process.exit(1); }

const H = require('./stub.js');
const sandbox = H.sandbox({ tracerFocus: true });
vm.createContext(sandbox);
let err = null;
const PONT = '\n;globalThis.__t = { rayonEvitage };';
try { vm.runInContext(script + PONT, sandbox, { filename: 'index.html#script', timeout: 20000 }); }
catch (e) { err = e; }
if (err) {
  console.log('TEST 6.1bis exécution réelle : ECHEC (phase synchrone)');
  console.log('   ', err.constructor.name + ':', err.message);
  console.log((err.stack || '').split('\n').slice(0, 6).join('\n'));
  process.exit(1);
}
console.log('TEST 6.1bis exécution réelle : OK — phase synchrone exécutée sans exception');
console.log('   écouteurs map enregistrés :', Object.keys(sandbox.__mapHandlers || {}).join(', ') || '(aucun)');
const nf = (sandbox.__focusCalls || []).length;
console.log('TEST 6.1quinquies focus à l\'initialisation :', nf === 0 ? 'OK (0 focus)' : 'ECHEC (' + nf + ')');
const t = sandbox.__t || {};
if (typeof t.rayonEvitage === 'function') {
  const a = t.rayonEvitage(10, 4), b = t.rayonEvitage(6, 10);
  console.log('TEST 6.3  rayonEvitage(10,4)=' + a + ' rayonEvitage(6,10)=' + b, (a === 16 && b === 21) ? ': OK' : ': ECHEC');
} else { console.log('TEST 6.3  rayonEvitage non exposée par le pont — à vérifier autrement'); }
