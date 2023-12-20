// todo mozna ke kazdy zastavce pridat minutaz jak daleko je od zacatku

// todo presnost v casech jizd

const tc = t => {

	let h = Math.floor(t / 100)
	let m = (t - h * 100)

	return h * 60 + m;
}

export const jizdni_rad = {

	"Štrossova": [ // todo 2, 28, 27
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(501),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(526),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(544),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(603),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(628),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(636),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(648),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(715),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(721),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(729),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(748),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(808),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(900),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(937),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1037),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1117),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1150),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1307),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1337),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1356),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1427),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1437),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1443),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1452),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1514),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1527),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1539),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1550),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1610),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1619),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1636),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1655),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1737),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1745),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1808),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1825),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1845),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(1924),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(2020),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(2128),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(2225),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(2252),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "trol",
			cislo_linky: 12,
			cas: tc(2318),
			zastavky: [
				"Štrossova",
				"U Kostelíčka",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
	],

	"K Nemocnici": [
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(525),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(608),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(632),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(708),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(732),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(830),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(930),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1030),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1130),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1230),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1330),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1432),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1508),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1532),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1608),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1645),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 88,
			cas: tc(1900),
			zastavky: [
				"K Nemocnici",
				"Karla IV.",
				"Náměstí Republiky",
				//"Sukova",
				"Masarykovo náměstí",
				"U Marka",
				"Hlavní nádraží"
			],
			delka_jizdy: 11 // minuty
		},
	],

	"Na Okrouhlíku": [
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(434),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(508),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(524),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(540),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(555),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(610),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(622),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(634),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(646),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(658),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(710),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(722),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(734),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(746),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(758),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(810),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(825),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(840),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(855),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(910),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(925),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(940),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(955),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1010),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1025),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1040),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1055),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1110),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1125),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1140),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1155),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1210),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1225),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1240),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1255),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1310),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1325),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1340),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1355),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1410),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1422),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1434),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1446),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1458),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1510),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1522),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1534),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1546),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1558),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1610),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1622),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1634),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1646),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1658),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1710),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1725),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1740),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1755),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1810),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1825),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1840),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1855),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1910),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1925),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1940),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(1955),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2010),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2036),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2106),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2133),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2203),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2233),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2303),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
		{
			typ: "bus",
			cislo_linky: 1,
			cas: tc(2328),
			zastavky: [
				"Na Okrouhlíku",
				"Krajský úřad",
				"Náměstí Republiky",
				"Masarykovo náměstí",
				//"17.listopadu"
			],
			delka_jizdy: 8 // minuty
		},
	],

	"Pardubice-Pardubičky": [
		{
			typ: "vlak",
			cas: tc(449),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(522),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(606),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(715),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(815),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(915),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1115),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1315),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1413),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1515),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1613),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1715),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1813),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(1915),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(2013),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(2123),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
		{
			typ: "vlak",
			cas: tc(2311),
			zastavky: [
				"Pardubice-Pardubičky",
				"Pardubice hl.n."
			],
			delka_jizdy: 3 // minuty
		},
	],


/// přestupní

	//"Náměstí Republiky": [ // todo
	//],

	"Masarykovo náměstí": [ // todo
		{
			typ: "bus",
			cislo_linky: 120,
			cas: tc(1924),
			zastavky: [
				"Masarykovo náměstí",
				"Hrobice",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 30 // minuty
		},
	],


	"Pardubice hl.n.": [ // todo
		{
			typ: "vlak",
			cas: tc(105),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(434),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(505),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(536),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(606),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(638),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(651),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(705),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(722),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(740),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(806),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(835),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(905),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(933),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1006),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1033),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1105),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1133),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1206),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1233),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1305),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1333),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1406),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1434),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1505),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1534),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1606),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1633),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1705),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1733),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1806),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1833),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1905),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(1933),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(2006),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(2033),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(2105),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(2133),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
		{
			typ: "vlak",
			cas: tc(2250),
			zastavky: [
				"Pardubice hl.n.",
				"Pardubice-Rosice n.L.",
				"Hradec Králové hl.n."
			],
			delka_jizdy: 25
		},
	],

	"Hradec Králové hl.n.": [
		{
			typ: "vlak",
			cas: tc(504),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(604),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(704),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(804),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(904),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1104),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1204),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1304),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1404),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1437),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1504),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1604),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1704),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1804),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(1904),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(2004),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(2104),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
		{
			typ: "vlak",
			cas: tc(2240),
			zastavky: [
				"Hradec Králové hl.n.",
				"Všestary"
			],
			delka_jizdy: 8
		},
	],
};

const aliases = {
	"Masarykovo náměstí": ["Sukova", "Třída Míru", "17. listopadu"],
	"Pardubice hl.n.": ["Hlavní nádraží"],
	"Hradec Králové hl.n.": ["Hradec Králové", "Terminál HD"],
}


for (const [key, values] of Object.entries(aliases)) {
	values.forEach(v => {

		jizdni_rad[v] = key;

	});
}

console.log(jizdni_rad)
