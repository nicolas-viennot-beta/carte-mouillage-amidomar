# Carte AMIDOMAR — Documentation Fonctionnelle

**Version:** 2.31 (octobre 2026)  
**Dernière mise à jour:** 26 octobre 2026  
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
- Permettre à un titulaire d'AOT de **retrouver son mouillage existant** et d'en vérifier le contexte réglementaire et environnemental *(v2.26)*

### Public cible
- **Principal:** Plaisanciers non experts cherchant un mouillage
- **Principal également *(v2.26)*:** Plaisanciers **déjà titulaires** d'une AOT, qui viennent vérifier si leur dispositif est adapté au site — notamment avant une demande de poursuite d'occupation. La carte les accueille par une marche à suivre dédiée, accessible à l'URL `?vue=existant` (voir §3 et §8)
- **Secondaire:** Instructeurs DDTM consultants l'outil

---

## 2. Disposition de l'interface

### Gauche — Contrôles cartographiques
- 🔍 **Recherche** — un seul champ pour localiser : commune, lieu-dit ou **coordonnées GPS** (voir §4.6)
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
- **Popup de coordonnées** (bas à gauche) — deux commandes en haut à droite depuis la **v2.27** : « Réduire ▾ » et « Effacer le point ✕ » (anciennement « Fermer »). Réduit, le popup devient une barre d'une ligne, au même endroit, portant le nombre de points à vérifier et les coordonnées ; cliquer dessus le redéploie. Voir §4.2

---

## 3. Parcours utilisateur

> **Deux portes d'entrée, une seule carte *(v2.26)*.** L'URL sans paramètre s'adresse à l'usager qui **cherche** un emplacement ; l'URL `?vue=existant` à celui qui en **occupe déjà un** et vient le vérifier. Seule la modale d'accueil change — tout le reste de la carte (clic, popup, couches, copie des coordonnées) est identique dans les deux cas. Voir §8 pour les URL et §3 Étape 0bis pour le contenu de la seconde modale.

### Étape 0 — Orientation (modale d'accueil)
- Modale « *Choisir un emplacement de mouillage en 4 étapes* » (v2.12 ; « Fonctionnement de la carte pour un choix d'emplacement de mouillage responsable » auparavant)
- Quatre étapes numérotées, une seule phrase chacune, l'action en gras :
  1. **Recherchez ou zoomez** sur le secteur qui vous intéresse. Le champ de recherche accepte une commune, un lieu-dit ou des coordonnées GPS (ex. 43.267710, 6.622611).
  2. *(bloc vert)* **Regardez d'abord si un port ou une ZMEL vous convient** : c'est de loin l'option la moins dommageable pour les fonds marins. Cliquez dessus pour savoir comment faire une demande.
  - Intertitre : « Si aucun port ni ZMEL ne convient : »
  3. **Cliquez sur l'emplacement** où vous souhaitez mouiller : la carte vous indique les interdictions, les recommandations et les mouillages voisins trop proches.
  4. **Copiez les coordonnées GPS** et collez-les dans votre formulaire de demande d'AOT mouillage.
- Les étapes 1 et 2 sont des consignes fixes ; les étapes 3 et 4 suivent l'état du parcours (✓ quand un emplacement est choisi, puis quand les coordonnées sont copiées). Depuis v2.13, tout nouveau clic sur la carte les remet à zéro : un clic refusé (cultures marines, arrêté de protection de biotope) laisse l'étape 3 « en cours », et un nouvel emplacement accepté décoche l'étape 4 tant que ses coordonnées n'ont pas été copiées. La saisie du navire n'est plus une étape de la marche à suivre (le formulaire reste affiché à moins de 100 m d'une AOT, voir §4)
- Bouton « Commencer » en bas de la modale
- Se ferme par « Commencer », ✕, Échap, ou clic extérieur
- Réouvrable via le bouton ❓

### Étape 0bis — Orientation « mouillage existant » *(v2.26)*

Affichée **à la place** de la modale ci-dessus quand l'URL porte `?vue=existant`. Elle s'adresse à l'usager qui occupe déjà un emplacement : l'étape « port ou ZMEL » n'a pas de sens pour lui, et son point de départ n'est pas la carte mais une coordonnée qu'il possède déjà.

- Titre : « *Visualiser votre mouillage actuel* »
- Trois étapes numérotées, même gabarit visuel que la modale par défaut (puce, action en gras) :
  1. **Récupérez les coordonnées GPS** de votre mouillage actuel (dans le formulaire de demande de poursuite ou dans votre arrêté d'AOT), au format décimal (ex. 43.267710, 6.622611).
  2. **Collez-les dans le champ de recherche** en haut de la carte, puis validez : la carte se centre sur votre emplacement.
  3. **Vérifiez les données contextuelles** affichées — interdictions, recommandations, mouillages voisins — pour savoir si votre dispositif actuel est adapté au site.
- Les étapes 1 et 3 sont des consignes fixes ; **l'étape 2 est la seule étape suivie** (elle porte l'identifiant `et-0` et passe au ✓ dès qu'un emplacement est défini, par recherche ou par clic). Il n'y a pas d'étape « copier les coordonnées » : l'usager arrive avec les siennes, le parcours s'arrête à la vérification.
- Bouton « Visualiser mon mouillage » (au lieu de « Commencer »), mêmes fermetures (✕, Échap, clic extérieur) et même réouverture par le bouton ❓.
- Aucun lien de bascule vers l'autre parcours n'est proposé dans la modale : les deux portes d'entrée sont indépendantes, chacune diffusée dans son propre contexte (document de démarche, page du site).

> **Pourquoi l'étape 2 passe par le champ de recherche et non par un clic** : la coordonnée de l'arrêté est précise au dix-millionième de degré. La retrouver à l'œil sur la carte produirait un point voisin mais faux ; la saisir dans le champ de recherche rejoue exactement le traitement du clic à la bonne position (voir §4.6).

### Étape 1 — Cliquer sur la carte
Un clic sur la carte déclenche désormais un **traitement unifié**, quel que soit l'endroit cliqué (voir §4.1 pour le détail de la cascade). **Depuis la v2.25**, saisir des coordonnées GPS dans le champ de recherche produit exactement le même traitement : la carte se centre sur le point, puis le clic est rejoué à cet endroit (voir §4.6). Tout ce qui suit vaut donc pour les deux gestes.

1. **Clic sur un port ou une ZMEL** → la modale dédiée s'ouvre directement (comportement inchangé, voir §4.1.a). Pas de coordonnées, pas de popup d'environnement.
2. **Clic à terre** → popup rouge « Vous êtes à terre », pas de coordonnées (inchangé, voir §4.4).
3. **Clic sur une zone de cultures marines** → popup rouge d'interdiction, pas de marqueur ni de coordonnées : un mouillage individuel n'y est pas envisageable.
4. **Clic ailleurs sur l'eau** → un bref message « Vérification de la zone… » s'affiche d'abord, le temps d'interroger le WFS de la Géoplateforme sur les **arrêtés de protection de biotope (APB)** (voir §4.3bis) :
   - **Si le point est dans un APB** → popup rouge d'interdiction (même traitement que les cultures marines), nommant l'arrêté : pas de marqueur, pas de coordonnées.
   - **Sinon** (aucun APB, ou service indisponible/trop lent : défaut non bloquant) → un marqueur est posé, les coordonnées GPS s'affichent, et un popup contextualisé s'ouvre au-dessus des coordonnées (voir §4.2) :
     - Interrogation des zones Natura 2000 / ZNIEFF au point cliqué (API Carto IGN, avec repli sur le WFS de la Géoplateforme, voir §4.3) → popup vert (« pas de contre-indication identifiée ») ou neutre/orange (zone(s) trouvée(s), listées) selon le résultat, avec dans tous les cas une mention rappelant que certaines zones (parcs naturels marins, aires marines protégées, herbiers, baignade, zones réglementaires...) ne sont pas détectables automatiquement et doivent être vérifiées par ailleurs.
   - Si le point cliqué est à **moins de 100 m d'une AOT existante** — vérification silencieuse, indépendante de la case « AOT de mouillage existantes » —, la modale devient plus concise *(v2.5)* : le bloc environnement est réduit à une ligne avec un bouton « Détails » (replié par défaut), et un bloc orange « D'autres mouillages sont enregistrés à proximité » intègre les deux champs du calcul ; le résultat vert ou rouge s'affiche dessous (voir §4.0 C6 et §4.2). Au-delà de 100 m, rien ne s'affiche : le risque de conflit avec un mouillage existant est jugé négligeable et on ne complexifie pas inutilement le parcours.
5. Bouton « Copier » dans le popup pour copier les coordonnées
6. Bouton « Réduire » en haut à droite du popup *(v2.27)* : masque le contenu sans rien perdre — le marqueur, les coordonnées et les saisies restent en place — et laisse une barre résumant ce qui a été détecté ; un clic sur cette barre redéploie le panneau. Cliquer un autre point laisse la barre réduite et la met à jour — voir §4.2
7. Bouton « Effacer le point » en haut à droite du popup *(v2.1, renommé en v2.27 — il s'appelait « Fermer »)* : désélectionne entièrement le point (marqueur, coordonnées, cercle d'évitage) ; les valeurs du calcul d'évitage sont **conservées** *(v2.3)* — voir §4.2

### Étape 2 — Copier ce qu'il faut reporter *(revu en v2.16)*
1. Le bas du popup porte un bloc « À reporter dans le formulaire de demande », distinct du contexte environnemental
2. Chaque valeur y a son propre bouton « Copier » : le nom de la zone Natura 2000 (quand il y en a une) et les coordonnées GPS
3. Les coller directement dans le formulaire Démarches Numériques

> Seule la copie des **coordonnées** valide l'étape 4 de la marche à suivre : c'est d'elle que parle l'étape, et toutes les positions n'ont pas de nom de zone à reporter.

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
| C4 | Parcelle de cultures marines (cadastre conchylicole d'une DDTM) | Popup rouge, sans marqueur ni coordonnées *(donnée réelle depuis v2.18)* |
| C4 bis | Arrêté de protection de biotope (APB) | Popup rouge, sans marqueur ni coordonnées |
| C5 | Tout autre point sur l'eau *(v2.19 : une information absente n'affiche plus rien — pas de carte « aucun zonage détecté », et pas de bloc du tout si aucune carte n'a lieu d'être)* | Marqueur, puis popup en deux parties *(v2.16)* : « Contexte environnemental » (une carte repliable par information) et « À reporter dans le formulaire de demande » (nom de la zone et coordonnées, chacun avec son bouton « Copier ») |
| C6 | Point C5 situé à moins de 100 m d'une AOT existante | Même popup que C5, plus un bloc de proximité, qui se réduit au résultat une fois le calcul fait (v2.7), avec repli différé automatique après une pause de frappe (v2.8) |

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

#### C4 — Parcelle de cultures marines *(réécrit en v2.18)*
- Popup rouge : « **Vous êtes sur une parcelle de cultures marines — parcelle {parcelle}.** » puis, si le département publie ces champs, « {commune}, {espece}. » puis « Cette parcelle du domaine public maritime est déjà concédée : aucun mouillage individuel n'y est autorisable. Veuillez sélectionner un autre emplacement. » et enfin, en petit : « Source : cadastre conchylicole de la DDTM {departement} ({millesime}). »
- Variables lues dans le cadastre conchylicole de la DDTM, au clic : `{parcelle}` = `CM1PAR`, `{commune}` = `COMMUNE` (absent en Charente-Maritime), `{espece}` = `ESPECE`. `{departement}` et `{millesime}` viennent du registre `CADASTRES_CM` du code.
- Jusqu'en v2.17, ce cas reposait sur un **polygone fictif** de `data/cultures-marines.geojson` : l'interdiction s'affichait sur une zone inventée en rade d'Hyères, et nulle part ailleurs. Fichier supprimé en v2.18. Mécanisme : voir §4.3ter.
- Quatre autres issues, qui ne bloquent pas le clic et s'affichent en carte repliable dans le contexte environnemental (C5) : **parcelle à moins de 40 m** → « Parcelle de cultures marines à {n} m » *(v2.21)* ; parcelle absente → rien n'est dit ; secteur sans cadastre publié → « Cultures marines : non vérifiées ici » ; flux injoignable → « Cultures marines : vérification impossible ».

#### C4 bis — Arrêté de protection de biotope (APB)
- Pendant la vérification réseau : « *Vérification de la zone…* » (teinte neutre).
- Si le point est dans un APB, popup rouge : « **Vous êtes dans un arrêté de protection de biotope — {noms des arrêtés}.** » puis « Cette zone est interdite au mouillage. Veuillez sélectionner un autre emplacement. » Mécanisme : §4.3bis.

#### C5 — Autre point sur l'eau : contexte environnemental et valeurs à reporter *(réorganisé en v2.16)*

Le popup se lit en deux parties titrées, pour qu'on distingue d'un coup d'œil ce qui est une information de ce qui est une action.

**Partie 1 — « Contexte environnemental ».** Une carte par information, **toutes repliées au départ** (décision de Nicolas, 13/10/2026). Chaque carte montre un titre, une ligne de conséquence et un bouton qui déplie le détail. La ligne repliée porte déjà l'essentiel : c'est ce qui rend le repli acceptable, un bandeau replié qui ne dirait rien obligerait l'usager à cliquer pour savoir s'il doit cliquer.

**Deux groupes, les faits d'abord** *(v2.28)*. Les cartes qui **constatent** quelque chose restent sous « Contexte environnemental ». Celles qui disent que la vérification **n'a pas pu avoir lieu** — point hors couverture de la source, ou service injoignable — passent sous un second intitulé, « Ce que la carte n'a pas pu vérifier », en retrait et plus discret, et sont rendues en **gris neutre avec un filet gauche pointillé** (`env-carte--incertain`). Ce traitement les sort du registre du constat sans les effacer : les supprimer ferait croire qu'il n'y a rien là où on ne sait pas. **Le tri se fait sur la classe posée par `carteEnv`, pas sur le libellé** — un titre se reformule, une classe est contractuelle. Si un groupe est vide, son intitulé ne s'affiche pas. Quatre cartes sont concernées à ce jour : nature du fond non cartographiée, cultures marines non vérifiées, cultures marines injoignables, zonages de protection injoignables. Elles restent des `.env-carte` : le compte « N points à vérifier » de la barre réduite les inclut, ce qui est exactement ce que ce libellé promet.

Deux couleurs seulement, et elles portent un sens : **bleu** pour les zonages de protection — quel que soit leur nombre, Natura 2000 et ZNIEFF étant de même nature —, **sable** pour la nature du fond, qui est un conseil et non une contrainte. **Gris-bleu** pour les usages de la mer *(v2.18)*. Le rouge est réservé aux interdictions (C3, C4, C4 bis), qui ne sont pas des cartes mais colorent tout le bloc. Plus de vert depuis la v2.19 : « rien de détecté » ne s'affiche plus du tout.

| Carte | Couleur | Ligne repliée | Bouton | Détail déplié |
|---|---|---|---|---|
| Natura 2000 | bleu | « **Site Natura 2000** — {noms des sites} » / « étude d'incidence à prévoir » | « Ce que ça implique » | « Une étude d'incidence sera réalisée suite à votre demande. Le nom de la zone est à reporter dans le formulaire : il est repris ci-dessous, avec un bouton pour le copier. » |
| ZNIEFF | bleu | « **ZNIEFF** — zone naturelle sensible » / « rien à reporter dans le formulaire » | « Ce que ça implique » | « Zone Naturelle d'Intérêt Écologique, Faunistique et Floristique. Cette zone est sensible, merci d'adopter des pratiques de mouillage durables. » |
| Aucun zonage | — | **rien n'est affiché** *(v2.19)* : l'absence de carte dit déjà qu'il n'y a rien. Si aucune carte n'a lieu d'être, le bloc entier disparaît, titre compris | — | — |
| Vérification impossible | bleu | « **Zonages de protection : vérification impossible** » / « service distant momentanément injoignable » | aucun | — |
| Cultures marines non vérifiées ou injoignables | gris-bleu | voir §4.3ter | « Que faire ici » | voir §4.3ter |
| Nature du fond | sable | voir §4.4bis | « Comment mouiller ici » ou « Que faire ici » | voir §4.4bis |

Le bouton reprend son libellé d'origine quand on replie ; déplié, il affiche « Masquer ». Les libellés nomment une **action** et non un contenu (« Ce que ça implique » plutôt que « Détails ») : un verbe appelle le clic, un nom ne l'appelle pas.

Pendant l'interrogation, le bloc affiche « *Vérification des zonages environnementaux…* ».

**Partie 2 — « À reporter dans le formulaire de demande ».** Un cadre à deux lignes, chacune avec sa valeur et son bouton « Copier » (« Copié ! » pendant 2 s) :
- « Nom de la zone Natura 2000 » → `{noms des sites}`. **Cette ligne disparaît s'il n'y a pas de site Natura 2000** : les ZNIEFF n'ont pas de nom dans la source (message générique), afficher une ligne vide serait pire que l'omettre.
- « Coordonnées GPS en degrés décimaux (DD) » → `{lat}, {lng}` à 6 décimales. Seul le couple de valeurs est copié, pas le libellé.

> **Retiré en v2.16** : la mention « D'autres zonages (Herbiers de posidonie et de zostère, Parcs naturels marins, Aires marines protégées, zones de baignade ou réglementaires) […] vérifiez-les visuellement » (décision de Nicolas, 13/10/2026, pour alléger). Ces zonages restent affichables dans la légende, et leur absence de vérification automatique reste documentée au §4.1.d et au §5. Le seul rappel conservé dans le popup est celui sur les herbiers, porté par la carte « nature du fond ».

#### C6 — Proximité d'une AOT existante (< 100 m)
Détection silencieuse (indépendante de la case « AOT de mouillage existantes »). Tout se passe dans la modale centrale : le popup de C5, puis le bloc de proximité, qui se réduit au résultat une fois le calcul fait (v2.7). Mécanisme et formule : §4.2.

> **Retiré en v2.16** : le « bloc environnement réduit à une ligne » introduit en v2.5 pour ce cas, avec son bouton « Détails ▾ » et ses quatre titres de synthèse. Il n'avait plus d'objet — depuis la v2.16, le contexte est présenté en cartes qui tiennent déjà sur une ligne chacune, qu'un mouillage soit proche ou non. Le popup de C6 est donc exactement celui de C5, augmenté du bloc de proximité.

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
Voir §4.4 — popup rouge, aucune coordonnée (depuis la v2.16, c'est tout le bloc « À reporter dans le formulaire de demande » qui est masqué). **Depuis la v2.14**, un verdict « à terre » de la détection locale n'est plus définitif : il est soumis au trait terre-mer du Shom (§4.4.2), qui place l'estran du côté mer. Un point confirmé sur le DPM lève l'avertissement et le clic se poursuit dans la cascade normale (cultures marines, APB, puis zones protégées). Un point confirmé à terre, ou un service Shom injoignable, conserve le comportement d'avant.

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

> **Titre et place du bloc** *(v2.30)*. Le bloc porte l'intitulé **« Mouillages voisins »**, au même format que « Règles locales » et « Contexte environnemental » : il nomme ce qui déclenche le bloc — d'autres mouillages sont enregistrés à moins de 100 m — et non le calcul, qui en est le contenu. Il se place **entre les deux groupes de cartes**, après « Contexte environnemental » et avant « Ce que la carte n'a pas pu vérifier » : il énonce un fait constaté, il n'a donc rien à faire après des aveux d'ignorance. `placerBlocEvitage()` déplace le nœud (il ne le recrée pas, pour ne pas perdre les saisies ni les écouteurs) et ne le fait **que** dans le mode « cartes » ; sur un point à terre, une interdiction ou pendant le message d'attente, `#env-block` est une boîte colorée et le bloc reste dessous.

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

**Réduction du popup** *(v2.27)* : un bouton « Réduire ▾ » est placé à gauche de « Effacer le point ✕ », dans un bandeau d'actions commun (`#coords-actions`). Les deux commandes ne font **pas** la même chose, et c'est l'objet de l'évolution : effacer désélectionne le point, réduire ne touche à rien. L'usager qui voulait seulement **regarder la carte sous le panneau** — vérifier la côte, situer son emplacement — n'avait d'autre issue que de fermer, donc de perdre son point et de tout recommencer (demande de Nicolas, 15/10/2026).

- **Mécanisme** : `reduirePopup(reduit, opts)` pose ou retire la classe `.reduit` sur `#coords-popup`. Aucun état applicatif n'est modifié — `position`, `marker`, le cercle d'évitage, la longueur du navire saisie et l'estimation de colonne d'eau restent intacts. Rouvrir redonne exactement le panneau quitté. `opts.focus` (déplacer le focus) et `opts.degager` (rappeler `degagerPointSousPopup()`) valent `true` par défaut et sont mis à `false` sur le chemin piloté par la carte — voir plus bas.
- **Rendu réduit** : en CSS, `.reduit` masque tous les enfants du popup sauf la barre `#coords-resume` et le bandeau d'actions, et fait passer le popup en `display:flex` sur une seule ligne, à la même ancre (bas à gauche) — l'usager retrouve son panneau là où il l'a laissé. Un filet sépare la barre du bouton destructeur, qui reste accessible sans redéployer.
- **Contenu de la barre** (`majResumeReduit()`) : une première ligne compte les informations détectées — « **3 points à vérifier** », accord singulier à 1 — en comptant les `.env-carte` réellement présentes dans `#env-block` (contexte environnemental **et** règles locales : c'est ce que l'usager retrouvera en rouvrant). Dessous, les coordonnées du point, en monospace : c'est la valeur à recopier dans le formulaire, donc celle qu'on veut garder sous les yeux. **Un bandeau qui annonce ce qu'il cache donne une raison de le rouvrir** ; un bandeau muet n'en donne aucune.
- **Pourquoi « points à vérifier » et non « recommandations »** *(arbitrage de Nicolas après relecture UX, 15/10/2026)* : le compte inclut la carte des règles locales, qui énonce une **obligation**, et des cartes qui constatent une **absence de donnée** (« nature du fond non cartographiée ici »). Les appeler « recommandations » promettait un conseil là où il y a une règle ou un trou — inacceptable sur un produit dont l'objet est la compréhension réglementaire. « À vérifier » reste vrai dans les trois cas.
- **États sans carte** : « 0 point à vérifier » se lirait comme « rien à signaler ». Chacun a donc son libellé — « Mouillage interdit ici » (bloc rouge : APB, parcelle conchylicole), « Vous êtes à terre » (classe `.terre`, sans coordonnées, comme le panneau déplié), « Vérification en cours… » pendant les appels réseau (drapeau `verifEnCours`), et « Emplacement sélectionné » en gris lorsqu'il n'y a effectivement rien à signaler.
- **L'alerte de recoupement prime sur le compte** : l'avertissement « votre rayon d'évitage en recoupe d'autres » vit dans `#coords-hint` (classe `.alerte` sur le popup), qui n'est pas une carte. Sans traitement particulier, replier le panneau le faisait disparaître et la barre annonçait sereinement « 2 points à vérifier ». La barre affiche donc « Recoupement possible » dès que cette classe est posée. Comme `recalculer()` peut la poser **après** l'affichage des cartes, `majResumeReduit()` est rappelée en fin de `traiterPointCarte`.
- **Mise à jour différée** : les cartes arrivent après des appels réseau. `afficherEnvironnement()` rafraîchit donc la barre si le panneau a été réduit entre-temps.
- **Un nouveau clic laisse le panneau réduit** *(arbitrage de Nicolas après relecture UX, 15/10/2026 — la première écriture redéployait à chaque clic)* : seule la barre se met à jour. Redéployer à chaque clic est défendable pour un primo-usager, mais va contre celui qui a précisément réduit **pour pouvoir cliquer ailleurs** et compare trois emplacements candidats. **Deux exceptions** (`deplierSiReduit()`) : point **à terre** et point **interdit** (APB, parcelle conchylicole) — ce sont des verdicts, pas des détails, et les laisser derrière une barre d'une ligne reviendrait à les cacher. Le redéploiement commandé par la carte ne déplace **pas** le focus (ce serait un vol en plein geste, enjeu iframe du §11 v2.25.1) et n'appelle **pas** `degagerPointSousPopup()` : à cet instant `position` contient encore l'ancien point, la carte glissait donc une première fois pour rien.
- **Signal de mise à jour** : la barre ne bougeant pas quand l'usager clique ailleurs, un bref fond `#e8edff` (classe `.maj`, 700 ms) signale qu'elle a changé — sans lui, l'usager doute d'avoir cliqué. Transition désactivée sous `prefers-reduced-motion`.
- **Pas de repli automatique** : réduire reste une action de l'usager, jamais de la carte.
- **Échap et « Effacer le point »** sont inchangés depuis l'état réduit : les deux ferment le popup et désélectionnent. `fermerPopupCoordonnees()` retire aussi `.reduit`, pour que la prochaine ouverture reparte dépliée — l'état réduit vaut pour l'emplacement qu'on vient d'abandonner, pas pour le suivant.

**Pourquoi « Fermer » est devenu « Effacer le point »** *(v2.27, suite à une relecture UX/DSFR)* : le bouton ne masque pas un panneau, il détruit la sélection (marqueur, position, cercle d'évitage, saisies) sans confirmation ni annulation. Tant qu'il était seul, « Fermer » passait ; posé à côté de « Réduire », qui est anodin et de même apparence, il devenait un piège — pour un plaisancier qui a saisi la longueur de son navire et obtenu une estimation, une chance sur deux de tout perdre. Le DSFR applique la même règle dans ses alertes, où le bouton de fermeture dit « Masquer le message » : **le libellé nomme l'effet, pas le geste.** Le survol du bouton destructeur passe en teinte d'avertissement (`#ffe9e6` / `#b34000`) et non d'erreur : effacer son point n'est pas une faute, c'est une perte.

**Accessibilité de la réduction** *(corrections issues de la relecture UX/DSFR du 15/10/2026 — trois défauts de la première écriture)* :
- **Ordre du DOM = ordre visuel.** `#coords-resume` est placée **avant** `#coords-actions` dans le HTML, sans propriété `order`. La première écriture faisait l'inverse et réordonnait en CSS : la tabulation suivant le DOM et non `order`, la première tabulation dans l'état réduit tombait sur l'action destructrice (WCAG 2.4.3 / 1.3.2). Dans l'état déplié, la barre est en `display:none` : sa place dans le DOM n'a aucun effet visuel.
- **Pas d'`aria-label` sur la barre.** Un `aria-label` **remplace** le contenu dans le calcul du nom accessible : un lecteur d'écran n'entendait ni le compte, ni les coordonnées — tout ce que la barre existe pour dire. Le préfixe `<span class="sr-only">Rouvrir le panneau — </span>` complète le texte visible au lieu de l'écraser, et le nom accessible contient donc le libellé visible (WCAG 2.5.3 ; pilotage vocal fonctionnel).
- **`aria-expanded` sur les deux boutons**, et `aria-controls` pointant vers `#coords-contenu`, nouveau conteneur qui enveloppe tout ce qui se replie (`#env-block`, `#boat-block`, `#coords-hint`, `#report-block` — les deux premiers y sont injectés par le script). Dans la première écriture, seul `#coords-reduire` portait l'attribut, et il passait en `display:none` au moment même du repli : la valeur `"false"` était écrite sur un élément sorti de l'arbre d'accessibilité, l'état replié n'existait donc pas pour un lecteur d'écran.
- **Anneau de focus explicite** (`:focus-visible`, `2px solid #0a76f6` avec `outline-offset:2px`, comme le DSFR) sur les trois commandes : le focus étant déplacé par programme à chaque bascule, l'anneau par défaut du navigateur — fin et variable selon l'OS — ne suffisait pas sur un panneau blanc posé sur une carte.
- **Cibles et espacement** : `min-height:32px` (le plus petit bouton DSFR, `fr-btn--sm`) là où elles faisaient 22 et 27 px, et `gap:8px` au lieu de 2 px — 2 px était hors de l'échelle d'espacement DSFR et, surtout, c'était l'écart séparant une action anodine d'une action destructrice sur écran tactile.
- **Bandeau d'actions dans le flux** et non plus en positionnement absolu : sa place était réservée par un `padding-top` figé de 30 px, alors que le bandeau grandit avec le texte — à 200 % d'agrandissement de texte seul, les boutons recouvraient la première carte (RGAA 10.4). `flex-wrap` permet au bandeau de passer sur deux lignes plutôt que de déborder.
- **Filet séparateur lisible** : `#929292` (3,1:1) au lieu de `#e5e5e5` (1,26:1). Le trait chargé de distinguer la commande destructrice était en pratique invisible, et sous le seuil de 3:1 d'un élément porteur d'information (WCAG 1.4.11).
- **`type="button"`** sur les deux commandes, et `role="region" aria-label="Emplacement sélectionné"` sur le popup, qui devient un repère retrouvable — utile en iframe.

> **Points relevés par la relecture UX/DSFR et volontairement laissés de côté** (hors périmètre de la v2.27, à traiter dans un passage DSFR dédié) : `.copy-btn` en `#1a73e8` (bleu Google) et `#2e7d32` (vert Material) au lieu de Bleu France `#000091` / `#18753c`, alors que c'est le bouton qui mène au formulaire DN ; tailles de texte à 10 et 11 px sous le plancher DSFR de 12 px, et en px plutôt qu'en rem ; six teintes « presque DSFR » (`#f0f4ff`, `#e8f5ec`, `#fff4ed`, `#00838f`, `#595959`, `#1e1e1e`) ; absence de `:focus-visible` sur les autres éléments interactifs du panneau ; absence de message de statut (`aria-live`) à la copie et à l'ouverture du panneau ; `.env-toggle-bloc { color:inherit }` sans effet, la teinte étant posée sur `.env-carte-resume` et non sur un ancêtre du bouton. Restent aussi à arbitrer : Échap qui détruit la sélection depuis la barre réduite, les coordonnées de la barre non sélectionnables à la souris (elles sont dans un `<button>`), et « Vous êtes à terre » qui décrit l'usager plutôt que le point.

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
- **Menée en parallèle des cultures marines depuis la v2.18** (§4.3ter) : deux interdictions, un seul temps d'attente
- **Message affiché :** popup rouge (même traitement que les cultures marines), nommant l'arrêté : « Vous êtes dans un arrêté de protection de biotope — *nom*. Cette zone est interdite au mouillage. »
- **Non vérifié :** aucun clic réel sur la carte publiée n'a encore été fait dans un véritable APB (le test ci-dessus interroge directement le service, pas la carte) ; à confirmer après déploiement

### 4.3ter Cultures marines — cadastre conchylicole des DDTM *(v2.18)*

Vérification **bloquante**, en réseau, menée **en parallèle de l'APB** (§4.3bis) : les deux sont des interdictions, l'une n'a pas à attendre l'autre. Une parcelle de cultures marines est une parcelle du domaine public maritime déjà concédée à un tiers : aucune AOT individuelle n'y est autorisable.

**Pourquoi pas de source nationale — relevés du 13 octobre 2026.**

| Source | Volume | Interrogeable depuis un navigateur ? |
|---|---|---|
| Couche « fermes marines » (MARCUL) du Shom | 747 polygones, aucun nom de parcelle | oui, mais ce sont les installations portées sur la carte marine, pas le cadastre administratif |
| Cadastre aquacole national, Cerema/Géolittoral | 37 612 polygones, 6 792 linéaires, 65 points — soit 50 fois le Shom | **non** : aucun en-tête CORS, aucune géométrie renvoyée, ni WMS ni WFS sur ce service |
| Flux WMS national de Géolittoral | 207 couches interrogeables | oui, mais **ne contient pas** le cadastre (seulement le schéma départemental des structures) |
| Cadastres départementaux des DDTM, sur GéoIDE | 1 406 à 13 391 parcelles selon le département | **oui** : WFS 2.0.0 et WMS, en-têtes CORS présents, Licence ouverte 2.0 — c'est la source retenue |

Le cadastre aquacole national du Cerema est bien la version harmonisée des fichiers DDTM (téléchargeable : `cadastre_2026.zip` sur Géolittoral), mais il n'est pas appelable depuis une page web. Les cadastres départementaux le sont : c'est donc eux que la carte interroge, département par département.

**Registre `CADASTRES_CM`** (dans `index.html`, déclaré **avant** le tableau `COUCHES` qui s'en sert — ordre à conserver, sous peine d'erreur d'initialisation) :

| Dép. | Couche | Entités | Millésime | Champs lus |
|---|---|---|---|---|
| 29 Finistère | `L_CADASTRE_CONCHYLICOLE_S_029` | 1 406 | juin 2026 | `CM1PAR`, `COMMUNE`, `ESPECE`, `NATURE_EXP` |
| 35 Ille-et-Vilaine | `L_CADASTRE_CONCHYLICOLE_S_035` | 2 194 | mars 2024 | idem |
| 17 Charente-Maritime (surfaces) | `L_CADASTRE_CONCH_S_017` | 13 391 | février 2023 | `CM1PAR`, `ESPECE` seulement |
| 17 Charente-Maritime (linéaires) | `L_CADASTRE_CONCH_L_017` | 1 254 | février 2023 | `CM1PAR`, `ESPECE` seulement |

Chaque entrée porte son `emprise` WGS84, telle que déclarée par le `GetCapabilities` du flux : un clic hors de cette emprise n'engendre **aucune requête**. Un clic en Charente-Maritime en engendre deux (surfacique et linéaire), menées en parallèle.

**Mécanique de la requête.**
- `BBOX` et non `INTERSECTS` : MapServer ne gère pas `CQL_FILTER` (propre à GeoServer)
- **Ordre des axes :** en WFS 1.1.0 et `EPSG:4326`, la `BBOX` attend **latitude puis longitude** — vérifié sur ces flux le 13/10/2026. Même piège que celui déjà relevé sur `patrinat_apb:apb` (§4.3bis)
- Rayon de la boîte envoyée : `CONFIG.proximiteCulturesMarines` (40 m) pour **toutes** les couches depuis la v2.21 — la requête sert désormais à la fois au blocage et à la détection de voisinage. Jusqu'à 20 entités sont demandées, et c'est la plus proche qui est retenue
- **La distance est mesurée, pas déduite de la BBOX.** Les `<gml:posList>` renvoyés sont lus et la distance du point à chaque segment est calculée, en approximation plate (1° de latitude = 111 320 m, 1° de longitude = autant × cos(latitude)) : suffisant à quelques dizaines de mètres. Pour une couche surfacique, un test d'appartenance (lancer de rayon) met la distance à zéro quand le point est à l'intérieur ; pour une couche linéaire, on n'est jamais « dedans », seule la distance au tracé compte
- **MapServer filtre sur la géométrie réelle, pas sur le rectangle englobant** — vérifié le 14/10/2026 sur un bouchot diagonal de la baie du Mont-Saint-Michel : un point à 53 m de la parcelle mais à l'intérieur de son rectangle englobant ne renvoie rien. C'est ce qui rend la méthode utilisable : les bouchots sont des bandes diagonales dont le rectangle englobant couvre largement les couloirs entre parcelles, et un filtre par rectangle aurait signalé à tort tous ces couloirs
- Le WFS 1.1.0 ne répond qu'en GML (`application/json` renvoie une erreur) : la réponse est lue au `DOMParser`, champs repérés par nom local, sans dépendre du préfixe `ms:`
- Délai borné par `CONFIG.delaiCulturesMarines` = 4 000 ms. Latences mesurées : **147 ms** sur un point sans parcelle, **736 ms** au premier appel sur une parcelle

**Cinq issues, à ne pas confondre** — c'est le point important de cette fonctionnalité :

| Issue | Condition | Conséquence |
|---|---|---|
| `parcelle` | distance ≤ `CONFIG.blocageCulturesMarines` (5 m), ou point à l'intérieur du polygone | popup rouge, clic refusé (C4) |
| `proximite` *(v2.21)* | distance ≤ `CONFIG.proximiteCulturesMarines` (40 m) | carte d'information, **le clic n'est pas bloqué** |
| `aucune` | le flux a répondu, rien dans les 40 m | rien n'est dit : le silence vaut mieux qu'une ligne de plus |
| `horsFlux` | aucune emprise ne contient le point | carte « Cultures marines : non vérifiées ici » |
| `indisponible` | le flux n'a pas répondu, ou a renvoyé un `ExceptionReport` | carte « Cultures marines : vérification impossible » |

Quand deux flux couvrent le point (Charente-Maritime, surfacique et linéaire), c'est la parcelle **la plus proche** qui l'emporte.

**La parcelle voisine *(v2.21)*.** Jusqu'à la v2.19, la carte était binaire : sur la parcelle, ou silence. Un clic de Nicolas en baie du Mont-Saint-Michel, le 14/10/2026, à 36 m d'un parc à moules, ne disait rien — alors que le seul rayon d'évitage d'un voilier de 10 m dépasse cette distance et que la chaîne finirait sur les pieux. D'où une troisième voie : **signaler sans bloquer**. Rien n'interdit juridiquement de mouiller à côté d'une concession ; élargir le blocage aurait été refuser un emplacement licite.

- Carte affichée : « **Parcelle de cultures marines à {n} m** » / « votre rayon d'évitage peut l'atteindre », bouton « Que faire ici », détail « Il serait préférable d'envisager un autre emplacement. » puis, en petit, le numéro de parcelle, la commune, l'espèce et la DDTM source. Texte écrit par Nicolas le 14/10/2026 — ne pas le reformuler sans lui.
- Seuil : `CONFIG.proximiteCulturesMarines` = 40 m (choisi par Nicolas).

Un `ExceptionReport` est traité comme une **panne**, jamais comme une absence de parcelle : MapServer répond en HTTP 200 avec ce document, et le prendre pour un vide reviendrait à déclarer un secteur libre alors qu'on n'en sait rien. C'est exactement ce que renvoie aujourd'hui la DDTM 50 (voir plus bas).

**Départements sans flux exploitable, au 13 octobre 2026.**
- **Manche (50)** : le flux existe et répond au `GetCapabilities`, mais tout `GetFeature` plante — `msGetEncodedString(): Unknown identifier. Encoding not supported by libiconv (8859part1)`. Bug serveur côté GéoIDE, à signaler à la DDTM 50 : une fois corrigé, le département s'ajoute en une ligne du registre
- **Morbihan (56)** (mise à jour avril 2026), **Vendée (85)**, **Loire-Atlantique (44)**, **Gironde (33)** : fichier à télécharger seulement, pas de flux. Pour les intégrer, il faudrait héberger le fichier converti en GeoJSON dans `data/` et le remettre à jour à la main
- **Méditerranée** : la donnée nationale ne recense que 51 parcelles sur le Var et les Alpes-Maritimes réunis, et 7 en Corse. L'absence de flux y est donc peu gênante — mais la carte le dit quand même (issue `horsFlux`)

**Affichage.** Les mêmes quatre flux sont affichés en WMS sous l'unique case « Cultures marines » de la légende (`GetMap`, `EPSG:3857`, `image/png`, en-têtes CORS vérifiés le 13/10/2026). Le tableau `COUCHES` accepte depuis la v2.18 une **liste** de flux dans `tiles` : une source et une couche sont créées par flux, la case de légende les bascule ensemble.

### 4.4 Détection terre/eau

Depuis la v2.14, la détection se fait en **deux instances** : une détection locale instantanée (§4.4.1), puis, et seulement lorsque celle-ci annonce « à terre », un arbitrage par le **trait terre-mer du Shom** (§4.4.2). Motif : la détection locale classe les plages, dunes et marais comme de la terre, alors que l'**estran** — le haut de plage qui découvre à marée basse — relève du domaine public maritime et peut légitimement porter un mouillage. Les faux « vous êtes à terre » signalés par la DDTM des Côtes-d'Armor venaient de là.

**Refonte de la v2.17.** La première instance cherchait *la terre* et laissait passer tout point où elle n'en trouvait pas. Or la terre ordinaire n'est pas un objet du fond Plan IGN : un champ, une plage, une dune ou un bourg sans bâti au pixel cliqué ne portent aucun objet. Un clic en pleine campagne ressortait donc « indéterminé », c'est-à-dire autorisé, et n'était jamais soumis au Shom. Depuis la v2.17, c'est **l'eau** qui doit être prouvée : sans preuve d'eau et avec les tuiles chargées, le point est tenu pour terrestre, puis arbitré par le Shom comme depuis la v2.14. Le second verrou porte sur l'arbitrage lui-même : zéro objet renvoyé par le Shom ne vaut « mer » que si la couche couvre bien l'endroit (§4.4.2).

#### 4.4.2 Arbitrage par le trait terre-mer du Shom *(v2.14)*

- **Source:** couche WFS `LIMTM_2154_WFS:limite_terre_mer_france_metropolitaine_polygones` du service INSPIRE du Shom (`https://services.data.shom.fr/INSPIRE/wfs`). Aucune clé d'API, aucun conventionnement. Licence Ouverte Etalab v2.0.
- **Ce que porte la donnée:** d'après la métadonnée du produit, « la Limite terre-mer correspond à la laisse des plus hautes mers astronomiques (PHMA) dans le cas d'une marée de coefficient 120 et dans des conditions météorologiques normales […] elle correspond aussi à la limite haute du rivage en matérialisant le haut de l'estran ». C'est la définition du **DPM naturel** (art. L2111-4 du CGPPP), issue du croisement d'un modèle de PHMA et du MNT littoral Litto3D®/RGE ALTI®, à 1 à 5 m de résolution (échelle de saisie 1:2000).
- **Méthode:** la couche porte les **surfaces terrestres**. Un filtre `CQL_FILTER=INTERSECTS(geom,SRID=4326;POINT(lng lat))` renvoie donc **zéro objet si le point est côté mer** (estran compris) et un objet, avec son `numdep`, s'il est à terre. `propertyName=id,numdep` évite de rapatrier la géométrie : réponse de 150 à 300 octets, 25 à 250 ms mesurés sur les trois sites de test.
- **Test de couverture *(v2.17)*:** « zéro objet » ne suffit pas à conclure « mer ». La couche ne couvre que les **départements littoraux**, mais elle les couvre **entièrement**, jusqu'à leur limite intérieure : mesuré le 13/10/2026, Vire, Falaise et Lisieux (14), Évreux (27) et Rennes (35) renvoient bien 1 objet, tandis qu'Argentan (61), Laval (53), Niort (79), Paris et Lyon renvoient 0. Un point très à l'intérieur des terres serait donc lu comme « en mer ». Une **seconde requête est donc menée en parallèle** de la première, avec un filtre `DWITHIN(geom, point, CONFIG.rayonCouvertureShom, kilometers)` : y a-t-il de la terre cartographiée autour du point ? Des objets autour et zéro au point → mer ou estran, verdict fiable ; zéro au point **et** zéro autour → hors couverture, la fonction ne conclut pas et renvoie `null` (repli prudent). Les deux requêtes partagent le même `AbortController` et le même délai, donc la latence reste celle d'un seul appel.
- **Calibrage du rayon — 20 km *(recalibré le 14/10/2026)*:** le rayon de 5 km retenu le 13/10/2026 avait été calibré sur des points de mer tous proches du rivage. Il était trop court : signalé par Nicolas le lendemain, un clic sur l'estran de la **baie du Mont-Saint-Michel** déclenchait un faux « vous êtes à terre », de façon capricieuse — à marée basse le point cliqué est à plus de 5 km de toute terre cartographiée, et l'on franchit l'isoligne en quelques mètres. Sur 24 points tirés au hasard dans la baie, le Shom répondait « mer » 24 fois, mais le test de couverture à 5 km échouait **8 fois**.

  Relevé du 14/10/2026 (nombre d'objets renvoyés selon le rayon, pour un point sans objet au point lui-même) :

  | Point | 5 km | 10 km | 20 km | 30 km | 50 km |
  |---|---|---|---|---|---|
  | Large de Dunkerque | 0 | 0 | 1 | 1 | 1 |
  | Baie de Somme, nord de la baie du Mont-Saint-Michel | 0 | 1 | 1 | 1 | 1 |
  | Centre de la baie du MSM, rade de Brest, golfe du Morbihan, bassin d'Arcachon | 1 | 1 | 1 | 1 | 1 |
  | Niort (79) | 0 | 1 | 1 | 1 | 1 |
  | Argentan (61), Laval (53) | 0 | 0 | 1 | 1 | 1 |
  | Alençon (61), Angers (49), Chartres (28) | 0 | 0 | 0 | 0 | 1 |
  | Paris, Lyon, Le Mans (72), Poitiers (86) | 0 | 0 | 0 | 0 | 0 |

  **Aucun rayon ne sépare les deux cas** : la mer en exige au moins 20 km, les villes de l'intérieur moins de 10. Le choix se fait donc sur la conséquence, qui n'est pas symétrique — bloquer un plaisancier sur un estran légitime casse le cœur du service, ne pas avertir quelqu'un qui clique à Niort ne coûte rien. D'où **20 km**.
- **Risque résiduel assumé *(v2.17, révisé le 14/10/2026)*:** Niort, Argentan et Laval ne sont plus avertis ; Paris, Lyon, Le Mans, Poitiers, Chartres, Alençon et Angers le restent. **Piste pour supprimer ce compromis**, si le besoin s'en fait sentir : résoudre le département du point (ADMINEXPRESS, Géoplateforme) plutôt que de raisonner en distance — un point en mer n'appartient à aucun département, un point à Niort appartient à un département non littoral.
- **Point d'attention — projection:** la couche est en Lambert 93 (EPSG:2154). Le préfixe `SRID=4326;` du filtre est **obligatoire** ; sans lui, le service renvoie silencieusement zéro objet, ce qui se lirait à tort comme « en mer ». Même convention que `interrogerWFS` (§4.3).
- **Coût pour l'usager:** aucun sur un clic en pleine eau — le service n'est interrogé **que** sur le cas contesté, c'est-à-dire quand la détection locale annonce « à terre ». Pendant l'attente, le popup affiche « Vérification de l'emplacement… ». Délai borné par `CONFIG.delaiTraitTerreMer` (3 000 ms).
- **Robustesse:** si le service est injoignable, lent, hors couverture géographique (le produit ne couvre que la France métropolitaine) ou hors couverture départementale (v2.17), la fonction renvoie `null` et **l'avertissement « à terre » de la détection locale est maintenu** — c'est-à-dire le comportement d'avant la v2.14, le comportement prudent. Un échec du Shom ne peut donc jamais laisser passer un clic qui aurait été refusé auparavant.
- **Jeton de clic:** l'avertissement comportant désormais une attente réseau, un compteur `jetonClic` fait abandonner la vérification d'un clic qu'un clic plus récent a remplacé. Le même garde-fou a été ajouté après l'attente APB.
- **Ce que l'arbitrage ne dit pas:** le trait terre-mer répond à « suis-je sur le DPM ? », pas à « y a-t-il assez d'eau pour mon bateau ? ». Un point d'estran est sur le DPM *et* au sec à marée basse. La seconde question reste traitée par l'estimation de la colonne d'eau (§4.2, EMODnet + RAM).
- **Mention obligatoire:** la citation « Shom-IGN, 2021 (doi:10.17183/LIMTM) » et la clause « non certifié pour la navigation » sont portées par l'attribution de la carte (`attributionControl.customAttribution`), la couche n'étant pas affichée et n'ayant donc pas de source de tuiles pour la porter.
- **Contrôles de non-régression** (valeurs relevées en réel le 12/10/2026) : anse de Pen Hat (-4,6050 / 48,2870) → 0 objet, donc mer ; bourg de Camaret (-4,5920 / 48,2795) → 1 objet, `numdep` = 29, donc terre ; estran de la baie du Mont-Saint-Michel (-1,6100 / 48,6330), à +13 m au-dessus du niveau de référence → 0 objet, donc mer. Relevés complémentaires du 13/10/2026 : champ au sud de Caen (-0,022765 / 49,095841) → 1 objet, `numdep` = 14 ; cap Blanc-Nez (1,762662 / 50,930565) → 1 objet, `numdep` = 62 ; Paris et Lyon → 0 objet au point **et** 0 dans les 5 km, donc hors couverture. Voir `TESTS_FONCTIONNELS.md` §1, tests 9 à 15 et 24 à 29.

#### 4.4.1 Détection locale (première instance)

La détection locale ne peut pas se fonder sur le fond de carte visible par l'usager : le fond « Aérien » (photographie aérienne) ne comporte, en vecteur, que les routes et voies ferrées — aucune couche d'occupation du sol, de bâti ou de relief. Un point cliqué loin de toute route (champ, plage, maison isolée) y serait donc à tort classé comme « en mer ».

- **Méthode:** Une carte de référence invisible (« carte fantôme »), jamais affichée à l'écran, reste en permanence calée sur le fond vectoriel **Simple** (Plan IGN) et synchronisée sur le centre/zoom/orientation de la carte visible. C'est cette carte fantôme qui est interrogée à chaque clic, quel que soit le fond réellement affiché à l'usager (Simple ou Aérien).
- **Ce que porte réellement le fond Plan IGN** *(mesuré le 13/10/2026 sur la carte fantôme, dont le style ne compte qu'une source, `plan_ign`)* :

  | Point cliqué | Objets au point | Couleur du pixel |
  |---|---|---|
  | Mer, du zoom 6 au zoom 14 | `hydro_surf` | `rgb(151,205,213)` |
  | Estran (baie de Somme) | `hydro_surf` + `ocs_nature_sol_surf` | `rgb(192,229,219)` |
  | Champ, plage, dune, bourg de Camaret | **aucun** | `rgb(240,240,237)` |

  La terre ordinaire n'est donc **pas** un objet : seuls le bâti, les routes, la végétation et l'hydrographie sont dessinés, le reste n'est que l'aplat de fond du style. Le socle générique OpenMapTiles (`landcover`, `landuse`, `building`, `aeroway`) évoqué depuis le 18 septembre 2026 **n'existe pas** sur cette carte ; ses noms restent dans la liste `TERRE`, sans effet, au cas où le fond évoluerait.
- **Ordre des tests *(v2.17)*:**
  1. **Objet terrestre** (`oro_relief`, `ocs_`, `bati_`, `routier_`, `ferre`) au point → **terre**. Cette priorité est volontaire : l'estran, qui porte à la fois `ocs_` et `hydro_surf`, part ainsi à l'arbitrage du Shom plutôt que d'être conclu ici.
  2. **Objet d'eau** (`hydro_`, qui porte la mer, les estuaires, les grands cours d'eau et les plans d'eau intérieurs) au point → **eau**.
  3. **Couleur de la mer** : lecture du pixel rendu sur la carte fantôme, eau si la couleur est proche de celle de la couche `water` du style (`rgb(151,205,213)`, tolérance ±6 par canal) — sert au cas où la mer serait peinte en fond plutôt qu'en objet. Cette lecture nécessite `preserveDrawingBuffer: true` sur la carte fantôme.
  4. **Aucune preuve d'eau** : si les tuiles de la carte fantôme sont chargées → **terre** (soumise au Shom) ; sinon → indéterminé, le contrôle ne bloque pas.
- **Critères ignorés:** Toponymes et limites administratives (débordent en mer)
- **Robustesse:** le seul cas « indéterminé » restant est celui des tuiles de la carte fantôme (fond Simple) non chargées — y compris quand le fond **Aérien** est, lui, parfaitement chargé et affiché. Ce cas ne bloque pas l'usager.
- **Coût:** Cette méthode charge une seconde carte MapLibre en tâche de fond (invisible), avec son propre jeu de tuiles vectorielles — léger surcoût réseau et mémoire, sans impact visuel pour l'usager.
- **Bug corrigé le 13 octobre 2026 (v2.17) :** signalé par Nicolas sur deux captures — un champ au sud de Caen et un point à l'intérieur des terres au cap Blanc-Nez — la détection ne produisait **aucun** avertissement « à terre », à tous les zooms testés (6 à 16). Cause : aucun objet terrestre n'existe au pixel cliqué sur ces points (voir le tableau ci-dessus), la couleur de fond `rgb(240,240,237)` ne correspondait à aucune teinte d'eau, et le code concluait alors « indéterminé », verdict qui laisse passer le clic et n'appelle jamais le Shom. Le Shom, lui, répondait correctement sur les deux points (1 objet, `numdep` 14 et 62). Correction : inversion de la charge de la preuve (voir « Ordre des tests » ci-dessus). Effet de bord corrigé dans le même mouvement : le code se terminait par `return mapTerrain.areTilesLoaded() ? null : null;`, deux branches identiques, donc un test sans effet.
- **Bug corrigé le 18 septembre 2026 :** un marais ou une plage/dune, sans bâti ni route à proximité, n'était détecté par aucun des deux jeux de couches IGN d'origine et retombait, à tort, sur une confirmation « eau » — la seconde teinte de référence alors utilisée (`rgb(199,228,219)`) était en outre à 7 près de la couleur exacte des marais et des plages sur ce style (`rgb(192,229,219)`), ce qui confirmait activement ces zones de terre comme « eau ». Voir §11 (v1.6) et `TESTS_FONCTIONNELS.md` §1.7.

### 4.4bis Nature du fond au clic *(v2.15)*

Affichée dans le bloc environnement **uniquement quand le mouillage n'est pas interdit** — donc jamais sur un clic à terre, en cultures marines, en APB, ni sur un port ou une ZMEL.

- **Source:** couche WFS `NDF_BDD_WLD_WGS84G_WFS:natures_fond_50000` (« Natures de fond au 1/50 000 », Shom). Attribut géométrique `geometry`, filtre `INTERSECTS` au point, même mécanisme qu'au §4.4.2. Interrogée **en parallèle** des zonages Natura 2000/ZNIEFF (`Promise.all`) : elle n'allonge pas l'attente. Délai borné par `CONFIG.delaiNatureFond` (3 000 ms).
- **Du code au libellé:** l'attribut `typelem` porte un code (`NFS`, `NFRoche`…). Les 24 libellés de la table `NATURES_FOND` **n'ont pas été devinés** : la légende officielle du service a été extraite (`GetLegendGraphic`, 33 entrées), puis, pour chaque code, la couleur réellement rendue par le WMS au point a été comparée à celle de la pastille de légende. **23 codes sur 24 correspondent à l'identique.** Seul `NFSFC`, un unique polygone dans toute la France, est déduit du schéma de nommage.
- **Quatre familles** (`sable`, `vase`, `graviers`, `dur`) regroupent ces 24 codes pour choisir le conseil affiché. Le libellé montré à l'usager reste celui du Shom, pas la famille.
- **Conseil associé:** chaque famille porte un texte et un libellé de lien vers la page [Bien mouiller pour préserver les fonds marins](https://amidomar.beta.gouv.fr/bien-mouiller--pr%C3%A9server-les-fonds-marins/), le libellé nommant le type de fond (« Voir les bonnes pratiques d'ancrage sur fond sableux », « …sur sol dur »). **Les textes des familles `sable` et `dur` ont été rédigés par Nicolas le 12/10/2026 : ne pas les reformuler sans lui** ; `vase` et `graviers` suivent la même construction. **Le conseil est volontairement environnemental, jamais une appréciation de tenue d'ancre** : le produit porte la mention « ne pas utiliser pour la navigation », et un conseil de tenue serait du conseil nautique sur une donnée non certifiée pour cet usage.
- **Rappel systématique:** « Cette carte ne représente pas les herbiers : sur place, les taches sombres sont de l'herbier, à éviter. » C'est une carte **sédimentaire** — un fond de sable n'exclut pas un herbier, et les herbiers ne sont toujours pas couverts par une source nationale (§5).
- **Trois cas distincts, trois comportements** (présentation en carte repliable depuis la v2.16, voir C5) :

| Réponse du service | Ligne repliée | Bouton | Détail déplié |
|---|---|---|---|
| Un polygone, code connu | « **Nature du fond : {libellé Shom}** (Shom) » / le résumé de la famille (« ne laissez pas votre chaîne racler le fond », « emprise et ragage de la chaîne à surveiller »…) | « Comment mouiller ici » | le conseil complet de la famille, le lien vers les bonnes pratiques, puis le rappel herbiers |
| Aucun polygone, ou code inconnu | « **Nature du fond : à vérifier** » / « non cartographiée à cet endroit » | « Que faire ici » | « Le fond marin n'est pas cartographié à cet endroit : vérifiez-le sur place pour décider de votre dispositif d'ancrage. » + le lien + le rappel herbiers |
| Service injoignable, lent ou en erreur | **aucune carte** — pas de bloc, pas de message d'erreur | — | — |

> **v2.16** : le rappel sur les herbiers est désormais présent dans les **deux** cas où une carte s'affiche, y compris « à vérifier » — c'est précisément quand on ne sait rien du fond qu'il compte le plus.

> **Point de vigilance majeur — la couverture n'est pas nationale.** Le produit est la synthèse de 45 cartes sédimentaires publiées entre 1990 et 2023, et les feuilles non publiées laissent des trous. Taux de réponse mesuré le 12/10/2026 sur 30 points en mer tirés au hasard par territoire : **Morbihan 100 %, Var 97 %, Finistère 87 %, Ille-et-Vilaine 27 %, Côtes-d'Armor 3 %**. Le cas « à vérifier » sera donc courant, et majoritaire dans les Côtes-d'Armor — c'est la raison d'être du message explicite plutôt que d'un silence.

- **Mention obligatoire:** « Shom, 2025. Natures de fond au 1/50 000, doi:10.17183/HOM_GEOL_NATURES_FOND_50 », Licence Ouverte Etalab v2.0, portée par l'attribution de la carte.
- Voir `TESTS_FONCTIONNELS.md` §1, tests 16 à 23.

### 4.4ter Rattachement départemental et règles locales de la DDTM *(v2.22)*

**Pourquoi.** Les plaisanciers interrogés ne savent pas à quel service s'adresser, et les règles changent d'un département à l'autre — parfois radicalement. Les Côtes-d'Armor ne délivrent plus d'AOT de mouillage individuel ; le Var ne les délivre que sur certaines zones dédiées. Afficher ce que la zone *contient* sans dire ce que l'administration *autorise* laissait l'usager engager une démarche qui n'existe plus.

**Méthode, et sa limite.** La couche du trait terre-mer du Shom (`LIMTM_2154_WFS:limite_terre_mer_france_metropolitaine_polygones`, déjà utilisée au §4.4.2) porte un attribut `numdep`. Mais elle décrit des **surfaces terrestres** : au point cliqué, qui est en mer, il n'y a par construction aucun objet — c'est ainsi que la mer est détectée. On ne lit donc **jamais** le département au point. `interrogerDepartement` cherche la terre la plus proche par cercles successifs (`DWITHIN`), et retient le département de ce qu'elle trouve. C'est une inférence, pas la lecture d'un attribut, et aucune limite départementale ne s'étend en mer dans cette couche.

Trois configurations la mettent en défaut : une limite départementale qui touche la mer, une île dont le département diffère de la côte en face, et un point au large à équidistance. D'où la ligne « Emplacement rattaché à … », affichée systématiquement à droite du titre de section : ce n'est pas un avertissement, mais elle rend l'erreur repérable par quelqu'un qui sait où il mouille.

**Rayons progressifs, et pourquoi on s'arrête au premier qui répond.** Relevé réel du 14/10/2026 (objets retournés → départements trouvés) :

| Point cliqué | 1 km | 2 km | 5 km |
|---|---|---|---|
| Rade de Brest | 6 → 29 | 8 → 29 | 31 → 29 |
| Golfe du Morbihan | 2 → 56 | 6 → 56 | 33 → 56 |
| Rade de Toulon | 38 → 83 | 43 → 83 | 50 → 83 |
| Les Sept-Îles | 6 → 22 | 33 → 22 | 50 → 22 |
| Baie de Saint-Brieuc | 0 | 0 | 14 → 22 |

Un point au milieu d'une grande baie n'a aucune terre à 2 km : il faut pouvoir élargir. Mais au-delà de 5 km le plafond de `count` (50) est atteint, ce qui peut **masquer** un second département — le premier rayon qui répond est donc le seul dont le résultat soit sûr, et élargir au-delà dégraderait la réponse au lieu de l'affiner.

**Deux départements au plus petit rayon** : on n'arbitre pas. Le bloc affiche « Ce point est proche de la limite entre … , qui n'appliquent pas les mêmes règles. » puis les messages des deux DDTM.

**Affichage.** Un bloc « Règles locales » (`popup-entete-section`), placé **avant** « Contexte environnemental » : une règle départementale peut réorienter toute la démarche, la lire après la nature du fond n'aurait pas de sens. Le message lui-même réutilise `carteEnv`, dans une quatrième teinte `env-carte--ddtm` (orange DSFR `#b34000`) et, depuis la v2.23, une **bordure complète** de 2 px au lieu du filet gauche des trois autres cartes : celles-ci décrivent le contexte, celle-ci énonce une règle qui prime sur le reste, et un cadre fermé la détache du groupe au lieu de l'y ranger. Orange et non rouge : le rouge reste l'interdiction au point précis (biotope, parcelle conchylicole), qui ferme l'emplacement ; une règle départementale réoriente la démarche, elle ne condamne pas le point. Un département connu mais sans message particulier (29, 56 à ce jour) n'affiche que la ligne de rattachement.

**Source des messages : `data/ddtm-messages.json`.** Fichier **provisoire**. L'interface instructeur Grist prévue pour que les agents DDTM gèrent leurs bandeaux par périmètre n'existe pas encore ; en attendant, les messages vivent dans le dépôt, mais avec **les noms de champs de la future table DDTM de Grist** (`ddtm`, `message_titre`, `message_consequence`, `message_detail`, `liste`, `lien`, `libelle_lien`, `brouillon`), pour que le basculement soit un script d'export et non une réécriture de la carte.

**Tous les champs sont du texte brut, jamais du HTML**, et la carte les échappe à l'affichage. Ce n'est pas une précaution théorique : ce fichier sera demain rédigé par des agents DDTM via Grist, et du HTML injecté dans la page serait une faille. Les liens sont en outre filtrés sur `https://` — une URL `javascript:` saisie par mégarde ne devient pas cliquable. Quatre tests couvrent ce point (`TESTS_FONCTIONNELS.md` §9).

Le drapeau `brouillon: true` fait ajouter « Information provisoire, en cours de validation avec la DDTM … » sous le message. Il reste posé sur le **83**.

**État de la liste du Var (v2.23).** Cinq zones ont été transmises par la DDTM 83, toutes sur la **commune de Saint-Tropez** : zone 1 à La Bouillabaisse (30 unités, 3 à 13 m) et zones 2 à 5 aux Canebiers (25, 25, 40 et 40 unités). Source : cartes n°41 et n°42, DDTM du Var / SML-BLO, octobre 2022, fond ORTHO_COULEUR_PVA2017_083.

La liste **reste partielle et le texte le dit** : la DDTM 83 couvre toute la façade varoise (Hyères, Giens, Porquerolles, Cavalaire, Le Lavandou, Bandol…), et présenter cinq zones tropéziennes comme « les zones du Var » induirait en erreur quiconque clique ailleurs. Chaque entrée nomme donc sa commune, et le premier paragraphe annonce explicitement que la couverture se limite à Saint-Tropez.

**Les zones sont désormais des polygones : `data/zones-aot.geojson`.** Les quatre sommets de chaque zone, donnés en degrés-minutes décimales sur les cartes PDF, ont été convertis en décimal et versés dans un GeoJSON. Ce fichier sert **deux fois** : il dessine la couche `zones_aot` sur la carte, et il alimente la liste du message DDTM. Les zones ne sont donc pas recopiées dans `data/ddtm-messages.json` — une zone est une géométrie, et la dupliquer en texte garantirait de voir les deux listes diverger. Le lien entre les deux fichiers est la propriété `ddtm` portée par chaque entité.

Trois conséquences pour l'usager :
- **La carte répond elle-même à la question.** Si le point cliqué tombe dans une zone, la carte de règle locale **passe au vert** : elle n'annonce plus une restriction mais une autorisation. Lui faire déduire d'une liste de noms s'il est au bon endroit, alors que la carte sait le calculer, serait lui laisser le travail que l'outil existe pour faire.

  *Pourquoi la carte change de couleur plutôt que de s'accompagner d'un second bloc (v2.24).* La première version ajoutait un bandeau vert au-dessus de la carte orange. L'usager lisait donc, l'un sous l'autre, « cet emplacement est autorisé » et « la DDTM ne délivre plus d'AOT en dehors de certaines zones » — à lui de faire la synthèse. Ce n'est pas une information de plus : c'est la **même** règle locale, dont la réponse change selon l'endroit. Une seule carte, deux états.

  Mise en page de l'état vert, alignée sur celle de l'orange : première ligne = titre, complément, puis le **nom de la zone entre parenthèses** (ses propres tirets le rendraient illisible accolé au complément) ; seconde ligne = la conséquence, « identifier les autres zones autorisées » ; et le bouton garde le libellé « Voir les zones » dans les deux états, l'action étant la même — ouvrir la liste. Seule la réponse change.

  Les textes de l'état « en zone » viennent du fichier de messages (`message_titre_zone`, `message_complement_zone`, `message_consequence_zone`, `message_detail_zone`), **pas du code** : « La DDTM du Var autorise… » est une phrase propre à un département, et la coder en dur obligerait à repasser par un développeur pour chaque DDTM qui rejoindra le dispositif. En l'absence de ces champs, une phrase neutre est utilisée.

  La zone occupée **sort de la liste** dépliable, dont le bouton propose « les autres zones autorisées » : y faire figurer celle où l'on se trouve déjà contredirait son libellé.
- **Les noms de zone sont cliquables** et recadrent la carte dessus (`cadrerSurZone`), avec une marge à gauche pour que la zone ne se retrouve pas sous le popup. La liste reste ouverte : on passe d'une zone à l'autre sans tout rouvrir.
- **Les zones sont visibles** sur la carte, sous la case « Zones de mouillage autorisées (AOT) », dans le même orange que la carte de règle locale — c'est la même nature d'information.

**Contrôle de cohérence de la saisie.** Surface de chaque polygone rapportée à sa capacité : 937, 1 016, 863, 914 et 1 065 m² par mouillage. Cinq zones relevées séparément qui convergent toutes vers ~1 000 m² (soit un rayon d'évitage d'environ 18 m) : une erreur de chiffre sur une coordonnée aurait fait sortir l'une des cinq de cet intervalle. Ce contrôle ne remplace pas une validation par la DDTM 83, il écarte seulement la faute de frappe.

**Le test point-dans-zone réutilise `pointDansAnneau`**, écrit pour le cadastre conchylicole (§4.3ter). Une seconde implémentation avait été écrite puis retirée : les déclarations de fonction étant hissées, le doublon écrasait silencieusement l'originale et cassait **aussi** la détection des parcelles conchylicoles. Attrapé par le test d'exécution réelle, pas par le test de syntaxe. Seule différence à gérer : cette fonction attend des anneaux en « lat, lon » (ordre du WFS), le GeoJSON les donne en « lon, lat ».

**Secours hors ligne** volontairement **vide** (`SECOURS['data/ddtm-messages.json']`) : un message d'orientation périmé est pire que pas de message, et ce secours ne sert qu'à l'ouverture par double-clic.

### 4.4quater Dégagement du point cliqué sous le popup *(v2.22)*

Le popup est à position fixe, en bas à gauche (§2). Un clic qui tombe dessous place le marqueur sous le panneau : l'usager ne voit plus l'emplacement qu'il vient de choisir, au moment précis où le panneau lui en parle. C'est l'angle mort que la v2.21 avait assumé en déplaçant le popup du centre vers le bas-gauche.

`degagerPointSousPopup` compare la position écran du marqueur au rectangle du popup et, s'il est recouvert, fait glisser la **carte** (`map.panBy`) — pas le popup. Déplacer le panneau du côté opposé au clic marcherait aussi, mais un panneau qui saute d'un bord à l'autre entre deux clics désoriente, surtout quand on compare deux emplacements voisins ; déplacer la carte garde l'interface immobile et le marqueur dans son contexte géographique.

Le glissement est **horizontal** par défaut (le point sort par la droite du popup), ce qui préserve la latitude et donc la lecture de la côte. Il devient **vertical** quand il ne reste pas assez de place à droite — cas des fenêtres sous 700 px, où le popup occupe toute la largeur. Marge de 24 px. Aucune animation si le point n'est pas masqué, et durée nulle si le système demande de réduire les animations (`prefers-reduced-motion`).

Appelé **deux fois** : dès la pose du marqueur, pour que le point soit visible tout de suite plutôt qu'au bout d'une seconde d'attente réseau ; puis après l'affichage des cartes, car le popup grandit vers le haut (il est ancré en bas) et peut recouvrir à nouveau un point dégagé verticalement. Sans effet dans le cas courant, le dégagement ayant été horizontal.

### 4.4quinquies Profondeur au point *(v2.29)*

**Ce que l'usager voit.** Une carte sable, **première du contexte environnemental**, juste avant « Nature du fond » : les deux décrivent le même point, et c'est la profondeur qui dimensionne la chaîne. Elle s'affiche **toujours** — une profondeur n'est jamais une simple bonne nouvelle, elle est le chiffre dont dépend le rayon d'évitage, donc la règle v2.19 (« une information absente n'affiche rien ») ne s'y applique pas.

**Les deux bornes de la marée, pas la seule sonde.** La sonde est rapportée au zéro hydrographique ; le champ d'évitage demande une colonne à marée haute. Affichés côte à côte sans lien, ce sont deux nombres distants du marnage pour le même point, et rien ne dit à l'usager qu'ils parlent du même endroit. La carte annonce donc « **Profondeur : 13,7 à 19,1 m selon la marée** », au dixième comme le champ, et le détail nomme la valeur haute comme étant celle qui sert au calcul.

> **En Méditerranée, pas de fourchette.** La référence verticale d'EMODnet y est le **niveau moyen** et non les plus basses mers, et le marnage est négligeable : « au plus bas de la marée » y serait faux. La bascule se fait sur `port.ref === 'PMVE-PBMA'`, le même test que la note du §4.2. Troisième cas, distinct : **aucun port de référence disponible** — un seul nombre également, mais le texte dit que la pleine mer n'a pas pu être estimée, au lieu d'affirmer que la marée ne change rien.

**Le millésime s'affiche toujours, sans seuil** *(décision de Nicolas, 26/10/2026)*. « Sondé en 2013 au lidar » et « sondé en 1898 au plomb de sonde » se passent de commentaire : la technique raconte l'histoire mieux qu'une année comparée à un seuil, et un seuil serait une règle de plus à tenir.

**La technique de sondage vient de `tecsou`, pas de `instrument`** *(v2.29, après relecture de Nicolas)*. `tecsou` est un vocabulaire contrôlé du Shom, combinable par « | » ; `TECHNIQUES_SONDAGE` ne retient que la **première** technique citée, la principale, et la rend par un libellé court **préposition comprise** (« au plomb de sonde », « au sondeur multifaisceaux », « au lidar ») pour éviter les accords hasardeux. Même principe que `NATURES_FOND` : un code inconnu n'affiche **rien** plutôt qu'un terme incompréhensible. Le champ `instrument` est volontairement ignoré — il porte le modèle de l'appareil, sans accents (« sondeur multifaisceaux simrad em2040 »), sans intérêt pour un plaisancier.

**Sources, et pourquoi deux.**
- **La valeur** vient d'EMODnet Bathymetry (`depth_sample`). C'est la seule profondeur interrogeable au point, et la grille européenne diffuse les levés du Shom : les valeurs marines portent `reference.organisation_id = 540`, l'EDMO du Shom. Le WMS « MNT » du Shom n'est pas interrogeable au point et il n'existe pas de WCS — vérifié les 25/09, 12/10 et 15/10/2026, voir `data/SOURCES.md` §5.
- **Le millésime** vient du Shom, couches WFS « Levés bathymétriques », découpées en **quatre périodes** donc interrogées toutes les quatre. La jointure se fait sur `id_md`, qui contient l'identifiant renvoyé par EMODnet ; à défaut, on retient le levé le plus récent couvrant le point. Délai borné par `CONFIG.delaiLevesBathy` (4 000 ms ; 31 à 89 ms observés).

> **Piège à ne pas rouvrir** : l'identifiant de levé **ne porte pas l'année**. `S199206700` a pour dates réelles 19900512 → 19910531, soit un levé de 1990-1991. Seuls `sursta` et `surend` font foi.

**Trois issues, distinctes.** Service muet → carte grise « Profondeur : vérification impossible ». A répondu mais pas de profondeur marine ici (valeur positive sans `reference`) → carte grise « Profondeur : non renseignée ici ». Sinon la profondeur. Les deux premières ne se confondent pas : « aucun levé ici » est une information, « le service n'a pas répondu » n'en est pas une.

**Fond découvrant.** Une valeur positive *avec* provenance marine désigne l'estran. La carte dit alors « Fond découvrant : 0 à 4,2 m selon la marée » et le détail prévient que le navire se posera : c'est l'information utile, pas la hauteur du caillou.

**Une seule interrogation par clic.** `interrogerProfondeur()` est lancée une fois au traitement du clic ; la même promesse alimente l'estimation de colonne d'eau (§4.2) **et** le peloton `Promise.all` des zonages. `chargerPortsRAM()` sort donc de sa condition « AOT à moins de 100 m », la borne haute étant désormais nécessaire à l'affichage.

### 4.5 État des sources cartographiques
Bandeau « Couches affichées » avec icônes:

| Icône | Signification |
|-------|---------------|
| ✓ | Source joignable et chargée |
| ✗ | Source injoignable depuis ce navigateur |
| ○ | Fichier local présent mais vide — à compléter |
| ≈ | Données de secours (page ouverte en local via `file://`) |

Les couches marquées **« À venir »** (voir §5) n'affichent aucune de ces icônes : leur case à cocher est grisée et désactivée, et aucune requête n'est faite pour elles tant qu'aucune source interrogeable n'est disponible.

### 4.6 Recherche par coordonnées GPS *(v2.25)*

#### Pourquoi un seul champ, et non deux
Le champ accepte à la fois les libellés de lieu (commune, lieu-dit) et les coordonnées. Deux champs auraient obligé l'usager à classer sa saisie **avant** de taper : se tromper de champ ne renvoie alors aucun résultat, sans rien dire du pourquoi — l'échec le plus difficile à récupérer. Ici la machine tranche seule, ce qu'elle peut faire sans ambiguïté : `43.267710, 6.622611` n'est pas un nom de commune.

#### Mise en œuvre — un provider ajouté, aucun code de la librairie modifié
Le champ est celui de carte-facile (`CarteFacile.SearchControl`, voir `vendor/VERSIONS.txt`). Ce contrôle accepte une liste de **providers** interrogés en parallèle, chacun disposant de son propre quota de résultats (`maxResults`, 5 par défaut) :

```js
map.addControl(new CarteFacile.SearchControl({
  providers: [GpsGeocoder, CarteFacile.GeopfGeocoder]
}), 'top-left');
```

`GpsGeocoder` est placé **en premier** : les entrées étant empilées dans l'ordre des providers, le point GPS arrive en tête de la liste déroulante. Aucun résultat « commune / lieu-dit » de la Géoplateforme n'est perdu au passage, et la librairie vendorisée n'est pas touchée (elle reste remplaçable par `npm install carte-facile`).

#### Formats acceptés
| Format | Exemple | Pourquoi |
|--------|---------|----------|
| Degrés décimaux | `43.267710, 6.622611` | Format des formulaires DN et de Grist |
| Virgule décimale, séparateur virgule | `43,267710, 6,622611` | Ce que donne un copier-coller depuis Excel ou Grist |
| Virgule décimale, séparateur espace ou `;` | `43,267710 6,622611` | Copie de deux cellules voisines, le cas le plus courant chez un instructeur *(v2.31)* |
| Séparateur espace ou `;` | `43.267710 6.622611` | Tolérance de saisie |
| Hémisphères en suffixe | `43,2677N 6,6226E` | Les lettres séparent les deux coordonnées à elles seules *(v2.31)* |
| Degrés-minutes décimales | `43°16.063'N 6°37.357'E` | Cartes marines, arrêtés, GPS de bord |
| Degrés-minutes-secondes | `43°16'03.8"N 6°37'21.4"E` | Variante rencontrée dans les arrêtés |

Les hémisphères `N/S` et `E/W/O` sont acceptés en suffixe et donnent le signe ; sans eux, le signe est celui du nombre.

#### Règle de lecture de la virgule *(v2.31)*
Dans une saisie GPS, la virgule a deux rôles incompatibles : **séparateur décimal** à la française (`43,267710`, ce que produisent un téléphone, Excel et Grist en locale FR) et **séparateur entre latitude et longitude** (`43.267710, 6.622611`). Refuser toute virgule serait de la friction pure pour un plaisancier ou un instructeur français ; la deviner, c'est risquer de poser le point à des centaines de kilomètres du mouillage sans le dire. La virgule est donc lue comme décimale dans les trois cas où c'est la **seule** lecture possible :

| Cas | Exemple | Pourquoi la lecture est certaine |
|-----|---------|----------------------------------|
| La saisie contient un `°` | `43°16,063'N` | Le format est nautique : toute virgule entre deux chiffres y est forcément décimale |
| Un autre séparateur sépare déjà les deux coordonnées | `43,267710 6,622611`, `43,267710; 6,622611`, `43,2677N 6,6226E` | L'espace, le `;` ou la lettre d'hémisphère joue déjà le rôle de séparateur ; les virgules restantes ne peuvent être que décimales |
| Quatre groupes d'entiers séparés par des virgules | `43,267710, 6,622611` | Deux paires à virgule décimale, aucune autre lecture possible |

Les espaces qui entourent une virgule ou un `;` sont retirés avant d'y chercher un séparateur : sans cela, l'espace de `43,26, 6,62` ferait croire que les deux coordonnées sont déjà séparées.

**Le cas indécidable est refusé, pas deviné.** Deux ou trois entiers séparés par des seules virgules, sans aucun point : `43,16` se lit 43.16 aussi bien que 43 / 16, et il en va de même de `44,1`, `-1,16` ou `43, 6`. Aucun point n'est proposé ; le déroulant montre les deux lectures et le format qui lève le doute.

Conséquence assumée : une paire de **degrés entiers** (`43, 6`) n'est plus acceptée telle quelle. Un degré vaut environ 111 km de côté — une précision sans usage pour un mouillage — et l'usager est invité à écrire `43.0, 6.0` s'il la voulait vraiment.

Avant la v2.31, `43,16` était accepté **en silence** comme le couple 43 / 16, et le sous-titre de l'entrée en affichait l'équivalent nautique `43°16.000'N` — soit exactement la lecture degrés-minutes que la saisie n'avait pas voulu dire. Un point pouvait ainsi se poser à plusieurs centaines de kilomètres du mouillage sans que rien ne le signale, et les saisies à virgule séparées par un espace ou un `;` — les plus fréquentes dans un copier-coller de deux cellules — étaient refusées alors que leur lecture ne faisait aucun doute.

#### Garde-fou sur l'inversion latitude / longitude
C'est l'erreur la plus courante sur des coordonnées recopiées. Si le couple saisi tombe **hors** de l'emprise France métropolitaine (`EMPRISE_FR` : 41,0–51,6 N / −5,6–9,8 E, Corse comprise) mais que le couple **inversé** y tombe, le point est corrigé et le résultat le dit : « Latitude et longitude semblaient inversées : remises dans l'ordre ». Un point réellement hors emprise reste accepté sans correction. `EMPRISE_FR` est à élargir si l'expérimentation gagne l'outre-mer.

#### Ce qui s'affiche dans la liste déroulante
- **Coordonnées reconnues** → une entrée épinglée, `Point GPS — 43.267710, 6.622611`, avec le format nautique correspondant en sous-titre (ou le message d'inversion le cas échéant). Rien ne bouge sur la carte avant que l'usager ne sélectionne l'entrée : il valide d'abord l'interprétation qui en est faite.
- **Saisie faite de chiffres et de signes de coordonnées mais non interprétable** (ex. `43.26`) → une entrée d'aide donnant le format attendu, plutôt qu'un déroulant vide. Son libellé **reprend la saisie telle quelle** : le contrôle recopiant le libellé dans le champ quand on sélectionne une entrée, cliquer sur cette aide laisse la saisie intacte au lieu de l'effacer.
- **Virgule indécidable** (`43,16`) *(v2.31)* → **aucune** entrée « Point GPS » : une entrée d'aide « **Écrivez 43.16 ou 43 16 — virgule ambiguë** ». Les deux lectures sont calculées depuis la saisie et données **déjà corrigées** : `43.16` et `43 16` sont l'une et l'autre des saisies que le parseur accepte, l'usager n'a qu'à recopier celle qu'il visait. Même mécanique de libellé que l'aide au format : la saisie reste dans le champ si l'on clique dessus.
  - **Le sous-titre du déroulant est tronqué au-delà d'environ 40 caractères**, comme le placeholder l'est au-delà de 32. Une consigne plus explicite (« écrivez la décimale avec un point : 43.267710, 6.622611 ») s'affichait « Virgule ambiguë — écri… » : l'usager lisait le diagnostic et perdait la solution. Mesuré au rendu le 26/10/2026 ; toute reformulation de ce message doit être revérifiée dans le déroulant, pas seulement dans le code.
- **Texte non numérique** (`Saint-Tropez`, `Le Pradic`) → le provider GPS ne renvoie rien et laisse la place à la Géoplateforme.

#### Sélection d'un point : le clic carte est rejoué
`onSelect` centre la carte (`jumpTo`, **zoom 14 minimum**, voir plus bas), attend que la carte soit peinte, puis **rejoue le clic** à cet endroit :

```js
map.fire('click', { lngLat, point: map.project(lngLat), originalEvent: null });
```

L'usager obtient donc d'emblée tout ce qu'un clic produit : terre/eau et arbitrage Shom (§4.4), cultures marines et APB (§4.1.c, c bis), zones protégées et nature du fond (§4.3, §4.4bis), règles locales et zone autorisée (§4.4ter), mouillages voisins et rayon d'évitage (§4.2), coordonnées reportables (§4.0 C5). Les écouteurs de couche (port, ZMEL) répondent également, comme à la souris.

Le corps du gestionnaire de clic a été extrait dans une fonction nommée, `traiterPointCarte(lngLat, point)`, appelée par `map.on('click', …)` comme par la recherche : **un seul chemin de code**, donc aucune divergence possible entre les deux gestes. La fonctionnalité est le symétrique de l'étape 4 de la marche à suivre, où l'usager **copie** des coordonnées vers son formulaire ; elle sert surtout aux instructeurs DDTM, qui disposent d'une coordonnée (Ad'hoc, arrêté, signalement) et veulent savoir ce qu'il y a à cet endroit.

**Attente avant le clic rejoué** *(corrigée en v2.25.2)* — `attendreCartePeinte()` attend l'événement **`idle`** de MapLibre, qui garantit « plus de transition de caméra, toutes les tuiles chargées, tous les fondus terminés », et vérifie au passage que la carte fantôme (§4.4.1) a suivi, puisque `estSurLEau` la lit. Plafond de 6 s ; au-delà le clic part quand même, et `estSurLEau` renvoie alors `null` (« on ne sait pas »), cas non bloquant déjà prévu. Si la caméra ne bouge pas (point déjà à l'écran au même zoom), l'attente est **sautée** : aucun `idle` ne serait émis et on paierait le plafond pour rien.

> **Pourquoi pas un simple `isMoving()` + `areTilesLoaded()`** — c'était la première version, et elle était fausse. `jumpTo` est instantané, donc `isMoving()` est faux immédiatement, et `areTilesLoaded()` parle des **tuiles**, pas des couches GeoJSON du projet. En arrivant de loin, le clic partait sur un cadrage pas encore peint et `queryRenderedFeatures` ne trouvait rien : une coordonnée saisie sur un port ouvrait le popup de coordonnées au lieu de la modale du port, alors qu'un vrai clic au même endroit l'ouvrait. Le défaut est invisible en harnais headless (sans fond de carte, les deux gestes partent en branche « à terre » avant d'atteindre `queryRenderedFeatures`) : il n'a été vu qu'en conditions réelles, sur la version publiée. Voir TESTS_FONCTIONNELS.md §10.10 et §10.12.

**Niveau de zoom à l'arrivée** *(v2.25.3)* — `Math.max(map.getZoom(), 14)`. Le plancher était à 16 : en venant de la vue France (zoom 5), le point arrivait sur un cadrage si serré qu'il ne restait plus de littoral pour se repérer, le popup et le panneau de légende occupant déjà une bonne part de l'écran. À 14, le golfe entier est lisible. Un **plancher** plutôt qu'un zoom fixe : qui était déjà plus près garde son échelle, ce qui sert à un instructeur vérifiant plusieurs coordonnées à la suite.

> À ne pas confondre avec le plafond `maxZoom: 16` du `fitBounds` qui recadre sur une zone AOT cliquée depuis le bloc de règles locales (§4.4ter) : là c'est un **maximum**, ici un **minimum**. Avoir pris l'un pour l'autre est précisément l'erreur de la v2.25.

#### Signalement des deux possibilités à l'usager
Le label du `SearchControl` est **masqué visuellement** (`clip: rect(0,0,0,0)` dans `carte-facile.css`) et un contrôle flottant au-dessus de la carte n'offre pas de place pour un texte d'aide sous le champ : le `fr-hint-text` du DSFR n'est pas applicable ici. Trois signaux le remplacent :
1. le **placeholder** — « Commune, lieu-dit ou coordonnées » (32 caractères, limite au-delà de laquelle le contrôle de 280 px tronque) ;
2. l'**étape 1 de la marche à suivre**, qui porte l'exemple chiffré ;
3. l'**entrée d'aide au format** dans le déroulant, affichée au moment exact où l'usager tâtonne.

Le contrôle n'ouvre pas de déroulant champ vide (`minChars: 3`) : il n'y a donc pas de suggestions au focus.

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
- 🟢 **Cultures marines** *(v2.18)* — cadastre conchylicole des DDTM, en WMS sur GéoIDE, quatre flux sous une seule case : Finistère (1 406 parcelles, juin 2026), Ille-et-Vilaine (2 194, mars 2024), Charente-Maritime surfacique (13 391) et linéaire (1 254, février 2023). Un clic sur une parcelle déclenche un popup d'interdiction, sur la donnée réelle de la DDTM (§4.3ter). Pas de flux ailleurs : Manche (WFS en panne côté serveur), Morbihan, Vendée, Loire-Atlantique, Gironde (fichier à télécharger seulement). Remplace le polygone fictif de `data/cultures-marines.geojson`, supprimé

- 🟧 **Zones de mouillage autorisées (AOT)** *(v2.23)* — fichier local `data/zones-aot.geojson`, cochée par défaut. Zones où une AOT de mouillage individuel reste délivrable. **Couverture très partielle** : 5 zones sur la seule commune de Saint-Tropez (La Bouillabaisse, Les Canebiers), relevées à la main sur les cartes PDF n°41 et n°42 de la DDTM 83 (octobre 2022) et à faire confirmer par elle. Un clic dans une zone **ne court-circuite pas** le parcours, contrairement aux ports et aux ZMEL : être dans une zone est une bonne nouvelle, le choix d'emplacement se poursuit normalement. Orange `#b34000`, le même que la carte « Règles locales » du popup

### Habitats sensibles
- 🟣 **Herbiers de posidonie et de zostère** — couche WMS (couverture partielle : presque uniquement l'Occitanie, Palavas et Albères ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère annoncée mais absente), affichable/masquable normalement — non identifiable au clic (aucune API disponible)

### À venir
- ⬜ **Zone de baignade / zone réglementaire** — entrée unique, grisée et non sélectionnable, mention « À venir » : regroupe deux types de zones pour lesquelles aucune source interrogeable n'a été identifiée à ce jour. Cette entrée matérialise le sujet dans la légende sans (encore) charger de donnée. Les APB, qui y figuraient jusqu'en v1.7, ont désormais leur propre couche (voir « Protection de la nature »).

### Autres couches
- 🔴 **AOT de mouillage existantes** (libellé depuis v2.4 ; « AOT existantes » auparavant) — 249 positions simulées, fictives (Bretagne + Méditerranée)

### Couches interrogées sans être affichées
Ces sources n'apparaissent pas dans le panneau « Couches affichées » : elles ne sont jamais dessinées, seulement interrogées au point cliqué.
- **Trait terre-mer (Shom, LIMTM)** *(v2.14)* — arbitre le verdict terre/mer, voir §4.4.2. France métropolitaine, millésime 2021. Citation obligatoire portée par l'attribution de la carte.
- **Natures de fond au 1/50 000 (Shom)** *(v2.15)* — nature du fond et conseil d'ancrage au clic, voir §4.4bis. **Couverture partielle** (3 % des points testés en Côtes-d'Armor, 100 % dans le Morbihan). Citation obligatoire portée par l'attribution.
- **APB (Géoplateforme, WFS)** — vérification bloquante, voir §4.3bis. La couche APB est par ailleurs affichable, elle, en WMTS.
- **Natura 2000 / ZNIEFF (API Carto IGN)** — voir §4.3.

### État des sources problématiques
- **Herbiers de posidonie et de zostère:** Couverture insuffisante — presque uniquement l'Occitanie ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère absente ; reste affichable mais non identifiable au clic
- **Parcs naturels marins, Aires marines protégées:** Aucune API d'identification de zone au clic identifiée à ce jour (contrairement à Natura 2000 et ZNIEFF, couverts par l'API Carto IGN — module *nature*, endpoints `natura-habitat`, `natura-oiseaux`, `znieff1`, `znieff2`) — restent affichées/masquables normalement, simplement absentes de la vérification automatique au clic
- **APB:** couche WMTS `Patrinat_APB` ajoutée en v1.8, tuiles confirmées ; pas d'identification au clic
- **Zones de baignade, zones réglementaires:** Aucune source publique interrogeable identifiée — regroupées dans l'entrée « À venir » du panneau (voir ci-dessus)
- **ZMEL:** Couche nationale consolidée depuis v2.9/v2.10 (647 ZMEL, Cerema/CACEM, fournie par Nicolas le 18/09/2026) ; capacité d'accueil réelle, contact (e-mail) non disponible dans la source
- **Cultures marines** *(v2.18)* : branchées sur les cadastres conchylicoles des DDTM publiés sur GéoIDE (Finistère, Ille-et-Vilaine, Charente-Maritime), affichées en WMS et interrogées au clic en WFS. Pas de flux exploitable ailleurs — Manche (WFS en panne côté serveur), Morbihan, Vendée, Loire-Atlantique, Gironde (téléchargement seulement). Voir §4.3ter
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
  delaiTraitTerreMer: 3000, // délai max du trait terre-mer du Shom, consulté seulement quand la détection locale annonce « à terre » (ms, v2.14)
  rayonCouvertureShom: 20,  // rayon du test de couverture du trait terre-mer (km, v2.17, recalibré le 14/10/2026) — voir §4.4.2
  delaiLevesBathy: 4000,    // délai max des quatre couches « Levés bathymétriques » du Shom (ms, v2.29 ; 31 à 89 ms observés)
  delaiNatureFond: 3000,    // délai max de la couche Natures de fond du Shom, interrogée en parallèle des zonages (ms, v2.15)
  delaiDepartement: 4000,   // délai max du rattachement départemental, interrogé en parallèle des zonages (ms, v2.22) — voir §4.4ter
  rayonsDepartement: [1, 2, 5, 10], // rayons essayés dans l'ordre pour trouver la côte la plus proche (km, v2.22) — voir §4.4ter
  delaiCulturesMarines: 4000, // délai max du cadastre conchylicole des DDTM (ms, v2.18) — voir §4.3ter
  proximiteCulturesMarines: 40, // en deçà, une parcelle voisine est signalée sans bloquer (m, v2.21)
  blocageCulturesMarines: 5,  // en deçà, on considère être SUR la parcelle (m, v2.21)
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
- **Couche WMTS/WMS:** `tiles: WMTS(couche, format)` — `tiles` accepte depuis la v2.18 une **liste** d'URL : une source et une couche sont créées par flux (`id`, `id-1`, `id-2`…), et la case de légende les bascule ensemble. Utilisé pour les quatre flux du cadastre conchylicole (§4.3ter)
- **Fichier GeoJSON local:** `geojson: 'data/fichier.geojson'`
- **Couche de mouillages:** `aot: true` + `geojson`
- **Couche « à venir » (non chargée, case grisée):** `aVenir: true` — aucune source, aucun écouteur, aucune requête ; utilisé uniquement pour l'entrée combinée « Zone de baignade / zone réglementaire » (créée en v1.2 sous le nom « APB / zone de baignade / zone réglementaire », scindée en v1.8). Les couches Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère, qui portaient temporairement ce marquage en cours d'itération, ont été **repassées en affichage normal** : seule leur absence de vérification automatique au clic est documentée (§4.1.d, §5), pas leur affichage.

### Données de secours
Si une source ne charge pas:
1. Vérifier la présence dans `SECOURS` (dictionnaire embarqué)
2. Si présente → données de secours utilisées (marquées ≈)
3. Si absente → statut ✗, fichier non affiché

L'entrée `data/cultures-marines.geojson` a été retirée de `SECOURS` en v2.18 : le fichier n'existe plus, la couche est désormais servie en WMS par les DDTM (§4.3ter).

Les flux du cadastre conchylicole n'ont **volontairement pas** de données de secours : une parcelle de secours périmée affirmerait une interdiction qui n'a plus cours, ou l'inverse. En cas de panne, la carte dit qu'elle ne sait pas (issue `indisponible`).

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
- **La marche à suivre s'ouvre sans prendre le focus** *(v2.25.1)*. Elle reste affichée au démarrage, mais plus aucun `focus()` n'est posé à l'initialisation : un focus posé dans une iframe fait défiler la page qui l'embarque jusqu'à celle-ci, et les pages d'amidomar.beta.gouv.fr s'ouvraient alors en plein milieu, à la hauteur de la carte. Les réouvertures au clic (bouton ❓, modale d'orientation) posent bien le focus, mais avec `preventScroll: true`, qui produit le même effet sans le saut.

### Vue « mouillage existant » *(v2.26)*
```
https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/?vue=existant
```
- Remplace la modale d'accueil par « Visualiser votre mouillage actuel » (voir §3 Étape 0bis)
- **Seule la modale change** : couches, clic, popup, recherche GPS et copie des coordonnées sont rigoureusement identiques à la vue par défaut
- URL destinée à être diffusée dans les documents et formulaires de la démarche de **poursuite d'occupation**, pour ne pas renvoyer un titulaire d'AOT vers un guide de choix d'emplacement
- **Comportement par défaut préservé** : paramètre absent, mal orthographié ou porteur d'une autre valeur (`?vue=nimportequoi`) → la modale historique à 4 étapes s'affiche. Aucune redirection entre les deux URL.
- Cumulable avec `?embed` (`?embed&vue=existant`) : les deux paramètres sont lus indépendamment
- Le paramètre reste dans la barre d'adresse après fermeture de la modale : l'URL est partageable et peut être collée telle quelle dans un document de démarche

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
- [ ] La modale d'accueil affiche 4 étapes (étape 2 en vert) et se ferme par le bouton « Commencer »
- [ ] Rouvrir la modale d'orientation via ❓ → affiche l'étape en cours (étapes 3 et 4 uniquement)
- [ ] Les cases ✓ (complétées) et l'étape courante en bleu sont à jour

### ✅ 8. Curseur terre/eau
- [ ] Cliquer sur la **terre** (relief, bâti) sur le fond **Simple** → popup affiche alerte rouge « Vous êtes à terre »
- [ ] Cliquer sur la **terre** (loin de toute route) sur le fond **Aérien** → popup affiche également l'alerte rouge « Vous êtes à terre » (test de non-régression de la carte fantôme, voir §4.4.1)
- [ ] Aucune coordonnée GPS n'apparaît dans les deux cas ci-dessus
- [ ] *(v2.14)* Cliquer sur un **estran large** découvrant — baie du Mont-Saint-Michel, baie de Lancieux, golfe du Morbihan à marée basse — → un bref « Vérification de l'emplacement… » s'affiche, **puis l'avertissement est levé** : coordonnées GPS et bloc environnement apparaissent normalement (voir §4.4.2)
- [ ] *(v2.14)* Cliquer sur une **plage de sable** adossée à la mer → même comportement : l'avertissement est levé
- [ ] *(v2.14)* Cliquer dans un **bourg ou en pleine campagne** → l'avertissement « Vous êtes à terre » est bien maintenu après la vérification
- [ ] *(v2.14)* Couper le réseau, puis cliquer sur une plage → l'avertissement « Vous êtes à terre » est maintenu (repli prudent, pas de blocage de l'interface)
- [ ] *(v2.14)* Cliquer sur l'eau → **aucune latence ajoutée** et aucun appel au Shom dans l'onglet réseau (le trait terre-mer n'est consulté que sur un verdict « terre »)
- [ ] *(v2.17)* Cliquer sur un **champ, un pré ou une forêt sans bâti ni route alentour**, à plusieurs kilomètres de la côte → l'avertissement « Vous êtes à terre » s'affiche (c'est le bug corrigé en v2.17 : ce cas passait silencieusement)
- [ ] *(v2.17)* Rejouer le point ci-dessus **au zoom 8 puis au zoom 16** → même verdict aux deux zooms
- [ ] *(v2.17)* Cliquer en **plein Paris ou en plein Lyon** (hors département littoral) → l'avertissement « Vous êtes à terre » s'affiche bien, et n'est pas levé par le Shom (test du garde-fou de couverture, §4.4.2)
- [ ] *(v2.17)* Cliquer sur une **plage sèche** (au-dessus de la laisse des plus hautes mers) → avertissement maintenu, alors qu'un clic sur l'estran voisin est autorisé
- [ ] Cliquer sur l'**eau**, sur l'un ou l'autre fond, hors ZMEL/port/cultures marines → popup affiche les coordonnées GPS et un bloc environnement (vert ou neutre/orange selon les zones détectées)
- [ ] Popup affiche le **bouton Copier**

### ✅ 8bis. Nature du fond au clic *(v2.15)*
- [ ] Cliquer sur l'eau dans le **golfe du Morbihan** ou la **rade d'Hyères** → le bloc environnement indique « Nature du fond : … (Shom) », un conseil, un lien « Voir les bonnes pratiques » et le rappel sur les herbiers
- [ ] Cliquer sur l'eau au large de **Paimpol (22)** → « Nature du fond : à vérifier » (la couverture y est quasi nulle), et non un silence
- [ ] Le lien « Voir les bonnes pratiques » ouvre bien la page du site dans un nouvel onglet
- [ ] Cliquer **à terre**, en **cultures marines** ou en **APB** → aucune mention de nature du fond (le mouillage y est interdit)
- [ ] Cliquer sur un **port** ou une **ZMEL** → modale habituelle, aucune mention de nature du fond
- [ ] Le clic n'est pas visiblement plus lent qu'avant (la requête part en parallèle des zonages)
- [ ] L'attribution de la carte mentionne « Natures de fond au 1/50 000 : Shom, 2025 »

### ✅ 8ter. Popup réorganisée *(v2.16)*
- [ ] Cliquer sur l'eau dans un site Natura 2000 → le popup montre deux parties titrées : « Contexte environnemental » puis « À reporter dans le formulaire de demande »
- [ ] Les cartes du contexte sont **toutes repliées** à l'ouverture
- [ ] Chaque ligne repliée se suffit à elle-même (« étude d'incidence à prévoir », « ne laissez pas votre chaîne racler le fond »)

### ✅ 8sexies. Bloc « Mouillages voisins » *(v2.30)*
- [ ] Cliquer à moins de 100 m d'une AOT sur un point qui a aussi une carte incertaine → le bloc titré « Mouillages voisins » s'intercale **entre** « Contexte environnemental » et « Ce que la carte n'a pas pu vérifier »
- [ ] Saisir la longueur du navire, puis cliquer ailleurs puis revenir : la valeur saisie est conservée (le nœud est déplacé, pas recréé)
- [ ] Cliquer sur un point **à terre** ou **interdit** → le bloc n'atterrit pas dans l'encadré coloré

### ✅ 8quinquies. Profondeur au point *(v2.29)*
- [ ] Cliquer sur l'eau en Bretagne → carte « Profondeur : X à Y m selon la marée », **avant** « Nature du fond »
- [ ] Le détail nomme la valeur haute comme celle qui sert au rayon d'évitage, et le port de référence
- [ ] Cliquer en Méditerranée → **un seul nombre**, « la marée ne change pratiquement rien ici », aucune mention de « plus bas de la marée »
- [ ] Le millésime et la technique de sondage apparaissent dans le détail, quel que soit leur âge
- [ ] Aucun modèle d'appareil n'apparaît (« simrad », « deso », « hawkeye »…) : seul le libellé court
- [ ] Le chiffre du champ « Colonne d'eau à marée haute » est bien la borne haute annoncée par la carte

### ✅ 8quater. Deux groupes de cartes *(v2.28)*
- [ ] Cliquer sur un point où la nature du fond n'est pas cartographiée → la carte « Nature du fond : à vérifier » apparaît **sous « Ce que la carte n'a pas pu vérifier »**, en gris, filet pointillé
- [ ] Les cartes qui constatent (Natura 2000, nature du fond connue) restent sous « Contexte environnemental »
- [ ] Aucune carte incertaine → le second intitulé ne s'affiche pas ; aucune carte établie → le premier non plus
- [ ] La barre du popup réduit compte **toutes** les cartes, incertaines comprises
- [ ] Cliquer « Ce que ça implique » / « Comment mouiller ici » déplie la carte et le bouton devient « Masquer » ; recliquer replie et rend au bouton son libellé
- [ ] Le nom de la zone Natura 2000 apparaît dans le bloc du bas avec son propre bouton « Copier », qui affiche « Copié ! » 2 s
- [ ] Cliquer sur un point **sans** Natura 2000 → la ligne « Nom de la zone » disparaît, seules les coordonnées restent
- [ ] Copier le **nom de la zone** ne coche pas l'étape 4 de la marche à suivre ; copier les **coordonnées** la coche
- [ ] Cliquer sur un point en Natura 2000 **et** en ZNIEFF → deux cartes bleues empilées, puis la carte sable du fond
- [ ] Cliquer à terre → tout le bloc « À reporter » disparaît
- [ ] Vérifier sur téléphone que le popup reste lisible avec quatre cartes (Natura, ZNIEFF, fond, cultures marines non vérifiées) — cas d'un clic en rade d'Hyères depuis la v2.18

### ✅ 9. Cultures marines — cadastre conchylicole *(réécrit en v2.18)*
- [ ] Activer « Cultures marines » dans la légende, puis zoomer sur la rivière de Morlaix (environ 48,63 N / -3,86 E) → les parcelles s'affichent ; même chose à Cancale (35) et à Marennes-Oléron (17)
- [ ] Décocher la case → **les quatre flux** disparaissent ensemble ; recocher → tous reviennent
- [ ] Cliquer sur une parcelle affichée → popup rouge nommant la parcelle (`CM1PAR`), la commune et l'espèce, avec la mention de la DDTM source
- [ ] Aucun marqueur ni coordonnées GPS n'apparaissent, et les étapes 3 et 4 du guide repassent à zéro
- [ ] Cliquer juste à côté de la parcelle, sur l'eau libre → le parcours reprend normalement et **rien** n'est dit des cultures marines
- [ ] Cliquer dans un couloir entre deux blocs de bouchots en baie du Mont-Saint-Michel (48,649899 N / −1,684100 E) → **pas** de blocage, mais une carte « Parcelle de cultures marines à 10 m » *(v2.21 ; vérifié en ligne le 14/10/2026)*
- [ ] Cliquer en rade d'Hyères → carte repliée « Cultures marines : non vérifiées ici » (aucun cadastre publié sur ce secteur)
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

### ✅ 12ter. Réduction du popup de coordonnées *(v2.27)*
- [ ] Cliquer sur l'eau → « Réduire ▾ » est visible à gauche de « Effacer le point ✕ », nettement séparés, sans chevauchement avec la première carte
- [ ] Cliquer sur « Réduire » → le panneau devient une barre d'une ligne, au même endroit (bas à gauche)
- [ ] Le **marqueur reste sur la carte** et la carte sous le panneau redevient visible
- [ ] La barre affiche le nombre de points à vérifier (« 3 points à vérifier », « 1 point à vérifier » au singulier) et les coordonnées du point
- [ ] Cliquer sur la barre → le panneau se redéploie **à l'identique** : mêmes cartes, mêmes coordonnées, mêmes valeurs saisies dans le formulaire d'évitage, cercle d'évitage toujours affiché
- [ ] Panneau réduit → cliquer un **nouveau point sur l'eau** → le panneau **reste réduit**, la barre se met à jour (compte et coordonnées) et marque brièvement le changement par un fond bleu pâle
- [ ] Panneau réduit → cliquer un point **à terre** → le panneau se redéploie tout seul sur l'avertissement
- [ ] Panneau réduit → cliquer un point **interdit** (parcelle conchylicole ou APB) → le panneau se redéploie tout seul sur l'interdiction
- [ ] Panneau réduit → cliquer sur un **port ou une ZMEL** → la modale du port/ZMEL s'ouvre, le popup reste réduit et inchangé
- [ ] Panneau réduit → cliquer un nouveau point → **le focus ne saute pas** (en iframe : `window.scrollY` reste à 0)
- [ ] Panneau réduit → cliquer un nouveau point → la carte ne glisse **qu'une fois**, vers le nouveau point (pas de double recadrage)
- [ ] Panneau réduit → « Effacer le point » → le popup disparaît et le marqueur est retiré ; le clic suivant rouvre un panneau **déplié**
- [ ] Panneau réduit → Échap → même effet que « Effacer le point » *(comportement conservé, signalé comme à arbitrer)*
- [ ] Point à moins de 100 m d'une AOT avec **recoupement d'évitage** détecté, puis réduire → la barre dit « Recoupement possible », l'avertissement ne disparaît pas silencieusement
- [ ] Réduire **pendant** « Vérification des zonages… » → la barre dit « Vérification en cours… », puis le compte apparaît tout seul
- [ ] Au clavier dans l'état **réduit** : la **première** tabulation atteint la barre, la seconde « Effacer le point » (jamais l'inverse)
- [ ] Au clavier : chaque commande reçoit un anneau de focus bleu nettement visible ; Entrée replie, le focus passe sur la barre, Entrée redéploie
- [ ] Au lecteur d'écran : la barre annonce « Rouvrir le panneau — 3 points à vérifier 45.8… » (le compte et les coordonnées sont bien lus) et son état replié/déplié
- [ ] Agrandissement du texte à 200 % (zoom texte seul) → les boutons ne recouvrent pas la première carte
- [ ] Fenêtre étroite (< 700 px) → la barre réduite tient sur une ligne, texte et chevron restés groupés à gauche, « Effacer le point » à droite derrière un filet visible
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
- [ ] *(v2.25.1)* Ouvrir une page d'amidomar.beta.gouv.fr qui embarque la carte (Première demande, Poursuite d'occupation, Renonciation) → la page s'affiche **en haut**, pas à la hauteur de l'iframe
- [ ] *(v2.25.1)* Dans la carte embarquée, fermer puis rouvrir la marche à suivre avec ❓ → le bouton de fermeture reçoit bien le focus (navigation au clavier, `Échap` ferme) **sans** que la page parente ne défile

### ✅ 18. Sélecteur de fond de carte
- [ ] Ouvrir le sélecteur de fond de carte (bas-gauche) → seuls les fonds **Simple** et **Aérien** sont proposés dans « Cartes »
- [ ] Aucune section « Surcouches » n'apparaît dans ce sélecteur
- [ ] Basculer entre Simple et Aérien → la carte change de fond sans erreur console

---

### ✅ 19. Règles locales — rattachement départemental *(v2.22)*
- [ ] Cliquer dans l'eau en rade de Brest → bloc « RÈGLES LOCALES », mention « Emplacement rattaché à : Finistère (29) » à **droite** du titre, et **aucune** carte orange
- [ ] Cliquer en baie de Saint-Brieuc → rattachement « Côtes-d'Armor (22) » et carte orange « ne délivre plus de nouvelles AOT… »
- [ ] Déplier la carte du 22 → le lien « S'inscrire sur la liste d'attente » ouvre bien la démarche, dans un nouvel onglet
- [ ] Cliquer en rade de Toulon → rattachement « Var (83) », carte orange, liste des zones **et** mention « Information provisoire » (tant que les zones ne sont pas renseignées)
- [ ] Le bloc « Règles locales » apparaît **au-dessus** de « Contexte environnemental »
- [ ] Cliquer très au large (plus de 10 km de toute côte) → **aucun** bloc « Règles locales », et aucune erreur console
- [ ] Couper le réseau puis cliquer → aucun bloc « Règles locales », le reste du popup fonctionne normalement

### ✅ 21. Zones de mouillage autorisées *(v2.23)*
- [ ] Rechercher « Saint-Tropez » → les 5 zones apparaissent en orange sur la carte (1 à La Bouillabaisse, 4 aux Canebiers)
- [ ] Décocher « Zones de mouillage autorisées (AOT) » dans la légende → les polygones disparaissent ; recocher → ils reviennent
- [ ] Cliquer **dans** une zone → la carte de règle locale est **verte**, première ligne « La DDTM du Var autorise les nouvelles AOT de mouillage individuel dans cette zone — sous réserve de places disponibles (Saint-Tropez — La Bouillabaisse, zone 1) », seconde ligne « identifier les autres zones autorisées », bouton « Voir les zones » ; **une seule** carte DDTM, aucun bandeau vert séparé ; et le parcours continue (marqueur posé, coordonnées affichées) — un clic en zone autorisée ne doit pas se comporter comme un clic sur un port
- [ ] Dans une zone, déplier « Identifier les autres zones autorisées » → **4** zones listées, celle où l'on se trouve n'y figure pas
- [ ] Cliquer dans le Var **hors** de toute zone → la carte est **orange**, titrée « ne délivre plus… », et les **5** zones sont listées sous « Voir les zones »
- [ ] Déplier « Voir les zones » → les noms sont des liens soulignés
- [ ] Cliquer un nom → la carte se recadre sur la zone, celle-ci n'est **pas** cachée par le popup, et la liste reste dépliée
- [ ] Cliquer un second nom à la suite → le recadrage fonctionne aussi
- [ ] Vérifier que la détection des parcelles conchylicoles marche toujours (§8) : les deux fonctionnalités partagent `pointDansAnneau`

### ✅ 20. Dégagement du point cliqué sous le popup *(v2.22)*
- [ ] Cliquer dans le coin **bas-gauche** de la carte, là où le popup s'affiche → la carte glisse et le marqueur rouge reste visible à droite du panneau
- [ ] Cliquer ailleurs sur la carte, loin du popup → **aucun** glissement
- [ ] Réduire la fenêtre sous 700 px, cliquer sous le popup → le glissement se fait vers le **haut**, pas vers la droite
- [ ] Activer « réduire les animations » dans le système → le glissement est instantané, sans transition
- [ ] Après l'arrivée des cartes (le popup grandit), le marqueur est toujours visible

### ✅ 22. Recherche par coordonnées GPS *(v2.25)*
- [ ] Saisir `43.267710, 6.622611` → une entrée épinglée « Point GPS — 43.267710, 6.622611 » **en tête** du déroulant, avec `43°16.063'N 6°37.357'E` en sous-titre
- [ ] Rien ne bouge sur la carte tant que l'entrée n'est pas sélectionnée
- [ ] Sélectionner l'entrée → la carte se centre, le marqueur rouge est posé et le popup s'ouvre comme pour un clic (coordonnées reportables, environnement, règles locales)
- [ ] Saisir `43,267710, 6,622611` (virgule décimale, copie depuis Excel/Grist) → même point
- [ ] Saisir `43°16.063'N 6°37.357'E` → même point
- [ ] Saisir `43°16'03.8"N 6°37'21.4"E` → même point à ~1 m près
- [ ] Saisir `6.622611, 43.267710` (inversé) → le point est corrigé et le sous-titre indique l'inversion
- [ ] Saisir `43.26` → entrée d'aide « Format attendu : … » ; cliquer dessus **conserve** `43.26` dans le champ
- [ ] *(v2.31)* Saisir `43,267710 6,622611` (virgule décimale, séparateur espace — copie de deux cellules voisines) → même point
- [ ] *(v2.31)* Saisir `43,267710; 6,622611` → même point
- [ ] *(v2.31)* Saisir `43,2677N 6,6226E` → même point à une dizaine de mètres près
- [ ] *(v2.31)* Saisir `43°16,063'N 6°37,357'E` (virgule nautique) → même point que la version à point décimal
- [ ] *(v2.31)* Saisir `43,16` → **aucune** entrée « Point GPS » ; une entrée « Écrivez 43.16 ou 43 16 — virgule ambiguë », **affichée en entier** (non tronquée), et cliquer dessus **conserve** `43,16` dans le champ
- [ ] *(v2.31)* Saisir `44,1`, puis `-1,16`, puis `43, 6` → même refus explicite à chaque fois, jamais de point posé
- [ ] *(v2.31)* Saisir `Gruissan, Aude` → résultats de communes, **aucune** entrée « Virgule ambiguë » parasite
- [ ] Saisir `Saint-Tropez` → résultats de communes de la Géoplateforme, **aucune** entrée « Point GPS » parasite
- [ ] Saisir une coordonnée en Bretagne (`47.4869, -3.0997`, Port-Haliguen) → le point tombe bien dans le Morbihan, longitude négative gérée
- [ ] Le placeholder affiche « Commune, lieu-dit ou coordonnées » sans troncature

---

### ✅ 23. Vue « mouillage existant » *(v2.26)*
- [ ] Ouvrir la carte **sans paramètre** → modale « Choisir un emplacement de mouillage en 4 étapes », 4 étapes, bouton « Commencer »
- [ ] Ouvrir la carte avec **`?vue=existant`** → modale « Visualiser votre mouillage actuel », 3 étapes, bouton « Visualiser mon mouillage »
- [ ] Dans cette vue, l'étape « port ou ZMEL » (bloc vert) et l'étape « copier les coordonnées » sont **absentes**
- [ ] Coller une coordonnée (ex. `43.267710, 6.622611`) dans le champ de recherche → la carte se centre, le popup s'ouvre, et **l'étape 2 passe au ✓** en gardant son numéro 2 (pas 3)
- [ ] Cliquer directement sur la carte dans cette vue → même traitement que dans la vue par défaut (marqueur, popup, couches), l'étape 2 passe au ✓
- [ ] Bouton ❓ → rouvre bien la modale « Visualiser votre mouillage actuel », pas celle par défaut
- [ ] Ouvrir avec **`?vue=nimportequoi`** → modale par défaut à 4 étapes (aucune régression du comportement historique)
- [ ] Ouvrir avec **`?embed&vue=existant`** → bandeau masqué **et** modale « mouillage existant »

---

## 10. Résolution de problèmes courants

### Une page qui embarque la carte s'ouvre au milieu au lieu du haut *(v2.25.1)*
**À vérifier dans cet ordre :**
1. **Un `focus()` est-il posé pendant l'initialisation du script ?** C'était la cause en octobre 2026 : `ouvrirGuide()` posait le focus sur `#guide-fermer` au démarrage, et le navigateur fait défiler la page porteuse jusqu'à l'iframe dont un élément prend le focus. Le correctif passe `{ sansFocus: true }` à l'ouverture automatique.
2. **Un focus posé plus tard l'est-il avec `preventScroll: true` ?** `ouvrirGuide` et `ouvrirModale` doivent l'être — sans quoi le saut revient à la première réouverture.
3. **Ce n'est pas une ancre.** L'URL de l'iframe n'a pas de `#`, et aucun paramètre d'URL ne pilote ce comportement : le seul paramètre lu est `embed`, qui masque le bandeau. Rien à corriger côté CMS du site porteur.
4. **Mesurer plutôt que supposer :** sur la page porteuse, comparer `window.scrollY` au chargement avec la position de l'iframe (`iframe.getBoundingClientRect().top + window.scrollY`). Un écart de quelques dizaines de pixels signe un défilement vers l'iframe, pas une restauration de position ni une ancre.

### Une coordonnée saisie n'ouvre pas le popup, ou tombe au mauvais endroit *(v2.25)*
**À vérifier dans cet ordre :**
1. **L'entrée a-t-elle été sélectionnée ?** Taper les coordonnées ne suffit pas : il faut cliquer l'entrée « Point GPS » (ou la valider au clavier). C'est volontaire — l'usager confirme l'interprétation avant que la carte bouge.
2. **Le popup dit « vous êtes à terre » ?** Le point est pris en charge normalement ; c'est la détection terre/eau qui parle (§4.4). Si le fond de carte ne s'est pas chargé, la détection locale n'a rien à lire et l'arbitrage Shom ne peut pas répondre : vérifier d'abord le fond de plan.
3. **Le point tombe à l'autre bout de la carte ?** Latitude et longitude sont probablement inversées *et* le couple inversé tombait lui aussi dans l'emprise France — le garde-fou ne peut alors pas trancher. Vérifier l'ordre : latitude d'abord.
4. **Rien ne s'affiche dans le déroulant ?** La saisie fait-elle au moins 3 caractères (`minChars` du contrôle) ? Une saisie de chiffres non interprétable doit afficher l'entrée « Format attendu » — si même elle n'apparaît pas, le provider n'est pas branché : vérifier que `GpsGeocoder` figure bien dans `providers` au `map.addControl`.
5. **Après une mise à jour de carte-facile :** le contrôle doit toujours exposer l'option `providers` et consommer `label`, `description`, `icon`, `center` et `data` d'un résultat. Une refonte de son API casserait la recherche GPS sans erreur de syntaxe.

### Une saisie à virgule affiche « Virgule ambiguë » au lieu du point *(v2.31)*
C'est volontaire, et ce n'est pas un refus de la virgule : `43,16` peut se lire 43.16 (décimale française) comme 43 / 16 (latitude, longitude), et la carte ne choisit pas à la place de l'usager. Lever le doute suffit :
- recopier l'une des deux saisies que le message propose — `43.16` ou `43 16` ;
- écrire la décimale avec un point — `43.16, 6.37` ;
- ou séparer les deux coordonnées autrement que par une virgule — `43,16 6,37`, `43,16; 6,37` ;
- ou garder le format nautique — `43°16.063'N 6°37.357'E`.

Si à l'inverse une saisie à virgule dont la lecture est certaine (`43,267710 6,622611`, `43,267710, 6,622611`) affiche ce message, c'est un vrai défaut : vérifier `normaliserSaisieGps` et rejouer le jeu de cas du §4.6 des TESTS_FONCTIONNELS.md.

### Les parcelles de cultures marines ne s'affichent pas, ou le clic ne les détecte pas *(v2.18)*
**À vérifier dans cet ordre :**
1. **Le secteur est-il couvert ?** Seuls le Finistère, l'Ille-et-Vilaine et la Charente-Maritime publient un flux. Partout ailleurs, c'est normal : le popup affiche « Cultures marines : non vérifiées ici ».
2. **Le flux répond-il ?** Ouvrir dans un navigateur le `GetCapabilities` du flux concerné (URL dans `CADASTRES_CM`). S'il répond mais que le clic ne détecte rien, tester un `GetFeature` : un `ExceptionReport` signale une panne serveur côté GéoIDE — c'est le cas de la DDTM 50 depuis au moins le 13/10/2026 (encodage `8859part1`).
3. **Ordre des axes :** si une requête construite à la main ne renvoie jamais rien, vérifier que la `BBOX` est bien en **latitude, longitude** (WFS 1.1.0 + `EPSG:4326`) et non l'inverse.
4. **Emprise :** une parcelle visible mais non détectée au clic peut être hors de l'`emprise` enregistrée dans `CADASTRES_CM` (emprises relevées le 13/10/2026 ; à rafraîchir si une DDTM étend sa couche).
5. **Une seule couche s'affiche sur quatre :** vérifier que `tiles` est bien une liste et que les couches `cultures-1-layer`, `cultures-2-layer`, `cultures-3-layer` existent (`map.getLayer(...)` en console).

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

### « Nature du fond : à vérifier » s'affiche presque partout *(v2.15)*
Ce n'est probablement pas une panne. La couche du Shom ne couvre pas tout le littoral : elle synthétise 45 cartes sédimentaires publiées entre 1990 et 2023, et il manque des feuilles entières. Mesuré le 12/10/2026 : 3 % de réponses en Côtes-d'Armor, 27 % en Ille-et-Vilaine, contre 87 à 100 % en Finistère, Morbihan et Var. Pour distinguer une vraie panne d'un trou de couverture : une panne n'affiche **aucun** bloc « Nature du fond », tandis qu'un trou affiche le message « à vérifier ».

### Faux « vous êtes à terre » au milieu d'un large estran *(corrigé le 14/10/2026)*
Symptôme caractéristique : l'avertissement apparaît sur un point d'estran manifestement maritime, **et disparaît quelques mètres plus loin**. Ce n'est pas le trait terre-mer qui se trompe, c'est le test de couverture (§4.4.2) : dans une baie très large à marée basse, le point peut être à plus de `CONFIG.rayonCouvertureShom` de toute terre cartographiée, et la fonction conclut à tort « hors couverture ». Le caractère capricieux vient de l'isoligne du rayon, qu'on franchit en quelques mètres.
Pour le diagnostiquer : interroger le service en réel sur le point, avec les deux filtres. `INTERSECTS` à 0 objet et `DWITHIN` à 0 objet alors que le point est évidemment en mer = rayon trop court. Rayon porté de 5 à 20 km le 14/10/2026.

### Un clic sur une plage ou un estran affiche encore « vous êtes à terre » *(v2.14)*
L'avertissement n'est levé que si le trait terre-mer du Shom répond, et répond « côté mer ». Dans l'ordre :
1. **Le point est-il vraiment sur le DPM ?** Au-dessus de la laisse des plus hautes mers astronomiques, le haut de plage est juridiquement terrestre : le verdict est alors correct.
2. **Le service répond-il ?** Dans l'onglet réseau, chercher l'appel à `services.data.shom.fr`. Une erreur, un délai dépassé (3 s) ou une absence d'appel conduit au repli prudent, qui maintient l'avertissement.
3. **Est-on en outre-mer ?** Le produit ne couvre que la France métropolitaine : hors métropole, la réponse est toujours un repli.
3 bis. **Est-on hors département littoral ?** *(v2.17)* Si le point et son voisinage de 5 km ne renvoient aucun objet, la couche ne couvre pas l'endroit : la fonction ne conclut pas et l'avertissement est maintenu. Normal à l'intérieur des terres, anormal sur un littoral — dans ce second cas, vérifier les deux appels au Shom dans l'onglet réseau.
4. **Le filtre porte-t-il bien `SRID=4326;` ?** Sans ce préfixe, la couche étant en Lambert 93, le service renvoie zéro objet — ce qui produirait l'inverse du bug (tout passerait pour de la mer). À vérifier si des clics en pleine campagne cessent d'être refusés.

### Un clic en pleine terre n'affiche aucun avertissement *(corrigé en v2.17)*
Symptôme : le popup affiche les coordonnées et le contexte environnemental alors que le point est manifestement à terre, sans qu'aucun appel à `services.data.shom.fr` n'apparaisse dans l'onglet réseau. C'est la signature de l'ancien comportement : la détection locale renvoyait « indéterminé » faute d'objet terrestre au pixel, et un verdict indéterminé n'appelait pas le Shom. Si le symptôme réapparaît :
1. **Y a-t-il un appel au Shom ?** S'il n'y en a aucun, le problème est dans la détection locale (`estSurLEau`), pas dans l'arbitrage.
2. **Que renvoie `estSurLEau` ?** Attendu : `false` sur tout point sans objet `hydro_` et sans la couleur de la mer, dès lors que `mapTerrain.areTilesLoaded()` est vrai. Un `null` à cet endroit signale une régression de la v2.17.
3. **La carte fantôme est-elle chargée ?** `mapTerrain.areTilesLoaded()` à `false` renvoie légitimement « indéterminé » : attendre le chargement et recliquer.

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

### v2.31 — 26 octobre 2026
**La virgule du champ de recherche n'est plus devinée**
- Demande de Nicolas : une saisie à virgule ne doit pas être acceptée quand elle est comprise comme des degrés-minutes décimales. En l'état, `43,16` était accepté en silence comme le couple 43 / 16 et le sous-titre en affichait l'équivalent `43°16.000'N`, pouvant poser un point à des centaines de kilomètres du mouillage.
- Arbitrage retenu : la virgule est acceptée **partout où sa lecture est certaine**, et **jamais devinée** quand elle ne l'est pas (voir §4.6, « Règle de lecture de la virgule »). Refuser toute virgule aurait pénalisé les usagers français, dont téléphone, Excel et Grist produisent tous des virgules.
- Nouvelles saisies acceptées : virgule décimale séparée par un espace (`43,267710 6,622611`, la copie de deux cellules voisines) ou par un `;`, et hémisphères en suffixe (`43,2677N 6,6226E`) — toutes refusées avant.
- Nouveau refus explicite : deux ou trois entiers séparés par des seules virgules, sans point (`43,16`, `44,1`, `-1,16`, `43, 6`). Le déroulant affiche les deux lectures possibles et le format qui lève le doute, au lieu de poser un point.
- `normaliserSaisieGps` rend `null` dans ce cas, `parserCoordonnees` le traduit en `{ ambigu:true }`, et `lecturesAmbigues` calcule les deux lectures affichées, sous leur forme déjà corrigée pour tenir dans les ~40 caractères du sous-titre (mesure faite au rendu, voir §4.6). Les noms de lieux à virgule (`Gruissan, Aude`) ne sont pas concernés : la détection exige des groupes d'entiers.

### v2.30 — 26 octobre 2026
**Le bloc d'évitage prend un titre et remonte d'un cran**
- Intitulé **« Mouillages voisins »** (demande de Nicolas). Écarté : « radar proximité AOT mouillage » — il n'y a pas de radar, et « AOT » est un sigle administratif que le popup évite devant un plaisancier, dont le bloc lui-même dit « D'autres mouillages sont enregistrés à proximité ».
- Le bloc passe **entre les deux groupes de cartes** : après ce que la carte a établi, avant ce qu'elle n'a pas pu vérifier.
- `placerBlocEvitage()` déplace le nœud plutôt que de le recréer : saisies et écouteurs survivent. Hors mode « cartes », le bloc reste à sa place sous `#env-block`, qui est alors une boîte colorée.

### v2.29 — 26 octobre 2026
**La profondeur au point s'affiche dans le popup**
- Une carte sable, première du contexte environnemental, avant « Nature du fond ». Elle s'affiche toujours.
- **Les deux bornes de la marée** et non la seule sonde : « Profondeur : 13,7 à 19,1 m selon la marée ». Remarque de Nicolas — la sonde est au zéro hydrographique, le champ d'évitage demande une colonne à marée haute ; côte à côte sans lien, ce sont deux nombres distants du marnage pour le même point.
- **Méditerranée** : ni fourchette ni mention de marée, la référence y étant le niveau moyen. Troisième cas distinct : aucun port de référence, où l'on ne promet pas de borne haute.
- **Millésime et technique de sondage, toujours affichés, sans seuil** (décision de Nicolas) : nouvelles couches WFS « Levés bathymétriques » du Shom, quatre périodes, jointes à la valeur EMODnet par `id_md`. L'identifiant de levé ne porte pas l'année — seuls `sursta`/`surend` font foi. La technique est normalisée depuis `tecsou` (vocabulaire contrôlé) vers un libellé court ; `instrument`, qui porte le modèle de l'appareil, est ignoré.
- **Une interrogation au lieu de deux** : la même promesse sert la carte et l'estimation de colonne d'eau. `chargerPortsRAM` sort de sa condition.
- Ajouts : `CONFIG.delaiLevesBathy`, `WFS_LEVES`, `COUCHES_LEVES`, `levesBathy()`, `leveRetenu()`, `portLePlusProche()`, `interrogerProfondeur()`, `carteProfondeur()`, `TECHNIQUES_SONDAGE`, `techniqueSondage()`. `profondeurEMODnet()` renvoie désormais `{ alt, identifiant }` et `estimerColonneEau()` accepte une profondeur déjà obtenue.
- Tests : harnais Node 33/33 (§6.1bis et §14 de TESTS_FONCTIONNELS.md).

### v2.28 — 26 octobre 2026
**Les cartes du contexte se rangent en deux groupes**
- Demande de Nicolas (15/10/2026) : n'afficher au clic que des résultats fiables, en **hiérarchisant plutôt qu'en masquant**. Une carte qui constate une absence de donnée portait jusqu'ici la couleur de son thème, donc se lisait comme un constat : « Nature du fond : à vérifier » avait le même poids visuel que « Nature du fond : sable ».
- `carteEnv` accepte un drapeau `incertain`, qui ajoute la classe `env-carte--incertain` (gris `#f6f6f6`, filet gauche pointillé `#929292`) sans retirer la teinte de type.
- Les cartes sont triées **sur cette classe** et affichées sous deux intitulés : « Contexte environnemental » puis « Ce que la carte n'a pas pu vérifier » (`popup-section--incertain`, en retrait). Un groupe vide n'affiche pas son intitulé.
- Quatre points d'appel marqués : `carteNatureFond` (absence de cartographie), `carteCulturesMarines` (non vérifiées / injoignable), et la carte d'échec des zonages de protection.
- Vérifié par le harnais Node du §6.1bis de `TESTS_FONCTIONNELS.md` : syntaxe, exécution réelle de la phase synchrone, puis contrôle que la classe est posée, que le type d'origine est conservé et que le tri sépare bien les deux groupes.

### v2.27 — 15 octobre 2026
**Réduire le popup de coordonnées, en plus de l'effacer**
- Demande de Nicolas (UX) : le popup n'avait qu'une seule issue, « Fermer » — et fermer **désélectionne le point**. L'usager qui veut simplement regarder la carte sous le panneau devait donc perdre son emplacement et tout refaire.
- « Réduire ▾ » sépare les deux intentions : masquer l'affichage sans toucher à l'état (marqueur, coordonnées, cercle d'évitage, saisies), contre effacer, qui continue de tout remettre à zéro.
- **La barre réduite n'est pas muette**, et c'est ce qui la rend utile : « 3 points à vérifier » au-dessus des coordonnées, avec les libellés dédiés des états sans carte (« Mouillage interdit ici », « Vous êtes à terre », « Recoupement possible », « Vérification en cours… », « Emplacement sélectionné »).
- Un nouveau clic sur l'eau **laisse le panneau réduit** et met la barre à jour ; seuls un point à terre ou interdit le redéploient.

**Relecture UX / DSFR le même jour, et reprise de l'écriture initiale.** Une relecture indépendante (profil UX service public, DSFR v1.14 et RGAA vérifiés à la source) a validé le parti pris et relevé cinq défauts réels, tous corrigés avant commit :
- **Ordre de tabulation inversé** : la barre était après les actions dans le DOM et réordonnée par `order` en CSS. La tabulation suivant le DOM, la première touche Tab tombait dans l'état réduit sur l'action **destructrice** (WCAG 2.4.3 / 1.3.2). Corrigé par l'ordre du DOM, sans `order`.
- **`aria-label` qui masquait le contenu de la barre** : un lecteur d'écran n'entendait ni le compte, ni les coordonnées (WCAG 2.5.3, pilotage vocal cassé). Remplacé par un préfixe `.sr-only`.
- **État replié jamais annoncé** : `aria-expanded` n'était porté que par le bouton « Réduire », mis en `display:none` au moment même du repli. Porté désormais par les deux boutons, avec `aria-controls` vers un vrai conteneur `#coords-contenu`.
- **Avertissement de recoupement perdu** : `#coords-hint`/`.alerte` n'étant pas une carte, replier le panneau faisait disparaître l'alerte pendant que la barre annonçait « 2 points à vérifier ». L'alerte prime désormais sur le compte.
- **Recadrage parasite** : le redéploiement au clic appelait `degagerPointSousPopup()` alors que `position` contenait encore l'ancien point. Chemin carte désormais sans dégagement (`opts.degager`).
- **« Fermer » renommé « Effacer le point »** : le bouton détruit la sélection sans confirmation et était l'exact jumeau visuel de « Réduire ». Le DSFR applique la même règle dans ses alertes (« Masquer le message ») — le libellé nomme l'effet, pas le geste. Survol en teinte d'avertissement, `gap` porté de 2 à 8 px, cibles à 32 px (plancher `fr-btn--sm`).
- **« Recommandations » → « points à vérifier »** : le compte inclut une règle DDTM (obligation) et des constats d'absence de donnée. Promettre un conseil là où il y a une règle n'est pas tenable sur ce produit.
- **Redéploiement au clic abandonné** au profit du maintien de l'état réduit, avec signal visuel de mise à jour : l'usager qui réduit le fait souvent pour comparer plusieurs emplacements.
- Ajouts d'accessibilité : anneau `:focus-visible` DSFR sur les trois commandes, `type="button"`, `role="region"` sur le popup, bandeau d'actions dans le flux (il recouvrait la première carte à 200 % d'agrandissement de texte, RGAA 10.4), filet séparateur porté de 1,26:1 à 3,1:1 (WCAG 1.4.11).
- Écarts DSFR **antérieurs** relevés par la même relecture et laissés hors périmètre (voir l'encadré en fin de §4.2) : bouton « Copier » en bleu Google, tailles de texte sous 12 px, teintes « presque DSFR », pas de `aria-live`.
- Tests : harnais Node/jsdom — syntaxe, exécution réelle et absence de vol de focus OK, plus **22 tests dédiés** (TESTS_FONCTIONNELS.md §12), tous au vert. Vérification visuelle des deux états à 900 px et 420 px, et à 200 % d'agrandissement de texte (Chromium headless).
- Reste à vérifier en conditions réelles après déploiement : le maintien de l'état réduit au clic, le redéploiement sur verdict bloquant, et le comportement du dégagement du marqueur — le harnais ne peint pas de carte, donc ne distingue pas un clic sur l'eau d'un clic sur un port (même piège qu'en v2.25.2).

### v2.26 — 15 octobre 2026
**Seconde porte d'entrée : la vue « mouillage existant » (`?vue=existant`)**
- Demande de Nicolas : la modale d'accueil s'adresse exclusivement à quelqu'un qui **cherche** un emplacement. Un titulaire d'AOT qui vient vérifier le sien — notamment au moment d'une demande de poursuite d'occupation — y lit une marche à suivre qui ne le concerne pas, à commencer par l'étape « regardez d'abord si un port ou une ZMEL vous convient ».
- Choix retenu : **une seule page, deux URL**. `?vue=existant` remplace la modale d'accueil par « Visualiser votre mouillage actuel » (3 étapes : récupérer la coordonnée dans le formulaire de poursuite ou l'arrêté d'AOT → la coller dans le champ de recherche → vérifier les données contextuelles). Le reste de la carte est strictement identique. Un seul `index.html` à maintenir, et deux adresses distinctes à diffuser sans risque de les confondre.
- Forme de l'URL arbitrée avec Nicolas : paramètre de requête `?vue=existant` plutôt qu'une ancre `#` (invisible côté statistiques de fréquentation) ou un fichier séparé (duplication de code).
- Source des coordonnées formulée à sa demande comme « dans le formulaire de demande de poursuite ou dans votre arrêté d'AOT » : les deux documents circulent, et tous les arrêtés ne portent pas la coordonnée.
- Implémentation : `vueExistant` lit `?vue` une seule fois à l'initialisation ; le corps de la modale est construit dans l'une ou l'autre branche, et `majEtapes()` devient tolérante — elle ignore une étape absente du DOM et numérote la puce de `et-0` avec `guideDecalage` (2 dans la vue existant, 3 dans la vue par défaut) au lieu d'un 3 en dur. Toute valeur inconnue du paramètre retombe sur la vue par défaut.
- Point laissé ouvert, à trancher avec Nicolas : l'étape 1 suppose que l'usager dispose d'une coordonnée en **degrés décimaux**. Les arrêtés anciens n'en portent pas toujours, et certains sont en degrés-minutes-secondes — le champ de recherche n'accepte aujourd'hui que le décimal (§4.6). Une porte de sortie (« Pas de coordonnées sur votre arrêté ? Cliquez directement sur votre emplacement ») reste à arbitrer.
- Tests : harnais Node/jsdom rejoué sur les quatre formes d'URL (sans paramètre, `?vue=existant`, valeur inconnue, `?embed`) — exécution synchrone sans exception, aucun focus posé à l'initialisation, titre/bouton/puces/étapes conformes dans chaque cas, et `majEtapes()` exécutée dans les deux vues sans erreur ni renumérotation parasite. Voir TESTS_FONCTIONNELS.md §11.

### v2.25.3 — 14 octobre 2026
**Arrivée sur un point GPS trop zoomée**
- Signalé par Nicolas après essai sur la version publiée : la saisie fonctionne, mais la carte arrive trop près.
- Cause : le plancher était `Math.max(map.getZoom(), 16)`. En venant de la vue France (zoom 5, `CONFIG.zoom`), on atterrissait donc systématiquement à 16 — cadrage où il ne reste plus de littoral visible une fois le popup et le panneau de légende déduits.
- Le 16 venait d'une confusion : c'est le `maxZoom` du `fitBounds` qui recadre sur une zone AOT (§4.4ter), donc un **plafond** pour un recadrage automatique. Le reprendre comme **plancher** d'une arrivée n'avait pas de raison d'être.
- Correction : plancher à **14**, où le golfe entier reste lisible. Choix d'un plancher et non d'un zoom fixe, validé par Nicolas : qui était déjà plus près garde son échelle de travail — un instructeur qui vérifie plusieurs coordonnées à la suite n'est pas ramené en arrière à chaque saisie.
- Aucune couche n'a de `minzoom` : dézoomer ne masque ni les ports, ni les ZMEL, ni les AOT existantes, donc le clic rejoué trouve les mêmes entités qu'à 16.
- Tests : harnais Node 32/32 inchangé ; vérification visuelle en conditions réelles à 1440 px de large, à 16 puis à 14.

### v2.25.2 — 14 octobre 2026
**Une coordonnée saisie sur un port n'ouvrait pas la modale du port**
- Trouvé en vérifiant la v2.25 sur la version publiée, pas en harnais : saisir `47.4869, -3.0997` (Port-Haliguen) posait un marqueur et ouvrait le popup de coordonnées, alors qu'un **vrai clic au même endroit** ouvrait bien la modale du port. La promesse d'équivalence entre les deux gestes était donc fausse en production.
- Cause : `attendreCarteStable()` surveillait `isMoving()` et `areTilesLoaded()`. Or `jumpTo` est instantané — `isMoving()` est faux tout de suite — et `areTilesLoaded()` parle des tuiles du fond, pas des couches GeoJSON du projet. En arrivant de loin, le clic synthétique partait sur un cadrage pas encore peint, et `queryRenderedFeatures` ne trouvait aucune entité : ni port, ni ZMEL.
- Diagnostic confirmé par l'expérience inverse : la carte **déjà** positionnée sur le port, la même recherche ouvre bien la modale — le `jumpTo` ne bougeant alors rien, les entités étaient déjà peintes.
- Correction : `attendreCartePeinte()` attend l'événement `idle` de MapLibre, dont la définition est exactement la garantie recherchée, et vérifie que la carte fantôme a suivi. Plafond porté à 6 s. L'attente est sautée quand la caméra ne bouge pas, puisque aucun `idle` ne serait émis.
- **À retenir pour les prochaines évolutions** : un harnais headless sans réseau ne voit pas ce genre de défaut. Sans fond de carte, la détection terre/eau n'a rien à lire et les deux gestes partent en branche « à terre » **avant** d'atteindre `queryRenderedFeatures` — le test d'équivalence passait donc au vert pour une mauvaise raison. Tout ce qui dépend de ce que la carte a réellement peint se vérifie sur la version publiée.
- Tests : harnais Node 32/32 inchangé, plus deux vérifications en conditions réelles sur la version publiée (§10.10 et §10.12).

### v2.25.1 — 14 octobre 2026
**Les pages du site qui embarquent la carte s'ouvraient en plein milieu**
- Constat de Nicolas : sur amidomar.beta.gouv.fr, cliquer « Première demande » ou « Poursuite d'occupation » dans le menu ouvrait la page à la hauteur de la carte, pas en haut.
- **Ce n'était ni une ancre, ni l'URL renseignée dans le CMS** — piste suivie d'abord, et écartée par la mesure : au chargement, `location.hash` est vide et `window.scrollY` vaut la position de l'iframe à quelques dizaines de pixels près (19 771 px pour une iframe à 19 730 px sur « Première demande » ; 47 078 px pour 47 037 px sur « Poursuite d'occupation »). C'est la signature d'un défilement **vers** l'iframe.
- **Cause réelle, dans la carte** : `ouvrirGuide()`, appelée à l'initialisation pour afficher la marche à suivre, posait le focus sur `#guide-fermer`. Un focus posé dans une iframe fait défiler la page porteuse jusqu'à cette iframe — comportement normal du navigateur, et d'autant plus spectaculaire que les pages du site sont longues (47 000 px).
- **Correctif** : `ouvrirGuide(options)` accepte `{ sansFocus: true }`, passé au seul appel d'initialisation ; la marche à suivre s'affiche toujours, sans voler le focus. Les focus volontaires — réouverture par le bouton ❓, `ouvrirModale` — sont conservés pour la navigation au clavier, mais passent en `focus({ preventScroll: true })`, qui donne le focus sans faire défiler quoi que ce soit. L'écouteur du bouton ❓ devient `() => ouvrirGuide()` pour que l'objet `Event` du clic ne soit pas pris pour des options.
- Aucune ligne du CMS à changer : l'URL `…/?embed` déjà renseignée reste la bonne.
- Tests : harnais Node (syntaxe, exécution synchrone complète sans exception) plus deux vérifications ciblées — aucun focus posé pendant l'initialisation, et focus reposé avec `preventScroll` à la réouverture. Voir TESTS_FONCTIONNELS.md §6.1quinquies.

### v2.25 — 14 octobre 2026
**Le champ de recherche accepte les coordonnées GPS, pour les instructeurs**
- Demande de Nicolas : pouvoir saisir `43.267710, 6.622611` dans la carte pour pointer l'endroit et en faire apparaître les informations — besoin d'instructeur, qui part d'une coordonnée (Ad'hoc, arrêté, signalement) et veut savoir ce qu'il y a là. C'est le symétrique de l'étape 4, où le plaisancier *copie* ses coordonnées vers son formulaire.
- **Un seul champ, décidé sur le fond** : deux champs auraient obligé l'usager à classer sa saisie avant de taper, et se tromper de champ ne renvoie aucun résultat sans dire pourquoi. `43.267710, 6.622611` n'étant pas confondable avec un nom de commune, la machine tranche seule.
- **Aucune ligne de la librairie modifiée** : le champ est le `SearchControl` de carte-facile, qui accepte une liste de *providers*. Un provider `GpsGeocoder` est ajouté **avant** `GeopfGeocoder` — il arrive donc en tête du déroulant sans retirer de place aux résultats de communes, et `vendor/carte-facile.js` reste remplaçable par un `npm install`.
- Sept formats acceptés *(v2.31)*, dont deux qui comptent vraiment ici : la **virgule décimale française** (`43,267710, 6,622611`, ce que donne un copier-coller depuis Excel ou Grist) et les **degrés-minutes nautiques** (`43°16.063'N 6°37.357'E`, format des cartes marines, des arrêtés et des GPS de bord).
- **Garde-fou sur l'inversion latitude / longitude**, l'erreur la plus courante sur des coordonnées recopiées : si le couple saisi tombe hors de France mais que l'inverse y tombe, le point est corrigé et le résultat le dit.
- **Le clic carte est rejoué au point, plutôt qu'une seconde popup écrite pour l'occasion.** Le corps du gestionnaire de clic est extrait dans `traiterPointCarte(lngLat, point)`, appelée par `map.on('click', …)` comme par la recherche. Un seul chemin de code : terre/eau, cultures marines, APB, zones protégées, nature du fond, règles locales, mouillages voisins et coordonnées reportables sortent tous du même endroit, et aucune divergence ne peut s'installer entre les deux gestes.
- **Deux idées écartées après lecture de la librairie**, et c'est à retenir : le `fr-hint-text` du DSFR n'est pas applicable (le label du contrôle est masqué visuellement, et un contrôle flottant n'a pas de place pour un texte d'aide), et il n'y a pas de suggestions au focus (`minChars: 3` : rien ne s'ouvre champ vide). La découvrabilité passe donc par le placeholder (32 caractères au plus, au-delà le contrôle de 280 px tronque), l'étape 1 de la marche à suivre qui porte l'exemple chiffré, et une entrée d'aide au format dans le déroulant — affichée là où l'usager tâtonne. Cette entrée reprend la saisie comme libellé, parce que le contrôle recopie le libellé dans le champ : cliquer l'aide ne doit pas effacer ce qui a été tapé.
- **Régression évitée, du même genre que celles de v2.2 et v2.23** : le renommage `e.lngLat` → `lngLat` lors de l'extraction de la fonction a d'abord touché la ligne de délégation elle-même (`traiterPointCarte(lngLat, …)`, variable inexistante à cet endroit). Attrapée par un comptage d'occurrences avant / après, pas par le test de syntaxe — qui passait.
- Tests : **53/53** — 32 sur le harnais Node (parseur sur les 5 formats et leurs variantes, inversion, refus des libellés de lieu et des coordonnées hors bornes, contrat du provider) et 21 en Chromium headless (déroulant, épingle, sous-titres, aide au format, non-effacement de la saisie, absence de résultat parasite sur une commune), dont l'**équivalence démontrée entre le clic synthétique et un vrai clic** : même branche de la cascade, même message affiché.
- **Limite connue** : les tests en navigateur tournent réseau coupé, donc sans fond de carte. La détection terre/eau n'a alors rien à lire et le pipeline part en branche « à terre » — les deux gestes y partant identiquement, l'équivalence est prouvée, mais la chaîne complète au-dessus de l'eau (zones protégées, nature du fond, coordonnées reportables) reste à vérifier en conditions réelles. Voir TESTS_FONCTIONNELS.md §10.

### v2.24 — 14 octobre 2026
**Dans une zone autorisée, la règle locale passe au vert au lieu de s'accompagner d'un second bloc**
- Demande de Nicolas, sur capture d'écran : ne pas ajouter de bloc pour la règle locale, mais faire basculer le bloc orange en vert.
- Le motif est le bon : la v2.23 empilait « cet emplacement est autorisé » (vert) au-dessus de « la DDTM ne délivre plus d'AOT en dehors de certaines zones » (orange), et laissait l'usager faire la synthèse de deux messages qui se répondent. Ce n'est pas une information de plus, c'est la même règle dans un autre état.
- Nouvelle teinte `env-carte--ddtm-ok` (vert `#18753c`, bordure complète comme l'orange). Titre, complément, libellé de bouton et détail de l'état « en zone » lus dans `data/ddtm-messages.json` (champs `*_zone`), **pas codés en dur** : la phrase nomme un département, elle doit rester modifiable sans développeur. Repli sur une phrase neutre si les champs sont absents.
- La zone occupée sort de la liste dépliable, dont le bouton devient « Identifier les autres zones autorisées » — y laisser celle où l'on se trouve contredirait le libellé.
- Correction de rédaction : « les nouvelles AOT mouillages individuelles » devient « les nouvelles AOT de mouillage individuel ». L'AOT est l'autorisation, le mouillage individuel en est l'objet ; c'est la formulation des formulaires DN.
- Ajout : le détail de l'état « en zone » précise que la capacité affichée est le nombre d'emplacements de la zone et non le nombre de places libres. « Sous réserve de places » le laissait entendre sans le dire.

**Correction d'un faux positif : « Fond de carte indisponible »**
- Signalé par Nicolas : le message apparaissait puis disparaissait, alors que le fond IGN s'affichait parfaitement sur sa capture.
- Cause : le compteur additionnait **toutes** les erreurs de tuiles de la carte, sans distinguer leur source. Les couches de superposition (Natura 2000, APB, posidonie, aires marines, cultures marines) renvoient des 404 en routine hors de leur emprise — plus de vingt relevés dans la console sur un simple chargement. Six suffisaient à accuser l'IGN à tort.
- Correction : seuls comptent désormais les échecs d'une source **du style** (le fond de plan), relevées dans `demarrer()` avant que les couches du projet soient ajoutées. Tant que cette liste est inconnue, aucune conclusion n'est tirée.
- **Régression évitée au passage** : `sourcesFond` était d'abord déclarée près de son usage, alors que `demarrer()` l'affecte et peut s'exécuter beaucoup plus haut quand le style est déjà en cache. Zone morte temporelle, script entier bloqué. Invisible au test de syntaxe, levée par le test d'exécution réelle — le même mécanisme qu'en septembre 2026 (§11, v2.2).
- 6 tests ajoutés : gestionnaire enregistré, 12 échecs d'une couche de superposition sans alerte, échecs sans source identifiée sans alerte, seuil non atteint à 5, alerte au 6e échec du fond, contenu du message.

- Tests : **43/43** — 37 sur le bloc de règles locales (7 nouveaux sur l'état « en zone » : carte verte et absence de bloc séparé, carte DDTM unique, titre d'autorisation, réserve de places, nom de zone affiché, libellé du bouton, exclusion de la zone occupée ; et 2 sur l'état hors zone : carte orange, 5 zones listées) et 6 sur l'alerte de fond de carte.

### v2.23 — 14 octobre 2026
**La règle locale prend un cadre, et les cinq premières zones du Var remplacent les placeholders**
- Demande de Nicolas : encadrer entièrement la carte de règle locale plutôt que de lui donner un simple filet à gauche, « c'est une règle qui prime sur les autres ». Bordure de 2 px sur les quatre côtés, rayon porté à 4 px partout (un arrondi partiel n'a de sens qu'avec un filet sur un seul côté).
- Zones du Var reçues de la DDTM 83, par deux cartes PDF (n°41 Les Canebiers, n°42 La Bouillabaisse, octobre 2022) : **cinq zones, toutes à Saint-Tropez**, avec capacité, exposition, profondeur et les quatre sommets GPS de chacune.
- **Reformulation nécessaire, et pas cosmétique** : le texte annonçait « les zones dédiées au mouillage individuel dans le Var ». Cinq zones tropéziennes ne sont pas les zones du Var — un plaisancier cliquant au large de Bandol aurait lu une liste qui ne le concerne pas comme si elle était exhaustive. Le texte dit désormais « zones connues à ce jour », annonce que la couverture se limite à Saint-Tropez, et chaque entrée nomme sa commune. Le drapeau `brouillon` reste posé.
- **Les sommets GPS deviennent des polygones** : `data/zones-aot.geojson`, nouvelle couche `zones_aot` visible sur la carte, liste du popup générée depuis ce fichier (et non recopiée dans les messages), noms de zone cliquables qui recadrent la carte, et détection « vous êtes dans une zone autorisée » au clic. Voir §4.4ter.
- Contrôle de cohérence de la saisie : surface ÷ capacité = 863 à 1 065 m² par mouillage sur les cinq zones, soit ~18 m de rayon d'évitage. Convergence qui écarte la faute de frappe, sans valoir validation par la DDTM 83.
- **Régression évitée de justesse, à retenir** : une seconde fonction `pointDansAnneau` avait été ajoutée pour ce besoin. Les déclarations de fonction étant hissées, elle écrasait celle du cadastre conchylicole et cassait la détection des parcelles — fonctionnalité sans rapport. Le test de syntaxe passait ; c'est l'**exécution réelle** (§5.2 du skill) qui l'a attrapée. La fonction d'origine est désormais réutilisée, avec conversion de l'ordre des coordonnées.
- Tests : **25/25** (6 nouveaux : liste partielle, commune par entrée, 5 boutons cliquables, invite au clic, point dans une zone, point hors zone).

### v2.22 — 14 octobre 2026
**Le clic dit de quelle DDTM relève l'emplacement, et quelles règles y sont appliquées**
- Demande de Nicolas : savoir, au clic dans l'eau, à quelle DDTm la zone se rattache — pour afficher le message propre à certains départements.
- **Rien de nouveau à collecter** : la couche du trait terre-mer du Shom, déjà interrogée depuis la v2.14, porte un attribut `numdep` que le code demandait déjà (`propertyName=id,numdep`) et jetait. La V2 « interrogation des zonages » de la note cartographie n'avait pas vu que le département en faisait partie.
- **Limite documentée plutôt que masquée** : la couche décrit des surfaces terrestres, donc le département n'est **jamais** lu au point cliqué (qui est en mer par définition) mais sur la terre la plus proche. C'est une inférence. D'où la ligne « Emplacement rattaché à … », qui n'est pas un avertissement mais rend l'erreur repérable. Voir §4.4ter pour les trois configurations qui la mettent en défaut.
- Rayons progressifs 1 / 2 / 5 / 10 km, arrêt au premier qui répond : au-delà de 5 km le plafond de `count` peut masquer un second département. Relevé de calibrage (6 points, interrogation réelle du Shom le 14/10/2026) au §4.4ter.
- Deux départements au plus petit rayon → les deux messages sont affichés, sans arbitrage.
- Messages dans `data/ddtm-messages.json`, en **texte brut** échappé à l'affichage et liens filtrés sur `https://` : ce fichier viendra de Grist, rédigé par des agents DDTM. Noms de champs déjà alignés sur la future table DDTM.
- Renseignés : **22** (plus d'AOT, redirection vers la liste d'attente départementale) et **83** (zones dédiées). **Les zones du Var restent à compléter** — drapeau `brouillon` posé, mention « information provisoire » affichée.
- Bloc « Règles locales » placé **avant** « Contexte environnemental », teinte orange `env-carte--ddtm`.
- **Deuxième correctif, indépendant** : `degagerPointSousPopup` fait glisser la carte quand le marqueur tombe sous le popup — l'angle mort que la v2.21 avait explicitement assumé. Voir §4.4quater.
- Tests : **21/21** sur le nouveau bloc (`TESTS_FONCTIONNELS.md` §9), dont 4 d'injection HTML, plus exécution synchrone complète du script et non-régression `rayonEvitage` (16 / 21). Le glissement de carte n'est pas couvert par le harnais Node (il dépend de la géométrie réelle du rendu) : **à vérifier en navigateur** — checklist §9.20.

### v2.21 — 14 octobre 2026
**Une parcelle de cultures marines à moins de 40 m est signalée, sans bloquer**
- Déclencheur : un clic de Nicolas en baie du Mont-Saint-Michel, entre deux blocs de bouchots. La carte ne disait rien, alors que la parcelle la plus proche (12000944, Saint-Broladre, moules) est à **10 m** — vérifié sur le cadastre de la DDTM 35, et 18 parcelles dans un rayon de 200 m. Ne rien dire à cette distance est trompeur : le seul rayon d'évitage d'un voilier de 10 m la dépasse largement.
- **Erreur de mesure à ne pas refaire.** La première vérification manuelle annonçait 36 m : elle ne lisait que le **premier** `<gml:posList>` de chaque entité. Or ces parcelles sont des `MultiSurface` de 3 à 5 polygones — un parc à moules est fait de plusieurs rangées de pieux. Le code, lui, lit tous les anneaux et trouve 10 m : c'est la mesure à la main qui était fausse. Toute vérification manuelle du cadastre doit parcourir **tous** les `posList` d'une entité.
- Troisième voie retenue : signaler sans bloquer. Élargir le blocage aurait été refuser un emplacement qui n'est pas sur une parcelle concédée, ce que rien ne justifie juridiquement.
- Carte : « **Parcelle de cultures marines à {n} m** » / « votre rayon d'évitage peut l'atteindre », détail « Il serait préférable d'envisager un autre emplacement. » Seuil (40 m) et texte choisis par Nicolas.
- La requête passe d'un rayon de 5 m (25 m en linéaire) à **40 m pour toutes les couches**, et jusqu'à 20 entités : la carte lit désormais la géométrie renvoyée et **mesure** la distance au contour, au lieu de se contenter d'un oui/non. Blocage à 5 m ou à l'intérieur du polygone, information jusqu'à 40 m. Quand deux flux couvrent le point, la parcelle la plus proche l'emporte.
- **Vérification qui conditionnait tout le reste :** MapServer filtre bien sur la géométrie réelle et non sur le rectangle englobant (point à 53 m d'un bouchot diagonal, mais dans son rectangle englobant → aucune réponse). Les bouchots étant des bandes diagonales, un filtre par rectangle aurait signalé à tort tous les couloirs entre parcelles.
- Tests : **45/45**, dont 4 nouveaux sur la parcelle voisine (`TESTS_FONCTIONNELS.md` §8), rejoués sur la version incluant le correctif du rayon de couverture (commit `c3478b3`, mené en parallèle dans une autre session).

### 14 octobre 2026 — correctif du garde-fou de couverture terre/mer
**Correction de bug : faux « vous êtes à terre » sur les larges estrans**
- Signalé par Nicolas sur la baie du Mont-Saint-Michel : l'avertissement apparaissait sur un point d'estran, et disparaissait quelques mètres plus loin.
- Cause : le test de couverture ajouté en v2.17 (§4.4.2) utilisait un rayon de 5 km, calibré la veille sur des points de mer tous proches du rivage. Dans une baie très large à marée basse, le point est à plus de 5 km de toute terre cartographiée : le test concluait « hors couverture » et la fonction renvoyait `null`, que le gestionnaire de clic traite — prudemment — comme « à terre ». Mesuré : sur 24 points tirés au hasard dans la baie, le Shom répondait « mer » 24 fois, le test de couverture échouait 8 fois.
- Correction : `CONFIG.rayonCouvertureShom` porté de 5 à **20 km**. Aucun rayon ne sépare les deux cas (la mer en exige au moins 20, les villes de l'intérieur moins de 10) : le choix est fait sur la conséquence, bloquer un estran légitime étant bien plus coûteux que ne pas avertir un clic à Niort. Tableau de relevés et risque résiduel au §4.4.2.
- Vérification : 30 points tirés au hasard dans la baie → **0 faux « à terre »** (contre 8 sur 24 avant), et 23 scénarios de non-régression rejoués, 23/23. Voir `TESTS_FONCTIONNELS.md` §1, tests 28 et 30.

### v2.19 — 14 octobre 2026
**« Aucun zonage de protection détecté ici » ne s'affiche plus**
- Demande de Nicolas, sur une capture d'un clic au large de Flamanville : quand rien n'est détecté, ne rien afficher plutôt que d'annoncer l'absence. Une bonne nouvelle n'a pas besoin d'une ligne — l'absence de carte le dit déjà, et chaque ligne de moins rend les lignes restantes plus lisibles.
- La carte verte `env-carte--ok` est supprimée, ainsi que sa teinte : plus aucun emploi du vert dans le contexte environnemental.
- **Ce qui reste affiché, et pourquoi :** la carte « Zonages de protection : vérification impossible ». « On ne sait pas » n'est pas « il n'y a rien » : la taire reviendrait à faire passer une panne pour une absence de zonage.
- Si plus aucune carte n'a lieu d'être, le bloc entier disparaît — y compris le titre « Contexte environnemental », qui annoncerait un vide.
- Tests : 41/41 après mise à jour de l'assertion correspondante. Au passage, le harnais « nature du fond » lisait le popup trop tôt depuis que le cadastre conchylicole part en parallèle : attente portée de 2 800 à 3 600 ms (deux échecs intermittents observés avant correction, puis trois exécutions consécutives à 8/8).

### v2.18 — 13 octobre 2026
**Cultures marines : le polygone fictif cède la place au cadastre conchylicole des DDTM**
- Jusqu'ici, la seule règle bloquante « cultures marines » en production reposait sur **un polygone inventé** en rade d'Hyères (`data/cultures-marines.geojson`). Fichier supprimé du dépôt, entrée retirée de `SECOURS`.
- Recherche de source menée le 13/10/2026, tous les chiffres mesurés (voir §4.3ter) : le cadastre aquacole national du Cerema est bien la version harmonisée des fichiers DDTM — **37 612 parcelles**, soit 50 fois la couche « fermes marines » du Shom (747) — mais il n'a **aucun en-tête CORS**, ne renvoie aucune géométrie et n'expose ni WMS ni WFS : inappelable depuis une page web. Le flux WMS national de Géolittoral ne contient pas le cadastre.
- Source retenue : les **cadastres départementaux des DDTM sur GéoIDE**, en WFS 2.0.0 et WMS, avec les en-têtes CORS, en Licence ouverte 2.0. Quatre flux branchés : Finistère (1 406 parcelles, juin 2026), Ille-et-Vilaine (2 194, mars 2024), Charente-Maritime surfacique (13 391) et linéaire (1 254, février 2023).
- Interrogation au clic en `BBOX` (MapServer ne gère pas `CQL_FILTER`), **axes en latitude puis longitude**, tolérance de 5 m pour les surfaces et 25 m pour les linéaires. Menée **en parallèle de l'APB** : deux interdictions, un seul temps d'attente. Latences mesurées : 147 ms sans parcelle, 736 ms au premier appel sur une parcelle.
- Quatre issues distinctes plutôt que deux : parcelle trouvée (interdiction), absence confirmée (silence), secteur sans cadastre publié, flux injoignable. Un `ExceptionReport` de MapServer est traité comme une **panne**, jamais comme une absence de parcelle.
- Affichage : les quatre flux en WMS sous une seule case de légende. `COUCHES` accepte désormais une liste d'URL dans `tiles`, avec bascule groupée.
- Nouvelle teinte de carte `env-carte--usage` (#00838f, la couleur de la couche dans la légende) pour les cartes « non vérifiées ici » et « vérification impossible ».
- **Tests : 41/41.** 15 nouveaux tests (`TESTS_FONCTIONNELS.md` §8) et les 26 tests existants rejoués. Les trois harnais antérieurs ont dû être remis à jour sur le contrat de la v2.17 : ils simulaient l'eau par « aucun objet terrestre », ce qui vaut désormais « pas de preuve d'eau » — ils déclaraient donc tous les points à terre et ne protégeaient plus rien.
- **Reste à faire :** signaler le bug d'encodage à la DDTM 50 ; décider si Morbihan, Vendée, Loire-Atlantique et Gironde justifient d'héberger leurs fichiers dans `data/` faute de flux ; `README.md` (ligne 175) cite encore le fichier supprimé.

### v2.17 — 13 octobre 2026
**Correction de bug : la détection terre/mer laissait passer la plupart des points terrestres**
- Signalé par Nicolas sur deux captures (un champ au sud de Caen, `49.095841 / -0.022765` ; un point à l'intérieur des terres au cap Blanc-Nez, `50.930565 / 1.762662`) : le popup affichait coordonnées et contexte environnemental sans aucun avertissement « Vous êtes à terre », à tous les zooms testés.
- Cause : `estSurLEau` cherchait **la terre**, alors que la terre ordinaire n'est pas un objet du fond Plan IGN. Un champ, une plage, une dune ou un bourg sans bâti au pixel cliqué ne portent aucun objet et ne sont qu'un aplat `rgb(240,240,237)`. Le verdict retombait sur « indéterminé », lequel laisse passer le clic — et n'appelle jamais le trait terre-mer du Shom, qui répondait pourtant correctement sur les deux points.
- Correction : **inversion de la charge de la preuve**. C'est désormais l'eau qui doit être prouvée (objet `hydro_`, ou couleur exacte de la mer). Un objet terrestre reste prioritaire, pour que l'estran continue de partir à l'arbitrage du Shom. Sans preuve d'eau et avec les tuiles chargées, le point est terrestre.
- Corrigé dans le même mouvement : `return mapTerrain.areTilesLoaded() ? null : null;`, dont les deux branches étaient identiques.
- **Second verrou :** la couche du Shom ne couvrant que les départements littoraux, « zéro objet » pouvait aussi vouloir dire « hors couverture » — un clic en plein Paris ou en plein Lyon aurait été lu comme « en mer » une fois la détection locale corrigée. Ajout d'une seconde requête `DWITHIN` en parallèle, rayon `CONFIG.rayonCouvertureShom`, calibré sur relevés réels (§4.4.2). Zéro au point et zéro autour → hors couverture, repli prudent. *Rayon initialement fixé à 5 km, porté à 20 km le 14/10/2026 — voir l'entrée du 14 octobre.*
- Vérification : 20 scénarios rejoués sur la version publiée avec le code corrigé injecté — 20/20, latence Shom 28 à 124 ms. Voir `TESTS_FONCTIONNELS.md` §1, tests 24 à 29.

### v2.16 — 13 octobre 2026
**Popup réorganisée en deux parties : contexte environnemental, puis valeurs à reporter**
- Le contexte devient une carte repliable par information, toutes repliées au départ. Chaque ligne repliée porte la conséquence (« étude d'incidence à prévoir », « ne laissez pas votre chaîne racler le fond ») : c'est ce qui rend le repli tenable
- Les boutons nomment une action (« Ce que ça implique », « Comment mouiller ici ») plutôt qu'un contenu
- Deux couleurs porteuses de sens : bleu pour les zonages de protection quel que soit leur nombre, sable pour la nature du fond. **Pas de pictogramme d'alerte** : un fond de sable est une bonne nouvelle, et tout signaler comme une alerte userait le symbole avant les vrais cas (mouillage interdit, cultures marines)
- Nouveau bloc « À reporter dans le formulaire de demande » : le nom de la zone Natura 2000 sort du paragraphe pour devenir une valeur copiable, à côté des coordonnées, chacune avec son bouton. Seule la copie des coordonnées valide l'étape 4
- La ligne « nom de la zone » est masquée hors Natura 2000 : les ZNIEFF n'ont pas de nom dans la source
- Nouveau cas visible : « Aucun zonage de protection détecté ici » (vert) et « Zonages de protection : vérification impossible » (service injoignable) — trois issues distinctes là où deux se confondaient *(la carte verte a été retirée en v2.19)*
- Le rappel sur les herbiers est désormais présent aussi dans le cas « nature du fond à vérifier »
- **Retiré** : la mention « D'autres zonages […] vérifiez-les visuellement », et le mode « bloc environnement réduit à une ligne » de la v2.5, sans objet désormais
- Ajouts dans le code : `#report-block` et sa ligne `#zone-row`, `carteEnv()`, `carteNatureFond()`, `majLigneZone()`, `brancherCopie()`, écouteur délégué sur `#env-block`, styles `.popup-section`, `.report-*`, `.env-carte*`
- Maquettes comparées avec Nicolas avant implémentation (canvas « Popup carte AMIDOMAR — 3 réorganisations »)

### v2.15 — 12 octobre 2026
**Nature du fond et conseil d'ancrage au clic**
- Au clic sur un emplacement où le mouillage n'est pas interdit, le bloc environnement indique désormais la nature du fond (couche « Natures de fond au 1/50 000 » du Shom) et le conseil correspondant, repris de la page « Bien mouiller pour préserver les fonds marins »
- Les 24 libellés ont été établis par comparaison entre la légende officielle du service et la couleur réellement rendue au point : 23 correspondances exactes, 1 code déduit (`NFSFC`, un seul polygone en France)
- Le conseil est environnemental (écosystème à protéger, chaîne qui ne doit pas racler, emprise et ragage sur sol dur), jamais une appréciation de tenue d'ancre : le produit n'est pas certifié pour la navigation. Textes « sable » et « sol dur » rédigés par Nicolas ; le libellé du lien nomme le type de fond
- Rappel systématique que la carte sédimentaire **ne montre pas les herbiers**
- Là où la donnée manque — et c'est fréquent : 3 % de réponses seulement en Côtes-d'Armor, 27 % en Ille-et-Vilaine — le message « Nature du fond : à vérifier » est affiché explicitement, plutôt qu'un silence qui laisserait croire qu'il n'y a rien à signaler
- Service injoignable : aucun bloc affiché, aucun message d'erreur
- La couche est interrogée en parallèle des zonages (`Promise.all`) : aucune attente ajoutée. Ajouts : `CONFIG.delaiNatureFond`, `WFS_NDF`, `NATURES_FOND`, `CONSEIL_FOND`, `interrogerNatureFond()`, `blocNatureFond()`, style `.env-fond`, citation Shom 2025 dans l'attribution

### v2.14 — 12 octobre 2026
**L'estran est désormais considéré comme la mer (trait terre-mer du Shom)**
- La détection locale classait plages, dunes et marais comme de la terre — or l'estran relève du DPM et peut porter un mouillage. D'où les faux « vous êtes à terre » signalés par la DDTM des Côtes-d'Armor
- Le verdict « à terre » de la détection locale est maintenant soumis au trait terre-mer du Shom (couche WFS `LIMTM_2154_WFS:…_polygones`), qui matérialise la laisse des plus hautes mers astronomiques, soit la limite du DPM naturel, à 1-5 m de résolution. Un point côté mer lève l'avertissement
- Le service n'est interrogé que sur ce cas contesté : un clic en pleine eau n'attend rien de plus qu'avant
- Repli prudent assumé : service injoignable, lent, ou hors métropole → l'avertissement est maintenu, comme avant la v2.14
- Ajouts dans le code : `CONFIG.delaiTraitTerreMer`, `WFS_SHOM`, `interrogerTraitTerreMer()`, `jetonClic` (et garde de jeton après l'attente APB), citation Shom-IGN dans `attributionControl`
- La carte fantôme est **conservée** : elle fournit la réponse instantanée et le repli hors réseau. Sa suppression éventuelle est à décider après la phase de test auprès des DDTM pilotes
- Issu de l'exploitation des flux Shom transmis par Eric Le Guen le 2 octobre 2026 ; inventaire complet et couches restantes à intégrer dans `notes/AMIDOMAR_Flux_Shom_tests_et_integration.md`

### v2.13 — 5 octobre 2026
**Étapes 3 et 4 de la modale d'accueil : ✓ périmés corrigés**
- L'étape 4 restait cochée après un nouveau clic sur un autre emplacement (coordonnées non recopiées) : `copieFaite` n'était remis à `false` qu'à la fermeture du popup
- L'étape 3 restait cochée après un clic refusé (cultures marines, APB) alors que l'emplacement était effacé : ces branches ne rappelaient pas `majEtapes()`
- Correctif : `copieFaite = false; majEtapes();` dès que le clic efface l'emplacement précédent (branche cultures marines, et avant la vérification APB)
- Défauts antérieurs à la v2.12, repérés lors de la suite de tests complète du 5 octobre

### v2.12 — 5 octobre 2026
**Modale d'accueil simplifiée en 4 étapes**
- Nouveau titre : « Choisir un emplacement de mouillage en 4 étapes »
- Une phrase par étape, l'action en gras ; ajout de l'étape « Recherchez ou zoomez » ; le bloc port/ZMEL devient l'étape 2, en vert, raccourci à deux phrases (« fonds marins » remplace « écosystèmes marins »)
- L'étape « Renseigner votre navire » disparaît de la marche à suivre (le formulaire navire lui-même est inchangé) ; `majEtapes()` ne suit plus que deux états (emplacement choisi, coordonnées copiées)
- Ajout d'un bouton « Commencer » (`#guide-commencer`) qui ferme la modale

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

**Dernière mise à jour:** 26 octobre 2026