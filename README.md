# Carte AMIDOMAR

Carte d'aide au choix d'un emplacement de mouillage individuel, destinée à être
consultée avant le dépôt d'une demande d'AOT sur Démarches Simplifiées.

Ce fichier décrit l'installation et le fonctionnement général. Le détail
fonctionnel, l'état de chaque source et l'historique des versions sont dans
[`DOCUMENTATION_FONCTIONNELLE.md`](DOCUMENTATION_FONCTIONNELLE.md), qui fait
foi ; les tests à rejouer avant toute évolution sont dans
[`TESTS_FONCTIONNELS.md`](TESTS_FONCTIONNELS.md).

Construite avec [Carte Facile](https://github.com/fab-geocommuns/carte-facile)
et MapLibre GL : **aucune installation, aucune compilation.**

Les deux bibliothèques sont **embarquées dans le dossier `vendor/`** plutôt que
chargées depuis un CDN. Un service public ne doit pas dépendre d'un tiers pour
exécuter son code, ni voir ce code changer sans que personne n'ait touché au
dépôt. Les versions figées sont notées dans `vendor/VERSIONS.txt` ; leur mise à
jour est un geste délibéré, à faire en connaissance de cause.

## Disposition de l'écran

- **À gauche, les contrôles de carte** : recherche, zoom, orientation,
  géolocalisation, puis le bouton `?` qui rouvre la marche à suivre. Le
  sélecteur de fond de plan est en bas à gauche.
- **À droite, les panneaux** : « Mon mouillage » et « Couches affichées »,
  remontés jusque sous l'en-tête puisque le haut-droite est libre.

Il n'y a pas de bandeau de consigne au-dessus de la carte : la modale d'ouverture
dit la même chose, mieux, et rend ensuite l'écran à l'usager.

## Accompagnement de l'usager

Une modale **« Fonctionnement de la carte pour un choix d'emplacement de mouillage
responsable »** s'ouvre au chargement, puis se ferme par la croix, par Échap ou en
cliquant à côté. Le bouton `?`, sous les contrôles de carte, la rouvre à tout
moment — sans lui, la marche à suivre serait perdue dès la première fermeture.

Les étapes restent dans le document même modale fermée : **leur état continue de
se mettre à jour**, et rouvrir la modale en cours de route montre où l'on en est.

Elle distingue délibérément deux choses de nature différente :

- **Une bifurcation**, en tête, dans un encart d'information : *un port ou une
  ZMEL est-il possible ?* Ce n'est pas une étape du parcours mais une **sortie**
  — si l'usager la prend, il ne fera jamais les suivantes. La présenter comme
  « étape 1 sur 4 » laisserait croire qu'il faut la franchir pour continuer,
  alors que c'est précisément l'issue la plus souhaitable. Elle n'appelle donc
  pas à l'action par un bouton, mais invite à cliquer les ports et ZMEL
  directement sur la carte.
- **Trois étapes** qui suivent l'état réel du parcours : choisir un emplacement,
  renseigner le navire, copier les coordonnées. L'étape en cours est en bleu,
  les précédentes portent une coche verte. Elles guident, elles ne décorent pas.

Les pictogrammes **port** et **ZMEL** de la légende sont cliquables, comme les
ports et les zones sur la carte : ils ouvrent une modale qui oriente vers ces
solutions. La couche portuaire du SHOM étant une image, elle n'expose aucun objet
interrogeable — des points locaux servent donc de cibles cliquables, et portent
les informations de places.

> **Les places et contacts de ports sont fictifs.** Aucune source publique ne
> diffuse la disponibilité des ports de plaisance. Ces valeurs montrent le
> parcours ; elles devront être obtenues auprès des gestionnaires.

## Parcours de l'usager

1. La carte s'ouvre sur la France entière, panneau des couches déplié et panneau
   du mouillage replié.
2. L'usager clique sur l'emplacement envisagé. Le panneau du mouillage s'ouvre,
   les coordonnées GPS s'affichent, et un message l'invite à renseigner la
   longueur de son navire.
3. Dès la saisie de cette longueur, le cercle d'évitage se dessine autour de
   l'emplacement — vert s'il est libre, rouge s'il recoupe un autre mouillage.

**Clic à terre.** La carte vérifie que le point choisi est sur une étendue d'eau.
Si ce n'est pas le cas, elle n'affiche aucune coordonnée et avertit l'usager.
Dans le style Plan IGN, la mer n'est pas une couche mais le fond de la carte : le
contrôle cherche donc la présence de **terre** au point cliqué — relief,
occupation du sol, bâti, voirie, voies ferrées. Les toponymes et les limites
administratives sont ignorés, car ils débordent en mer. Si les tuiles du fond de
carte ne sont pas chargées, le contrôle est déclaré indéterminé et **ne bloque
pas** l'usager : mieux vaut laisser passer un clic douteux que refuser un clic
légitime.

## Ce que fait la carte

- affiche les zonages de protection et les usages de la mer autour du point visé
- capture les coordonnées GPS d'un clic, avec un bouton de copie vers le formulaire
- estime le rayon d'évitage du navire et signale les recoupements avec les navires déjà présents
- teste elle-même chaque source cartographique et affiche lesquelles répondent

## Utilisation

**En ligne** — déposer le contenu du dépôt sur GitHub Pages, tout fonctionne.

**En local** — un double-clic sur `index.html` suffit pour une démonstration : les
fichiers du dossier `data/` ne sont alors pas lisibles par le navigateur
(restriction de sécurité `file://`), un jeu de secours intégré prend le relais et
les couches concernées sont marquées `≈`. Pour travailler sur les vraies données
en local, lancer un serveur :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

**Intégration dans une démarche** — ajouter `?embed` à l'URL masque le bandeau
et donne toute la hauteur à la carte.

## Configuration

Tout se règle dans les trois blocs en haut du `<script>` de `index.html` :

| Bloc | Rôle |
|---|---|
| `CONFIG` | profondeur retenue, ratio de chaîne, longueurs de navire par défaut, vue initiale |
| `GRIST` | adresse du fichier de positions et noms des colonnes |
| `COUCHES` | sources cartographiques affichées |

### Positions des navires

`GRIST.url` pointe par défaut sur `data/bateaux-exemple.json`. Le fichier réel
doit **ne contenir que des positions** — latitude et longitude — sans nom,
immatriculation ni identifiant de propriétaire. Le format attendu est celui de
l'API Grist (`{ "records": [ { "fields": { "latitude": …, "longitude": … } } ] }`),
un tableau simple d'objets est également accepté.

Le site étant statique, tout ce que la page télécharge est visible par le
visiteur : ne jamais placer de clé d'accès privée dans `GRIST.url`.

## État des sources cartographiques

Le bandeau « Couches affichées » teste chaque source au chargement et affiche :

| Symbole | Signification |
|---|---|
| ✓ | source joignable |
| ✗ | source injoignable depuis ce navigateur |
| ○ | fichier local présent mais vide, à compléter |
| ≈ | données de secours (page ouverte en local) |

**Couleurs de la légende.** Les zonages en tuiles sont coloriés par le serveur
qui les produit, pas par cette carte. Les pastilles de légende reprennent donc
des couleurs **relevées sur les tuiles réelles** (couleur dominante échantillonnée
sur trois emprises : Morbihan, rade de Brest, rade d'Hyères). Si l'INPN change un
style, la légende décrochera : il faudra ré-échantillonner. Chaque pictogramme
reprend par ailleurs le rendu de la couche — aplat translucide pour les zonages,
polygone bordé pour les fichiers locaux, point cerclé pour les mouillages.

**AOT existantes.** 249 autorisations **simulées**, réparties sur six sites de
Bretagne et de Méditerranée pour figurer la pression sur le plan d'eau. Chaque
position de référence a été vérifiée une par une, par lecture du pixel
correspondant sur les tuiles : couleur de mer sur le fond Plan IGN, et absence de
réserve naturelle nationale.

**Natura 2000 n'est pas un critère d'exclusion** : une AOT peut y être autorisée.
Ces zones sont donc peuplées comme les autres, et chaque AOT porte une propriété
`natura2000` indiquant si elle s'y trouve — 35 % d'entre elles. C'est cohérent
avec l'objet du produit : la question posée à l'usager n'est pas « avez-vous le
droit ? » mais « mesurez-vous ce que cela implique ? ».

Aucune de ces AOT n'existe réellement.

La couche **« Autres mouillages et leur évitage »** se décoche comme les autres.
La masquer suspend aussi la recherche de recoupement : la carte ne signale pas un
conflit avec des navires qu'elle n'affiche pas. Ses positions sont aujourd'hui
simulées ; elles proviendront d'un fichier Grist.

Vérifiées comme fonctionnelles : Natura 2000 (SIC et ZPS), parcs naturels marins,
ZNIEFF marines, réserves naturelles nationales, aires marines protégées,
informations portuaires du SHOM, ZMEL (couche nationale Cerema/CACEM, 647 zones)
et cultures marines (cadastres conchylicoles des DDTM).

Deux réserves :

- **Herbiers de posidonie** — la source appelée ne couvre que Palavas et les
  Albères. Elle n'affiche rien sur le Var, les Bouches-du-Rhône et la Corse,
  là où l'enjeu est le plus fort. Une source à couverture nationale reste à trouver.
- **Cultures marines** — il n'existe pas de flux national interrogeable. Le
  cadastre aquacole national du Cerema est bien la version harmonisée des
  fichiers DDTM (37 612 parcelles, soit 50 fois la couche « fermes marines » du
  Shom), mais son service ne renvoie aucun en-tête CORS : une page web ne peut
  pas l'appeler. La carte interroge donc les **cadastres conchylicoles
  départementaux publiés par les DDTM sur GéoIDE** (WFS pour le clic, WMS pour
  l'affichage, Licence ouverte 2.0) : Finistère, Ille-et-Vilaine et
  Charente-Maritime à ce jour. Ailleurs, la carte dit qu'elle n'a pas vérifié
  plutôt que de laisser croire que le secteur est libre.

  Pour ajouter un département, il suffit d'une entrée dans le registre
  `CADASTRES_CM` de `index.html` — voir `DOCUMENTATION_FONCTIONNELLE.md`
  §4.3ter, qui détaille les flux, les pièges (ordre des axes de la BBOX,
  absence de CQL, `ExceptionReport` en HTTP 200) et les départements encore
  sans flux exploitable.

  **`data/SOURCES.md`** garde la trace de la recherche faite sur data.gouv.fr
  pour les ZMEL, les ports et les cultures marines : jeux départementaux
  trouvés, formats, licences, et services en panne signalables aux DDTM.

## Sécurité et mentions

- **Aucun secret dans le dépôt.** Le site est statique : tout ce que la page
  télécharge est visible par le visiteur. Ne jamais y placer de clé d'accès.
- **Ne jamais versionner un fichier de données réelles.** L'historique Git est
  définitif : supprimer un fichier ensuite ne l'efface pas du passé du dépôt.
  Les positions doivent être récupérées à l'exécution, jamais stockées ici.
- **Politique de sécurité de contenu** déclarée dans l'en-tête : aucun script
  extérieur ne peut être chargé. Les images restent autorisées en `https` pour
  les serveurs de tuiles.
- **Mention de prototype** affichée en permanence, y compris en mode `?embed`.
  À conserver tant que le service n'est pas hébergé officiellement : la page
  porte l'identité de l'État et pourrait sinon être prise pour un service
  officiel engageant l'administration.
- Le bouton de géolocalisation demande sa position à l'utilisateur ; le
  consentement est géré par le navigateur et la position ne quitte pas le poste.

## Rayon d'évitage

```
chaîne filée   = ratio × profondeur
portée au sol  = √(chaîne² − profondeur²)
rayon d'évitage = portée au sol + longueur du navire
```

Trois limites, rappelées à l'usager dans le panneau :

1. la profondeur est **saisie**, pas mesurée : la bathymétrie réelle du lieu n'est pas utilisée ;
2. les autres navires sont figurés avec une longueur supposée, le fichier de
   positions ne contenant aucune caractéristique de navire ;
3. ni le vent, ni le courant, ni la nature du fond ne sont pris en compte.

Le résultat est une aide à la réflexion. Il ne constitue pas une garantie de
non-collision et n'engage pas l'administration.

## Ce qui est renvoyé à une version ultérieure

Savoir **si un point tombe dans une zone** — et non seulement l'afficher —
demande d'interroger les polygones et non des images. C'est fait : au clic, la
carte interroge le trait terre-mer et les natures de fond du Shom, Natura 2000
et les ZNIEFF via l'API Carto de l'IGN, les arrêtés de protection de biotope via
la Géoplateforme, et le cadastre conchylicole des DDTM.

Restent hors de cette vérification, faute de source interrogeable :

- **Zones de baignade et zones réglementaires** — aucune source publique
  identifiée à ce jour. L'entrée figure dans la légende, grisée, pour que le
  sujet reste visible.
- **Herbiers de posidonie et de zostère** — la couche affichée ne couvre que
  Palavas et les Albères, et rien là où l'enjeu est le plus fort (Var,
  Bouches-du-Rhône, Corse). Elle n'est pas interrogée au clic.
- **Parcs naturels marins et aires marines protégées** — affichables, mais
  aucune API d'identification au point n'a été trouvée.
- **Cultures marines hors des trois départements branchés** — voir plus haut.
