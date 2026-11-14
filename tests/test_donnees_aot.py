# -*- coding: utf-8 -*-
import json, re, os, math, collections
PROJ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ok = True
def check(label, cond, detail=""):
    global ok
    print(("OK   " if cond else "ECHEC") + " | " + label + (" — " + detail if detail else ""))
    if not cond: ok = False

d = json.load(open(PROJ + "/data/aot-existantes.geojson", encoding="utf-8"))
f = d["features"]
check("aot-existantes.geojson parse et contient 248 objets", len(f) == 248, "%d" % len(f))
check("tous les objets sont des Point", all(x["geometry"]["type"] == "Point" for x in f))
check("longueur_navire presente et entre 6 et 18 m",
      all(6 <= x["properties"]["longueur_navire"] <= 18 for x in f))
ds = [x["properties"]["distance_cote_m"] for x in f]
check("distance au trait terre-mer dans la bande 100-200 m",
      all(100 <= v <= 200 for v in ds), "min %d / max %d" % (min(ds), max(ds)))
deps = collections.Counter(x["properties"]["departement"] for x in f)
check("4 departements, 62 positions chacun",
      dict(deps) == {"22": 62, "29": 62, "56": 62, "83": 62}, str(dict(sorted(deps.items()))))
refs = [x["properties"]["ref"] for x in f]
check("references uniques", len(set(refs)) == len(refs))
sites = collections.Counter(x["properties"]["site"] for x in f)
check("8 sites", len(sites) == 8, " · ".join("%s=%d" % kv for kv in sites.items()))

# --- Var : les 50 positions de Saint-Tropez sont-elles dans les zones ? ---
# v2.38 : le Morbihan a rejoint le fichier (dont un MultiPolygon) ; ce bloc ne porte que sur le Var.
zones = [z for z in json.load(open(PROJ + "/data/zones-aot.geojson", encoding="utf-8"))["features"] if z["properties"].get("ddtm") == "83"]
def dedans(p, ring):
    ins = False; n = len(ring)
    for i in range(n):
        xi, yi = ring[i]; xj, yj = ring[i-1]
        if (yi > p[1]) != (yj > p[1]) and p[0] < (xj-xi)*(p[1]-yi)/(yj-yi)+xi:
            ins = not ins
    return ins
st = [x for x in f if x["properties"]["site"] == "Golfe de Saint-Tropez"]
dans = 0; bonne_zone = 0
for x in st:
    c = x["geometry"]["coordinates"]
    for z in zones:
        if dedans(c, z["geometry"]["coordinates"][0]):
            dans += 1
            if z["properties"]["nom"] == x["properties"].get("zone_autorisee"): bonne_zone += 1
            break
# v2.33 : la zone 5 des Canebiers a ete retiree du referentiel (suppression annoncee par la DDTM 83) ;
# les 13 positions qui y etaient posees restent, sans nom de zone, hors zone desormais.
check("37 des 50 positions varoises du golfe sont dans une zone autorisee (13 dans l'ex-zone 5)", dans == 37, "%d/50" % dans)
check("chacune des 37 porte le nom de SA zone", bonne_zone == 37, "%d/50" % bonne_zone)
check("13 positions sans zone (ex-zone 5 des Canebiers)", sum(1 for x in st if not x["properties"].get("zone_autorisee")) == 13)
rep = collections.Counter(x["properties"]["zone_autorisee"] for x in st if x["properties"].get("zone_autorisee"))
caps = {z["properties"]["nom"]: z["properties"]["capacite_unites"] for z in zones}
check("aucune zone au-dela de sa capacite declaree",
      all(rep[k] <= caps[k] for k in rep), " · ".join("%s %d/%d" % (k.split("—")[0].strip(), rep[k], caps[k]) for k in sorted(rep)))
hy = [x for x in f if x["properties"]["site"] == "Rade d'Hyères"]
check("83 : 50 au golfe de Saint-Tropez + 12 en rade d'Hyeres", len(st) == 50 and len(hy) == 12)

# --- jeu de secours inline ---------------------------------------------
html = open(PROJ + "/index.html", encoding="utf-8").read()
m = re.search(r"'data/aot-existantes\.geojson': \{ type:'FeatureCollection', features:\[(.*?)\n      \]\},", html, re.S)
check("bloc SECOURS aot present", m is not None)
if m:
    coords = re.findall(r"coordinates:\[(-?[\d.]+),(-?[\d.]+)\]", m.group(1))
    check("jeu de secours : 32 positions (4 par site)", len(coords) == 32, "%d" % len(coords))
    reels = {(round(x["geometry"]["coordinates"][0], 5), round(x["geometry"]["coordinates"][1], 5)) for x in f}
    manquants = [c for c in coords if (round(float(c[0]), 5), round(float(c[1]), 5)) not in reels]
    check("toutes les positions de secours existent dans le fichier reel", not manquants, str(manquants[:3]))
    check("aucune ancienne position bretonne/varoise de v2.31 ne subsiste",
          "-3.12991,47.44856" not in m.group(1).replace(" ", ""))

# --- champs des autres jeux (test 6.1quater) ----------------------------
ports = json.load(open(PROJ + "/data/ports-plaisance.geojson", encoding="utf-8"))
check("ports : nom_port_de_plaisance / nom_commune inchanges",
      all("nom_port_de_plaisance" in p["properties"] and "nom_commune" in p["properties"] for p in ports["features"]))
zm = json.load(open(PROJ + "/data/zmel.geojson", encoding="utf-8"))
check("zmel : nom_zmel inchange", all("nom_zmel" in z["properties"] for z in zm["features"]))

print("\nRESULTAT :", "tous les tests de donnees passent" if ok else "ECHECS a corriger")
