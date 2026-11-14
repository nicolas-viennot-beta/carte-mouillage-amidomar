# Harnais de test de la carte AMIDOMAR

Les harnais que `TESTS_FONCTIONNELS.md` demande d'exécuter avant toute
livraison de `index.html`. Ils vivaient jusqu'ici dans le dossier de
travail de Claude, donc perdus à chaque session et réécrits de zéro à chaque
fois — avec les mêmes pièges redécouverts à chaque réécriture. Ils sont ici
pour que ça n'arrive plus.

**Dans le dépôt de la carte depuis le 14/11/2026** (auparavant
`scripts/tests-carte/`, hors dépôt). Publiés avec le site par GitHub Pages,
mais jamais chargés par la carte : ce sont des outils de vérification.

**Installation, une fois par poste** (Node.js requis) :

```bash
cd tests && npm install && npx playwright install chromium
```

`node_modules/` et `.tmp/` sont ignorés par Git.

Tous résolvent `../index.html` par un chemin **relatif à ce dossier** :
ils tournent aussi bien depuis le Terminal de Nicolas que depuis une session
Claude, sans rien configurer.

## Les scripts

| Script | Couvre | Comment |
|---|---|---|
| `harness_integrite.js` | §6.1 syntaxe, §6.1bis exécution réelle, §6.1quinquies focus, §6.3 `rayonEvitage` | `node harness_integrite.js` |
| `test_recherche_gps.js` | §10.1 à §10.4bis — parseur de coordonnées, virgule, inversion, contrat du provider | `node test_recherche_gps.js` |
| `test_donnees_aot.py` | Intégrité de `data/aot-existantes.geojson` et du jeu `SECOURS` (§16) | `python3 test_donnees_aot.py` |
| `test_interface_chromium.js` | §10.5 à §10.9bis — déroulant, sélection, équivalence clic rejoué / vrai clic | `node test_interface_chromium.js` — **Playwright requis** |
| `test_regles_locales.js` | §17 — `decisionCoordonnees`, `zoneReserveePro`, trois états de la carte de règle locale, données `ddtm-messages.json` / `zones-aot.geojson` | `node test_regles_locales.js` |
| `test_regles_locales_chromium.js` | §17.5 — rendu réel des cas hors zone 83, en zone 83, hors zone 56, en zone 56 (v2.38), 22, Shom simulé par `page.route`, hauteur rendue du paragraphe de masquage | `node test_regles_locales_chromium.js` — **Playwright requis** |
| `test_mouillages_voisins_chromium.js` | §15 bis — place du bloc « Mouillages voisins » (avant « Contexte environnemental », avec et sans contexte), orange tant que la longueur est vide | `node test_mouillages_voisins_chromium.js` — **Playwright requis** |
| `test_zones_secteurs_chromium.js` | §19.2 — liste des zones rangée Secteur → Commune → Zone, zones proches, rendu et clics (v2.37) | `node test_zones_secteurs_chromium.js` — **Playwright requis** |
| `stub.js` | Le stub DOM partagé par les deux harnais Node | — |
| `tirage_aot.js` | Régénérer les 248 positions simulées d'AOT | à coller dans la console de la carte **publiée** |

Les harnais `*_chromium.js` ont besoin de Playwright (version figée dans
`package.json`, installé sur le Mac de Nicolas le 14/11/2026). Les autres
n'ont besoin que de Node et de Python.

**Point ouvert (14/11/2026)** : `test_interface_chromium.js` s'arrête au §10.7 —
après sélection d'un point GPS, le bouton « Réduire » du popup de coordonnées
recouvre le champ de recherche et intercepte le clic. Chevauchement réel ou
harnais non adapté à la mise en page v2.36 : à trancher.

## Ce que ces harnais ne vérifient pas

Ils tournent **réseau coupé** : pas de fond de carte, pas de trait terre-mer,
pas d'API Carto. La chaîne complète au-dessus de l'eau (§10.10) et l'arrivée de
loin sur un port (§10.12) ne se vérifient que dans un navigateur réel, sur la
version publiée. Ne pas conclure d'un harnais au vert que la carte fonctionne.

## Trois pièges, pour ne pas les repayer

1. **Le déroulant de recherche est en retard d'un cran.** Vider le champ ne vide
   pas la liste : les entrées de la requête précédente restent affichées pendant
   le debounce. Un harnais qui attend « au moins une entrée » lit donc la réponse
   d'avant — et peut passer au vert pour la mauvaise raison. Attendre que le
   contenu **change**.
2. **Les fonctions sont en liaison lexicale.** `parserCoordonnees`, `GpsGeocoder`
   et leurs voisines sont des `const` au niveau racine : invisibles depuis le
   sandbox `vm` sans la ligne de pont `globalThis.__t = {…}` ajoutée en fin de
   script. Sans elle, les tests échouent sur le harnais et non sur le code.
3. **Une lacune de stub ressemble à un bug.** `getSource()` qui rend `undefined`,
   `querySelector()` qui rend `null`, `window` sans `addEventListener`,
   `parentElement` absent : chacune arrête l'exécution à un endroit plausible.
   Une exception **après** un `await` imputable au stub n'est pas bloquante ;
   une exception dans la phase synchrone l'est jusqu'à preuve du contraire.

## Le tirage des AOT

`tirage_aot.js` ne tourne **que** dans la console de la carte publiée : le WFS
du Shom n'autorise le CORS que depuis cette origine, et ni cette machine ni le
conteneur Claude n'atteignent `services.data.shom.fr`. Il est déterministe
(graine 20261029) : le rejouer redonne le fichier livré. Méthode, mesures et
contrôles : `data/SOURCES.md` §10.
