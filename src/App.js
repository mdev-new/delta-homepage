import './App.css';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState } from 'react';

import { Helmet } from "react-helmet";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Slide from '@mui/material/Slide';

import Stack from '@mui/material/Stack';


import { jizdni_rad } from './jr.js'

const destinace = [
        "Pardubice",
        "Hradec Králové hl.n.",
        "Opatovice nad Labem",
        "Kolín",
        "Choceň",
        "Ústí nad Orlicí",
        "Všestary",
        "Žamberk",
        "Přelouč",
        "Chrudim"
];

const closest = (array, pivot) => array.filter(e => (e >= pivot/* && Math.abs(e-pivot) < 12*/))[0];

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas, cesty = []) {

	if(zacatek in jizdni_rad) {

		//console.log("Zacatek: ", zacatek)

		let linka = jizdni_rad[zacatek]; // toto je garantovano

		let casy = linka.map(odjezd => odjezd.cas);
		let nejblizsi_odjezd = closest(casy, cas);

		//console.log("Odjezd: ", nejblizsi_odjezd, zacatek)

		let indexSpoje = linka.findIndex(p => p.cas == nejblizsi_odjezd)

		if(indexSpoje == -1) return; // dnes uz nic nejede

		let spoj = linka[indexSpoje];

		let zastavky = spoj.zastavky
		//console.log(zastavky)

		let cesta = zastavky//.slice(zastavky.indexOf(zacatek))


		let odjezd_hodiny = Math.floor(nejblizsi_odjezd / 100)
		let odjezd_minuty = (nejblizsi_odjezd - odjezd_hodiny * 100)

		let odjezd_hodiny_str = `${String(odjezd_hodiny).padStart(2, '0')}`
		let odjezd_minuty_str = `${String(odjezd_minuty).padStart(2, '0')}`

		let odjezd_minuty_str_trvani = `${String(odjezd_minuty + spoj.delka_jizdy).padStart(2, '0')}`

		let prijezd = `${odjezd_hodiny_str}:${odjezd_minuty_str_trvani}`;

		let typ = capitalizeFirst(spoj.typ)

		if(spoj.typ == "trol" || spoj.typ == "bus") {
			typ += "_" + spoj.cislo_linky;
		}

		let formatovani = ['\n', `${typ}\t`, `${odjezd_hodiny_str}:${odjezd_minuty_str}`, `${prijezd}`]

		//console.log(cesta)

		for(const stanice of cesta.slice(1)) {
			//console.log(stanice, konec)

			if(stanice == konec) {
				cesty = cesty.concat([...formatovani, [cesta[0], cesta[cesta.indexOf(stanice)]].join(' - '), '\n']);//cesty.concat([...formatovani, ...cesta]);
				break;
			}

			else if(stanice in jizdni_rad) { // prestupni stanice ; prohledat vsechny mozny cesty z ni

				//console.log("Here : ", stanice, konec, spoj.cas + spoj.delka_jizdy, cesty)

				let dalsi_cesta = najdi(stanice, konec, spoj.cas + spoj.delka_jizdy - /*hardcoded zpozdeni predchoziho vlaku */ 2, cesty);

				if(dalsi_cesta != null) {
					cesty = cesty.concat([...formatovani, [cesta[0], cesta[cesta.indexOf(stanice)]].join(' - ')]);
					cesty = cesty.concat(dalsi_cesta);
				}

			}

		}

		return cesty;

	} else {
		return null;
	}

}

function najdi_spojeni (destinace, openDialog, setDialogTitle, setDialogContent, setResult) {

	if(destinace == "Pardubice") {
		setDialogTitle("Jseš kokot?");
		setDialogContent("Podívej se z okna a MOŽNÁ ti dojde proč jseš debil...");
		openDialog(true);
		return;
	}

	let today = new Date();
	//let time = 1200;
	let time = today.getHours() * 100 + today.getMinutes() - 300; // 15:49 is now 1549
 
	let cesty = []
.concat(najdi("Štrossova"           , destinace, time))
.concat(najdi("Pardubice-Pardubičky", destinace, time))
.concat(najdi("K Nemocnici"         , destinace, time))
.concat(najdi("Na Okrouhlíku"       , destinace, time))

	// todo sort

	// let vystup = cesty.join(' ').split('\n').map(e => e.split(' ').filter(e => e != ""));

	// console.log(vystup)

	// console.log(vystup.map(e => e.sort((a, b) => a[1] > b[1])))

	//setDialogTitle("Výsledky");
	//setDialogContent(cesty.join(' '));
	//openDialog(true);

	console.log(cesty)

	setResult(cesty.join('\t'))

};


function DestinationSelector({setDest}) {
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

function App() {

	const [selectedDest, setSelectedDest] = useState("");
	const [open, setOpen] = React.useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState("");

	const handleClose = () => setOpen(false);

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
			{ dlgTitle }
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description" className="box">
			<pre>
				{ dlgContent }
			</pre>
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>OK</Button>
		</DialogActions>
	</Dialog>

	<Stack direction="column" spacing={2}>
		<DestinationSelector setDest={setSelectedDest} />
		<Button variant="contained" onClick={() => najdi_spojeni(selectedDest, setOpen, setDlgTitle, setDlgContent, setResult)}>Hledat spoj</Button>
	</Stack>

	</div>


	<pre>
		{ result }
	</pre>

	</div>
	);
}

export default App;
