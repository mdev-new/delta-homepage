import { jizdni_rad_z_delty, jizdni_rad_na_deltu } from './jr.js'
import log from './log.js'

let jizdni_rad;

const hours_minutes = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`

//https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))
const closest = (array, pivot) => array.sort((a, b) => a - b).filter(e => (e >= pivot))[0];
const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(jr, zacatek, konec, cas, prevStanice) {

	if(!(zacatek in jr)) return null

	let linka = jr[zacatek].spoje; // toto je garantovano

	log("linka", linka)

	let casy = linka.map(odjezd => odjezd.cas);
	let nejblizsi_odjezd = closest(casy, cas);

	if(nejblizsi_odjezd == undefined) return null;

	console.log(nejblizsi_odjezd, cas)

	let indexSpoje = linka.findIndex(p => p.cas === nejblizsi_odjezd)
	if(indexSpoje == -1) return null; // dnes uz nic nejede

	let spoj = linka[indexSpoje];
	let zastavky = spoj.zastavky

	let typ = capitalizeFirst(spoj.typ)

	if(spoj.typ == "trol" || spoj.typ == "bus") {
		if(spoj.typ == "trol") typ = "Trolejbus";
		else if(spoj.typ == "bus") typ = "Autobus";
	}
	if(spoj.cislo_linky !== undefined)
		typ += " " + spoj.cislo_linky;

	//console.log(zacatek, spoj.zastavky.filter(f => f.name != zacatek)[0])
	let _prevZastavka = zastavky[0]

	let cesta = [
		[
			typ,
			`${hours_minutes(spoj.cas)}`,
			`${hours_minutes(spoj.cas+((prevStanice != undefined) ? prevStanice.time : _prevZastavka.time))}`,
			(prevStanice != undefined) ? prevStanice.nastupiste : _prevZastavka.nastupiste
		],
		[...(zastavky.map(z => z.name))]
	]

	let _moznosti = {}


	for (var i = 1; i < zastavky.length; i++) {
		let stanice = zastavky[i]

		if(stanice.name == konec) {
			_moznosti[stanice.name] = {prijezd: cesta};
			break;
		}

		let s = (typeof jr[stanice.name] == 'string') ? jr[stanice.name] : stanice.name;

		let found = najdi(jr, s, konec, spoj.cas + stanice.time, _prevZastavka)

		if(found != null) { // found == null = tudy cesta fakt nevede
			_moznosti[s] = {prijezd: cesta, odjezd: found}
		}

		_prevZastavka = stanice
	}

	return _moznosti;

}

function parse(storage, object, zacatek = "", depth = 0) {
	if(object == undefined) return null;

	if((!("odjezd" in object)) && ("prijezd" in object)) { // konecna

		return object.prijezd

	} else if(!("prijezd" in object) && !("odjezd" in object)) { // list moznosti kam dal
		for(const [key, value] of Object.entries(object)) {

			let _zacatek = (depth == 0) ? key : zacatek;

			if(!(_zacatek in storage)) storage[_zacatek] = [];
			let next = parse(storage, value, _zacatek, depth + 1);
			//log("next", next)
			if(next != null && next != undefined) {
				storage[_zacatek].push(next)
			}
		}
		return;
	} else if(("odjezd" in object)) {
		let next = parse(storage, object.odjezd, zacatek, depth+1)

		if(next == undefined && object.prijezd != undefined) {
			return object.prijezd
		}
		else if(object.prijezd != undefined) {
			return next
		}
		else {
			return next
		}
	} else {
		log("Something went wrong?")
	}
}


export function najdi_spojeni (destinace, zacatek, konec, cas, zDelty, controls) {

	if(konec == zacatek) {
		controls.setDialog({title: "Jseš kokot?", content: "Podívej se z okna nebo na mapu a MOŽNÁ ti dojde proč jseš debil...", open: true})
		return;
	}

	//console.log(cas)
	let time = cas["$H"] * 60 + cas["$m"];

	let cesty = {}

	if(zDelty) {
		destinace[zacatek].forEach(dest => cesty[dest] = {odjezd: najdi(jizdni_rad_z_delty, dest, konec, time)})
	}
	else {
		destinace[konec].forEach(dest => cesty[dest] = {odjezd: najdi(jizdni_rad_na_deltu, zacatek, dest, time)})
	}

	log(cesty, JSON.stringify(cesty))

	let objekt = {}
	parse(objekt, cesty)

	// poor man's object.filter()
	{
		let newobj = {}
		for(const k of Object.keys(objekt)) {
			if(!(objekt[k] == undefined || objekt[k].length == 0)) newobj[k] = objekt[k];
		}

		objekt = newobj;
	}

	let res = objectMap(objekt, (v) => {
		v.reverse();
		return v;
	})

	log("res", res)

	controls.setResult(res)

};
