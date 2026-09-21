# Carte AMIDOMAR — Documentation Fonctionnelle

**Version:** 1.8 (septembre 2026)  
**Dernière mise à jour:** 21 septembre 2026  
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

Le panneau « Mon mouillage », qui affichait en permanence un formulaire de saisie du navire, a été **supprimé** (v1.2). La saisie du navire, quand elle est pertinente, est désormais intégrée directement dans le popup de coordonnées (voir §3 et §4.2).

### Centre
- **Carte interactive** — affichage des couches, clics pour saisir un emplacement

---

## 3. Parcours utilisateur

### Étape 0 — Orientation (modale d'accueil)
- Modale « *Fonctionnement de la carte pour un choix d'emplacement de mouillage responsable* »
- Présente la bifurcation « *Tout d'abord, regarder si un emplacement en port ou ZMEL est possible ?* » : **port ou ZMEL** vs **mouillage individuel**
- Décrit les étapes suivantes
- Se ferme par ✕, Échap, ou clic extérieur
- Réouvrable via le bouton ❓

### Étape 1 — Cliquer sur la carte
Un clic sur la carte déclenche désormais un **traitement unifié**, quel que soit l'endroit cliqué (voir §4.1 pour le détail de la cascade) :

1. **Clic sur un port ou une ZMEL** → la modale dédiée s'ouvre directement (comportement inchangé, voir §4.1.a). Pas de coordonnées, pas de popup d'environnement.
2. **Clic à terre** → popup rouge « Vous êtes à terre », pas de coordonnées (inchangé, voir §4.4).
3. **Clic sur une zone de cultures marines** → popup rouge d'interdiction, pas de marqueur ni de coordonnées : un mouillage individuel n'y est pas envisageable.
4. **Clic sur l'eau, hors des cas ci-dessus** → un marqueur est posé, les coordonnées GPS s'affichent, et un popup contextualisé s'ouvre au-dessus des coordonnées (voir §4.2) :
   - Interrogation des zones Natura 2000 / ZNIEFF au point cliqué (API Carto IGN) → popup vert (« pas de contre-indication identifiée ») ou neutre/orange (zone(s) trouvée(s), listées) selon le résultat, avec dans tous les cas une mention rappelant que certaines zones (parcs naturels marins, aires marines protégées, herbiers, APB, baignade, zones réglementaires...) ne sont pas détectables automatiquement et doivent être vérifiées par ailleurs.
   - Si le point cliqué est à **moins de 100 m d'une AOT existante** — vérification silencieuse, indépendante de la case « AOT existantes » —, un message de détection puis un court formulaire (longueur du navire, colonne d'eau à marée haute) apparaissent dans le même popup pour vérifier un éventuel chevauchement de rayon d'évitage (voir §4.2 et la spec C6). Au-delà de 100 m, rien ne s'affiche : le risque de conflit avec un mouillage existant est jugé négligeable et on ne complexifie pas inutilement le parcours.
5. Bouton « Copier » dans le popup pour copier les coordonnées

### Étape 2 — Copier les coordonnées
1. Bouton « Copier » dans le popup de coordonnées
2. Les coordonnées sont copiées dans le presse-papiers
3. Les coller directement dans le formulaire Démarches Simplifiées

---

## 4. Fonctionnalités clés

### 4.1 Traitement unifié du clic sur la carte

Le clic sur la carte suit une cascade de priorité unique, implémentée dans le gestionnaire `map.on('click', ...)` :

#### a. Ports et ZMEL (priorité la plus haute)
Les **ports de plaisance** et les **ZMEL** (Zones de Mouillages et d'Équipements Légers) restent gérés par leurs propres écouteurs dédiés, avec leur **modale existante** (et non un popup) :
- **Ports de plaisance** — Modale affichant nom du port, places disponibles (fictives), contact
- **ZMEL** — Modale affichant le nom de la zone, le nombre de postes (`nb_postes`, actuellement une donnée placeholder), le gestionnaire et un contact (`mailto`, placeholder)
- Les deux modales ont été reformulées pour insister sur le fait qu'**aucun AOT individuel** n'est possible sur ces zones (« Pas d'AOT individuel sur cette zone »)
- Ce cas court-circuite tout le reste de la cascade : pas de marqueur, pas de coordonnées, pas de popup d'environnement

#### b. Clic à terre
Voir §4.4 — popup rouge, aucune coordonnée. Comportement inchangé par rapport à v1.1.

#### c. Cultures marines (interdiction)
Un clic dans une zone de cultures marines (`data/cultures-marines.geojson`) affiche un popup rouge d'interdiction (pas de marqueur, pas de coordonnées) : un mouillage individuel n'est pas envisageable dans une zone de concession conchylicole.

#### d. Tous les autres clics sur l'eau
1. Un marqueur est posé et les coordonnées GPS calculées
2. Une requête est envoyée à l'**API Carto de l'IGN** (module *nature*, couches `natura-habitat`, `natura-oiseaux`, `znieff1`, `znieff2`) pour identifier si le point se trouve dans une zone Natura 2000 (habitats/oiseaux) ou ZNIEFF — voir §4.3 pour le détail technique
3. Le résultat est affiché dans un **popup non bloquant** (teinte verte si aucune zone identifiée, teinte neutre/orange sinon), avec **deux messages distincts possibles** : un message Natura 2000 (habitats et oiseaux réunis, listant le ou les noms de site, précisant qu'une AOT y reste possible sous réserve d'évaluation environnementale et que le nom de la zone est à reporter dans le formulaire de demande) et/ou un message ZNIEFF générique (sans nom ni type de zone, invitant à des pratiques de mouillage durables) — les deux peuvent s'afficher ensemble. Le tout est accompagné d'une mention rappelant que certaines couches (parcs naturels marins, aires marines protégées, herbiers de posidonie et de zostère, APB, zones de baignade, zones réglementaires) ne sont pas couvertes par cette vérification automatique et restent à la charge de l'usager/instructeur
4. Si le point est à moins de 100 m d'une AOT existante (vérification silencieuse), le message de détection et le court formulaire navire/évitage s'affichent en complément dans le même popup (voir §4.2 et la spec C6)

Les couches Natura 2000, ZNIEFF, Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère restent par ailleurs **affichables/masquables normalement** dans le panneau « Couches affichées » (voir §5) : leur éventuelle non-détectabilité au clic ne change rien à leur affichage sur la carte.

### 4.2 Rayon d'évitage (conditionnel, dans le popup de coordonnées)

> Le détail du contenu affiché (textes exacts, variables, cascade des messages) fait l'objet d'un document dédié : **`claude_AMIDOMAR_Spec_Reactions_Clic_v1.md`**, cas **C6** — qui fait référence. La présente section n'en décrit que le mécanisme.

La détection de proximité est **silencieuse** : elle s'effectue dès qu'un point est posé sur l'eau, que la couche « AOT existantes » soit cochée ou non dans la légende (v1.5). Le formulaire de saisie du navire est affiché **dans le popup de coordonnées** lorsque le point cliqué est à **moins de 100 m** d'une AOT existante — seule situation où un chevauchement de rayon d'évitage est réellement possible. Au-delà de 100 m, rien ne s'affiche et l'usager obtient directement ses coordonnées.

La cascade d'affichage comporte trois temps (détaillés en C6) : un message de détection sur fond orange, le formulaire, puis le résultat du calcul sur fond rouge (chevauchement) ou vert (pas de chevauchement).

Calcul basé sur la formule (v1.5) :
```
rayon d'évitage = colonne d'eau à marée haute × 1,5 + longueur du navire
```
Le formulaire ne comporte donc plus que **deux champs** : « Longueur de mon navire (m) » et « Colonne d'eau à marée haute (m) ». Le champ « Longueur de la ligne de mouillage » (menu 3× / 5× / 7×) a été retiré, la nouvelle formule ne s'en servant pas.

**Paramètres configurables** (dans `index.html`):
- `CONFIG.profondeurDefaut` — colonne d'eau à marée haute retenue par défaut (5 m)
- `CONFIG.longueurAutres` — longueur supposée des autres navires (9 m)

**Limites affichées à l'usager:**
1. La profondeur est saisie, pas mesurée
2. Les autres navires sont figurés avec une longueur supposée
3. Vent, courant, nature du fond ne sont pas pris en compte

### 4.3 Intégration API Carto IGN (module *nature*)

Pour identifier automatiquement les zones Natura 2000 et ZNIEFF au point cliqué, la carte interroge l'**API Carto de l'IGN**, module *nature* : `https://apicarto.ign.fr/api/nature/...`.

- **Endpoints utilisés:** `natura-habitat` (Natura 2000 habitats), `natura-oiseaux` (Natura 2000 oiseaux), `znieff1`, `znieff2` (recherche par géométrie ponctuelle passée en paramètre `geom`) — **testés en réel le 21 septembre 2026** depuis un navigateur. Les codes `sic` et `zps`, introduits en v1.3 d'après la documentation sans test réel, renvoient une erreur 404 et ne doivent pas être réintroduits (voir historique v1.7)
- **Propriétés lues:** `sitename` pour `natura-habitat` et `natura-oiseaux` ; `nom` pour `znieff1` et `znieff2`. Le champ à lire est porté par chaque requête (propriété `champ`)
- **Accès:** API publique, sans clé
- **Robustesse:** chaque appel est borné par un délai de **8 secondes** (`AbortController`, porté de 4 à 8 secondes en v1.7) ; en cas de dépassement ou d'échec réseau, l'affichage bascule sur un état de secours (« interrogation indisponible ») sans jamais bloquer l'affichage des coordonnées GPS — la vérification des zones protégées est une information complémentaire, jamais un préalable au parcours principal
- **Messages:** un bloc Natura 2000 (habitats et oiseaux réunis) et un bloc ZNIEFF (générique, sans nom ni type de zone) s'affichent indépendamment l'un de l'autre selon le résultat — voir §4.1.d
- **Limite connue:** aucun endpoint équivalent n'existe à ce jour pour les Parcs naturels marins, les Aires marines protégées, les Herbiers de posidonie et de zostère, les APB, les zones de baignade ou les zones réglementaires — ces zones ne sont donc **pas** vérifiées automatiquement au clic (mention rappelée à l'usager dans le popup, voir §4.1.d)
- **Délai d'attente (constaté le 21 septembre 2026):** les réponses Natura 2000 sont volumineuses (200 à 360 ko, géométrie complète du site) et mettent parfois 3 à 4,5 secondes : avec l'ancien délai de 4 secondes, une des deux requêtes Natura 2000 pouvait être coupée sur certains points (Golfe du Morbihan, Lavezzi) et `echec` passait à `true` alors que l'autre avait répondu. Le délai a été porté à 8 secondes en v1.7 (décision de Nicolas). Piste d'amélioration non retenue : alléger la requête
- **Point partiellement vérifié:** `znieff1`/`znieff2` répondent bien (ex. Salins de Beauduc, Île de Port-Cros et de Bagaud), mais aucun résultat en mer n'a été observé : leur couverture des ZNIEFF marines reste à confirmer

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
- 🟩 **Natura 2000 — oiseaux (ZPS)** — couche WMTS (masquée par défaut), identifiable au clic via l'API Carto IGN
- 🟦 **Parcs naturels marins** — couche WMTS, affichable/masquable normalement — non identifiable au clic (aucune API disponible)
- 🔵 **ZNIEFF marines (type 1)** — couche WMTS visible sur la carte ; l'identification au clic interroge en réalité les couches nationales `znieff1` **et** `znieff2` de l'API Carto IGN (pas seulement le type 1, et couverture mer/terre exacte non confirmée — voir §4.3)
- 🟢 **Aires marines protégées** — couche WMTS (masquée par défaut), affichable/masquable normalement — non identifiable au clic (aucune API disponible)
- ⬜ **Arrêtés de protection de biotope (APB)** *(v1.8)* — couche WMTS `Patrinat_APB` (IGN / INPN), **cochée par défaut**, statut `verifie` : nom de couche et tuiles confirmés le 21 septembre 2026 (voir §11, v1.8). Affichage seul, non identifiable au clic

### Usages de la mer
- 🟢 **Informations portuaires** — couche SHOM (image de symboles : sans nom de port, gestionnaire ni limites)
- 🟧 **ZMEL** — fichier local `data/zmel.geojson` (données `nb_postes`, `gestionnaire`, `mailto` actuellement fictives)
- 🔵 **Cultures marines** — fichier local `data/cultures-marines.geojson` — un clic dans cette zone déclenche désormais un popup d'interdiction (voir §4.1.c)

### Habitats sensibles
- 🟣 **Herbiers de posidonie et de zostère** — couche WMS (couverture partielle : presque uniquement l'Occitanie, Palavas et Albères ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère annoncée mais absente), affichable/masquable normalement — non identifiable au clic (aucune API disponible)

### À venir
- ⬜ **Zone de baignade / zone réglementaire** — entrée unique, grisée et non sélectionnable, mention « À venir » : regroupe deux types de zones pour lesquelles aucune source interrogeable n'a été identifiée à ce jour. Cette entrée matérialise le sujet dans la légende sans (encore) charger de donnée. Les APB, qui y figuraient jusqu'en v1.7, ont désormais leur propre couche (voir « Protection de la nature »).

### Autres couches
- 🔴 **AOT existantes** — 249 positions simulées, fictives (Bretagne + Méditerranée)

### État des sources problématiques
- **Herbiers de posidonie et de zostère:** Couverture insuffisante — presque uniquement l'Occitanie ; rien à Hyères, en Corse, à Quiberon, à Brest ni à Arcachon ; zostère absente ; reste affichable mais non identifiable au clic
- **Parcs naturels marins, Aires marines protégées:** Aucune API d'identification de zone au clic identifiée à ce jour (contrairement à Natura 2000 et ZNIEFF, couverts par l'API Carto IGN — module *nature*, endpoints `natura-habitat`, `natura-oiseaux`, `znieff1`, `znieff2`) — restent affichées/masquables normalement, simplement absentes de la vérification automatique au clic
- **APB:** couche WMTS `Patrinat_APB` ajoutée en v1.8, tuiles confirmées ; pas d'identification au clic
- **Zones de baignade, zones réglementaires:** Aucune source publique interrogeable identifiée — regroupées dans l'entrée « À venir » du panneau (voir ci-dessus)
- **ZMEL:** Aucune couche nationale consolidée — créées par arrêté préfectoral, diffusées par DDTM ; données de capacité/contact actuellement fictives
- **Cultures marines:** Relèvent du cadastre conchylicole — à demander aux DDTM/délégations à la mer
- **Réserves naturelles nationales:** Couche retirée de la configuration (n'apparaît plus dans « Couches affichées »)

---

## 6. Configuration et personnalisation

### Blocs configurables (dans `index.html`)

#### `CONFIG`
```javascript
const CONFIG = {
  profondeurDefaut: 5,      // colonne d'eau à marée haute retenue par défaut (m)
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
- **CSP:** `connect-src 'self' https:;` autorise les appels réseau vers n'importe quelle origine HTTPS (nécessaire pour interroger l'API Carto IGN, voir §4.3) ; aucun script tiers n'est chargé
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
- [ ] Dans les deux cas, une mention rappelle que certaines couches (PNM, AMP, herbiers, APB, baignade, zones réglementaires) ne sont pas vérifiées automatiquement
- [ ] Simuler une coupure/latence réseau (ou couper temporairement l'accès à `apicarto.ign.fr`) → au bout de 8 secondes, le popup bascule sur un état de secours sans bloquer l'affichage des coordonnées GPS
- [ ] Pas d'erreur bloquante en console

### ✅ 11. Formulaire navire conditionnel (proximité AOT à 100 m)
- [ ] Cliquer sur l'eau à moins de 100 m d'une AOT existante → le popup affiche en plus le message de détection sur fond orange, puis le formulaire longueur du navire / colonne d'eau à marée haute (deux champs seulement)
- [ ] Saisir les valeurs → le cercle d'évitage se dessine sur la carte (vert si pas de conflit, rouge si chevauchement)
- [ ] Cliquer sur l'eau à plus de 100 m de toute AOT → le formulaire n'apparaît pas, seules les coordonnées sont affichées
- [ ] Pas d'erreur console

### ✅ 12. Copie des coordonnées
- [ ] Bouton « Copier » fonctionne (changement visuel du bouton)
- [ ] Coordonnées copiées dans le presse-papiers
- [ ] Peut être collées dans le formulaire Démarches Simplifiées
- [ ] Message de confirmation affiché (« Copié »)

### ✅ 13. Visibilité des couches
- [ ] Décocher une couche dans la légende → disparaît de la carte
- [ ] Recocher → réapparaît
- [ ] Décoche des AOT → l'analyse de conflit se poursuit à l'identique (vérification silencieuse) ; seul le rappel « Activez le filtre AOT » apparaît en plus dans le message de détection
- [ ] Recocher AOT → analyse reprend
- [ ] Les couches Parcs naturels marins, Aires marines protégées et Herbiers de posidonie et de zostère restent **cochables/décochables normalement** (elles ne sont plus grisées, seule leur non-détectabilité au clic est documentée)
- [ ] L'entrée « Zone de baignade / zone réglementaire » apparaît grisée avec la case décochée et désactivée, et la mention « À VENIR »
- [ ] La couche « Arrêtés de protection de biotope (APB) » apparaît dans « Protection de la nature », **cochée par défaut** ; la décocher la masque, la recocher la réaffiche
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
- Le point cliqué est à plus de 100 m de toute AOT existante → comportement normal (v1.2), le formulaire n'est affiché que dans ce cas (voir §4.2 et §9.11)
- Vérifier que des AOT existent dans `data/aot-existantes.geojson`
- Vérifier que la couche « Autres mouillages » est cochée

**Solutions:**
- Recharger la page (Ctrl+R)
- Vérifier l'état de la source dans la légende
- Se rapprocher (moins de 100 m) d'une AOT existante pour tester le formulaire

### Le popup d'environnement reste bloqué sur « interrogation en cours »
**Diagnostic:**
- L'appel à l'API Carto IGN (voir §4.3) met plus de 8 secondes à répondre ou échoue silencieusement

**Solutions:**
- Comportement attendu : au bout de 8 secondes, l'affichage bascule automatiquement sur un état de secours — aucune action requise, les coordonnées GPS restent accessibles dans tous les cas
- Vérifier la connexion réseau si le blocage semble anormalement long

### Le popup n'identifie aucune zone Natura 2000 alors que le point est dans un site
**Diagnostic:**
- Ouvrir la console réseau et vérifier que les appels vont bien vers `apicarto.ign.fr/api/nature/natura-habitat` et `natura-oiseaux` (et non `sic`/`zps`, qui renvoient une 404)
- Vérifier que le nom est lu sur `properties.sitename` pour Natura 2000 et `properties.nom` pour les ZNIEFF
- Sur un très grand site, une réponse de plus de 8 secondes est coupée : le popup affiche alors l'état de secours

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

### Une couche affichée ne semble jamais « valider » un clic (PNM, AMP, herbiers)
**Diagnostic:**
- Comportement normal (v1.2) : ces couches restent affichables/masquables normalement dans la légende, mais ne sont **pas interrogées** lors du clic (aucune API d'identification de zone disponible pour elles, voir §4.1.d et §5) — la mention générique de non-détection s'affiche dans le popup

**Solutions:**
- Aucune action requise ; intégrer ces couches à `interrogerZonesProtegees` dans `index.html` une fois une source adaptée identifiée

---

## 11. Historique des corrections

### v1.8 — 21 septembre 2026
**Couche APB séparée, légende scindée, notes de couverture corrigées**
- Remplacement de l'entrée « APB / zone de baignade / zone réglementaire » (« à venir ») par deux entrées : une couche **« Arrêtés de protection de biotope (APB) »** (WMTS `Patrinat_APB`, IGN / INPN, cochée par défaut, statut `verifie` après test du service le jour même, non identifiable au clic) et l'entrée « Zone de baignade / zone réglementaire », toujours « à venir »
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

Un document dédié, `claude_AMIDOMAR_Spec_Reactions_Clic_v1.md`, décrit désormais cas par cas ce que produit un clic sur la carte (zone déclenchante, contenu affiché, variables). **Il fait référence** pour le contenu ; la présente documentation reste la référence pour le mécanisme, la robustesse et l'historique. Changements appliqués :

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

**Dernière mise à jour:** 21 septembre 2026