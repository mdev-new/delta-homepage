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
        "Pardubice hl.n.",
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

const closest = (array, pivot) => array.filter(e => (e >= pivot))[0];

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas, cesty = []) {

	if(zacatek in jizdni_rad) {

		console.log("Zacatek: ", zacatek)

		let linka = jizdni_rad[zacatek]; // toto je garantovano

		let casy = linka.map(odjezd => odjezd.cas);
		let nejblizsi_odjezd = closest(casy, cas);

		let spoj = linka[linka.findIndex(p => p.cas == nejblizsi_odjezd)];

		let zastavky = spoj.zastavky
		let cesta = zastavky.slice(zastavky.indexOf(zacatek))


		let odjezd_hodiny = Math.floor(nejblizsi_odjezd / 100)
		let odjezd_minuty = (nejblizsi_odjezd - odjezd_hodiny * 100)

		let odjezd_hodiny_str = `${String(odjezd_hodiny).padStart(2, '0')}`
		let odjezd_minuty_str = `${String(odjezd_minuty).padStart(2, '0')}`

		let odjezd_minuty_str_trvani = `${String(odjezd_minuty + spoj.delka_jizdy).padStart(2, '0')}`

		let prijezd = `${odjezd_hodiny_str}:${odjezd_minuty_str_trvani}`;

		let typ = capitalizeFirst(spoj.typ)

		if(spoj.typ == "trol" || spoj.typ == "bus") {
			typ += spoj.cislo_linky;
		}

		for(const stanice of cesta.slice(1)) {
			//console.log(stanice, konec)

			if(stanice == konec) {
				cesty = cesty.concat(['\n', `${typ} ${odjezd_hodiny_str}:${odjezd_minuty_str}-${prijezd}`, ...cesta]);
				break;
			}

			else if(stanice in jizdni_rad) { // prestupni stanice ; prohledat vsechny mozny cesty z ni

				let dalsi_cesta = najdi(stanice, konec, cas + spoj.delka_jizdy, cesty);

				if(dalsi_cesta != null) {
					cesty = cesty.concat(['\n', `${typ} ${odjezd_hodiny_str}:${odjezd_minuty_str}-${prijezd}`, ...cesta]);
					cesty = cesty.concat(dalsi_cesta);
				}

			}

		}

		return cesty;

	} else {
		return null;
	}

}

function najdi_spojeni (destinace, openDialog, setDialogTitle, setDialogContent) {

	if(destinace == "Pardubice") {
		setDialogTitle("Jseš kokot?");
		setDialogContent("Podívej se z okna a MOŽNÁ ti dojde proč jseš debil...");
		openDialog(true);
		return;
	}

	let today = new Date();
	let time = today.getHours() * 100 + today.getMinutes(); // 15:49 is now 1549

	let cesty = 
		najdi("Pardubice-Pardubičky", destinace, time)
//	+   najdi("Štrossova"           , destinace, jizdni_rady_strossova);
//	+   najdi("K Nemocnici"         , destinace, jizdni_rady_k_nemocnici);
//	+   najdi("Na Okrouhlíku"       , destinace, jizdni_rady_na_okrouhliku);

	console.log(typeof cesty, cesty)

	setDialogTitle("Výsledky");
	setDialogContent(cesty.join(' '));
	openDialog(true);

};


const Transition = React.forwardRef((props, ref) => {
  <Slide direction="up" ref={ref} {...props} />
});

function App() {

	const [selectedDest, setSelectedDest] = useState("");
	const [open, setOpen] = React.useState(false);
	const [dlgContent, setDlgContent] = React.useState("");
	const [dlgTitle, setDlgTitle] = React.useState("");

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
			<DialogContentText id="alert-dialog-description">
			<pre>
				{ dlgContent }
			</pre>
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose}>OK</Button>
		</DialogActions>
	</Dialog>

	<Stack direction="row" spacing={2}>
		<DestinationSelector setDest={setSelectedDest} />
		<Button variant="contained" onClick={() => najdi_spojeni(selectedDest, setOpen, setDlgTitle, setDlgContent)}>Hledat spoj</Button>
	</Stack>

	</div>
	</div>
	);
}

export default App;
