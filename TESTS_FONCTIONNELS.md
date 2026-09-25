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

**Dernière exécution complète : 23 sept. 2026 (v2.3), avant commit.**
- Lecture du code (script de vérification automatisé) : §1.1-1.4, §2.1-2.2,
  §3.1-3.3, §3.4bis, §3.5, §4.1-4.4, §5.1-5.3, §5.4bis-ter, §5.5, §5.5bis,
  §5.5ter, §5.5sexies, §5.5septies, §5.9 à §5.9quater, §5.14, §5.15,
  §6.1quater, §6.3 — conformes.
- Exécution dans Chromium headless (serveur local, `fetch` simulé pour les
  services distants) : §6.1ter (4 cas), §5.4bis (5 scénarios, timeout mesuré
  ≈ 4 s), §5.5sexies (6 scénarios), légende §3.3/§3.4/§3.4bis, clic cultures
  marines §5.4, clic APB §5.4ter, clic Natura/ZNIEFF §5.6, aucune zone §5.7,
  tout hors ligne §5.8, copie §5.12, fermeture/Échap §5.14, scénario v2.3
  §5.16 — conformes, aucune `pageerror`.
- Node.js (§6.1, §6.1bis) : syntaxe OK, phase synchrone OK, événement `load`
  exécuté sans erreur.
- **Non exécutables avant publication** (fond de carte et services réels
  inaccessibles depuis l'environnement de test) : §1.5-1.8 (terre/eau sur
  tuiles réelles), §2.3, §3.6, §4quater et §5quater en réseau réel — à
  vérifier sur le site publié.

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

## 3. Couche « à venir » (zone de baignade / zone réglementaire) et couche APB

1. **Marquage en configuration**
   - Action : lire l'entrée `restrictions_diverses` dans `COUCHES`.
   - Attendu : `aVenir: true`, `label` = « Zone de baignade / zone
     réglementaire » (sans « APB » depuis la v1.8), avec une note commençant
     par « À venir : ».
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
   - Attendu : une seule ligne « Zone de baignade / zone
     réglementaire » apparaît grisée, case décochée et désactivée, avec la
     mention « À VENIR » en dessous ; aucun ✓/✗/○/≈ n'apparaît pour cette
     ligne.
   - Vérification : visuelle.

4bis. **Couche APB (v1.8)**
   - Action : lire l'entrée `apb` dans `COUCHES` et le panneau « Couches
     affichées ».
   - Attendu : `groupe:'Protection de la nature'`, `tiles: WMTS('Patrinat_APB',
     'image/png')`, `visible:true`, `statut:'verifie'`, **pas** de `aVenir`.
     Dans la légende, la ligne « Arrêtés de protection de biotope (APB) »
     figure sous « Protection de la nature », case **cochée** par défaut et
     activable ; la décocher masque la couche (`apb-layer`), la recocher la
     réaffiche. Son statut ✓/✗ vient de `testerSource`.
   - Vérification : lecture du code, puis visuelle. Contrôle du service
     fait le 21/09/2026 dans un navigateur (`Patrinat_APB` dans le
     GetCapabilities WMTS, tuiles avec contenu au Morbihan, à Brest,
     Ajaccio, en Camargue). Reste à vérifier à l'œil dans la carte publiée :
     un statut ✗ ou une carte vide sur ces sites signale un problème de
     service.

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

3. **Libellés du formulaire navire (bloc de proximité de la modale centrale depuis v2.5 ; colonne de droite en v2.3–v2.4 ; popup de coordonnées de v1.5 à v2.2)**
   - Action : rechercher les `<label>` du formulaire navire.
   - Attendu : **deux champs seulement** — « Longueur de mon navire (m) »
     (`in-loa`) et « Colonne d'eau à marée haute (m) » (`in-depth`). Le champ
     `in-scope` (« Longueur de la ligne de mouillage », menu 3× / 5× / 7×) a
     été retiré en v1.5 : aucune occurrence de `in-scope` ne doit subsister,
     ni dans le HTML, ni dans les écouteurs, ni dans `recalculer()`.
   - Vérification : lecture du code.

3bis. **Libellés v2.4 (25 sept. 2026)**
   - Action : rechercher dans `index.html` le texte de `.bif-txt`, le `label`
     de l'entrée `aot` de `COUCHES` et les propriétés des entrées
     `natura_sic` / `natura_zps`.
   - Attendu : `.bif-txt` se termine par « la moins dommageable pour les
     écosystèmes marins. » (plus aucune occurrence de « dommageable pour les
     herbiers ») ; label `aot` = « AOT de mouillage existantes et leur
     évitage » ; `natura_sic` et `natura_zps` restent deux entrées distinctes
     (labels inchangés), toutes deux `visible:true`.
   - Vérification : lecture du code (`grep`).

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
   - Attendu : aucune occurrence. Depuis v2.5, `boatBlock` (injecté dans
     `#coords-popup`) porte le message de proximité, le formulaire et le
     résultat (voir §5.9ter) ; la colonne de droite ne contient plus que
     « Couches affichées ».
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

4bis. **APB : vérification bloquante avant tout affichage (v2.0)**
   - Action : lire le gestionnaire de clic entre le test cultures marines et
     la pose du marqueur, et `interrogerAPB`.
   - Attendu : dès la sortie du test cultures marines (négatif), le marqueur
     précédent est retiré, `position` remis à `null`, les coordonnées
     masquées, et un message « Vérification de la zone… » s'affiche AVANT
     tout appel à `interrogerZonesProtegees`. `interrogerAPB` interroge
     `patrinat_apb:apb` (WFS Géoplateforme) avec le même filtre
     `INTERSECTS(geom,SRID=4326;POINT(lng lat))` que les autres couches
     (longitude d'abord), nom lu dans `nom_site`, délai 4000 ms ; en cas
     d'erreur ou de timeout, la fonction renvoie `[]` (pas d'exception
     propagée), donc le clic n'est jamais bloqué.
   - Vérification : lecture du code, puis test d'exécution avec `fetch`
     simulé (5 scénarios, en isolant `interrogerAPB` de `interrogerWFS`) :
     zone trouvée, aucune zone, panne HTTP, panne réseau, timeout à 4 s
     (vérifier que la durée mesurée est proche de 4000 ms et que le
     résultat est `[]`, pas une exception). Résultats du 22/09/2026 :
     5 scénarios sur 5 conformes.

4ter. **APB trouvé : popup d'interdiction, pas de marqueur (v2.0)**
   - Action : lire la branche `if (apb.length)` du gestionnaire de clic.
   - Attendu : popup rouge nommant l'arrêté (« Vous êtes dans un arrêté de
     protection de biotope — *nom*. »), la fonction retourne avant
     `coordsRow.style.display = ''` : ni marqueur, ni coordonnées, ni appel
     à `interrogerZonesProtegees`.
   - Vérification : lecture du code.

4quater. **Test réel : requête WFS sur un APB connu (22/09/2026, hors clic sur la carte)**
   - Action : interroger directement `patrinat_apb:apb` (même filtre que
     `interrogerAPB`) sur le point -2,6214 / 47,4112 (centre approximatif
     de l'APB « Ile Dumet et ses abords », Loire-Atlantique), depuis un
     navigateur, à l'origine du site publié (test CORS inclus).
   - Attendu : le nom « Ile Dumet et ses abords » est renvoyé.
   - À noter : un point pris exactement sur un sommet du contour de ce même
     APB n'a rien renvoyé lors du test — comportement déjà rencontré sur
     `znieff2_mer` en v1.9 ; ne pas utiliser un sommet comme point de test.
   - Résultat du 22/09/2026 : conforme (nom renvoyé, ~480 ms).
   - **Reste à faire :** reproduire ce test en cliquant réellement sur la
     carte publiée, une fois cette version déployée (ce test-ci interroge
     directement le service, pas le gestionnaire de clic complet).
   - Vérification : exécution réelle (partielle : service confirmé, clic
     réel sur la carte non encore testé).

5. **API Carto IGN : requête et timeout — codes de couche rétablis (21 sept. 2026)**
   - Action : lire `interrogerZonesProtegees(lngLat)`.
   - Attendu : appels parallèles vers `apicarto.ign.fr/api/nature/
     {natura-habitat,natura-oiseaux,znieff1,znieff2}` (codes testés en réel
     le 21 sept. 2026 ; `sic` et `zps` renvoient une 404 et ne doivent pas
     être utilisés) avec géométrie du
     point en paramètre `geom` ; chaque appel utilise `AbortController` avec
     un délai de 8000ms ; un échec ou timeout sur un endpoint n'empêche pas
     l'affichage du résultat des autres, ni l'affichage des coordonnées.
   - Vérification : lecture du code.

5bis. **Champ du nom de site — corrigé (21 sept. 2026)**
   - Action : lire la lecture de `f.properties` dans `interrogerZonesProtegees`.
   - Attendu : le champ lu est propre à chaque requête (`r.champ`) :
     `properties.sitename` pour `natura-habitat` et `natura-oiseaux`,
     `properties.nom` pour `znieff1` et `znieff2`.
   - Vérification : lecture du code, puis test d'exécution (voir 5quater).

5quater. **Test d'exécution de `interrogerZonesProtegees` sur le réseau réel (21 sept. 2026)**
   - Action : exécuter la fonction, avec le vrai service, depuis un navigateur
     (console ou navigateur Claude) aux points 6,40 / 43,00 ; 9,25 / 41,33 ;
     4,60 / 43,45 ; -3,10 / 47,50.
   - Attendu : Port-Cros → Natura 2000 « Rade d'Hyères » + « Iles d'Hyères »
     et ZNIEFF « ÎLE DE PORT-CROS ET DE BAGAUD » ; Lavezzi → « Iles Lavezzi,
     Bouches de Bonifacio » ; Beauduc → « Camargue » + deux ZNIEFF ;
     large de Quiberon → aucun résultat, `echec` à `false`.
   - À noter : `echec` peut passer à `true` sur les sites très étendus
     (Golfe du Morbihan, Lavezzi) si une réponse dépasse 8 secondes (le délai était de 4 secondes avant la v1.7 et coupait ces réponses).
   - Vérification : exécution réelle.

5sexies. **Repli WFS de la Géoplateforme (v1.9)**
   - Action : lire `interrogerWFS` et `interrogerZonesProtegees`.
   - Attendu : chaque requête porte `repli` (toutes les couches WFS) et
     `repliMer` (couches marines seulement : vide pour Natura 2000,
     `patrinat_znieff1_mer:znieff1_mer` / `patrinat_znieff2_mer:znieff2_mer`
     pour les ZNIEFF). Le WFS n'est appelé qu'après l'API Carto : avec
     `repli` et un délai de 6 s si l'API Carto a échoué, avec `repliMer` et
     4 s si elle a répondu sans rien. Filtre `INTERSECTS(geom,SRID=4326;
     POINT(lng lat))` (longitude d'abord), nom lu dans `nom_site`.
     `echec` n'est vrai que si l'API Carto ET tout le repli ont échoué ; un
     repli partiel est conservé (`Promise.allSettled`).
   - Vérification : lecture du code, puis **test d'exécution avec `fetch`
     simulé**, 6 scénarios (extraire le texte de `interrogerWFS` et
     `interrogerZonesProtegees`) :
     A. API Carto répond partout → 0 appel WFS ;
     B. API Carto en 404 partout, WFS répond → 6 appels WFS, noms Natura 2000
        + ZNIEFF, `echec:false` ;
     C. API Carto vide (Natura répond, ZNIEFF vide), WFS marin trouve →
        2 appels WFS, ZNIEFF renvoyée ;
     D. tout en panne → `echec:true` ;
     E. API Carto vide + WFS en panne → `echec:false`, 2 appels WFS ;
     F. API Carto en panne, WFS partiel (terre KO, mer OK) → résultat marin
        conservé, `echec:false`.
     Résultats du 21/09/2026 : 6 scénarios sur 6 conformes.
   - Test réseau réel (depuis le site publié, navigateur) : Port-Cros,
     Île Riou (43,1709 N / 5,3799 E), rade de Brest, large de Quiberon.
     Attendu : mêmes noms qu'en test 5quater ; Île Riou → ZNIEFF
     « ILE RIOU, ILOTS CONGLUÉ ET IMPÉRIAUX » ; Quiberon → rien, `echec`
     à `false`. Le 21/09/2026 : conforme sur les 4 points, en 2 à 8 s.

5ter. **Messages distincts Natura 2000 / ZNIEFF (17 sept. 2026)**
   - Action : lire le bloc `blocsZones` dans le gestionnaire de clic.
   - Attendu : un message Natura 2000 (depuis v2.4, texte exact : « Cet
     emplacement se situe dans un site Natura 2000. Une étude d'incidence va
     être réalisée suite à votre demande. Nom de la zone à reporter dans le
     formulaire de demande : {noms} » ; plus aucune mention d'« évaluation
     environnementale ») apparaît uniquement si `natura.length`, listant les noms de
     sites ; un message ZNIEFF distinct, générique (aucun nom ni type
     affiché, recommandation de pratiques de mouillage durables) apparaît
     uniquement si `znieff.length` ; les deux peuvent s'afficher ensemble
     si le point relève des deux à la fois.
   - Vérification : lecture du code.

5septies. **Repli — mention retirée pour l'APB (v2.0)**
   - Action : lire `MENTION_NON_DETECTABLES`.
   - Attendu : la liste ne cite plus l'APB (seulement parcs naturels
     marins, aires marines protégées, herbiers, zones de baignade, zones
     réglementaires) : l'APB a désormais sa propre vérification (voir
     4bis-4quater), ce n'est plus une couche « non détectable ».
   - Vérification : lecture du code.

6. **Test visuel : zone Natura 2000/ZNIEFF détectée**
   - Action : cliquer sur l'eau à un endroit couvert par une zone Natura
     2000 ou ZNIEFF connue.
   - Attendu : popup affichant le(s) nom(s) de zone Natura 2000
     après un court délai (`sitename` pour Natura 2000), teinte neutre/orange ; message ZNIEFF sans nom
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
   - Attendu : le repli WFS prend le relais (v1.9), les zones s'affichent ;
     l'état de secours (interrogation indisponible) n'apparaît que si
     `data.geopf.fr` est aussi coupé, sans bloquer l'affichage des
     coordonnées GPS.
   - Vérification : visuelle.

9. **Formulaire navire conditionnel (gate 100 m) — désormais silencieux (v1.5)**
   - Action : lire la variable/logique `formNavireRequis` et son usage dans
     `recalculer()` et `majEtapes()`.
   - Attendu : `formNavireRequis` vrai seulement si `distanceM` entre le point
     cliqué et l'AOT existante la plus proche est `< 100`; si faux,
     `boatBlock` reste masqué et `recalculer()` retourne un état vide sans
     erreur. **La condition ne fait plus intervenir `aotVisibles`** : la
     vérification est silencieuse, indépendante de la case « AOT de mouillage existantes »
     (DOCUMENTATION_FONCTIONNELLE.md §4.0, C6).
   - Vérification : lecture du code.

9bis. **Recherche de chevauchement toujours effectuée (v1.5)**
   - Action : lire le calcul de `conflits` dans `recalculer()`.
   - Attendu : le filtre sur `aotPositions` est appliqué inconditionnellement.
     La branche « Les AOT existantes sont masquées : aucune recherche de
     recoupement n'est effectuée » a été supprimée et ne doit plus apparaître
     nulle part dans le fichier.
   - Vérification : lecture du code.

9ter. **Formulaire replié dans le bloc de proximité (v2.7, remplace le sous-bloc fixe v2.5)**
   - Action : lire `boatBlock.innerHTML` et `recalculer()` ; rechercher
     `evitagePanel`, `evitage-panel`, `out-rayon`, `out-conflict`,
     `proximite-intro`.
   - Attendu : `boatBlock` contient un seul bloc `#proximite-block`
     (`.jaune-box` au départ), avec dans l'ordre : `.proximite-header`
     (`#proximite-msg` + bouton `#proximite-toggle`, `hidden` au départ) puis
     `#proximite-detail` (deux `.champ-ligne` — `in-loa` puis `in-depth`,
     **sans** attribut `value`, placeholder « à saisir » — et `#note-colonne`).
     Aucune occurrence de `evitagePanel`, `evitage-panel`, `out-rayon`,
     `out-conflict`, `proximite-intro` hors commentaires d'historique. Dans
     `recalculer()`, sans saisie complète, `#proximite-msg` porte le texte
     « D'autres mouillages… », `#proximite-toggle` reste `hidden`,
     `#proximite-detail` reste visible. Aucune occurrence de
     `rappel-filtre-aot`, `chapeau-evitage`, « Renseignez la longueur ».
   - Vérification : lecture du code (`grep`).

9ter-bis. **Repli automatique différé par minuteur, réarmé à chaque frappe (v2.8, remplace le mécanisme au blur v2.7)**
   - Action : lire `proximiteComplete`, `repliTimer`, `replierAuto`, la fin de
     `recalculer()` (branche « calcul fait »), et l'écouteur `click` de
     `#proximite-toggle`. Vérifier qu'aucune occurrence de `replierAuBlur` ni
     d'écouteur `focusout` sur `#proximite-detail` ne subsiste.
   - Attendu : dès que le calcul se complète, `toggle.hidden` passe à `false`
     et, si `replierAuto` est vrai, un `setTimeout` de 700 ms
     (`repliTimer`) est armé pour replier `#proximite-detail` — annulé et
     réarmé (`clearTimeout` puis nouveau `setTimeout`) à **chaque** appel de
     `recalculer()` suivant (donc à chaque frappe dans `in-loa`/`in-depth`),
     si bien qu'il ne se déclenche jamais en pleine saisie, seulement après
     une pause. Le clic sur `#proximite-toggle` annule le minuteur en cours
     (`clearTimeout`) et, s'il **ouvre** le détail, passe `replierAuto` à
     `false` (plus de repli automatique tant que le point n'a pas changé).
     Un nouveau clic sur la carte (nouvelle position) ou la fermeture du
     popup réinitialisent `replierAuto` à `true` et annulent tout minuteur en
     cours.
   - Vérification : lecture du code + navigateur headless (§20).

9ter-bis. **Bloc environnement réduit à une ligne si mouillage proche (v2.5)**
   - Action : lire `afficherEnvironnement(html, teinte, titreCompact)` et ses
     appels en fin de gestionnaire de clic.
   - Attendu : sans `titreCompact`, `envBlock.innerHTML = html` (comportement
     inchangé). Avec `titreCompact` : `.env-ligne` (titre `.env-ligne-titre` +
     bouton `.env-toggle` « Détails ▾ », `aria-expanded="false"`) puis
     `.env-detail` **`hidden`** contenant `html` ; le clic sur le bouton bascule
     `hidden`, `aria-expanded` et le libellé (« Masquer ▴ »). `titreCompact`
     n'est passé que si `formNavireRequis` : vert « Aucune zone bloquante
     détectée sur cet emplacement. » (détail = `MENTION_NON_DETECTABLES`) ;
     neutre « Emplacement situé en site Natura 2000. » / « … en ZNIEFF. » /
     « … en site Natura 2000 et en ZNIEFF. » (détail = messages complets C5).
     Le cas « service injoignable » n'est jamais réduit. Hors proximité, texte
     vert d'origine « Pas de contre-indication détectée automatiquement sur
     cette zone. ».
   - Vérification : lecture du code + navigateur headless (§17).

9quater. **Calcul « fait » = deux champs renseignés (v2.3)**
   - Action : lire `lireSaisieEvitage()`.
   - Attendu : renvoie `null` si l'un des deux champs est vide, non numérique
     ou ≤ 0 ; sinon `{loa, prof, r}` avec `r = rayonEvitage(loa, prof)`. Aucun
     repli sur `CONFIG.profondeurDefaut` pour la saisie usager.
   - Vérification : lecture du code + exécution en navigateur (§16).

9quinquies. **Estimation de la colonne d'eau (v2.6) — lecture du code**
   - Action : lire `chargerPortsRAM`, `profondeurEMODnet`, `estimerColonneEau`,
     `lancerEstimationColonne`, l'écouteur `input` de `in-depth`, et
     `fermerPopupCoordonnees` ; lire `data/ram-ports.json`.
   - Attendu : `colonne = port.h − avg` (avg EMODnet, négatif sous l'eau),
     arrondi à 0,1 ; port = plus proche par `distanceM` ; `null` si `avg`
     absent, table vide ou colonne < `CONFIG.colonneMin` ; délai
     `CONFIG.delaiProfondeur` via `AbortController` ; lancée seulement si
     `formNavireRequis` ; `jetonEstimation` incrémenté à chaque clic et à la
     fermeture (réponse périmée ignorée) ; `colonneAuto` repasse à `false` à
     la première saisie manuelle. `data/ram-ports.json` : JSON valide, 214
     ports, colonnes `site, lat, lon, h, ref`, `ref` ∈ {PMVE-PBMA, PHMA-NM} ;
     sommes de contrôle à l'extraction : Σh = 1242,23, Σlat = 10083,1747,
     Σlon = −151,7266.
   - Vérification : lecture du code + parse JSON (Python/Node).

10. **Test visuel : clic à moins de 100 m d'une AOT (v2.3)**
    - Action : cliquer sur l'eau à proximité immédiate (< 100 m) d'une AOT
      existante (`data/aot-existantes.geojson`), champs vides.
    - Attendu *(v2.5)* : bloc environnement sur une ligne avec « Détails ▾ » ;
      bloc orange (message en gras, consigne, deux champs) ; rien dessous ;
      colonne de droite inchangée. À la saisie des deux champs : message
      vert/rouge sous le bloc orange, cercle tracé. Même comportement
      **couche AOT décochée** (vérification silencieuse).
    - Vérification : visuelle ou navigateur headless (§16).

11. **Test visuel : clic à plus de 100 m de toute AOT**
    - Action : cliquer sur l'eau loin (> 100 m) de toute AOT existante.
    - Attendu : aucun message d'évitage (`boatBlock` masqué), colonne de
      droite inchangée ; seules les coordonnées et le bloc environnement
      **complet** (non réduit, sans bouton « Détails ») sont affichées.
    - Vérification : visuelle.

12. **Modales Port et ZMEL conservées (pas de popup)**
    - Action : lire `modalePort(p)` et `modaleZmel(z)`.
    - Attendu : ces deux cas utilisent toujours la modale existante (pas le
      nouveau système de popup non bloquant). **La phrase « Pas d'AOT
      individuel sur cette zone » a été supprimée des deux modales en v1.5**
      et ne doit plus apparaître nulle part dans le fichier (elle a également
      été retirée du cas cultures marines). Titres attendus :
      « Port de plaisance : {nom} — Commune :{commune} » (inchangé) et,
      *(v2.9)* « Zone de mouillages et d'équipements légers :
      {nom_zmel} - {lieu_dit_s} - {commune} » (parties vides ou identiques à
      `nom_zmel` omises) ; ouvertures « Vous êtes dans un bassin portuaire
      qui… » et « Vous êtes sur une ZMEL qui… ».
    - Vérification : lecture du code, plus test d'exécution des deux fonctions
      (voir §6.1ter).

13. **Données ZMEL — vraies données branchées (v2.9 conversion, v2.10 branchement)**
    - Action : lire `data/zmel.geojson` (source active de la couche `zmel`
      dans `COUCHES`), `data/zmel-reel.geojson` (copie de référence,
      identique depuis v2.10), `SECOURS['data/zmel.geojson']`, et le rendu
      dans `modaleZmel`.
    - Attendu : `data/zmel.geojson` est un GeoJSON valide de 647 features en
      WGS84 (coordonnées en degrés, pas en mètres Lambert-93), champs
      `nom_zmel`, `lieu_dit_s`, `commune`, `nb_postes_` (capacité totale, en
      texte), identique à `data/zmel-reel.geojson`. `SECOURS` contient 3
      vraies ZMEL (Étel, Anse du Croûton, Baie de L'Île-Rousse), plus aucune
      trace d'« EXEMPLE FICTIF ». `modaleZmel` continue d'accepter en repli
      l'ancien schéma (`nom`/`nom_commune`/`nb_postes`) — non testable en
      direct (plus aucun fichier ne l'utilise) mais le code doit le
      conserver, au cas où un fichier territorial pas encore migré
      l'utiliserait.
    - Vérification : lecture du code + parse JSON de `data/zmel.geojson` +
      navigateur headless servi en HTTP réel (voir §22, le `fetch` d'un
      fichier local échoue silencieusement en `file://` dans Chromium).

14. **Fermeture explicite du popup de coordonnées (v2.1)**
    - Action : lire le bouton `#coords-fermer` (HTML), son style CSS, et la
      fonction `fermerPopupCoordonnees()` ainsi que ses deux appelants
      (écouteur `click` sur `#coords-fermer`, écouteur `keydown` document
      filtré sur `Escape` et `popup.classList.contains('visible')`).
    - Attendu : `fermerPopupCoordonnees()` retire le marqueur
      (`marker.remove(); marker = null;`), vide `position`, vide
      ~~`in-loa`~~ (**v2.3 : ne vide plus les champs du calcul
      d'évitage**, qui sont conservés), remet `copieFaite` à
      `false` et le bouton « Copier » à son état initial, masque
      `coordsRow`/`coordsLabel`/`boatBlock`, vide le bloc environnement
      (`afficherEnvironnement('', '')`), retire la classe `visible` (et
      `info`/`alerte`/`terre`) de `#coords-popup`, puis appelle
      `recalculer()` — qui, avec `position` à `null`, vide à son tour le
      cercle d'évitage (`mon-cercle`). L'écouteur Échap ne doit agir que si
      le popup est visible (pas d'effet, pas d'erreur, si on appuie sur
      Échap hors contexte). Aucun écouteur de clic en dehors du popup n'est
      attendu ici (décision assumée — voir §4.2 de
      `DOCUMENTATION_FONCTIONNELLE.md` : un clic ailleurs sur l'eau
      sélectionne un nouveau point via le gestionnaire `map.on('click', ...)`
      existant, il ne doit pas être réinterprété comme une fermeture).
    - Vérification : lecture du code, puis test d'exécution réelle du script
      en Node.js (voir §6.2) pour confirmer l'absence d'erreur d'ordre
      d'initialisation introduite par ce bloc.
    - **Non vérifié en conditions réelles** (clic sur le bouton, Échap, sur
      la carte publiée dans un vrai navigateur) : aucun navigateur
      disponible dans cette session.

15. **Allègement du contenu du formulaire d'évitage (v2.2) — textes remplacés en v2.3 (voir §16)**
    - *v2.3 : le chapeau, le disclaimer et les libellés « chevauche… » /
      « ne semble pas chevaucher… » ont disparu ; les sous-points ci-dessous
      ne valent plus que pour `#out-radius`/`.result-box` (toujours absents) et
      pour `messagePopup('', null)` (toujours appelé).*
    - Action : lire le gabarit `boatBlock.innerHTML` (chapeau, champs, disclaimer)
      et la fin de `recalculer()` (construction de `zone.innerHTML` et l'appel
      `messagePopup('', null)` qui suit).
    - Attendu :
      - le chapeau « D'autres mouillages sont enregistrés à proximité… » est un
        `<p class="chapeau-evitage">`, sans classe `jaune-box` ni style encadré ;
      - `#out-radius` et la classe `.result-box` n'existent plus nulle part dans
        le fichier (recherche `grep` de ces deux chaînes : aucune occurrence hors
        commentaires d'historique) ;
      - avec un rayon calculé de 38 m et au moins un conflit détecté, `zone.innerHTML`
        vaut exactement (aux espaces/retours à la ligne près) : « Le rayon d'évitage
        de votre navire, estimé à **38 m**, chevauche le rayon d'évitage estimé
        d'autres navires. Veuillez vérifier sur site ou modifier l'emplacement par
        précaution. », dans une `<div class="evitage-resultat chevauche">` ;
      - sans conflit, même gabarit avec « … ne semble pas chevaucher d'autres rayons
        d'évitage. » et la classe `.libre` ;
      - le paragraphe `.disclaimer` du formulaire vaut « Estimation indicative : le
        rayon d'évitage ne remplace pas une vérification sur place. » ;
      - `messagePopup('', null)` est appelé juste après la construction du bloc
        fusionné, dans les deux branches (`saisi` faux et vrai) — le hint
        (`#coords-hint`) ne doit plus contenir de texte lié à l'évitage.
    - Vérification : lecture du code ; test d'exécution isolé du gabarit du bloc
      fusionné avec `rArrondi = 38` (Node.js, comparaison de chaîne normalisée) ;
      test de non-régression : recherche `grep -n "out-radius\|result-box"` dans
      `index.html`, ne doit renvoyer que des commentaires (pas de code actif).
    - **Non vérifié en conditions réelles** : aucun navigateur disponible dans
      cette session pour confirmer visuellement le rendu (couleurs, alignement).

16. **Dissociation message / calcul du rayon d'évitage — scénario complet (v2.3) — REMPLACÉ par §17 en v2.5 (ne plus exécuter tel quel : `#evitage-panel` et `#out-rayon` n'existent plus)**
    - Action : servir le dossier en local (`python3 -m http.server`), ouvrir
      `index.html` dans Chromium headless (Playwright), fermer le guide, puis
      simuler les clics avec `map.fire('click', {lngLat, point:
      map.project(...)})` (les variables globales du script — `map`,
      `aotPositions`, `distanceM`, `fermerPopupCoordonnees`, `replier` — sont
      accessibles via `page.evaluate`). Le bloc « Calcul rayon d'évitage »
      doit être déplié avant de remplir ses champs.
    - Attendu, dans l'ordre :
      1. au chargement : `#layer-panel` ouvert, `#evitage-panel` replié,
         `in-depth` vide, `#out-rayon` vide ;
      2. clic à ~30 m d'une AOT, champs vides : `.jaune-box` « D'autres
         mouillages sont enregistrés à proximité, vérifier en remplissant les
         champs du formulaire « Calcul rayon d'évitage » si les rayons d'évitage
         des navires ne se chevauchent pas. » (plus de « ci-dessous ») ;
         `#layer-panel` replié, `#evitage-panel` ouvert ; étape 2 « en cours » ;
      3. longueur seule (10) : toujours jaune, `#out-rayon` vide ;
      4. colonne d'eau 4 : `#out-rayon` = « Rayon d'évitage = 16 m », message
         `.evitage-resultat.chevauche` « … estimé à 16 m, risque une collision
         avec le rayon d'évitage des navires à proximité. Veuillez vérifier sur
         site ou modifier l'emplacement par précaution. » + `.evitage-sous-titre`
         « Estimation indicative qui ne remplace pas une vérification sur
         place. » ; étape 2 faite ;
      5. longueur 40 : mise à jour immédiate à 46 m ;
      6. `fermerPopupCoordonnees()` : valeurs conservées (4 / 40) ;
      7. replier le calcul, déplier les couches, re-cliquer au même endroit :
         message rouge direct, **colonne de droite inchangée** ;
      8. point à 60–100 m d'une AOT, longueur 3 / colonne 2 (r = 6 m) :
         `.evitage-resultat.libre` « … ne semble pas être en collision avec les
         rayons d'évitage des navires à proximité. » + sous-titre ;
      9. clic à > 300 m de toute AOT : `boatBlock` masqué, message vide ;
      10. aucune `pageerror` pendant tout le scénario.
    - Vérification : exécution (Playwright). Les erreurs réseau vers les
      services cartographiques distants (proxy de l'environnement de test)
      ne sont pas bloquantes.
    - *Dernière exécution : 23 sept. 2026 (v2.3) — OK sur les 10 points.*

17. **Rayon d'évitage dans la modale et bloc environnement réduit — scénario complet (v2.5)**
    - Action : servir le dossier en local (`python3 -m http.server`), ouvrir
      `index.html` dans Chromium headless (Playwright), fermer le guide. Pour
      chaque clic : `map.jumpTo({center, zoom:16})` puis
      `map.fire('click', {lngLat, point: map.project(...), originalEvent: new
      MouseEvent('click')})` — **`originalEvent` est indispensable** dès qu'un
      marqueur existe (sinon `Marker._onMapClick` lève une TypeError propre au
      test). Simuler l'API Carto et le WFS Géoplateforme avec `page.route`
      (réponse `{features:[]}`, ou un `sitename` pour `natura-habitat`).
    - Attendu, dans l'ordre :
      1. au chargement : ni `#evitage-panel` ni `#out-rayon` ; `#layer-panel`
         ouvert ;
      2. clic à ~30 m d'une AOT (réponses vides) : `boatBlock` affiché,
         `.proximite-intro strong` = « D'autres mouillages sont enregistrés à
         proximité. », `#out-conflict` vide, `#layer-panel` toujours ouvert ;
         `.env-ligne-titre` = « Aucune zone bloquante détectée sur cet
         emplacement. », `.env-detail` caché ; clic sur `.env-toggle` → détail
         visible ;
      3. longueur seule (10) : `#out-conflict` vide ;
      4. colonne d'eau 4 : `.evitage-resultat` « … estimé à 16 m … » ;
      5. longueur 40 : 46 m immédiatement ;
      6. `fermerPopupCoordonnees()` : valeurs conservées (40 / 4) ; re-clic au
         même endroit : résultat 46 m direct ;
      7. même clic avec `natura-habitat` renvoyant un site : titre « Emplacement
         situé en site Natura 2000. », détail replié contenant le nom du site ;
      8. clic loin de toute AOT (ex. -4,9 / 47,3) : `boatBlock` masqué, aucun
         `.env-toggle`, texte vert complet (ou message Natura 2000 complet) ;
      9. aucune `pageerror`.
    - Vérification : exécution (Playwright). Les erreurs réseau vers le fond
      de plan (injoignable depuis l'environnement de test) ne sont pas
      bloquantes.
    - *Dernière exécution : 25 sept. 2026 (v2.5) — OK sur les 9 points.*

18. **Pré-remplissage de la colonne d'eau — scénario (v2.6)**
    - Action : même montage que §17 ; simuler aussi
      `rest.emodnet-bathymetry.eu` avec `page.route` (trois variantes :
      `{"avg":-12.35}`, requête avortée, `{"avg":1.2}`). Cliquer à ~30 m
      au nord de `aotPositions[5]` (-3,0893 / 47,4484, port le plus proche :
      Port-Haliguen, h = 5,37).
    - Attendu :
      1. `avg` −12,35 → `in-depth` = 17.7, note « Estimation : profondeur ≈
         12,4 m (EMODnet) + marée haute de vives-eaux ≈ 5,4 m (port de
         référence : Port-Haliguen, Shom). Modifiable. » ; longueur 10 →
         résultat 37 m ;
      2. requête avortée → champ vide, « Estimation indisponible à cet
         endroit : saisissez la valeur. » ; saisie manuelle 3 → résultat ;
      3. `avg` +1,2 → 4.2, note « …, moins un fond découvrant à marée basse
         ≈ 1,2 m (EMODnet). Modifiable. » ;
      4. saisie manuelle 3 après une estimation → « Valeur modifiée à la
         main. », résultat 15 m (longueur 10) ;
      5. aucune `pageerror`.
    - Vérification : exécution (Playwright).
    - *Dernière exécution : 25 sept. 2026 (v2.6) — OK sur les 5 points.*

20. **Repli du bloc de proximité — scénario complet (v2.7, mécanisme de repli revu v2.8)**
    - Action : même montage que §18. Cliquer près de `aotPositions[5]`
      (`avg` −12,35, colonne pré-remplie 17,7). Taper `20` caractère par
      caractère dans `#in-loa` (`page.type`, avec un léger délai entre
      touches) sans cliquer ailleurs, puis lire l'état à différents instants.
    - Attendu, dans l'ordre :
      1. avant saisie : `.jaune-box`, `#proximite-toggle` caché, champs
         visibles, aucun résultat ;
      2. juste après la frappe complète (focus toujours dans `#in-loa`) : le
         bloc est déjà passé en `.evitage-resultat` (vert ou rouge) et
         `#proximite-toggle` affiche « Masquer ▴ », le message de résultat
         est affiché (nouveau texte de collision v2.8 : « Le rayon d'évitage
         de votre navire est estimé à … m avec un risque de collision.
         Modifier l'emplacement ou vérifier sur place. »), **mais
         `#proximite-detail` reste visible et `#in-loa` garde la totalité
         de la valeur tapée** (`"20"`, pas `"2"`) — c'est le point qui
         régresserait si le repli se faisait immédiatement sur l'événement
         `input` sans minuteur ;
      3. ~1,1 s après la dernière frappe, **sans aucun clic ni tabulation** :
         `#proximite-detail.hidden` est vrai et `#proximite-toggle` affiche
         « Détails ▾ » (repli automatique déclenché par le minuteur de
         700 ms, pas par un `focusout`) ;
      4. clic sur `#proximite-toggle` : les champs réapparaissent avec leurs
         valeurs, « Masquer ▴ » ;
      5. modifier `#in-loa` puis attendre ~1,1 s sans cliquer : le détail
         **reste visible** (pas de repli automatique après une réouverture
         manuelle, même après une nouvelle frappe) ;
      6. aucune `pageerror` sur l'ensemble du scénario.
    - Vérification : exécution (Playwright).
    - *Dernière exécution : 25 sept. 2026 (v2.8) — OK sur les 6 points
      (script Playwright reconstruit ce jour, l'environnement d'exécution
      ayant été réinitialisé entre les deux sessions ; scénario vert/rouge et
      texte de collision revérifiés également).

19. **API EMODnet réelle (v2.6)**
    - Action : depuis le site publié (ou une page https), exécuter
      `fetch('https://rest.emodnet-bathymetry.eu/depth_sample?geom=POINT(-2.970485 47.510572)')`.
    - Attendu : HTTP 200 sans erreur CORS, JSON avec `avg` négatif
      (≈ −12,35 le 25/09/2026).
    - Vérification : navigateur (console ou outil JavaScript).
    - *Dernière exécution : 25 sept. 2026 — OK (Quiberon −12,35 ; Brest
      −23,6 ; Saint-Malo −1,86 ; 60 à 370 ms).*

21. **Popup ZMEL reformulé — rendu exact (v2.9)**
    - Action : Chromium headless, appeler `modaleZmel(z)` directement avec 4
      jeux de données (voir §1ter) et lire `#modale-titre`/`#modale-texte`.
    - Attendu : titre et texte correspondent caractère près au format décrit
      en §4.0 (C2) de DOCUMENTATION_FONCTIONNELLE.md pour chaque cas ; aucune
      `pageerror`.
    - Vérification : exécution (Playwright).
    - *Dernière exécution : 25 sept. 2026 (v2.9) — OK sur les 4 jeux de
      données (vraie ZMEL sans mailto, lieu-dit proche du nom, fictif avec
      mailto, sans capacité ni contact).*

22. **Chargement réel de la couche ZMEL branchée (v2.10)**
    - Action : servir `projet/` en HTTP réel (`python -m http.server`, pas
      `file://` — le `fetch()` d'un fichier local échoue silencieusement par
      restriction CORS dans Chromium et retomberait sur `SECOURS` sans le
      signaler). Charger la page, lire `fetch('data/zmel.geojson')`
      directement, `map.getSource('zmel')`, `map.getLayer('zmel-fill')`, puis
      appeler `modaleZmel()` avec la première feature réellement chargée.
    - Attendu : 647 features dans le fichier chargé (pas 1, pas 3 — confirme
      que ce n'est ni l'ancien fichier fictif ni le fallback `SECOURS` qui a
      été servi) ; source et layer MapLibre `zmel`/`zmel-fill` existent ;
      titre, texte et note de la modale conformes au §4.0 (C2), sans mention
      de données fictives.
    - Vérification : exécution (Playwright, serveur HTTP local).
    - *Dernière exécution : 25 sept. 2026 (v2.10) — OK sur les 4 points
      (647 features, source et layer présents, modale conforme), aucune
      `pageerror`.*

23. **Démarrage résilient à un style lent (v2.11) — non-régression de la
    régression bloquante trouvée sur la version publiée**
    - Contexte : vérification demandée par Nicolas sur la version publiée
      de la v2.10 (« c'est publié, tu peux tester ») — sur plusieurs
      chargements réels dans un navigateur de test, la carte restait
      bloquée sur le seul fond IGN, sans aucune couche applicative (ni AOT,
      ni ZMEL), rendant tout test de clic impossible. Cause : le filet de
      sécurité `setTimeout(demarrer, 8000)` appelait `demarrer()` sans
      revérifier `map.isStyleLoaded()` ; sur un réseau plus lent que 8 s,
      `initialiser()` se lançait quand même et plantait dès son premier
      `map.addSource()` (`"Style is not done loading."`), bloquant
      l'application pour le reste du chargement de page (garde `demarre`
      déjà passée à `true`). Voir §11 (v2.11) de
      `DOCUMENTATION_FONCTIONNELLE.md` pour le détail.
    - Action (test unitaire isolé, sans navigateur) : rejouer la logique de
      `demarrer()`/`initialiser()` copiée telle quelle depuis `index.html`,
      avec un objet `map` simulé dont `isStyleLoaded()` ne répond `true`
      qu'après un délai contrôlé. Deux scénarios : (a) le style devient prêt
      après 3 s (bien au-delà d'un seul essai) ; (b) le style ne devient
      jamais prêt.
    - Attendu :
      (a) `demarrer()` retente toutes les 500 ms tant que le style n'est
      pas prêt, puis appelle `initialiser()` **exactement une fois**, avec
      succès, une fois `isStyleLoaded()` devenu vrai — pas de plantage, pas
      d'appel prématuré ;
      (b) après 40 tentatives (~20 s), `demarrer()` abandonne proprement
      (`demarre` reste `false`, `initialiser()` n'est jamais appelé) — pas
      de boucle infinie, pas de plantage.
    - Action complémentaire : rejouer l'intégralité des tests §9ter-bis,
      §21 et §22 (Chromium headless, serveur HTTP local) pour confirmer
      l'absence de régression sur le reste de l'application.
    - Vérification : exécution (Node.js pour le test unitaire ; Playwright
      pour la non-régression).
    - *Dernière exécution : 25 sept. 2026 (v2.11) — scénario (a) : OK
      (retry confirmé, `initialiser()` appelé une seule fois, avec succès) ;
      scénario (b) : OK (abandon propre après 40 tentatives, aucune
      exception) ; suite §9ter-bis/§21/§22 rejouée sans régression, aucune
      `pageerror` nouvelle. **Vérifié en plus sur la version publiée**
      (commit `671d2a5`) : chargement à froid réel dans un navigateur —
      `tentativesDemarrage`/`demarre` observés en conditions réelles (retry
      effectif sur un essai lent, démarrage direct sur un autre) ; clic
      réel sur le polygone ZMEL « Baie de L'Île-Rousse » ouvrant la modale
      attendue (titre, texte, capacité 18 navires, note), sans erreur JS.*

---

## 6. Intégrité générale

1. **Syntaxe JavaScript valide**
   - Action : extraire le contenu du dernier bloc `<script>` de
     `index.html` et le passer à `new Function(...)`.
   - Attendu : aucune erreur de syntaxe.
   - Vérification : exécution (Node.js), à refaire après **toute**
     modification du fichier avant de le considérer livrable.

1ter. **Test d'exécution des modales Port et ZMEL (v1.5, ZMEL revue v2.9)**
   - Action : extraire `modalePort` et `modaleZmel` du script, les exécuter
     (Node.js ou navigateur headless) avec un `ouvrirModale` simulé/réel qui
     capture ses arguments, sur plusieurs jeux : vraie ZMEL sans `mailto`,
     `lieu_dit_s` proche de `nom_zmel` (pas de doublon dans le titre), ancien
     schéma fictif avec `mailto`, aucune capacité ni contact.
   - Attendu, pour chacune : titre au format du §4.0 de
     DOCUMENTATION_FONCTIONNELLE.md (C1/C2) ; absence de « Pas d'AOT
     individuel » ; nouvelle phrase d'ouverture ; pour le port, accord
     singulier/pluriel correct sur le nombre de places ; **repli sur les
     anciens noms de champs** (`nom`, `commune`, `nb_postes`) quand les
     nouveaux (`nom_port_de_plaisance`, `nom_zmel`, `lieu_dit_s`, `commune`,
     `nb_postes_`) sont absents ; pour la ZMEL, `modaleZmel(null)` (clic
     depuis la légende) ne doit pas planter, la capacité affichée est
     « Capacité d'accueil : {n} navires. » (sans accord pluriel, `n` peut
     être une chaîne), et sans `mailto` le message générique s'affiche («
     Renseignez-vous… »), jamais « undefined ».
   - Vérification : exécution (Node.js pour la syntaxe/l'ordre
     d'initialisation ; Chromium headless pour le rendu exact des chaînes —
     voir aussi §20bis).

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
   - *Dernière exécution : 25 sept. 2026 (v2.5) — harnais Node.js (`vm`,
     globaux simulés) : phase synchrone exécutée en entier, sans erreur ; puis
     chargement complet dans Chromium headless sans `pageerror` (§5/17).*
   - *Exécution précédente : 23 sept. 2026 (v2.3) — chargement complet dans
     Chromium headless (au-delà du harnais Node.js), sans `pageerror`, et
     `recalculer()` déclenché par des clics simulés (voir §5/16).*
   - *Exécution précédente : 22 sept. 2026 (v2.2) — phase synchrone OK, événement
     `load` déclenché sans erreur (harnais complété : `parentElement`,
     `createElementNS`, `Image` génériques ajoutés au stub), avec `fetch`
     local lisant `data/`. Confirme notamment que `fermerPopupCoordonnees()`
     et ses deux écouteurs (`click` sur `#coords-fermer`, `keydown` document)
     s'initialisent sans erreur de zone morte temporelle. Ce harnais ne simule
     pas de clic sur la carte : il ne déclenche donc pas `recalculer()` — voir
     §5/15 pour la vérification (isolée) du gabarit du bloc fusionné v2.2, et
     la note dans `DOCUMENTATION_FONCTIONNELLE.md` v2.2 sur la référence
     orpheline `#out-radius` trouvée et corrigée par relecture du diff avant
     ce commit, pas par ce test d'exécution générique.*
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
