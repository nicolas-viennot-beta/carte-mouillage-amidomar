# Sources de données — ZMEL, ports et cultures marines

Recherche menée sur data.gouv.fr le 3 septembre 2026. Ce fichier consigne ce qui
existe, ce qui fonctionne, et ce qui reste à faire.

---

## Ce qu'il faut savoir avant de chercher

**Les ZMEL ne font l'objet d'aucune couche nationale.** Elles sont créées par
arrêté préfectoral et publiées département par département, par chaque DDTM,
avec des formats et des dates de mise à jour hétérogènes. Une recherche « ZMEL »
sur data.gouv.fr ne retourne que **5 jeux**, tous départementaux.

La plupart sont diffusés par **géo-IDE**, le service cartographique du ministère
(`ogc.geo-ide.developpement-durable.gouv.fr`), qui expose du WMS et du WFS. C'est
la voie à privilégier : elle évite d'avoir à convertir des fichiers.

---

## Jeux identifiés

| Territoire | Jeu | Formats | Licence | État |
|---|---|---|---|---|
| **Var (83)** | Zones de mouillages **individuels** (2019) | WMS, WFS, SHP | LOv2 | ⚠️ service en panne |
| Pas-de-Calais (62) | ZMEL — `N_AOT_ZMEL_S_062` | WMS, WFS, SHP | LOv2 | à tester |
| Corse-du-Sud (2A) | Carénage, mouillages — `N_carenage_P_02A` | WMS, WFS, SHP | LOv2 | à tester |
| Morbihan (56) | ZMEL | MapInfo TAB | — | conversion nécessaire |
| Charente-Maritime (17) | ZMEL | Shapefile | — | conversion nécessaire |
| Vendée (85) | ZMEL collectives (OFB, 2016) | aucune ressource | non spécifiée | inexploitable |

Une série standardisée **« Aires de carénage dans les ports de plaisance, zones
de mouillage »** est par ailleurs publiée par de nombreuses DDTM (Gironde,
Vendée, Pas-de-Calais, Corse-du-Sud, Morbihan…) et par le Cerema, toujours en
WMS/WFS sur géo-IDE. C'est le gisement le plus homogène.

---

## Le jeu du Var — le plus pertinent, mais son service est cassé

C'est le jeu qui correspond exactement au projet. Sa description :

> « Afin de résoudre le problème des mouillages illégaux ou des mouillages
> forains susceptibles d'altérer l'état des herbiers de posidonies, des
> autorisations d'occupation temporaire (AOT) pour des mouillages individuels
> sont… »

- Couche : `N_ZONE_MOUILLAGE_S_083`
- Emprise : longitude 5,76 à 6,85 / latitude 43,00 à 43,44 — couvre la rade d'Hyères
- Licence : Licence Ouverte v2

**Problème constaté.** Le service répond mais ne renvoie aucune donnée :

- en WMS, une image parfaitement vide, sans message d'erreur ;
- en WFS, cette erreur explicite :

```
msWFSGetFeature(): WFS server error.
msGetEncodedString(): Unknown identifier.
Encoding not supported by libiconv (8859part1).
```

Il s'agit d'une erreur de configuration MapServer : l'encodage déclaré
`8859part1` n'existe pas, il faudrait `ISO-8859-1`. La donnée est publiée mais
le service ne la sert pas.

**C'est signalable à la DDTM du Var** : la correction est probablement d'une
ligne dans le fichier `.map`. Cela débloquerait le jeu le plus utile au projet.

---

## Et les ports ?

La carte utilise déjà la couche **Informations portuaires du SHOM**, testée et
fonctionnelle, à couverture nationale. Aucun équivalent aussi complet n'a été
trouvé sur data.gouv.fr, où les jeux « ports » sont eux aussi départementaux.

Le SHOM reste donc la meilleure source pour cet usage, sauf besoin d'une
information réglementaire précise (limites administratives portuaires) qui
demanderait un travail spécifique.

---

## Cultures marines

Aucun jeu national identifié. Ces zones relèvent du **cadastre conchylicole**,
tenu localement par les DDTM et les délégations à la mer. À demander directement
aux territoires pilotes.

---

## Comment ajouter une couche départementale à la carte

**Si le territoire publie en WMS** — ajouter une entrée dans le tableau `COUCHES`
de `index.html`, sur ce modèle :

```js
{ groupe:'Usages de la mer',
  id:'zmel62', label:'ZMEL — Pas-de-Calais', couleur:'#f9a825', statut:'a_tester',
  tiles: WMS('https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=...',
             'N_AOT_ZMEL_S_062'),
  visible:true, attribution:'© DDTM 62' }
```

L'URL complète du service figure sur la fiche data.gouv.fr du jeu, à la ligne
« URL du GetCapabilities du service wms sur internet ». Attention à prendre la
version **internet** et non **intranet** : cette dernière n'est accessible que
depuis le réseau de l'État.

**Si le territoire ne publie qu'un fichier** (Shapefile, MapInfo TAB) — le
convertir en GeoJSON, puis l'ajouter au fichier `data/zmel.geojson`. La
conversion se fait avec QGIS (gratuit) : ouvrir la couche, clic droit,
*Exporter → Sauvegarder les entités sous…*, format GeoJSON, SCR **EPSG:4326**.

Le choix du SCR compte : la carte attend des coordonnées en longitude/latitude.
Un fichier exporté en Lambert 93 s'affichera au large de l'Afrique.
