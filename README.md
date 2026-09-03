# Carte AMIDOMAR — V1

Carte d'aide au choix d'un emplacement de mouillage individuel, destinée à être
consultée avant le dépôt d'une demande d'AOT sur Démarches Simplifiées.

Construite avec [Carte Facile](https://github.com/fab-geocommuns/carte-facile)
et MapLibre GL : **aucune installation, aucune compilation.**

Les deux bibliothèques sont **embarquées dans le dossier `vendor/`** plutôt que
chargées depuis un CDN. Un service public ne doit pas dépendre d'un tiers pour
exécuter son code, ni voir ce code changer sans que personne n'ait touché au
dépôt. Les versions figées sont notées dans `vendor/VERSIONS.txt` ; leur mise à
jour est un geste délibéré, à faire en connaissance de cause.

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

La couche **« Autres mouillages et leur évitage »** se décoche comme les autres.
La masquer suspend aussi la recherche de recoupement : la carte ne signale pas un
conflit avec des navires qu'elle n'affiche pas. Ses positions sont aujourd'hui
simulées ; elles proviendront d'un fichier Grist.

Vérifiées comme fonctionnelles : Natura 2000 (SIC et ZPS), parcs naturels marins,
ZNIEFF marines, réserves naturelles nationales, aires marines protégées,
informations portuaires du SHOM.

Deux réserves :

- **Herbiers de posidonie** — la source appelée ne couvre que Palavas et les
  Albères. Elle n'affiche rien sur le Var, les Bouches-du-Rhône et la Corse,
  là où l'enjeu est le plus fort. Une source à couverture nationale reste à trouver.
- **ZMEL et cultures marines** — aucune couche nationale consolidée n'a été
  identifiée. Ces zones relèvent d'arrêtés préfectoraux et du cadastre
  conchylicole tenu localement. Les fichiers `data/zmel.geojson` et
  `data/cultures-marines.geojson` sont des gabarits à compléter territoire par
  territoire avec les DDTM ; ils contiennent un exemple fictif à supprimer.

  **`data/SOURCES.md` recense les jeux départementaux trouvés sur data.gouv.fr**,
  leur format, leur licence et la marche à suivre pour les ajouter. À noter : le
  jeu du Var, le plus pertinent pour le projet, est publié mais son service est
  en panne côté serveur — le détail y est consigné, il est signalable à la DDTM.

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
demande d'interroger les polygones et non des images. Cette fonction, qui porte
la valeur pédagogique du produit, est prévue pour la V2.
