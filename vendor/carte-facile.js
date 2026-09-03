(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maplibre-gl')) :
    typeof define === 'function' && define.amd ? define(['exports', 'maplibre-gl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CarteFacile = {}, global.maplibregl));
})(this, (function (exports, maplibregl) { 'use strict';

    /**
     * Overlay configuration types
     * Used for overlay management
     */
    const Overlay = {
        cadastre: 'cadastre',
        administrativeBoundaries: 'administrativeBoundaries',
        levelCurves: 'levelCurves',
    };
    /**
     * List of layer groups available
     * Used for layer visibility management
     */
    const LayerGroup = {
        cadastral_sections: 'cadastral_sections',
        cadastral_parcels: 'cadastral_parcels',
        boundaries_communes: 'boundaries_communes',
        boundaries_epcis: 'boundaries_epcis',
        boundaries_departments: 'boundaries_departments',
        boundaries_regions: 'boundaries_regions',
        boundaries: 'boundaries',
        buildings: 'buildings',
        streets: 'streets',
        street_labels: 'street_labels',
    };

    var version$3 = 8;
    var name$6 = "desaturated";
    var metadata$6 = {
    	fr: {
    		name: "Désaturée",
    		description: "Une carte en niveaux de gris avec des contrastes doux, pour un fond cartographique discret.",
    		use: "Recommandé pour des applications de datavisualisation et la superposition de données thématiques, notamment des aplats de couleurs. La discrétion de la carte permet de mettre en valeur vos données sans interférences visuelles.",
    		accessibility: "Les contrastes adoucis permettent une bonne visibilité de vos données superposées. La lisibilité des toponymes est préservée."
    	},
    	en: {
    		name: "Desaturated",
    		description: "A grayscale map with soft contrasts, for a discreet map background.",
    		use: "Recommended for datavisualization applications and overlaying thematic data, especially flat colors. The map's unobtrusive appearance allows you to highlight your data without visual interference.",
    		accessibility: "Soft contrasts make your superimposed data clearly visible. Toponym legibility is preserved."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var center$3 = [
    	2.5,
    	47
    ];
    var zoom$3 = 5;
    var projection$3 = {
    	type: "globe"
    };
    var sources$6 = {
    	plan_ign: {
    		type: "vector",
    		tiles: [
    			"https://data.geopf.fr/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf"
    		],
    		maxzoom: 18.9,
    		attribution: "© IGN"
    	}
    };
    var glyphs$3 = "https://openmaptiles.geo.data.gouv.fr/fonts/{fontstack}/{range}.pbf";
    var transition$1 = {
    	duration: 300,
    	delay: 0
    };
    var layers$3 = [
    	{
    		id: "background",
    		type: "background",
    		paint: {
    			"background-color": "#f6f6f6"
    		}
    	},
    	{
    		id: "hydro surfacique - Estran",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_D_ESTRAN"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - zone boiséee, foret fermee, peupleraie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_BOISEE",
    			"ZONE_FORET_FERMEE_FEUIL",
    			"ZONE_FORET_FERMEE_CONI",
    			"ZONE_FORET_FERMEE_MIXTE",
    			"ZONE_PEUPLERAIE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd",
    			"fill-opacity": {
    				stops: [
    					[
    						7,
    						0
    					],
    					[
    						8,
    						1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "ocs - vegetation - forêt ouverte",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_FORET_OUVERTE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - lande ligneuse",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_LANDE_LIGNEUSE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - vigne",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_VIGNE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - verger",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_VERGER"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - canne à sucre, bananeraie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_CANNE_BANANE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - mangrovre",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MANGROVE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - marais",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "hydro surfacique - marais",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - vegetation - marais salant",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS_SALANT"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - Zone sable sec",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"ZONE_SABLE_SEC"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - Zone sable humide",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_SABLE_HUMIDE",
    			"FOND_CUVETTE_HUMIDE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#cecece"
    		}
    	},
    	{
    		id: "ocs - Zone graviers galets humides",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"GRAVIERS_GALETS_HUM"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - Zone rocher hydro",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_ROCHER_HYDRO"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "ocs - Zone glacier",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_GLACIER"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 1,
    			"fill-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "bati ZAI - Vert",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zai",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"any",
    			[
    				"in",
    				"nature",
    				"Golf",
    				"Hippodrome",
    				"Piscine",
    				"Sports mécaniques",
    				"Equipement de cyclisme",
    				"Autre équipement sportif",
    				"Centre équestre",
    				"Haras",
    				"Stade"
    			],
    			[
    				"in",
    				"nature",
    				"Espace public Vert"
    			],
    			[
    				"in",
    				"nature",
    				"Aire de détente",
    				"Camping",
    				"Parc de loisirs",
    				"Parc zoologique"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#e5e5e5",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "bati ZAI - Gris Bleu Elec",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zai",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"nature",
    			"Centrale électrique"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#ffffff",
    			"fill-opacity": 0.3,
    			"fill-outline-color": "#c5c5c5"
    		}
    	},
    	{
    		id: "zone batie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zone_surf",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_BATI"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#ffffff",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1,
    				14,
    				1,
    				15,
    				0
    			]
    		}
    	},
    	{
    		id: "zone d'activité",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zone_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_INDUS_ACTI"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#ffffff"
    		}
    	},
    	{
    		id: "hydro surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"in",
    			"symbo",
    			"SURFACE_D_EAU",
    			"BASSIN",
    			"ZONE_MARINE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#cecece"
    		}
    	},
    	{
    		id: "hydro surfacique temporaire",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"SURFACE_D_EAU_TEMP"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd"
    		}
    	},
    	{
    		id: "réseau hydro  - cours d'eau souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_SOU",
    			"COURS_D_EAU_MOY_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Ferre souterrain - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic épais",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic fin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SOU",
    			"VF_NON_EXPLOITEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SOU",
    			"VOIE_VERTE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SOU",
    			"BRET_AUTO_PEAGE_2_SOU",
    			"BRET_AUTO_PEAGE_1_SOU",
    			"BRET_AUTO_LIBRE_3_SOU",
    			"BRET_AUTO_LIBRE_2_SOU",
    			"BRET_AUTO_LIBRE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SOU",
    			"NON_CLASSEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SOU",
    			"LOCALE_4_SOU",
    			"LOCALE_3_SOU",
    			"LOCALE_2_SOU",
    			"LOCALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SOU",
    			"REGIONALE_4_SOU",
    			"REGIONALE_3_SOU",
    			"REGIONALE_2_SOU",
    			"REGIONALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SOU",
    			"PRINCIPALE_4_SOU",
    			"PRINCIPALE_3_SOU",
    			"PRINCIPALE_2_SOU",
    			"PRINCIPALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SOU",
    			"BRET_AUTO_PEAGE_2_SOU",
    			"BRET_AUTO_PEAGE_1_SOU",
    			"BRET_AUTO_LIBRE_3_SOU",
    			"BRET_AUTO_LIBRE_2_SOU",
    			"BRET_AUTO_LIBRE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SOU",
    			"NON_CLASSEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SOU",
    			"LOCALE_4_SOU",
    			"LOCALE_3_SOU",
    			"LOCALE_2_SOU",
    			"LOCALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SOU",
    			"REGIONALE_4_SOU",
    			"REGIONALE_3_SOU",
    			"REGIONALE_2_SOU",
    			"REGIONALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SOU",
    			"PRINCIPALE_4_SOU",
    			"PRINCIPALE_3_SOU",
    			"PRINCIPALE_2_SOU",
    			"PRINCIPALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - axe central - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - canal",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"CANAL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_AU_SOL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_AU_SOL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			]
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau temporaire",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_TEMP",
    			"COURS_D_EAU_TEMP_MOY"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						4
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau moyen ",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU_MOY"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						7,
    						2
    					],
    					[
    						12,
    						2.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau large ",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU_LAR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						7,
    						3
    					],
    					[
    						11,
    						5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 3,
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": [
    				"interpolate",
    				[
    					"exponential",
    					1.8
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.7,
    				7,
    				2,
    				17,
    				10
    			]
    		}
    	},
    	{
    		id: "bati surfacique cimetière",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		filter: [
    			"in",
    			"symbo",
    			"CIMETIERE_SURF",
    			"CIMETIERE_MILI_SURF",
    			"NECROPOLE_NATIONALE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#dddddd",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "bati sportif surfacique fond",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"TENNIS_SURF",
    			"SPORT_INDIF_SURF",
    			"FOOT_SURF",
    			"MULTI_SPORT_SURF",
    			"PISTE_SPORT_SURF",
    			"NATATION_SURF"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#e5e5e5",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "bati sportif surfacique",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"TENNIS_SURF",
    			"SPORT_INDIF_SURF",
    			"FOOT_SURF",
    			"MULTI_SPORT_SURF",
    			"PISTE_SPORT_SURF",
    			"NATATION_SURF"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": 1,
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "bati surfacique",
    		type: "fill",
    		metadata: {
    			"cartefacile:group": "buildings"
    		},
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"!in",
    				"symbo",
    				"CIMETIERE_SURF",
    				"POSTE_ELEC_SURF",
    				"POSTE_ELEC_SURF",
    				"TENNIS_SURF",
    				"SPORT_INDIF_SURF",
    				"FOOT_SURF",
    				"MULTI_SPORT_SURF",
    				"PISTE_SPORT_SURF",
    				"NATATION_SURF",
    				"ECLUSE_SURF",
    				"CIMETIERE_MILI_SURF",
    				"PISTE_DUR",
    				"TENNIS_SURF",
    				"PISTE_SPORT_SURF",
    				"PISTE_SPORT_SURF",
    				"PISTE_HERBE",
    				"RESERVOIR_EAU_SURF",
    				"PECHERIE_SURF"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#eeeeee",
    			"fill-outline-color": "#c1c1c1",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			],
    			"fill-antialias": true
    		}
    	},
    	{
    		id: "bati transport surfacique - piste",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_DUR",
    			"PISTE_HERBE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#eeeeee"
    		}
    	},
    	{
    		id: "construction linéaire - mur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"MUR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": 0.3
    		}
    	},
    	{
    		id: "construction linéaire - autre",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"RUINE_LIN",
    			"MUR_SOUTENEMENT",
    			"FORTIF_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": 0.5
    		}
    	},
    	{
    		id: "construction hydrographique linéaire - Barrage",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"BARRAGE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": {
    				stops: [
    					[
    						13,
    						1.5
    					],
    					[
    						17,
    						5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "construction hydrographique linéaire - Quai",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"QUAI",
    			"DIGUE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						17,
    						2.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Chemin a niveau - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE",
    			"VOIE_VERTE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-color": "rgba(187, 187, 187, 1)"
    		}
    	},
    	{
    		id: "Chemin a niveau - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3",
    			"BRET_AUTO_PEAGE_2",
    			"BRET_AUTO_PEAGE_1",
    			"BRET_AUTO_LIBRE_3",
    			"BRET_AUTO_LIBRE_2",
    			"BRET_AUTO_LIBRE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4",
    			"NON_CLASSEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE",
    			"LOCALE_4",
    			"LOCALE_3",
    			"LOCALE_2",
    			"LOCALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE",
    			"REGIONALE_4",
    			"REGIONALE_3",
    			"REGIONALE_2",
    			"REGIONALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE",
    			"PRINCIPALE_4",
    			"PRINCIPALE_3",
    			"PRINCIPALE_2",
    			"PRINCIPALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3",
    			"BRET_AUTO_PEAGE_2",
    			"BRET_AUTO_PEAGE_1",
    			"BRET_AUTO_LIBRE_3",
    			"BRET_AUTO_LIBRE_2",
    			"BRET_AUTO_LIBRE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4",
    			"NON_CLASSEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE",
    			"LOCALE_4",
    			"LOCALE_3",
    			"LOCALE_2",
    			"LOCALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 6,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE",
    			"REGIONALE_4",
    			"REGIONALE_3",
    			"REGIONALE_2",
    			"REGIONALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						1.1
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE",
    			"PRINCIPALE_4",
    			"PRINCIPALE_3",
    			"PRINCIPALE_2",
    			"PRINCIPALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.6
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - axe centrale - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE",
    			"VF_NON_EXPLOITEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "liaison routiere - Gue route",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		filter: [
    			"==",
    			"symbo",
    			"GUE_ROUTE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": {
    				stops: [
    					[
    						13,
    						"#BEBEBE"
    					],
    					[
    						17,
    						"#646464"
    					],
    					[
    						18,
    						"#FFFFFF"
    					]
    				]
    			},
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - Gue chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"GUE_CHEMIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": {
    				stops: [
    					[
    						13,
    						"#BEBEBE"
    					],
    					[
    						17,
    						"#646464"
    					]
    				]
    			},
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.6
    					],
    					[
    						15,
    						2.9
    					],
    					[
    						16,
    						4.4
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - filet extérieur - Pont passerelle",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		filter: [
    			"in",
    			"symbo",
    			"PONT_PASSERELLE",
    			"PONT_LIN",
    			"PONT_MOBILE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.2
    					],
    					[
    						16,
    						5.4
    					],
    					[
    						20,
    						20
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - filet intérieur - Pont passerelle",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"PONT_PASSERELLE",
    			"PONT_LIN",
    			"PONT_MOBILE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(232, 232, 232, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.2
    					],
    					[
    						16,
    						4.4
    					],
    					[
    						20,
    						16
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		filter: [
    			"in",
    			"symbo",
    			"SURF_ROUT_PRINC",
    			"SURF_ROUT_REG",
    			"SURF_ROUT_LOC",
    			"SURF_ROUT_NON_CLA"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "#000000"
    		}
    	},
    	{
    		id: "Routier surfacique - Dalle de protection",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"DALLE_DE_PROTECTION"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 0.5,
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "#000000"
    		}
    	},
    	{
    		id: "Routier surfacique - Escalier surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SURF"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 0.8,
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "rgba(143, 143, 143, 1)"
    		}
    	},
    	{
    		id: "Routier surfacique - Péage surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"SURF_PEAGE"
    		],
    		layout: {
    			visibility: "none"
    		},
    		paint: {
    			"fill-color": "rgba(255, 255, 255, 1)",
    			"fill-outline-color": "rgba(187, 187, 187, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "bati transport surfacique - bati peage",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"BATI_PEAGE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#DCDCDC",
    			"fill-outline-color": "#808080"
    		}
    	},
    	{
    		id: "réseau hydro  - cours d'eau superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_SUP",
    			"COURS_D_EAU_MOY_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - canal superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"CANAL_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#cecece",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SUP",
    			"VOIE_VERTE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Chemin superieur - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SUP",
    			"BRET_AUTO_PEAGE_2_SUP",
    			"BRET_AUTO_PEAGE_1_SUP",
    			"BRET_AUTO_LIBRE_3_SUP",
    			"BRET_AUTO_LIBRE_2_SUP",
    			"BRET_AUTO_LIBRE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SUP",
    			"NON_CLASSEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SUP",
    			"LOCALE_4_SUP",
    			"LOCALE_3_SUP",
    			"LOCALE_2_SUP",
    			"LOCALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SUP",
    			"REGIONALE_4_SUP",
    			"REGIONALE_3_SUP",
    			"REGIONALE_2_SUP",
    			"REGIONALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SUP",
    			"PRINCIPALE_4_SUP",
    			"PRINCIPALE_3_SUP",
    			"PRINCIPALE_2_SUP",
    			"PRINCIPALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						0
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SUP",
    			"BRET_AUTO_PEAGE_2_SUP",
    			"BRET_AUTO_PEAGE_1_SUP",
    			"BRET_AUTO_LIBRE_3_SUP",
    			"BRET_AUTO_LIBRE_2_SUP",
    			"BRET_AUTO_LIBRE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SUP",
    			"NON_CLASSEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SUP",
    			"LOCALE_4_SUP",
    			"LOCALE_3_SUP",
    			"LOCALE_2_SUP",
    			"LOCALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SUP",
    			"REGIONALE_4_SUP",
    			"REGIONALE_3_SUP",
    			"REGIONALE_2_SUP",
    			"REGIONALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SUP",
    			"PRINCIPALE_4_SUP",
    			"PRINCIPALE_3_SUP",
    			"PRINCIPALE_2_SUP",
    			"PRINCIPALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - axe centrale - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#c5c5c5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						0
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite trait perpendic",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SUP",
    			"VF_NON_EXPLOITEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "hydro ponctuel",
    		type: "circle",
    		source: "plan_ign",
    		"source-layer": "hydro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"FONTAINE",
    			"POINT_D_EAU",
    			"SOURCE",
    			"SOURCE_CAPTEE",
    			"PERTE",
    			"RESURGENCE",
    			"CASCADE",
    			"AUTRE_HYDRO_PONC"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"circle-radius": {
    				stops: [
    					[
    						14,
    						3
    					],
    					[
    						17,
    						7
    					],
    					[
    						20,
    						30
    					]
    				]
    			},
    			"circle-color": "#cecece",
    			"circle-opacity": 1,
    			"circle-stroke-width": 0
    		}
    	},
    	{
    		id: "autre construction linéaire",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"CABLE",
    			"REMONTEE_MEC",
    			"HYDROCARBURES",
    			"CONDUITE_MATIERES_P",
    			"SPORT_MONTAGNE_LIN",
    			"PISTE_BOBSLEIGH",
    			"PISTE_LUGE",
    			"PISTE_AERO_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 1
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend cable",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"CABLE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 5,
    			"line-dasharray": [
    				0.5,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend 1 remont",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"REMONTEE_MEC"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 6,
    			"line-dasharray": [
    				1,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend 2 remont",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"REMONTEE_MEC"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#BEBEBE",
    			"line-width": 6,
    			"line-dasharray": [
    				0.3,
    				0.4,
    				0.3,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend carbur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"HYDROCARBURES",
    			"CONDUITE_MATIERES_P"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 5,
    			"line-dasharray": [
    				1,
    				10
    			]
    		}
    	},
    	{
    		id: "Limites - Etat",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "boundaries"
    		},
    		source: "plan_ign",
    		"source-layer": "limite_lin",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"LIM_ETAT",
    			"LIM_ETAT_ETRANGER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(141, 141, 141, 1)",
    			"line-width": 1,
    			"line-opacity": 1,
    			"line-dasharray": [
    				1,
    				1
    			]
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 1,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(126, 126, 126, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_GLACIER_1",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_6",
    			"TYPO_D_8",
    			"TYPO_D_9",
    			"TYPO_D_10"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 11,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_3",
    			"HYD_LIN_4",
    			"HYD_LIN_5",
    			"TYPO_D_LIN_3",
    			"TYPO_D_LIN_4",
    			"HYD_SURF_3",
    			"HYD_SURF_3_T",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_5",
    			"TYPO_D_7"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_2",
    			"TYPO_D_LIN_2",
    			"HYD_SURF_2",
    			"HYD_SURF_2_T",
    			"TYPO_D_4"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_1",
    			"HYD-LIN-1",
    			"TYPO_D_LIN_1",
    			"HYD_SURF_1",
    			"HYD_SURF_1_T",
    			"TYPO_D_1",
    			"TYPO_D_2",
    			"TYPO_D_3_T",
    			"TYPO_D_4_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				22
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCEAN_MER"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				10,
    				15,
    				24
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 15,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_9",
    			"TYPO_D_10",
    			"TYPO_E_1_cyan"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_8",
    			"SOURCE"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_3",
    			"TYPO_D_5",
    			"TYPO_D_6",
    			"TYPO_D_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"symbol-z-order": "auto",
    			"symbol-avoid-edges": false
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-translate-anchor": "map",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_3",
    			"TYPO_D_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"moyen",
    			"HYD_SURF_2",
    			"TYPO_D_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"mer",
    			"grand",
    			"HYD_SURF_1",
    			"TYPO_D_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 1,
    		filter: [
    			"==",
    			"txt_typo",
    			"ocean"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				1,
    				8,
    				10,
    				24
    			],
    			"text-anchor": "center",
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(90, 90, 90, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 10,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 5,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 14,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2",
    			"GROTTE",
    			"GORGE",
    			"TYPO_G_8",
    			"TYPO_G_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1",
    			"TYPO_G_6",
    			"TYPO_G_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center",
    			"icon-anchor": "bottom"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_G_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_COL_1",
    			"TYPO_G_5",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_G_2",
    			"TYPO_G_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T",
    			"TYPO_G_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc monde",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"Basin",
    			"Depression",
    			"Desert",
    			"Geoarea",
    			"Gorge",
    			"Isthmus",
    			"Lake",
    			"Lowland",
    			"Pen/cape",
    			"Plain",
    			"Plateau",
    			"Range/mtn",
    			"Tundra",
    			"Valley",
    			"Island",
    			"Island group"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(51, 51, 51, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - liaison maritime",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_liaison_lin",
    		minzoom: 8,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"txt_typo",
    			"LIAISON_MARITIME",
    			"LIAISON_MAR"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						6,
    						8
    					],
    					[
    						15,
    						14
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)"
    		}
    	},
    	{
    		id: "toponyme ferre lineaire",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ferre_lin",
    		minzoom: 12,
    		filter: [
    			"in",
    			"txt_typo",
    			"FER_NOM",
    			"FER_OUVRAGE"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-offset": [
    				0,
    				-1
    			],
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme - limite parc ponc 3 et 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_limite_ponc",
    		filter: [
    			"in",
    			"txt_typo",
    			"LIM_PARC_3",
    			"LIM_PARC_4",
    			"RESERVE_NATURELLE_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-allow-overlap": false,
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme - odonyme abrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		maxzoom: 17,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_gauche}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			visibility: "none"
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme - odonyme desabrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_desabrege}",
    			"text-size": 11,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme - lieu dit non habité 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT_NON_HABITE"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_B_10",
    				"TYPO_B_11"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme - bois",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 13,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_9",
    				"TYPO_F_10"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 12,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_6",
    				"TYPO_F_7",
    				"TYPO_F_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_5",
    				"TYPO_F_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 0",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_3",
    				"TYPO_F_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 18,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Quartier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"QUARTIER"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				13,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Lieu-dit",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 16,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT-HABITE"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA10",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 15,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_10"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA9",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13.5,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-color": "#000000",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 6et7 - Special DOM",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_6",
    			"TYPO_A_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_5",
    			"BAT_COMMUNE_5",
    			"BAT_COMMUNE_5_T",
    			"BAT_CHEF_LIEU_COM",
    			"BAT_CHEF_LIEU_COM_T",
    			"BAT_CHEF_LIEU_COM-T",
    			"BAT_ANCIENNE_COM",
    			"BAT_ANCIENNE_COM_T",
    			"BAT_COMMUNE_ASSOCIEE",
    			"BAT_COMMUNE_ASSOCIEE_T",
    			"Commune très petite"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 8,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_4",
    			"BAT_COMMUNE_4",
    			"BAT_COMMUNE_4_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"icon-size": 0.4,
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				10,
    				14,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 3",
    			"TYPO_A_3",
    			"BAT_COMMUNE_3",
    			"BAT_COMMUNE_3_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						7.5,
    						12
    					],
    					[
    						12,
    						14
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-transform": "none"
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-halo-width": 4,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 3 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 6,
    		maxzoom: 7,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"commune 3",
    				"TYPO_A_3",
    				"BAT_COMMUNE_3",
    				"BAT_COMMUNE-3",
    				"BAT_COMMUNE_3_T"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 5,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1  avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 4,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				10,
    				7,
    				16
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-opacity": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 3.5,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"pays 3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 1 et 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 2,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"pays 1",
    				"pays 2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme continent",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 0.2,
    		maxzoom: 2,
    		filter: [
    			"==",
    			"txt_typo",
    			"continent"
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						1,
    						10
    					],
    					[
    						2,
    						15
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "uppercase",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1,
    			"icon-color": "#FFFFFF"
    		}
    	}
    ];
    var owner$3 = "Carte Facile (IGN)";
    var id$3 = "ke5tfl3";
    var desaturatedIgn = {
    	version: version$3,
    	name: name$6,
    	metadata: metadata$6,
    	center: center$3,
    	zoom: zoom$3,
    	projection: projection$3,
    	sources: sources$6,
    	glyphs: glyphs$3,
    	transition: transition$1,
    	layers: layers$3,
    	owner: owner$3,
    	id: id$3
    };

    var version$2 = 8;
    var name$5 = "simple";
    var metadata$5 = {
    	fr: {
    		name: "Simple",
    		description: "Une carte couleur de contextualisation géographique, adaptée à la plupart des usages.",
    		use: "Recommandé pour les applications cartographiques générales. Ses couleurs légères permettent une superposition d'éléments, comme des marqueurs et différents types de données.",
    		accessibility: "Les contrastes entre les toponymes et les différents aplats des zones géographiques sont travaillés ain d'être bien perceptibles selon une diversité de perceptions visuelles."
    	},
    	en: {
    		name: "Simple",
    		description: "A colorful map for geographic contextualization, suitable for most uses.",
    		use: "Recommended for general cartographic applications. Its light colors allow elements such as markers and different types of data to be superimposed.",
    		accessibility: "Contrasts between toponyms and the different flat areas of the geographical zones are worked on so as to be clearly perceptible according to a diversity of visual perceptions."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var center$2 = [
    	2.5,
    	47
    ];
    var zoom$2 = 5;
    var projection$2 = {
    	type: "globe"
    };
    var sources$5 = {
    	plan_ign: {
    		type: "vector",
    		tiles: [
    			"https://data.geopf.fr/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf"
    		],
    		maxzoom: 18.9,
    		attribution: "© IGN"
    	}
    };
    var glyphs$2 = "https://openmaptiles.geo.data.gouv.fr/fonts/{fontstack}/{range}.pbf";
    var transition = {
    	duration: 300,
    	delay: 0
    };
    var layers$2 = [
    	{
    		id: "background",
    		type: "background",
    		paint: {
    			"background-color": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				"rgba(229, 229, 217, 1)",
    				5,
    				"rgba(214, 234, 209, 1)",
    				12,
    				"rgba(214, 234, 209, 1)",
    				13,
    				"rgba(240, 240, 237, 1)"
    			]
    		}
    	},
    	{
    		id: "hydro surfacique - Estran",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_D_ESTRAN"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(162, 216, 224, 1)"
    		}
    	},
    	{
    		id: "orographie : relief - 0m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_0"
    		],
    		layout: {
    			visibility: "none"
    		},
    		paint: {
    			"fill-color": "#D6E5BA",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				1,
    				6,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 100m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_100"
    		],
    		layout: {
    			visibility: "none"
    		},
    		paint: {
    			"fill-color": "#F7F2DA",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				1,
    				6,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 200m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_200"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(218, 218, 206, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1,
    				5,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 1000m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_1000"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(207, 207, 194, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1,
    				5,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 3000m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_3000"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(197, 197, 183, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1,
    				5,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 4000m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_4000"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(187, 187, 173, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1,
    				5,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - 5000m",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"HYPSO_5000"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(174, 174, 160, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1,
    				5,
    				0
    			]
    		}
    	},
    	{
    		id: "orographie : relief - glacier",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "oro_relief",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"GLACIER"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#FFFFFF",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				1,
    				6,
    				0
    			]
    		}
    	},
    	{
    		id: "bati ZAI - Vert",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zai",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"any",
    			[
    				"in",
    				"nature",
    				"Golf",
    				"Hippodrome",
    				"Piscine",
    				"Sports mécaniques",
    				"Equipement de cyclisme",
    				"Autre équipement sportif",
    				"Centre équestre",
    				"Haras",
    				"Stade"
    			],
    			[
    				"in",
    				"nature",
    				"Espace public Vert"
    			],
    			[
    				"in",
    				"nature",
    				"Aire de détente",
    				"Camping",
    				"Parc de loisirs",
    				"Parc zoologique"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "bati surfacique cimetière",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		filter: [
    			"in",
    			"symbo",
    			"CIMETIERE_SURF",
    			"CIMETIERE_MILI_SURF",
    			"NECROPOLE_NATIONALE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "ocs - vegetation - zone boiséee, foret fermee, peupleraie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_BOISEE",
    			"ZONE_FORET_FERMEE_FEUIL",
    			"ZONE_FORET_FERMEE_CONI",
    			"ZONE_FORET_FERMEE_MIXTE",
    			"ZONE_PEUPLERAIE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)",
    			"fill-opacity": {
    				stops: [
    					[
    						7,
    						0
    					],
    					[
    						8,
    						1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "ocs - vegetation - forêt ouverte",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_FORET_OUVERTE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - lande ligneuse",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_LANDE_LIGNEUSE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - vigne",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_VIGNE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - verger",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_VERGER"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - canne à sucre, bananeraie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_CANNE_BANANE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - mangrovre",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MANGROVE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - marais",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "hydro surfacique - marais",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - vegetation - marais salant",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_vegetation_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_MARAIS_SALANT"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - Zone sable sec",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"ZONE_SABLE_SEC"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(233, 232, 213, 1)"
    		}
    	},
    	{
    		id: "ocs - Zone sable humide",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"in",
    			"symbo",
    			"ZONE_SABLE_HUMIDE",
    			"FOND_CUVETTE_HUMIDE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - Zone graviers galets humides",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"GRAVIERS_GALETS_HUM"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - Zone rocher hydro",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_ROCHER_HYDRO"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "ocs - Zone glacier",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "ocs_nature_sol_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_GLACIER"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 1,
    			"fill-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "bati ZAI - Gris Bleu Elec",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zai",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"nature",
    			"Centrale électrique"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#7993B6",
    			"fill-opacity": 0.3,
    			"fill-outline-color": "#7993B6"
    		}
    	},
    	{
    		id: "zone batie",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zone_surf",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_BATI"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(240, 240, 237, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1,
    				14,
    				1
    			]
    		}
    	},
    	{
    		id: "zone d'activité",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_zone_surf",
    		filter: [
    			"==",
    			"symbo",
    			"ZONE_INDUS_ACTI"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(240, 240, 237, 1)"
    		}
    	},
    	{
    		id: "hydro surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"in",
    			"symbo",
    			"SURFACE_D_EAU",
    			"BASSIN",
    			"ZONE_MARINE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(151, 205, 213, 1)"
    		}
    	},
    	{
    		id: "hydro surfacique temporaire",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "hydro_surf",
    		filter: [
    			"==",
    			"symbo",
    			"SURFACE_D_EAU_TEMP"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)"
    		}
    	},
    	{
    		id: "réseau hydro  - cours d'eau souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_SOU",
    			"COURS_D_EAU_MOY_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc souterrain",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sou",
    		minzoom: 16,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Ferre souterrain - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic épais",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic fin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SOU",
    			"VF_NON_EXPLOITEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				17,
    				0.5,
    				18,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SOU",
    			"VOIE_VERTE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Chemin souterrain - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SOU",
    			"BRET_AUTO_PEAGE_2_SOU",
    			"BRET_AUTO_PEAGE_1_SOU",
    			"BRET_AUTO_LIBRE_3_SOU",
    			"BRET_AUTO_LIBRE_2_SOU",
    			"BRET_AUTO_LIBRE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						2.5
    					],
    					[
    						14,
    						3.7
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SOU",
    			"NON_CLASSEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SOU",
    			"LOCALE_4_SOU",
    			"LOCALE_3_SOU",
    			"LOCALE_2_SOU",
    			"LOCALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SOU",
    			"REGIONALE_4_SOU",
    			"REGIONALE_3_SOU",
    			"REGIONALE_2_SOU",
    			"REGIONALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SOU",
    			"PRINCIPALE_4_SOU",
    			"PRINCIPALE_3_SOU",
    			"PRINCIPALE_2_SOU",
    			"PRINCIPALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SOU",
    			"BRET_AUTO_PEAGE_2_SOU",
    			"BRET_AUTO_PEAGE_1_SOU",
    			"BRET_AUTO_LIBRE_3_SOU",
    			"BRET_AUTO_LIBRE_2_SOU",
    			"BRET_AUTO_LIBRE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SOU",
    			"NON_CLASSEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SOU",
    			"LOCALE_4_SOU",
    			"LOCALE_3_SOU",
    			"LOCALE_2_SOU",
    			"LOCALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SOU",
    			"REGIONALE_4_SOU",
    			"REGIONALE_3_SOU",
    			"REGIONALE_2_SOU",
    			"REGIONALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SOU",
    			"PRINCIPALE_4_SOU",
    			"PRINCIPALE_3_SOU",
    			"PRINCIPALE_2_SOU",
    			"PRINCIPALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			},
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "Routier souterrain - axe central - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "réseau hydro - canal",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"CANAL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_AU_SOL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_AU_SOL"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			]
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau temporaire",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_TEMP",
    			"COURS_D_EAU_TEMP_MOY"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						4
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau moyen ",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU_MOY"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						7,
    						2
    					],
    					[
    						12,
    						2.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau large ",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU_LAR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						7,
    						3
    					],
    					[
    						11,
    						5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - cours d'eau",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau",
    		minzoom: 3,
    		filter: [
    			"==",
    			"symbo",
    			"COURS_D_EAU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"exponential",
    					1.8
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.7,
    				7,
    				2,
    				17,
    				10
    			]
    		}
    	},
    	{
    		id: "bati sportif surfacique fond",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"TENNIS_SURF",
    			"SPORT_INDIF_SURF",
    			"FOOT_SURF",
    			"MULTI_SPORT_SURF",
    			"PISTE_SPORT_SURF",
    			"NATATION_SURF"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(234, 237, 222, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "bati sportif surfacique",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"TENNIS_SURF",
    			"SPORT_INDIF_SURF",
    			"FOOT_SURF",
    			"MULTI_SPORT_SURF",
    			"PISTE_SPORT_SURF",
    			"NATATION_SURF"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(183, 206, 182, 1)",
    			"line-width": 1,
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "bati surfacique",
    		type: "fill",
    		metadata: {
    			"cartefacile:group": "buildings"
    		},
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"!in",
    				"symbo",
    				"CIMETIERE_SURF",
    				"POSTE_ELEC_SURF",
    				"POSTE_ELEC_SURF",
    				"TENNIS_SURF",
    				"SPORT_INDIF_SURF",
    				"FOOT_SURF",
    				"MULTI_SPORT_SURF",
    				"PISTE_SPORT_SURF",
    				"NATATION_SURF",
    				"ECLUSE_SURF",
    				"CIMETIERE_MILI_SURF",
    				"PISTE_DUR",
    				"TENNIS_SURF",
    				"PISTE_SPORT_SURF",
    				"PISTE_SPORT_SURF",
    				"PISTE_HERBE",
    				"RESERVOIR_EAU_SURF",
    				"PECHERIE_SURF"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(213, 213, 208, 1)",
    			"fill-outline-color": "rgba(151, 150, 137, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			],
    			"fill-antialias": true
    		}
    	},
    	{
    		id: "bati transport surfacique - piste",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_DUR",
    			"PISTE_HERBE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(216, 216, 216, 1)"
    		}
    	},
    	{
    		id: "construction linéaire - mur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"MUR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": 0.3
    		}
    	},
    	{
    		id: "construction linéaire - autre",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"RUINE_LIN",
    			"MUR_SOUTENEMENT",
    			"FORTIF_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": 0.5
    		}
    	},
    	{
    		id: "construction hydrographique linéaire - Barrage",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"BARRAGE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(177, 177, 177, 1)",
    			"line-width": {
    				stops: [
    					[
    						13,
    						1.5
    					],
    					[
    						17,
    						5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "construction hydrographique linéaire - Quai",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"QUAI",
    			"DIGUE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						17,
    						2.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Chemin a niveau - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE",
    			"VOIE_VERTE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-color": "rgba(187, 187, 187, 1)"
    		}
    	},
    	{
    		id: "Chemin a niveau - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3",
    			"BRET_AUTO_PEAGE_2",
    			"BRET_AUTO_PEAGE_1",
    			"BRET_AUTO_LIBRE_3",
    			"BRET_AUTO_LIBRE_2",
    			"BRET_AUTO_LIBRE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						2.5
    					],
    					[
    						14,
    						3.7
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4",
    			"NON_CLASSEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 7,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE",
    			"LOCALE_4",
    			"LOCALE_3",
    			"LOCALE_2",
    			"LOCALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE",
    			"REGIONALE_4",
    			"REGIONALE_3",
    			"REGIONALE_2",
    			"REGIONALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE",
    			"PRINCIPALE_4",
    			"PRINCIPALE_3",
    			"PRINCIPALE_2",
    			"PRINCIPALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(187, 187, 187, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3",
    			"BRET_AUTO_PEAGE_2",
    			"BRET_AUTO_PEAGE_1",
    			"BRET_AUTO_LIBRE_3",
    			"BRET_AUTO_LIBRE_2",
    			"BRET_AUTO_LIBRE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4",
    			"NON_CLASSEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE",
    			"LOCALE_4",
    			"LOCALE_3",
    			"LOCALE_2",
    			"LOCALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 6,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE",
    			"REGIONALE_4",
    			"REGIONALE_3",
    			"REGIONALE_2",
    			"REGIONALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						1.1
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE",
    			"PRINCIPALE_4",
    			"PRINCIPALE_3",
    			"PRINCIPALE_2",
    			"PRINCIPALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.6
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier a niveau - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - axe centrale - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE",
    			"VF_NON_EXPLOITEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "liaison routiere - Bac Liaison Maritime",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		minzoom: 8,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"BAC_AUTO",
    			"BAC",
    			"LIAISON_MARITIME"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(34, 95, 108, 1)",
    			"line-width": {
    				stops: [
    					[
    						8,
    						1
    					],
    					[
    						13,
    						2.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.3
    		}
    	},
    	{
    		id: "liaison routiere - Gue route",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		filter: [
    			"==",
    			"symbo",
    			"GUE_ROUTE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": {
    				stops: [
    					[
    						13,
    						"#BEBEBE"
    					],
    					[
    						17,
    						"#646464"
    					],
    					[
    						18,
    						"#FFFFFF"
    					]
    				]
    			},
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - Gue chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"GUE_CHEMIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": {
    				stops: [
    					[
    						13,
    						"#BEBEBE"
    					],
    					[
    						17,
    						"#646464"
    					]
    				]
    			},
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.6
    					],
    					[
    						15,
    						2.9
    					],
    					[
    						16,
    						4.4
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - filet extérieur - Pont passerelle",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		filter: [
    			"in",
    			"symbo",
    			"PONT_PASSERELLE",
    			"PONT_LIN",
    			"PONT_MOBILE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.2
    					],
    					[
    						16,
    						5.4
    					],
    					[
    						20,
    						20
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "liaison routiere - filet intérieur - Pont passerelle",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"PONT_PASSERELLE",
    			"PONT_LIN",
    			"PONT_MOBILE_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(232, 232, 232, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.2
    					],
    					[
    						16,
    						4.4
    					],
    					[
    						20,
    						16
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		filter: [
    			"in",
    			"symbo",
    			"SURF_ROUT_PRINC",
    			"SURF_ROUT_REG",
    			"SURF_ROUT_LOC",
    			"SURF_ROUT_NON_CLA"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "#000000"
    		}
    	},
    	{
    		id: "Routier surfacique - Dalle de protection",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"DALLE_DE_PROTECTION"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 0.5,
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "#000000"
    		}
    	},
    	{
    		id: "Routier surfacique - Escalier surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SURF"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-opacity": 0.8,
    			"fill-color": "#FFFFFF",
    			"fill-outline-color": "rgba(143, 143, 143, 1)"
    		}
    	},
    	{
    		id: "Routier surfacique - Péage surfacique",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "routier_surf",
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"SURF_PEAGE"
    		],
    		layout: {
    			visibility: "none"
    		},
    		paint: {
    			"fill-color": "rgba(255, 255, 255, 1)",
    			"fill-outline-color": "rgba(187, 187, 187, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "bati transport surfacique - bati peage",
    		type: "fill",
    		source: "plan_ign",
    		"source-layer": "bati_surf",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"BATI_PEAGE"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#DCDCDC",
    			"fill-outline-color": "#808080"
    		}
    	},
    	{
    		id: "réseau hydro  - cours d'eau superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"in",
    			"symbo",
    			"COURS_D_EAU_SUP",
    			"COURS_D_EAU_MOY_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						17,
    						6.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - canal superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"CANAL_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - filet interieur - aqueduc superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.4
    					],
    					[
    						16,
    						3.5
    					],
    					[
    						17,
    						5.9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "réseau hydro - carre - aqueduc superieur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "hydro_reseau_sup",
    		filter: [
    			"==",
    			"symbo",
    			"AQUEDUC_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						3.5
    					],
    					[
    						16,
    						8.7
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				5
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SUP",
    			"VOIE_VERTE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Chemin superieur - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SUP",
    			"BRET_AUTO_PEAGE_2_SUP",
    			"BRET_AUTO_PEAGE_1_SUP",
    			"BRET_AUTO_LIBRE_3_SUP",
    			"BRET_AUTO_LIBRE_2_SUP",
    			"BRET_AUTO_LIBRE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						2.5
    					],
    					[
    						14,
    						3.7
    					],
    					[
    						15,
    						6.8
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						14
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SUP",
    			"NON_CLASSEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.4
    					],
    					[
    						16,
    						7.7
    					],
    					[
    						17,
    						16.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SUP",
    			"LOCALE_4_SUP",
    			"LOCALE_3_SUP",
    			"LOCALE_2_SUP",
    			"LOCALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SUP",
    			"REGIONALE_4_SUP",
    			"REGIONALE_3_SUP",
    			"REGIONALE_2_SUP",
    			"REGIONALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SUP",
    			"PRINCIPALE_4_SUP",
    			"PRINCIPALE_3_SUP",
    			"PRINCIPALE_2_SUP",
    			"PRINCIPALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 8,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet extérieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SUP",
    			"BRET_AUTO_PEAGE_2_SUP",
    			"BRET_AUTO_PEAGE_1_SUP",
    			"BRET_AUTO_LIBRE_3_SUP",
    			"BRET_AUTO_LIBRE_2_SUP",
    			"BRET_AUTO_LIBRE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SUP",
    			"NON_CLASSEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SUP",
    			"LOCALE_4_SUP",
    			"LOCALE_3_SUP",
    			"LOCALE_2_SUP",
    			"LOCALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SUP",
    			"REGIONALE_4_SUP",
    			"REGIONALE_3_SUP",
    			"REGIONALE_2_SUP",
    			"REGIONALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SUP",
    			"PRINCIPALE_4_SUP",
    			"PRINCIPALE_3_SUP",
    			"PRINCIPALE_2_SUP",
    			"PRINCIPALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Routier superieur - axe central - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Routier superieur - axe centrale - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": {
    				stops: [
    					[
    						9,
    						0.6
    					],
    					[
    						14,
    						0.7
    					],
    					[
    						15,
    						1
    					],
    					[
    						16,
    						1.2
    					],
    					[
    						17,
    						2.1
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SUP",
    			"VF_NON_EXPLOITEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "hydro ponctuel",
    		type: "circle",
    		source: "plan_ign",
    		"source-layer": "hydro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"FONTAINE",
    			"POINT_D_EAU",
    			"SOURCE",
    			"SOURCE_CAPTEE",
    			"PERTE",
    			"RESURGENCE",
    			"CASCADE",
    			"AUTRE_HYDRO_PONC"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"circle-radius": {
    				stops: [
    					[
    						14,
    						3
    					],
    					[
    						17,
    						7
    					],
    					[
    						20,
    						30
    					]
    				]
    			},
    			"circle-color": "rgba(162, 216, 224, 1)",
    			"circle-opacity": 1,
    			"circle-stroke-width": 0
    		}
    	},
    	{
    		id: "autre construction linéaire",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"CABLE",
    			"REMONTEE_MEC",
    			"HYDROCARBURES",
    			"CONDUITE_MATIERES_P",
    			"SPORT_MONTAGNE_LIN",
    			"PISTE_BOBSLEIGH",
    			"PISTE_LUGE",
    			"PISTE_AERO_LIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 1
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend cable",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"CABLE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 5,
    			"line-dasharray": [
    				0.5,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend 1 remont",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"REMONTEE_MEC"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 6,
    			"line-dasharray": [
    				1,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend 2 remont",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"==",
    			"symbo",
    			"REMONTEE_MEC"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#BEBEBE",
    			"line-width": 6,
    			"line-dasharray": [
    				0.3,
    				0.4,
    				0.3,
    				10
    			]
    		}
    	},
    	{
    		id: "autre construction linéaire - trait perpend carbur",
    		type: "line",
    		source: "plan_ign",
    		"source-layer": "bati_lin",
    		filter: [
    			"in",
    			"symbo",
    			"HYDROCARBURES",
    			"CONDUITE_MATIERES_P"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#808080",
    			"line-width": 5,
    			"line-dasharray": [
    				1,
    				10
    			]
    		}
    	},
    	{
    		id: "Limites - Etat",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "boundaries"
    		},
    		source: "plan_ign",
    		"source-layer": "limite_lin",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"in",
    			"symbo",
    			"LIM_ETAT",
    			"LIM_ETAT_ETRANGER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(141, 141, 141, 1)",
    			"line-width": 1,
    			"line-opacity": 1,
    			"line-dasharray": [
    				1,
    				1
    			]
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 1,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_GLACIER_1",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_6",
    			"TYPO_D_8",
    			"TYPO_D_9",
    			"TYPO_D_10"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 11,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_3",
    			"HYD_LIN_4",
    			"HYD_LIN_5",
    			"TYPO_D_LIN_3",
    			"TYPO_D_LIN_4",
    			"HYD_SURF_3",
    			"HYD_SURF_3_T",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_5",
    			"TYPO_D_7"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_2",
    			"TYPO_D_LIN_2",
    			"HYD_SURF_2",
    			"HYD_SURF_2_T",
    			"TYPO_D_4"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_1",
    			"HYD-LIN-1",
    			"TYPO_D_LIN_1",
    			"HYD_SURF_1",
    			"HYD_SURF_1_T",
    			"TYPO_D_1",
    			"TYPO_D_2",
    			"TYPO_D_3_T",
    			"TYPO_D_4_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				22
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCEAN_MER"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				10,
    				15,
    				24
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 15,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_9",
    			"TYPO_D_10",
    			"TYPO_E_1_cyan"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_8",
    			"SOURCE"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_3",
    			"TYPO_D_5",
    			"TYPO_D_6",
    			"TYPO_D_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"symbol-z-order": "auto",
    			"symbol-avoid-edges": false
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-translate-anchor": "map",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_3",
    			"TYPO_D_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"moyen",
    			"HYD_SURF_2",
    			"TYPO_D_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"mer",
    			"grand",
    			"HYD_SURF_1",
    			"TYPO_D_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 1,
    		filter: [
    			"==",
    			"txt_typo",
    			"ocean"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				1,
    				8,
    				10,
    				24
    			],
    			"text-anchor": "center",
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 10,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 5,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 14,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2",
    			"GROTTE",
    			"GORGE",
    			"TYPO_G_8",
    			"TYPO_G_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1",
    			"TYPO_G_6",
    			"TYPO_G_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center",
    			"icon-anchor": "bottom"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_G_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_COL_1",
    			"TYPO_G_5",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_G_2",
    			"TYPO_G_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T",
    			"TYPO_G_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc monde",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"Basin",
    			"Depression",
    			"Desert",
    			"Geoarea",
    			"Gorge",
    			"Isthmus",
    			"Lake",
    			"Lowland",
    			"Pen/cape",
    			"Plain",
    			"Plateau",
    			"Range/mtn",
    			"Tundra",
    			"Valley",
    			"Island",
    			"Island group"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - liaison maritime",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_liaison_lin",
    		minzoom: 8,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"txt_typo",
    			"LIAISON_MARITIME",
    			"LIAISON_MAR"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						6,
    						8
    					],
    					[
    						15,
    						14
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 0.2)"
    		}
    	},
    	{
    		id: "toponyme bati station de métro + bati ponctuel metro",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_1"
    			],
    			[
    				"==",
    				"symbo",
    				"STATION_METRO"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-offset": [
    				0.3,
    				-0.25
    			],
    			"text-padding": 3,
    			"text-anchor": "bottom-left",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#3C3C3C",
    			"icon-color": "#646464"
    		}
    	},
    	{
    		id: "toponyme ferre lineaire",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ferre_lin",
    		minzoom: 12,
    		filter: [
    			"in",
    			"txt_typo",
    			"FER_NOM",
    			"FER_OUVRAGE"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-offset": [
    				0,
    				-1
    			],
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme religieux zoom 17 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"religieux"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme religieux ge zoom 18 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 17,
    		filter: [
    			"==",
    			"txt_typo",
    			"religieux_ge"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme parc d'attractions zoom 15 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati"
    			],
    			[
    				"==",
    				"symbo",
    				"PARC_ATTRACTIONS"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme parc d'attractions ge zoom 18 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati_ge"
    			],
    			[
    				"==",
    				"symbo",
    				"PARC_ATTRACTIONS"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme bati divers",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 15,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati"
    			],
    			[
    				"in",
    				"symbo",
    				"CENTRALE_ELECTRIQUE",
    				"HIPPODROME",
    				"STADE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme Hippodrome ge zoom 15 a 17",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 14,
    		maxzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati_ge"
    			],
    			[
    				"==",
    				"symbo",
    				"HIPPODROME"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{designation}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme bati divers ge zoom 18 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati_ge"
    			],
    			[
    				"in",
    				"symbo",
    				"CENTRALE_ELECTRIQUE",
    				"HIPPODROME",
    				"STADE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme chateau",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 16,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati"
    			],
    			[
    				"in",
    				"symbo",
    				"CHATEAU",
    				"CHATEAU_FORT"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme bati ponc gare",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 15,
    		filter: [
    			"==",
    			"txt_typo",
    			"gore"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{designation}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#000000"
    		}
    	},
    	{
    		id: "toponyme bati ponc barrage",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 12,
    		filter: [
    			"==",
    			"txt_typo",
    			"BARRAGE_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "left",
    			"text-offset": [
    				0.8,
    				0
    			],
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#447FB3"
    		}
    	},
    	{
    		id: "toponyme bati ponc phare - niveau 13",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		maxzoom: 13,
    		filter: [
    			"==",
    			"txt_typo",
    			"PHARE"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "right",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#532A2A"
    		}
    	},
    	{
    		id: "toponyme bati ponc phare - niveau 14à19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"PHARE"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_C_6",
    				"TYPO_C_7",
    				"TYPO_C_8",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "right",
    			"text-size": {
    				stops: [
    					[
    						13,
    						12
    					],
    					[
    						18,
    						18
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-offset": [
    				-2,
    				0
    			],
    			"text-padding": 3,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#532A2A"
    		}
    	},
    	{
    		id: "toponyme bati ponc autre",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"BAT_ACTIVITE",
    			"BAT_FORTIF",
    			"BAT_VILLAGE_DETRUIT"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#532A2A"
    		}
    	},
    	{
    		id: "toponyme bati ponc aeroport 12",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 11,
    		maxzoom: 12,
    		filter: [
    			"==",
    			"txt_typo",
    			"AEROPORT_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "bottom",
    			"text-offset": [
    				0,
    				-1.3
    			],
    			"text-size": 10.5,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc aeroport 13",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"==",
    			"txt_typo",
    			"AEROPORT_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "bottom",
    			"text-offset": [
    				0,
    				-2
    			],
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc aeroport",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 13,
    		maxzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_5"
    			],
    			[
    				"==",
    				"symbo",
    				"AEROPORT"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-size": {
    				stops: [
    					[
    						12,
    						11
    					],
    					[
    						16,
    						13
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc aerodrome 12",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 11,
    		maxzoom: 12,
    		filter: [
    			"==",
    			"txt_typo",
    			"AERODROME_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "bottom",
    			"text-offset": [
    				0,
    				-1.3
    			],
    			"text-size": 9.5,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc aerodrome 13",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"AERODROME_PONC",
    			"AERODROME_IMPORT_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "bottom",
    			"text-offset": [
    				0,
    				-2
    			],
    			"text-size": 10,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc aerodrome",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 13,
    		maxzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			],
    			[
    				"==",
    				"symbo",
    				"AERODROME"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-size": {
    				stops: [
    					[
    						12,
    						10
    					],
    					[
    						16,
    						12
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#120049",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme - limite parc ponc 3 et 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_limite_ponc",
    		filter: [
    			"in",
    			"txt_typo",
    			"LIM_PARC_3",
    			"LIM_PARC_4",
    			"RESERVE_NATURELLE_PONC"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-allow-overlap": false,
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme numéro de route - départementale",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_numero_lin",
    		minzoom: 11,
    		maxzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"Départementale"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 10.5,
    			"text-allow-overlap": false,
    			"text-padding": 2,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-rotation-alignment": "viewport"
    		},
    		paint: {
    			"text-color": "#4D4D4D",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 4
    		}
    	},
    	{
    		id: "toponyme numéro de route - nationale",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_numero_lin",
    		minzoom: 8,
    		maxzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"Nationale"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 0,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(150, 150, 150, 1)",
    			"text-halo-width": 4
    		}
    	},
    	{
    		id: "toponyme numéro de route - autoroute",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_numero_lin",
    		minzoom: 7,
    		maxzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"Autoroute"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 0,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#F0F0F0",
    			"icon-color": "#646464",
    			"text-halo-color": "rgba(133, 133, 133, 1)",
    			"text-halo-width": 4
    		}
    	},
    	{
    		id: "toponyme - odonyme abrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		maxzoom: 17,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_gauche}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			visibility: "none"
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme - odonyme desabrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_desabrege}",
    			"text-size": 11,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	},
    	{
    		id: "toponyme - lieu dit non habité 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT_NON_HABITE"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_B_10",
    				"TYPO_B_11"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme - bois",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 13,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_9",
    				"TYPO_F_10"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 12,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_6",
    				"TYPO_F_7",
    				"TYPO_F_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_5",
    				"TYPO_F_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 0",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_3",
    				"TYPO_F_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 18,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc zai zoom 17 a 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"zai"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme bati ponc zai_15",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 15,
    		filter: [
    			"==",
    			"txt_typo",
    			"zai_15"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(76, 76, 76, 1)"
    		}
    	},
    	{
    		id: "toponyme bati ponc zai vert",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"zai_vert"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc zai beige",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 16,
    		filter: [
    			"==",
    			"txt_typo",
    			"zai_beige"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#686042",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc monuments zoom 15 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati"
    			],
    			[
    				"==",
    				"symbo",
    				"MONUMENT"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme bati ponc monuments ge zoom 18 à 19",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_bati_ponc",
    		minzoom: 17,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"divers_bati_ge"
    			],
    			[
    				"==",
    				"symbo",
    				"MONUMENT"
    			]
    		],
    		layout: {
    			visibility: "none",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Quartier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"QUARTIER"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				13,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Lieu-dit",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 16,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT-HABITE"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA10",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 15,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_10"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "#000000",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA9",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13.5,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-color": "#000000",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 6et7 - Special DOM",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_6",
    			"TYPO_A_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_5",
    			"BAT_COMMUNE_5",
    			"BAT_COMMUNE_5_T",
    			"BAT_CHEF_LIEU_COM",
    			"BAT_CHEF_LIEU_COM_T",
    			"BAT_CHEF_LIEU_COM-T",
    			"BAT_ANCIENNE_COM",
    			"BAT_ANCIENNE_COM_T",
    			"BAT_COMMUNE_ASSOCIEE",
    			"BAT_COMMUNE_ASSOCIEE_T",
    			"Commune très petite"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 8,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_4",
    			"BAT_COMMUNE_4",
    			"BAT_COMMUNE_4_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"icon-size": 0.4,
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				10,
    				14,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 0.5)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 3",
    			"TYPO_A_3",
    			"BAT_COMMUNE_3",
    			"BAT_COMMUNE_3_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						7.5,
    						12
    					],
    					[
    						12,
    						14
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-transform": "none"
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-halo-width": 4,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 3 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 6,
    		maxzoom: 7,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"commune 3",
    				"TYPO_A_3",
    				"BAT_COMMUNE_3",
    				"BAT_COMMUNE-3",
    				"BAT_COMMUNE_3_T"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 5,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1  avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 4,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				10,
    				7,
    				16
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"icon-opacity": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 3.5,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"pays 3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 1 et 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 2,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"pays 1",
    				"pays 2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme continent",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 0.2,
    		maxzoom: 2,
    		filter: [
    			"==",
    			"txt_typo",
    			"continent"
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						1,
    						10
    					],
    					[
    						2,
    						15
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "uppercase",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1,
    			"icon-color": "#FFFFFF"
    		}
    	}
    ];
    var owner$2 = "Carte Facile (IGN)";
    var id$2 = "9jctx8c";
    var simpleIgn = {
    	version: version$2,
    	name: name$5,
    	metadata: metadata$5,
    	center: center$2,
    	zoom: zoom$2,
    	projection: projection$2,
    	sources: sources$5,
    	glyphs: glyphs$2,
    	transition: transition,
    	layers: layers$2,
    	owner: owner$2,
    	id: id$2
    };

    var version$1 = 8;
    var name$4 = "aerial";
    var metadata$4 = {
    	fr: {
    		name: "Aérienne",
    		description: "Une carte basée sur des photographies aériennes haute résolution, enrichie de surcouches vectorielles pour une meilleure lisibilité.",
    		use: "Recommandé pour visualiser le territoire tel qu'il apparaît vu du ciel, avec des repères cartographiques facilitant l'orientation. Idéal pour l'observation détaillée du terrain, de l'occupation des sols et du bâti.",
    		accessibility: "Les toponymes sont affichés avec des contrastes renforcés sur le fond photographique pour garantir leur lisibilité."
    	},
    	en: {
    		name: "Aerial",
    		description: "A map based on high-resolution aerial photographs, enhanced with vector overlays for better readability.",
    		use: "Recommended for viewing the territory as it appears from the sky, with cartographic references facilitating orientation. Ideal for detailed observation of terrain, land use and buildings.",
    		accessibility: "Place names are displayed with enhanced contrast on the photographic background to ensure their readability."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var center$1 = [
    	2.5,
    	47
    ];
    var zoom$1 = 5;
    var projection$1 = {
    	type: "globe"
    };
    var sources$4 = {
    	"Ortho IGN": {
    		type: "raster",
    		tiles: [
    			"https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image%2Fjpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}"
    		],
    		tileSize: 256,
    		minzoom: 0,
    		maxzoom: 18.9,
    		scheme: "xyz",
    		attribution: "© IGN"
    	},
    	plan_ign: {
    		type: "vector",
    		tiles: [
    			"https://data.geopf.fr/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf"
    		],
    		maxzoom: 18.9,
    		attribution: "© IGN"
    	}
    };
    var glyphs$1 = "https://openmaptiles.geo.data.gouv.fr/fonts/{fontstack}/{range}.pbf";
    var layers$1 = [
    	{
    		id: "background",
    		type: "background",
    		paint: {
    			"background-color": "#153B56"
    		}
    	},
    	{
    		id: "photographies_aeriennes",
    		type: "raster",
    		source: "Ortho IGN",
    		minzoom: 0,
    		layout: {
    			visibility: "visible"
    		}
    	},
    	{
    		id: "Ferre souterrain - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic épais",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SOU",
    			"VF_2_SOU",
    			"VF_3_SOU",
    			"VF_4_SOU",
    			"VF_ELEC_1_SOU",
    			"VF_ELEC_2_SOU",
    			"VF_ELEC_3_SOU",
    			"VF_ELEC_4_SOU",
    			"VF_FERRO_ROUTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - trait perpendic fin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SOU",
    			"VF_ETROITE_2_SOU",
    			"VF_ETROITE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		minzoom: 0,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SOU",
    			"VF_NON_EXPLOITEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			],
    			"line-dasharray": [
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "Ferre souterrain - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sou",
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SOU",
    			"TRANSPORT_URBAIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SOU",
    			"VOIE_VERTE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin souterrain - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sou",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SOU",
    			"BRET_AUTO_PEAGE_2_SOU",
    			"BRET_AUTO_PEAGE_1_SOU",
    			"BRET_AUTO_LIBRE_3_SOU",
    			"BRET_AUTO_LIBRE_2_SOU",
    			"BRET_AUTO_LIBRE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SOU",
    			"NON_CLASSEE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SOU",
    			"LOCALE_4_SOU",
    			"LOCALE_3_SOU",
    			"LOCALE_2_SOU",
    			"LOCALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SOU",
    			"REGIONALE_4_SOU",
    			"REGIONALE_3_SOU",
    			"REGIONALE_2_SOU",
    			"REGIONALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SOU",
    			"PRINCIPALE_4_SOU",
    			"PRINCIPALE_3_SOU",
    			"PRINCIPALE_2_SOU",
    			"PRINCIPALE_1_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SOU",
    			"AUTOROU_LIBRE_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier souterrain - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sou",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SOU"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.3,
    				15,
    				0.3,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE",
    			"VOIE_VERTE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-color": "rgba(187, 187, 187, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin a niveau - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 0,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3",
    			"BRET_AUTO_PEAGE_2",
    			"BRET_AUTO_PEAGE_1",
    			"BRET_AUTO_LIBRE_3",
    			"BRET_AUTO_LIBRE_2",
    			"BRET_AUTO_LIBRE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4",
    			"NON_CLASSEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE",
    			"LOCALE_4",
    			"LOCALE_3",
    			"LOCALE_2",
    			"LOCALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 6,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE",
    			"REGIONALE_4",
    			"REGIONALE_3",
    			"REGIONALE_2",
    			"REGIONALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						1.1
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.4
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE",
    			"PRINCIPALE_4",
    			"PRINCIPALE_3",
    			"PRINCIPALE_2",
    			"PRINCIPALE_1"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.6
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE",
    			"AUTOROU_LIBRE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier a niveau - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route",
    		minzoom: 8,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1",
    			"VF_2",
    			"VF_3",
    			"VF_4",
    			"VF_ELEC_1",
    			"VF_ELEC_2",
    			"VF_ELEC_3",
    			"VF_ELEC_4"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie etroite trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1",
    			"VF_ETROITE_2",
    			"VF_ETROITE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE",
    			"VF_NON_EXPLOITEE"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre a niveau - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE",
    			"TRANSPORT_URBAIN"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - piste cyclable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"in",
    			"symbo",
    			"PISTE_CYCLABLE_SUP",
    			"VOIE_VERTE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.1
    					],
    					[
    						15,
    						1.7
    					],
    					[
    						16,
    						2
    					],
    					[
    						17,
    						3.5
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - filet exterieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1.75
    					],
    					[
    						15,
    						3
    					],
    					[
    						16,
    						4.2
    					],
    					[
    						17,
    						9.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - filet interieur - escalier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"ESCALIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.9
    					],
    					[
    						16,
    						2.7
    					],
    					[
    						17,
    						5.8
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				0.2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - Rue pietonne",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 14,
    		filter: [
    			"==",
    			"symbo",
    			"RUE_PIETONNE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						5
    					]
    				]
    			},
    			"line-dasharray": [
    				1,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - sentier",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 13,
    		filter: [
    			"==",
    			"symbo",
    			"SENTIER_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						6
    					]
    				]
    			},
    			"line-dasharray": [
    				4,
    				3
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Chemin superieur - chemin",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_chemin_sup",
    		minzoom: 12,
    		filter: [
    			"==",
    			"symbo",
    			"CHEMIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						15,
    						1.2
    					],
    					[
    						16,
    						1.4
    					],
    					[
    						17,
    						2
    					],
    					[
    						18,
    						7
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non revetu carrosable",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_REVETUE_CARRO_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - bretelle autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 12,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_AUTO_PEAGE_3_SUP",
    			"BRET_AUTO_PEAGE_2_SUP",
    			"BRET_AUTO_PEAGE_1_SUP",
    			"BRET_AUTO_LIBRE_3_SUP",
    			"BRET_AUTO_LIBRE_2_SUP",
    			"BRET_AUTO_LIBRE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						12,
    						1.5
    					],
    					[
    						14,
    						2.6
    					],
    					[
    						15,
    						5.2
    					],
    					[
    						16,
    						6.7
    					],
    					[
    						17,
    						10.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee restreint",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"==",
    			"symbo",
    			"NON_CLASSEE_RESTREINT_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route non classee",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"NON_CLASSEE_4_SUP",
    			"NON_CLASSEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.3
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_LOCALE_SUP",
    			"LOCALE_4_SUP",
    			"LOCALE_3_SUP",
    			"LOCALE_2_SUP",
    			"LOCALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						1.3
    					],
    					[
    						14,
    						2.3
    					],
    					[
    						15,
    						4.1
    					],
    					[
    						16,
    						6.1
    					],
    					[
    						17,
    						13.1
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route locale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 11,
    		filter: [
    			"==",
    			"symbo",
    			"LOCALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						9,
    						2
    					],
    					[
    						14,
    						3.5
    					],
    					[
    						15,
    						6
    					],
    					[
    						16,
    						8.4
    					],
    					[
    						17,
    						18.3
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_REGIONALE_SUP",
    			"REGIONALE_4_SUP",
    			"REGIONALE_3_SUP",
    			"REGIONALE_2_SUP",
    			"REGIONALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.4
    					],
    					[
    						9,
    						1.5
    					],
    					[
    						14,
    						3.2
    					],
    					[
    						15,
    						5.8
    					],
    					[
    						16,
    						8.3
    					],
    					[
    						17,
    						16.2
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route regionale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"REGIONALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.5
    					],
    					[
    						9,
    						2.3
    					],
    					[
    						14,
    						5
    					],
    					[
    						15,
    						8.1
    					],
    					[
    						16,
    						11.2
    					],
    					[
    						17,
    						22
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"BRET_PRINCIPALE_SUP",
    			"PRINCIPALE_4_SUP",
    			"PRINCIPALE_3_SUP",
    			"PRINCIPALE_2_SUP",
    			"PRINCIPALE_1_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.5
    					],
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.1
    					],
    					[
    						14,
    						4.4
    					],
    					[
    						15,
    						7.3
    					],
    					[
    						16,
    						10
    					],
    					[
    						17,
    						18.5
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - route principale en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"PRINCIPALE_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						6,
    						1.8
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.9
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12.2
    					],
    					[
    						17,
    						22.5
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 5,
    		filter: [
    			"in",
    			"symbo",
    			"AUTOROU_PEAGE_SUP",
    			"AUTOROU_LIBRE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						2.7
    					],
    					[
    						14,
    						5.8
    					],
    					[
    						15,
    						9
    					],
    					[
    						16,
    						12
    					],
    					[
    						17,
    						20.8
    					]
    				]
    			},
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Routier superieur - filet interieur - autoroute en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_route_sup",
    		minzoom: 10,
    		filter: [
    			"==",
    			"symbo",
    			"AUTOROU_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#e5e5e5",
    			"line-width": {
    				stops: [
    					[
    						4,
    						0.7
    					],
    					[
    						6,
    						2.5
    					],
    					[
    						9,
    						3.5
    					],
    					[
    						14,
    						7.5
    					],
    					[
    						15,
    						11
    					],
    					[
    						16,
    						15
    					],
    					[
    						17,
    						26
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie normale trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_1_SUP",
    			"VF_2_SUP",
    			"VF_3_SUP",
    			"VF_4_SUP",
    			"VF_ELEC_1_SUP",
    			"VF_ELEC_2_SUP",
    			"VF_ELEC_3_SUP",
    			"VF_ELEC_4_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie etroite trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		filter: [
    			"in",
    			"symbo",
    			"VF_ETROITE_1_SUP",
    			"VF_ETROITE_2_SUP",
    			"VF_ETROITE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 14,
    		filter: [
    			"in",
    			"symbo",
    			"VF_SERVICE_SUP",
    			"VF_NON_EXPLOITEE_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - voie en construction trait perpendic",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		minzoom: 10,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"symbo",
    			"VF_EN_CONSTR_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						14.7
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "Ferre superieur - 2 trait perpendic - funic/urbain",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "ferre_sup",
    		filter: [
    			"in",
    			"symbo",
    			"FUNI_CREMAILLERE_SUP",
    			"TRANSPORT_URBAIN_SUP"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "#FFFFFF",
    			"line-width": {
    				stops: [
    					[
    						10,
    						3.5
    					],
    					[
    						17,
    						17
    					]
    				]
    			},
    			"line-dasharray": [
    				0.2,
    				0.2,
    				0.2,
    				6
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				10,
    				0.5,
    				15,
    				0.5,
    				17,
    				0
    			]
    		}
    	},
    	{
    		id: "liaison routiere - Bac Liaison Maritime",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "plan_ign",
    		"source-layer": "routier_liaison",
    		minzoom: 8,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"symbo",
    			"BAC_AUTO",
    			"BAC",
    			"LIAISON_MARITIME"
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(2, 21, 36, 1)",
    			"line-width": {
    				stops: [
    					[
    						8,
    						1.4
    					],
    					[
    						13,
    						2.9
    					]
    				]
    			},
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.3
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 1,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-anchor": "center",
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - ocs ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCS_FORET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "#287B00",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_GLACIER_1",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_6",
    			"TYPO_D_8",
    			"TYPO_D_9",
    			"TYPO_D_10"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 11,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_3",
    			"HYD_LIN_4",
    			"HYD_LIN_5",
    			"TYPO_D_LIN_3",
    			"TYPO_D_LIN_4",
    			"HYD_SURF_3",
    			"HYD_SURF_3_T",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_5",
    			"TYPO_D_7"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				12
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_2",
    			"TYPO_D_LIN_2",
    			"HYD_SURF_2",
    			"HYD_SURF_2_T",
    			"TYPO_D_4"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_LIN_1",
    			"HYD-LIN-1",
    			"TYPO_D_LIN_1",
    			"HYD_SURF_1",
    			"HYD_SURF_1_T",
    			"TYPO_D_1",
    			"TYPO_D_2",
    			"TYPO_D_3_T",
    			"TYPO_D_4_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				22
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro lineaire ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_lin",
    		filter: [
    			"==",
    			"txt_typo",
    			"OCEAN_MER"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				10,
    				15,
    				24
    			],
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc glacier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		filter: [
    			"==",
    			"txt_typo",
    			"ORO_GLACIER_2"
    		],
    		layout: {
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 15,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_9",
    			"TYPO_D_10",
    			"TYPO_E_1_cyan"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_4",
    			"HYD_SURF_4_T",
    			"HYD_SURF_5",
    			"HYD_SURF_5_T",
    			"TYPO_D_8",
    			"SOURCE"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				16,
    				10,
    				18,
    				12
    			],
    			"text-padding": 5,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"HYD_SURF_3",
    			"TYPO_D_5",
    			"TYPO_D_6",
    			"TYPO_D_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"symbol-z-order": "auto"
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-translate-anchor": "map",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_D_3",
    			"TYPO_D_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				18
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"moyen",
    			"HYD_SURF_2",
    			"TYPO_D_2"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				11,
    				16,
    				22
    			],
    			"text-allow-overlap": false,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"mer",
    			"grand",
    			"HYD_SURF_1",
    			"TYPO_D_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				24
    			],
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - hydro ponc ocean",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_hydro_ponc",
    		minzoom: 1,
    		filter: [
    			"==",
    			"txt_typo",
    			"ocean"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				1,
    				8,
    				10,
    				24
    			],
    			"text-anchor": "center",
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 10,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro lineaire 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_lin",
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-padding": 5,
    			"text-max-angle": 45,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 14,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_SOMMET_3",
    			"ORO_GORGE_2",
    			"GROTTE",
    			"GORGE",
    			"TYPO_G_8",
    			"TYPO_G_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_3",
    			"ORO_RELIEF_3",
    			"ORO_RELIEF_3_T",
    			"ORO_RELIEF_4",
    			"ORO_RELIEF_4_T",
    			"ORO_CAP_2",
    			"ORO_CAP_3",
    			"ORO_SOMMET_2",
    			"ORO_COL_2",
    			"ORO_GORGE_1",
    			"ORO_GORGE-1",
    			"TYPO_G_6",
    			"TYPO_G_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center",
    			"icon-anchor": "bottom"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_G_4"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 9,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_2",
    			"ORO_RELIEF_2",
    			"ORO_RELIEF_2_T",
    			"ORO_CAP_1",
    			"ORO_COL_1",
    			"TYPO_G_5",
    			"ORO_SOMMET_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1B",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_G_2",
    			"TYPO_G_3"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 8,
    		filter: [
    			"in",
    			"txt_typo",
    			"ORO_ILE_1",
    			"ORO_RELIEF_1",
    			"ORO_RELIEF_1_T",
    			"TYPO_G_1"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - oro ponc monde",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_oro_ponc",
    		minzoom: 5,
    		filter: [
    			"in",
    			"txt_typo",
    			"Basin",
    			"Depression",
    			"Desert",
    			"Geoarea",
    			"Gorge",
    			"Isthmus",
    			"Lake",
    			"Lowland",
    			"Pen/cape",
    			"Plain",
    			"Plateau",
    			"Range/mtn",
    			"Tundra",
    			"Valley",
    			"Island",
    			"Island group"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-anchor": "center"
    		},
    		paint: {
    			"text-color": "rgba(255, 169, 141, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - liaison maritime",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_liaison_lin",
    		minzoom: 8,
    		maxzoom: 18,
    		filter: [
    			"in",
    			"txt_typo",
    			"LIAISON_MARITIME",
    			"LIAISON_MAR"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						6,
    						8
    					],
    					[
    						15,
    						14
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-keep-upright": true,
    			"text-max-angle": 45,
    			"text-padding": 10,
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(88, 228, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)"
    		}
    	},
    	{
    		id: "toponyme ferre lineaire",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ferre_lin",
    		minzoom: 12,
    		filter: [
    			"in",
    			"txt_typo",
    			"FER_NOM",
    			"FER_OUVRAGE"
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{texte}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-offset": [
    				0,
    				-1
    			],
    			"text-font": [
    				"Noto Sans Regular"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)"
    		}
    	},
    	{
    		id: "toponyme - odonyme abrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		maxzoom: 17,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_gauche}",
    			"text-size": 10,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			visibility: "none"
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)"
    		}
    	},
    	{
    		id: "toponyme - odonyme desabrégé",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "plan_ign",
    		"source-layer": "toponyme_routier_odonyme_lin",
    		minzoom: 15,
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{nom_desabrege}",
    			"text-size": 11,
    			"text-anchor": "center",
    			"text-max-angle": 30,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-color": "rgba(23, 23, 23, 0.75)"
    		}
    	},
    	{
    		id: "toponyme - lieu dit non habité 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT_NON_HABITE"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_B_10",
    				"TYPO_B_11"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "toponyme - bois",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 13,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_9",
    				"TYPO_F_10"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(74, 218, 75, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		minzoom: 12,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_6",
    				"TYPO_F_7",
    				"TYPO_F_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(74, 218, 75, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_5",
    				"TYPO_F_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(74, 218, 75, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme - bois 0",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_ocs_ponc",
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"BOIS"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_F_3",
    				"TYPO_F_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 18,
    			"text-allow-overlap": false,
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Italic"
    			]
    		},
    		paint: {
    			"text-color": "rgba(74, 218, 75, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Quartier",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"QUARTIER"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				13,
    				12,
    				16,
    				14
    			],
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typo_E_GE Lieu-dit",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 16,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"==",
    				"symbo",
    				"LIEU-DIT-HABITE"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_E_GE"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA10",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 15,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_10"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						15,
    						11
    					],
    					[
    						17,
    						13.5
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA9",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 14,
    		maxzoom: 18,
    		filter: [
    			"==",
    			"txt_typo",
    			"TYPO_A_9"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13.5,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"icon-allow-overlap": false
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"icon-color": "#000000",
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 non commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_FUSIONNEE"
    			],
    			[
    				"!=",
    				"symbo",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA8 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_8"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA7 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_7"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA5etA6 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"in",
    				"txt_typo",
    				"TYPO_A_5",
    				"TYPO_A_6"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 13,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA4 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_4"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA3 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA2 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 15,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite n0 typoA1 commune",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"symbo",
    				"COMMUNE_FUSIONNEE",
    				"COMMUNE_CHEF_LIEU"
    			],
    			[
    				"==",
    				"txt_typo",
    				"TYPO_A_1"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 16,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 6et7 - Special DOM",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_6",
    			"TYPO_A_7"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 12.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 5",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 12,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_5",
    			"BAT_COMMUNE_5",
    			"BAT_COMMUNE_5_T",
    			"BAT_CHEF_LIEU_COM",
    			"BAT_CHEF_LIEU_COM_T",
    			"BAT_CHEF_LIEU_COM-T",
    			"BAT_ANCIENNE_COM",
    			"BAT_ANCIENNE_COM_T",
    			"BAT_COMMUNE_ASSOCIEE",
    			"BAT_COMMUNE_ASSOCIEE_T",
    			"Commune très petite"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 11.5,
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 4",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 8,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"TYPO_A_4",
    			"BAT_COMMUNE_4",
    			"BAT_COMMUNE_4_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"icon-size": 0.4,
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				10,
    				14,
    				14
    			],
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2
    		}
    	},
    	{
    		id: "toponyme localite importance 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 3",
    			"TYPO_A_3",
    			"BAT_COMMUNE_3",
    			"BAT_COMMUNE_3_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						7.5,
    						12
    					],
    					[
    						12,
    						14
    					]
    				]
    			},
    			"text-allow-overlap": false,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-transform": "none"
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-size": 14,
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "none",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"icon-halo-width": 4,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 7,
    		maxzoom: 13,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": "{texte}",
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 3 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 6,
    		maxzoom: 7,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"commune 3",
    				"TYPO_A_3",
    				"BAT_COMMUNE_3",
    				"BAT_COMMUNE-3",
    				"BAT_COMMUNE_3_T"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 2 avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 5,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 2",
    			"TYPO_A_2",
    			"BAT_COMMUNE_2",
    			"BAT_COMMUNE-2",
    			"BAT_COMMUNE_2_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme localite importance 1  avec point",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 4,
    		maxzoom: 7,
    		filter: [
    			"in",
    			"txt_typo",
    			"commune 1",
    			"TYPO_A_1",
    			"BAT_COMMUNE_1",
    			"BAT_COMMUNE_1_T"
    		],
    		layout: {
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"texte"
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				10,
    				7,
    				16
    			],
    			"text-anchor": "left",
    			"text-padding": 1,
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-justify": "left",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"icon-opacity": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 3",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 3.5,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"txt_typo",
    				"pays 3"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme pays 1 et 2",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 2,
    		maxzoom: 10,
    		filter: [
    			"all",
    			[
    				"in",
    				"txt_typo",
    				"pays 1",
    				"pays 2"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				10,
    				20
    			],
    			"text-anchor": "center",
    			"text-padding": 2,
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(255, 255, 255, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "toponyme continent",
    		type: "symbol",
    		source: "plan_ign",
    		"source-layer": "toponyme_localite_ponc",
    		minzoom: 0.2,
    		maxzoom: 2,
    		filter: [
    			"==",
    			"txt_typo",
    			"continent"
    		],
    		layout: {
    			visibility: "visible",
    			"text-field": "{texte}",
    			"text-size": {
    				stops: [
    					[
    						1,
    						10
    					],
    					[
    						2,
    						15
    					]
    				]
    			},
    			"text-anchor": "center",
    			"text-padding": 1,
    			"text-transform": "uppercase",
    			"text-font": [
    				"Noto Sans Bold"
    			]
    		},
    		paint: {
    			"text-color": "rgba(221, 221, 221, 1)",
    			"text-halo-color": "rgba(23, 23, 23, 0.75)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1,
    			"icon-color": "#FFFFFF"
    		}
    	}
    ];
    var owner$1 = "Carte Facile (IGN)";
    var id$1 = "0je8hu5";
    var aerialIgn = {
    	version: version$1,
    	name: name$4,
    	metadata: metadata$4,
    	center: center$1,
    	zoom: zoom$1,
    	projection: projection$1,
    	sources: sources$4,
    	glyphs: glyphs$1,
    	layers: layers$1,
    	owner: owner$1,
    	id: id$1
    };

    var version = 8;
    var name$3 = "simple-osm";
    var metadata$3 = {
    	fr: {
    		name: "Simple (OSM)",
    		description: "Une carte couleur de contextualisation géographique, adaptée à la plupart des usages.",
    		use: "Recommandé pour les applications cartographiques générales. Ses couleurs légères permettent une superposition d'éléments, comme des marqueurs et différents types de données.",
    		accessibility: "Les contrastes entre les toponymes et les différents aplats des zones géographiques sont travaillés ain d'être bien perceptibles selon une diversité de perceptions visuelles."
    	},
    	en: {
    		name: "Simple (OSM)",
    		description: "A colorful map for geographic contextualization, suitable for most uses.",
    		use: "Recommended for general cartographic applications. Its light colors allow elements such as markers and different types of data to be superimposed.",
    		accessibility: "Contrasts between toponyms and the different flat areas of the geographical zones are worked on so as to be clearly perceptible according to a diversity of visual perceptions."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var center = [
    	2.5,
    	47
    ];
    var zoom = 5;
    var projection = {
    	type: "globe"
    };
    var sources$3 = {
    	openmaptiles: {
    		type: "vector",
    		url: "https://openmaptiles.geo.data.gouv.fr/data/planet-vector.json",
    		attribution: "© OpenStreetMap, © Etalab"
    	}
    };
    var sprite = "https://openmaptiles.github.io/osm-bright-gl-style/sprite";
    var glyphs = "https://openmaptiles.geo.data.gouv.fr/fonts/{fontstack}/{range}.pbf";
    var layers = [
    	{
    		id: "background",
    		type: "background",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"all"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"background-color": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				"rgba(229, 229, 217, 1)",
    				5,
    				"rgba(214, 234, 209, 1)",
    				12,
    				"rgba(214, 234, 209, 1)",
    				13,
    				"rgba(240, 240, 237, 1)"
    			]
    		}
    	},
    	{
    		id: "water",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "water",
    		filter: [
    			"all",
    			[
    				"!=",
    				"class",
    				"swimming_pool"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(151, 205, 213, 1)"
    		}
    	},
    	{
    		id: "aeroway",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "aeroway",
    		minzoom: 6,
    		maxzoom: 24,
    		filter: [
    			"all"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(216, 216, 216, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landuse",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landuse",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"all"
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(240, 240, 237, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1
    			]
    		}
    	},
    	{
    		id: "landcover_farmland",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		minzoom: 10,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"farmland"
    			]
    		],
    		layout: {
    			visibility: "none"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landcover_grass",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		minzoom: 10,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"grass"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landcover_sand",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"sand"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1
    			]
    		}
    	},
    	{
    		id: "landcover_beach",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"sand"
    			],
    			[
    				"==",
    				"subclass",
    				"beach"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(233, 232, 213, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landcover_wetland",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"wetland"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(192, 229, 219, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1
    			]
    		}
    	},
    	{
    		id: "landcover_wood",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		minzoom: 7,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"wood"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(188, 223, 184, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				0,
    				8,
    				1
    			]
    		}
    	},
    	{
    		id: "landcover_ice",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landcover",
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"ice"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "#FFFFFF",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landuse-pitch",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landuse",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"pitch",
    				"track"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(234, 237, 222, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "landuse-pitch-line",
    		type: "line",
    		source: "openmaptiles",
    		"source-layer": "landuse",
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"pitch",
    				"track"
    			]
    		],
    		paint: {
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			],
    			"line-color": "rgba(183, 206, 182, 1)"
    		}
    	},
    	{
    		id: "landuse-cemetery",
    		type: "fill",
    		source: "openmaptiles",
    		"source-layer": "landuse",
    		minzoom: 0,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"cemetery"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"fill-color": "rgba(214, 234, 209, 1)",
    			"fill-opacity": 1
    		}
    	},
    	{
    		id: "waterway-tunnel",
    		type: "line",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		minzoom: 16,
    		filter: [
    			"all",
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				12,
    				1.5,
    				17,
    				6.5
    			],
    			"line-opacity": 0.5,
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "waterway-river",
    		type: "line",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		minzoom: 0,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"river"
    			],
    			[
    				"!=",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						5,
    						1
    					],
    					[
    						11,
    						2
    					],
    					[
    						13,
    						4
    					],
    					[
    						20,
    						30
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "waterway-stream",
    		type: "line",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		minzoom: 3,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"stream"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						11,
    						1
    					],
    					[
    						14,
    						2
    					],
    					[
    						20,
    						15
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "waterway-other",
    		type: "line",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		minzoom: 0,
    		filter: [
    			"all",
    			[
    				"!in",
    				"class",
    				"river",
    				"stream"
    			],
    			[
    				"!=",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(151, 205, 213, 1)",
    			"line-width": {
    				stops: [
    					[
    						14,
    						1
    					],
    					[
    						20,
    						8
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "tunnel_cycleway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"path"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			],
    			[
    				"==",
    				"subclass",
    				"cycleway"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "round",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(251, 251, 251, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1.1,
    				15,
    				1.7,
    				16,
    				2,
    				17,
    				3.5,
    				18,
    				6
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				6,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_track",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				2
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_minor",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_tertiary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				2,
    				14,
    				3.5,
    				15,
    				6,
    				16,
    				8.4,
    				17,
    				18.3
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_secondary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.5,
    				9,
    				2.3,
    				14,
    				5,
    				15,
    				8.1,
    				16,
    				11.2,
    				17,
    				22
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_primary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.8,
    				9,
    				2.7,
    				14,
    				5.9,
    				15,
    				9,
    				16,
    				12.2,
    				17,
    				22.5
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_motorway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				2.5,
    				9,
    				3.5,
    				14,
    				7.5,
    				15,
    				11,
    				16,
    				15,
    				17,
    				26
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_track-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_service-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_minor-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_tertiary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				1.3,
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.1,
    				17,
    				13.1
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_secondary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 6,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1.1,
    				9,
    				1.5,
    				14,
    				3.2,
    				15,
    				5.8,
    				16,
    				8.3,
    				17,
    				16.2
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_primary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.6,
    				9,
    				2.1,
    				14,
    				4.4,
    				15,
    				7.3,
    				16,
    				10,
    				17,
    				18.5
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_motorway-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.7,
    				9,
    				2.7,
    				14,
    				5.8,
    				15,
    				9,
    				16,
    				12,
    				17,
    				20.8
    			],
    			"line-gap-width": 0,
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "tunnel_motorway-central-axis",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 13,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				0.6,
    				14,
    				0.7,
    				15,
    				1,
    				16,
    				1.2,
    				17,
    				2.1
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				4
    			],
    			"line-opacity": 0.5
    		}
    	},
    	{
    		id: "building",
    		type: "fill",
    		metadata: {
    			"cartefacile:group": "buildings"
    		},
    		source: "openmaptiles",
    		"source-layer": "building",
    		minzoom: 14,
    		paint: {
    			"fill-color": "rgba(213, 213, 208, 1)",
    			"fill-outline-color": "rgba(151, 150, 137, 1)",
    			"fill-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "rail",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 0,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"rail"
    			],
    			[
    				"!has",
    				"service"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2,
    				20,
    				10
    			],
    			"line-opacity": 1
    		}
    	},
    	{
    		id: "rail-dash",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"rail"
    			],
    			[
    				"!has",
    				"service"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "miter",
    			"line-cap": "butt"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				3.5,
    				17,
    				14.7
    			],
    			"line-opacity": 1,
    			"line-dasharray": [
    				0.2,
    				6
    			]
    		}
    	},
    	{
    		id: "rail-service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"rail"
    			],
    			[
    				"has",
    				"service"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(178, 178, 178, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2
    			],
    			"line-opacity": 1,
    			"line-dasharray": [
    				5,
    				2,
    				1,
    				2
    			]
    		}
    	},
    	{
    		id: "path_cycleway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"path"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			],
    			[
    				"==",
    				"subclass",
    				"cycleway"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "round",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(251, 251, 251, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1.1,
    				15,
    				1.7,
    				16,
    				2,
    				17,
    				3.5,
    				18,
    				6
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "path_footway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"path"
    			],
    			[
    				"==",
    				"subclass",
    				"footway"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(251, 251, 251, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				15,
    				1.2,
    				16,
    				1.4,
    				17,
    				2,
    				18,
    				5
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				1,
    				3
    			]
    		}
    	},
    	{
    		id: "path",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 12,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"path"
    			],
    			[
    				"==",
    				"subclass",
    				"path"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(251, 251, 251, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				15,
    				1.2,
    				16,
    				1.4,
    				17,
    				2,
    				18,
    				6
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				4,
    				3
    			]
    		}
    	},
    	{
    		id: "road_track",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "road_service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_minor",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_tertiary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				2,
    				14,
    				3.5,
    				15,
    				6,
    				16,
    				8.4,
    				17,
    				18.3
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_secondary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.5,
    				9,
    				2.3,
    				14,
    				5,
    				15,
    				8.1,
    				16,
    				11.2,
    				17,
    				22
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_primary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.8,
    				9,
    				2.7,
    				14,
    				5.9,
    				15,
    				9,
    				16,
    				12.2,
    				17,
    				22.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_motorway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				2.5,
    				9,
    				3.5,
    				14,
    				7.5,
    				15,
    				11,
    				16,
    				15,
    				17,
    				26
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_track-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_service-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_minor-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_tertiary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				1.3,
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.1,
    				17,
    				13.1
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_secondary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 6,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1.1,
    				9,
    				1.5,
    				14,
    				3.2,
    				15,
    				5.8,
    				16,
    				8.3,
    				17,
    				16.2
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_primary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.6,
    				9,
    				2.1,
    				14,
    				4.4,
    				15,
    				7.3,
    				16,
    				10,
    				17,
    				18.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_motorway-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.7,
    				9,
    				2.7,
    				14,
    				5.8,
    				15,
    				9,
    				16,
    				12,
    				17,
    				20.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "road_motorway-central-axis",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 13,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"!in",
    				"brunnel",
    				"bridge",
    				"tunnel"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				0.6,
    				14,
    				0.7,
    				15,
    				1,
    				16,
    				1.2,
    				17,
    				2.1
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "bridge_cycleway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 16,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"path"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			],
    			[
    				"==",
    				"subclass",
    				"cycleway"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "round",
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(251, 251, 251, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1.1,
    				15,
    				1.7,
    				16,
    				2,
    				17,
    				3.5,
    				18,
    				6
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				6,
    				2
    			]
    		}
    	},
    	{
    		id: "bridge_track",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				2
    			]
    		}
    	},
    	{
    		id: "bridge_service",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3.2,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_minor",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				3,
    				15,
    				5.4,
    				16,
    				7.7,
    				17,
    				16.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_tertiary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 7,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				2,
    				14,
    				3.5,
    				15,
    				6,
    				16,
    				8.4,
    				17,
    				18.3
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_secondary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.5,
    				9,
    				2.3,
    				14,
    				5,
    				15,
    				8.1,
    				16,
    				11.2,
    				17,
    				22
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_primary",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				1.8,
    				9,
    				2.7,
    				14,
    				5.9,
    				15,
    				9,
    				16,
    				12.2,
    				17,
    				22.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_motorway",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 8,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(198, 197, 183, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6,
    				2.5,
    				9,
    				3.5,
    				14,
    				7.5,
    				15,
    				11,
    				16,
    				15,
    				17,
    				26
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_track-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"track"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "round",
    			"line-join": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_service-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"service"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_minor-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.3,
    				17,
    				13.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_tertiary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"tertiary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "miter",
    			"line-cap": "butt"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				1.3,
    				14,
    				2.3,
    				15,
    				4.1,
    				16,
    				6.1,
    				17,
    				13.1
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_secondary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 6,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				1.1,
    				9,
    				1.5,
    				14,
    				3.2,
    				15,
    				5.8,
    				16,
    				8.3,
    				17,
    				16.2
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_primary-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.6,
    				9,
    				2.1,
    				14,
    				4.4,
    				15,
    				7.3,
    				16,
    				10,
    				17,
    				18.5
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_motorway-inner",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 5,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-join": "miter",
    			"line-cap": "butt"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				0.7,
    				9,
    				2.7,
    				14,
    				5.8,
    				15,
    				9,
    				16,
    				12,
    				17,
    				20.8
    			],
    			"line-gap-width": 0
    		}
    	},
    	{
    		id: "bridge_motorway-central-axis",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "streets"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation",
    		minzoom: 13,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"motorway",
    				"trunk"
    			],
    			[
    				"==",
    				"brunnel",
    				"bridge"
    			]
    		],
    		layout: {
    			visibility: "visible",
    			"line-cap": "butt",
    			"line-join": "miter"
    		},
    		paint: {
    			"line-color": "rgba(197, 197, 197, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				0.6,
    				14,
    				0.7,
    				15,
    				1,
    				16,
    				1.2,
    				17,
    				2.1
    			],
    			"line-gap-width": 0,
    			"line-dasharray": [
    				2,
    				4
    			]
    		}
    	},
    	{
    		id: "boundary_country",
    		type: "line",
    		metadata: {
    			"cartefacile:group": "boundaries"
    		},
    		source: "openmaptiles",
    		"source-layer": "boundary",
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"<=",
    				"admin_level",
    				3
    			],
    			[
    				"==",
    				"maritime",
    				0
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(141, 141, 141, 1)",
    			"line-blur": 0,
    			"line-width": 1,
    			"line-dasharray": [
    				1,
    				1
    			],
    			"line-opacity": 1
    		}
    	},
    	{
    		id: "peak_others",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "mountain_peak",
    		minzoom: 14,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"peak"
    			],
    			[
    				"!in",
    				"rank",
    				1,
    				2
    			]
    		],
    		layout: {
    			"text-field": "{name:latin}\n{ele}m\n▲",
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-anchor": "bottom",
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "peak_secondary",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "mountain_peak",
    		minzoom: 12,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"peak"
    			],
    			[
    				"in",
    				"rank",
    				2
    			]
    		],
    		layout: {
    			"text-field": "{name:latin}\n{ele}m\n▲",
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-anchor": "bottom",
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "peak_main-no-elevation",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "mountain_peak",
    		minzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"peak"
    			],
    			[
    				"in",
    				"rank",
    				1
    			],
    			[
    				"!has",
    				"elev"
    			]
    		],
    		layout: {
    			"text-field": "{name:latin}\n▲",
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-anchor": "bottom",
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "peak_main",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "mountain_peak",
    		minzoom: 10,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"peak"
    			],
    			[
    				"in",
    				"rank",
    				1
    			],
    			[
    				"has",
    				"ele"
    			]
    		],
    		layout: {
    			"text-field": "{name:latin}\n{ele}m\n▲",
    			"text-font": [
    				"Noto Sans Italic"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				15,
    				14
    			],
    			"text-anchor": "bottom",
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#863831",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "water_name_ocean",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "water_name",
    		minzoom: 3,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"sea"
    			]
    		],
    		layout: {
    			"symbol-placement": "point",
    			"text-field": "{name:fr}",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-size": {
    				stops: [
    					[
    						5,
    						10
    					],
    					[
    						10,
    						24
    					]
    				]
    			}
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "water_name_bay",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "water_name",
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"bay"
    			]
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{name}",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				12,
    				16,
    				22
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "water_name_river",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"river"
    			]
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{name}",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				10,
    				16,
    				16
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "water_name_stream",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "waterway",
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"stream"
    			]
    		],
    		layout: {
    			"symbol-placement": "line",
    			"text-field": "{name}",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				12,
    				9,
    				16,
    				12
    			]
    		},
    		paint: {
    			"text-color": "rgba(34, 95, 108, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 0.2)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "tname_ref-z13-major",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 13,
    		maxzoom: 16,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"class",
    				"tertiary"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-field": "{ref}",
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-size": 10,
    			"icon-image": "road_{ref_length}",
    			"symbol-avoid-edges": false
    		},
    		paint: {
    			"text-color": "rgba(47, 47, 47, 1)",
    			"text-halo-color": "rgba(229, 229, 229, 1)",
    			"text-halo-width": 0,
    			"text-halo-blur": 0,
    			"text-opacity": 1,
    			"icon-opacity": 0.7
    		}
    	},
    	{
    		id: "tname_ref-z12-trunk",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 12,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"trunk"
    			],
    			[
    				"!=",
    				"subclass",
    				"junction"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-field": "{ref}",
    			visibility: "visible",
    			"symbol-placement": "point",
    			"text-size": 10,
    			"icon-image": "road_{ref_length}",
    			"symbol-avoid-edges": false
    		},
    		paint: {
    			"text-color": "rgba(47, 47, 47, 1)",
    			"text-halo-color": "rgba(229, 229, 229, 1)",
    			"text-halo-width": 0,
    			"text-halo-blur": 0,
    			"text-opacity": 1,
    			"icon-opacity": 0.7
    		}
    	},
    	{
    		id: "tname_ref-z9-motorway",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 9,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"motorway"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-field": "{ref}",
    			"symbol-placement": "line",
    			"text-size": 10,
    			"symbol-avoid-edges": false,
    			"text-pitch-alignment": "auto",
    			"symbol-z-order": "auto",
    			visibility: "visible",
    			"text-padding": 1,
    			"text-rotation-alignment": "auto",
    			"text-anchor": "center",
    			"text-max-angle": 45,
    			"icon-text-fit": "none"
    		},
    		paint: {
    			"text-color": "#FFFFFF",
    			"text-halo-color": "#828282",
    			"text-halo-width": 1
    		}
    	},
    	{
    		id: "tname_z16-track",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 16,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"track"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-field": "{name}",
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-size": 12,
    			"icon-anchor": "center",
    			"text-keep-upright": true
    		},
    		paint: {
    			"text-color": "#171717",
    			"text-halo-color": "#FFFFFF",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "tname_z15-minor",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 15,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"minor"
    			],
    			[
    				"==",
    				"class",
    				"service"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-field": "{name}",
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-size": 12,
    			"icon-anchor": "center",
    			"text-keep-upright": true
    		},
    		paint: {
    			"text-color": "#171717",
    			"text-halo-color": "#FFFFFF",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "tname_z14-major",
    		type: "symbol",
    		metadata: {
    			"cartefacile:group": "street_labels"
    		},
    		source: "openmaptiles",
    		"source-layer": "transportation_name",
    		minzoom: 14,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"trunk"
    			],
    			[
    				"==",
    				"class",
    				"primary"
    			],
    			[
    				"==",
    				"class",
    				"secondary"
    			],
    			[
    				"==",
    				"class",
    				"tertiary"
    			]
    		],
    		layout: {
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-field": "{name}",
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-size": 12,
    			"icon-anchor": "center",
    			"text-keep-upright": true
    		},
    		paint: {
    			"text-color": "#171717",
    			"text-halo-color": "#FFFFFF",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_other",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 13,
    		maxzoom: 18,
    		filter: [
    			"all",
    			[
    				"in",
    				"class",
    				"hamlet",
    				"island",
    				"islet",
    				"neighbourhood",
    				"suburb",
    				"borough"
    			]
    		],
    		layout: {
    			"text-field": "{name}",
    			"text-font": [
    				"Noto Sans Regular"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				13,
    				12,
    				16,
    				14
    			],
    			visibility: "visible",
    			"text-transform": "none"
    		},
    		paint: {
    			"text-color": "rgba(80, 80, 80, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1,
    			"icon-halo-width": 1,
    			"icon-halo-blur": 1
    		}
    	},
    	{
    		id: "place_village",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 9,
    		maxzoom: 17,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"village"
    			]
    		],
    		layout: {
    			"text-field": "{name}",
    			"text-font": [
    				"step",
    				[
    					"zoom"
    				],
    				[
    					"literal",
    					[
    						"Noto Sans Regular"
    					]
    				],
    				13,
    				[
    					"literal",
    					[
    						"Noto Sans Bold"
    					]
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				9,
    				10,
    				14,
    				15
    			],
    			"icon-anchor": "center",
    			"text-justify": "center",
    			"text-anchor": "center",
    			"text-offset": [
    				0,
    				0
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 0,
    			"icon-halo-width": 1,
    			"icon-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_town",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 7,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"town"
    			]
    		],
    		layout: {
    			"text-field": "{name}",
    			"text-font": [
    				"step",
    				[
    					"zoom"
    				],
    				[
    					"literal",
    					[
    						"Noto Sans Regular"
    					]
    				],
    				13,
    				[
    					"literal",
    					[
    						"Noto Sans Bold"
    					]
    				]
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				7,
    				12,
    				13,
    				15
    			],
    			"icon-anchor": "center",
    			"text-justify": "center",
    			"text-anchor": "center",
    			"icon-size": 0.5,
    			visibility: "visible",
    			"text-offset": [
    				0.5,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_secondary",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 7,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"city"
    			]
    		],
    		layout: {
    			"text-field": "{name:fr}",
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						7,
    						14
    					],
    					[
    						10,
    						16
    					]
    				]
    			},
    			"icon-anchor": "center",
    			"text-justify": "center",
    			"text-anchor": "center",
    			"icon-size": 0.5,
    			visibility: "visible",
    			"text-offset": [
    				0.5,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_major",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 7,
    		maxzoom: 16,
    		filter: [
    			"all",
    			[
    				"in",
    				"capital",
    				2,
    				3,
    				4,
    				5
    			]
    		],
    		layout: {
    			"text-field": "{name:fr}",
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": 16,
    			"icon-anchor": "center",
    			"text-justify": "center",
    			"text-anchor": "center",
    			"icon-size": 0.5,
    			visibility: "visible",
    			"text-offset": [
    				0.5,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_secondary_point",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 6,
    		maxzoom: 7,
    		filter: [
    			"any",
    			[
    				"in",
    				"capital",
    				6
    			],
    			[
    				"==",
    				"class",
    				"city"
    			]
    		],
    		layout: {
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"name:fr"
    				]
    			],
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-justify": "left",
    			"text-anchor": "left",
    			visibility: "visible",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_major_point",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 5,
    		maxzoom: 7,
    		filter: [
    			"all",
    			[
    				"in",
    				"capital",
    				4,
    				5
    			]
    		],
    		layout: {
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"name:fr"
    				]
    			],
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				10,
    				7,
    				14
    			],
    			"text-justify": "left",
    			"text-anchor": "left",
    			visibility: "visible",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_city_capital_point",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 4,
    		maxzoom: 7,
    		filter: [
    			"all",
    			[
    				"in",
    				"capital",
    				2
    			]
    		],
    		layout: {
    			"text-field": [
    				"concat",
    				"• ",
    				[
    					"get",
    					"name:fr"
    				]
    			],
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				10,
    				7,
    				16
    			],
    			"text-justify": "left",
    			"text-anchor": "left",
    			visibility: "visible",
    			"text-offset": [
    				0,
    				0
    			]
    		},
    		paint: {
    			"text-color": "#222222",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_country",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 2,
    		maxzoom: 9,
    		filter: [
    			"any",
    			[
    				"==",
    				"class",
    				"country"
    			]
    		],
    		layout: {
    			"text-field": "{name:fr}",
    			"text-size": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				4,
    				12,
    				6,
    				16,
    				9,
    				20
    			],
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1,
    			"text-halo-blur": 1
    		}
    	},
    	{
    		id: "place_continent",
    		type: "symbol",
    		source: "openmaptiles",
    		"source-layer": "place",
    		minzoom: 0.2,
    		maxzoom: 2,
    		filter: [
    			"all",
    			[
    				"==",
    				"class",
    				"continent"
    			]
    		],
    		layout: {
    			"text-field": "{name:fr}",
    			"text-font": [
    				"Noto Sans Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						1,
    						10
    					],
    					[
    						2,
    						15
    					]
    				]
    			},
    			"text-transform": "uppercase"
    		},
    		paint: {
    			"text-color": "#787878",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 2,
    			"text-halo-blur": 1
    		}
    	}
    ];
    var owner = "Carte Facile (IGN)";
    var id = "hpi09n5";
    var simpleOsm = {
    	version: version,
    	name: name$3,
    	metadata: metadata$3,
    	center: center,
    	zoom: zoom,
    	projection: projection,
    	sources: sources$3,
    	sprite: sprite,
    	glyphs: glyphs,
    	layers: layers,
    	owner: owner,
    	id: id
    };

    var img$5 = "data:image/webp;base64,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";

    var img$4 = "data:image/webp;base64,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";

    var img$3 = "data:image/webp;base64,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";

    var img$2 = "data:image/webp;base64,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";

    var img$1 = "data:image/webp;base64,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";

    var img = "data:image/webp;base64,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";

    var name$2 = "cadastre";
    var metadata$2 = {
    	fr: {
    		name: "Cadastre",
    		description: "Surcouche du cadastre."
    	},
    	en: {
    		name: "Cadastre",
    		description: "Overlay of French cadastre."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var sources$2 = {
    	cadastre: {
    		type: "vector",
    		url: "https://openmaptiles.geo.data.gouv.fr/data/cadastre.json"
    	}
    };
    var cadastreCommon = {
    	name: name$2,
    	metadata: metadata$2,
    	sources: sources$2
    };

    var cadastreNeutralLayers = [
    	{
    		id: "Cadastre - Parcelles - Bordures",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-width": {
    				stops: [
    					[
    						15,
    						2
    					],
    					[
    						16.5,
    						2.4
    					],
    					[
    						19,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Parcelles",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-width": {
    				stops: [
    					[
    						15,
    						1
    					],
    					[
    						16.5,
    						1.4
    					],
    					[
    						19,
    						3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Sections - Bordures",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-opacity": 1,
    			"line-width": {
    				stops: [
    					[
    						12,
    						2
    					],
    					[
    						14,
    						3
    					],
    					[
    						19,
    						9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Sections",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-opacity": 1,
    			"line-width": {
    				stops: [
    					[
    						12,
    						1
    					],
    					[
    						14,
    						2
    					],
    					[
    						19,
    						6
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Parcelles - Label",
    		type: "symbol",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			"text-field": "{numero}",
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						17,
    						12
    					],
    					[
    						20,
    						16
    					]
    				]
    			},
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(45, 45, 45, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 1.4,
    			"text-halo-blur": 0.4
    		}
    	},
    	{
    		id: "Cadastre - Sections - Label",
    		type: "symbol",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			"text-field": "{code}",
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						12,
    						12
    					],
    					[
    						16,
    						16
    					]
    				]
    			},
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgba(45, 45, 45, 1)",
    			"text-halo-color": "rgba(255, 255, 255, 1)",
    			"text-halo-width": 2,
    			"text-halo-blur": 0.4
    		}
    	}
    ];

    var cadastreColorLayers = [
    	{
    		id: "Cadastre - Parcelles - Contours",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-width": {
    				stops: [
    					[
    						15,
    						2
    					],
    					[
    						16.5,
    						2.4
    					],
    					[
    						19,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Parcelles",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-width": {
    				stops: [
    					[
    						15,
    						1
    					],
    					[
    						16.5,
    						1.4
    					],
    					[
    						19,
    						3
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Sections - Bordures",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-opacity": 1,
    			"line-width": {
    				stops: [
    					[
    						12,
    						2
    					],
    					[
    						14,
    						3
    					],
    					[
    						19,
    						9
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Sections",
    		type: "line",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-opacity": 1,
    			"line-width": {
    				stops: [
    					[
    						12,
    						1
    					],
    					[
    						14,
    						2
    					],
    					[
    						19,
    						6
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Cadastre - Parcelles - Label",
    		type: "symbol",
    		source: "cadastre",
    		"source-layer": "parcelles",
    		metadata: {
    			"cartefacile:group": "cadastral_parcels"
    		},
    		minzoom: 14.5,
    		layout: {
    			"text-field": "{numero}",
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						17,
    						12
    					],
    					[
    						20,
    						16
    					]
    				]
    			},
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgb(255,202,0)",
    			"text-halo-color": "rgba(40, 40, 40, 1)",
    			"text-halo-width": 1.4,
    			"text-halo-blur": 0.4
    		}
    	},
    	{
    		id: "Cadastre - Sections - Label",
    		type: "symbol",
    		source: "cadastre",
    		"source-layer": "sections",
    		metadata: {
    			"cartefacile:group": "cadastral_sections"
    		},
    		minzoom: 12,
    		layout: {
    			"text-field": "{code}",
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-size": {
    				stops: [
    					[
    						12,
    						12
    					],
    					[
    						16,
    						16
    					]
    				]
    			},
    			visibility: "visible"
    		},
    		paint: {
    			"text-color": "rgb(255,202,0)",
    			"text-halo-color": "rgba(40, 40, 40, 1)",
    			"text-halo-width": 2,
    			"text-halo-blur": 0.4
    		}
    	}
    ];

    var name$1 = "administrative-boundaries";
    var metadata$1 = {
    	fr: {
    		name: "Limites administratives",
    		description: "Surcouche des limites administratives."
    	},
    	en: {
    		name: "Administrative boundaries",
    		description: "Overlay of administrative boundaries."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var sources$1 = {
    	"decoupage-administratif": {
    		type: "vector",
    		url: "https://openmaptiles.geo.data.gouv.fr/data/decoupage-administratif.json"
    	}
    };
    var adminCommon = {
    	name: name$1,
    	metadata: metadata$1,
    	sources: sources$1
    };

    var adminNeutralLayers = [
    	{
    		id: "Limites - Commune - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "communes",
    		metadata: {
    			"cartefacile:group": "boundaries_communes"
    		},
    		minzoom: 10,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						11,
    						2
    					],
    					[
    						12,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Commune",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "communes",
    		metadata: {
    			"cartefacile:group": "boundaries_communes"
    		},
    		minzoom: 10,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						11,
    						1
    					],
    					[
    						12,
    						2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - EPCI - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "epcis",
    		metadata: {
    			"cartefacile:group": "boundaries_epcis"
    		},
    		minzoom: 10,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": 4
    		}
    	},
    	{
    		id: "Limites - EPCI",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "epcis",
    		metadata: {
    			"cartefacile:group": "boundaries_epcis"
    		},
    		minzoom: 10,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": 2
    		}
    	},
    	{
    		id: "Limites - Departement - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "departements",
    		metadata: {
    			"cartefacile:group": "boundaries_departements"
    		},
    		minzoom: 6.4,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6.4,
    				0,
    				6.7,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						8,
    						2
    					],
    					[
    						9,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Departement",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "departements",
    		metadata: {
    			"cartefacile:group": "boundaries_departements"
    		},
    		minzoom: 6.4,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6.4,
    				0,
    				6.7,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						8,
    						1
    					],
    					[
    						9,
    						2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Region - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "regions",
    		metadata: {
    			"cartefacile:group": "boundaries_regions"
    		},
    		minzoom: 5,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(255, 255, 255, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				0,
    				5.3,
    				1
    			],
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				2,
    				8,
    				4
    			]
    		}
    	},
    	{
    		id: "Limites - Region",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "regions",
    		metadata: {
    			"cartefacile:group": "boundaries_regions"
    		},
    		minzoom: 5,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(88, 88, 88, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				0,
    				5.3,
    				1
    			],
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				1,
    				8,
    				2
    			]
    		}
    	}
    ];

    var adminColorLayers = [
    	{
    		id: "Limites - Commune - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "communes",
    		metadata: {
    			"cartefacile:group": "boundaries_communes"
    		},
    		minzoom: 10,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						11,
    						2
    					],
    					[
    						12,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Commune",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "communes",
    		metadata: {
    			"cartefacile:group": "boundaries_communes"
    		},
    		minzoom: 10,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						11,
    						1
    					],
    					[
    						12,
    						2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - EPCI - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		metadata: {
    			"cartefacile:group": "boundaries_epcis"
    		},
    		"source-layer": "epcis",
    		minzoom: 10,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": 4
    		}
    	},
    	{
    		id: "Limites - EPCI",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "epcis",
    		metadata: {
    			"cartefacile:group": "boundaries_epcis"
    		},
    		minzoom: 10,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				10,
    				0,
    				10.3,
    				1
    			],
    			"line-width": 2
    		}
    	},
    	{
    		id: "Limites - Departement - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "departements",
    		metadata: {
    			"cartefacile:group": "boundaries_departments"
    		},
    		minzoom: 6.4,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6.4,
    				0,
    				6.7,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						8,
    						2
    					],
    					[
    						9,
    						4
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Departement",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "departements",
    		metadata: {
    			"cartefacile:group": "boundaries_departments"
    		},
    		minzoom: 6.4,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				6.4,
    				0,
    				6.7,
    				1
    			],
    			"line-width": {
    				stops: [
    					[
    						8,
    						1
    					],
    					[
    						9,
    						2
    					]
    				]
    			}
    		}
    	},
    	{
    		id: "Limites - Region - Bordures",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "regions",
    		metadata: {
    			"cartefacile:group": "boundaries_regions"
    		},
    		minzoom: 5,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgba(40, 40, 40, 1)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				0,
    				5.3,
    				1
    			],
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				2,
    				8,
    				4
    			]
    		}
    	},
    	{
    		id: "Limites - Region",
    		type: "line",
    		source: "decoupage-administratif",
    		"source-layer": "regions",
    		metadata: {
    			"cartefacile:group": "boundaries_regions"
    		},
    		minzoom: 5,
    		maxzoom: 24,
    		layout: {
    			"line-cap": "round"
    		},
    		paint: {
    			"line-color": "rgb(255,202,0)",
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				0,
    				5.3,
    				1
    			],
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				5,
    				1,
    				8,
    				2
    			]
    		}
    	}
    ];

    var name = "level-curves";
    var metadata = {
    	fr: {
    		name: "Courbes de niveau",
    		description: "Surcouche des courbes de niveau."
    	},
    	en: {
    		name: "Level curves",
    		description: "Overlay of level curves."
    	},
    	"maputnik:renderer": "mlgljs"
    };
    var sources = {
    	isohypse: {
    		type: "vector",
    		url: "https://data.geopf.fr/tms/1.0.0/ISOHYPSE/metadata.json"
    	}
    };
    var levelsCommon = {
    	name: name,
    	metadata: metadata,
    	sources: sources
    };

    var levelsNeutralLayers = [
    	{
    		id: "courbes de niveau - intervalle 10m",
    		type: "line",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					10
    				],
    				0
    			]
    		],
    		layout: {
    			"line-cap": "square",
    			"line-join": "bevel",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(177, 110, 56, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0.5,
    				17,
    				1
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "courbes maitresses - 100m",
    		type: "line",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					50
    				],
    				0
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "rgba(177, 110, 56, 1)",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2.5
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "courbes maitresses - labels",
    		type: "symbol",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14.5,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					50
    				],
    				0
    			]
    		],
    		layout: {
    			"text-field": "{altitude}",
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-size": {
    				stops: [
    					[
    						14,
    						10
    					],
    					[
    						17,
    						13
    					]
    				]
    			},
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-pitch-alignment": "auto",
    			"text-rotation-alignment": "auto",
    			"text-keep-upright": true
    		},
    		paint: {
    			"text-color": "rgba(177, 110, 56, 1)",
    			"text-halo-width": 2,
    			"text-halo-color": "rgba(255, 255, 255, 1)"
    		}
    	}
    ];

    var levelsColorLayers = [
    	{
    		id: "courbes de niveau - intervalle 10m",
    		type: "line",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					10
    				],
    				0
    			]
    		],
    		layout: {
    			"line-cap": "square",
    			"line-join": "bevel",
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": " #FC9B4F",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0.5,
    				17,
    				1
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "courbes maitresses - 100m",
    		type: "line",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14,
    		maxzoom: 24,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					50
    				],
    				0
    			]
    		],
    		layout: {
    			visibility: "visible"
    		},
    		paint: {
    			"line-color": "#FC9B4F",
    			"line-width": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				1,
    				17,
    				2.5
    			],
    			"line-opacity": [
    				"interpolate",
    				[
    					"linear"
    				],
    				[
    					"zoom"
    				],
    				14,
    				0,
    				15,
    				1
    			]
    		}
    	},
    	{
    		id: "courbes maitresses - labels",
    		type: "symbol",
    		source: "isohypse",
    		"source-layer": "courbe",
    		minzoom: 14.5,
    		filter: [
    			"all",
    			[
    				"==",
    				[
    					"%",
    					[
    						"get",
    						"altitude"
    					],
    					50
    				],
    				0
    			]
    		],
    		layout: {
    			"text-field": "{altitude}",
    			visibility: "visible",
    			"symbol-placement": "line",
    			"text-size": {
    				stops: [
    					[
    						14,
    						10
    					],
    					[
    						17,
    						13
    					]
    				]
    			},
    			"text-font": [
    				"Source Sans Pro Bold"
    			],
    			"text-pitch-alignment": "auto",
    			"text-rotation-alignment": "auto",
    			"text-keep-upright": true
    		},
    		paint: {
    			"text-color": "#FC9B4F",
    			"text-halo-width": 2,
    			"text-halo-color": "rgba(40, 40, 40, 1)"
    		}
    	}
    ];

    // Import IGN map styles
    /* import desaturatedOsm from './desaturated-osm.json';*/
    /**
     * Map styles configuration
     * Each style is a complete MapLibre style configuration
     */
    const mapStyles = {
        simple: simpleIgn,
        simpleOsm: simpleOsm,
        aerial: aerialIgn,
        desaturated: desaturatedIgn
    };
    /**
     * @deprecated Use mapStyles instead. This will be removed in the next major version.
     */
    const mapStyle = mapStyles;
    /**
     * Map thumbnails configuration
     * Used for style selection UI
     */
    const mapThumbnails = {
        simple: img$5,
        simpleOsm: img$5,
        aerial: img$4,
        desaturated: img$3,
        cadastre: img$2,
        administrativeBoundaries: img$1,
        levelCurves: img,
    };
    /**
     * Map overlays configuration
     * Each overlay has two variants:
     * - neutral: for standard map styles (simple, desaturated)
     * - color: for aerial map style
     */
    const mapOverlays = {
        cadastre: {
            neutral: { ...cadastreCommon, layers: cadastreNeutralLayers },
            color: { ...cadastreCommon, layers: cadastreColorLayers }
        },
        administrativeBoundaries: {
            neutral: { ...adminCommon, layers: adminNeutralLayers },
            color: { ...adminCommon, layers: adminColorLayers }
        },
        levelCurves: {
            neutral: { ...levelsCommon, layers: levelsNeutralLayers },
            color: { ...levelsCommon, layers: levelsColorLayers }
        }
    };
    /**
     * Gets the appropriate overlay variant based on the current map style
     */
    function getOverlayVariant(map) {
        return map.getStyle().name === 'aerial' ? 'color' : 'neutral';
    }
    /** Stores styledata update callbacks per map instance, keyed by overlay type */
    const overlayUpdaters = new WeakMap();
    /**
     * Adds one or more overlays to the map
     * @param map - The MapLibre map instance
     * @param type - The type of overlay(s) to add (cadastre, administrative-boundaries, or level-curves)
     */
    function addOverlay(map, type) {
        const types = Array.isArray(type) ? type : [type];
        const update = () => {
            types.forEach(singleType => {
                const overlay = mapOverlays[singleType][getOverlayVariant(map)];
                Object.entries(overlay.sources).forEach(([id, source]) => {
                    if (!map.getSource(id))
                        map.addSource(id, source);
                });
                overlay.layers.forEach(layer => {
                    if (!map.getLayer(layer.id))
                        map.addLayer(layer);
                });
            });
        };
        if (map.loaded())
            update();
        else
            map.once('load', update);
        if (!overlayUpdaters.has(map))
            overlayUpdaters.set(map, new Map());
        const updaters = overlayUpdaters.get(map);
        types.forEach(singleType => updaters.set(singleType, update));
        map.on('styledata', update);
    }
    /**
     * Removes one or more overlays from the map
     * @param map - The MapLibre map instance
     * @param type - The type of overlay(s) to remove (cadastre, administrative-boundaries, or level-curves)
     */
    function removeOverlay(map, type) {
        const types = Array.isArray(type) ? type : [type];
        types.forEach(singleType => {
            var _a, _b;
            const overlay = mapOverlays[singleType][getOverlayVariant(map)];
            // Remove all layers from this overlay
            overlay.layers.forEach(layer => {
                if (map.getLayer(layer.id)) {
                    map.removeLayer(layer.id);
                }
            });
            // Remove all sources from this overlay
            Object.keys(overlay.sources).forEach(sourceId => {
                if (map.getSource(sourceId)) {
                    map.removeSource(sourceId);
                }
            });
            // Remove the styledata event listener for this overlay
            const update = (_a = overlayUpdaters.get(map)) === null || _a === void 0 ? void 0 : _a.get(singleType);
            if (update) {
                map.off('styledata', update);
                (_b = overlayUpdaters.get(map)) === null || _b === void 0 ? void 0 : _b.delete(singleType);
            }
        });
    }
    /**
     * Show the specified layer groups
     * @param map - The MapLibre map instance
     * @param groups - List of layer groups to show
     */
    function showLayer(map, groups) {
        var _a;
        const groupList = Array.isArray(groups) ? groups : [groups];
        if (!map.loaded()) {
            map.once('load', () => showLayer(map, groupList));
            return;
        }
        (_a = map.getStyle().layers) === null || _a === void 0 ? void 0 : _a.forEach(layer => {
            var _a;
            const group = (_a = layer.metadata) === null || _a === void 0 ? void 0 : _a['cartefacile:group'];
            if (group && groupList.includes(group)) {
                map.setLayoutProperty(layer.id, 'visibility', 'visible');
            }
        });
    }
    /**
     * Hide the specified layer groups
     * @param map - The MapLibre map instance
     * @param groups - List of layer groups to hide
     */
    function hideLayer(map, groups) {
        var _a;
        const groupList = Array.isArray(groups) ? groups : [groups];
        if (!map.loaded()) {
            map.once('load', () => hideLayer(map, groupList));
            return;
        }
        (_a = map.getStyle().layers) === null || _a === void 0 ? void 0 : _a.forEach(layer => {
            var _a;
            const group = (_a = layer.metadata) === null || _a === void 0 ? void 0 : _a['cartefacile:group'];
            if (group && groupList.includes(group)) {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
            }
        });
    }

    class ZoomLevelControl {
        onAdd(map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
            const label = document.createElement('div');
            label.className = 'cartefacile-ctrl-zoom-level';
            label.textContent = 'Zoom : ';
            const value = document.createElement('span');
            value.textContent = map.getZoom().toFixed(1);
            this._container.appendChild(label);
            label.appendChild(value);
            map.on('zoom', () => {
                value.textContent = map.getZoom().toFixed(1);
            });
            return this._container;
        }
        onRemove() {
            var _a;
            (_a = this._container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this._container);
            this._map = undefined;
        }
        getDefaultPosition() {
            return 'top-right';
        }
    }

    /**
     * Simple utility to create elements from template strings
     */
    function createFromTemplate(template) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template.trim();
        return wrapper.firstElementChild;
    }
    /**
     * HTML templates for all UI component elements
     */
    const TEMPLATES = {
        container: `
        <div class="maplibregl-ctrl maplibregl-ctrl-group"
             aria-label="Sélecteur de carte">
        </div>
    `,
        toggleButton: `
        <button class="cartefacile-btn cartefacile-btn-icon cartefacile-btn-icon--stack" 
                title="Sélecteur de carte"
                aria-label="Ouvrir le sélecteur de cartes et surcouches"
                aria-expanded="false"
                aria-controls="map-selector-panel">
        </button>
    `,
        panel: `
        <div class="maplibregl-ctrl maplibregl-ctrl-group cartefacile-ctrl-map-selector-panel"
             id="map-selector-panel"
             role="dialog"
             aria-label="Sélecteur de cartes et surcouches"
             style="display: none;">
          
          <button class="cartefacile-btn cartefacile-btn-icon cartefacile-btn-icon--close-circle cartefacile-btn--close"
                  title="Fermer"
                  aria-label="Fermer le sélecteur de cartes">
          </button>
          
          <h3 id="styles-heading">Cartes</h3>
          <div class="cartefacile-ctrl-map-selector-card-list"
               role="radiogroup"
               aria-labelledby="styles-heading">
          </div>
          
          <h3 id="overlays-heading">Surcouches</h3>
          <div class="cartefacile-ctrl-map-selector-card-list"
               role="group"
               aria-labelledby="overlays-heading">
          </div>
        </div>
    `,
        card: `
        <div class="cartefacile-ctrl-map-selector-card"
             tabindex="0"
             aria-checked="false">
          <img role="presentation">
          <div class="cartefacile-ctrl-map-selector-card__title"></div>
        </div>
    `
    };
    /**
     * MapLibre control for selecting map styles and overlays
     * Provides a toggle button that opens a panel with style and overlay options
     */
    class MapSelectorControl {
        constructor(options = {}) {
            this._options = {
                styles: options.styles || Object.keys(mapStyles),
                overlays: options.overlays || Object.values(Overlay)
            };
        }
        /** Creates and initializes the control structure */
        onAdd(map) {
            this._map = map;
            // Create the main control container from the HTML template
            const container = createFromTemplate(TEMPLATES.container);
            // Create the toggle button to open/close the selector panel
            this._toggleButton = createFromTemplate(TEMPLATES.toggleButton);
            // Create the panel for selecting map styles and overlays
            this._panel = this._createPanel();
            // Add panel to map container
            map.getContainer().appendChild(this._panel);
            this._setupEventHandlers();
            // Sync panel state after map is loaded
            if (map.loaded()) {
                this._syncPanelState();
            }
            else {
                map.once('load', () => this._syncPanelState());
            }
            container.appendChild(this._toggleButton);
            return container;
        }
        /** Creates the main selector panel with style and overlay sections */
        _createPanel() {
            const panel = createFromTemplate(TEMPLATES.panel);
            const [stylesContainer, overlaysContainer] = panel.querySelectorAll('.cartefacile-ctrl-map-selector-card-list');
            this._populateCards(stylesContainer, 'style');
            this._populateCards(overlaysContainer, 'overlay');
            return panel;
        }
        /** Creates a card element from template */
        _createCard(id, title, thumbnail, type, onClick) {
            const card = createFromTemplate(TEMPLATES.card);
            // Configure card attributes securely
            card.setAttribute('data-id', id);
            card.setAttribute('data-type', type);
            card.setAttribute('role', type === 'style' ? 'radio' : 'checkbox');
            card.setAttribute('aria-label', `${type === 'style' ? 'Style de carte' : 'Surcouche'} : ${title}`);
            // Configure image securely
            const img = card.querySelector('img');
            img.src = thumbnail;
            img.alt = `Aperçu de ${title}`;
            // Configure title securely  
            const titleDiv = card.querySelector('.cartefacile-ctrl-map-selector-card__title');
            titleDiv.textContent = title;
            // Add event listeners
            card.addEventListener('click', onClick);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
            return card;
        }
        /** Populates containers with cards based on type */
        _populateCards(container, type) {
            if (type === 'style') {
                Object.entries(mapStyles)
                    .filter(([key]) => this._options.styles.includes(key))
                    .forEach(([key, styleObj]) => {
                    var _a, _b, _c;
                    const title = (_c = (_b = (_a = styleObj.metadata) === null || _a === void 0 ? void 0 : _a.fr) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Style sans nom';
                    const thumbnail = mapThumbnails[key] || '';
                    const card = this._createCard(key, title, thumbnail, 'style', () => this._onStyleClick(key, styleObj, container, card));
                    container.appendChild(card);
                });
            }
            else {
                Object.values(Overlay)
                    .filter(id => this._options.overlays.includes(id))
                    .forEach(id => {
                    var _a, _b, _c;
                    const overlay = mapOverlays[id];
                    const title = (_c = (_b = (_a = overlay === null || overlay === void 0 ? void 0 : overlay.neutral.metadata) === null || _a === void 0 ? void 0 : _a.fr) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Surcouche sans nom';
                    const thumbnail = mapThumbnails[id] || '';
                    const card = this._createCard(id, title, thumbnail, 'overlay', () => this._onOverlayClick(id, card));
                    container.appendChild(card);
                });
            }
        }
        /** Sets up essential event handlers for AAA compliance */
        _setupEventHandlers() {
            var _a;
            if (!this._panel || !this._toggleButton)
                return;
            this._toggleButton.addEventListener('click', () => this._togglePanel());
            (_a = this._panel.querySelector('.cartefacile-btn--close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this._closePanel());
            this._keydownHandler = (event) => {
                if (this._panel.style.display === 'none')
                    return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    this._closePanel();
                    this._toggleButton.focus();
                }
                else if (event.key === 'Tab') {
                    const focusableElements = this._panel.querySelectorAll('button, [tabindex="0"]');
                    const first = focusableElements[0];
                    const last = focusableElements[focusableElements.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    }
                    else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            };
            this._clickHandler = (event) => {
                if (this._panel.style.display !== 'none' &&
                    !this._panel.contains(event.target) &&
                    !this._toggleButton.contains(event.target)) {
                    this._closePanel();
                }
            };
            document.addEventListener('keydown', this._keydownHandler);
            document.addEventListener('click', this._clickHandler);
        }
        /** Toggles panel visibility */
        _togglePanel() {
            if (this._panel.style.display === 'none') {
                this._openPanel();
            }
            else {
                this._closePanel();
            }
        }
        /** Opens the panel with focus management */
        _openPanel() {
            if (!this._panel || !this._toggleButton)
                return;
            // Position panel dynamically
            const container = this._toggleButton.closest('.maplibregl-ctrl-group');
            const parent = container === null || container === void 0 ? void 0 : container.parentElement;
            let positionClass = 'cartefacile-ctrl-top-right';
            if (parent === null || parent === void 0 ? void 0 : parent.classList.contains('maplibregl-ctrl-top-left'))
                positionClass = 'cartefacile-ctrl-top-left';
            else if (parent === null || parent === void 0 ? void 0 : parent.classList.contains('maplibregl-ctrl-bottom-right'))
                positionClass = 'cartefacile-ctrl-bottom-right';
            else if (parent === null || parent === void 0 ? void 0 : parent.classList.contains('maplibregl-ctrl-bottom-left'))
                positionClass = 'cartefacile-ctrl-bottom-left';
            this._panel.classList.add(positionClass);
            this._panel.style.display = 'block';
            this._toggleButton.setAttribute('aria-expanded', 'true');
            // Focus first focusable element
            const firstFocusable = this._panel.querySelector('button, [tabindex="0"]');
            firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
        }
        /** Closes the panel */
        _closePanel() {
            if (!this._panel || !this._toggleButton)
                return;
            this._panel.style.display = 'none';
            this._toggleButton.setAttribute('aria-expanded', 'false');
            this._panel.classList.remove('cartefacile-ctrl-top-left', 'cartefacile-ctrl-top-right', 'cartefacile-ctrl-bottom-left', 'cartefacile-ctrl-bottom-right');
        }
        /** Syncs panel state with current map configuration */
        _syncPanelState() {
            if (!this._map || !this._panel)
                return;
            try {
                const currentStyle = this._map.getStyle();
                // Sync style cards
                this._panel.querySelectorAll('[data-type="style"]').forEach(card => {
                    const cardElement = card;
                    const styleId = cardElement.dataset.id;
                    const isActive = currentStyle.name === styleId || (styleId === 'simple' && (!currentStyle.name || currentStyle.name === 'simple'));
                    cardElement.classList.toggle('active', isActive);
                    cardElement.setAttribute('aria-checked', isActive.toString());
                });
                // Sync overlay cards
                this._panel.querySelectorAll('[data-type="overlay"]').forEach(card => {
                    const cardElement = card;
                    const overlayId = cardElement.dataset.id;
                    const overlay = mapOverlays[overlayId];
                    if (!overlay)
                        return;
                    const hasOverlay = Object.keys(overlay.neutral.sources).some(sourceId => this._map.getSource(sourceId));
                    cardElement.classList.toggle('active', hasOverlay);
                    cardElement.setAttribute('aria-checked', hasOverlay.toString());
                });
            }
            catch (error) {
                console.warn('Failed to sync panel state:', error);
            }
        }
        /** Handles style card click - changes map style */
        _onStyleClick(styleKey, styleObj, container, card) {
            var _a;
            if (!((_a = this._map) === null || _a === void 0 ? void 0 : _a.getContainer())) {
                console.warn('Map is not available');
                return;
            }
            try {
                this._map.setStyle(styleObj);
                // Update radio group
                container.querySelectorAll('.cartefacile-ctrl-map-selector-card').forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-checked', 'false');
                });
                card.classList.add('active');
                card.setAttribute('aria-checked', 'true');
            }
            catch (error) {
                console.error('Failed to set map style:', error);
            }
        }
        /** Handles overlay card click - toggles overlay visibility */
        _onOverlayClick(overlayId, card) {
            var _a;
            if (!((_a = this._map) === null || _a === void 0 ? void 0 : _a.getContainer())) {
                console.warn('Map is not available');
                return;
            }
            try {
                const isActive = card.classList.contains('active');
                if (isActive) {
                    removeOverlay(this._map, overlayId);
                    card.classList.remove('active');
                    card.setAttribute('aria-checked', 'false');
                }
                else {
                    addOverlay(this._map, overlayId);
                    card.classList.add('active');
                    card.setAttribute('aria-checked', 'true');
                }
            }
            catch (error) {
                console.error('Failed to toggle overlay:', error);
            }
        }
        /** Cleanup when control is removed */
        onRemove() {
            var _a;
            if (this._keydownHandler) {
                document.removeEventListener('keydown', this._keydownHandler);
            }
            if (this._clickHandler) {
                document.removeEventListener('click', this._clickHandler);
            }
            (_a = this._panel) === null || _a === void 0 ? void 0 : _a.remove();
            this._map = undefined;
            this._panel = undefined;
            this._toggleButton = undefined;
        }
        /** Default position for the control */
        getDefaultPosition() {
            return 'top-right';
        }
    }

    const API_URL = 'https://data.geopf.fr/geocodage/search';
    const OUTLINE_SOURCE_ID = 'search-outline-source';
    const OUTLINE_FILL_ID = 'search-outline-fill';
    const OUTLINE_LINE_BORDER_ID = 'search-outline-line-border';
    const OUTLINE_LINE_ID = 'search-outline-line';
    const MASK_COLOR = '#000000';
    const MASK_OPACITY = 0.075;
    const OUTLINE_FILL_OPACITY = 0.1;
    const OUTLINE_COLOR = '#4e80ee';
    const OUTLINE_BORDER_COLOR = '#395FB1';
    const OUTLINE_WIDTH = 1;
    const OUTLINE_BORDER_WIDTH = OUTLINE_WIDTH + 1; // 1px border on each side
    const FIT_PADDING_RATIO = 0.08;
    const ADDRESS_LIMIT = 5;
    const POI_LIMIT = 5;
    // A truegeometry with fewer vertices than this is just a bounding box, not a real contour
    const MIN_CONTOUR_VERTICES = 8;
    /**
     * Unified search provider using the French Geoplateforme geocoding API.
     * Searches addresses and POI (administrative divisions, transport, monuments, etc.) in parallel.
     *
     * @see https://data.geopf.fr/geocodage/openapi
     */
    class GeopfGeocoderProvider {
        constructor() {
            this.name = 'geopf';
            this.placeholder = 'Rechercher...';
            this._marker = null;
            this._styledataHandler = null;
        }
        async search(query) {
            // allSettled: a single failing endpoint doesn't block the others
            const results = await Promise.allSettled([
                searchAdminPoi(query),
                searchOtherPoi(query),
                searchAddresses(query)
            ]);
            return results.flatMap(r => r.status === 'fulfilled' ? r.value : []);
        }
        onClear(map) {
            this._clearResult(map);
        }
        async onSelect(result, map) {
            var _a;
            this._clearResult(map);
            const { geometry, invertedMask = false } = (_a = result.data) !== null && _a !== void 0 ? _a : {};
            // Center the map on the bounding box of the contour when available.
            // Padding is computed as a fraction of the smaller viewport dimension.
            // fitBounds is wrapped in try/catch because it throws when padding >= viewport/2.
            if (geometry) {
                const bbox = computeBbox(geometry);
                let fitted = false;
                if (bbox) {
                    try {
                        const container = map.getContainer();
                        const padding = Math.floor(Math.min(container.offsetWidth, container.offsetHeight) * FIT_PADDING_RATIO);
                        map.fitBounds(bbox, {
                            padding,
                            animate: false,
                            // omit maxZoom for admin (no upper limit), cap at 18 for POI
                            ...(invertedMask ? {} : { maxZoom: 18 })
                        });
                        fitted = true;
                    }
                    catch (_b) {
                        // fallthrough to jumpTo below
                    }
                }
                if (!fitted && result.center) {
                    map.jumpTo({ center: result.center, zoom: 15 });
                }
            }
            else if (result.center) {
                map.jumpTo({ center: result.center, zoom: 17 });
            }
            // Display contour — isolated so that a rendering failure never prevents map movement
            if (geometry) {
                try {
                    this._styledataHandler = showContour(map, geometry, invertedMask);
                }
                catch (e) {
                    console.warn('GeopfGeocoder: showContour failed', e);
                }
            }
            // Display pin marker — not shown for admin boundaries (contour is sufficient)
            if (result.center && !invertedMask) {
                this._marker = new maplibregl.Marker({ color: OUTLINE_COLOR })
                    .setLngLat(result.center)
                    .addTo(map);
            }
        }
        _clearResult(map) {
            var _a;
            if (this._styledataHandler) {
                map.off('styledata', this._styledataHandler);
                this._styledataHandler = null;
            }
            (_a = this._marker) === null || _a === void 0 ? void 0 : _a.remove();
            this._marker = null;
            if (map.getLayer(OUTLINE_FILL_ID))
                map.removeLayer(OUTLINE_FILL_ID);
            if (map.getLayer(OUTLINE_LINE_ID))
                map.removeLayer(OUTLINE_LINE_ID);
            if (map.getLayer(OUTLINE_LINE_BORDER_ID))
                map.removeLayer(OUTLINE_LINE_BORDER_ID);
            if (map.getSource(OUTLINE_SOURCE_ID))
                map.removeSource(OUTLINE_SOURCE_ID);
        }
    }
    const GeopfGeocoder = new GeopfGeocoderProvider();
    /** Search administrative boundaries (communes, régions, etc.) */
    async function searchAdminPoi(query) {
        try {
            const params = new URLSearchParams({
                q: query,
                index: 'poi',
                category: 'administratif',
                returntruegeometry: 'true',
                limit: String(POI_LIMIT)
            });
            const response = await fetch(`${API_URL}?${params}`, { signal: AbortSignal.timeout(5000) });
            if (!response.ok)
                return [];
            const data = await response.json();
            if (!Array.isArray(data.features))
                return [];
            return data.features.map(f => {
                const geometry = f.properties.truegeometry ? parseGeometry(f.properties.truegeometry) : undefined;
                return mapPoiFeature(f, geometry, true);
            });
        }
        catch (_a) {
            return [];
        }
    }
    /** Search all other POI (transport, monuments, etc.) excluding admin and habitat duplicates */
    async function searchOtherPoi(query) {
        try {
            const params = new URLSearchParams({
                q: query,
                index: 'poi',
                returntruegeometry: 'true',
                limit: String(POI_LIMIT)
            });
            const response = await fetch(`${API_URL}?${params}`, { signal: AbortSignal.timeout(5000) });
            if (!response.ok)
                return [];
            const data = await response.json();
            if (!Array.isArray(data.features))
                return [];
            return data.features
                .filter(f => {
                var _a;
                const cats = (_a = f.properties.category) !== null && _a !== void 0 ? _a : [];
                // Exclude admin (handled by searchAdminPoi) and habitat types
                // that merely duplicate commune results (e.g. "lieu-dit habité")
                return !cats.includes('administratif') && !cats.includes('lieu-dit habité');
            })
                .map(f => {
                var _a;
                const rawGeometry = f.properties.truegeometry ? parseGeometry(f.properties.truegeometry) : undefined;
                const geometry = rawGeometry && countVertices(rawGeometry) >= MIN_CONTOUR_VERTICES ? rawGeometry : undefined;
                const cats = (_a = f.properties.category) !== null && _a !== void 0 ? _a : [];
                const isTerritory = cats.includes('quartier');
                return mapPoiFeature(f, geometry, isTerritory);
            });
        }
        catch (_a) {
            return [];
        }
    }
    async function searchAddresses(query) {
        try {
            const params = new URLSearchParams({ q: query, index: 'address', limit: String(ADDRESS_LIMIT) });
            const response = await fetch(`${API_URL}?${params}`, { signal: AbortSignal.timeout(5000) });
            if (!response.ok)
                return [];
            const data = await response.json();
            if (!Array.isArray(data.features))
                return [];
            return data.features
                .filter(f => f.properties.type !== 'municipality')
                .map(f => {
                const { id, name, label: fullLabel, citycode, postcode, city, type: addrType } = f.properties;
                const streetName = name !== null && name !== void 0 ? name : fullLabel;
                const locationSuffix = city ? (postcode ? `${city}, ${postcode}` : city) : undefined;
                return {
                    id,
                    label: streetName,
                    locationSuffix,
                    type: 'address',
                    icon: 'pin',
                    center: f.geometry.coordinates,
                    data: {
                        properties: f.properties,
                        citycode,
                        postcode,
                        cityName: city,
                        category: addrType ? [addrType] : []
                    }
                };
            });
        }
        catch (_a) {
            return [];
        }
    }
    /** Maps a raw POI feature to a SearchResult. Shared by searchAdminPoi and searchOtherPoi. */
    function mapPoiFeature(f, geometry, invertedMask = false) {
        var _a, _b, _c, _d, _e, _f;
        const props = f.properties;
        const cats = (_a = props.category) !== null && _a !== void 0 ? _a : [];
        const label = props.toponym;
        let description;
        let locationSuffix;
        if (invertedMask) {
            // Admin POI (commune, région, etc.): keep category description
            description = buildAdminDescription(props);
        }
        else {
            // Other POI (gare, église, etc.): show city in gray after the name
            const cityName = (_b = props.city) === null || _b === void 0 ? void 0 : _b[0];
            if (cityName) {
                locationSuffix = cityName;
            }
        }
        return {
            id: (_c = props.toponym) !== null && _c !== void 0 ? _c : props.id,
            label,
            locationSuffix,
            description,
            type: resolveType(cats),
            icon: invertedMask ? undefined : 'pin',
            center: f.geometry.coordinates,
            data: {
                properties: props,
                citycode: (_d = props.citycode) === null || _d === void 0 ? void 0 : _d[0],
                postcode: (_e = props.postcode) === null || _e === void 0 ? void 0 : _e[0],
                cityName: (_f = props.city) === null || _f === void 0 ? void 0 : _f[0],
                category: cats,
                geometry,
                invertedMask
            }
        };
    }
    function buildAdminDescription(props) {
        var _a, _b, _c;
        const categories = (_a = props.category) !== null && _a !== void 0 ? _a : [];
        if (categories.includes('région'))
            return 'région';
        if (categories.includes('département'))
            return 'département';
        if (categories.includes('epci'))
            return 'intercommunalité';
        if (categories.includes('arrondissement municipal'))
            return 'arrondissement';
        if (categories.includes('commune')) {
            const postcodes = (_b = props.postcode) !== null && _b !== void 0 ? _b : [];
            return postcodes.length > 0 ? `commune · ${postcodes[0]}` : 'commune';
        }
        if (categories.includes('quartier')) {
            const city = (_c = props.city) === null || _c === void 0 ? void 0 : _c[0];
            return city ? `quartier · ${city}` : 'quartier';
        }
        return undefined;
    }
    function resolveType(categories) {
        if (categories.includes('région'))
            return 'region';
        if (categories.includes('département'))
            return 'department';
        if (categories.includes('epci'))
            return 'community';
        if (categories.includes('commune') || categories.includes('arrondissement municipal'))
            return 'city';
        if (categories.includes('quartier'))
            return 'neighborhood';
        if (categories.some(c => c.includes('gare')))
            return 'train';
        if (categories.includes('administratif'))
            return 'admin';
        return 'poi';
    }
    function parseGeometry(raw) {
        return typeof raw === 'string' ? JSON.parse(raw) : raw;
    }
    function countVertices(geometry) {
        const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat();
        return rings.reduce((sum, ring) => sum + ring.length, 0);
    }
    function computeBbox(geometry) {
        const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat();
        const coords = rings.flat();
        if (coords.length === 0)
            return null;
        let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
        for (const [lng, lat] of coords) {
            if (lng < minLng)
                minLng = lng;
            if (lng > maxLng)
                maxLng = lng;
            if (lat < minLat)
                minLat = lat;
            if (lat > maxLat)
                maxLat = lat;
        }
        return [minLng, minLat, maxLng, maxLat];
    }
    function showContour(map, geometry, invertedMask) {
        const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat();
        const geojson = invertedMask
            ? { type: 'Polygon', coordinates: [[[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]], ...rings] }
            : { type: 'Polygon', coordinates: rings };
        const update = () => {
            if (!map.getSource(OUTLINE_SOURCE_ID)) {
                map.addSource(OUTLINE_SOURCE_ID, {
                    type: 'geojson',
                    data: { type: 'Feature', geometry: geojson, properties: {} }
                });
            }
            if (!map.getLayer(OUTLINE_FILL_ID)) {
                map.addLayer({
                    id: OUTLINE_FILL_ID,
                    type: 'fill',
                    source: OUTLINE_SOURCE_ID,
                    paint: { 'fill-color': invertedMask ? MASK_COLOR : OUTLINE_COLOR, 'fill-opacity': invertedMask ? MASK_OPACITY : OUTLINE_FILL_OPACITY }
                });
            }
            if (!map.getLayer(OUTLINE_LINE_BORDER_ID)) {
                map.addLayer({
                    id: OUTLINE_LINE_BORDER_ID,
                    type: 'line',
                    source: OUTLINE_SOURCE_ID,
                    paint: { 'line-color': OUTLINE_BORDER_COLOR, 'line-width': OUTLINE_BORDER_WIDTH }
                });
            }
            if (!map.getLayer(OUTLINE_LINE_ID)) {
                map.addLayer({
                    id: OUTLINE_LINE_ID,
                    type: 'line',
                    source: OUTLINE_SOURCE_ID,
                    paint: { 'line-color': OUTLINE_COLOR, 'line-width': OUTLINE_WIDTH }
                });
            }
        };
        update();
        map.on('styledata', update);
        return update;
    }

    const TEMPLATE = `
<div class="maplibregl-ctrl maplibregl-ctrl-group cartefacile-ctrl-search"
     role="search"
     aria-label="Barre de recherche"
    >
    <label class="cartefacile-ctrl-search__label">Rechercher</label>
    <div class="cartefacile-ctrl-search__field">
        <input
            class="cartefacile-ctrl-search__input"
            placeholder="Rechercher"
            type="search"
            autocomplete="off"
            role="combobox"
            aria-expanded="false"
            aria-autocomplete="list"
        >
        <button title="Effacer la recherche"
                class="cartefacile-btn-icon
                cartefacile-btn-icon--close
                cartefacile-ctrl-search__btn-clear"
        ></button>
    </div>
    <button title="Rechercher"
            class="cartefacile-btn
            cartefacile-btn-icon
            cartefacile-btn-icon--search
            cartefacile-ctrl-search__btn-search"
    ></button>
</div>
`;
    /**
     * Search control for MapLibre GL
     *
     * @example
     * map.addControl(new SearchControl({
     *     providers: [GeopfGeocoder, AdminGeocoder]
     * }));
     */
    class SearchControl {
        constructor(options = {}) {
            var _a, _b, _c, _d, _e, _f, _g;
            this._id = 0;
            this._dropdownEntries = [];
            this._selectedIndex = -1;
            this._requestId = 0;
            const providers = (_a = options.providers) !== null && _a !== void 0 ? _a : GeopfGeocoder;
            this._providers = Array.isArray(providers) ? providers : [providers];
            this._options = {
                placeholder: (_d = (_b = options.placeholder) !== null && _b !== void 0 ? _b : (_c = this._providers[0]) === null || _c === void 0 ? void 0 : _c.placeholder) !== null && _d !== void 0 ? _d : 'Rechercher',
                debounceMs: (_e = options.debounceMs) !== null && _e !== void 0 ? _e : 300,
                minChars: (_f = options.minChars) !== null && _f !== void 0 ? _f : 3,
                maxResults: (_g = options.maxResults) !== null && _g !== void 0 ? _g : 5,
                onSelect: options.onSelect
            };
        }
        onAdd(map) {
            this._map = map;
            this._id = ++SearchControl._idCounter;
            const inputId = `cartefacile-search-input-${this._id}`;
            const dropdownId = `cartefacile-search-results-${this._id}`;
            const wrapper = document.createElement('div');
            wrapper.innerHTML = TEMPLATE.trim();
            this._container = wrapper.firstElementChild;
            this._input = this._container.querySelector('input');
            this._input.id = inputId;
            this._input.placeholder = this._options.placeholder;
            this._input.setAttribute('aria-controls', dropdownId);
            this._container.querySelector('label').setAttribute('for', inputId);
            this._clearButton = this._container.querySelector('.cartefacile-ctrl-search__btn-clear');
            this._searchButton = this._container.querySelector('.cartefacile-ctrl-search__btn-search');
            // Results list appended to map container (avoids overflow clipping by MapLibre controls)
            this._dropdown = document.createElement('ul');
            this._dropdown.className = 'cartefacile-ctrl-search__results';
            this._dropdown.id = dropdownId;
            this._dropdown.setAttribute('role', 'listbox');
            map.getContainer().appendChild(this._dropdown);
            this._bindInputEvents();
            this._bindButtonEvents();
            this._bindDocumentEvents();
            return this._container;
        }
        onRemove() {
            var _a;
            clearTimeout(this._debounceTimeout);
            if (this._documentClickHandler) {
                document.removeEventListener('click', this._documentClickHandler);
            }
            if (this._map) {
                for (const provider of this._providers) {
                    (_a = provider.onClear) === null || _a === void 0 ? void 0 : _a.call(provider, this._map);
                }
            }
            this._dropdown.remove();
            this._container.remove();
            this._map = undefined;
        }
        getDefaultPosition() {
            return 'top-left';
        }
        _bindInputEvents() {
            this._input.addEventListener('input', () => {
                clearTimeout(this._debounceTimeout);
                const value = this._input.value;
                this._container.classList.toggle('cartefacile-ctrl-search--has-value', value.length > 0);
                if (value.length < this._options.minChars) {
                    this._hideDropdown();
                    return;
                }
                this._debounceTimeout = window.setTimeout(() => this._search(value), this._options.debounceMs);
            });
            this._input.addEventListener('keydown', (e) => {
                if (this._dropdownEntries.length === 0)
                    return;
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this._setSelectedIndex(this._selectedIndex + 1);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this._setSelectedIndex(this._selectedIndex - 1);
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this._confirmSelection();
                        break;
                    case 'Escape':
                        this._hideDropdown();
                        break;
                }
            });
        }
        _bindButtonEvents() {
            this._searchButton.addEventListener('click', () => this._confirmSelection());
            this._clearButton.addEventListener('click', () => {
                var _a;
                this._input.value = '';
                this._confirmedEntry = undefined;
                this._container.classList.remove('cartefacile-ctrl-search--has-value');
                if (this._map) {
                    for (const provider of this._providers) {
                        (_a = provider.onClear) === null || _a === void 0 ? void 0 : _a.call(provider, this._map);
                    }
                }
                this._hideDropdown();
                this._input.focus();
            });
        }
        _bindDocumentEvents() {
            this._documentClickHandler = (e) => {
                if (!this._container.contains(e.target))
                    this._hideDropdown();
            };
            document.addEventListener('click', this._documentClickHandler);
        }
        async _search(query) {
            if (!this._map)
                return;
            const requestId = ++this._requestId;
            const settled = await Promise.allSettled(this._providers.map(provider => provider.search(query)));
            // Discard stale results if a newer search was triggered while awaiting
            if (requestId !== this._requestId)
                return;
            const entries = [];
            for (let i = 0; i < this._providers.length; i++) {
                const outcome = settled[i];
                if (outcome.status === 'fulfilled') {
                    for (const result of outcome.value.slice(0, this._options.maxResults)) {
                        entries.push({ result, provider: this._providers[i] });
                    }
                }
                else {
                    console.warn(`SearchControl: provider "${this._providers[i].name}" failed`, outcome.reason);
                }
            }
            this._dropdownEntries = entries;
            this._selectedIndex = -1;
            this._renderDropdown(query);
        }
        _renderDropdown(query) {
            this._dropdown.innerHTML = '';
            if (this._dropdownEntries.length === 0) {
                this._hideDropdown();
                return;
            }
            this._dropdownEntries.forEach((entry, index) => {
                this._dropdown.appendChild(this._createResultItem(entry, index, query));
            });
            this._positionDropdown();
            this._dropdown.classList.add('cartefacile-ctrl-search__results--visible');
            this._input.setAttribute('aria-expanded', 'true');
        }
        _createResultItem(entry, index, query) {
            const item = document.createElement('li');
            item.className = 'cartefacile-ctrl-search__result';
            item.id = `cartefacile-search-result-${this._id}-${index}`;
            item.setAttribute('role', 'option');
            item.setAttribute('aria-selected', 'false');
            if (entry.result.icon === 'pin') {
                item.classList.add('cartefacile-ctrl-search__result--has-pin');
            }
            const text = document.createElement('span');
            text.className = 'cartefacile-ctrl-search__result-text';
            const label = document.createElement('span');
            label.className = 'cartefacile-ctrl-search__result-label';
            label.innerHTML = this._highlightText(entry.result.label, query);
            text.appendChild(label);
            if (entry.result.locationSuffix) {
                const location = document.createElement('span');
                location.className = 'cartefacile-ctrl-search__result-desc';
                location.textContent = entry.result.locationSuffix;
                text.appendChild(location);
            }
            if (entry.result.description) {
                const desc = document.createElement('span');
                desc.className = 'cartefacile-ctrl-search__result-desc';
                const d = entry.result.description;
                desc.textContent = d.charAt(0).toUpperCase() + d.slice(1);
                text.appendChild(desc);
            }
            item.appendChild(text);
            item.addEventListener('click', () => this._selectEntry(index));
            item.addEventListener('mouseenter', () => this._setSelectedIndex(index));
            return item;
        }
        _positionDropdown() {
            const rect = this._container.getBoundingClientRect();
            const mapRect = this._map.getContainer().getBoundingClientRect();
            this._dropdown.style.width = `${rect.width}px`;
            // Vertical: open below if there is more room below, above otherwise
            if (mapRect.bottom - rect.bottom >= rect.top - mapRect.top) {
                this._dropdown.style.top = `${rect.bottom - mapRect.top + 8}px`;
                this._dropdown.style.bottom = '';
            }
            else {
                this._dropdown.style.top = '';
                this._dropdown.style.bottom = `${mapRect.bottom - rect.top + 8}px`;
            }
            // Horizontal: align to the same side as the control
            if (rect.left + rect.width / 2 <= mapRect.left + mapRect.width / 2) {
                this._dropdown.style.left = `${rect.left - mapRect.left}px`;
                this._dropdown.style.right = '';
            }
            else {
                this._dropdown.style.left = '';
                this._dropdown.style.right = `${mapRect.right - rect.right}px`;
            }
        }
        // If the dropdown is open: select the highlighted item, or the first one by default.
        // If the dropdown is closed: re-apply the last confirmed selection (e.g. search button clicked again).
        _confirmSelection() {
            if (this._dropdownEntries.length > 0) {
                const index = this._selectedIndex >= 0 ? this._selectedIndex : 0;
                this._selectEntry(index);
            }
            else if (this._confirmedEntry) {
                this._applyEntry(this._confirmedEntry);
            }
        }
        async _selectEntry(index) {
            const entry = this._dropdownEntries[index];
            if (!entry)
                return;
            this._confirmedEntry = entry;
            this._input.value = entry.result.locationSuffix
                ? `${entry.result.label}, ${entry.result.locationSuffix}`
                : entry.result.label;
            this._container.classList.add('cartefacile-ctrl-search--has-value');
            this._hideDropdown();
            await this._applyEntry(entry);
        }
        async _applyEntry(entry) {
            var _a, _b, _c;
            if (!this._map)
                return;
            for (const provider of this._providers) {
                (_a = provider.onClear) === null || _a === void 0 ? void 0 : _a.call(provider, this._map);
            }
            try {
                await entry.provider.onSelect(entry.result, this._map);
            }
            catch (error) {
                console.warn(`SearchControl: onSelect failed for provider "${entry.provider.name}"`, error);
            }
            (_c = (_b = this._options).onSelect) === null || _c === void 0 ? void 0 : _c.call(_b, entry.result);
        }
        _setSelectedIndex(index) {
            const max = this._dropdownEntries.length - 1;
            this._selectedIndex = index < 0 ? max : index > max ? 0 : index;
            this._dropdown.querySelectorAll('li').forEach((li, i) => {
                const selected = i === this._selectedIndex;
                li.classList.toggle('cartefacile-ctrl-search__result--selected', selected);
                li.setAttribute('aria-selected', String(selected));
            });
            this._input.setAttribute('aria-activedescendant', `cartefacile-search-result-${this._id}-${this._selectedIndex}`);
        }
        /** Returns HTML with matching query words wrapped in <strong>. XSS-safe. */
        _highlightText(text, query) {
            const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if (!query)
                return escaped;
            const words = query.trim().split(/\s+/).filter(Boolean).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            if (words.length === 0)
                return escaped;
            return escaped.replace(new RegExp(`(${words.join('|')})`, 'gi'), '<strong>$1</strong>');
        }
        _hideDropdown() {
            this._dropdown.classList.remove('cartefacile-ctrl-search__results--visible');
            this._input.setAttribute('aria-expanded', 'false');
            this._input.removeAttribute('aria-activedescendant');
            this._dropdownEntries = [];
            this._selectedIndex = -1;
        }
    }
    SearchControl._idCounter = 0;

    /**
     * Applique le thème sur une carte MapLibre
     */
    function setTheme(map, theme = 'default') {
        map.getContainer().setAttribute('data-theme', theme);
    }

    exports.GeopfGeocoder = GeopfGeocoder;
    exports.LayerGroup = LayerGroup;
    exports.MapSelectorControl = MapSelectorControl;
    exports.Overlay = Overlay;
    exports.SearchControl = SearchControl;
    exports.ZoomLevelControl = ZoomLevelControl;
    exports.addOverlay = addOverlay;
    exports.hideLayer = hideLayer;
    exports.mapOverlays = mapOverlays;
    exports.mapStyle = mapStyle;
    exports.mapStyles = mapStyles;
    exports.mapThumbnails = mapThumbnails;
    exports.removeOverlay = removeOverlay;
    exports.setTheme = setTheme;
    exports.showLayer = showLayer;

}));
//# sourceMappingURL=carte-facile.js.map
