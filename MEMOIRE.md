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

- **19/11/2026** — Relecture de tous les bandeaux avec Nicolas (v2.48) :
  **un seul titre quand la demande n'est pas possible**, « Nouvelle demande
  d'autorisation impossible dans cette zone ». Nicolas proposait « refusée » ;
  « impossible » retenu car la carte ne décide rien et l'usager n'a rien
  déposé. Règle qui en découle : un libellé ne prête pas à la carte une
  décision de l'administration. Autres arbitrages : la **règle locale prime**
  sur l'interdiction au point, qui reste visible dessous ; les phrases suivent
  le cas (DDTM sans zone / avec zones), pas le département ; « par la DDTM »,
  jamais « par le département » ; ne pas promettre « les places » que la carte
  ne connaît pas. La liste d'attente des Côtes-d'Armor est tenue par la DDTM.
  Façon de travailler qui a marché : afficher tous les textes possibles d'un
  composant côte à côte avant de les réécrire.

- **19/11/2026** — Arbitrage de Nicolas : les textes **écrits par nous**
  sont au **vouvoiement** (« Pour mouiller, évitez ces fonds rocheux.
  Ancrez-vous dans les zones sableuses. »), comme le reste de la carte. Les
  messages repris **tels quels** d'une source publique (OFB, Nav&Co) gardent
  leur « je ». Et des avertissements courts : une réserve qui n'ajoute rien
  à « sur place, c'est ce que vous voyez qui compte » est retirée.

- **19/11/2026** — Bouton « Commencer une première demande pour cet
  emplacement » (v2.45), validé par Nicolas : lien de préremplissage DN,
  sans serveur. Arbitrages : commune et lieu-dit **seulement dans les zones
  autorisées** de la carte (pas de nouvelle source) ; ne jamais envoyer une
  valeur incertaine (service muet → champ vide, jamais « non »). Piège : DN
  ignore **sans message** une clé de champ changée ou une valeur hors liste
  — revérifier le lien après chaque retouche du formulaire DN. Le champ
  Commune de DN exige le **code postal**. Livré caché tant que les clés ne
  sont pas relevées côté DN (travail de l'autre dépôt).
- **19/11/2026** — Panneau du point : pas de deuxième colonne (la carte
  reste l'objet principal, et rien ne tiendrait sur téléphone). Les contenus
  longs s'ouvrent en **vue détail** ; libellé du retour choisi par Nicolas,
  « ← Retour à la synthèse de l'emplacement ». « Point » est un mot de la
  carte, pas de l'usager : dire « emplacement ». Éviter « analyse », qui
  promet une expertise que la carte indicative ne donne pas.

- **19/11/2026** — Arbitrage de Nicolas : **pas de détail sur les
  interdictions là où la DDTM n'autorise déjà pas le mouillage** (règles
  locales). Une source de réglementation (ex. règles Nav&Co de l'OFB) ne
  sert donc qu'**à l'intérieur des zones autorisées** et dans les
  départements **sans règle locale** (29 à ce jour). Règle qui en découle :
  avant de proposer une source réglementaire, la croiser d'abord avec
  `zones-aot.geojson` et `ddtm-messages.json` pour mesurer ce qu'elle
  apporterait vraiment.
- **19/11/2026** — Textes des règles locales : Nicolas veut des textes
  **courts et homogènes** — une phrase « La DDTM du … », pas de seconde
  ligne, un bouton qui nomme l'action. Le détail garde les explications.
- **19/11/2026** — Un harnais qui « échoue à cause du harnais » peut cacher
  un vrai défaut : l'arrêt du §10.7 traîné depuis la v2.38 était un
  chevauchement réel (panneau sur la recherche, liste de résultats dessous).
  Avant de conclure « limite du harnais », reproduire le geste de l'usager.

- **19/11/2026** — Arbitrage de Nicolas : le bandeau de verdict montre le
  **fonctionnement final**, comme si la donnée était exhaustive, même quand
  la fiche DDTM est en brouillon (Var). Pas de mention « provisoire » dans
  le bandeau, seulement un lien « Voir les règles locales » ; la réserve
  reste dans le détail de la règle. Règle qui en découle : ne pas affaiblir
  un message de premier niveau par une réserve, la porter au niveau détail.

- **18/11/2026** — Repasse UX du panneau du point (v2.40), menée en trois
  itérations d'un artefact de maquettes avant / après. Arbitrages de
  Nicolas : la **réponse d'abord** (bandeau « Demande d'autorisation possible
  dans cette zone » / « Pas de nouvelle autorisation de mouillage dans cette
  zone ») ; **un sens par couleur** (vert/rouge la réponse, Bleu France la
  règle de l'État, orange l'attention, gris les faits) ; points de vigilance
  **regroupés**, un seul bouton « Ce que ça implique » ; « Précision sur la
  zone ». Façon de travailler qui a marché : maquettes DSFR sur les vrais
  contenus, à côté de captures de la version publiée, avant de coder.

- **18/11/2026** — Herbiers, maërl, coralligène de l'OFB branchés (v2.39).
  Deux arbitrages de Nicolas : **reprendre le message de l'OFB tel quel**
  (application Nav&Co) pour que deux services de l'État ne tiennent pas deux
  discours, et **un habitat sensible ne bloque jamais le clic** (inventaire
  non opposable). Règle qui en découle : quand une source publique porte
  déjà un message usager, le reprendre plutôt que d'en écrire un autre.
- **18/11/2026** — Piège : les inventaires de l'OFB contiennent des **noms de
  personnes** (auteurs, validateurs). Ne jamais lire ces champs depuis la
  carte (dépôt et site publics) : limiter `propertyName` aux champs utiles.
- **18/11/2026** — Sur le Mac de Nicolas, les harnais Chromium d'un worktree
  tournent avec le Playwright du dossier principal :
  `NODE_PATH=<projet>/tests/node_modules node test_….js`. Avec le réseau
  ouvert, `test_interface_chromium.js` s'arrête au §10.7 (le panneau monte
  jusqu'au champ de recherche) — déjà le cas avant la v2.39.

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
