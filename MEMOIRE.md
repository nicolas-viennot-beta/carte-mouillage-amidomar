# Carte AMIDOMAR — mémoire du projet

> Ce que Claude doit savoir pour travailler sur la carte et qui n'a pas sa
> place dans la spec (`DOCUMENTATION_FONCTIONNELLE.md`) ni dans
> `data/SOURCES.md` : contexte, arbitrages de Nicolas, façon de travailler,
> pièges rencontrés.
>
> Repris le 14/11/2026 de la mémoire du projet Cowork (partie carte
> seulement ; ce qui concerne la base de données, les démarches en ligne et
> les accès reste dans le dépôt privé).
>
> ⚠️ **Dépôt PUBLIC** : rien de sensible ici (adresse de service, clé,
> identifiant, compte, nom ou coordonnées d'une personne).
>
> Lire ce fichier en début de session. Le compléter au fil de l'eau
> (cf. `CLAUDE.md`, « Mémoire du projet »).

---

## 1. Le projet en bref

- **AMIDOMAR** : expérimentation de l'État sur les autorisations
  d'occupation temporaire (AOT) de **mouillage individuel** sur le domaine
  public maritime naturel.
- Territoires test : **DDTM 22, 29, 56, 83**. Expérimentation réelle de
  janvier à juin.
- Pivot : « **Simplifier** » la première demande (parcours léger) /
  « **Réparer** » la poursuite d'occupation et la résiliation (le cœur).
- Briques autour de la carte : les **formulaires en ligne** (Démarches
  Numériques, 4 démarches), une **base de données** (Grist) qui préremplit
  les formulaires et doit à terme alimenter la carte, et **Sites.conformes**
  (contenu pédagogique public, point d'entrée).
- Repère visuel : **cartes.gouv.fr** est la référence retenue pour la carte
  interactive (préférée à Ma carte IGN et Google My Maps) ; la barre de
  recherche de la carte est alignée sur la sienne (v2.36).

## 2. Documents de référence de ce dépôt

- **`DOCUMENTATION_FONCTIONNELLE.md` = la spec unique et exhaustive** de la
  carte. Aucun document de spec à côté. Pour toute question sur le
  fonctionnement actuel, la lire d'abord : la réponse y est en général
  (rattachement départemental, fichiers de données, règles locales).
- **`data/SOURCES.md` = la référence unique des sources de données** : toute
  nouvelle source, tout test, tout flux cassé y est consigné.
- **`TESTS_FONCTIONNELS.md`** + harnais de **`tests/`** : compléter les
  harnais existants, ne jamais les réécrire de zéro.
- Un seul exemplaire à jour de chaque document : pas de copie en double.

## 3. Règles territoriales de la carte

- Les règles métier dépendent du département :
  - **22** : modale « Règles locales », pas d'affichage des coordonnées GPS
    hors ports / ZMEL ;
  - **83** : idem hors zones autorisées, avec deux listes (zones réservées
    aux professionnels, zones ouvertes à tous) ;
  - **56** (13/11/2026) : mouillage seulement dans des zones spécifiques. Une
    seule liste pour tout le département. Les zones à usage particulier
    (plongeurs, vedettes à passagers, club nautique) ne sont pas intégrées ;
    la zone transmise sans attributs (ria d'Étel) est intégrée quand même.
- Libellé usager des « zones tampon » du 83 : **« zone réservée uniquement
  aux professionnels »**. « Zone tampon » reste un terme interne DDTM.
- **Masquage des coordonnées GPS** (v2.33, arbitré le 02/11/2026) :
  - actif seulement si la fiche DDTM n'est pas en `brouillon` (le Var y
    reste tant que sa liste de zones est incomplète) ;
  - l'entrée `?vue=existant` n'est pas concernée ;
  - département inconnu → coordonnées affichées ;
  - deux départements à égalité de rayon → coordonnées affichées avec les
    deux messages.
- Pendant le pilote, **c'est Nicolas qui saisit la configuration** (messages,
  zones) dans les fichiers du dépôt, pas les DDTM. Objectif à terme : une
  interface dans la base de données par DDTM (message de la modale, zones,
  règle de masquage).
- Choix technique : **le fonctionnement le plus simple possible**.

## 4. Vocabulaire (à respecter dans tous les textes de la carte)

- **« Poursuite d'occupation », jamais « renouvellement »** : un titre sur le
  domaine public maritime est précaire et révocable, il n'y a pas de droit
  au renouvellement. « Renouvellement » ne sert que de terme de recherche.
- **« Résiliation » remplace « renonciation »** partout (12/11/2026).
- **« Navire » remplace « bateau »** partout.
- La résiliation se fait en **deux démarches distinctes** (intention, puis
  preuve de retrait / remise en état).
- Les textes ont deux objectifs : que l'usager aille au bout sans abandonner,
  et qu'il comprenne vraiment les bonnes pratiques de mouillage.

## 5. Façon de travailler avec Nicolas

- **Expliquer les étapes techniques comme à un débutant complet** : où
  mettre le fichier, quelle commande taper, à quoi s'attendre. Attente
  permanente.
- Poser des questions de clarification avant une tâche complexe ; confirmer
  le périmètre avant un gros livrable.
- Corrections chirurgicales : modifier ce qui est signalé, sans toucher au
  reste.
- Formats de livrables : .docx (notes, relecture), .xlsx multi-onglets
  (feuilles de route), .pptx en palette DSFR avec formes natives, .pdf (note
  sponsor d'une page). Relectures DDTM en tableaux.
- Couleurs DSFR : Bleu France `#000091`, orange d'alerte `#B34000`.
- Diagrammes Mermaid et tableaux de flux, dans le style beta.gouv.
- Navigateur de Nicolas : Firefox (pas d'extension Claude in Chrome). Pour
  vérifier la carte publiée après un push : navigateur intégré de l'app
  Claude.
- GitHub : la carte se publie avec le compte **`nicolas-viennot-beta`**.
  L'autre compte de Nicolas (personnel) n'a aucun droit sur ce dépôt.
  Toujours confirmer le compte avant une écriture.

---

## 6. Journal des apprentissages

> Une entrée datée par apprentissage clé, la plus récente en haut. Ce qui
> relève du fonctionnement de la carte va dans la spec ; ce qui relève d'une
> source va dans `SOURCES.md` ; ici, le reste.

- **14/11/2026** — Passage de Cowork à Claude Code. La carte a son propre
  `CLAUDE.md` et cette mémoire. Les harnais de test sont entrés dans le dépôt
  (`tests/`, auparavant `scripts/tests-carte/` hors dépôt).
- **14/11/2026** — Le dépôt a été renommé brièvement `Amidomar`, puis de
  nouveau **`nicolas-viennot-beta/carte-mouillage-amidomar`** : la carte est
  publiée sur https://nicolas-viennot-beta.github.io/carte-mouillage-amidomar/.
  Piège : après un renommage, certaines réponses de GitHub restent en retard
  (la redirection masque le changement). Vérifier le nom réel avec
  `gh api repos/nicolas-viennot-beta/<nom>` avant de conclure.
- **14/11/2026** — Push : Claude peut pousser sur `main` une fois la solution
  validée par Nicolas (remplace l'ancienne règle Cowork « commits locaux
  seulement, Nicolas pousse lui-même »).
- **14/11/2026** — Plusieurs sessions Claude peuvent travailler en parallèle
  sur ce dépôt : toujours `git fetch` et relire l'état de `main` juste avant
  de committer.
