# Carte AMIDOMAR — Tests fonctionnels (à exécuter par Claude)

Ce document liste les tests fonctionnels que Claude doit exécuter lui-même
avant de proposer une évolution ou un déploiement de `prototype/index.html`.
Il est distinct de la checklist manuelle du §9 de
`DOCUMENTATION_FONCTIONNELLE.md` (destinée à un test humain en conditions
réelles, dans un navigateur) : ici, chaque test précise l'action, le
résultat attendu, et la méthode de vérification à la portée de Claude
(lecture du code, vérification de syntaxe, inspection logique, ou test
visuel quand un navigateur est disponible).

Ce fichier est complété au fil des évolutions (voir le skill
`amidomar-doc-sync`) : les tests existants ne sont retirés que si la
fonctionnalité correspondante a réellement disparu.

---

## 1. Détection terre/eau (`estSurLEau`, carte fantôme)

1. **Carte fantôme présente et configurée**
   - Action : lire la déclaration de `mapTerrain` dans `index.html`.
   - Attendu : `style: CarteFacile.mapStyles.simple`, `interactive: false`,
     `preserveDrawingBuffer: true`, conteneur positionné hors écran
     (`left:-99999px`), et un écouteur `map.on('move', ...)` qui synchronise
     `mapTerrain` via `jumpTo` (centre, zoom, bearing, pitch).
   - Vérification : lecture du code.

2. **`estSurLEau` interroge la carte fantôme, jamais la carte visible**
   - Action : lire le corps de `estSurLEau(lngLat)`.
   - Attendu : le point testé est `mapTerrain.project(lngLat)` et
     `queryRenderedFeatures` / `areTilesLoaded` sont appelés sur `mapTerrain`,
     jamais sur `map`.
   - Vérification : lecture du code.

3. **Confirmation par couleur**
   - Action : lire `couleurPixel` et `EAU_SIMPLE`.
   - Attendu (depuis le 18 septembre 2026) : `EAU_SIMPLE` contient une seule
     couleur, `{ r:151, g:205, b:213 }` — la couleur exacte `fill-color` de la
     couche `water` du style (`vendor/carte-facile.js`) —, tolérance de 6 par
     canal dans `couleursProches` ; lecture via `gl.readPixels` avec prise en
     compte du ratio `devicePixelRatio` et de l'inversion de l'axe Y.
     L'ancienne deuxième teinte (`{ r:199, g:228, b:219 }`) a été retirée : à
     7 près de `rgb(192,229,219)`, la couleur exacte des marais
     (`landcover_wetland`) et des plages/dunes (`landcover_sand`) sur ce même
     style, elle confirmait « eau » des points de terre (voir test 7).
   - Vérification : lecture du code.

4. **`TERRE` couvre aussi le socle générique OpenMapTiles**
   - Action : lire la regex `TERRE`.
   - Attendu (depuis le 18 septembre 2026) : en plus des couches IGN
     (`oro_relief`, `ocs_`, `bati_`, `routier_`, `ferre`), la regex couvre
     `landcover`, `landuse`, `building` et `aeroway` — le socle générique
     OpenMapTiles du même style, qui porte notamment marais, plages, dunes,
     prés, champs et bois.
   - Vérification : lecture du code.

5. **Test visuel (si navigateur disponible) : clic à terre sur fond Simple**
   - Action : ouvrir la carte, sélectionner le fond Simple, cliquer sur une
     zone de relief/bâti loin de la mer.
   - Attendu : popup rouge « Vous êtes à terre », aucune coordonnée affichée.
   - Vérification : visuelle.

6. **Test visuel (si navigateur disponible) : clic à terre sur fond Aérien**
   - Action : basculer sur le fond Aérien, cliquer sur une zone de terre
     éloignée de toute route (le cas qui échouait avant la correction de la
     carte fantôme).
   - Attendu : même alerte « Vous êtes à terre » que sur le fond Simple.
   - Vérification : visuelle — **test de non-régression prioritaire**, c'est
     le bug corrigé le 16 septembre 2026.

7. **Test visuel (si navigateur disponible) : clic sur un marais ou une plage**
   - Action : cliquer sur une zone de marais, de plage ou de dune, à l'écart
     de tout bâti ou route (ex. le secteur signalé le 18 septembre 2026, au
     nord-est des Sables-d'Olonne, 46.505134, -1.629184).
   - Attendu : popup rouge « Vous êtes à terre », aucune coordonnée affichée —
     **avant le correctif du 18 septembre 2026, ce point affichait à tort des
     coordonnées et le bloc environnement (Natura 2000/ZNIEFF), comme si le
     clic avait eu lieu en mer.**
   - Vérification : visuelle — **test de non-régression prioritaire**.
   - Vérification alternative (sans navigateur) : reproduit et validé le
     18 septembre 2026 par un test d'exécution isolé de `TERRE`/`EAU_SIMPLE`/
     `couleursProches` (mêmes valeurs que le code, sourceLayer `landcover` et
     pixel `rgb(192,229,219)`) — résultat `false` (terre) avec le code
     corrigé, `true` (eau) reproduit avec l'ancien code. La validation
     visuelle de bout en bout sur les tuiles réelles reste à faire dès qu'un
     navigateur avec accès réseau normal est disponible.

8. **Clic sur l'eau, sur les deux fonds**
   - Action : cliquer sur une zone de mer, sur Simple puis sur Aérien.
   - Attendu : dans les deux cas, marqueur posé, coordonnées affichées,
     bouton Copier visible.
   - Vérification : visuelle.

---

## 2. Sélecteur de fond de carte (`MapSelectorControl`)

1. **Fonds limités à Simple et Aérien**
   - Action : lire l'appel `new CarteFacile.MapSelectorControl({...})`.
   - Attendu : `styles: ['simple', 'aerial']`.
   - Vérification : lecture du code.

2. **Aucune surcouche proposée**
   - Action : lire le même appel.
   - Attendu : `overlays: []`.
   - Vérification : lecture du code.

3. **Test visuel : contenu du sélecteur**
   - Action : ouvrir le sélecteur de fond de carte (bas-gauche).
   - Attendu : section « Cartes » avec seulement Simple et Aérien ; aucune
     section « Surcouches ».
   - Vérification : visuelle.

---

## 3. Couche « à venir » (APB / zone de baignade / zone réglementaire)

1. **Marquage en configuration**
   - Action : lire l'entrée `restrictions_diverses` dans `COUCHES`.
   - Attendu : `aVenir: true`, `label` = « APB / zone de baignade / zone
     réglementaire », avec une note commençant par « À venir : ».
   - Vérification : lecture du code.

2. **Aucun chargement pour cette couche**
   - Action : lire le début de la boucle `for (const c of COUCHES)`.
   - Attendu : `if (c.aVenir) continue;` avant toute autre logique — ni
     `fetch`, ni `map.addSource`, ni `map.addLayer`, ni écouteur de
     changement sur la case à cocher pour cette entrée.
   - Vérification : lecture du code.

3. **Rendu grisé dans le panneau**
   - Action : lire le template du panneau « Couches affichées ».
   - Attendu : pour une entrée `aVenir`, la case est `disabled` et non
     précochée, la classe `layer-item--a-venir` est appliquée, et un
     `<p class="layer-note--a-venir">À venir</p>` suit l'item — pas de
     `<span class="layer-status">` pour cette entrée.
   - Vérification : lecture du code.

4. **Test visuel : légende**
   - Action : ouvrir le panneau « Couches affichées ».
   - Attendu : une seule ligne « APB / zone de baignade / zone
     réglementaire » apparaît grisée, case décochée et désactivée, avec la
     mention « À VENIR » en dessous ; aucun ✓/✗/○/≈ n'apparaît pour cette
     ligne.
   - Vérification : visuelle.

5. **Parcs naturels marins, Aires marines protégées, Herbiers de posidonie
   et de zostère : affichage normal rétabli (non-régression v1.2)**
   - Action : lire les entrées `pnm`, `amp`, `posidonie` dans `COUCHES`.
   - Attendu : **aucune** des trois n'a `aVenir: true` ; elles sont
     chargées, cochables/décochables comme n'importe quelle autre couche.
   - Vérification : lecture du code — test de non-régression prioritaire,
     ce comportement a été introduit puis délibérément annulé le
     16 septembre 2026.

6. **Test visuel : PNM/AMP/posidonie cochables**
   - Action : ouvrir le panneau « Couches affichées », cocher/décocher
     Parcs naturels marins, Aires marines protégées, Herbiers de posidonie
     et de zostère.
   - Attendu : chaque couche apparaît/disparaît normalement sur la carte,
     aucune case n'est grisée ni désactivée pour ces trois lignes.
   - Vérification : visuelle.

---

## 4. Contenus textuels (libellés)

1. **Bifurcation d'accueil**
   - Action : rechercher le texte de `.bif-titre` dans `index.html`.
   - Attendu : « Tout d'abord, regarder si un emplacement en port ou ZMEL
     est possible ? »
   - Vérification : lecture du code.

2. **Légende posidonie**
   - Action : rechercher le `label` de l'entrée `posidonie` dans `COUCHES`.
   - Attendu : « Herbiers de posidonie et de zostère ».
   - Vérification : lecture du code.

3. **Libellés du formulaire navire (dans le popup de coordonnées) — v1.5**
   - Action : rechercher les `<label>` du formulaire navire.
   - Attendu : **deux champs seulement** — « Longueur de mon navire (m) »
     (`in-loa`) et « Colonne d'eau à marée haute (m) » (`in-depth`). Le champ
     `in-scope` (« Longueur de la ligne de mouillage », menu 3× / 5× / 7×) a
     été retiré en v1.5 : aucune occurrence de `in-scope` ne doit subsister,
     ni dans le HTML, ni dans les écouteurs, ni dans `recalculer()`.
   - Vérification : lecture du code.

4. **Réserves naturelles nationales absentes**
   - Action : rechercher `rnn` et « Réserves naturelles nationales » dans
     `index.html`.
   - Attendu : aucune occurrence.
   - Vérification : lecture du code (`grep`).

---

## 5. Traitement unifié du clic sur la carte (v1.2)

1. **Panneau « Mon mouillage » supprimé**
   - Action : rechercher toute trace d'un panneau latéral dédié « Mon
     mouillage » distinct du popup de coordonnées.
   - Attendu : aucune occurrence — le formulaire navire (`boatBlock`) est
     injecté à l'intérieur de `#coords-popup`, pas dans un panneau latéral
     séparé.
   - Vérification : lecture du code (`grep`).

2. **Ordre de priorité de la cascade de clic**
   - Action : lire le corps du gestionnaire `map.on('click', async e =>
     {...})`.
   - Attendu : ports/ZMEL gérés par leurs écouteurs dédiés et retournent
     avant toute autre logique ; puis test `estSurLEau` (terre) ; puis test
     cultures marines (interdiction) ; puis, seulement sinon, pose du
     marqueur + appel à `interrogerZonesProtegees` + `afficherEnvironnement`.
   - Vérification : lecture du code.

3. **Cultures marines : popup d'interdiction**
   - Action : lire la branche « cultures marines » du gestionnaire de clic.
   - Attendu : popup teinte rouge, pas de marqueur posé, pas de coordonnées
     affichées, pas d'appel à `interrogerZonesProtegees`.
   - Vérification : lecture du code.

4. **Test visuel : clic en zone de cultures marines**
   - Action : cliquer dans une zone de `data/cultures-marines.geojson`.
   - Attendu : popup rouge d'interdiction, aucune coordonnée GPS affichée.
   - Vérification : visuelle.

5. **API Carto IGN : requête et timeout — codes de couche corrigés (17 sept. 2026)**
   - Action : lire `interrogerZonesProtegees(lngLat)`.
   - Attendu : appels parallèles vers `apicarto.ign.fr/api/nature/{sic,zps,
     znieff1,znieff2}` (codes officiels de l'API Carto — les codes
     précédents `natura-habitat`/`natura-oiseaux` n'existaient pas côté
     serveur et échouaient silencieusement à chaque clic) avec géométrie du
     point en paramètre `geom` ; chaque appel utilise `AbortController` avec
     un délai de 4000ms ; un échec ou timeout sur un endpoint n'empêche pas
     l'affichage du résultat des autres, ni l'affichage des coordonnées.
   - Vérification : lecture du code.

5bis. **Champ du nom de site — corrigé (17 sept. 2026)**
   - Action : lire la lecture de `f.properties` dans `interrogerZonesProtegees`.
   - Attendu : le nom est lu sur `properties.nom` pour les quatre couches
     (le champ `sitename`, utilisé précédemment pour `sic`/`zps`, n'est pas
     le bon champ documenté par l'IGN).
   - Vérification : lecture du code.

5ter. **Messages distincts Natura 2000 / ZNIEFF (17 sept. 2026)**
   - Action : lire le bloc `blocsZones` dans le gestionnaire de clic.
   - Attendu : un message Natura 2000 (mention de l'évaluation
     environnementale et du report du nom de la zone dans le formulaire de
     demande) apparaît uniquement si `natura.length`, listant les noms de
     sites ; un message ZNIEFF distinct, générique (aucun nom ni type
     affiché, recommandation de pratiques de mouillage durables) apparaît
     uniquement si `znieff.length` ; les deux peuvent s'afficher ensemble
     si le point relève des deux à la fois.
   - Vérification : lecture du code.

6. **Test visuel : zone Natura 2000/ZNIEFF détectée**
   - Action : cliquer sur l'eau à un endroit couvert par une zone Natura
     2000 ou ZNIEFF connue.
   - Attendu : popup affichant le(s) nom(s) de zone (`properties.nom`)
     après un court délai, teinte neutre/orange ; message ZNIEFF sans nom
     ni type si la zone est une ZNIEFF plutôt qu'un site Natura 2000.
   - Vérification : visuelle (nécessite un accès réseau à apicarto.ign.fr,
     via le navigateur Claude ou le navigateur de l'utilisateur — bloqué
     depuis le bac à sable serveur, voir note technique cartographie). Non
     exécuté dans cet environnement lors de la correction du 17 septembre
     2026 — à faire en conditions réelles avant déploiement.

7. **Test visuel : aucune zone détectée**
   - Action : cliquer sur l'eau hors de toute zone Natura 2000/ZNIEFF
     connue, à plus de 100 m de toute AOT.
   - Attendu : popup vert « pas de contre-indication identifiée », mention
     rappelant les couches non détectables (PNM, AMP, herbiers, APB,
     baignade, zone réglementaire), coordonnées GPS affichées, aucun
     formulaire navire.
   - Vérification : visuelle.

8. **Test visuel : repli en cas d'échec réseau**
   - Action : couper ou simuler l'indisponibilité de `apicarto.ign.fr`
     (ex. via le mode hors-ligne des outils de développement), puis
     cliquer sur l'eau.
   - Attendu : au bout de 4 secondes maximum, le popup affiche un état de
     secours (interrogation indisponible) sans bloquer l'affichage des
     coordonnées GPS.
   - Vérification : visuelle.

9. **Formulaire navire conditionnel (gate 100 m) — désormais silencieux (v1.5)**
   - Action : lire la variable/logique `formNavireRequis` et son usage dans
     `recalculer()` et `majEtapes()`.
   - Attendu : `formNavireRequis` vrai seulement si `distanceM` entre le point
     cliqué et l'AOT existante la plus proche est `< 100`; si faux,
     `boatBlock` reste masqué et `recalculer()` retourne un état vide sans
     erreur. **La condition ne fait plus intervenir `aotVisibles`** : la
     vérification est silencieuse, indépendante de la case « AOT existantes »
     (spec Réactions au clic, C6).
   - Vérification : lecture du code.

9bis. **Recherche de chevauchement toujours effectuée (v1.5)**
   - Action : lire le calcul de `conflits` dans `recalculer()`.
   - Attendu : le filtre sur `aotPositions` est appliqué inconditionnellement.
     La branche « Les AOT existantes sont masquées : aucune recherche de
     recoupement n'est effectuée » a été supprimée et ne doit plus apparaître
     nulle part dans le fichier.
   - Vérification : lecture du code.

9ter. **Cascade d'affichage C6 en trois temps (v1.5)**
   - Action : lire `boatBlock.innerHTML` et la fin de `recalculer()`.
   - Attendu : (1) un message de détection dans un `div.jaune-box`
     (« D'autres mouillages sont enregistrés à proximité… ») en tête du bloc
     navire, contenant un `span#rappel-filtre-aot` (« Activez le filtre AOT
     pour les voir… ») ; (2) le formulaire ; (3) le résultat, `div.warn-box`
     en cas de chevauchement (« L'estimation montre un risque de
     chevauchement… ») ou `div.ok-box` sinon (« Nous n'avons pas identifié de
     chevauchement… »). Le décompte d'AOT au fichier ne figure plus dans le
     message vert.
   - Vérification : lecture du code.

9quater. **Rappel du filtre AOT conditionnel (v1.5)**
   - Action : lire le traitement de `rappel-filtre-aot` dans `recalculer()`.
   - Attendu : `style.display` vaut `'none'` quand `aotVisibles` est vrai, et
     `''` sinon — inviter à activer un filtre déjà actif n'aurait pas de sens.
     Le reste de la cascade s'affiche dans les deux cas.
   - Vérification : lecture du code.

10. **Test visuel : clic à moins de 100 m d'une AOT**
    - Action : cliquer sur l'eau à proximité immédiate (< 100 m) d'une AOT
      existante (`data/aot-existantes.geojson`).
    - Attendu : le message de détection sur fond orange apparaît, suivi du
      formulaire à **deux champs** (longueur du navire, colonne d'eau à marée
      haute) ; la saisie déclenche le tracé du cercle d'évitage (vert/rouge
      selon chevauchement) et le message de résultat correspondant. À refaire
      **couche AOT décochée** : tout doit se comporter à l'identique, avec en
      plus le rappel « Activez le filtre AOT ».
    - Vérification : visuelle.

11. **Test visuel : clic à plus de 100 m de toute AOT**
    - Action : cliquer sur l'eau loin (> 100 m) de toute AOT existante.
    - Attendu : le formulaire navire n'apparaît pas ; seules les
      coordonnées (et le bloc environnement) sont affichées.
    - Vérification : visuelle.

12. **Modales Port et ZMEL conservées (pas de popup)**
    - Action : lire `modalePort(p)` et `modaleZmel(z)`.
    - Attendu : ces deux cas utilisent toujours la modale existante (pas le
      nouveau système de popup non bloquant). **La phrase « Pas d'AOT
      individuel sur cette zone » a été supprimée des deux modales en v1.5**
      et ne doit plus apparaître nulle part dans le fichier (elle a également
      été retirée du cas cultures marines). Titres attendus :
      « Port de plaisance : {nom} — Commune :{commune} » et « Zone de
      mouillages et d'équipements légers : {nom} — Commune :{commune} » ;
      ouvertures « Vous êtes dans un bassin portuaire qui… » et « Vous êtes
      sur une ZMEL qui… ».
    - Vérification : lecture du code, plus test d'exécution des deux fonctions
      (voir §6.1ter).

13. **Données placeholder ZMEL**
    - Action : lire l'entrée ZMEL dans `SECOURS` et/ou
      `data/zmel.geojson`, et le rendu dans `modaleZmel`.
    - Attendu : présence de `nb_postes`, `gestionnaire`, `mailto` ; ces
      valeurs sont affichées dans la modale.
    - Vérification : lecture du code.

---

## 6. Intégrité générale

1. **Syntaxe JavaScript valide**
   - Action : extraire le contenu du dernier bloc `<script>` de
     `index.html` et le passer à `new Function(...)`.
   - Attendu : aucune erreur de syntaxe.
   - Vérification : exécution (Node.js), à refaire après **toute**
     modification du fichier avant de le considérer livrable.

1ter. **Test d'exécution des modales Port et ZMEL (v1.5)**
   - Action : extraire `modalePort` et `modaleZmel` du script, les exécuter
     dans Node.js avec un `ouvrirModale` simulé qui capture ses arguments.
   - Attendu, pour chacune : titre au format de la spec (C1/C2) ; absence de
     « Pas d'AOT individuel » ; nouvelle phrase d'ouverture ; accord
     singulier/pluriel correct sur le nombre de places ; **repli sur les
     anciens noms de champs** (`nom`, `commune`) quand les nouveaux
     (`nom_port_de_plaisance`, `nom_zmel`, `nom_commune`) sont absents ;
     absence de tiret orphelin quand la commune est vide ; pour la ZMEL,
     `modaleZmel(null)` (clic depuis la légende) ne doit pas planter, et
     l'absence de `nb_postes` ou de `mailto` doit basculer sur les replis.
   - Vérification : exécution (Node.js). Ce test couvre les cas d'absence de
     donnée qu'une simple lecture du code laisse passer.

1quater. **Noms de champs des fichiers de données (v1.5)**
   - Action : lire `data/ports-plaisance.geojson`, `data/zmel.geojson` et les
     jeux `SECOURS` correspondants dans `index.html`.
   - Attendu : `nom_port_de_plaisance` et `nom_commune` pour les ports,
     `nom_zmel` et `nom_commune` pour les ZMEL, dans les fichiers **comme**
     dans les jeux de secours inline. Le JSON doit rester valide (parse sans
     erreur). Le code, lui, doit continuer d'accepter les anciens noms en
     repli : ce repli est intentionnel et ne doit pas être supprimé tant que
     les fichiers territoriaux ne sont pas tous renommés.
   - Vérification : exécution (parse JSON) + lecture du code.

1bis. **Exécution réelle du script (insuffisance du test de syntaxe seul)**
   - Action : exécuter le script extrait dans Node.js avec des objets
     globaux simulés (`document`, `window`, `navigator`, `fetch`,
     `maplibregl.Map`/`Marker`/`NavigationControl`/`GeolocateControl`/
     `ScaleControl`, `CarteFacile.SearchControl`/`MapSelectorControl`), un
     stub générique inerte suffisant pour tout élément DOM non explicitement
     simulé.
   - Attendu : aucune exception pendant la phase d'exécution synchrone
     (avant le premier `await`) — en particulier aucune `ReferenceError` de
     zone morte temporelle (variable `const`/`let` utilisée avant sa
     déclaration au niveau racine), qu'un simple test de syntaxe ne détecte
     pas.
   - Vérification : exécution (Node.js). Une erreur survenant après un
     `await`/dans un callback différé et imputable à une lacune du stub
     (méthode d'une librairie tierce non simulée) n'est pas bloquante ; une
     erreur synchrone l'est jusqu'à preuve du contraire.

2. **Ports/ZMEL toujours interactifs**
   - Action : relire §4.1 de `DOCUMENTATION_FONCTIONNELLE.md` et les
     gestionnaires de clic/survol correspondants dans `index.html`.
   - Attendu : aucune régression introduite par les changements récents
     (carte fantôme, cascade de clic unifiée, API Carto) sur les couches
     `ports` et `zmel`.
   - Vérification : lecture du code.

3. **Rayon d'évitage — nouvelle formule (v1.5)**
   - Action : relire `rayonEvitage` et son usage dans `recalculer()`.
   - Attendu : `rayonEvitage(loa, profondeur)` renvoie
     `profondeur * 1.5 + loa`. La signature ne comporte plus de paramètre
     `ratio`, `CONFIG.ratioMouillage` a été supprimé, et aucune occurrence de
     `ratioMouillage` ou `in-scope` ne subsiste. Contrôles chiffrés :
     `rayonEvitage(10, 4) === 16` et `rayonEvitage(6, 10) === 21`. La formule
     donne des rayons plus courts que l'ancienne (`√(ligne² − colonne d'eau²)
     + loa` donnait 29,6 m dans le premier cas) : **c'est voulu**, moins de
     chevauchements sont signalés.
   - Vérification : exécution (Node.js) — extraire la fonction du script et
     vérifier les valeurs attendues, plutôt qu'une simple lecture.
