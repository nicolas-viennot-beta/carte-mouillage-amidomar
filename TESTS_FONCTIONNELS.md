# Carte AMIDOMAR — Tests fonctionnels (à exécuter par Claude)

Ce document liste les tests fonctionnels que Claude doit exécuter lui-même
avant de proposer une évolution ou un déploiement de `index.html`
(dossier `/Claude/Amidomar/projet`).
Il est distinct de la checklist manuelle du §9 de
`DOCUMENTATION_FONCTIONNELLE.md` (destinée à un test humain en conditions
réelles, dans un navigateur) : ici, chaque test précise l'action, le
résultat attendu, et la méthode de vérification à la portée de Claude
(lecture du code, vérification de syntaxe, inspection logique, ou test
visuel quand un navigateur est disponible).

Ce fichier est complété au fil des évolutions (voir le skill
`amidomar-doc-sync`) : les tests existants ne sont retirés que si la
fonctionnalité correspondante a réellement disparu.

**Dernière exécution : 14 oct. 2026 — recalibrage du garde-fou de couverture.**
- Harnais Node.js sur le fichier courant (v2.19 + travaux v2.20 en cours) :
  §6.1 (syntaxe) et §6.1bis (phase synchrone complète, sans exception) — OK.
- Chromium headless (Playwright, services rejoués), 26 assertions, **26/26** :
  §1.1, §1.2, §1.3, §1.9, §1.24, §1.25, §1.27, §6.1bis, §6.1quater.
- Navigateur réel contre `services.data.shom.fr` : §1.28 (nouveau tableau de
  calibrage), §1.30 (**30 points de la baie du Mont-Saint-Michel, 0 `null`**,
  contre 8 sur 24 avec le rayon de 5 km) et §1.31 (**23 scénarios, 23/23**).
- **Non rejoué :** §2, §3, §4, §5 et §7. Le correctif ne change qu'une valeur de
  `CONFIG`, et le chargement complet de la page ne lève aucune `pageerror`.

**Exécution précédente : 13 oct. 2026 (v2.17) — refonte de la détection terre/mer.**
- Harnais Node.js (`vm`, globaux simulés) : §6.1 (syntaxe) et §6.1bis (phase
  synchrone exécutée en entier, sans exception ; 4 fetch locaux observés) — OK.
- Chromium headless (Playwright, serveur local, Shom et Géoplateforme rejoués),
  26 assertions, 26/26 : §1.1, §1.2, §1.3, §1.9, §1.24, §1.25, §1.27, §6.1bis,
  §6.1quater. Dont les sept cas de `estSurLEau` pilotés par stub
  (`queryRenderedFeatures`, `areTilesLoaded`, `couleurPixel`) et les quatre
  réponses possibles de `interrogerTraitTerreMer`. Les seules `console.error`
  restantes sont des artefacts du harnais (tuiles `.pbf` simulées par du JSON,
  `zmel.geojson` non recopié dans le bac à sable).
- Navigateur réel, sur la version publiée, avec le code corrigé extrait du
  fichier et injecté : §1.26 et §1.29 — **20 scénarios géographiques, 20/20**,
  latence Shom 28 à 124 ms. §1.28 (calibrage du rayon) exécuté en réel contre
  `services.data.shom.fr`.
- **Après déploiement (commit 6ca40a3), sur la version publiée :** les 20
  scénarios de §1.29 rejoués avec les fonctions réellement servies — 20/20,
  latence Shom 30 à 131 ms. Trois clics réels déclenchés sur la carte
  (`map.fire('click', …)`) : champ au sud de Caen et cap Blanc-Nez →
  popup `visible terre`, message « Attention, vous êtes à terre… », bloc
  « À reporter » masqué, aucun marqueur ; mer au large de Ouistreham →
  popup normale, marqueur posé, bloc « À reporter » visible. Aucune erreur
  JavaScript en console : les seules 4xx observées sont des tuiles WMTS
  `Patrinat_*` absentes hors couverture, antérieures à la v2.17.
- **Non rejoué cette fois :** §2, §3, §4, §5 et §7 (sélecteur de fond, couches à
  venir, libellés, cascade de clic, popup v2.16). La v2.17 ne touche qu'à
  `estSurLEau` et `interrogerTraitTerreMer`, et le chargement complet de la page
  dans Chromium ne lève aucune `pageerror`.

**Exécution précédente : 13 oct. 2026 (v2.16) — popup réorganisée.**
- Chromium headless (serveur local, réponses du Shom et de l'API Carto rejouées) :
  §7.1 à §7.9 — conformes, plus §6.1 (syntaxe) et §6.1bis (chargement complet,
  aucune `pageerror` ni `console.error`).
- Les suites v2.14 (7 tests, trait terre-mer) et v2.15 (8 tests, nature du fond)
  ont été rejouées intégralement : **aucune régression**. 26 tests au total.
- **La suite complète n'a pas été rejouée** : aucun déploiement proposé sur
  cette seule base.

**Exécution précédente : 12 oct. 2026 (v2.15) — nature du fond.**
- Lecture du code : §1.16, §1.17, §1.22 — conformes.
- Exécution réelle contre `services.data.shom.fr`, depuis un navigateur sur le
  poste de Nicolas : §1.23 (couverture par territoire) et établissement de la
  table des libellés par comparaison légende / couleur rendue — 23 des 24 codes
  confirmés à l'identique.
- Chromium headless (serveur local, réponses du Shom rejouées) : §1.18 à §1.21
  — conformes, plus §6.1bis (chargement complet, aucune `pageerror` ni
  `console.error`) et §6.1 (syntaxe). Les 7 tests de la v2.14 ont été rejoués :
  aucune régression.
- **La suite complète n'a pas été rejouée** : aucun déploiement proposé sur
  cette seule base.

**Exécution précédente : 12 oct. 2026 (v2.14) — tests du trait terre-mer uniquement.**
- Lecture du code : §1.9, §1.14 (garde de jeton après `interrogerAPB`) — conformes.
- Exécution réelle contre `services.data.shom.fr`, depuis un navigateur sur le
  poste de Nicolas : §1.10 — les quatre points de contrôle conformes
  (56 à 207 ms). Le conteneur d'exécution de Claude n'a pas accès à ce
  domaine : ce test ne peut pas être rejoué depuis le harnais headless, d'où
  le rejeu des réponses dans les tests suivants.
- Chromium headless (serveur local, réponses du Shom rejouées à l'identique) :
  §1.11, §1.12, §1.13, §1.14, §1.15 — conformes, et §6.1bis (chargement
  complet, aucune `pageerror` ni `console.error`). §6.1 (syntaxe) — OK.
- **La suite complète n'a pas été rejouée** : aucun déploiement n'est donc
  proposé sur cette seule base. À faire avant le prochain commit de
  publication.

**Dernière exécution complète : 5 oct. 2026 (v2.12), avant commit.**
- Lecture du code (script) : §1.1-1.4, §2.1-2.2, §3.1-3.3, §3.5, §4.1-4.4,
  §5.1-5.3, §5.5, §5.5bis, §5.5ter, §5.5septies, §5.9 à §5.9quinquies,
  §5.15, §6.1quater, §6.3 — conformes, sauf écarts de texte ci-dessous.
- Chromium headless (serveur local, services distants simulés) : scénario
  v2.12 de la modale d'accueil (§4.1) de bout en bout avec vrais clics
  souris, §3.4, §3.4bis, §5.4 à §5.14, §17, §18, §20, §21, §22, §6.1ter,
  §6.2 — conformes, aucune `pageerror`.
- Node.js : §6.1, §6.1bis (phase synchrone + `load`), §23 (a) et (b) — OK.
- **Écarts relevés, sans lien avec la v2.12, non corrigés** : §2.3 (le titre
  « Surcouches » reste affiché, liste vide ; le fond est libellé
  « Aérienne ») ; §5.5sexies F (si toutes les couches terrestres de repli
  échouent, `echec:true` bien que le résultat marin soit conservé — scénario
  à préciser) ; §6.1quater (les ZMEL portent `commune`, pas `nom_commune`,
  depuis v2.9 — texte du test à rafraîchir) ; §5.13 (« EXEMPLE FICTIF »
  subsiste dans `SECOURS` des cultures marines).
- **Non exécutables avant publication** (fonds de carte et services réels
  inaccessibles depuis l'environnement de test) : §1.5-1.8 (terre/eau sur
  tuiles réelles), §2.3 (vignettes), §3.6 (rendu), §5.4quater, §5.5quater,
  §19, §23 (version publiée) — à vérifier sur le site publié.

---

## 1. Détection terre/eau (`estSurLEau` et carte fantôme, puis trait terre-mer du Shom)

*Depuis la v2.14, la détection se fait en deux instances : les tests 1 à 8
portent sur la détection locale (carte fantôme), les tests 9 à 15 sur
l'arbitrage par le trait terre-mer du Shom. Les tests 30 et 31 portent sur le
recalibrage du 14/10/2026. Les tests 16 à 23 portent sur la
nature du fond affichée au clic (v2.15), qui s'appuie sur le même mécanisme
d'interrogation ponctuelle du Shom. Les tests 24 à 29 couvrent la refonte de
la v2.17 (inversion de la charge de la preuve et garde-fou de couverture).*


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
     7 près de `rgb(192,229,219)`, elle confirmait « eau » des points de terre
     (voir test 7). *Rectificatif du 13/10/2026 : `rgb(192,229,219)` n'est pas
     la couleur de couches `landcover_*` — ce socle n'existe pas sur cette
     carte — mais celle des zones découvrantes (estran, marais littoraux),
     rendues avec un objet `hydro_surf`. Le retrait de la teinte reste
     justifié ; la raison documentée en v1.6 était inexacte.*
   - Vérification : lecture du code.

4. **`TERRE` couvre aussi le socle générique OpenMapTiles**
   - Action : lire la regex `TERRE`.
   - Attendu (depuis le 18 septembre 2026) : en plus des couches IGN
     (`oro_relief`, `ocs_`, `bati_`, `routier_`, `ferre`), la regex couvre
     `landcover`, `landuse`, `building` et `aeroway`.
   - **Rectificatif du 13/10/2026 :** ce socle générique **n'existe pas** sur
     cette carte. `mapTerrain.getStyle().sources` ne compte qu'une source,
     `plan_ign`, et les `sourceLayer` réellement rencontrés sont `bati_surf`,
     `ocs_vegetation_surf`, `ocs_nature_sol_surf`, `routier_*`, `hydro_surf`,
     `hydro_reseau`, `toponyme_*`. Ces quatre noms restent dans `TERRE`, sans
     effet, au cas où le fond évoluerait — ils ne doivent plus être présentés
     comme une protection active.
   - Vérification : lecture du code + `mapTerrain.getStyle()` en console.

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

9. **Forme de la requête au trait terre-mer du Shom (v2.14)**
   - Action : lire `WFS_SHOM` et `interrogerTraitTerreMer` dans `index.html`.
   - Attendu : type d'objet
     `LIMTM_2154_WFS:limite_terre_mer_france_metropolitaine_polygones` ;
     `outputFormat=application/json` ; `propertyName=id,numdep` (la géométrie
     n'est jamais rapatriée) ; `count=1` ; filtre
     `INTERSECTS(geom,SRID=4326;POINT(lng lat))` — **le préfixe `SRID=4326;`
     est obligatoire**, la couche étant en Lambert 93 ; `AbortController`
     borné par `CONFIG.delaiTraitTerreMer` ; renvoi de `null` (et non `false`)
     sur erreur HTTP, exception ou délai dépassé.
   - Vérification : lecture du code.

10. **Sens de la couche : zéro objet signifie « mer » (v2.14)**
    - Action : appeler le service en réel sur quatre points connus et vérifier
      le `surDPM` renvoyé.
    - Attendu : anse de Pen Hat (-4,6050 / 48,2870) → 0 objet, `surDPM` vrai ;
      bourg de Camaret (-4,5920 / 48,2795) → 1 objet, `surDPM` faux,
      `departement` = « 29 » ; estran de la baie du Mont-Saint-Michel
      (-1,6100 / 48,6330) → 0 objet, `surDPM` vrai ; rade d'Hyères
      (6,1300 / 43,0300) → 0 objet, `surDPM` vrai.
    - Vérification : exécution réelle contre `services.data.shom.fr` (depuis
      un navigateur ; le conteneur d'exécution de Claude n'a pas accès à ce
      domaine). **Test de non-régression prioritaire : une inversion de ce
      sens, ou la perte du préfixe `SRID=4326;`, ferait passer tous les
      clics à terre pour de la mer.**

11. **L'estran lève l'avertissement, la vraie terre le maintient (v2.14)**
    - Action : forcer la détection locale à répondre « terre » (patch de
      `mapTerrain.queryRenderedFeatures` renvoyant un `sourceLayer`
      `landcover_sand`), puis déclencher un clic sur un point d'estran, et un
      autre sur un point terrestre.
    - Attendu : estran → « Vérification de l'emplacement… » puis avertissement
      levé, classe `terre` retirée du popup, le clic se poursuit dans la
      cascade ; point terrestre → avertissement « Attention, vous êtes à
      terre. » maintenu, classe `terre` présente.
    - Vérification : exécution (Chromium headless, réponses du Shom rejouées
      à l'identique de celles relevées au test 10).

12. **Aucun appel réseau sur un clic en pleine eau (v2.14)**
    - Action : détection locale répondant « eau », déclencher un clic ;
      compter les requêtes `GetFeature` portant `LIMTM` vers
      `services.data.shom.fr`.
    - Attendu : **zéro** requête — le trait terre-mer n'est consulté que sur
      un verdict « terre ». Ne pas compter les tuiles « informations
      portuaires », servies par le même domaine.
    - Vérification : exécution (Chromium headless, interception réseau).

13. **Repli prudent si le Shom est indisponible (v2.14)**
    - Action : faire répondre le service en erreur (HTTP 500) ou le laisser
      dépasser le délai, puis cliquer sur un point d'estran avec une
      détection locale répondant « terre ».
    - Attendu : l'avertissement « Attention, vous êtes à terre. » est
      **maintenu** — comportement d'avant la v2.14. Un échec du service ne
      doit jamais laisser passer un clic qui aurait été refusé auparavant, ni
      bloquer l'interface.
    - Vérification : exécution (Chromium headless).

14. **Jeton de clic : c'est le dernier clic qui décide (v2.14)**
    - Action : déclencher deux clics coup sur coup, le premier sur un point
      terrestre, le second sur un point d'estran, sans attendre la réponse du
      premier.
    - Attendu : l'état final est celui du **second** clic (avertissement
      levé) ; la réponse du premier est abandonnée par le test
      `jeton !== jetonClic`. Vérifier aussi la présence de la même garde
      après l'attente `interrogerAPB`.
    - Vérification : exécution (Chromium headless) + lecture du code.

15. **Citation Shom-IGN présente dans l'attribution (v2.14)**
    - Action : charger la carte et lire le contenu de
      `.maplibregl-ctrl-attrib-inner`.
    - Attendu : la mention contient « Shom-IGN, 2021 », le lien
      `10.17183/LIMTM` et la clause « non certifié pour la navigation ». La
      couche n'étant pas affichée, cette mention vient de
      `attributionControl.customAttribution` et non d'une source de tuiles :
      elle disparaîtrait silencieusement si cette option était retirée.
    - Vérification : exécution (Chromium headless).

16. **Table des libellés de nature de fond (v2.15)**
    - Action : lire `NATURES_FOND` dans `index.html`.
    - Attendu : 24 codes, chacun associé à un libellé et à l'une des quatre
      familles `sable`, `vase`, `graviers`, `dur`. Les libellés proviennent de la
      légende officielle du service (`GetLegendGraphic`), **pas d'une déduction** :
      la correspondance a été établie le 12/10/2026 en comparant, pour chaque
      code, la couleur rendue par le WMS au point à celle de la pastille de
      légende — 23 correspondances exactes. Seul `NFSFC` est déduit.
    - **Si un libellé est modifié, refaire la vérification par la couleur**, ne
      pas se fier au schéma de nommage : `NFC` (Cailloutis) et `NFGV` (Graviers
      envasés) ont failli être confondus lors de l'établissement de la table.
    - Vérification : lecture du code, et re-test de couleur en cas de doute.

17. **Les trois cas de réponse sont bien distincts (v2.15)**
    - Action : lire `interrogerNatureFond` et `blocNatureFond`.
    - Attendu : un polygone trouvé → `{libelle, famille}` ; aucun polygone **ou
      code inconnu** → `{absent:true}` ; service en erreur, délai dépassé ou
      exception → `null`. Et côté affichage : libellé + conseil, « à vérifier »,
      ou **rien du tout** respectivement. Un `null` ne doit jamais produire de
      message d'erreur visible.
    - Vérification : lecture du code + exécution (tests 19 à 21).

18. **La nature du fond n'est demandée que si le mouillage n'est pas interdit (v2.15)**
    - Action : cliquer à terre (confirmé par le trait terre-mer), en cultures
      marines, en APB, puis sur un port et une ZMEL ; compter les requêtes
      `GetFeature` portant `natures_fond`.
    - Attendu : **zéro** requête dans tous ces cas. La couche n'est interrogée que
      sur la branche « clic sur l'eau, hors interdiction ».
    - Vérification : exécution (Chromium headless, interception réseau).

19. **Fond cartographié : libellé, conseil, lien et rappel herbiers (v2.15)**
    - Action : réponse `typelem = NFS`, puis `NFRoche`.
    - Attendu : « Nature du fond : Sables (Shom) » avec le conseil de la famille
      `sable` (« Idéal pour mouiller… ») et le lien « Voir les bonnes pratiques
      d'ancrage sur fond sableux » ; « Nature du fond : Roche (Shom) » avec le
      conseil `dur`. Dans les deux cas : lien vers la page « Bien mouiller » et la
      phrase « Cette carte ne représente pas les herbiers ».
    - Attendu aussi : **aucune appréciation de tenue d'ancre** dans les textes de
      `CONSEIL_FOND` — le produit n'est pas certifié pour la navigation.
    - Vérification : exécution (Chromium headless) + relecture des libellés.

20. **Fond non cartographié : message explicite, jamais un silence (v2.15)**
    - Action : réponse sans aucun objet, puis réponse avec un `typelem` inconnu.
    - Attendu, dans les deux cas : « Nature du fond : à vérifier. Le fond marin
      n'est pas cartographié à cet endroit : vérifiez-le sur place pour décider de
      votre dispositif d'ancrage. » Le code brut inconnu ne doit **jamais**
      apparaître à l'écran.
    - Vérification : exécution (Chromium headless).
    - **Test de non-régression prioritaire** : c'est le cas majoritaire dans les
      Côtes-d'Armor (3 % de couverture), l'un des territoires pilotes.

21. **Service indisponible : aucun bloc affiché (v2.15)**
    - Action : faire répondre le service en erreur (HTTP 500) ou dépasser le délai.
    - Attendu : le bloc environnement ne contient **aucune** mention « Nature du
      fond », et aucun message d'erreur. Le reste du clic est inchangé.
    - Vérification : exécution (Chromium headless).

22. **Aucune latence ajoutée au clic (v2.15)**
    - Action : lire le `Promise.all` du gestionnaire de clic.
    - Attendu : `interrogerNatureFond` est lancée **en parallèle** de
      `interrogerZonesProtegees`, jamais à la suite ; la garde
      `jeton !== jetonClic` est présente après l'attente.
    - Vérification : lecture du code + observation visuelle.

23. **Couverture réelle de la couche, par territoire pilote (v2.15)**
    - Action : tirer 30 points en mer au hasard dans chaque territoire pilote
      (via le trait terre-mer) et mesurer le taux de réponse de la couche.
    - Attendu, mesuré le 12/10/2026 : Morbihan 100 %, Var 97 %, Finistère 87 %,
      Ille-et-Vilaine 27 %, Côtes-d'Armor 3 %. **Un écart important à ces valeurs
      signale soit une panne du service, soit une mise à jour du produit** — dans
      le second cas, revérifier aussi la table des libellés (test 16).
    - Vérification : exécution réelle contre `services.data.shom.fr`, depuis un
      navigateur (le conteneur d'exécution de Claude n'a pas accès à ce domaine).

24. **La terre sans objet est bien conclue « terre » (v2.17)**
    - Action : lire la fin de `estSurLEau`.
    - Attendu : la fonction se termine par
      `return mapTerrain.areTilesLoaded() ? false : null;` — **`false`**, pas
      `null`, quand les tuiles sont chargées. Un `null` dans cette branche est
      la régression exacte corrigée en v2.17 : il laisse passer tout point
      terrestre sans objet au pixel. Vérifier aussi que les deux branches du
      ternaire sont bien distinctes (la v2.16 écrivait `? null : null`).
    - Vérification : lecture du code.
    - **Test de non-régression prioritaire.**

25. **Ordre des tests dans `estSurLEau` (v2.17)**
    - Action : lire le corps de `estSurLEau`.
    - Attendu, dans cet ordre : (1) objet `TERRE` → `false` ; (2) objet `EAU`
      (`/^hydro_/`) → `true` ; (3) couleur `EAU_SIMPLE` → `true` ; (4) défaut
      selon `areTilesLoaded`. L'objet terrestre doit rester **prioritaire** sur
      l'objet d'eau : l'estran porte les deux, et doit partir à l'arbitrage du
      Shom plutôt qu'être conclu localement (v2.14).
    - Vérification : lecture du code.

26. **Points de contrôle de la détection locale (v2.17)**
    - Action : dans un navigateur, caler la carte sur chaque point puis appeler
      `estSurLEau({lng, lat})` une fois `mapTerrain.areTilesLoaded()` vrai.
    - Attendu (relevés le 13/10/2026) :

      | Point | Objets au point | Couleur | `estSurLEau` |
      |---|---|---|---|
      | Mer, Manche (-0,40 / 49,50), zooms 6 à 14 | `hydro_surf` | `rgb(151,205,213)` | `true` |
      | Estran, baie de Somme (1,61 / 50,22) | `hydro_surf` + `ocs_` | `rgb(192,229,219)` | `false` → Shom |
      | Champ au sud de Caen (-0,022765 / 49,095841) | aucun | `rgb(240,240,237)` | `false` |
      | Cap Blanc-Nez (1,762662 / 50,930565) | aucun | `rgb(240,240,237)` | `false` |
      | Bourg de Camaret (-4,5920 / 48,2795) | aucun | `rgb(240,240,237)` | `false` |

    - Vérification : exécution en navigateur (console).
    - **Test de non-régression prioritaire** : les deux points signalés par
      Nicolas le 13/10/2026 (champ au sud de Caen, cap Blanc-Nez) renvoyaient
      `null` à tous les zooms de 6 à 16 avant la v2.17.

27. **Garde-fou de couverture du trait terre-mer (v2.17)**
    - Action : lire `interrogerTraitTerreMer`.
    - Attendu : **deux** requêtes lancées par `Promise.all`, partageant le même
      `AbortController` et le même délai — `INTERSECTS(geom, point)` et
      `DWITHIN(geom, point, CONFIG.rayonCouvertureShom, kilometers)`. Un objet
      au point → `surDPM` faux. Zéro au point mais des objets autour → `surDPM`
      vrai. Zéro au point **et** zéro autour → `null` (hors couverture, repli
      prudent), jamais `surDPM` vrai.
    - Vérification : lecture du code.

28. **Couverture départementale de la couche et calibrage du rayon (v2.17, recalibré le 14/10/2026)**
    - Action : interroger le service en réel, au point puis à 5, 10, 20, 30 et
      50 km, sur des villes de l'intérieur **et sur des points de mer éloignés
      du rivage** (c'est ce second jeu qui manquait au calibrage du 13/10/2026).
    - Attendu (relevés le 14/10/2026, nombre d'objets) :

      | Point | 5 km | 10 km | 20 km | 30 km | 50 km |
      |---|---|---|---|---|---|
      | Large de Dunkerque | 0 | 0 | 1 | 1 | 1 |
      | Baie de Somme, nord de la baie du Mont-Saint-Michel | 0 | 1 | 1 | 1 | 1 |
      | Centre baie du MSM, rade de Brest, golfe du Morbihan, Arcachon | 1 | 1 | 1 | 1 | 1 |
      | Niort (79) | 0 | 1 | 1 | 1 | 1 |
      | Argentan (61), Laval (53) | 0 | 0 | 1 | 1 | 1 |
      | Alençon (61), Angers (49), Chartres (28) | 0 | 0 | 0 | 0 | 1 |
      | Paris, Lyon, Le Mans (72), Poitiers (86) | 0 | 0 | 0 | 0 | 0 |

    - Attendu aussi : la couche couvre **entièrement** les départements
      littoraux, jusqu'à leur limite intérieure — Vire, Falaise et Lisieux (14),
      Évreux (27) et Rennes (35) renvoient 1 objet.
    - Conclusion à retrouver : **aucun rayon ne sépare les deux cas.** La mer en
      exige au moins 20 km, les villes de l'intérieur moins de 10. 20 km est
      retenu sur la conséquence (ne jamais bloquer une étendue d'eau légitime),
      et non sur une séparation nette qui n'existe pas. **Si
      `CONFIG.rayonCouvertureShom` est modifié, ce tableau doit être rejoué, et
      le test 30 avec.**
    - Vérification : exécution réelle contre `services.data.shom.fr`, depuis un
      navigateur (le conteneur d'exécution de Claude n'a pas accès à ce domaine).

29. **Scénarios de bout en bout terre/mer (v2.17)**
    - Action : pour chaque point, caler la carte, appeler `estSurLEau` puis,
      si le verdict est `false`, `interrogerTraitTerreMer`, et conclure comme
      le fait le gestionnaire de clic.
    - Attendu (20/20 le 13/10/2026, latence Shom 28 à 124 ms) :
      - **Avertissement « à terre »** : champ au sud de Caen (zoom 13), cap
        Blanc-Nez (zooms 8 et 15), bourg de Camaret, plage de Ouistreham, dune
        de Lacanau, Argentan (61), Laval (53), Niort (79), Paris, Lyon.
      - **Clic autorisé** : anse de Pen Hat, Manche (zooms 6 et 10), mer à 1 km
        de Ouistreham, estran du Mont-Saint-Michel, estran de la baie de Somme,
        rade de Brest, golfe du Morbihan, Méditerranée au large d'Hyères.
    - Attendu aussi : les clics autorisés en pleine eau (Manche, rade de Brest,
      Méditerranée) sont conclus **localement**, sans aucun appel au Shom.
    - Vérification : exécution en navigateur (console + onglet réseau).
    - **Test de non-régression prioritaire.**

30. **Larges estrans : aucun faux « à terre » (correctif du 14/10/2026)**
    - Action : tirer 30 points au hasard dans la baie du Mont-Saint-Michel
      (latitude 48,62 à 48,70 ; longitude -1,82 à -1,50) et appeler
      `interrogerTraitTerreMer` sur chacun.
    - Attendu : **aucun `null`**. Les points réellement terrestres (rive, polders,
      abords du Mont) renvoient `surDPM` faux avec leur `numdep` ; tous les
      autres renvoient `surDPM` vrai. Relevé du 14/10/2026 : 29 « mer », 1
      « terre » légitime (48,6220 / -1,5274, `numdep` = 50), 0 `null`.
    - **Test de non-régression prioritaire** : avec le rayon de 5 km du
      13/10/2026, le même tirage donnait **8 `null` sur 24** — soit autant de
      faux « vous êtes à terre » en plein estran, signalés par Nicolas le
      14/10/2026. Un `null` qui réapparaît ici signale un rayon de nouveau trop
      court, pas une panne du service : le vérifier en rejouant le test 28.
    - Vérification : exécution en navigateur (console).

31. **Baies et estuaires larges : clic autorisé (correctif du 14/10/2026)**
    - Action : rejouer les scénarios de bout en bout (test 29) sur des étendues
      d'eau éloignées du rivage.
    - Attendu, tous « clic autorisé » : large de Dunkerque, baie de Somme,
      nord et centre de la baie du Mont-Saint-Michel, bassin d'Arcachon, rade de
      Brest, golfe du Morbihan, Méditerranée au large d'Hyères, anse de Pen Hat,
      mer à 1 km de Ouistreham.
    - Attendu aussi, tous « avertissement à terre » : champ au sud de Caen, cap
      Blanc-Nez, bourg de Camaret, plage de Ouistreham, dune de Lacanau, Paris,
      Lyon, Le Mans, Chartres, Angers, Alençon.
    - Relevé du 14/10/2026 : 23/23.
    - Vérification : exécution en navigateur (console).

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

1. **Modale d'accueil en 4 étapes (v2.12)**
   - Action : lire `#guide-titre` et le gabarit injecté dans `#guide-corps`
     dans `index.html` ; puis l'ouvrir dans Chromium headless.
   - Attendu : titre « Choisir un emplacement de mouillage en 4 étapes » ;
     quatre `li.etape` numérotés 1 à 4, textes conformes au §3 « Étape 0 » de
     DOCUMENTATION_FONCTIONNELLE.md ; l'étape 2 porte la classe `verte` ;
     intertitre « Si aucun port ni ZMEL ne convient : » ; aucune mention de
     la longueur du navire ; plus aucun élément `.bifurcation` dans la modale.
   - Attendu (exécution) : le bouton `#guide-commencer` ferme la modale ;
     après un clic en mer, `#et-0` passe à `faite` (puce ✓) et `#et-1` à
     `encours` (puce 4) ; après copie des coordonnées, `#et-1` passe à `faite`.
   - Attendu (v2.13, non-régression) : après copie, un nouveau clic accepté
     ailleurs laisse `#et-0` `faite` mais remet `#et-1` à `encours` (puce 4) ;
     un clic refusé (cultures marines, ou APB simulé) remet `#et-0` à
     `encours` (puce 3) et `#et-1` à l'état neutre (puce 4).
   - Vérification : lecture du code + Chromium headless.

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
   - Action : rechercher dans `index.html` le texte de l'étape 2 de la modale
     d'accueil (`li.etape.verte`, depuis v2.12 ; `.bif-txt` auparavant), le `label`
     de l'entrée `aot` de `COUCHES` et les propriétés des entrées
     `natura_sic` / `natura_zps`.
   - Attendu : l'étape 2 contient « la moins dommageable pour les fonds
     marins » (v2.12 ; « écosystèmes marins » en v2.4) ; plus aucun élément ni
     règle CSS `.bifurcation` / `.bif-*` (plus aucune occurrence de « dommageable pour les
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
     `recalculer()` (depuis v2.12, `majEtapes()` ne l'utilise plus).
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
         `#layer-panel` replié, `#evitage-panel` ouvert ;
      3. longueur seule (10) : toujours jaune, `#out-rayon` vide ;
      4. colonne d'eau 4 : `#out-rayon` = « Rayon d'évitage = 16 m », message
         `.evitage-resultat.chevauche` « … estimé à 16 m, risque une collision
         avec le rayon d'évitage des navires à proximité. Veuillez vérifier sur
         site ou modifier l'emplacement par précaution. » + `.evitage-sous-titre`
         « Estimation indicative qui ne remplace pas une vérification sur
         place. » (depuis v2.12, la saisie du navire n'est plus une étape de la
         marche à suivre) ;
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

---

## 7. Popup réorganisée en deux parties (v2.16)

*Tous ces tests s'exécutent en Chromium headless, sur le serveur local, avec les
réponses du Shom et de l'API Carto rejouées. Harnais : `test_popup.mjs` (hors
dépôt, dans le dossier de travail de Claude).*

1. **Cartes toutes repliées au départ**
   - Action : cliquer sur l'eau, Natura 2000 présent, fond de sable.
   - Attendu : `env-carte--protection` puis `env-carte--fond`, et **aucun**
     `.env-detail-bloc` visible.
   - *Depuis la v2.18*, une troisième carte `env-carte--usage` s'ajoute quand le
     point est hors de toute emprise du cadastre conchylicole — c'est le cas en
     rade d'Hyères, le point de test habituel (voir §8).
   - **Test de non-régression prioritaire** : le repli par défaut est une
     décision de Nicolas (13/10/2026) ; il ne tient que si le test 2 passe aussi.

2. **Chaque ligne repliée porte déjà la conséquence**
   - Attendu : la carte Natura 2000 affiche « étude d'incidence à prévoir », la
     carte fond affiche le résumé de sa famille (« ne laissez pas votre chaîne
     racler le fond » pour le sable).
   - Raison d'être : sans cette ligne, l'usager devrait déplier pour savoir s'il
     doit déplier. Si un libellé de `CONSEIL_FOND.resume` disparaît, le repli par
     défaut n'est plus défendable.

3. **Libellés de bouton orientés action**
   - Attendu : « Ce que ça implique » sur les zonages, « Comment mouiller ici »
     sur un fond connu, « Que faire ici » sur un fond non cartographié — jamais
     « Détails ».

4. **Le dépliage fonctionne dans les deux sens**
   - Action : cliquer le bouton d'une carte, puis le recliquer.
   - Attendu : la carte se déplie et le bouton devient « Masquer » ; au second
     clic elle se replie et le bouton reprend son libellé d'origine
     (`data-libelle`). `aria-expanded` suit.

5. **Bloc « à reporter » : nom de la zone et coordonnées**
   - Attendu : libellé « Nom de la zone Natura 2000 », valeur = les noms de
     sites ; libellé « Coordonnées GPS en degrés décimaux (DD) », valeur
     `{lat}, {lng}` à 6 décimales. Un bouton « Copier » par ligne.

6. **Seule la copie des coordonnées valide l'étape 4**
   - Action : cliquer « Copier » sur le nom de la zone, puis sur les coordonnées.
   - Attendu : `copieFaite` reste `false` après le premier, passe à `true` après
     le second. Les deux boutons affichent « Copié ! » 2 s.

7. **Natura 2000 + ZNIEFF**
   - Attendu : deux `env-carte--protection` (**même bleu**, ce sont deux zonages
     de même nature) puis `env-carte--fond`. La carte ZNIEFF porte « rien à
     reporter dans le formulaire ». Depuis la v2.18, `env-carte--usage` suit en
     quatrième position sur un point hors cadastre conchylicole.

8. **Aucun zonage : rien n'est affiché, et ligne « nom de la zone » masquée**
   - Attendu *(révisé en v2.19)* : **aucune** carte de zonage — ni verte, ni
     bleue —, et `#zone-row` masquée ; les ZNIEFF n'ayant pas de nom dans la
     source, une ligne vide serait pire que son absence.
   - Et si aucune autre carte n'a lieu d'être (ni fond, ni cultures marines),
     `#env-block` est entièrement vide : pas même le titre « Contexte
     environnemental ».
   - **Ne pas confondre avec la panne** : « Zonages de protection : vérification
     impossible » doit, elle, continuer de s'afficher. La taire ferait passer un
     service injoignable pour une absence de zonage.

9. **Clic à terre : le bloc « à reporter » disparaît**
   - Action : détection locale « terre » confirmée par le trait terre-mer.
   - Attendu : `#report-block` en `display:none` (et non seulement ses lignes).

---

## 8. Cultures marines — cadastre conchylicole des DDTM (v2.18)

*Harnais : `test_cm.mjs` (hors dépôt, dans le dossier de travail de Claude),
Chromium headless sur le serveur local. Les réponses du cadastre rejouées sont
les **réponses réelles** relevées le 13/10/2026 sur
`ogc.geo-ide.developpement-durable.gouv.fr` : parcelle `MX01000956`
(Locquénolé, commune de Taulé, DDTM 29), réponse vide sur un point en pleine
mer, et `ExceptionReport` tel que le renvoie la DDTM 50.*

Contrat testé (voir `DOCUMENTATION_FONCTIONNELLE.md` §4.3ter) : quatre issues
distinctes — parcelle trouvée (interdiction), absence confirmée (silence),
secteur sans cadastre publié, flux injoignable.

1. **Parcelle trouvée en Finistère — interdiction complète**
   - Action : clic sur −3,86382 / 48,63412, le cadastre renvoyant `MX01000956`.
   - Attendu : `#env-block` en classe `env-rouge`, contenant « parcelle
     MX01000956 », « TAULE », « Divers Huître/Coquillage », « déjà concédée », et
     « Source : cadastre conchylicole de la DDTM Finistère ».

2. **Clic refusé — aucune coordonnée délivrée**
   - Attendu : aucun marqueur, `#report-block` masqué, étapes 3 et 4 du guide
     remises à zéro.
   - **Piège du harnais** : la teinte rouge est portée par `#env-block`
     (`afficherEnvironnement`), **pas** par `#coords-popup`. Une assertion posée
     sur le popup échoue à tort.

3. **Ordre des axes et tolérance de la BBOX**
   - Attendu : `BBOX=<lat_min>,<lon_min>,<lat_max>,<lon_max>,EPSG:4326`
     — **latitude d'abord** — et une demi-hauteur de 5 m ± 1,5 m pour une couche
     surfacique.
   - Ne jamais « corriger » cet ordre en lon,lat : en WFS 1.1.0 + EPSG:4326 ces
     flux attendent bien lat,lon, et l'inversion renvoie silencieusement zéro
     parcelle — donc un secteur déclaré libre à tort.

4. **Emprises respectées — pas de requête inutile**
   - Attendu : un clic en Finistère n'interroge **qu'un** flux ; les trois autres
     ne sont pas appelés.

5. **APB et cultures marines en parallèle**
   - Attendu : sur un même clic, le WFS `patrinat_apb:apb` **et** le cadastre
     sont tous deux interrogés.
   - **Piège du harnais** : l'APB passe par `data.geopf.fr` avec la couche
     `patrinat_apb:apb`, pas par `apicarto.ign.fr` — compter les appels sur
     « biotope » dans l'URL d'API Carto ne voit jamais rien.

6. **Absence confirmée — la carte se tait**
   - Action : clic dans l'emprise du Finistère, le cadastre renvoyant une
     collection vide.
   - Attendu : le parcours continue (marqueur, coordonnées, bloc à reporter), et
     **aucune** mention des cultures marines dans le popup.

7. **Hors emprise — « non vérifiées ici »**
   - Action : clic en rade d'Hyères (6,13 / 43,03).
   - Attendu : **aucune** requête au cadastre, et une carte `env-carte--usage`
     « Cultures marines : non vérifiées ici », mention « aucun cadastre
     conchylicole publié pour ce secteur ».

8. **Flux injoignable — « vérification impossible »**
   - Action : clic dans l'emprise du Finistère, le flux répondant HTTP 500.
   - Attendu : le mouillage **n'est pas** bloqué (marqueur et coordonnées
     délivrés), et une carte « Cultures marines : vérification impossible ».

9. **`ExceptionReport` traité comme une panne, pas comme un vide**
   - Action : même clic, le flux répondant HTTP 200 avec l'`ExceptionReport`
     d'encodage de la DDTM 50.
   - Attendu : « Cultures marines : vérification impossible ».
   - **Test le plus important de la section** : MapServer répond en 200, et lire
     ce document comme une absence de parcelle déclarerait libre un secteur dont
     on ne sait rien.

10. **Charente-Maritime — deux couches sur le même point**
    - Action : clic sur −1,20 / 46,00, la couche linéaire renvoyant la parcelle
      `MO07200031` (Moule), la surfacique rien.
    - Attendu : les **deux** flux (`L_CADASTRE_CONCH_S_017` et
      `L_CADASTRE_CONCH_L_017`) interrogés, et la parcelle linéaire suffit à
      bloquer le clic.

11. **Couche linéaire — tolérance élargie**
    - Attendu : demi-hauteur de BBOX de 25 m ± 3 m sur le flux linéaire.
    - Motif : une ligne n'a pas de surface, un point ne la toucherait jamais.

12. **Affichage — quatre flux sous une seule case**
    - Attendu : les sources `cultures`, `cultures-1`, `cultures-2`, `cultures-3`
      et les couches `cultures-layer`, `cultures-1-layer`, `cultures-2-layer`,
      `cultures-3-layer` existent et sont visibles ; `cultures-fill` (l'ancienne
      couche GeoJSON) n'existe plus.

13. **Bascule groupée de la légende**
    - Action : décocher puis recocher « Cultures marines ».
    - Attendu : les quatre couches passent à `none` ensemble, puis reviennent à
      `visible` ensemble.

14. **Plus aucune référence fonctionnelle au polygone fictif**
    - Attendu : le code source ne contient ni `geojson: 'data/cultures-marines…`,
      ni la clé `'data/cultures-marines.geojson':` dans `SECOURS`, ni
      `EXEMPLE FICTIF`.
    - Le commentaire de code qui **raconte** la suppression a le droit de nommer
      le fichier : l'assertion doit viser les références fonctionnelles, pas la
      chaîne de caractères.

15. **Intégrité — aucune erreur JavaScript sur tout le parcours**
    - Attendu : aucun `pageerror` ni `console.error`, hors bruit habituel
      (favicon, WebGL/swiftshader, ressources interceptées).

### Parcelle voisine — ajouts de la v2.21

Le harnais `test_cm.mjs` rejoue désormais une parcelle décalée d'environ 33 m du
point cliqué, avec une **géométrie exploitable** : depuis la v2.21 la carte lit
les `<gml:posList>` et mesure la distance, une réponse sans géométrie ne
suffirait plus à tester quoi que ce soit.

**45. Parcelle à moins de 40 m : signalée, non bloquée**
- Action : clic dans l'emprise du Finistère, le cadastre renvoyant une parcelle
  à ~33 m.
- Attendu : **pas** de `env-rouge`, marqueur et coordonnées délivrés, bloc « à
  reporter » visible, et une carte `env-carte--usage` « Parcelle de cultures
  marines à 33 m » / « votre rayon d'évitage peut l'atteindre ».

**46. La distance affichée vient de la géométrie, pas d'une approximation**
- Attendu : la distance affichée tombe entre 28 et 38 m pour la géométrie
  rejouée. Un écart franc signale une erreur de projection (confusion lat/lon,
  oubli du cosinus de la latitude) ou une lecture de `posList` à l'envers.

**47. Le détail reprend le texte de Nicolas**
- Action : déplier la carte.
- Attendu : « Il serait préférable d'envisager un autre emplacement. », puis le
  numéro de parcelle, la commune, l'espèce et la DDTM source. Texte écrit par
  Nicolas le 14/10/2026 — ne pas le reformuler.

**48. Au-delà de 40 m, rien n'est dit**
- Action : clic dans l'emprise, cadastre répondant vide.
- Attendu : aucune mention des cultures marines.

**49. Entités multi-polygones : tous les anneaux comptent (vérification en réel)**
- Action : sur la version publiée, cliquer en baie du Mont-Saint-Michel à
  48,649899 / −1,684100.
- Attendu : « Parcelle de cultures marines à **10 m** », sans blocage.
- **Piège de vérification** : ces parcelles sont des `MultiSurface` de 3 à 5
  polygones (un parc à moules compte plusieurs rangées de pieux). Une mesure à
  la main qui ne lit que le premier `<gml:posList>` d'une entité annonce 36 m au
  lieu de 10 m — c'est l'erreur commise le 14/10/2026 avant de regarder le
  détail. Toute vérification manuelle doit parcourir **tous** les `posList`.

**Deux pièges du harnais, rencontrés le 14/10/2026 :**
- Les géométries rejouées doivent être **cohérentes avec le point cliqué**. La
  parcelle linéaire de Charente-Maritime avait gardé des coordonnées du
  Finistère : à 200 km, elle ne bloquait plus rien et le test échouait sans que
  le code soit en cause.
- Sur une couche **linéaire**, aucun point n'est jamais « dedans » : seule la
  distance au tracé décide. Pour tester le blocage, le tracé rejoué doit passer
  à moins de `CONFIG.blocageCulturesMarines` (5 m) du point.

## 9. Règles locales — rattachement DDTM et dégagement du popup (v2.22)

*Harnais : `harnais.mjs` (hors dépôt, dossier de travail de Claude). Il extrait le
dernier bloc `<script>` d'`index.html`, l'exécute dans un contexte `vm` avec des
globaux simulés, puis appelle directement `blocReglesLocales` avec le contenu réel
de `data/ddtm-messages.json`.*

*Dernière exécution : 14 oct. 2026 (v2.23) — 25/25, plus l'exécution synchrone
complète du script sans exception et la non-régression `rayonEvitage` (16 / 21).*

*Vérification en conditions réelles de la v2.22, 14 oct. 2026, sur la version
déployée (GitHub Pages), navigateur intégré, viewport 1280 × 820 : build confirmé
dans le source servi, `data/ddtm-messages.json` en 200, aucune exception au
chargement. Clic au large d'Erquy (48,6443 / −2,5006) → sections « Règles
locales » puis « Contexte environnemental », rattachement « Côtes-d'Armor (22) »,
carte orange, bouton et lien corrects. Clic à 49,5578 / −3,2851 (plus de 10 km de
toute côte) → aucun bloc, aucune erreur.*

1. **Rattachement à un seul département**
   - Action : `blocReglesLocales({departements:['22'],rayonKm:5}, fiches)`.
   - Attendu : contient `popup-section">Règles locales`, un conteneur
     `popup-entete-section` et un `popup-rattachement` portant « Côtes-d'Armor (22) ».
     Le rattachement est **à droite du titre**, pas sur une ligne à part.
   - Vérification : exécution (Node.js).

2. **Message du 22 complet**
   - Attendu : carte `env-carte--ddtm`, lien vers
     `inscription-sur-liste-d-attente-mouillage`, **pas** de mention
     « Information provisoire » (`brouillon: false`).

3. **Message du 83, et son état de brouillon**
   - Attendu : titre « …ne délivre plus de nouvelles AOT en dehors de certaines
     zones dédiées », conséquence « identifier ces zones pour faire une demande »,
     exactement **5** `<li>` (v2.23), mention « Information provisoire » présente,
     et **aucun** `<a href` (champ `lien` vide). Depuis la v2.23 ces 5 `<li>`
     sont produits à partir de `data/zones-aot.geojson`, pas du champ `liste`
     (resté vide pour le 83) : chacun doit être un `<button class="env-zone-lien">`,
     et l'invite « Cliquez le nom d'une zone » doit suivre la liste.
   - **Deux contrôles ajoutés en v2.23, qui protègent une affirmation fausse** : la
     sortie doit contenir « liste est partielle », et **chacun** des 5 `<li>` doit
     nommer sa commune. Les cinq zones transmises sont toutes à Saint-Tropez, alors
     que la DDTM 83 couvre toute la façade varoise : sans ces deux garde-fous, un
     plaisancier de Bandol lirait une liste tropézienne comme exhaustive.
   - *Le compte de `<li>` est à mettre à jour à chaque arrivée de nouvelles zones.
     Le jour où la couverture devient complète, retirer `brouillon` et la phrase
     « liste est partielle » — et alors seulement assouplir ces deux contrôles.*

4. **Département connu sans message particulier (29, 56)**
   - Attendu : la ligne de rattachement seule, **aucun** `env-carte`.

5. **Deux départements au plus petit rayon**
   - Action : `blocReglesLocales({departements:['22','29'],rayonKm:2}, fiches)`.
   - Attendu : phrase « proche de la limite entre … » **sous** le titre (pas de
     `popup-rattachement` à droite), et le message du 22 affiché malgré tout.

6. **Absence de rattachement**
   - Attendu : `blocReglesLocales(null, …)` et `{departements:[]}` renvoient la
     chaîne vide — aucun bloc, aucun titre orphelin.

7. **Échappement (4 contrôles) — ce fichier viendra de Grist**
   - Action : passer une fiche piégée (`<script>`, `<img onerror>`, `<b>`,
     `lien: "javascript:alert(1)"`).
   - Attendu : aucune de ces balises dans la sortie, et le lien `javascript:`
     **non rendu** (filtre `^https://`).
   - **Ne jamais assouplir ce point** : les messages seront demain rédigés par des
     agents DDTM dans Grist, pas par l'équipe.

8. **`data/ddtm-messages.json` valide et sans balises**
   - Attendu : parse JSON sans erreur, champs `ddtm`, `nom_departement`,
     `message_titre`, `message_detail`, `lien` présents sur chaque fiche, et
     **aucune balise HTML** dans tout le fichier.

9. **Dégagement du point sous le popup — hors harnais Node, vérifié en navigateur**
   - `degagerPointSousPopup` est exposée et s'initialise sans erreur, mais son
     comportement dépend de la géométrie réelle du rendu (rectangle du popup,
     projection du point), que le stub ne reproduit pas fidèlement. Ce test se fait
     donc en navigateur.
   - *Relevé du 14/10/2026, version déployée, viewport 1280 × 820, popup occupant
     x 16 → 436 : clic volontaire en (250, 500), sous le panneau. Trajectoire du
     marqueur : x 250 → 256 → 455 → 460, y constant à 507. Arrivée à 460, soit le
     bord droit du popup (436) plus la marge de 24 px — valeur attendue exactement.
     Latitude préservée, glissement animé. **OK.***
   - Restent à vérifier à la main, checklist §9.20 : fenêtre sous 700 px →
     glissement **vertical** (branche non empruntée) ; clic hors du popup →
     **aucun** glissement ; `prefers-reduced-motion` → glissement instantané.

10. **Zones de mouillage autorisées — point dans / hors zone (v2.23)**
   - Action : `blocReglesLocales({departements:['83'],rayonKm:1}, fiches, zones, {lng:6.62295, lat:43.26785})`
     — point placé à l'intérieur de la zone 1 (La Bouillabaisse).
   - Attendu : la sortie contient `env-zone-dedans` et le nom du lieu.
   - Action : même appel avec `{lng:6.70, lat:43.20}`, au large et hors de toute zone.
   - Attendu : **aucun** `env-zone-dedans`. Ne jamais relâcher ce second contrôle :
     annoncer à tort qu'un emplacement est autorisé est la pire erreur que cette
     fonctionnalité puisse commettre.
   - Attendu aussi : le 22, qui n'a aucune zone cartographiée, ne produit **aucun**
     `env-zone-lien` — une DDTM sans zones ne doit pas afficher de liste vide.
   - Vérification : exécution (Node.js).

11. **`pointDansAnneau` n'existe qu'en un seul exemplaire**
   - Action : compter les occurrences de `function pointDansAnneau` dans `index.html`.
   - Attendu : **exactement 1**.
   - *Pourquoi ce test existe* : le 14/10/2026, une seconde implémentation a été
     ajoutée pour les zones AOT. Les déclarations de fonction étant hissées, elle
     écrasait celle du cadastre conchylicole et cassait la détection des parcelles
     — une fonctionnalité sans rapport, qui n'aurait pas été retestée. Le test de
     syntaxe passait sans rien voir ; seule l'exécution réelle a levé l'erreur.
   - Vérification : lecture du code (`grep -c`), à rejouer après tout ajout de
     fonction géométrique.

12. **Bordure complète de la carte de règle locale (v2.23)**
   - Action : lire la règle `#env-block .env-carte--ddtm` dans `index.html`.
   - Attendu : `border` sur les quatre côtés (2 px), **pas** `border-left` seul, et
     `border-radius:4px` sur les quatre coins.
   - Vérification : lecture du code, puis contrôle visuel — la carte orange doit se
     distinguer au premier coup d'œil des cartes bleue et sable, qui gardent leur
     filet gauche.

---

### Résultat de la dernière exécution

14 octobre 2026, version 2.21 : **45/45** sur l'ensemble des suites
(estran 7/7, nature du fond 8/8, popup 11/11, cultures marines 19/19), rejouées
sur la version incluant le correctif du rayon de couverture terre/mer (commit
`c3478b3`, mené en parallèle dans une autre session — les premières exécutions
portaient sur une copie prise avant ce correctif, et ont dû être refaites). Vérification de syntaxe des deux
blocs `<script>` : OK.

Le harnais « nature du fond » s'est révélé **intermittent** le 14/10 : il lisait
le popup 2 800 ms après le clic, délai devenu trop court depuis que le cadastre
conchylicole part en parallèle. Deux exécutions sur trois échouaient sur un test
différent à chaque fois, avec un popup resté sur « Vérification des zonages
environnementaux… ». Attente portée à 3 600 ms, puis trois exécutions
consécutives à 8/8. **Un test qui échoue sur un message d'attente est un
problème de délai du harnais, pas du code** — le vérifier avant de chercher une
régression.

Les quatre premiers échecs rencontrés venaient des **assertions du harnais**, pas
du code : classe rouge cherchée sur le mauvais élément, mauvaise couche pour
l'APB, et chaîne du fichier supprimé présente dans un commentaire.

### Dette relevée en rejouant les sections antérieures

Les harnais des sections 1 (estran), nature du fond et popup simulaient l'eau par
« `queryRenderedFeatures` ne renvoie aucun objet ». Depuis la **v2.17**, cela
signifie « aucune preuve d'eau » et le point est tenu pour terrestre : les trois
suites déclaraient donc tous les clics « à terre » et ne vérifiaient plus rien.
Remises à jour le 13/10/2026 :

- preuve d'eau explicite (`[{ sourceLayer:'hydro_surf' }]`) ;
- deux réponses LIMTM par clic contesté (`INTERSECTS` au point, puis `DWITHIN`
  pour le test de couverture), et comptage d'appels porté de 1 à 2 ;
- attente portée de 1 200 à 2 200 ms sur le harnais estran, le verdict arrivant
  après deux requêtes.

**À retenir pour la prochaine évolution :** tout changement du contrat terre/eau
ou du trait terre-mer casse silencieusement ces trois harnais — ils passent alors
au vert pour de mauvaises raisons, ou au rouge en bloc. Rejouer les quatre
suites, pas seulement celle de la fonctionnalité touchée.
