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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { jizdni_rad } from './jr.js'

const destinace = [
        "Pardubice",
        "Hradec Králové hl.n.",
       // "Opatovice nad Labem",
       // "Kolín",
       // "Choceň",
       // "Ústí nad Orlicí",
        "Všestary",
       // "Žamberk",
       // "Přelouč",
       // "Chrudim"
];

const hours_minutes = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`


const closest = (array, pivot) => array.filter(e => (e > pivot))[0];

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas) {

	if(!(zacatek in jizdni_rad)) return [];

	//console.log("Zacatek: ", zacatek)

	let linka = jizdni_rad[zacatek]; // toto je garantovano

	let casy = linka.map(odjezd => odjezd.cas);
	let nejblizsi_odjezd = closest(casy, cas);

	//console.log("Odjezd: ", nejblizsi_odjezd, zacatek)

	let indexSpoje = linka.findIndex(p => p.cas == nejblizsi_odjezd)

	if(indexSpoje == -1) return []; // dnes uz nic nejede

	let spoj = linka[indexSpoje];

	let zastavky = spoj.zastavky
	//console.log(zastavky)

	let typ = capitalizeFirst(spoj.typ)

	if(spoj.typ == "trol" || spoj.typ == "bus") {
		typ += "_" + spoj.cislo_linky;
	}

	let cesta = [[typ, `${hours_minutes(spoj.cas)}`, `${hours_minutes(spoj.cas+spoj.delka_jizdy)}`, [...zastavky]]]//.slice(zastavky.indexOf(zacatek))

	//console.log(cesta)

	for(const stanice of zastavky.slice(1)) {

		console.log(stanice)

		if(stanice == konec) {
			break;
		}

		if(typeof jizdni_rad[stanice] == 'string')
			cesta.splice(1, 0, ...najdi(jizdni_rad[stanice], konec, spoj.cas + spoj.delka_jizdy - 5))
		else
			cesta.splice(1, 0, ...najdi(stanice, konec, spoj.cas + spoj.delka_jizdy - 5))

	}

	return cesta;

}

function najdi_spojeni (destinace, openDialog, setDialogTitle, setDialogContent, setResult) {

	if(destinace == "Pardubice") {
		setDialogTitle("Jseš kokot?");
		setDialogContent("Podívej se z okna a MOŽNÁ ti dojde proč jseš debil...");
		openDialog(true);
		return;
	}

	let today = new Date();
	let time = today.getHours() * 60 + today.getMinutes();
 
	let cesty = [];
	cesty.push(najdi("Štrossova"           , destinace, time));
	cesty.push(najdi("Pardubice-Pardubičky", destinace, time));
	cesty.push(najdi("K Nemocnici"         , destinace, time));
	cesty.push(najdi("Na Okrouhlíku"       , destinace, time));

	console.log(cesty)

	setResult(cesty)

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
	const [open, setOpen] = useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState([]);

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
		<Button
			variant="contained"
			onClick={() => najdi_spojeni(selectedDest, setOpen, setDlgTitle, setDlgContent, setResult)}
		>
			Hledat spoj
		</Button>
	</Stack>

	</div>

	{
		result.map(trasa => (
			<>
			<hr size="1.5" style={{backgroundColor: "black"}}/>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Typ spoje</TableCell>
							<TableCell>Čas odjezdu</TableCell>
							<TableCell>Čas příjezdu</TableCell>
							{/*<TableCell align="right">Doba trvání</TableCell>*/}
							<TableCell>Trasa</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							trasa.map((spoj) => (
								<TableRow>
									<TableCell>{spoj[0]}</TableCell>
									<TableCell>{spoj[1]}</TableCell>
									<TableCell>{spoj[2]}</TableCell>
									<TableCell>{spoj[3].join(' - ')}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
			</>
		))
	}
	<hr size="1.5" style={{backgroundColor: "black"}}/>


	</div>
	);
}

export default App;
