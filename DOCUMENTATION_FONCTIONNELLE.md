# Carte AMIDOMAR — Documentation Fonctionnelle

**Version:** 1.0 (septembre 2026)  
**Dernière mise à jour:** 4 septembre 2026  
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
- 🗺️ **Fond de plan** (bas) — sélecteur de styles cartographiques

### Droite — Panneaux latéraux
- **« Mon mouillage »** — formulaire de saisie (replié au démarrage)
- **« Couches affichées »** — légende avec état des sources (déplié au démarrage)

### Centre
- **Carte interactive** — affichage des couches, clics pour saisir un emplacement

---

## 3. Parcours utilisateur

### Étape 0 — Orientation (modale d'accueil)
- Modale « *Fonctionnement de la carte pour un choix d'emplacement de mouillage responsable* »
- Présente la bifurcation: **port ou ZMEL** vs **mouillage individuel**
- Décrit les 3 étapes suivantes
- Se ferme par ✕, Échap, ou clic extérieur
- Réouvrable via le bouton ❓

### Étape 1 — Choisir un emplacement
1. Cliquer sur la carte à l'emplacement envisagé
2. Le panneau « Mon mouillage » s'ouvre
3. Les coordonnées GPS s'affichent automatiquement
4. Un message invite à renseigner la longueur du navire

**Cas particulier — Clic à terre:**
- La carte vérifie que le point cliqué est sur l'eau (pas de relief, bâti, voirie, voies ferrées)
- Si clic à terre → affichage d'une alerte rouge, pas de coordonnées
- Si sources non chargées → contrôle indéterminé, n'empêche pas la saisie

### Étape 2 — Renseigner le navire
1. Saisir la **longueur du navire** (en mètres)
2. Dès la saisie → le **cercle d'évitage** se dessine autour du point
3. **Cercle vert** = pas de conflit avec les mouillages existants
4. **Cercle rouge** = chevauchement détecté → déplacement recommandé

### Étape 3 — Copier les coordonnées
1. Bouton « Copier » dans le popup de coordonnées
2. Les coordonnées sont copiées dans le presse-papiers
3. Les coller directement dans le formulaire Démarches Simplifiées

---

## 4. Fonctionnalités clés

### 4.1 Clics sur ports et ZMEL
Les **ports de plaisance** et les **ZMEL** (Zones de Mouillages et d'Équipements Légers) sont cliquables pour orienter l'usager.

#### Ports de plaisance
- **Données source:** Couche SHOM « Informations portuaires »
- **Cliquabilité:** Picto dans la légende + points sur la carte
- **Action au clic:** Modale affichant nom du port, places disponibles, contact
- **Hover:** Curseur change en pointeur
- ⚠️ **À noter:** Les places et contacts sont **fictifs** — aucune source publique ne diffuse la disponibilité des ports

#### ZMEL
- **Données source:** Fichier local `data/zmel.geojson` (à compléter territoire par territoire)
- **Cliquabilité:** Picto dans la légende + zones sur la carte
- **Action au clic:** Modale expliquant les avantages des ZMEL
- **Hover:** Curseur change en pointeur
- **État actuel:** Exemple fictif visible — à remplacer par les vraies données DDTM

### 4.2 Rayon d'évitage
Calcul basé sur la formule:
```
chaîne filée = ratio × profondeur
portée au sol = √(chaîne² − profondeur²)
rayon d'évitage = portée au sol + longueur du navire
```

**Paramètres configurables** (dans `index.html`):
- `CONFIG.profondeurDefaut` — profondeur retenue par défaut (5 m)
- `CONFIG.ratioMouillage` — ratio chaîne/profondeur (5)
- `CONFIG.longueurAutres` — longueur supposée des autres navires (9 m)

**Limites affichées à l'usager:**
1. La profondeur est saisie, pas mesurée
2. Les autres navires sont figurés avec une longueur supposée
3. Vent, courant, nature du fond ne sont pas pris en compte

### 4.3 Détection terre/eau
- **Méthode:** Analyse pixel du fond Plan IGN au point cliqué
- **Critères d'exclusion:** Relief, occupation du sol, bâti, voirie, voies ferrées
- **Critères ignorés:** Toponymes et limites administratives (débordent en mer)
- **Robustesse:** Si les tuiles ne sont pas chargées, le contrôle ne bloque pas l'usager

### 4.4 État des sources cartographiques
Bandeau « Couches affichées » avec icônes:

| Icône | Signification |
|-------|---------------|
| ✓ | Source joignable et chargée |
| ✗ | Source injoignable depuis ce navigateur |
| ○ | Fichier local présent mais vide — à compléter |
| ≈ | Données de secours (page ouverte en local via `file://`) |

---

## 5. Couches cartographiques

### Protection de la nature (vérifiées fonctionnelles)
- 🟨 **Natura 2000 — habitats (SIC/ZSC)** — couche WMTS
- 🟩 **Natura 2000 — oiseaux (ZPS)** — couche WMTS (masquée par défaut)
- 🟦 **Parcs naturels marins** — couche WMTS
- 🔵 **ZNIEFF marines (type 1)** — couche WMTS
- ⚫ **Réserves naturelles nationales** — couche WMTS
- 🟢 **Aires marines protégées** — couche WMTS

### Usages de la mer
- 🟢 **Informations portuaires** — couche SHOM (image)
- 🟧 **ZMEL** — fichier local `data/zmel.geojson`
- 🔵 **Cultures marines** — fichier local `data/cultures-marines.geojson`

### Autres couches
- 🟣 **Herbiers de posidonie** — couche WMS (couverture partielle: Palavas, Albères)
- 🔴 **AOT existantes** — 249 mouillages simulés (Bretagne + Méditerranée)

### État des sources problématiques
- **Herbiers de posidonie:** Couverture insuffisante — manque Var, Bouches-du-Rhône, Corse
- **ZMEL:** Aucune couche nationale consolidée — créées par arrêté préfectoral, diffusées par DDTM
- **Cultures marines:** Relèvent du cadastre conchylicole — à demander aux DDTM/délégations à la mer

---

## 6. Configuration et personnalisation

### Blocs configurables (dans `index.html`)

#### `CONFIG`
```javascript
const CONFIG = {
  profondeurDefaut: 5,      // profondeur retenue (m)
  ratioMouillage: 5,        // ratio chaîne/profondeur
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
- **CSP stricte** — aucun script extérieur autorisé sauf images HTTPS des serveurs de tuiles
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

## 9. Tests fonctionnels

La checklist de test manuelle vit désormais dans [`TESTS_FONCTIONNELS.md`](./TESTS_FONCTIONNELS.md), à côté de ce fichier.
Elle est rejouée avant toute mise à jour du prototype et avant toute
proposition de PR (voir `CLAUDE.md` à la racine du dossier).

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
- Vérifier que des AOT existent dans `data/aot-existantes.geojson`
- Vérifier que la couche « Autres mouillages » est cochée

**Solutions:**
- Recharger la page (Ctrl+R)
- Vérifier l'état de la source dans la légende

### Clic à terre ne fonctionne pas
**Diagnostic:**
- Tuiles Plan IGN non chargées (source injoignable)
- Contrôle déclaré indéterminé (laisse passer l'usager)

**Solutions:**
- Vérifier la connexion réseau
- Attendre le chargement des tuiles
- Cliquer ailleurs sur la carte

---

## 11. Historique des corrections

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

**Dernière mise à jour:** 4 septembre 2026