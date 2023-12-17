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
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { jizdni_rad } from './jr.js'

// const _ = require('lodash');


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


const najdi_odjezdy = (array, pivot) => array.sort((a, b) => (a - b)).filter(e => (e >= pivot));

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas) {

	if(!(zacatek in jizdni_rad)) return null

	let linka = jizdni_rad[zacatek]; // toto je garantovano

	let casy = linka.map(odjezd => odjezd.cas);
	let odjezdy = najdi_odjezdy(casy, cas);

	let _moznosti = []

	for (const odjezd of odjezdy.slice(0, 3)) {

		let indexSpoje = linka.findIndex(p => p.cas == odjezd)
		if(indexSpoje == -1) return null; // dnes uz nic nejede

		let spoj = linka[indexSpoje];
		let zastavky = spoj.zastavky

		let typ = capitalizeFirst(spoj.typ)

		if(spoj.typ == "trol" || spoj.typ == "bus") {
			if(spoj.typ == "trol") typ = "Trolejbus";
			else if(spoj.typ == "bus") typ = "Autobus";
			typ += " " + spoj.cislo_linky;
		}

		let cesta = [
			[
				typ,
				`${hours_minutes(spoj.cas)}`,
				`${hours_minutes(spoj.cas+spoj.delka_jizdy)}`
			],
			[...zastavky]
		]

		for(const stanice of zastavky.slice(1)) {

			if(stanice == konec) {
				_moznosti.push({stanice: stanice, prijezd: [cesta]});
				break;
			}

			let found = najdi(spoj.alias, konec, spoj.cas + spoj.delka_jizdy)

			if(found != null) { // found == null = tudy cesta fakt nevede
				_moznosti.push({stanice: spoj.alias, prijezd: [cesta], odjezd: found}) // [0] = prijezd ; [1] = odjezd
			}

		}

	}

	return _moznosti;

}

function najdi_spojeni (destinace, cas, controls) {

	if(destinace == "Pardubice") {
		controls.setDlgTitle("Jseš kokot?");
		controls.setDlgContent("Podívej se z okna nebo na mapu a MOŽNÁ ti dojde proč jseš debil...");
		controls.setOpen(true);
		return;
	} else if(destinace == "") {
		controls.setDlgTitle("Jseš kokot?");
		controls.setDlgContent("Zadej kam chceš jet trotle, nebo tě pošlu za vránama (mottl rizz)");
		controls.setOpen(true);
		return;
	}

	let time = cas["$H"] * 60 + cas["$M"];
 
	let cesty = {
		"Pardubice-Pardubičky" : najdi("Pardubice-Pardubičky", destinace, time),
		"K Nemocnici"          : najdi("K Nemocnici"         , destinace, time),
		"Štrossova"            : najdi("Štrossova"           , destinace, time),
		"Na Okrouhlíku"        : najdi("Na Okrouhlíku"       , destinace, time),
		"Zdravotnická škola"   : najdi("Zdravotnická škola"  , destinace, time),
		"Zámeček"              : najdi("Zámeček"             , destinace, time)
	};

	console.log(JSON.stringify(cesty))
	//console.log(propertiesToArray(cesty))

	//controls.setResult(cesty)

};

function propertiesToArray(obj) {

	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	const addDelimiter = (a, b) => a ? `${a} - ${b}` : b;

	const paths = (obj = {}, head = '') => {
		return Object.entries(obj).reduce((product, [key, value]) => {

			let fullPath = addDelimiter(head, key);

			if(isObject(value)) {
				return product.concat(...paths(value, fullPath))
			} else if(Array.isArray(value) && value.some(v => isObject(v))) {
				return value.filter(v => isObject(v)).map(x => product.concat(...paths(x, fullPath))).filter(c => c.length > 0)
			} else {
				return product.concat(fullPath)
			}

		}, []);
	}

	return paths(obj);
}

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

	let dt = new Date();
	const [time, setTime] = useState(dayjs(`${dt.getHours()}:${dt.getMinutes()}`, 'HH:MM'));

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
	>
		<DialogTitle>{ dlgTitle }</DialogTitle>
		<DialogContent>
			<DialogContentText className="box">
				{ dlgContent }
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" disableElevation onClick={handleClose}>OK</Button>
		</DialogActions>
	</Dialog>

	<Stack direction="column" spacing={2}>
	<Stack direction="row" spacing={2}>
		<DestinationSelector setDest={setSelectedDest} />
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Čas odjezdu"
				value={time}
				ampm={false}
				onChange={(newTime) => setTime(newTime)}
			/>
		</LocalizationProvider>
	</Stack>
		<Button
			variant="contained"
			size="small"
			onClick={() => najdi_spojeni(selectedDest, time, {setOpen, setDlgTitle, setDlgContent, setResult})}
			startIcon={<SearchIcon />}
		>
			Hledej, šmudlo!
		</Button>
	</Stack>

	</div>

	<br />
	<br />

	<Grid container spacing={4} justifyContent="center" alignItems="flex-start">
	</Grid>

	</div>
	);
}

export default App;
