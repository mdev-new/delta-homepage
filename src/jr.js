// todo mozna ke kazdy zastavce pridat minutaz jak daleko je od zacatku

// todo presnost v casech jizd

// nastupiste aplikovano retroaktivne (na jizdu z predchozi zastavky k aktualni)

import log from './log.js'

const tc = t => {

	let h = Math.floor(t / 100)
	let m = (t - h * 100)

	return h * 60 + m;
}

const jizdni_rad_template = {

	"Štrossova": [ // todo 2, 28, 27
		{
			typ: "trol",
			cislo_linky: 12,
			casy: [
				501, 526, 544,
				603, 628, 636, 648,
				715, 721, 729, 748,
				808,
				900, 937,
				1037,
				1117, 1150,
				1307, 1337, 1356,
				1427, 1437, 1443, 1452,
				1514, 1527, 1539, 1550,
				1610, 1619, 1636, 1655,
				1737, 1745,
				1808, 1825, 1845,
				1924,
				2020,
				2128,
				2225, 2252,
				2318
			],
			zastavky: [
				{ name: "Štrossova", time: 0, nastupiste: ""},
				{ name: "U Kostelíčka", time: 2, nastupiste: ""},
				{ name: "Krajský úřad", time: 4, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 6, nastupiste: ""},
				{ name: "Masarykovo náměstí", time: 8, nastupiste: ""},
				{ name: "U Marka", time: 10, nastupiste: "2"},
				{ name: "Hlavní nádraží", time: 12, nastupiste: ""},
			]
		}
	],

	"K Nemocnici": [
		{
			typ: "bus",
			cislo_linky: 88,
			casy: [
				525,
				608, 632,
				708, 732,
				830,
				930,
				1030,
				1130,
				1230,
				1330,
				1432,
				1508,
				1532,
				1608,
				1645,
				1900
			],
			zastavky: [
				{ name: "K Nemocnici", time: 0, nastupiste: ""},
				{ name: "Karla IV.", time: 0, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 0, nastupiste: ""},
				//{name: "Sukova", time: 0},
				{ name: "Masarykovo náměstí", time: 0, nastupiste: ""},
				{ name: "U Marka", time: 0, nastupiste: ""},
				{ name: "Hlavní nádraží", time: 0, nastupiste: ""},
			]
		}
	],

	"Nemocnice": [
	],

	"Na Okrouhlíku": [
		{
			typ: "bus",
			cislo_linky: 1,
			casy: [
				434,
				508, 524, 540, 555,
				610, 622, 634, 646, 658,
				710, 722, 734, 746, 758,
				810, 825, 840, 855,
				910, 925, 940, 955,
				1010, 1025, 1040, 1055,
				1110, 1125, 1140, 1155,
				1210, 1225, 1240, 1255,
				1310, 1325, 1340, 1355,
				1410, 1422, 1434, 1446, 1458,
				1510, 1522, 1534, 1546, 1558,
				1610, 1622, 1634, 1646, 1658,
				1710, 1725, 1740, 1755,
				1810, 1825, 1840, 1855,
				1910, 1925, 1940, 1955,
				2010, 2036,
				2106, 2133,
				2203, 2233,
				2303, 2328
			],
			zastavky: [
				{ name: "Na Okrouhlíku", time: 0, nastupiste: ""},
				{ name: "Krajský úřad", time: 0, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 0, nastupiste: ""},
				{ name: "Masarykovo náměstí", time: 0, nastupiste: ""},
				//"17.listopadu"
			]
		}
	],

	"Pardubice-Pardubičky": [
		{
			typ: "vlak",
			casy: [
				449,
				522,
				606,
				715,
				815,
				915,
				1115,
				1315,
				1413,
				1515,
				1613,
				1715,
				1813, 
				1915,
				2013,
				2123,
				2311
			],
			zastavky: [
				{ name: "Pardubice-Pardubičky", time: 0, nastupiste: ""},
				{ name: "Pardubice hl.n.", time: 0, nastupiste: "2"},
			]
		}
	],


/// přestupní

	//"Náměstí Republiky": [ // todo
	//],

	//"Krajský úřad": [],

	"Masarykovo náměstí": [ // todo
		{
			typ: "bus",
			cislo_linky: 28,
			casy: [
				435,
				514, 537, 558,
				635,
				708, 745,
				923,
				1022,
				1134,
				1250,
				1313, 1344,
				1416, 1453,
				1513, 1538,
				1625, 1658,
				1728,
				1801, 1846,
				1916,
				2128
			],
			zastavky: [
				{ name: "Masarykovo náměstí", time: 0, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 2, nastupiste: "3"},
				{ name: "Krajský úřad", time: 1, nastupiste: "3"},
				{ name: "U Kostelíčka", time: 1, nastupiste: ""},
				{ name: "Štrossova", time: 2, nastupiste: ""},
				{ name: "Nemocnice", time: 1, nastupiste: ""},
				{ name: "Kyjevská", time: 1, nastupiste: ""},
				{ name: "Pardubičky,točna", time: 1, nastupiste: ""},
				{ name: "Průmyslová", time: 1, nastupiste: ""},
				{ name: "ERA,Zámeček", time: 1, nastupiste: ""},
				{ name: "Zdravotnická škola", time: 2, nastupiste: ""},
				{ name: "Zámeček", time: 2, nastupiste: ""},

			]
		},
		/*{
			typ: "bus",
			cislo_linky: 27,
			casy: [
				525,
				608, 632,
				708, 732,
				830,
				930,
				1030,
				1130,
				1230,
				1330,
				1432,
				1508,
				1532,
				1608,
				1645,
				1900
			],
			zastavky: [
				{ name: "K Nemocnici", time: 0, nastupiste: ""},
				{ name: "Karla IV.", time: 0, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 0, nastupiste: ""},
				//{name: "Sukova", time: 0},
				{ name: "Masarykovo náměstí", time: 0, nastupiste: ""},
				{ name: "U Marka", time: 0, nastupiste: ""},
				{ name: "Hlavní nádraží", time: 0, nastupiste: ""},
			]
		},
		{
			typ: "bus",
			cislo_linky: 12,
			casy: [
				525,
				608, 632,
				708, 732,
				830,
				930,
				1030,
				1130,
				1230,
				1330,
				1432,
				1508,
				1532,
				1608,
				1645,
				1900
			],
			zastavky: [
				{ name: "K Nemocnici", time: 0, nastupiste: ""},
				{ name: "Karla IV.", time: 0, nastupiste: ""},
				{ name: "Náměstí Republiky", time: 0, nastupiste: ""},
				//{name: "Sukova", time: 0},
				{ name: "Masarykovo náměstí", time: 0, nastupiste: ""},
				{ name: "U Marka", time: 0, nastupiste: ""},
				{ name: "Hlavní nádraží", time: 0, nastupiste: ""},
			]
		}*/
	],

	"Pardubice hl.n.": [ // todo
		{
			typ: "vlak",
			casy: [
				105,
				434,
				505, 536,
				606, 638, 651,
				705, 722, 740,
				806, 835,
				905, 933,
				1006, 1033,
				1105, 1133,
				1206, 1233,
				1305, 1333,
				1406, 1434,
				1505, 1534,
				1606, 1633,
				1705, 1733,
				1806, 1833,
				1905, 1933,
				2006, 2033,
				2105, 2133,
				2250
			],
			zastavky: [
				{ name: "Pardubice hl.n.", time: 0, nastupiste: ""},
				{ name: "Pardubice-Rosice n.L.", time: 0, nastupiste: ""},
				{ name: "Hradec Králové hl.n.", time: 0, nastupiste: ""},
			]
		}
	],

	"Hradec Králové hl.n.": [
		{
			typ: "vlak",
			casy: [
				504,
				604,
				704,
				804,
				904,
				1104,
				1204,
				1304,
				1404, 1437,
				1504,
				1604,
				1704,
				1804,
				1904,
				2004,
				2104,
				2240
			],
			zastavky: [
				{ name: "Hradec Králové hl.n.", time: 0, nastupiste: ""},
				{ name: "Všestary", time: 8, nastupiste: "3"},
			]
		},
		{
			typ: "vlak",
			casy: [
				26,
				426,
				504, 532,
				604, 633, 639,
				702, 732,
				804, 837,
				904, 937,
				1004, 1037,
				1104, 1137,
				1204, 1237,
				1304, 1337,
				1404, 1437,
				1500, 1504, 1537,
				1604, 1637,
				1704, 1737,
				1804, 1837,
				1904, 1937,
				2004, 2037,
				2104, 2137,
				2204, 2228
			],
			zastavky: [
				{ name: "Hradec Králové hl.n.", time: 0, nastupiste: ""},
				{ name: "Pardubice hl.n.", time: 18, nastupiste: ""},
			]
		}
	],

	"Všestary": [
		{
			typ: "vlak",
			casy: [
				545,
				645,
				745,
				845,
				945,
				1145,
				1245,
				1345,
				1445,
				1545,
				1645,
				1745,
				1845,
				1945,
				2045,
				2145,
			],
			zastavky: [
				{ name: "Všestary", time: 0, nastupiste: ""},
				{ name: "Hradec Králové hl.n.", time: 8, nastupiste: ""},
			]
		},
	]
};

const _process = jizdni_rad => {

	let jr = {};

	for (const [k, v] of Object.entries(jizdni_rad)) {
		jr[k] = []
	}

	for (const [k, v] of Object.entries(jizdni_rad)) {
		for (const [k1, v1] of Object.entries(v)) {
			log(v1.casy)
			for (const v2 of v1.casy) {
				let _v1 = {...v1};
				delete _v1["casy"];
				_v1["cas"] = tc(v2);
				jr[k].push(_v1)
			}
		}
	}

	const aliases = {
		"Masarykovo náměstí": ["Sukova", "Třída Míru", "17. listopadu"],
		"Pardubice hl.n.": ["Hlavní nádraží"],
		"Hradec Králové hl.n.": ["Hradec Králové", "Terminál HD"],
	}


	for (const [key, values] of Object.entries(aliases)) {
		values.forEach(v => {

			jr[v] = key;

		});
	}

	return {...jr};

}

export const jizdni_rad = _process(jizdni_rad_template)

log(jizdni_rad)
