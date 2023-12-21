// todo mozna ke kazdy zastavce pridat minutaz jak daleko je od zacatku

// todo presnost v casech jizd

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
				{name: "Štrossova", time: 0},
				{name: "U Kostelíčka", time: 2},
				{name: "Krajský úřad", time: 4},
				{name: "Náměstí Republiky", time: 6},
				{name: "Masarykovo náměstí", time: 8},
				{name: "U Marka", time: 10},
				{name: "Hlavní nádraží", time: 12},
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
				{name: "K Nemocnici", time: 0},
				{name: "Karla IV.", time: 0},
				{name: "Náměstí Republiky", time: 0},
				//{name: "Sukova", time: 0},
				{name: "Masarykovo náměstí", time: 0},
				{name: "U Marka", time: 0},
				{name: "Hlavní nádraží", time: 0},
			]
		}
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
				{name: "Na Okrouhlíku", time: 0},
				{name: "Krajský úřad", time: 0},
				{name: "Náměstí Republiky", time: 0},
				{name: "Masarykovo náměstí", time: 0},
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
				{name: "Pardubice-Pardubičky", time: 0},
				{name: "Pardubice hl.n.", time: 0},
			]
		}
	],


/// přestupní

	//"Náměstí Republiky": [ // todo
	//],

	//"Krajský úřad"

	"Masarykovo náměstí": [ // todo
		{
			typ: "bus",
			cislo_linky: 120,
			casy: [1924],
			zastavky: [
				{name: "Masarykovo náměstí", time: 0},
				{name: "Hrobice", time: 0},
				{name: "Hradec Králové hl.n.", time: 0},
			]
		},
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
				{name: "Pardubice hl.n.", time: 0},
				{name: "Pardubice-Rosice n.L.", time: 0},
				{name: "Hradec Králové hl.n.", time: 0},
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
				{name: "Hradec Králové hl.n.", time: 0},
				{name: "Všestary", time: 0},
			]
		}
	],
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
