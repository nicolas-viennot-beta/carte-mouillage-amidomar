# Carte AMIDOMAR — Tests fonctionnels

**Statut :** checklist manuelle (pas de framework de test automatisé — le prototype
est un `index.html` unique, sans build ni dépendances npm côté page).

**Règle :** ce fichier est mis à jour à chaque évolution de `index.html` qui
change ou ajoute un comportement (nouvelle interaction, nouvelle couche,
nouveau calcul, etc.), et il est **rejoué avant toute proposition de PR** —
voir `../CLAUDE.md` à la racine du dossier pour la politique complète.

Chaque anomalie corrigée doit ajouter une case à cocher ici si elle n'est
pas déjà couverte, pour éviter la régression suivante.

---


À effectuer **avant chaque mise à jour** pour prévenir les régressions.

### ✅ 1. Interaction Ports — Hover
- [ ] Survoler le **picto port** (carré vert) dans la légende → curseur doit changer en pointeur
- [ ] Survoler un **point port** sur la carte → curseur doit changer en pointeur
- [ ] Sortir du survol → curseur revient à normal
- [ ] Pas de message d'erreur dans la console (F12)

### ✅ 2. Interaction Ports — Clic
- [ ] Cliquer sur le **picto port** dans la légende → modale s'ouvre avec nom du port
- [ ] Cliquer sur un **point port** sur la carte → modale s'ouvre avec info port
- [ ] Modale affiche le **nombre de places disponibles**
- [ ] Modale affiche le **contact** (capitainerie)
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
- [ ] Cliquer sur le **picto ZMEL** dans la légende → modale s'ouvre avec titre « Zone de mouillages... »
- [ ] Cliquer sur la **zone ZMEL** sur la carte → modale s'ouvre
- [ ] Modale affiche le **message d'orientation** (avantages ZMEL)
- [ ] Modale affiche le **nom de la zone** cliquée (ou « cette zone » depuis la légende)
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
- [ ] Cliquer sur la **terre** (relief, bâti) → popup affiche alerte rouge « Vous êtes à terre »
- [ ] Aucune coordonnée GPS n'apparaît
- [ ] Cliquer sur l'**eau** → popup affiche les coordonnées GPS
- [ ] Popup affiche le **bouton Copier**

### ✅ 9. Rayon d'évitage
- [ ] Cliquer sur l'eau → Étape 1 validée (coordonnées affichées)
- [ ] Saisir une **longueur de navire** → cercle d'évitage se dessine
- [ ] Cercle **vert** si pas de conflit avec AOT existantes
- [ ] Cercle **rouge** s'il y a chevauchement avec une AOT
- [ ] Message « conflit détecté » s'affiche si rouge
- [ ] Pas d'erreur console

### ✅ 10. Copie des coordonnées
- [ ] Bouton « Copier » fonctionne (changement visuel du bouton)
- [ ] Coordonnées copiées dans le presse-papiers
- [ ] Peut être collées dans le formulaire Démarches Simplifiées
- [ ] Message de confirmation affiché (« Copié »)

### ✅ 11. Visibilité des couches
- [ ] Décocher une couche dans la légende → disparaît de la carte
- [ ] Recocher → réapparaît
- [ ] Décoche des AOT → le rayon d'évitage devient immédiatement vert (pas d'analyse de conflit)
- [ ] Recocher AOT → analyse reprend

### ✅ 12. État des sources (bandeau légende)
- [ ] Chaque couche affiche ✓ (ok), ✗ (erreur), ○ (vide), ou ≈ (secours)
- [ ] Statut correspond à la réalité (source charge ou non)
- [ ] Au survol → tooltip affiche la raison (« Source joignable », « Fichier absent », etc.)

### ✅ 13. Console navigateur
- [ ] Ouvrir F12 → onglet « Console »
- [ ] **Aucun message d'erreur ne doit apparaître**
- [ ] Aucun message « Erreur lors de l'attachement des gestionnaires »
- [ ] Aucun message « Erreur lors de l'ouverture de la modale »

### ✅ 14. Responsive et performances
- [ ] Carte fonctionne sur **mobile** (portrait/paysage)
- [ ] Carte fonctionne sur **tablette**
- [ ] Carte fonctionne sur **desktop** (large écran)
- [ ] Pas de ralentissements visibles
- [ ] Interactions sont fluides (pas de freezes)

### ✅ 15. Mode embed
- [ ] URL avec `?embed` → bandeau masqué, carte maximisée
- [ ] Toutes les fonctionnalités restent accessibles
- [ ] Modale d'orientation s'ouvre au démarrage
- [ ] Bouton ❓ visible même en embed

---

---

## Historique des corrections liées aux tests

### v1.0 — 4 septembre 2026
**Correction de régression :** Ports/ZMEL interactifs
- Ajout de try-catch autour des attachements d'événements
- Vérification que les couches existent avant d'attacher les handlers
- Protection contre l'accès à des arrays vides
- Logs console pour diagnostiquer les erreurs
- Suppression des doublons mouseenter/mouseleave

**Commit :** `"Fix: restore port/ZMEL click and hover interactions"`
