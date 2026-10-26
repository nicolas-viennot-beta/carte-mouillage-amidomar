# Sources de données de la carte — document de référence

**Ce fichier est la référence unique sur les données de la carte.** Toute source
nouvelle, tout test, tout flux cassé se consigne ici — pas dans une note
séparée. Les notes datées (`notes/`, projet Claude) restent l'historique des
campagnes de test ; en cas de divergence, **c'est ce fichier qui fait foi**.

Chaque section porte sa date de vérification. Tous les chiffres ont été mesurés
sur les services eux-mêmes, pas lus dans une fiche de métadonnées.

*Dernière consolidation : 26 octobre 2026 — versement de la campagne bathymétrie du
15 octobre (§5 prépaquets, §6 EMODnet, §12). Consolidation précédente : 15 octobre 2026,
après relecture croisée de `DOCUMENTATION_FONCTIONNELLE.md`, `TESTS_FONCTIONNELS.md` et
`index.html`.*

---

## 1. Où en est chaque source

`Affichage` = tuiles visibles sur la carte. `Au clic` = interrogation du point
cliqué, qui porte la valeur pédagogique du produit — `WFS` pour une requête
réseau, `apicarto` pour l'API Carto, `local` pour un fichier du dépôt déjà
chargé, `pixel` pour la lecture du fond de carte rendu.

| Source | Affichage | Au clic | État |
|---|---|---|---|
| Fond de plan et photos aériennes — IGN | ✅ | ✅ pixel | en service |
| Natura 2000 habitats (SIC/ZSC) — IGN/INPN | ✅ | ✅ apicarto | en service |
| Natura 2000 oiseaux (ZPS) — IGN/INPN | ✅ | ✅ apicarto | en service |
| Parcs naturels marins — IGN/INPN | ✅ | — | en service |
| ZNIEFF marines type 1 — IGN/INPN | ✅ | ✅ apicarto | en service |
| Arrêtés de protection de biotope — IGN/INPN | ✅ | ✅ WFS | en service, **bloquant** |
| Aires marines protégées — OFB | ✅ | — | en service |
| **Herbiers posidonie + zostères — OFB** | ❌ | ❌ | **source qualifiée, intégration ajournée** (décision du 15/10, §4) |
| Herbiers — Ifremer (couche actuelle) | ⚠️ | — | **à remplacer** : Occitanie seulement |
| Trait terre-mer (DPM) — Shom | — | ✅ WFS | en service |
| Natures de fond — Shom | — | ✅ WFS | en service, **couverture très inégale** |
| Informations portuaires — Shom | ✅ | — | en service |
| Marées par port — Shom (fichier local) | — | ✅ | en service |
| Profondeur — EMODnet (levés Shom, EDMO 540) | — | ✅ | en service, **maille ~115 m** |
| Cultures marines — cadastres DDTM | ✅ | ✅ WFS | en service, **bloquant** |
| ZMEL — Cerema/CACEM (fichier local) | ✅ | ✅ local | en service |
| Zones de mouillage autorisées — DDTM 83 | ✅ | ✅ local | 5 zones sur 1 commune |
| AOT existantes | ✅ | ✅ local | **données simulées** |
| Zones de baignade et zones réglementaires | ❌ | ❌ | aucune source publique |

Deux sources seulement **bloquent** un clic : les APB et le cadastre
conchylicole. Tout le reste informe sans interdire.

### Statut déclaré et joignabilité testée

Deux mécanismes différents, à ne pas confondre.

**Le `statut` déclaré en dur** dans le tableau `COUCHES` de `index.html` dit ce
que l'équipe sait de la source :

- `verifie` — testée et fonctionnelle ;
- `a_tester` — plausible, à confirmer ;
- `local` — fichier du dépôt, à compléter par les DDTM.

**La joignabilité testée à l'exécution** par `testerSource`, affichée dans le
bandeau « Couches affichées » depuis le poste de l'usager, avec quatre icônes
(✓ ✗ ○ ≈). Une couche peut être `verifie` et pourtant injoignable depuis un
réseau donné : c'est précisément ce que le bandeau sert à montrer.

---

## 2. Pièges transverses — à lire avant d'ajouter une source

Six pièges rencontrés en vrai, sur quatre plateformes différentes. Ils se
ressemblent et coûtent tous le même prix : **un secteur déclaré libre à tort**.

**1. La projection du filtre géométrique.** Les coordonnées d'un `CQL_FILTER`
sont lues dans la projection *native* de la couche. Sans le préfixe
`SRID=4326;`, une requête en degrés sur le trait terre-mer (Lambert 93) renvoie
silencieusement zéro résultat — ce qui se lit à tort comme « point en mer ». Le
préfixe est obligatoire.

**2. L'ordre des axes en WFS 1.1.0.** En `EPSG:4326`, la `BBOX` attend
**latitude puis longitude**. Inversée, elle renvoie zéro parcelle sans erreur.

**3. Le nom de l'attribut géométrique change.** Un nom erroné renvoie une
erreur 400, pas un résultat vide.

| Attribut | Plateforme / couches |
|---|---|
| `geom` | trait terre-mer et câbles (Shom) ; **toutes** les couches OFB ; toutes les couches `patrinat_*` |
| `geometry` | réglementation navigation, zones d'exercices, natures de fond, épaves, informations portuaires (Shom) |
| `the_geom` | marnage, toponymie, limites transversales de la mer (Shom) |

**4. `ExceptionReport` renvoyé en HTTP 200.** MapServer (GéoIDE) signale ses
pannes par un document XML avec un code 200. Le lire comme « aucune parcelle
ici » déclarerait libre un secteur dont on ne sait rien.

**5. `null` n'est pas « vide ».** Toute fonction d'interrogation doit distinguer
trois états : trouvé, absence confirmée, **indéterminé** (service injoignable,
hors emprise). Un `null` ne doit jamais bloquer l'usager — la règle de prudence
est de ne bloquer que sur une réponse franche.

**6. CQL n'existe pas partout.** `CQL_FILTER` est propre à GeoServer. MapServer
(GéoIDE) ne le gère pas : on y filtre en `BBOX`. Depuis la v2.21, le rayon de
requête est de **40 m pour toutes les couches**, surfaciques comme linéaires —
et non plus 5 m / 25 m. Ne pas confondre ce rayon de *requête* avec le seuil de
*blocage*, resté à 5 m (§7).

Bonne nouvelle mesurée le 14/10/2026 : **MapServer filtre sur la géométrie
réelle, pas sur le rectangle englobant.** Un point à 53 m d'un bouchot diagonal,
mais dans son rectangle englobant, ne renvoie rien. C'est ce qui rend la méthode
utilisable.

**7. Un point pris sur un sommet de polygone ne renvoie rien.** Constaté sur
`patrinat_apb:apb` (« Ile Dumet et ses abords », -2,6214 / 47,4112) et déjà sur
`znieff2_mer`. Ne jamais utiliser un sommet de contour comme point de test.

**8. Mesurer une distance sur une `MultiSurface` demande de parcourir tous les
anneaux.** Les parcelles conchylicoles sont faites de 3 à 5 polygones : ne lire
que le premier `<gml:posList>` donne 36 m au lieu de 10 m. Erreur effectivement
commise le 14/10/2026.

À savoir aussi : `outputFormat=application/json` fonctionne sur le WFS du Shom et
de l'OFB **alors que les GetCapabilities n'annoncent que du GML**. Sur GéoIDE,
il échoue — seul le GML est servi, à lire au `DOMParser` sans dépendre du
préfixe `ms:`.

### L'origine à utiliser pour tester le CORS

La carte est servie depuis **`https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/`**
et **embarquée en iframe** dans `amidomar.beta.gouv.fr`. C'est donc
`nicolas-viennot-beta.github.io` qui est l'origine des requêtes, et c'est depuis
elle qu'un test CORS a valeur de preuve. Tester depuis la page porteuse ne dit
rien de ce que fera la carte. CSP de la page : `connect-src 'self' https:`.

---

## 3. Protection de la nature — IGN / INPN (Géoplateforme)

**Affichage** : WMTS `https://data.geopf.fr/wmts`, TileMatrixSet `PM`.
Couches : `Patrinat_SIC`, `Patrinat_ZPS`, `Patrinat_PNM`, `Patrinat_ZNIEFF1_MER`,
`Patrinat_APB`. Vérifiées le 21 septembre 2026.

**Au clic** : `https://apicarto.ign.fr/api/nature/` — `natura-habitat`,
`natura-oiseaux`, `znieff1`, `znieff2`. Le champ du nom **diffère selon la
couche** : `sitename` pour Natura 2000, `nom` pour les ZNIEFF. Les réponses
pèsent 200 à 360 ko et prennent jusqu'à 4,5 s, d'où un délai de 8 s — porté de
4 s en v1.7 après qu'un test réel du 21/09/2026 a dépassé 8 s sur 3 points
sur 4, et une réponse à 10 s a été observée sur `znieff2`.

> **Deux endpoints n'existent pas.** `sic` et `zps` renvoient **404** : ils
> avaient été introduits en v1.3 sans test et échouaient silencieusement à
> chaque clic. **Ne pas les réintroduire** — les noms corrects sont
> `natura-habitat` et `natura-oiseaux`.

> **L'API Carto ne renvoie pas les ZNIEFF en mer.** C'est la raison du repli
> WFS marin, pas une optimisation : sans `patrinat_znieff1_mer` et
> `patrinat_znieff2_mer`, une ZNIEFF marine n'est jamais signalée.

**Repli** : le WFS `https://data.geopf.fr/wfs/ows` sert les mêmes périmètres en
vecteur, attribut géométrique `geom`, filtre `INTERSECTS(geom, SRID=4326;POINT(lon lat))`
— **longitude d'abord**. Interrogé au point le 14 octobre 2026 : **49 à 52 ms**
par couche depuis le navigateur, 134 ms depuis l'origine de déploiement. Nom lu
dans `nom_site`.

| Type d'objet | Rôle |
|---|---|
| `patrinat_sic:sic`, `patrinat_zps:zps` | repli des deux `natura-*` |
| `patrinat_znieff1:znieff1`, `patrinat_znieff1_mer:znieff1_mer` | repli ZNIEFF 1, **le marin est indispensable** |
| `patrinat_znieff2:znieff2`, `patrinat_znieff2_mer:znieff2_mer` | repli ZNIEFF 2, idem |
| `patrinat_apb:apb` | vérification **bloquante**, délai 4 s, retour `[]` sur échec |
| `patrinat_pnm:pnm` et le reste du référentiel | disponibles, non branchés au clic |

> **Piège propre à `patrinat_apb:apb`** : un filtre `BBOX` y attend **latitude
> puis longitude**, à l'inverse du `INTERSECTS`/`POINT` utilisé partout ailleurs
> sur les couches Patrinat.

Noms confirmés au GetCapabilities le 21/09/2026 : `patrinat_apb`,
`patrinat_rnr`, `patrinat_znieff1_mer`, `patrinat_znieff2_mer`.

Attributs utiles : `nom_site`, `url_fiche` (lien INPN direct), `marin`,
`gest_site`, `surf_off`.

> Test de référence : au point 6,40 / 43,00 (Port-Cros), on attend « Rade
> d'Hyères » en habitats et « Iles d'Hyères » en oiseaux.

**Les APB bloquent le clic.** Depuis le 21 septembre 2026, un arrêté de
protection de biotope au point cliqué interdit le mouillage. Tuiles avec
contenu sur 6 des 7 sites essayés le 21/09/2026 (Ajaccio, Arcachon, Brest,
Camargue, Morbihan, Quiberon ; **tuile vide à Hyères**). Rendu orange vif
`rgb(255,128,0)`, proche de la teinte des aires marines protégées et peu visible
dézoomé.

> **Les 404 hors emprise sont la normale**, pas une panne : une couche de
> superposition renvoie 404 là où elle n'a rien. Relevé sur la version publiée :
> **126 sur `data.geopf.fr/wmts`, 79 sur le GéoIDE** à un simple chargement.
> Avant la v2.24, six suffisaient à déclencher à tort « Fond de carte
> indisponible ».

**Aires marines protégées** : WMS `https://wxs.ofb.fr/geoserver/gestion/ows`,
couche `ges_omon_amp_ofb_pol_3857_vue`. Affichage seulement, masquée par défaut.

**Le fond de plan est aussi une source interrogée.** `CarteFacile.mapStyles.simple`,
source unique `plan_ign`, lue à **chaque clic** par `queryRenderedFeatures` sur
une carte fantôme (jamais affichée, `preserveDrawingBuffer: true` requis pour
`gl.readPixels`). C'est la détection terre/eau locale, celle qui répond
instantanément avant le trait terre-mer du Shom.

Couleurs mesurées le 13/10/2026 : mer `rgb(151,205,213)` (zooms 6 à 14), estran
`rgb(192,229,219)`, champ / plage / dune / bourg `rgb(240,240,237)` sans objet.
`EAU_SIMPLE` ne retient **qu'une seule teinte**, tolérance ±6 par canal : la
seconde teinte `{199,228,219}` d'avant était à 7 près de l'estran et confirmait
« eau » sur des points de terre.

> **Le socle OpenMapTiles n'existe pas sur cette carte.** Les noms `landcover`,
> `landuse`, `building`, `aeroway` restent dans la regex `TERRE` **sans aucun
> effet** — rectificatif du 13/10/2026. Ils ne doivent plus être présentés comme
> une protection active. Les `sourceLayer` réellement rencontrés sont
> `bati_surf`, `ocs_vegetation_surf`, `ocs_nature_sol_surf`, `routier_*`,
> `hydro_surf`, `hydro_reseau`, `toponyme_*`.

**Géocodage** : `CarteFacile.GeopfGeocoder`, service de la Géoplateforme, utilisé
comme fournisseur du `SearchControl` après `GpsGeocoder`.

---

## 4. Herbiers — posidonie et zostères (OFB, vérifié le 14 octobre 2026)

**La source nationale existe et elle est qualifiée. Son intégration est
ajournée — décision du 15/10/2026.**

> **Ce qui est fait** : la source est identifiée, testée, et tout ce qu'il faut
> pour la brancher est écrit ci-dessous — endpoints, identifiants de couches,
> attribut géométrique, latences, limites, mentions obligatoires. Il n'y a plus
> de recherche à refaire.
>
> **Ce qui ne l'est pas** : rien n'est branché dans `index.html`. La couche
> affichée reste la couche Ifremer partielle.
>
> **Pourquoi on attend.** Trois points restent à trancher, et aucun n'est
> technique :
> 1. **quelle couche afficher** — la Nav&Co porte le message usager mais n'est
>    pas tuilée (WMS classique, moins fluide au zoom) ; la détaillée 2022 est
>    tuilée mais muette. Afficher l'une et interroger l'autre est possible,
>    c'est déjà le schéma des cultures marines, mais cela fait deux sources
>    sous une case de légende ;
> 2. **ce que le clic dit** — reprendre le `subtitle` de l'OFB tel quel, ou
>    l'encadrer d'un avertissement sur le caractère indicatif. La carte
>    montrera du sable là où un procès-verbal pourra constater un herbier :
>    c'est un sujet de rédaction autant que de responsabilité ;
> 3. **si un herbier bloque le clic** — aujourd'hui seuls les APB et le
>    cadastre conchylicole bloquent. Un polygone d'herbier n'est pas opposable,
>    ce qui plaide pour signaler sans bloquer, comme pour les concessions
>    linéaires (§7). Mais la posidonie est protégée depuis 1988 et l'arrêté
>    PREMAR 123/2019 encadre le mouillage : l'argument inverse est ici plus
>    fort que pour les bouchots.
>
> **Ce qui lèverait l'attente** : une réponse de l'OFB sur la mise en cache de
> la couche Nav&Co (§12) réglerait le point 1 et rendrait les deux autres
> moins coûteux à trancher.

Ce qui est affiché aujourd'hui est la couche Ifremer
`BIOMED_POSI_PALAVAS_P,BIOMED_POSI_ALBERES_P`
(`https://sextant.ifremer.fr/services/wms/biologie`, statut `a_tester`,
`visible:false` donc décochée au chargement — vérifié dans `index.html` le
15/10/2026) : elle ne couvre que Palavas et les Albères — rien sur le Var, les
Bouches-du-Rhône, la Corse, Quiberon, Brest ni Arcachon, c'est-à-dire
précisément là où le conflit entre mouillage et herbiers est le plus vif. La
zostère y est annoncée mais absente. **À remplacer.**

**Service de remplacement** : `https://wxs.ofb.fr/geoserver/habitat/wfs` (espace
de noms `habitat:`), compilation du Life intégré Marha. Licence Ouverte /
Etalab 2.0, sans clé ni compte, **CORS autorisé depuis l'origine de déploiement**
`https://nicolas-viennot-beta.github.io` — re-vérifié le 15/10/2026 (WFS 142 ms,
tuile WMTS 200/PNG). Voir l'encadré sur l'origine en §2.

| Couche | Objets | Couverture | Usage |
|---|---|---|---|
| `eco_met_herbiers_emprise_simple_ofb_pol_3857` | 3 527 | métropole, 3 façades | **la couche à retenir** — posidonie + zostères, messages usagers intégrés |
| `eco_met_herbiers_2022_ofb_pol_3857` | 144 362 | métropole | version détaillée, attribut `legende` ; **tuilée** |
| `eco_met_herbier_zostere_2024_ofb_pol_3857` | 325 363 | Manche-Atlantique | inventaire source, généalogie complète ; tuilée |
| `eco_med_herbier_posidonia_oceanica_2022_pol_3857` | 76 824 | Méditerranée | inventaire source |

Voisines du même service si le périmètre s'élargit :
`eco_med_herbier_cymodocee_2022_ofb_pol_3857`,
`eco_med_coralligene_ofb_pol_3857`, `eco_met_banc_maerl_2024_ofb_pol_3857`,
`eco_atl_n2000_carte_habitats_simplifies_version2_ofb_pol_3857`.

### La couche Nav&Co porte déjà le message usager

`eco_met_herbiers_emprise_simple_ofb_pol_3857` alimente Nav&Co, l'application
grand public de l'OFB. Chaque polygone embarque :

- `herbier` — Posidonie (1 554), zostère marine (1 068), zostère naine (847),
  non renseigné (58) ;
- `title` — « Zone fragile : vigilance mouillage » ;
- `subtitle` — la consigne rédigée pour un plaisancier (« j'évite les zones
  sombres, j'ancre dans les zones sableuses ») ;
- `url` — le texte applicable : arrêté PREMAR n°123/2019 pour la posidonie,
  brochures OFB pour les zostères ;
- `surf` — surface du polygone en m².

**Reprendre ce libellé tel quel** plutôt que d'en écrire un autre : deux
services de l'État qui disent la même chose avec des mots différents, c'est une
incohérence visible par l'usager, et une boucle de validation en plus. Les
visuels `notes/Visuels_site/pratique-2-ancrage-herbiers` et
`pratique-3-ancrage-sable` disent déjà la même consigne en image.

### Interrogation au point

Attribut géométrique `geom`, préfixe `SRID=4326;` obligatoire.

```
https://wxs.ofb.fr/geoserver/habitat/wfs
  ?service=WFS&version=2.0.0&request=GetFeature
  &typeNames=habitat:eco_met_herbiers_emprise_simple_ofb_pol_3857
  &outputFormat=application/json&srsName=EPSG:4326&count=3
  &CQL_FILTER=INTERSECTS(geom, SRID=4326;POINT(6.2 43.05))
```

Mesures du 14/10 : rade d'Hyères **94 ms** (1 polygone, Posidonie, 122 km²) ;
golfe du Morbihan **26 ms** (zostère naine) ; point en eau libre 0 objet en
HTTP 200.

### Affichage : tuiles raster, pas de vectoriel

GeoWebCache : `https://wxs.ofb.fr/geoserver/habitat/gwc/service/wmts`,
90 couches tuilées.

| Propriété | Valeur vérifiée |
|---|---|
| Formats | `image/png`, `image/jpeg` — et rien d'autre |
| TileMatrixSet | `EPSG:900913` (web mercator standard) et `EPSG:4326` |
| Tuile test (zostères, z9) | HTTP 200, PNG, 3,9 ko, 408 ms |

`EPSG:900913` se branche sur MapLibre en source `raster` avec `{z}/{x}/{y}`.

**Tuiles vectorielles : non.** Le serveur répond
`ServiceException code="InvalidFormat"` — pas de support pour
`application/vnd.mapbox-vector-tile`. Le plugin n'est pas installé, et aucun
autre producteur n'en diffuse sur ce thème. Pour en avoir, il faudrait les
fabriquer (WFS → `tippecanoe` → PMTiles), ce qui fige un millésime.

**Deux pièges :**

1. **La couche Nav&Co n'est pas dans le cache** — ce sont les couches détaillées
   qui le sont. Pour l'afficher : WMS classique (`/geoserver/habitat/wms`,
   `GetMap`), ou demander sa mise en cache à l'OFB.
2. **« Simplifiée » qualifie la sémantique, pas la géométrie.** Le GeoJSON
   intégral de la couche Nav&Co fait **18,9 Mo** (mesuré, 2,1 s) : pas
   chargeable d'un bloc dans la page. Tuiles pour l'affichage, `INTERSECTS` au
   clic.

### Ce que ces couches ne sont pas

**Aucune n'est opposable.** Ce sont des inventaires — compilations de
cartographies d'origines diverses (CARTHAM, CARTHAMED, CARBONSINK, REBENT,
marchés OFB locaux), avec un indice de confiance par polygone (`ic`, 0 à 3) et
des dates de validation terrain hétérogènes. Un polygone ne vaut pas constat ;
son absence ne vaut pas absence d'herbier.

Ce qui est opposable : l'arrêté ministériel du 19 juillet 1988 (espèces
végétales marines protégées, dont la posidonie), l'arrêté préfectoral n°123/2019
du préfet maritime de la Méditerranée, les périmètres Natura 2000, et les
arrêtés locaux. **La réglementation vise l'herbier, pas un périmètre
cartographié** : il n'existe donc pas de polygone faisant foi. La carte peut
dire « il y a probablement un herbier ici, voici ce que cela implique », jamais
« vous avez le droit ». Même positionnement que pour le rayon d'évitage, et même
avertissement à afficher.

Un corollaire moins confortable : cette donnée est de fait ce que
l'administration a de mieux. Si la carte l'affiche, un usager pourra reprocher à
l'État de lui avoir montré une zone sableuse là où un procès-verbal constatera
un herbier. La formulation du message au clic n'est pas un détail rédactionnel.

Fiches : [posidonie](https://www.data.gouv.fr/datasets/inventaire-des-donnees-disponibles-spatialisant-les-herbiers-de-posidonie-en-france-metropolitaine-polygone) ·
[zostères](https://www.data.gouv.fr/datasets/inventaire-2024-dherbiers-de-zosteres-en-france-metropolitaine-polygone-1) ·
[visualiseur Life Marha](https://lizmap.ofb.fr/ofb/life_marha/)

---

## 5. Shom — services INSPIRE (vérifié le 12 octobre 2026, bathymétrie le 15 octobre)

Quatre services, aucune clé, aucun compte, **CORS autorisé** depuis l'origine
de déploiement (voir §2). La grille de tuiles WMTS `3857` est la grille web
mercator standard (22 niveaux, 256 px), directement branchable sur MapLibre.

| Service | Endpoint | Contenu |
|---|---|---|
| WFS | `https://services.data.shom.fr/INSPIRE/wfs` | **182 types d'objets** vectoriels |
| WMS raster | `https://services.data.shom.fr/INSPIRE/wms/r` | 90 couches en image |
| WMS vecteur | `https://services.data.shom.fr/INSPIRE/wms/v` | 53 couches, interrogeables |
| WMTS | `https://services.data.shom.fr/INSPIRE/wmts` | 104 couches en tuiles |

### Branché dans la carte

**Trait terre-mer — la donnée de référence du DPM.**
`LIMTM_2154_WFS:limite_terre_mer_france_metropolitaine_polygones`, attribut
`geom`. Ce n'est pas un trait de côte dessiné à vue : c'est la laisse des plus
hautes mers astronomiques (coefficient 120, conditions normales), calculée par
intersection d'un modèle de PHMA et du MNT Litto3D®/RGE ALTI®, à 1–5 m de
résolution, **échelle de saisie 1:2000**.

Requête : `propertyName=id,numdep`, `count=1`, `outputFormat=application/json`,
`AbortController` sur `CONFIG.delaiTraitTerreMer` (3 s), retour **`null` et non
`false`** sur erreur ou dépassement. Réponses de **150 à 300 octets**, 25 à
250 ms observés. **C'est la définition même du rivage au sens de l'article L2111-4
du CGPPP**, donc la bonne donnée pour instruire une AOT sur le DPM.

La couche porte les **surfaces terrestres** : un point qui y tombe est à terre.

> ⚠️ **Mais zéro objet ne suffit pas à conclure « mer ».** La couche ne couvre
> que les **départements littoraux** — entièrement, mais seulement eux. Mesuré
> le 13/10/2026 : Vire, Falaise, Lisieux (14), Évreux (27), Rennes (35)
> renvoient 1 objet ; Argentan (61), Laval (53), Niort (79), Paris, Lyon en
> renvoient **0**. Lue naïvement, la couche déclare donc Paris « en mer ».
> C'est la régression corrigée en v2.17.
>
> La règle juste tient en deux requêtes, lancées ensemble :
> `INTERSECTS` au point **et** `DWITHIN(geom, point, 20, kilometers)` pour
> vérifier que la couche couvre le secteur. Zéro au premier **et** au moins un
> au second = en mer. Zéro aux deux = **indéterminé**, jamais « en mer ».

Le rayon de 20 km (`CONFIG.rayonCouvertureShom`) a été recalibré le 14/10/2026 :
8 réponses `null` sur 24 points de la baie du Mont-Saint-Michel avec 5 km, **0
sur 30** avec 20 km. Aucun rayon ne sépare parfaitement les deux cas — le choix
s'est fait sur la conséquence. Risque résiduel assumé : Niort, Argentan et Laval
ne sont plus avertis ; Paris, Lyon, Le Mans, Poitiers, Chartres, Alençon et
Angers le restent.

**Le rattachement départemental ne se lit pas au point.** `numdep` n'existe que
sur les objets terrestres : en mer il n'y a par construction aucun objet. Le
département est donc **inféré** par `DWITHIN` sur la terre la plus proche,
rayons 1, 2, 5 puis 10 km, en s'arrêtant au premier qui répond — au-delà de
5 km, le plafond `count=50` peut masquer un second département. Livré en v2.22.

Trois configurations le mettent en défaut : une limite départementale qui touche
la mer, une île rattachée à un autre département que la côte en face, un point
au large équidistant de deux départements.

Testé sur un transect de 11 points dans la baie du Mont-Saint-Michel : les
points à +10 à +13 m au-dessus du niveau de référence — du sable qui découvre à
chaque marée — sont classés **côté mer**. **L'estran est donc bien sur le DPM**,
exactement le comportement attendu.

Trois limites : France métropolitaine seulement (l'outre-mer relève de
`TCH-LINE_PYR-PNG_WLD_3857_WMTS`, moins précis) ; millésime 2021, donc un écart
possible sur un littoral mobile ; et **il ne dit pas s'il y a de l'eau** — un
point d'estran est sur le DPM *et* au sec à marée basse. Ce sont deux questions
distinctes : « suis-je sur le DPM ? » → trait terre-mer ; « y a-t-il assez
d'eau ? » → colonne d'eau EMODnet + marée.

> **Mention obligatoire** : Shom-IGN, 2021, doi:10.17183/LIMTM, Licence Ouverte
> Etalab 2.0, avec la clause « **ne pas utiliser pour la navigation** ». Elle
> doit rester affichée même après la sortie du statut de prototype.

**Natures de fond.** `NDF_BDD_WLD_WGS84G_WFS:natures_fond_50000`, attribut
`geometry`. C'est la donnée qui manquait au discours sur l'ancrage : les visuels
« ancrage sable », « ancrage sol dur », « ancrage herbiers » peuvent être
déclenchés par la donnée du point cliqué. `typelem` renvoyé partout : `NFRoche`
à Pen Hat, `NFS` (sable) à Hyères, `NFV` (vase) au Morbihan.

Trois nombres circulent sur les codes, et ils ne mesurent pas la même chose :
**19** rencontrés sur un échantillon de 4 000 objets, **24** tabulés dans
`NATURES_FOND` et répartis en 4 familles (sable, vase, graviers, dur), **33**
entrées dans la légende officielle obtenue par `GetLegendGraphic`. La
correspondance a été établie le 12/10/2026 en comparant la couleur rendue à la
pastille de légende : **23 codes sur 24 confirmés à l'identique**, seul `NFSFC`
(un unique polygone en France) est déduit du nommage. `NFC` (cailloutis) et
`NFGV` (graviers envasés) ont failli être confondus.

> ⚠️ **La couverture n'est pas nationale.** C'est une synthèse de **45 cartes
> sédimentaires publiées entre 1990 et 2023**. Taux de réponse mesuré le
> 12/10/2026 sur 30 points en mer par territoire : **Morbihan 100 %, Var 97 %,
> Finistère 87 %, Ille-et-Vilaine 27 %, Côtes-d'Armor 3 %**. Sur un territoire
> pilote, l'absence de réponse est donc le cas majoritaire — l'interface doit le
> dire plutôt que de laisser croire à un fond inconnu.

Deux contraintes rédactionnelles qui tiennent au produit, pas à la donnée :

- **aucune appréciation de tenue d'ancre** dans les conseils — la carte porte
  « ne pas utiliser pour la navigation » ;
- un rappel systématique : « cette carte ne représente pas les herbiers ; sur
  place, les taches sombres sont de l'herbier, à éviter. » C'est une carte
  **sédimentaire**.

Mention obligatoire : « Shom, 2025. Natures de fond au 1/50 000,
**doi:10.17183/HOM_GEOL_NATURES_FOND_50** », Licence Ouverte Etalab v2.0.

**Informations portuaires.** WMS raster
`INFORMATIONS_PORTUAIRES_PYR_PNG_3857_WMSR`, affichage seulement. Couverture
nationale, mais c'est une couche de **symboles et d'annotations** : elle
n'indique ni le nom du port, ni son gestionnaire, ni ses limites. Le type
d'objet WFS `INFORMATIONS_PORTUAIRES_BDD_WFS:hrbare_polygon` porte les limites
de port, mais les trois points testés étaient hors zone portuaire — à
revérifier dans un port.

### Testé, utilisable, pas encore branché

Huit couches qui ajouteraient de la valeur sans nouveau travail de recherche.
« Résultat observé » cite ce qui est effectivement revenu du service.

| Couche | Type d'objet WFS | Apport | Résultat observé |
|---|---|---|---|
| Zones réglementées | `REGLEMENTATION_NAVIGATION_BDD_WFS:resare_polygon` (`geometry`) | **texte réglementaire en français** directement affichable, attribut `ninfom` | Hyères, Morbihan et Pen Hat renvoient tous une zone : « Dans les eaux du Golfe du Morbihan, la vitesse et les pratiques nautiques sont réglementées » ; « Le rejet à la mer […] est interdit dans cette zone » |
| Zones militaires | `ZONEX_BDD_WFS:mipare` (`geometry`) | demandé au point DDTM (risque pyrotechnique) | 2 zones sur la rade d'Hyères, `inform` = « Secteur d'exercices » |
| Mouillages autorisés | `…:achare_polygon`, `…:achbrt_polygon` | contexte direct pour un demandeur d'AOT | Hyères : zone avec `restrn`. Morbihan : `catach`=8, « Mouillage sur bouées ». Pen Hat : un poste avec `radius` |
| Câbles et conduites | `…:cblare_polygon` (zones), `CABLES_BDD_WFS:cblsub_lv` (tracés, `geom`) | interdiction d'ancrage typique ; demandé au point DDTM | zones en Méditerranée ; `DWITHIN` à 20 km de Pen Hat renvoie 3 tracés |
| Épaves et obstructions | `EPAVES_BDD_WFS:wrecks`, `…:obstrn` | obstacle d'ancrage, avec `brassiage` | points sur les deux façades, avec `nom`, `type_obj` |
| Marnage | `MARNAGE_VE_WFS:marnage_ve_poly_mga` (`the_geom`) | le marnage **au point cliqué**, au lieu du port de référence le plus proche | Pen Hat 600 (6,00 m), Morbihan 500, Hyères aucun objet — cohérent |
| Toponymie marine | `TOPONYMIE_BDD_WFS:toponymes_points__3857_2013` (`the_geom`) | pré-remplir « Lieu-dit de votre emplacement » du formulaire DN | toponymes aux deux sites (attribut `nom`) |
| Chenaux et routes | `…:fairwy_polygon`, `…:rectrc_line`, `…:navlne_line` | demandé au point DDTM | service répond ; aucun objet sur les trois sites — à revérifier près d'un chenal balisé |
| Limites juridiques | `LIMITES_TRANSVERSALES_MER_WFS:ltm_3857_arc`, `LIMITES_SALURE_EAUX_WFS:lse_3857_arc`, `LIMITE_INSCRIPTION_MARITIMES_WFS:lim_3857_arc` | limite amont du DPM en estuaire, police des eaux, compétence maritime | attributs `numdep`, `nomdep`, `nomcom`, `autori`, `legsou` |

`DWITHIN(…, 500, meters)` interroge la **proximité** plutôt que l'appartenance —
utile pour un câble ou une épave, où l'enjeu est la distance d'évitement.

**Avant d'afficher ces couches** : `restrn`, `catrea`, `catach`, `catmfa` et
`typelem` sont des codes de la norme S-57. Tant qu'on n'a pas la table de
correspondance officielle, afficher `ninfom`/`inform` quand il existe, et sinon
le seul nom de la couche — ne pas tenter d'interpréter le code.

### Ce que le Shom n'a pas — à ne plus chercher de ce côté

| Besoin | Verdict testé |
|---|---|
| **Profondeur au point** | **Impossible, et prouvé — dossier clos (15/10/2026).** Les 40 couches de bathymétrie du WMS raster sont des **images déjà colorisées**, pas des rasters de valeurs : le GeoTIFF 1×1 renvoie `BitsPerSample [8,8,8,8]`, `SamplesPerPixel 4`, `PhotometricInterpretation 2` (RVB), et `image/x-bil;bits=32` renvoie 4 octets qui **sont le pixel**, réinterprétés en flottant — d'où les « valeurs incohérentes » du 25/09 : ce n'est pas un défaut de parsing, la valeur n'est pas là. `GetFeatureInfo` complet (avec `STYLES=` et `FORMAT=`) → `LayerNotQueryable` sur `MNT_COTIER_MORBIHAN_TANDEM_20m`, `MNT_ATL100m`, `BATHYELLI_ZH`, `LITTO3D_BZH`. **Pas de WCS** : 404 sur `/INSPIRE/wcs`, `/wcs`, `/INSPIRE/wcs/r`, `/INSPIRE/ows`. Même l'inversion de la rampe de couleurs est fermée : `GetLegendGraphic` → **403**. Seule voie vers une valeur fine : les prépaquets, ci-dessous |
| Isobathes et sondes en vecteur | absentes des 182 types d'objets |
| Fond de carte marine raster | pas dans le service INSPIRE ouvert — accès avec clé, à demander |
| Zones de baignade | confirmé absent |
| Herbiers | hors Shom — voir §4 |
| ZMEL | couche Shom de 2021, plus ancienne que le jeu Cerema déjà intégré |
| **Découpage DDTM en mer, en polygones** | le Shom ne diffuse que des *lignes* de limites administratives. Le `numdep` du trait terre-mer ne couvre que les points à terre. **Question ouverte** |

---

### Les prépaquets — la seule voie vers du 20 m ou du 1 m

*Vérifié le 15 octobre 2026.*

`https://services.data.shom.fr/INSPIRE/telechargement/prepackageGroup?request=GetCapabilities`
— **public, sans clé**, `Fees: none`, `AccessConstraints: none`. 119 ressources, dont tous
les MNT, chacun en deux variantes `PBMA` et `NM`.

**Convention de nommage du Shom**, lisible dans les noms de couches comme de prépaquets :
`_PBMA_` = plus basses mers astronomiques, **soit le zéro hydrographique** ; `_NM_` =
niveau moyen ; `ZNEG` = profondeurs comptées négativement. Pour un mouillage, la bonne
variante est **`PBMA`** — le cas le plus défavorable.

| Prépaquet | Résolution | Poids de l'archive 7z (mesuré) |
|---|---|---|
| `MNT_FACADE_ATLANTIQUE_HOMONIM_PBMA` | 100 m | 463 729 279 o ≈ **442 Mio** |
| `MNT_COTIER_MORBIHAN_TANDEM_PBMA` | 20 m | 105 627 341 o ≈ **101 Mio** |

Les requêtes `Range` fonctionnent (HTTP 206), mais sur une archive 7z c'est sans usage :
il faut tout prendre et tout décompresser.

**Couverture fine, par territoire** — 20 m : Morbihan, Pertuis Charentais, Gironde amont et
aval, Arcachon, golfe normand-breton, détroit du Pas-de-Calais, Saint-Jean-de-Luz. 10 m :
port de Boulogne. 5 m : île de Ré, port de Saint-Malo. 1–5 m (Litto3D) : Bretagne,
Finistère, PACA, Nouvelle-Aquitaine, Languedoc-Roussillon, Corse. **Les territoires
pilotes sont couverts au 20 m et mieux.**

> **Non retenu pour l'instant — ce n'est pas un ajout de couche, c'est un choix
> d'architecture.** Télécharger, décompresser, reprojeter, convertir en tuiles
> terrain-RGB ou en COG, héberger et décoder côté client : c'est une chaîne de
> prétraitement et un volume d'hébergement, contre la propriété « un seul fichier HTML,
> sans chaîne de compilation » tenue depuis le début. À instruire **si** les DDTM pilotes
> montrent que les 115 m d'EMODnet font prendre de mauvaises décisions — pas avant. Et sur
> les secteurs où le Shom a produit un MNT fin, **EMODnet le sert déjà** (§6) : le gain se
> limiterait à s'affranchir du rééchantillonnage.

---

## 6. Profondeur — EMODnet et levés Shom (vérifié les 15 et 26 octobre 2026)

`https://rest.emodnet-bathymetry.eu/depth_sample?geom=POINT(lng lat)`, champ
**`avg`**. Interrogation au point, sans clé, CORS accepté, **60 à 370 ms**.
Délai `CONFIG.delaiProfondeur` = 5 s.

C'est la seule source de profondeur exploitable : le Shom ne sert sa bathymétrie
qu'en images ou en dalles à télécharger (§5). Choix confirmé le 25 septembre
2026. Valeurs de contrôle de ce jour-là : Quiberon −12,35 m, Brest −23,6 m,
Saint-Malo −1,86 m.

Combinée au marnage de `ram-ports.json`, elle estime la colonne d'eau à marée
haute — voir `DOCUMENTATION_FONCTIONNELLE.md` §4.2. Une valeur `avg` positive
(estran) est retranchée du marnage ; si le résultat passe sous
`CONFIG.colonneMin` (0,5 m), aucune estimation n'est proposée.

Quatre limites à garder en tête : **maille d'environ 115 m**, donc peu fidèle
près des roches et des chenaux ; référence verticale aux plus basses mers
astronomiques sur les côtes à marée et au niveau moyen ailleurs ; port de marée
de référence choisi à vol d'oiseau, donc parfois de l'autre côté d'une pointe ;
marée de vives-eaux moyenne, et non celle du jour. La grille européenne intègre
les levés du Shom.

### Ce que la réponse contient d'autre — et qu'on ne lit pas encore

*Tests du 15 octobre 2026, sept sites de mouillage.* La réponse de `depth_sample` porte
bien plus que `avg`, et **tout est déjà payé** : aucun appel supplémentaire, aucune
dépendance, aucun hébergement.

| Site | `avg` | `min` | `max` | `stdev` | surfaces | levé (`reference`) |
|---|---|---|---|---|---|---|
| Pen Hat (29) | −16,51 | −17,68 | −15,41 | 0,32 | 1181 | `S201207000-005` |
| Golfe du Morbihan, Er Lannic | −8,15 | −10,38 | −5,43 | 0,95 | 5600 | `S200504300` |
| Baie de Quiberon (56) | −10,20 | −10,20 | −10,20 | 0,03 | 1 | `S199206700` |
| Rade d'Hyères (83) | −5,15 | −5,15 | −5,15 | 0 | 1 | `S201300200-002` |
| Porquerolles nord (83) | −14,70 | −14,70 | −14,70 | 0 | 1 | `S196800800-1` |
| Large de Saint-Malo (35) | −1,27 | −1,27 | −1,27 | 0 | 1 | **`DTM_GNB_20m`** |
| Chenal d'Arcachon (33) | −2,47 | −5,00 | −0,10 | 0,22 | 5 | `S192900800` |

**La source de vérité est le Shom, et nous la consommons déjà.** Les sept réponses portent
`reference.organisation_id = 540`, et l'**EDMO 540 est le Shom**. À Saint-Malo la
provenance est `DTM_GNB_20m`, c'est-à-dire **le MNT côtier 20 m du golfe normand-breton du
Shom lui-même** — le même produit que le prépaquet `MNT_COTIER_GNB_PAPI_SM_20m_PACK_DL`
(§5). EMODnet n'est pas une alternative au Shom : c'est le véhicule de diffusion
interrogeable de ses levés.

**`min` et `max` donnent l'étendue du fond dans la maille — mais elle est souvent nulle.**
Au Morbihan le fond varie de −10,38 à −5,43 m là où `avg` donne −8,15, et au chenal
d'Arcachon de −5,00 à −0,10 m ; en revanche, sur deux points réels de la baie de Quiberon,
`min = max = avg`. Les cas à forte étendue sont ceux qui **agrègent beaucoup de surfaces
élémentaires** (5 600 au Morbihan, 1 181 à Pen Hat) : c'est l'exception, pas la règle.
**L'étendue de la maille ne peut donc pas porter le discours sur l'incertitude** — c'est le
millésime du levé qui le porte (ci-dessous). Quant à `stdev`, voir plus bas : ce n'est pas
une donnée du Shom.

Deux pièges mesurés :

- **un point à terre renvoie un `avg` positif**, avec `elementarySurfaces: 1` et **aucun**
  `min`/`max`/`reference`. L'absence de `reference` est d'ailleurs un bon test « valeur
  marine ou pas » — et un `avg` positif ne doit **jamais** être lu comme une profondeur ;
- **`smoothed` diverge franchement de `avg`** : −2,66 contre −1,27 à Saint-Malo, −0,99
  contre −2,47 à Arcachon, −5,72 contre −8,15 au Morbihan. Le code lit `avg` : c'est le bon
  choix, ne pas s'en écarter sans raison.

**Maille confirmée par la mesure** : cinq points espacés d'environ 50 m sur le même axe
renvoient 14,79 / 14,79 / 14,76 / 14,76 / 11,96 — constant sur ~150 m, puis saut.

### Le millésime du levé : ne pas l'inférer, l'interroger (26/10/2026)

**La lecture de l'année dans le code CDI est une fausse piste — abandonnée.** Le Shom
publie les **emprises de ses levés bathymétriques en WFS**, avec leurs vraies dates. Quatre
couches, découpées par période, à interroger toutes les quatre :

| Type d'objet WFS | Période |
|---|---|
| `LEVES_BATHY_AVANT_1970_WFS:leves_bathy_avant_1970` | avant 1970 |
| `LEVES_BATHY_1970-1990_WFS:leves_bathy_1970_1990` | 1970–1990 |
| `LEVES_BATHY_1990-2005_WFS:leves_bathy_1990_2005` | 1990–2005 |
| `LEVES_BATHY_APRES_2005_WFS:leves_bathy_apres_2005` | après 2005 |

Attribut géométrique : **`geometry`**. Champs lus : `sursta` et `surend` (début et fin du
levé, en `AAAAMMJJ`), **`tecsou`** (technique de sondage — vocabulaire contrôlé,
combinable par « | », dix valeurs relevées sur 1 600 levés : `plummets`,
`single-beam echosounders`, `multi-beam echosounders`, `bathymetric LiDARs`,
`sidescan sonars`, `water pressure sensors`, `Levels and staffs`, `cameras`,
`Wire drags`, `unknown`), `instrument` (**à ne pas afficher** : modèle de
l'appareil, sans accents), `sonde` (nombre de
sondes), `zmin`/`zmax` (plage de profondeurs du levé), `id_md`. Latence mesurée le
26/10/2026 : **31 à 89 ms** pour les quatre couches.

**La jointure avec EMODnet fonctionne** : `id_md` contient le code CDI que `depth_sample`
renvoie dans `reference.identifier`. Exemple :
`LEVES_BATHY_AVANT_1970_PACK_DL/`**`S189800200`**`_LEVE_BATHY`. On peut donc rattacher la
valeur affichée **à son levé d'origine**, et en lire les vraies dates.

**Piège — le code CDI ne porte pas l'année du levé.** C'est ce qui rendait l'inférence
dangereuse : `S199206700` a pour dates réelles `sursta 19900512` → `surend 19910531`, soit
un levé **de 1990-1991**, pas de 1992. L'inférence tombait juste sur `S189800200` (1898) et
faux ici. **Ne jamais lire l'année dans le code.**

Mesures du 26/10/2026, sur deux points réels :

| Point | Levés qui le couvrent (`sursta`–`surend`) | Instrument |
|---|---|---|
| 47.447524 / −3.049958 (baie de Quiberon) | **1906**, 1898, 1820, 1819 | plomb de sonde |
| 47.478745 / −3.029089 (la Teignouse) | **1990-1991**, 1906, 1819-1820 | sondeurs DESO 20, LENNERMOR, latéral |

Au premier point, le levé le plus récent du secteur date de **1906**, et la valeur servie
par EMODnet vient de celui de **1898**, au plomb de sonde. C'est l'information qui mérite
d'être dite à l'usager — bien plus que la fourchette.

**Règle d'affichage retenue** : rattacher la valeur à son levé par `id_md`, afficher
`surend` et la technique de sondage ; à défaut de jointure, afficher le levé le plus récent couvrant
le point (`max(surend)`). Trois issues, comme ailleurs : levé trouvé, aucun levé ici,
service muet.

### Ce que le champ `stdev` d'EMODnet n'est pas

Le descriptif du produit « Levés bathymétriques » du Shom **ne publie aucun attribut
d'incertitude verticale** — seule une `Uncertainty_Horizontal` existe. La précision
verticale n'y est donnée qu'en prose : **30 cm à 1 m jusqu'à 50 m de fond**, puis 1 à 2 %
de la profondeur ; les levés postérieurs à 1968 suivent la norme OHI S-44 en vigueur à
leur date. Le `stdev` renvoyé par `depth_sample` est donc **un calcul d'EMODnet, pas une
donnée du Shom** : ne rien afficher à partir de lui sans en avoir établi la sémantique
auprès d'EMODnet. `sursta`/`surend` et `tecsou` disent la même chose en mieux, et de
source primaire.

> **Référence verticale, par la spécification** : les sondes sont ramenées au « zéro de
> réduction des sondages », qui correspond généralement au zéro hydrographique local.
> Au-delà de 200 m les sondes ne sont pas réduites de la marée. Une valeur **négative**
> désigne une sonde d'estran ou une donnée topographique — ce qui confirme le traitement
> déjà en place du cas « fond découvrant ».
> Source : [Descriptif du contenu du produit externe « Levés Bathymétriques »](https://services.data.shom.fr/static/specifications/Descriptif_Contenu_ProduitExterne_LEVES_BATHY.pdf), lu le 26/10/2026.

### Les deux prudences opposées du rayon d'évitage

`min` et `max` ouvrent un choix que `avg` masquait, et il faut l'assumer explicitement :

- **prudence anti-collision** (l'objet affiché du produit) : plus le fond est profond, plus
  la chaîne filée est longue, plus le cercle d'évitage est grand. Le cas défavorable est
  donc **le plus profond de la maille**, soit `min` → rayon plus grand, recoupement signalé
  plus tôt ;
- **prudence anti-échouage** : le cas défavorable est **le moins profond**, soit `max`.

**Arbitré le 26 octobre 2026 (Nicolas) : `min`**, le plus profond de la maille, alimente la
colonne d'eau — à la condition expresse que le choix soit **dit** et non subi. La note sous
le champ annonce donc l'estimation comme prudente, nomme le fond le plus bas de la maille,
et **donne aussi la colonne au fond moyen** : l'usager qui connaît son coin corrige en une
saisie. `max` a sa place ailleurs, dans le conseil d'ancrage.

> **Portée réelle de cet arbitrage : faible.** Mesuré le 26/10/2026 sur deux points réels —
> 47.447524 / −3.049958 et 47.478745 / −3.029089 — `min = max = avg`, donc la colonne
> retenue est **identique dans les deux options**. L'arbitrage ne joue que sur les mailles à
> forte étendue, minoritaires. Il reste la bonne règle ; il ne faut pas en attendre un effet
> visible au quotidien. Le contenu de la note sous le champ est désormais régi par la règle
> des deux bornes de marée (ci-dessous), qui a remplacé la mention du « fond moyen ».

**L'intitulé « Colonne d'eau à marée haute » est conservé.** Il nomme une grandeur de la mer,
la même que l'usager la saisisse ou non ; la prudence est une propriété de *notre
estimation*, pas de la grandeur, et elle appartient donc à la note. « Colonne d'eau retenue »
parlerait de notre calcul et ferait hésiter celui qui veut entrer sa propre sonde.

> **Le champ est l'entrée du calcul**, et c'est ce qui rend l'arbitrage honnête :
> `lireSaisieEvitage()` lit `#in-depth`, donc la valeur prudente est **visible et
> abaissable en un geste**, au lieu d'être appliquée en coulisse.

### Affichage dans la popup — au-dessus de la nature du fond

**Branché le 26/10/2026 (v2.29).** Trois décisions de
Nicolas ce jour-là : la carte profondeur **s'affiche toujours** (elle ne relève pas de la
règle v2.19 « une bonne nouvelle n'a pas besoin d'une ligne » : une profondeur n'est jamais
une simple bonne nouvelle, c'est le chiffre qui dimensionne la chaîne) ; **six états**, dont
deux distincts pour ne pas savoir — « non renseignée à cet endroit » (absence confirmée) et
« vérification impossible » (service injoignable, sans bouton, même motif que les zonages de
protection) ; **le millésime et la technique de sondage affichés TOUJOURS, sans
seuil** (arbitrage du 26/10/2026, qui a remplacé le seuil de 1980 d'abord
envisagé) : « sondé en 2013 (lidar bathymétrique) » et « sondé en 1898 (plomb de
sonde) » se passent de commentaire, et un seuil serait une règle de plus à tenir
pour aucun gain. Les dates viennent du WFS Levés bathymétriques (ci-dessus), plus
d'une lecture du code CDI.

Le vocabulaire est arrêté : **« au plus bas de la marée »** et non « zéro hydrographique »,
qui reste dans le détail dépliable et dans ce fichier — **sauf en Méditerranée**, où la
formule est fausse (piège détaillé plus bas). Points d'insertion repérés dans
`index.html` : `interrogerProfondeur(lngLat)` dans le peloton `Promise.all` qui lance déjà
zonages, nature du fond, département, fiches DDTM et zones AOT, et
`cartes.push(carteProfondeur(prof))` **juste avant** `cartes.push(carteNatureFond(fond))`.
La profondeur répond en **28 à 80 ms** (mesuré le 15/10) : le bloc continue de s'afficher
d'un coup.

**Gain collatéral** : EMODnet n'est aujourd'hui appelée **que** si le point est à moins de
100 m d'une AOT, pour préremplir le champ d'évitage. La faire entrer dans le peloton la
rend inconditionnelle **et** permet au calcul de réutiliser la même réponse — une
interrogation au lieu de deux.

**La carte porte les deux bornes de la marée, pas la seule sonde** (arbitrage du
26/10/2026). La sonde est rapportée au zéro hydrographique, le champ d'évitage demande une
colonne à marée haute : afficher l'une à côté de l'autre sans les relier donne deux nombres
distants du marnage, pour le même point, sans explication. La carte annonce donc
« **Profondeur : 13,7 à 19,1 m selon la marée** », et le chiffre du champ redevient
reconnaissable. **Au dixième partout**, comme le champ : la cohérence prime, puisque c'est
la lecture croisée qui posait problème.

> **Piège — « au plus bas de la marée » est faux en Méditerranée.** La référence verticale
> d'EMODnet est aux plus basses mers astronomiques **sur les côtes à marée**, et **au niveau
> moyen ailleurs** ; le marnage méditerranéen est par ailleurs négligeable. La carte doit
> brancher sur le même test que la note d'évitage — `est.port.ref === 'PMVE-PBMA'` — et
> n'afficher **ni fourchette ni qualificatif tidal** en Méditerranée : un seul nombre, suivi
> de « la marée ne change pratiquement rien ici ».

Conséquence technique : la borne haute vient de `ram-ports.json`, donc **`chargerPortsRAM`
doit être appelée hors du seul cas « AOT à moins de 100 m »**. Elle hérite aussi de
l'approximation du port de référence choisi à vol d'oiseau — d'où le « environ », et le nom
du port gardé dans le détail dépliable. **Repli** : table non chargée ou aucun port proche
→ un seul nombre, sans qualificatif tidal, jamais une borne haute inventée.

Le reste de ce qui s'affiche : le millésime et la technique du levé, pris du WFS Levés
bathymétriques (ci-dessus), pas d'une inférence. Et les trois issues, comme partout
ailleurs — **`null` n'est pas une profondeur nulle** : service muet, hors couverture, ou
`avg` positif sans `reference` → pas d'estimation, et non « fond inconnu donc libre ».

**Cas du fond découvrant** : une sonde négative désigne l'estran (confirmé par la
spécification Shom, ci-dessus). La carte dit alors « à sec aux basses mers, environ X m
d'eau à pleine mer » — l'information utile étant que le navire se posera.

---

## 7. Cultures marines — cadastre conchylicole (vérifié le 13 octobre 2026)

**Une parcelle au point cliqué interdit le mouillage** : la parcelle est déjà
concédée à un tiers. C'est la deuxième des deux seules règles bloquantes.

La donnée qui fait foi est le cadastre conchylicole, tenu par le service
Cultures marines de chaque DDTM/DML, qui immatricule les parcelles du DPM
concédées. Elle est publiée à deux niveaux : une version nationale harmonisée
par le Cerema, **inappelable depuis une page web** ; et des couches
départementales sur GéoIDE, **interrogeables au clic**. C'est la seconde qui est
branchée (carte v2.18).

### Les quatre sources candidates, et ce qu'elles valent

| Source | Volume mesuré | Verdict |
|---|---|---|
| Couche « fermes marines » (MARCUL) du Shom | **747** polygones, aucun nom de parcelle, `restrn` nul sur 728 | **Écartée.** Ce sont les installations portées sur la carte marine, pas le cadastre administratif. Sous-détecte les concessions en sommeil |
| **Cadastre aquacole national**, Cerema / Géolittoral | **37 612** polygones, 6 792 linéaires, 65 points — **50 fois** le Shom | La bonne donnée, inutilisable en ligne : **aucun en-tête CORS** (vérifié depuis l'origine réelle, avec un témoin IGN à 200 pour valider la méthode), `returnGeometry=true` ne renvoie aucune géométrie, et ni WMS ni WFS (`WMSServer` → 403) |
| Flux WMS national de Géolittoral | 208 couches, 207 interrogeables | **Écarté : ne contient pas le cadastre.** La seule couche aquacole est le schéma départemental des structures |
| **Cadastres départementaux des DDTM**, GéoIDE | 1 406 à 13 391 parcelles | **Retenue.** WMS 1.3.0 pour l'affichage, WFS pour l'interrogation, CORS présents, Licence ouverte 2.0, attributs riches |

### Couverture du national, par bassin

| Bassin | Parcelles |
|---|---|
| Marennes-Oléron | 11 501 |
| Étang de Thau | 2 891 |
| Bassin d'Arcachon | 2 456 |
| Baie du Mont-Saint-Michel / Cancale | 2 178 |
| Golfe du Morbihan | 1 999 |
| Rade de Brest | 289 |
| Var + Alpes-Maritimes réunis | **51** |
| Corse | **7** |
| Rade d'Hyères | **0** |

La Méditerranée est quasi vide : l'absence de flux y est donc peu gênante en
pratique.

### Registre des flux départementaux

Base commune : `https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=…`
(URL complètes dans le registre `CADASTRES_CM` de `index.html`, avec l'emprise
de chaque flux — un clic hors emprise ne déclenche aucune requête).

| Dép. | Couche | Parcelles | Millésime | État |
|---|---|---|---|---|
| **29 Finistère** | `L_CADASTRE_CONCHYLICOLE_S_029` | 1 406 | juin 2026 | branché, clic testé en réel |
| **35 Ille-et-Vilaine** | `L_CADASTRE_CONCHYLICOLE_S_035` | 2 194 | mars 2024 | branché |
| **17 Charente-Maritime** (surfaces) | `L_CADASTRE_CONCH_S_017` | 13 391 | février 2023 | branché |
| **17 Charente-Maritime** (linéaires) | `L_CADASTRE_CONCH_L_017` | 1 254 | février 2023 | branché |
| 50 Manche | `N_Cadastre_conchylicole_S_050` | — | mars 2026 | **flux cassé** : `GetCapabilities` répond, tout `GetFeature` plante — `msGetEncodedString(): Unknown identifier. Encoding not supported by libiconv (8859part1)` |
| 56 Morbihan | — | — | avril 2026 | aucun flux, téléchargement seulement |
| 85, 44, 33 | — | — | 2017 à 2022 | aucun flux, millésimes anciens |

> **Version du WFS** : le service annonce 2.0.0, mais les requêtes effectives
> sont écrites en **1.1.0** — d'où l'ordre `lat,lon` de la `BBOX` (§2, piège 2).
> Ne pas « moderniser » la requête sans revoir l'ordre des axes.

**Attributs** (Finistère, le plus riche) : `CM1PAR` (n° de parcelle),
`CODE_QUART`, `NUM_IDENTI`, `COMMUNE`, `SURFACE_M2`, `DATE_EXPIR`, `ETAT`,
`LIBELLE_OP`, `FAMILLE_EX`, `NATURE_EXP`, `ESPECE`, `NOM_SITUAT`, `NATURE_JUR`,
`AUTEUR`, `DAT_DONNEE`, `MAJ_DONNEE`. La Charente-Maritime ne publie que
`CM1PAR` et `ESPECE`.

Mesuré : sur les 1 406 parcelles du Finistère, `ETAT` vaut « Concédé » 1 384
fois et est vide 22 fois — **ce champ ne permet pas de distinguer les parcelles
en sommeil**, toute la couche étant constituée de concessions accordées.

Latences : 147 ms sur un point sans parcelle, 736 ms au premier appel sur une
parcelle.

**Cinq issues distinctes au clic**, et non deux. Depuis la v2.21 :

| Issue | Condition | Effet |
|---|---|---|
| `parcelle` | parcelle à ≤ **5 m** (`blocageCulturesMarines`) — on considère être dessus | **bloque** : popup rouge nommant parcelle, commune, espèce et DDTM source |
| `proximite` | parcelle à ≤ **40 m** (`proximiteCulturesMarines`) | **signale sans bloquer** — un rayon d'évitage ordinaire dépasse cette distance |
| absence confirmée | le flux répond, aucune parcelle | la carte se tait |
| hors cadastre | secteur sans flux publié | « non vérifiées ici » |
| injoignable | panne ou dépassement de délai | « vérification impossible » |

La requête `BBOX` porte sur **40 m pour toutes les couches** ; les 5 m ne sont
plus un rayon de requête mais le seuil de blocage. Délai
`CONFIG.delaiCulturesMarines` = 4 s. La vérification tourne **en parallèle de
celle des APB** — deux interdictions, un seul temps d'attente.

#### Les concessions linéaires ne bloquent jamais au-delà de 5 m — par choix

Décision du 15/10/2026, à ne pas défaire sans la relire.

Une concession sur filière ou estacade est une **ligne** dans le cadastre :
`pointDansAnneau` ne lui est pas appliqué, seule la distance au trait décide.
Or son emprise latérale réelle — pieux, tables — n'est pas dans la donnée.
Bloquer plus large que 5 m reviendrait donc à **affirmer une interdiction que
le cadastre ne porte pas**, sur une donnée d'inventaire non opposable. Le
signalement dit la vérité disponible sans la dépasser.

Ce qu'on accepte : un dossier peut être déposé à 8 m d'un bouchot. Il arrivera
chez l'instructeur avec la trace de l'avertissement, donc motivable en deux
lignes plutôt qu'en un aller-retour.

Ce qu'on refuse, et pourquoi : bloquer une bande de 20 à 25 m de part et
d'autre de 1 254 lignes interdirait des emplacements légaux. Et l'erreur
serait **invisible** — un usager bloqué à tort n'écrit pas, il abandonne ou
dépose hors de la carte, ce qui rend l'outil inutile sans qu'on l'apprenne.
Un dossier déposé à tort, lui, remonte. Le signalement préserve le signal
d'apprentissage, et il alimente l'indicateur « 30 % des usagers modifient leur
projet », qu'un blocage ne produit pas : un blocage produit une sortie du
parcours.

À noter enfin que l'ancien comportement était plus pauvre, pas plus sûr : avec
une BBOX à 25 m sur le linéaire, la carte bloquait ou se taisait, sans état
intermédiaire — elle ne signalait **rien** au-delà de 25 m. La v2.21 informe
jusqu'à 40 m.

Ce choix se révise **sur une base**, pas sur une intuition. Trois pistes ont
été vérifiées le 15/10/2026 et **aucune ne porte la largeur d'emprise** :

| Piste | Verdict |
|---|---|
| Attributs du flux linéaire du 17 | **fermée.** `DescribeFeatureType` ne renvoie que `CM1PAR` et `ESPECE` — deux champs, là où la couche surfacique du Finistère en a 18, dont `SURFACE_M2` |
| Schéma départemental des structures comme couche géographique | **fermée.** Le Cerema le présente comme un cadre de planification, pas comme une donnée diffusée. C'est un **arrêté préfectoral en PDF**, par département : il fixe des règles dimensionnelles en texte, pas en géométrie |
| Flux Géolittoral depuis la page | **fermée.** `geolittoral-data.cerema.fr`, `geolittoral.cerema.fr` et `www.geolittoral.developpement-durable.gouv.fr` échouent tous les trois en CORS depuis l'origine de déploiement — même constat que pour le cadastre national (§7) |

**Il n'y a donc pas de réponse technique à aller chercher** : la question est à
poser à un humain (§12).

Point de vérification réelle : 48,649899 / −1,684100 → « parcelle de cultures
marines à 10 m », signalée sans blocage. Parcelles de référence : `MX01000956`
(Locquénolé, commune de Taulé, DDTM 29) ; `MO07200031` (moules, 17 linéaire) ;
`12000944` (Saint-Broladre, DDTM 35), à 10 m, avec 18 parcelles dans 200 m.

> Le polygone **fictif** `data/cultures-marines.geojson`, qui portait seule la
> règle bloquante en rade d'Hyères, a été supprimé du dépôt le 13/10/2026.

**Si l'on voulait le national quand même**, deux voies : faire activer CORS côté
Cerema (c'est un réglage de serveur, et le service est en open data — l'ask est
léger), ou héberger le fichier converti et le remettre à jour à la main.
Fichiers `cadastre_2026.zip` et `cadastre_emprise_2026.zip` sur la page
Téléchargement de Géolittoral, données source DDTM mars–juin 2026. Le service
cartographique qui le porte (`Aqua_cadastre_202503`) est en retard d'environ
18 mois sur le fichier. Fiches :
[data.gouv](https://www.data.gouv.fr/datasets/cadastre-aquacole-national) (la
« ressource » est un lien vers Géolittoral, pas un fichier) ·
[Sextant](https://sextant.ifremer.fr/geonetwork/srv/api/records/98a7c90e-33c8-44bc-a27a-9b7b61ae829f)

---

## 8. ZMEL — Cerema / CACEM (fourni le 18 septembre 2026)

**Aucune couche nationale n'est diffusée en flux.** Les ZMEL sont créées par
arrêté préfectoral et publiées département par département, avec des formats et
des dates hétérogènes. Une recherche « ZMEL » sur data.gouv.fr ne retourne que
**5 jeux**, tous départementaux.

Le jeu utilisé est un **fichier** fourni par le Cerema/CACEM : 647 ZMEL, France
entière et Antilles, dans `data/zmel.geojson`. Source shapefile conservée dans
`data/ZMEL_18_09_2026/`.

> Limite : capacité d'accueil et contact restent approximatifs — **il n'y a pas
> de champ e-mail dans la source**.

### Les jeux départementaux, pour mémoire

| Territoire | Jeu | Formats | État |
|---|---|---|---|
| **Var (83)** | Zones de mouillages **individuels** (2019), `N_ZONE_MOUILLAGE_S_083` | WMS, WFS, SHP | ⚠️ **service cassé** — même bug d'encodage que la DDTM 50 |
| Pas-de-Calais (62) | `N_AOT_ZMEL_S_062` | WMS, WFS, SHP | à tester |
| Corse-du-Sud (2A) | `N_carenage_P_02A` | WMS, WFS, SHP | à tester |
| Morbihan (56) | ZMEL | MapInfo TAB | conversion nécessaire |
| Charente-Maritime (17) | ZMEL | Shapefile | conversion nécessaire |
| Vendée (85) | ZMEL collectives (OFB, 2016) | aucune ressource | inexploitable |

Le jeu du Var est le plus pertinent — sa description cite explicitement les AOT
de mouillage individuel pour éviter l'altération des herbiers de posidonies, et
son emprise couvre la rade d'Hyères. Mais son service ne sert pas la donnée :

```
msWFSGetFeature(): WFS server error.
msGetEncodedString(): Unknown identifier.
Encoding not supported by libiconv (8859part1).
```

L'encodage déclaré `8859part1` n'existe pas, il faudrait `ISO-8859-1`. **C'est
signalable à la DDTM du Var : la correction est probablement d'une ligne dans le
fichier `.map`.**

Une série standardisée « Aires de carénage dans les ports de plaisance, zones de
mouillage » est publiée par de nombreuses DDTM et par le Cerema, toujours en
WMS/WFS sur GéoIDE. C'est le gisement le plus homogène si l'on veut compléter.

---

## 9. Zones de mouillage autorisées (AOT) — DDTM 83

`data/zones-aot.geojson`. Zones où une AOT de mouillage individuel reste
délivrable, relevées **à la main** sur les cartes PDF n°41 et n°42 de la DDTM du
Var / SML-BLO (octobre 2022).

Fond de numérisation : `ORTHO_COULEUR_PVA2017_083`. Capacités déclarées
30/25/25/40/40 postes, profondeurs de 3 à 13 m.

Ce fichier sert **deux fois** : il porte la couche `zones_aot`, et il génère la
liste affichée dans le message DDTM (par sa propriété `ddtm`). Un clic **dans**
une zone fait basculer la carte de règle locale au vert.

> **Couverture très partielle** : 5 zones sur la seule commune de Saint-Tropez
> (La Bouillabaisse, Les Canebiers). **À faire confirmer par la DDTM 83.**

Contrôle de cohérence fait à la saisie : 937, 1 016, 863, 914 et 1 065 m² par
mouillage déclaré, soit un rayon d'environ 18 m — des ordres de grandeur
plausibles. Cela écarte la faute de frappe, **cela ne vaut pas validation par la
DDTM**.

Même teinte orange que la carte « Règles locales » du popup : c'est la même
nature d'information, ce que l'administration autorise.

---

## 10. Fichiers du dépôt

| Fichier | Contenu | Origine |
|---|---|---|
| `data/zmel.geojson` | 647 ZMEL | Cerema/CACEM, 18/09/2026 |
| `data/ZMEL_18_09_2026/` | shapefile source | idem |
| `data/zones-aot.geojson` | 5 zones | DDTM 83, relevé manuel |
| `data/ram-ports.json` | marnage de 214 ports | Shom, voir §11 |
| `data/ddtm-messages.json` | messages par DDTM (22 et 83 renseignés) | saisie projet, **provisoire** |
| `data/ports-plaisance.geojson` | ports de plaisance | **places et contacts fictifs** |
| `data/aot-existantes.geojson` | **249 positions fictives** sur 6 sites | simulation |
| `data/bateaux-exemple.json` | positions de navires (`GRIST.url`) | exemple — **ne jamais mettre de clé d'accès dans `GRIST.url`** |
| `data/zmel-reel.geojson` | copie de référence de la conversion ZMEL | traçabilité, **non utilisée par la carte** |
| `data/donnees_carte_amidomar.xlsx` | tableau de suivi des couches | tenu à jour avec la doc |

**Schémas de champs**, utiles avant de regénérer un fichier :

| Fichier | Champs lus (replis entre parenthèses) |
|---|---|
| `zmel.geojson` | `nom_zmel` (`nom`), `lieu_dit_s`, `commune` (`nom_commune`), `nb_postes_` (`nb_postes`) — **nombre total agrégé, en texte** |
| `ports-plaisance.geojson` | `nom_port_de_plaisance` (`nom`), `nom_commune` (`commune`), `places_disponibles`, `contact` |
| `ddtm-messages.json` | `ddtm`, `nom_departement`, `message_titre`, `message_consequence`, `message_detail`, `liste`, `lien`, `libelle_lien`, `brouillon`, + les quatre variantes `*_zone` |

> **`ddtm-messages.json` est du texte brut, jamais du HTML.** Il est échappé à
> l'affichage et les liens sont filtrés sur `^https://` — quatre tests
> d'injection le vérifient. Ses noms de champs sont ceux de la future table
> Grist : l'objectif est une interface instructeur, pas un fichier à la main.
> Son entrée `SECOURS` est **volontairement vide**, et il n'y a
> **volontairement aucun secours** pour les flux conchylicoles : mieux vaut dire
> « vérification impossible » que servir une donnée périmée sur une interdiction.

Jeux `SECOURS` embarqués dans le code : 3 vraies ZMEL (Étel, anse du Croûton à
Antibes, baie de L'Île-Rousse), qui permettent à la carte de fonctionner si
`zmel.geojson` ne charge pas.

> **`data/aot-existantes.geojson` est simulé** — il figure la pression sur le
> plan d'eau, pas des AOT réelles. À ne jamais présenter comme de la donnée.
> Natura 2000 n'y est pas exclu : une AOT peut y être autorisée.

**Deux règles d'exploitation**, rappelées ici parce qu'elles concernent les
données :

1. **Ne jamais verser un fichier de données réelles de positions dans le
   dépôt.** L'historique Git est définitif : supprimer un fichier ensuite ne
   l'efface pas du passé. Les positions doivent être récupérées à l'exécution.
2. Le fichier de positions ne doit contenir **que des coordonnées GPS**, sans
   nom, immatriculation ni identifiant de propriétaire. Cette propriété doit
   être maintenue dans la durée, et inscrite dans la procédure d'alimentation —
   pas seulement vraie au lancement.

---

## 11. Marée haute par port — `ram-ports.json` (v2.6, 25 septembre 2026)

Extrait du WFS Shom « Références Altimétriques Maritimes »
(`RAM_BDD_WLD_WGS84G_WFS:ram_3857`), interrogé le 25/09/2026. **214 ports de
métropole sur 229** (15 sans valeurs exploitables écartés).

Colonnes : `site`, `lat`, `lon`, `h`, `ref`. Pour chaque port, `h` = PMVE − PBMA
(pleine mer de vives-eaux moyenne au-dessus des plus basses mers), **coefficient
95**, ou PHMA − NM en Méditerranée (PMVE non publiée) ; `ref` dit lequel des deux.

Contrôles d'intégrité : **Σh = 1242,23**, **Σlat = 10083,1747**,
**Σlon = −151,7266**. Le fichier est chargé au premier besoin, pas au
démarrage.

> Ce WFS **n'est pas appelé à l'exécution** : la carte lit le fichier figé. Une
> mise à jour du Shom ne se propage donc pas d'elle-même.

Fiche : https://www.data.gouv.fr/datasets/references-altimetriques-maritimes —
citer « Shom, 2025 ».

Alternative non tranchée : le marnage Shom au point (§5) est plus juste que le
port de référence le plus proche à vol d'oiseau, mais la table locale fonctionne
hors ligne et porte des hauteurs de marée, non des marnages. À comparer sur
quelques sites avant de bouger.

---

## 12. Ce qui manque, et à qui le demander

| Manque | Qui | Demande |
|---|---|---|
| **Herbiers : mise en cache WMTS de la couche Nav&Co** | OFB, `sig@ofb.gouv.fr` | c'est la seule des trois couches à ne pas être tuilée, et c'est celle qui porte le message usager |
| Herbiers : tuiles vectorielles | OFB | y a-t-il un projet d'activer le plugin ? Rejoint la question PING posée à Fredy Thomas côté Shom |
| Herbiers : qui reprend l'actualisation ? | OFB | le Life Marha s'achève au 31/12/2025 |
| Herbiers : reprise des libellés `title`/`subtitle` | OFB | pour que les deux services de l'État tiennent le même discours |
| **Découpage DDTM/DML en mer, en polygones** | Shom, Eric Le Guen | question posée le 2/10, toujours sans réponse. Aucune couche surfacique ne la couvre. **Plus bloquant** : le rattachement départemental est livré depuis la v2.22 par inférence `DWITHIN` sur la terre la plus proche (§5), avec trois configurations de mise en défaut documentées. Un vrai découpage les supprimerait |
| Fond de carte marine raster | Shom | absent du service INSPIRE ouvert — quelles conditions ? |
| **Sémantique du champ `stdev`** | EMODnet Bathymetry | 4,3 m sur un point où `min = max`, 0,05 m sur un point voisin. Dispersion des sondes dans la maille, ou incertitude reportée du levé ? Le Shom ne publie pas d'incertitude verticale (§6), donc c'est un calcul d'EMODnet. **Rien à afficher tant que ce n'est pas établi** — et `sursta`/`instrument` du WFS Levés le remplacent avantageusement |
| Table de correspondance S-57 | Shom | `restrn`, `catrea`, `catach`, `catmfa`, `typelem` — nécessaire avant d'afficher autre chose que `ninfom` |
| **Flux conchylicole cassé** | DDTM 50 | bug d'encodage `8859part1` ; une fois corrigé, le département s'ajoute en une ligne de registre |
| **Flux ZMEL cassé** | DDTM 83 | même bug, sur le jeu le plus pertinent du projet |
| Cadastre conchylicole sans flux | DDTM 56 Morbihan en premier | donnée fraîche (avril 2026) et bassin dense (1 999 parcelles) — publier sur GéoIDE, ou héberger le fichier converti |
| **Emprise latérale d'une concession linéaire** | service Cultures marines de la DDTM/DML qui instruit les concessions — la 17 en premier, seul flux linéaire branché | quelle largeur occupe réellement une concession sur filière ou estacade, de part et d'autre du trait du cadastre ? Est-elle normée par le schéma départemental des structures, ou propre à chaque concession ? Demander le schéma des structures du département (arrêté préfectoral, en PDF). **Les trois pistes techniques sont fermées** (§7) : la largeur n'est dans aucun flux. C'est pourtant la seule réponse qui permettrait de bloquer sur l'emprise réelle au lieu d'arbitrer entre sur-bloquer et sous-bloquer |
| CORS sur le cadastre national | Cerema, `geolittoral-data.cerema.fr` | un réglage de serveur donnerait la couverture nationale d'un coup |
| **Zones de baignade et zones réglementaires** | — | aucune source publique ne permet de les représenter ni de les identifier au clic. Confirmé absent du Shom. Les API de prédiction de marée du Shom sont par ailleurs **payantes** |
| Messages DDTM : 2 départements sur une centaine | DDTM pilotes | `ddtm-messages.json` ne porte que les DDTM **22** (Côtes-d'Armor : plus d'AOT individuelle délivrée, redirection vers une liste d'attente) et **83** (encore en `brouillon`). C'est le fichier qui fait parler la carte au niveau local |
| Pêcheries d'Ille-et-Vilaine | — | `ms:L_PECHERIES_L_035`, même plateforme que le cadastre : ce sont aussi des occupations du DPM. **Piste non explorée** |

---

## 13. Comment ajouter une source

**Un flux WMS** — une entrée dans le tableau `COUCHES` de `index.html` :

```js
{ groupe:'Usages de la mer',
  id:'zmel62', label:'ZMEL — Pas-de-Calais', couleur:'#f9a825', statut:'a_tester',
  tiles: WMS('https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=...',
             'N_AOT_ZMEL_S_062'),
  visible:true, attribution:'© DDTM 62' }
```

L'URL figure sur la fiche data.gouv.fr du jeu, ligne « URL du GetCapabilities du
service wms sur internet ». **Prendre la version `internet`, pas `intranet`** :
cette dernière n'est accessible que depuis le réseau de l'État.

**Un fichier** (Shapefile, MapInfo TAB) — le convertir en GeoJSON avec QGIS :
ouvrir la couche, clic droit, *Exporter → Sauvegarder les entités sous…*, format
GeoJSON, SCR **EPSG:4326**. Le choix du SCR compte : un fichier exporté en
Lambert 93 s'affichera au large de l'Afrique.

**Une interrogation au point** — relire le §2 avant d'écrire la requête, puis
suivre le modèle des fonctions existantes. Trois exigences :

- renvoyer `null` quand le service est injoignable, jamais « vide » ;
- interroger les couches **en parallèle** (`Promise.all`) — une couche muette ne
  doit pas retarder les autres ;
- poser un délai d'attente, et ne bloquer l'usager que sur une réponse franche.

---

## 14. Attributions et licences

À faire figurer sur la carte :

| Source | Mention |
|---|---|
| IGN / INPN | `© IGN / INPN` |
| OFB (AMP, herbiers) | `© OFB` ; pour les herbiers : `© OFB — compilation Life intégré Marha` |
| Shom | `© SHOM` ; pour le trait terre-mer : `Shom-IGN, 2021, doi:10.17183/LIMTM` **+ « ne pas utiliser pour la navigation »** ; pour les natures de fond : `Shom, 2025. Natures de fond au 1/50 000, doi:10.17183/HOM_GEOL_NATURES_FOND_50` |
| Cadastre conchylicole | `Cadastre conchylicole : DDTM 29, 35 et 17 (GéoIDE, Licence ouverte 2.0)` |
| ZMEL | Cerema / CACEM |
| Zones AOT | `DDTM du Var / SML-BLO, cartes n°41 et n°42, octobre 2022` |

Toutes ces sources sont en **Licence Ouverte / Etalab** (v1 ou v2) et ne
demandent ni clé d'API ni conventionnement.

> Ces mentions sont portées par `attributionControl.customAttribution` de
> MapLibre : **elles disparaîtraient silencieusement si cette option était
> retirée.** Un test les vérifie.

Deux citations plus lourdes, à mettre dans une page « sources » plutôt que dans
l'attribution de la carte :

- **herbiers de posidonie** — les sources d'origine de la compilation : CARTHAM
  (Agence des aires marines protégées, 2010-2012), CARTHAMED volet Corse
  (Université de Corse, 2015), CARBONSINK (Université de Corse, 2018), Semantic
  TS (Parc maritime départemental Estérel-Théoule, 2019), Andromède
  Océanologie / DIREN Occitanie (2008), Université de Perpignan Via Domitia
  (2021), Schéma départemental de la mer et du littoral du Var (2010) ;
- **`ram-ports.json`** — « Shom, 2025 ».

### Bibliothèques

`carte-facile` (Apache-2.0) et `maplibre-gl`, **embarquées dans `vendor/`** et
non appelées sur un CDN : un CDN avec une plage de versions ouverte ferait
exécuter aux visiteurs un code qui change sans que personne n'ait modifié le
dépôt, et sans contrôle d'intégrité. Les versions sont figées dans
`vendor/VERSIONS.txt` et leur mise à jour est un geste délibéré.

La licence de `maplibre-gl` n'a pas été déterminée automatiquement — à confirmer
lors d'une revue juridique.

---

## 15. Deux avertissements qui ne sont pas négociables

**Le site étant statique, tout ce que la page télécharge est visible par le
visiteur : aucune clé d'accès privée ne doit y figurer.** Aucune des sources
ci-dessus n'en demande, ce qui n'est pas un hasard — c'est un critère de choix.

**La mention « prototype de travail — sans valeur officielle » reste affichée en
permanence.** La page porte l'identité de l'État sans être hébergée sur un
domaine institutionnel : elle pourrait être prise pour un service officiel
engageant l'administration. L'usage de cette identité hors cadre officiel
mérite d'être validé en interne.

Et, pour les herbiers comme pour le rayon d'évitage : **la carte est une aide à
la réflexion, pas une garantie.** Sur un service de l'État, un plaisancier
pourrait s'y fier autrement.

---

## 16. Délais et seuils — `CONFIG`

Tous réglés dans `CONFIG` au début d'`index.html`. Ils font partie de la
description d'une source : un délai trop court transforme une source lente en
source muette, et un `null` mal interprété en fausse autorisation.

| Paramètre | Valeur | Source concernée |
|---|---|---|
| `delaiProfondeur` | 5 000 ms | EMODnet (60–370 ms observés) |
| `colonneMin` | 0,5 m | seuil sous lequel aucune estimation n'est proposée |
| `delaiTraitTerreMer` | 3 000 ms | trait terre-mer Shom (25–250 ms observés) |
| `rayonCouvertureShom` | 20 km | test de couverture du trait terre-mer |
| `delaiNatureFond` | 3 000 ms | natures de fond Shom |
| `delaiDepartement` | 4 000 ms | rattachement départemental |
| `rayonsDepartement` | 1, 2, 5, 10 km | essayés dans l'ordre, arrêt au premier qui répond |
| `delaiCulturesMarines` | 4 000 ms | cadastre conchylicole (150–740 ms observés) |
| `proximiteCulturesMarines` | 40 m | parcelle signalée sans blocage |
| `blocageCulturesMarines` | 5 m | parcelle bloquante |
| `profondeurDefaut` | 5 m | colonne supposée pour les AOT existantes |
| `longueurAutres` | 9 m | longueur supposée des autres navires |

Hors `CONFIG`, en dur dans le code : **API Carto 8 000 ms** (porté de 4 s en
v1.7), **repli WFS 6 000 ms** sur échec et 4 000 ms sur réponse vide, **APB
4 000 ms**.

> La longueur du navire n'a volontairement **pas** de valeur par défaut : c'est
> à l'usager de la renseigner, et le rayon d'évitage ne s'affiche qu'ensuite.

---

### Historique des campagnes de test

Les notes datées ci-dessous gardent le détail des tests ; leur substance est
reprise dans ce fichier.

| Date | Note | Objet |
|---|---|---|
| 3 sept. 2026 | `AMIDOMAR_Note_technique_cartographie.md` | choix techniques, premières sources, lacunes |
| 12 oct. 2026 | `AMIDOMAR_Flux_Shom_tests_et_integration.md` | trait terre-mer, 10 couches Shom, interrogation au point |
| 13 oct. 2026 | `AMIDOMAR_Cadastre_conchylicole_sources_et_integration.md` | 4 sources candidates, registre départemental |
| 14 oct. 2026 | `AMIDOMAR_Herbiers_sources_nationales.md` | couches OFB, WFS Géoplateforme |
| 15 oct. 2026 | — | consolidation dans ce fichier, puis relecture croisée avec la spec, les tests et le code : correction de la règle de lecture du trait terre-mer, des cinq issues du cadastre, du rayon de requête à 40 m, de l'origine de test du CORS, et du statut du rattachement départemental |
| 15 oct. 2026 | `AMIDOMAR_Bathymetrie_flux_Shom_et_integration.md` | bathymétrie : les quatre voies Shom fermées avec preuves, prépaquets et poids mesurés, provenance et dispersion EMODnet |
