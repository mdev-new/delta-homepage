import './App.css';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React, { useState, useLayoutEffect } from 'react';

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

import Box from '@mui/material/Box';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import { jizdni_rad } from './jr.js'

const _ = require('lodash');


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

//https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

const hours_minutes = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`


const closest = (array, pivot) => array.sort((a, b) => a - b).filter(e => (e >= pivot))[0];

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function najdi(zacatek, konec, cas) {

	if(!(zacatek in jizdni_rad)) return null

	let linka = jizdni_rad[zacatek]; // toto je garantovano

	let casy = linka.map(odjezd => odjezd.cas);
	let nejblizsi_odjezd = closest(casy, cas);

	let indexSpoje = linka.findIndex(p => p.cas == nejblizsi_odjezd)
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

	let _moznosti = {}

	for(const stanice of zastavky.slice(1)) {

		if(stanice == konec) {
			_moznosti[stanice] = {prijezd: cesta};
			break;
		}

		let s = (typeof jizdni_rad[stanice] == 'string') ? jizdni_rad[stanice] : stanice;

		let found = najdi(s, konec, spoj.cas + spoj.delka_jizdy)

		if(found != null) { // found == null = tudy cesta fakt nevede

			_moznosti[s] = {prijezd: cesta, odjezd: found} // [0] = prijezd ; [1] = odjezd
		}

	}

	return _moznosti;

}

// i hate this algorithm with everything i have
// it is rather stupid and only assumes one route for each stop will ever be.

function parse(storage, object, zacatek = "", depth = 0) {
	if(object == undefined) return null;

	if((!("odjezd" in object)) && ("prijezd" in object)) { // konecna

		return object.prijezd

	} else if(!("prijezd" in object) && !("odjezd" in object)) { // list moznosti kam dal
		for(const [key, value] of Object.entries(object)) {

			let _zacatek = (depth == 0) ? key : zacatek;

			if(!(_zacatek in storage)) storage[_zacatek] = [[]];
			let next = parse(storage, value, _zacatek, depth + 1);
			//console.log("next", next)
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
		console.log("Something went wrong?")
	}
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
		"Pardubice-Pardubičky" : {odjezd: najdi("Pardubice-Pardubičky", destinace, time)},
		"K Nemocnici"          : {odjezd: najdi("K Nemocnici"         , destinace, time)},
		"Štrossova"            : {odjezd: najdi("Štrossova"           , destinace, time)},
		"Na Okrouhlíku"        : {odjezd: najdi("Na Okrouhlíku"       , destinace, time)},
		"Zdravotnická škola"   : {odjezd: najdi("Zdravotnická škola"  , destinace, time)},
		"Zámeček"              : {odjezd: najdi("Zámeček"             , destinace, time)}
	};

	//console.log(JSON.stringify(cesty))

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

	controls.setResult(objectMap(objekt, (v) => {
		v.reverse();
		return v;
	}))

};

function App() {

	const [selectedDest, setSelectedDest] = useState("");
	const [open, setOpen] = useState(false);
	const [dlgContent, setDlgContent] = useState("");
	const [dlgTitle, setDlgTitle] = useState("");

	const [result, setResult] = useState([]);

	const handleClose = () => setOpen(false);

	const date = new Date();
	//const [time, setTime] = useState(dayjs(`${date.getHours()}:${date.getMinutes()}`, 'HH:MM'));
	const [time, setTime] = useState(dayjs());

	let width = 650;

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

	<h1>Delta Jede Domů</h1>
	<h2>Najdi si efektivní spojení domů</h2>

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
	<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
		<Autocomplete
			disablePortal
			id="destination-input"
			options={destinace}
			onChange={(event, value) => setSelectedDest(value)}
			sx={{ width: 250 }}
			renderInput={(params) => <TextField {...params} label="Destinace" />}
		/>

		<Stack direction="row" spacing={2}>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Čas odjezdu"
				value={time}
				ampm={false}
				sx={{width: 120}}
				onChange={(newTime) => setTime(newTime)}
			/>
		</LocalizationProvider>

		<FormControlLabel control={<Checkbox disabled />} label="Ceny" />
		</Stack>

	</Stack>

		<Button
			variant="contained"
			size="large"
			onClick={() => najdi_spojeni(selectedDest, time, {setOpen, setDlgTitle, setDlgContent, setResult})}
			startIcon={<SearchIcon />}
		>
			Hledej, šmudlo!
		</Button>
	</Stack>

	</div>

	<br />
	<br />

	<Grid container spacing={2} justifyContent="center" alignItems="center">
	{
		Object.entries(result).map(([stanice, cesty]) => (
			<Grid item xs={12} sm={7} md={5}>
				<TableContainer component={Paper}>
					<TableHead>
						<TableRow>
							<TableCell align="center"><b>Typ spoje</b></TableCell>
							<TableCell align="center"><b>Čas odjezdu</b></TableCell>
							<TableCell align="center"><b>Čas příjezdu</b></TableCell>
							<TableCell align="center"><b>Trasa</b></TableCell>
						</TableRow>
					</TableHead>
					<Table size="small">
					<caption>
						Výchozí stanice: {stanice} {(cesty.filter(c => !_.isEmpty(c)).length == 0) ? " - Spojení nenalezeno!" : ""}
					</caption>
					{
						(cesty.length > 0)
						? (
							<TableBody>
							{
								cesty.filter(c => !_.isEmpty(c)).map((radek) => (
									<TableRow>
										<TableCell align="center">{radek[0][0]}</TableCell>
										<TableCell align="center">{radek[0][1]}</TableCell>
										<TableCell align="center">{radek[0][2]}</TableCell>
										<TableCell align="center">{[radek[1][0], radek[1][radek[1].length-1]].join(' - ')}</TableCell>
									</TableRow>
								))
							}
							</TableBody>
						) : <></>
					}
					</Table>
				</TableContainer>
			</Grid>
		))
	}
	</Grid>

	<br />
	<br />

	</div>
	);
}

export default App;
