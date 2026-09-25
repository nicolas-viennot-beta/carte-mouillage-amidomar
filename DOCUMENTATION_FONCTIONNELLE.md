# Carte AMIDOMAR — Documentation Fonctionnelle

**Version:** 2.11 (septembre 2026)  
**Dernière mise à jour:** 25 septembre 2026  
**URL déploiement:** https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/

---

## 1. Vue d'ensemble

La **Carte AMIDOMAR** est un outil d'aide au choix d'un emplacement de mouillage individuel, destiné à être consulté avant le dépôt d'une demande d'AOT (Autorisation d'Occupation Temporaire) sur Démarches Simplifiées.

### Objectifs
- Simplifier la recherche d'un emplacement de mouillage
- Sensibiliser aux impacts écologiques des choix de mouillage
- Afficher les zones protégées et régulations applicables
- Guider les usagers vers des zones moins sensibles
- Faciliter la collecte de données GPS précises

### Public cible
- **Principal:** Plaisanciers non experts cherchant un mouillage
- **Secondaire:** Instructeurs DDTM consultants l'outil

---

## 2. Disposition de l'interface

### Gauche — Contrôles cartographiques
- 🔍 **Recherche** — localisation par adresse
- 🔍 **Zoom** — agrandissement/réduction
- 🧭 **Orientation** — rotation de la carte
- 📍 **Géolocalisation** — position de l'usager
- ❓ **Aide** — réouvre la modale de marche à suivre
- 🗺️ **Fond de plan** (bas) — sélecteur de styles cartographiques, limité aux fonds **Simple** et **Aérien** (les fonds « Simple (OSM) » et « Désaturée » ainsi que les surcouches du sélecteur — Cadastre, Limites administratives, Courbes de niveau — ont été retirés de ce contrôle)

### Droite — Panneau latéral
- **« Couches affichées »** — légende avec état des sources (déplié au démarrage)

Le panneau « Mon mouillage » (supprimé en v1.2), le formulaire intégré au popup (v1.2 à v2.2) puis le bloc de droite « Calcul rayon d'évitage » (v2.3 et v2.4) ont été successivement abandonnés : depuis **v2.5**, le formulaire du rayon d'évitage est dans le bloc de proximité de la modale centrale (voir §4.0 C6 et §4.2). La colonne de droite ne contient plus que « Couches affichées ».

### Centre
- **Carte interactive** — affichage des couches, clics pour saisir un emplacement

---

## 3. Parcours utilisateur

### Étape 0 — Orientation (modale d'accueil)
- Modale « *Fonctionnement de la carte pour un choix d'emplacement de mouillage responsable* »
- Présente la bifurcation « *Tout d'abord, regarder si un emplacement en port ou ZMEL est possible ?* » : **port ou ZMEL** vs **mouillage individuel** — le texte de la branche port/ZMEL se termine par « c'est de loin l'option la moins dommageable pour les écosystèmes marins » (v2.4 ; « pour les herbiers » auparavant)
- Décrit les étapes suivantes
- Se ferme par ✕, Échap, ou clic extérieur
- Réouvrable via le bouton ❓

### Étape 1 — Cliquer sur la carte
Un clic sur la carte déclenche désormais un **traitement unifié**, quel que soit l'endroit cliqué (voir §4.1 pour le détail de la cascade) :

1. **Clic sur un port ou une ZMEL** → la modale dédiée s'ouvre directement (comportement inchangé, voir §4.1.a). Pas de coordonnées, pas de popup d'environnement.
2. **Clic à terre** → popup rouge « Vous êtes à terre », pas de coordonnées (inchangé, voir §4.4).
3. **Clic sur une zone de cultures marines** → popup rouge d'interdiction, pas de marqueur ni de coordonnées : un mouillage individuel n'y est pas envisageable.
4. **Clic ailleurs sur l'eau** → un bref message « Vérification de la zone… » s'affiche d'abord, le temps d'interroger le WFS de la Géoplateforme sur les **arrêtés de protection de biotope (APB)** (voir §4.3bis) :
   - **Si le point est dans un APB** → popup rouge d'interdiction (même traitement que les cultures marines), nommant l'arrêté : pas de marqueur, pas de coordonnées.
   - **Sinon** (aucun APB, ou service indisponible/trop lent : défaut non bloquant) → un marqueur est posé, les coordonnées GPS s'affichent, et un popup contextualisé s'ouvre au-dessus des coordonnées (voir §4.2) :
     - Interrogation des zones Natura 2000 / ZNIEFF au point cliqué (API Carto IGN, avec repli sur le WFS de la Géoplateforme, voir §4.3) → popup vert (« pas de contre-indication identifiée ») ou neutre/orange (zone(s) trouvée(s), listées) selon le résultat, avec dans tous les cas une mention rappelant que certaines zones (parcs naturels marins, aires marines protégées, herbiers, baignade, zones réglementaires...) ne sont pas détectables automatiquement et doivent être vérifiées par ailleurs.
   - Si le point cliqué est à **moins de 100 m d'une AOT existante** — vérification silencieuse, indépendante de la case « AOT de mouillage existantes » —, la modale devient plus concise *(v2.5)* : le bloc environnement est réduit à une ligne avec un bouton « Détails » (replié par défaut), et un bloc orange « D'autres mouillages sont enregistrés à proximité » intègre les deux champs du calcul ; le résultat vert ou rouge s'affiche dessous (voir §4.0 C6 et §4.2). Au-delà de 100 m, rien ne s'affiche : le risque de conflit avec un mouillage existant est jugé négligeable et on ne complexifie pas inutilement le parcours.
5. Bouton « Copier » dans le popup pour copier les coordonnées
6. Bouton « Fermer » en haut à droite du popup *(v2.1)* : désélectionne entièrement le point (marqueur, coordonnées, cercle d'évitage) ; les valeurs du calcul d'évitage sont **conservées** *(v2.3)* — voir §4.2

### Étape 2 — Copier les coordonnées
1. Bouton « Copier » dans le popup de coordonnées
2. Les coordonnées sont copiées dans le presse-papiers
3. Les coller directement dans le formulaire Démarches Simplifiées

---

## 4. Fonctionnalités clés

### 4.0 Réactions au clic — référence des contenus affichés (cas C1 à C6)

**Cette section est la seule référence** pour ce que la carte affiche après un clic : zone déclenchante, contenu, textes exacts et variables. Elle remplace le document séparé `claude_AMIDOMAR_Spec_Reactions_Clic_v1.md` (produit le 17/09/2026, jamais versionné dans ce dossier), abandonné en v2.3 : un seul document de spécification, celui-ci. Les sections 4.1 à 4.4 décrivent le mécanisme (ordre de la cascade, API interrogées, robustesse). Les commentaires du code renvoient aux numéros C1 à C6 ci-dessous.

Les variables sont notées `{…}`. Les textes sont reproduits tels qu'affichés (retours à la ligne du code non significatifs).

| Cas | Zone déclenchante | Affichage |
|---|---|---|
| C1 | Port de plaisance (point sur la carte ou pictogramme de la légende) | Modale centrale avec fond grisé |
| C2 | ZMEL (surface sur la carte ou pictogramme de la légende) | Modale centrale avec fond grisé |
| C3 | Terre | Popup rouge, sans coordonnées |
| C4 | Cultures marines | Popup rouge, sans marqueur ni coordonnées |
| C4 bis | Arrêté de protection de biotope (APB) | Popup rouge, sans marqueur ni coordonnées |
| C5 | Tout autre point sur l'eau | Marqueur, popup environnement + coordonnées |
| C6 | Point C5 situé à moins de 100 m d'une AOT existante | Bloc environnement réduit à une ligne + bloc de proximité, qui se réduit lui aussi au résultat une fois le calcul fait (v2.7), avec repli différé automatique après une pause de frappe (v2.8) |

#### C1 — Port de plaisance
- Titre : « Port de plaisance : {nom_port_de_plaisance} — Commune :{nom_commune} » (la partie « — Commune : » est omise si la commune est vide).
- Corps : « Vous êtes dans un bassin portuaire qui dépend de la capitainerie du port concerné. Un mouillage en port est une excellente option pour préserver les écosystèmes marins : le navire est amarré à un équipement fixe, sans ancre qui laboure le fond. » puis « Il reste **{places_disponibles} place(s) disponible(s)** à {nom_port_de_plaisance}. » puis « Faites votre demande auprès de {contact}. »
- Note : « Nombre de places et contact fictifs : aucune source publique ne diffuse la disponibilité des ports. À remplacer par une donnée obtenue auprès des gestionnaires. »
- Variables (`data/ports-plaisance.geojson`) : `nom_port_de_plaisance` (repli `nom`), `nom_commune` (repli `commune`), `places_disponibles`, `contact`. Accord singulier/pluriel automatique.

#### C2 — ZMEL
- Titre *(v2.9)* : « Zone de mouillages et d'équipements légers : {nom_zmel} - {lieu_dit_s} - {commune} », en ne gardant que les parties renseignées et différentes de `nom_zmel` (« cette zone » à la place de `nom_zmel` si le nom manque, par exemple au clic depuis la légende).
- Corps *(v2.9)* : « Vous êtes sur une ZMEL qui dépend de la commune ou du gestionnaire local. Les corps-morts y sont installés et entretenus, ce qui évite le labourage du fond par les ancres. C'est un très bon projet. S'y installer est **nettement moins dommageable** qu'un mouillage individuel. »
  - si une capacité est renseignée (`nb_postes_`, repli `nb_postes` pour l'ancien schéma fictif) : « Capacité d'accueil : {n} navires. » — affichée telle quelle, sans mise en forme du pluriel (la donnée source `nb_postes_` est un nombre total agrégé, en texte)
  - si `mailto` est renseigné : « Faites votre demande directement auprès de la ZMEL : {mailto} » (lien) ; sinon (cas de la quasi-totalité des vraies ZMEL, qui n'ont pas d'e-mail dans la donnée source) : « Renseignez-vous sur les places disponibles auprès de son gestionnaire ou de la DDTM de votre département. »
- Note *(v2.10)* : « Zone officielle (Cerema/CACEM, données du 18/09/2026). Capacité d'accueil arrondie au total ; aucun contact e-mail direct n'est disponible dans cette source. »
- Variables : `nom_zmel` (repli `nom`), `lieu_dit_s`, `commune` (repli `nom_commune`), `nb_postes_` (repli `nb_postes`), `mailto`.

#### C3 — Clic à terre
- Popup rouge : « Attention, vous êtes à terre. Positionnez votre mouillage sur une étendue d'eau. » Pas de coordonnées, pas de marqueur. Détection : voir §4.4.

#### C4 — Cultures marines
- Popup rouge : « **Vous êtes dans une zone de cultures marines — {nom}.** » puis « Cette zone est interdite au mouillage. Veuillez sélectionner un autre emplacement. » (`{nom}` : propriété `nom` de `data/cultures-marines.geojson`, « cette zone » à défaut).

#### C4 bis — Arrêté de protection de biotope (APB)
- Pendant la vérification réseau : « *Vérification de la zone…* » (teinte neutre).
- Si le point est dans un APB, popup rouge : « **Vous êtes dans un arrêté de protection de biotope — {noms des arrêtés}.** » puis « Cette zone est interdite au mouillage. Veuillez sélectionner un autre emplacement. » Mécanisme : §4.3bis.

#### C5 — Autre point sur l'eau : environnement et coordonnées
- Marqueur rouge posé ; bouton « Fermer ✕ » en haut à droite du popup.
- Pendant l'interrogation : « *Vérification des zonages environnementaux…* »
- C5.1 — Natura 2000 (teinte neutre) : « Cet emplacement se situe dans un site Natura 2000. Une étude d'incidence va être réalisée suite à votre demande. Nom de la zone à reporter dans le formulaire de demande : **{noms des sites}** » (v2.4)
- C5.2 — ZNIEFF (teinte neutre) : « Cet emplacement se situe sur une Zone Naturelle d'Intérêt Écologique, Faunistique et Floristique (ZNIEFF). Cette zone est sensible, merci d'adopter des pratiques de mouillage durables. »
- C5.1 et C5.2 peuvent s'afficher ensemble. Aucune zone trouvée (teinte verte) : « Pas de contre-indication détectée automatiquement sur cette zone. » (hors proximité d'une AOT — sinon voir C6)
- Mention ajoutée dans ces trois cas : « D'autres zonages (Herbiers de posidonie et de zostère, Parcs naturels marins, Aires marines protégées, zones de baignade ou réglementaires) sont visibles dans la légende mais ne peuvent pas encore être identifiés automatiquement à cet endroit — vérifiez-les visuellement. »
- Service injoignable (teinte neutre) : « Informations environnementales momentanément indisponibles (service distant injoignable). Vos coordonnées restent accessibles ci-dessous. »
- Coordonnées : libellé « Coordonnées GPS en degrés décimaux (DD) : », valeur `{lat}, {lng}` à 6 décimales, bouton « Copier » (« Copié ! » pendant 2 s). Le libellé est un élément distinct : seul `{lat}, {lng}` est copié.

#### C6 — Proximité d'une AOT existante (< 100 m)
Détection silencieuse (indépendante de la case « AOT de mouillage existantes »). Tout se passe dans la modale centrale : bloc environnement réduit (v2.5), puis le bloc de proximité, qui se réduit à son tour une fois le calcul fait (v2.7). Mécanisme et formule : §4.2.
- **Bloc environnement réduit à une ligne** *(v2.5)*, avec un bouton « Détails ▾ » à droite (« Masquer ▴ » une fois déplié), replié par défaut ; le détail déplié reprend les textes complets de C5 (y compris le nom de la zone Natura 2000 à reporter et la mention des zonages non détectables). Titres de la ligne :
  - aucune zone trouvée (teinte verte) : « **Aucune zone bloquante détectée sur cet emplacement.** » — décision de Nicolas (25/09/2026) : formulation préférée à « AOT mouillage autorisée sur cette zone », qui laisserait croire que la demande est déjà acceptée ;
  - Natura 2000 (teinte neutre) : « **Emplacement situé en site Natura 2000.** » ;
  - ZNIEFF (teinte neutre) : « **Emplacement situé en ZNIEFF.** » ;
  - les deux : « **Emplacement situé en site Natura 2000 et en ZNIEFF.** » ;
  - service injoignable : message inchangé, non réduit.
- **Bloc de proximité, calcul pas encore fait** (fond orange, `.jaune-box`) : « **D'autres mouillages sont enregistrés à proximité.** » (gras), à la ligne « Vérifier que votre rayon d'évitage ne soit pas en collision avec un autre navire. », puis une ligne par champ : « Longueur de mon navire (m) » et « Colonne d'eau à marée haute (m) » (placeholder « à saisir »). Pas de bouton « Détails » à ce stade — les champs sont visibles directement.
- **Bloc de proximité, calcul fait** *(v2.7, texte de collision revu v2.8)* : le message ci-dessus est **remplacé** par le résultat, et le bloc change de couleur — vert (pas de chevauchement) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, ne semble pas être en collision avec les rayons d'évitage des navires à proximité. » ; rouge (chevauchement) *(v2.8)* : « Le rayon d'évitage de votre navire est estimé à **{r} m** avec un risque de collision. Modifier l'emplacement ou vérifier sur place. » — dans les deux cas suivi du sous-titre « *Estimation indicative qui ne remplace pas une vérification sur place.* ». Un bouton « Détails ▾ » apparaît à droite du message ; l'usager peut rouvrir pour consulter ou corriger les valeurs, qui recalculent le résultat en direct.
- **Repli automatique différé, jamais pendant la frappe** *(v2.8)* : dès que le calcul se complète, le bloc bascule en vert/rouge et un minuteur de repli automatique (700 ms) est armé, puis **réarmé à chaque nouvelle frappe** dans l'un des deux champs — il ne se déclenche donc jamais en pleine saisie, seulement après une courte pause une fois le résultat affiché, pour regagner de la visibilité sur la carte sous la modale sans action supplémentaire de l'usager. Avant v2.8, le repli n'attendait que la sortie du champ (blur) ; désormais il se produit après une pause de frappe, sans nécessiter de clic ailleurs. Une réouverture manuelle des « Détails » désarme ce repli automatique : le bloc ne se referme plus tout seul ensuite, même après une nouvelle modification des champs.
- Colonne d'eau à marée haute *(v2.6)* : **pré-remplie par une estimation** (profondeur au point + marée haute du port de référence le plus proche), modifiable ; note en italique sous le champ : « Estimation : profondeur ≈ {p} m (EMODnet) + marée haute de vives-eaux ≈ {h} m (port de référence : {port}, Shom). Modifiable. » (« marée haute » sans « de vives-eaux » en Méditerranée ; variante « …, moins un fond découvrant à marée basse ≈ {x} m (EMODnet). Modifiable. » sur l'estran). Pendant le calcul : « Estimation de la colonne d'eau en cours… ». Échec : champ vide, « Estimation indisponible à cet endroit : saisissez la valeur. ». Après correction par l'usager : « Valeur modifiée à la main. ». Détail : §4.2.
- Variables : `{r}` = colonne d'eau × 1,5 + longueur, arrondi au mètre.

### 4.1 Traitement unifié du clic sur la carte

Le clic sur la carte suit une cascade de priorité unique, implémentée dans le gestionnaire `map.on('click', ...)` :

#### a. Ports et ZMEL (priorité la plus haute)
Les **ports de plaisance** et les **ZMEL** (Zones de Mouillages et d'Équipements Légers) restent gérés par leurs propres écouteurs dédiés, avec leur **modale existante** (et non un popup) :
- **Ports de plaisance** — Modale affichant nom du port, places disponibles (fictives), contact
- **ZMEL** — Modale affichant le nom de la zone (avec lieu-dit et commune, v2.9), la capacité d'accueil réelle (`nb_postes_`, v2.10) et un contact (`mailto`, resté placeholder : la donnée source n'a pas de champ e-mail et les fiches officielles Légicem ne sont pas accessibles publiquement, voir §11 v2.9)
- Textes exacts des deux modales : §4.0 (C1, C2). La phrase « Pas d'AOT individuel sur cette zone » a été retirée en v1.5
- Ce cas court-circuite tout le reste de la cascade : pas de marqueur, pas de coordonnées, pas de popup d'environnement

#### b. Clic à terre
Voir §4.4 — popup rouge, aucune coordonnée. Comportement inchangé par rapport à v1.1.

#### c. Cultures marines (interdiction, vérification locale)
Un clic dans une zone de cultures marines (`data/cultures-marines.geojson`) affiche un popup rouge d'interdiction (pas de marqueur, pas de coordonnées) : un mouillage individuel n'est pas envisageable dans une zone de concession conchylicole. Cette vérification est instantanée (donnée déjà chargée sur la carte, pas d'appel réseau).

#### c bis. Arrêtés de protection de biotope — APB (interdiction, vérification réseau) *(v2.0)*
Contrairement aux cultures marines, aucune couche APB n'est chargée localement : la vérification interroge le WFS de la Géoplateforme (voir §4.3bis). **Décision de Nicolas (22/09/2026) :** l'APB étant lui aussi une interdiction, il est traité comme les cultures marines dans son résultat (popup rouge, pas de marqueur, pas de coordonnées), mais avec une différence de méthode assumée : la vérification étant réseau, elle est **attendue avant tout affichage** plutôt que faite après coup comme Natura 2000/ZNIEFF. Sur **chaque** clic en mer (hors ports/ZMEL/terre/cultures marines), un message « Vérification de la zone… » s'affiche donc d'abord, sans marqueur ni coordonnées, pendant l'appel au WFS (délai borné à 4 s). Si le service échoue ou dépasse ce délai, la vérification est considérée négative par défaut (non bloquant, comme pour Natura 2000/ZNIEFF) et le clic se poursuit normalement.

#### d. Tous les autres clics sur l'eau (hors APB)
1. Un marqueur est posé et les coordonnées GPS calculées
2. Une requête est envoyée à l'**API Carto de l'IGN** (module *nature*, couches `natura-habitat`, `natura-oiseaux`, `znieff1`, `znieff2`) pour identifier si le point se trouve dans une zone Natura 2000 (habitats/oiseaux) ou ZNIEFF, avec repli sur le WFS de la Géoplateforme en cas d'échec ou de réponse vide en mer (ZNIEFF) — voir §4.3 pour le détail technique
3. Le résultat est affiché dans un **popup non bloquant** (teinte verte si aucune zone identifiée, teinte neutre/orange sinon), avec **deux messages distincts possibles** : un message Natura 2000 (habitats et oiseaux réunis, listant le ou les noms de site, annonçant qu'une étude d'incidence sera réalisée suite à la demande et que le nom de la zone est à reporter dans le formulaire de demande — texte exact au §4.0, C5.1) et/ou un message ZNIEFF générique (sans nom ni type de zone, invitant à des pratiques de mouillage durables) — les deux peuvent s'afficher ensemble. Le tout est accompagné d'une mention rappelant que certaines couches (parcs naturels marins, aires marines protégées, herbiers de posidonie et de zostère, zones de baignade, zones réglementaires) ne sont pas couvertes par cette vérification automatique et restent à la charge de l'usager/instructeur
4. Si le point est à moins de 100 m d'une AOT existante (vérification silencieuse), le bloc environnement est réduit à une ligne et un bloc de proximité avec le formulaire de calcul et le résultat s'affiche dans le même popup (voir §4.0 C6 et §4.2)

Les couches Natura 2000, ZNIEFF, Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère restent par ailleurs **affichables/masquables normalement** dans le panneau « Couches affichées » (voir §5) : leur éventuelle non-détectabilité au clic ne change rien à leur affichage sur la carte.

### 4.2 Rayon d'évitage (message, formulaire et résultat dans la modale centrale)

> Textes exacts affichés : §4.0, cas C6. La présente section décrit le mécanisme.

La détection de proximité est **silencieuse** : elle s'effectue dès qu'un point est posé sur l'eau, que la couche « AOT de mouillage existantes » soit cochée ou non dans la légende (v1.5). Elle se déclenche lorsque le point cliqué est à **moins de 100 m** d'une AOT existante — seule situation où un chevauchement de rayon d'évitage est réellement possible. Au-delà de 100 m, aucun message d'évitage ne s'affiche et l'usager obtient directement ses coordonnées.

**Tout dans la modale** *(v2.5)* : le bloc `#boat-block` du popup de coordonnées contient le message de proximité, les deux champs (`#in-loa`, `#in-depth`) et, dessous, le résultat (`#out-conflict`). Le bloc de droite « Calcul rayon d'évitage » (`#evitage-panel`, v2.3) et son résultat `#out-rayon` sont supprimés, ainsi que le repli automatique de « Couches affichées ». Le calcul est considéré comme **fait** quand les **deux** champs sont renseignés (valeurs > 0) — fonction `lireSaisieEvitage()`. Le champ « Colonne d'eau à marée haute » n'a pas de valeur pré-remplie.

- **Calcul pas encore fait**, clic à moins de 100 m d'une AOT : bloc orange avec les deux champs, rien dessous, pas de cercle ; à la saisie des deux champs, le message vert ou rouge apparaît sous le bloc orange, avec le cercle d'évitage sur la carte.
- **Calcul déjà fait** (valeurs conservées d'un clic précédent), clic à moins de 100 m d'une AOT : les champs sont déjà remplis et le message vert ou rouge s'affiche **directement** sous le bloc orange.
- **À tout moment**, l'usager peut modifier les champs (repliés ou dépliés via « Détails », v2.7) : le message et le cercle sont recalculés à chaque saisie.

Messages de résultat (`.evitage-resultat`, avec sous-titre `.evitage-sous-titre` « Estimation indicative qui ne remplace pas une vérification sur place. ») :
- Pas de chevauchement (vert, `.libre`) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, ne semble pas être en collision avec les rayons d'évitage des navires à proximité. »
- Chevauchement (rouge, `.chevauche`) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, risque une collision avec le rayon d'évitage des navires à proximité. Veuillez vérifier sur site ou modifier l'emplacement par précaution. »

Retirés en v2.3 : le rappel « Activez le filtre AOT pour les voir… » (`#rappel-filtre-aot`), l'invitation « Renseignez la longueur de votre navire… » (`.warn-box`), le chapeau `.chapeau-evitage` et le paragraphe disclaimer sous le formulaire (remplacé par le sous-titre des messages vert/rouge).

Calcul basé sur la formule (v1.5) :
```
rayon d'évitage = colonne d'eau à marée haute × 1,5 + longueur du navire
```
Le formulaire ne comporte que **deux champs** : « Longueur de mon navire (m) » et « Colonne d'eau à marée haute (m) ». Le champ « Longueur de la ligne de mouillage » (menu 3× / 5× / 7×) a été retiré en v1.5. Le rayon affiché est arrondi au mètre. Pour les AOT existantes, la même formule est appliquée avec `CONFIG.profondeurDefaut` comme colonne d'eau.

**Estimation automatique de la colonne d'eau à marée haute** *(v2.6)* — approximation assumée, décision de Nicolas (25/09/2026) : `colonne = profondeur au point + hauteur de marée haute`, arrondie à 0,1 m, pré-remplie dans `#in-depth` (modifiable).
- **Profondeur** : API EMODnet Bathymetry `https://rest.emodnet-bathymetry.eu/depth_sample?geom=POINT(lon lat)`, champ `avg` (altitude moyenne de la maille d'environ 115 m ; négative sous l'eau ; référence verticale : plus basses mers astronomiques sur les côtes à marée, niveau moyen ailleurs). La grille européenne intègre les levés du Shom. Testée en réel le 25/09/2026 depuis le site publié (CORS accepté, 60 à 370 ms) : Quiberon −12,35 m, Brest −23,6 m, Saint-Malo −1,86 m. Délai max `CONFIG.delaiProfondeur` (5 s).
- **Pourquoi pas le Shom directement** : les couches « MNT » du WMS INSPIRE du Shom ne sont pas interrogeables au point (`LayerNotQueryable` en GetFeatureInfo, testé le 25/09/2026) et leur export brut `image/x-bil` renvoie des valeurs incohérentes ; les API de prédiction de marée du Shom sont payantes.
- **Hauteur de marée haute** : table fixe `data/ram-ports.json` (Shom, Références Altimétriques Maritimes, 214 ports de métropole, extraite le 25/09/2026 du WFS `RAM_BDD_WLD_WGS84G_WFS:ram_3857`, Licence Ouverte, citer « Shom, 2025 »). Port retenu : le plus proche à vol d'oiseau (`distanceM`). Valeur `h` = **PMVE − PBMA** (pleine mer de vives-eaux moyenne, coefficient 95, décision de Nicolas : cas courant le plus défavorable) ; en Méditerranée, où la PMVE n'est pas publiée, **PHMA − NM**. Le fichier est chargé au premier besoin (`chargerPortsRAM`).
- **Cas limites** : si l'altitude EMODnet est positive (estran, fond découvrant), elle est retranchée de `h` ; si le résultat est inférieur à `CONFIG.colonneMin` (0,5 m), si EMODnet ne répond pas ou si la table n'est pas chargée → pas d'estimation, champ vidé s'il contenait une estimation, conservé s'il avait été saisi à la main.
- **Ordre des événements** : l'estimation est lancée dès que le point est à moins de 100 m d'une AOT, en parallèle de la vérification Natura 2000/ZNIEFF ; un jeton (`jetonEstimation`) ignore la réponse d'un clic précédent ou arrivée après fermeture du popup. Toute saisie dans le champ bascule en « valeur modifiée à la main » ; un nouveau clic près d'une AOT relance l'estimation et remplace la valeur.
- **Limites connues** : maille de 115 m (fond moyen, peu fidèle près des roches et des chenaux), port de référence choisi à vol d'oiseau (peut être de l'autre côté d'une pointe), marée de vives-eaux moyenne et non la marée du jour.

**Paramètres configurables** (dans `index.html`):
- `CONFIG.profondeurDefaut` — colonne d'eau à marée haute supposée pour les **AOT existantes** (5 m) ; depuis v2.3, elle ne pré-remplit plus le champ de l'usager
- `CONFIG.longueurAutres` — longueur supposée des autres navires (9 m)

**Sous-titre affiché à l'usager** *(v2.2 ; libellé v2.3 : « Estimation indicative qui ne remplace pas une vérification sur place. », intégré aux messages vert/rouge)* : auparavant « Estimation indicative : le rayon d'évitage ne remplace pas une vérification sur place. » Les limites détaillées auparavant (profondeur saisie non mesurée, longueur des autres navires supposée, vent/courant/nature du fond non pris en compte) restent vraies **techniquement** mais ne sont plus énumérées à l'usager dans le popup — décision de Nicolas (22/09/2026) pour raccourcir un popup jugé trop chargé ; ces limites restent documentées ici et dans le code (commentaires `CONFIG`).

**Fermeture du popup** *(v2.1)* : un bouton « Fermer » (croix + libellé, `aria-label="Fermer"`) en haut à droite du popup, ainsi que la touche Échap (uniquement quand le popup est visible), appellent `fermerPopupCoordonnees()`. Cette fonction ne se contente pas de masquer le popup : elle **désélectionne entièrement** le point choisi — retire le marqueur, vide `position`, efface le cercle d'évitage (via `recalculer()`), et remet le bouton « Copier » à son état initial. Contrairement à la modale ports/ZMEL (§4.1.a), il n'y a **pas de fermeture au clic en dehors** : le popup de coordonnées n'a pas d'overlay, la carte reste cliquable derrière, et un clic ailleurs sur l'eau a déjà son propre sens (choisir un autre point) — ajouter une fermeture au clic extérieur entrerait en conflit avec ce comportement existant. *(v2.3)* Les valeurs du formulaire d'évitage ne sont **plus effacées** à la fermeture : elles restent en place pour la session (champs de la modale depuis v2.5), de sorte qu'un clic suivant près d'une AOT affiche directement le résultat.

**Bloc de résultat fusionné** *(v2.2 — textes remplacés en v2.3, voir plus haut)* : le rayon d'évitage estimé et le résultat du recoupement, auparavant deux blocs séparés (`.result-box` puis `.warn-box`/`.ok-box`), tiennent désormais dans un seul message, injecté dans `#out-conflict` par `recalculer()` :
- Chevauchement détecté (rouge, classe `.evitage-resultat.chevauche`) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, chevauche le rayon d'évitage estimé d'autres navires. Veuillez vérifier sur site ou modifier l'emplacement par précaution. »
- Pas de chevauchement (vert, classe `.evitage-resultat.libre`) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, ne semble pas chevaucher d'autres rayons d'évitage. »

Le message au-dessus des coordonnées (`#coords-hint`) qui répétait cette information (« Votre zone d'évitage en recoupe N déjà autorisées… » / « Estimation indicative… ») a été retiré de ce cas : `recalculer()` appelle désormais `messagePopup('', null)` une fois le bloc fusionné affiché, pour éviter la redite avec le sous-titre disclaimer, lui aussi permanent. Le hint reste utilisé pour les autres messages sans lien avec l'évitage (invitation à saisir la longueur du navire, avertissements terre/interdiction, etc.).

### 4.3 Intégration API Carto IGN (module *nature*)

Pour identifier automatiquement les zones Natura 2000 et ZNIEFF au point cliqué, la carte interroge l'**API Carto de l'IGN**, module *nature* : `https://apicarto.ign.fr/api/nature/...`.

- **Endpoints utilisés:** `natura-habitat` (Natura 2000 habitats), `natura-oiseaux` (Natura 2000 oiseaux), `znieff1`, `znieff2` (recherche par géométrie ponctuelle passée en paramètre `geom`) — **testés en réel le 21 septembre 2026** depuis un navigateur. Les codes `sic` et `zps`, introduits en v1.3 d'après la documentation sans test réel, renvoient une erreur 404 et ne doivent pas être réintroduits (voir historique v1.7)
- **Propriétés lues:** `sitename` pour `natura-habitat` et `natura-oiseaux` ; `nom` pour `znieff1` et `znieff2`. Le champ à lire est porté par chaque requête (propriété `champ`)
- **Accès:** API publique, sans clé
- **Robustesse:** chaque appel est borné par un délai de **8 secondes** (`AbortController`, porté de 4 à 8 secondes en v1.7) ; en cas de dépassement ou d'échec réseau, l'affichage bascule sur un état de secours (« interrogation indisponible ») sans jamais bloquer l'affichage des coordonnées GPS — la vérification des zones protégées est une information complémentaire, jamais un préalable au parcours principal
- **Messages:** un bloc Natura 2000 (habitats et oiseaux réunis) et un bloc ZNIEFF (générique, sans nom ni type de zone) s'affichent indépendamment l'un de l'autre selon le résultat — voir §4.1.d
- **Limite connue:** aucun endpoint équivalent n'existe à ce jour pour les Parcs naturels marins, les Aires marines protégées, les Herbiers de posidonie et de zostère, les zones de baignade ou les zones réglementaires — ces zones ne sont donc **pas** vérifiées automatiquement au clic (mention rappelée à l'usager dans le popup, voir §4.1.d). L'APB, elle, est vérifiée (voir §4.3bis)
- **Délai d'attente (constaté le 21 septembre 2026):** les réponses Natura 2000 sont volumineuses (200 à 360 ko, géométrie complète du site) et mettent parfois 3 à 4,5 secondes : avec l'ancien délai de 4 secondes, une des deux requêtes Natura 2000 pouvait être coupée sur certains points (Golfe du Morbihan, Lavezzi) et `echec` passait à `true` alors que l'autre avait répondu. Le délai a été porté à 8 secondes en v1.7 (décision de Nicolas). Piste d'amélioration non retenue : alléger la requête
- **Repli sur le WFS de la Géoplateforme (v1.9):** si l'API Carto **échoue** (erreur ou délai de 8 s dépassé), la même question est posée au WFS de la Géoplateforme (`https://data.geopf.fr/wfs/ows`, `GetFeature`, filtre `INTERSECTS(geom,SRID=4326;POINT(lon lat))`, nom lu dans `nom_site`) sur les couches `patrinat_sic:sic`, `patrinat_zps:zps`, `patrinat_znieff1:znieff1` + `patrinat_znieff1_mer:znieff1_mer`, `patrinat_znieff2:znieff2` + `patrinat_znieff2_mer:znieff2_mer`, avec un délai de 6 s. Si l'API Carto **répond mais ne renvoie rien**, seules les couches ZNIEFF **marines** sont interrogées en WFS (délai 4 s) : l'API Carto ne les renvoie pas en mer, alors que les couches terrestres et Natura 2000 y sont bien couvertes, et redemander celles-ci au WFS ferait attendre l'usager pour rien (une réponse à 10 s a été observée sur `znieff2`). Le WFS n'est jamais interrogé en premier. `echec` ne passe à `true` que si l'API Carto **et** tout le repli ont échoué ; un résultat partiel du repli (terre ou mer seule) est conservé
- **CORS vérifié le 21 septembre 2026 :** le WFS répond aux requêtes émises depuis `https://nicolas-viennot-beta.github.io` (la réponse est lisible par la page). La CSP `connect-src 'self' https:` l'autorise déjà
- **Testé en réel (21 septembre 2026, depuis le site publié, avec le code de `interrogerZonesProtegees`) :** l'API Carto a dépassé les 8 s sur 3 points sur 4 (habitats et oiseaux à Port-Cros, ZNIEFF 1 à l'Île Riou) ; le repli a rendu « Rade d'Hyères », « Iles d'Hyères » et « ILE RIOU, ILOTS CONGLUÉ ET IMPÉRIAUX ». Au large de Quiberon, aucun résultat et `echec` à `false`. Durée totale du clic : 2 à 8 s, dominée par le délai de l'API Carto
- **Limite connue du repli :** le délai de 8 s de l'API Carto reste le principal temps d'attente ; le réduire (par exemple à 4-5 s) est possible maintenant qu'un repli existe, mais n'a pas été fait. Les ZNIEFF marines n'ont été confirmées que sur un point (Île Riou) ; aucun des autres points marins testés n'était dans une ZNIEFF marine

### 4.3bis Arrêtés de protection de biotope (APB) — vérification bloquante *(v2.0)*

- **Aucun endpoint API Carto :** le module *nature* de l'API Carto IGN (§4.3) ne couvre que Natura 2000 et ZNIEFF. Seul le WFS de la Géoplateforme expose les APB
- **Couche et champ :** `patrinat_apb:apb`, nom lu dans `nom_site` (confirmé le 22 septembre 2026, même mécanisme que le repli ZNIEFF)
- **Piège constaté (22/09/2026) :** un filtre `BBOX` sur cette couche attend l'ordre **latitude puis longitude**, à l'inverse du filtre `INTERSECTS`/`POINT` utilisé au clic (longitude puis latitude, comme pour les autres couches Patrinat). Sans conséquence sur le code (seul `INTERSECTS` est utilisé), mais à garder en tête pour toute requête `BBOX` future sur cette couche
- **Bloquant, contrairement à Natura 2000/ZNIEFF :** l'APB interdit le mouillage, alors que Natura 2000/ZNIEFF ne font que signaler une sensibilité. La vérification est donc faite **avant** tout affichage (marqueur, coordonnées), pas après coup — voir §4.1.c bis. Délai borné à 4 secondes (plus court que les 6-8 s des autres appels : ce service a répondu en quelques dizaines à quelques centaines de ms lors des tests, et il conditionne l'affichage de chaque clic, contrairement aux vérifications faites après coup)
- **Défaut non bloquant :** en cas d'échec ou de dépassement du délai, la vérification est considérée négative (comme si aucun APB n'était détecté) et le clic se poursuit normalement — la carte ne doit jamais empêcher l'accès aux coordonnées GPS pour une raison technique
- **Testé en réel le 22 septembre 2026** (requête directe, hors clic sur la carte publiée — voir `TESTS_FONCTIONNELS.md`, 5septies) : au centre approximatif de l'APB « Ile Dumet et ses abords » (-2,6214 / 47,4112, Loire-Atlantique), le WFS renvoie bien ce nom. Un point pris exactement sur un sommet du contour peut en revanche ne rien renvoyer (comportement du service, déjà rencontré sur `znieff2_mer` en v1.9) : ce n'est pas un point de test fiable, préférer un point net à l'intérieur du polygone
- **Message affiché :** popup rouge (même traitement que les cultures marines), nommant l'arrêté : « Vous êtes dans un arrêté de protection de biotope — *nom*. Cette zone est interdite au mouillage. »
- **Non vérifié :** aucun clic réel sur la carte publiée n'a encore été fait dans un véritable APB (le test ci-dessus interroge directement le service, pas la carte) ; à confirmer après déploiement

### 4.4 Détection terre/eau

La détection terre/eau ne peut pas se fonder sur le fond de carte visible par l'usager : le fond « Aérien » (photographie aérienne) ne comporte, en vecteur, que les routes et voies ferrées — aucune couche d'occupation du sol, de bâti ou de relief. Un point cliqué loin de toute route (champ, plage, maison isolée) y serait donc à tort classé comme « en mer ».

- **Méthode:** Une carte de référence invisible (« carte fantôme »), jamais affichée à l'écran, reste en permanence calée sur le fond vectoriel **Simple** (Plan IGN) et synchronisée sur le centre/zoom/orientation de la carte visible. C'est cette carte fantôme qui est interrogée à chaque clic, quel que soit le fond réellement affiché à l'usager (Simple ou Aérien).
- **Test vectoriel:** Recherche de caractéristiques de terre au point cliqué, projeté sur la carte fantôme, sur deux jeux de couches du même style : les couches IGN (`oro_relief`, `ocs_`, `bati_`, `routier_`, `ferre` — relief, occupation du sol, bâti, voirie, voies ferrées) **et**, depuis le 18 septembre 2026, le socle générique OpenMapTiles du même style (`landcover`, `landuse`, `building`, `aeroway`), qui porte notamment les marais, plages, dunes, prés, champs et bois. Les toponymes et limites administratives sont ignorés (ils débordent en mer).
- **Confirmation par couleur:** Si aucune caractéristique de terre n'est trouvée, une lecture du pixel rendu sur la carte fantôme confirme la présence d'eau lorsque sa couleur est proche de la couleur exacte de la couche `water` du style (`rgb(151,205,213)`, tolérance ±6 par canal). Cette lecture nécessite `preserveDrawingBuffer: true` sur la carte fantôme.
- **Critères ignorés:** Toponymes et limites administratives (débordent en mer)
- **Robustesse:** Si ni une caractéristique de terre ni la couleur de la mer ne sont trouvées, le résultat est indéterminé — le contrôle ne bloque pas l'usager, y compris quand les tuiles de la carte fantôme (fond Simple) ne sont pas chargées alors que le fond **Aérien** est, lui, parfaitement chargé et affiché.
- **Coût:** Cette méthode charge une seconde carte MapLibre en tâche de fond (invisible), avec son propre jeu de tuiles vectorielles — léger surcoût réseau et mémoire, sans impact visuel pour l'usager.
- **Bug corrigé le 18 septembre 2026 :** un marais ou une plage/dune, sans bâti ni route à proximité, n'était détecté par aucun des deux jeux de couches IGN d'origine et retombait, à tort, sur une confirmation « eau » — la seconde teinte de référence alors utilisée (`rgb(199,228,219)`) était en outre à 7 près de la couleur exacte des marais et des plages sur ce style (`rgb(192,229,219)`), ce qui confirmait activement ces zones de terre comme « eau ». Voir §11 (v1.6) et `TESTS_FONCTIONNELS.md` §1.7.

### 4.5 État des sources cartographiques
Bandeau « Couches affichées » avec icônes:

| Icône | Signification |
|-------|---------------|
| ✓ | Source joignable et chargée |
| ✗ | Source injoignable depuis ce navigateur |
| ○ | Fichier local présent mais vide — à compléter |
| ≈ | Données de secours (page ouverte en local via `file://`) |

Les couches marquées **« À venir »** (voir §5) n'affichent aucune de ces icônes : leur case à cocher est grisée et désactivée, et aucune requête n'est faite pour elles tant qu'aucune source interrogeable n'est disponible.

---

## 5. Couches cartographiques

### Protection de la nature
- 🟨 **Natura 2000 — habitats (SIC/ZSC)** — couche WMTS, identifiable au clic via l'API Carto IGN (voir §4.3)
- 🟩 **Natura 2000 — oiseaux (ZPS)** — couche WMTS (**cochée par défaut** depuis v2.4, comme la couche habitats), identifiable au clic via l'API Carto IGN
- 🟦 **Parcs naturels marins** — couche WMTS, affichable/masquable normalement — non identifiable au clic (aucune API disponible)
- 🔵 **ZNIEFF marines (type 1)** — couche WMTS visible sur la carte ; l'identification au clic interroge en réalité les couches nationales `znieff1` **et** `znieff2` de l'API Carto IGN (pas seulement le type 1, et couverture mer/terre exacte non confirmée — voir §4.3)
- 🟢 **Aires marines protégées** — couche WMTS (masquée par défaut), affichable/masquable normalement — non identifiable au clic (aucune API disponible)
- ⬜ **Arrêtés de protection de biotope (APB)** *(v1.8)* — couche WMTS `Patrinat_APB` (IGN / INPN), **cochée par défaut**, statut `verifie` : nom de couche et tuiles confirmés le 21 septembre 2026 (voir §11, v1.8). Affichage seul, non identifiable au clic. Le serveur dessine les APB en orange vif (rvb 255, 128, 0), en fins contours et petits aplats : peu visibles quand on est dézoomé, et couleur proche de celle des aires marines protégées (légende : `#ff8000`, relevée sur les tuiles le 21/09/2026)

### Usages de la mer
- 🟢 **Informations portuaires** — couche SHOM (image de symboles : sans nom de port, gestionnaire ni limites)
- 🟢 **ZMEL** — fichier local `data/zmel.geojson` *(v2.10)* : vraies données (647 ZMEL, Cerema/CACEM, France entière et Antilles, converties depuis un shapefile Lambert-93 fourni par Nicolas — copie de référence dans `data/zmel-reel.geojson`) ; capacité d'accueil réelle, contact (`mailto`) resté sans donnée (absent de la source)
- 🔵 **Cultures marines** — fichier local `data/cultures-marines.geojson` — un clic dans cette zone déclenche désormais un popup d'interdiction (voir §4.1.c)

### Habitats sensibles
- 🟣 **Herbiers de posidonie et de zostère** — couche WMS (couverture partielle : presque uniquement l'Occitanie, Palavas et Albères ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère annoncée mais absente), affichable/masquable normalement — non identifiable au clic (aucune API disponible)

### À venir
- ⬜ **Zone de baignade / zone réglementaire** — entrée unique, grisée et non sélectionnable, mention « À venir » : regroupe deux types de zones pour lesquelles aucune source interrogeable n'a été identifiée à ce jour. Cette entrée matérialise le sujet dans la légende sans (encore) charger de donnée. Les APB, qui y figuraient jusqu'en v1.7, ont désormais leur propre couche (voir « Protection de la nature »).

### Autres couches
- 🔴 **AOT de mouillage existantes** (libellé depuis v2.4 ; « AOT existantes » auparavant) — 249 positions simulées, fictives (Bretagne + Méditerranée)

### État des sources problématiques
- **Herbiers de posidonie et de zostère:** Couverture insuffisante — presque uniquement l'Occitanie ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère absente ; reste affichable mais non identifiable au clic
- **Parcs naturels marins, Aires marines protégées:** Aucune API d'identification de zone au clic identifiée à ce jour (contrairement à Natura 2000 et ZNIEFF, couverts par l'API Carto IGN — module *nature*, endpoints `natura-habitat`, `natura-oiseaux`, `znieff1`, `znieff2`) — restent affichées/masquables normalement, simplement absentes de la vérification automatique au clic
- **APB:** couche WMTS `Patrinat_APB` ajoutée en v1.8, tuiles confirmées ; pas d'identification au clic
- **Zones de baignade, zones réglementaires:** Aucune source publique interrogeable identifiée — regroupées dans l'entrée « À venir » du panneau (voir ci-dessus)
- **ZMEL:** Couche nationale consolidée depuis v2.9/v2.10 (647 ZMEL, Cerema/CACEM, fournie par Nicolas le 18/09/2026) ; capacité d'accueil réelle, contact (e-mail) non disponible dans la source
- **Cultures marines:** Relèvent du cadastre conchylicole — à demander aux DDTM/délégations à la mer
- **Réserves naturelles nationales:** Couche retirée de la configuration (n'apparaît plus dans « Couches affichées »)

---

## 6. Configuration et personnalisation

### Blocs configurables (dans `index.html`)

#### `CONFIG`
```javascript
const CONFIG = {
  profondeurDefaut: 5,      // colonne d'eau supposée pour les AOT existantes (m) — ne pré-remplit plus le champ usager (v2.3)
  delaiProfondeur: 5000,    // délai max de l'API EMODnet pour l'estimation de la colonne d'eau (ms, v2.6)
  colonneMin: 0.5,          // en dessous, pas d'estimation proposée (m, v2.6)
  longueurAutres: 9,        // longueur supposée des autres navires (m)
  // ... autres paramètres
};
```

#### `GRIST`
```javascript
const GRIST = {
  url: 'data/bateaux-exemple.json',  // positions des navires existants
  latitude: 'latitude',
  longitude: 'longitude'
};
```

#### `COUCHES`
Tableau des sources cartographiques affichées — chaque entrée peut être:
- **Couche WMTS/WMS:** `tiles: WMTS(couche, format)`
- **Fichier GeoJSON local:** `geojson: 'data/fichier.geojson'`
- **Couche de mouillages:** `aot: true` + `geojson`
- **Couche « à venir » (non chargée, case grisée):** `aVenir: true` — aucune source, aucun écouteur, aucune requête ; utilisé uniquement pour l'entrée combinée « Zone de baignade / zone réglementaire » (créée en v1.2 sous le nom « APB / zone de baignade / zone réglementaire », scindée en v1.8). Les couches Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère, qui portaient temporairement ce marquage en cours d'itération, ont été **repassées en affichage normal** : seule leur absence de vérification automatique au clic est documentée (§4.1.d, §5), pas leur affichage.

### Données de secours
Si une source ne charge pas:
1. Vérifier la présence dans `SECOURS` (dictionnaire embarqué)
2. Si présente → données de secours utilisées (marquées ≈)
3. Si absente → statut ✗, fichier non affiché

---

## 7. Considérations de sécurité

### ✅ Principes appliqués
- **Aucun secret dans le dépôt** — site statique, tout est visible
- **Pas de données réelles versionnées** — les positions doivent être récupérées à l'exécution
- **CSP:** `connect-src 'self' https:;` autorise les appels réseau vers n'importe quelle origine HTTPS (nécessaire pour interroger l'API Carto IGN, voir §4.3, et, depuis v2.6, l'API EMODnet Bathymetry, voir §4.2 — seules les coordonnées du point cliqué lui sont envoyées) ; aucun script tiers n'est chargé
- **Mention de prototype** — visible en permanence, même en mode embed
- **Géolocalisation:** Consentement navigateur, position ne quitte pas le poste

### ⚠️ Recommandations
- Ne jamais placer de clé d'accès privée dans les URLs (GRIST.url notamment)
- Ne pas versionner des fichiers de positions réelles
- Les données sensibles doivent être récupérées à l'exécution via API sécurisée

---

## 8. Utilisation locale vs en ligne

### En ligne (recommandé)
- Déployer sur GitHub Pages
- Tout fonctionne automatiquement
- Sources cartographiques joignables

### En local (développement/démonstration)
```bash
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```
- Fichiers `data/*.geojson` ne sont pas lisibles (restriction `file://`)
- Les données de secours `SECOURS` prennent le relais
- Couches concernées marquées ≈

### Mode embed
```
https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/?embed
```
- Masque le bandeau institutionnel
- Donne toute la hauteur à la carte
- Utile pour intégration dans une démarche

---

## 9. Checklist de test complet

À effectuer **avant chaque mise à jour** pour prévenir les régressions.
(Un test automatisé, exécuté par Claude via lecture/exécution de code, existe en complément dans [`TESTS_FONCTIONNELS.md`](./TESTS_FONCTIONNELS.md) — voir `CLAUDE.md` à la racine du dossier pour la politique complète.)

### ✅ 1. Interaction Ports — Hover
- [ ] Survoler le **picto port** (carré vert) dans la légende → curseur doit changer en pointeur
- [ ] Survoler un **point port** sur la carte → curseur doit changer en pointeur
- [ ] Sortir du survol → curseur revient à normal
- [ ] Pas de message d'erreur dans la console (F12)

### ✅ 2. Interaction Ports — Clic
- [ ] Cliquer sur le **picto port** dans la légende → modale s'ouvre avec nom du port
- [ ] Cliquer sur un **point port** sur la carte → modale s'ouvre avec info port, mention « Pas d'AOT individuel sur cette zone »
- [ ] Modale affiche le **nombre de places disponibles** (fictif)
- [ ] Modale affiche le **contact** (capitainerie)
- [ ] Aucun marqueur ni coordonnées GPS n'apparaissent (le clic port court-circuite la cascade générale)
- [ ] Pas d'erreur console

### ✅ 3. Fermeture modale ports
- [ ] Cliquer sur le bouton ✕ de la modale → modale se ferme
- [ ] Appuyer sur Échap → modale se ferme
- [ ] Cliquer en dehors de la modale → modale se ferme

### ✅ 4. Interaction ZMEL — Hover
- [ ] Survoler le **picto ZMEL** (carré orangé) dans la légende → curseur change en pointeur
- [ ] Survoler la **zone ZMEL** sur la carte → curseur change en pointeur
- [ ] Sortir du survol → curseur revient à normal
- [ ] Pas d'erreur console

### ✅ 5. Interaction ZMEL — Clic
- [ ] Cliquer sur le **picto ZMEL** dans la légende → modale s'ouvre avec titre « Zone de mouillages... » et mention « Pas d'AOT individuel sur cette zone »
- [ ] Cliquer sur la **zone ZMEL** sur la carte → modale s'ouvre
- [ ] Modale affiche le **nombre de postes** (`nb_postes`, fictif), le **gestionnaire** et un lien `mailto` (fictif)
- [ ] Aucun marqueur ni coordonnées GPS n'apparaissent
- [ ] Pas d'erreur console

### ✅ 6. Fermeture modale ZMEL
- [ ] Cliquer sur ✕ → modale se ferme
- [ ] Appuyer sur Échap → modale se ferme
- [ ] Cliquer en dehors → modale se ferme

### ✅ 7. Clic et modale d'orientation
- [ ] Cliquer sur la carte → modale d'orientation reste visibleOU disparaît selon la séquence
- [ ] Rouvrir la modale d'orientation via ❓ → affiche l'étape en cours
- [ ] Les cases ✓ (complétées) et l'étape courante en bleu sont à jour

### ✅ 8. Curseur terre/eau
- [ ] Cliquer sur la **terre** (relief, bâti) sur le fond **Simple** → popup affiche alerte rouge « Vous êtes à terre »
- [ ] Cliquer sur la **terre** (loin de toute route) sur le fond **Aérien** → popup affiche également l'alerte rouge « Vous êtes à terre » (test de non-régression de la carte fantôme, voir §4.4)
- [ ] Aucune coordonnée GPS n'apparaît dans les deux cas ci-dessus
- [ ] Cliquer sur l'**eau**, sur l'un ou l'autre fond, hors ZMEL/port/cultures marines → popup affiche les coordonnées GPS et un bloc environnement (vert ou neutre/orange selon les zones détectées)
- [ ] Popup affiche le **bouton Copier**

### ✅ 9. Cultures marines — interdiction
- [ ] Cliquer dans une zone de cultures marines → popup rouge d'interdiction
- [ ] Aucun marqueur ni coordonnées GPS n'apparaissent
- [ ] Pas d'erreur console

### ✅ 10. Interrogation Natura 2000 / ZNIEFF (API Carto)
- [ ] Cliquer sur l'eau dans une zone couverte par Natura 2000 ou une ZNIEFF connue → le popup affiche le(s) nom(s) de zone après un court délai
- [ ] Cliquer sur l'eau à Port-Cros (environ 43,00 N / 6,40 E, rade d'Hyères) → le popup affiche « Rade d'Hyères » et « Iles d'Hyères » (Natura 2000) : cas de référence de la v1.7, qui ne fonctionnait pas avec `sic`/`zps`
- [ ] Cliquer sur l'eau dans un grand site Natura 2000 (Golfe du Morbihan, Lavezzi) → les noms s'affichent malgré une réponse lente (jusqu'à 4,5 s)
- [ ] Cliquer sur l'eau hors de toute zone connue → le popup affiche « pas de contre-indication identifiée » (teinte verte)
- [ ] Dans les deux cas, une mention rappelle que certaines couches (PNM, AMP, herbiers, baignade, zones réglementaires) ne sont pas vérifiées automatiquement
- [ ] Simuler une coupure/latence réseau (ou couper temporairement l'accès à `apicarto.ign.fr`) → le repli WFS prend le relais (v1.9) : les zones s'affichent après environ 8 s + quelques secondes ; l'état de secours n'apparaît que si `data.geopf.fr` est lui aussi coupé, sans bloquer l'affichage des coordonnées GPS
- [ ] Cliquer sur l'eau dans une ZNIEFF marine connue (par exemple autour de l'Île Riou, Marseille, 43,171 N / 5,380 E) → le message ZNIEFF s'affiche, même si l'API Carto ne renvoie rien
- [ ] Au large de Quiberon (environ 47,2 N / -3,9 E) → « pas de contre-indication », en quelques secondes
- [ ] Pas d'erreur bloquante en console

### ✅ 10bis. Arrêtés de protection de biotope — APB (v2.0)
- [ ] Cliquer n'importe où sur l'eau (hors ports/ZMEL/terre/cultures marines) → un bref message « Vérification de la zone… » s'affiche d'abord, sans marqueur ni coordonnées
- [ ] Cliquer dans un APB connu (par exemple au centre approximatif de « Ile Dumet et ses abords », -2,6214 N / 47,4112 E — un point pris exactement sur le contour peut ne rien renvoyer) → popup rouge nommant l'arrêté, pas de marqueur, pas de coordonnées, pas de vérification Natura 2000/ZNIEFF
- [ ] Cliquer hors de tout APB → après le message de vérification, le marqueur et les coordonnées apparaissent normalement, puis la vérification Natura 2000/ZNIEFF se lance comme avant
- [ ] Simuler une coupure ou une lenteur du service (`data.geopf.fr`) → au bout de 4 secondes, le clic se poursuit normalement (défaut non bloquant), sans jamais empêcher l'affichage des coordonnées
- [ ] Pas d'erreur bloquante en console

### ✅ 11. Proximité AOT et calcul du rayon d'évitage *(v2.7, v2.8)*
- [ ] Au chargement → la colonne de droite ne contient que « Couches affichées » (plus de bloc « Calcul rayon d'évitage »)
- [ ] Calcul pas fait : cliquer sur l'eau à moins de 100 m d'une AOT → le bloc environnement tient sur **une ligne** (« Aucune zone bloquante détectée sur cet emplacement. », ou titre Natura 2000/ZNIEFF) avec un bouton « Détails ▾ » ; dessous, bloc orange : « **D'autres mouillages sont enregistrés à proximité.** », « Vérifier que votre rayon d'évitage… », puis les champs longueur et colonne d'eau, chacun sur sa ligne ; rien sous le bloc orange
- [ ] Cliquer sur « Détails ▾ » → le détail (mention des zonages non détectables, nom de la zone Natura 2000 le cas échéant) se déplie, le bouton devient « Masquer ▴ » ; recliquer le replie
- [ ] *(v2.6)* Au clic, la colonne d'eau se **pré-remplit** en une seconde environ, avec la note « Estimation : profondeur ≈ … (EMODnet) + marée haute de vives-eaux ≈ … (port de référence : …, Shom). Modifiable. » ; le port cité est bien le plus proche ; en Méditerranée, marée haute de 0,2 à 0,3 m environ
- [ ] *(v2.6)* Corriger la valeur → note « Valeur modifiée à la main. », le résultat suit
- [ ] *(v2.6)* Couper le réseau (ou bloquer `rest.emodnet-bathymetry.eu`) → « Estimation indisponible à cet endroit : saisissez la valeur. », le calcul reste possible à la main
- [ ] Vider la longueur → rien ne s'affiche sous le bloc orange
- [ ] Saisir aussi la colonne d'eau → sous le bloc orange, message vert (« … ne semble pas être en collision… ») ou rouge *(v2.8)* (« Le rayon d'évitage de votre navire est estimé à … m avec un risque de collision. Modifier l'emplacement ou vérifier sur place. ») avec le rayon (ex. 10 m et 4 m → 16 m) et le sous-titre « Estimation indicative qui ne remplace pas une vérification sur place. » ; le cercle se dessine
- [ ] Modifier un champ → le rayon, le message et le cercle se mettent à jour immédiatement
- [ ] *(v2.7/v2.8)* Saisir aussi la colonne d'eau (dernier champ complété) → le bloc orange devient vert/rouge, un bouton « Détails ▾ » apparaît ; les champs restent visibles pendant la frappe, puis se replient **automatiquement après une courte pause (~0,7 s)**, sans avoir besoin de cliquer ailleurs *(v2.8 — avant, le repli n'avait lieu qu'à la sortie du champ)*
- [ ] *(v2.8)* Taper un nombre à deux chiffres dans « Longueur de mon navire » (ex. « 20 ») caractère par caractère → aucune frappe perdue, le champ garde le focus et affiche bien « 20 » au final, le bloc ne se replie pas avant la fin de la pause
- [ ] *(v2.7)* Cliquer sur « Détails ▾ » → les champs réapparaissent avec leurs valeurs, bouton « Masquer ▴ » ; modifier une valeur puis attendre → les champs **restent visibles** (pas de repli automatique après une réouverture manuelle, même après une nouvelle saisie)
- [ ] Calcul fait : fermer le popup, cliquer à nouveau près d'une AOT → champs toujours remplis, message vert/rouge **directement**, bouton « Détails ▾ » présent mais replié
- [ ] Le rappel « Activez le filtre AOT » et l'invitation « Renseignez la longueur… » n'apparaissent plus
- [ ] Cliquer sur l'eau à plus de 100 m de toute AOT → aucun bloc de proximité ; bloc environnement **complet** (non réduit, sans bouton « Détails »), texte vert « Pas de contre-indication détectée automatiquement sur cette zone. »
- [ ] Pas d'erreur console

### ✅ 12. Copie des coordonnées
- [ ] Bouton « Copier » fonctionne (changement visuel du bouton)
- [ ] Coordonnées copiées dans le presse-papiers
- [ ] Peut être collées dans le formulaire Démarches Simplifiées
- [ ] Message de confirmation affiché (« Copié »)

### ✅ 12bis. Fermeture du popup de coordonnées *(v2.1)*
- [ ] Cliquer sur l'eau pour faire apparaître le popup → un bouton « Fermer ✕ » est visible en haut à droite
- [ ] Cliquer sur « Fermer » → le popup disparaît, le marqueur est retiré de la carte, le point n'est plus sélectionné
- [ ] Si un cercle d'évitage était affiché → il disparaît également à la fermeture
- [ ] *(v2.3, v2.5)* Si des valeurs avaient été saisies dans les champs du rayon d'évitage → elles sont **conservées** après fermeture
- [ ] Appuyer sur Échap pendant que le popup est visible → même effet que le bouton « Fermer »
- [ ] Appuyer sur Échap quand le popup n'est pas visible → aucun effet, pas d'erreur console
- [ ] Cliquer ailleurs sur l'eau (hors du popup) → **ne ferme pas** le popup : un nouveau point est sélectionné normalement (comportement volontairement différent de la modale ports/ZMEL)
- [ ] Pas d'erreur console

### ✅ 13. Visibilité des couches
- [ ] Décocher une couche dans la légende → disparaît de la carte
- [ ] Recocher → réapparaît
- [ ] Décoche des AOT → l'analyse de conflit se poursuit à l'identique (vérification silencieuse) ; seul le rappel « Activez le filtre AOT » apparaît en plus dans le message de détection
- [ ] Recocher AOT → analyse reprend
- [ ] Les couches Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère restent **cochables/décochables normalement** (elles ne sont plus grisées, seule leur non-détectabilité au clic est documentée)
- [ ] L'entrée « Zone de baignade / zone réglementaire » apparaît grisée avec la case décochée et désactivée, et la mention « À VENIR »
- [ ] La couche « Arrêtés de protection de biotope (APB) » apparaît dans « Protection de la nature », **cochée par défaut** ; la décocher la masque, la recocher la réaffiche
- [ ] *(v2.4)* Les deux couches « Natura 2000 — habitats (SIC/ZSC) » et « Natura 2000 — oiseaux (ZPS) » restent deux entrées distinctes de la légende, **toutes deux cochées par défaut**
- [ ] *(v2.4)* La couche AOT s'intitule « AOT de mouillage existantes et leur évitage »
- [ ] Les tuiles APB s'affichent sur des sites connus (statut ✓, par exemple Morbihan, Brest, Ajaccio, Camargue) ; sinon le statut ✗ signale un problème de service

### ✅ 14. État des sources (bandeau légende)
- [ ] Chaque couche interrogeable affiche ✓ (ok), ✗ (erreur), ○ (vide), ou ≈ (secours)
- [ ] Statut correspond à la réalité (source charge ou non)
- [ ] Au survol → tooltip affiche la raison (« Source joignable », « Fichier absent », etc.)
- [ ] L'entrée « À venir » n'affiche aucune icône de statut

### ✅ 15. Console navigateur
- [ ] Ouvrir F12 → onglet « Console »
- [ ] **Aucun message d'erreur ne doit apparaître**
- [ ] Aucun message « Erreur lors de l'attachement des gestionnaires »
- [ ] Aucun message « Erreur lors de l'ouverture de la modale »

### ✅ 16. Responsive et performances
- [ ] Carte fonctionne sur **mobile** (portrait/paysage)
- [ ] Carte fonctionne sur **tablette**
- [ ] Carte fonctionne sur **desktop** (large écran)
- [ ] Pas de ralentissements visibles
- [ ] Interactions sont fluides (pas de freezes)

### ✅ 17. Mode embed
- [ ] URL avec `?embed` → bandeau masqué, carte maximisée
- [ ] Toutes les fonctionnalités restent accessibles
- [ ] Modale d'orientation s'ouvre au démarrage
- [ ] Bouton ❓ visible même en embed

### ✅ 18. Sélecteur de fond de carte
- [ ] Ouvrir le sélecteur de fond de carte (bas-gauche) → seuls les fonds **Simple** et **Aérien** sont proposés dans « Cartes »
- [ ] Aucune section « Surcouches » n'apparaît dans ce sélecteur
- [ ] Basculer entre Simple et Aérien → la carte change de fond sans erreur console

---

## 10. Résolution de problèmes courants

### Ports/ZMEL ne réagissent pas au clic
**Diagnostic:**
1. Ouvrir F12 → Console
2. Vérifier qu'aucun message d'erreur n'apparaît
3. Si « Erreur lors de l'attachement » → les couches n'existent pas

**Solutions:**
- Vérifier que les fichiers `data/ports-plaisance.geojson` et `data/zmel.geojson` existent et sont valides
- Vérifier que le serveur fonctionne (mode local) ou que GitHub Pages est accessible (en ligne)

### Curseur ne change pas au survol
**Diagnostic:**
- Les handlers `mouseenter/mouseleave` ne sont pas attachés
- Couche inexistante ou non chargée

**Solutions:**
- Voir ci-dessus (ports/ZMEL ne réagissent pas)

### Cercle d'évitage ne s'affiche pas
**Diagnostic:**
- Le point cliqué est à plus de 100 m de toute AOT existante → comportement normal (v1.2), le calcul ne s'applique qu'à moins de 100 m (voir §4.2 et §9.11)
- *(v2.3)* Un des deux champs du rayon d'évitage (bloc de proximité de la modale depuis v2.5) est vide → le calcul n'est pas considéré comme fait (plus de colonne d'eau par défaut)
- Vérifier que des AOT existent dans `data/aot-existantes.geojson`
- Vérifier que la couche « Autres mouillages » est cochée

**Solutions:**
- Recharger la page (Ctrl+R)
- Vérifier l'état de la source dans la légende
- Se rapprocher (moins de 100 m) d'une AOT existante pour tester le formulaire

### Le popup d'environnement reste bloqué sur « interrogation en cours »
**Diagnostic:**
- L'appel à l'API Carto IGN (voir §4.3) met plus de 8 secondes à répondre ou échoue silencieusement, puis le repli WFS (6 s maximum) est lui aussi attendu

**Solutions:**
- Comportement attendu : au bout de 8 secondes (puis du délai du repli WFS, 6 s maximum), l'affichage bascule automatiquement sur un état de secours — aucune action requise, les coordonnées GPS restent accessibles dans tous les cas
- Vérifier la connexion réseau si le blocage semble anormalement long

### Le popup n'identifie aucune zone Natura 2000 alors que le point est dans un site
**Diagnostic:**
- Ouvrir la console réseau et vérifier que les appels vont bien vers `apicarto.ign.fr/api/nature/natura-habitat` et `natura-oiseaux` (et non `sic`/`zps`, qui renvoient une 404)
- Vérifier que le nom est lu sur `properties.sitename` pour Natura 2000 et `properties.nom` pour les ZNIEFF
- Sur un très grand site, une réponse de plus de 8 secondes est coupée : le popup affiche alors l'état de secours

### Un clic sur l'eau met du temps à afficher le marqueur et les coordonnées
**Diagnostic:**
- Comportement attendu depuis la v2.0 : chaque clic sur l'eau attend d'abord la réponse du WFS APB (§4.3bis), jusqu'à 4 secondes, avant d'afficher marqueur et coordonnées — ce n'est pas un bug
- Si l'attente dépasse nettement 4 secondes, vérifier que le délai de `interrogerAPB` n'a pas été modifié, et que `data.geopf.fr` répond (voir §4.3bis)

**Solutions:**
- Rétablir les codes et les champs ci-dessus dans `interrogerZonesProtegees` ; ne pas se fier à la documentation seule, tester l'appel en réel (voir `TESTS_FONCTIONNELS.md`, test 5quater)

### Clic à terre ne fonctionne pas (sur l'un ou l'autre fond)
**Diagnostic:**
- Tuiles du fond **Simple** non chargées — y compris si le fond **Aérien** est affiché : la détection terre/eau dépend toujours de la carte fantôme calée sur le fond Simple (voir §4.4), jamais du fond réellement visible
- Contrôle déclaré indéterminé (laisse passer l'usager)

**Solutions:**
- Vérifier la connexion réseau
- Attendre le chargement des tuiles (y compris en tâche de fond, sur la carte fantôme)
- Cliquer ailleurs sur la carte

### La colonne d'eau ne se pré-remplit pas *(v2.6)*
**Diagnostic:**
- Note « Estimation indisponible à cet endroit » : l'API EMODnet n'a pas répondu en 5 s (`CONFIG.delaiProfondeur`), a répondu sans valeur, ou le point est asséché (colonne < 0,5 m) — vérifier dans l'onglet Réseau l'appel à `rest.emodnet-bathymetry.eu/depth_sample`
- `data/ram-ports.json` absent ou illisible : aucune estimation possible (la console réseau montre une erreur sur ce fichier)

**Solutions:**
- L'usager saisit la valeur à la main ; aucune action bloquante
- Valeur jugée fausse : c'est une approximation (maille de 115 m, port le plus proche à vol d'oiseau, vives-eaux moyennes), l'usager la corrige

### Une couche affichée ne semble jamais « valider » un clic (PNM, AMP, herbiers)
**Diagnostic:**
- Comportement normal (v1.2) : ces couches restent affichables/masquables normalement dans la légende, mais ne sont **pas interrogées** lors du clic (aucune API d'identification de zone disponible pour elles, voir §4.1.d et §5) — la mention générique de non-détection s'affiche dans le popup

**Solutions:**
- Aucune action requise ; intégrer ces couches à `interrogerZonesProtegees` dans `index.html` une fois une source adaptée identifiée

---

## 11. Historique des corrections

### v2.11 — 25 septembre 2026
**Correction d'une régression bloquante à l'initialisation (aucune couche ne se chargeait, sur réseau lent)**
- Découverte lors de la vérification demandée par Nicolas sur la version publiée (« c'est publié, tu peux tester ») de la v2.10 : sur plusieurs chargements de page dans le navigateur de test, la carte restait bloquée sur le seul fond IGN, sans aucune couche applicative (ni AOT, ni ZMEL, ni rien) — donc sans possibilité de tester le clic sur une ZMEL
- Cause identifiée précisément via la console : `demarrer()` s'appuyait sur trois déclencheurs (`styledata` + vérification `isStyleLoaded()`, `load`, et un filet de sécurité `setTimeout(demarrer, 8000)`). Ce dernier appelait `demarrer()` sans revérifier `isStyleLoaded()` : sur un réseau plus lent que 8 s (plausible pour l'usage visé — un plaisancier en mer avec un signal faible), `initialiser()` se lançait alors que le style n'était pas prêt, plantait dès son premier `map.addSource()` (`"Style is not done loading."`), et — la garde `demarre` étant déjà passée à `true` — l'application restait bloquée pour le reste du chargement de page, quelle que soit la durée d'attente ensuite
- Correctif : `demarrer()` revérifie désormais systématiquement `map.isStyleLoaded()` avant de se lancer ; si le style n'est pas prêt, il se reprogramme (toutes les 500 ms, jusqu'à 40 fois, soit ~20 s de plus) au lieu de forcer l'exécution. Le filet de sécurité à 8 s devient ainsi le début d'une fenêtre de retry plutôt qu'un déclenchement inconditionnel unique
- Bug pré-existant depuis la V1 (mécanisme `demarrer()`/`initialiser()` inchangé jusqu'ici), sans lien avec les évolutions ZMEL v2.7–v2.10 ; probablement resté invisible faute d'avoir testé un chargement de page « à froid » avec un style lent jusqu'ici
- Testé : harnais Node.js (exécution synchrone/asynchrone) ; test unitaire isolé de la logique de `demarrer()` reproduisant un style qui ne devient prêt qu'après 3 s (retry confirmé, `initialiser()` appelé une seule fois, avec succès) et un style qui ne devient jamais prêt (abandon propre après 40 tentatives, aucune boucle infinie, aucun plantage) ; suite de tests v2.8/v2.9/v2.10 rejouée sans régression (Chromium headless, harnais HTTP local). **Vérifié sur la version publiée** : rechargement à froid du site en direct (source servie confirmée par `fetch`, correspond bien au commit `671d2a5`), `map.isStyleLoaded()`/`demarre`/`tentativesDemarrage` observés en conditions réelles (un essai a mis plus de 8 s et retenté sans planter, comme prévu ; un autre a chargé du premier coup), carte volée jusqu'à la ZMEL « Baie de L'Île-Rousse », polygone bien affiché, clic réel déclenchant la modale avec le titre, le texte et la note attendus (18 navires, sans mailto), aucune erreur JS imputable à ce flux

### v2.10 — 25 septembre 2026
**Vraies données ZMEL branchées sur la carte (data/zmel.geojson remplacé)**
- Nicolas a demandé le branchement, après avoir constaté qu'aucune ZMEL ne s'affichait sur la carte (le fichier fictif à une seule zone, en Méditerranée, restait actif depuis v2.9) : « Comment brancher les 647 vraies ZMEL sur la carte ? » → remplacement pur et simple de `data/zmel.geojson` par le contenu de `data/zmel-reel.geojson` (647 ZMEL, France entière et Antilles), option retenue plutôt qu'une couche séparée à activer
- `data/zmel-reel.geojson` conservé tel quel (copie de référence/traçabilité de la conversion, voir v2.9)
- Note de la couche « ZMEL » (légende, `COUCHES`) et note de bas de modale ZMEL mises à jour : ne mentionnent plus de données fictives ni « aucune couche nationale identifiée » ; statut de la couche passé de `local` à `verifie`
- Jeu de secours hors-ligne (`SECOURS['data/zmel.geojson']`, utilisé seulement à l'ouverture du fichier par double-clic) remplacé par 3 vraies ZMEL (Étel, Anse du Croûton à Antibes, Baie de l'Île-Rousse) au lieu de l'exemple fictif — cohérent avec la note qui ne parle plus de données fictives
- Testé : harnais Node.js (exécution synchrone/asynchrone) ; Chromium headless **servi en HTTP réel** (`python -m http.server`, pas `file://`, pour que le `fetch('data/zmel.geojson')` aboutisse réellement plutôt que de retomber sur `SECOURS`) — 647 features confirmées côté fichier chargé, source et layer MapLibre `zmel`/`zmel-fill` bien créés, `modaleZmel()` appelée avec la première vraie feature du fichier chargé (titre, texte et note conformes), aucune `pageerror`. **Non vérifié sur la version publiée**

### v2.9 — 25 septembre 2026
**Vraies données ZMEL converties (non branchées) ; popup ZMEL reformulé**
- Nicolas a fourni un shapefile officiel (Cerema/CACEM, `ZMEL_18_09_2026`, 647 ZMEL, France entière + Antilles, projection RGF93/Lambert-93) : converti en GeoJSON WGS84, attributs d'origine conservés, dans le nouveau fichier `data/zmel-reel.geojson`. **Ce fichier n'est pas encore utilisé par la carte** : `data/zmel.geojson` (fictif) reste la source active de la couche ZMEL — le branchement est une étape ultérieure
- Tentative de récupération d'e-mails de contact par territoire abandonnée : le lien `url_v2` du jeu de données pointe vers `legicem.metier.e2.rie.gouv.fr`, un domaine du RIE (réseau interministériel de l'État) **injoignable depuis l'extérieur** (confirmé par un test réseau direct, échec de connexion au niveau du proxy/DNS, cohérent avec un `error=login_required` observé sur l'une des fiches) — donc inutilisable pour le public comme pour Claude
- Décision de Nicolas (25/09/2026) : le popup `modaleZmel()` est reformulé indépendamment du branchement des vraies données (préparation du terrain) :
  - Titre : « {nom_zmel} - {lieu_dit_s} - {commune} » (au lieu de « {nom_zmel} — Commune :{nom_commune} »)
  - Corps : ajout de « C'est un très bon projet. » ; « Capacité d'accueil : {n} navires. » remplace « Il reste {n} place(s) disponible(s) à… » ; « Faites votre demande directement auprès de la ZMEL : {mailto} » remplace « Faites votre demande auprès de… »
  - Champs lus : `nom_zmel`/`lieu_dit_s`/`commune`/`nb_postes_` (vraies données), avec repli sur `nom`/`nom_commune`/`nb_postes` (ancien schéma fictif) pour ne rien casser tant que `data/zmel.geojson` n'est pas remplacé
  - Sans `mailto` (cas de la quasi-totalité des vraies ZMEL) : message générique inchangé « Renseignez-vous… auprès de son gestionnaire ou de la DDTM de votre département. » (décision de Nicolas : pas de lien vers la fiche Légicem, inaccessible au public)
- Testé : harnais Node.js (exécution synchrone/asynchrone) ; Chromium headless, `modaleZmel()` appelée directement avec 4 jeux de données (vraie ZMEL sans mailto, lieu-dit proche du nom, ancien schéma fictif avec mailto, sans capacité ni contact) — titres et textes vérifiés caractère près, aucune `pageerror`. **Non vérifié sur la version publiée**

### v2.8 — 25 septembre 2026
**Repli automatique du bloc de proximité après une pause de frappe, et texte de collision reformulé**
- Décision de Nicolas (25/09/2026) : une fois le résultat affiché, le bloc « Détails » doit se refermer automatiquement (gagner en visibilité sur la carte dessous), sans attendre que l'usager clique ou tabule ailleurs comme en v2.7
- Mécanisme : un minuteur de 700 ms est armé dès que le calcul se complète, et **réarmé à chaque frappe** dans l'un des deux champs (`in-loa`/`in-depth`) — le repli ne se déclenche donc jamais en pleine saisie, seulement après une courte pause. Remplace le mécanisme v2.7 basé sur le `focusout` (repli seulement à la sortie du champ), désormais retiré
- Une réouverture manuelle des « Détails » désarme ce repli automatique pour la suite (comme en v2.7)
- Texte de collision reformulé : « Le rayon d'évitage de votre navire est estimé à **{r} m** avec un risque de collision. Modifier l'emplacement ou vérifier sur place. » (remplace le texte v2.7 plus long, « … risque une collision avec le rayon d'évitage des navires à proximité. Veuillez vérifier sur site ou modifier l'emplacement par précaution. »). Le texte du cas sans collision (vert) est inchangé
- Testé : harnais Node.js (exécution synchrone et asynchrone, sans erreur ni rejet non géré) ; Chromium headless avec frappe caractère par caractère (aucune perte de saisie, bloc resté ouvert pendant la frappe), repli automatique vérifié ~1,1 s après la dernière frappe sans clic ni tabulation, réouverture manuelle stable après ré-édition, nouveau texte de collision vérifié, scénario sans collision (vert) inchangé — aucune `pageerror`. **Non vérifié sur la version publiée**

### v2.7 — 25 septembre 2026
**Bloc de proximité replié une fois le calcul du rayon d'évitage fait**
- Décision de Nicolas (25/09/2026) : une fois les deux champs renseignés, le message « D'autres mouillages sont enregistrés à proximité… » est remplacé par le résultat (vert/rouge), et le formulaire se replie derrière un bouton « Détails ▾ » (comme le bloc environnement depuis v2.5)
- Correctif appliqué avant livraison : replier le formulaire dès que le calcul se complète aurait pu faire perdre le focus (et donc la fin de sa frappe) à l'usager en train de taper dans un champ juste avant que l'autre ne se remplisse — le repli est désormais différé jusqu'à ce que le focus quitte réellement les deux champs (`focusout`), jamais pendant la saisie
- Une réouverture manuelle des « Détails » ne se referme plus automatiquement au clic suivant ailleurs dans le popup
- Structure : `#boat-block` ne contient plus qu'un seul bloc `#proximite-block` (message + formulaire replié dedans), au lieu du bloc orange fixe et d'un `#out-conflict` séparé (v2.5–v2.6)
- Testé : harnais Node.js (exécution synchrone) ; Chromium headless avec frappe caractère par caractère dans les champs (pas de perte de saisie), repli au blur réel, non-repli après réouverture manuelle, et l'ensemble des scénarios v2.5/v2.6 (vert, Natura 2000, cas secondaire, clic loin) rejoués sans régression ni `pageerror`. **Non vérifié sur la version publiée**

### v2.6 — 25 septembre 2026
**Colonne d'eau à marée haute estimée automatiquement (profondeur + marée haute du port le plus proche)**
- Décisions de Nicolas (25/09/2026) : approche simple et approximative (profondeur + hauteur de marée fixe par port) ; valeur **pré-remplie et modifiable** ; marée haute de **vives-eaux** ; **port de référence le plus proche**
- Profondeur : API EMODnet Bathymetry (`depth_sample`), testée en réel depuis le site publié. Le Shom a été écarté pour la profondeur : WMS MNT non interrogeable au point, export `x-bil` incohérent (tests du 25/09/2026)
- Marée : nouveau fichier `data/ram-ports.json` (Shom, RAM, 214 ports, PMVE − PBMA ou PHMA − NM en Méditerranée), extrait du WFS du Shom et contrôlé par sommes de contrôle
- Note explicative sous le champ ; cas d'échec non bloquant ; saisie manuelle toujours possible ; `CONFIG.delaiProfondeur` et `CONFIG.colonneMin` ajoutés ; champ `in-depth` au pas de 0,1 m
- Testé : harnais Node.js (exécution synchrone complète, sans erreur) ; Chromium headless avec EMODnet simulé (réponse −12,35 m → 17,7 m avec Port-Haliguen 5,37 m ; échec réseau → message et saisie manuelle ; estran +1,2 m → 4,2 m) ; aucune `pageerror`. **Non vérifié sur la version publiée** (clic réel avec l'API EMODnet réelle)

### v2.5 — 25 septembre 2026
**Rayon d'évitage : formulaire et résultat ramenés dans la modale centrale, modale plus concise**
- Suppression du bloc « Calcul rayon d'évitage » de la colonne de droite (`#evitage-panel`, `#out-rayon`) et du repli/dépli automatique des blocs de droite au clic
- Bloc de proximité (orange) : « **D'autres mouillages sont enregistrés à proximité.** » en gras, puis « Vérifier que votre rayon d'évitage ne soit pas en collision avec un autre navire. », puis les champs « Longueur de mon navire (m) » et « Colonne d'eau à marée haute (m) », un par ligne ; résultat vert/rouge affiché dessous (textes inchangés). L'ancien message jaune renvoyant au formulaire de droite est supprimé
- Quand un mouillage est à moins de 100 m : bloc environnement réduit à une ligne avec un bouton « Détails ▾ » replié par défaut. Titre vert « Aucune zone bloquante détectée sur cet emplacement. » (décision de Nicolas, 25/09/2026, plutôt que « AOT mouillage autorisée sur cette zone », jugé trompeur) ; titres neutres « Emplacement situé en site Natura 2000. » / « … en ZNIEFF. » / « … en site Natura 2000 et en ZNIEFF. » (décision de Nicolas : réduire aussi ces cas). Hors proximité, bloc environnement inchangé
- `afficherEnvironnement(html, teinte, titreCompact)` : nouveau 3e paramètre optionnel
- Colonne d'eau à marée haute : récupération automatique depuis les données du SHOM demandée ; **reportée** à une vérification de faisabilité (décision de Nicolas, 25/09/2026). Champ saisi à la main en attendant
- Testé : harnais Node.js (exécution synchrone complète, sans erreur) ; Chromium headless (services distants coupés) en pilotant les fonctions du script — bloc réduit replié puis déplié, champs, résultat rouge 16 m pour 10 m / 4 m, bloc complet hors proximité, aucune `pageerror`. Pas de clic réel sur la carte (fond de plan injoignable depuis l'environnement de test). **Non vérifié sur la version publiée**

### v2.4 — 25 septembre 2026
**Ajustements de libellés et affichage par défaut de Natura 2000 oiseaux**
- Modale d'accueil, branche port/ZMEL : « c'est de loin l'option la moins dommageable pour les **écosystèmes marins** » (au lieu de « pour les herbiers »)
- Légende « Couches affichées » : « AOT existantes et leur évitage » devient « **AOT de mouillage existantes et leur évitage** »
- Popup Natura 2000 (C5.1) : « Cet emplacement se situe dans un site Natura 2000. Une étude d'incidence va être réalisée suite à votre demande. Nom de la zone à reporter dans le formulaire de demande : **{noms des sites}** » — remplace la mention d'évaluation environnementale
- Couche « Natura 2000 — oiseaux (ZPS) » désormais **cochée par défaut** (`visible:true`), comme la couche habitats. **Décision de Nicolas (25/09/2026) :** pas de regroupement des deux couches Natura 2000 en une seule entrée de légende — les tuiles IGN des deux couches ayant des couleurs différentes (jaune / vert) non modifiables, on garde deux légendes distinctes

### v2.3 — 23 septembre 2026
**Dissociation du message de proximité et du formulaire de calcul du rayon d'évitage**
- Nouveau bloc « Calcul rayon d'évitage » dans la colonne de droite (`#evitage-panel`), replié au chargement, avec les deux champs et le résultat « Rayon d'évitage = {r} m » (`#out-rayon`)
- Le popup central ne porte plus que le message : jaune (calcul pas fait), puis vert/rouge avec nouveaux libellés (« … ne semble pas être en collision… » / « … risque une collision… ») et sous-titre « Estimation indicative qui ne remplace pas une vérification sur place. »
- Cas d'origine (calcul pas fait) : au clic proche d'une AOT, « Couches affichées » se replie et « Calcul rayon d'évitage » s'ouvre ; cas secondaire (calcul fait) : aucune action sur la colonne de droite
- Calcul « fait » = les deux champs renseignés (`lireSaisieEvitage()`) ; plus de valeur pré-remplie pour la colonne d'eau (`CONFIG.profondeurDefaut` ne sert plus qu'aux AOT existantes)
- Valeurs conservées à la fermeture du popup (auparavant, la longueur était effacée)
- Message jaune reformulé pour renvoyer au bloc de droite : « D'autres mouillages sont enregistrés à proximité, vérifier en remplissant les champs du formulaire « Calcul rayon d'évitage » si les rayons d'évitage des navires ne se chevauchent pas. »
- **Documentation unique** : le document séparé `claude_AMIDOMAR_Spec_Reactions_Clic_v1.md` est abandonné ; les textes exacts de toutes les réactions au clic (C1 à C6) sont désormais dans le §4.0 de ce document, seule référence. Les renvois du code et de `TESTS_FONCTIONNELS.md` pointent vers ce §4.0
- Retirés : rappel « Activez le filtre AOT », invitation « Renseignez la longueur… », chapeau `.chapeau-evitage`, disclaimer sous le formulaire
- Formule inchangée (déjà `colonne d'eau × 1,5 + longueur` depuis v1.5) ; libellé de l'étape 2 de la marche à suivre ajusté (longueur **et** colonne d'eau)
- Testé : suite complète de `TESTS_FONCTIONNELS.md` (lecture du code automatisée, exécution Node.js, scénarios de clic dans Chromium headless avec services distants simulés, dont le scénario v2.3 complet) ; aucune erreur JavaScript. Sources cartographiques distantes injoignables depuis l'environnement de test (sans incidence sur ces scénarios). **Non vérifié sur la version publiée**

### v2.2 — 22 septembre 2026
**Allègement du contenu du formulaire d'évitage, dans le popup de coordonnées**
- Chapeau « D'autres mouillages sont enregistrés à proximité… » : n'est plus encadré (suppression de la classe `.jaune-box` à cet endroit, remplacée par `.chapeau-evitage`, texte simple)
- Rayon estimé et résultat du recoupement fusionnés en un seul bloc (`.evitage-resultat`, classes `.chevauche`/`.libre`) : « Le rayon d'évitage de votre navire, estimé à **{r} m**, chevauche… » (rouge) / « … ne semble pas chevaucher… » (vert) — remplace les deux blocs séparés `.result-box` et `.warn-box`/`.ok-box`
- Sous-titre disclaimer raccourci : « Estimation indicative : le rayon d'évitage ne remplace pas une vérification sur place. », à la place de l'énumération détaillée des trois limites (profondeur saisie, longueur supposée des autres navires, vent/courant/fond)
- Message au-dessus des coordonnées (`#coords-hint`) vidé pour ce cas (`messagePopup('', null)`) : il répétait le contenu désormais dans le bloc fusionné et le sous-titre
- Décision de Nicolas (22/09/2026) : simplification assumée du popup, jugé trop chargé (recouvrait la carte) — écart avec la description d'origine en trois temps de la spec `claude_AMIDOMAR_Spec_Reactions_Clic_v1.md` (cas C6), non mise à jour dans cette session
- **Correctif en cours de route :** la fusion a d'abord laissé une référence orpheline à `#out-radius` (élément supprimé du template), qui aurait provoqué une erreur JavaScript bloquante à l'exécution — détecté avant livraison par relecture du diff, pas par le test d'exécution générique (§6/1bis), qui ne déclenche pas `recalculer()` via un clic simulé. Corrigé avant tout commit.
- Testé : syntaxe + exécution réelle du script en Node.js (chargement complet, sans erreur) ; le rendu exact du bloc fusionné a été vérifié en isolant le gabarit du message (valeurs de test : r=38, chevauchement) plutôt que par un clic simulé de bout en bout. **Non vérifié en conditions réelles** (clic effectif sur la carte publiée), aucun navigateur disponible dans cette session

### v2.1 — 22 septembre 2026
**Fermeture explicite du popup de coordonnées, avec désélection complète du point**
- Nouveau bouton « Fermer » (croix + libellé, `aria-label="Fermer"`) en haut à droite de `#coords-popup`, jusqu'ici sans moyen de fermeture explicite
- Nouvelle fonction `fermerPopupCoordonnees()` : retire le marqueur, vide `position`, efface le cercle d'évitage (délégué à `recalculer()`), réinitialise le champ « Longueur de mon navire » et l'état du bouton « Copier »
- Fermeture également possible par la touche Échap (actif seulement quand le popup est visible)
- Décision de Nicolas (22/09/2026), après examen des pratiques UX usuelles (WAI-ARIA APG, NN/g) : **pas** de fermeture au clic en dehors du popup, à la différence de la modale ports/ZMEL — cette dernière a un overlay qui neutralise tout le reste de l'écran, alors que le popup de coordonnées n'en a pas ; un clic ailleurs sur la carte a déjà un sens (sélectionner un nouveau point), et le faire aussi fermer le popup créerait une ambiguïté
- Testé : exécution réelle du script en Node.js, sans erreur (voir `TESTS_FONCTIONNELS.md` §6/1bis et §5/14) ; **non vérifié en conditions réelles** (clic effectif sur la carte publiée), aucun navigateur disponible dans cette session

### v2.0 — 22 septembre 2026
**Vérification des arrêtés de protection de biotope (APB) au clic, traitée comme une interdiction bloquante**
- Nouvelle fonction `interrogerAPB` (WFS Géoplateforme, couche `patrinat_apb:apb`, délai 4 s, défaut non bloquant) — détail en §4.3bis
- Décision de Nicolas : l'APB étant une zone interdite au mouillage, elle prime sur Natura 2000/ZNIEFF, et son traitement s'aligne sur celui des cultures marines (popup rouge, pas de marqueur, pas de coordonnées) — plutôt qu'un message parmi d'autres dans le popup habituel
- Écart assumé avec Natura 2000/ZNIEFF : la vérification APB est **bloquante** (attendue avant tout affichage), alors que Natura 2000/ZNIEFF s'affichent après coup, en tâche de fond. Décision explicite de Nicolas après qu'une alternative non bloquante (afficher tout de suite, corriger ensuite) lui a été présentée
- Conséquence pour l'usager : chaque clic sur l'eau (hors ports/ZMEL/terre/cultures marines) affiche désormais un bref message « Vérification de la zone… » avant le marqueur et les coordonnées
- Testé le 22/09/2026 : 6 scénarios réseau simulés (zone trouvée, rien trouvé, panne HTTP, panne réseau, timeout à 4 s) tous conformes ; test réel (requête directe, hors clic sur la carte publiée) au centre de l'APB « Ile Dumet et ses abords » (Loire-Atlantique) : nom renvoyé correctement
- **Non vérifié :** aucun clic réel dans un APB sur la carte publiée (nécessite le déploiement de cette version)
- Retiré de `MENTION_NON_DETECTABLES` et des autres mentions génériques : l'APB n'est plus une couche « non détectable », elle a sa propre vérification

### v1.9 — 21 septembre 2026
**Repli sur le WFS de la Géoplateforme pour l'identification Natura 2000 / ZNIEFF au clic**
- `interrogerZonesProtegees` interroge désormais le WFS de la Géoplateforme (nouvelle fonction `interrogerWFS`) quand l'API Carto échoue, et pour les seules ZNIEFF marines quand elle ne renvoie rien (détail en §4.3). Le message affiché à l'usager et le déroulé du clic ne changent pas
- Motifs, constatés le 21 septembre 2026 : l'API Carto ne renvoie pas les ZNIEFF marines ; elle a dépassé 8 s sur 3 points de test sur 4 alors que le WFS a répondu ; le WFS renvoie quelques ko contre 200 à 360 ko
- CORS vérifié depuis le site publié. Test d'exécution avec réseau simulé (6 scénarios : API Carto seule, API Carto en panne, API Carto vide, tout en panne, API Carto vide + WFS en panne, repli partiel) et test réseau réel sur 4 points marins : voir `TESTS_FONCTIONNELS.md`, 5sexies
- **Écart avec l'intention de départ :** il était prévu de retenter le WFS dès que l'API Carto ne renvoie « rien ». Le test réel a montré qu'une couche terrestre du WFS peut mettre 10 s à répondre : le repli sur réponse vide est donc limité aux ZNIEFF marines. Natura 2000, dont l'API Carto couvre bien la mer, n'est retenté qu'en cas d'échec
- Non fait : réduire le délai de l'API Carto (8 s) ; à décider après quelques semaines d'observation

### v1.8 — 21 septembre 2026
**Couche APB séparée, légende scindée, notes de couverture corrigées**
- Remplacement de l'entrée « APB / zone de baignade / zone réglementaire » (« à venir ») par deux entrées : une couche **« Arrêtés de protection de biotope (APB) »** (WMTS `Patrinat_APB`, IGN / INPN, cochée par défaut, statut `verifie` après test du service le jour même, non identifiable au clic) et l'entrée « Zone de baignade / zone réglementaire », toujours « à venir »
- Couleur de légende de l'APB alignée sur celle des tuiles réelles (orange `#ff8000`) ; aucune note sous la ligne APB (la limite « non identifiable au clic » figure déjà dans la mention du popup)
- Notes de légende corrigées : herbiers (couverture réelle : presque uniquement l'Occitanie, zostère absente), informations portuaires (sans nom, gestionnaire ni limites), AOT (positions simulées, fictives)
- **Testé en réel le 21 septembre 2026** dans le navigateur intégré : `Patrinat_APB` figure dans le document de capacités WMTS de la Géoplateforme et renvoie des tuiles PNG au gabarit utilisé par la carte, avec contenu sur 6 des 7 sites essayés (Ajaccio, Arcachon, Brest, Camargue, Morbihan, Quiberon ; tuile vide à Hyères). Le rendu dans la carte elle-même n'a pas été vérifié à l'œil
- Le même contrôle confirme les noms WFS `patrinat_apb`, `patrinat_rnr`, `patrinat_znieff1_mer` et `patrinat_znieff2_mer`, ainsi que `Patrinat_ZNIEFF2_MER` en WMTS (aucune requête de données testée)
- Mise à jour du tableau `data/donnees_carte_amidomar.xlsx` : ligne « Natura 2000 au clic » passée en fonctionnelle (v1.7), ligne APB mise à jour, ligne « Zones de baignade et zones réglementaires » ajoutée

### v1.7 — 21 septembre 2026
**Rétablissement des codes API Carto `natura-habitat` / `natura-oiseaux` et du champ `sitename`**
- **Bug corrigé :** en v1.3, les endpoints `natura-habitat` et `natura-oiseaux` avaient été remplacés par `sic` et `zps` d'après une documentation (`docUser_moduleNature.pdf`), sans test réel. Testés le 21 septembre 2026 depuis un navigateur, `sic` et `zps` renvoient une erreur 404 sur tous les points essayés, alors que `natura-habitat` et `natura-oiseaux` répondent. Depuis v1.3, aucune zone Natura 2000 n'était donc identifiée au clic
- Le nom du site Natura 2000 est dans `properties.sitename` (et non `nom`) ; `znieff1` et `znieff2` restent en `nom`. Le champ lu est désormais porté par chaque requête (`champ`)
- **Vérifié en réel** avec la fonction modifiée : Port-Cros (6,40 / 43,00) → « Rade d'Hyères » et « Iles d'Hyères » (Natura 2000), « ÎLE DE PORT-CROS ET DE BAGAUD » (ZNIEFF) ; Lavezzi → « Iles Lavezzi, Bouches de Bonifacio » ; Golfe du Morbihan → deux sites ; Beauduc → « Camargue » et deux ZNIEFF ; pleine mer au large de Quiberon → aucun résultat, sans erreur
- **Délai d'attente porté de 4 à 8 secondes** (`AbortController`) : les réponses Natura 2000 volumineuses (200 à 360 ko) mettent jusqu'à 4,5 secondes et étaient parfois coupées à 4 secondes (Golfe du Morbihan, Lavezzi), ce qui faisait passer `echec` à `true`. Décision de Nicolas ; les coordonnées GPS restent affichées pendant l'attente
- Enseignement : ne plus corriger un identifiant de couche d'après une documentation seule ; le tester en réel avant de modifier le code

### v1.6 — 18 septembre 2026
**Correction de bug : faux négatif de la détection terre/eau sur marais et plages**

- Un point cliqué en zone de marais ou de plage/dune, à l'écart de tout bâti
  ou route, était signalé comme « eau » (coordonnées + bloc environnement
  Natura 2000/ZNIEFF) au lieu de déclencher l'alerte « vous êtes à terre » —
  signalé par Nicolas sur un point en marais au nord-est des Sables-d'Olonne
  (46.505134, -1.629184).
- **Cause :** `estSurLEau` ne testait comme « terre » que les couches IGN du
  style (`bati_`, `ocs_`, `routier_`, `ferre`, `oro_relief`), en ignorant le
  socle générique OpenMapTiles du même style (`landcover`, `landuse`,
  `building`, `aeroway`), qui porte notamment les marais et les plages. Faute
  de détection vectorielle, le contrôle retombait sur la confirmation par
  couleur de pixel, dont l'une des deux teintes de référence
  (`rgb(199,228,219)`) était quasi identique à la couleur réelle des
  marais/plages sur ce style (`rgb(192,229,219)`, à 7 près) : ces zones de
  terre étaient donc activement confirmées comme « eau », et pas seulement
  non détectées.
- **Correctif :** ajout de `landcover`/`landuse`/`building`/`aeroway` aux
  couches testées comme terre ; suppression de la teinte de référence en
  collision (ne reste que la couleur exacte de la couche `water` du style,
  `rgb(151,205,213)`) ; le cas où ni la terre ni la mer ne sont confirmées
  renvoie désormais l'indéterminé plutôt qu'une fausse confirmation « eau ».
- **Vérification :** syntaxe JS validée (`node --check`) ; logique de
  détection modifiée (regex + comparaison de couleurs) vérifiée par un test
  d'exécution isolé reproduisant le bug avec l'ancien code puis confirmant la
  correction avec le nouveau. La validation visuelle de bout en bout sur les
  tuiles réelles (`TESTS_FONCTIONNELS.md` §1.7) reste à faire dès qu'un
  navigateur avec accès réseau normal vers les serveurs IGN/OpenMapTiles est
  disponible — non effectuée dans cet environnement (réseau restreint).
- Voir §4.4 et `TESTS_FONCTIONNELS.md` §1.3, §1.4 et §1.7 (mis à jour).

### v1.5 — 17 septembre 2026
**Mise en conformité avec la spécification « Réactions au clic » (C1 à C6)**

Un document dédié, `claude_AMIDOMAR_Spec_Reactions_Clic_v1.md`, décrit désormais cas par cas ce que produit un clic sur la carte (zone déclenchante, contenu affiché, variables). *(Ce document séparé a été abandonné en v2.3 : son contenu, mis à jour, est intégré au §4.0.)* Changements appliqués :

- **C1 (port) :** titre devient « Port de plaisance : {nom} — Commune :{commune} » ; la phrase d'ouverture « Pas d'AOT individuel sur cette zone : » est supprimée ; la commune ne figure plus en doublon dans le corps du message
- **C2 (ZMEL) :** titre devient « Zone de mouillages et d'équipements légers : {nom} — Commune :{commune} » ; ouverture « Vous êtes sur une ZMEL qui… » ; le corps adopte la formulation des ports (« Il reste N place(s) disponible(s) à… » / « Faites votre demande auprès de… ») au lieu de « Capacité : N postes » / « Contactez la ZMEL à cette adresse »
- **Renommage des champs de données :** `nom` → `nom_port_de_plaisance` (ports) et `nom_zmel` (ZMEL), `commune` → `nom_commune`, dans `data/ports-plaisance.geojson`, `data/zmel.geojson` et les jeux de secours inline. **Le code lit les nouveaux noms avec repli sur les anciens**, pour ne pas casser un fichier territorial pas encore renommé
- **C4 (cultures marines) :** la phrase « Pas d'AOT individuel sur cette zone. » est supprimée ; « Vous êtes dans une zone de cultures marines — {nom}. » passe en gras
- **C5 (coordonnées) :** ajout du libellé « Coordonnées GPS en degrés décimaux (DD) : » au-dessus de la valeur. Le libellé est un **élément distinct** de la valeur : le bouton Copier ne copie que les coordonnées, sans quoi le collage dans le formulaire de la démarche serait inutilisable
- **C5.1 (Natura 2000) :** le nom du site passe de l'ouverture de la phrase à la phrase de report (« Le nom de la zone : {nom} est à reporter dans le formulaire de demande »)
- **C6 (proximité AOT) — le changement le plus structurant :**
  - la détection devient **silencieuse** : `formNavireRequis` ne dépend plus de `aotVisibles`, donc l'alerte fonctionne même si l'usager a décoché la couche pour alléger sa carte. La recherche de chevauchement est également toujours effectuée (la branche « Les AOT existantes sont masquées : aucune recherche n'est effectuée » est supprimée)
  - nouvelle cascade en trois temps : message de détection sur fond orange (classe `.jaune-box`), formulaire, puis résultat rouge ou vert. Le rappel « Activez le filtre AOT pour les voir » n'apparaît que si la couche est effectivement décochée
  - textes de résultat remplacés, orientés vers le contrôle sur place plutôt que vers le décompte
  - le compteur d'AOT au fichier disparaît du message vert
  - **nouvelle formule :** `rayon = colonne d'eau à marée haute × 1,5 + longueur du navire`, en remplacement de `√(ligne² − colonne d'eau²) + longueur du navire`. Les rayons obtenus sont sensiblement plus courts (navire de 10 m sur 4 m de colonne d'eau : 16 m contre 29,6 m), donc moins de chevauchements signalés — **choix assumé**
  - le champ « Longueur de la ligne de mouillage » (menu 3× / 5× / 7×) est **retiré du formulaire**, la formule ne s'en servant plus ; `CONFIG.ratioMouillage` et le paramètre `ratio` de `rayonEvitage` sont supprimés

### v1.4 — 17 septembre 2026
**Correction de la couleur de référence pour la confirmation eau/terre par pixel**
- La couleur unique précédemment codée (RVB 183, 225, 214) ne correspondait pas exactement au style réel. Deux couleurs distinctes ont été vérifiées et sont désormais prises en compte : **162, 203, 212** et **199, 228, 219** (probablement mer ouverte et zone littorale peu profonde, à confirmer)
- `EAU_SIMPLE` est passé d'un objet unique à un tableau de deux couleurs ; `estSurLEau` teste la couleur du pixel contre chacune (tolérance ±6 par canal, inchangée)
- Portée : c'est une correction de la donnée de référence, pas un changement de logique — le reste du mécanisme (carte fantôme cachée, fond Simple, indépendant du fond affiché à l'usager) est inchangé

### v1.3 — 17 septembre 2026
**Correction des codes de couche API Carto IGN, ajout de ZNIEFF2, messages Natura 2000/ZNIEFF distincts**
- **Bug corrigé :** les endpoints `apicarto.ign.fr/api/nature/natura-habitat` et `.../natura-oiseaux`, introduits en v1.2, n'existent pas côté serveur (les codes officiels de l'API Carto sont `sic` et `zps`) — ces deux requêtes échouaient donc silencieusement à chaque clic depuis leur mise en ligne, rattrapées par le `catch` comme un simple aléa réseau. Seule la couche `znieff1` fonctionnait réellement
- Le champ de lecture du nom de site, `sitename`, était également incorrect pour `sic`/`zps` : le champ documenté par l'IGN est `properties.nom` (confirmé via la documentation officielle du module nature, `docUser_moduleNature.pdf`)
- Ajout de la couche `znieff2`, absente jusqu'ici
- Le message affiché dans le popup distingue désormais **Natura 2000** (habitats et oiseaux réunis en un seul message, listant les noms de sites, précisant qu'une AOT reste possible sous réserve d'évaluation environnementale et que le nom de la zone est à reporter dans le formulaire de demande) et **ZNIEFF** (message générique et distinct, sans nom ni type de zone, invitant à des pratiques de mouillage durables) — les deux blocs peuvent s'afficher ensemble plutôt qu'un message unique combiné
- **Écart projet/dépôt constaté à cette occasion :** le fichier `prototype_index.html` joint aux connaissances du projet Claude (1115 lignes) ne contenait aucune trace de cette fonctionnalité, alors qu'elle existait déjà — avec le bug ci-dessus — sur le dépôt GitHub (`index.html`, 1367 lignes). Le travail a été fait sur la base du dépôt GitHub. Le fichier du projet Claude reste non resynchronisé (décision explicite de Nicolas) : à garder à l'esprit lors d'une prochaine intervention sur la carte
- **Point non vérifié :** la couverture mer/terre exacte des couches `znieff1`/`znieff2` de l'API Carto n'a pas pu être testée en conditions réelles dans cet environnement (accès réseau restreint côté serveur) — à confirmer par un test visuel avant déploiement (voir `TESTS_FONCTIONNELS.md`, §5.6)

### v1.2 — 16 septembre 2026
**Traitement unifié du clic sur la carte, intégration API Carto IGN, suppression du panneau « Mon mouillage »**
- Suppression du panneau latéral « Mon mouillage » : la saisie du navire n'apparaît plus en permanence, elle est intégrée conditionnellement dans le popup de coordonnées
- Nouveau traitement homogène du clic sur la carte (cascade unique) : ports/ZMEL (modale, inchangé) → terre (popup rouge, inchangé) → cultures marines (nouveau popup rouge d'interdiction) → eau (popup non bloquant avec résultat Natura 2000/ZNIEFF)
- Intégration de l'**API Carto de l'IGN** (module *nature*, endpoints `natura-habitat`, `natura-oiseaux`, `znieff1`) pour identifier automatiquement les zones Natura 2000/ZNIEFF au clic, avec timeout de 4 secondes et repli gracieux en cas d'échec ou de lenteur réseau
- Le formulaire navire/évitage n'apparaît désormais que si le point cliqué est à **moins de 100 m** d'une AOT existante ; au-delà, seules les coordonnées sont affichées
- **Retour en arrière** sur le marquage « À venir » des couches Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère : ces trois couches redeviennent affichables/masquables normalement dans la légende (seule leur non-détectabilité au clic reste documentée) — le marquage « À venir » n'était pertinent que pour la logique de détection au clic, pas pour l'affichage
- Ajout d'une entrée combinée unique « APB / zone de baignade / zone réglementaire », grisée et non sélectionnable, mention « À venir »
- Modales Port et ZMEL reformulées (« Pas d'AOT individuel sur cette zone ») ; ZMEL enrichie de données placeholder (`nb_postes`, `gestionnaire`, `mailto`)

### v1.1 — 16 septembre 2026
**Évolutions produit et correction de bug de détection terre/eau**
- Bifurcation d'accueil reformulée : « Tout d'abord, regarder si un emplacement en port ou ZMEL est possible ? »
- Sélecteur de fond de carte limité aux fonds Simple et Aérien (retrait de Simple (OSM), Désaturée, et des surcouches Cadastre/Limites administratives/Courbes de niveau)
- Légende : « Herbiers de posidonie » renommé « Herbiers de posidonie et de zostère »
- Suppression de la couche « Réserves naturelles nationales »
- Panneau « Mon mouillage » : « Profondeur retenue » renommé « Colonne d'eau à marée haute (m) », « Longueur de chaîne filée » renommé « Longueur de la ligne de mouillage » (formule et valeurs du menu déroulant inchangées)
- **Correction de bug :** la détection terre/eau (`estSurLEau`) ne fonctionnait pas correctement sur le fond Aérien (aucune couche vectorielle d'occupation du sol/bâti sur ce fond, donc un clic sur la terre loin d'une route n'était jamais détecté). Ajout d'une carte fantôme, invisible, en permanence calée sur le fond Simple et synchronisée avec la carte visible, utilisée pour tous les tests terre/eau quel que soit le fond affiché. Ajout d'une confirmation positive par couleur de pixel (RVB 183,225,214 = mer sur le fond Simple)
- Couches « Parcs naturels marins », « Aires marines protégées » et « Herbiers de posidonie et de zostère » marquées « À venir » : case grisée et désactivée, aucun chargement de source, en attendant une source permettant d'identifier la zone au clic (l'API Carto IGN, module *nature*, a été testée et couvre Natura 2000 et ZNIEFF mais pas ces trois couches) — **revenu sur ce point en v1.2** : le marquage a été restreint à la seule logique de détection au clic, l'affichage normal de ces trois couches a été rétabli

### v1.0 — 4 septembre 2026
**Correction de régression:** Ports/ZMEL interactifs
- Ajout de try-catch autour des attachements d'événements
- Vérification que les couches existent avant d'attacher les handlers
- Protection contre l'accès à des arrays vides
- Logs console pour diagnostiquer les erreurs
- Suppression des doublons mouseenter/mouseleave

**Commit:** `"Fix: restore port/ZMEL click and hover interactions"`

---

## 12. Contact et support

**Repository GitHub:** https://github.com/nicolas-viennot-beta/carte-mouillage-amidomar/

**URL en production:** https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/

**Responsable projet:** Nicolas Viennot (nviennot@gmail.com)

---

**Dernière mise à jour:** 25 septembre 2026