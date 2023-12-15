import './App.css';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState } from 'react';

import {Helmet} from "react-helmet";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Stack from '@mui/material/Stack';


import { jizdni_rady_pardubicky_pardubice_hln } from './data/pardubicky.js'

import { jizdni_rady_strossova } from './data/strossova.js'

import { jizdni_rady_k_nemocnici } from './data/k_nemocnici.js'

import { jizdni_rady_na_okrouhliku } from './data/na_okrouhliku.js'


function Destination({setDest}) {
	return (
	<Autocomplete
		disablePortal
		id="destination-input"
		options={destinace}
		onChange={(event, value) => setDest(value)}
		sx={{ width: 300 }}
		renderInput={(params) => <TextField {...params} label="Destinace" />}
	/>
	);
}

const destinace = [
	"Pardubice",
	"Pardubice hl.n.",
	"Hradec Králové",
	"Opatovice nad Labem",
	"Kolín",
	"Choceň",
	"Ústí nad Orlicí",
	"Všestary",
	"Žamberk",
	"Přelouč",
	"Chrudim"
];

const prestupni_zastavky_pce = [
	["Masarykovo náměstí", "Sukova", "Třída Míru"], // todo: toto musí includovat i třídu míru, sukovu a possibly zimní stadion a hotel grand
	["Náměstí republiky"],
	["17. listopadu"],
	["Pardubice hl.n.", "Hlavní nádraží"],
];

const prestupni_zastavky_hk = [
	["Hradec Králové hl.n.", /*"Hlavní nádraží",*/ "Terminál HD"] // tady ale je potreba hledat i z thd => hledat spojeni do a ze vsech
];

//const closest = (array, pivot) => array.filter(e => e > pivot).reduce((a, b) => (Math.abs(b - pivot) < Math.abs(a - pivot)) ? b : a);

const closest = (array, pivot) => array.filter(e => (e >= pivot))[0];

const exists = (arr, search) => arr.some(row => row.includes(search));
const getRow = (arr, search) => arr.some(row => row.includes(search) ? row : null);

function najdi(zacatek, konec, cas, poc_jr, hloubka = 0, cesty = []) {

	if(zacatek == konec) return cesty;

	if(hloubka > 6) return null; // nehledej dal

	let casy = poc_jr.map(entry => entry.cas);
	let nejblizsi_odjezd = closest(casy, cas);

	let indexCesty = poc_jr.findIndex(p => p.cas == nejblizsi_odjezd); // najit objekt cesty podle casu
	let zastavky = poc_jr[indexCesty].zastavky

	let cesta = zastavky.slice(zastavky.indexOf(zacatek), zastavky.indexOf(konec) + 1)

	//if(zastavky.includes(konec)) return cesty + cesta;

	cesta.slice(1).forEach(e =>	{ // pro kazdou zastavku krome prvni

		if(exists(prestupni_zastavky_pce, e)) { // je zastavka prestupni?

			// pokud je zastavka prestupni, hledej cestu z prestupni zastavky

			return cesty
				+ najdi(getRow(prestupni_zastavky_pce, e)[0], konec, cas, poc_jr/*todo*/, hloubka + 1, cesty)
				+ najdi(getRow(prestupni_zastavky_hk, e)[0], konec, cas, poc_jr/*todo*/, hloubka + 1, cesty);
		}
		
	})

}

function najdi_spojeni (destinace, openDialog) {

	if(destinace == "Pardubice") {
		openDialog(true);
		return;
	}

	let today = new Date();
	let time = today.getHours() * 100 + today.getMinutes(); // 15:49 is now 1549


	let cesty = []

	//cesty += najdi("Štrossova"           , destinace, jizdni_rady_strossova);
	//cesty += najdi("K Nemocnici"         , destinace, jizdni_rady_k_nemocnici);
	//cesty += najdi("Na Okrouhlíku"       , destinace, jizdni_rady_na_okrouhliku);
	cesty += najdi("Pardubice-Pardubičky", destinace, time, jizdni_rady_pardubicky_pardubice_hln);

	alert(cesty)

};


function App() {

	const [selectedDest, setSelectedDest] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
	<div className="application">
	<Helmet>
		<meta charSet="utf-8" />
		<title>Hledání spojení</title>
	</Helmet>

	<div
		className="App"
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column'
		}}
	>

	<h1>
		Delta Jede Domů
	</h1>

	<h2>
		Najdi si efektivní spojení domů
	</h2>

	{/* Dialog pro kokoty */}
	<Dialog
		open={open}
		onClose={handleClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">
			{ "Jseš kokot?" }
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Podívej se z okna debile a třeba ti dojde kde jseš
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>Ano</Button>
			<Button onClick={handleClose}>Ano</Button>
		</DialogActions>
	</Dialog>

	<Stack direction="row" spacing={2}>
		<Destination setDest={setSelectedDest} />
		<Button variant="contained" onClick={() => najdi_spojeni(selectedDest, setOpen)}>Hledat spoj</Button>
	</Stack>

	</div>
	</div>
	);
}

export default App;
